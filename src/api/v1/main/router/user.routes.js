const { Router } = require("express");
const RequestHelper = require("../../helper/request.hepler");
const UserCTL = require("../controller/us.ctl");
const router = Router();

router.get("/:idUser/hotels", UserCTL.getAllHotels);

class UserRT {
  static router = router;
}

module.exports = UserRT;
