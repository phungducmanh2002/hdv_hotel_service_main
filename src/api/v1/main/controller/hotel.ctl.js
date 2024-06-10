const RES = require("../payload/RES");
const HotelSV = require("../service/hotel.sv");

class HotelCTL {
  static createHotel = [
    async (req, res, next) => {
      try {
        const { name, description, hotline, idUser, idCommune } = req.body;
        const hotel = await HotelSV.createHotel(
          name,
          description,
          hotline,
          idUser,
          idCommune
        );

        res.json(RES.Created.setData(hotel));
      } catch (error) {
        next(error);
      }
    },
  ];
  static createHotelRoomClass = [
    async (req, res, next) => {
      try {
        const idHotel = parseInt(req.params.idHotel);
        const { name, roomPrice } = req.body;
        const roomClass = await HotelSV.createHotelRoomClass(
          idHotel,
          name,
          roomPrice
        );
        res.json(RES.Created.setData(roomClass));
      } catch (error) {
        next(error);
      }
    },
  ];
  static mapHotelRoomClass = [
    async (req, res, next) => {
      try {
        const idHotel = parseInt(req.params.idHotel);
        const idRoomClass = parseInt(req.params.idRoomClass);
        const { roomPrice } = req.body;
        const roomClass = await HotelSV.mapHotelRoomClass(
          idHotel,
          idRoomClass,
          roomPrice
        );
        res.json(RES.Oke.setData(roomClass));
      } catch (error) {
        next(error);
      }
    },
  ];
  static createHotelRoom = [
    async (req, res, next) => {
      try {
        const idHotel = parseInt(req.params.idHotel);
        const idRoomClass = parseInt(req.params.idRoomClass);
        const { name } = req.body;
        const roomClass = await HotelSV.createHotelRoom(
          idHotel,
          idRoomClass,
          name
        );
        res.json(RES.Oke.setData(roomClass));
      } catch (error) {
        next(error);
      }
    },
  ];
  static getAllHotels = [
    async (req, res, next) => {
      try {
        const page = parseInt(req.query.page);
        const filter = req.query.filter;
        const idCommune = parseInt(req.query.commune);
        const hotels = await HotelSV.getAllHotels(page, filter, idCommune);
        res.json(RES.Oke.setData(hotels));
      } catch (error) {
        console.log(error);
        next(error);
      }
    },
  ];
  static getById = [
    async (req, res, next) => {
      try {
        const idHotel = req.params.idHotel;
        const hotel = await HotelSV.getById(idHotel);
        res.json(RES.Oke.setData(hotel));
      } catch (error) {
        next(error);
      }
    },
  ];
  static getHotelRoomclasses = [
    async (req, res, next) => {
      try {
        const idHotel = parseInt(req.params.idHotel);
        const type = req.query.type;
        const roomClasses = await HotelSV.getAllRoomClassess(idHotel, type);
        res.json(RES.Oke.setData(roomClasses));
      } catch (error) {
        next(error);
      }
    },
  ];
  static getHotelRoomclassRooms = [
    async (req, res, next) => {
      try {
        const idHotel = parseInt(req.params.idHotel);
        const idRoomClass = parseInt(req.params.idRoomClass);
        const rooms = await HotelSV.getHotelRoomclassRooms(
          idHotel,
          idRoomClass
        );
        res.json(RES.Oke.setData(rooms));
      } catch (error) {
        next(error);
      }
    },
  ];
  static getHotelRooms = [
    async (req, res, next) => {
      try {
        const idHotel = parseInt(req.params.idHotel);
        const rooms = await HotelSV.getHotelRooms(idHotel);
        res.json(RES.Oke.setData(rooms));
      } catch (error) {
        next(error);
      }
    },
  ];
  static getHotelsNear = [
    async (req, res, next) => {
      try {
        const idHotel = parseInt(req.params.idHotel);
        const page = parseInt(req.query.page);
        const rooms = await HotelSV.getHotelsNear(idHotel, page);
        res.json(RES.Oke.setData(rooms));
      } catch (error) {
        next(error);
      }
    },
  ];
  static updateHotel = [
    async (req, res, next) => {
      try {
        const idHotel = parseInt(req.params.idHotel);
        const { name, description, hotline, idCommune } = req.body;
        const hotel = await HotelSV.updateHotel(
          idHotel,
          name,
          description,
          hotline,
          idCommune
        );
        res.json(RES.Oke.setData(hotel));
      } catch (error) {
        next(error);
      }
    },
  ];
  static updateHotelRoomClass = [
    async (req, res, next) => {
      try {
        const idHotel = parseInt(req.params.idHotel);
        const idRoomClass = parseInt(req.params.idRoomClass);
        const { roomPrice } = req.body;
        const hotel = await HotelSV.updateHotelRoomClass(
          idHotel,
          idRoomClass,
          roomPrice
        );
        res.json(RES.Oke.setData(hotel));
      } catch (error) {
        next(error);
      }
    },
  ];
}

module.exports = HotelCTL;
