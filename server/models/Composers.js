module.exports = (sequelize, DataTypes) => {
    const Composers = sequelize.define("Composers", {
      name: {
        type: DataTypes.STRING(60),
        allowNull: false,
        unique: true,
      },
      description: {
        type: DataTypes.STRING(400),
        allowNull: false,
      },
    });

    Composers.associate = (models) =>{
        Composers.hasMany(models.SheetMusic, {
           onDelete: "cascade"
        });
    };

    Composers.associate = (models) =>{
        Composers.hasMany(models.Recordings, {
           onDelete: "cascade"
        });
    };
 
    return Composers;
  };
  