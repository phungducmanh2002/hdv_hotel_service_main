const SQLZConfig = require("../../../config/sequelize.config");
const { DataTypes, Model } = require("sequelize");
const DataHelper = require("../../../helper/data.helper");

class RoomETT extends Model {}

RoomETT.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    idHotelRoomClass: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize: SQLZConfig.SQLZInstance,
    freezeTableName: true,
    tableName: "room",
    indexes: [
      {
        unique: true,
        fields: ["name", "idHotelRoomClass"],
      },
    ],
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = RoomETT;
