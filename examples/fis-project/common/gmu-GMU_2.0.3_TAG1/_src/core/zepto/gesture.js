/**
 * @file
 * @name
 * @desc
 * @import zepto.js, event.js
 */

;(function($){
  if ($.os.ios) {
    var gesture = {}, gestureTimeout
    function parentIfText(node){
      return 'tagName' in node ? node : node.parentNode
    }

    $(document).bind('gesturestart', function(e){
      var now = Date.now(), delta = now - (gesture.last || now)
      gesture.target = parentIfText(e.target)
      gestureTimeout && clearTimeout(gestureTimeout)
      gesture.e1 = e.scale
      gesture.last = now
    }).bind('gesturechange', function(e){
      gesture.e2 = e.scale
    }).bind('gestureend', function(e){
      if (gesture.e2 > 0) {
        Math.abs(gesture.e1 - gesture.e2) != 0 && $(gesture.target).trigger('pinch') &&
          $(gesture.target).trigger('pinch' + (gesture.e1 - gesture.e2 > 0 ? 'In' : 'Out'))
        gesture.e1 = gesture.e2 = gesture.last = 0
      } else if ('last' in gesture) {
        gesture = {}
      }
    })

    ;['pinch', 'pinchIn', 'pinchOut'].forEach(function(m){
      $.fn[m] = function(callback){ return this.bind(m, callback) }
    })
  }


        /**
         *  added by chenluyang
         *  @reason 兼容IE10下面Pointer事件
         */
     var  transEvent = {
            touchstart: 'MSPointerDown',
            touchend: 'MSPointerUp',
            touchmove: 'MSPointerMove'
        }

    function compatEvent(evt) {
        return window.navigator.msPointerEnabled ? transEvent[evt] : evt;

    }

    /**
     * added by chenluyang
     * @reason 对swipe事件进行的增强
     */
    $(document).ready(function(){
        var durationThreshold = 1000,           // 时间大于1s就不触发
            horizontalDistanceThreshold = 30,   // x方向必须大于30px
            verticalDistanceThreshold = 70,     // y方向上只要大于70px就不触发
            scrollSupressionThreshold = 30      //如果x方向移动大于该值就禁掉滚动

        $(document.body).on(compatEvent('touchstart'), function (e) {
            var point = e.touches ? e.touches[0] : e, start, stop, eventData,
                moveHandler = function(e){
                    var point = e.touches ? e.touches[0] : e, xDelta
                    if (!start) return
                    stop = {
                        x : point.clientX,
                        y : point.clientY,
                        time : Date.now()
                    }
                    if ((xDelta = Math.abs(start.x - stop.x)) > scrollSupressionThreshold ||
                        xDelta > Math.abs(start.y - stop.y)) {
                        /**
                         *
                         *
                         */
                        eventData = $.Event('swipeMove')
                        start.el.trigger(eventData)
                        eventData.defaultPrevented && e.preventDefault()
                    } else {//如果系统滚动开始了，就不触发swipe事件
                        $(document).off(compatEvent('touchmove'), moveHandler)
                    }
                },
                endHandler = function(e) {
                    $(document.body).off(compatEvent('touchmove'), moveHandler)
                    if (start && stop) {
                        if (stop.time - start.time < durationThreshold &&
                            Math.abs(start.x - stop.x) > horizontalDistanceThreshold &&
                            Math.abs(start.y - stop.y) < verticalDistanceThreshold) {
                            start.el.trigger(start.x > stop.x ? "preciseSwipeLeft" : "preciseSwipeRight")
                        }
                    }
                    start = stop = undefined
                }

            start = {
                x : point.clientX,
                y : point.clientY,
                time : Date.now(),
                el : $(e.target)
            }

            $(document.body).on(compatEvent('touchmove'), moveHandler)
                .one(compatEvent('touchend'), endHandler)
        });
    })

    ;['preciseSwipeLeft', 'preciseSwipeRight', 'swipeMove'].forEach(function(m){
        $.fn[m] = function(callback){ return this.bind(m, callback) }
    })
})(Zepto)
