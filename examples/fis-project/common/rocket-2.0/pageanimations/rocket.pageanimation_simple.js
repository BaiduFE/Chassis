(function($) {

    rocket.pageanimation_simple = {};

    /**
     * 过门动画
     * @param currentEle 当前需要移走的元素
     * @param nextEle 需要移入的元素
     * @param dir 动画方向，0:无方向， 1:向左， 2:向右
     * @param callback 动画完成后的回调函数
     */
    rocket.pageanimation_simple.animate = function(currentEle, nextEle, dir, callback) {

        var $currentEle = currentEle && $(currentEle),
            $nextEle = nextEle && $(nextEle);

        if(currentEle != nextEle){
            currentEle && $currentEle.hide();
            setTimeout(function(){
                nextEle && $nextEle.show();
            }, 0);
        }

        callback && callback();
    };

})(Zepto);


