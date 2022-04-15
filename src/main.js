import primary from "./primary.js";
import prestige from "./prestige.js";
import stats from "./stats.js";
import settings from "./settings.js";
import themes from "./themes.js";

primary.initOnClicks(); // initialize onclick functions

closeAllMenus = (hotkeyed)=> {
  stats.closeMenu(hotkeyed);
  prestige.closeMenu(hotkeyed);
  settings.closeMenu(hotkeyed);
  themes.closeMenu(hotkeyed);
}

if (window.location.hostname === "127.0.0.1") { // DEBUG MODE
  prestige.points.set(1234);
  primary.points.set(123456789);
  primary.$points;
}

window.onbeforeunload = ()=>{
  // console.log(JSON.stringify(load_keys));
  const to_save = {};

           to_save.unlockedThemes = themes.unlockedThemes;
             to_save.currentTheme = themes.currentTheme;
                     to_save.cost = prestige.cost;
         to_save["prestige.gain"] = prestige.gain;
         to_save["prestige.cost"] = prestige.cost;
                 to_save.lastUber = prestige.lastUber;
       to_save["prestige.points"] = prestige.points.$;
           to_save.startingPoints = prestige.startingPoints;
                     to_save.crit = prestige.crit;
                     to_save.doub = prestige.doub;
               to_save.costReduce = prestige.costReduce;
               to_save.morePoints = prestige.morePoints;
              to_save.themeDouble = prestige.themeDouble;
                   to_save.tertUp = prestige.tertUp;
            to_save.uberClickable = prestige.uberClickable;
                to_save.autoClick = prestige.autoClick;
         to_save.moreThemeReturns = prestige.moreThemeReturns;
              to_save.autoUpgrade = prestige.autoUpgrade;
             to_save.autoPrestige = prestige.autoPrestige;

        to_save["primary.points"] = primary.points.$;
          to_save["primary.gain"] = primary.gain;
                   to_save.primUp = primary.primUp;
                 to_save.secondUp = primary.secondUp;
                 to_save.interest = primary.interest;

                to_save.totalTime = stats.totalTime;
               to_save.highestCps = stats.highestCps;
           to_save.totalPrestiges = stats.totalPrestiges;
          to_save.fastestPrestige = stats.fastestPrestige;
            to_save.highestPoints = stats.highestPoints;
    to_save.highestPointsOneClick = stats.highestPointsOneClick;
   to_save.highestPointsUberClick = stats.highestPointsUberClick;
                     to_save.time = stats.time;
                   to_save.clicks = stats.clicks;
  
  localStorage.clickerGame = JSON.stringify(to_save);
  // console.log(localStorage.clickerGame);
}
window.clear_storage = ()=>{
  window.onbeforeunload = null;
  localStorage.clear();
  location.reload();
}


Mousetrap.bind('w', function (e) { stats.toggleMenu(true) });

Mousetrap.bind('a', function (e) { prestige.toggleMenu(true) });

Mousetrap.bind('s', function (e) { themes.toggleMenu(true) });

Mousetrap.bind('d', function (e) { settings.toggleMenu(true) });

Mousetrap.bind('tab', function (e) { closeAllMenus(true) });
Mousetrap.bind('e', function (e) { closeAllMenus(true) });
Mousetrap.bind('backspace', function (e) { closeAllMenus(true) });
Mousetrap.bind('del', function (e) { closeAllMenus(true) });
Mousetrap.bind('esc', function (e) { closeAllMenus(true) });
Mousetrap.bind('i', function (e) { closeAllMenus(true) });
Mousetrap.bind('l', function (e) { closeAllMenus(true) });

document.body.onclick = function(e) {
  // console.log(`x: ${e.x}, y: ${e.y}`);
  e.target == this || e.target.id == "theme-wrapper" 
    && closeAllMenus(true);
}