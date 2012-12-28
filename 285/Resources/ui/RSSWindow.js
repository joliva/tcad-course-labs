var RSSWindow = function() {
	// Builds the RSS reader window
	//require('lib/network').fetchRSSData('http://developer.appcelerator.com/blog/feed');
	require('lib/network').fetchRSSData('http://lifehacker.com/index.xml');
	var rssWindow = Titanium.UI.createWindow({  
	    title:'',
	    backgroundColor:'#fff',
	    barColor:'#18223c'
	});
	// create the tableview
	var tv = Titanium.UI.createTableView();
	rssWindow.add(tv);
	
	// helper function for adding rows, we'll need this later
	var addTableRows = function(tblData){
		var tableRows = []; // an array to hold our rows
		for(var i=0; i<tblData.length; i++) {
			tableRows.push(Ti.UI.createTableViewRow({
				title: tblData[i].postTitle,
				color:'black',
				hasChild:true,
				link: tblData[i].postLink,
				font: {
					fontSize: '16dp',
					fontFamily: 'Futura-CondensedMedium'
				},
				height:'30dp'
			}));
		}
		tv.setData(tableRows);			
	};
	
	// add click event listener to open blog post when row is tapped
	tv.addEventListener('click',function(e) {
		/*
			Require in the article window module, instantiate a window, and pass the row data to it.
			Then, open the resulting window with modal=true so it overlays the tab group
		*/
		
		var ArticleWindow = require('ui/ArticleWindow');
		var articleWindow = new ArticleWindow(e.rowData);
		articleWindow.open({
			animated: true,
			modal:true
		});
	});
	
	// set up an event listener to populate data when it's available from the network
	Ti.App.addEventListener('net:rssDataReturned', function(e){
		// Set the window's title
		rssWindow.title = e.blogTitle;
		// Add the table rows
		addTableRows(e.blogPosts);
	});

	return rssWindow;
}; // end createRSSWindow()

module.exports = RSSWindow;