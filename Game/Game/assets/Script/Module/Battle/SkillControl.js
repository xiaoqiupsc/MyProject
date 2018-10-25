/*global module, require, cc, client */
/**
 * @desc 技能控制处理
 * @author Administrator
 */
require('Game');
var BattleManager = require("BattleManager");
var outModule = {};
var local = {};

//所有的技能数据
local.judgeFuncObj = {};
//这边会返回一个攻击对象，如果没有的话就返回空表示不释放技能
local.judgeFuncObj[g_AUTOMATIC_TYPE_OBJ.TYPE_1] = function (skillData, personData) {
    let enemies;
    if (personData._b_isUserHero) {
        enemies = BattleManager.enemies;
    } else {
        enemies = BattleManager.soldiers;
    }
};

/**
 * 判断是否要使用技能
 * @param skillData 技能工厂中输出的数据
 */
outModule.judgeUseSkill = function (skillData, personData) {
    return local.judgeFuncObj[skillData._automaticType](skillData, personData);
};

module.exports = outModule;
