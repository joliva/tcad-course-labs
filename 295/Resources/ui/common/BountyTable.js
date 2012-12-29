var populateTable = function(isFugitive) {
	var populateData = function(isFugitive) {
		var DB = require('/lib/db');
		var db = new DB();
		
		var data =  db.list(!isFugitive);
		
		tblView.setData(data);		
		}

	var tblView = Ti.UI.createTableView({
		backgroundColor:'transparent'
	});
	
	Ti.App.addEventListener('app:db_update', function(e) {
		populateData(isFugitive);
	});
	
	populateData(isFugitive);
	return tblView;
};


module.exports = populateTable;