const DBConfig = require("../../../config/db.config");
const SQLZConfig = require("../../../config/sequelize.config");
const FileHelper = require("../../../helper/file.helper");
const HotelETT = require("./hotel.ett");
const HotelRateETT = require("./hotel.rate");
const RoomCLETT = require("./rcl.ett");
const RoomETT = require("./room.ett");
const HtRclETT = require("./ht.rcl.ett");

// HotelETT.belongsToMany(RoomCLETT, {
//   through: HtRclETT,
//   foreignKey: "idHotel",
//   otherKey: "idRoomClass",
// });
// RoomCLETT.belongsToMany(HotelETT, {
//   through: HtRclETT,
//   foreignKey: "idRoomClass",
//   otherKey: "idHotel",
// });

HotelETT.hasMany(HtRclETT, { foreignKey: "idHotel" });
HtRclETT.belongsTo(HotelETT, { foreignKey: "idHotel" });

RoomCLETT.hasMany(HtRclETT, { foreignKey: "idRoomClass" });
HtRclETT.belongsTo(RoomCLETT, { foreignKey: "idRoomClass" });

HotelETT.hasMany(HotelRateETT, { foreignKey: "idHotel", as: "hotel_rates" });
HotelRateETT.belongsTo(HotelETT, { foreignKey: "idHotel", as: "hotel_rates" });

HtRclETT.hasMany(RoomETT, { foreignKey: "idHotelRoomClass" });
RoomETT.belongsTo(HtRclETT, { foreignKey: "idHotelRoomClass" });

const DB_GEN = FileHelper.getEnv("DB_GEN");
class IDXEtt {
  static async do() {
    if (DB_GEN == 1) {
      console.log("create table ...");
      await SQLZConfig.SQLZInstance.sync({ force: true });
      console.log("create table finish!");
    }
  }
}

module.exports = IDXEtt;
