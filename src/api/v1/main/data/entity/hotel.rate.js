const SQLZConfig = require("../../../config/sequelize.config");
const { DataTypes, Model } = require("sequelize");
const DataHelper = require("../../../helper/data.helper");

class HotelRateETT extends Model {}

HotelRateETT.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    star: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    idHotel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: SQLZConfig.SQLZInstance,
    freezeTableName: true,
    tableName: "hotel_rate",
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = HotelRateETT;
