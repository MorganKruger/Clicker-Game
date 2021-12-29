const toggleSettings = () => {
  if (settingsOpen) {
    gid("show-settings").style.backgroundColor = ("green");
    gid("settings").style.transform = ("translate(200%,-50%)");
    hoverMenuOn = true;
    settingsOpen = false;
  }
  else {
    closeGuis();
    gid("show-settings").style.backgroundColor = ("rgb(235, 101, 92)");
    gid("settings").style.transform = ("translate(-50%,-50%)");
    hoverMenuOn = false;
    settingsOpen = true;
  }
  toggleHoverMenu();
  popSound();
}

const toggleStats = () => {
  if (statsOpen) {
    gid("show-stats").style.backgroundColor = ("green");
    gid("stats").style.transform = ("translate(-50%,-200%)");
    hoverMenuOn = true;
    statsOpen = false;
  }
  else { // They are opening it
    closeGuis();
    gid("show-stats").style.backgroundColor = ("rgb(235, 101, 92)");
    gid("stats").style.transform = ("translate(-50%,-50%)");
    hoverMenuOn = false;
    statsOpen = true;
  }
  toggleHoverMenu();
  popSound();
}

const togglePrestigeShop = () => {
  if (ttlPrestiges < 1) { return };
  if (prestigeShopOpen) {
    gid("show-prestige-shop").style.backgroundColor = ("green");
    gid("prestige-shop").style.transform = ("translate(-200%,-50%)");
    gid("prestige-shop-info").style.transform = ("translate(110%, -50%)")
    hoverMenuOn = true;
    prestigeShopOpen = false;
  }
  else {
    closeGuis();
    gid("show-prestige-shop").style.backgroundColor = ("rgb(235, 101, 92)");
    gid("prestige-shop").style.transform = ("translate(-50%,-50%)");
    gid("prestige-shop-info").style.transform = ("translate(0%, -50%)");
    hoverMenuOn = false;
    prestigeShopOpen = true;
  }
  toggleHoverMenu();
  popSound();
}

const toggleThemes = () => {
  if (ttlPrestiges < 1) { return };
  if (themesOpen) {
    gid("show-themes").style.backgroundColor = ("green");
    gid("themes").style.transform = ("translate(-50%, 200%)");
    hoverMenuOn = true;
    themesOpen = false;
  }
  else {
    closeGuis();
    gid("show-themes").style.backgroundColor = ("rgb(235, 101, 92)");
    gid("themes").style.transform = ("translate(-50%,-50%)");
    hoverMenuOn = false;
    themesOpen = true;
  }
  toggleHoverMenu();
  popSound();
}

const closeGuis = () => {
  if (statsOpen) toggleStats();
  if (prestigeShopOpen) togglePrestigeShop();
  if (settingsOpen) toggleSettings();
  if (themesOpen) toggleThemes();
}

const toggleHoverMenu = () => {
  if (hoverMenuOn) {
    gid("upgrade-panel").style.display = ("grid");
    gid("hover-menu-upgrades").style.backgroundColor = ("green");
  }
  else {
    gid("upgrade-panel").style.display = ("none");
    gid("hover-menu-upgrades").style.backgroundColor = ("rgb(65, 90, 65)");
  }
}

Mousetrap.bind('d', function (e) { toggleSettings() });

Mousetrap.bind('a', function (e) { togglePrestigeShop() });

Mousetrap.bind('s', function (e) { toggleThemes() });

Mousetrap.bind('w', function (e) { toggleStats() });

Mousetrap.bind('tab', function (e) { closeGuis() });
Mousetrap.bind('e', function (e) { closeGuis() });
Mousetrap.bind('backspace', function (e) { closeGuis() });
Mousetrap.bind('del', function (e) { closeGuis() });
Mousetrap.bind('esc', function (e) { closeGuis() });

const floor_round = (num, place)=>{
  const pow = (Math.pow(10, place));
  return Math.floor(num * pow) / pow;
}

const num_shorts = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'O', 'N', 'D', 'UD', 'DD', 'TD', 'QuD', 'QiD', 'SxD', 'SpD', 'OD', 'ND', 'Vt', 'UVt', 'DVt', 'TVt', 'QaVt', 'QiVt', 'SxVt', 'SpVt', 'OVt', 'NVt', 'Tt', 'UTt', 'DTt', 'TTt', 'QaTt', 'QiTt', 'SxTt', 'SpTt', 'OTt', 'NTt', 'Qat', 'UQat', 'DQat', 'TQat', 'QaQat', 'QiQat', 'SxQat', 'SpQat', 'OQat', 'NQat', 'Qit', 'UQit', 'DQit', 'TQit', 'QaQit', 'QiQit', 'SxQit', 'SpQit', 'OQit', 'NQit', 'Sxt', 'USxt', 'DSxt', 'TSxt', 'QaSxt', 'QiSxt', 'SxSxt', 'SpSxt', 'OSxt', 'NSxt', 'Spt', 'USpt', 'DSpt', 'TSpt', 'QaSpt', 'QiSpt', 'SxSpt', 'SpSpt', 'OSpt', 'NSpt', 'Ot', 'UOt', 'DOt', 'TOt', 'QaOt', 'QiOt', 'SxOt', 'SpOt', 'OOt', 'NOt', 'Nt', 'UNt', 'DNt', 'TNt', 'QaNt', 'QiNt', 'SxNt', 'SpNt', 'ONt', 'NNt', 'C']; 
const format_num = (num, i=0, past_thresh=false)=>{
    const div = num / 1000;
    const thresh = (i >= num_shorts.length);
    if (div < 1 || thresh) { 
      if (thresh) return (floor_round(num, 2) + num_shorts[num_shorts.length-1]);
      else return (i == 0) ? (num.toFixed(0) + num_shorts[i]) : (floor_round(num, 2) + num_shorts[i]);
    }
    return format_num(div, i+1, thresh);
}

const textUpdate = (...keys) => {
  let run = false;
  if (keys.length <= 0) run = true;
  for (let i = 0; i < keys.length; i++) {
    const k = keys[i];
    if (run || k == "points") gid("points").innerText = ("Points: " + format_num(points));
    else if (run || k == "main-click") gid("main-click").innerText = ("Click This: +" + format_num(gain) + " Points");
    else if (run || k == "upgrade-main") gid("upgrade-main").innerText = ("+" + mainUpAmt + " Points Per Click\r\n[" + format_num(mainUpAmtCost) + " Points]");
    else if (run || k == "secondary-upgrade") gid("secondary-upgrade").innerText = ("+" + secondaryUpAmt + " Points Per Click Per Upgrade\r\n[" + format_num(secondaryUpAmtCost) + " Points]");
    else if (run || k == "interest-rate-stat") gid("interest-rate-stat").innerText = ("Interest Rate: +" + (interest * 100).toFixed(1) + "%");
    else if (run || k == "interest-btn" && interestUnlocked) gid("interest-btn").innerText = ("Upgrade Interest\r\n(+0.1%/Second)\r\n[" + format_num(upgradeInterestCost) + " Points]"); //don't mess up the order of these 2 interest-btn things
    else if (run || k == "interest-btn") gid("interest-btn").innerText = ("Unlock Interest\r\n(+0.5% Points/Second)\r\n[100K Points]"); // the \r\n things start new lines 
    else if (run || k == "prestige-points") gid("prestige-points").innerText = ("Super Points: " + prestigePoints);
    else if (run || k == "clock") gid("clock").innerText = ("Seconds: " + time);
    else if (run || k == "cps") gid("cps").innerText = ("Clicks/Second: " + clicks);
    else if (run || k == "prestige-btn") gid("prestige-btn").innerText = ("Prestige: [" + format_num(prestigeCost) + " Points]");

    else if (run || k == "unlock-starting-points" && startingPointsMaxed) gid("unlock-starting-points").innerText = ("Starting Points Maximized\r\n[" + startingPointsLvl + "/8 Complete]");
    else if (run || k == "unlock-starting-points") gid("unlock-starting-points").innerText = ("Double Starting Points\r\n[" + startingPointsLvl + "/8 Complete]\r\n[" + buyStartingPointsCost + " Super Points]");
    else if (run || k == "unlock-crit" && supCritUnlocked) gid("unlock-crit").innerText = ("Super Critcal Clicks Maximized\r\n[2/2 Complete]");
    else if (run || k == "unlock-crit") gid("unlock-crit").innerText = ("Unlock Super Critical Clicks\r\n[1/2 Complete]\r\n[" + buyCritCost + " Super Points]");
    else if (run || k == "unlock-double" && quadUnlocked) gid("unlock-double").innerText = ("Quadruple Clicks Maximized\r\n[2/2 Complete]"); //they just got quad
    else if (run || k == "unlock-double") gid("unlock-double").innerText = ("Unlock Quadruple Clicks\r\n[1/2 Complete]\r\n[" + buyDoubCost + " Super Points]"); // they just got doub
    else if (run || k == "unlock-theme-double") gid("unlock-theme-double").innerText = ("Theme Double Maximized\r\n[1/1 Complete]");
    else if (run || k == "unlock-cost-reduce" && costReduceMaxed) gid("unlock-cost-reduce").innerText = ("Cost Reduction Maximized\r\n[" + costReduceLvl + "/10 Complete]");
    else if (run || k == "unlock-cost-reduce") gid("unlock-cost-reduce").innerText = ("Upgrade Cost Reduction\r\n[" + costReduceLvl + "/10 Complete]\r\n[" + buyCostReduceCost + " Super Points]");   
    else if (run || k == "unlock-more-prestige-points" && morePrestigePointsMaxed) gid("unlock-more-prestige-points").innerText = ("More Super Points Maximized\r\n[" + morePrestigePointsLvl + "/15 Complete]");
    else if (run || k == "unlock-more-prestige-points") gid("unlock-more-prestige-points").innerText = ("Upgrade More Super Points\r\n[" + morePrestigePointsLvl + "/15 Complete]\r\n[" + buyMorePrestigePointsCost + " Super Points]");
    else if (run || k == "unlock-tertiary-upgrade" && tertiaryUpgradeMaxed) gid("unlock-tertiary-upgrade").innerText = ("Tertiary Upgrade Maximized\r\n[" + tertiaryUpgradeLvl + "/7 Complete]");
    else if (run || k == "unlock-tertiary-upgrade") gid("unlock-tertiary-upgrade").innerText = ("Purchase Tertiary Upgrade\r\n[" + tertiaryUpgradeLvl + "/7 Complete]\r\n[" + buyTertiaryUpgradeCost + " Super Points]");

    else if (run || k == "ttl-prestige-stat") gid("ttl-prestige-stat").innerText = ("Total Prestiges: " + format_num(ttlPrestiges));
    else if (run || k == "fastest-prestige-stat") gid("fastest-prestige-stat").innerText = ("Fastest Prestige: " + fastestPrestige + " Seconds");
    else if (run || k == "ttl-time-stat") gid("ttl-time-stat").innerText = ("Total Time: " + ttlTime + " Seconds");
    else if (run || k == "highest-cps-stat") gid("highest-cps-stat").innerText = ("Highest Clicks/Second: " + highestCps);
    else if (run || k == "highest-single-click-points-stat") gid("highest-single-click-points-stat").innerText = ("Highest Points In One Click: " + format_num(highestTempGain) + " Points");
    else if (run || k == "highest-points-stat") gid("highest-points-stat").innerText = ("Highest Points: " + format_num(highestPoints) + " Points");
  }
}

document.body.onclick = function(e) {
  if (e.target !== this) return;
  closeGuis();
}