function JSONObject(_url, _callback, _error) {
	this.request = new XMLHttpRequest();
	this.request.open('GET', _url);

	this.request.onload =  function(_data) {
		  if (this.status >= 200 && this.status < 400) {
			// Success!
			var _data;// = JSON.parse(this.response || this.responeText);
			try {
			_data = JSON.parse(this.response); // New 3DS
			} catch (e) {
				_data = JSON.parse(this.responseText); //Old 3DS
			}
			_callback(_data);
		  } else {
			// We reached our target server, but it returned an error
			_error(this.response);
		  }
		};
	
	this.request.onerror = _error;
	
	this.request.send();
}