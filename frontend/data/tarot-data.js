// 78张完整塔罗牌数据
// 22张大阿尔卡纳 + 56张小阿尔卡纳

export const MAJOR_ARCANA = [
  {
    id: 0,
    name: '愚者',
    nameEn: 'The Fool',
    roman: 0,
    keywords: ['新的开始', '冒险', '纯真', '自由', '无限可能'],
    meaning: {
      upright: '新的开始，冒险精神，纯真，自由，无限可能，信念飞跃',
      reversed: '鲁莽，轻率，冒险过度，缺乏计划，天真被利用'
    },
    element: '风',
    planet: '天王星',
    description: '愚者代表旅程的开始，怀揣梦想踏上未知的道路。'
  },
  {
    id: 1,
    name: '魔术师',
    nameEn: 'The Magician',
    roman: 'I',
    keywords: ['创造力', '显化', '意志力', '资源', '专注'],
    meaning: {
      upright: '创造力，显化能力，意志力，充分利用资源，专注目标',
      reversed: '操纵，欺骗，未开发潜能，分心，技能滥用'
    },
    element: '风',
    planet: '水星',
    description: '魔术师拥有将想法转化为现实的能力，四元素尽在其掌握。'
  },
  {
    id: 2,
    name: '女祭司',
    nameEn: 'The High Priestess',
    roman: 'II',
    keywords: ['直觉', '神秘', '内在知识', '潜意识', '静默'],
    meaning: {
      upright: '直觉，神秘知识，内在智慧，潜意识，耐心，接收',
      reversed: '秘密暴露，直觉受阻，表面化，忽视内在声音'
    },
    element: '水',
    planet: '月亮',
    description: '女祭司守护着实相与虚幻之间的面纱，引导向内探索。'
  },
  {
    id: 3,
    name: '女皇',
    nameEn: 'The Empress',
    roman: 'III',
    keywords: ['丰饶', '母性', '创造力', '自然', '感官享受'],
    meaning: {
      upright: '丰饶，母性，创造力，自然之美，感官享受，丰盛',
      reversed: '创造力受阻，过度依赖，忽视自我照顾，不孕'
    },
    element: '土',
    planet: '金星',
    description: '女皇象征大地的丰饶与母性的滋养，创造与孕育的能量。'
  },
  {
    id: 4,
    name: '皇帝',
    nameEn: 'The Emperor',
    roman: 'IV',
    keywords: ['权威', '结构', '父性', '秩序', '控制'],
    meaning: {
      upright: '权威，结构，父性能量，建立秩序，自律，控制',
      reversed: '专制，僵化，过度控制，父权问题，缺乏纪律'
    },
    element: '火',
    planet: '火星',
    description: '皇帝建立规则与结构，以稳固的意志守护疆土。'
  },
  {
    id: 5,
    name: '教皇',
    nameEn: 'The Hierophant',
    roman: 'V',
    keywords: ['传统', '信仰', '精神指引', '教育', '制度'],
    meaning: {
      upright: '传统，精神信仰，导师指引，正规教育，遵循制度',
      reversed: '反叛传统，打破规则，非传统信仰，个人灵性'
    },
    element: '土',
    planet: '木星',
    description: '教皇连接天与地，传递神圣的智慧与传统教义。'
  },
  {
    id: 6,
    name: '恋人',
    nameEn: 'The Lovers',
    roman: 'VI',
    keywords: ['爱情', '选择', '和谐', '关系', '价值观'],
    meaning: {
      upright: '爱情，重要选择，和谐关系，价值观一致，结合',
      reversed: '价值观冲突，错误选择，关系失衡，分离'
    },
    element: '风',
    planet: '金星',
    description: '恋人代表爱的结合，也象征人生重要的价值选择。'
  },
  {
    id: 7,
    name: '战车',
    nameEn: 'The Chariot',
    roman: 'VII',
    keywords: ['意志力', '胜利', '决心', '掌控', '前进'],
    meaning: {
      upright: '意志力，胜利，决心，掌控对立面，前进动力',
      reversed: '失控，缺乏方向，意志力薄弱，失败，侵略性'
    },
    element: '水',
    planet: '月亮',
    description: '战车以坚定的意志驾驭对立的力量，向着胜利前进。'
  },
  {
    id: 8,
    name: '力量',
    nameEn: 'Strength',
    roman: 'VIII',
    keywords: ['勇气', '耐心', '内在力量', '同情心', '影响力'],
    meaning: {
      upright: '内在力量，勇气，耐心，同情心，温柔的影响力',
      reversed: '软弱，失控，滥用力量，缺乏耐心，恐惧'
    },
    element: '火',
    planet: '太阳',
    description: '力量以柔克刚，用内在的 courage 驯服野兽。'
  },
  {
    id: 9,
    name: '隐士',
    nameEn: 'The Hermit',
    roman: 'IX',
    keywords: ['内省', '独处', '指引', '智慧', '寻找真理'],
    meaning: {
      upright: '内省，独处，寻找真理，内在指引，智慧老者',
      reversed: '孤独，孤立，退缩过度，迷失方向，拒绝指引'
    },
    element: '土',
    planet: '水星',
    description: '隐士提灯独行，在孤独中寻找内在的智慧之光。'
  },
  {
    id: 10,
    name: '命运之轮',
    nameEn: 'Wheel of Fortune',
    roman: 'X',
    keywords: ['命运', '周期', '转折点', '运气', '变化'],
    meaning: {
      upright: '命运转折，周期变化，好运，机会，业力循环',
      reversed: '厄运，抗拒改变，坏运气，被外力控制'
    },
    element: '火',
    planet: '木星',
    description: '命运之轮转动不息，提醒世事无常，顺势而为。'
  },
  {
    id: 11,
    name: '正义',
    nameEn: 'Justice',
    roman: 'XI',
    keywords: ['公正', '真理', '因果', '责任', '法律'],
    meaning: {
      upright: '公正，真理，因果报应，承担责任，法律事务',
      reversed: '不公，欺骗，逃避责任，法律纠纷，不诚实'
    },
    element: '风',
    planet: '金星',
    description: '正义之剑裁断是非，衡量因果，彰显真理。'
  },
  {
    id: 12,
    name: '倒吊人',
    nameEn: 'The Hanged Man',
    roman: 'XII',
    keywords: ['牺牲', '等待', '新视角', '暂停', '放手'],
    meaning: {
      upright: '牺牲，等待时机，新视角，暂停，放手，投降',
      reversed: '抗拒改变，无谓牺牲，拖延，停滞，固执'
    },
    element: '水',
    planet: '海王星',
    description: '倒吊人甘愿暂停，以换取全新的视角与领悟。'
  },
  {
    id: 13,
    name: '死神',
    nameEn: 'Death',
    roman: 'XIII',
    keywords: ['结束', '转变', '新生', '放手', '转型'],
    meaning: {
      upright: '结束，重大转变，放下过去，转型，新生',
      reversed: '抗拒结束，停滞，害怕改变，无法放手'
    },
    element: '水',
    planet: '冥王星',
    description: '死神带走旧有，为新生的到来腾出空间。'
  },
  {
    id: 14,
    name: '节制',
    nameEn: 'Temperance',
    roman: 'XIV',
    keywords: ['平衡', '调和', '耐心', '中庸', '炼金'],
    meaning: {
      upright: '平衡，调和对立，耐心，中庸之道，炼金转化',
      reversed: '失衡，极端，过度，缺乏耐心，不和谐'
    },
    element: '火',
    planet: '木星',
    description: '节制以炼金之术调和元素，寻求完美的平衡。'
  },
  {
    id: 15,
    name: '恶魔',
    nameEn: 'The Devil',
    roman: 'XV',
    keywords: ['束缚', '欲望', '物质主义', '阴影面', '成瘾'],
    meaning: {
      upright: '束缚，欲望，物质主义，面对阴影，成瘾模式',
      reversed: '释放束缚，打破枷锁，摆脱成瘾，重获自由'
    },
    element: '土',
    planet: '土星',
    description: '恶魔揭示我们的自我束缚，提醒自由始终在手。'
  },
  {
    id: 16,
    name: '高塔',
    nameEn: 'The Tower',
    roman: 'XVI',
    keywords: ['突变', '崩塌', '觉醒', '解放', '真相'],
    meaning: {
      upright: '突然变化，旧结构崩塌，觉醒，解放，真相大白',
      reversed: '避免灾难，延迟崩溃，内在转变，轻微动荡'
    },
    element: '火',
    planet: '火星',
    description: '高塔的崩塌摧毁虚假结构，为真理腾出空间。'
  },
  {
    id: 17,
    name: '星星',
    nameEn: 'The Star',
    roman: 'XVII',
    keywords: ['希望', '灵感', '宁静', '灵性', '疗愈'],
    meaning: {
      upright: '希望，灵感，内心宁静，灵性指引，疗愈',
      reversed: '绝望，缺乏信心，灵感枯竭，悲观，失去方向'
    },
    element: '风',
    planet: '天王星',
    description: '星星在黑暗中闪耀，带来希望与灵性的指引。'
  },
  {
    id: 18,
    name: '月亮',
    nameEn: 'The Moon',
    roman: 'XVIII',
    keywords: ['幻觉', '恐惧', '潜意识', '直觉', '未知'],
    meaning: {
      upright: '幻觉，恐惧面对，潜意识探索，直觉，未知领域',
      reversed: '恐惧消散，真相大白，困惑解除，情绪稳定'
    },
    element: '水',
    planet: '月亮',
    description: '月亮照亮潜意识深处，引导穿越恐惧与幻觉。'
  },
  {
    id: 19,
    name: '太阳',
    nameEn: 'The Sun',
    roman: 'XIX',
    keywords: ['快乐', '成功', '活力', '清晰', '正面能量'],
    meaning: {
      upright: '快乐，成功，活力，清晰，正面能量，童真',
      reversed: '暂时的阴霾，过度乐观，延迟的成功，自恋'
    },
    element: '火',
    planet: '太阳',
    description: '太阳普照万物，带来成功、快乐与生命的活力。'
  },
  {
    id: 20,
    name: '审判',
    nameEn: 'Judgement',
    roman: 'XX',
    keywords: ['重生', '觉醒', '清算', '宽恕', '召唤'],
    meaning: {
      upright: '重生，觉醒，生命清算，宽恕，听到召唤',
      reversed: '自我怀疑，拒绝召唤，逃避过去，内疚'
    },
    element: '火',
    planet: '冥王星',
    description: '审判的号角唤醒灵魂，召唤重生与自我实现。'
  },
  {
    id: 21,
    name: '世界',
    nameEn: 'The World',
    roman: 'XXI',
    keywords: ['完成', '圆满', '成就', '整合', '合一'],
    meaning: {
      upright: '完成，圆满，成就，整合，循环结束与开始',
      reversed: '未完成，延迟，缺乏 closure，空虚感，半途而废'
    },
    element: '土',
    planet: '土星',
    description: '世界象征旅程的圆满完成，同时也是新循环的开始。'
  }
];

// 小阿尔卡纳 - 权杖 (火元素)
export const WANDS = [
  { id: 22, suit: 'wands', number: 1, name: '权杖首牌', nameEn: 'Ace of Wands', element: '火', keywords: ['创造力', '灵感', '新开始', '热情'], meaning: { upright: '创造力的火花，灵感涌现，新的激情项目开始', reversed: '创意阻塞，延迟开始，缺乏动力' } },
  { id: 23, suit: 'wands', number: 2, name: '权杖二', nameEn: 'Two of Wands', element: '火', keywords: ['规划', '决策', '远见', '合作'], meaning: { upright: '未来规划，重要决策，远见卓识，初步成功', reversed: '害怕冒险，计划不周，犹豫不决' } },
  { id: 24, suit: 'wands', number: 3, name: '权杖三', nameEn: 'Three of Wands', element: '火', keywords: ['扩张', '远见', '探索', '等待成果'], meaning: { upright: '事业扩张，远见实现，探索新领域，等待回报', reversed: '延迟，阻碍，缺乏远见，问题浮现' } },
  { id: 25, suit: 'wands', number: 4, name: '权杖四', nameEn: 'Four of Wands', element: '火', keywords: ['庆祝', '稳定', '社区', '成就'], meaning: { upright: '庆祝成功，建立稳定基础，社区支持，里程碑', reversed: '不稳定，缺乏支持，庆祝延迟，不和谐' } },
  { id: 26, suit: 'wands', number: 5, name: '权杖五', nameEn: 'Five of Wands', element: '火', keywords: ['冲突', '竞争', '挑战', '多样'], meaning: { upright: '健康竞争，冲突挑战，多样观点，活力', reversed: '避免冲突，内斗，不公平竞争，和解' } },
  { id: 27, suit: 'wands', number: 6, name: '权杖六', nameEn: 'Six of Wands', element: '火', keywords: ['胜利', '认可', '自信', '进展'], meaning: { upright: '公众认可，胜利，自信，好消息，进展', reversed: '自负，延迟认可，骄傲自满，失败恐惧' } },
  { id: 28, suit: 'wands', number: 7, name: '权杖七', nameEn: 'Seven of Wands', element: '火', keywords: ['防御', '坚持', '立场', '勇气'], meaning: { upright: '坚持立场，面对挑战，防御成功，勇气', reversed: '不堪重负，放弃，无法辩护，疲惫' } },
  { id: 29, suit: 'wands', number: 8, name: '权杖八', nameEn: 'Eight of Wands', element: '火', keywords: ['速度', '行动', '进展', '消息'], meaning: { upright: '快速进展，及时消息， momentum，旅行', reversed: '延迟，阻碍，混乱，方向错误' } },
  { id: 30, suit: 'wands', number: 9, name: '权杖九', nameEn: 'Nine of Wands', element: '火', keywords: ['韧性', '准备', '防御', '最后坚持'], meaning: { upright: '韧性，最后努力，准备，防御姿态，经验', reversed: '精疲力竭，固执，防御过度，放弃' } },
  { id: 31, suit: 'wands', number: 10, name: '权杖十', nameEn: 'Ten of Wands', element: '火', keywords: ['负担', '责任', '压力', '完成'], meaning: { upright: '承担责任，完成目标，压力，辛勤工作', reversed: '负担过重，无法 delegate， burnout，放手' } },
  { id: 32, suit: 'wands', number: 11, name: '权杖侍从', nameEn: 'Page of Wands', element: '火', keywords: ['探索', '热情', '发现', '自由'], meaning: { upright: '新想法，探索热情，自由精神，好消息', reversed: '坏消息，冲动，缺乏方向，拖延' } },
  { id: 33, suit: 'wands', number: 12, name: '权杖骑士', nameEn: 'Knight of Wands', element: '火', keywords: ['冒险', '冲动', '魅力', '行动'], meaning: { upright: '冒险精神，冲动行动，魅力，旅行，勇敢', reversed: '鲁莽，冲动，愤怒，不稳定，延迟' } },
  { id: 34, suit: 'wands', number: 13, name: '权杖王后', nameEn: 'Queen of Wands', element: '火', keywords: ['自信', '热情', '独立', '社交'], meaning: { upright: '自信魅力，热情独立，社交能力，决断力', reversed: '自我怀疑，嫉妒，攻击性，不忠' } },
  { id: 35, suit: 'wands', number: 14, name: '权杖国王', nameEn: 'King of Wands', element: '火', keywords: ['领导力', '远见', '企业家', '魅力'], meaning: { upright: '领导魅力，商业远见，创业精神，专业', reversed: '冲动领导，暴政，傲慢，无情' } }
];

// 小阿尔卡纳 - 圣杯 (水元素)
export const CUPS = [
  { id: 36, suit: 'cups', number: 1, name: '圣杯首牌', nameEn: 'Ace of Cups', element: '水', keywords: ['爱', '情感', '直觉', '灵性'], meaning: { upright: '新的情感开始，爱的涌现，直觉开启，灵性觉醒', reversed: '情感阻塞，空虚，情绪压抑，失去连接' } },
  { id: 37, suit: 'cups', number: 2, name: '圣杯二', nameEn: 'Two of Cups', element: '水', keywords: ['伴侣', '和谐', '结合', '吸引'], meaning: { upright: '伴侣关系，和谐结合，相互吸引，伙伴关系', reversed: '关系失衡，分手，不和谐，价值观冲突' } },
  { id: 38, suit: 'cups', number: 3, name: '圣杯三', nameEn: 'Three of Cups', element: '水', keywords: ['庆祝', '友谊', '社群', '快乐'], meaning: { upright: '与朋友庆祝，社群支持，喜悦，团聚', reversed: '八卦，孤立，过度放纵，冲突' } },
  { id: 39, suit: 'cups', number: 4, name: '圣杯四', nameEn: 'Four of Cups', element: '水', keywords: ['冥想', '不满', '重新评估', '冷漠'], meaning: { upright: '内省，不满现状，重新评估，冥想', reversed: '觉醒，新机会，意识扩展，行动' } },
  { id: 40, suit: 'cups', number: 5, name: '圣杯五', nameEn: 'Five of Cups', element: '水', keywords: ['失落', '悲伤', '失望', '哀悼'], meaning: { upright: '失落悲伤，哀悼，失望，关注失去', reversed: '接受失去，治愈，看到希望，继续前行' } },
  { id: 41, suit: 'cups', number: 6, name: '圣杯六', nameEn: 'Six of Cups', element: '水', keywords: ['怀旧', '回忆', '纯真', '礼物'], meaning: { upright: '怀旧回忆，童年纯真，简单快乐，礼物', reversed: '被困在过去，不成熟，逃避现实，停滞' } },
  { id: 42, suit: 'cups', number: 7, name: '圣杯七', nameEn: 'Seven of Cups', element: '水', keywords: ['选择', '幻想', '梦想', '幻觉'], meaning: { upright: '众多选择，幻想梦想，愿望，想象', reversed: '选择过多，幻觉破灭，现实检查，决断' } },
  { id: 43, suit: 'cups', number: 8, name: '圣杯八', nameEn: 'Eight of Cups', element: '水', keywords: ['离开', '放下', '寻找', '失望'], meaning: { upright: '离开寻找更多，放下过去，追求更高目标', reversed: '害怕改变，停滞，回避问题，妥协' } },
  { id: 44, suit: 'cups', number: 9, name: '圣杯九', nameEn: 'Nine of Cups', element: '水', keywords: ['满足', '愿望', '幸福', '享受'], meaning: { upright: '愿望实现，情感满足，幸福，享受成果', reversed: '不满，空虚，过度放纵，缺乏深度' } },
  { id: 45, suit: 'cups', number: 10, name: '圣杯十', nameEn: 'Ten of Cups', element: '水', keywords: ['家庭', '和谐', '幸福', '圆满'], meaning: { upright: '家庭和谐，情感圆满，长久幸福，灵魂伴侣', reversed: '家庭问题，关系破裂，不和谐，虚假幸福' } },
  { id: 46, suit: 'cups', number: 11, name: '圣杯侍从', nameEn: 'Page of Cups', element: '水', keywords: ['信使', '创意', '直觉', '敏感'], meaning: { upright: '创意消息，直觉增强，浪漫讯息，敏感', reversed: '情感不成熟，过度敏感，坏消息，幻想' } },
  { id: 47, suit: 'cups', number: 12, name: '圣杯骑士', nameEn: 'Knight of Cups', element: '水', keywords: ['浪漫', '追求', '魅力', '邀请'], meaning: { upright: '浪漫追求者，魅力邀请，艺术家气质，提议', reversed: '不可靠，情绪化，逃避，承诺恐惧' } },
  { id: 48, suit: 'cups', number: 13, name: '圣杯王后', nameEn: 'Queen of Cups', element: '水', keywords: ['同情', '直觉', '温柔', '心灵'], meaning: { upright: '高度直觉，同情心，情感深度，温柔力量', reversed: '情绪失控，过度敏感，依赖，情绪操纵' } },
  { id: 49, suit: 'cups', number: 14, name: '圣杯国王', nameEn: 'King of Cups', element: '水', keywords: ['掌控', '智慧', '平衡', '外交'], meaning: { upright: '情感掌控，智慧平衡，外交手腕，慈悲', reversed: '情绪操控，冷漠，情绪爆发，不诚实' } }
];

// 小阿尔卡纳 - 宝剑 (风元素)
export const SWORDS = [
  { id: 50, suit: 'swords', number: 1, name: '宝剑首牌', nameEn: 'Ace of Swords', element: '风', keywords: ['突破', '清晰', '真相', '力量'], meaning: { upright: '心智突破，思维清晰，真理，力量，正义', reversed: '混乱，错误想法，缺乏沟通，误导' } },
  { id: 51, suit: 'swords', number: 2, name: '宝剑二', nameEn: 'Two of Swords', element: '风', keywords: ['僵局', '选择', '平衡', '回避'], meaning: { upright: '困难选择，僵局，平衡对立，回避决定', reversed: '信息过载，犹豫结束，看清真相，决断' } },
  { id: 52, suit: 'swords', number: 3, name: '宝剑三', nameEn: 'Three of Swords', element: '风', keywords: ['心碎', '悲伤', '痛苦', '释放'], meaning: { upright: '心碎，悲伤，痛苦经历，接受疗愈', reversed: '治愈开始，释放痛苦，宽恕，乐观' } },
  { id: 53, suit: 'swords', number: 4, name: '宝剑四', nameEn: 'Four of Swords', element: '风', keywords: ['休息', '恢复', '冥想', '沉思'], meaning: { upright: '休息恢复，冥想沉思，疗愈，暂停', reversed: '不安，缺乏进展，焦躁， burnout' } },
  { id: 54, suit: 'swords', number: 5, name: '宝剑五', nameEn: 'Five of Swords', element: '风', keywords: ['冲突', '胜利', '背叛', '损失'], meaning: { upright: '冲突胜利， pyrrhic victory，背叛，自私', reversed: '和解，过去冲突，妥协，沟通' } },
  { id: 55, suit: 'swords', number: 6, name: '宝剑六', nameEn: 'Six of Swords', element: '风', keywords: ['过渡', '移动', '疗愈', '改变'], meaning: { upright: '过渡时期，离开困难，疗愈之旅，改变', reversed: '抗拒改变，停滞，未完成过渡，延迟' } },
  { id: 56, suit: 'swords', number: 7, name: '宝剑七', nameEn: 'Seven of Swords', element: '风', keywords: ['欺骗', '策略', '偷偷', '变通'], meaning: { upright: '欺骗，偷偷摸摸，策略行为，变通', reversed: '诚实，坦白，策略失败，内疚' } },
  { id: 57, suit: 'swords', number: 8, name: '宝剑八', nameEn: 'Eight of Swords', element: '风', keywords: ['束缚', '限制', '无助', '恐惧'], meaning: { upright: '自我束缚，感觉被困，限制，恐惧', reversed: '解放，释放，新视角，自由' } },
  { id: 58, suit: 'swords', number: 9, name: '宝剑九', nameEn: 'Nine of Swords', element: '风', keywords: ['焦虑', '噩梦', '恐惧', '忧虑'], meaning: { upright: '焦虑，噩梦，恐惧，担忧，内疚', reversed: '希望， reaching out，绝望结束，疗愈' } },
  { id: 59, suit: 'swords', number: 10, name: '宝剑十', nameEn: 'Ten of Swords', element: '风', keywords: ['结束', '失败', '背叛', '痛苦'], meaning: { upright: '痛苦的结束，背叛，失败， rock bottom', reversed: '复苏，重生，幸存，结束是新的开始' } },
  { id: 60, suit: 'swords', number: 11, name: '宝剑侍从', nameEn: 'Page of Swords', element: '风', keywords: ['好奇', '沟通', '警觉', '新想法'], meaning: { upright: '好奇心，新想法，沟通，警觉，诚实', reversed: '八卦，欺骗，冲动，无准备' } },
  { id: 61, suit: 'swords', number: 12, name: '宝剑骑士', nameEn: 'Knight of Swords', element: '风', keywords: ['行动', '冲动', '辩论', '速度'], meaning: { upright: '快速行动，果断，辩论， ambition', reversed: '鲁莽，愤怒，破坏，无方向' } },
  { id: 62, suit: 'swords', number: 13, name: '宝剑王后', nameEn: 'Queen of Swords', element: '风', keywords: ['独立', '清晰', '诚实', '智慧'], meaning: { upright: '独立，思维清晰，诚实，经验智慧', reversed: '冷漠，苛刻，过于理性，苦涩' } },
  { id: 63, suit: 'swords', number: 14, name: '宝剑国王', nameEn: 'King of Swords', element: '风', keywords: ['权威', '真相', '理智', '公正'], meaning: { upright: '心智权威，追求真相，公正，理性', reversed: '操纵，残酷，混乱，不公正' } }
];

// 小阿尔卡纳 - 星币 (土元素)
export const PENTACLES = [
  { id: 64, suit: 'pentacles', number: 1, name: '星币首牌', nameEn: 'Ace of Pentacles', element: '土', keywords: ['机会', '繁荣', '显化', '新投资'], meaning: { upright: '新财务机会，繁荣，显化，物质丰盛', reversed: '错失机会，贪婪，财务损失，缺乏规划' } },
  { id: 65, suit: 'pentacles', number: 2, name: '星币二', nameEn: 'Two of Pentacles', element: '土', keywords: ['平衡', '适应', '时间管理', '多任务'], meaning: { upright: '多重责任，平衡，适应，时间管理', reversed: ' overwhelmed，混乱，过度承诺， disorganization' } },
  { id: 66, suit: 'pentacles', number: 3, name: '星币三', nameEn: 'Three of Pentacles', element: '土', keywords: ['合作', '技能', '学习', '团队'], meaning: { upright: '团队合作，技能发展，学习，专业认可', reversed: '缺乏合作，技能不足，平庸，冲突' } },
  { id: 67, suit: 'pentacles', number: 4, name: '星币四', nameEn: 'Four of Pentacles', element: '土', keywords: ['控制', '稳定', '保守', '占有欲'], meaning: { upright: '财务控制，稳定，储蓄，保守', reversed: '贪婪，物质主义，自我隔离，放手' } },
  { id: 68, suit: 'pentacles', number: 5, name: '星币五', nameEn: 'Five of Pentacles', element: '土', keywords: ['困难', '贫困', '孤立', '损失'], meaning: { upright: '财务困难，贫困，孤立，健康担忧', reversed: '恢复，困难结束，新希望，帮助可得' } },
  { id: 69, suit: 'pentacles', number: 6, name: '星币六', nameEn: 'Six of Pentacles', element: '土', keywords: ['给予', '慷慨', '分享', '慈善'], meaning: { upright: '慷慨给予，分享财富，慈善，公平', reversed: '债务，自私， strings attached，不平等' } },
  { id: 70, suit: 'pentacles', number: 7, name: '星币七', nameEn: 'Seven of Pentacles', element: '土', keywords: ['评估', '耐心', '成长', '投资'], meaning: { upright: '评估进展，耐心等待，长期视角，耕耘', reversed: ' impatience，缺乏成长，沮丧，浪费努力' } },
  { id: 71, suit: 'pentacles', number: 8, name: '星币八', nameEn: 'Eight of Pentacles', element: '土', keywords: ['技能', '工作', '学徒', '精通'], meaning: { upright: '技能发展，努力工作，学徒期，精通', reversed: ' self-doubt，缺乏专注，无进展， mediocrity' } },
  { id: 72, suit: 'pentacles', number: 9, name: '星币九', nameEn: 'Nine of Pentacles', element: '土', keywords: ['独立', '奢侈', '自给', '享受'], meaning: { upright: '财务独立，享受成果，自给自足，奢华', reversed: '炫耀，过度消费，依赖，缺乏自律' } },
  { id: 73, suit: 'pentacles', number: 10, name: '星币十', nameEn: 'Ten of Pentacles', element: '土', keywords: ['遗产', '家庭', '长期', '财富'], meaning: { upright: '家庭财富，长期安全，遗产，继承', reversed: '家庭冲突，财务风险，短期思维，不稳定' } },
  { id: 74, suit: 'pentacles', number: 11, name: '星币侍从', nameEn: 'Page of Pentacles', element: '土', keywords: ['学习', '机会', '野心', '务实'], meaning: { upright: '新学习机会，野心，务实，好消息', reversed: '缺乏进展，错失机会，坏消息，拖延' } },
  { id: 75, suit: 'pentacles', number: 12, name: '星币骑士', nameEn: 'Knight of Pentacles', element: '土', keywords: ['勤奋', '责任', '可靠', '坚持'], meaning: { upright: '勤奋工作，责任感，可靠，坚持方法', reversed: '无聊，停滞，固执，完美主义' } },
  { id: 76, suit: 'pentacles', number: 13, name: '星币王后', nameEn: 'Queen of Pentacles', element: '土', keywords: ['养育', '务实', '丰盛', '照顾'], meaning: { upright: '养育关怀，务实态度，丰盛，照顾他人', reversed: '工作家庭失衡，自我忽视，财务不安全' } },
  { id: 77, suit: 'pentacles', number: 14, name: '星币国王', nameEn: 'King of Pentacles', element: '土', keywords: ['成功', '领导', '稳定', '商业'], meaning: { upright: '商业成功，稳定领导，慷慨，可靠', reversed: '贪婪，物质主义，腐败，财务损失' } }
];

// 导出完整牌组
export const TAROT_DECK = [
  ...MAJOR_ARCANA,
  ...WANDS,
  ...CUPS,
  ...SWORDS,
  ...PENTACLES
];

// 牌阵定义
export const SPREADS = {
  single: {
    id: 'single',
    name: '单张牌阵',
    nameEn: 'Single Card',
    description: '最简洁的占卜方式，回答一个具体问题',
    positions: [
      { name: '核心讯息', description: '当下最重要的指引' }
    ]
  },
  three: {
    id: 'three',
    name: '三张牌阵',
    nameEn: 'Three Cards',
    description: '探索过去、现在、未来的时间流',
    positions: [
      { name: '过去', description: '影响现状的过往因素' },
      { name: '现在', description: '当前的状况与能量' },
      { name: '未来', description: '可能的走向与结果' }
    ]
  },
  relationship: {
    id: 'relationship',
    name: '关系牌阵',
    nameEn: 'Relationship Spread',
    description: '探索两个人的关系动态',
    positions: [
      { name: '你的状态', description: '你在这段关系中的状态' },
      { name: '对方状态', description: '对方在这段关系中的状态' },
      { name: '关系现状', description: '两人关系的当前状态' },
      { name: '挑战', description: '关系面临的挑战' },
      { name: '建议', description: '改善关系的建议' }
    ]
  },
  decision: {
    id: 'decision',
    name: '二选一牌阵',
    nameEn: 'Decision Spread',
    description: '帮助在两个选项中做出选择',
    positions: [
      { name: '现状', description: '当前的整体状况' },
      { name: '选择A现状', description: '选择A的当前情况' },
      { name: '选择A结果', description: '选择A的可能结果' },
      { name: '选择B现状', description: '选择B的当前情况' },
      { name: '选择B结果', description: '选择B的可能结果' },
      { name: '建议', description: '做出选择的建议' }
    ]
  },
  career: {
    id: 'career',
    name: '事业牌阵',
    nameEn: 'Career Spread',
    description: '探索事业发展的六个维度',
    positions: [
      { name: '当前状况', description: '事业现状' },
      { name: '你的优势', description: '你的核心优势' },
      { name: '障碍', description: '面临的障碍' },
      { name: '短期发展', description: '近期的发展' },
      { name: '长期展望', description: '长远的前景' },
      { name: '行动建议', description: '应该采取的行动' }
    ]
  },
  celtic: {
    id: 'celtic',
    name: '凯尔特十字',
    nameEn: 'Celtic Cross',
    description: '最经典的十张牌阵，深入探索问题',
    positions: [
      { name: '现状', description: '当前的核心状况' },
      { name: '挑战', description: '面临的阻碍或助力' },
      { name: '过去', description: '近期的过去基础' },
      { name: '未来', description: '即将发生的事' },
      { name: '目标', description: '你期望达成的结果' },
      { name: '潜意识', description: '隐藏的影响因素' },
      { name: '建议', description: '应当采取的态度' },
      { name: '环境', description: '外部环境与他人的影响' },
      { name: '希望/恐惧', description: '你的期望或担忧' },
      { name: '结果', description: '最终的走向' }
    ]
  }
};

// 获取随机牌的函数
export function drawCards(count = 1, allowReversed = true) {
  const deck = [...TAROT_DECK];
  const drawn = [];
  
  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * deck.length);
    const card = deck.splice(randomIndex, 1)[0];
    
    drawn.push({
      ...card,
      isReversed: allowReversed ? Math.random() > 0.5 : false,
      timestamp: Date.now()
    });
  }
  
  return drawn;
}

// 洗牌动画模拟
export function simulateShuffle() {
  return new Promise((resolve) => {
    setTimeout(resolve, 1500); // 1.5秒洗牌动画
  });
}

export default TAROT_DECK;
