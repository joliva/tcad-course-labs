var appTabGroup = function() {
	var tabGroup = Ti.UI.createTabGroup({
		barColor:'#6d0a0c'
	});
	var Window = require('ui/handheld/Window');
	var win1 = new Window(true);	// fugitives
	var win2 = new Window(false);	// captured
	
	var fugitiveTab = Ti.UI.createTab({
		window:win1,
		icon:'fugitives.png',
		title:L('Fugitives')
	});
	
	var capturedTab = Ti.UI.createTab({
		window:win2,
		icon:'captured.png',
		title:L('Captured')
	});
	
	tabGroup.addTab(fugitiveTab);
	tabGroup.addTab(capturedTab);
	
	return tabGroup;
};

module.exports = appTabGroup;

