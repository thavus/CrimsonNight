//=============================================================================
// Sean's Menu Overwrite
// by Sean / Thavus / Roundpitt
// Date: 4/26/2018
 
//=============================================================================
  
 
/*:
 * @plugindesc Overwrites the existing menus   
 * @author Sean Patnode  
 */

(function() {
  var parameters = PluginManager.parameters('SeanBattleOverwrite');
   
  
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

  // Scene_Map.prototype.start = (function() {
  //   var cached_function = Scene_Map.prototype.start;

  //   return function() {
  //       // your code

  //       var result = cached_function.apply(this, arguments); // use .apply() to call it

  //       if(typeof timeInterval === 'undefined' || timeInterval === null){
  //         startTime();
  //       }

  //       return result;
  //   };
  // })();


Game_Troop.prototype.setup = function(troopId) {
    var clientWidth = Window_Base.width;
    var clientHeight = Window_Base.height;
    this.clear();
    this._troopId = troopId;
    this._enemies = [];
    this.troop().members.forEach(function(member) {
        if ($dataEnemies[member.enemyId]) {
            var enemyId = member.enemyId;
            var x = member.x;
            var y = member.y;
            var enemy = new Game_Enemy(enemyId, x, y);
            if (member.hidden) {
                enemy.hide();
            } else {

            }
            this._enemies.push(enemy);
        }
    }, this);
    this.makeUniqueNames();
};

   
})(); 