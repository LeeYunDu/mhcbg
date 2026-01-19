export const Conners = {
  "questionnaire_name": "Conners父母用量表",
  "questionnaire_code": "CONNERS_PARENT_48",
  "version": "标准48题版",
  "scoring_system": {
    "scale_type": "李克特四级量表",
    "levels": [
      { "label": "无", "score": 0 },
      { "label": "稍有", "score": 1 },
      { "label": "相当多", "score": 2 },
      { "label": "很多", "score": 3 }
    ],
    "calculation_method": "因子平均分"
  },
  "factors": [
    {
      "factor_code": "CONDUCT_PROBLEM",
      "factor_name": "品行问题",
      "description": "反映儿童的反社会行为和攻击性行为",
      "questions": [
        { "id": 2, "content": "对大人粗鲁无礼" },
        { "id": 14, "content": "破坏性" },
        { "id": 19, "content": "抵赖错误或归罪他人" },
        { "id": 20, "content": "好争吵" },
        { "id": 22, "content": "偷窃" },
        { "id": 23, "content": "不服从或勉强服从" },
        { "id": 27, "content": "欺凌别人" },
        { "id": 29, "content": "残忍" },
        { "id": 35, "content": "经常打架" }
      ],
      "threshold": 1.5,
      "clinical_meaning": "得分＞1.5提示可能存在品行问题"
    },
    {
      "factor_code": "LEARNING_PROBLEM",
      "factor_name": "学习问题",
      "description": "反映儿童的学习困难和注意力问题",
      "questions": [
        { "id": 10, "content": "学习困难" },
        { "id": 25, "content": "做事有始无终" },
        { "id": 31, "content": "容易分心或注意不集中成为一个问题" },
        { "id": 37, "content": "在努力中容易泄气" }
      ],
      "threshold": 1.5,
      "clinical_meaning": "得分＞1.5提示学习困难和注意力缺陷"
    },
    {
      "factor_code": "PSYCHOSOMATIC",
      "factor_name": "心身问题",
      "description": "反映与情绪相关的躯体不适症状",
      "questions": [
        { "id": 32, "content": "头痛" },
        { "id": 33, "content": "情绪变化迅速剧烈" },
        { "id": 40, "content": "有饮食问题（食欲不佳、进食中常跑开）" },
        { "id": 41, "content": "胃痛" },
        { "id": 42, "content": "有睡眠问题（不能入睡、早醒、夜间起床）" },
        { "id": 43, "content": "其他疼痛" },
        { "id": 44, "content": "呕吐或恶心" },
        { "id": 48, "content": "有大便问题（腹泻、排便不规则、便秘）" }
      ],
      "threshold": 1.5,
      "clinical_meaning": "得分＞1.5提示存在心身症状"
    },
    {
      "factor_code": "HYPERACTIVITY_IMPULSIVITY",
      "factor_name": "冲动-多动",
      "description": "反映儿童的多动、冲动和不安行为",
      "questions": [
        { "id": 4, "content": "易兴奋，易冲动" },
        { "id": 5, "content": "爱指手划脚" },
        { "id": 11, "content": "扭动不安" },
        { "id": 13, "content": "坐立不定，经常'忙碌'" },
        { "id": 17, "content": "造成的麻烦比同龄孩子多" },
        { "id": 28, "content": "不能停止重复性活动" }
      ],
      "threshold": 1.5,
      "clinical_meaning": "得分＞1.5提示多动冲动症状"
    },
    {
      "factor_code": "ANXIETY",
      "factor_name": "焦虑",
      "description": "反映儿童的焦虑、恐惧和羞怯情绪",
      "questions": [
        { "id": 12, "content": "惧怕（新环境、陌生人、陌生地方、上学）" },
        { "id": 16, "content": "怕羞" },
        { "id": 24, "content": "忧虑比别人多（忧虑、孤独、疾病、死亡）" },
        { "id": 47, "content": "让自己受别人欺骗" }
      ],
      "threshold": 1.5,
      "clinical_meaning": "得分＞1.5提示焦虑情绪问题"
    }
  ],
  "indices": [
    {
      "index_code": "HYPERACTIVITY_INDEX",
      "index_name": "多动指数",
      "description": "诊断多动症的核心指标，由10个关键题目组成",
      "questions": [
        { "id": 4, "content": "易兴奋，易冲动" },
        { "id": 7, "content": "容易或经常哭叫" },
        { "id": 8, "content": "脾气很大" },
        { "id": 13, "content": "坐立不定，经常'忙碌'" },
        { "id": 14, "content": "破坏性" },
        { "id": 19, "content": "抵赖错误或归罪他人" },
        { "id": 20, "content": "好争吵" },
        { "id": 25, "content": "做事有始无终" },
        { "id": 27, "content": "欺凌别人" },
        { "id": 31, "content": "容易分心或注意不集中成为一个问题" },
        { "id": 33, "content": "情绪变化迅速剧烈" },
        { "id": 34, "content": "不喜欢或不遵从纪律或约束" },
        { "id": 35, "content": "经常打架" }
      ],
      "threshold": 1.5,
      "clinical_meaning": "得分＞1.5提示可能存在注意缺陷多动障碍(ADHD)"
    }
  ],
  "unclassified_questions": [
    { "id": 1, "content": "某种小动作（如咬指甲、吸手指、拉头发、拉衣服上的布毛）" },
    { "id": 3, "content": "在交朋友或保持友谊上存在问题" },
    { "id": 6, "content": "吸吮或咬嚼（拇指、衣服、毯子）" },
    { "id": 9, "content": "白日梦" },
    { "id": 15, "content": "撒谎或捏造情节" },
    { "id": 18, "content": "说话与同龄儿童不同（像婴儿说话、口吃、别人不易听懂）" },
    { "id": 21, "content": "撅嘴和生气" },
    { "id": 26, "content": "感情易受损害" },
    { "id": 30, "content": "稚气或不成熟（自己会的事要人帮忙，依缠别人，常需别人鼓励、支持）" },
    { "id": 36, "content": "与兄弟姐妹不能很好相处" },
    { "id": 38, "content": "妨害其他儿童" },
    { "id": 39, "content": "基本上是一个不愉快的小孩" },
    { "id": 45, "content": "感到在家庭圈子中被欺骗" },
    { "id": 46, "content": "自夸和吹牛" }
  ],
  "scoring_rules": {
    "factor_score_calculation": "因子分 = 该因子下所有题目得分之和 ÷ 题目数量",
    "hyperactivity_index_calculation": "多动指数 = 核心题目得分之和 ÷ 核心题目数量",
    "clinical_interpretation": "因子分或指数分＞1.5分提示可能存在相关问题，建议专业评估"
  }
}

let sqlJSON = {
  "dimensions": [
    {
      "code": "CONDUCT_PROBLEM",
      "name": "品行问题",
      "description": "反映儿童的反社会行为和攻击性行为",
      "questions": [2, 14, 19, 20, 22, 23, 27, 29, 35],
      "sort_order": 1
    },
    {
      "code": "LEARNING_PROBLEM",
      "name": "学习问题",
      "description": "反映儿童的学习困难和注意力问题",
      "questions": [10, 25, 31, 37],
      "sort_order": 2
    },
    {
      "code": "PSYCHOSOMATIC",
      "name": "心身问题",
      "description": "反映与情绪相关的躯体不适症状",
      "questions": [32, 33, 40, 41, 42, 43, 44, 48],
      "sort_order": 3
    },
    {
      "code": "HYPERACTIVITY_IMPULSIVITY",
      "name": "冲动-多动",
      "description": "反映儿童的多动、冲动和不安行为",
      "questions": [4, 5, 11, 13, 17, 28],
      "sort_order": 4
    },
    {
      "code": "ANXIETY",
      "name": "焦虑",
      "description": "反映儿童的焦虑、恐惧和羞怯情绪",
      "questions": [12, 16, 24, 47],
      "sort_order": 5
    }
  ],
  "special_index": {
    "code": "HYPERACTIVITY_INDEX",
    "name": "多动指数",
    "description": "诊断多动症的核心指标",
    "questions": [4, 7, 8, 13, 14, 19, 20, 25, 27, 31, 33, 34, 35],
    "is_core_index": true
  }
}