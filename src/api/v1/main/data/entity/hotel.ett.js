const SQLZConfig = require("../../../config/sequelize.config");
const { DataTypes, Model } = require("sequelize");

class HotelETT extends Model {}

HotelETT.init(
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
    description: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    hotline: {
      type: DataTypes.STRING(20),
      allowNull: false,
    },
    idUser: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    idCommune: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize: SQLZConfig.SQLZInstance,
    freezeTableName: true,
    tableName: "hotel",
    indexes: [
      {
        unique: true,
        fields: ["name", "hotline"],
      },
    ],
    createdAt: false,
    updatedAt: false,
  }
);

module.exports = HotelETT;
