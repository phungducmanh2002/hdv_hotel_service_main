const RES = require("../payload/RES");
const RoomSV = require("../service/room.sv");

class RoomCTL {
  static getRoom = [
    async (req, res, next) => {
      try {
        const idRoom = req.params.idRoom;
        const room = await RoomSV.getRoom(idRoom);
        res.json(RES.Oke.setData(room));
      } catch (error) {
        next(error);
      }
    },
  ];
  static getRoomClass = [
    async (req, res, next) => {
      try {
        const idRoom = req.params.idRoom;
        const roomClass = await RoomSV.getRoomClass(idRoom);
        res.json(RES.Oke.setData(roomClass));
      } catch (error) {
        next(error);
      }
    },
  ];
  static getRoomPrice = [
    async (req, res, next) => {
      try {
        const idRoom = req.params.idRoom;
        const roomClass = await RoomSV.getRoomPrice(idRoom);
        res.json(RES.Oke.setData(roomClass));
      } catch (error) {
        next(error);
      }
    },
  ];
  static updateRoom = [
    async (req, res, next) => {
      try {
        const idRoom = parseInt(req.params.idRoom);
        const { name, idHotel, idRoomClass } = req.body;
        const room = await RoomSV.updateRoom(
          idRoom,
          name,
          idHotel,
          idRoomClass
        );
        res.json(RES.Oke.setData(room));
      } catch (error) {
        next(error);
      }
    },
  ];
}

module.exports = RoomCTL;
