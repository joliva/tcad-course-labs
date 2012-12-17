var mainFunc = (function() {
	Ti.API.info('Running on platform type: ' + Ti.Platform.getOsname());
	
	var ApplicationTabGroup = require('ui/common/ApplicationTabGroup');
	var theApp = new ApplicationTabGroup();
	theApp.open();
	
	/*
	Ti.App.addEventListener('app:db_add', function(e) {
		Ti.API.log('DB added: ' + e.name);
	});

	Ti.App.addEventListener('app:db_delete', function(e) {
		Ti.API.log('DB deleted id: ' + e.id);
	});
		
	var DB = require('/lib/db');
	var db = new DB();
	db.add('foo');
	var id = db.add('bar');
	db.add('baz');
	db.del(id);
	*/
})();

