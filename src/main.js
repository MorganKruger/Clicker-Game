const gid = (id)=> document.getElementById(id);

let points = 50000000; // 0
let gain = 1;
let tempGain = 1;
let highestTempGain = 0;
let highestPoints = 0;
let buyStartingPointsCost = 2;
let buyCritCost = 3;
let buyDoubCost = 12;
let buyCostReduceCost = 13;
let buyThemeDoubleCost = 20;
let buyMorePrestigePointsCost = 5;
let critUnlocked = false;
let supCritUnlocked = false;
let doubUnlocked = false;
let quadUnlocked = false;
let startingPointsMaxed = false;
let themeDoubleUnlocked = false; 
let costReduceMaxed = false;
let morePrestigePointsMaxed = false;
let startingPointsLvl = 0;
let morePrestigePointsLvl = 0;
let costReduceLvl = 0;
let startingPoints = 0;
let mainUpAmt = 1;
let mainUpAmtCost = 10;
let upgradeUpAmt = 2;
let upgradeUpAmtCost = 1000;
let time = 0;
let ttlTime = 0;
let interestUnlocked = false;
let interest = .0;
let upgradeInterestCost = 500000;
let clicks = 0;
let highestCps = 0;
let shopOpen = false;
let statsOpen = false;
let ttlPrestiges = 0;
let fastestPrestige = 999999999999; //this is like 4000 years of seconds
let prestigePoints = 550; // 0
let prestigePointsGain = 5;
let costReduceRate = 1;
let prestigeCost = 50000000; //50 mil

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

const upgradeUpgrade = () => {
  if (points < upgradeUpAmtCost) return;
  points -= upgradeUpAmtCost;
  mainUpAmt += upgradeUpAmt;
  upgradeUpAmtCost = Math.round(upgradeUpAmtCost * (1 + .05 * costReduceRate));
  textUpdate("upgrade-main", "upgrade-upgrade", "points");
}

const interestBtnClick = () => {
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

const toggleStats = () => {
  if (statsOpen) {
    gid("show-stats").style.backgroundColor = ("green");
    gid("stats").style.transform = ("translate(-50%,-200%)");
    // gid("stats").style.display = ("none");
    statsOpen = false;
  }
  else{
    if (shopOpen) togglePrestigeShop(); // close shop before opening stats
    gid("show-stats").style.backgroundColor = ("rgb(235, 101, 92)");
    gid("stats").style.transform = ("translate(-50%,-50%)");
    // gid("stats").style.display = ("grid");
    statsOpen = true;
  }
}

const togglePrestigeShop = () => {
  if (shopOpen) {
    gid("show-prestige-shop").style.backgroundColor = ("green");
    gid("prestige-shop").style.transform = ("translate(-200%,-50%)");
    gid("prestige-shop-info").style.transform = ("translate(110%, 0%)")
    shopOpen = false;
  }
  else {
    if (statsOpen) toggleStats(); //close stats before opening shop
    gid("show-prestige-shop").style.backgroundColor = ("rgb(235, 101, 92)");
    gid("prestige-shop").style.transform = ("translate(-50%,-50%)");
    gid("prestige-shop-info").style.transform = ("translate(0%, 0%)");
    shopOpen = true;
  }
}

const buyStartingPoints = () => {
  if (startingPointsMaxed || prestigePoints < buyStartingPointsCost || !shopOpen) return;
  startingPointsLvl += 1;
  prestigePoints -= buyStartingPointsCost;
  startingPoints = 500 * 2 ** startingPointsLvl; // scales 1k, 2k, 4k, etc.
  buyStartingPointsCost += 2;
  if (startingPointsLvl >= 8) {
    startingPointsMaxed = true;
    gid("unlock-starting-points").style.backgroundColor = "gold";
    gid("unlock-starting-points").style.color = "green";
  } 
  textUpdate("unlock-starting-points", "prestige-points");
}

const buyCrit = () => {
  if (supCritUnlocked || prestigePoints < buyCritCost || !shopOpen) return;
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
  buyCritCost += 5; // this next used to buy supCrit
  textUpdate("unlock-crit", "prestige-points")
}

const buyDoub = () => {
  if (quadUnlocked || prestigePoints < buyDoubCost || !shopOpen) return;
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
  buyDoubCost += 10; //this is next used to buy quad.
  textUpdate("unlock-double", "prestige-points");
}

const buyCostReduce = () => {
  if (costReduceMaxed || prestigePoints < buyCostReduceCost || !shopOpen) return;
  costReduceLvl += 1;
  prestigePoints -= buyCostReduceCost;
  costReduceRate = .95 ** costReduceLvl;  
  buyCostReduceCost += 2;
  if (costReduceLvl >= 10) {
    costReduceMaxed = true;
    gid("unlock-cost-reduce").style.backgroundColor = "gold";
    gid("unlock-cost-reduce").style.color = "green";
  }
  textUpdate("unlock-cost-reduce", "prestige-points");
}

const buyMorePrestigePoints = () => {
  if (morePrestigePointsMaxed || prestigePoints < buyMorePrestigePointsCost || !shopOpen) return;
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
  if (themeDoubleUnlocked || prestigePoints < buyThemeDoubleCost || !shopOpen) return;
  gid("unlock-theme-double").style.backgroundColor = "gold";
  gid("unlock-theme-double").style.color = "green";
  prestigePoints -= buyThemeDoubleCost;
  themeDoubleUnlocked = true;
  textUpdate("unlock-theme-double", "prestige-points");
}
// \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\///////////////////////////////////
const prestige = () => {
  if (points < prestigeCost) return;
  // are you sure? This will reset your score and non-permemant upgrades
  if (time <= fastestPrestige) fastestPrestige = time;
  points = 0;
  gain = 1;
  mainUpAmt = 1;
  mainUpAmtCost = 10;
  upgradeUpAmt = 2;
  upgradeUpAmtCost = 1000;
  time = 0;
  interestUnlocked = false;
  interest = 0;
  upgradeInterestCost = 500000;
  clicks = 0;
  ttlPrestiges += 1;
  prestigePoints += prestigePointsGain;
  prestigeCost += Math.ceil(prestigeCost * costReduceRate);
  points += startingPoints;
  textUpdate("prestige-points", "interest-btn", "main-click", "upgrade-main", "upgrade-upgrade", "interest-rate-stat", "points", "interest-btn", "ttl-prestige-stat", "fastest-prestige-stat", "prestige-btn");
  gid("show-prestige-shop").style.display = ("grid");
  gid("prestige-shop").style.display = ("grid");
}

const compoundInterest = () => {
  points += Math.round(points * interest);
  textUpdate("points");
}

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
    else if (run || k == "main-click") gid("main-click").innerText = ("Click This: +" + gain);
    else if (run || k == "upgrade-main") gid("upgrade-main").innerText = ("+" + mainUpAmt + " Points Per Click\r\n[-" + mainUpAmtCost + " Points]");
    else if (run || k == "upgrade-upgrade") gid("upgrade-upgrade").innerText = ("+2 Points Per Click Per Upgrade\r\n[-" + upgradeUpAmtCost + " Points]");
    else if (run || k == "interest-rate-stat") gid("interest-rate-stat").innerText = ("Interest Rate: +" + (interest * 100).toFixed(1) + "%");
    else if (run || k == "interest-btn" && interestUnlocked) gid("interest-btn").innerText = ("Upgrade Interest(+0.1%/Second)\r\n[-" + upgradeInterestCost + " Points]"); //don't mess up the order of these 2 interest-btn things
    else if (run || k == "interest-btn") gid("interest-btn").innerText = ("Unlock The Bank\r\n(+0.5% Points/Second)\r\n[-100000 Points]"); // the \r\n things start new lines 
    else if (run || k == "prestige-points") gid("prestige-points").innerText = ("Super Points: " + prestigePoints);
    else if (run || k == "clock") gid("clock").innerText = ("Seconds: " + time);
    else if (run || k == "cps") gid("cps").innerText = ("Clicks/Second: " + clicks);

    else if (run || k == "unlock-starting-points" && startingPointsMaxed) gid("unlock-starting-points").innerText = ("Starting Points Maximized\r\n[" + startingPointsLvl + "/8 Complete]");
    else if (run || k == "unlock-starting-points") gid("unlock-starting-points").innerText = ("Double Starting Points\r\n[" + startingPointsLvl + "/8 Complete]\r\n[-" + buyStartingPointsCost + " Starting Points]");
    else if (run || k == "unlock-crit" && supCritUnlocked) gid("unlock-crit").innerText = ("Super Critcal Clicks Maximized\r\n[2/2 Complete]");
    else if (run || k == "unlock-crit") gid("unlock-crit").innerText = ("Unlock Super Critical Clicks:\r\n[1/2 Complete]\r\n[-" + buyCritCost + " Super Points]");
    else if (run || k == "unlock-double" && quadUnlocked) gid("unlock-double").innerText = ("Quadruple Clicks Maximized\r\n[2/2 Complete]"); //they just got quad
    else if (run || k == "unlock-double") gid("unlock-double").innerText = ("Unlock Quadruple Clicks:\r\n[1/2 Complete]\r\n[-" + buyDoubCost + " Super Points]"); // they just got doub
    else if (run || k == "unlock-theme-double") gid("unlock-theme-double").innerText = ("Theme Double Maximized\r\n[1/1 Complete]");
    else if (run || k == "unlock-cost-reduce" && costReduceMaxed) gid("unlock-cost-reduce").innerText = ("Cost Reduce Maximized\r\n[" + costReduceLvl + "/10 Complete]");
    else if (run || k == "unlock-cost-reduce") gid("unlock-cost-reduce").innerText = ("Upgrade Cost Reduction:\r\n[" + costReduceLvl + "/10 Complete]\r\n[-" + buyCostReduceCost + " Super Points]");   
    else if (run || k == "unlock-more-prestige-points" && morePrestigePointsMaxed) gid("unlock-more-prestige-points").innerText = ("More Super Points Maximized\r\n[" + morePrestigePointsLvl + "/15 Complete]");
    else if (run || k == "unlock-more-prestige-points") gid("unlock-more-prestige-points").innerText = ("Upgrade More Super Points:\r\n[" + morePrestigePointsLvl + "/15 Complete]\r\n[-" + buyMorePrestigePointsCost + " Super Points]");

    else if (run || k == "ttl-prestige-stat") gid("ttl-prestige-stat").innerText = ("Total Prestiges: " + ttlPrestiges);
    else if (run || k == "fastest-prestige-stat") gid("fastest-prestige-stat").innerText = ("Fastest Prestige: " + fastestPrestige + " Seconds");
    else if (run || k == "ttl-time-stat") gid("ttl-time-stat").innerText = ("Total Time: " + ttlTime + " Seconds");
    else if (run || k == "highest-cps-stat") gid("highest-cps-stat").innerText = ("Highest Clicks/Second: " + highestCps);
    else if (run || k == "highest-single-click-points-stat") gid("highest-single-click-points-stat").innerText = ("Highest Points In One Click: " + highestTempGain + " Points");
    else if (run || k == "highest-points-stat") gid("highest-points-stat").innerText = ("Highest Points: " + highestPoints + " Points");
    else if (run || k == "prestige-btn") gid("prestige-btn").innerText = ("Prestige: [-" + prestigeCost + " Points]");
  }
}