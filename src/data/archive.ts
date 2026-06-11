import { withBase } from '../utils/base';
export { withBase };

export type ArchiveItem =
  | {
      type: 'photo';
      src: string;
      rotation?: number; // degrees for playful polaroid tilt
      size?: 'sm' | 'md' | 'lg';
      position?: 'left' | 'right' | 'center';
    }
  | {
      type: 'note';
      title?: string;
      text: string;
      position?: 'left' | 'right' | 'center';
      rotation?: number;
    }
  | {
      type: 'memory';
      title: string;
      text: string;
      position?: 'left' | 'right' | 'center';
      rotation?: number;
    };

export type ArchiveSpread = {
  id: string;
  title?: string;
  subtitle?: string;
  items: ArchiveItem[];
};


export const photoSrc = (index: number) =>
  withBase(`assets/photos/photo-${String(index).padStart(3, '0')}.jpg`);

export const archiveSpreads: ArchiveSpread[] = [
  {
    id: 'first_pages',
    title: 'Первые страницы',
    subtitle: 'Начало архива',
    items: [
      {
        type: 'note',
        title: 'Введение',
        text: 'Здесь собраны старые кадры — не обязательно идеальные, зато настоящие. Каждый снимок хранит в себе крупицу искренней радости и тепла прошлых лет.',
        position: 'left',
        rotation: -2
      },
      {
        type: 'photo',
        src: photoSrc(1),
        position: 'right',
        rotation: 3,
        size: 'lg'
      }
    ]
  },
  {
    id: 'old_snapshots',
    title: 'Старые кадры',
    subtitle: 'Остановившиеся мгновения',
    items: [
      {
        type: 'photo',
        src: photoSrc(2),
        position: 'left',
        rotation: -4,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(3),
        position: 'left',
        rotation: 3,
        size: 'sm'
      },
      {
        type: 'photo',
        src: photoSrc(4),
        position: 'right',
        rotation: -3,
        size: 'md'
      },
      {
        type: 'note',
        title: 'О подлинности',
        text: 'Не все кадры обязаны быть идеальными. Главное, что они настоящие, живые и напоминают о чём-то очень хорошем.',
        position: 'right',
        rotation: 2
      }
    ]
  },
  {
    id: 'one_more_page',
    title: 'Ещё одна страница',
    subtitle: 'Где-то в прошлом',
    items: [
      {
        type: 'photo',
        src: photoSrc(5),
        position: 'left',
        rotation: -3,
        size: 'md'
      },
      {
        type: 'note',
        title: 'О памяти',
        text: 'Какие-то моменты со временем забываются, а какие-то почему-то всегда остаются рядом, согревая изнутри.',
        position: 'left',
        rotation: 1
      },
      {
        type: 'photo',
        src: photoSrc(6),
        position: 'right',
        rotation: 4,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(7),
        position: 'right',
        rotation: -2,
        size: 'md'
      }
    ]
  },
  {
    id: 'pieces_of_memory',
    title: 'Кусочки памяти',
    subtitle: 'Просто моменты',
    items: [
      {
        type: 'photo',
        src: photoSrc(8),
        position: 'left',
        rotation: 4,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(9),
        position: 'left',
        rotation: -2,
        size: 'sm'
      },
      {
        type: 'photo',
        src: photoSrc(10),
        position: 'right',
        rotation: 2,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(11),
        position: 'right',
        rotation: -4,
        size: 'sm'
      }
    ]
  },
  {
    id: 'without_words',
    title: 'Без лишних слов',
    subtitle: 'Разные кадры',
    items: [
      {
        type: 'photo',
        src: photoSrc(12),
        position: 'left',
        rotation: -3,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(13),
        position: 'left',
        rotation: 4,
        size: 'sm'
      },
      {
        type: 'photo',
        src: photoSrc(14),
        position: 'right',
        rotation: -2,
        size: 'md'
      },
      {
        type: 'memory',
        title: 'Обычное тепло ✨',
        text: 'Обычные фотографии со временем становятся намного теплее. В них раскрывается истинная прелесть повседневности.',
        position: 'right',
        rotation: 3
      }
    ]
  },
  {
    id: 'somewhere_in_past',
    title: 'Где-то в прошлом',
    subtitle: 'Простые секунды',
    items: [
      {
        type: 'photo',
        src: photoSrc(15),
        position: 'left',
        rotation: 2,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(16),
        position: 'left',
        rotation: -4,
        size: 'sm'
      },
      {
        type: 'photo',
        src: photoSrc(17),
        position: 'right',
        rotation: 3,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(18),
        position: 'right',
        rotation: -2,
        size: 'sm'
      }
    ]
  },
  {
    id: 'warm_pages',
    title: 'Тёплые страницы',
    subtitle: 'Сквозь года',
    items: [
      {
        type: 'photo',
        src: photoSrc(19),
        position: 'left',
        rotation: -4,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(20),
        position: 'left',
        rotation: 3,
        size: 'sm'
      },
      {
        type: 'photo',
        src: photoSrc(21),
        position: 'right',
        rotation: -2,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(22),
        position: 'right',
        rotation: 5,
        size: 'sm'
      }
    ]
  },
  {
    id: 'archive_continuation',
    title: 'Продолжение архива',
    subtitle: 'Обычные дни',
    items: [
      {
        type: 'photo',
        src: photoSrc(23),
        position: 'left',
        rotation: 3,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(24),
        position: 'left',
        rotation: -2,
        size: 'sm'
      },
      {
        type: 'photo',
        src: photoSrc(25),
        position: 'right',
        rotation: 4,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(26),
        position: 'right',
        rotation: -3,
        size: 'sm'
      }
    ]
  },
  {
    id: 'different_frames',
    title: 'Разные кадры',
    subtitle: 'Мир в объективе',
    items: [
      {
        type: 'photo',
        src: photoSrc(27),
        position: 'left',
        rotation: -3,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(28),
        position: 'left',
        rotation: 4,
        size: 'sm'
      },
      {
        type: 'photo',
        src: photoSrc(29),
        position: 'right',
        rotation: -2,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(30),
        position: 'right',
        rotation: 3,
        size: 'sm'
      }
    ]
  },
  {
    id: 'time_flow',
    title: 'Тихий свет',
    subtitle: 'На долгую память',
    items: [
      {
        type: 'photo',
        src: photoSrc(31),
        position: 'left',
        rotation: 4,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(32),
        position: 'left',
        rotation: -2,
        size: 'sm'
      },
      {
        type: 'photo',
        src: photoSrc(33),
        position: 'right',
        rotation: 3,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(34),
        position: 'right',
        rotation: -4,
        size: 'sm'
      }
    ]
  },
  {
    id: 'precious_seconds',
    title: 'Тепло воспоминаний',
    subtitle: 'Близкие моменты',
    items: [
      {
        type: 'photo',
        src: photoSrc(35),
        position: 'left',
        rotation: -3,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(36),
        position: 'left',
        rotation: 2,
        size: 'sm'
      },
      {
        type: 'photo',
        src: photoSrc(37),
        position: 'right',
        rotation: -4,
        size: 'md'
      },
      {
        type: 'photo',
        src: photoSrc(38),
        position: 'right',
        rotation: 3,
        size: 'sm'
      }
    ]
  },
  {
    id: 'conclusion',
    title: 'Продолжение следует',
    subtitle: 'Впереди новые листы',
    items: [
      {
        type: 'note',
        title: 'Просто мысли',
        text: 'Здесь не нужно искать идеальный порядок. Это просто кусочки памяти, которые хочется сохранить. Впереди ещё много дней, встреч и событий, а значит, этот альбом обязательно будет наполняться новыми теплыми кадрами.',
        position: 'center',
        rotation: -1
      }
    ]
  }
];
