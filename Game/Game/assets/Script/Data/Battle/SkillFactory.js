/*global module, require, cc, client */
/**
 * @desc 技能工厂
 * @author Administrator
 */

var SkillControl = require('SkillControl');

var outModule = {};

/**
 * 新建一个技能
 * 普通攻击也是一个技能
 * @param skillId
 * @param automaticType 自动释放技能的逻辑
 */
outModule.buildOneSkill = function (skillId, automaticType) {
    //技能冷却时间
    this._skillTime = 0;
    //技能发起剩余时间
    this.skillSurplusTime = 0;
    //自动技能逻辑
    this._automaticType = automaticType;
    //技能数据
    this._jsonData = g_JsonDataTool.getDataById("_table_head_icon_icon", skillId);

    //是否处于技能施放中
    this._isInUsing = false;
    //技能施放剩余时间
    this.inUsingSurplusTime = 0;

    //定时更新函数
    this.update = function (time, personData) {
        //这边更新技能时间
        this.skillSurplusTime = this.skillSurplusTime - time;
        if (this.inUsingSurplusTime > 0 && this.inUsingSurplusTime <= time) {
            //默认规定是同时只能吟唱一个技能
            personData._b_isInUsing = false;
            this.inUsingSurplusTime = 0;
        } else {
            this.inUsingSurplusTime = this.inUsingSurplusTime - time;
        }
        if (this.skillSurplusTime <= 0) {
            this.skillSurplusTime = 0;
            //判断要不要执行技能
            if (personData._b_isInControl) {
                return;
            }
            if (personData._b_isInUsing) {
                return;
            }
            if (SkillControl.judgeUseSkill(this, personData)) {
                this.useSkill();
            }
        }
    };

    this.useSkill = function () {

    };
};

//创建普通技能
outModule.buildAttackSkill = function (attackSpeed, moveSpeed) {
    //技能冷却时间
    this._skillTime = attackSpeed / 1000;
    this._moveSpeed = moveSpeed;
    //技能发起剩余时间
    this.skillSurplusTime = 0;
    //技能数据
    //this._jsonData = g_JsonDataTool.getDataById("_table_head_icon_icon", skillId);

    //是否处于技能施放中
    this._isInUsing = false;
    //技能施放剩余时间
    this.inUsingSurplusTime = 0;

    this._automaticType = g_AUTOMATIC_TYPE_OBJ.TYPE_1;

    //定时更新函数
    this.update = function (time, personData) {
        //这边更新技能时间
        this.skillSurplusTime = this.skillSurplusTime - time;
        if (this.inUsingSurplusTime <= time) {
            //默认规定是同时只能吟唱一个技能
            personData._b_isInUsing = false;
            this.inUsingSurplusTime = 0;
        } else {
            this.inUsingSurplusTime = this.inUsingSurplusTime - time;
        }
        if (this.skillSurplusTime <= 0) {
            this.skillSurplusTime = 0;
            //判断要不要执行技能
            if (personData._b_isInControl) {
                return;
            }
            if (personData._b_isInUsing) {
                return;
            }
            if (SkillControl.judgeUseSkill(this, personData)) {
                this.useSkill();
            } else {
                //不行的话就移动
                personData.move();
            }
        }
    };

    this.useSkill = function () {

    };
};

module.exports = outModule;
