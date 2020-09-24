<template>
  <div id="product" @click="screenClick">
    <div id="欢迎加入天外天程序组！"></div>
    <!-- <div id="bg-div"> -->
    <img id="animal" src="./assets/animal.png" />
    <img id="bg" src="./assets/bg.png" />
    <img id="picture" src="./assets/picture1.png" />
    <!-- 背景下部的白色(屏幕高度超过bg图显示范围) -->

    <div id="bg-mask"></div>
    <div id="bg-margin"></div>
    <img id="swing" src="./assets/swing.gif" />
    <img id="computer" src="./assets/computer.png" />
    <img id="door" src="./assets/door2.png" />
    <img id="door-side" src="./assets/door1.png" />
    <img id="door-open" src="./assets/door1.png" />
    <!-- </div> -->

    <!-- <div id="effects-div"> -->
    <img
      id="exclamation"
      @click="exclamationClick"
      src="./assets/exclamation.gif"
    />
    <img id="particle" src="./assets/particle.png" />
    <img id="quest-icon" src="./assets/quest-icon.png" />
    <img id="dialog" src="./assets/dialog.png" />
    <!-- </div> -->

    <img id="boy" src="./assets/boy.png" />

    <div id="quest-text-1">
      <img
        v-for="(char, i) in fonts_1_1"
        :key="i"
        :id="'quest-font' + i"
        :src="fonts_1_1_path_array[i]"
      />
    </div>
    <div id="quest-text-2">
      <img
        v-for="(char, i) in fonts_1_2"
        :key="i"
        :id="'quest-font' + (fonts_1_1_path_array.length + i)"
        :src="fonts_1_2_path_array[i]"
      />
    </div>
    <div id="quest-text-3">
      <img
        v-for="(char, i) in fonts_1_3"
        :key="i"
        :id="
          'quest-font' +
          (fonts_1_1_path_array.length + fonts_1_2_path_array.length + i)
        "
        :src="fonts_1_3_path_array[i]"
      />
    </div>
    <div id="complete-text-1">
      <img
        v-for="(char, i) in fonts_3_1"
        :key="i"
        :id="'complete-font' + i"
        :src="fonts_3_1_path_array[i]"
      />
    </div>
    <div id="complete-text-2">
      <img
        v-for="(char, i) in fonts_3_2"
        :key="i"
        :id="'complete-font' + (fonts_3_1_path_array.length + i)"
        :src="fonts_3_2_path_array[i]"
      />
    </div>

    <div id="dialog-text-1">
      <img
        v-for="(char, i) in fonts_2_1"
        :key="i"
        :id="'dialog-font' + i"
        :src="fonts_2_1_path_array[i]"
      />
    </div>
    <div id="dialog-text-2">
      <img
        v-for="(char, i) in fonts_2_2"
        :key="i"
        :id="'dialog-font' + (fonts_2_1_path_array.length + i)"
        :src="fonts_2_2_path_array[i]"
      />
    </div>
    <div id="dialog-text-3">
      <img
        v-for="(char, i) in fonts_2_3"
        :key="i"
        :id="
          'dialog-font' +
          (fonts_2_1_path_array.length + fonts_2_2_path_array.length + i)
        "
        :src="fonts_2_3_path_array[i]"
      />
    </div>
    <audio id="clockSnd" src="./assets/voice/clock.mp3" preload loop="loop"></audio>
    <audio id="doorSnd" src="./assets/voice/door.mp3" preload></audio>
    <audio id="getSnd" src="./assets/voice/get.mp3" preload></audio>
    <img id="text1" src="./assets/text1.png" />
    <img id="text2" src="./assets/text2.png" />
    <img id="text3" src="./assets/text3.png" />
    <img id="text4" src="./assets/text4.png" />
    <img id="text5" src="./assets/text5.png" />
    <img id="text6" src="./assets/text6.png" />
    <!-- </div> -->
  </div>
</template>

<script>
import $ from "jquery";
import async from "async";
export default {
  name: "product",
  data() {
    return {
      //公的母的
      //boy girl
      sex: "girl",
      loadCount: false,
      waitingExclamationClick: false,
      waitingScreenClick: false,
      currentCb: null,
      fonts_1_1: "任务进度1s4f",
      fonts_1_2: "你需要从产品狸那里获得原型图",
      fonts_1_3: "l点击图中叹号可以进行互动r",
      fonts_1_1_path_array: [],
      fonts_1_2_path_array: [],
      fonts_1_3_path_array: [],
      fonts_2_1: "产品狸m",
      fonts_2_2: "我已经画出最新的产品原型图啦d",
      fonts_2_3: "帮我把他们送给设基犬吧t",
      fonts_2_1_path_array: [],
      fonts_2_2_path_array: [],
      fonts_2_3_path_array: [],
      fonts_3_1: "完成任务啦t",
      fonts_3_2: "点击屏幕去找设基犬j",
      fonts_3_1_path_array: [],
      fonts_3_2_path_array: [],
    };
  },
  methods: {
    exclamationClick: function () {
      if (this.waitingExclamationClick) {
        this.waitingExclamationClick = false;
        this.currentCb();
      }
    },
    screenClick: function () {
      if (this.waitingScreenClick) {
        this.waitingScreenClick = false;
        this.currentCb();
      }
    },
    /**
     * 画面转亮
     * 摆钟以及任务图标动效
     */
    ani_init: function () {
      var that = this;
      $("#bg-mask").attr("class", "mask-open");
      $("#bg-mask").fadeIn(0);
      $("#bg").fadeIn(0);
      $("#bg-margin").fadeIn(0);
      $("#animal").fadeIn(300);
      $("#door").fadeIn(300);
      setTimeout(() => {
        $("#exclamation").fadeIn(500);
      }, 300);
      
      $("#picture").fadeIn(300);
      $("#computer").fadeIn(300);
      $("#particle").fadeIn(300);
      $("#swing").fadeIn(300);
      setTimeout(() => {
        that.ani_questText();
        var clockSnd = document.getElementById("clockSnd");
        clockSnd.volume = 0.2;
        clockSnd.play();
      }, 1000);
    },
    /**
     * 出现字幕(顶上的)
     */
    ani_questText: function () {
      $("#quest-text-1").fadeIn(0);
      $("#quest-text-2").fadeIn(0);
      $("#quest-text-3").fadeIn(0);
      setTimeout(() => {
        this.ani_whisper();
      }, 30 * 37);
    },
    /**
     * 产品狸低语7句话[咒语]
     */
    ani_whisper: function () {
      var that = this;
      async.series(
        [
          function (cb) {
            $("#text" + 1).fadeIn(500);
            setTimeout(() => {
              cb(null);
            }, 500);
          },
          function (cb) {
            $("#text" + 2).fadeIn(500);
            setTimeout(() => {
              cb(null);
            }, 1000);
          },
          function (cb) {
            $("#text" + 3).fadeIn(500);
            setTimeout(() => {
              cb(null);
            }, 1000);
          },
          function (cb) {
            $("#text" + 4).fadeIn(500);
            setTimeout(() => {
              cb(null);
            }, 1000);
          },
          function (cb) {
            $("#text" + 5).fadeIn(500);
            setTimeout(() => {
              cb(null);
            }, 1000);
          },
          function (cb) {
            $("#text" + 6).fadeIn(500);
            setTimeout(() => {
              cb(null);
            }, 1000);
          },
        ],
        function () {
          // $("#particle").fadeOut(1000);
          that.currentCb = that.ani_FBIOpenTheDoor;
          that.waitingExclamationClick = true;
        }
      );
    },
    /**
     * [噔噔咚]，门开了，主人公出现
     */
    ani_FBIOpenTheDoor: function () {
      var that = this;
      $("#door-side").fadeIn(0);
      $("#door-open").fadeIn(0);
      $("#door").hide();
      var doorSnd = document.getElementById("doorSnd");
      doorSnd.volume = 0.2;
      doorSnd.play();
      setTimeout(() => {
        $("#door-open").hide();
        that.ani_move();
      }, 500);
    },
    /**
     * 主人公[逼近]产品狸
     * 产品狸底下的[蜜汁]粒子效果消失
     */
    ani_move: function () {
      var that = this;
      var boyImg = require("./assets/boy-walk.gif");
      var girlImg = require("./assets/girl-walk.gif");
      var boy = $("#boy");
      boy.fadeIn(500);
      setTimeout(() => {
        if(that.sex == "boy")
        {
          boy.attr("src", boyImg);
          boy.css("width", "12vw");
        }
        else{
          boy.attr("src", girlImg);
          boy.css("width", "15vw");
        }
        
        boy.attr("class", "boy-walk");
        that.ani_stop();
      }, 500);
    },
    /**
     * 产品狸进入主人公的[攻击范围]之内
     */
    ani_stop: function () {
      var that = this;
      var boy = $("#boy");
      var img;
      if(that.sex == "boy"){
        img = require("./assets/boy.png");
      } else {
        img = require("./assets/girl.png");
      }
      setTimeout(() => {
        boy.attr("src", img);
        if(that.scc == "boy") {
          boy.css("width", (125 * 100) / 1080 + "vw");
        } else {
          boy.css("width", "13vw");
        }
        that.ani_dialog();
      }, 2000);
    },
    /**
     * 主人公与产品狸之间的[交♂易]
     */
    ani_dialog: function () {
      var that = this;
      setTimeout(() => {
        $("#dialog").fadeIn(300);
        $("#dialog-text-1").fadeIn(300);
        $("#dialog-text-2").fadeIn(300);
        $("#dialog-text-3").fadeIn(300);
        $("#bg-mask").attr("class", "mask-darken");

        setTimeout(() => {
          that.currentCb = that.ani_getPrototype;
          that.waitingScreenClick = true;
        }, 100 * 32);
      }, 1000);
    },
    /**
     * 产品狸[被迫]交出了原型
     * 对话框消失，叹号消失，原型出现
     */
    ani_getPrototype: function () {
      var that = this;
      $("#dialog").fadeOut(300);
      $("#dialog-text-1").fadeOut(300);
      $("#dialog-text-2").fadeOut(300);
      $("#dialog-text-3").fadeOut(300);
      $("#exclamation").fadeOut(300);
      $("#bg-mask").attr("class", "mask-lighten");
      setTimeout(() => {
        $("#quest-icon").fadeIn(0);
        var getSnd = document.getElementById("getSnd");
        getSnd.volume = 0.2;
        getSnd.play();
        that.ani_textDisappear();
      }, 500);
    },
    /**
     * 主人公[大获全胜]
     * 原型消失，旧的字幕倒回之后重现新的字幕
     */
    ani_textDisappear: function () {
      var that = this;
      var i = 35;
      var timer = setInterval(() => {
        if (i == 7) {
          clearInterval(timer);
          setTimeout(() => {
            that.ani_over();
          }, 100);
        } else {
          $("#quest-font" + i).fadeOut(50);
          i--;
        }
      }, 30);
    },
    /**
     * 结束[战斗]，结算[战利品]
     * 变暗
     */
    ani_over: function () {
      var that = this;
      $("#complete-text-1").fadeIn(0);
      $("#complete-text-2").fadeIn(0);
      setTimeout(() => {
        that.waitingScreenClick = true;
        that.currentCb = that.ani_blacken;
      }, 30 * 17);
    },
    ani_blacken: function () {
      $("#bg-mask").attr("class", "mask-close");
      var clockSnd = $("#clockSnd");
      clockSnd.attr("src", "#");
      setTimeout(() => {
        $("#animal").hide();
        $("#bg").hide();
        $("#bg-margin").hide();
        $("#bg-mask").hide();
        $("#picture").hide();
        $("#computer").hide();
        $("#door").hide();
        $("#door-side").hide();
        $("#door-open").hide();
        $("#swing").hide();
        $("#exclamation").hide();
        $("#particle").hide();
        $("#quest-icon").hide();
        $("#quest-text-1").hide();
        $("#quest-text-2").hide();
        $("#quest-text-3").hide();
        $("#complete-text-1").hide();
        $("#complete-text-2").hide();
        $("#dialog").hide();
        $("#dialog-text-1").hide();
        $("#dialog-text-2").hide();
        $("#dialog-text-3").hide();
        $("#boy").hide();
        $("#text1").hide();
        $("#text2").hide();
        $("#text3").hide();
        $("#text4").hide();
        $("#text5").hide();
        $("#text6").hide();
        $("#text7").hide();
      }, 3000);

    },
  },
  watch: {
    loadCount: {
      handler(val) {
        if (val === true) {
          setTimeout(() => {
            // 开始触发动画
            this.ani_init();
          }, 500);
        }
      },
    },
  },
  mounted() {
    $("#animal").hide();
    $("#bg").hide();
    $("#bg-margin").hide();
    $("#bg-mask").hide();
    $("#picture").hide();
    $("#computer").hide();
    $("#door").hide();
    $("#door-side").hide();
    $("#door-open").hide();
    $("#swing").hide();
    $("#exclamation").hide();
    $("#particle").hide();
    $("#quest-icon").hide();
    $("#quest-text-1").hide();
    $("#quest-text-2").hide();
    $("#quest-text-3").hide();
    $("#complete-text-1").hide();
    $("#complete-text-2").hide();
    $("#dialog").hide();
    $("#dialog-text-1").hide();
    $("#dialog-text-2").hide();
    $("#dialog-text-3").hide();
    $("#boy").hide();
    $("#text1").hide();
    $("#text2").hide();
    $("#text3").hide();
    $("#text4").hide();
    $("#text5").hide();
    $("#text6").hide();
    $("#text7").hide();
    if(this.sex == "boy")
    {
      $("#boy").attr("src", require("./assets/boy.png"));
    }
    else {
      $("#boy").attr("src", require("./assets/girl.png"));
      $("#boy").css("width", "13vw");
  //       width: getW(125);

  // left: getW(117);
  // top: getH(1163);
    }

    var tempImg;
    var i;
    for (i = 0; i < this.fonts_1_1.length; i++) {
      tempImg = require("./assets/font-1/" + this.fonts_1_1[i] + ".png");
      this.fonts_1_1_path_array.push(tempImg);
    }
    for (i = 0; i < this.fonts_1_2.length; i++) {
      tempImg = require("./assets/font-1/" + this.fonts_1_2[i] + ".png");
      this.fonts_1_2_path_array.push(tempImg);
    }
    for (i = 0; i < this.fonts_1_3.length; i++) {
      tempImg = require("./assets/font-1/" + this.fonts_1_3[i] + ".png");
      this.fonts_1_3_path_array.push(tempImg);
    }
    for (i = 0; i < this.fonts_2_1.length; i++) {
      tempImg = require("./assets/font-2/" + this.fonts_2_1[i] + ".png");
      this.fonts_2_1_path_array.push(tempImg);
    }
    for (i = 0; i < this.fonts_2_2.length; i++) {
      tempImg = require("./assets/font-2/" + this.fonts_2_2[i] + ".png");
      this.fonts_2_2_path_array.push(tempImg);
    }
    for (i = 0; i < this.fonts_2_3.length; i++) {
      tempImg = require("./assets/font-2/" + this.fonts_2_3[i] + ".png");
      this.fonts_2_3_path_array.push(tempImg);
    }
    for (i = 0; i < this.fonts_3_1.length; i++) {
      tempImg = require("./assets/font-1/" + this.fonts_3_1[i] + ".png");
      this.fonts_3_1_path_array.push(tempImg);
    }
    for (i = 0; i < this.fonts_3_2.length; i++) {
      tempImg = require("./assets/font-1/" + this.fonts_3_2[i] + ".png");
      this.fonts_3_2_path_array.push(tempImg);
    }
    //画面适配
    window.onresize = function () {
      var offsetHeight = document.body.offsetHeight;
      var bgHeight = $("#bg").css("height");
      bgHeight = bgHeight.substring(0, bgHeight.length - 2);
      $("#bg-margin").css("height", offsetHeight - bgHeight + 4);
    };
    var offsetHeight = document.body.offsetHeight;
    var bgHeight = $("#bg").css("height");
    bgHeight = bgHeight.substring(0, bgHeight.length - 2);
    $("#bg-margin").css("height", offsetHeight - bgHeight + 4);
    //画的三帧切换
    var mode = 0;
    var picture = $("#picture");
    var pictureSrc = [
      require("./assets/picture1.png"),
      require("./assets/picture2.png"),
      require("./assets/picture3.png"),
    ];
    setInterval(function () {
      mode++;
      if (mode >= 3) mode %= 3;
      picture.attr("src", pictureSrc[mode]);
    }, 1500);
    this.loadCount = true;
    //声音加载
    window.onclick = function () {
      var clockSnd = document.getElementById("clockSnd");
      clockSnd.volume = 0.2;
      clockSnd.play();
    }
  },
};
</script>

<style lang="scss">
@function getH($h) {
  @return getVW($h * 100 / 1920);
}
@function getW($w) {
  @return ($w * 100 / 1080) + vw;
}
@function getVW($vh) {
  @return ($vh * 1920 / 1080) + vw;
}
//蓝字 循环
@for $i from 0 to 8 {
  @if $i == 5 {
    #quest-font#{$i} {
      position: relative;
      left: ($i * -3) + vw;
      width: getW(78);
      height: getH(108);
      opacity: 0;
      animation: showWord 0.03s linear normal;
      animation-delay: (0.03 * $i - 0.03) + s;
      animation-fill-mode: forwards;
    }
  } @else if $i == 7 {
    #quest-font#{$i} {
      position: relative;
      left: ($i * -3) + 1 + vw;
      width: getW(39);
      height: getH(108);
      opacity: 0;
      animation: showWord 0.03s linear normal;
      animation-delay: (0.03 * $i - 0.03) + s;
      animation-fill-mode: forwards;
    }
  } @else {
    #quest-font#{$i} {
      position: relative;
      left: ($i * -3) + vw;
      width: getW(90);
      height: getH(90);
      opacity: 0;
      animation: showWord 0.03s linear normal;
      animation-delay: (0.03 * $i - 0.03) + s;
      animation-fill-mode: forwards;
    }
  }
}
@for $i from 8 to 22 {
  #quest-font#{$i} {
    position: relative;
    left: (($i - 8) * -3) + vw;
    width: getW(90);
    height: getH(90);
    opacity: 0;
    animation: showWord 0.03s linear normal;
    animation-delay: (0.03 * $i - 0.03) + s;
    animation-fill-mode: forwards;
  }
}
@for $i from 22 to 36 {
  @if $i == 22 {
    #quest-font#{$i} {
      position: relative;
      left: (($i - 22) * -3) + vw;
      width: getW(90);
      height: getH(90);
      opacity: 0;
      animation: showWord 0.03s linear normal;
      animation-delay: (0.03 * $i - 0.03) + s;
      animation-fill-mode: forwards;
    }
  } @else if $i == 23 {
    #quest-font#{$i} {
      position: relative;
      left: (($i - 22) * -6) + vw;
      width: getW(90);
      height: getH(90);
      opacity: 0;
      animation: showWord 0.03s linear normal;
      animation-delay: (0.03 * $i - 0.03) + s;
      animation-fill-mode: forwards;
    }
  } @else {
    #quest-font#{$i} {
      position: relative;
      left: (($i - 22) * -3) - 3 + vw;
      width: getW(90);
      height: getH(90);
      opacity: 0;
      animation: showWord 0.03s linear normal;
      animation-delay: (0.03 * $i - 0.03) + s;
      animation-fill-mode: forwards;
    }
  }
}
//任务结束 蓝字 循环
@for $i from 0 to 6 {
  @if i == 5 {
    #complete-font#{$i} {
      position: relative;
      left: ($i * -3) + vw;
      width: getW(70);
      height: getH(90);
      opacity: 0;
      animation: showWord 0.03s linear normal;
      animation-delay: (0.03 * $i - 0.03) + s;
      animation-fill-mode: forwards;
    }
  } @else {
    #complete-font#{$i} {
      position: relative;
      left: ($i * -3) + vw;
      width: getW(90);
      height: getH(90);
      opacity: 0;
      animation: showWord 0.03s linear normal;
      animation-delay: (0.03 * $i - 0.03) + s;
      animation-fill-mode: forwards;
    }
  }
}
@for $i from 6 to 16 {
  @if i == 5 {
    #complete-font#{$i} {
      position: relative;
      left: (($i * -3) - 1) + vw;
      width: getW(70);
      height: getH(90);
      opacity: 0;
      animation: showWord 0.03s linear normal;
      animation-delay: (0.03 * $i - 0.03) + s;
      animation-fill-mode: forwards;
    }
  } @else {
    #complete-font#{$i} {
      position: relative;
      left: (($i - 6) * -3) + vw;
      width: getW(90);
      height: getH(90);
      opacity: 0;
      animation: showWord 0.03s linear normal;
      animation-delay: (0.03 * $i - 0.03) + s;
      animation-fill-mode: forwards;
    }
  }
}
//橙字 循环
@for $i from 0 to 4 {
  @if $i == 3 {
    #dialog-font#{$i} {
      position: relative;
      left: ($i * -0.5) + vw;
      width: getW(20);
      height: getH(60);
      opacity: 0;
      animation: showWord 0.1s linear normal;
      animation-delay: (0.1 * $i - 0.1) + s;
      animation-fill-mode: forwards;
    }
  } @else {
    #dialog-font#{$i} {
      position: relative;
      left: ($i * -0.5) + vw;
      width: getW(60);
      height: getH(60);
      opacity: 0;
      animation: showWord 0.1s linear normal;
      animation-delay: (0.1 * $i - 0.1) + s;
      animation-fill-mode: forwards;
    }
  }
}
@for $i from 4 to 19 {
  @if $i == 18 {
    #dialog-font#{$i} {
      position: relative;
      left: (($i - 4) * -0.5) + vw;
      width: getW(15);
      height: getH(45);
      opacity: 0;
      animation: showWord 0.1s linear normal;
      animation-delay: (0.1 * $i - 0.1) + s;
      animation-fill-mode: forwards;
    }
  } @else {
    #dialog-font#{$i} {
      position: relative;
      left: (($i - 4) * -0.5) + vw;
      width: getW(45);
      height: getH(45);
      opacity: 0;
      animation: showWord 0.1s linear normal;
      animation-delay: (0.1 * $i - 0.1) + s;
      animation-fill-mode: forwards;
    }
  }
}
@for $i from 19 to 31 {
  @if $i == 30 {
    #dialog-font#{$i} {
      position: relative;
      left: (($i - 19) * -0.5) + vw;
      width: getW(15);
      height: getH(45);
      opacity: 0;
      animation: showWord 0.1s linear normal;
      animation-delay: (0.1 * $i - 0.1) + s;
      animation-fill-mode: forwards;
    }
  } @else {
    #dialog-font#{$i} {
      position: relative;
      left: (($i - 19) * -0.5) + vw;
      width: getW(45);
      height: getH(45);
      opacity: 0;
      animation: showWord 0.1s linear normal;
      animation-delay: (0.1 * $i - 0.1) + s;
      animation-fill-mode: forwards;
    }
  }
}
@keyframes showWord {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
#quest-text-1 {
  position: relative;
  // width: 100%;
  left: getVW(6);
  top: getVW(10);
  height: getVW(3);
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
#quest-text-2 {
  position: relative;
  // width: 100%;
  left: getVW(6);
  top: getVW(11);
  height: getVW(3);
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
#quest-text-3 {
  position: relative;
  // width: 100%;
  left: getVW(6);
  top: getVW(12);
  height: getVW(3);

  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
  flex-direction: row;
  // flex-basis: 10vw;
  justify-content: flex-start;
  align-items: center;
}
#complete-text-1 {
  position: absolute;
  // width: 100%;
  left: getVW(6);
  top: getVW(14);
  height: getVW(3);
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
}
#complete-text-2 {
  position: absolute;
  // width: 100%;
  left: getVW(6);
  top: getVW(18);
  height: getVW(3);

  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
  flex-direction: row;
  // flex-basis: 10vw;
  justify-content: flex-start;
  align-items: center;
}

#dialog-text-1 {
  position: relative;
  // width: 100%;
  left: getVW(6);
  top: getVW(70);
  height: getVW(2);
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  z-index: 15;
}
#dialog-text-2 {
  position: relative;
  // width: 100%;
  left: getVW(6);
  top: getVW(72);
  height: getVW(2);
  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  z-index: 15;
}
#dialog-text-3 {
  position: relative;
  // width: 100%;
  left: getVW(6);
  top: getVW(73);
  height: getVW(2);

  display: -webkit-box; /* 老版本语法: Safari, iOS, Android browser, older WebKit browsers. */
  display: -webkit-flex; /* 新版本语法: Chrome 21+ */
  display: flex; /* 新版本语法: Opera 12.1, Firefox 22+ */
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  z-index: 15;
}
#dialog {
  width: getW(1023);

  left: getW(28);
  top: getH(1450);

  z-index: 12;
}

body {
  margin: 0px;
}
img {
  position: absolute;
}
#product {
  position: relative;
  margin: 0px;
  background-color: black;
  height: 100vh;
  width: 100vw;
  overflow: hidden;
  // zoom: 1;
}
#bg-mask {
  position: absolute;
  background-color: black;
  height: 100vh;
  width: 100vw;
  opacity: 0;
  z-index: 11;
}
// .bg-darken {
//    animation: bgDarken 3s linear forwards;
//   -moz-animation: bgDarken 3s linear forwards;
//   -webkit-animation: bgDarken 3s linear forwards;
//   -o-animation: bgDarken 3s linear forwards; 
// }
// @keyframes bgDarken {
//   0% {
//     opacity: 0;
//     z-index: 100;
//   }
//   100% {
//     opacity: 1;
//     background-color: black;
//   }
// }
.mask-darken {
  animation: maskDarken 0.5s linear forwards;
  -moz-animation: maskDarken 0.5s linear forwards;
  -webkit-animation: maskDarken 0.5s linear forwards;
  -o-animation: maskDarken 0.5s linear forwards;
}
@keyframes maskDarken {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 0.1;
  }
}
.mask-lighten {
  animation: maskLighten 0.5s linear forwards;
  -moz-animation: maskLighten 0.5s linear forwards;
  -webkit-animation: maskLighten 0.5s linear forwards;
  -o-animation: maskLighten 0.5s linear forwards;
}
@keyframes maskLighten {
  0% {
    opacity: 0.1;
  }
  100% {
    opacity: 0;
  }
}
.mask-close {
    animation: maskClose 3s linear forwards;
  -moz-animation: maskClose 3s linear forwards;
  -webkit-animation: maskClose 3s linear forwards;
  -o-animation: maskClose 3s linear forwards;
}
@keyframes maskClose {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
.mask-open {
    animation: maskOpen 1s linear forwards;
  -moz-animation: maskOpen 1s linear forwards;
  -webkit-animation: maskOpen 1s linear forwards;
  -o-animation: maskOpen 1s linear forwards;
}
@keyframes maskOpen {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
#bg-margin {
  // 动态计算height
  position: absolute;
  bottom: 0;
  width: 100vw;
  background: white;
  overflow: hidden;
  z-index: 3;
}
#animal {
  width: getW(153);
  // height: getH(325);

  left: getW(514);
  top: getH(1184);

  z-index: 3;
}
#bg {
  width: 100vw;
  height: getVW(100);
  z-index: 0;
}
#picture {
  width: getW(133);

  left: getW(368);
  top: getH(925);

  z-index: 2;
}
#swing {
  width: getW(100);
  // height: getH(67);
  left: getW(580);
  top: getH(1038);
}
#computer {
  width: getW(359);
  // height: getH(289);

  left: getW(377);
  top: getH(1482);

  z-index: 10;
}
#door {
  width: getW(239);
  // height: getH(427);

  left: getW(112);
  top: getH(1047);
}
#door-side {
  width: getW(116);
  // height: getH(366);

  left: getW(237);
  top: getH(1044);
}
#door-open {
  width: getW(116);
  // height: getH(366);

  animation: FBIOpenTheDoor 0.5s linear forwards;
  -moz-animation: FBIOpenTheDoor 0.5s linear forwards;
  -webkit-animation: FBIOpenTheDoor 0.5s linear forwards;
  -o-animation: FBIOpenTheDoor 0.5s linear forwards;
}
@keyframes FBIOpenTheDoor {
  0% {
    left: getW(112);
    top: getH(1111);
  }
  100% {
    left: getW(237);
    top: getH(1044);
  }
}
#exclamation {
  width: getW(100);
  // height: getH(130);
  left: getW(558);
  top: getH(1100);
  // z-index: 6;
  z-index: 12;
}

#particle {
  width: getW(230);
  // height: getH(207);
  opacity: 0.7;

  left: getW(470);
  top: getH(1420);
  animation: particle 10s linear infinite;
  -moz-animation: particle 10s linear infinite;
  -webkit-animation: particle 10s linear infinite;
  -o-animation: particle 10s linear infinite;
}
@keyframes particle {
  0% {
    opacity: 0;
  }
  50% {
    opacity: 0.9;
  }
  100% {
    opacity: 0;
  }
}
#quest-icon {
  width: getW(63);
  //  height: getH(113);

  left: getW(380);
  top: getH(1084);
  opacity: 1;
  z-index: 8;

  animation: iconMove 1s linear forwards;
  -moz-animation: iconMove 1s linear forwards;
  -webkit-animation: iconMove 1s linear forwards;
  -o-animation: iconMove 1s linear forwards;
}
@keyframes iconMove {
  0% {
    left: getW(380);
    top: getH(1150);
    opacity: 1;
  }
  50% {
    left: getW(380);
    top: getH(1084);
    opacity: 1;
  }
  75% {
    left: getW(380);
    top: getH(1084);
    opacity: 1;
  }
  100% {
    left: getW(380);
    top: getH(1084);
    opacity: 0;
  }
}
#boy {
  width: getW(125);
  // height: getH(285);

  left: getW(117);
  top: getH(1163);
  z-index: 7;
}
.boy-walk {
  animation: boyMove 2s linear forwards;
  -moz-animation: boyMove 2s linear forwards;
  -webkit-animation: boyMove 2s linear forwards;
  -o-animation: boyMove 2s linear forwards;
}
@keyframes boyMove {
  0% {
    left: getW(117);
    top: getH(1163);
  }
  //143.9618
  50% {
    left: getW(252);
    top: getH(1213);
  }
  //140
  100% {
    left: getW(342);
    top: getH(1213);
  }
}
#text1 {
  width: getW(395);
  // height: getH(52);

  left: getW(628);
  top: getH(1147);

  z-index: 5;
}
#text2 {
  width: getW(121);
  // height: getH(52);

  left: getW(327);
  top: getH(1264);

  z-index: 5;
}
#text3 {
  width: getW(101);
  // height: getH(45);

  left: getW(281);
  top: getH(1353);

  z-index: 5;
}
#text4 {
  width: getW(249);
  // height: getH(52);

  left: getW(607);
  top: getH(1334);

  z-index: 5;
}
#text5 {
  width: getW(239);
  // height: getH(45);

  left: getW(613);
  top: getH(1397);

  z-index: 5;
}
#text6 {
  width: getW(352);
  // height: getH(52);

  left: getW(264);
  top: getH(1088);

  z-index: 5;
}
</style>