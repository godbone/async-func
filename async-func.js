function countobj(obj) {
	var count = 0;
	for(var i in obj) {
		if (obj.hasOwnProperty(i)) {
			count++;
		}
	}
	return count;
}

function loadall_obj(calls, callback) {
	var result = {};
	for(var i in calls) {
		(function(func, name, subcallback) {
			func(function(data) {
				subcallback(data, name);
			});
		})(calls[i], i, function(data, name) {
			result[name] = data;
			if(countobj(result) == countobj(calls)) callback(result);
		});
	}
}

function loadall_arr(calls, callback) {
	var result = [];
	for(var i in calls) {
		(function(func, pos, subcallback) {
			func(function(data) {
				subcallback(data, pos);
			});
		})(calls[i], i, function(data, pos) {
			result[pos] = data;
			if(countobj(result) == calls.length) callback(result);
		});
	}
}

function mainfunc(calls, callback) {
	if(Array.isArray(calls)) {
		loadall_arr(calls, callback);
	}
	else {
		loadall_obj(calls, callback);
	}

}

module.exports = mainfunc;