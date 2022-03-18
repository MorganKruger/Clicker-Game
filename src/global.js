const $ = (q)=> document.querySelector(q);
const $all = (q)=> document.querySelectorAll(q);

const floorRound = (num, place)=>{
  const pow = (Math.pow(10, place));
  return Math.floor(num * pow) / pow;
}
const num_shorts = ['', 'K', 'M', 'B', 'T', 'Qa', 'Qi', 'Sx', 'Sp', 'O', 'N', 'D', 'UD', 'DD', 'TD', 'QuD', 'QiD', 'SxD', 'SpD', 'OD', 'ND', 'Vt', 'UVt', 'DVt', 'TVt', 'QaVt', 'QiVt', 'SxVt', 'SpVt', 'OVt', 'NVt', 'Tt', 'UTt', 'DTt', 'TTt', 'QaTt', 'QiTt', 'SxTt', 'SpTt', 'OTt', 'NTt', 'Qat', 'UQat', 'DQat', 'TQat', 'QaQat', 'QiQat', 'SxQat', 'SpQat', 'OQat', 'NQat', 'Qit', 'UQit', 'DQit', 'TQit', 'QaQit', 'QiQit', 'SxQit', 'SpQit', 'OQit', 'NQit', 'Sxt', 'USxt', 'DSxt', 'TSxt', 'QaSxt', 'QiSxt', 'SxSxt', 'SpSxt', 'OSxt', 'NSxt', 'Spt', 'USpt', 'DSpt', 'TSpt', 'QaSpt', 'QiSpt', 'SxSpt', 'SpSpt', 'OSpt', 'NSpt', 'Ot', 'UOt', 'DOt', 'TOt', 'QaOt', 'QiOt', 'SxOt', 'SpOt', 'OOt', 'NOt', 'Nt', 'UNt', 'DNt', 'TNt', 'QaNt', 'QiNt', 'SxNt', 'SpNt', 'ONt', 'NNt', '']; 
const formatNum = (num, i=0, past_thresh=false)=>{
    const div = num / 1000;
    const thresh = (i >= num_shorts.length);
    if (div < 1 || thresh) { 
      if (thresh) return (floorRound(num, 2) + num_shorts[num_shorts.length-1]);
      else return (i == 0) ? (num.toFixed(0) + num_shorts[i]) : (floorRound(num, 2) + num_shorts[i]);
    }
    return formatNum(div, i+1, thresh);
}

let closeAllMenus = ()=>{
}

class Reactive {
  constructor(val) {
      this.$ = val;
      /** @type Function[] */
      this.subs = [];
  }
  set(val) {
      this.$ = val;
      this.react();
  }
  update(func) {
      this.$ = func(this.$);
      this.react();
  }
  sub(func) {
      func(this.$);
      this.subs.push(func);
      return ()=>{
          this.subs.splice(this.subs.indexOf(func), 1);
      }
  }
  react() {
      for (let i = 0; i < this.subs.length; i++) {
          const func = this.subs[i];
          func(this.$);
      }
  }
}