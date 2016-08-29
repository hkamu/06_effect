var size;
var num = 0;
var skillnum = [350,350,350,350];
var suu = 0;
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

    //水キャラクターを追加
    /*var sprite11 = cc.Sprite.create(res.chara_princessselect_11);
    sprite11.setPosition(size.width * 0.25, size.height * 0.4);
    sprite11.setScale(0.8);
    this.addChild(sprite11, 0);*/

    //火属性のキャラクター
    var sprite10 = cc.Sprite.create(res.chara_princessselect_10);
    sprite10.setPosition(size.width * 0.3, size.height * 0.3);
    sprite10.setScale(0.8);
    this.addChild(sprite10, 0);

    //木属性キャラクター
    /*var sprite12 = cc.Sprite.create(res.chara_princessselect_12);
    sprite12.setPosition(size.width * 0.15, size.height * 0.25);
    sprite12.setScale(0.8);
    this.addChild(sprite12, 0);*/

    //火属性　敵ｻｺキャラクター
    var sprite1 = cc.Sprite.create(res.chara_enemy_1);
    sprite1.setPosition(size.width * 0.65, size.height * 0.45);
    sprite1.setScale(1.2);
    this.addChild(sprite1, 0);
    //水属性　敵ｻｺキャラクター
    var sprite2 = cc.Sprite.create(res.chara_enemy_2);
    sprite2.setPosition(size.width * 0.70, size.height * 0.35);
    sprite2.setScale(1.2);
    this.addChild(sprite2, 0);
    //火属性　敵ｻｺ中ボスキャラクター
    var sprite4 = cc.Sprite.create(res.chara_enemy_4);
    sprite4.setPosition(size.width * 0.85, size.height * 0.40);
    sprite4.setScale(1.2);
    this.addChild(sprite4, 0);
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
    if ((this.skillCnt % skillnum[suu]) == 0) {
      this.skillCnt = 0;

      this.removeAllChildren();
      this.skillSelect++;
      suu++;
      this.skillSelect = this.skillSelect % 13;
      if(suu > 12) suu = 0;
      //suuいじってループ 0,1,2...
}
    //フレームをカウントする
    this.skillCnt++;
    /*
    debugText.setString("this.skillCnt:"+this.skillCnt
    + " skillSelect:"+this.skillSelect
    + " skillLevel:"+this.skillLevel);
*/
  },

//属性とスキルレベルと座標を与えてパーティクルを生成する関数
  skillParticle: function(attrib) {
    var skillName = ["A","S","AO","Y"];
    var x = [720,740,760,680,660,750,750,750,750,750,750,500,750];
    var y = [90,90,90,90,90,90,90,90,90,90,90,90,90];
        var num2 = [4, 4, 3, 2];
        for(var i = 1; i < num2[attrib]; i++){
          var sName = "res." + skillName[attrib] + "_particle" + i;
          var tempParticle = new cc.ParticleSystem(eval(sName));
          tempParticle.setPosition(x[num], y[num]);
          num++;
          if(num > 12) num = 0;
          tempParticle.setDuration(4);
          //パーティクル自体の生存時間
          this.addChild(tempParticle, 20);
          tempParticle.setAutoRemoveOnFinish(true);
        }
      },
    });
