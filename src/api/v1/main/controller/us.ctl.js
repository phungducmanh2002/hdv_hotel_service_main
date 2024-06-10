const RES = require("../payload/RES");
const HotelSV = require("../service/hotel.sv");

class UserCTL {
  static getAllHotels = [
    async (req, res, next) => {
      try {
        const idUser = parseInt(req.params.idUser);
        const hotels = await HotelSV.getUserHotels(idUser);
        res.json(RES.Oke.setData(hotels));
      } catch (error) {
        next(error);
      }
    },
  ];
}

module.exports = UserCTL;
