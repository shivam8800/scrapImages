import Hapi from 'hapi';
import routes from './routes'


const server = new Hapi.Server();

server.connection({
	port:8000
});


server.route(routes);



server.start(err =>{
    if (err){
        console.log(err);
    }
    console.log("you server is running at :", server.info.uri);
})