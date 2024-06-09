const { Router } = require("express");
const RequestHelper = require("../../helper/request.hepler");
const HotelCTL = require("../controller/hotel.ctl");
const router = Router();

router.post("", HotelCTL.createHotel);
router.post("/:idHotel/room-classes", HotelCTL.createHotelRoomClass);
router.post("/:idHotel/room-classes/:idRoomClass", HotelCTL.mapHotelRoomClass);
router.post(
  "/:idHotel/room-classes/:idRoomClass/rooms",
  HotelCTL.createHotelRoom
);
router.get("", HotelCTL.getAllHotels);
router.get("/:idHotel", HotelCTL.getById);
router.get("/:idHotel/room-classes", HotelCTL.getHotelRoomclasses);
router.get(
  "/:idHotel/room-classes/:idRoomClass/rooms",
  HotelCTL.getHotelRoomclassRooms
);
router.get("/:idHotel/rooms", HotelCTL.getHotelRooms);

class HotelRT {
  static router = router;
}

module.exports = HotelRT;
