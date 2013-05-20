    var Model = Chassis.Model = function(attributes, options) {
        var defaults,
            attrs;
        
        attrs = attributes || {};
        options || (options = {});
        
        this.attributes = {};
        
        attrs = Chassis.mixin({},options.defaults || {},attrs);
        
        this.set(attrs, options);

        this.initialize.apply(this,arguments);
    };
    
    Chassis.mixin(Model.prototype, Events, {
        
        initialize : function(){},
        
        get : function(key){
            return this.attributes[ key ];
        },
        
        
        set : function(key, val, options){
            var self = this,
                attr, 
                attrs, 
                unset, 
                changes, 
                silent, 
                changing, 
                prev, 
                current;
                
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
            
            
            Chassis.each(attrs,function(item,key){
                options.unset ?
                    delete self.attributes[ key ] :
                    self.attributes[ key ] = item;
                    
            });
        },
        
        unset : function( attr, options ){
            return this.set(attr, void 0, Chassis.mixin({}, options, {unset: true}));
        },
        
        
        clear : function(options){
            var attrs = {};
            Chassis.each(this.attributes,function(item,key){
                attrs[key] = void 0;
            });
            
            return this.unset(attrs,options);
        },
        
        toJSON : function(){
            return Chassis.clone(this.attributes);
        },
        
        clone : function(){
            return new this.constructor(this.attributes);
        }
        
        
        
        
    });
    

    Model.extend = Chassis.extend;
