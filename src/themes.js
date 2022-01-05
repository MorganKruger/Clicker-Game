// window.onload = setTheme();

// let colorScheme = "default";
// let soundEffects = "default";
// let themedText = "default";

// const setTheme = () => {
//   gid("functional-color-sample").style.backgroundColor = (customTheme.colorScheme.functionalColor);
//   gid("display-field-color-sample").style.backgroundColor = (customTheme.colorScheme.displayFieldColor);
//   gid("text1-color-sample").style.backgroundColor = (customTheme.colorScheme.text1Color);
//   gid("text2-color-sample").style.backgroundColor = (customTheme.colorScheme.text2Color);
//   gid("active-color-sample").style.backgroundColor = (customTheme.colorScheme.activeColor);
//   gid("false-color-sample").style.backgroundColor = (customTheme.colorScheme.falseColor);
//   gid("bg-color-sample").style.backgroundColor = (customTheme.colorScheme.bgColor);
//   gid("completed-color-sample").style.backgroundColor = (customTheme.colorScheme.completedColor);

  //then sound effect samples

  //then text sample(new name for score)
// }

customTheme = {
  colorScheme: {
    functionalColor: "",
    displayFieldColor: "", 
    text1Color: "",
    text2Color: "",
    activeColor: "",
    falseColor: "",
    bgColor: "",
    completedColor: ""
  },
  
  soundEffects: {
    clickSound: "",
    menuToggleSound: "",
    purchaseSound: "",
    prestigeSound: "" // Doesn't exist
  },
  
  themedText: {
    scoreName: "",
    up1Name: "",
    up2Name:"",
    up3Name:"",
    interestName:"",
    presName: "",
    mainClickText: "",
    otherStatsText: ""
  }
}

// Colors are listed; functionalColor, displayFieldColor, text1Color, text2Color, activeColor, falseColor, bgColor, and completedColor
// SFX are listed; clickSound, menuToggleSound, purchaseSound, and prestigeSound
// Texts are listed; scoreName, up1Name, up2Name, up3Name, interestName, presName, mainClickTxt, OtherStatsTxt
themes = {
  default: {
    colorScheme: ["","","","","","","",""],
    soundEffects: ["","","",""],
    themedText: [
      "",
      "",
      "",
      "",
      "",
      "",
      "",
      ""
    ]
  }
}