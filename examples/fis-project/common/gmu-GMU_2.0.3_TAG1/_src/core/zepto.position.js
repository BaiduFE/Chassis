/**
 *  @file 基于Zepto的位置设置获取组件
 *  @name position
 *  @desc 定位组件
 *  @import core/zepto.extend.js
 */

(function ($, undefined) {
    var _positionOrg = $.fn.position,
        horizontalReg = /left|center|right/,
        verticalReg = /top|center|bottom/,
        offsetReg = /^(\w+)([\+\-]\d+%?)?/,
        rpercent = /%$/;

    function convertOffsets(offsets, width, height) {    //转换offset百分比
        return [
            parseInt(offsets[0], 10) * ( rpercent.test(offsets[0]) ? width / 100 : 1 ),
            parseInt(offsets[1], 10) * ( rpercent.test(offsets[1]) ? height / 100 : 1 )
        ];
    }
    function getPosition(targetPos, width, height) {    //根据设定值left,center,right或top,center,bottom获取位置值
        return [
            targetPos[0] == 'center' ? width / 2 : (targetPos[0] == 'left' ? 0 : width),
            targetPos[1] == 'center' ? height / 2 : (targetPos[1] == 'top' ? 0 : height)
        ];
    };
    $.fn.position = function (opts) {
        if (opts === undefined) {
            return _positionOrg.call(this);
        }
        var target = opts.of,
            $target = $(target),
            targetPos = (target === window || !$target.length) ? {
                width: $target.width(),
                height: $target.height(),
                top: target.pageYOffset,
                left: target.pageXOffset
            } : $target.offset(),
            basePosition, offset = {}, pos = {}, atOffset;

        $.each(['my', 'at'], function () {
            var posArr = opts[this].split(' '), hOffset, vOffset;
            posArr.length == 1 && (posArr = horizontalReg.test(posArr[0]) ? posArr.concat(['center']) : verticalReg.test(posArr[0]) ? ['center'].concat(posArr) : ['center', 'center']);
            hOffset = offsetReg.exec(horizontalReg.test(posArr[0]) ? posArr[0] : 'center');
            vOffset = offsetReg.exec(verticalReg.test(posArr[1]) ? posArr[1] : 'center');     //位置转换

            offset[this] = [
                hOffset[2] ? hOffset[2] : 0,
                vOffset[2] ? vOffset[2] : 0
            ];
            pos[this] = [
                hOffset[1] ? hOffset[1] : 'center',
                vOffset[1] ? vOffset[1] : 'center'
            ];
        });

        atOffset = convertOffsets(offset.at, targetPos.width, targetPos.height);     //转化offset值
        basePosition = getPosition(pos.at, targetPos.width, targetPos.height);      //获取位置转化的数值
        targetPos.left += atOffset[0] + basePosition[0];
        targetPos.top += atOffset[1] + basePosition[1];

        return this.each(function() {
            var $elem = $( this ),
                elemWidth = this.offsetWidth,
                elemHeight = this.offsetHeight,
                myOffset = convertOffsets( offset.my, elemWidth, elemHeight),
                basePosition = getPosition(pos.my, elemWidth, elemHeight),
                position = $.extend({}, targetPos);

            position.left -= -myOffset[0] - basePosition[0];
            position.top -= -myOffset[1] + basePosition[1];
            $elem.offset(position);
        });
    }
})(Zepto);
