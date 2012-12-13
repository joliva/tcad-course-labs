function DB() {
	//bootstrap the database
	var db = Ti.Database.open('TiBountyHunter');	
	db.execute('CREATE TABLE IF NOT EXISTS fugitives(id INTEGER PRIMARY KEY, name TEXT, captured INTEGER);');	
	db.close();
}

DB.prototype.list = function(isCaptured){
	var results = [];	// array to hold query result as table rows
	
	var resultSet = db.execute('SELECT id, name FROM fugitives WHERE captured = ' + (isCaptured ? '1' : '0'));
	
	while (resultSet.isValidRow()) {
		var row = Ti.UI.createTableViewRow({
			id: resultSet.fieldByName('id'),
			name: resultSet.fieldByName('name')
		});
		
		results.push(row);
		resultSet.next();
	}
	
	resultSet.close();
	return results;
}

DB.prototype.add = function(fugitiveName){
	
}

DB.prototype.del = function(fugitiveId){
	
}

DB.prototype.bust = function(fugitiveId){
	
}

module.exports = DB;
