var request1 = require('request');
var cheerio = require('cheerio');

const db = require('../database').db;
const dataModel = require('../models/data');

var fs = require('fs');
var https = require('https');

const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');


const routes =[
	{
		method:'POST',
		path:'/search/{title}',
		handler: function(request, reply){
			var url = 'https://www.google.co.in/search?q='+ request.params.title +'&source=lnms&tbm=isch'
            request1(url, function(err, data, html){
                if (!err && data.statusCode ===200){
                    var $ = cheerio.load(html);
                    var count = 0;
                    var allimage = []
                    $('img').filter(function(){
                    		count = count +1;
	                    	var imageurl = $(this).attr('src');
	                    	// var name = $(this).attr('name');
	                    	// console.log(count);
	                    	var todaydate = new Date();
							var stringdate = todaydate.toISOString();
	                    	var dest = __dirname + "/uploads_images/" + stringdate+ ":--"+count.toString() +".jpg"
							var file = fs.createWriteStream(dest);
							var request1 = https.get(imageurl, function(response) {
								response.pipe(file);
							});
							allimage.push(dest);
                    });
					imagemin(['./uploads_images/*.{jpg}'], __dirname + "/uploads_images/", {
						    plugins: [
						        imageminJpegtran(),
						        imageminPngquant({quality: '65-80'})
						    ]
						}).then(files => {
						    console.log(files);
						    console.log("fksd");
						    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
						});

					var newDocument = new dataModel({
						'title':request.params.title,
						'imagespath':allimage
					});

					newDocument.save(function(err, data){
		               if (err){
		                   throw err;
		                   console.log(err);
		               } else{
		                   reply({
		                        statusCode: 200,
		                        message: 'User created Successfully',
		                        data: data
		                    });   
		               }
		           });
                }
            });
		}
	}

]

export default routes;
