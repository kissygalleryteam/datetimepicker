/*!build time : 2015-03-09 7:55:04 PM*/
KISSY.add("kg/datetimepicker/2.0.3/index",function(a,b,c,d){function e(a){return this instanceof e?(this.config={value:"",start:null,end:null,acceptTime:[],lang:"zh-cn",format:"YYYY-MM-DD HH:mm",formatTime:"HH:mm",formatTimeForShow:"Ahh:mm",formatDate:"YYYY-MM-DD",startWithMonday:!1,minuteSelect:!1,inverseButton:!1,disableDateScroll:!0,closeOnDateSelect:!1,closeOnTimeSelect:!0,timepicker:!0,datepicker:!0,todayButton:!0,showDateLen:!0,yearStart:1919,yearEnd:2049,timeHeightInTimePicker:26,id:"",className:""},this.DTPTarget=null,void this.init(a)):new Error("\u5fc5\u987b\u4f7f\u7528new\u6765\u521b\u5efaDateTimePicker\u7684\u5b9e\u4f8b")}var f={datePicker:'<div class="dtp-date"><div class="date-header"><a title="\u4e0a\u4e2a\u6708" class="icon icon-l">l</a><a class="icon icon-h" title="\u4eca\u5929"class="icon">h</a><select class="header-year"></select><select class="header-month"></select><a class="icon icon-r" class="\u4e0b\u4e2a\u6708">r</a></div><div class="data-calendar"></div></div>',timePicker:'<div class="dtp-time"><a class="icon icon-t" title="\u663e\u793a\u66f4\u65e9\u7684\u65f6\u95f4">t</a><div class="time-picker"><ul class="picker-list"></ul></div><a class="icon icon-d" title="\u663e\u793a\u66f4\u665a\u7684\u65f6\u95f4">d</a></div>'},g="",h="",i="";return a.augment(e,c.Target,{init:function(e){var f=this;a.mix(f.config,e),f.adjustCfg(f.config);var g=f.config;if(d.lang(g.lang),f.DTPTarget=this.createEl(),f.bindGlobalEvents(),g.start){var h=g.start,j=b.css(h,"position");"static"===j&&b.css(h,{position:"relative"}),c.on(h,"click",function(){var c=b.val(h);if(c===a.trim(i)&&f.trigger==h);else{f.trigger=h,f.fillEl(h);var d=b.offset(h);b.css(f.DTPTarget,{position:"absolute",top:parseFloat(d.top)+parseFloat(b.css(h,"height"))+5+"px",left:parseFloat(d.left)+"px",display:"","z-index":"99999"})}f.show(),f.setGlobalTime()}),b.append(f.DTPTarget,"body")}if(g.end){var k=g.end,j=b.css(k,"position");"static"===j&&b.css(k,{position:"relative"}),c.on(k,"click",function(){f.trigger=k,f.fillEl(k),f.bindMainEvents();var a=b.offset(k);b.css(f.DTPTarget,{position:"absolute",top:parseFloat(a.top)+parseFloat(b.css(k,"height"))+5+"px",left:parseFloat(a.left)+"px",display:"","z-index":"99999"}),f.show()})}g.start||g.end||this.fillEl()},show:function(){this.isShowed=!0;var a=this;return a.fire("showPanel"),b.css(a.DTPTarget,{display:"","z-index":"999"}),a.DTPTarget},hide:function(){this.fire("hidePanel"),this.isShowed=!1,b.css(this.DTPTarget,{display:"none","z-index":"1"})},createEl:function(){var c=this,d='<div class="ks-dtp dtp-'+a.now()+'" style="display:none;">',e=c.config;return e.datepicker&&(d+=f.datePicker),e.timepicker&&(d+=f.timePicker),d=b.create(d)},bindGlobalEvents:function(){var e=this,f=e.config;if(f.datepicker){var g=b.get(".data-calendar",e.DTPTarget);c.on(b.get(".icon-l",e.DTPTarget),"click",function(a){a.halt();var c=b.get(".selected-date",e.DTPTarget),f=new d(b.attr(c,"data-full-date"));f.subtract("month",1),e.createDateEl(f),e.fire("clickLastMonth")}),c.on(b.get(".icon-r",e.DTPTarget),"click",function(a){a.halt();var c=b.get(".selected-date",e.DTPTarget),f=new d(b.attr(c,"data-full-date"));f.add("month",1),e.createDateEl(f),e.fire("clickNextMonth")}),c.on(b.get(".icon-h",e.DTPTarget),"click",function(b){b.halt();var c=new d(a.now());if(e.createDateEl(c),f.timepicker){var g=e.createTimeEl(c);e.bindTimeEvent(),e.scrollTime(g)}e.fire("clickToday")});var h=b.get(".header-year",e.DTPTarget);c.on(h,"change",function(){var a=b.get(".selected-date",g),c=new d(b.attr(a,"data-full-date")),f=b.val(h);c.years(f),e.createDateEl(c),e.fire("changeYear")});var i=b.get(".header-month",e.DTPTarget);c.on(i,"change",function(){var a=b.get(".selected-date",g),c=new d(b.attr(a,"data-full-date")),f=b.val(i);c.month(f),e.createDateEl(c),e.fire("changeMonth")})}if(f.timepicker){var j=(b.get(".time-picker",e.DTPTarget),b.get(".icon-t",e.DTPTarget));c.on(j,"click",function(a){a.halt(),e.scrollTime("top"),e.fire("clickTimeUp")});var k=b.get(".icon-d",e.DTPTarget);c.on(k,"click",function(a){a.halt(),e.scrollTime("down"),e.fire("clickTimeDown")})}f.start&&c.on("body","click",function(a){var c=a.target,d=b.parent(c,".ks-dtp");e.isShowed===!0&&c!==f.start&&c!==f.end&&d!==e.DTPTarget&&e.hide()})},bindMainEvents:function(){var c=this,d=c.config;if(d.datepicker){var e=b.get(".data-calendar",c.DTPTarget);a.UA.ie<8||this.config.disableDateScroll||this.bindScrollEvent(e),this.bindDateEvent()}if(d.timepicker&&this.bindTimeEvent(),!d.todayButton){var f=b.get(".icon-h",c.DTPTarget),g=b.get(".header-month",c.DTPTarget);b.css(f,{visibility:"hidden",width:"5px"}),b.css(g,{"margin-right":"17px"})}d.id&&b.attr(c.DTPTarget,"id",d.id),d.className&&b.addClass(c.DTPTarget,d.className)},bindDateEvent:function(){var e=this,f=e.config,h=b.get(".data-calendar",e.DTPTarget);c.detach(h,"click"),c.on(h,"click",function(a){var c=a.target;if("td"===c.nodeName.toLowerCase()){if(b.hasClass(c,"disable-date"))return;var j=b.attr(c,"data-month"),k=b.get(".selected-date",h),l=b.attr(k,"data-month"),m=new d(b.attr(c,"data-full-date")),n=m.year();if(j!==l){if(n>f.yearEnd||n<f.yearStart)return;e.createDateEl(m)}else b.removeClass(k,"selected-date"),b.addClass(c,"selected-date");g=m.format(f.formatDate),e.setGlobalTime(),e.trigger&&e.setDateToTrigger(),e.fire("clickDateChange"),f._needCheckAccept&&f.timepicker&&(e.scrollTime(e.createTimeEl(new d(i,f.format))),e.setTimeToAccept()),e.fire("clickDate"),f.closeOnDateSelect&&e.hide()}}),f.showDateLen&&f.start&&(c.delegate(h,"mouseenter","td",function(c){var g=c.target,i=b.attr(f.start,"data-init-time")||b.val(f.start),j=new d(i,f.format),k=j.years(),l=parseInt(b.attr(g,"data-year")),m=j.months(),n=parseInt(b.attr(g,"data-month")),o=j.date(),p=parseInt(b.attr(g,"data-date")),q=b.query("td",h);if(k>l);else if(l===k&&m>n);else if(!(n===m&&o>p)){var r;r=e.trigger===f.start?b.get(".selected-date",h):b.get(".start-el-date",h),r||(r=b.get("td",h));var s=b.attr(r,"data-index"),t=b.attr(g,"data-index");return void a.each(q,function(a,c){b.removeClass(a,"selected-duration-day"),c>=s&&t>=c&&b.addClass(a,"selected-duration-day")})}a.each(q,function(a){b.removeClass(a,"selected-duration-day")})}),c.delegate(h,"mouseleave click","td",function(c){var d=c.target;if("td"===d.nodeName.toLowerCase()&&(e.trigger!==f.end||"click"!==c.type)){var g=b.query("td",h);a.each(g,function(a){b.removeClass(a,"selected-duration-day")})}}))},bindTimeEvent:function(){var a=this,e=a.config,f=b.get(".time-picker",a.DTPTarget);c.detach(f,"click"),c.on(f,"click",function(c){c.halt();var g=c.target;if(!b.hasClass(g,"disable-time")&&"li"===g.nodeName.toLowerCase()){var i=b.get(".selected-time",f);b.removeClass(i,"selected-time"),b.addClass(g,"selected-time");var j=new d(b.attr(g,"data-time"),"HH:mm");h=j.format(e.formatTime),a.setGlobalTime(),a.trigger&&(a.setDateToTrigger(),a.fire("clickTimeChange")),a.fire("clickTime"),e.closeOnTimeSelect&&a.hide()}})},bindScrollEvent:function(e){var f=this,g=f.config,h=new d(a.now());c.on(e,"wheel mousewheel DOMMouseScroll MozMousePixelScroll",function(a){a.halt();var c=a.originalEvent||window.event,d=0,i=0,j=0;if("detail"in c&&(j=-1*c.detail),"wheelDelta"in c&&(j=c.wheelDelta),"wheelDeltaY"in c&&(j=c.wheelDeltaY),"wheelDeltaX"in c&&(i=-1*c.wheelDeltaX),"axis"in c&&c.axis===c.HORIZONTAL_AXIS&&(i=-1*j,j=0),d=0===j?i:j,"deltaY"in c&&(j=-1*c.deltaY,d=j),"deltaX"in c&&(i=c.deltaX,0===j&&(d=-1*i)),0!==j||0!==i){var k;if(g.inverseButton?(-2>j&&(k="add"),j>2&&(k="subtract")):(-2>j&&(k="subtract"),j>2&&(k="add")),k){var l=b.get(".selected-date",e),m=parseInt(b.attr(l,"data-month"))+1,n=parseInt(b.attr(l,"data-year"));if(n<=g.yearEnd&&n>=g.yearStart){if(n===g.yearEnd&&12==m&&"add"===k)return;if(n===g.yearStart&&1==m&&"subtract"===k)return;h.year(b.attr(l,"data-year")),h.month(b.attr(l,"data-month")),h.date(b.attr(l,"data-date")),h[k]("month",1),f.createDateEl(h)}}}})},setDateToTrigger:function(){var a=this,c=a.config;c.datepicker?c.timepicker?b.val(a.trigger,i):b.val(a.trigger,g):c.timepicker?b.val(a.trigger,h):new Error("no trigger and show nothing!")},scrollTime:function(a){var c=this,d=b.get(".time-picker",c.DTPTarget),e=c.config.timeHeightInTimePicker;setTimeout(function(){var c=d.scrollTop;if("top"===a)c-=e,c=0>=c?0:c;else if("down"===a){c+=e;var f=(b.query("li",d).length-1)*e;c=c>=f?f:c}else c=2>=a?0:e*(a-2);d.scrollTop=c},0)},fillEl:function(c){var e,f=this,g=f.config,h=g.value||a.now(),i="";g.datepicker&&(i=g.formatDate),g.timepicker&&(i=g.formatTime),g.datepicker&&g.timepicker&&(i=g.format),c&&b.val(c)?e=new d(b.val(c),i):(e=new d(h),b.val(c,e.format(i)));var j=0;g.timepicker?j=this.createTimeEl(e):b.remove(b.get(".dtp-time",f.DTPTarget)),g.datepicker?this.createDateEl(e):b.remove(b.get(".dtp-date",f.DTPTarget)),this.scrollTime(j),this.bindMainEvents()},createTimeEl:function(c){var e,f,g=this,i=b.get(".picker-list",g.DTPTarget),j=[],k=g.config;h=c.format(k.formatTime),g.setGlobalTime();var l=k.minuteSelect,m=l?1440:24,n=l?"minutes":"hours";l||(c.minute(0),c.second(0),c.millisecond(0));var o=c.format(k.formatTime),p=new d(c);p.hour(0),p.minute(0),p.second(0),p.millisecond(0);for(var q,r,s=0,t=0,u="",v="",w=0;m>w;w++){if(f=p.format(k.formatTimeForShow||k.formatTime),e=p.format(k.formatTime),s=l?w%60:w,e===o?(t=w,u="selected-time"):u="",k._needCheckAccept){v=" disable-time";var x=p._d.getTime();a.each(k.acceptTime,function(a){return q=new d(a.start||k.yearStart)._d.getTime(),r=new d(a.end||k.yearEnd)._d.getTime(),x>q&&r>x?(v="",!1):(q=null,void(r=null))})}j.push('<li class="'+u+v+'" data-time="'+p.format("HH:mm")+'" data-index="'+w+'">'+f+"</li>"),p[n](s+1)}return i.innerHTML=j.join(""),t},createDateEl:function(c){var e=this,f=b.get(".data-calendar",e.DTPTarget),h="<table><thead><tr>",i=d.weekdaysShort(),j=e.config;j.startWithMonday&&i.push(i.shift());for(var k=0;7>k;k++)h+="<th>"+i[k]+"</th>";h+="</tr></thead>",h+="<tbody><tr>",g=c.format(j.formatDate),e.setGlobalTime();var l=new d(c._d);l.date(1);var m=j.startWithMonday?7:6,n=j.startWithMonday?1:7;for(j.startWithMonday?7:1;l.isoWeekday()!==n;)l.subtract("d",1);var o=c.month(),p=c.date(),q=l.years(),r=l.month(),s=l.date(),t="other-month-day",u="",v=0==o?11:o-1,w=11==o?0:o+1,x=0;if(j.end&&e.trigger===j.end)var y=new d(b.val(j.start)),z=y.years(),A=y.months(),B=y.date();for(var C,D,E,F="";!(r!==v&&r!==o&&r!==w||(q=l.years(),r=l.month(),s=l.date(),t=r===o?p===s?"selected-date":"":"other-month-day",u=B&&q===z&&r==A&&B==s?" start-el-date":"",j._needCheckAccept&&(F=" disable-date",E=l._d.getTime(),a.each(j.acceptTime,function(a){return C=new d(a.start||j.yearStart),C.hour(0),C.minute(0),C.second(0),C.millisecond(0),D=new d(a.end||j.yearEnd),j.minuteSelect?(D.hour(23),D.minute(59)):(D.hour(23),D.minute(0)),D.second(0),D.millisecond(0),E>=C._d.getTime()&&E<=D._d.getTime()?(F="",!1):(C=null,void(D=null))})),h+='<td data-date="'+s+'" data-month="'+r+'" data-year="'+l.year()+'" class="'+t+u+F+'" data-full-date="'+l.format("YYYY-MM-DD")+'" data-index="'+x+'">'+s+"</td>",m===l.isoWeekday()&&(h+="</tr>"),l.add("d",1),r=l.month(),r===w&&l.isoWeekday()===n&&x>27));)x++;f.innerHTML=h;var G=b.get(".header-year",e.DTPTarget),H=b.get("option",G);if(!H){for(var I="",J=j.yearEnd,k=j.yearStart;J>=k;k++)if(I+='<option value="'+k+'" class="year-op-'+k+'">'+k+"</option>",a.UA.ie<10){var K=document.createElement("OPTION");K.value=k,K.text=k,K.className="year-op-"+k,G.options.add(K)}(!a.UA.ie||a.UA.ie>=10)&&(G.innerHTML=I)}var L=b.get(".year-op-selected",e.DTPTarget);L&&(b.removeAttr(L,"selected"),b.removeClass(L,"year-op-selected"));var M=b.get(".year-op-"+c.years(),e.DTPTarget);b.attr(M,"selected","selected"),b.addClass(M,"year-op-selected");var N=b.get(".header-month",e.DTPTarget);if(H=b.get("option",N),!H){for(var O,I="",P=d.months(),k=0;11>=k;k++){var r=P[k];if(O='<option value="'+r+'" class="month-op-'+k+'">'+r+"</option>",I+=O,a.UA.ie<10){var K=document.createElement("OPTION");K.value=r,K.text=r,K.className="month-op-"+k,N.options.add(K)}}(!a.UA.ie||a.UA.ie>=10)&&(N.innerHTML=I)}var L=b.get(".month-op-selected",e.DTPTarget);L&&(b.removeAttr(L,"selected"),b.removeClass(L,"month-op-selected"));var M=b.get(".month-op-"+c.months(),e.DTPTarget);b.attr(M,"selected","selected"),b.addClass(M,"month-op-selected")},setTimeToAccept:function(){var d=b.get(".picker-list",this.DTPTarget),e=b.get(".selected-time",d),f=this;if(b.hasClass(e,"disable-time")){var g=b.query("li",d);a.each(g,function(a){return b.hasClass(a,"disable-time")?void 0:(c.fire(a,"click",{target:a,isDefault:!1}),f.scrollTime(b.attr(a,"data-index")),!1)})}},getDate:function(){return d(g,this.config.formatDate).toDate()},getTime:function(){return d(h,this.config.formatTime).toDate()},getDateTime:function(){return d(i,this.config.format).toDate()},getDateStr:function(){return g},getTimeStr:function(){return h},getDateTimeStr:function(){return i},setGlobalTime:function(){i=g+" "+h},adjustCfg:function(){var a=this,c=a.config;c.start=b.get(c.start),c.end=b.get(c.end),c.acceptTime&&c.acceptTime.length>=1&&(c._needCheckAccept=!0)}}),e},{requires:["dom","event","kg/moment/2.0.1/index","./base.css"]});