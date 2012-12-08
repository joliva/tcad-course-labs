var makeWindow = function() {
	return Ti.UI.createWindow({
		title:L('NewFugitive'),
		backgroundImage:'grain.png'
	});
};

module.exports = makeWindow;