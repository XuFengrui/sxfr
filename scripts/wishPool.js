/*
 * wishPool.js
 * 心愿数据池（只存内容，不存状态）
 * 后期你只需要维护这里，不会影响抽取进度
 */

window.WISH_POOL = {
  sad: {
    label: '难过',
    total: 1,
    wishes: [
      {
        id: 'sad_01',
        text: '没关系，我在这里陪你慢下来。',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80',
        audio: 'https://cdn.pixabay.com/download/audio/2022/03/15/audio_2a0b7c7b54.mp3?filename=calm-ambient-11064.mp3'
      }
    ]
  },

  angry: {
    label: '生气',
    total: 1,
    wishes: [
      {
        id: 'angry_01',
        text: '先把气放下，我们一起慢慢说。',
        image: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?auto=format&fit=crop&w=1000&q=80',
        audio: 'https://cdn.pixabay.com/download/audio/2022/10/24/audio_1d36f6d2f8.mp3?filename=soft-piano-124841.mp3'
      }
    ]
  },

  happy: {
    label: '开心',
    total: 1,
    wishes: [
      {
        id: 'happy_01',
        text: '记得把这一刻的笑声收藏起来。',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80&sat=30',
        audio: 'https://cdn.pixabay.com/download/audio/2023/02/07/audio_8b6fe25a7a.mp3?filename=soft-uplifting-139995.mp3'
      }
    ]
  },

  hidden: {
    label: '隐藏款',
    total: 1,
    wishes: [
      {
        id: 'hidden_01',
        text: '谢谢你一路点到这里，这里有一份只给你的礼物。',
        image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1000&q=80&sat=-15',
        audio: 'https://cdn.pixabay.com/download/audio/2022/01/20/audio_9e0a8edb8f.mp3?filename=gentle-ambient-14021.mp3'
      }
    ]
  }
};
