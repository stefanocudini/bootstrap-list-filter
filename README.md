Bootstrap List Filter
============

Search widget to filter Bootstrap lists

*Compatible with Bootstrap 3!*

Author: Stefano Cudini

[labs.easyblog.it](http://labs.easyblog.it/)

**Features:**
* complete mobile responsive
* dynamic list generation
* support preloaded list
* custom html and node item
* custom data format
* filter by sub elements

**Demo online:**
* [Homepage](http://labs.easyblog.it/bootstrap-list-filter/)
* [Static example](http://labs.easyblog.it/bootstrap-list-filter/examples/static.html)
* [Ajax example](http://labs.easyblog.it/bootstrap-list-filter/examples/dynamic-list-search.html)
* [Custom items example](http://labs.easyblog.it/bootstrap-list-filter/examples/custom-list-item.html)

#Source
* [Github](https://github.com/stefanocudini/bootstrap-list-filter)
* [NPM](https://npmjs.org/package/bootstrap-list-filter)  
* [Atmosphere](https://atmosphere.meteor.com/package/bootstrap-list-filter)


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
