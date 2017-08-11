# cyboard

## Keys

```javascript
cyboard.keydown("h", function(){
  alert("Hello");
});

cyboard.keypress("w", function((evt, eventName, keyName){
  alert(keyName + "orld!");
});

var keySubscription = cyboard.keypress("q", function(){
  console.log("qwerty");
});

cyboard.off("keypress", "q", keySubscription);

```

## Combinations

```javascript

cyboard.combination("ctrt+alt+r", function(evt){
    evt.preventDefault();
    window.location.reload();
});

```

## Cheatcodes

```javascript
cyboard.combination("hesoyam", function(){
  cj.health = 1;
  cj.money = 250000;
});

cyboard.combination("whosyadaddy", function(){
  alert("Alex <a.gvrnsk@gmail.com>");
});

```
