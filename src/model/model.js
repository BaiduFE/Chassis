var Model = Chassis.Model = function(attributes, options) {
    var defaults,
        attrs;
    
    attrs = attributes || {};
    options || (options = {});
    
    this.attributes = {};
    this.cid = _.uniqueId('c');
    
    
    attrs = Chassis.mixin({},this.defaults || {},attrs);
    this.set(attrs, options);
    
    
    
    this.initialize.apply(this,arguments);
};

Chassis.mixin(Model.prototype, Events, {
    
    idAttribute : 'id',
    
    initialize : function(){},
    
    /**
     *fetch方法获取数据的url。
     *注意这个方法的意思和backbone是有区别的
     *
     * @method url
     * @return 
     **/
    url : function(){
        
    },
    
    /**
     *从模型获取当前属性值，比如：csser.get("title")
     *
     * @method get
     * @return 
     **/
    get : function(key) {
        return this.attributes[ key ];
    },
    
    /**
     *属性值为非 null 或非 undefined 时返回 true
     *
     * @method has
     * @return 
     **/
    has : function( key ){
        return this.get( key ) != null;
    },
    
    /**
     *向模型设置一个或多个散列属性。 如果任何一个属性改变了模型的状态，在不传入 {silent: true} 选项参数的情况下，会触发 "change" 事件。 
     *
     * @method set
     * @return 
     **/
    set : function(key, val, options) {
        var self = this,
            attr, 
            attrs, 
            unset, 
            changes, 
            silent, 
            changing, 
            prev, 
            current,
            validateResult;
            
        if (key == null) {
            return this;
        }

        if (typeof key === 'object') {
            attrs = key;
            options = val;
        } else {
            (attrs = {})[key] = val;
        }

        options || (options = {});
        
        //变更之前先做校验
        validateResult = this.validate.call(this,attrs);
        
        if(validateResult !== true){
            this.trigger('error',validateResult);
            return;
        }
        
        this._previousAttributes = Chassis.clone( this.attributes );
        
        if (this.idAttribute in attrs) {
            this.id = attrs[this.idAttribute];
        }
        
        Chassis.each(attrs,function(item,key){
            options.unset ?
                delete self.attributes[ key ] :
                self.attributes[ key ] = item;
                
        });
        
        self.trigger('change',self);
    },
    
    /**
     *从内部属性散列表中删除指定属性。 如果未设置 silent 选项，会触发 "change" 事件。
     *
     * @method clear
     * @return 
     **/
    unset : function( attr, options ) {
        return this.set(attr, void 0, Chassis.mixin({}, options, {unset: true}));
    },
    
    /**
     *从模型中删除所有属性。 如果未设置 silent 选项，会触发 "change" 事件。
     *
     * @method clear
     * @return 
     **/
    clear : function( options ) {
        var attrs = {};
        Chassis.each(this.attributes,function(item,key){
            attrs[key] = void 0;
        });
        
        return this.unset(attrs,options);
    },
    
    /**
     *返回模型 attributes 副本的 JSON 字符串化形式。 它可用于模型的持久化、序列化，或者传递到视图前的扩充。
     *
     * @method toJSON
     * @return 
     **/
    toJSON : function() {
        return Chassis.clone(this.attributes);
    },
    
    /**
     *返回与模型属性一致的新的实例。
     *
     * @method clone
     * @return 
     **/
    clone : function() {
        return new this.constructor(this.attributes);
    },
    
    /**
     *与 get 类似, 但返回模型属性值的 HTML 转义后的版本。 如果将数据从模型插入 HTML，使用 escape 取数据可以避免 XSS 攻击.
     *
     * @method escape
     * @return 
     **/
    escape : function( attr ) {
        return Chassis.escape(this.get(attr));
    },
    
    /**
     *在 "change" 事件发生的过程中，本方法可被用于获取已改变属性的旧值。
     *
     * @method previous
     * @return 
     **/
    previous : function( attr ) {
        return (attr == null || !this._previousAttributes) ?
                null : this._previousAttributes[attr];
    },
    
    /**
     *返回模型的上一个属性散列的副本。一般用于获取模型的不同版本之间的区别，或者当发生错误时回滚模型状态。
     *
     * @method previousAttributes
     * @return 
     **/
    previousAttributes : function() {
        return Chassis.clone(this._previousAttributes);
    },
    
    /**
     *模型是否已经保存到服务器。 如果模型尚无 id，则被视为新的。
     *
     * @method isNew
     * @return 
     **/
    isNew : function() {
        return this.id == null;
    },
    
    /**
     *手动获取数据
     *
     * @method fetch
     * @return 
     **/
    fetch : function( options ) {
        var self = this;
        
        
        options = options ? Chassis.clone(options) : {};
        
        $.ajax({
            url : self.url(),
            data : (options.data || {}),
            dataType : 'json',
            success : function(resp){
                resp = self.parse(resp,options);
                
                options.success = options.success || function(){};
                options.success.call(self);
                self.set( resp, options );
            },
            error : function(){
                self.trigger('error');
            }
        });
    },
    
    /**
     *自定义数据解析，建议用自定义的逻辑重载它
     *
     * @method parse
     * @return 
     **/
    parse: function(resp, options) {
        return resp;
    },
    
    /**
     *自定义校验，建议用自定义的逻辑重载它
     *
     * @method validate
     * @return 
     **/
    validate : function(){
        return true;
    },
    
    /**
     *手动触发 "change" 事件。
     *
     * @method change
     * @return 
     **/
    change : function(){
        this.trigger('change');
    }
    
    
    
    
    
    //对服务端做模型操作基本没用，故不做实现
    /*
    ,save : function(){}
    ,destroy : function(){}
    */
    
    
    //可以全局指定，没什么实际意义
    /*
    ,urlRoot : function(){}
    */
    
    //数据变更暂不实现(除非实现数据双向绑定)
    /*
    ,hasChanged : function(){}
    ,changedAttributes : function(){}
    */
    
    
    
    
});


Model.extend = Chassis.extend;