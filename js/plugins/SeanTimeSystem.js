//=============================================================================
// Sean's Time System
// by Sean / Thavus / Roundpitt
// Date: 4/5/2018
 
//=============================================================================
  
 
/*:
 * @plugindesc Tracks in game time and reacts   // Describe your plugin
 * @author Sean        // your name goes here
 */

(function() {
  var parameters = PluginManager.parameters('SeanTimeSystem');
   
  
// Now find something you want to edit in the core plugins.  You can
// find them in the Project\www\js folder 
// 2. find the EXACT function you want to edit
   
   
  /*
  This function can be found in rpg_scenes.js
   
  Scene_Title.prototype.drawGameTitle = function() {
    var x = 20;
    var y = Graphics.height / 4;
    var maxWidth = Graphics.width - x * 2;
    var text = $dataSystem.gameTitle;
    this._gameTitleSprite.bitmap.outlineColor = 'black';
    this._gameTitleSprite.bitmap.outlineWidth = 8;
    this._gameTitleSprite.bitmap.fontSize = 72;
    this._gameTitleSprite.bitmap.drawText(text, x, y, maxWidth, 48, 'center');
     
    */
   
  // make your adjustments by adding code, or adjusting them below.
  // This is an exact copy of the code above,  but with some of my adjustments
  // to some of the parameters.  Later,  I will show how you can call your parameters that the user adjusts
  // so your plugin has a little more control 


  var timeInterval;

  Scene_Map.prototype.start = (function() {
    var cached_function = Scene_Map.prototype.start;

    return function() {
        // your code

        var result = cached_function.apply(this, arguments); // use .apply() to call it

        if(typeof timeInterval === 'undefined' || timeInterval === null){
          startTime();
        }

        return result;
    };
  })();


  var isTalking = function() {
    return (SceneManager._scene instanceof Scene_Map && $gameMessage.isBusy()) ? true : false;
  };

  var isBattling = function() {
    return (SceneManager._scene instanceof Scene_Battle && BattleManager.isBusy()) ? true : false;
  }

  var onMap = function() {
    return SceneManager._scene instanceof Scene_Map ? true : false;
  }

  var handleTime = function() {
    if(onMap() && !isTalking() && !isBattling()){
      console.log(onMap());
      updatePartyMembers();

    }else{
      stopTime();
    }
  }

  function getSavedTime(){

    if(year === 0 ){
      minute = 0;
      hour = 0;
      day = 0;
      month = 0;
      year = 0;
    }
    return hasSavedTime
  }


  function updatePartyMembers(){

    var members = $gameParty.members();
    var length = $gameParty.members().length;
    for (var i = 0; i < length; ++i) {
      if (!members[i]) continue;
      if (members[i].hunger > 0){
        members[i].hunger -= 1;
      }
    }
  }

  function startTime(){
    timeInterval = setInterval(function(){ 
      handleTime();
    }, 2000);
  }

  function stopTime() {
    console.log("stopping time");
    console.log(timeInterval);
    clearInterval(timeInterval);
    timeInterval = null;
  }
   
})(); 