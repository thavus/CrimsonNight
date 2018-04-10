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
      /* This means player is not on the map, or is in a message.
      ** Don't update any variables until not busy.
      */
      return;
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
      if (members[i]._hunger > 0){
        members[i]._hunger -= 1;
      }
      if(members[i]._sleep > 0){
        members[i]._sleep -= 1;
      }
      checkSleep(members[i]);
      checkHunger(members[i]);
    }
  }

  function startTime(){
    if(!timeInterval){
      timeInterval = setInterval(function(){ 
        handleTime();
      }, 2000);
    }
  }

  function checkHunger(member){
    if(member._hunger > 1000){
      member._hunger = 1000;
    }
    if(member._hunger > 800){
      member.addState(18);//full
      member.removeState(19);//fed
      member.removeState(20);//pekish
      member.removeState(21);//hunger
      member.removeState(22);//famished
      member.removeState(23);//starving
    } else if(member._hunger > 600){
      member.removeState(18);//full
      member.addState(19);//fed
      member.removeState(20);//pekish
      member.removeState(21);//hunger
      member.removeState(22);//famished
      member.removeState(23);//starving
    } else if(member._hunger > 400){
      member.removeState(18);//full
      member.removeState(19);//fed
      member.addState(20);//pekish
      member.removeState(21);//hunger
      member.removeState(22);//famished
      member.removeState(23);//starving
    } else if(member._hunger > 200){
      member.removeState(18);//full
      member.removeState(19);//fed
      member.removeState(20);//pekish
      member.addState(21);//hunger
      member.removeState(22);//famished
      member.removeState(23);//starving
    } else if(member._hunger > 0){
      member.removeState(18);//full
      member.removeState(19);//fed
      member.removeState(20);//pekish
      member.removeState(21);//hunger
      member.addState(22);//famished
      member.removeState(23);//starving
    } else {
      member.removeState(18);//full
      member.removeState(19);//fed
      member.removeState(20);//pekish
      member.removeState(21);//hunger
      member.removeState(22);//famished
      member.addState(23);//starving
    }
  }

  function checkSleep(member){
    if(member._sleep > 1000){
      member._sleep = 1000;
    }
    if(member._sleep > 800){
      member.addState(11);//well rested
      member.removeState(12);//awake
      member.removeState(13);//weary
      member.removeState(14);//drowsy
      member.removeState(15);//tired
      member.removeState(16);//sleepy
      member.removeState(17);//passing out
    } else if(member._sleep > 600){
      member.removeState(11);//well rested
      member.addState(12);//awake
      member.removeState(13);//weary
      member.removeState(14);//drowsy
      member.removeState(15);//tired
      member.removeState(16);//sleepy
      member.removeState(17);//passing out
    } else if(member._sleep > 450){
      member.removeState(11);//well rested
      member.removeState(12);//awake
      member.addState(13);//weary
      member.removeState(14);//drowsy
      member.removeState(15);//tired
      member.removeState(16);//sleepy
      member.removeState(17);//passing out
    } else if(member._sleep > 300){
      member.removeState(11);//well rested
      member.removeState(12);//awake
      member.removeState(13);//weary
      member.addState(14);//drowsy
      member.removeState(15);//tired
      member.removeState(16);//sleepy
      member.removeState(17);//passing out
    } else if(member._sleep > 150){
      member.removeState(11);//well rested
      member.removeState(12);//awake
      member.removeState(13);//weary
      member.removeState(14);//drowsy
      member.addState(15);//tired
      member.removeState(16);//sleepy
      member.removeState(17);//passing out
    } else if(member._sleep > 0){
      member.removeState(11);//well rested
      member.removeState(12);//awake
      member.removeState(13);//weary
      member.removeState(14);//drowsy
      member.removeState(15);//tired
      member.addState(16);//sleepy
      member.removeState(17);//passing out
    } else {
      member.removeState(11);//well rested
      member.removeState(12);//awake
      member.removeState(13);//weary
      member.removeState(14);//drowsy
      member.removeState(15);//tired
      member.removeState(16);//sleepy
      member.addState(17);//passing out
    }
  }
   
})(); 