## datetimepicker

* 版本：2.0.1

## changelog

### V1.0
* 创建和完成基本的浏览器兼容性测试
* 支持IE >= 8浏览器，鼠标滚轮滚动切换日历
* 添加了丰富的日期格式选择、输入和输出

### V1.1
* 停止了对DateTimePicker()方式的调用方式，必须new DateTimePicker()
* 添加了丰富的函数批量，如获取当前日期、时间
* 整理了event抛出，不会再出现event响应混乱问题
* 整理了文档
* demo支持在线调试


### V1.1 20140414 update

* 1.0所使用的全局（html级）样式`.icon`, `table`都封装成了`.ks-dtp .icon` 和`.ks-dtp table`以避免污染
* 同上，全局iconfont`font-family: "icon";`修改为了`font-family: "ksDtpIcon";`

### V2.0.0 

* 迁移到kg

### V2.0.1

* 优化了调用性能，事件绑定更清晰
* 添加了acceptTime功能，传递数组对象，日历上仅能点击acceptTime内设定的日期
* 丰富了demo