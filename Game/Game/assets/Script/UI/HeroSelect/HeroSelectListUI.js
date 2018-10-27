/*global module, require, cc, client */
/**
 * 本游戏的主场景，现在只有一个场景
 */
var BaseUI = require("BaseUI");
var ScrollViewTool = require("ScrollViewTool");
var BasePersonFactory = require("BasePersonFactory");
cc.Class({
    extends: BaseUI,

    properties: {
        _scrollviewNode: null,
        _allHeroData: null
    },

    onLoad() {
        //设置名字
        this._uiName = "HeroSelectListUI";
        //初始化
        this._super();
    },

    onShow: function () {
        this._super();
        this._scrollviewNode = this._midNode.getChildByName('scrollview');
        this._allHeroData = g_JsonDataTool.getDataByKey('_table_unit_unit', 'unitType', 2);
        ScrollViewTool.buildScrollView(this._scrollviewNode, ScrollViewTool.SCROLL_TYPE_VERTICAL,
            cc.find('view/content/button', this._scrollviewNode), function (childNode, oneHeroData) {
                childNode.getChildByName('Label').getComponent(cc.Label).string = oneHeroData.unitName;
                childNode._g_heroData = new BasePersonFactory.createOneBasePerson(oneHeroData.main_id);
            }.bind(this), this._allHeroData);
        this.buttonTravelRegister(this._scrollviewNode);
    },

    onButtonClick: function (name, node, component) {
        switch (name) {
            case 'button':
                if (node._g_heroData) {
                    g_EventManager.send(g_EventManager.SELECT_HERO_FINISH, node._g_heroData);
                    this.hide(false);
                }
                break;
        }
    }
});
