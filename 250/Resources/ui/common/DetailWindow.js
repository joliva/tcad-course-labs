var makeWindow = function(person) {
	var win = Ti.UI.createWindow({
		title:person.title,
		navBarHidden:false,
		fullscreen:false,
		backgroundImage:'grain.png'
	});
	
	var view = Ti.UI.createView({
		layout:'vertical'
	});
	
	var lblStatus = Ti.UI.createLabel({
		text:person.captured ? 'Busted' : 'Still At Large',
		color:'white',
		top: 20
	});

	var btnDelete = Ti.UI.createButton({
		title:'Delete',
		top:30,
		width:200
	});
	
	btnDelete.addEventListener('click', function(e) {
		var DB = require('/lib/db');
		var db = new DB();
		Ti.API.log('delete ' + person.id.toString());
		db.del(person.id);
		win.close();
	});
	
	view.add(lblStatus);
	view.add(btnDelete);
	
	if (!person.captured){
		var btnCapture = Ti.UI.createButton({
			title:'Capture',
			top:15,
			width:200
		});
		
		btnCapture.addEventListener('click', function(e) {
			var DB = require('/lib/db');
			var db = new DB();
			Ti.API.log('busted ' + person.id.toString());
			db.bust(person.id);
			win.close();
		});
		
		view.add(btnCapture);
	}
	
	win.add(view);
	
	return win;
};

module.exports = makeWindow;