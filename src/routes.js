

const routes =[
	{
		method:'GET',
		path:'/home',
		handler: function(request, reply){
			reply("hello world !")
		}
	}
]

export default routes;
