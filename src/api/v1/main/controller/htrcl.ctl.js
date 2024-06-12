const RES = require("../payload/RES");
const HtrclSV = require("../service/htrcl.sv");

class HtrclCTL {
  static getHotelRoomClassById = [
    async (req, res, next) => {
      try {
        const idHTRCL = parseInt(req.params.idHTRCL);
        const htrcl = await HtrclSV.getHotelRoomClassById(idHTRCL);
        res.json(RES.Oke.setData(htrcl));
      } catch (error) {
        next(error);
      }
    },
  ];
}

module.exports = HtrclCTL;
