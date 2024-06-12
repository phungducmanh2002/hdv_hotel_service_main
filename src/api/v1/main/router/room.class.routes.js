const { Router } = require("express");
const RequestHelper = require("../../helper/request.hepler");
const RCLCTL = require("../controller/rcl.ctl");
const router = Router();

router.post("", RCLCTL.createRoomClass);
router.get("", RCLCTL.getAllRoomClasses);
router.get("/:idRoomClass", RCLCTL.getRoomClassById);

class RCLRT {
  static router = router;
}

module.exports = RCLRT;
