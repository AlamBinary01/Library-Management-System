const {Sequelize, DataTypes } = require('sequelize');
const Sequelize = require('sequelize');
//establishing connection
const sequelize = new Sequelize(
'crud', 'root','', 
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
const Book = sequelize.define("books",{
book_id: {
type: DataTypes.INTEGER, 
allowNull: false
}, 
book_name: {
type: DataTypes.STRING, 
allowNull: false
}, 
author_name: {
type: DataTypes.STRING, 
allowNull: false
}, 
department: {
type: DataTypes.STRING, 
allowNull: false
}, 
rack_no: {
type: DataTypes.STRING, 
allowNull: false
}
});

//add book model to database
Sequelize.sync().then(() => {
console.log('Book table Created successfully!');
}) .catch((error) => {
console.error('Unable to create table: ', error);
});
