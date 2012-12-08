var populateTable = function(isFugitive) {
	var people;
	
	var tblView = Ti.UI.createTableView({
		backgroundColor:'transparent'
	});
	
	if (isFugitive === true) {
		people = ['Arlene', 'John', 'Lauren', 'Kristen'];
	} else {	// captured
		people = ['Diane', 'Lew', 'Robert', 'Patti'];
	}
	
	var data = [];	// holds table view rows
	
	for (var i=0, length=people.length; i<length; i++){
		data.push(Ti.UI.createTableViewRow({
			title:people[i],	// row text
			color:'white',		// text color
			hasChild:true,
			captured:!isFugitive
		}));
	}
	
	tblView.setData(data);
	
	return tblView;
};

module.exports = populateTable;