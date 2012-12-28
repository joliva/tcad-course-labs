
var ArticleWindow = function(article) {
	/*
		Define a Titanium window which contains a web view. The web view should show
		the contents of the link sent in the constructor. For iOS, add a navbar button
		that will let users close the window.
		This constructor should return the window object.
	*/


	// Builds the Article window
	var articleWindow = Titanium.UI.createWindow({  
	    title:'',
	    backgroundColor:'#fff',
	    barColor:'#18223c'
	});
	
	var webView = Ti.UI.createWebView({
		url: article.link
	});
	
	if (Ti.Platform.osname === 'iphone') {
		// add close button to window
		var btnClose = Ti.UI.createButton({
			title: L('close')
		});
		
		btnClose.addEventListener('click', function() {
			articleWindow.close();
		});
		
		articleWindow.setLeftNavButton(btnClose);
	};
	
	articleWindow.add(webView);	
	return articleWindow;
}

module.exports = ArticleWindow;