const { Router } = require("express");
const RES = require("../payload/RES");
const EXMDW = require("../../middleware/ex.mdw");
const RCLRT = require("./room.class.routes");
const HotelRT = require("./hotel.routes");
const RoomRT = require("./room.routes");
const CMNRT = require("./commune.routes");
const UserRT = require("./user.routes");
const HtrclRT = require("./htrcl.routes");
const router = Router();

router.use("/room-classes", RCLRT.router);
router.use("/hotels", HotelRT.router);
router.use("/rooms", RoomRT.router);
router.use("/communes", CMNRT.router);
router.use("/users", UserRT.router);
router.use("/hotel-room-class", HtrclRT.router);

router.use(EXMDW.handleErr);

class IDXRouter {
  static router = router;
}

module.exports = IDXRouter;
