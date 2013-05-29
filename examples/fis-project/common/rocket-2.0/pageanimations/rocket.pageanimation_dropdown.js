(function($) {

    rocket.pageanimation_dropdown = {};

    function generateTransform(x, y, z) {
        return "translate" + (rocket.has3d ? "3d" : "") + "(" + x + "px, " + y + "px" + (rocket.has3d ? (", " + z + "px)") : ")");
    };

    /**
     * 垂帘动画
     * @param currentEle 当前需要移走的元素
     * @param nextEle 需要移入的元素
     * @param dir 动画方向，0:直接显示和隐藏， 1:开帘， 2:关帘
     * @param restore 是否恢复原位置
     * @param callback 动画完成后的回调函数
     */
    rocket.pageanimation_dropdown.animate = function(
        currentEle, nextEle, dir, 
        callback, restore) {

        // console.log('dropdown animate');

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

        // 1. 准备位置和状态
        nextEle = $(nextEle);
        currentEle = $(currentEle);
        
        var clientHeight = document.documentElement.clientHeight;
        var clientHeight = $(window).height();

        /**
         * 开帘： 显示下一，上拉当前，隐藏当前，恢复位置
         * 关帘： 显示下一，下拉下一，隐藏当前，恢复位置
         */

        // 1.1 显示下一元素
        nextEle.show();

        // 1.2 设置z-index
        // 开帘：上拉当前元素需要确保当前元素比下一元素的z-index大
        if(1 == dir){
            currentEle.css('z-index', 1000); 
            nextEle.css('z-index', 999); 
        }
        // 关帘：下拉下一元素需要确保下一元素比当前元素的z-index大
        else{
            currentEle.css('z-index', 999); 
            nextEle.css('z-index', 1000); 
        }

        // 1.3 设置初始位置
        currentEle.css({
            "-webkit-transition-property": "-webkit-transform",
            "-webkit-transform": generateTransform(0, 0, 0), 
            "-webkit-transition-duration": "0ms",
            "-webkit-transition-timing-function": "ease-out",
            "-webkit-transition-delay": "initial",
        });

        nextEle.css({
            "-webkit-transition-property": "-webkit-transform",
            "-webkit-transform": generateTransform(0, dir === 1 ? "0" : "-" + clientHeight, 0), 
            "-webkit-transition-duration": "0ms",
            "-webkit-transition-timing-function": "ease-out",
            "-webkit-transition-delay": "initial",
            "display": "block",
        });

        setTimeout(function() {

            function endTransition() {
                endAllTransition();
                callback && callback();
            }

            // nextEle.one('webkitTransitionEnd', endTransition);
            // currentEle.one('webkitTransitionEnd', endTransition);

            function endAllTransition(){

                // console.log('endAllTransition');

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
                        "-webkit-transition-duration": "0ms",
                    });
                }
                else{
                    currentEle.css({
                        "display": "none",
                    });
                    nextEle.css({
                        "display": "block",
                    });
                }
            }

            // 2. 开始动画
            // 2.1 开帘，上拉当前元素
            if(1 == dir){
                currentEle.css({
                    "-webkit-transform": generateTransform(0, -clientHeight, 0), 
                    "-webkit-transition-duration": "350ms",
                });
            }
            // 2.2 关帘，下拉下一元素
            else{
                nextEle.css({
                    "-webkit-transform": generateTransform(0, 0, 0), 
                    "-webkit-transition-duration": "350ms",
                });
            }

            setTimeout(function(){
                setTimeout(function(){
                    endAllTransition();
                    callback && callback();
                }, 0);
            }, 400);
            
        }, 0);
        
    };

})(Zepto);

