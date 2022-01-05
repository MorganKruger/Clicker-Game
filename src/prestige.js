const buyStartingPoints = () => {
  if (startingPointsMaxed || prestigePoints < buyStartingPointsCost || !prestigeShopOpen || ttlPrestiges < 1) return;
  startingPointsLvl += 1;
  prestigePoints -= buyStartingPointsCost;
  startingPoints = 500 * 2 ** startingPointsLvl; // scales 1k, 2k, 4k, etc.
  buyStartingPointsCost += 1;
  if (startingPointsLvl >= 8) {
    startingPointsMaxed = true;
    gid("unlock-starting-points").style.backgroundColor = "gold";
    gid("unlock-starting-points").style.color = "green";
  } 
  textUpdate("unlock-starting-points", "prestige-points");
}

const buyCrit = () => {
  if (supCritUnlocked || prestigePoints < buyCritCost || !prestigeShopOpen || ttlPrestiges < 1) return;
  if (critUnlocked) {
      supCritUnlocked = true;
      prestigePoints -= buyCritCost;
      gid("unlock-crit").style.backgroundColor = "gold";
      gid("unlock-crit").style.color = "green";
      textUpdate("unlock-crit", "prestige-points")
      return;
    }
  prestigePoints -= buyCritCost;
  critUnlocked = true;
  buyCritCost += 4; // this next used to buy supCrit
  textUpdate("unlock-crit", "prestige-points")
}

const buyDoub = () => {
  if (quadUnlocked || prestigePoints < buyDoubCost || !prestigeShopOpen || ttlPrestiges < 1) return;
  if (doubUnlocked) {
    quadUnlocked = true;
    prestigePoints -= buyDoubCost;
    gid("unlock-double").style.backgroundColor = "gold";
    gid("unlock-double").style.color = "green";
    textUpdate("unlock-double", "prestige-points");
    return;
  }
  prestigePoints -= buyDoubCost;
  doubUnlocked = true;
  buyDoubCost += 2; //this is next used to buy quad.
  textUpdate("unlock-double", "prestige-points");
}

const buyCostReduce = () => {
  if (costReduceMaxed || prestigePoints < buyCostReduceCost || !prestigeShopOpen || ttlPrestiges < 1) return;
  costReduceLvl += 1;
  prestigePoints -= buyCostReduceCost;
  costReduceRate = .95 ** costReduceLvl;  
  if (costReduceLvl >= 10) {
    costReduceMaxed = true;
    gid("unlock-cost-reduce").style.backgroundColor = "gold";
    gid("unlock-cost-reduce").style.color = "green";
  }
  textUpdate("unlock-cost-reduce", "prestige-points");
}

const buyMorePrestigePoints = () => {
  if (morePrestigePointsMaxed || prestigePoints < buyMorePrestigePointsCost || !prestigeShopOpen || ttlPrestiges < 1) return;
  morePrestigePointsLvl += 1;
  prestigePoints -= buyMorePrestigePointsCost;
  prestigePointsGain += 1;
  if (morePrestigePointsLvl >= 15) {
    morePrestigePointsMaxed = true;
    gid("unlock-more-prestige-points").style.backgroundColor = "gold";
    gid("unlock-more-prestige-points").style.color = "green";
  }
  textUpdate("unlock-more-prestige-points", "prestige-points");
}

const buyThemeDouble = () => {
  if (themeDoubleUnlocked || prestigePoints < buyThemeDoubleCost || !prestigeShopOpen || ttlPrestiges < 1) return;
  gid("unlock-theme-double").style.backgroundColor = "gold";
  gid("unlock-theme-double").style.color = "green";
  prestigePoints -= buyThemeDoubleCost;
  themeDoubleUnlocked = true;
  textUpdate("unlock-theme-double", "prestige-points");
}

const buyTertiaryUpgrade = () => {
  if (tertiaryUpgradeMaxed || prestigePoints < buyTertiaryUpgradeCost || !prestigeShopOpen || ttlPrestiges < 1) return;
  tertiaryUpgradeLvl += 1;
  prestigePoints -= buyTertiaryUpgradeCost;
  buyTertiaryUpgradeCost += 1;
  secondaryUpAmt *= 2;
  if (tertiaryUpgradeLvl >= 7) {
    tertiaryUpgradeMaxed = true;
    gid("unlock-tertiary-upgrade").style.backgroundColor = "gold";
    gid("unlock-tertiary-upgrade").style.color = "green";
  }
  textUpdate("unlock-tertiary-upgrade", "prestige-points", "secondary-upgrade");
}

const prestige = () => {
  if (points < prestigeCost) return;
  // are you sure? This will reset your score and non-permemant upgrades
  if (time <= fastestPrestige) fastestPrestige = time;
  points = 0;
  gain = 1;
  mainUpAmt = 1;
  mainUpAmtCost = 10;
  secondaryUpAmt = 2 + 2 * tertiaryUpgradeLvl; // 2 * that one prestige upgrade's level
  secondaryUpAmtCost = 250;
  time = 0;
  interestUnlocked = false;
  interest = 0;
  upgradeInterestCost = 250000;
  clicks = 0;
  ttlPrestiges += 1;
  prestigePoints += prestigePointsGain;
  prestigeCost += Math.ceil(prestigeCost * costReduceRate);
  points += startingPoints;
  textUpdate("prestige-points", "interest-btn", "main-click", "upgrade-main", "secondary-upgrade", "interest-rate-stat", "points", "interest-btn", "ttl-prestige-stat", "fastest-prestige-stat", "prestige-btn");
  gid("show-prestige-shop").style.display = ("grid");
  gid("prestige-shop").style.display = ("grid");
  gid("show-themes").style.display = ("grid");
  gid("themes").style.display = ("block");
}

const tool_tips = [
  "Information: restart after each prestige with points to spend\r\n\r\nEquation: starting points = 500 * 2 ^ level of completion\r\n\r\n*prestige upgrades remain even after prestige*",
  "Information: each click rolls for a chance to critical click. Successful critical clicks will then roll for super critical if it is unlocked\r\n\r\nCritical Equation: 1/5 chance to recieve X2 points from a click\r\n\r\nSuper Critical Equation: 1/4 chance to recieve X10 points from a click\r\n\r\n*click effects stack*",
  "Information: each click rolls for a chance to double click. Successful double clicks will then roll for a quad click if it is unlocked\r\n\r\nDouble Equation: 1/3 chance to recieve X2 points from a click\r\n\r\nQuadruple Equation: 1/3 chance to recieve X2 points from a click\r\n\r\n*click effects stack*",
  "Information: reduce the amount that costs increase for regular upgrades(including prestige and interest)\r\n\r\nEquation: new cost = original cost * original cost increase * (0.95 ^ level of completion)\r\n\r\n*peaks at about 40% reduction*",
  "Information: receive more super points from each prestige\r\n\r\nEquation: super points gain = 5 + level of completion\r\n\r\n*this upgrade's cost doesn't increase*",
  "Information: double the amount that the secondary upgrade improves the primary upgrade\r\n\r\nEquation: secondary upgrade gain(new) = secondary upgrade gain(old) * 2\r\n\r\n*this is overpowered*",
  "No information",
  "No information",
  "No information",
  "Information: receive 2 items from theme boxes instead of 1\r\n\r\nEquation: N/A\r\n\r\n*you may receive duplicates*",
  "No information",
  "No information",
];

const prest_tip_txt = document.querySelector("#description-box p");
const set_hover_tip = (i)=>{
  if (i < 0) {
    prest_tip_txt.innerText = "Hover over a shop item for more details here.";
    return;
  }
  let txt = tool_tips[i];
  if (txt == undefined) txt = "No information.";
  prest_tip_txt.innerText = txt;
}

(()=>{
  const prest_btns = document.querySelectorAll("#prestige-shop .btn");
  for (let i = 0; i < prest_btns.length; i++) {
    const btn = prest_btns[i];
    btn.onmouseenter = ()=>{
      set_hover_tip(i);
    }
    btn.onmouseleave = ()=>{
      set_hover_tip(-1);
    }
  }
})();