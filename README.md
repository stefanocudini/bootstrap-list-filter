Bootstrap List Filter
============

Search widget to filter Bootstrap lists

**Features**
* complete mobile responsive
* dynamic list generation
* support preloaded list
* custom html template
* custom data format
* filter by sub elements

*Compatible with Bootstrap 3!*

**Demo online:**
* [Static filter](http://labs.easyblog.it/bootstrap-list-filter/examples/static.html)
* [Ajax search](http://labs.easyblog.it/bootstrap-list-filter/examples/dynamic-list-search.html)


![Image](https://raw.githubusercontent.com/stefanocudini/bootstrap-list-filter/master/images/bootstrap-list-filter.png)

#Usage
```html
<form role="form">
	<div class="form-group">
		<input id="searchinput" class="form-control" type="search" placeholder="Search..." />
	</div>
	<div id="searchlist" class="list-group">
		<a class="list-group-item" href="aquamarine.html"><span>aquamarine</span></a>
		<a class="list-group-item" href="blue.html"><span>blue</span></a>
		<a class="list-group-item" href="cyan.html"><span>cyan</span></a>
		...
	</div>
</form>
<script>
	$('#searchlist').btsListFilter('#searchinput', {itemChild: 'span'});
</script>
```

#Source
* [Github](https://github.com/stefanocudini/bootstrap-list-filter)
* [NPM](https://npmjs.org/package/bootstrap-list-filter)  
* [Atmosphere](https://atmosphere.meteor.com/package/bootstrap-list-filter)
