const gid = (id)=> document.getElementById(id);

let points = 0;
let gain = 1;
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
  if (points < mainUpAmtCost) return; 
  points -= mainUpAmtCost;
  gain += mainUpAmt;
  mainUpAmtCost = Math.round(mainUpAmtCost * 1.1);
  updateText();
}

const gainPoints = () => {
  points += gain;
  clicks ++;
  updateText();
}

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
  gid("interest-btn").innerText = ("Unlock The Bank \r\n (+0.5% Points/Second) \r\n [-100000 Points]") // the \r\n things start new lines 
  gid("show-prestige-shop").style.display = ("grid");
  gid("prestige-shop").style.display = ("grid")
  updateText();
}

const compoundInterest = () => {
  points += Math.round(points * interest);
  updateText();
}

const num_shorts = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qu'];
const format_num = (num, i=0, past_thresh=false)=>{
    const div = num / 1000;
    const thresh = (i >= num_shorts.length);
    if (div < 1 || thresh) { 
      // return (thresh) ? (num.toFixed(1) + num_shorts[num_shorts.length-1]) : (num.toFixed(1) + num_shorts[i]);
      if (thresh) return (num.toFixed(1) + num_shorts[num_shorts.length-1]);
      else {
        return (i == 0) ? (num.toFixed(0) + num_shorts[i]) : (num.toFixed(1) + num_shorts[i]);
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