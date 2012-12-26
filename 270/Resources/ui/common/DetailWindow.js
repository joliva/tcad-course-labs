'use strict';

var makeWindow = function(person) {		
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
		top:15,
		//width:200,
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

	var btnPhoto = Ti.UI.createButton({
		title:L('AddPhoto'),
		top:20,
		width:200
	});
	
	var btnDelete = Ti.UI.createButton({
		title:L('Delete'),
		top:10,
		width:200
	});
	
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
		
		// check if camera is supported, if not then show photo gallery	
		if (Ti.Media.getIsCameraSupported() === true) {
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
					// called when there's an error
					var a = Titanium.UI.createAlertDialog({title:'Camera'});
					a.setMessage('Unexpected error: ' + error.code);
					a.show();
				},
				saveToPhotoGallery:true,
				allowEditing:true,
				mediaTypes:[Ti.Media.MEDIA_TYPE_PHOTO]
			});
		} else { // no camera supported - show photos
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
		}
	});
	
	view.add(viewPhoto);
	view.add(lblStatus);
	view.add(btnPhoto);
	view.add(btnDelete);
	
	if (!person.captured){
		var btnCapture = Ti.UI.createButton({
			title:L('Capture'),
			top:10,
			width:200
		});
		
		var bustedResponder = function (e) {
			var response = JSON.parse(this.responseText);
			alert(response.message);
		};
		
		btnCapture.addEventListener('click', function(e) {
			var DB = require('/lib/db');
			var db = new DB();
			//Ti.API.log('busted ' + person.id.toString());
			db.bust(person.id);
			
			var Network = require('/lib/network');
			var network = new Network();
			network.bustFugitive(Ti.Platform.getMacaddress(), bustedResponder);

			win.close();
		});
		
		view.add(btnCapture);
	}
	
	win.add(view);
	
	return win;
};

module.exports = makeWindow;