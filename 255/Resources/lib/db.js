function DB() {
	//bootstrap the database
	var db = Ti.Database.open('TiBountyHunter');	
	db.execute('CREATE TABLE IF NOT EXISTS fugitives(id INTEGER PRIMARY KEY, name TEXT, captured INTEGER);');	
	db.close();
}

// Returns a set of table rows representing either captured or at-large fugitives. Each row should have title, id, 
// hasChild=true, color='#fff', name (duplicate of title), and captured=boolean properties.
DB.prototype.list = function(isCaptured){
	var results = [];	// array to hold query result as table rows
	
	var db = Ti.Database.open('TiBountyHunter');	
	var resultSet = db.execute('SELECT * FROM fugitives WHERE captured = ' + (isCaptured ? '1' : '0'));
	
	while (resultSet.isValidRow()) {
		var row = Ti.UI.createTableViewRow({
			id: resultSet.fieldByName('id'),
			title: resultSet.fieldByName('name'),
			captured: resultSet.fieldByName('captured'),
			color:'white',		// text color
			hasChild:true
		});
		
		results.push(row);
		resultSet.next();
	}
	
	resultSet.close();
	db.close();
	return results;
}

// Adds the named fugitive to the database. Fires an App-level event noting that the database has been updated.
DB.prototype.add = function(fugitiveName){
	var db = Ti.Database.open('TiBountyHunter');	
	db.execute('INSERT INTO fugitives (name, captured) VALUES (?,?)', fugitiveName, 0);
	var lastID = db.lastInsertRowId;
	db.close();
	
	Ti.App.fireEvent('app:db_update', {name:fugitiveName});
	return lastID;
}

// Deletes the fugitive with the given ID. Fires the 'database updated' App-level event.
DB.prototype.del = function(fugitiveId){
	var db = Ti.Database.open('TiBountyHunter');	
	db.execute('DELETE FROM fugitives WHERE id=?', fugitiveId);
	db.close();
	
	Ti.App.fireEvent('app:db_update', {id:fugitiveId});	
}

// Marks the fugitive with the given ID as captured. Fires the 'database updated' App-level event.
DB.prototype.bust = function(fugitiveId){
	var db = Ti.Database.open('TiBountyHunter');	
	db.execute('UPDATE fugitives SET captured=? WHERE id=?', 1, fugitiveId);
	db.close();
	
	Ti.App.fireEvent('app:db_update', {id:fugitiveId});	
}

module.exports = DB;
