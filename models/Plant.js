const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class Plant extends Model {
  
}

Plant.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    plant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
        type:  DataTypes.INTEGER,
        references: {
            model: 'user',
            key: 'id',
          },
    },
    is_light: {
        type: DataTypes.BOOLEAN,
    }
  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'plant',
  }
);

module.exports = Plant;