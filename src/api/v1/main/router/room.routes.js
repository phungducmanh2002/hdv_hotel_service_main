const { Router } = require("express");
const RequestHelper = require("../../helper/request.hepler");
const RoomCTL = require("../controller/room.ctl");
const router = Router();

router.get("/:idRoom/room-class", RoomCTL.getRoomClass);
router.get("/:idRoom/room-price", RoomCTL.getRoomPrice);

class RoomRT {
  static router = router;
}

module.exports = RoomRT;
