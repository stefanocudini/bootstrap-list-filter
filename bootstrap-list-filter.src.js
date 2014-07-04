
jQuery.fn.btsListFilter = function(inputEl, options){
	
	var $ = jQuery,
		searchlist$ = $(this),
		inputEl$ = $(inputEl),
		items$ = searchlist$,
		callData;

	options = $.extend({
		source: null,
		eventKey: 'keyup',		
		itemEl: '.list-group-item',
		itemChild: null,
		itemTmpl: '<a class="list-group-item" href="#"><span>{title}</span></a>',
		itemFilter: function(item, val) {
			return $(item).text().toUpperCase().indexOf(val.toUpperCase()) >= 0;
		}
	}, options);		

	if(options.itemEl)
		items$ = searchlist$.find(options.itemEl);

	if(options.itemChild)
		items$ = items$.find(options.itemChild);

	function tmpl(str, data) {
		return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
			return data[key] || '';
			// if (value === undefined) {
			// 	throw new Error('No value provided for variable ' + str);
			// } else if (typeof value === 'function') {
			// 	value = value(data);
			// }
			//return value;
		});
	}
		//TODO debouncer: function(func, timeout) {
		// 	//esegue func alla fine del resize window  http://goo.gl/HGKwy
		// 	var timeoutID;
		// 	timeout = timeout || 300;
		// 	return function () {
		// 		var scope = this , args = arguments;
		// 		clearTimeout( timeoutID );
		// 		timeoutID = setTimeout( function () {
		// 			func.apply( scope , Array.prototype.slice.call( args ) );
		// 		}, timeout);
		// 	}
		// },
	//TODO support for source url or array fo data
	// switch($.type(options.source))
	// {
	// 	case 'function':
	// 		callData = options.source;
	// 	break;
	// 	// case 'array':
	// 	// break;
	// 	// // case 'string':
	// 	// // 	options.source = function(text,callback) { $.get('search.php?q='+text, callback); };
	// 	// // break;
	// 	// case 'null':
	// 	// case 'undefined':
	// 	// default:
	// }

	inputEl$.on(options.eventKey, function(e) {
		
		var text = $(this).val();

		var contains = items$.filter(function(){
				return options.itemFilter(this, text);
			}),
			containsNot = items$.not(contains);

		if (options.itemChild){
			contains = contains.parents(options.itemEl);
			containsNot = containsNot.parents(options.itemEl).hide();
		}

		contains.show();
		containsNot.hide();

		if(text!=='' && $.type(options.source)==='function')
		{
			contains.hide();
			containsNot.hide();
			options.source.call(this, text, function(data) {
				contains.hide();
				containsNot.hide();
				searchlist$.find('.bts-dynamic-item').remove();
				for(var i in data)
				{
					var itemHtml = tmpl(options.itemTmpl, data[i]);
					if(itemHtml)
						$(itemHtml).addClass('bts-dynamic-item').appendTo(searchlist$);
				}
			});
		}

		if (text === '') {
			contains.show();
			containsNot.show();
			searchlist$.find('.bts-dynamic-item').remove();
		}
	});

	return searchlist$;
};