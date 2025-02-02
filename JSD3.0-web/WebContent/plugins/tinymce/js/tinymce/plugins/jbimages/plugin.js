tinymce.PluginManager.add('jbimages', function(editor, url) {
	function jbBox() {
		editor.windowManager.open({
			title: '上传图片',
			file : url + '/dialog-v4.htm',
			width : 350,
			height: 135,
			buttons: [{
				text: 'Upload',
				classes:'widget btn primary first abs-layout-item',
				disabled : true,
				onclick: 'close'
			},
			{
				text: 'Close',
				onclick: 'close'
			}]
		});
	}
	
	editor.addButton('jbimages', {
		tooltip: '上传图片',
		icon : 'image',
		text: 'Upload',
		onclick: jbBox
	});

	editor.addMenuItem('jbimages', {
		text: 'Upload image',
		icon : 'image',
		context: 'insert',
		onclick: jbBox
	});
});