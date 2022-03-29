const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
var dayjs = require('dayjs');

class Plant extends Model {
  checkLight() {
    var currentHour =  dayjs().hour();

    if (Plant.hourCreated + 16 < 24) {
      if (Plant.hourCreated < currentHour < Plant.hourCreated+16){
        return true;
      }
      else {
        return false;
      }
    }

    else{
      if (Plant.hourCreated < currentHour + 24 < Plant.hourCreated+16){
        return true;
      }
      else {
        return false;
      }
    }
   
    //handle for if time+16 < 24

        //subhandle if light should now be off


        //subhandle for if light should now be on



    //handle for if time+16 > 24
      //subhandle if light should now be off


        //subhandle for if light should now be on
    return bcrypt.compareSync(loginPw, this.password);
  }
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
    },
    hourCreated: {
      type:  DataTypes.INTEGER,
      allowNull: true,
    }
  },
  {
    hooks: {
      beforeCreate: async (newPlantData) => {
        
        newPlantData.hourCreated = await dayjs().hour();//dayjs hour call
        newPlantData.is_light = true;
        return newPlantData;
      },

      // beforeCreate: async (newPlantData) => {
      //   newPlantData.is_light = await Plant.checkLight();
      //   return newPlantData;
      // },
    },
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'plant',
  }
);

module.exports = Plant;