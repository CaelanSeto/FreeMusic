module.exports = (sequelize, DataTypes) => {
    const Users = sequelize.define("Users", {
      email: {
        type: DataTypes.STRING(360),
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      status: {
        type: DataTypes.TINYINT(1),
        defaultValue: 0,
        allowNull: false
      }
    });

    Users.associate = (models) =>{
        Users.hasMany(models.Downloads, {
           onDelete: "cascade"
        });
    };
 
    return Users;
  };
  