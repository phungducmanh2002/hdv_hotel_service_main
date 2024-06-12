const { Router } = require("express");
const HtrclCTL = require("../controller/htrcl.ctl");
const router = Router();

router.get("/:idHTRCL", HtrclCTL.getHotelRoomClassById);

class HtrclRT {
  static router = router;
}

module.exports = HtrclRT;
