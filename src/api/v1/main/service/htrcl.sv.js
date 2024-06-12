const HtRclETT = require("../data/entity/ht.rcl.ett");

class HtrclSV {
  static async getHotelRoomClassById(idHTRCL) {
    return await HtRclETT.findByPk(idHTRCL);
  }
}

module.exports = HtrclSV;
