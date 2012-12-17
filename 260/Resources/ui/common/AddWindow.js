var makeWindow = function() {
	var win = Ti.UI.createWindow({
		title:L('NewFugitive'),
		backgroundImage:'grain.png'
	});
	
	var view = Ti.UI.createView({
		layout:'vertical'
	});
	
	var txtView = Ti.UI.createTextField({
		borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		top: 20,
		color: 'black',
		hintText: 'Enter Fugitive Name',
		width: 250
	});

	var btnSave = Ti.UI.createButton({
		title:'Save',
		top:30,
		width:200
	});
	
	btnSave.addEventListener('click', function(e) {
		var DB = require('/lib/db');
		var db = new DB();
		db.add(txtView.value);
		win.close();
	});
	
	view.add(txtView);
	view.add(btnSave);
	win.add(view);
	
	return win;
};

module.exports = makeWindow;