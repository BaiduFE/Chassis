/**
 * @fileOverview slider 切换效果
 */
Chassis.FX.slider = (function(){

	function generateTransform( x, y, z ) {
        return 'translate' + ( $.support.has3d ? '3d' : '' ) + 
				'(' + x + 'px, ' + y + 'px' +
				( $.support.has3d ? ( ', ' + z + 'px)' ) : ')' );
    }

	return {
		animate: function( fromEl, toEl, dir, transitionEnd ) {

			if( dir === 0 ) {
				if( fromEl != toEl ) {

					// 先隐藏当前，避免当前页面残留，确保切换效果
					if( fromEl ) {
						$( fromEl ).hide();
					}
					
					if( toEl ) {
						$( toEl ).show();
					}

				}

				if( transitionEnd ) {
					transitionEnd();
				}

				return;
			}

			// 由于多种动画混杂，必须进行位置恢复
			var restore = true;

			// 准备位置
			toEl = $( toEl );
			fromEl = $( fromEl );

			var clientWidth = document.documentElement.clientWidth;

			fromEl.css({
				'-webkit-transition-property': '-webkit-transform',
				'-webkit-transform': generateTransform(0, 0, 0), 
				'-webkit-transition-duration': '0ms',
				'-webkit-transition-timing-function': 'ease-out',
				'-webkit-transition-delay': 'initial'
			});

			toEl.css({
				'-webkit-transition-property': '-webkit-transform',
				'-webkit-transform': generateTransform(( dir === 1 ?
                        '' : '-' ) + clientWidth, 0, 0 ), 
				'-webkit-transition-duration': '0ms',
				'-webkit-transition-timing-function': 'ease-out',
				'-webkit-transition-delay': 'initial',
				'display': 'block'
			});

			setTimeout(function() {

				function endAllTransition(){

					// 是否恢复原状，子页面切换使用
					if( restore ) {
						fromEl.css({
							'display': 'none',
							'-webkit-transform': generateTransform(0, 0, 0), 
							'-webkit-transition-duration': '0ms'
						});

						toEl.css({
							'display': 'block',
							'-webkit-transform': generateTransform(0, 0, 0), 
							'-webkit-transition-duration': '0ms'
						});
					}
					else{

						fromEl.css({
							'display': 'none'
						});

						toEl.css({
							'display': 'block'
						});
					}
				}

				// 开始动画
				toEl.css({
					'-webkit-transform': generateTransform( 0, 0, 0 ), 
					'-webkit-transition-duration': '350ms'
				});

				fromEl.css({
					'-webkit-transform': generateTransform(( dir === 1 ? '-' :
					'' ) + clientWidth, 0, 0), 
					'-webkit-transition-duration': '350ms'
				});

				setTimeout(function(){
					setTimeout(function(){
						endAllTransition();

						if( transitionEnd ) {
							transitionEnd();
						}
					}, 0);
				}, 400);

			}, 0);
		}
	};
})();