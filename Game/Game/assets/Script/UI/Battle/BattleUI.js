/*global module, require, cc, client */
/**
 * 本游戏的主场景，现在只有一个场景
 */
var BaseUI = require("BaseUI");
var BattleManager = require("BattleManager");
var BattleControl = require('BattleControl');

cc.Class({
    extends: BaseUI,

    properties: {
        //视线跟随的节点
        _followNode: null,
        _moveXSave: null
    },

    onLoad() {
        //设置名字
        this._uiName = "BattleSceneUI";
        //初始化
        this._super();
    },

    update: function () {
        this.updateViewPos();
    },

    onShow: function () {
        this._super();
        //设入组件
        this.updateSoldiers();
        this.updateEnemies();
        BattleManager.startBattle(this);
        BattleControl.start();
        //this._followNode = this._bottomNode.getChildByName(`Hero_1`);
    },

    //更新己方士兵
    updateSoldiers: function () {
        let i, heroNode, heroData;
        for (i = 0; i < 3; i++) {
            heroNode = this._bottomNode.getChildByName(`Hero_${i + 1}`);
            if (!BattleManager.soldiers[i]) {
                heroNode.active = false;
                continue;
            }
            heroData = BattleManager.soldiers[i];
            heroData._b_node = heroNode;
            heroNode.active = true;
            heroNode.getChildByName('Name').getComponent(cc.Label).string = heroData._r_unitName;
            heroNode.getChildByName('Hp').getComponent(cc.Label).string = `${heroData._b_hp}/${heroData._r_hp}`;
            heroNode.getChildByName('Mp').getComponent(cc.Label).string = `${heroData._b_mp1}/${heroData._r_mp1}`;
        }
    },

    updateEnemies: function () {
        let i, heroNode, enemyData;
        for (i = 0; i < 3; i++) {
            heroNode = this._bottomNode.getChildByName(`enemy_${i + 1}`);
            if (!BattleManager.enemies[i]) {
                heroNode.active = false;
                continue;
            }
            enemyData = BattleManager.enemies[i];
            enemyData._b_node = heroNode;
            heroNode.active = true;
            heroNode.getChildByName('Name').getComponent(cc.Label).string = enemyData._r_unitName;
            heroNode.getChildByName('Hp').getComponent(cc.Label).string = `${enemyData._b_hp}/${enemyData._r_hp}`;
            heroNode.getChildByName('Mp').getComponent(cc.Label).string = `${enemyData._b_mp1}/${enemyData._r_mp1}`;
        }
    },

    //更新视线位置，让选中的英雄居中
    updateViewPos: function () {
        const MOVE_VIEW_TIME = 0;
        if (!this._followNode) {
            return;
        }
        let x = this._followNode.x;
        //Bottom的位置
        let newX = -1 * x;
        if (this._moveXSave === newX) {
            return;
        }
        this._moveXSave = newX;
        let action = cc.moveTo(MOVE_VIEW_TIME, cc.p(newX, 0));
        this._bottomNode.stopAllActions();
        this._bottomNode.runAction(action);
    },

    onButtonClick: function (name, node, component) {
        switch (name) {
            case 'followBtn':
                this._followNode = node.parent;
                break;
            case 'pause':
                BattleControl.pause();
                break;
            case 'resume':
                BattleControl.resume();
                break;
        }
    }
});
