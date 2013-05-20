    var Model = Chassis.Model = function(attributes, options) {
        var defaults,
            attrs = attributes || {};
            
        options || (options = {});

        this.attributes = {};
        
        if (options.parse) {
            attrs = this.parse(attrs, options) || {};
        }
        
        options._attrs || (options._attrs = attrs);
        
        if (defaults = _.result(this, 'defaults')) {
            attrs = _.defaults({}, attrs, defaults);
        }
        this.set(attrs, options);
        this.changed = {};
        this.initialize.apply(this, arguments);
    };

    Chassis.mixin(Model.prototype, Events, {
        
        /**
         * initialize
         *
         */
        initialize: function(){},

        /**
         * toJSON
         *
         */
        toJSON: function(options) {
          return Chassis.clone(this.attributes);
        },
        
        /**
         * url
         *
         */
        url: function() {},

        /**
         * get
         *
         */
        get: function(attr) {
            return this.attributes[attr];
        },
        
        /**
         * has
         *
         */
        has: function(attr) {
            return this.get(attr) != null;
        },
        
        /**
         * set
         *
         */
        set: function(key, val, options) {
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
            
            ///TODO validate

            unset           = options.unset;
            silent          = options.silent;
            changes         = [];
            changing        = this._changing;
            this._changing  = true;

            if (!changing) {
                this._previousAttributes = _.clone(this.attributes);
                this.changed = {};
            }
            current = this.attributes, prev = this._previousAttributes;

            // For each `set` attribute, update or delete the current value.
            Chassis.each(attrs,function(aItem,aKey){
                val = aItem;
                
                ///TODO暂不比较
                //如果当前的值和要设置的值不同
                if (!_.isEqual(current[aKey], val)) {
                    changes.push(aKey);
                }
                //如果之前的值和要设置的值不同
                if (!_.isEqual(prev[aKey], val)) {
                    this.changed[aKey] = val;
                } else {
                    delete this.changed[aKey];
                }
                
                unset ? delete current[aKey] : current[aKey] = val;
            });


            //如果需要触发change
            if (!silent) {
                if (changes.length) {
                    this._pending = true;
                }
                Chassis.each(changes,function(cItem,cKey){
                    self.trigger('change:' + cItem, this, current[cItem], options);
                });
                
            }

            // You might be wondering why there's a `while` loop here. Changes can
            // be recursively nested within `"change"` events.
            if (changing) return this;
            if (!silent) {
                while (this._pending) {
                    this._pending = false;
                    this.trigger('change', this, options);
                }
            }
            this._pending = false;
            this._changing = false;
            return this;
        },
        
        /**
         * unset
         *
         */
        unset: function(attr, options) {
            return this.set(attr, void 0, Chassis.mixin({}, options, {unset: true}));
        },
        
        /**
         * clear
         *
         */
        clear: function(options) {
            var attrs = {};
            
            Chassis.each(this.attributes,function(item,key){
                attrs[key] = void 0;
            });
            
            return this.set(attrs, Chassis.mixin({}, options, {unset: true}));
        },

        /**
         * changedAttributes
         *
         */
        changedAttributes: function(diff) {
            var val, 
                changed = false,
                old;
                
            if (!diff) {
                return this.hasChanged() ? _.clone(this.changed) : false;
            }
            
            old = this._changing ? this._previousAttributes : this.attributes;
            for (var attr in diff) {
                if (_.isEqual(old[attr], (val = diff[attr]))) {
                    continue;
                }
                
                (changed || (changed = {}))[attr] = val;
            }
            return changed;
        },

        /**
         * previous
         *
         */
        previous: function(attr) {
            if (attr == null || !this._previousAttributes) {
                return null;
            }
            
            return this._previousAttributes[attr];
        },

        /**
         * previousAttributes
         *
         */
        previousAttributes: function() {
            return _.clone(this._previousAttributes);
        },

        /**
         * fetch
         *
         */
        fetch: function(options) {
          options = options ? _.clone(options) : {};
          if (options.parse === void 0) options.parse = true;
          var model = this;
          var success = options.success;
          options.success = function(resp) {
            if (!model.set(model.parse(resp, options), options)) return false;
            if (success) success(model, resp, options);
            model.trigger('sync', model, resp, options);
          };
          wrapError(this, options);
          return this.sync('read', this, options);
        },

        /**
         * save
         *
         */
        save: function(key, val, options) {
          var attrs, method, xhr, attributes = this.attributes;

          // Handle both `"key", value` and `{key: value}` -style arguments.
          if (key == null || typeof key === 'object') {
            attrs = key;
            options = val;
          } else {
            (attrs = {})[key] = val;
          }

          options = _.extend({validate: true}, options);

          // If we're not waiting and attributes exist, save acts as
          // `set(attr).save(null, opts)` with validation. Otherwise, check if
          // the model will be valid when the attributes, if any, are set.
          if (attrs && !options.wait) {
            if (!this.set(attrs, options)) return false;
          } else {
            if (!this._validate(attrs, options)) return false;
          }

          // Set temporary attributes if `{wait: true}`.
          if (attrs && options.wait) {
            this.attributes = _.extend({}, attributes, attrs);
          }

          // After a successful server-side save, the client is (optionally)
          // updated with the server-side state.
          if (options.parse === void 0) options.parse = true;
          var model = this;
          var success = options.success;
          options.success = function(resp) {
            // Ensure attributes are restored during synchronous saves.
            model.attributes = attributes;
            var serverAttrs = model.parse(resp, options);
            if (options.wait) serverAttrs = _.extend(attrs || {}, serverAttrs);
            if (_.isObject(serverAttrs) && !model.set(serverAttrs, options)) {
              return false;
            }
            if (success) success(model, resp, options);
            model.trigger('sync', model, resp, options);
          };
          wrapError(this, options);

          method = this.isNew() ? 'create' : (options.patch ? 'patch' : 'update');
          if (method === 'patch') options.attrs = attrs;
          xhr = this.sync(method, this, options);

          // Restore attributes.
          if (attrs && options.wait) this.attributes = attributes;

          return xhr;
        },
        
        /**
         * destroy
         *
         */
        destroy: function(options) {
          options = options ? _.clone(options) : {};
          var model = this;
          var success = options.success;

          var destroy = function() {
            model.trigger('destroy', model, model.collection, options);
          };

          options.success = function(resp) {
            if (options.wait || model.isNew()) destroy();
            if (success) success(model, resp, options);
            if (!model.isNew()) model.trigger('sync', model, resp, options);
          };

          if (this.isNew()) {
            options.success();
            return false;
          }
          wrapError(this, options);

          var xhr = this.sync('delete', this, options);
          if (!options.wait) destroy();
          return xhr;
        },
        
        /**
         * TODO-sync
         *
         */
        sync: function() {
            return Chassis.sync.apply(this, arguments);
        },

        /**
         * parse
         *
         */
        parse: function(resp, options) {
            return resp;
        }

  });
  
  Chassis.Model.extend = Chassis.extend;

  