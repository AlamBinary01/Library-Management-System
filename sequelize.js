//establishing connection
const Sequelize = require('sequelize');
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
