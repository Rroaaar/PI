const {DataTypes, Sequelize} = require('sequelize')

module.exports = (sequelize) =>{
    sequelize.define('genre', {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        image_background:{
            type: DataTypes.STRING
        }
    },{
        timestamps:false
    })
}