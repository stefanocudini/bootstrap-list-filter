Package.describe({
	version: "0.2.5",
	name: "stefcud:bootstrap-list-filter",
	summary: "bootstrap-list-filter",
	git: "https://github.com/stefanocudini/bootstrap-list-filter.git"
});

Package.on_use(function (api, where) {
	api.use('bootstrap-3', 'client');
	api.addFiles('bootstrap-list-filter.min.js', 'client');
});
