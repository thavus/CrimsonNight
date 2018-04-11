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
      updateTime();
      updatePartyMembers();
    }else{
      /* This means player is not on the map, or is in a message.
      ** Don't update any variables until not busy.
      */
      return;
    }
  }

  Utils.getTime = function(minutes, hours){
    var timeStr = ':';
    timeStr = hours + timeStr;
    timeStr = (minutes < 10) ? timeStr + '0' + minutes : timeStr + minutes;

    return timeStr;
  };

  Utils.sleep = function(hoursSlept){
    $gameVariables.setValue(1, $gameVariables.value(1) + hoursSlept);
    if($gameVariables.value(1) >= 24){
      $gameVariables.setValue(1, $gameVariables.value(1) - 24);
      $gameVariables.setValue(3, $gameVariables.value(3) + 1);
    }
  }

  function updateTime(){
    var minutes = $gameVariables.value(2);
    months = [31,30,31,28,31,30,31,30,30,31,30,31];
    $gameVariables.setValue(2, minutes + 1);
    if($gameVariables.value(2) >= 60){
      $gameVariables.setValue(2, $gameVariables.value(2) - 60);
      $gameVariables.setValue(1, $gameVariables.value(1) + 1);
    }
    if($gameVariables.value(1) >= 24){
      $gameVariables.setValue(1, $gameVariables.value(1) - 24);
      $gameVariables.setValue(3, $gameVariables.value(3) + 1);
    }
    if($gameVariables.value(3) >= months[$gameVariables.value(8)]){
      $gameVariables.setValue(8, $gameVariables.value(8) - months[$gameVariables.value(8)] + 1);
      $gameVariables.setValue(9, $gameVariables.value(9) + 1);
    }
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
      handleHungerStates(member, 18);
    } else if(member._hunger > 600){
      handleHungerStates(member, 19);
    } else if(member._hunger > 400){
      handleHungerStates(member, 20);
    } else if(member._hunger > 200){
      handleHungerStates(member, 21);
    } else if(member._hunger > 0){
      handleHungerStates(member, 22);
    } else {
      handleHungerStates(member, 23);
    }
  }

  function checkSleep(member){
    if(member._sleep > 1000){
      member._sleep = 1000;
    }
    if(member._sleep > 800){
      handleSleepStates(member, 11);
    } else if(member._sleep > 600){
      handleSleepStates(member, 12);
    } else if(member._sleep > 450){
      handleSleepStates(member, 13);
    } else if(member._sleep > 300){
      handleSleepStates(member, 14);
    } else if(member._sleep > 150){
      handleSleepStates(member, 15);
    } else if(member._sleep > 0){
      handleSleepStates(member, 16);
    } else {
      handleSleepStates(member, 17);
    }
  }

  function handleSleepStates(member, stateId){
    stateIds = [11, 12, 13, 14, 15, 16, 17];
    length = stateIds.length;
    for(var i = 0; i < length; ++i){
      if(stateIds[i] === stateId){
        member.addState(stateId);
      }else{
        member.removeState(stateIds[i]);
      }
    }
  }

  function handleHungerStates(member, stateId){
    stateIds = [18, 19, 20, 21, 22, 23];
    length = stateIds.length;
    for(var i = 0; i < length; ++i){
      if(stateIds[i] === stateId){
        member.addState(stateId);
      }else{
        member.removeState(stateIds[i]);
      }
    }
  }
   
})(); 