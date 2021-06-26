/*!
* TableSorter (FORK) 2.19.1 min - Client-side table sorting with ease!
* Copyright (c) 2007 Christian Bach; fork maintained by Rob Garrison
*/
(function(h){"function"===typeof define&&define.amd?define(["jquery"],h):"object"===typeof module&&"object"===typeof module.exports?module.exports=h(require("jquery")):h(jQuery)})(function(h){h.extend({tablesorter:new function(){function e(){var b=arguments[0],a=1<arguments.length?Array.prototype.slice.call(arguments):b;if("undefined"!==typeof console&&"undefined"!==typeof console.log)console[/error/i.test(b)?"error":/warn/i.test(b)?"warn":"log"](a);else alert(a)}function w(b,a){e(b+" ("+((new Date).getTime()- a.getTime())+"ms)")}function n(b){for(var a in b)return!1;return!0}function v(b,a,d){if(!a)return"";var c,f=h(a),m=b.config,t=m.textExtraction||"";return"string"===typeof t?h.trim(("basic"===t?f.attr(m.textAttribute)||a.textContent:a.textContent)||f.text()||""):"function"===typeof t?h.trim(t(a,b,d)):"function"===typeof(c=g.getColumnData(b,t,d))?h.trim(c(a,b,d)):h.trim(a.textContent||f.text()||"")}function p(b){var a,d,c=b.config,f=c.$tbodies=c.$table.children("tbody:not(."+c.cssInfoBlock+")"),m,t, k,l,x,q,u,r,n,E=0,B="",z=f.length;if(0===z)return c.debug?e("Warning: *Empty table!* Not building a parser cache"):"";c.debug&&(n=new Date,e("Detecting parsers for each column"));a=[];for(d=[];E<z;){m=f[E].rows;if(m.length)for(t=c.columns,k=0;k<t;k++){l=c.$headers.filter('[data-column="'+k+'"]:last');x=g.getColumnData(b,c.headers,k);r=g.getParserById(g.getData(l,x,"extractor"));u=g.getParserById(g.getData(l,x,"sorter"));q="false"===g.getData(l,x,"parser");c.empties[k]=(g.getData(l,x,"empty")||c.emptyTo|| (c.emptyToBottom?"bottom":"top")).toLowerCase();c.strings[k]=(g.getData(l,x,"string")||c.stringTo||"max").toLowerCase();q&&(u=g.getParserById("no-parser"));r||(r=!1);if(!u)a:{l=b;x=m;q=-1;u=k;for(var C=void 0,M=void 0,N=g.parsers.length,A=!1,y="",C=!0;""===y&&C;)q++,x[q]?(A=x[q].cells[u],y=v(l,A,u),M=h(A),l.config.debug&&e("Checking if value was empty on row "+q+", column: "+u+': "'+y+'"')):C=!1;for(;0<=--N;)if((C=g.parsers[N])&&"text"!==C.id&&C.is&&C.is(y,l,A,M)){u=C;break a}u=g.getParserById("text")}c.debug&& (B+="column:"+k+"; extractor:"+r.id+"; parser:"+u.id+"; string:"+c.strings[k]+"; empty: "+c.empties[k]+"\n");d[k]=u;a[k]=r}E+=d.length?z:1}c.debug&&(e(B?B:"No parsers detected"),w("Completed detecting parsers",n));c.parsers=d;c.extractors=a}function z(b){var a,d,c,f,m,t,k,l,x,q,u,r=b.config,n=r.$table.children("tbody"),p=r.extractors,B=r.parsers;r.cache={};r.totalRows=0;if(!B)return r.debug?e("Warning: *Empty table!* Not building a cache"):"";r.debug&&(l=new Date);r.showProcessing&&g.isProcessing(b, !0);for(m=0;m<n.length;m++)if(u=[],a=r.cache[m]={normalized:[]},!n.eq(m).hasClass(r.cssInfoBlock)){x=n[m]&&n[m].rows.length||0;for(c=0;c<x;++c)if(q={child:[],raw:[]},t=h(n[m].rows[c]),k=[],t.hasClass(r.cssChildRow)&&0!==c)d=a.normalized.length-1,a.normalized[d][r.columns].$row=a.normalized[d][r.columns].$row.add(t),t.prev().hasClass(r.cssChildRow)||t.prev().addClass(g.css.cssHasChild),q.child[d]=h.trim(t[0].textContent||t.text()||"");else{q.$row=t;q.order=c;for(f=0;f<r.columns;++f)"undefined"===typeof B[f]? r.debug&&e("No parser found for cell:",t[0].cells[f],"does it have a header?"):(d=v(b,t[0].cells[f],f),q.raw.push(d),d="undefined"===typeof p[f].id?d:p[f].format(d,b,t[0].cells[f],f),d="no-parser"===B[f].id?"":B[f].format(d,b,t[0].cells[f],f),k.push(r.ignoreCase&&"string"===typeof d?d.toLowerCase():d),"numeric"===(B[f].type||"").toLowerCase()&&(u[f]=Math.max(Math.abs(d)||0,u[f]||0)));k[r.columns]=q;a.normalized.push(k)}a.colMax=u;r.totalRows+=a.normalized.length}r.showProcessing&&g.isProcessing(b); r.debug&&w("Building cache for "+x+" rows",l)}function y(b,a){var d=b.config,c=d.widgetOptions,f=b.tBodies,m=[],t=d.cache,k,l,e,q,u,r;if(n(t))return d.appender?d.appender(b,m):b.isUpdating?d.$table.trigger("updateComplete",b):"";d.debug&&(r=new Date);for(u=0;u<f.length;u++)if(k=h(f[u]),k.length&&!k.hasClass(d.cssInfoBlock)){e=g.processTbody(b,k,!0);k=t[u].normalized;l=k.length;for(q=0;q<l;q++)m.push(k[q][d.columns].$row),d.appender&&(!d.pager||d.pager.removeRows&&c.pager_removeRows||d.pager.ajax)|| e.append(k[q][d.columns].$row);g.processTbody(b,e,!1)}d.appender&&d.appender(b,m);d.debug&&w("Rebuilt table",r);a||d.appender||g.applyWidget(b);b.isUpdating&&d.$table.trigger("updateComplete",b)}function F(b){return/^d/i.test(b)||1===b}function D(b){var a,d,c,f,m,t,k,l=b.config;l.headerList=[];l.headerContent=[];l.debug&&(k=new Date);l.columns=g.computeColumnIndex(l.$table.children("thead, tfoot").children("tr"));f=l.cssIcon?'<i class="'+(l.cssIcon===g.css.icon?g.css.icon:l.cssIcon+" "+g.css.icon)+ '"></i>':"";l.$headers=h(h.map(h(b).find(l.selectorHeaders),function(k,e){d=h(k);if(!d.parent().hasClass(l.cssIgnoreRow))return a=g.getColumnData(b,l.headers,e,!0),l.headerContent[e]=d.html(),""===l.headerTemplate||d.find("."+g.css.headerIn).length||(m=l.headerTemplate.replace(/\{content\}/g,d.html()).replace(/\{icon\}/g,d.find("."+g.css.icon).length?"":f),l.onRenderTemplate&&(c=l.onRenderTemplate.apply(d,[e,m]))&&"string"===typeof c&&(m=c),d.html('<div class="'+g.css.headerIn+'">'+m+"</div>")),l.onRenderHeader&& l.onRenderHeader.apply(d,[e,l,l.$table]),k.column=parseInt(d.attr("data-column"),10),k.order=F(g.getData(d,a,"sortInitialOrder")||l.sortInitialOrder)?[1,0,2]:[0,1,2],k.count=-1,k.lockedOrder=!1,t=g.getData(d,a,"lockedOrder")||!1,"undefined"!==typeof t&&!1!==t&&(k.order=k.lockedOrder=F(t)?[1,1,1]:[0,0,0]),d.addClass(g.css.header+" "+l.cssHeader),l.headerList[e]=k,d.parent().addClass(g.css.headerRow+" "+l.cssHeaderRow).attr("role","row"),l.tabIndex&&d.attr("tabindex",0),k}));h(b).find(l.selectorHeaders).attr({scope:"col", role:"columnheader"});H(b);l.debug&&(w("Built headers:",k),e(l.$headers))}function I(b,a,d){var c=b.config;c.$table.find(c.selectorRemove).remove();p(b);z(b);J(c,a,d)}function H(b){var a,d,c,f=b.config;f.$headers.each(function(m,t){d=h(t);c=g.getColumnData(b,f.headers,m,!0);a="false"===g.getData(t,c,"sorter")||"false"===g.getData(t,c,"parser");t.sortDisabled=a;d[a?"addClass":"removeClass"]("sorter-false").attr("aria-disabled",""+a);b.id&&(a?d.removeAttr("aria-controls"):d.attr("aria-controls",b.id))})} function G(b){var a,d,c=b.config,f=c.sortList,m=f.length,t=g.css.sortNone+" "+c.cssNone,k=[g.css.sortAsc+" "+c.cssAsc,g.css.sortDesc+" "+c.cssDesc],e=[c.cssIconAsc,c.cssIconDesc,c.cssIconNone],n=["ascending","descending"],q=h(b).find("tfoot tr").children().add(c.$extraHeaders).removeClass(k.join(" "));c.$headers.removeClass(k.join(" ")).addClass(t).attr("aria-sort","none").find("."+c.cssIcon).removeClass(e.join(" ")).addClass(e[2]);for(a=0;a<m;a++)if(2!==f[a][1]&&(b=c.$headers.not(".sorter-false").filter('[data-column="'+ f[a][0]+'"]'+(1===m?":last":"")),b.length)){for(d=0;d<b.length;d++)b[d].sortDisabled||b.eq(d).removeClass(t).addClass(k[f[a][1]]).attr("aria-sort",n[f[a][1]]).find("."+c.cssIcon).removeClass(e[2]).addClass(e[f[a][1]]);q.length&&q.filter('[data-column="'+f[a][0]+'"]').removeClass(t).addClass(k[f[a][1]])}c.$headers.not(".sorter-false").each(function(){var b=h(this),a=this.order[(this.count+1)%(c.sortReset?3:2)],a=h.trim(b.text())+": "+g.language[b.hasClass(g.css.sortAsc)?"sortAsc":b.hasClass(g.css.sortDesc)? "sortDesc":"sortNone"]+g.language[0===a?"nextAsc":1===a?"nextDesc":"nextNone"];b.attr("aria-label",a)})}function Q(b,a){var d,c,f,m,g,k=b.config,e=a||k.sortList;k.sortList=[];h.each(e,function(b,a){m=parseInt(a[0],10);if(f=k.$headers.filter('[data-column="'+m+'"]:last')[0]){c=(c=(""+a[1]).match(/^(1|d|s|o|n)/))?c[0]:"";switch(c){case "1":case "d":c=1;break;case "s":c=g||0;break;case "o":d=f.order[(g||0)%(k.sortReset?3:2)];c=0===d?1:1===d?0:2;break;case "n":f.count+=1;c=f.order[f.count%(k.sortReset? 3:2)];break;default:c=0}g=0===b?c:g;d=[m,parseInt(c,10)||0];k.sortList.push(d);c=h.inArray(d[1],f.order);f.count=0<=c?c:d[1]%(k.sortReset?3:2)}})}function R(b,a){return b&&b[a]?b[a].type||"":""}function O(b,a,d){if(b.isUpdating)return setTimeout(function(){O(b,a,d)},50);var c,f,m,e,k=b.config,l=!d[k.sortMultiSortKey],n=k.$table;n.trigger("sortStart",b);a.count=d[k.sortResetKey]?2:(a.count+1)%(k.sortReset?3:2);k.sortRestart&&(f=a,k.$headers.each(function(){this===f||!l&&h(this).is("."+g.css.sortDesc+ ",."+g.css.sortAsc)||(this.count=-1)}));f=parseInt(h(a).attr("data-column"),10);if(l){k.sortList=[];if(null!==k.sortForce)for(c=k.sortForce,m=0;m<c.length;m++)c[m][0]!==f&&k.sortList.push(c[m]);c=a.order[a.count];if(2>c&&(k.sortList.push([f,c]),1<a.colSpan))for(m=1;m<a.colSpan;m++)k.sortList.push([f+m,c])}else{if(k.sortAppend&&1<k.sortList.length)for(m=0;m<k.sortAppend.length;m++)e=g.isValueInArray(k.sortAppend[m][0],k.sortList),0<=e&&k.sortList.splice(e,1);if(0<=g.isValueInArray(f,k.sortList))for(m= 0;m<k.sortList.length;m++)e=k.sortList[m],c=k.$headers.filter('[data-column="'+e[0]+'"]:last')[0],e[0]===f&&(e[1]=c.order[a.count],2===e[1]&&(k.sortList.splice(m,1),c.count=-1));else if(c=a.order[a.count],2>c&&(k.sortList.push([f,c]),1<a.colSpan))for(m=1;m<a.colSpan;m++)k.sortList.push([f+m,c])}if(null!==k.sortAppend)for(c=k.sortAppend,m=0;m<c.length;m++)c[m][0]!==f&&k.sortList.push(c[m]);n.trigger("sortBegin",b);setTimeout(function(){G(b);K(b);y(b);n.trigger("sortEnd",b)},1)}function K(b){var a, d,c,f,m,e,k,h,x,q,u,r=0,p=b.config,v=p.textSorter||"",B=p.sortList,A=B.length,z=b.tBodies.length;if(!p.serverSideSorting&&!n(p.cache)){p.debug&&(m=new Date);for(d=0;d<z;d++)e=p.cache[d].colMax,k=p.cache[d].normalized,k.sort(function(d,m){for(a=0;a<A;a++){f=B[a][0];h=B[a][1];r=0===h;if(p.sortStable&&d[f]===m[f]&&1===A)break;(c=/n/i.test(R(p.parsers,f)))&&p.strings[f]?(c="boolean"===typeof p.string[p.strings[f]]?(r?1:-1)*(p.string[p.strings[f]]?-1:1):p.strings[f]?p.string[p.strings[f]]||0:0,x=p.numberSorter? p.numberSorter(d[f],m[f],r,e[f],b):g["sortNumeric"+(r?"Asc":"Desc")](d[f],m[f],c,e[f],f,b)):(q=r?d:m,u=r?m:d,x="function"===typeof v?v(q[f],u[f],r,f,b):"object"===typeof v&&v.hasOwnProperty(f)?v[f](q[f],u[f],r,f,b):g["sortNatural"+(r?"Asc":"Desc")](d[f],m[f],f,b,p));if(x)return x}return d[p.columns].order-m[p.columns].order});p.debug&&w("Sorting on "+B.toString()+" and dir "+h+" time",m)}}function L(b,a){b.table.isUpdating&&b.$table.trigger("updateComplete",b.table);h.isFunction(a)&&a(b.table)}function J(b, a,d){var c=h.isArray(a)?a:b.sortList;!1===("undefined"===typeof a?b.resort:a)||b.serverSideSorting||b.table.isProcessing?(L(b,d),g.applyWidget(b.table,!1)):c.length?b.$table.trigger("sorton",[c,function(){L(b,d)},!0]):b.$table.trigger("sortReset",[function(){L(b,d);g.applyWidget(b.table,!1)}])}function P(b){var a=b.config,d=a.$table,c="sortReset update updateRows updateCell updateAll addRows updateComplete sorton appendCache "+"updateCache applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave ".split(" ").join(a.namespace+ " ");d.unbind(h.trim(c)).bind("sortReset"+a.namespace,function(f,d){f.stopPropagation();a.sortList=[];G(b);K(b);y(b);h.isFunction(d)&&d(b)}).bind("updateAll"+a.namespace,function(f,d,c){f.stopPropagation();b.isUpdating=!0;g.refreshWidgets(b,!0,!0);D(b);g.bindEvents(b,a.$headers,!0);P(b);I(b,d,c)}).bind("update"+a.namespace+" updateRows"+a.namespace,function(a,d,c){a.stopPropagation();b.isUpdating=!0;H(b);I(b,d,c)}).bind("updateCell"+a.namespace,function(f,c,g,e){f.stopPropagation();b.isUpdating=!0; d.find(a.selectorRemove).remove();var l,n,q;n=d.find("tbody");q=h(c);f=n.index(h.fn.closest?q.closest("tbody"):q.parents("tbody").filter(":first"));l=h.fn.closest?q.closest("tr"):q.parents("tr").filter(":first");c=q[0];n.length&&0<=f&&(n=n.eq(f).find("tr").index(l),q=q.index(),a.cache[f].normalized[n][a.columns].$row=l,l="undefined"===typeof a.extractors[q].id?v(b,c,q):a.extractors[q].format(v(b,c,q),b,c,q),c="no-parser"===a.parsers[q].id?"":a.parsers[q].format(l,b,c,q),a.cache[f].normalized[n][q]= a.ignoreCase&&"string"===typeof c?c.toLowerCase():c,"numeric"===(a.parsers[q].type||"").toLowerCase()&&(a.cache[f].colMax[q]=Math.max(Math.abs(c)||0,a.cache[f].colMax[q]||0)),c="undefined"!==g?g:a.resort,!1!==c?J(a,c,e):(h.isFunction(e)&&e(b),a.$table.trigger("updateComplete",a.table)))}).bind("addRows"+a.namespace,function(c,m,g,e){c.stopPropagation();b.isUpdating=!0;if(n(a.cache))H(b),I(b,g,e);else{m=h(m).attr("role","row");var l,w,q,u,r,z=m.filter("tr").length,y=d.find("tbody").index(m.parents("tbody").filter(":first")); a.parsers&&a.parsers.length||p(b);for(c=0;c<z;c++){w=m[c].cells.length;r=[];u={child:[],$row:m.eq(c),order:a.cache[y].normalized.length};for(l=0;l<w;l++)q="undefined"===typeof a.extractors[l].id?v(b,m[c].cells[l],l):a.extractors[l].format(v(b,m[c].cells[l],l),b,m[c].cells[l],l),q="no-parser"===a.parsers[l].id?"":a.parsers[l].format(q,b,m[c].cells[l],l),r[l]=a.ignoreCase&&"string"===typeof q?q.toLowerCase():q,"numeric"===(a.parsers[l].type||"").toLowerCase()&&(a.cache[y].colMax[l]=Math.max(Math.abs(r[l])|| 0,a.cache[y].colMax[l]||0));r.push(u);a.cache[y].normalized.push(r)}J(a,g,e)}}).bind("updateComplete"+a.namespace,function(){b.isUpdating=!1}).bind("sorton"+a.namespace,function(a,c,e,k){var l=b.config;a.stopPropagation();d.trigger("sortStart",this);Q(b,c);G(b);l.delayInit&&n(l.cache)&&z(b);d.trigger("sortBegin",this);K(b);y(b,k);d.trigger("sortEnd",this);g.applyWidget(b);h.isFunction(e)&&e(b)}).bind("appendCache"+a.namespace,function(a,c,d){a.stopPropagation();y(b,d);h.isFunction(c)&&c(b)}).bind("updateCache"+ a.namespace,function(c,d){a.parsers&&a.parsers.length||p(b);z(b);h.isFunction(d)&&d(b)}).bind("applyWidgetId"+a.namespace,function(c,d){c.stopPropagation();g.getWidgetById(d).format(b,a,a.widgetOptions)}).bind("applyWidgets"+a.namespace,function(a,c){a.stopPropagation();g.applyWidget(b,c)}).bind("refreshWidgets"+a.namespace,function(a,c,d){a.stopPropagation();g.refreshWidgets(b,c,d)}).bind("destroy"+a.namespace,function(a,c,d){a.stopPropagation();g.destroy(b,c,d)}).bind("resetToLoadState"+a.namespace, function(){g.removeWidget(b,!0,!1);a=h.extend(!0,g.defaults,a.originalSettings);b.hasInitialized=!1;g.setup(b,a)})}var g=this;g.version="2.19.1";g.parsers=[];g.widgets=[];g.defaults={theme:"default",widthFixed:!1,showProcessing:!1,headerTemplate:"{content}",onRenderTemplate:null,onRenderHeader:null,cancelSelection:!0,tabIndex:!0,dateFormat:"mmddyyyy",sortMultiSortKey:"shiftKey",sortResetKey:"ctrlKey",usNumberFormat:!0,delayInit:!1,serverSideSorting:!1,resort:!0,headers:{},ignoreCase:!0,sortForce:null, sortList:[],sortAppend:null,sortStable:!1,sortInitialOrder:"asc",sortLocaleCompare:!1,sortReset:!1,sortRestart:!1,emptyTo:"bottom",stringTo:"max",textExtraction:"basic",textAttribute:"data-text",textSorter:null,numberSorter:null,widgets:[],widgetOptions:{zebra:["even","odd"]},initWidgets:!0,widgetClass:"widget-{name}",initialized:null,tableClass:"",cssAsc:"",cssDesc:"",cssNone:"",cssHeader:"",cssHeaderRow:"",cssProcessing:"",cssChildRow:"tablesorter-childRow",cssIcon:"tablesorter-icon",cssIconNone:"", cssIconAsc:"",cssIconDesc:"",cssInfoBlock:"tablesorter-infoOnly",cssAllowClicks:"tablesorter-allowClicks",cssIgnoreRow:"tablesorter-ignoreRow",selectorHeaders:"> thead th, > thead td",selectorSort:"th, td",selectorRemove:".remove-me",debug:!1,headerList:[],empties:{},strings:{},parsers:[]};g.css={table:"tablesorter",cssHasChild:"tablesorter-hasChildRow",childRow:"tablesorter-childRow",colgroup:"tablesorter-colgroup",header:"tablesorter-header",headerRow:"tablesorter-headerRow",headerIn:"tablesorter-header-inner", icon:"tablesorter-icon",info:"tablesorter-infoOnly",processing:"tablesorter-processing",sortAsc:"tablesorter-headerAsc",sortDesc:"tablesorter-headerDesc",sortNone:"tablesorter-headerUnSorted"};g.language={sortAsc:"Ascending sort applied, ",sortDesc:"Descending sort applied, ",sortNone:"No sort applied, ",nextAsc:"activate to apply an ascending sort",nextDesc:"activate to apply a descending sort",nextNone:"activate to remove the sort"};g.log=e;g.benchmark=w;g.construct=function(b){return this.each(function(){var a= h.extend(!0,{},g.defaults,b);a.originalSettings=b;!this.hasInitialized&&g.buildTable&&"TABLE"!==this.tagName?g.buildTable(this,a):g.setup(this,a)})};g.setup=function(b,a){if(!b||!b.tHead||0===b.tBodies.length||!0===b.hasInitialized)return a.debug?e("ERROR: stopping initialization! No table, thead, tbody or tablesorter has already been initialized"):"";var d="",c=h(b),f=h.metadata;b.hasInitialized=!1;b.isProcessing=!0;b.config=a;h.data(b,"tablesorter",a);a.debug&&h.data(b,"startoveralltimer",new Date); a.supportsDataObject=function(a){a[0]=parseInt(a[0],10);return 1<a[0]||1===a[0]&&4<=parseInt(a[1],10)}(h.fn.jquery.split("."));a.string={max:1,min:-1,emptymin:1,emptymax:-1,zero:0,none:0,"null":0,top:!0,bottom:!1};a.emptyTo=a.emptyTo.toLowerCase();a.stringTo=a.stringTo.toLowerCase();/tablesorter\-/.test(c.attr("class"))||(d=""!==a.theme?" tablesorter-"+a.theme:"");a.table=b;a.$table=c.addClass(g.css.table+" "+a.tableClass+d).attr("role","grid");a.$headers=c.find(a.selectorHeaders);a.namespace=a.namespace? "."+a.namespace.replace(/\W/g,""):".tablesorter"+Math.random().toString(16).slice(2);a.$table.children().children("tr").attr("role","row");a.$tbodies=c.children("tbody:not(."+a.cssInfoBlock+")").attr({"aria-live":"polite","aria-relevant":"all"});a.$table.children("caption").length&&(d=a.$table.children("caption")[0],d.id||(d.id=a.namespace.slice(1)+"caption"),a.$table.attr("aria-labelledby",d.id));a.widgetInit={};a.textExtraction=a.$table.attr("data-text-extraction")||a.textExtraction||"basic";D(b); g.fixColumnWidth(b);p(b);a.totalRows=0;a.delayInit||z(b);g.bindEvents(b,a.$headers,!0);P(b);a.supportsDataObject&&"undefined"!==typeof c.data().sortlist?a.sortList=c.data().sortlist:f&&c.metadata()&&c.metadata().sortlist&&(a.sortList=c.metadata().sortlist);g.applyWidget(b,!0);0<a.sortList.length?c.trigger("sorton",[a.sortList,{},!a.initWidgets,!0]):(G(b),a.initWidgets&&g.applyWidget(b,!1));a.showProcessing&&c.unbind("sortBegin"+a.namespace+" sortEnd"+a.namespace).bind("sortBegin"+a.namespace+" sortEnd"+ a.namespace,function(c){clearTimeout(a.processTimer);g.isProcessing(b);"sortBegin"===c.type&&(a.processTimer=setTimeout(function(){g.isProcessing(b,!0)},500))});b.hasInitialized=!0;b.isProcessing=!1;a.debug&&g.benchmark("Overall initialization time",h.data(b,"startoveralltimer"));c.trigger("tablesorter-initialized",b);"function"===typeof a.initialized&&a.initialized(b)};g.fixColumnWidth=function(b){b=h(b)[0];var a,d,c=b.config,f=c.$table.children("colgroup");f.length&&f.hasClass(g.css.colgroup)&& f.remove();c.widthFixed&&0===c.$table.children("colgroup").length&&(f=h('<colgroup class="'+g.css.colgroup+'">'),a=c.$table.width(),h(b.tBodies).not("."+c.cssInfoBlock).find("tr:first").children(":visible").each(function(){d=parseInt(h(this).width()/a*1E3,10)/10+"%";f.append(h("<col>").css("width",d))}),c.$table.prepend(f))};g.getColumnData=function(b,a,d,c,f){if("undefined"!==typeof a&&null!==a){b=h(b)[0];var g;b=b.config;f=f||b.$headers;if(a[d])return c?a[d]:a[f.index(f.filter('[data-column="'+ d+'"]:last'))];for(g in a)if("string"===typeof g&&(c=f.filter('[data-column="'+d+'"]:last').filter(g).add(f.filter('[data-column="'+d+'"]:last').find(g)),c.length))return a[g]}};g.computeColumnIndex=function(b){var a=[],d=0,c,f,g,e,k,l,n,q,u,p;for(c=0;c<b.length;c++)for(k=b[c].cells,f=0;f<k.length;f++){g=k[f];e=h(g);l=g.parentNode.rowIndex;e.index();n=g.rowSpan||1;q=g.colSpan||1;"undefined"===typeof a[l]&&(a[l]=[]);for(g=0;g<a[l].length+1;g++)if("undefined"===typeof a[l][g]){u=g;break}d=Math.max(u, d);e.attr({"data-column":u});for(g=l;g<l+n;g++)for("undefined"===typeof a[g]&&(a[g]=[]),p=a[g],e=u;e<u+q;e++)p[e]="x"}return d+1};g.isProcessing=function(b,a,d){b=h(b);var c=b[0].config,f=d||b.find("."+g.css.header);a?("undefined"!==typeof d&&0<c.sortList.length&&(f=f.filter(function(){return this.sortDisabled?!1:0<=g.isValueInArray(parseFloat(h(this).attr("data-column")),c.sortList)})),b.add(f).addClass(g.css.processing+" "+c.cssProcessing)):b.add(f).removeClass(g.css.processing+" "+c.cssProcessing)}; g.processTbody=function(b,a,d){b=h(b)[0];if(d)return b.isProcessing=!0,a.before('<span class="tablesorter-savemyplace"/>'),d=h.fn.detach?a.detach():a.remove();d=h(b).find("span.tablesorter-savemyplace");a.insertAfter(d);d.remove();b.isProcessing=!1};g.clearTableBody=function(b){h(b)[0].config.$tbodies.children().detach()};g.bindEvents=function(b,a,d){b=h(b)[0];var c,f=b.config;!0!==d&&(f.$extraHeaders=f.$extraHeaders?f.$extraHeaders.add(a):a);a.find(f.selectorSort).add(a.filter(f.selectorSort)).unbind(h.trim(["mousedown", "mouseup","sort","keyup",""].join(f.namespace+" "))).bind(h.trim(["mousedown","mouseup","sort","keyup",""].join(f.namespace+" ")),function(d,g){var e;e=d.type;if(!(1!==(d.which||d.button)&&!/sort|keyup/.test(e)||"keyup"===e&&13!==d.which||"mouseup"===e&&!0!==g&&250<(new Date).getTime()-c)){if("mousedown"===e)return c=(new Date).getTime(),/(input|select|button|textarea)/i.test(d.target.tagName)||h(d.target).closest("td,th").hasClass(f.cssAllowClicks)?"":!f.cancelSelection;f.delayInit&&n(f.cache)&& z(b);e=h.fn.closest?h(this).closest("th, td")[0]:/TH|TD/.test(this.tagName)?this:h(this).parents("th, td")[0];e=f.$headers[a.index(e)];e.sortDisabled||O(b,e,d)}});f.cancelSelection&&a.attr("unselectable","on").bind("selectstart",!1).css({"user-select":"none",MozUserSelect:"none"})};g.restoreHeaders=function(b){var a,d=h(b)[0].config;d.$table.find(d.selectorHeaders).each(function(b){a=h(this);a.find("."+g.css.headerIn).length&&a.html(d.headerContent[b])})};g.destroy=function(b,a,d){b=h(b)[0];if(b.hasInitialized){g.removeWidget(b, !0,!1);var c,f=h(b),e=b.config;c=f.find("thead:first");var n=c.find("tr."+g.css.headerRow).removeClass(g.css.headerRow+" "+e.cssHeaderRow),k=f.find("tfoot:first > tr").children("th, td");!1===a&&0<=h.inArray("uitheme",e.widgets)&&(f.trigger("applyWidgetId",["uitheme"]),f.trigger("applyWidgetId",["zebra"]));c.find("tr").not(n).remove();c="sortReset update updateAll updateRows updateCell addRows updateComplete sorton appendCache updateCache "+"applyWidgetId applyWidgets refreshWidgets destroy mouseup mouseleave keypress sortBegin sortEnd resetToLoadState ".split(" ").join(e.namespace+ " ");f.removeData("tablesorter").unbind(h.trim(c));e.$headers.add(k).removeClass([g.css.header,e.cssHeader,e.cssAsc,e.cssDesc,g.css.sortAsc,g.css.sortDesc,g.css.sortNone].join(" ")).removeAttr("data-column").removeAttr("aria-label").attr("aria-disabled","true");n.find(e.selectorSort).unbind(h.trim(["mousedown","mouseup","keypress",""].join(e.namespace+" ")));g.restoreHeaders(b);f.toggleClass(g.css.table+" "+e.tableClass+" tablesorter-"+e.theme,!1===a);b.hasInitialized=!1;delete b.config.cache;"function"=== typeof d&&d(b)}};g.regex={chunk:/(^([+\-]?(?:0|[1-9]\d*)(?:\.\d*)?(?:[eE][+\-]?\d+)?)?$|^0x[0-9a-f]+$|\d+)/gi,chunks:/(^\\0|\\0$)/,hex:/^0x[0-9a-f]+$/i};g.sortNatural=function(b,a){if(b===a)return 0;var d,c,f,e,h,k;c=g.regex;if(c.hex.test(a)){d=parseInt(b.match(c.hex),16);f=parseInt(a.match(c.hex),16);if(d<f)return-1;if(d>f)return 1}d=b.replace(c.chunk,"\\0$1\\0").replace(c.chunks,"").split("\\0");c=a.replace(c.chunk,"\\0$1\\0").replace(c.chunks,"").split("\\0");k=Math.max(d.length,c.length);for(h= 0;h<k;h++){f=isNaN(d[h])?d[h]||0:parseFloat(d[h])||0;e=isNaN(c[h])?c[h]||0:parseFloat(c[h])||0;if(isNaN(f)!==isNaN(e))return isNaN(f)?1:-1;typeof f!==typeof e&&(f+="",e+="");if(f<e)return-1;if(f>e)return 1}return 0};g.sortNaturalAsc=function(b,a,d,c,f){if(b===a)return 0;d=f.string[f.empties[d]||f.emptyTo];return""===b&&0!==d?"boolean"===typeof d?d?-1:1:-d||-1:""===a&&0!==d?"boolean"===typeof d?d?1:-1:d||1:g.sortNatural(b,a)};g.sortNaturalDesc=function(b,a,d,c,f){if(b===a)return 0;d=f.string[f.empties[d]|| f.emptyTo];return""===b&&0!==d?"boolean"===typeof d?d?-1:1:d||1:""===a&&0!==d?"boolean"===typeof d?d?1:-1:-d||-1:g.sortNatural(a,b)};g.sortText=function(b,a){return b>a?1:b<a?-1:0};g.getTextValue=function(b,a,d){if(d){var c=b?b.length:0,f=d+a;for(d=0;d<c;d++)f+=b.charCodeAt(d);return a*f}return 0};g.sortNumericAsc=function(b,a,d,c,f,e){if(b===a)return 0;e=e.config;f=e.string[e.empties[f]||e.emptyTo];if(""===b&&0!==f)return"boolean"===typeof f?f?-1:1:-f||-1;if(""===a&&0!==f)return"boolean"===typeof f? f?1:-1:f||1;isNaN(b)&&(b=g.getTextValue(b,d,c));isNaN(a)&&(a=g.getTextValue(a,d,c));return b-a};g.sortNumericDesc=function(b,a,d,c,f,e){if(b===a)return 0;e=e.config;f=e.string[e.empties[f]||e.emptyTo];if(""===b&&0!==f)return"boolean"===typeof f?f?-1:1:f||1;if(""===a&&0!==f)return"boolean"===typeof f?f?1:-1:-f||-1;isNaN(b)&&(b=g.getTextValue(b,d,c));isNaN(a)&&(a=g.getTextValue(a,d,c));return a-b};g.sortNumeric=function(b,a){return b-a};g.characterEquivalents={a:"\u00e1\u00e0\u00e2\u00e3\u00e4\u0105\u00e5", A:"\u00c1\u00c0\u00c2\u00c3\u00c4\u0104\u00c5",c:"\u00e7\u0107\u010d",C:"\u00c7\u0106\u010c",e:"\u00e9\u00e8\u00ea\u00eb\u011b\u0119",E:"\u00c9\u00c8\u00ca\u00cb\u011a\u0118",i:"\u00ed\u00ec\u0130\u00ee\u00ef\u0131",I:"\u00cd\u00cc\u0130\u00ce\u00cf",o:"\u00f3\u00f2\u00f4\u00f5\u00f6",O:"\u00d3\u00d2\u00d4\u00d5\u00d6",ss:"\u00df",SS:"\u1e9e",u:"\u00fa\u00f9\u00fb\u00fc\u016f",U:"\u00da\u00d9\u00db\u00dc\u016e"};g.replaceAccents=function(b){var a,d="[",c=g.characterEquivalents;if(!g.characterRegex){g.characterRegexArray= {};for(a in c)"string"===typeof a&&(d+=c[a],g.characterRegexArray[a]=new RegExp("["+c[a]+"]","g"));g.characterRegex=new RegExp(d+"]")}if(g.characterRegex.test(b))for(a in c)"string"===typeof a&&(b=b.replace(g.characterRegexArray[a],a));return b};g.isValueInArray=function(b,a){var d,c=a.length;for(d=0;d<c;d++)if(a[d][0]===b)return d;return-1};g.addParser=function(b){var a,d=g.parsers.length,c=!0;for(a=0;a<d;a++)g.parsers[a].id.toLowerCase()===b.id.toLowerCase()&&(c=!1);c&&g.parsers.push(b)};g.getParserById= function(b){if("false"==b)return!1;var a,d=g.parsers.length;for(a=0;a<d;a++)if(g.parsers[a].id.toLowerCase()===b.toString().toLowerCase())return g.parsers[a];return!1};g.addWidget=function(b){g.widgets.push(b)};g.hasWidget=function(b,a){b=h(b);return b.length&&b[0].config&&b[0].config.widgetInit[a]||!1};g.getWidgetById=function(b){var a,d,c=g.widgets.length;for(a=0;a<c;a++)if((d=g.widgets[a])&&d.hasOwnProperty("id")&&d.id.toLowerCase()===b.toLowerCase())return d};g.applyWidget=function(b,a,d){b=h(b)[0]; var c=b.config,f=c.widgetOptions,e=" "+c.table.className+" ",n=[],k,l,p;!1!==a&&b.hasInitialized&&(b.isApplyingWidgets||b.isUpdating)||(c.debug&&(k=new Date),p=new RegExp("\\s"+c.widgetClass.replace(/\{name\}/i,"([\\w-]+)")+"\\s","g"),e.match(p)&&(e=e.match(p))&&h.each(e,function(a,b){c.widgets.push(b.replace(p,"$1"))}),c.widgets.length&&(b.isApplyingWidgets=!0,c.widgets=h.grep(c.widgets,function(a,b){return h.inArray(a,c.widgets)===b}),h.each(c.widgets||[],function(a,b){(p=g.getWidgetById(b))&&p.id&& (p.priority||(p.priority=10),n[a]=p)}),n.sort(function(a,b){return a.priority<b.priority?-1:a.priority===b.priority?0:1}),h.each(n,function(d,e){if(e){if(a||!c.widgetInit[e.id])c.widgetInit[e.id]=!0,e.hasOwnProperty("options")&&(f=b.config.widgetOptions=h.extend(!0,{},e.options,f)),e.hasOwnProperty("init")&&(c.debug&&(l=new Date),e.init(b,e,c,f),c.debug&&g.benchmark("Initializing "+e.id+" widget",l));!a&&e.hasOwnProperty("format")&&(c.debug&&(l=new Date),e.format(b,c,f,!1),c.debug&&g.benchmark((a? "Initializing ":"Applying ")+e.id+" widget",l))}}),a||"function"!==typeof d||d(b)),setTimeout(function(){b.isApplyingWidgets=!1;h.data(b,"lastWidgetApplication",new Date)},0),c.debug&&(e=c.widgets.length,w("Completed "+(!0===a?"initializing ":"applying ")+e+" widget"+(1!==e?"s":""),k)))};g.removeWidget=function(b,a,d){b=h(b)[0];!0===a?(a=[],h.each(g.widgets,function(b,c){c&&c.id&&a.push(c.id)})):a=(h.isArray(a)?a.join(","):a||"").toLowerCase().split(/[\s,]+/);var c,f,m,n=b.config,k=a.length;for(c= 0;c<k;c++)f=g.getWidgetById(a[c]),m=h.inArray(a[c],n.widgets),f&&"remove"in f&&(n.debug&&0<=m&&e('Removing "'+a[c]+'" widget'),f.remove(b,n,n.widgetOptions,d),n.widgetInit[a[c]]=!1),0<=m&&!0!==d&&n.widgets.splice(m,1)};g.refreshWidgets=function(b,a,d){b=h(b)[0];var c=b.config.widgets,f=[],e=function(a){h(a).trigger("refreshComplete")};h.each(g.widgets,function(b,d){d&&d.id&&(a||0>h.inArray(d.id,c))&&f.push(d.id)});g.removeWidget(b,f.join(","),!0);!0!==d?(g.applyWidget(b,a||!1,e),a&&g.applyWidget(b, !1,e)):e(b)};g.getData=function(b,a,d){var c="";b=h(b);var f,e;if(!b.length)return"";f=h.metadata?b.metadata():!1;e=" "+(b.attr("class")||"");"undefined"!==typeof b.data(d)||"undefined"!==typeof b.data(d.toLowerCase())?c+=b.data(d)||b.data(d.toLowerCase()):f&&"undefined"!==typeof f[d]?c+=f[d]:a&&"undefined"!==typeof a[d]?c+=a[d]:" "!==e&&e.match(" "+d+"-")&&(c=e.match(new RegExp("\\s"+d+"-([\\w-]+)"))[1]||"");return h.trim(c)};g.formatFloat=function(b,a){if("string"!==typeof b||""===b)return b;var d; b=(a&&a.config?!1!==a.config.usNumberFormat:"undefined"!==typeof a?a:1)?b.replace(/,/g,""):b.replace(/[\s|\.]/g,"").replace(/,/g,".");/^\s*\([.\d]+\)/.test(b)&&(b=b.replace(/^\s*\(([.\d]+)\)/,"-$1"));d=parseFloat(b);return isNaN(d)?h.trim(b):d};g.isDigit=function(b){return isNaN(b)?/^[\-+(]?\d+[)]?$/.test(b.toString().replace(/[,.'"\s]/g,"")):!0}}});var p=h.tablesorter;h.fn.extend({tablesorter:p.construct});p.addParser({id:"no-parser",is:function(){return!1},format:function(){return""},type:"text"}); p.addParser({id:"text",is:function(){return!0},format:function(e,w){var n=w.config;e&&(e=h.trim(n.ignoreCase?e.toLocaleLowerCase():e),e=n.sortLocaleCompare?p.replaceAccents(e):e);return e},type:"text"});p.addParser({id:"digit",is:function(e){return p.isDigit(e)},format:function(e,w){var n=p.formatFloat((e||"").replace(/[^\w,. \-()]/g,""),w);return e&&"number"===typeof n?n:e?h.trim(e&&w.config.ignoreCase?e.toLocaleLowerCase():e):e},type:"numeric"});p.addParser({id:"currency",is:function(e){return/^\(?\d+[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]|[\u00a3$\u20ac\u00a4\u00a5\u00a2?.]\d+\)?$/.test((e|| "").replace(/[+\-,. ]/g,""))},format:function(e,w){var n=p.formatFloat((e||"").replace(/[^\w,. \-()]/g,""),w);return e&&"number"===typeof n?n:e?h.trim(e&&w.config.ignoreCase?e.toLocaleLowerCase():e):e},type:"numeric"});p.addParser({id:"url",is:function(e){return/^(https?|ftp|file):\/\//.test(e)},format:function(e){return e?h.trim(e.replace(/(https?|ftp|file):\/\//,"")):e},parsed:!0,type:"text"});p.addParser({id:"isoDate",is:function(e){return/^\d{4}[\/\-]\d{1,2}[\/\-]\d{1,2}/.test(e)},format:function(e, h){var n=e?new Date(e.replace(/-/g,"/")):e;return n instanceof Date&&isFinite(n)?n.getTime():e},type:"numeric"});p.addParser({id:"percent",is:function(e){return/(\d\s*?%|%\s*?\d)/.test(e)&&15>e.length},format:function(e,h){return e?p.formatFloat(e.replace(/%/g,""),h):e},type:"numeric"});p.addParser({id:"image",is:function(e,h,n,p){return 0<p.find("img").length},format:function(e,p,n){return h(n).find("img").attr(p.config.imgAttr||"alt")||e},parsed:!0,type:"text"});p.addParser({id:"usLongDate",is:function(e){return/^[A-Z]{3,10}\.?\s+\d{1,2},?\s+(\d{4})(\s+\d{1,2}:\d{2}(:\d{2})?(\s+[AP]M)?)?$/i.test(e)|| /^\d{1,2}\s+[A-Z]{3,10}\s+\d{4}/i.test(e)},format:function(e,h){var n=e?new Date(e.replace(/(\S)([AP]M)$/i,"$1 $2")):e;return n instanceof Date&&isFinite(n)?n.getTime():e},type:"numeric"});p.addParser({id:"shortDate",is:function(e){return/(^\d{1,2}[\/\s]\d{1,2}[\/\s]\d{4})|(^\d{4}[\/\s]\d{1,2}[\/\s]\d{1,2})/.test((e||"").replace(/\s+/g," ").replace(/[\-.,]/g,"/"))},format:function(e,h,n,v){if(e){n=h.config;var A=n.$headers.filter('[data-column="'+v+'"]:last');v=A.length&&A[0].dateFormat||p.getData(A, p.getColumnData(h,n.headers,v),"dateFormat")||n.dateFormat;h=e.replace(/\s+/g," ").replace(/[\-.,]/g,"/");"mmddyyyy"===v?h=h.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$1/$2"):"ddmmyyyy"===v?h=h.replace(/(\d{1,2})[\/\s](\d{1,2})[\/\s](\d{4})/,"$3/$2/$1"):"yyyymmdd"===v&&(h=h.replace(/(\d{4})[\/\s](\d{1,2})[\/\s](\d{1,2})/,"$1/$2/$3"));h=new Date(h);return h instanceof Date&&isFinite(h)?h.getTime():e}return e},type:"numeric"});p.addParser({id:"time",is:function(e){return/^(([0-2]?\d:[0-5]\d)|([0-1]?\d:[0-5]\d\s?([AP]M)))$/i.test(e)}, format:function(e,h){var n=e?new Date("2000/01/01 "+e.replace(/(\S)([AP]M)$/i,"$1 $2")):e;return n instanceof Date&&isFinite(n)?n.getTime():e},type:"numeric"});p.addParser({id:"metadata",is:function(){return!1},format:function(e,p,n){e=p.config;e=e.parserMetadataName?e.parserMetadataName:"sortValue";return h(n).metadata()[e]},type:"numeric"});p.addWidget({id:"zebra",priority:90,format:function(e,p,n){var v,A,z,y,F=new RegExp(p.cssChildRow,"i"),D=p.$tbodies;for(e=0;e<D.length;e++)z=0,v=D.eq(e),v=v.children("tr:visible").not(p.selectorRemove), v.each(function(){A=h(this);F.test(this.className)||z++;y=0===z%2;A.removeClass(n.zebra[y?1:0]).addClass(n.zebra[y?0:1])})},remove:function(e,h,n,v){if(!v){h=h.$tbodies;var A=(n.zebra||["even","odd"]).join(" ");for(n=0;n<h.length;n++)v=p.processTbody(e,h.eq(n),!0),v.children().removeClass(A),p.processTbody(e,v,!1)}}});return p});
