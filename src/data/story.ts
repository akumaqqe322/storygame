import { Scene } from '../types/story';

export const STORY_DATA: Record<string, Scene> = {
  start: {
    id: 'start',
    dialogue: [
      {
        text: 'С днем рождения меня! Поверить не могу, что этот день настал.',
        speaker: 'Влад',
        background: '/assets/backgrounds/bg-bedroom.jpg',
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'happy',
            position: 'center',
            isSpeaking: true,
          }
        ],
        effect: 'flash'
      },
      {
        text: 'За окном светит солнце. В комнате пахнет праздничным пирогом из кухни. С чего же начать этот праздничный день?',
        speaker: undefined, // Narrator
        background: '/assets/backgrounds/bg-bedroom.jpg',
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'neutral',
            position: 'center',
            isSpeaking: false,
          }
        ]
      }
    ],
    choices: [
      {
        text: 'Побежать на кухню к маме',
        nextSceneId: 'kitchen'
      },
      {
        text: 'Закрыть глаза и помечтать об Абхазии',
        nextSceneId: 'dream'
      }
    ]
  },
  kitchen: {
    id: 'kitchen',
    dialogue: [
      {
        text: 'Навстречу выбегает мама с кухонной лопаткой и праздничным настроением.',
        speaker: undefined,
        background: '/assets/backgrounds/bg-kitchen.jpg',
        effect: 'shake'
      },
      {
        text: 'Владочка, сынок, с днем рождения! Я тут готовлю твой любимый салат, но кажется...',
        speaker: 'Мама',
        background: '/assets/backgrounds/bg-kitchen.jpg',
        characters: [
          {
            id: 'mom',
            name: 'Мама',
            expression: 'happy',
            position: 'left',
            isSpeaking: true
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'happy',
            position: 'right',
            isSpeaking: false
          }
        ]
      },
      {
        text: 'Вдруг раздается громкий кухонный грохот! Салат падает со стола!',
        speaker: undefined,
        background: '/assets/backgrounds/bg-kitchen.jpg',
        cg: '/assets/cg/cg-salad-you-drop.png',
        effect: 'shake'
      },
      {
        text: 'Ой-ой-ой! Всё разлетелось на кусочки! Это к счастью, сынок, точно к счастью!',
        speaker: 'Мама',
        cg: '/assets/cg/cg-salad-you-drop.png'
      }
    ],
    choices: [
      {
        text: 'Помочь маме убрать салат',
        nextSceneId: 'clean_up'
      },
      {
        text: 'Пошутить и поднять настроение',
        nextSceneId: 'joke'
      }
    ]
  },
  clean_up: {
    id: 'clean_up',
    dialogue: [
      {
        text: 'Вы дружно убираете салат. На душе становится тепло от совместного дела.',
        speaker: undefined,
        background: '/assets/backgrounds/bg-kitchen.jpg',
        characters: [
          {
            id: 'mom',
            name: 'Мама',
            expression: 'happy',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'neutral',
            position: 'right',
            isSpeaking: true
          }
        ]
      },
      {
        text: 'Вы закончили убирать. Отличная командная работа!',
        speaker: undefined,
        background: '/assets/backgrounds/bg-birthday-room.jpg',
        overlayText: 'День только начинается!'
      }
    ],
    nextSceneId: 'start' // Loop back for testing
  },
  joke: {
    id: 'joke',
    dialogue: [
      {
        text: 'Ха-ха! Теперь у нас салатный пол высокой кухни!',
        speaker: 'Влад',
        background: '/assets/backgrounds/bg-kitchen.jpg',
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'happy',
            position: 'center',
            isSpeaking: true
          }
        ]
      },
      {
        text: 'Мама весело смеется, и напряжение улетучивается.',
        speaker: undefined,
        background: '/assets/backgrounds/bg-kitchen.jpg',
        characters: [
          {
            id: 'mom',
            name: 'Мама',
            expression: 'happy',
            position: 'left',
            isSpeaking: false
          },
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'happy',
            position: 'right',
            isSpeaking: true
          }
        ]
      }
    ],
    nextSceneId: 'start'
  },
  dream: {
    id: 'dream',
    dialogue: [
      {
        text: 'Вы закрываете глаза и переноситесь на берег волшебного озера Рица...',
        speaker: undefined,
        cg: '/assets/cg/cg-dream-abkhazia.jpg',
        overlayText: 'Абхазия в мыслях'
      },
      {
        text: 'Прохладный горный воздух наполняет легкие, а шум водопадов успокаивает ум.',
        speaker: 'Влад',
        cg: '/assets/cg/cg-dream-abkhazia.jpg',
        characters: [
          {
            id: 'vlad',
            name: 'Влад',
            expression: 'happy',
            position: 'center',
            isSpeaking: true
          }
        ]
      },
      {
        text: 'Но реальность зовет обратно — пора праздновать по-настоящему!',
        speaker: undefined,
        background: '/assets/backgrounds/bg-bedroom.jpg',
        effect: 'flash'
      }
    ],
    nextSceneId: 'start'
  }
};
