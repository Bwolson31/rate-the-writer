const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/connection');

class User extends Model {
  checkpassword(loginPw) {
    return bcrypt.compareSync(loginPw, this.password);
  }
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [8],
      },
    },
  },
  {
    hooks: {
      async beforeCreate(newdatauser) {
        console.log('hashing password:', newdatauser.password);
        newdatauser.password = await bcrypt.hash(newdatauser.password, 10);
        return newdatauser;
      },
      async beforeUpdate(updateduserdata) {
        console.log('Salt rounds for hashing:', 10); 
        updateduserdata.password = await bcrypt.hash(updateduserdata.password, 10);
        return updateduserdata;
      },
    },
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
    tableName: 'users',
  }
);

module.exports = User;
