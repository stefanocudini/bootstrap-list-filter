
jQuery.fn.btsListFilter = function(inputEl, options){
	
	var $ = jQuery,
		searchlist$ = $(this),
		inputEl$ = $(inputEl),
		items$ = searchlist$,
		callData;

	function tmpl(str, data) {
		return str.replace(/\{ *([\w_]+) *\}/g, function (str, key) {
			return data[key] || '';
		});
	}

	function debouncer(func, timeout) {
		var timeoutID;
		timeout = timeout || 300;
		return function () {
			var scope = this , args = arguments;
			clearTimeout( timeoutID );
			timeoutID = setTimeout( function () {
				func.apply( scope , Array.prototype.slice.call( args ) );
			}, timeout);
		};
	}

	options = $.extend({
		delay: 300,
		source: null,
		minLength: 2,
		initial: true,
		eventKey: 'keyup',	
		itemEl: '.list-group-item',
		itemChild: null,
		itemTmpl: '<a class="list-group-item" href="#"><span>{title}</span></a>',
		itemNode: function(data) {
			return tmpl(options.itemTmpl, data);
		},
		itemFilter: function(item, val) {
			val = val.replace(new RegExp("^[.]$|[\[\]|()*]",'g'),'');
			var text = $(item).text(),
				i = options.initial ? '^' : '',
				regSearch = new RegExp(i + val,'i');
			return regSearch.test( text );
		}
	}, options);		

	if(options.itemEl)
		items$ = searchlist$.find(options.itemEl);

	if(options.itemChild)
		items$ = items$.find(options.itemChild);

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

	inputEl$.on(options.eventKey, debouncer(function(e) {
		
		var val = $(this).val();

		var contains = items$.filter(function(){
				return options.itemFilter(this, val);
			}),
			containsNot = items$.not(contains);

		if (options.itemChild){
			contains = contains.parents(options.itemEl);
			containsNot = containsNot.parents(options.itemEl).hide();
		}

		if(val!=='' && val.length >= options.minLength)
		{
			contains.show();
			containsNot.hide();

			if($.type(options.source)==='function')
			{
				contains.hide();
				containsNot.hide();
				options.source.call(this, val, function(data) {
					contains.hide();
					containsNot.hide();
					searchlist$.find('.bts-dynamic-item').remove();
					for(var i in data)
						$(options.itemNode(data[i])).addClass('bts-dynamic-item').appendTo(searchlist$);
				});
			}

		}
		else
		{
			contains.show();
			containsNot.show();
			searchlist$.find('.bts-dynamic-item').remove();
		}
	}, options.delay));

	return searchlist$;
};

