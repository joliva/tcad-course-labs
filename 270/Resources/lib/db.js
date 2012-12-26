var DB = function () {
	//bootstrap the database
	var db = Ti.Database.open('TiBountyHunter');	
	db.execute('CREATE TABLE IF NOT EXISTS fugitives(id INTEGER PRIMARY KEY, name TEXT, url TEXT, captured INTEGER);');	
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
			url: resultSet.fieldByName('url'),
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
	db.execute('INSERT INTO fugitives (name, captured, url) VALUES (?,?,?)', fugitiveName, 0, '');
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

// Saves an url to a photo for the fugitive with the given ID. Fires the 'database updated' App-level event.
DB.prototype.addPhoto = function(fugitiveId, url){
	var db = Ti.Database.open('TiBountyHunter');	
	db.execute('UPDATE fugitives SET url=? WHERE id=?', url, fugitiveId);
	db.close();
	
	Ti.App.fireEvent('app:db_update', {id:fugitiveId});	
}

var isSeeded = Ti.App.Properties.getBool('seeded', false);

var seedFugitives = function(e) {
	// add fugitives received from web service
	Ti.API.debug('received fugitives' + this.responseText)
	var fugitiveArray = JSON.parse(this.responseText);
			
	for (var i=0, l=fugitiveArray.length; i < l; i++) {
		DB.prototype.add(fugitiveArray[i].name);
	};
	
	// only runs once
	Ti.App.Properties.setBool('seeded', true);
};

if (!isSeeded) {
	var Network = require('/lib/network');
	var network = new Network();
	
	network.getFugitives(seedFugitives);
};

module.exports = DB;
