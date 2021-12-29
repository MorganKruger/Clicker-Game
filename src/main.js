const gid = (id)=> document.getElementById(id);

let points = 50000000; // 0
let gain = 1;
let tempGain = 1;
let highestTempGain = 0;
let highestPoints = 0;
let buyStartingPointsCost = 1;
let buyCritCost = 2;
let buyDoubCost = 3;
let buyCostReduceCost = 3;
let buyThemeDoubleCost = 20;
let buyMorePrestigePointsCost = 3;
let buyTertiaryUpgradeCost = 3;
let critUnlocked = false;
let supCritUnlocked = false;
let doubUnlocked = false;
let quadUnlocked = false;
let startingPointsMaxed = false;
let themeDoubleUnlocked = false; 
let costReduceMaxed = false;
let morePrestigePointsMaxed = false;
let tertiaryUpgradeMaxed = false;
let startingPointsLvl = 0;
let morePrestigePointsLvl = 0;
let costReduceLvl = 0;
let tertiaryUpgradeLvl = 0;
let startingPoints = 0;
let mainUpAmt = 1;
let mainUpAmtCost = 10;
let secondaryUpAmtCost = 250;
let secondaryUpAmt = 2;
let time = 0;
let ttlTime = 0;
let interestUnlocked = false;
let interest = .0;
let upgradeInterestCost = 250000;
let clicks = 0;
let highestCps = 0;
let settingsOpen = false;
let prestigeShopOpen = false;
let statsOpen = false;
let themesOpen = false;
let hoverMenuOn = true;
let ttlPrestiges = 0;
let fastestPrestige = 999999999999; //this is like 4000 years of seconds
let prestigePoints = 195; // 0
let prestigePointsGain = 5; //5
let costReduceRate = 1;
let prestigeCost = 50000000; //50 mil
let sfxVolume = 50;
let musicVolume = 50;

const interestUnlockCost = 100000;

setInterval(() => {
  time += 1;
  ttlTime += 1;
  if(clicks > highestCps) highestCps = clicks;
  textUpdate("clock", "cps", "ttl-time-stat", "highest-cps-stat");
  clicks = 0;
  if (interestUnlocked) compoundInterest(); 
}, 1000);

const gainPoints = () => {
  clicks ++;
  tempGain = gain;
  ///////CLICK MODIFIERS\\\\\\\
  if (critUnlocked && critClick()){
    tempGain *= 2;
    if (supCritUnlocked && supCritClick()) tempGain *= 10;
  }
  if (doubUnlocked && doubClick()) {
    tempGain *= 2;
    if (quadUnlocked && quadClick()) tempGain *= 2;
  }
  points += tempGain;
  if (points > highestPoints) highestPoints = points;
  if (tempGain > highestTempGain) highestTempGain = tempGain;
  tempGain = gain;
  textUpdate("points", "highest-single-click-points-stat", "highest-points-stat");
}

const critClick = () => (Math.random() < (1/5)) ? true : false; //1:5 chance

const supCritClick = () => (Math.random() < (1/4)) ? true : false; //1:4 chance

const doubClick = () => (Math.random() < (1/3)) ? true : false; //1:3 chance

const quadClick = () => (Math.random() < (1/3)) ? true : false; //1:3 chance

const upgradeMain = () => {
  if (points < mainUpAmtCost) return;
  points -= mainUpAmtCost;
  gain += mainUpAmt;
  mainUpAmtCost = Math.round(mainUpAmtCost * (1 + .1 * costReduceRate));
  textUpdate("points", "upgrade-main", "main-click");
};

const secondaryUpgrade = () => {
  if (points < secondaryUpAmtCost) return;
  points -= secondaryUpAmtCost;
  mainUpAmt += secondaryUpAmt;
  secondaryUpAmtCost = Math.round(secondaryUpAmtCost * (1 + .05 * costReduceRate));
  textUpdate("upgrade-main", "secondary-upgrade", "points");
}

const upgradeInterest = () => {
  if (points < interestUnlockCost) return;
  if (interestUnlocked == false) {
    points -= interestUnlockCost;
    interest = .005;
    interestUnlocked = true; 
    textUpdate("interest-rate-stat", "interest-btn", "points");
    return;
  }
  if (points < upgradeInterestCost) return; //they already bought the bank so UPGRADE INTEREST
  points -= upgradeInterestCost;
  upgradeInterestCost += Math.round(upgradeInterestCost * (.25 * costReduceRate));
  interest = Math.round((interest + .001)*1000)/1000;
  textUpdate("interest-rate-stat", "interest-btn", "points");
}

const compoundInterest = () => {
  points += Math.round(points * interest);
  if (highestPoints < points) highestPoints = points;
  textUpdate("points","highest-points-stat");
}