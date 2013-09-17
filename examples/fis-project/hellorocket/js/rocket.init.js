(function($) {





$.extend(rocket, {
    init: function() {
        
		// 设置全局载入条和局部载入条
		rocket.View.Loading.setup('#wrapper .global-loading','#wrapper .page-loading');

        new rocket.router.hellorocket();
        rocket.history.start();

        function scroll(e){
            $(document.body).height(600);

            // http://remysharp.com/2010/08/05/doing-it-right-skipping-the-iphone-url-bar/
            setTimeout(function(){
                window.scrollTo(0, 0);
                $.later(function(){
                    $(document.body).height($(window).height());
                });
                rocket.isLoaded = true;
            }, 1000); 

        }

        $(function(e){
            scroll();
        });
    }

});

})(Zepto);    

