const User = require("./User");
const Plant = require("./Plant");
const Comment = require("./Comment");

User.hasMany(Plant, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });
  
  Plant.belongsTo(User, {
    foreignKey: "user_id",
  });

  Plant.hasMany(Comment, {
    foreignKey: "plant_id",
    onDelete: "CASCADE",
  });
  
  Comment.belongsTo(Plant, {
    foreignKey: "plant_id",
  });
  
  User.hasMany(Comment, {
    foreignKey: "user_id",
    onDelete: "CASCADE",
  });
  
  Comment.belongsTo(User, {
    foreignKey: "user_id",
  });
  
  module.exports = { User, Plant, Comment };