# Imitation_FB_Suggestion-Box

This is a plugin mainly depends on jQuery ,Imitating the UI of FB's About Page section which presents TV ,Movies or Music suggestions.

## Prerequisities

Make sure that jQuery library and needed files was included .

```html
<link rel="stylesheet" type="text/css" href="css/Imitation_FBSB.css">
<script src="js/jquery-1.11.2.min.js"></script>
<script src="js/Imitation_FBSB.js"></script>
```


## Usage
It's better to see the Demo first !
####[Demo](http://carr1005.github.io/)

###HTML
The essential HTML pattern to generate slide box .
The id of the outmost div is the key to trig plugin . 

```html
<div class ='box' id="name_it">
	<h3></h3>
	<div class='tri'></div>
	<div class ='slide-wrap'>
		<div class='border'>
			<div class='slide'>
				<div class='shift right'></div>
				<i class='shift right'></i>
				<div class='shift left'></div>
				<i class ='shift left'></i>
				<ul>
					<li>
					</li>
					<li>
					</li>
				</ul>
			</div>
		</div>
	</div>
</div>
```

###javascript&jQuery
There are several ways to generate initial setting .
Details of initial setting's parameters would be explained with real example in [Demo .](http://carr1005.github.io/)
```html
<script>

	$(function(){
//--------------------------------------------------------1.
		$.getJSON("JSON/data.js",function (result){
			var setting = {
				subject:'Subject',	//subject would be the theme of the slide box . 
				cardw : 145,	//page card's width .
				cardh : 217,	//page card's height .
				cardn : 5,		//the number of visible page card .
				margin : 9,		//margin between cards .
				JSON :result	//prepare the JSON file .
			};
			$('#id').FBSB(setting);
		});
//--------------------------------------------------------2.
		var setting2 = {
			subject:'Subject',
			cardw : 145,	
			cardh : 217,
			cardn : 5,		
			margin : 9,		
			JSON :result
		};
		
		$.getJSON("JSON/data.js",function (result){
			setting2.JSON = result;
			$('#id').FBSB(setting2);
		});
//--------------------------------------------------------3.
		$.getJSON("JSON/data.js",function (result){
			$('#id').FBSB({
				subject:'Subject',
				cardw : 145,	
				cardh : 217,
				cardn : 5,		
				margin : 9,
				JSON :result
			});
		});

	});

</script>
```
###JSON
Adding image , title , descriptopn that you wanna to present in slide box .

Pattern in JSON file would look like this:
```html
{
	//notice! the "Subject" need to be same as specified in initial setting .
	"Subject":[
			{
	            "title":"Gin",
	            "des":"1988",
	            "imgpath":"path/to/image.jpg"
	        },
	        {
	            "title":"Brandy",
	            "des":"1977",
	            "imgpath":"path/to/image.jpg"
	        },
	        ...
        ]
}
```
##To Do
