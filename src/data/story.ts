import { Scene } from '../types/story';
import { assets } from '../config/assets';

export const STORY_DATA: Record<string, Scene> = {
  start: {
    id: 'start',
    dialogue: [
      {
        text: 'Тихое праздничное утро. Скоро начнется семейный день рождения...',
        speaker: undefined,
        background: 'loading',
        effect: 'darken',
        overlayText: 'СЮЖЕТНЫЙ РЕЖИМ'
      },
      {
        text: 'Каждый такой день — это новые улыбки, тёплые воспоминания и, конечно, любимые локальные мемы.',
        speaker: undefined,
        background: 'loading',
        effect: 'darken'
      },
      {
        text: 'Приготовьтесь к небольшому, уютному приключению. Поехали!',
        speaker: undefined,
        background: 'loading',
        effect: 'darken'
      }
    ],
    nextSceneId: 'scene_1_sleep'
  },
  scene_1_sleep: {
    id: 'scene_1_sleep',
    dialogue: [
      {
        text: 'Тёплый день. Море где-то впереди.',
        speaker: undefined,
        background: assets.backgrounds.abkhazia
      },
      {
        text: 'Влад идёт на пляж с родителями.',
        speaker: undefined,
        background: assets.backgrounds.abkhazia
      },
      {
        text: 'Ну вроде всё нормально. Идём, идём...',
        speaker: 'Влад',
        background: assets.backgrounds.abkhazia,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'center',
            isSpeaking: true,
            scale: 1.15,
            heightVh: 80,
            anchor: 'bottom'
          }
        ]
      },
      {
        text: 'Идут они, идут. Идут. Идут ещё немного.',
        speaker: undefined,
        background: assets.backgrounds.abkhazia,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'center',
            isSpeaking: false,
            scale: 1.15,
            heightVh: 80,
            anchor: 'bottom'
          }
        ]
      },
      {
        text: 'Так.',
        speaker: 'Влад',
        background: assets.backgrounds.abkhazia,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'frustrated',
            position: 'center',
            isSpeaking: true,
            scale: 1.15,
            heightVh: 80,
            anchor: 'bottom'
          }
        ]
      },
      {
        text: 'В какой-то момент Влад оборачивается.',
        speaker: undefined,
        background: assets.backgrounds.abkhazia,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'frustrated',
            position: 'center',
            isSpeaking: false,
            scale: 1.15,
            heightVh: 80,
            anchor: 'bottom'
          }
        ]
      },
      {
        text: 'А где все?',
        speaker: 'Влад',
        background: assets.backgrounds.abkhazia,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'shock',
            position: 'center',
            isSpeaking: true,
            scale: 1.25,
            heightVh: 82,
            anchor: 'bottom'
          }
        ],
        effect: 'shake'
      },
      {
        text: 'Море есть. Дорога есть. Родителей нет.',
        speaker: undefined,
        cg: assets.cg.dreamAbkhazia
      },
      {
        text: 'Блин, вот же такое приснится...',
        speaker: 'Влад',
        cg: assets.cg.dreamAbkhazia
      },
      {
        text: 'Не могли же они меня реально забыть где-нибудь на базаре.',
        speaker: 'Влад',
        cg: assets.cg.dreamAbkhazia
      }
    ],
    nextSceneId: 'scene_2_morning'
  },
  scene_2_morning: {
    id: 'scene_2_morning',
    dialogue: [
      {
        text: 'Влад просыпается. На этот раз вроде всё спокойно.',
        speaker: undefined,
        background: 'assets/backgrounds/bg-bedroom.jpg',
        effect: 'flash'
      },
      {
        text: 'С днём рождения!',
        speaker: 'Мама',
        background: 'assets/backgrounds/bg-bedroom.jpg',
        characters: [
          {
            id: 'mom',
            name: 'Мама',
            expression: 'smiling',
            position: 'left',
            isSpeaking: true,
            scale: 1.16,
            heightVh: 78,
            anchor: 'bottom'
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'shock',
            position: 'right',
            isSpeaking: false,
            scale: 1.16,
            heightVh: 78,
            anchor: 'bottom'
          }
        ]
      },
      {
        text: 'Ну всё, плюс один уровень официально получен.',
        speaker: 'Кирилл',
        background: 'assets/backgrounds/bg-bedroom.jpg',
        characters: [
          {
            id: 'mom',
            name: 'Мама',
            expression: 'base',
            position: 'left',
            isSpeaking: false,
            scale: 1.16,
            heightVh: 68,
            anchor: 'bottom'
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'congratulating',
            position: 'center',
            isSpeaking: true,
            scale: 1.16,
            heightVh: 68
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'right',
            isSpeaking: false,
            scale: 1.16,
            heightVh: 68,
            anchor: 'bottom'
          }
        ]
      },
      {
        text: 'Так... Это уже реальность?',
        speaker: 'Влад',
        background: 'assets/backgrounds/bg-bedroom.jpg',
        characters: [
          {
            id: 'mom',
            name: 'Мама',
            expression: 'base',
            position: 'left',
            isSpeaking: false,
            scale: 1.16,
            heightVh: 68,
            anchor: 'bottom'
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'center',
            isSpeaking: false,
            scale: 1.16,
            heightVh: 68
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'shock',
            position: 'right',
            isSpeaking: true,
            scale: 1.16,
            heightVh: 68,
            anchor: 'bottom'
          }
        ]
      },
      {
        text: 'Вроде да. Но гарантий никто не давал.',
        speaker: 'Кирилл',
        background: 'assets/backgrounds/bg-bedroom.jpg',
        characters: [
          {
            id: 'mom',
            name: 'Мама',
            expression: 'base',
            position: 'left',
            isSpeaking: false,
            scale: 1.16,
            heightVh: 68,
            anchor: 'bottom'
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'congratulating',
            position: 'center',
            isSpeaking: true,
            scale: 1.16,
            heightVh: 68
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'right',
            isSpeaking: false,
            scale: 1.16,
            heightVh: 68,
            anchor: 'bottom'
          }
        ]
      },
      {
        text: 'Сегодня у тебя день рождения, так что давай без подозрений. Иди лучше помоги немного.',
        speaker: 'Мама',
        background: 'assets/backgrounds/bg-bedroom.jpg',
        characters: [
          {
            id: 'mom',
            name: 'Мама',
            expression: 'base',
            position: 'left',
            isSpeaking: true,
            scale: 1.16,
            heightVh: 68,
            anchor: 'bottom'
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'center',
            isSpeaking: false,
            scale: 1.16,
            heightVh: 68
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'right',
            isSpeaking: false,
            scale: 1.16,
            heightVh: 68,
            anchor: 'bottom'
          }
        ]
      },
      {
        text: 'Вот так всегда. День рождения мой, а квесты семейные.',
        speaker: 'Влад',
        background: 'assets/backgrounds/bg-bedroom.jpg',
        characters: [
          {
            id: 'mom',
            name: 'Мама',
            expression: 'base',
            position: 'left',
            isSpeaking: false,
            scale: 1.16,
            heightVh: 68,
            anchor: 'bottom'
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'center',
            isSpeaking: false,
            scale: 1.16,
            heightVh: 68
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'frustrated',
            position: 'right',
            isSpeaking: true,
            scale: 1.16,
            heightVh: 68,
            anchor: 'bottom'
          }
        ]
      }
    ],
    nextSceneId: 'scene_3_salad_choice'
  },
  scene_3_salad_choice: {
    id: 'scene_3_salad_choice',
    dialogue: [
      {
        text: 'До прихода гостей остаётся не так много времени. Стол почти накрыт. Остаётся важнейший объект вечера.',
        speaker: undefined,
        background: assets.backgrounds.kitchen
      },
      {
        text: 'Нужно аккуратно донести салат.',
        speaker: 'Мама',
        background: assets.backgrounds.kitchen,
        characters: [
          {
            id: 'mom',
            name: 'Мама',
            expression: 'base',
            position: 'left',
            isSpeaking: true
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Ключевое слово — аккуратно.',
        speaker: 'Кирилл',
        background: assets.backgrounds.kitchen,
        characters: [
          {
            id: 'mom',
            name: 'Мама',
            expression: 'base',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'center',
            isSpeaking: true
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'А почему это звучит как испытание?',
        speaker: 'Влад',
        background: assets.backgrounds.kitchen,
        characters: [
          {
            id: 'mom',
            name: 'Мама',
            expression: 'base',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'center',
            isSpeaking: false
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'shock',
            position: 'right',
            isSpeaking: true
          }
        ]
      },
      {
        text: 'Перед вами появляется судьбоносный выбор...',
        speaker: undefined,
        background: assets.backgrounds.kitchen
      }
    ],
    choices: [
      {
        text: 'Понести салат самому',
        nextSceneId: 'scene_3a_vlad_salad'
      },
      {
        text: 'Поручить салат Кириллу',
        nextSceneId: 'scene_3b_you_salad'
      }
    ]
  },
  scene_3a_vlad_salad: {
    id: 'scene_3a_vlad_salad',
    dialogue: [
      {
        text: 'Ты берёшь салат. Влад несёт его крайне ответственно.',
        speaker: undefined,
        background: assets.backgrounds.kitchen,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'salad',
            position: 'center',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Уверенно.',
        speaker: undefined,
        background: assets.backgrounds.kitchen,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'salad',
            position: 'center',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Даже слишком уверенно.',
        speaker: undefined,
        background: assets.backgrounds.kitchen,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'salad',
            position: 'center',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Да нормально, я донесу.',
        speaker: 'Влад',
        background: assets.backgrounds.kitchen,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'salad',
            position: 'center',
            isSpeaking: true
          }
        ]
      },
      {
        text: 'Салат делает последний поворот в своей жизни.',
        speaker: undefined,
        background: assets.backgrounds.kitchen,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'shock',
            position: 'center',
            isSpeaking: false
          }
        ],
        effect: 'shake'
      },
      {
        text: '...',
        speaker: 'Влад',
        cg: assets.cg.saladVladDrop
      },
      {
        text: 'Влад.',
        speaker: 'Мама',
        cg: assets.cg.saladVladDrop
      },
      {
        text: 'Я могу объяснить.',
        speaker: 'Влад',
        cg: assets.cg.saladVladDrop
      },
      {
        text: 'Салат покинул чат.',
        speaker: 'Кирилл',
        cg: assets.cg.saladVladDrop
      },
      {
        text: 'Салат не выжил, но я думаю так люди и изобрели каску... Но не в этот раз.',
        speaker: undefined,
        cg: assets.cg.saladVladDrop
      }
    ],
    nextSceneId: 'scene_4_awakening'
  },
  scene_3b_you_salad: {
    id: 'scene_3b_you_salad',
    dialogue: [
      {
        text: 'Кирилл берёт салат. Под твоё бдительное око.',
        speaker: undefined,
        background: assets.backgrounds.kitchen,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'salad',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Ты смотришь на это с лёгким недоверием.',
        speaker: undefined,
        background: assets.backgrounds.kitchen,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'frustrated',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'salad',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Смотри только аккуратно.',
        speaker: 'Влад',
        background: assets.backgrounds.kitchen,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'left',
            isSpeaking: true
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'salad',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Да всё оки, я понёс.',
        speaker: 'Кирилл',
        background: assets.backgrounds.kitchen,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'salad',
            position: 'right',
            isSpeaking: true
          }
        ]
      },
      {
        text: 'Ситуация продержалась примерно две секунды.',
        speaker: undefined,
        background: assets.backgrounds.kitchen,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'shock',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'right',
            isSpeaking: false
          }
        ],
        effect: 'shake'
      },
      {
        text: '...',
        speaker: 'Кирилл',
        cg: assets.cg.saladYouDrop
      },
      {
        text: 'Кирилл.',
        speaker: 'Мама',
        cg: assets.cg.saladYouDrop
      },
      {
        text: 'Я так и знал.',
        speaker: 'Влад',
        cg: assets.cg.saladYouDrop
      },
      {
        text: 'Это была проверка лимитов.',
        speaker: 'Кирилл',
        cg: assets.cg.saladYouDrop
      },
      {
        text: 'Проверка пройдена.',
        speaker: undefined,
        cg: assets.cg.saladYouDrop
      },
      {
        text: 'Салат не оценил.',
        speaker: undefined,
        cg: assets.cg.saladYouDrop
      }
    ],
    nextSceneId: 'scene_4_awakening'
  },
  scene_4_awakening: {
    id: 'scene_4_awakening',
    dialogue: [
      {
        text: 'Да уж... Вот это сон так сон.',
        speaker: 'Влад',
        background: assets.backgrounds.bedroom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'frustrated',
            position: 'center',
            isSpeaking: true
          }
        ],
        effect: 'flash'
      },
      {
        text: 'И Абхазия, и салат... Надо же такому присниться.',
        speaker: 'Влад',
        background: assets.backgrounds.bedroom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'center',
            isSpeaking: true
          }
        ]
      },
      {
        text: 'Хотя...',
        speaker: 'Влад',
        background: assets.backgrounds.bedroom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'shock',
            position: 'center',
            isSpeaking: true
          }
        ],
        overlayText: 'Хотя...'
      },
      {
        text: 'Не могло же такое реально случиться, чтобы меня забыли где-то на пути к морю, или салат на голову надели, хаха.. ХАХА.',
        speaker: 'Влад',
        background: assets.backgrounds.bedroom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'shock',
            position: 'center',
            isSpeaking: true
          }
        ]
      },
      {
        text: 'Ответ на этот вопрос лучше оставить за кадром.',
        speaker: undefined,
        background: assets.backgrounds.bedroom
      },
      {
        text: 'Ладно. Главное — проснулся.',
        speaker: 'Влад',
        background: assets.backgrounds.bedroom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'center',
            isSpeaking: true
          }
        ]
      }
    ],
    nextSceneId: 'scene_5_waterfall'
  },
  scene_5_waterfall: {
    id: 'scene_5_waterfall',
    dialogue: [
      {
        text: 'Красивый вид. Горы. Водопад. Момент кажется почти идеальным.',
        speaker: undefined,
        background: assets.backgrounds.waterfall,
        overlayText: 'Где-то у водопада'
      },
      {
        text: 'Свет...',
        speaker: 'Влад',
        background: assets.backgrounds.waterfall,
        characters: [
          {
            id: 'svetlana',
            name: 'Светлана',
            expression: 'base',
            position: 'left',
            isSpeaking: false,
            scale: 1.18,
            heightVh: 78,
            x: 55,
            anchor: 'bottom'
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'right',
            isSpeaking: true,
            scale: 1.18,
            heightVh: 78,
            x: -55,
            anchor: 'bottom'
          }
        ]
      },
      {
        text: 'Да?',
        speaker: 'Светлана',
        background: assets.backgrounds.waterfall,
        characters: [
          {
            id: 'svetlana',
            name: 'Светлана',
            expression: 'smiling',
            position: 'left',
            isSpeaking: true,
            scale: 1.18,
            heightVh: 78,
            x: 55,
            anchor: 'bottom'
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'right',
            isSpeaking: false,
            scale: 1.18,
            heightVh: 78,
            x: -55,
            anchor: 'bottom'
          }
        ]
      },
      {
        text: 'Влад встаёт на одно колено.',
        speaker: undefined,
        background: assets.backgrounds.waterfall,
        characters: [
          {
            id: 'svetlana',
            name: 'Светлана',
            expression: 'smiling',
            position: 'left',
            isSpeaking: false,
            scale: 1.18,
            heightVh: 78,
            x: 55,
            anchor: 'bottom'
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'kneeling',
            position: 'right',
            isSpeaking: false,
            scale: 1.18,
            heightVh: 78,
            x: -55,
            anchor: 'bottom'
          }
        ]
      },
      {
        text: 'Я хотел сказать...',
        speaker: 'Влад',
        background: assets.backgrounds.waterfall,
        characters: [
          {
            id: 'svetlana',
            name: 'Светлана',
            expression: 'smiling',
            position: 'left',
            isSpeaking: false,
            scale: 1.18,
            heightVh: 78,
            x: 55,
            anchor: 'bottom'
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'kneeling',
            position: 'right',
            isSpeaking: true,
            scale: 1.18,
            heightVh: 78,
            x: -55,
            anchor: 'bottom'
          }
        ]
      },
      {
        text: 'Коробочка открывается перед Светланой.',
        speaker: undefined,
        cg: assets.cg.proposalEmptyRing,
        overlayText: 'КОЛЬЦО НЕ ОБНАРУЖЕНО',
        effect: 'shake'
      },
      {
        text: 'Так.',
        speaker: 'Влад',
        cg: assets.cg.proposalEmptyRing
      },
      {
        text: 'Влад?..',
        speaker: 'Светлана',
        cg: assets.cg.proposalEmptyRing
      },
      {
        text: 'Окак...',
        speaker: 'Влад',
        cg: assets.cg.proposalEmptyRing
      },
      {
        text: 'Это сейчас часть сложного плана?',
        speaker: 'Светлана',
        cg: assets.cg.proposalEmptyRing
      },
      {
        text: 'Я очень надеюсь, что да. Но, кажется, нет.',
        speaker: 'Влад',
        cg: assets.cg.proposalEmptyRing
      },
      {
        text: 'Романтика: была.\nПаника: появилась.\nКольцо: где-то определённо не здесь.',
        speaker: undefined,
        cg: assets.cg.proposalEmptyRing
      }
    ],
    nextSceneId: 'scene_6_alias_intro'
  },
  scene_6_alias_intro: {
    id: 'scene_6_alias_intro',
    dialogue: [
      {
        text: 'Влад моргает и резко возвращается в праздничную реальность.',
        speaker: undefined,
        background: assets.backgrounds.aliasRoom,
        effect: 'flash'
      },
      {
        text: 'Да уж... задумался.',
        speaker: 'Влад',
        background: assets.backgrounds.aliasRoom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'left',
            isSpeaking: true
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Ты просто завис на несколько секунд.',
        speaker: 'Кирилл',
        background: assets.backgrounds.aliasRoom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'right',
            isSpeaking: true
          }
        ]
      },
      {
        text: 'Надо чуть больше активности, а то тебя совсем куда-то уносит!',
        speaker: 'Мама',
        background: assets.backgrounds.aliasRoom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'mom',
            name: 'Мама',
            expression: 'smiling',
            position: 'center',
            isSpeaking: true
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Давайте тогда сыграем в настолку!',
        speaker: 'Светлана',
        background: assets.backgrounds.aliasRoom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'svetlana',
            name: 'Светлана',
            expression: 'smiling',
            position: 'center',
            isSpeaking: true
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'На праздничном столе появляется Alias. И вместе с ним — испытание посерьёзнее любого сна.',
        speaker: undefined,
        background: assets.backgrounds.aliasRoom
      }
    ],
    nextSceneId: 'scene_7_alias_game'
  },
  scene_7_alias_game: {
    id: 'scene_7_alias_game',
    dialogue: [
      {
        text: 'Команда соперников получает слово уровня “чай”. И конечно, угадывают его ровно за 0.1 секунды.',
        speaker: undefined,
        background: assets.backgrounds.aliasRoom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Ну конечно. Всё подстроено!',
        speaker: 'Влад',
        background: assets.backgrounds.aliasRoom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'frustrated',
            position: 'left',
            isSpeaking: true
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'А вот ваша команда получает слово, которое будто бы только что специально достали из словаря вековых страданий.',
        speaker: undefined,
        background: assets.backgrounds.aliasRoom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'frustrated',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Так, объясняй, но я не пойму.',
        speaker: 'Кирилл',
        background: assets.backgrounds.aliasRoom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'base',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'right',
            isSpeaking: true
          }
        ]
      },
      {
        text: 'Да как такое вообще отгадывать?!',
        speaker: 'Влад',
        background: assets.backgrounds.aliasRoom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'frustrated',
            position: 'left',
            isSpeaking: true
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Обстановка в гостиной накаляется до предела. Баланс игры вызывает глубочайшие вопросы.',
        speaker: undefined,
        background: assets.backgrounds.aliasRoom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'frustrated',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'mom',
            name: 'Мама',
            expression: 'base',
            position: 'center',
            isSpeaking: false
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Ну у нас же просто обычные, абсолютно нормальные слова попадаются.',
        speaker: 'Мама',
        background: assets.backgrounds.aliasRoom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'frustrated',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'mom',
            name: 'Мама',
            expression: 'smiling',
            position: 'center',
            isSpeaking: true
          },
          {
            id: 'you',
            name: 'Кирилл',
            expression: 'base',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Нормальные?',
        speaker: 'Влад',
        background: assets.backgrounds.aliasRoom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'shock',
            position: 'left',
            isSpeaking: true
          },
          {
            id: 'mom',
            name: 'Мама',
            expression: 'base',
            position: 'center',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Да вам там попадается что-то уровня...',
        speaker: 'Влад',
        background: assets.backgrounds.aliasRoom,
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'shock',
            position: 'left',
            isSpeaking: true
          },
          {
            id: 'mom',
            name: 'Мама',
            expression: 'base',
            position: 'center',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'ЩАПКА УЩАНКА',
        speaker: 'Влад',
        cg: assets.cg.aliasShapkaUshanka,
        overlayText: 'ЩАПКА УЩАНКА',
        effect: 'green-flash'
      },
      {
        text: 'Ну я не верю, как это возможно.',
        speaker: 'Влад',
        cg: assets.cg.aliasShapkaUshanka
      },
      {
        text: 'Хахаха, а мы побеждаем!',
        speaker: 'Светлана',
        cg: assets.cg.aliasShapkaUshanka
      },
      {
        text: 'Ты чего так реагируешь, Владик?',
        speaker: 'Мама',
        cg: assets.cg.aliasShapkaUshanka
      },
      {
        text: 'НЕ НУ ИМ РЕАЛЬНО ШАПКА УШАНКА ПАДАЕТ, А ОНИ ЕЩЕ И ОБЪЯСНЯЮТ КАК "УШКИ НА МОКУШКЕ=ШАПКА УШАНКА"',
        speaker: undefined,
        cg: assets.cg.aliasShapkaUshanka
      }
    ],
    nextSceneId: 'finale'
  },
  finale: {
    id: 'finale',
    dialogue: [
      {
        text: 'Праздничный день плавно подходит к своему тёплому концу. Все сны, салаты, падения, горные водопады и баталии в Alias остались позади.',
        speaker: undefined,
        cg: assets.cg.finale
      },
      {
        text: 'Влад, с днём рождения! От всей души желаю тебе крепкого здоровья, душевного спокойствия, невероятной удачи, и чтобы рядом всегда были те люди, которые тебя по-настоящему ценят и любят!',
        speaker: 'Мама',
        cg: assets.cg.finale
      },
      {
        text: 'И чтобы кольца больше никогда не терялись во снах и наяву!',
        speaker: 'Светлана',
        cg: assets.cg.finale
      },
      {
        text: 'И чтобы салаты держались крепче, слова попадались честнее, а каждый следующий год был лучше прошлого.',
        speaker: 'Кирилл',
        cg: assets.cg.finale
      },
      {
        text: 'Спасибо огромное... Звучит действительно очень здорово и духовно.',
        speaker: 'Влад',
        cg: assets.cg.finale
      },
      {
        text: 'А теперь открывается следующий режим.',
        speaker: 'Кирилл',
        cg: assets.cg.finale
      },
      {
        text: 'Поздравляем! Сюжетный интерактивный режим успешно пройден на 100%! Пора переходить к архиву.',
        speaker: undefined,
        cg: assets.cg.finale,
        overlayText: 'С ДНЁМ РОЖДЕНИЯ, ВЛАД!'
      }
    ]
  }
};
