module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      email: {
        type: DataTypes.STRING(360),
        isEmail: true,
        allowNull: false,
        unique: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      role: {
        type: DataTypes.ENUM('user', 'admin'),
        defaultValue: 'user',
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
        allowNull: false
      }
    });

    Users.associate = (models) =>{
      Users.hasMany(models.Donations, {
         onDelete: "cascade"
      });
    };
 
    return Users;
  };
  