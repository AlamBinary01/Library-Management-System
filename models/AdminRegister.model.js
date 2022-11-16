const {Sequelize, DataTypes } = require('sequelize');
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
//defining model Admin_register
const Admin = sequelize.define("admin_reg",{
admin_id: {
type: DataTypes.INTEGER, 
allowNull: false
}, 
username: {
type: DataTypes.STRING, 
allowNull: false
}, 
email: {
type: DataTypes.STRING, 
allowNull: false
}, 
password: {
type: DataTypes.STRING, 
allowNull: false
}
});

//add admin_reg to database
Sequelize.sync().then(() => {
console.log('Admin Registration table Created successfully!');
}) .catch((error) => {
console.error('Unable to create table: ', error);
});
