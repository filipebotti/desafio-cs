const app 		= require('./app/index');
const config 	= require('./app/shared/config');

const version 	= '1.0.0';
const server  	= app.listen(process.env.PORT || config.port, () => {
	
	console.log(`Server listening on port: ${server.address().port}`);
	console.log(`Server version: ${version}`);
});