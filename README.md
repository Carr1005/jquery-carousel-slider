# jquery-carousel-slider (Imitation of FaceBook UI component)

This is a plugin mainly depends on jQuery, imitates the UI component of FaceBook which presents TV, Movies or Music page suggestions.

## Prerequisities

Make sure that jQuery library and required files was included .

```html
<link rel="stylesheet" type="text/css" href="css/jquery_carousel_slider.css">
<script src="js/jquery-1.11.2.min.js"></script>
<script src="js/jquery_carousel_slider.js"></script>
```


## Usage
Let's see the Demo first !
#### [Demo](http://carr1005.github.io/)

## HTML
The slider needs a div element with **id** attribute to bind.

```html
<div class ='box' id="name_it"></div>
```

## JavaScript & jQuery
There are several ways to assign the setting to the slider box.
Details of available parameters would be explained with examples in [Demo .](http://carr1005.github.io/)
```html
<script>

	$(function(){
		/*1*/
		$.getJSON("JSON/data.js",function (result){
			var setting = {
				subject:'Subject',	//subject would be the theme of the slide box . 
				cardw : 145,		//page card's width .
				cardh : 217,		//page card's height .
				cardn : 5,			//the number of visible card .
				margin : 9,			//margin between cards .
				JSON :result		//prepare the JSON file .
			};
			$('#id').slider(setting);
		});
		/*2*/
		var setting2 = {
			subject:'Subject',
			cardw : 145,	
			cardh : 217,
			cardn : 5,		
			margin : 9,		
			JSON :result
		};
		/*3*/
		$.getJSON("JSON/data.js",function (result){
			setting2.JSON = result;
			$('#id').slider(setting2);
		});
//--------------------------------------------------------3.
		$.getJSON("JSON/data.js",function (result){
			$('#id').slider({
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
## JSON
Add image, title, descriptopn that you want to present in slide box .

Pattern in JSON file:
```html
{
	//Notice !! the "Subject" need to be same as specified in initial setting .
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
## To Do
* Complete the lincense related documents and further informations.
