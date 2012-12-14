function DB() {
	//bootstrap the database
	var db = Ti.Database.open('TiBountyHunter');	
	db.execute('CREATE TABLE IF NOT EXISTS fugitives(id INTEGER PRIMARY KEY, name TEXT, captured INTEGER);');	
	db.close();
}

DB.prototype.list = function(isCaptured){
	var results = [];	// array to hold query result as table rows
	
	var db = Ti.Database.open('TiBountyHunter');	
	var resultSet = db.execute('SELECT id, name FROM fugitives WHERE captured = ' + (isCaptured ? '1' : '0'));
	db.close();
	
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
	var db = Ti.Database.open('TiBountyHunter');	
	db.execute('INSERT INTO fugitives (name, captured) VALUES (?,?)', fugitiveName, 0);
	db.close();
	
	Ti.App.fireEvent('app:db_add', {name:fugitiveName});
}

DB.prototype.del = function(fugitiveId){
	
}

DB.prototype.bust = function(fugitiveId){
	
}

module.exports = DB;
