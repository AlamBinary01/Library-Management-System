const {Sequelize, DataTypes } = require("sequelize");
const Sequelize = require('sequelize');
//establishing connection
const sequelize = new Sequelize(
'crud', 'root', '', 
{
host: 'localhost', dialect: 'mysql'
}
);
//authenticating connection
Sequelize.authenticate().then( ()=>{
console.log('Connection established successfully');
}) .catch((error) => {
console.error('Unable to connect to Database: ', error);
});
//defining model book
const Fine = sequelize.define("fine",{
fine_id: {
type: DataTypes.INTEGER, 
allowNull: false
}, 
stu_id: {
type: DataTypes.STRING, 
allowNull: false
}, 
fine_amount: {
type: DataTypes.INTEGER, 
allowNull: false
}, 
fine_type: {
type: DataTypes.STRING, 
allowNull: false
} 
});

//add fine model to database
Sequelize.sync().then(() => {
console.log('Fine table Created successfully!');
}) .catch((error) => {
console.error('Unable to create table: ', error);
});
