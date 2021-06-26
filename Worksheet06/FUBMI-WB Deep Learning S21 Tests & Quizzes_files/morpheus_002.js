$PBJQ("#footerAppPresence").on("click",function(){$PBJQ("#presenceArea").toggleClass("is-hidden")
});
$PBJQ("details").details();
$PBJQ(document).ready(function(){updateFooterTime=(function(){if($PBJQ("#preferredTime").length==1){var a=$PBJQ("#preferredTime").data("preferredtzdisplay");
var c=new Date(parseInt($PBJQ("#preferredTime").data("preferredserverdateandgmtoffset")));
var e=c.getTime()-(new Date()).getTime()
}var f=$PBJQ("#serverTime").data("servertzdisplay");
var b=new Date(parseInt($PBJQ("#serverTime").data("serverdateandgmtoffset")));
var d=b.getTime()-(new Date()).getTime();
return function(){var g=new Date((new Date()).getTime()+d);
var h=g.toUTCString().replace(/GMT/,f).replace(/UTC/,f);
$PBJQ("#serverTime").text(h);
if($PBJQ("#preferredTime").length==1){var g=new Date((new Date()).getTime()+e);
var h=g.toUTCString().replace(/GMT/,a).replace(/UTC/,a);
$PBJQ("#preferredTime").text(h)
}setTimeout("updateFooterTime()",1000)
}
})();
if($PBJQ("#serverTime").length==1){updateFooterTime()
}});
var dhtml_view_sites=function(){$PBJQ("#selectSiteModal").addClass("dhtml_more_tabs");
$PBJQ(".more-tab").position();
dhtml_view_sites=function(){var c=$PBJQ("#selectSiteModal");
c.show();
if(c.hasClass("outscreen")){$PBJQ("body").toggleClass("active-more-sites");
var e=$PBJQ(".view-all-sites-btn:visible");
var b=10;
if(e.length>0){e.css("z-index",1005);
var a=e.offset().top+e.outerHeight()+b;
var d=$PBJQ("body").outerWidth()-(e.offset().left+e.outerWidth());
if($PBJQ("html").attr("dir")!=="rtl"){c.css("top",a).css("right",d)
}else{c.css("top",a).css("left",$PBJQ("body").outerWidth()-d)
}}c.toggleClass("outscreen");
var f=$PBJQ(window).height();
f-=$PBJQ(".tab-pane").offset().top;
f-=parseInt(c.css("padding-bottom"),10);
$PBJQ(".tab-pane").css("max-height",f);
$PBJQ("#txtSearch").focus();
createDHTMLMask(dhtml_view_sites);
$PBJQ(".selectedTab").bind("click",function(g){dhtml_view_sites();
return false
});
$PBJQ(".tab-pane:first").focus();
$PBJQ(document).trigger("view-sites-shown")
}else{$PBJQ("body").toggleClass("active-more-sites");
$PBJQ("#selectSiteModal").toggleClass("outscreen");
var e=$PBJQ(".view-all-sites-btn");
e.css("z-index","auto");
$PBJQ("#selectSite").attr("tabindex","-1");
removeDHTMLMask();
$PBJQ("#otherSiteTools").remove();
$PBJQ(".selectedTab").unbind("click")
}};
dhtml_view_sites()
};
function closeDrawer(){$PBJQ("#selectSiteModal").toggleClass("outscreen");
removeDHTMLMask();
$PBJQ("#selectSite").attr("tabindex","-1");
$PBJQ("#otherSiteTools").remove();
$PBJQ(".selectedTab").unbind("click");
$PBJQ(".moreSitesLink").unbind("keydown");
$PBJQ(".more-tab a").focus()
}function createDHTMLMask(a){$PBJQ("body").append('<div id="portalMask">&nbsp;</div>');
$PBJQ("#portalMask").css("height",browserSafeDocHeight()).css({width:"100%","z-index":1000,top:0,left:0}).bind("click",function(b){a();
return false
});
$PBJQ("#portalMask").bgiframe()
}function removeDHTMLMask(){$PBJQ("#portalMask").remove()
}function showToolMenu(h){var g=h.attr("id");
var a=g.replace(/!/g,"\\!").replace(/~/g,"\\~");
$PBJQ(".toolMenus").removeClass("toolMenusActive");
if($PBJQ("."+a).length){$PBJQ("#otherSiteTools").remove()
}else{var c=$PBJQ('<ul id="otherSiteTools" role="menu" />').addClass(g);
var f="/direct/site/"+g+"/pages.json";
scroll(0,0);
var e=parseInt($PBJQ("#maxToolsInt").text());
var d=$PBJQ("#maxToolsText").text();
var i=$PBJQ('<li class="otherSiteTool" ><span><a role="menuitem"><span class="Mrphs-toolsNav__menuitem--icon"> </span></a></span></li>');
var b=i.clone();
b.find("a").attr("href",portal.portalPath+"/site/"+g).attr("title",d).append(d);
b.find("a span").addClass("icon-sakai--see-all-tools");
$PBJQ.getJSON(f,function(j){$PBJQ.each(j,function(m,k){if(!k.tools[0]){return true
}if(m<e){var l=i.clone();
l.find("a").attr("href",k.tools[0].url).attr("title",k.title).append(k.title);
l.find("a span").addClass("icon-"+k.tools[0].toolId.replace(/\./gi,"-")).addClass("otherSiteToolIcon");
if(k.toolpopup){l.find("a").attr("href",k.tools[0].url+"?sakai.popup=yes").attr("onclick","window.open("+k.toolpopupurl+"); return false")
}c.append(l)
}});
if(j.length>e){c.append(b.clone())
}$PBJQ("#otherSiteTools").remove();
h.closest("li").append(c);
h.parent().find(".toolMenus").addClass("toolMenusActive")
})
}}$PBJQ(document).ready(function(){if($PBJQ("#eid").length===1){$PBJQ("#eid").focus()
}$PBJQ(".js-toggle-sites-nav","#skipNav").on("click",dhtml_view_sites);
$PBJQ("#show-all-sites, .view-all-sites-btn").on("click",dhtml_view_sites);
var b=portal.siteTitle;
if(b){if(portal.shortDescription){b=b+" ("+portal.shortDescription+")"
}$PBJQ(".portletTitle h2").prepend('<span class="siteTitle">'+b+":</span> ")
}$PBJQ("#txtSearch").keyup(function(c){if(c.keyCode==27){a()
}if($PBJQ("#txtSearch").val().length>0){var d=$PBJQ("#txtSearch").val().toLowerCase();
$PBJQ(".fav-sites-term, .fav-sites-entry").hide();
var e=$PBJQ(".fav-sites-entry").filter(function(f,g){return($PBJQ(".fav-title a span.fullTitle",g).text().toLowerCase().indexOf(d)>=0)
});
e.show();
e.closest(".fav-sites-term").show()
}if($PBJQ("#txtSearch").val().length==0){a()
}if($PBJQ("#otherSiteList li:visible").length<1&&$PBJQ(".otherSitesCategorList li:visible").length<1){$PBJQ(".norecords").remove();
$PBJQ("#noSearchResults").fadeIn("slow")
}});
function a(){$PBJQ("#txtSearch").val("");
$PBJQ(".fav-sites-term, .fav-sites-entry").show();
$PBJQ("#noSearchResults").hide();
$PBJQ("#txtSearch").focus()
}$PBJQ("#otherSiteSearchClear").on("click",function(){a()
});
$PBJQ("#presenceToggle").click(function(c){c.preventDefault();
$PBJQ("#presenceArea").toggle()
});
$PBJQ(".trayPopupClose").click(function(c){c.preventDefault();
$PBJQ(this).closest(".trayPopup").hide()
});
if($PBJQ("a.tool-directurl").length){$PBJQ("a.tool-directurl").cluetip({local:true,arrows:true,cluetipClass:"jtip",sticky:true,cursor:"pointer",activation:"click",closePosition:"title",closeText:'<img src="/library/image/silk/cross.png" alt="close">'})
}});
$PBJQ(document).ready(function(i){var m=[];
var f=false;
var p=$PBJQ("#selectSite");
var n=$PBJQ("#otherSitesCategorWrap");
var b=$PBJQ("#organizeFavorites");
var j={};
$PBJQ(".site-favorite-btn",n).each(function(q,r){j[$PBJQ(r).data("site-id")]=$PBJQ(r).parent()
});
var d={favorite:{markup:'<i class="site-favorite-icon site-favorite"></i>'},nonfavorite:{markup:'<i class="site-favorite-icon site-nonfavorite"></i>'},myworkspace:{markup:'<i class="site-favorite-icon site-workspace site-favorite"></i>'}};
var h=function(q){$PBJQ.ajax({url:"/portal/favorites/list",method:"GET",dataType:"text",success:function(r){m=r.split(";").filter(function(t,s){return t!=""
});
q(m)
}})
};
var e=function(s,r){var q=d[r];
$PBJQ(s).data("favorite-state",r);
if(r==="favorite"){$PBJQ(s).attr("title",$PBJQ("#removeFromFavoritesText").text())
}else{if(r==="nonfavorite"){$PBJQ(s).attr("title",$PBJQ("#addToFavoritesText").text())
}else{$PBJQ(s).attr("title",null)
}}$PBJQ(s).empty().append($PBJQ(q.markup))
};
var c=function(){var q=$PBJQ(".site-favorite",n).length;
$PBJQ(".favoriteCount",p).text("("+q+")");
if(q<2){$PBJQ(".organizeFavorites",p).addClass("tab-disabled")
}else{$PBJQ(".organizeFavorites",p).removeClass("tab-disabled")
}};
var o=function(q){$PBJQ(".site-favorite-btn",n).each(function(s,t){var r=$PBJQ(t).data("site-id");
if($PBJQ(t).closest(".my-workspace").length>0){e(t,"myworkspace")
}else{if($PBJQ.inArray(r,q)>=0){e(t,"favorite")
}else{e(t,"nonfavorite")
}}});
c();
f=true
};
var a=function(){return $PBJQ(".site-favorite-btn",n).has(".site-favorite").map(function(){return $PBJQ(this).data("site-id")
}).toArray()
};
var k=function(){h(o)
};
var l=function(){if($PBJQ(".moresites-refresh-notification").length>0){return
}var q=$PBJQ('<div class="moresites-refresh-notification" />').html($PBJQ("#refreshNotificationText").html());
$PBJQ("#loginLinks").prepend(q);
q.css("top",($PBJQ(".Mrphs-siteHierarchy").offset().top)+"px")
};
var g=function(r){if(!f){console.log("Can't update favorites as they haven't been loaded yet.");
return
}if(!r){r=function(){}
}var q=a();
q=q.sort(function(t,s){if(m.indexOf(t)===-1){return 1
}else{if(m.indexOf(s)===-1){return -1
}else{return m.indexOf(t)-m.indexOf(s)
}}});
$PBJQ.ajax({url:"/portal/favorites/update",method:"POST",data:{favorites:q.join(";")},error:r});
m=q;
l()
};
$PBJQ(n).on("click",".site-favorite-btn",function(){var t=this;
var r=$PBJQ(t).data("site-id");
var s=$PBJQ(t).data("favorite-state");
if(s==="myworkspace"){return
}var q;
if(s==="favorite"){q="nonfavorite"
}else{q="favorite"
}e(t,q);
c();
g(function(){k()
})
});
$PBJQ(p).on("click",".tab-btn",function(){if($PBJQ(this).hasClass("tab-disabled")){return false
}$PBJQ(".tab-btn",p).removeClass("active");
$PBJQ(this).addClass("active");
var q=$PBJQ(this).data("tab-target");
$PBJQ(".tab-box").hide();
$PBJQ(p).trigger("tab-shown",q);
$PBJQ("#"+q).show()
});
$PBJQ(document).on("view-sites-shown",function(){k()
});
$PBJQ(p).on("tab-shown",function(r,s){if(s==="organizeFavorites"){var q=$PBJQ("#organizeFavoritesList");
q.empty();
$PBJQ("#otherSiteTools").remove();
$PBJQ("#organizeFavoritesPurgatoryList").empty();
$PBJQ.each(m,function(u,w){if(!j[w]){return
}if($PBJQ(j[w]).hasClass("my-workspace")){return
}var v=j[w].clone(false);
v.addClass("organize-favorite-item").data("site-id",w);
var t=$PBJQ('<a href="javascript:void(0);" class="fav-drag-handle"><i class="fa fa-bars"></i></a>');
$PBJQ(".toolMenus",v).remove();
v.append(t);
q.append(v);
v.show()
});
q.sortable({handle:".fav-drag-handle",stop:function(){m=q.find(".organize-favorite-item").map(function(){return $PBJQ(this).data("site-id")
}).toArray();
g()
}});
q.disableSelection()
}});
$PBJQ(n).on("click",".toolMenus",function(q){q.preventDefault();
showToolMenu($PBJQ(this));
return false
});
$PBJQ(b).on("click",".site-favorite-btn",function(){var r=this;
if($PBJQ(r).closest(".my-workspace").length>0){return
}var s=$PBJQ(r).parent();
var q;
if($PBJQ(r).closest("#organizeFavoritesList").length==0){$PBJQ("#organizeFavoritesList").append(s);
q="favorite"
}else{$PBJQ("#organizeFavoritesPurgatoryList").append(s);
q="nonfavorite"
}e(r,q);
e(j[$PBJQ(r).data("site-id")].find(".site-favorite-btn"),q);
c();
g(function(){k()
})
});
$PBJQ(".otherSitesMenuClose").on("click",function(){dhtml_view_sites()
})
});
var profile=profile||{};
profile.requestFriend=function(b,a){$PBJQ.ajax({url:"/direct/profile/"+b+"/requestFriend?friendId="+a,dataType:"text",cache:false}).done(function(c,d,e){$PBJQ("#profile-popup-unconnected-block-"+a).hide();
$PBJQ("#profile-popup-requested-block-"+a).show()
});
return false
};
profile.confirmFriendRequest=function(b,a){$PBJQ.ajax({url:"/direct/profile/"+b+"/confirmFriendRequest?friendId="+a,dataType:"text",cache:false}).done(function(c,d,e){$PBJQ("#profile-popup-incoming-block-"+a).hide();
$PBJQ("#profile-popup-connected-block-"+a).show()
});
return false
};
profile.removeFriend=function(a,b){$PBJQ.ajax({url:"/direct/profile/"+a+"/removeFriend?friendId="+b,dataType:"text",cache:false}).done(function(c,d,e){$PBJQ("#profile-popup-connected-block-"+b).hide();
$PBJQ("#profile-popup-unconnected-block-"+b).show()
});
return false
};
profile.ignoreFriendRequest=function(a,b){$PBJQ.ajax({url:"/direct/profile/"+a+"/ignoreFriendRequest?friendId="+b,dataType:"text",cache:false}).done(function(c,d,e){$PBJQ("#profile-popup-requested-block-"+b).hide();
$PBJQ("#profile-popup-incoming-block-"+b).hide();
$PBJQ("#profile-popup-unconnected-block-"+b).show()
});
return false
};
function publishSite(c){var b="/direct/site/"+c+"/edit";
var a=$PBJQ.ajax({type:"POST",data:"published=true",url:b,success:function(){location.reload()
}}).responseText
}function quickLinksNavEscHandler(a){if(a.keyCode===27){toggleQuickLinksNav(a)
}}function toggleQuickLinksNav(b){b.preventDefault();
if(!$PBJQ(".Mrphs-userNav__subnav").hasClass("is-hidden")){toggleUserNav(b)
}$PBJQ(".Mrphs-quickLinksNav__subnav").toggleClass("is-hidden");
if(!$PBJQ(".Mrphs-quickLinksNav__subnav").hasClass("is-hidden")){var a=$PBJQ('<div class="quicklinks-dropdown-overlay" />');
a.on("click",function(c){toggleQuickLinksNav(c)
});
$PBJQ("body").prepend(a);
$PBJQ(document).on("keyup",quickLinksNavEscHandler)
}else{$PBJQ(".quicklinks-dropdown-overlay").remove();
$PBJQ(document).off("keyup",quickLinksNavEscHandler)
}}$PBJQ("#quickLinks-close").on("click",toggleQuickLinksNav);
$PBJQ(".js-toggle-quick-links-nav").on("click",toggleQuickLinksNav);
function toggleToolsNav(a){if(a){a.preventDefault()
}$PBJQ("body").toggleClass("toolsNav--displayed");
if($PBJQ("body").hasClass("toolsNav--displayed")){createDHTMLMask(toggleToolsNav);
var b=$PBJQ(".js-toggle-tools-nav").offset().top-$(window).scrollTop();
if(b<0){b=0
}$PBJQ("#toolMenuWrap").css("height",$PBJQ(window).height()-b)
}else{removeDHTMLMask()
}}$PBJQ(document).ready(function(){$PBJQ("i.clickable","#roleSwitch").click(function(){$PBJQ(this).next("select").toggleClass("active")
});
$PBJQ("#roleSwitchSelect").on("change",function(){if($PBJQ("option:selected",this).text()!==""){document.location=$PBJQ("option:selected",this).val()
}else{$PBJQ(this)[0].selectedIndex=0
}})
});
$PBJQ(".js-toggle-tools-nav","#skipNav").on("click",toggleToolsNav);
var sessionId="current";
var sessionTimeOut;
var timeoutDialogEnabled=false;
var timeoutDialogWarningTime;
var timeoutLoggedoutUrl;
var timeoutPortalPath;
$PBJQ(document).ready(function(){if(portal.loggedIn&&portal.timeoutDialog){setTimeout("setup_timeout_config();",60000)
}});
var setup_timeout_config=function(){timeoutDialogEnabled=portal.timeoutDialog.enabled;
timeoutDialogWarningTime=portal.timeoutDialog.seconds;
timeoutLoggedoutUrl=portal.loggedOutUrl;
timeoutPortalPath=portal.portalPath;
if(timeoutDialogEnabled==true){poll_session_data();
fetch_timeout_dialog()
}};
var poll_session_data=function(){$PBJQ.ajax({url:"/direct/session/"+sessionId+".json?auto=true&_="+(new Date()).getTime(),dataType:"json",success:function(b){b.maxInactiveInterval=b.maxInactiveInterval*1000;
if(b.active&&b.userId!=null&&b.lastAccessedTime+b.maxInactiveInterval>b.currentTime){var a=b.lastAccessedTime+b.maxInactiveInterval-b.currentTime;
if(a<timeoutDialogWarningTime*1000){min=Math.round(a/(1000*60));
show_timeout_alert(min);
clearTimeout(sessionTimeOut);
sessionTimeOut=setTimeout("poll_session_data()",1000*60)
}else{clearTimeout(sessionTimeOut);
sessionTimeOut=setTimeout("poll_session_data()",(a-timeoutDialogWarningTime*1000))
}}else{if(b.userId==null){location.href=timeoutLoggedoutUrl
}else{sessionTimeOut=setTimeout("poll_session_data()",1000*10)
}}},error:function(a,b,c){}})
};
function keep_session_alive(){dismiss_session_alert();
$PBJQ.get(timeoutPortalPath)
}var dismiss_session_alert=function(){removeDHTMLMask();
$PBJQ("#timeout_alert_body").remove()
};
var timeoutDialogFragment;
function fetch_timeout_dialog(){$PBJQ.ajax({url:"/portal/timeout?auto=true",cache:true,dataType:"text",success:function(a){timeoutDialogFragment=a
},error:function(a,b,c){timeoutDialogEnabled=false
}})
}function show_timeout_alert(b){if(!timeoutDialogEnabled){return
}if(!$PBJQ("#portalMask").get(0)){createDHTMLMask(dismiss_session_alert);
$PBJQ("#portalMask").css("z-index",1000)
}if($PBJQ("#timeout_alert_body").get(0)){$PBJQ("#timeout_alert_body span").html(b)
}else{var a=timeoutDialogFragment.replace("{0}",b);
$PBJQ("body").append(a)
}}function toggleShortUrlOutput(c,a,b){if($PBJQ(a).is(":checked")){$PBJQ.ajax({url:"/direct/url/shorten?path="+encodeURI(c),dataType:"text",success:function(d){$PBJQ("."+b).val(d)
}})
}else{$PBJQ("."+b).val(c)
}}$PBJQ(document).ready(function(){$PBJQ(".Mrphs-toolTitleNav__link--directurl").click(function(b){var a=$PBJQ(this).position();
$PBJQ(this).siblings(".Mrphs-directUrl").toggleClass("active").css({left:a.left+"px"});
b.preventDefault()
});
$PBJQ(".Mrphs-directUrl .dropDown_close").click(function(a){$PBJQ(this).parent().toggleClass("active");
a.preventDefault()
})
});
var setupSkipNav=function(){$PBJQ("#skipNav a.Mrphs-skipNav__link").click(function(){var a=$PBJQ(this).attr("href");
$PBJQ(a).attr("tabindex","-1").focus()
})
};
$PBJQ(document).ready(function(){var a=0;
$PBJQ(document).scroll(function(c){var b=$PBJQ(this).scrollTop();
if(b>a&&b>90){$PBJQ(".Mrphs-topHeader").addClass("moving");
$PBJQ(".Mrphs-siteHierarchy").addClass("moving");
$PBJQ(".Mrphs-toolsNav__title--current-site").addClass("moving");
$PBJQ(".Mrphs-skipNav__menu").addClass("moving");
$PBJQ(".Mrphs-sitesNav__menuitem--myworkspace").addClass("moving")
}else{if(b>90){$PBJQ(".Mrphs-topHeader").removeClass("moving");
$PBJQ(".Mrphs-siteHierarchy").removeClass("moving");
$PBJQ(".Mrphs-toolsNav__title--current-site").removeClass("moving");
$PBJQ(".Mrphs-skipNav__menu").removeClass("moving");
$PBJQ(".Mrphs-sitesNav__menuitem--myworkspace").removeClass("moving")
}}a=b
})
});
var closeAllDropdownMenus=function(){$PBJQ(".Mrphs-sitesNav__menuitem").removeClass("dropdown-is-visible");
$PBJQ(".Mrphs-sitesNav__menuitem").find(".is-visible").removeClass("is-visible");
$PBJQ(".Mrphs-sitesNav__menuitem").find(".is-clicked").removeClass("is-clicked");
$PBJQ(".sitenav-dropdown-overlay").remove()
};
var buildDropdownMenu=function(b,a,g){var i='<ul class="Mrphs-sitesNav__submenu" role="menu">';
var e=parseInt($PBJQ("#linkNav").attr("data-max-tools-int"));
var d=$PBJQ("#linkNav").attr("data-max-tools-anchor");
var c='<li class="Mrphs-sitesNav__submenuitem"><a role="menuitem" href="'+portal.portalPath+"/site/"+a+'" title="'+d+'"><span class="toolMenuIcon icon-sakai--see-all-tools"></span>'+d+"</a></li>";
var f="/direct/site/"+a+"/pages.json";
var h=window.location.pathname.split("/").pop();
$PBJQ.ajax({url:f,dataType:"json",success:function(j){$PBJQ.each(j,function(l,m){if(!m.tools||m.tools.length<=0){return
}var k="";
if(h==m.tools[0].id){k=" is-current"
}if(l<=e){var o;
if(m.toolpopup){var n=' role="menuitem" href="{{tool_url}}?sakai.popup=yes" title="{{item_title}}" onclick="window.open(\'{{item_toolpopupurl}}\');"';
o='<li class="Mrphs-sitesNav__submenuitem" ><a class="Mrphs-sitesNav__submenuitem-icon"'+n+'><span class="toolMenuIcon icon-sakai--{{icon}}"></span></a><a class="Mrphs-sitesNav__submenuitem-title"'+n+">{{item_title}}</a></li>"
}else{var n=' role="menuitem" href="{{tool_url}}" title="{{item_title}}"';
o='<li class="Mrphs-sitesNav__submenuitem{{is_current}}"><a class="Mrphs-sitesNav__submenuitem-icon"'+n+'><span class="toolMenuIcon icon-sakai--{{icon}}"></span></a><a class="Mrphs-sitesNav__submenuitem-title"'+n+">{{item_title}}</a></li>"
}i+=(o.replace(/{{tool_url}}/g,m.tools[0].url).replace(/{{item_title}}/g,m.title).replace(/{{item_toolpopupurl}}/g,m.toolpopupurl).replace(/{{icon}}/g,m.tools[0].toolId.replace(/\./gi,"-")).replace(/{{is_current}}/g,k))
}});
if((j.length-1)>e){i+=c
}i+="</ul>";
i=$PBJQ(i);
b.append(i);
addArrowNavAndDisableTabNav(i);
g(i)
},error:function(k,l,j){}})
};
var setupSiteNav=function(){$PBJQ("ul.Mrphs-sitesNav__menu").each(function(){$PBJQ(this).keydown(function(a){if(a.keyCode==27){closeAllDropdownMenus()
}})
});
$PBJQ(document).on("keydown",".Mrphs-sitesNav__menu > li.Mrphs-sitesNav__menuitem > a",function(a){if(a.keyCode==40){a.preventDefault();
var b=$PBJQ(this).parent().find(".Mrphs-sitesNav__dropdown");
if(b.data("clicked")){}else{b.data("clicked",true);
b.trigger("click",[true])
}}else{if(a.keyCode==27){a.preventDefault();
closeAllDropdownMenus()
}}});
$PBJQ("ul.Mrphs-sitesNav__menu li .Mrphs-sitesNav__dropdown").click(function(b,g){b.preventDefault();
var d=$PBJQ(b.target);
var f=d.parent(".Mrphs-sitesNav__menuitem");
var c=f.hasClass("dropdown-is-visible");
closeAllDropdownMenus();
if(c){return
}var a=$PBJQ(this);
var h=function(i){a.addClass("is-clicked");
f.addClass("dropdown-is-visible");
i.addClass("is-visible");
if(g){f.find("a.Mrphs-sitesNav__submenuitem-title").first().focus()
}var e=$PBJQ('<div class="sitenav-dropdown-overlay" />');
e.on("click",function(j){closeAllDropdownMenus()
});
$PBJQ("body").prepend(e);
a.removeData("clicked")
};
if(!f.find("ul").length){buildDropdownMenu(f,d.attr("data-site-id"),h)
}else{h(f.find("ul"))
}}).hover(function(){$PBJQ(this).toggleClass("Mrphs-sitesNav__dropdown--hover")
})
};
function addArrowNavAndDisableTabNav(a){a.find("li a").attr("tabindex","-1").keydown(function(f){var d=$PBJQ(f.target);
if(f.keyCode==40){f.preventDefault();
var b=d.closest("li").next();
if(b.length===0||b.find("a.Mrphs-sitesNav__submenuitem-title").length==0){b=a.find("li").first()
}b.find("a.Mrphs-sitesNav__submenuitem-title").focus()
}else{if(f.keyCode==38){f.preventDefault();
var c=d.closest("li").prev();
if(c.length===0){c=a.find("a.Mrphs-sitesNav__submenuitem-title").closest("ul")
}c.find("a.Mrphs-sitesNav__submenuitem-title").focus()
}else{if(f.keyCode==9){closeAllDropdownMenus()
}}}})
}function toggleMinimizeNav(){$PBJQ("body").toggleClass("Mrphs-toolMenu-collapsed");
var b=$PBJQ(this);
var a=$PBJQ(".accessibility-btn-label",b);
b.toggleClass("min max");
if(a.text()==b.data("title-expand")||collapsed){document.cookie="sakai_nav_minimized=false; path=/";
collapsed=false;
a.text(b.data("text-original"));
b.attr("title",(b.data("text-original")));
b.attr("aria-pressed",true)
}else{document.cookie="sakai_nav_minimized=true; path=/";
collapsed=true;
b.data("text-original",a.text());
a.text(b.data("title-expand"));
b.attr("title",(b.data("title-expand")));
b.attr("aria-pressed",false)
}}$PBJQ(".js-toggle-nav").on("click",toggleMinimizeNav);
var collapsed=false;
var $window=$PBJQ(window),$tools=$("#toolMenu"),$bread=$(".Mrphs-siteHierarchy"),padding=$bread.height()+getNumPart($bread.css("padding-top"))+getNumPart($bread.css("padding-bottom"))+$(".Mrphs-topHeader").height();
$PBJQ(document).ready(function(){if(getCookieVal("sakai_nav_minimized")==="true"){$PBJQ(".js-toggle-nav").click();
collapsed=true
}});
$PBJQ(window).scroll(function(){if($("#toolMenuWrap").attr("scrollingToolbarEnabled")!=undefined){var b=$(".pasystem-banner-alerts").height();
var a=($window.height()-(padding+b))>$tools.height()&&($window.scrollTop()>padding);
if($("#toolMenuWrap").css("position")!=="fixed"&&a&&$window.scrollTop()>0){$("#toolMenu,#subSites").stop().animate({top:$window.scrollTop()+b-padding})
}else{$("#toolMenu,#subSites").stop().animate({top:0})
}}});
$PBJQ("#toggleSubsitesLink").click(function(a){var d=$PBJQ(this);
if($PBJQ("#subSites").css("display")=="block"){$PBJQ("#subSites").hide();
$PBJQ("#subSites").removeClass("floating")
}else{var c=d.position();
var b=(-1*($PBJQ("#toolMenu").height()-c.top));
$PBJQ("#subSites").css({display:"block",left:c.left+d.width()+6+"px",top:b+"px"});
$PBJQ("#subSites").addClass("floating");
if($PBJQ("#toggleSubsitesLink").position().top<240){$PBJQ("#subSites.floating").addClass("ontop")
}}});
function getCookieVal(b){var a=document.cookie.split(";");
for(var d=0;
d<a.length;
++d){var c=(a[d].substring(0,a[d].indexOf("="))).trim();
if(c===b){return((a[d].split("="))[1]).trim()
}}return"false"
}function getNumPart(b){for(var a=b.length-1;
a>=0;
a--){if(!isNaN(Number(b.charAt(a)))){return Number(b.substring(0,a+1))
}}}function updatePresence(){$PBJQ.ajax({url:sakaiPresenceFragment,cache:false,success:function(d){var c=d.indexOf("<ul");
if(c<1){$PBJQ("#presenceCount").html(" ");
$PBJQ("#presenceCount").removeClass("present").addClass("empty");
location.reload();
return
}d=d.substr(c);
var b=d;
var f="<li";
var e=0;
for(var a=0;
a<b.length;
a++){if(f==b.substr(a,f.length)){e++
}}if(e>1){$PBJQ("#presenceCount").html(e+"");
$PBJQ("#presenceCount").removeClass("empty").addClass("present")
}else{if(e==1){$PBJQ("#presenceCount").html(e+"");
$PBJQ("#presenceCount").removeClass("present").addClass("empty")
}else{$PBJQ("#presenceCount").html(" ");
$PBJQ("#presenceCount").removeClass("present").addClass("empty")
}}$PBJQ("#presenceIframe").html(d);
var g=$PBJQ(".nav-selected .icon-sakai-chat").attr("href");
$PBJQ("#presenceIframe .presenceList li.inChat span").wrap('<a href="'+g+'"></a>');
sakaiLastPresenceTimeOut=setTimeout("updatePresence()",30000)
},error:function(b,a){sakaiLastPresenceTimeOut=setTimeout("updatePresence()",60000)
}})
}function userNavEscHandler(a){if(a.keyCode===27){toggleUserNav(a)
}}function toggleUserNav(b){b.preventDefault();
$PBJQ(".Mrphs-userNav__subnav").toggleClass("is-hidden");
if(!$PBJQ(".Mrphs-userNav__subnav").hasClass("is-hidden")){var a=$PBJQ('<div class="user-dropdown-overlay" />');
a.on("click",function(c){toggleUserNav(c)
});
$PBJQ("body").prepend(a);
$PBJQ(document).on("keyup",userNavEscHandler)
}else{$PBJQ(".user-dropdown-overlay").remove();
$PBJQ(document).off("keyup",userNavEscHandler)
}}$PBJQ("#loginLink1").click(function(a){if($PBJQ(this).attr("data-warning")!==""&&!confirm($PBJQ(this).attr("data-warning"))){a.preventDefault()
}});
$PBJQ(".js-toggle-user-nav a#loginUser > .Mrphs-userNav__drop-btn","#loginLinks").on("click",toggleUserNav);
$PBJQ(".js-toggle-user-nav .Mrphs-userNav__drop-btn","#loginLinks").on("click",toggleUserNav);
$PBJQ(document).ready(function(){if($PBJQ(".Mrphs-hierarchy--parent-sites").length>0&&$PBJQ(window).width()<=800){$PBJQ("#content").css("margin-top",(parseInt($PBJQ("#content").css("margin-top").replace("px",""))+$PBJQ(".Mrphs-hierarchy--parent-sites").outerHeight(true))+"px")
}});
function f_scrollTop(){return f_filterResults(window.pageYOffset?window.pageYOffset:0,document.documentElement?document.documentElement.scrollTop:0,document.body?document.body.scrollTop:0)
}function f_filterResults(b,d,c){var a=b?b:0;
if(d&&(!a||(a>d))){a=d
}return c&&(!a||(a>c))?c:a
}$PBJQ(document).ready(function(){$PBJQ("input, textarea","#content").each(function(){if($PBJQ(this).prop("disabled")){$PBJQ(this).parent("label").addClass("disabled")
}});
$PBJQ(document).keyup(function(a){if(a.keyCode==27){if(!$PBJQ("#selectSiteModal").hasClass("outscreen")){$PBJQ("#otherSitesMenu .otherSitesMenuClose").trigger("click")
}$PBJQ(".Mrphs-directUrl__dropDown").each(function(){if($PBJQ(this).hasClass("active")){$PBJQ(this).find(".dropDown_close").trigger("click")
}});
$PBJQ(".fip-icon-up-dir").trigger("click");
$PBJQ(".navigatePanelControls .close").trigger("click")
}})
});
$PBJQ(document).ready(function(){if($PBJQ("#loginLink2").length==1){$PBJQ("#loginLink2").click(function(a){$PBJQ("body").append('<div id="Mrphs-xlogin-container" />');
$PBJQ("#Mrphs-xlogin-container").load("/portal/xlogin #Mrphs-xlogin",function(){$PBJQ("#Mrphs-xlogin-container").addClass("loaded");
$PBJQ("#Mrphs-xlogin").addClass("loadedByAjax");
$PBJQ("#eid").focus()
});
$PBJQ(".Mrphs-portalWrapper").addClass("blurry");
$PBJQ("body").append('<div id="loginPortalMask" />');
$PBJQ("#loginPortalMask").bgiframe();
$PBJQ("#loginPortalMask").click(function(){$PBJQ("#loginPortalMask").remove();
$PBJQ("#Mrphs-xlogin-container").remove();
$PBJQ(".Mrphs-portalWrapper").removeClass("blurry")
});
a.preventDefault()
})
}});