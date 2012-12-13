funtion DB() {
	//bootstrap the database
	var db = Ti.Database.open('TiBountyHunter');	
	db.execute('CREATE TABLE IF NOT EXISTS fugitives(id INTEGER PRIMARY KEY, name TEXT, captured INTEGER);');	
	db.close();
}

DB.prototype.list = function(isCaptured){
	
}

DB.prototype.add = function(fugitiveName){
	
}

DB.prototype.del = function(fugitiveId){
	
}

DB.prototype.bust = function(fugitiveId){
	
}

module.exports = DB;
