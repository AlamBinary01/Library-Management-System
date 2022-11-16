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
//defining model issueBook
const BookIssue = sequelize.define("issueBook",{
book_id: {
type: DataTypes.INTEGER, 
allowNull: false
}, 
book_name: {
type: DataTypes.STRING, 
allowNull: false
},
stu_id: {
type: DataTypes.STRING, 
allowNull: false
}, 
issue_days: {
type: DataTypes.INTEGER, 
allowNull: false
}
});

//add fine model to database
Sequelize.sync().then(() => {
console.log('Issue Book table Created successfully!');
}) .catch((error) => {
console.error('Unable to create table: ', error);
});
