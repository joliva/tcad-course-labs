function DB() {
	//bootstrap the database
	var db = Ti.Database.open('TiBountyHunter');	
	db.execute('CREATE TABLE IF NOT EXISTS fugitives(id INTEGER PRIMARY KEY, name TEXT, captured INTEGER);');	
	db.close();
}

// Returns a set of table rows representing either captured or at-large fugitives. Each row should have title, id, 
// hasChild=true, color='#fff', name (duplicate of title), and captured=boolean properties.
DB.prototype.list = function(isCaptured){
	
}

// Adds the named fugitive to the database. Fires an App-level event noting that the database has been updated.
DB.prototype.add = function(fugitiveName){
	
}

// Deletes the fugitive with the given ID. Fires the 'database updated' App-level event.
DB.prototype.del = function(fugitiveId){
	
}

// Marks the fugitive with the given ID as captured. Fires the 'database updated' App-level event.
DB.prototype.bust = function(fugitiveId){
	
}

module.exports = DB;
