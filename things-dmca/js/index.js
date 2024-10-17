console.log("Hello, World");

// https://script.google.com/macros/s/AKfycbz_lzsemhiF6tY7icy4uKwuxA0JdqvWHxYQKZSvC2CP_CcUQ9e23p6pICtmsKW4lv0a/exec

$.getJSON("test/template/cloudheadrecords.json", function(data) {
	console.log(btoa(JSON.stringify(data)));
});