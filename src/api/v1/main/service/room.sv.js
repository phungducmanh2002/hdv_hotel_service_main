const HtRclETT = require("../data/entity/ht.rcl.ett");
const RoomCLETT = require("../data/entity/rcl.ett");
const RoomETT = require("../data/entity/room.ett");
const RES = require("../payload/RES");

class RoomSV {
  static async getRoom(idRoom) {
    return await RoomETT.findByPk(idRoom);
  }
  static async getRoomClass(idRoom) {
    return await RoomCLETT.findOne({
      include: [
        {
          model: HtRclETT,
          attributes: [],
          include: [
            {
              model: RoomETT,
              attributes: [],
              where: {
                id: idRoom,
              },
            },
          ],
        },
      ],
    });
  }
  static async getRoomPrice(idRoom) {
    return await HtRclETT.findOne({
      include: [
        {
          model: RoomETT,
          attributes: [],
          where: {
            id: idRoom,
          },
        },
      ],
    });
  }
  static async updateRoom(idRoom, name, idHotel, idRoomClass) {
    const htrcl = await HtRclETT.findOne({
      where: {
        idHotel: idHotel,
        idRoomClass: idRoomClass,
      },
    });
    if (!htrcl) {
      return new Promise((resolve, reject) => {
        reject(RES.NotFound.setMessage("không tìm thấy hotel room class"));
      });
    }
    return await RoomETT.update(
      { name: name, idHotelRoomClass: htrcl.id },
      {
        where: {
          id: idRoom,
        },
      }
    );
  }
}

module.exports = RoomSV;
