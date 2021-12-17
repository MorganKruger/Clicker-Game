const gid = (id)=> document.getElementById(id);

let points = 50000000;
let gain = 1;
let tempGain = 1;
let buyStartingPointsCost = 2;
let buyCritCost = 3;
let buySupCritCost = 8;
let buyDoubCost = 12;
let critUnlocked = false;
let supCritUnlocked = false;
let doubUnlocked = false;
let startingPointsUnlocked = false;
let startingPoints = 100;
let mainUpAmt = 1;
let mainUpAmtCost = 10;
let upgradeUpAmt = 2;
let upgradeUpAmtCost = 1000;
let time = 0;
let interestUnlocked = false;
let interest = .0;
let upgradeInterestCost = 500000;
let clicks = 0;
let shopOpen = false;
let statsOpen = false;
let prestigePoints = 25;

const interestUnlockCost = 100000;
const prestigeCost = 50000000; //50 mil

setInterval(() => {
  time += 1;
  gid("clock").innerText = ("Seconds: " + time);
  gid("cps").innerText = ("Clicks/Second: " + clicks);
  clicks = 0;
  if (interestUnlocked == true) {
    compoundInterest(); 
  }
}, 1000);

const upgradeMain = () => {
  if (points < mainUpAmtCost) { return }
  points -= mainUpAmtCost;
  gain += mainUpAmt;
  mainUpAmtCost = Math.round(mainUpAmtCost * 1.1);
  updateText();
}

const gainPoints = () => {
  clicks ++;
  tempGain = gain;
  ///////CLICK MODIFIERS\\\\\\\
  if (critUnlocked == true){
    if (critClick() == true) { 
      tempGain *= 2
      if (supCritUnlocked == true) {
        if (supCritClick() == true) { tempGain *= 10 }
      }
    }
  }
  if (doubUnlocked == true) {
    if (doubClick() == true) { tempGain *= 2 }
  }
  points += tempGain;
  tempGain = gain;
  console.log(tempGain)
  updateText();
}

const critClick = () => (Math.round(Math.random()*5) == 5) ? true : false; //1:5 chance

const supCritClick = () => (Math.ceil(Math.random()*4) == 4) ? true : false; //1:4 chance

const doubClick = () => (Math.ceil(Math.random()*3) == 3) ? true : false; //1:3 chance

const upgradeUpgrade = () => {
  if (points < upgradeUpAmtCost) { return }
  points -= upgradeUpAmtCost;
  mainUpAmt += upgradeUpAmt;
  upgradeUpAmtCost = Math.round(upgradeUpAmtCost * 1.05);
  updateText();
}

const interestBtnClick = () => {
  if (points < interestUnlockCost) { return }
  if (interestUnlocked == false) {
    points -= interestUnlockCost;
    interest = .005;
    interestUnlocked = true;
    updateText();
    return
  }
  if (points < upgradeInterestCost) { return } //they already bought the bank so UPGRADE INTEREST
  points -= upgradeInterestCost;
  upgradeInterestCost += Math.round(upgradeInterestCost * .25);
  interest = Math.round((interest + .001)*1000)/1000;
  updateText();
}

const toggleStats = () => {
  if (statsOpen == true) {
    gid("show-stats").style.backgroundColor = ("green")
    gid("stats").style.transform = ("translate(-50%,-200%)")
    // gid("stats").style.display = ("none");
    statsOpen = false
  }
  else{
    if (shopOpen == true) { togglePrestigeShop() } //close shop before opening stats
    gid("show-stats").style.backgroundColor = ("rgb(235, 101, 92)")
    gid("stats").style.transform = ("translate(-50%,-50%)")
    // gid("stats").style.display = ("grid");
    statsOpen = true
  }
}

const togglePrestigeShop = () => {
  if (shopOpen == true) {
    gid("show-prestige-shop").style.backgroundColor = ("green")
    gid("prestige-shop").style.transform = ("translate(-200%,-50%)")
    shopOpen = false
  }
  else{
    if (statsOpen == true) { toggleStats() } //close stats before opening shop
    gid("show-prestige-shop").style.backgroundColor = ("rgb(235, 101, 92)")
    gid("prestige-shop").style.transform = ("translate(-50%,-50%)")
    // gid("prestige-shop").style.display = ("grid");
    shopOpen = true
  }
}

const buyStartingPoints = () => {
  if (startingPointsUnlocked == true) { return }
  if (prestigePoints < buyStartingPointsCost) { return }
  prestigePoints -= buyStartingPointsCost;
  startingPointsUnlocked = true;
  startingPoints *= 10;
  gid("unlock-starting-points").innerText = ("Starting Points Unlocked");
  gid("prestige-points").innerText = ("Super Points: " + prestigePoints);
}

const buyCrit = () => {
 if (critUnlocked == true) { return }
  if (prestigePoints < buyCritCost) { return }
  prestigePoints -= buyCritCost;
  critUnlocked = true;
  gid("unlock-crit").innerText = ("Critical Clicks Unlocked");
  gid("prestige-points").innerText = ("Super Points: " + prestigePoints);
}

const buySupCrit = () => {
  if (supCritUnlocked == true) { return }
  if (prestigePoints < buySupCritCost) { return }
  prestigePoints -= buySupCritCost;
  supCritUnlocked = true;
  gid("unlock-super-crit").innerText = ("Super Critical Clicks Unlocked");
  gid("prestige-points").innerText = ("Super Points: " + prestigePoints);
}

const buyDoub = () => {
  if (doubUnlocked == true) { return }
  if (prestigePoints < buyDoubCost) { return }
  prestigePoints -= buyDoubCost;
  doubUnlocked = true;
  gid("unlock-double").innerText = ("Double Clicks Unlocked");
  gid("prestige-points").innerText = ("Super Points: " + prestigePoints);
}


const prestige = () => {
  if (points < prestigeCost) { return }
  // are you sure? This will reset all of your stats(besides prestige points and theme bonuses)
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
  prestigePoints += 5;
  if (startingPointsUnlocked == true) {
    points += startingPoints;
  }
  gid("prestige-points").innerText = ("Super Points: " + prestigePoints);
  gid("interest-btn").innerText = ("Unlock The Bank \r\n (+0.5% Points/Second) \r\n [-100000 Points]"); // the \r\n things start new lines 
  gid("show-prestige-shop").style.display = ("grid");
  gid("prestige-shop").style.display = ("grid");
  updateText();
}

const compoundInterest = () => {
  points += Math.round(points * interest);
  updateText();
}

const num_shorts = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'O', 'N', 'D', 'UD', 'DD', 'TD', 'QuD', 'QiD', 'SxD', 'SpD', 'OD', 'ND', 'V', 'UV', 'DV', 'TV', 'QaV', 'QiV', 'SxV', 'SpV', 'OV', 'NV', 'T', 'UT', 'DT', 'TT', 'QaT', 'QiT', 'SxT', 'SpT', 'OT', 'NT',];
const format_num = (num, i=0, past_thresh=false)=>{
    const div = num / 1000;
    const thresh = (i >= num_shorts.length);
    if (div < 1 || thresh) { 
      // return (thresh) ? (num.toFixed(1) + num_shorts[num_shorts.length-1]) : (num.toFixed(1) + num_shorts[i]);
      if (thresh) return (num.toFixed(2) + num_shorts[num_shorts.length-1]);
      else {
        return (i == 0) ? (num.toFixed(0) + num_shorts[i]) : (num.toFixed(2) + num_shorts[i]);
      }
    }
    return format_num(div, i+1, thresh);
}

const updateText = () => {
  gid("points").innerText           = ("Points: " + format_num(points));
  gid("main-click").innerText       = ("Click This: +" + gain);
  gid("upgrade-main").innerText     = ("+" + mainUpAmt + "/Click [-" + mainUpAmtCost + " Points]");
  gid("upgrade-upgrade").innerText  = ("+2/Upgrade [-" + upgradeUpAmtCost + " Points]");
  gid("interest-lbl").innerText     = ("Interest: +" + (interest * 100).toFixed(1) + "%");
  if (interestUnlocked == true) gid("interest-btn").innerText   = ("Upgrade Interest(+0.1%/Second) [-" + upgradeInterestCost + " Points]");
  
}