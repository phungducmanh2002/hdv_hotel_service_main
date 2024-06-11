const { Op, where, Sequelize } = require("sequelize");
const DBConfig = require("../../config/db.config");
const SQLZConfig = require("../../config/sequelize.config");
const DataHelper = require("../../helper/data.helper");
const HotelETT = require("../data/entity/hotel.ett");
const HotelRateETT = require("../data/entity/hotel.rate");
const HtRclETT = require("../data/entity/ht.rcl.ett");
const RoomCLETT = require("../data/entity/rcl.ett");
const RoomETT = require("../data/entity/room.ett");
const RES = require("../payload/RES");

class HotelSV {
  static async createHotel(name, description, hotline, idUser, idCommune) {
    return await HotelETT.create({
      name: name,
      description: description,
      hotline: hotline,
      idUser: idUser,
      idCommune: idCommune,
    });
  }
  static async createHotelRoomClass(idHotel, roomClassName, roomPrice) {
    const result = await SQLZConfig.SQLZInstance.transaction(async (t) => {
      const roomClass = await RoomCLETT.create(
        { name: roomClassName },
        { transaction: t }
      );

      await HtRclETT.create(
        {
          idHotel: idHotel,
          idRoomClass: roomClass.id,
          roomPrice: roomPrice,
        },
        { transaction: t }
      );

      return roomClass;
    });

    return result;
  }
  static async getAllRoomClassess(idHotel, type) {
    if (type == "not-have") {
      const roomClasses = await SQLZConfig.SQLZInstance.query(
        "SELECT * FROM room_class WHERE id not in (SELECT idRoomClass FROM hotel_room_class WHERE idHotel = :idHotel)",
        {
          replacements: { idHotel: idHotel },
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      return roomClasses;
    } else {
      const roomClasses = await SQLZConfig.SQLZInstance.query(
        `SELECT id=rcl.id, [name]=rcl.[name], roomPrice=htrcl.roomPrice
FROM (SELECT * FROM room_class WHERE id  in (SELECT idRoomClass FROM hotel_room_class WHERE idHotel = :idHotel)) as rcl
INNER JOIN (SELECT * FROM hotel_room_class WHERE idHotel = :idHotel) as htrcl
ON rcl.id = htrcl.idRoomClass`,
        {
          replacements: { idHotel: idHotel },
          type: Sequelize.QueryTypes.SELECT,
        }
      );
      return roomClasses;
    }
  }
  static async mapHotelRoomClass(idHotel, idRoomClass, roomPrice) {
    return await HtRclETT.create({
      idHotel: idHotel,
      idRoomClass: idRoomClass,
      roomPrice: roomPrice,
    });
  }
  static async createHotelRoom(idHotel, idRoomClass, roomName) {
    const htrcl = await HtRclETT.findOne({
      where: { idHotel: idHotel, idRoomClass: idRoomClass },
    });
    if (!htrcl) {
      return new Promise((resolve, reject) => {
        reject(RES.BadRequest.setMessage("hotel room class not found"));
      });
    }
    return await RoomETT.create({ name: roomName, idHotelRoomClass: htrcl.id });
  }
  static async getAllHotels(page, filter, idCommune) {
    const pageSize = 20;
    const options = {
      where: {},
    };
    // if select by page
    if (page) {
      const offset = (page - 1) * pageSize;
      options.limit = pageSize;
      options.offset = offset;
    }
    // condition commune
    if (idCommune) {
      options.where.idCommune = idCommune;
    }
    // condition newest
    if (filter == "newest") {
      options.order = [["createdAt", "DESC"]];
    }
    // get all hotels
    const hotels = await HotelETT.findAll(options);
    const hotelsDto = hotels.map((e) => e.get({ plain: true }));
    // get hotel start by join table
    const hotelsStar = await HotelSV.getHotelsStar();
    const hotelsStarDto = hotelsStar.map((e) => e.get({ plain: true }));
    // join hotel and hotel star
    const hotelsAndStar = DataHelper.joinArrs(hotelsDto, hotelsStarDto, "id");
    for (let i = 0; i < hotelsAndStar.length; i++) {
      const element = hotelsAndStar[i];
      const star = element.id_joined[0].star;
      delete hotelsAndStar[i].id_joined;
      hotelsAndStar[i].star = star;
    }
    // get hotel price
    const hotelStarPrice = [];
    for (let i = 0; i < hotelsAndStar.length; i++) {
      const element = hotelsAndStar[i];
      const roomPrices = await HotelSV.getHotelPrice(element.id);
      if (roomPrices != null) {
        hotelStarPrice.push({ ...element, ...roomPrices });
      }
    }
    // condition best
    if (filter == "best") {
      return DataHelper.sortArrByField(hotelStarPrice, "star", "desc");
    } else {
      return hotelStarPrice;
    }
  }
  static async getHotelsStar() {
    return await HotelETT.findAll({
      attributes: [
        "id",
        [
          SQLZConfig.SQLZInstance.fn(
            "COALESCE",
            SQLZConfig.SQLZInstance.fn(
              "AVG",
              SQLZConfig.SQLZInstance.col("hotel_rates.star")
            ),
            5
          ),
          "star",
        ],
      ],
      include: [
        {
          model: HotelRateETT,
          as: "hotel_rates",
          attributes: [],
        },
      ],
      group: ["HotelETT.id"],
    });
  }
  static async getHotelStar(idHotel) {
    return await HotelETT.findByPk(idHotel, {
      attributes: [
        "id",
        [
          SQLZConfig.SQLZInstance.fn(
            "COALESCE",
            SQLZConfig.SQLZInstance.fn(
              "AVG",
              SQLZConfig.SQLZInstance.col("hotel_rates.star")
            ),
            5
          ),
          "star",
        ],
      ],
      include: [
        {
          model: HotelRateETT,
          as: "hotel_rates",
          attributes: [],
        },
      ],
      group: ["HotelETT.id"],
    });
  }
  static async getHotelPrice(idHotel) {
    const hotelRoomClassArr = await HtRclETT.findAll({
      where: { idHotel: idHotel },
    });
    const hotelRCLSDtos = hotelRoomClassArr.map((e) => e.get({ plain: true }));
    if (hotelRCLSDtos.length == 0) {
      return null;
    }
    let min = hotelRCLSDtos[0].roomPrice;
    let max = hotelRCLSDtos[0].roomPrice;
    for (let i = 0; i < hotelRCLSDtos.length; i++) {
      const element = hotelRCLSDtos[i];
      if (element.roomPrice < min) {
        min = element.roomPrice;
      }
      if (element.roomPrice > max) {
        max = element.roomPrice;
      }
    }
    return { minPrice: min, maxPrice: max };
  }
  static async getById(idHotel) {
    // get hotel
    const hotel = await HotelETT.findByPk(idHotel);
    // get hotel star
    const hotelStar = await HotelSV.getHotelStar(idHotel);
    // get hotel price
    const roomPrices = await HotelSV.getHotelPrice(idHotel);
    const hotelDto = hotel.get({ plain: true });
    const hotelStarDto = hotelStar.get({ plain: true });
    hotelDto.star = hotelStarDto.star;
    if (roomPrices != null) {
      hotelDto.minPrice = roomPrices.minPrice;
      hotelDto.maxPrice = roomPrices.maxPrice;
    } else {
      hotelDto.minPrice = null;
      hotelDto.maxPrice = null;
    }
    return hotelDto;
  }
  static async getHotelRoomclassRooms(idHotel, idRoomClass) {
    const rooms = await RoomETT.findAll({
      include: [
        {
          model: HtRclETT,
          attributes: ["roomPrice"],
          required: true,
          where: {
            idHotel: idHotel,
            idRoomClass: idRoomClass,
          },
        },
      ],
    });

    const roomsDto = [];
    for (const room of rooms) {
      const tmp = room.get({ plain: true });
      roomsDto.push({
        id: tmp.id,
        name: tmp.name,
        idHotelRoomClass: tmp.idHotelRoomClass,
        roomPrice: tmp.HtRclETT.roomPrice,
      });
    }
    return roomsDto;
  }
  static async getHotelRooms(idHotel) {
    const rooms = await RoomETT.findAll({
      include: [
        {
          model: HtRclETT,
          required: true,
          attributes: ["roomPrice"],
          where: {
            idHotel: idHotel,
          },
          include: [
            {
              model: RoomCLETT,
              required: true,
              attributes: ["name"],
            },
          ],
        },
      ],
    });

    const roomsDto = [];
    for (const room of rooms) {
      const tmp = room.get({ plain: true });
      roomsDto.push({
        id: tmp.id,
        name: tmp.name,
        idHotelRoomClass: tmp.idHotelRoomClass,
        roomPrice: tmp.HtRclETT.roomPrice,
        roomClassName: tmp.HtRclETT.RoomCLETT.name,
      });
    }
    return roomsDto;
  }
  static async getUserHotels(idUser) {
    return await HotelETT.findAll({
      where: { idUser: idUser },
    });
  }
  static async getHotelsNear(idHotel, page) {
    const hotel = await HotelETT.findByPk(idHotel);
    const pageSize = 20;
    const options = {
      attributes: ["id"],
      where: {
        idCommune: hotel.idCommune,
        id: {
          [Op.ne]: hotel.id,
        },
      },
      include: [
        {
          model: HtRclETT,
          attributes: [],
          required: true,
        },
      ],
    };
    // if select by page
    if (page) {
      const offset = (page - 1) * pageSize;
      options.limit = pageSize;
      options.offset = offset;
    }
    const hotelsId = await HotelETT.findAll(options);
    const ids = [];
    for (let i = 0; i < hotelsId.length; i++) {
      const element = hotelsId[i];
      ids.push(element.get({ plain: true }));
    }
    const hotelsDto = [];
    for (let i = 0; i < ids.length; i++) {
      const id = ids[i].id;
      const hl = await HotelSV.getById(id);
      hotelsDto.push(hl);
    }
    return hotelsDto;
  }
  static async updateHotel(idHotel, name, description, hotline, idCommune) {
    return await HotelETT.update(
      {
        name: name,
        description: description,
        hotline: hotline,
        idCommune: idCommune,
      },
      {
        where: { id: idHotel },
      }
    );
  }
  static async updateHotelRoomClass(idHotel, idRoomClass, newRoomPrice) {
    return await HtRclETT.update(
      { roomPrice: newRoomPrice },
      {
        where: {
          idHotel: idHotel,
          idRoomClass: idRoomClass,
        },
      }
    );
  }
}

module.exports = HotelSV;
