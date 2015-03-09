/*
combined files : 

kg/datetimepicker/2.0.3/index

*/
/**
 * 日期和时间选择器
 * @author libiao.lb@tmall.com
 * @todo 持续时间标记
 * @todo stat 和 end 联动
 */
KISSY.add('kg/datetimepicker/2.0.3/index',function(S, DOM, Event, Moment) {
    /**
     * 基本的外框模板
     */
    var template = {
        datePicker : '<div class="dtp-date"><div class="date-header"><a title="上个月" class="icon icon-l">l</a><a class="icon icon-h" title="今天"class="icon">h</a><select class="header-year"></select><select class="header-month"></select><a class="icon icon-r" class="下个月">r</a></div><div class="data-calendar"></div></div>',
        timePicker : '<div class="dtp-time"><a class="icon icon-t" title="显示更早的时间">t</a><div class="time-picker"><ul class="picker-list"></ul></div><a class="icon icon-d" title="显示更晚的时间">d</a></div>'
    };

    /**
     * 当前选择器的日期
     */
    var curDTPDate = '';
    /**
     * 当前选择器的时间
     */
    var curDTPTime = '';
    /**
     * 当前选择器的完整时间
     */
    var curDTPDateTime = '';

    function DateTimePicker(cfg) {
        if(!(this instanceof DateTimePicker)) {
            return new Error('必须使用new来创建DateTimePicker的实例');
        }
        //保障基本数据不被污染
        this.config = {
            value : '',
            start : null,
            end : null,
            acceptTime :  [],
            lang : 'zh-cn',
            format : 'YYYY-MM-DD HH:mm',
            formatTime : 'HH:mm',
            formatTimeForShow: 'Ahh:mm',
            formatDate :'YYYY-MM-DD',
            startWithMonday : false,
            minuteSelect : false,
            inverseButton : false,
            disableDateScroll : true,
            closeOnDateSelect : false,
            closeOnTimeSelect : true,
            timepicker : true,
            datepicker : true,
            todayButton : true,
            showDateLen : true,
            yearStart : 1919,
            yearEnd : 2049,
            timeHeightInTimePicker : 26,
            id : '',
            className : ''
        };
        /**
         * 输出DOM
         */
        this.DTPTarget = null;
        this.init(cfg);
    }

    S.augment(DateTimePicker, Event.Target, {
        /**
         * 初始化
         */
        init : function(cfg) {
            var self = this;
            //合并配置项和生成目标
            S.mix(self.config, cfg);
            //判断config的配置
            self.adjustCfg(self.config);
            var selfConfig = self.config;
            //设置日期格式
            Moment.lang(selfConfig.lang);
            //生成展示元素
            self.DTPTarget = this.createEl();
            self.bindGlobalEvents();
            //如果设置了开始dom
            if(selfConfig.start) {
                var startEl = selfConfig.start;
                var positionStyle = DOM.css(startEl, 'position');
                if('static' === positionStyle) {
                    DOM.css(startEl, {
                        'position' : 'relative'
                    });
                }

                Event.on(startEl, 'click', function(e) {
                    var startInitTime = DOM.val(startEl);
                    //如果没更改内容，直接显示就好
                    if(startInitTime === S.trim(curDTPDateTime) && self.trigger == startEl) {
                        //Do nothing
                    } else {
                        self.trigger = startEl;
                        //填入基本数据
                        self.fillEl(startEl);

                        var startOffset = DOM.offset(startEl);
                        DOM.css(self.DTPTarget, {
                            'position' : 'absolute',
                            'top' : parseFloat(startOffset.top) + parseFloat(DOM.css(startEl, 'height')) + 5 + 'px',
                            'left' : parseFloat(startOffset.left) + 'px',
                            'display' : '',
                            'z-index' : '99999'
                        });
                    }

                    self.show();
                    self.setGlobalTime();
                });
                //吐到页面
                DOM.append(self.DTPTarget, 'body');
            }
            if(selfConfig.end) {
                var endEl = selfConfig.end;
                var positionStyle = DOM.css(endEl, 'position');
                if('static' === positionStyle) {
                    DOM.css(endEl, {
                        'position' : 'relative'
                    });
                }
                //end 每次都有重新渲染，方便更新start的标识
                Event.on(endEl, 'click', function(e) {
                    self.trigger = endEl;
                    //填入基本数据
                    self.fillEl(endEl);
                    //绑定响应
                    self.bindMainEvents();
                    var endOffset = DOM.offset(endEl);
                    DOM.css(self.DTPTarget, {
                        'position' : 'absolute',
                        'top' : parseFloat(endOffset.top) + parseFloat(DOM.css(endEl, 'height')) + 5 + 'px',
                        'left' : parseFloat(endOffset.left) + 'px',
                        'display' : '',
                        'z-index' : '99999'
                    });
                    self.show();
                });
            }
            //都没有就直接初始化
            if(!selfConfig.start && !selfConfig.end) {
                this.fillEl();
            }
        },
        /**
         * 显示和返回元素本身
         */
        show : function() {
            this.isShowed = true;
            var self = this;
            self.fire('showPanel');
            DOM.css(self.DTPTarget, {
                'display' : '',
                'z-index' : '999'
            });
            return self.DTPTarget;
        },
        /**
         * 隐藏元素
         */
        hide : function() {
            this.fire('hidePanel');
            this.isShowed = false;
            DOM.css(this.DTPTarget, {
                'display' : 'none',
                'z-index' : '1'
            });
        },
        /**
         * 生成展示元素
         */
        createEl : function() {
            var self = this;
            var tempNode = '<div class="ks-dtp dtp-' + S.now() + '" style="display:none;">';
            var selfConfig = self.config;
            if(selfConfig.datepicker) {
                tempNode += template.datePicker;
            }
            if(selfConfig.timepicker) {
                tempNode += template.timePicker;
            }
            tempNode + '</div>';
            tempNode = DOM.create(tempNode);
            return tempNode;
        },
        /**
         * 绑定只渲染一次的响应
         */
        bindGlobalEvents : function() {
            var self = this;
            var selfConfig = self.config;
            if(selfConfig.datepicker) {
                var dateEl = DOM.get('.data-calendar', self.DTPTarget);
                //绑定导航按钮的响应
                //上个月
                Event.on(DOM.get('.icon-l', self.DTPTarget), 'click', function(e) {
                    e.halt();
                    var curDateEl = DOM.get('.selected-date', self.DTPTarget);
                    var curDate = new Moment(DOM.attr(curDateEl, 'data-full-date'));
                    curDate.subtract('month', 1);
                    self.createDateEl(curDate);
                    self.fire('clickLastMonth');
                });
                //下个月
                Event.on(DOM.get('.icon-r', self.DTPTarget), 'click', function(e) {
                    e.halt();
                    var curDateEl = DOM.get('.selected-date', self.DTPTarget);
                    var curDate = new Moment(DOM.attr(curDateEl, 'data-full-date'));
                    curDate.add('month', 1);
                    self.createDateEl(curDate);
                    self.fire('clickNextMonth');
                });
                //今天
                Event.on(DOM.get('.icon-h', self.DTPTarget), 'click', function(e) {
                    e.halt();
                    var curDate = new Moment(S.now());
                    self.createDateEl(curDate);
                    //如果有时间选择器，还应当渲染时间
                    if(selfConfig.timepicker) {
                        var index = self.createTimeEl(curDate);
                        self.bindTimeEvent();
                        self.scrollTime(index);
                    }
                    self.fire('clickToday');
                });
                //滚动日历不会触发年的change响应
                var yearSelect = DOM.get('.header-year', self.DTPTarget);
                Event.on(yearSelect, 'change', function(e) {
                    var curDateEl = DOM.get('.selected-date', dateEl);
                    var curDate = new Moment(DOM.attr(curDateEl, 'data-full-date'));
                    var curSelectedYear = DOM.val(yearSelect);
                    curDate.years(curSelectedYear);
                    self.createDateEl(curDate);
                    self.fire('changeYear');
                });
                //滚动日历不会触发月的change响应
                var monthSelect = DOM.get('.header-month', self.DTPTarget);
                Event.on(monthSelect, 'change', function(e) {
                    var curDateEl = DOM.get('.selected-date', dateEl);
                    var curDate = new Moment(DOM.attr(curDateEl, 'data-full-date'));
                    var curSelectedMonth = DOM.val(monthSelect);
                    curDate.month(curSelectedMonth);
                    self.createDateEl(curDate);
                    self.fire('changeMonth');
                });
            }
            if(selfConfig.timepicker) {
                //时间向上按钮的响应
                var timeEl = DOM.get('.time-picker', self.DTPTarget);
                var timeUp = DOM.get('.icon-t', self.DTPTarget);
                Event.on(timeUp, 'click', function(e) {
                    e.halt();
                    self.scrollTime('top');
                    self.fire('clickTimeUp');
                });
                //时间向下按钮的响应
                var timeDown = DOM.get('.icon-d', self.DTPTarget);
                Event.on(timeDown, 'click', function(e) {
                    e.halt();
                    self.scrollTime('down');
                    self.fire('clickTimeDown');
                });
            }
            if(selfConfig.start) {
                Event.on('body', 'click', function(e) {
                    var target = e.target;
                    var targetParent = DOM.parent(target, '.ks-dtp');
                    if(self.isShowed === true && target !== selfConfig.start && target !== selfConfig.end && targetParent !== self.DTPTarget) {
                        self.hide();
                    }
                });
            }
        },
        /**
         * 绑定日历等内容的响应
         */
        bindMainEvents : function() {
            var self = this;
            var selfConfig = self.config;
            if(selfConfig.datepicker) {
                var dateEl = DOM.get('.data-calendar', self.DTPTarget);
                //绑定日历自身的滚动响应
                if(S.UA.ie < 8 || this.config.disableDateScroll) {
                    //啥都不干
                } else {
                    this.bindScrollEvent(dateEl);
                }

                //日历点击响应
                this.bindDateEvent();
            }
            //如果渲染了时间，绑定响应
            if(selfConfig.timepicker) {
                //绑定时间的点击响应
                this.bindTimeEvent();
            }

            //今天 按钮控制显示控制
            if(!selfConfig.todayButton) {
                var todayBtn = DOM.get('.icon-h', self.DTPTarget);
                var headerMonth = DOM.get('.header-month', self.DTPTarget);
                DOM.css(todayBtn, {
                    'visibility' : 'hidden',
                    'width' : '5px'
                });
                DOM.css(headerMonth, {
                    'margin-right' : '17px'
                });
            }
            //添加id和classname
            if(selfConfig.id) {
                DOM.attr(self.DTPTarget, 'id', selfConfig.id);
            }
            if(selfConfig.className) {
                DOM.addClass(self.DTPTarget, selfConfig.className);
            }
        },
        /**
         * 绑定日期的点选
         */
        bindDateEvent : function() {
            var self = this;
            var selfConfig = self.config;
            var dateEl = DOM.get('.data-calendar', self.DTPTarget);
            //点击响应
            Event.detach(dateEl, 'click');
            Event.on(dateEl, 'click', function(e) {
                var curTarget = e.target;
                if(curTarget.nodeName.toLowerCase() === 'td') {
                    //如果点的时效日期，啥都不干
                    if(DOM.hasClass(curTarget, 'disable-date')) {
                        return;
                    }
                    //如果点击的日期是非当前月的，要重新渲染
                    //重新渲染就不需要再调整样式了
                    var targetMonth = DOM.attr(curTarget, 'data-month');
                    var lastSelected = DOM.get('.selected-date', dateEl);
                    var lastMonth = DOM.attr(lastSelected, 'data-month');
                    var initData = new Moment(DOM.attr(curTarget, 'data-full-date'));
                    var initDataYear = initData.year();
                    if(targetMonth !== lastMonth) {
                        //如果年份超过限制也不响应
                        if(initDataYear > selfConfig.yearEnd || initDataYear < selfConfig.yearStart) {
                            return;
                        }
                        self.createDateEl(initData);
                    } else {
                        DOM.removeClass(lastSelected, 'selected-date');
                        DOM.addClass(curTarget, 'selected-date');
                    }
                    //更新全局日期
                    curDTPDate = initData.format(selfConfig.formatDate);
                    //更新全局日期和时间
                    self.setGlobalTime();
                    //输出数据到元素
                    if(self.trigger) {
                        self.setDateToTrigger();
                    }
                    self.fire('clickDateChange');
                    //当存在accepttime，需要重建时间
                    //当选中日期时，当前选中的时间可能不在支持范围内，需要调整当前时间
                    if(selfConfig._needCheckAccept && selfConfig.timepicker) {
                        self.scrollTime(self.createTimeEl(new Moment(curDTPDateTime, selfConfig.format)));
                        self.setTimeToAccept();
                    }
                    self.fire('clickDate');
                    //如果设置了点选关闭
                    if(selfConfig.closeOnDateSelect) {
                        self.hide();
                    }
                }
            });
            //日历是否绑定hover显示持续时间
            if(selfConfig.showDateLen && selfConfig.start) {
                Event.delegate(dateEl, 'mouseenter', 'td', function(e) {
                    var target = e.target;
                    var startTimeVal = DOM.attr(selfConfig.start, 'data-init-time') || DOM.val(selfConfig.start);
                    var startTime = new Moment(startTimeVal, selfConfig.format);
                    var startYear = startTime.years();
                    var targetYear = parseInt(DOM.attr(target, 'data-year'));
                    var startMonth = startTime.months();
                    var targetMonth = parseInt(DOM.attr(target, 'data-month'));
                    var startDay = startTime.date();
                    var targetDay = parseInt(DOM.attr(target, 'data-date'));
                    var tdNode = DOM.query('td', dateEl);

                    //持续时间，当且仅当目标时间>=开始时间的情况下展示
                    //持续样式的开始，1：当前日历上有开始时间，就用开始时间。2：没有就从第一天
                    if(targetYear < startYear) {
                        //donothing
                    } else {
                        if(targetYear === startYear && targetMonth < startMonth) {
                            //donothing
                        } else {
                            if(targetMonth === startMonth && targetDay < startDay) {
                                //donothing
                            } else {
                                //如果是第一日历，选中当前如开始
                                //如果第二日历，选中第一日历的选中日开始
                                var startShowEl;
                                if(self.trigger === selfConfig.start) {
                                    startShowEl = DOM.get('.selected-date', dateEl);
                                } else {
                                    startShowEl = DOM.get('.start-el-date', dateEl);
                                }
                                //找不到标记日就从第一个日历开始
                                if(!startShowEl) {
                                    startShowEl = DOM.get('td', dateEl);
                                }

                                var startIndex = DOM.attr(startShowEl, 'data-index');
                                var targetIndex = DOM.attr(target, 'data-index');
                                S.each(tdNode, function(item, index) {
                                    DOM.removeClass(item, 'selected-duration-day')
                                    if(index >= startIndex && index <= targetIndex) {
                                        DOM.addClass(item, 'selected-duration-day');
                                    }
                                });
                                return;
                            }
                        }
                    }
                    S.each(tdNode, function(item, index) {
                        DOM.removeClass(item, 'selected-duration-day')
                    });
                });
                Event.delegate(dateEl, 'mouseleave click', 'td', function(e) {
                    var curTarget = e.target;
                    //非hover到td上不操作
                    if(curTarget.nodeName.toLowerCase() !== 'td') {
                        return;
                    }
                    if(self.trigger === selfConfig.end && e.type === 'click') {
                        return;
                    }
                    var tdNode = DOM.query('td', dateEl);
                    S.each(tdNode, function(item, index) {
                        DOM.removeClass(item, 'selected-duration-day')
                    });
                });
            }
        },
        /**
         * 绑定时间的点选
         */
        bindTimeEvent : function() {
            var self = this;
            var selfConfig = self.config;
            var timeEl = DOM.get('.time-picker', self.DTPTarget);
            Event.detach(timeEl, 'click');
            Event.on(timeEl, 'click', function(e) {
                e.halt();
                var curTarget = e.target;
                if(DOM.hasClass(curTarget, 'disable-time')) {
                    return;
                }
                if(curTarget.nodeName.toLowerCase() === 'li') {
                    var lastSelected = DOM.get('.selected-time', timeEl);
                    DOM.removeClass(lastSelected, 'selected-time');
                    DOM.addClass(curTarget, 'selected-time');
                    var initData = new Moment(DOM.attr(curTarget, 'data-time'), 'HH:mm');

                    //更新全局时间
                    curDTPTime = initData.format(selfConfig.formatTime);
                    //更新全局日期和时间
                    self.setGlobalTime();
                    //输出数据到元素
                    if(self.trigger) {
                        self.setDateToTrigger();
                        self.fire('clickTimeChange');
                    }
                    self.fire('clickTime');
                    //如果设置了点选关闭
                    if(selfConfig.closeOnTimeSelect) {
                        self.hide();
                    }
                }
            });
        },
        /**
         * 绑定scroll效果
         */
        bindScrollEvent : function(dateEl) {
            var self = this;
            var selfConfig = self.config;
            var dataMoment = new Moment(S.now());
            //本响应主要参考如下
            //https://github.com/brandonaaron/jquery-mousewheel/blob/master/jquery.mousewheel.js
            /*
             * Copyright (c) 2013 Brandon Aaron (http://brandonaaron.net)
             *
             * Licensed under the MIT License (LICENSE.txt).
             *
             * Thanks to: http://adomas.org/javascript-mouse-wheel/ for some pointers.
             * Thanks to: Mathias Bank(http://www.mathias-bank.de) for a scope bug fix.
             * Thanks to: Seamus Leahy for adding deltaX and deltaY
             *
             * Version: 3.1.3
             *
             * Requires: 1.2.2+
             */
            Event.on(dateEl, 'wheel mousewheel DOMMouseScroll MozMousePixelScroll', function(event) {
                event.halt();
                var orgEvent = event.originalEvent || window.event;
                var delta = 0;
                var deltaX = 0;
                var deltaY = 0;
                var absDelta = 0;
                if('detail' in orgEvent) {
                    deltaY = orgEvent.detail * -1;
                }
                if('wheelDelta' in orgEvent) {
                    deltaY = orgEvent.wheelDelta;
                }
                if('wheelDeltaY' in orgEvent) {
                    deltaY = orgEvent.wheelDeltaY;
                }
                if('wheelDeltaX' in orgEvent) {
                    deltaX = orgEvent.wheelDeltaX * -1;
                }

                // Firefox < 17 horizontal scrolling related to DOMMouseScroll event
                if('axis' in orgEvent && orgEvent.axis === orgEvent.HORIZONTAL_AXIS) {
                    deltaX = deltaY * -1;
                    deltaY = 0;
                }

                // Set delta to be deltaY or deltaX if deltaY is 0 for backwards compatabilitiy
                delta = deltaY === 0 ? deltaX : deltaY;

                // New school wheel delta (wheel event)
                if('deltaY' in orgEvent) {
                    deltaY = orgEvent.deltaY * -1;
                    delta = deltaY;
                }
                if('deltaX' in orgEvent) {
                    deltaX = orgEvent.deltaX;
                    if(deltaY === 0) {
                        delta = deltaX * -1;
                    }
                }

                // No change actually happened, no reason to go any further
                if(deltaY === 0 && deltaX === 0) {
                    return;
                }

                //根据位移控制月份变化
                var func;
                //可以配置反转滚动
                if(selfConfig.inverseButton) {
                    if(deltaY < -2) {
                        func = 'add'
                    }
                    if(deltaY > 2) {
                        func = 'subtract'
                    }
                } else {
                    if(deltaY < -2) {
                        func = 'subtract'
                    }
                    if(deltaY > 2) {
                        func = 'add'
                    }
                }
                if(!func) {
                    return;
                }
                var curDateEl = DOM.get('.selected-date', dateEl);
                var curMonth = parseInt(DOM.attr(curDateEl, 'data-month')) + 1;
                var curYear = parseInt(DOM.attr(curDateEl, 'data-year'));
                //在年的范围内才执行
                if(curYear <= selfConfig.yearEnd && curYear >= selfConfig.yearStart) {
                    //最大年内最大一个月不能再加了
                    if(curYear === selfConfig.yearEnd && curMonth == 12 && func === 'add') {
                        return; 
                    }
                    //最小年内最小一个月不能再减了
                    if(curYear === selfConfig.yearStart && curMonth == 1 && func === 'subtract') {
                        return;
                    }
                    //var curDate = new Moment(DOM.attr(curDateEl, 'data-full-date'));
                    dataMoment.year(DOM.attr(curDateEl, 'data-year'));
                    dataMoment.month(DOM.attr(curDateEl, 'data-month'));
                    dataMoment.date(DOM.attr(curDateEl, 'data-date'));
                    //curDate.[func]('month', 1);
                    dataMoment[func]('month', 1);
                    //self.createDateEl(curDate);
                    self.createDateEl(dataMoment);
                }
            });
        },
        /**
         * 为触发器返回时间
         */
        setDateToTrigger : function() {
            var self = this;
            var selfConfig = self.config;
            //输出数据到元素
            if(selfConfig.datepicker) {
                if(selfConfig.timepicker) {
                    DOM.val(self.trigger, curDTPDateTime);
                } else {
                    DOM.val(self.trigger, curDTPDate);
                }
            } else {
                if(selfConfig.timepicker) {
                    DOM.val(self.trigger, curDTPTime);
                } else {
                    new Error('no trigger and show nothing!');
                }
            }
        },
        /**
         * 时间的滚动到具体位置
         */
        scrollTime : function(ori) {
            var self = this;
            var timePicker = DOM.get('.time-picker', self.DTPTarget);
            var basicLen = self.config.timeHeightInTimePicker;
            //控制显示
            setTimeout(function() {
                var scrollTop = timePicker.scrollTop;
                //向上
                if(ori === 'top') {
                    scrollTop -= basicLen;
                    scrollTop = scrollTop <= 0 ? 0 : scrollTop;
                //向下
                } else if(ori === 'down') {
                    scrollTop += basicLen;
                    var maxLen = (DOM.query('li', timePicker).length - 1) * basicLen;
                    scrollTop = scrollTop >= maxLen ? maxLen : scrollTop;
                //定位
                } else {
                    //在第2位以前的都不管
                    if(ori <= 2) {
                        scrollTop = 0;
                    } else {
                        scrollTop = basicLen * (ori - 2);
                    }
                }
                timePicker.scrollTop = scrollTop;
            }, 0);
        },
        /**
         * 填入基本数据，基于trigger的数据
         */
        fillEl : function(trigger) {
            var self = this;
            var selfConfig = self.config;
            var defaultDate = selfConfig.value || S.now();
            var format = '';
            var initData;
            if(selfConfig.datepicker) {
                format = selfConfig.formatDate;
            }
            if(selfConfig.timepicker) {
                format = selfConfig.formatTime;
            }
            if(selfConfig.datepicker && selfConfig.timepicker) {
                format = selfConfig.format;
            }
            //如果有初始值，其优先级低于输入框的值
            if(trigger && DOM.val(trigger)) {
                initData = new Moment(DOM.val(trigger), format);
            } else {
                initData = new Moment(defaultDate);
                DOM.val(trigger, initData.format(format));
            }

            //时间数据填入或清除
            var timeIndex = 0;
            if(selfConfig.timepicker) {
                timeIndex = this.createTimeEl(initData);
            } else {
                DOM.remove(DOM.get('.dtp-time', self.DTPTarget));
            }

            //日期数据填入或清除
            if(selfConfig.datepicker) {
                this.createDateEl(initData);
            } else {
                DOM.remove(DOM.get('.dtp-date', self.DTPTarget));
            }

            //时间滚动
            this.scrollTime(timeIndex);
            //绑定响应
            this.bindMainEvents();
        },
        /**
         * 根据格式，来创建时间选择器的内容
         */
        createTimeEl : function(initData) {
            var self = this;
            var timeEl = DOM.get('.picker-list', self.DTPTarget);
            var tempStr = [];
            var tempTime;
            var tempTimeForShow;
            var selfConfig = self.config;

            //为当前时间赋值
            curDTPTime = initData.format(selfConfig.formatTime);
            //更新全局日期和时间
            self.setGlobalTime();

            var needMode = selfConfig.minuteSelect;
            var amount = needMode ? 1440 : 24;
            var func = needMode ? 'minutes' : 'hours';
            if(!needMode) {
                initData.minute(0);
                initData.second(0);
                initData.millisecond(0);
            }
            var initTime = initData.format(selfConfig.formatTime);

            var tmpInitDate = new Moment(initData);
            tmpInitDate.hour(0);
            tmpInitDate.minute(0);
            tmpInitDate.second(0);
            tmpInitDate.millisecond(0);

            var j = 0;
            var initIndex = 0;
            var initCls = '';
            var disableCls = '';
            var acceptStart;
            var acceptEnd;
            for(var i = 0; i < amount; i++) {
                tempTimeForShow = tmpInitDate.format(selfConfig.formatTimeForShow || selfConfig.formatTime);
                tempTime = tmpInitDate.format(selfConfig.formatTime);
                j = needMode ? i%60 : i;

                if(tempTime === initTime) {
                    initIndex = i;
                    initCls = 'selected-time';
                } else {
                    initCls = '';
                }

                //如果需要时间间隔检测
                if(selfConfig._needCheckAccept) {
                    //重置
                    disableCls = ' disable-time';
                    //获取毫秒
                    var timeStamp = tmpInitDate._d.getTime();
                    S.each(selfConfig.acceptTime, function(item) {
                        acceptStart = new Moment(item.start || selfConfig.yearStart)._d.getTime();
                        acceptEnd = new Moment(item.end || selfConfig.yearEnd)._d.getTime();
                        if(timeStamp > acceptStart && timeStamp < acceptEnd) {
                            //啥都不干
                            disableCls = '';
                            return false;
                        }
                        //粗暴的释放下内存
                        acceptStart = null;
                        acceptEnd = null;
                    });
                }
                tempStr.push('<li class="' + initCls + disableCls + '" data-time="' + tmpInitDate.format('HH:mm') +
                    '" data-index="' + i + '">' + tempTimeForShow + '</li>');
                tmpInitDate[func](j + 1);
            }

            timeEl.innerHTML = tempStr.join('');
            return initIndex;
        },
        /**
         * 根据格式，来创建日历选择器，并为当前日期赋值
         */
        createDateEl : function(initData) {
            var self = this;
            var dateEl = DOM.get('.data-calendar', self.DTPTarget);
            var table = '<table><thead><tr>';
            var weekDay = Moment.weekdaysShort();
            var selfConfig = self.config;

            if(selfConfig.startWithMonday) {
                weekDay.push(weekDay.shift());
            }
            for(var i = 0; i < 7; i++) {
                table += '<th>' + weekDay[i] + '</th>';
            }
            table += '</tr></thead>';
            table += '<tbody><tr>';

            //为全局当前日期赋值
            curDTPDate = initData.format(selfConfig.formatDate);
            //更新全局日期和时间
            self.setGlobalTime();

            //克隆副本
            var tmpInitDate = new Moment(initData._d);
            //设置为本月第一天
            tmpInitDate.date(1);
            //向后寻找对应第一个指定的日子
            var weekEnd = selfConfig.startWithMonday ? 7 : 6;
            var weekStart = selfConfig.startWithMonday ? 1 : 7;
            //日期循环输出的跳出ISO星期
            var weekBreak = selfConfig.startWithMonday ? 7 : 1;

            while(tmpInitDate.isoWeekday() !== weekStart) {
                tmpInitDate.subtract('d', 1);
            }
            //获取当前月份的日
            var curMonth = initData.month();
            var curDate = initData.date();
            var tmpYear = tmpInitDate.years();
            var tmpMonth = tmpInitDate.month();
            var tmpDay =tmpInitDate.date();
            var nowNowCls = 'other-month-day';
            var startElCls = '';

            //获取极端情况的月份
            var minMonth = curMonth == 0 ? 11 : (curMonth - 1);
            var maxMonth = curMonth == 11 ? 0 : (curMonth + 1);
            var count = 0;

            //如果是end的渲染，需要添加与start关联的内容
            if(selfConfig.end && self.trigger === selfConfig.end) {
                var startElMoment = new Moment(DOM.val(selfConfig.start));
                var startElYear = startElMoment.years();
                var startElMonth = startElMoment.months();
                var startElDate = startElMoment.date();
            }
            var acceptStart;
            var acceptEnd;
            var disableCls = '';
            var timeStamp;
            while(tmpMonth === minMonth || tmpMonth === curMonth || tmpMonth === maxMonth) {
                tmpYear = tmpInitDate.years();
                tmpMonth = tmpInitDate.month();
                tmpDay = tmpInitDate.date();
                if(tmpMonth === curMonth) {
                    nowNowCls = curDate === tmpDay ? 'selected-date' : '';
                } else {
                    nowNowCls = 'other-month-day';
                }

                //如果本日是start的日子，添加特别class
                if(startElDate && tmpYear === startElYear && tmpMonth == startElMonth && startElDate == tmpDay) {
                    startElCls = ' start-el-date';
                } else {
                    startElCls = '';
                }

                //如果需要时间间隔检测
                if(selfConfig._needCheckAccept) {
                    //重置
                    disableCls = ' disable-date';
                    timeStamp = tmpInitDate._d.getTime();
                    //获取毫秒
                    S.each(selfConfig.acceptTime, function(item) {
                        acceptStart = new Moment(item.start || selfConfig.yearStart);
                        acceptStart.hour(0);
                        acceptStart.minute(0);
                        acceptStart.second(0);
                        acceptStart.millisecond(0);

                        acceptEnd = new Moment(item.end || selfConfig.yearEnd);
                        if(selfConfig.minuteSelect) {
                            acceptEnd.hour(23);
                            acceptEnd.minute(59);
                        } else {
                            acceptEnd.hour(23);
                            acceptEnd.minute(0);
                        }
                        acceptEnd.second(0);
                        acceptEnd.millisecond(0);

                        if(timeStamp >= acceptStart._d.getTime() && timeStamp <= acceptEnd._d.getTime()) {
                            disableCls = '';
                            return false;
                        }
                        //粗暴的释放下内存
                        acceptStart = null;
                        acceptEnd = null;
                    });
                }
                table += '<td data-date="' + tmpDay + '" data-month="' + tmpMonth +
                    '" data-year="' + tmpInitDate.year() + '" class="' + nowNowCls +
                    startElCls + disableCls + '" data-full-date="' + tmpInitDate.format('YYYY-MM-DD') +
                    '" data-index="' + count + '">' + tmpDay + '</td>';
                if(weekEnd === tmpInitDate.isoWeekday()) {
                    table += '</tr>';
                }
                tmpInitDate.add('d', 1);
                tmpMonth = tmpInitDate.month();
                //如果到了下个月，且星期为指定最后一星期之后一天，且超过了3行，就结束循环
                if(tmpMonth === maxMonth && tmpInitDate.isoWeekday() === weekStart && count > 27) {
                    break;
                }
                count ++;
            }

            dateEl.innerHTML = table;

            //渲染年
            var yearSelect = DOM.get('.header-year', self.DTPTarget);
            var created = DOM.get('option', yearSelect);

            if(!created) {
                var tmpStr = '';
                var end = selfConfig.yearEnd;
                for(var i = selfConfig.yearStart; i <= end; i++) {
                    tmpStr += '<option value="' + i + '" class="year-op-' + i + '">' + i + '</option>';
                    if(S.UA.ie < 10) {
                        var ieOptionEl = document.createElement('OPTION');
                        ieOptionEl.value = i;
                        ieOptionEl.text = i;
                        ieOptionEl.className = 'year-op-' + i;
                        yearSelect.options.add(ieOptionEl);
                    }
                }
                if(!S.UA.ie || S.UA.ie >= 10) {
                    yearSelect.innerHTML = tmpStr;
                }
            }

            var lastSelected = DOM.get('.year-op-selected', self.DTPTarget);
            if(lastSelected) {
                DOM.removeAttr(lastSelected, 'selected');
                DOM.removeClass(lastSelected, 'year-op-selected');
            }

            var curSelected = DOM.get('.year-op-' + initData.years(), self.DTPTarget);
            DOM.attr(curSelected, 'selected', 'selected');
            DOM.addClass(curSelected, 'year-op-selected');
            //渲染月
            var monthSelect = DOM.get('.header-month', self.DTPTarget);
            created = DOM.get('option', monthSelect);
            if(!created) {
                var tmpStr = '';
                var optionEl;

                var monthsList = Moment.months();
                for(var i = 0; i <= 11; i++) {
                    var tmpMonth = monthsList[i];
                    optionEl = '<option value="' + tmpMonth + '" class="month-op-' +
                    i + '">' + tmpMonth + '</option>';
                    tmpStr += optionEl;
                    if(S.UA.ie < 10) {
                        var ieOptionEl = document.createElement('OPTION');
                        ieOptionEl.value = tmpMonth;
                        ieOptionEl.text = tmpMonth;
                        ieOptionEl.className = 'month-op-' + i;
                        monthSelect.options.add(ieOptionEl);
                    }
                }
                if(!S.UA.ie || S.UA.ie >= 10) {
                    monthSelect.innerHTML = tmpStr;
                }
            }

            var lastSelected = DOM.get('.month-op-selected', self.DTPTarget);
            if(lastSelected) {
                DOM.removeAttr(lastSelected, 'selected');
                DOM.removeClass(lastSelected, 'month-op-selected');
            }
            var curSelected = DOM.get('.month-op-' + initData.months(), self.DTPTarget);
            DOM.attr(curSelected, 'selected', 'selected');
            DOM.addClass(curSelected, 'month-op-selected');
        },
        /**
         * 设置当前时间为第一个可用时间
         */
        setTimeToAccept : function() {
            var timePicker = DOM.get('.picker-list', this.DTPTarget);
            var currentTimeLi = DOM.get('.selected-time', timePicker);
            var self = this;
            if(DOM.hasClass(currentTimeLi, 'disable-time')) {
                var timeList = DOM.query('li', timePicker);
                S.each(timeList, function(item) {
                    if(!DOM.hasClass(item, 'disable-time')) {
                        Event.fire(item, 'click', {
                            target : item,
                            isDefault : false
                        });
                        self.scrollTime(DOM.attr(item, 'data-index'));
                        return false;
                    }
                });
            }
        },
        /**
         * 获取当前日期
         */
        getDate : function() {
            return Moment(curDTPDate, this.config.formatDate).toDate();
        },
        /**
         * 获取当前时间
         */
        getTime : function() {
            return Moment(curDTPTime, this.config.formatTime).toDate();
        },
        /**
         * 获取当前完整日期时间
         */
        getDateTime : function() {
            return Moment(curDTPDateTime, this.config.format).toDate();
        },
        /**
         * 获取当前日期的字符串
         */
        getDateStr : function() {
            return curDTPDate;
        },
        /**
         * 获取当前时间
         */
        getTimeStr : function() {
            return curDTPTime;
        },
        /**
         * 获取当前完整日期时间
         */
        getDateTimeStr : function() {
            return curDTPDateTime;
        },
        /**
         * 设置全局时间并可能的填入trigger的属性
         */
        setGlobalTime : function() {
            curDTPDateTime = curDTPDate + ' ' + curDTPTime;
        },
        /**
         * 配置项内容自检
         */
        adjustCfg : function() {
            var self = this;
            var selfConfig = self.config;
            selfConfig.start = DOM.get(selfConfig.start);
            selfConfig.end = DOM.get(selfConfig.end);
            if(selfConfig.acceptTime && selfConfig.acceptTime.length >=1) {
                selfConfig._needCheckAccept = true;
            }
        }
    });

    return DateTimePicker;
}, {
    requires : [
        'dom', 'event',
        'kg/moment/2.0.1/index',
        './base.css'
    ]
});
