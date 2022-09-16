module.exports = (sequelize, DataTypes) => {
    const Recordings = sequelize.define("Recordings", {
      name: {
        type: DataTypes.STRING(260),
        allowNull: false,
      },
      file: {
        type: DataTypes.STRING(300),
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING(1000),
        allowNull: false
      }
    });

    Recordings.associate = (models) =>{
        Recordings.hasMany(models.Downloads, {
           onDelete: "cascade"
        });
    };
 
    return Recordings;
  };
  