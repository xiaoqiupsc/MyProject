/*global module, require, cc, client */
/**
 * 本游戏的主场景，现在只有一个场景
 */
var BaseUI = require("BaseUI");
cc.Class({
    extends: BaseUI,

    properties: {
        _selectButton_1: null,
        _selectButton_2: null,
        _selectButton_3: null,

        //现在正在选择几号位
        _nowSelectPos: null,
        //选择的数据

        //选中的英雄
        _selectHero_1: null,
        _selectHero_2: null,
        _selectHero_3: null,
    },

    onLoad() {
        //设置名字
        this._uiName = "HeroSelectUI";
        //初始化
        this._super();
        //监听消息
        g_EventManager.on(g_EventManager.SELECT_HERO_FINISH, this.selectHeroFinishCb, this);
    },

    onShow: function () {
        this._super();
    },

    //结点初始化
    UIInit: function () {
        this._super();
        this._selectButton_1 = this._midNode.getChildByName('button_1');
        this._selectButton_2 = this._midNode.getChildByName('button_2');
        this._selectButton_3 = this._midNode.getChildByName('button_3');
    },

    //数据初始化
    dataInit: function () {
        this._super();
    },

    onButtonClick: function (name, node, component) {
        switch (name) {
            case 'button_1':
                this._nowSelectPos = 1;
                this.showSelectHeroListUI();
                break;
            case 'button_2':
                this._nowSelectPos = 2;
                this.showSelectHeroListUI();
                break;
            case 'button_3':
                this._nowSelectPos = 3;
                this.showSelectHeroListUI();
                break;
            case 'buttonStart':
                //开始战斗
                break;
        }
    },

    selectHeroFinishCb: function (heroData) {
        switch (this._nowSelectPos) {
            case 1:
                this._selectButton_1.getChildByName('Label').getComponent(cc.Label).string = heroData.unitName;
                break;
            case 2:
                this._selectButton_2.getChildByName('Label').getComponent(cc.Label).string = heroData.unitName;
                break;
            case 3:
                this._selectButton_3.getChildByName('Label').getComponent(cc.Label).string = heroData.unitName;
                break;
        }
    },

    showSelectHeroListUI: function () {
        g_GameSceneManager.addNode("Prefab/Battle/HeroSelectList", g_GAME_SCENE_UI_NODE, "HeroSelectListUI", false, undefined, undefined);
    },
});
