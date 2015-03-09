## 综述

Datetimepicker是一个日期和时间选择组件，其中日期数据处理依赖于[kg/moment](http://kpm.taobao.net/moment/doc/guide/index.html)。组件中的所有格式值，请阅读moment.js的文档

* 版本：2.0.3
* 作者：承风

## 升级重要改动
* 现在已经支持配置某个时间段（最高精确到分）的可用时间配置了，组件只允许用户点击配置的时间段内的时间，可参考最后一个demo。
* 点击上一月、下一月、当前日、上一个时间、下一个时间，`不再`触发选中日期和时间的更改。`当且仅当`点选日期时，才触发更改。和旧版不同了哦。
* 为了性能，默认关闭了滚动切换日期。
* `show`方法不再返会`组件的DOM`，而是返回组件本身。。。
* 重新整理了event的抛出次序
    * clickDate和clickTime只会被点击事件触发，包括点击禁用的时间。
    * clickDateChange和clickTimeChange，被“当前时间的改变”所触发
    * 特殊情况，例如2015-03-04只支持`20：00`分以后的时间，而默认时间假设为2015-03-04 `10：00`分，我们点击2015-03-04
        * 时间`10：10`分不在20：20分后，它被禁用
        * 组件会将当前选中时间设置为2015-01-01**第一个可用**的时间，即23点00分。
        * **clickTime**事件不会被触发！而`clickTimeChange`时间会被触发

## 初始化组件

    S.use('kg/datetimepicker/2.0.3/index', function (S, Datetimepicker) {
         var datetimepicker = new Datetimepicker({参数列表});
    })

## 兼容性
* KISSY1.3.0+ 至 KISSY1.4.8
* IE6-10测试通过
* IOS下FF、Chrome、Safari测试过
* Windows下Chrome、360测试通过

## API说明

### 初始化配置项

* 配置项为object，内部参数如下
    * acceptTime `new 2.0.1+`
        * `默认值`：[]
        * 传递符合格式的对象，每个对象内的值是日历组件上会被点击的值
        * `注意`，仅能精确到分！
        * 例如

            ```
            [
            	{
            	    start : '1999-12-01 12:11:00'',
            	    end : '2000-11-11 11:02:00'
            	},
            	{
            		start : '2013-01-02 11:01:00',
            	    end : '2014-12-09 05:02:00'            	}
            ]
            ```
            * 那么只有`1999-12-01 12:11:00` 到 `2000-11-11 11:02:00`，`2013-01-02 11:01:00`到`2014-12-09 05:02:00`内的日期和时间可点选。
            * 当然你可以传递任意多个数组。如果不赋值star或者end，那么将使用配置内的yearStart的`第一天`作为开始，yearEnd的`第一天`作为结束
    * value 
        * `默认值''`
        * 组件的初始化数据，如果不传递，默认使用当前时间。
    * start
        * `默认值null`,
        * 组件的创建元素（开始），组件会在该元素点击时，位于元素的下方。如果不传，可以使用show()方法获取HTML DOM，然后自己处理。
        * 如果start内有值，又传递了`value`这个配置项，优先以start的内的值作为初始化的值
    * end 
        * `默认值null`,
        * 和开始相关联的（结束）
    * lang 
        * `默认值'zh-cn'`,
        * 国际化语言，当前支持中文`zh-cn`，中文繁体`zh-tw`，英文`en`
    * format 
        * `默认值'YYYY-MM-DD HH:mm'`,
        * 点选日期+时间返回值的格式，且为日期+时间初始化的传递值的格式
    * formatTime 
        * `默认值'HH:mm'`,
        * 时间的返回值和初始化的格式
    * formatTimeForShow 
        * `默认值'Ahh:mm'`,
        * 时间选择器上展示的时间的格式
    * formatDate 
        * `默认值'YYYY-MM-DD'`,
        * 日期的返回值和初始化的格式
    * startWithMonday 
        * `默认值false`,
        * 每周以周1为第一天
    * minuteSelect 
        * `默认值false`,
        * 时间选择器是否支持分钟级别的点选
    * inverseButton 
        * `默认值false`
        * IE > 8 和高级浏览器中，鼠标滚轮切换日历的方向反转 
    * disableDateScroll 
        * `默认值false`,
        * 禁用在日历上滚定鼠标，以按月为单位切换日历
    * closeOnDateSelect 
        * `默认值false`,
        * 点击日历就关闭组件
    * closeOnTimeSelect 
        * `默认值true`,
        * 点击时间就关闭组件
    * timepicker 
        * `默认值true`,
        * 使用时间选择器
    * datepicker 
        * `默认值true`,
        * 使用日历选择器
    * todayButton 
        * `默认值true`,
        * 显示`home`今天按钮
    * showDateLen 
        * `默认值true`,
        * 当赋值start和end后，在end的鼠标指针hover上去后，显示从start的时间到end的时间之间时间的特殊样式
    * yearStart 
        * `默认值1919`
        * 年下拉框的最小值
    * yearEnd 
        * `默认值2049`
        * 年下拉框的最大值
    * timeHeightInTimePicker 
        * `默认值26`
        * 时间选择器的单个可选时间的高度
    * id 
        * `默认值''`
        * 为组件添加额外的id
    * className 
        * `默认值''`
        * 为组件添加额外的class

### 全局事件响应响应
| 控制台点击事件 | 描述 |    
| ------------ | ------------- |
| clickLastMonth | 日期导航，上个月按钮被点击 |
| clickNextMonth | 日期导航，下个月按钮被点击 |
| clickToday | 日期导航，今天按钮 |
| changeYear | 日期导航，年的下拉选框值改变 |
| changeMonth | 日期导航，月的下拉选框值改变 |
| clickTimeUp | 时间导航，向上选择一个时间 |
| clickTimeDown | 时间导航，向下选择一个时间 |


| 组件点击时间 | 描述 |
| ------------ | ------------- |
| clickDate | 点选日期|
| clickDateChange | 点选日期，并导致日期改变 |
| clickTime | 点选时间 |
| clickTimeChange | 点选时间，并导致时间改变 |


| 全局事件 | 描述 |
| ------------ | ------------- |
| hidePanel | 隐藏整个控件|
| showPanel | 显示整个控件|

* 事件全部可由new对象的on方法捕获


      var a = new DateTimePicker({一些乱七八糟的配置});
      a.on('hidePanle', function() {
          alert('我爱承风咯咯~');
      });



* 内置方法
    * show()
        * 显示和返回创建的组件本身
    * hide()
        * 隐藏组件
    * getDate() `new`
        * 获取当前的日期，返回值为Date对象
        * 只保证该返回值的 年月日 是正确（选择）的年月日
    * getTime() `new`
        * 获取当前的时间，返回值为Date对象
        * 只保证该返回值的 时分秒 是正确（选择）的时分秒
    * getDateTime() `new`
        * 获取当前的日期和时间，返回值为Date对象
    * getDateStr() `new`
        * 获取当前的日期，返回值为格式化后的字符串
    * getTimeStr() `new`
        * 获取当前的时间，返回值为格式化后的字符串
    * getDateTimeStr() `new`
        * 获取当前的日期和时间，返回值为格式化后的字符串

* 基本样式
    * 组件最外层className `ks-dtp`
    * 日历组件最外层className `dtp-date`
    * 时间组件最外层className `dtp-time`
    * 按钮的className `.ks-dtp .icon`
    * `.ks-dtp`选择器下的全局样式修改
        * 修改了table的样式
            * border-collapse: collapse;
            * border-spacing: 2px;
            * border-color: gray;
        * 添加了全局的字体
            * font-family: 'ksDtpIcon';

## bug和建议
* 请随时邮件、旺旺、github提bug、github发pull request...联系，感谢.

       