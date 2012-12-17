function RemoteNetwork() {
	var url = "http://bountyhunterapp.appspot.com/bounties";	// web service end-point
}

RemoteNetwork.prototype.getFugitives = function(callback) {
	var xhr = Ti.Network.createHTTPClient({
	    onload: function(e) {
         Ti.API.info("Received text: " + this.responseText);
         alert('success');},
	    onerror: function(e) {
			// this function is called when an error occurs, including a timeout
	        Ti.API.info("error: " + e.error);
	        alert('error');
	    },
	    timeout:10000  /* in milliseconds */
	});
	
	xhr.open("GET", this.url);
	xhr.send();  // request is actually sent with this statement	
};



module.exports = RemoteNetwork;