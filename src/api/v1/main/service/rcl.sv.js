const RoomCLETT = require("../data/entity/rcl.ett");

class RoomCLSV {
  static async createRoomClass(name) {
    return await RoomCLETT.create({ name: name });
  }

  static async getAllRoomClasses() {
    return await RoomCLETT.findAll();
  }

  static async getRoomClassById(idRoomClass) {
    return await RoomCLETT.findByPk(idRoomClass);
  }
}

module.exports = RoomCLSV;
