var makeWindow = function(parentTab, person) {		
	var win = Ti.UI.createWindow({
		title:person.title,
		navBarHidden:false,
		fullscreen:false,
		backgroundImage:'grain.png'
	});
	
	var view = Ti.UI.createView({
		layout:'vertical'
	});
	
	var viewPhoto = Ti.UI.createImageView({
		image:'/burglar.png',
		//borderWidth: 2,
		//borderColor: 'black',
		top:15,
		//width:Ti.UI.SIZE,
		height:150
	});
	
	// if a photo exists for the fugitive, update the view
	if (person.url !== '') {
		var f = Ti.Filesystem.getFile(person.url);
		viewPhoto.image = f.read();
	}
	
	var lblStatus = Ti.UI.createLabel({
		text:person.captured ? L('Busted') : L('StillAtLarge'),
		color:'white',
		top: 5
	});

	var viewHoriz = Ti.UI.createView({
		layout:'horizontal',
		horizontalWrap: false,
		top:20,
		height:Ti.UI.SIZE,		
		width:Ti.UI.FILL		
	});
	
	var btnPhoto = Ti.UI.createButton({
		title:L('AddPhoto'),
		left:'11%',
		width:'33%',
		font: {fontSize: '14dp'},
		height: '28dp'
	});
		
	var btnDelete = Ti.UI.createButton({
		title:L('Delete'),
		left: '11%',
		width:'33%',
		font: {fontSize: '14dp'},
		height: '28dp'
	});
	
	viewHoriz.add(btnPhoto);
	viewHoriz.add(btnDelete);
	
	btnDelete.addEventListener('click', function(e) {
		var DB = require('/lib/db');
		var db = new DB();
		//Ti.API.log('delete ' + person.id.toString());
		db.del(person.id);
		win.close();
	});
	
	btnPhoto.addEventListener('click', function(e) {
		var DB = require('/lib/db');
		var db = new DB();
		var filename = 'photo' + person.id.toString() + '.png';
		
		// try to show camera, on error show photo gallery	
		Titanium.Media.showCamera({
			success:function(event) {
				// called when media returned from the camera
				Ti.API.debug('Our type was: '+event.mediaType);
				if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
					// store image in file
					var imagePath = Ti.Filesystem.applicationDataDirectory + filename;
					var f = Ti.Filesystem.getFile(imagePath);
					f.write(event.media);	// write to the file
					
					// update image URL in database
					db.addPhoto(person.id, imagePath);
					
					// update photo on detail view
					viewPhoto.image = event.media
				} else {
					alert("got the wrong type back ="+event.mediaType);
				}
			},
			cancel:function() {
				// called when user cancels taking a picture
			},
			error:function(error) {
				Titanium.Media.openPhotoGallery({
					success:function(event) {
						// called when media returned from the camera
						Ti.API.debug('Our type was: '+event.mediaType);
						if(event.mediaType == Ti.Media.MEDIA_TYPE_PHOTO) {
							// store image in file
							var imagePath = Ti.Filesystem.applicationDataDirectory + filename;
							var f = Ti.Filesystem.getFile(imagePath);
							f.write(event.media);	// write to the file
							
							// update image URL in database
							db.addPhoto(person.id, imagePath);
							
							// update photo on detail view
							viewPhoto.image = event.media
						} else {
							alert("got the wrong type back ="+event.mediaType);
						}
					},
					cancel:function() {
						// called when user cancels taking a picture
					},
					error:function(error) {
						// called when there's an error
						var a = Titanium.UI.createAlertDialog({title:'Camera'});
						a.setMessage('Unexpected error: ' + error.code);
						a.show();
					},
					saveToPhotoGallery:false,
					allowEditing:true,
					mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
				});
			},
			saveToPhotoGallery:true,
			allowEditing:true,
			mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
		});
	});
	
	view.add(viewPhoto);
	view.add(lblStatus);
	view.add(viewHoriz);
	
	if (!person.captured) {
		// fugitive
		
		var btnCapture = Ti.UI.createButton({
			title:L('Capture'),
			top:10,
			width:200,
			font: {fontSize: '14dp'},
			height: '28dp'
		});
		
		var bustedResponder = function (e) {
			var response = JSON.parse(this.responseText);
			alert(response.message);
		};
		
		btnCapture.addEventListener('click', function(e) {
			var DB = require('/lib/db');
			var db = new DB();
			
			
			if (Ti.Geolocation.locationServicesEnabled) {
				var osname = Ti.Platform.getOsname();
				
				// platform specific geolocation handling
				if (osname === 'iphone') {
					// set to a message meaningful to users
					Ti.Geolocation.purpose = 'Store Location of Captured Fugitive';
					
					Ti.Geolocation.setAccuracy(Ti.Geolocation.ACCURACY_BEST);			
				} else if (osname === 'android') {
					Ti.Geolocation.setAccuracy(Ti.Geolocation.ACCURACY_HIGH);								
				} else {
					Ti.API.debug('Unsupported platform: ' + osname);
				}
				
				Ti.Geolocation.getCurrentPosition(function (e) {
					if (!e.error) {				
						Ti.API.log('got lat/lon: ' + e.coords.latitude.toString() + '/' + e.coords.longitude.toString());
					    db.bust(person.id, e.coords.latitude, e.coords.longitude);
						
						var Network = require('/lib/network');
						var network = new Network();
						network.bustFugitive(Ti.Platform.getMacaddress(), bustedResponder);
					} else {
						alert ('Geolocation Error: ' + e.error);
						//Ti.API.debug('Error: ' + e.error);
					}
									
					win.close();							
				});
			} else {
			    alert('Location services disabled - using default location');
			    
			    // East Brunswick, NJ - 40.4342° N, 74.4050° W
			    db.bust(person.id, 40.4342, -74.4050);

				var Network = require('/lib/network');
				var network = new Network();
				network.bustFugitive(Ti.Platform.getMacaddress(), bustedResponder);
	
				win.close();
			}
		});
		
		view.add(btnCapture);
	} else {
		// captured
		
		var btnShowMap = Ti.UI.createButton({
			title:L('ShowOnMap'),
			top:10,
			width:200,
			font: {fontSize: '14dp'},
			height: '28dp'
		});
		
		view.add(btnShowMap);

		var btnBrag = Ti.UI.createButton({
			title:L('LogInToBrag'),
			top:10,
			width:200,
			font: {fontSize: '14dp'},
			height: '28dp'
		});
		
		view.add(btnBrag);

		btnShowMap.addEventListener('click', function(e) {
			// instantiate map object			
			var MapWin = require('/ui/common/MapWindow');
			var mapWin = new MapWin(person);
			
			// open map window with tab as parent
			parentTab.open(mapWin, {animated:true});
		});

		// Require the ACS modules
		var acs = require('lib/acs');
		
		if(acs.isLoggedIn()) {
			// if logged in, the button's title is "Brag"
			btnBrag.title = L('Brag');
		}
		
		btnBrag.addEventListener('click', function() {
			if (acs.isLoggedIn() == false) {
				// if not logged in, show the login window
				var LoginWin = require('ui/common/LoginWindow');
				var loginwindow = new LoginWin;
				
				parentTab.open(loginwindow);
				
				// we must use a callback, because ACS functions are asynchronous
				loginwindow.addEventListener('close', function(){
					if(acs.isLoggedIn()) {
						btnBrag.title = L('Brag');
						addListBragsButton();
					}
				});
			} else {
				// otherwise, show the message window
				var msgWin = require('ui/common/MessageWindow').messageWindow(person.title);
				parentTab.open(msgWin);
			}
		});

		var listBragsButtonAdded = false;
		
		function addListBragsButton() {
			if(!listBragsButtonAdded) {
				// if logged in, add a "list brags" button to the window
				if(acs.isLoggedIn()) {
					var listBragsButton = Ti.UI.createButton({
						title:L('ListBrags'),
						top:10,
						height:Ti.UI.SIZE,
						width:200,
						font: {fontSize: '14dp'},
						height: '28dp'
					});
					
					listBragsButton.addEventListener('click', function() {
							// open the brags list window
							var BragsWindow = require('ui/common/BragsWindow');
							parentTab.open(new BragsWindow);
					});
					
					view.add(listBragsButton);
					
					listBragsButtonAdded = true;		
				}
			}
		}
		
		addListBragsButton();
	}
	
	win.add(view);
	
	return win;
};

module.exports = makeWindow;