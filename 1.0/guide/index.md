## 综述

Datetimepicker是一个日期和时间选择组件，其中日期数据处理依赖于[gallery/moment.js v1.0版本]([http://gallery.kissyui.com/moment/1.0/guide/index.html](http://gallery.kissyui.com/moment/1.0/guide/index.html))。组件中的所有格式值，请阅读moment.js的文档

* 版本：1.0
* 作者：承风
* demo：[http://gallery.kissyui.com/datetimepicker/1.0/demo/index.html](http://gallery.kissyui.com/datetimepicker/1.0/demo/index.html)

## 初始化组件

    S.use('gallery/datetimepicker/1.0/index', function (S, Datetimepicker) {
         var datetimepicker = new Datetimepicker({参数列表});
    })

## 兼容性
* IE6-10测试通过
* IOS下FF、Chrome、Safari测试过
* Windows下Chrome、360测试通过

## API说明
* 初始化配置项
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
* 全局事件响应响应

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
* 内置方法
    * show()
        * 显示和返回创建的组件元素本身
    * hide()
        * 隐藏组件
    * 其余方法不建议调用，如有需要可以随时联系我
* 基本样式
    * 组件最外层className `ks-dtp`
    * 日历组件最外层className `dtp-date`
    * 时间组件最外层className `dtp-time`
    * 按钮的className `icon`
    * 全局样式修改
        * 修改了table的样式
            * border-collapse: collapse;
            * border-spacing: 2px;
            * border-color: gray;
        * 添加了全局的字体
            * font-family: 'icon';

## bug和建议
* 请随时邮件、旺旺、github提bug、github发pull request...联系，感谢.

       