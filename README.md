# Clavis

A lightweight JavaScript keyboard event handler library for managing key presses, key combinations, and cheat codes in web applications.

## Features

- 🔑 Simple key event handling (keydown, keypress, keyup)
- ⌨️ Support for key combinations (e.g., Ctrl+Alt+S)
- 🎮 Cheat code detection
- 🔌 UMD support (works with AMD, CommonJS, and as a global)
- 🪶 Zero dependencies

## Installation

```html
<!-- Simply include the script in your HTML -->  
<script src="clavis.js"></script>
```

## Usage

### Basic Key Events

```javascript
// Handle key down events
clavis.keydown("h", function(){
  alert("Hello");
});

// Access event information
clavis.keypress("w", function(evt, eventName, keyName){
  alert(keyName + "orld!");
});

// Unsubscribe from events
var keySubscription = clavis.keypress("q", function(){
  console.log("qwerty");
});

clavis.off("keypress", "q", keySubscription);
```

### Key Combinations

```javascript
// Handle key combinations (e.g., Ctrl+Alt+R)
clavis.combination("ctrl+alt+r", function(evt){
    evt.preventDefault();
    window.location.reload();
});
```

### Cheat Codes

```javascript
// Detect sequences of keys typed in order
clavis.cheatcode("hesoyam", function(){
  console.log("Health and money cheat activated!");
});

clavis.cheatcode("whosyadaddy", function(){
  alert("Alex <a.gvrnsk@gmail.com>");
});
```

## API Reference

- `keydown(keyName, callback)`: Listen for keydown events
- `keypress(keyName, callback)`: Listen for keypress events
- `keyup(keyName, callback)`: Listen for keyup events
- `combination(combinationString, callback)`: Listen for key combinations
- `cheatcode(codeString, callback)`: Listen for sequences of keys
- `on(eventType, keyName, callback)`: Generic event listener
- `off(eventType, keyName, taskId)`: Remove event listener

## License

MIT

## Author

Alex Gvrnsk <a.gvrnsk@gmail.com>
