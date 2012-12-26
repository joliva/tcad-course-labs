var mainFunc = (function() {
	Ti.API.info('Running on platform type: ' + Ti.Platform.getOsname());
	
	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	var theApp = new ApplicationTabGroup();
	theApp.open();
})();

