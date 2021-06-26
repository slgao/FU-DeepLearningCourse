(function(e,c){var b=c.fn,a,g=Object.prototype.toString.call(window.opera)=="[object Opera]",d=(function(i){var l=i.createElement("details"),k,j,h;
if(!("open" in l)){return false
}j=i.body||(function(){var m=i.documentElement;
k=true;
return m.insertBefore(i.createElement("body"),m.firstElementChild||m.firstChild)
}());
l.innerHTML="<summary>a</summary>b";
l.style.display="block";
j.appendChild(l);
h=l.offsetHeight;
l.open=true;
h=h!=l.offsetHeight;
j.removeChild(l);
if(k){j.parentNode.removeChild(j)
}return h
}(e)),f=function(k,h,m,j){var l=k.prop("open"),i=l&&j||!l&&!j;
if(i){k.removeClass("open").prop("open",false).triggerHandler("close.details");
h.attr("aria-expanded",false);
m.hide()
}else{k.addClass("open").prop("open",true).triggerHandler("open.details");
h.attr("aria-expanded",true);
m.show()
}};
b.noSelect=function(){var h="none";
return this.bind("selectstart dragstart mousedown",function(){return false
}).css({MozUserSelect:h,msUserSelect:h,webkitUserSelect:h,userSelect:h})
};
if(d){a=b.details=function(){return this.each(function(){var i=c(this),h=c("summary",i).first();
h.attr({role:"button","aria-expanded":i.prop("open")}).on("click",function(){var j=i.prop("open");
h.attr("aria-expanded",!j);
i.triggerHandler((j?"close":"open")+".details")
})
})
};
a.support=d
}else{a=b.details=function(){return this.each(function(){var j=c(this),h=c("summary",j).first(),k=j.children(":not(summary)"),i=j.contents(":not(summary)");
if(!h.length){h=c("<summary>").text("Details").prependTo(j)
}if(k.length!=i.length){i.filter(function(){return this.nodeType==3&&/[^ \t\n\f\r]/.test(this.data)
}).wrap("<span>");
k=j.children(":not(summary)")
}j.prop("open",typeof j.attr("open")=="string");
f(j,h,k);
h.attr("role","button").noSelect().prop("tabIndex",0).on("click",function(){h.focus();
f(j,h,k,true)
}).keyup(function(l){if(32==l.keyCode||(13==l.keyCode&&!g)){l.preventDefault();
h.click()
}})
})
};
a.support=d
}}(document,$PBJQ));