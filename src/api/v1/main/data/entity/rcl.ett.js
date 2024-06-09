const SQLZConfig = require("../../../config/sequelize.config");
const { DataTypes, Model } = require("sequelize");

class RoomCLETT extends Model {}

RoomCLETT.init(
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
  },
  {
    sequelize: SQLZConfig.SQLZInstance,
    freezeTableName: true,
    tableName: "room_class",
    indexes: [
      {
        unique: true,
        fields: ["name"],
      },
    ],
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = RoomCLETT;
