	function shareArticleToPocket(id) {
		
	// Add in case browser does not support trim
	if(!String.prototype.trim) {
	  String.prototype.trim = function () {
		return this.replace(/^\s+|\s+$/g,'');
	  };
	}

	try {
		var query = "?op=pluginhandler&plugin=pocket&method=getInfo&id=" + param_escape(id);

		console.log(query);

		var d = new Date();
	        var ts = d.getTime();

		var w = window.open('backend.php?op=backend&method=loading', 'ttrss_tweet',
			"status=0,toolbar=0,location=0,width=500,height=400,scrollbars=1,menubar=0");

		new Ajax.Request("backend.php",	{
			parameters: query,
			onComplete: function(transport) {
				var ti = JSON.parse(transport.responseText);

				var share_url = "https://getpocket.com/save?" +
					"&title=" + param_escape(ti.title) +
					"&url=" + param_escape(ti.link.trim());

				w.location.href = share_url;

			} });


	} catch (e) {
		exception_error("tweetArticle", e);
	}
	}

