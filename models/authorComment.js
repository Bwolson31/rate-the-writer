const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

class AuthorComment extends Model {}

AuthorComment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

  },
  {
    sequelize,
    timestamps: true,
    freezeTableName: true,
    underscored: true,
    modelName: 'AuthorComment',
  }
);

module.exports = AuthorComment;
