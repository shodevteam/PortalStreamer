
var SNT_DEBUG = SNT_DEBUG || false;


/**
 *  @description helper singelton
 */
var UMS = UMS || {};
UMS.Helper = (function(){
	/**
	 * @property
	 * @private
	 * @desc list of all private static constants
	 */
	var constants = {
		EVENT_ADD : 'ADD_EVENT_LISTENER',
		EVENT_RM : 'REMOVE_EVENT_LISTENER',
		EVENT_INIT : 'INIT_STATE',
		EVENT_REGISTER : 'PLAYER_REGISTER'
	};
	
	var debugObject = null;
	var debugTextObject = null;
	
	return {
		/**
		 *  @description This method return constant value or null
		 *  @param {String} name Name of constant
		 *  @return Value of constant or null
		 */
		getConstant : function(name){
			return constants[name] || null;
		},
		/**
		 * @description Get flash object
		 * @param id ID of the Player's flash object
		 * @return Object
		 */
		getFlashObject : function(id){			
			UMS.Helper.debug('Getting object with id [' + id + ']');
			var isIE = navigator.appName.indexOf("Microsoft") != -1;
			var obj = (isIE) ? window[id] : document[id];
			return obj;
		},
		/**
		 * @description Debug message
		 * @param msg Message to debug
		 */
		debug : function(msg){
			if(SNT_DEBUG == false || SNT_DEBUG == null)return;
			if(window.console && window.console.log){
				window.console.log(msg);
			}else{
				// create element
				debugObject = debugObject || document.getElementById('ums-debug');
				if(debugObject == null){
					var body = document.getElementsByTagName('body')[0];
					var debugWindow = document.createElement('div');
					
					var holderElement = '<form action=""><textarea id="ums-debug" name="snt-debug" ' + 
										'style="border:1px dashed #000; ' + 
										'display:block; position:absolute; bottom: 10px; ' + 
										'right: 10px; width: 500px; height:100px;' + 
										'background-color:#f8f8f8; border-top:15px solid #c8c8c8;' +
										'overflow:auto; font-size:11px; font-family:sans-serif;">';	
					debugWindow.innerHTML = holderElement + '</textarea></form>';
					body.appendChild(debugWindow);
				}
					
				// write to output
				if(debugObject != null){					
					debugObject.value =  debugObject.value + '>> ' + msg + '\n';
					var doLen = debugObject.length;
					debugObject.scrollTop = debugObject.scrollHeight;
				}
			}
		}
	}
})();

/**
 * 
 * @description Creates a new UMS Holder.
 * @constructor
 * @class
 * @protected
 * @version 0.1a
 */ 
var UmsEventsHolder = (function(){

	/**
	 * @property
	 * @private
	 * @description a set with list of all registered players
	 */
	var players = {};
	
	/**
	 * @property
	 * @private
	 * @description a set with list of all registered FLASH objects
	 */	 
	var objs = {};
	
	/**
	 * @property
	 * @private
	 * @description a set with list of statuses of all players (boolean true or false)
	 * 				which registered from the flash object
	 */		
	var status = {};
	
	/**
	 * @property
	 * @private
	 * @description a set with list of all unregistered players which
	 * 				initialized by Flash object but not initialized by JavaScript
	 */		
	var unregistered = {};
		
	
	/**
	 * @function
	 * @private
	 * @description This is static private method to get an item from the array by its name
	 * @param {Array} a Source set
	 * @param {String} n Name of the item
	 * @return value of the a[n] or null
	 */
	function getSetItemByName(a, n){			
		return !a[n] || a[n] == null ? null : a[n];
	}
	
	return function(){	
		/**
		 * @function
		 * @private
		 * @description this is helper to get constant by its name
		 * @param name name of constant
		 * @return constant value or null if it's not exist
		 */
		this.getConstant = function(name){
			//constants[name] ? constants[name] : null;
			return UMS.Helper.getConstant(name);
		}
				
		/**
		 * @function
		 * @private
		 * @description This is a player mutator
		 * @param name Name of the player
		 * @param value player object
		 */
		this.setPlayer = function(name, value){
			players[name] = value || null;
		}
		
		/**
		 * @function
		 * @private
		 * @description This is a player accessor
		 * @param {String} name Name of the player
		 * @return UmsPlayer player object
		 */		
		this.getPlayer = function(name){
			return getSetItemByName(players, name); 
		}	
		
			
		/**
		 * @function
		 * @private
		 * @description This is an object mutator
		 * @param name Name of the player
		 * @param value Flash object
		 */
		this.setObj = function(name, value){
			objs[name] = value || null;
		}
		
		/**
		 * @function
		 * @private
		 * @description This is an object accessor
		 * @param name Name of the player
		 * @return Flash object
		 */		
		this.getObj = function(name){
			return getSetItemByName(objs, name);
		}

		/**
		 * @function
		 * @private
		 * @description This is an object status mutator
		 * @param name Name of the player
		 * @param value status
		 */		
		this.setStatus = function(name, value){
			status[name] = value || false;
		}

		/**
		 * @function
		 * @private
		 * @description This is a status of the player accessor
		 * @param name Name of the player
		 * @return boolean Status of the player
		 */		
		this.getStatus = function(name){
			return getSetItemByName(status, name);
		}
		
		/**
		 * @function
		 * @private
		 * @description This is an unregistered object mutator
		 * @param name Name of the player
		 * @param value Unregistered object
		 */		
		this.setUnregistered = function(name, value){
			unregistered[name] = value || null;
		}

		/**
		 * @function
		 * @private
		 * @description This is an unregistered object accessor
		 * @param name Name of the player
		 * @return UmsPlayer object or null
		 */		
		this.getUnregistered = function(name){
			return getSetItemByName(unregistered, name);
		}	
	}
})();


/** 
 * @function
 * @description logging to the console between Player instance and this API.
 * @param msg Log message
 * @return void
 */
UmsEventsHolder.prototype.log = function(msg){
	UMS.Helper.debug(msg);
	
}

/**
 * @function
 * @description Register player in UmsEventsHolder
 * @param id ID
 * @param player Instance (flash object)
 * @param obj object UmsPlayer
 */
UmsEventsHolder.prototype.registerPlayer = function(id, obj){
	if(id == null || obj == null)return false;

	this.setStatus(id, false);
	this.setPlayer(id, obj);
	
	if(this.getUnregistered(id) != null){		
		this.setUnregistered(id, null);
		
		// set player as registered
		this.setStatus(id, true);
		this.getPlayer(id).register(true);
	}

	this.log('Player [' + id + '] registered sucessfull');
	
	return true;
}

/**
 * @function
 * @description Method for receiving messages from Player engine.
 * @param command It's ID from which command we receive message
 * @param player Player ID
 * @param args Array with reply
 */
UmsEventsHolder.prototype.receiveMessage = function(command, player, args){	
	
	if(this.getUnregistered(player) != null){
		this.log('Skipped commad [' + command + '] for UNREGISTERED player [' + player + ']');
		// just skip message if player isn't registered
		return;
	}
	
	// register player as uncreated
	if(this.getPlayer(player) == null){		
		this.log('Created new player instance [' + player + '] and received command [' + command + ']');
		this.setUnregistered(player, new UmsPlayer(player));
		return;
	}
	
	if(this.getStatus(player) == false && command == this.getConstant('EVENT_REGISTER')){
		this.setStatus(player, true);
	} 

	if(this.getObj(player) == null){		
		//try to get this player ID
		var playerObj = UMS.Helper.getFlashObject(player);		
		if(playerObj == null){
			throw new Error('Player with id [' + player + '] not exist');
			return;
		}				
		this.setObj(player, playerObj);
	}
	
	this.getPlayer(player).register(true);
			
	this.log('Command reply [' + command + '] for player [' + player + '] received with data:' );	
	this.log(args);
	this.getPlayer(player).receiveMessage(command, args);	
}

/**
 * @function
 * @description Method for sending messages to Player engine.
 * @param command It's ID from which command we receive message
 * @param player Player ID
 * @param args Array with data
 */
UmsEventsHolder.prototype.sendMessage = function(command, player, args){
	if(this.getStatus(player) == false || this.getObj(player) == null)return;
	this.log('Command [' + command + '] sent from [' + player + '] with args:');
	this.log(args);
	
	var	rawObj = this.getObj(player);
	var rawFunc = rawObj.receiveMessage;	
	var there = this;
	// send message to the player with timeout 30 miliseconds
	// it's only for run call to the player simultaneously to main JavaScript process
	setTimeout(function(){
		if(rawObj == null){			
			there.log('Copy of the UmsPlayer Object doesn\'t exist anymore. The Conception of your code went wrong.');
			return;
		}

		//send message to player engine
		rawObj.receiveMessage(command, player, args);
		
		//set focus to player
		rawObj.focus();
	}, 30);
}

/**
 * @function
 * @description Method for adding event listener to Player engine
 * @param command it's Event ID from list of players engine events 
 * @param player Player ID
 */
UmsEventsHolder.prototype.addEventListener = function(event, player){
	if(this.getStatus(player) == false || this.getObj(player) == null)return;
	this.log('Event listener added for event [' + event + '] for player [' + player + ']');
	this.sendMessage(this.getConstant('EVENT_ADD'), player, [event]);	
	
}

/**
 * @function
 * @description Method for removing event listener from Player engine
 * @param command It's Event ID from list of players engine events
 * @param player Player ID
 */
UmsEventsHolder.prototype.removeEventListener = function(event, player){
	if(this.getStatus(player) == false || this.getObj(player) == null)return;
	this.log('Event listener removed, event [' + event + '] for player [' + player + ']');
	this.sendMessage(this.getConstant('EVENT_RM'), player, [event]);	
}

/**
 * @function
 * @description Method to getting Flash object by id or name
 * @param id Name or ID of the Flash object
 * @return reference to Flash object
 */
UmsEventsHolder.prototype.getFlashObject = function(id){	
	return UMS.Helper.getFashObject(id)
}

/**
 * 
 * @description An one Player engine copy
 * @constructor
 * @class
 * @version 0.1a
 */
function UmsPlayer(id, swfobject){
	this.id = id;
	this.c = 0;	
	this.registered = false;
	this.player = null;	
	this.eventListeners = {};
	window.getUmsHolderInstance().registerPlayer(this.id, this);
}

/**
 * @function
 * @description This function change player status or return it
 * @param {boolean} status It's optional parameter to set status of the player
 * @return boolean
 */
UmsPlayer.prototype.register = function(status){
	if(status == null)return this.registered;
	this.registered = status;
	return this.registered;
}

/**
 * @function
 * @description Method for sending messages to holder
 * @see UmsEventsHolder#sendMessage
 * @param command It's ID from which command we receive message
 * @param args Array with data
 * @param callback Callback function
 */
UmsPlayer.prototype.sendMessage = function(command, args, callback){
	window.getUmsHolderInstance().sendMessage(command, this.id, args);
	this.eventListeners[command] = callback;
}


/**
 * @function
 * @description Method for receiving messages from holder
 * @see UmsEventsHolder#receiveMessage
 * @param command It's ID from which command we receive message
 * @param args Array with data
 */
UmsPlayer.prototype.receiveMessage = function(command, args){
	if(this.eventListeners[command] != null){
		var mNum = this.c++;
		var name = 'f' + mNum;
		this[name] = this.eventListeners[command]; this[name](args);
		this[name] = null;
	}
}


/**
 * @function
 * @description isArray function - Checking whether object is Array or not
 * @param object test Object
 * @returns Boolean
 */
UmsPlayer.prototype._isArray = function(o){
	return o && typeof o === "object" && o.constructor === Array;
}
/**
 * @function
 * @description Add new event to event listeners
 * @see UmsEventsHolder#addEventListener
 * @param event String or Array Event ID or IDs from Player engine events list
 * @param callback Callback funciton
 */
UmsPlayer.prototype.addEventListener = function(eventObject, callback){
	//add just one event if event isn't Array
	var events = eventObject;
	if(!this._isArray(eventObject)){
		events = [eventObject];
	}
	for(var i in events){
		this.eventListeners[events[i]] = callback;
		window.getUmsHolderInstance().addEventListener(events[i], this.id);			
	}	
}

/**
 * @function
 * @description Remove an event frome event listener
 * @see UmsEventsHolder#removeEventListener
 * @param event String or Array Event ID or IDs from Player engine events list
 * @param callback Callback funciton
 */
UmsPlayer.prototype.removeEventListener = function(eventObject){	
	var events = eventObject;
	if(!this.isArray(eventObject)){
		events = [eventObject];
	}
	for(var i in events){
		this.eventListeners[event[i]] = null;	
		window.getUmsHolderInstance().removeEventListener(events[i], this.id);
	}
}

/**
 * @function
 * @description Add ready callback to player engine
 * @see UmsEventsHolder#addEventListener
 * @param callback Callback funciton
 */
UmsPlayer.prototype.ready = function(callback){
	// if player already sent register event
	this.addEventListener(UMS.Helper.getConstant('EVENT_REGISTER'), callback);
	if(this.register()){
		this.receiveMessage(UMS.Helper.getConstant('EVENT_REGISTER'));
	}
	
}



/**
 * 
 * @description Create a new UMS embed object. 
 * 				This object for dynamically choice between swfobject and 
 * 				pure html code for generation adobe flash object code
 * @constructor
 * @class
 * @version 0.1a
 */ 
function UmsEmbed(id, movie, flashvars, params, attributes){
	// object fields
	this.callback = null;
	this.callbackArgs = [];
	this.movie = movie;
	this.haveSwfobject = swfobject != null ? true : false;

	this.width = 470;
	this.height = 264;

	this.id = id;
	this.flashvars = flashvars != null ? flashvars : {};
	
	// list of default object and embed attributes
	this.attributes = {
		'id' : id,
		'name' : id
	};
	
	
	
	// list of default flash object parameters
	this.params = {
	    'allowFullScreen' : 'true', 
	    'allowScriptAccess' : 'sameDomain',  
	    'bgcolor' : 'transparent',
	    'wmode' : 'transparent'	
	};
	
	// merge params and arguments if it's available in agruments
	if(params != null){
		for(var i in params){ this.params[i] = params[i]; }
	}
	
	if(attributes != null){
		for(var i in attributes){ this.attributes[i] = attributes[i]; }
	}
	return this;
};


UmsEmbed.prototype = {
	/**
	 * @function
	 * @description render all embed data to flash object
	 * @param UmsEmbedEngine object
	 * @return boolean
	 */
	render : function(engine){
		engine.setCallback(this.callback);
		return engine.render(this.id, 
							this.movie,
							{ width : this.width, height: this.height },
							this.flashvars, 
							this.params, 
							this.attributes
							);
	},
	
	/** 
	 * @function
	 * @description Merge flashvars
	 * @param fv Array with new flashvars
	 */
	setFlashvars : function(fv){
		for(var i in fv){ this.flashvars[i] = fv[i]; }
	},
	
	/** 
	 * @function
	 * @description set an callback function to execute after flash object initialize
	 * @param fn callback function instance
	 * @return void
	 */
	setCallback : function(fn){
		this.callback = fn;
	},
	/**
	 * @function
	 * @description Merge attributes 
	 * @param attrs List of attributes
	 */
	setAttributes : function(attrs){
		for(var a in attrs){ this.attributes[a] = attrs[a]; }
	},
	
	/** 
	 * @function
	 * @description Merge parameters
	 * @params list of params
	 */
	setParams : function(params){
		for(var p in params){ this.params[p] = params[p]; }
	},
	 /** 
	  * @function
	  * @description set container size
	  * @param width width of the video container
	  * @param height of the video container
	  */
	setSize : function(width, height){
		this.width = width;
		this.height = height;
	}
};


/**
 * 
 * @description Engine to render an abstract data to pure HTML
 * @constructor
 * @class
 * @version 0.1a
 */ 
function UmsSwfobjectEmbed(){
	// error status, default is fine
	this.status = true;
	this.callback = null;
	return this;
};

UmsSwfobjectEmbed.prototype = {	
	/**
	 * @function
	 * @description Set callback function
	 * @param fn callback function or null
	 * @return void
	 */
	setCallback : function(fn){
		this.callback = fn;
	},	
	/** 
	 * @function
	 * @description Render all received data to object element with required params.
	 *				This function used {@link UmsEmbed#render}
	 * @param id Id of the holder
	 * @param swfMovie path to the swf 
	 * @param size an array with two elements `width` and `height` with video holder size
	 * @param flashvars array with flashvars
	 * @param params array with parameters
	 * @param attributes an array with attributes
	 * @render status of the rendering
	 */
	render : function(id, swfMovie, size, flashvars, params, attributes){
		if(swfobject == null)return false;
		if(this.callback != null){	
			UMS.Helper.debug("Set callback method: " + this.callback)	
			swfobject.addLoadEvent(this.callback);
		}
			
		swfobject.embedSWF(  
		        swfMovie,   
				id,   
		        size.width,   
		        size.height,   
		        "9.0.0",  
		        "scripts/expressInstall.swf",   
		        flashvars,
		        params,
		        attributes
		);

		return this.status;
	}	
};


/**
 * @description static item on the page
 * @field
 */
var sntEventsHolderObj = new UmsEventsHolder();
window.sntEventsHolder = sntEventsHolderObj;


/**
 * @function
 * @description Getting instance of EventsHolder obj
 * @returns and UmsEventsHolder object stored in window
 */
function getUmsHolderInstance(){
	return window.sntEventsHolder;
}

/**
 * @function
 * @description Get Element By Id (getElementById() internal method) or null. Created for short writing
 * @returns DOM elemnt or null
 */
function $$(id){
	return document.getElementById(id) || null;
}

window.getUmsHolderInstance = getUmsHolderInstance;
/**
 * @function
 * @description Receive message from any Player engine on the page
 * @param command It's Event ID from list of players engine events
 * @param player Player ID
 * @param args Array with data
 */
function sntReceiveMessage(command, player, args){	
	window.sntEventsHolder.receiveMessage(command, player, args);
}

