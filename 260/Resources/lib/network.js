function RemoteNetwork() {
	this.url = "http://bountyhunterapp.appspot.com/bounties";	// web service end-point
}

RemoteNetwork.prototype.getFugitives = function(callback) {
	var xhr = Ti.Network.createHTTPClient({
	    onload: callback,
	    onerror: function(e) {
			// this function is called when an error occurs, including a timeout
	        Ti.API.info("error: " + e.error);
	        alert('error');
	    },
	    timeout:5000  /* in milliseconds */
	});
	
	xhr.open("GET", this.url);
	//Ti.API.debug('sending network request');
	xhr.send();  // request is actually sent with this statement	
};

RemoteNetwork.prototype.bustFugitive = function(macAddress, callback) {
	var xhr = Ti.Network.createHTTPClient({
	    onload: callback,
	    onerror: function(e) {
			// this function is called when an error occurs, including a timeout
	        Ti.API.info("error: " + e.error);
	        alert('error');
	    },
	    timeout:5000  /* in milliseconds */
	});
	
	xhr.open("POST", this.url);
	Ti.API.debug('sending network request');
	xhr.send({uuid:macAddress});  // request is actually sent with this statement	
};

module.exports = RemoteNetwork;