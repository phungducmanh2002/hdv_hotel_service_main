const HtRclETT = require("../data/entity/ht.rcl.ett");
const RoomCLETT = require("../data/entity/rcl.ett");
const RoomETT = require("../data/entity/room.ett");

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
  static async updateRoom(idRoom, name, idHotelRoomClass) {
    return await RoomETT.update(
      { name: name, idHotelRoomClass: idHotelRoomClass },
      {
        where: {
          id: idRoom,
        },
      }
    );
  }
}

module.exports = RoomSV;
