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
        src: '/assets/photos/photo-001.jpg',
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
        src: '/assets/photos/photo-002.jpg',
        position: 'left',
        rotation: -4,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-003.jpg',
        position: 'left',
        rotation: 3,
        size: 'sm'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-004.jpg',
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
        src: '/assets/photos/photo-005.jpg',
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
        src: '/assets/photos/photo-006.jpg',
        position: 'right',
        rotation: 4,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-007.jpg',
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
        src: '/assets/photos/photo-008.jpg',
        position: 'left',
        rotation: 4,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-009.jpg',
        position: 'left',
        rotation: -2,
        size: 'sm'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-010.jpg',
        position: 'right',
        rotation: 2,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-011.jpg',
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
        src: '/assets/photos/photo-012.jpg',
        position: 'left',
        rotation: -3,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-013.jpg',
        position: 'left',
        rotation: 4,
        size: 'sm'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-014.jpg',
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
        src: '/assets/photos/photo-015.jpg',
        position: 'left',
        rotation: 2,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-016.jpg',
        position: 'left',
        rotation: -4,
        size: 'sm'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-017.jpg',
        position: 'right',
        rotation: 3,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-018.jpg',
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
        src: '/assets/photos/photo-019.jpg',
        position: 'left',
        rotation: -4,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-020.jpg',
        position: 'left',
        rotation: 3,
        size: 'sm'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-021.jpg',
        position: 'right',
        rotation: -2,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-022.jpg',
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
        src: '/assets/photos/photo-023.jpg',
        position: 'left',
        rotation: 3,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-024.jpg',
        position: 'left',
        rotation: -2,
        size: 'sm'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-025.jpg',
        position: 'right',
        rotation: 4,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-026.jpg',
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
        src: '/assets/photos/photo-027.jpg',
        position: 'left',
        rotation: -3,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-028.jpg',
        position: 'left',
        rotation: 4,
        size: 'sm'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-029.jpg',
        position: 'right',
        rotation: -2,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-030.jpg',
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
        src: '/assets/photos/photo-031.jpg',
        position: 'left',
        rotation: 4,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-032.jpg',
        position: 'left',
        rotation: -2,
        size: 'sm'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-033.jpg',
        position: 'right',
        rotation: 3,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-034.jpg',
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
        src: '/assets/photos/photo-035.jpg',
        position: 'left',
        rotation: -3,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-036.jpg',
        position: 'left',
        rotation: 2,
        size: 'sm'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-037.jpg',
        position: 'right',
        rotation: -4,
        size: 'md'
      },
      {
        type: 'photo',
        src: '/assets/photos/photo-038.jpg',
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
