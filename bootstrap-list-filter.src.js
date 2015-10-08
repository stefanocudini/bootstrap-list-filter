
(function($) {
	$.fn.btsListFilter = function(inputEl, opts) {

		'use strict';
		
		var self = this,
			searchlist$ = $(this),
			inputEl$ = $(inputEl),
			cancelEl$,
			items$ = searchlist$,
			callData,
			callReq;	//last callData execution

		opts = $.extend({
			delay: 300,
			minLength: 1,
			initial: true,
			casesensitive: false,
			eventKey: 'keyup',
			resetOnBlur: true,
			sourceData: null,
			sourceTmpl: '<a class="list-group-item" href="#"><span>{title}</span></a>',
			sourceNode: function(data) {
				return tmpl(opts.sourceTmpl, data);
			},
			emptyNode: function(data) {
				return '<a class="list-group-item well" href="#"><span>No Results</span></a>';
			},
			itemClassTmp: 'bts-dynamic-item',
			itemEl: '.list-group-item',
			itemChild: null,
			itemFilter: function(item, val) {
				//val = val.replace(new RegExp("^[.]$|[\[\]|()*]",'g'),'');
				//val = val.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
				val = val && val.replace(new RegExp("[({[^.$*+?\\\]})]","g"),'');
				
				var text = $(item).text(),
					i = opts.initial?'^':'',
					regSearch = new RegExp(i + val, opts.casesensitive?'':'i');
				return regSearch.test( text );
			},
			cancelNode: function() {
				return '<span class="btn glyphicon glyphicon-remove form-control-feedback" aria-hidden="true"></span>';
			}
		}, opts);	

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

		self.reset = function() {
			inputEl$.val('').trigger(opts.eventKey);
		};

		if($.isFunction(opts.cancelNode)) {

			cancelEl$ = $(opts.cancelNode.call(self));

			inputEl$.after( cancelEl$ );
			inputEl$.parents('.form-group').addClass('has-feedback');
			
			if(!inputEl$.prev().is('.control-label'))
				cancelEl$.css({top: 0})

			cancelEl$.on('click', self.reset);
		}

		inputEl$.on(opts.eventKey, debouncer(function(e) {
			
			var val = $(this).val();

			if(opts.itemEl)
				items$ = searchlist$.find(opts.itemEl);

			if(opts.itemChild)
				items$ = items$.find(opts.itemChild);

			var contains = items$.filter(function(){
					return opts.itemFilter.call(self, this, val);
				}),
				containsNot = items$.not(contains);

			if (opts.itemChild){
				contains = contains.parents(opts.itemEl);
				containsNot = containsNot.parents(opts.itemEl).hide();
			}

			if(val!=='' && val.length >= opts.minLength)
			{
				contains.show();
				containsNot.hide();

				if($.type(opts.sourceData)==='function')
				{
					contains.hide();
					containsNot.hide();
					
					if(callReq)
					{
						if($.isFunction(callReq.abort))
							callReq.abort();
						else if($.isFunction(callReq.stop))
							callReq.stop();
					}
					
					callReq = opts.sourceData.call(self, val, function(data) {
						callReq = null;
						contains.hide();
						containsNot.hide();
						searchlist$.find('.'+opts.itemClassTmp).remove();
						

						if(!data || data.length===0)
							$( opts.emptyNode.call(self) ).addClass(opts.itemClassTmp).appendTo(searchlist$);
						else
							for(var i in data)
								$( opts.sourceNode.call(self, data[i]) ).addClass(opts.itemClassTmp).appendTo(searchlist$);
					});
				} 
				else {
                    searchlist$.find('.'+opts.itemClassTmp).remove();
                    
                    if(contains.length===0)
						$( opts.emptyNode.call(self) ).addClass(opts.itemClassTmp).appendTo(searchlist$);
				}

			}
			else
			{
				contains.show();
				containsNot.show();
				searchlist$.find('.'+opts.itemClassTmp).remove();
			}
		}, opts.delay));

		if(opts.resetOnBlur)
			inputEl$.on('blur', function(e) {
				self.reset();
			});

		return searchlist$;
	};

})(jQuery);
