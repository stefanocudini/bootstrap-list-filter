Package.describe({
	version: "0.2.6",
	name: "stefcud:bootstrap-list-filter",
	summary: "bootstrap-list-filter",
	git: "https://github.com/stefanocudini/bootstrap-list-filter.git"
});

Package.on_use(function (api, where) {
	api.use('twbs:bootstrap', 'client');
	api.addFiles('bootstrap-list-filter.min.js', 'client');
});
