const HotelETT = require("../data/entity/hotel.ett");

class CMNSV {
  static async getAllHotels(idCommune) {
    return await HotelETT.findAll({
      where: {
        idCommune: idCommune,
      },
    });
  }
}

module.exports = CMNSV;
