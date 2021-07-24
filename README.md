Bootstrap List Filter
============

[![npm version](https://badge.fury.io/js/bootstrap-list-filter.svg)](https://badge.fury.io/js/bootstrap-list-filter)


Search widget to filter Bootstrap lists

**Compatible with Bootstrap 3.3.7!**

Author: Stefano Cudini [opengeo.tech](https://opengeo.tech/)

**Demo online:**
* [Homepage](https://opengeo.tech/bootstrap-list-filter/)
* [Static example](https://opengeo.tech/bootstrap-list-filter/examples/static.html)
* [Ajax example](https://opengeo.tech/bootstrap-list-filter/examples/dynamic-list-search.html)
* [Custom items example](https://opengeo.tech/bootstrap-list-filter/examples/custom-list-item.html)

**Features:**
* complete mobile responsive
* support preloaded list
* custom html or node html item
* custom data format
* prevent parallel requests
* filter by sub elements
* search text in case sensitive


# Options:
* **delay:**       millisecond before apply filter
* **minLength:**   min string lentgh searched
* **initial:**     search only initial text (default: true)
* **eventKey:**    event digit (default: 'keyup')
* **resetOnBlur:** auto reset selection
* **sourceData:**  function generate data source(receive: text, callback)
* **sourceTmpl:**  html template contains {title} placeholder
* **sourceNode:**  function builder DOM html fragment (default: sourceTmpl)
* **emptyNode:**   function builder for empty result
* **itemEl:**      item selector (default: .list-group-item)
* **itemChild:**   sub item selector (default: .list-group-item)
* **itemFilter:**  function for filter results(receive: text, item)

# Source
* [Github](https://github.com/stefanocudini/bootstrap-list-filter)
* [NPM](https://npmjs.org/package/bootstrap-list-filter)  

![Image](https://raw.githubusercontent.com/stefanocudini/bootstrap-list-filter/master/images/bootstrap-list-filter.png)

# Usage
```html
<form role="form">
	<div class="form-group">
		<input id="searchinput" class="form-control" type="search" placeholder="Search..." />
	</div>
	<div id="searchlist" class="list-group">
		<a class="list-group-item" href="blue.html"><span>blue</span></a>
		...
	</div>
</form>
<script>
	$('#searchlist').btsListFilter('#searchinput', {itemChild: 'span'});
</script>
```
