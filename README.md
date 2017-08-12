# CLAVIS

## Keys

```javascript
clavis.keydown("h", function(){
  alert("Hello");
});

clavis.keypress("w", function(evt, eventName, keyName){
  alert(keyName + "orld!");
});

var keySubscription = clavis.keypress("q", function(){
  console.log("qwerty");
});

clavis.off("keypress", "q", keySubscription);

```

## Combinations

```javascript

clavis.combination("ctrt+alt+r", function(evt){
    evt.preventDefault();
    window.location.reload();
});

```

## Cheatcodes

```javascript
clavis.combination("hesoyam", function(){
  cj.health = 1;
  cj.money = 250000;
});

clavis.combination("whosyadaddy", function(){
  alert("Alex <a.gvrnsk@gmail.com>");
});

```
