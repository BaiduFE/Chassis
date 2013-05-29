



/**
 * @fileOverview
 * @description     图片编辑组件
 */
(function ($, undefined) {
    /**
     * @description     图片编辑组件
     * @class
     * @name     $.ui.imageeditor
     * @grammar  $.ui.imageeditor(el[,options])
     * @param       {Selector}              el                              根元素
     * @param       {Object}     			options             		    参数
     * @param      {Selector}     			options.container               (可选)父容器，默认为document.body
     * @param      {String}     			options.instanceId       	    (可选)多实例类名
     * @param      {Object}    			options.picData      		    (必选)要编辑的图片信息
     * @param      {Object}     			options.rotateArr       	    (可选)左右箭头代表旋转的度数{left, right}
     * @param      {Function}              options.onrotate                (可选)图片旋转时的事件，参数为(img, deg)
     * @param      {Function}              options.ondelete                (可选)图片删除时的事件，参数为(img)
     * @param      {Function}              options.onclose                 (可选)关闭
     */
    $.ui.create("imageeditor", {
        _data: {
            container: "",
            instanceId: "",
            rotateArr: {
                left: -90,
                right: 90
            }
        },

        _create: function () {
            var me = this,
                $el = me.widget(),
                $container = $(me.data("container") || document.body)[0],
                instanceId = me.data("instanceId"),
                $pic = $(new Image()),
                picData = me.data("picData"),
                $imgWrap = $("<div class='ui-imageeditor-imgwrap'></div>"),
                $arrWrap = $("<div class='ui-imageeditor-arrwrap'><a class='ui-imageeditor-larr' href='javascript:;'></a><a class='ui-imageeditor-rarr' href='javascript:;'></a></div>");

            $pic.attr({src: picData["url"], "data-id": picData["id"], "data-rotate": picData["deg"]});
            $pic.css("-webkit-transform", "rotate(" + picData["deg"] + "deg)");
            $imgWrap.append($pic);

            if ($el) {      //创建时的根元素及外围容器判断
                $el.append($imgWrap).append($arrWrap);
                if (!$el.parent().length) {
                    $el.appendTo($container);
                } else if ($container !== document.body) {
                    $el.appendTo($container);
                }
            } else {
                $el = me.widget($("<div></div>").append($imgWrap).append($arrWrap)).appendTo($container);
            }

            $el.addClass(instanceId || "ui-imageeditor");

            me.data({
                imgWrap: $imgWrap,
                arrWrap: $arrWrap,
                lastDegree: picData["deg"]
            });

            me.trigger("create");
        },

        _init: function () {
            var me = this,
                $arrWrap = me.data("arrWrap");

            $arrWrap.on("tap", function (e) {
                me._eventHandler(e)
            });

            me.trigger("init");
        },

        /**
         * @description 图片旋转
         * @function
         * @name $.ui.imageeditor.imageRotate
         * @param {Number} deg 图片旋转的角度
         * @return {Object} this
         */
        imageRotate: function (deg) {
            var me = this,
                $image = $("img", me.data("imgWrap")),
                allDeg = parseInt(me.data("lastDegree")) + parseInt(deg);

            allDeg != undefined && $image.css("-webkit-transform", "rotate(" + allDeg + "deg)");

            me.data("lastDegree", allDeg);

            me.trigger("rotate", $image, me.data("lastDegree"));

            return me;
        },

        /**
         * 图片旋转event handle
         * @private
         */
        _rotateEventHandle: function (e) {
            var me = this,
                $target = $(e.target),
                rotateArr = me.data("rotateArr");

            if ($target.pluck("nodeName") == "A") {
                $target.hasClass("ui-imageeditor-larr") ? me.imageRotate(rotateArr.left) : me.imageRotate(rotateArr.right);
            }

        },

        /**
         * @description 图片旋转
         * @function
         * @name $.ui.imageeditor.imageClose
         * @return {Object} this
         */
        imageClose: function () {
            var me = this,
                $el = me.widget();

            $el.hide();

            me.trigger("close");

            return me;
        },

        /**
         * @description 删除图片
         * @function
         * @name $.ui.imageeditor.imageDel
         * @return {Object} this
         */
        imageDel: function () {
            var me = this,
                $image = $("img", me.data("imgWrap"));

            me.imageClose();

            me.trigger("delete", $image);

            return me;
        },

        /**
         * @description 更新组件数据
         * @function
         * @name $.ui.imageeditor.refresh
         * @param {object} data 图片数据
         * @return {Object} null
         */
        refresh: function (data) {
            var me = this,
                $img = me.data("imgWrap").find("img");

            $img.attr({src: data["url"], "data-id": data["id"], "data-rotate": data["deg"]});
            $img.css("-webkit-transform", "rotate(" + data["deg"] + "deg)");
            me.data("picData", data);
            me.data("lastDegree", data["deg"]);

        },

        /**
         * 事件处理中心
         * @private
         */
        _eventHandler: function (e) {
            var me = this;

            switch (e.type) {
                case "click":
                case "tap":
                    me._rotateEventHandle(e);
                    break;
            }
        },

        /**
         * @description 销毁组件
         * @function
         * @name $.ui.imageeditor.destroy
         */
        destroy: function () {
            var me = this;

            me.widget().off('click tap');

            me._super();
        }
    });

})(Zepto);


