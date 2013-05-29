



/**
 * @fileOverview
 * @description     图片上传组件
 */
(function ($, undefined) {
    
    /**
     * @description     图片上传组件
     * @class
     * @name        $.ui.imageuploader
     * @grammar     $.ui.imageuploader(el[,options])
     * @param       {Selector}              el                             根元素
     * @param       {Object}     			options             		   参数
     * @param      {Selector}     			options.container              (可选)父容器，默认为document.body
     * @param      {String}     			options.instanceId       	   (可选)多实例类名
     * @param      {String}    			options.url      		       (必选)图片提交地址
     * @param      {String}     			options.type       		       (可选)图片提交方式，有表单提交或者ajax提交，当使用form表单提交跨域时需要设置domain
     * @param      {String}     			options.fnName       		   (可选)跨域时的回调函数名称，默认为callback
     * @param      {Object}     	        options.picthumbnail           (可选)图片缩略图的配置，包括wrap和dataVar
     * @param      {Function}              options.fileFilter             (可选)用户自定义的图片过滤方式，若通过过滤，需返回图片file
     * @param      {Function}              options.onselect               (可选)选中图片时触发的事件
     * @param      {Function}              options.onsuccess              (可选)数据返回成功后的回调函数，默认为_thumbnailRender方法
     * @param      {Function}              options.onfailed               (可选)数据返回失败后的回调函数
     */

    $.ui.create("imageuploader", {
        _data: {
            container: "",
            instanceId: "",
            type: "form",
            fnName: "callback",
            fileFilter: "",
            onselect: function (file) {}
        },

        _create: function () {
            var me = this,
                $el = me.widget(),
                $container = $(me.data("container") || document.body)[0],
                instanceId = me.data("instanceId"),
                type = me.data("type"),
                $fileCont = $("<div class='ui-imageuploader-wrap'><input class='ui-imageuploader-ipt' name='pic' type='file'/></div>");

            if (type == "form") {    //两种提交方式创建的html
                var $iframe = $("<iframe name='ui-imageuploader-iframe'></iframe>"),
                    $form = $("<form enctype='multipart/form-data' method='post'></form>"),
                    url = me.data("url");

                url += (url.indexOf("?") == -1 ? "?" : "") + "&callback=" + me.data("fnName");
                $form.append($fileCont).attr({target: "ui-imageuploader-iframe", action: url});
                $iframe.css({display: "none"});
                $fileCont = $iframe.concat($form);
            }

            if ($el) {      //创建时的根元素及外围容器判断
                $el.append($fileCont);
                if (!$el.parent().length) {
                    $el.appendTo($container);
                } else if ($container !== document.body) {
                    $el.appendTo($container);
                }
            } else {
                $el = me.widget($("<div></div>").append($fileCont)).appendTo($container);
            }

            $el.addClass(instanceId || "ui-imageuploader");

            me.trigger("create");
        },

        _init: function () {
            var me = this,
                $el = me.widget(),
                $fileInput = me.data('fileInput', $(".ui-imageuploader-ipt", $el)),
                picthumbnail = me.data("picthumbnail");

            picthumbnail && picthumbnail["dataVar"] && (window.picDataList = window[picthumbnail["dataVar"]] = []);    //全局的图片数据
            $fileInput.on("change", function (e) {
                me._eventHandler(e)
            });

            me.trigger("init");
        },

        /**
         * 选择图片eventhandle
         * @private
         */
        _inputChangeHandle: function (e) {
            var tempFile = e.target.files[0];

            if (!tempFile) {    //未上传文件
                return;
            }

            var me = this,
                fileFilter = me.data("fileFilter"),
                file = $.isFunction(fileFilter) ? fileFilter(tempFile) : me._fileFilter(tempFile);

            if (!file) {
                return;     //上传文件未通过检查
            }

            me.trigger("select", file);   //触发选中文件时的用户自定义事件

            me.data("type") == "form" ? me._formUploadFile() : me._ajaxUploadFile(file);
        },

        /**
         * 文件上传类型校验，默认方法，用户可以通过fileFilter进行覆盖
         * @private
         */
        _fileFilter: function (file) {
            var imgRule = /[^\s]+\.(jpg|gif|png|bmp)/i;

            if (file.name && imgRule.test(file.name)) {
                return file;
            } else {
                alert('文件"' + file.name + '"不是图片');
            }
        },

        /**
         * ajax方式上传图片
         * @private
         */
        _ajaxUploadFile: function (file) {
            var me = this;

            $.ajax({
                url: me.data("url"),
                type: "POST",
                data: {file: file},
                success: function (data) {
                    me.trigger("success", data)
                },
                error: function (xhr, type) {
                    me.trigger("failed");
                }
            });
        },

        /**
         * 表单方式提交图片
         * @private
         */
        _formUploadFile: function () {
            var me = this,
                uploadForm = $("form", me.widget()),
                fnName = me.data("fnName");

            /* 返回的数据格式
             {
             "error_code": 0,4,15 30772000
             "info":
             {
             "pic_id":"aa64034f78f0f736084a29a90a55b319eac413e5",
             "width": 600,
             "height" : 400,
             "pic_url": "http:\/\/imgsrc.baidu.com\/forum\/pic\/item\/aa64034f78f0f736084a29a90a55b319eac413e5.jpg"
             }
             }*/

            window[fnName] = function(data) {     //数据提交成功后执行的函数
                if (!data.error_code) {              //数据提交成功
                    if ($.isFunction(me.data("onsuccess"))) {
                        me.trigger("success", data.info);
                    } else if (me.data("picthumbnail")&& me.data("picthumbnail")["wrap"]) {
                        me._thumbnailRender(data.info);
                        data.info["pic_rotate"] = 0;
                        picDataList.push(data.info);
                    }
                } else {                 //数据提交失败
                    if ($.isFunction(me.data("onfailed"))) {
                        me.trigger("failed", data.info);
                    } else {
                        alert("上传图片失败，请重新上传");
                    }
                }

                delete window[fnName];
            };

            uploadForm.get(0).submit();
        },

        /**
         * 图片缩略预览
         * @private
         */
        _thumbnailRender: function (picData) {
            var me = this,
                $picthumbnailWrap = me.data('picthumbnailWrap', $(me.data("picthumbnail")["wrap"])),
                $pic = $(new Image()),
                $linkEle = $("<a href='javascript:;'></a>");

            $pic.attr({src: picData["pic_url"], "data-id": picData["pic_id"], "data-rotate": 0});
            $linkEle.append($pic);
            $picthumbnailWrap.append($linkEle).addClass("ui-imageuploader-thumbnail");

            $picthumbnailWrap.on("tap", function (e) {
                me._eventHandler(e)
            });
        },

        /**
         * 图片缩略图eventhandle
         * @private
         */
        _thumbnailEventHandle: function (e) {
            var me = this;

            if (e.target.nodeName == "IMG") {
                var $img = $(e.target),
                    data = {
                        url: $img.attr("src"),
                        id: $img.attr("data-id"),
                        deg: $img.attr("data-rotate")
                    };

                if (window.imageeditor) {         //若图片编辑组件已经存在在页面上
                    window.imageeditor.refresh(data);
                    $(".ui-imageuploader-mask").show();
                    $(".ui-imageuploader-editorwrap").show();
                } else {             //若图片编辑组件不存在在页面上
                    var $editorMask = me.data('editorMask',$("<div class='ui-imageuploader-mask'></div>")),
                        $editorWrap = $("<div class='ui-imageuploader-editorwrap'></div>"),
                        $editorDel = me.data('editorDel', $("<a href='javascript:;'>删除</a>")),
                        $editorBack = me.data('editorBack', $("<a href='javascript:;'>返回</a>"));

                    $editorMask.appendTo(document.body);
                    $editorWrap.appendTo(document.body).append($editorDel).append($editorBack);

                    window.imageeditor = $.ui.imageeditor($editorWrap, {     //new 图片编辑组件
                        picData: data,
                        onrotate: function (img, deg) {
                            var imgId = $(img).attr("data-id"),
                                allimgs = $(me.data("picthumbnail")["wrap"]).find("img");

                            $.each(allimgs, function (index, item) {
                                if ($(item).attr("data-id") == imgId) {
                                    $(item).css("-webkit-transform", "rotate(" + deg + "deg)");
                                    $(item).attr("data-rotate", deg);
                                }
                            });

                            me._updatePicDataList(imgId, deg);
                        },
                        ondelete: function (img) {
                            var imgId = $(img).attr("data-id"),
                                allimgs = $(me.data("picthumbnail")["wrap"]).find("img");

                            $.each(allimgs, function (index, item) {
                                if ($(item).attr("data-id") == imgId) {
                                    $(item).parent("a").remove();
                                }
                            });

                            me._updatePicDataList(imgId);
                        },
                        onclose: function () {
                            $editorMask.hide();
                        }
                    });
                    $editorMask.css({
                        display: "block",
                        width: document.body.clientWidth,
                        height: $editorWrap[0].clientHeight
                    });

                    $editorMask.on("tap", function () {
                        imageeditor.imageClose();
                    });
                    $editorDel.on("tap", function () {
                        imageeditor.imageDel();
                    });
                    $editorBack.on("tap", function () {
                        imageeditor.imageClose();
                    });

                    $(window).on('resize', function (e) {me._eventHandler(e)});

                    me.data("editorMask", $editorMask);
                    me.data({
                        editorMask: $editorMask,
                        editorWrap: $editorWrap
                    });
                }
            }

        },

        /**
         * 更新全局图片数据数组
         * @private
         */
        _updatePicDataList: function (imgId, deg) {
            var picDataList = window.picDataList;

            $.each(picDataList, function (index, item) {
                if (item["pic_id"] == imgId) {
                    deg !== undefined ? (item["pic_rotate"] = deg) : picDataList.splice(index, 1);
                }
            });
        },

        /**
         * 事件处理中心
         * @private
         */
        _eventHandler: function (e) {
            var me = this;

            switch (e.type) {
                case "change":
                    me._inputChangeHandle(e);
                    break;
                case "click":
                case "tap":
                    me._thumbnailEventHandle(e);
                    break;
                case "resize":
                    var $editorMask = me.data("editorMask");
                    $editorMask && $editorMask.css(
                        {
                            display: "block",
                            width: document.body.clientWidth,
                            height: me.data("editorWrap")[0].clientHeight
                        }
                    );
                    break;
            }
        },

        /**
         * @description 销毁组件
         * @function
         * @name $.ui.refresh.destory
         */
        destroy: function () {
            var me = this,
                $fileInput = me.data('fileInput'),
                $picthumbnailWrap = me.data('picthumbnailWrap'),
                $editorMask = me.data('editorMask'),
                $editorDel = me.data('editorDel'),
                $editorBack = me.data('editorBack');

            $fileInput && $fileInput.off().remove();
            $picthumbnailWrap && $picthumbnailWrap.off().remove();
            $editorMask && $editorMask.off().remove();
            $editorDel && $editorDel.off().remove();
            $editorBack && $editorBack.off().remove();
            $(window).off('resize');
            window.imageeditor && window.imageeditor.destroy();
            delete window.imageeditor;

            me._super();
        }
    });

})(Zepto);


