/*!build time : 2014-04-03 11:03:51 AM*/
KISSY.add("gallery/datetimepicker/1.0/index",function(a,b,c,d){function e(a){return this instanceof e?(this.config={value:"",start:null,end:null,acceptTime:{start:null,end:null},lang:"zh-cn",format:"YYYY-MM-DD HH:mm",formatTime:"HH:mm",formatTimeForShow:"Ahh:mm",formatDate:"YYYY-MM-DD",startWithMonday:!1,minuteSelect:!1,inverseButton:!1,disableDateScroll:!1,closeOnDateSelect:!1,closeOnTimeSelect:!0,timepicker:!0,datepicker:!0,todayButton:!0,showDateLen:!0,yearStart:1919,yearEnd:2049,timeHeightInTimePicker:26,id:"",className:""},this.DTPTarget=null,void this.init(a)):new e(a)}var f={datePicker:'<div class="dtp-date"><div class="date-header"><a title="\u4e0a\u4e2a\u6708" class="icon icon-l">l</a><a class="icon icon-h" title="\u4eca\u5929"class="icon">h</a><select class="header-year"></select><select class="header-month"></select><a class="icon icon-r" class="\u4e0b\u4e2a\u6708">r</a></div><div class="data-calendar"></div></div>',timePicker:'<div class="dtp-time"><a class="icon icon-t" title="\u663e\u793a\u66f4\u65e9\u7684\u65f6\u95f4">t</a><div class="time-picker"><ul class="picker-list"></ul></div><a class="icon icon-d" title="\u663e\u793a\u66f4\u665a\u7684\u65f6\u95f4">d</a></div>'},g="",h="",i="";return a.augment(e,c.Target,{init:function(e){var f=this;if(a.mix(f.config,e),d.lang(f.config.lang),f.adjustCfg(f.config),f.DTPTarget=this.createEl(),f.bindGlobalEvents(),f.config.start){var g=f.config.start,h=b.css(g,"position");"static"===h&&b.css(g,{position:"relative"}),c.on(g,"click",function(){var c=b.val(g);if(c===a.trim(i)&&f.trigger==g)b.css(f.DTPTarget,{display:"","z-index":"99999"});else{f.trigger=g,f.fillEl(g);{a.now()}f.bindMainEvents();var d=b.offset(g);b.css(f.DTPTarget,{position:"absolute",top:parseFloat(d.top)+parseFloat(b.css(g,"height"))+5+"px",left:parseFloat(d.left)+"px",display:"","z-index":"99999"})}f.setGlobalTime()}),b.append(f.DTPTarget,"body")}if(f.config.end){var j=f.config.end,h=b.css(j,"position");"static"===h&&b.css(j,{position:"relative"}),c.on(j,"click",function(){f.trigger=j,f.fillEl(j),f.bindMainEvents();var a=b.offset(j);b.css(f.DTPTarget,{position:"absolute",top:parseFloat(a.top)+parseFloat(b.css(j,"height"))+5+"px",left:parseFloat(a.left)+"px",display:"","z-index":"99999"})})}f.config.start||f.config.end||(this.fillEl(),this.bindMainEvents())},show:function(){var a=this;return a.fire("showPanel"),b.css(a.DTPTarget,{display:"","z-index":"999"}),a.DTPTarget},hide:function(){this.fire("hidePanel"),b.css(this.DTPTarget,{display:"none","z-index":"1"})},createEl:function(){var c=this,d='<div class="ks-dtp dtp-'+a.now()+'" style="display:none;">';return c.config.datepicker&&(d+=f.datePicker),c.config.timepicker&&(d+=f.timePicker),d=b.create(d)},bindGlobalEvents:function(){var e=this;if(e.config.datepicker){var f=b.get(".data-calendar",e.DTPTarget);c.on(b.get(".icon-l",e.DTPTarget),"click",function(a){a.halt(),e.fire("clickLastMonth");var c=b.get(".selected-date",e.DTPTarget),f=new d(b.attr(c,"data-full-date"));f.subtract("month",1),e.createDateEl(f),e.bindDateEvent(),e.trigger&&e.setDateToTrigger()}),c.on(b.get(".icon-r",e.DTPTarget),"click",function(a){a.halt(),e.fire("clickNextMonth");var c=b.get(".selected-date",e.DTPTarget),f=new d(b.attr(c,"data-full-date"));f.add("month",1),e.createDateEl(f),e.bindDateEvent(),e.trigger&&e.setDateToTrigger()}),c.on(b.get(".icon-h",e.DTPTarget),"click",function(b){b.halt(),e.fire("clickToday");var c=new d(a.now());if(e.createDateEl(c),e.bindDateEvent(),e.config.timepicker){var f=e.createTimeEl(c);e.bindTimeEvent(),e.scrollTime(f)}e.trigger&&e.setDateToTrigger()});var g=b.get(".header-year",e.DTPTarget);c.on(g,"change",function(){e.fire("changeYear");var a=b.get(".selected-date",f),c=new d(b.attr(a,"data-full-date")),h=b.val(g);c.years(h),e.createDateEl(c),e.bindDateEvent(),e.trigger&&e.setDateToTrigger()});var h=b.get(".header-month",e.DTPTarget);c.on(h,"change",function(){e.fire("changeMonth");var a=b.get(".selected-date",f),c=new d(b.attr(a,"data-full-date")),g=b.val(h);c.month(g),e.createDateEl(c),e.bindDateEvent(),e.trigger&&e.setDateToTrigger()})}if(e.config.timepicker){var i=b.get(".time-picker",e.DTPTarget),j=b.get(".icon-t",e.DTPTarget);c.on(j,"click",function(){e.fire("clickTimeUp");var a=b.get(".selected-time",i),d=b.prev(a,"li");if(d){c.fire(i,"click",{target:d,isDefault:!1});var f=parseInt(b.attr(d,"data-index"));e.scrollTime(f),e.trigger&&e.setDateToTrigger()}});var k=b.get(".icon-d",e.DTPTarget);c.on(k,"click",function(){e.fire("clickTimeDown");var a=b.get(".selected-time",i),d=b.next(a,"li");if(d){c.fire(i,"click",{target:d,isDefault:!1});var f=parseInt(b.attr(d,"data-index"));e.scrollTime(f),e.trigger&&e.setDateToTrigger()}})}e.config.start&&c.on("body","click",function(a){var c=a.target;c===e.config.start||c===e.config.end||b.hasClass(c,"ks-dtp")||b.parent(c,".ks-dtp")||b.hasClass(c,"other-month-day")||(b.css(e.DTPTarget,{display:"none","z-index":1}),e.fire("hidePanel"))})},bindMainEvents:function(){var a=this;if(a.config.datepicker){var c=b.get(".data-calendar",a.DTPTarget),a=this;this.bindScrollEvent(c),this.bindDateEvent()}if(a.config.timepicker&&this.bindTimeEvent(),!a.config.todayButton){var d=b.get(".icon-h",a.DTPTarget),e=b.get(".header-month",a.DTPTarget);b.css(d,{visibility:"hidden",width:"5px"}),b.css(e,{"margin-right":"17px"})}a.config.id&&b.attr(a.DTPTarget,"id",a.config.id),a.config.className&&b.addClass(a.DTPTarget,a.config.className)},bindDateEvent:function(){var e=this,f=b.get(".data-calendar",e.DTPTarget);if(c.detach(f,"click"),c.on(f,"click",function(a){e.fire("clickDate");var c=a.target;if("td"===c.nodeName.toLowerCase()){var h=b.attr(c,"data-month"),i=b.get(".selected-date",f);if(c!==i){e.fire("clickDateChange");var j=b.attr(i,"data-month"),k=new d(b.attr(c,"data-full-date")),l=k.year();if(h!==j){if(l>e.config.yearEnd||l<e.config.yearStart)return;e.createDateEl(k),e.bindDateEvent()}else b.removeClass(i,"selected-date"),b.addClass(c,"selected-date");g=k.format(e.config.formatDate),e.setGlobalTime(),e.trigger&&e.setDateToTrigger()}e.config.closeOnDateSelect&&e.hide()}}),e.config.showDateLen&&e.config.start&&e.trigger==e.config.end){var h=b.query("td",f);c.detach(h,"mouseenter"),c.on(h,"mouseenter",function(c){var g=c.target,i=b.attr(e.config.start,"data-init-time")||b.val(e.config.start),j=new d(i,e.config.format),k=j.years(),l=parseInt(b.attr(g,"data-year")),m=j.months(),n=parseInt(b.attr(g,"data-month")),o=j.date(),p=parseInt(b.attr(g,"data-date"));if(k>l);else if(l===k&&m>n);else if(!(n===m&&o>p)){var q=b.get(".start-el-date",f);q||(q=b.get("td",f));var r=b.attr(q,"data-index"),s=b.attr(g,"data-index");return void a.each(h,function(a,c){b.removeClass(a,"selected-duration-day"),c>=r&&s>=c&&b.addClass(a,"selected-duration-day")})}a.each(h,function(a){b.removeClass(a,"selected-duration-day")})}),c.detach(h,"mouseleave"),c.on(h,"mouseleave",function(){a.each(h,function(a){b.removeClass(a,"selected-duration-day")})})}},bindTimeEvent:function(){var a=this,e=b.get(".time-picker",a.DTPTarget);c.detach(e,"click"),c.on(e,"click",function(c){c.halt(),a.fire("clickTime");var f=c.target;if("li"===f.nodeName.toLowerCase()){var g=b.get(".selected-time",e);if(g!==f){a.fire("clickTimeChange"),b.removeClass(g,"selected-time"),b.addClass(f,"selected-time");var i=new d(b.attr(f,"data-time"),"HH:mm");h=i.format(a.config.formatTime),a.setGlobalTime(),a.trigger&&a.setDateToTrigger()}c.isDefault!==!1&&a.config.closeOnTimeSelect&&a.hide()}})},bindScrollEvent:function(e){var f=this;if(!(a.UA.ie<8||f.config.disableDateScroll)){var g=new d(a.now());c.on(e,"wheel mousewheel DOMMouseScroll MozMousePixelScroll",function(a){a.halt();var c=a.originalEvent||window.event,d=0,h=0,i=0;if("detail"in c&&(i=-1*c.detail),"wheelDelta"in c&&(i=c.wheelDelta),"wheelDeltaY"in c&&(i=c.wheelDeltaY),"wheelDeltaX"in c&&(h=-1*c.wheelDeltaX),"axis"in c&&c.axis===c.HORIZONTAL_AXIS&&(h=-1*i,i=0),d=0===i?h:i,"deltaY"in c&&(i=-1*c.deltaY,d=i),"deltaX"in c&&(h=c.deltaX,0===i&&(d=-1*h)),0!==i||0!==h){var j;if(f.config.inverseButton?(-2>i&&(j="add"),i>2&&(j="subtract")):(-2>i&&(j="subtract"),i>2&&(j="add")),j){var k=b.get(".selected-date",e),l=parseInt(b.attr(k,"data-month"))+1,m=parseInt(b.attr(k,"data-year"));if(m<=f.config.yearEnd&&m>=f.config.yearStart){if(m===f.config.yearEnd&&12==l&&"add"===j)return;if(m===f.config.yearStart&&1==l&&"subtract"===j)return;g.year(b.attr(k,"data-year")),g.month(b.attr(k,"data-month")),g.date(b.attr(k,"data-date")),g[j]("month",1),f.createDateEl(g),f.bindDateEvent(),f.trigger&&f.setDateToTrigger()}}}})}},setDateToTrigger:function(){var a=this;a.config.datepicker?a.config.timepicker?b.val(a.trigger,i):b.val(a.trigger,g):a.config.timepicker?b.val(a.trigger,h):new Error("no trigger and show nothing!")},scrollTime:function(a){var c=this;a&&a>2&&setTimeout(function(){b.get(".time-picker",c.DTPTarget).scrollTop=c.config.timeHeightInTimePicker*(a-3)},0)},fillEl:function(c){var e,f=this,g=f.config.value||a.now(),h="";f.config.datepicker&&(h=f.config.formatDate),f.config.timepicker&&(h=f.config.formatTime),f.config.datepicker&&f.config.timepicker&&(h=f.config.format),c&&b.val(c)?e=new d(b.val(c),h):(e=new d(g),b.val(c,e.format(h))),timeIndex=0,f.config.timepicker?timeIndex=this.createTimeEl(e):b.remove(b.get(".dtp-time",f.DTPTarget)),f.config.datepicker?this.createDateEl(e):b.remove(b.get(".dtp-date",f.DTPTarget)),this.scrollTime(timeIndex)},createTimeEl:function(a){var c,e,f=this,g=b.get(".picker-list",f.DTPTarget),i="";h=a.format(f.config.formatTime),f.setGlobalTime();var j=f.config.minuteSelect,k=j?1440:24,l=j?"minutes":"hours";j||(a.minute(0),a.second(0),a.millisecond(0));var m=a.format(f.config.formatTime),n=new d(a);n.hour(0),n.minute(0),n.second(0),n.millisecond(0);for(var o=0,p=0,q="",r=0;k>r;r++)e=n.format(f.config.formatTimeForShow||f.config.formatTime),c=n.format(f.config.formatTime),o=j?r%60:r,c===m?(p=r,q=' class="selected-time"'):q="",i+="<li"+q+' data-time="'+n.format("HH:mm")+'" data-index="'+r+'">'+e+"</li>",n[l](o+1);return g.innerHTML=i,p},createDateEl:function(c){var e=this,f=b.get(".data-calendar",e.DTPTarget),h="<table><thead><tr>",i=d.weekdaysShort();e.config.startWithMonday&&i.push(i.shift());for(var j=0;7>j;j++)h+="<th>"+i[j]+"</th>";h+="</tr></thead>",h+="<tbody><tr>",g=c.format(e.config.formatDate),e.setGlobalTime();var k=new d(c._d);k.date(1);var l=e.config.startWithMonday?7:6,m=e.config.startWithMonday?1:7;for(e.config.startWithMonday?7:1;k.isoWeekday()!==m;)k.subtract("d",1);var n=c.month(),o=c.date(),p=k.years(),q=k.month(),r=k.date(),s="other-month-day",t="",u=0==n?11:n-1,v=11==n?0:n+1,w=0;if(e.trigger==e.config.end)var x=new d(b.val(e.config.start)),y=(x.format(e.config.formatDate),x.years()),z=x.months(),A=x.date();for(;!(q!==u&&q!==n&&q!==v||(p=k.years(),q=k.month(),r=k.date(),s=q===n?o===r?"selected-date":"":"other-month-day",t=A&&p===y&&q==z&&A==r?" start-el-date":"",h+='<td data-date="'+r+'" data-month="'+q+'" data-year="'+k.year()+'" class="'+s+t+'" data-full-date="'+k.format("YYYY-MM-DD")+'" data-index="'+w+'">'+r+"</td>",l===k.isoWeekday()&&(h+="</tr>"),k.add("d",1),q=k.month(),q===v&&k.isoWeekday()===m&&w>27));)w++;f.innerHTML=h;var B=b.get(".header-year",e.DTPTarget),C=b.get("option",B);if(!C){for(var D="",E=e.config.yearEnd,j=e.config.yearStart;E>=j;j++)if(D+='<option value="'+j+'" class="year-op-'+j+'">'+j+"</option>",a.UA.ie<10){var F=document.createElement("OPTION");F.value=j,F.text=j,F.className="year-op-"+j,B.options.add(F)}(!a.UA.ie||a.UA.ie>=10)&&(B.innerHTML=D)}var G=b.get(".year-op-selected",e.DTPTarget);G&&(b.removeAttr(G,"selected"),b.removeClass(G,"year-op-selected"));var H=b.get(".year-op-"+c.years(),e.DTPTarget);b.attr(H,"selected","selected"),b.addClass(H,"year-op-selected");var I=b.get(".header-month",e.DTPTarget);if(C=b.get("option",I),!C){for(var J,D="",K=d.months(),j=0;11>=j;j++){var q=K[j];if(J='<option value="'+q+'" class="month-op-'+j+'">'+q+"</option>",D+=J,a.UA.ie<10){var F=document.createElement("OPTION");F.value=q,F.text=q,F.className="month-op-"+j,I.options.add(F)}}(!a.UA.ie||a.UA.ie>=10)&&(I.innerHTML=D)}var G=b.get(".month-op-selected",e.DTPTarget);G&&(b.removeAttr(G,"selected"),b.removeClass(G,"month-op-selected"));var H=b.get(".month-op-"+c.months(),e.DTPTarget);b.attr(H,"selected","selected"),b.addClass(H,"month-op-selected")},getDate:function(){return g},getTime:function(){return h},getDateTime:function(){return i},setGlobalTime:function(){i=g+" "+h},adjustCfg:function(){var a=this;a.config.start=b.get(a.config.start),a.config.end=b.get(a.config.end)}}),e},{requires:["dom","event","gallery/moment/1.0/index","./base.css"]});