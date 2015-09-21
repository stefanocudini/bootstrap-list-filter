Package.describe({
	version: "0.2.2",
	name: "bootstrap-list-filter",
	summary: "bootstrap-list-filter"
});

Package.on_use(function (api, where) {
	api.use('bootstrap-3', 'client');
	api.add_files('bootstrap-list-filter.min.js', 'client');
});
