Package.describe({
	summary: "bootstrap-list-filter"
});

Package.on_use(function (api, where) {
	api.use('jquery','client');
	api.add_files('bootstrap-list-filter.min.js', 'client');
});
