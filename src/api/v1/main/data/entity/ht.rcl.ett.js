const SQLZConfig = require("../../../config/sequelize.config");
const { DataTypes, Model } = require("sequelize");

class HtRclETT extends Model {}

HtRclETT.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    idHotel: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idRoomClass: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    roomPrice: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        min: 0,
      },
    },
  },
  {
    sequelize: SQLZConfig.SQLZInstance,
    freezeTableName: true,
    tableName: "hotel_room_class",
    indexes: [
      {
        unique: true,
        fields: ["idhotel", "idRoomClass"],
      },
    ],
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = HtRclETT;
