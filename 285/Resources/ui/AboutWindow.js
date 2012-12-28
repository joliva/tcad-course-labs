var AboutWindow = function() {
	/*
		Define a Titanium window that contains a web view. Show the contents of the
		/about.html file in the window. This constructor should return the window object.
	*/

	// Builds the About window
	var aboutWindow = Titanium.UI.createWindow({  
	    title:'',
	    backgroundColor:'#fff',
	    barColor:'#18223c'
	});

	var webView = Ti.UI.createWebView({
		url: '/about.html'
	});
	
	aboutWindow.add(webView);		
	return aboutWindow;
}; 

module.exports = AboutWindow;