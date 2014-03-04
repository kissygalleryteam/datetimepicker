/**
 * @fileoverview 
 * @author 承风<libiao.lb@tmall.com>
 * @module datetimepicker
 **/
KISSY.add(function (S, Node,Base) {
    var EMPTY = '';
    var $ = Node.all;
    /**
     * 
     * @class Datetimepicker
     * @constructor
     * @extends Base
     */
    function Datetimepicker(comConfig) {
        var self = this;
        //调用父类构造函数
        Datetimepicker.superclass.constructor.call(self, comConfig);
    }
    S.extend(Datetimepicker, Base, /** @lends Datetimepicker.prototype*/{

    }, {ATTRS : /** @lends Datetimepicker*/{

    }});
    return Datetimepicker;
}, {requires:['node', 'base']});



