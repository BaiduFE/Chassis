/**
 * @file
 * @name
 * @desc
 * @import zepto.js, event.js
 */

;(function($){
  var touch = {}, touchTimeout,
	  /**
	   *  added by chenluyang
	   *  @reason 兼容IE10下面Pointer事件
	   */
	   transEvent = {
			touchstart: 'MSPointerDown',
			touchend: 'MSPointerUp',
			touchmove: 'MSPointerMove'
		}
		
  function compatEvent(evt) {
    return window.navigator.msPointerEnabled ? transEvent[evt] : evt;
    //return 'ontouchstart' in window ? evt : transEvent[evt]
  }
  
  function parentIfText(node){
    return 'tagName' in node ? node : node.parentNode
  }

  function swipeDirection(x1, x2, y1, y2){
    var xDelta = Math.abs(x1 - x2), yDelta = Math.abs(y1 - y2)
    return xDelta >= yDelta ? (x1 - x2 > 0 ? 'Left' : 'Right') : (y1 - y2 > 0 ? 'Up' : 'Down')
  }

  var longTapDelay = 750, longTapTimeout, longTapArea = 5

  function longTap(){
    longTapTimeout = null
    if (touch.last) {
      touch.el.trigger('longTap')
      touch = {}
    }
  }

  function cancelLongTap(){
    if (longTapTimeout) clearTimeout(longTapTimeout)
    longTapTimeout = null
  }

  $(document).ready(function(){
    var now, delta
    //ie10 /* Direct all pointer events to JavaScript code. */
    $('body').css('-ms-touch-action: none;')
    $(document.body).bind(compatEvent('touchstart'), function(e){
      now = Date.now()
      delta = now - (touch.last || now)
	  /**
	   *  modified by chenluyang
	   *  @reason 兼容IE10下面Event对象
	   *  @oringal 
	   */
      touch.el = $(parentIfText(e.touches ? e.touches[0].target : e.target))
      touchTimeout && clearTimeout(touchTimeout)
	  /**
	   *  modified by chenluyang
	   *  @reason 兼容IE10下面Event对象
	   *  @oringal 
	   *   touch.x1 = e.touches[0].pageX
       *   touch.y1 = e.touches[0].pageY
	   */
      touch.x1 = e.touches ? e.touches[0].pageX : e.pageX
      touch.y1 = e.touches ? e.touches[0].pageY : e.pageY
      if (delta > 0 && delta <= 250) touch.isDoubleTap = true
      touch.last = now
      longTapTimeout = setTimeout(longTap, longTapDelay)
    }).bind(compatEvent('touchmove'), function(e){
            /**
             *  modified by chenluyang
             *  @reason 兼容IE10下面Event对象, IE10下，即使手指不移动，也会间隔触发MSPointerMove事件
             *  @oringal
             *   touch.x2 = e.touches[0].pageX
             *   touch.y2 = e.touches[0].pageY
             */
      if(!touch.el) return
      touch.x2 = e.touches ? e.touches[0].pageX : e.pageX
      touch.y2 = e.touches ? e.touches[0].pageY : e.pageY
      touch.x2 && longTapArea <= Math.abs(touch.x1 - touch.x2)  && cancelLongTap()

    }).bind(compatEvent('touchend'), function(e){
       cancelLongTap()
      // double tap (tapped twice within 250ms)
      if (touch.isDoubleTap) {
        touch.el.trigger('doubleTap')
        touch = {}
      // swipe
      } else if ((touch.x2 && Math.abs(touch.x1 - touch.x2) > 30) ||
                 (touch.y2 && Math.abs(touch.y1 - touch.y2) > 30)) {
          touch.el.trigger('swipe') &&
            touch.el.trigger('swipe' + (swipeDirection(touch.x1, touch.x2, touch.y1, touch.y2)))
        touch = {}
      } else if ('last' in touch) {
        touch.el.trigger('tap')
        touchTimeout = setTimeout(function(){
          touchTimeout = null
          touch.el.trigger('singleTap')
          touch = {}
        }, 250)
      }
    }).bind('touchcancel', function(){
      if (touchTimeout) clearTimeout(touchTimeout)
      if (longTapTimeout) clearTimeout(longTapTimeout)
      longTapTimeout = touchTimeout = null
      touch = {}
    })
  })


  ;['swipe', 'swipeLeft', 'swipeRight', 'swipeUp', 'swipeDown', 'doubleTap', 'tap', 'singleTap', 'longTap'].forEach(function(m){
    $.fn[m] = function(callback){ return this.bind(m, callback) }
  })
    $.fn['longTap'] = function(callback){
        this.bind('contextmenu', function(e){ e.preventDefault() })
        return this.bind('longTap', callback)
    }


})(Zepto)
