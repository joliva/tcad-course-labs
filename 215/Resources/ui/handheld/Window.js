var makeWindow = function(isFugitive) {
	return Ti.UI.createWindow({
		title:isFugitive ? L('Fugitives') : L('Captured'),
		backgroundImage:'grain.png'
	});
};

module.exports = makeWindow;
