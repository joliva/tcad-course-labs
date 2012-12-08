var makeWindow = function(parent, isFugitive) {
	var win = Ti.UI.createWindow({
		title:isFugitive ? L('Fugitives') : L('Captured'),
		navBarHidden:false,		// ensure heavyweight window
		backgroundImage:'grain.png',
		activity: {
			onCreateOptionsMenu : function(e) {
				var menu = e.menu;
				var menuItem = menu.add({title:'Add'});
				menuItem.addEventListener('click', function(e) {
					var AddWindow = require('ui/common/AddWindow');
					var awin = new AddWindow();
					parent.open(awin, {animated:true});
				});
			}			
		}
	});
	
	var BountyTable = require('ui/common/BountyTable');
	var bountyTable = new BountyTable(isFugitive);
	win.add(bountyTable);
	
	bountyTable.addEventListener('click', function(e) {
		var DetailWindow = require('ui/common/DetailWindow');
		var dwin = new DetailWindow(e.rowData);
		parent.open(dwin, {animated:true});
	});
	
	var osname = Ti.Platform.osname;
	if (osname === 'iphone') {
		// add right nav button to add new fugitive
		var button = Ti.UI.createButton({
			title:'Add'
		});
		
		win.rightNavButton = button;
		button.addEventListener('click', function(e){
			var AddWindow = require('ui/common/AddWindow');
			var awin = new AddWindow();
			parent.open(awin, {animated:true});
		});
	}
	
	return win;
};

module.exports = makeWindow;