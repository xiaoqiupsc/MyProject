/*global module, require, cc, client */
var outModule = {};

//新建一个基础角色
outModule.createOneBasePerson = function (personId) {
    //先定义数据，方便查找
    this._r_roleId = personId;
    //技能
    this._r_skillIdArr = [];
    this._r_jsonData = g_JsonDataTool.getDataById('_table_hero_hero', personId);
    //处理数据
    this._r_unitName = this._r_jsonData.unitName || "";//角色名字
    this._r_unitType = this._r_jsonData.unitType || 1;//角色类型，1怪物 2英雄
    this._r_attributeType = this._r_jsonData.attributeType || 1;//属性类型
    this._r_icon = this._r_jsonData.icon;//头像Icon
    this._r_unitRes = this._r_jsonData.unitRes;//模型资源
    this._r_mainSkillId = this._r_jsonData.mainSkillId;//主攻技能id
    this._r_attackId = this._r_jsonData.attackId;//普攻技能id
    this._r_attackList = this._r_jsonData.attackList;//攻击序列
    this._r_attackRange = this._r_jsonData.attackRange;//攻击距离
    this._r_attackInterval = this._r_jsonData.attackInterval;//攻击间隔
    this._r_radius = this._r_jsonData.radius;//体积
    this._r_talent = this._r_jsonData.talent;//天赋
    this._r_scale = this._r_jsonData.scale;//缩放
    this._r_deathSound = this._r_jsonData.deathSound;//死亡音效
    this._r_moveSpeedC = this._r_jsonData.moveSpeedC;//移动速度修正
    this._r_attackSpeedC = this._r_jsonData.attackSpeedC;//攻击速度修正
    this._r_attackDamageC = this._r_jsonData.attackDamageC;//普通攻击力修正
    this._r_hpC = this._r_jsonData.hpC || 100;//hp修正
    this._r_mp1C = this._r_jsonData.mp1C || 0;//MP1修正
    this._r_hpRecoverC = this._r_jsonData.hpRecoverC || 0;//HP回复修正
    this._r_mp1RecoverC = this._r_jsonData.mp1RecoverC || 0;//MP1回复修正
    this._r_armorC = this._r_jsonData.armorC || 0;//护甲值修正
    this._r_armorIgnoreC = this._r_jsonData.armorIgnoreC || 0;//护甲忽略修正
    this._r_attackRangeC = this._r_jsonData.attackRangeC || 0;//攻击范围修正
    this._r_attackStrikeLevelC = this._r_jsonData.attackStrikeLevelC || 0;//普通攻击暴击等级修正
    this._r_attackStrikeDamageC = this._r_jsonData.attackStrikeDamageC || 0;//普通攻击暴击伤害修正
    this._r_attackStrikeResistanceC = this._r_jsonData.attackStrikeResistanceC || 0;//普通攻击暴击抗性修正
    this._r_attackDodgeC = this._r_jsonData.attackDodgeC || 0;//普通攻击闪躲修正
    this._r_attackHitC = this._r_jsonData.attackHitC || 0;//普通攻击命中修正
    this._r_skillDamageC = this._r_jsonData.skillDamageC || 0;//魔法攻击力修正
    this._r_skillResistanceC = this._r_jsonData.skillResistanceC || 0;//魔法抗性修正
    this._r_skillResistanceIgnoreC = this._r_jsonData.skillResistanceIgnoreC || 0;//魔抗忽视修正
    this._r_skillStrikeLevelC = this._r_jsonData.skillStrikeLevelC || 0;//魔法暴击等级修正
    this._r_skillStrikeDamageC = this._r_jsonData.skillStrikeDamageC || 0;//魔法攻击暴击伤害修正
    this._r_skillStrikeResistanceC = this._r_jsonData.skillStrikeResistanceC || 0;//魔法攻击暴击抗性修正
    this._r_skillDodgeLevelC = this._r_jsonData.skillDodgeLevelC || 0;//魔法攻击闪躲等级修正
    this._r_skillHitLevelC = this._r_jsonData.skillHitLevelC || 0;//魔法攻击命中等级修正
    this._r_suckBloodLevelC = this._r_jsonData.suckBloodLevelC || 0;//吸血等级修正
    this._r_buffResistantC = this._r_jsonData.buffResistantC || 0;//buff抗性修正

    //获取头像的spriteFrame
    this.getHeadIcon = function () {
        return g_SpriteFrameManager.getIcon(this._r_icon);
    };
};

module.exports = outModule;