const RES = require("../payload/RES");
const CMNSV = require("../service/cmn.sv");

class CMNCTL {
  static getAllHotels = [
    async (req, res, next) => {
      try {
        const idCommune = req.params.idCommune;
        const hotels = await CMNSV.getAllHotels(idCommune);
        res.json(RES.Oke.setData(hotels));
      } catch (error) {
        next(error);
      }
    },
  ];
}

module.exports = CMNCTL;
