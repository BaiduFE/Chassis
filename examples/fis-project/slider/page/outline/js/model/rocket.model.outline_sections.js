(function($){

rocket.model.outline_sections = rocket.model.extend({

    init: function(models, options){
        var me = this;

        me.title = options.title
            || 'ROCKET框架介绍';
        me.sections = null;

        // 保留实例引用
        rocket.model.outline_sections._instances
            || (rocket.model.outline_sections._instances = {});

        rocket.model.outline_sections._instances[me.title] = me;

    }

    ,url: function(){
        return '/articles/get_article.php?'
            + 'title=' +  encodeURIComponent(this.title);
    }

    ,parse: function(resp, xhr){

        return {list:resp.content.slice(1)};
    }

    ,getSections: function(){
        var me = this,
            models = me.get('list'),
            model,
            sections = [],
            docinfoFlag = true;

        if(me.sections){
            return me.sections;
        }

        for(var i=0; i<models.length; i++){
            model = models[i];
            if('docinfo' == model.type
                || 'headline' == model.type 
                    && 2 == model.level){
                sections.push( [ rocket.clone(model) ] ); 
            }
            else{
                sections[sections.length - 1].push( rocket.clone(model) );
            }
        }
        me.sections = sections;

        return me.sections;
    }

    ,getSection: function(sliderindex){
        var me = this,
            sections = me.getSections(),
            sec = null;

        sec = sections[sliderindex - 1] || sec;

        return sec;
    }

    ,getSectionCount: function(){
        return this.getSections().length;
    }

});

// 通用model，提供跨页面访问
rocket.model.outline_sections.getInstance = function(title){
    var instances = rocket.model.outline_sections._instances;
    return instances && instances[title];
}; 

})(Zepto);

