(function($) {

    rocket.pageanimation_slide = {};

    function generateTransform(x, y, z) {
        return "translate" + (rocket.has3d ? "3d" : "") + "(" + x + "px, " + y + "px" + (rocket.has3d ? (", " + z + "px)") : ")");
    };

    /**
     * 过门动画
     * @param currentEle 当前需要移走的元素
     * @param nextEle 需要移入的元素
     * @param dir 动画方向，0:无方向， 1:向左， 2:向右
     * @param restore 是否恢复原位置
     * @param callback 动画完成后的回调函数
     */
    rocket.pageanimation_slide.animate = function(
        currentEle, nextEle, dir, 
        callback, restore) {

        if(dir === 0) {
            if(currentEle != nextEle) {
                // @note: 先隐藏当前，避免当前页面残留，确保切换效果
                currentEle && $(currentEle).hide();
                $.later(function(){
                    nextEle && $(nextEle).show();
                });
            }

            callback && callback();
            return;
        }

        // 由于多种动画混杂，必须进行位置恢复
        restore = true;

        // 准备位置
        nextEle = $(nextEle);
        currentEle = $(currentEle);
        
        var clientWidth = document.documentElement.clientWidth;

        currentEle.css({
            "-webkit-transition-property": "-webkit-transform",
            "-webkit-transform": generateTransform(0, 0, 0), 
            "-webkit-transition-duration": "0ms",
            "-webkit-transition-timing-function": "ease-out",
            "-webkit-transition-delay": "initial",
        });
        nextEle.css({
            "-webkit-transition-property": "-webkit-transform",
            "-webkit-transform": generateTransform((dir === 1 ? "" : "-") + clientWidth, 0, 0), 
            "-webkit-transition-duration": "0ms",
            "-webkit-transition-timing-function": "ease-out",
            "-webkit-transition-delay": "initial",
            "display": "block",
        });

        setTimeout(function() {

            var ready = 0;

            function endTransition(e) {
                e.stopPropagation();
                // nextEle.off('webkitTransitionEnd', arguments.callee);
                ready++;

                if(2 == ready){
                    endAllTransition();
                    callback && callback();
                }
            }

            // @note: webkitTransitionEnd事件回调存在bug，慎用，目前使用setTimeout方式回调
            // nextEle.one('webkitTransitionEnd', endTransition);
            // currentEle.one('webkitTransitionEnd', endTransition);

            function endAllTransition(){

                // 是否恢复原状，子页面切换使用
                if(restore){
                    currentEle.css({
                        "display": "none",
                        "-webkit-transform": generateTransform(0, 0, 0), 
                        "-webkit-transition-duration": "0ms"
                    });
                    nextEle.css({
                        "display": "block",
                        "-webkit-transform": generateTransform(0, 0, 0), 
                        "-webkit-transition-duration": "0ms"
                    });
                }
                else{
                    currentEle.css({
                        "display": "none"
                    });
                    nextEle.css({
                        "display": "block"
                    });
                }
            }

            // 开始动画
            nextEle.css({
                "-webkit-transform": generateTransform(0, 0, 0), 
                "-webkit-transition-duration": "350ms"
            });

            currentEle.css({
                "-webkit-transform": generateTransform((dir === 1 ? "-" : "") + clientWidth, 0, 0), 
                "-webkit-transition-duration": "350ms"
            });

            setTimeout(function(){
                setTimeout(function(){
                    endAllTransition();
                    callback && callback();
                }, 0);
            }, 400);

        }, 0);
        
    };

})(Zepto);

