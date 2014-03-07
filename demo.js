casper = require("casper").create({
	 clientScripts:  [ 'jquery.min.js' ]
});

utils = require("utils");

var resultados = [];

casper.start("http://www.google.com");

casper.viewport(1200,720);

casper.then(function(){
	casper.fill('form[action="/search"]', {
		q: casper.cli.args
	}, true);
});

/*
casper.then(function(){	
	casper.capture("google.png",{top:0,left:0,width:1200,height:720});
});*/

/*casper.thenEvaluate(function(){
	//document.body.style.background = "red";
	//$("body").css("background","blue");
});*/

/*
casper.then(function(){
	var resultados = casper.evaluate(function(){
		return $("#resultStats").text();
	});
	this.echo(resultados);
});*/

casper.then(function(){
	var resultados=this.evaluate(function(){
		var items = [];
		$.each($("h3.r a"), function(x,y){
			items.push({
				enlace:$(y).attr("href"),
				titulo:$(y).text()
			});
		});
		return items;
	});
	utils.dump(resultados);
});

casper.then(function(){
	casper.capture("google.png",{top:0,left:0,width:1200,height:720});
});





//casper.echo("Hola Mundo con Casper JS");

casper.run();