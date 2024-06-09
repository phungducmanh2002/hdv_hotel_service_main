const RES = require("../payload/RES");
const RoomCLSV = require("../service/rcl.sv");

class RCLCTL {
  static createRoomClass = [
    async (req, res, next) => {
      try {
        const { name } = req.body;
        const roomClass = await RoomCLSV.createRoomClass(name);
        res.json(RES.Oke.setData(roomClass));
      } catch (error) {
        next(error);
      }
    },
  ];
  static getAllRoomClasses = [
    async (req, res, next) => {
      try {
        const roomClasses = await RoomCLSV.getAllRoomClasses();
        res.json(RES.Oke.setData(roomClasses));
      } catch (error) {
        next(error);
      }
    },
  ];
}

module.exports = RCLCTL;
