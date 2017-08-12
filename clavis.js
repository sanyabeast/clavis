(function (root, factory) {
    if (typeof define === "function" && define.amd) {
        define(factory);
    } else if (typeof module === "object" && module.exports) {
        module.exports = factory(true);
    } else {
    	var Clavis = factory();
    	var clavis = new Clavis();
    	window.clavis = clavis;
    }
}(this, function(){

	var Clavis = function(element){
		element = element || window;

		this.tasks = {
			keydown : {},
			keypress : {},
			keyup : {},
			combination : {},
			cheatcode : {}
		};

		this._cheatcodesString = "";

		element.addEventListener("keydown", this._proccessEvent.bind(this));
		element.addEventListener("keypress", this._proccessEvent.bind(this));
		element.addEventListener("keyup", this._proccessEvent.bind(this));
	};

	Clavis.prototype = {
		Clavis : Clavis,
		_keycodes : {
			"9": "Tab",
		    "13": "Enter",
		    "16": "ShiftLeft",
		    "17": "ControlLeft",
		    "18": "AltRight",
		    "20": "CapsLock",
		    "27": "Escape",
		    "32": "Space",
		    "37": "ArrowLeft",
		    "38": "ArrowUp",
		    "39": "Quote",
		    "40": "ArrowDown",
		    "42": "NumpadMultiply",
		    "43": "NumpadAdd",
		    "44": "Comma",
		    "45": "Minus",
		    "46": "Period",
		    "47": "Slash",
		    "48": "Digit0",
		    "49": "Digit1",
		    "50": "Digit2",
		    "51": "Digit3",
		    "52": "Digit4",
		    "53": "Digit5",
		    "54": "Digit6",
		    "55": "Digit7",
		    "56": "Digit8",
		    "57": "Digit9",
		    "59": "Semicolon",
		    "61": "Equal",
		    "65": "KeyA",
		    "66": "KeyB",
		    "67": "KeyC",
		    "68": "KeyD",
		    "69": "KeyE",
		    "70": "KeyF",
		    "71": "KeyG",
		    "72": "KeyH",
		    "73": "KeyI",
		    "74": "KeyJ",
		    "75": "KeyK",
		    "76": "KeyL",
		    "77": "KeyM",
		    "78": "KeyN",
		    "79": "KeyO",
		    "80": "KeyP",
		    "81": "KeyQ",
		    "82": "KeyR",
		    "83": "KeyS",
		    "84": "KeyT",
		    "85": "KeyU",
		    "86": "KeyV",
		    "87": "KeyW",
		    "88": "KeyX",
		    "89": "KeyY",
		    "90": "KeyZ",
		    "91": "BracketLeft",
		    "93": "BracketRight",
		    "96": "Backquote",
		    "97": "KeyA",
		    "98": "KeyB",
		    "99": "KeyC",
		    "100": "KeyD",
		    "101": "KeyE",
		    "102": "KeyF",
		    "103": "KeyG",
		    "104": "KeyH",
		    "105": "KeyI",
		    "106": "KeyJ",
		    "107": "KeyK",
		    "108": "KeyL",
		    "109": "KeyM",
		    "110": "KeyN",
		    "111": "KeyO",
		    "112": "KeyP",
		    "113": "KeyQ",
		    "114": "KeyR",
		    "115": "KeyS",
		    "116": "KeyT",
		    "117": "KeyU",
		    "118": "KeyV",
		    "119": "KeyW",
		    "120": "KeyX",
		    "121": "KeyY",
		    "122": "KeyZ",
		    "123": "F12",
		    "186": "Semicolon",
		    "187": "Equal",
		    "188": "Comma",
		    "189": "Minus",
		    "190": "Period",
		    "191": "Slash",
		    "192": "Backquote",
		    "219": "BracketLeft",
		    "221": "BracketRight",
		    "222": "Quote"
		},
		_keyreplace : {
			"controlleft" : "ctrl-left",
			"audiovolumeup" : "volume-up",
			"audiovolumedown" : "volume-down",
			"arrowup" : "up",
			"arrowdown" : "down",
			"arrowleft" : "left",
			"arrowright" : "right",
			"digit1" : "1",
			"digit2" : "2",
			"digit3" : "3",
			"digit4" : "4",
			"digit5" : "5",
			"digit6" : "6",
			"digit7" : "7",
			"digit8" : "8",
			"digit9" : "9",
			"digit0" : "0",
		},
		_randString : function(){
			return (Math.random().toString(32).substring(3, 16)) + (Math.random().toString(32).substring(3, 16));
		},
		_addTask : function(eventname, keyname, callback){
			var taskname = this._randString();
			this.tasks[eventname][keyname] = this.tasks[eventname][keyname] || {};
			this.tasks[eventname][keyname][taskname] = callback;
			return taskname;
		},
		_invoke : function(eventname, keyname, eventObj){

			if (!this.tasks[eventname][keyname]){
				return;
			}

			if (typeof this["_on" + eventname] == "function"){
				this["_on" + eventname](eventObj, eventname, keyname);
			}

			for (var a in this.tasks[eventname][keyname]){
				if (typeof this.tasks[eventname][keyname] == "function"){
					this.tasks[eventname][keyname][a](eventObj, eventname, keyname);
				}
			}
		},
		_proccessEvent : function(eventObj){
			var type = eventObj.type;
			var keyname = this._getKeyname(eventObj);
			var combination, cheatcode;


			if (type == "keydown"){
				combination = this._getCombination(eventObj, keyname);
				
				if (combination){
					type = "combination";
					keyname = combination;
				}
			}

			if (type == "keypress"){
				cheatcode = this._getCheatcode(eventObj, keyname);			

				if (cheatcode){
					type = "cheatcode";
					keyname = cheatcode;
				}
			}


			this._invoke(type, keyname, eventObj);

		},
		_getKeyname : function(eventObj){
			if (!eventObj.code) eventObj.code = this._keycodes[eventObj.keyCode];
			var keyname = this._keyreplace[eventObj.code.toLowerCase()] || eventObj.code;
			return keyname.toLowerCase().replace("key", "");
		},
		_getCombination : function(eventObj, keyname){
			if (keyname.length != 1){
				return;
			}

			var combination = keyname;

			if (eventObj.shiftKey){
				combination = "shift+" + combination;
			}

			if (eventObj.altKey){
				combination = "alt+" + combination;
			}

			if (eventObj.ctrlKey){
				combination = "ctrl+" + combination;
			}

			if (combination == keyname){
				return null;
			} else {
				return combination;
			}
		},
		_getCheatcode : function(eventObj, keyname){
			if (keyname.length != 1){
				return;
			}

			var maxLength = 0;
			this._cheatcodesString += keyname;

			for (var k in this.tasks.cheatcode){
				if (k.length > maxLength){
					maxLength = k.length;
				}

				if (this._cheatcodesString.match(k)){
					this._cheatcodesString = "";
					return k;
				}
			}

			this._cheatcodesString = this._cheatcodesString.substring(this._cheatcodesString.length - maxLength, this._cheatcodesString.length);
			return null;

		},
		keydown : function(keyname, callback){
			return this._addTask("keydown", keyname, callback);
		},
		keypress : function(keyname, callback){
			return this._addTask("keypress", keyname, callback);
		},
		keyup : function(keyname, callback){
			return this._addTask("keyup", keyname, callback);
		},
		combination : function(keyname, callback){
			return this._addTask("combination", keyname, callback);
		},
		cheatcode : function(keyname, callback){
			return this._addTask("cheatcode", keyname, callback);
		},
		on : function(eventname, keyname, callback){
			if (typeof keyname == "function"){
				callback = keyname;
				this["_on" + eventname] = callback;				
			} else {
				this[eventname](keyname, callback);
			}
		},
		off : function(eventname, keyname, taskname){
			delete this.tasks[eventname][keyname][taskname];
		},
	};

	return Clavis;
    
}));