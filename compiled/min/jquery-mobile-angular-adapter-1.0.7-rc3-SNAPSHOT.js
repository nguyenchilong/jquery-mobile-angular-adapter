(function(a){function b(a,b,c){var d=a[b];a[b]=function(){return c(d,this,arguments)}}b(a.mobile.selectmenu.prototype,"destroy",function(a,b,c){a.apply(b,c);var d=b.menuPage,e=b.screen,f=b.listbox;d&&d.remove(),e&&e.remove(),f&&f.remove()}),b(a.mobile.listview.prototype,"destroy",function(b,c,d){var e=c.element.attr("id"),f=new RegExp(a.mobile.subPageUrlKey+"="+e+"-"),g=c.childPages();b.apply(c,d);for(var h=0;h<g.length;h++){var i=a(g[h]),j=i.attr("data-url");j.match(f)&&i.remove()}}),a.fn.controlgroup&&a(document).bind("pagecreate create",function(b){a(":jqmData(role='controlgroup')",b.target).jqmEnhanceable().controlgroup({excludeInvisible:!1})}),b(a.fn,"controlgroup",function(a,b,c){if(b.filter(":visible").length===0){var d=c[0]||{};return d.excludeInvisible=!1,a.call(b,d)}return a.apply(b,c)})})(window.jQuery),function(a){var b=a.module("ng");b.config(["$provide",function(a){a.decorator("$rootScope",["$delegate",function(a){return a.$disconnect=function(){if(this.$root==this)return;var a=this.$parent;this.$$disconnected=!0,a.$$childHead==this&&(a.$$childHead=this.$$nextSibling),a.$$childTail==this&&(a.$$childTail=this.$$prevSibling),this.$$prevSibling&&(this.$$prevSibling.$$nextSibling=this.$$nextSibling),this.$$nextSibling&&(this.$$nextSibling.$$prevSibling=this.$$prevSibling),this.$$nextSibling=this.$$prevSibling=null},a.$reconnect=function(){if(this.$root==this)return;var a=this;if(!a.$$disconnected)return;var b=a.$parent;a.$$disconnected=!1,a.$$prevSibling=b.$$childTail,b.$$childHead?(b.$$childTail.$$nextSibling=a,b.$$childTail=a):b.$$childHead=b.$$childTail=a},a}])}])}(window.angular),function(a){var b=a.module("ng");b.config(["$provide",function(a){a.decorator("$rootScope",["$delegate",function(a){var b=a.$apply;a.$apply=function(){return a.$$phase?a.$eval.apply(this,arguments):b.apply(this,arguments)};var c=!1,d=a.$digest;return a.$digest=function(){if(a.$$phase)return;var b=d.apply(this,arguments)},a}])}])}(window.angular),function(a,b){function e(a,b){if(!b)return d[a];var c=d[a];d[a]=!0;var e=b();return d[a]=c,e}function f(a){return e("preventJqmWidgetCreation",a)}function g(a){return e("markJqmWidgetCreation",a)}function h(b){f(function(){var c=a.mobile.page.prototype.widgetEventPrefix;a.mobile.page.prototype.widgetEventPrefix="noop",b.page(),a.mobile.page.prototype.widgetEventPrefix=c})}function n(a){for(var b=0;b<a.length;b++)c.directive(a[b],function(){return k}),c.directive(a[b],function(){return m}),c.directive(a[b],function(){return l})}function o(b,c){a.fn.orig[b]=a.fn.orig[b]||a.fn[b],a.fn[b]=c}function p(b){o(b,function(){if(g())for(var c=0;c<this.length;c++){var d=this.eq(c),e=d,h=d,i={widgetElement:e,linkElement:h,create:a.fn.orig[b]};q[b].precompile&&(q[b].precompile(i),e=i.widgetElement,h=i.linkElement);var j=e.data("jqm-widgets");j||(j=[],e.data("jqm-widgets",j));var k=h.data("jqm-linkers");k||(k=[],h.data("jqm-linkers",k));var l=!1;for(var m=0;m<j.length;m++)if(j[m].name==b){l=!0;break}l||(j.push({name:b,args:Array.prototype.slice.call(arguments),create:i.create}),k.push(q[b].link))}return f()?!1:a.fn.orig[b].apply(this,arguments)})}var c=b.module("ng");a("div").live("pagebeforeshow",function(b,c){var d=a(b.target),e=d.scope();e&&e.$root.$digest()}),c.config(["$provide",function(b){b.decorator("$rootScope",["$delegate",function(b){var c=b.$digest,d;return b.$digest=function(){if(this===b){var e=a.mobile.activePage,f=e&&e.scope();d&&d!==f&&d.$disconnect(),d=f,f&&f.$reconnect()}var g=c.apply(this,arguments);if(this===b){var h=j.length;while(j.length){var k=j.shift();k.$disconnect()}h&&!i&&(i=!0,a.mobile.initializePage())}return g},b}])}]);var d={};a.mobile.autoInitializePage=!1;var i=!1,j=[],k={restrict:"EA",priority:1e5,compile:function(a,b){if(a[0].preProcessDirective)return;a[0].preProcessDirective=!0;var c=b.role,d=c=="page"||c=="dialog";g(function(){f(function(){d?a.page():a[0].jqmEnhanced||a.parent().trigger("create");var b=a[0].getElementsByTagName("*");for(var c=0;c<b.length;c++)b.item(c).jqmEnhanced=!0;a[0].jqmEnhanced=!0})}),d&&a.page("destroy")}},l={restrict:"EA",priority:0,scope:!1,require:["?ngModel"],compile:function(a,b){if(a[0].widgetDirective)return;a[0].widgetDirective=!0;var c=b.role,d=c=="page"||c=="dialog",e=a.data("jqm-widgets"),f=a.data("jqm-linkers");return{pre:function(a,b,c){d&&(h(b),j.push(a))},post:function(a,b,c,d){if(e&&e.length){var g;for(var h=0;h<e.length;h++)g=e[h],g.create.apply(b,g.args)}if(f)for(var h=0;h<f.length;h++)f[h].apply(this,arguments)}}}},m={restrict:l.restrict,priority:l.priority+1,compile:function(a,b){l.scope=b.role=="page"||b.role=="dialog"}};n(["div","role","input","select","button","textarea","fieldset"]),a.fn.orig={},c.run(["$rootScope","$compile",function(b,c){o("page",function(){return!f()&&!this.data("page")&&this.attr("data-"+a.mobile.ns+"external-page")&&c(this)(b),a.fn.orig.page.apply(this,arguments)})}]);var q={};a.mobile.registerJqmNgWidget=function(a,b,c){q[a]={precompile:b,link:c},p(a)}}(window.jQuery,window.angular),function(a,b){function d(a,b){return function(){var c=Array.prototype.slice.call(arguments);c.unshift(a);for(var d=0;d<b.length;d++)b[d].apply(this,c)}}function g(a){var c=a.widgetElement,d=b(c).closest("label"),e=d.length?d:b(c).closest("form,fieldset,:jqmData(role='page'),:jqmData(role='dialog')").find("label").filter("[for='"+c[0].id+"']"),f=b("<div></div>").insertBefore(c).append(c).append(e);a.widgetElement=c.parent(),m(c,a.widgetElement),a.create=function(){var a=b.fn.wrapAll,d=this.children("input"),e=this;b.fn.wrapAll=function(f){if(this[0]===d[0]){b.fn.wrapAll=a;var g=b(f);return e[0].className=g[0].className,c}return a.apply(this,arguments)};var f=b.fn.orig.checkboxradio.apply(d,arguments);return b.fn.wrapAll=a,f}}function h(a){var c=a.widgetElement;c.wrapAll("<div></div>");var d=a.widgetElement=a.widgetElement.parent();m(c,d),a.create=function(){return b.fn.orig.slider.apply(this.children().eq(0),arguments)}}function i(a){var c=a.widgetElement,d=b("<div></div>").text(c.text()||c.val()).insertBefore(c).append(c);m(c,d),a.widgetElement=d,a.create=function(){var a=this,c=this.children().eq(0),d=b.fn.text;b.fn.text=function(){return arguments.length>0?(b.fn.text=d,a):d.apply(this,arguments)};var e=b.fn.insertBefore;b.fn.insertBefore=function(b){return this[0]===a[0]&&b[0]===c[0]?a:e.apply(this,arguments)};var f=b.fn.orig.button.apply(c,arguments);return b.fn.text=d,b.fn.insertBefore=e,f}}function j(a){var c=a.widgetElement,d=b("<div></div>").insertBefore(c).append(c);m(c,d),a.widgetElement=d,a.create=function(){var a=this,c=this.children().eq(0),d=b.fn.wrap;b.fn.wrap=function(e){if(this[0]===c[0]){b.fn.wrap=d;var f=b(e);return a[0].className=f[0].className,c}return d.apply(this,arguments)};var e=b.fn.orig.selectmenu.apply(c,arguments);return b.fn.wrap=d,e}}function k(a){var c=a.widgetElement;if(!c.is("[type='search'],:jqmData(type='search')"))return;var d=b("<div></div>").insertBefore(c).append(c);m(c,d),a.widgetElement=d,a.create=function(){var a=this,c=this.children().eq(0),d=b.fn.wrap;b.fn.wrap=function(e){if(this[0]===c[0]){b.fn.wrap=d;var f=b(e);return a[0].className=f[0].className,c}return d.apply(this,arguments)};var e=b.fn.orig.textinput.apply(c,arguments);return b.fn.wrap=d,e}}function m(a,b){var c=[],d=a[0],e=b[0],f=d.attributes,g=f&&f.length;if(g)for(var h,i,j=g-1;j>=0;j--)h=f[j],i=h.name,l.test(i)&&(d.removeAttributeNode(h),e.setAttributeNode(h));var k="",m=d.className,n;m&&(m=m.replace(/[^;]+;?/,function(a){return l.test(a)?(k+=a,""):a})),k&&(e.className=k,d.className=m)}function n(a,b,c,d,e){d.$observe("disabled",function(b){b?c[a]("disable"):c[a]("enable")})}function o(a,b,c){var d="_listeners"+b;if(!a[d]){a[d]=[];var e=a[b];a[b]=function(){var b=e.apply(this,arguments);for(var c=0;c<a[d].length;c++)a[d][c]();return b}}a[d].push(c)}function p(a,b,c,d,e){var f=e[0];f&&o(f,"$render",function(){s(a,b,c,"refresh")})}function q(a,b,c,d,e){c.bind("$childrenChanged",function(){s(a,b,c,{})})}function r(a,b,c,d,e){c.bind("$childrenChanged",function(){s(a,b,c,"refresh")})}function s(a,b,c,d){var e="_refresh"+a;b[e]=b[e]+1||1,b.$evalAsync(function(){b[e]--,b[e]===0&&c[a](d)})}var c={button:{handlers:[n],precompile:i},collapsible:{handlers:[n]},textinput:{handlers:[n],precompile:k},checkboxradio:{handlers:[n,p],precompile:g},slider:{handlers:[n,p],precompile:h},listview:{handlers:[r]},collapsibleset:{handlers:[r]},selectmenu:{handlers:[n,p,r],precompile:j},controlgroup:{handlers:[q]},navbar:{handlers:[]},dialog:{handlers:[]},fixedtoolbar:{handlers:[]}},e;for(var f in c)e=c[f],b.mobile.registerJqmNgWidget(f,e.precompile,d(f,e.handlers));var l=/(^|[\W])(repeat|switch-when|if)($|[\W])/;b.mobile.moveCloningDirectives=m}(window.angular,window.jQuery),function(a,b){function d(a){a.onHashChange=function(a){return b(window).bind("hashchange",a),a};var c=location.href;a.url=function(a){return a&&(c=a),c}}var c=a.module("ng");d.$inject=["$browser"],c.run(d)}(window.angular,window.jQuery),function(a,b){function c(a,b){if(!!a^!!b)return!1;for(var c in a)if(b[c]!==a[c])return!1;for(var c in b)if(b[c]!==a[c])return!1;return!0}function d(a){if(!a)return a;var b;a.length?b=[]:b={};for(var c in a)b[c]=a[c];return b}var e=b.module("ng");e.directive("ngRepeat",function(){return{priority:1e3,compile:function(a,b,e){return{pre:function(a,b,e){var f=e.ngRepeat,g=f.match(/^.+in\s+(.*)\s*$/);if(!g)throw Error("Expected ngRepeat in form of '_item_ in _collection_' but got '"+f+"'.");var h=g[1],i,j=0;a.$watch(function(){var b=a.$eval(h);return c(b,i)||(i=d(b),j++),j},function(){b.parent().trigger("$childrenChanged")})}}}}})}(window.jQuery,window.angular),function(a,b){function c(a){var b=[];for(var c in a)a.hasOwnProperty(c)&&b.push(c);return b.sort()}var d=/^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/,e=b.module("ng");e.directive("ngOptions",["$parse",function(a){return{require:["select","?ngModel"],link:function(b,e,f,g){function p(){var a=[],d,e=o(b)||[],f=l?c(e):e,g,h,i={};for(h=0;g=f.length,h<g;h++){var n=e[h];i[k]=e[l?i[l]=f[h]:h],d=m(b,i),a.push({id:l?f[h]:h,label:j(b,i),optionGroup:d})}return a}if(!g[1])return;var h,i=f.ngOptions;if(!(h=i.match(d)))throw Error("Expected ngOptions in form of '_select_ (as _label_)? for (_key_,)?_value_ in _collection_' but got '"+i+"'.");var j=a(h[2]||h[1]),k=h[4]||h[6],l=h[5],m=a(h[3]||""),n=a(h[2]?h[1]:k),o=a(h[7]);b.$watch(p,function(){e.trigger("$childrenChanged")},!0)}}}])}(window.jQuery,window.angular),function(a){var b=a.module("ng");b.directive("option",["$interpolate",function(a){return{restrict:"E",compile:function(b,c){var d=a(b.text(),!0),e=a(b.attr("value"),!0);return function(a,b,c){a.$watch(d,function(){b.trigger("$childrenChanged")}),a.$watch(e,function(){b.trigger("$childrenChanged")})}}}}])}(window.angular),function(a){var b=a.module("ng");b.directive("li",function(){return{restrict:"E",compile:function(a,b){return function(a,b,c){b.bind("$childrenChanged",function(){b.removeClass("ui-li");var a=b.data("buttonElements");if(a){var c=a.text;while(c.firstChild)b[0].appendChild(c.firstChild);$(a.inner).remove()}b.removeData("buttonElements")})}}}})}(window.angular),function(a){var b=a.module("ng");b.directive("ngSwitch",function(){return{restrict:"EA",compile:function(a,b){var c=b.ngSwitch||b.on;return function(a,b){a.$watch(c,function(a){b.trigger("$childrenChanged")})}}}})}(window.angular),function(a){var b=a.module("ng");b.directive("ngInclude",function(){return{restrict:"ECA",compile:function(a,b){var c=b.ngInclude||b.src;return function(a,b){a.$watch(c,function(a){b.trigger("$childrenChanged")}),a.$on("$includeContentLoaded",function(){b.trigger("$childrenChanged")})}}}})}(window.angular),function(a,b){var c=b.module("ng");c.directive("input",function(){return{restrict:"E",require:"?ngModel",compile:function(a,b){var c=a.attr("type");return{pre:function(a,b,d,e){if(!e)return;var f=[];c==="date"&&f.push("blur"),f.push("change");var g=b.bind;b.bind=function(a,b){if(a.indexOf("input")!=-1||a.indexOf("change")!=-1)for(var c=0;c<f.length;c++){var d=f[c];a.indexOf(d)===-1&&(a+=" "+d)}return g.call(this,a,b)}}}}}})}(window.jQuery,window.angular),function(a){var b={transclude:"element",priority:1e3,terminal:!0,compile:function(a,b,c){return function(a,b,d){b[0].doNotMove=!0;var e=d.ngmIf,f,g;a.$watch(e,function(d){d?(g=a.$new(),c(g,function(a){f=a,b.after(a)})):(f&&(f.remove(),f=null),g&&g.$destroy()),b.parent().trigger("$childrenChanged")})}}},c=a.module("ng");c.directive("ngmIf",function(){return b})}(window.angular),function(a){function c(a,b,c,d){b.bind(c,function(e){var f=a.$apply(d,b);c.charAt(0)=="v"&&e.preventDefault()})}function d(a,d){b.directive(a,function(){return function(b,e,f){var g=f[a];c(b,e,d,g)}})}var b=a.module("ng"),e={ngmTaphold:"taphold",ngmSwipe:"swipe",ngmSwiperight:"swiperight",ngmSwipeleft:"swipeleft",ngmPagebeforeshow:"pagebeforeshow",ngmPagebeforehide:"pagebeforehide",ngmPageshow:"pageshow",ngmPagehide:"pagehide",ngmClick:"vclick"};for(var f in e)d(f,e[f])}(window.angular),function(a,b){function c(a){var b=a.indexOf(":");return b===-1?[a]:[a.substring(0,b),a.substring(b+1)]}function d(){var b;a(document).on("pagebeforechange",function(a,c){typeof c.toPage=="object"&&(b=c.toPage)});var c=a.mobile.urlHistory,d=c.addNew;c.addNew=function(){var a=d.apply(this,arguments),e=c.stack[c.stack.length-1];return e.pageId=b.attr("id"),a}}function e(b){var c=a.mobile.urlHistory,d=c.activeIndex,e=a.mobile.urlHistory.stack;for(var f=e.length-1;f>=0;f--)if(f!==d&&e[f].pageId===b)return f-d;return undefined}function f(b,c){b&&a(document).one("pagebeforechange",function(d,e){function h(){var a=g.scope();a[b].apply(a,c)}var f=a.mobile.path.parseUrl(e.toPage),g=a("#"+f.hash.substring(1));if(!g.data("page")){g.one("pagecreate",h);return}h()})}function g(b,d){var g=Array.prototype.slice.call(arguments,2);f(d,g);var i;typeof b=="object"&&(i=b,b=i.target);var j=c(b),k=!1;j.length===2&&j[0]==="back"?(k=!0,b=j[1]):j.length===2&&(i={transition:j[0]},b=j[1]);if(b==="back"){window.history.go(-1);return}k?a.mobile.loadPage(b,{showLoadMsg:!0}).then(function(a,a,c){var d=e(c.attr("id"));d!==undefined?window.history.go(d):h(b,{reverse:!0})}):h(b,i)}function h(b,c){c?a.mobile.changePage(b,c):a.mobile.changePage(b)}d();var i=b.module("ng");return i.factory("$navigate",function(){return g}),g}(window.jQuery,window.angular),function(a){function c(a){return a[b]=a[b]||{}}function d(a,b,d,e){var f=c(a),g=f[b];return g||(g=a.$new(),d(b,{$scope:g}),f[b]=g,g.$$referenceCount=0),g.$$referenceCount++,e.bind("$destroy",function(){g.$$referenceCount--,g.$$referenceCount===0&&(g.$destroy(),delete f[b])}),g}function e(a){var b=/([^\s,:]+)\s*:\s*([^\s,:]+)/g,c,d=!1,e={};while(c=b.exec(a))d=!0,e[c[1]]=c[2];if(!d)throw"Expression "+a+" needs to have the syntax <name>:<controller>,...";return e}var b="$$sharedControllers",f=a.module("ng");f.directive("ngmSharedController",["$controller",function(a){return{scope:!0,compile:function(b,c){var f=c.ngmSharedController,g=e(f),h=function(c){for(var e in g)c[e]=d(c.$root,g[e],a,b)};return{pre:h}}}}])}(window.angular),function(a,b){function d(a){var b=c[c.length-1];b.callback&&o.$apply(function(){b.callback.apply(this,arguments)}),a.preventDefault()}function f(){if(!e||e.length==0)e=a(".ui-loader"),e.bind("vclick",d)}function g(){f();if(c.length>0){var b=c[c.length-1],d=b.msg,e=a.mobile.loadingMessage,g=a.mobile.loadingMessageTextVisible;d&&(a.mobile.loadingMessage=d,a.mobile.loadingMessageTextVisible=!0),a.mobile.showPageLoadingMsg(),a.mobile.loadingMessageTextVisible=g,a.mobile.loadingMessage=e}else a.mobile.hidePageLoadingMsg()}function h(){var a,b;typeof arguments[0]=="string"&&(a=arguments[0]),typeof arguments[0]=="function"&&(b=arguments[0]),typeof arguments[1]=="function"&&(b=arguments[1]),c.push({msg:a,callback:b}),g()}function i(){c.pop(),g()}function j(a,b){a.then(b,b)}function k(a,b){h(b),j(a,function(){i()})}function l(b,c,d){d||(d=a.mobile.loadingMessageWithCancel),h(d,function(){b.reject(c)}),j(b.promise,function(){i()})}var c=[],e;a.mobile.loadingMessageWithCancel||(a.mobile.loadingMessageWithCancel="Loading. Click to cancel."),a("div").live("pageshow",function(a,b){g()});var m={show:h,hide:i,waitFor:k,waitForWithCancel:l},n=b.module("ng"),o;return n.factory("$waitDialog",["$rootScope",function(a){return o=a,m}]),m}(window.jQuery,window.angular),function(a,b){function c(a,c,d){function e(e){function r(a){u(-1),i=a,j=[],k=!0,z()}function s(){var a=i;j=[].concat(a),l&&(a=c(a,l)),m&&(a=d(a,m)),n<h&&(n=h),n>a.length&&(n=a.length),o=a.length;var b=a.slice(0,n),e=[0,g.length].concat(b);g.splice.apply(g,e),g.refreshCount++}function t(){if(i.length!=j.length)k=!0;else for(var a=0;a<i.length;a++)if(i[a]!==j[a]){k=!0;break}return k&&(s(),k=!1),g}function u(b){if(!b||b<0)b=a;b!==h&&(h=b,k=!0)}function v(a){b.equals(l,a)||(l=a,k=!0)}function w(a){b.equals(m,a)||(m=a,k=!0)}function x(){n+=h,k=!0}function y(){return t(),n<o}function z(){n=0,k=!0}var f={refreshIfNeeded:t,setFilter:v,setOrderBy:w,setPageSize:u,loadNextPage:x,hasMorePages:y,reset:z,refreshCount:0},g=[],h,i,j,k,l,m,n,o;for(var p in f)g[p]=f[p];r(e);var q=g.hasOwnProperty;return g.hasOwnProperty=function(a){return a in f?!1:q.apply(this,arguments)},g}return function(a,b){if(!a)return a;var c=a.pagedList;if(typeof b=="string"){if(!c)return;if(b==="loadMore")c.loadNextPage();else if(b==="hasMore")return c.hasMorePages();return}return c||(c=e(a),a.pagedList=c),b&&(c.setPageSize(b.pageSize),c.setFilter(b.filter),c.setOrderBy(b.orderBy)),c.refreshIfNeeded(),c}}c.$inject=["defaultListPageSize","filterFilter","orderByFilter"];var d=b.module(["ng"]);d.constant("defaultListPageSize",10),d.filter("paged",c)}(window.jQuery,window.angular)