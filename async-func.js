function countobj(obj) {
	var count = 0;
	for(var i in obj) {
		if (obj.hasOwnProperty(i)) {
			count++;
		}
	}
	return count;
}

function loadall(calls, callback) {
	var result;
	var max;
	var count = 0;

	if(Array.isArray(calls)) {
		result = [];
		max = calls.length;
	}
	else {
		result = {};
		max = countobj(calls);
	}

	for(var i in calls) {
		(function(func, id, subcallback) {
			func(function(data) {
				subcallback(data, id);
			});
		})(calls[i], i, function(data, id) {
			count++;
			result[id] = data;
			if(count == max) callback(result);
		});
	}
}

module.exports = loadall;