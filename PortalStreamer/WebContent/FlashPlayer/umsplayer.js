

var UMSEmbed = (function(){
    var UMSConf = {
        'SCRIPT_IDENTITY' : '/umsplayer.js'
    };

    /**
     * checksum of the string
     * @param str string to calculate checksum with
     */
    function checksum(str){	
        var csum = 0;
    	for(var i = 0, j = 1; i < str.length; i++, j++){ 
    	    csum += str.charCodeAt(i) * j; 
    	}; 
    	return csum;
    }

    /**
     * Method to determine status of script loading.
     * @param prefix
     * @param path  path to script
     * @param mark  mark script as loaded
     * @return boolean
     */
    function loaded(prefix, path, mark){
    	var csum = checksum(path);
    	if(mark != null){ document[prefix + '_' + csum] = true; }
    	if(document[prefix + '_' + csum])return true;
    	return false;
    }

    /**
     * Extend dictionary with another dictionary
     * @param a source dictionary
     * @param b dictionary which will be extended with
     * @return new dictionary
     */
    var extend = function(a, b){
        for(var key in b){
            a[key] = b[key];
        }
        return a;
    }
    /**
     * Handle onunload event in IE browsers
     */
    var initOnunloadEvent = function(){    
         if(window.overrided_onunload != null)return;
     
         var handleUnload = function(unload_handler){
            window.onunload = unload_handler;        
        }; 
        // override onunload handler
        var prevUnloadHandler = window.onunload || function(){};
        handleUnload(function(){
            var eventsList = window.umsPlayerStopEvent || [];
            for(var i = 0; i < eventsList.length; i++){
                var e = eventsList[i];
                e();
            }
            prevUnloadHandler();
            window.overrided_onunload = true;
        });
    };
    

    // public methods
    return {
        /**
         * Get path to this script
         */
        getBaseUrl : function(){
            if(UMSConf.BASEURL != null){ // memoize
                return UMSConf.BASEURL;
            }

            var scripts = document.getElementsByTagName("script");
            for(var i = 0; i < scripts.length; i++){        
                var fullUrl = scripts[i].src;
                if(fullUrl.length < UMSConf.SCRIPT_IDENTITY.length)continue;

                try{
                    var baseUrl = fullUrl.substring(0, fullUrl.length - UMSConf.SCRIPT_IDENTITY.length);
                    var identity = fullUrl.substring(fullUrl.length - UMSConf.SCRIPT_IDENTITY.length);
                    if(identity == UMSConf.SCRIPT_IDENTITY){
                        UMSConf.BASEURL = baseUrl +  '/';                
                        return UMSConf.BASEURL;
                    }
                }catch(e){ };
            }
            return '';
        },        
        /**
         * Internal method to init ums player with predefined arguments
         * @param holder id of player object
         * @param flashvars list of flashvars 
         * @param size object with two members – width and height
         * @param playerSwf path to swf with player
         * @param customArguments list of custom parameters and/or attributes for object tag
         * @param callback function which will be called after player API initialization
         */
         embedPlayerRaw : function(holder, flashvars, size, playerSwf, customArguments, callback){    
            var params = {  
                'allowFullScreen' : 'true', 
                'allowScriptAccess' : 'sameDomain',  
                'bgcolor' : 'transparent',
                'wmode' : 'transparent'
            };  
      
            var attributes = {  
                'id': holder,  
                'name' : holder
            };  
            var baseUrl = UMSEmbed.getBaseUrl();
    
    
            // enable player javascript api callback
            flashvars['playerID'] = holder; 
    
            // extend/override with custom params and/or attributes
            if(customArguments && typeof(customArguments) == "object"){
                if(customArguments.params && typeof(customArguments.params) == "object"){
                    var params = extend(params, customArguments.params);
                }
                if(customArguments.attributes && typeof(customArguments.attributes) == "object"){
                    var attributes = extend(attributes, customArguments.attributes);
                }
            }

            // initialize UmsPlayer instance
            var player = new UmsPlayer(holder);

            // player ready handler
            player.ready(function(r){            
                // onunload event for IE handler
                var currentPlayerCloseEvent = function(){                    
                    try{
                        var object = UMS.Helper.getFlashObject(holder);
                        object.stopMedia();                    
                        player.sendMessage('uiStopClick');
                    }catch(e){ alert(e); };
                };
                                
                
                // handle onclose event for IE browsers
                if(navigator.appName.indexOf('Microsoft') > -1 && navigator.appName.indexOf('Explorer') > -1){
                    var eventsList = window.umsPlayerStopEvent || [];
                    eventsList.push(currentPlayerCloseEvent);        
                    window.umsPlayerStopEvent = eventsList;
                    
                    // add event to unload stack
                    initOnunloadEvent();        
                }
        
                // callback  for advanced users (add custom events and handlers there)
                if(callback)callback(player);
            });            
            // dynamic! embed with swfobject
            swfobject.embedSWF(  
                baseUrl + playerSwf,   
                holder,   
                size.width,   
                size.height,   
                "9.0.128",  
                baseUrl + "expressInstall.swf",   
                flashvars,
                params,
                attributes
            );
        },
        /**
         * Load script
         * @param path path to script
         * @param load onload callback function
         */
        loadScript : function(path, load){
        	var onloadCallbackHandler = function(){
        		// hanlde onload event by user method
        		if(load != null){
        			var onloadCount = 1;
        			var onloadFunc = function(){
        				if(load() == true)return;
        				setTimeout(onloadFunc, 100 * onloadCount++);
        			}
        			setTimeout(onloadFunc, 100);
        		}
        	}
        	// if script already loaded
        	if(loaded('script', path) == true){
        		onloadCallbackHandler();
        		return true;
        	}

        	var script = document.createElement('script');
        	script.src = path;
        	script.type = 'text/javascript';
        	document.getElementsByTagName("head")[0].appendChild(script); 

        	// set script flag as loaded	
        	loaded('script', path, true);
        	onloadCallbackHandler();
        	return false;
        }
    }
})();

/**
 * method to init new ums player instance
 * @param holder    player container ID
 * @param args      named arguments:
 *                       > flashvars    – a dictionary with flash vars
 *                       > size         - custom size of the player
 *                       > callback     - callback function
 */
function embedPlayer(holder, args){
    var flashvars = args.flashvars || {};
    var size = args.size || { width : 640, height: 480 }; // default size of the player
    var callback = args.callback || null;
    // default player style
    var playerStyle = args.playerStyle || 'glow';
    var playerSwf = 'player-glow.swf';
    var displayVideoAd = args.displayVideoAd == true ? true : false;
    
    var customArguments = args.custom || {};
    
    // select player skin based on different swf files
    switch(playerStyle){
        case 'quick':
        case 'quicktime':
            playerSwf = 'player-quick.swf';
            break;
        default:
        break;
    }
    
    // get base url of current script
    var baseUrl = UMSEmbed.getBaseUrl();
    
    // load swfobject to embed player
    UMSEmbed.loadScript(baseUrl + 'swfobject.js');
    
    // load video ad module
    if(displayVideoAd == true){
        flashvars['adsmodule'] = baseUrl + "adsmodules/videoadsmodule.swf";
    }
    
    // load ums advanced api script to have connection between player and
    // javascript
    UMSEmbed.loadScript(baseUrl + 'api.js', function(){
        try {
            UmsPlayer;
            UMSEmbed.embedPlayerRaw(holder, flashvars, size, playerSwf, customArguments, callback);
            return true;
        }catch(e){ };
        return false;
    });            
}
