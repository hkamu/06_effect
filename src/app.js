var size;
var gameScene = cc.Scene.extend({
  onEnter: function() {
    this._super();
    var layer0 = new fieldLayer();
    var layer1 = new gameLayer();
    var layer2 = new charaLayer();
    var layer3 = new particleLayer();
    this.addChild(layer0);
    this.addChild(layer1);
    this.addChild(layer2);
    this.addChild(layer3);

  }
});

var gameLayer = cc.Layer.extend({
  sprite: null,
  ctor: function() {
    this._super();
    size = cc.winSize;
    return true;
  },

});

var fieldLayer = cc.Layer.extend({
  ctor: function() {
    this._super();

    var size = cc.director.getWinSize();

    var sprite = cc.Sprite.create(res.ss_BattleScene_bg1);
    sprite.setPosition(size.width / 2, size.height / 2);
    sprite.setScale(0.8);
    this.addChild(sprite, 0);
  }
});

var charaLayer = cc.Layer.extend({
  ctor: function() {
    this._super();

    var size = cc.director.getWinSize();

    //火属性のキャラクター
    var sprite10 = cc.Sprite.create(res.chara_princessselect_10);
    sprite10.setPosition(size.width * 0.3, size.height * 0.3);
    sprite10.setScale(0.8);
    this.addChild(sprite10, 0);

    //木属性　赤ザコ工場長キャラクター
    var sprite6 = cc.Sprite.create(res.chara_enemy_6);
    sprite6.setPosition(size.width * 0.85, size.height * 0.40);
    sprite6.setScale(1.2);
    this.addChild(sprite6, 0);
  }
});

//パーティクル用のレイヤー
var particleLayer = cc.Layer.extend({
  skillSelect: 0,
  skillCnt: 1,

  ctor: function() {
    this._super();
    size = cc.winSize;
    this.scheduleUpdate();
    return true;
  },
  update: function(_dt) {
    if (this.skillCnt == 1) {
     this.skillParticle(this.skillSelect);
    }
    if ((this.skillCnt % 80) == 0) {
      this.skillCnt = 0;
      this.skillLevel++;
      //HealとSlipスキル追加
      if(this.skillSelect<3) {
        this.skillLevel = this.skillLevel  % 5;
      } else {
        this.skillLevel = this.skillLevel  % 2;
      }

      this.removeAllChildren();
      if (this.skillLevel == 0) {
        this.skillLevel++;
        this.skillSelect++;
        this.skillSelect = this.skillSelect % 5;
      }

    }
    //フレームをカウントする
    this.skillCnt++;
},

//属性とスキルレベルと座標を与えてパーティクルを生成する関数
  skillParticle: function(attrib) {

    //debugText.setString("attrib:"+attrib);
  　　//HealとSlipスキル追加
    var skillName = ["aoko","kisima","akiha"];
    var sName = "res." + skillName[attrib] + "Texture" + rare + "_plist";

    var tempParticle = new cc.ParticleSystem(eval(sName));
    tempParticle.setPosition(x, y);
    this.addChild(tempParticle, 20);
    tempParticle.setAutoRemoveOnFinish(true);
  },


});
