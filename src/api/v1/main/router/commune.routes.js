const { Router } = require("express");
const RequestHelper = require("../../helper/request.hepler");
const CMNCTL = require("../controller/cmn.ctl");
const router = Router();

router.get("/:idCommune/hotels", CMNCTL.getAllHotels);

class CMNRT {
  static router = router;
}

module.exports = CMNRT;
