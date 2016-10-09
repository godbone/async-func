This small module waits for an array/object of functions with a callback variable to be done and returns the results when all are done.

Example functionality:
```
var wait = require("async-func");

//Set a random number generator for the async functions
function rand(a, b) {
	return Math.floor(Math.random()*(b-a+1)+a);
}

//First example function
function examplefunc1(callback) {
	setTimeout(function() {
		callback("firstfuncdata");
	}, rand(1, 1000));
}

//Another example function
function test3(data, callback) {
	setTimeout(function() {
		callback(data);
	}, rand(1, 1000));
}

//An object version of a list of async calls
var calls = {
	//Call a normal async function
	data1: examplefunc1,
	//Call an anonymous async function
	data2: function(callback) {
		setTimeout(function() {
			callback("test2");
		}, rand(1, 1000));
	},
	//Call an async function that needs parameters
	data3: function(callback) {
		test3("datahere_data3", callback);
	},
	//Call an anonymous async function that needs parameters
	data4: function(callback) {
		var param = "datahere_data4";

		(function(data, subcallback) {
			setTimeout(function() {
				subcallback(data);
			}, rand(1, 1000));
		})(param, callback);
	}
};

//An array version of a list of async calls
var calls2 = [
	//Call a normal async function
	examplefunc1,
	//Call an anonymous async function
	function(callback) {
		setTimeout(function() {
			callback("test2");
		}, rand(1, 1000));
	},
	//Call an async function that needs parameters
	function(callback) {
		test3("datahere_data3", callback);
	},
	//Call an anonymous async function that needs parameters
	function(callback) {
		var param = "datahere_data4";

		(function(data, subcallback) {
			setTimeout(function() {
				subcallback(data);
			}, rand(1, 1000));
		})(param, callback);
	}
];

//Calls can even be combined with each other
var calls3 = [
	function(callback) {
		wait(calls, callback);
	},
	function(callback) {
		wait(calls2, callback);
	}
];

wait(calls3, function(data) {
	data = JSON.stringify(data, null, 4);
	console.log(data);
});
```
The resulting callback would log something like this:
```
[
	{
		"data3": "datahere_data3",
		"data2": "test2",
		"data4": "datahere_data4",
		"data1": "firstfuncdata"
	},
	[
		"firstfuncdata",
		"test2",
		"datahere_data3",
		"datahere_data4"
	]
]
```