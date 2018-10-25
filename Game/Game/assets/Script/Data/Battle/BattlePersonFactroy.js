/*global module, require, cc, client */
/**
 * @desc 对人物数据进行封装，增加一些属性用于战斗
 * @author Administrator
 */

var SkillFactory = require('SkillFactory');

var outModule = {};

outModule.buildBattlePerson = (person, pos, automaticType, isUserHero) => {
    //是否是玩家英雄
    person._b_isUserHero = isUserHero;
    //位置
    person.b_pos = pos;
    //技能
    person._b_skillArr = [];
    //自动选项
    person._b_automaticType = automaticType;
    //初始化技能
    person._r_skillIdArr.forEach(function (skillId) {
        this._b_skillArr.push(SkillFactory.buildOneSkill(skillId, person._b_automaticType));
    }.bind(this));

    //是否被控制
    person._b_isInControl = false;
    //控制持续时间
    person._b_controSurpluslTime = 0;

    //是否处于技能施放中
    person._b_isInUsing = false;

    //英雄的更新
    person.update = function (time) {
        if (person._b_controSurpluslTime === 0) {
            return;
        }
        person._b_controSurpluslTime = person._b_controSurpluslTime - time;
        if (person._b_controSurpluslTime <= 0) {
            person._b_controSurpluslTime = 0;
            person._b_isInControl = false;
        }
    };
    //全局暂停了游戏的回调
    person.pause = function () {

    };
    //全局重新开始游戏的回调
    person.resume = function () {

    };
    //全局开始游戏的回调
    person.start = function () {

    };
    //全局结束游戏的回调
    person.stop = function () {

    };

    /**
     * 英雄受伤回调
     * @param {*} hurtSkill 造成伤害的技能
     * @param {*} hurtFromPerson 造成伤害的来源
     */
    person.beHurtCb = function (hurtSkill, hurtFromPerson) {
        let hurtNumResult = 0;
        person.hp = person.hp - hurtNumResult;
        if (person.hp <= 0) {
            person.beDeadCb(hurtFromPerson);
        }
        hurtFromPerson.hurtCb(hurtSkill, hurtNumResult, person.hp <= 0);
    };

    /**
     * 死亡回调
     */
    person.beDeadCb = function (hurtFromPerson) {

    };

    /**
     * 伤害反馈回调，用于计算吸血的相关内容
     * @param {Boolean} isDead 是否造成对方死亡
     */
    person.hurtCb = function (hurtSkill, hurtNumResult, isDead) {

    };

    return person;
};

module.exports = outModule;