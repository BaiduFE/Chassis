/**
 * @file
 * @name
 * @desc
 * @import zepto.js, event.js
 */

;(function($, undefined){
  var prefix = '', eventPrefix, endEventName, endAnimationName,
	/**
	 * modified by chenluyang, ie10 下带前缀属性有问题，统一先检测不带前缀属性
	 * @original vendors = { '' : '', Webkit: 'webkit', Moz: '', O: 'o', Ms: 'ms' }, 
	 */
    vendors = { '' : '', Webkit: 'webkit', Moz: '', O: 'o', ms: 'MS' }, 
    document = window.document, testEl = document.createElement('div'),
    supportedTransforms = /^((translate|rotate|scale)(X|Y|Z|3d)?|matrix(3d)?|perspective|skew(X|Y)?)$/i,
    clearProperties = {}

  function downcase(str) { return str.toLowerCase() }
  function normalizeEvent(name) { return eventPrefix ? eventPrefix + name : downcase(name) }

  $.each(vendors, function(vendor, event){
    if (testEl.style[vendor + 'TransitionProperty'] !== undefined) {
      prefix = '-' + downcase(vendor) + '-'
      eventPrefix = event
      return false
    }
  })
  clearProperties[prefix + 'transition-property'] =
  clearProperties[prefix + 'transition-duration'] =
  clearProperties[prefix + 'transition-timing-function'] =
  clearProperties[prefix + 'animation-name'] =
  clearProperties[prefix + 'animation-duration'] = ''

  $.fx = {
    off: (eventPrefix === undefined && testEl.style.transitionProperty === undefined),
    cssPrefix: prefix,
    transitionEnd: normalizeEvent('TransitionEnd'),
    animationEnd: normalizeEvent('AnimationEnd')
  }

  $.fn.animate = function(properties, duration, ease, callback){
    if ($.isObject(duration))
      ease = duration.easing, callback = duration.complete, duration = duration.duration
    if (duration) duration = duration / 1000
    return this.anim(properties, duration, ease, callback)
  }
    /**
     * added by chenluyang
     * @reason b
     */
  $.fn.animateFrom = function(properties, duration, ease, callback){
    if ($.isObject(duration))
      ease = duration.easing, callback = duration.complete, duration = duration.duration
    if (duration) duration = duration / 1000

    var oldProperties = {}, transforms, $this = $(this)
    $.extend(true, oldProperties, properties)
    for(var key in properties) {
      if (supportedTransforms.test(key)) {
        transforms || (transforms = [])
        transforms.push(key + '(' + properties[key] + ')')
        delete oldProperties[key]
        delete properties[key]
      } else {
          properties[key] = $this.css(key)
      }
    }
    if (transforms) {
        oldProperties[prefix + 'transform'] = transforms.join(' ')
        properties[prefix + 'transform'] = $this.css(prefix + 'transform')//transforms.join(' ')
    }
    $this.css(oldProperties)
    return this.anim(properties, duration, ease, callback)
  }

  $.fn.anim = function(properties, duration, ease, callback){
    var transforms, cssProperties = {}, key, that = this, wrappedCallback, endEvent = $.fx.transitionEnd
    if (duration === undefined) duration = 0.4
    if ($.fx.off) duration = 0

    if (typeof properties == 'string') {
      // keyframe animation
      cssProperties[prefix + 'animation-name'] = properties
      cssProperties[prefix + 'animation-duration'] = duration + 's'
      endEvent = $.fx.animationEnd
    } else {
      // CSS transitions
      for (key in properties)
        if (supportedTransforms.test(key)) {
          transforms || (transforms = [])
          transforms.push(key + '(' + properties[key] + ')')
           /**
             * added by chenluyang,
             * @reason 在ie10下, transition-property:translate, scale....不生效，需要改成transition-property:transform
             * 此处将所变换的属性统一删除，在下面直接加入‘transform’
             */
          delete properties[key]
        }
        else cssProperties[key] = properties[key]

      if (transforms) {
          cssProperties[prefix + 'transform'] = transforms.join(' ')
         /**
           * added by chenluyang,
           * @reason 在ie10下, transition-property:translate, scale....不生效，需要改成transition-property:transform
           */
          properties['transform'] = 'transform'
      }
      if (!$.fx.off && typeof properties === 'object') {
        cssProperties[prefix + 'transition-property'] = Object.keys(properties).join(', ')
        cssProperties[prefix + 'transition-duration'] = duration + 's'
        cssProperties[prefix + 'transition-timing-function'] = (ease || 'linear')
      }
    }

    wrappedCallback = function(event){
      if (typeof event !== 'undefined') {
        if (event.target !== event.currentTarget) return // makes sure the event didn't bubble from "below"
        $(event.target).unbind(endEvent, arguments.callee)
      }
      $(this).css(clearProperties)
      callback && callback.call(this)
    }
    if (duration > 0) this.bind(endEvent, wrappedCallback)

    setTimeout(function() {
      that.css(cssProperties)
      if (duration <= 0) setTimeout(function() {
        that.each(function(){ wrappedCallback.call(this) })
      }, 0)
    }, 0)

    return this
  }

  testEl = null
})(Zepto)
