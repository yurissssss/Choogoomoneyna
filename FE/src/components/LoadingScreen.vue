<template>
  <div class="w-full flex flex-col items-center justify-center z-50">
    <!-- 메인 콘텐츠 영역 -->
    <div class="flex flex-col items-center gap-8">
      <!-- 캐릭터 파도 애니메이션 영역 -->
      <div class="flex items-center justify-center h-32">
        <!-- 캐릭터들이 일렬로 배치 -->
        <div
          v-for="(character, index) in characters"
          :key="character.name"
          class="flex flex-col items-center animate-wave"
          :style="{
            animationDelay: index * 0.05 + 's',
            '--wave-height': '20px',
          }"
        >
          <img
            :src="character.src"
            :alt="character.name"
            class="w-16 h-16 object-contain drop-shadow-lg transition-transform duration-300"
          />
        </div>
      </div>

      <!-- 로딩 텍스트 -->
      <div class="text-center">
        <h2 class="text-2xl font-jua text-limegreen-800 mb-2">
          추구미들이 준비중이에요!
        </h2>
        <p class="text-sm text-limegreen-700 animate-pulse">
          {{ loadingText }}
        </p>
      </div>

      <!-- 프로그레스 바 -->
      <div class="w-64 bg-limegreen-100 rounded-full h-2 overflow-hidden">
        <div
          class="bg-green h-full rounded-full transition-all duration-300 ease-out"
          :style="{ width: progress + '%' }"
        ></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from 'vue';

// 캐릭터 이미지 import
import characterA from '@/assets/img/characters/A.png';
import characterB from '@/assets/img/characters/B.png';
import characterC from '@/assets/img/characters/C.png';
import characterD from '@/assets/img/characters/D.png';
import characterE from '@/assets/img/characters/E.png';

const emit = defineEmits(['loading-complete']);

// 캐릭터 데이터 - 모든 캐릭터가 항상 보임
const characters = ref([
  { src: characterA },
  { src: characterB },
  { src: characterC },
  { src: characterD },
  { src: characterE },
]);

// 로딩 상태
const progress = ref(0);
const loadingTexts = [
  '추구미들을 불러오고 있어요...',
  '데이터를 준비중이에요...',
  '거의 다 됐어요!',
];
const loadingText = ref(loadingTexts[0]);

let progressInterval;

// 프로그레스 바 업데이트
const updateProgress = () => {
  if (progress.value < 100) {
    progress.value += 5; // 2초 완료 (100 / 20 = 5)
  }
};

// 로딩 텍스트 업데이트
const updateLoadingText = () => {
  const textIndex = Math.min(
    Math.floor(progress.value / 33),
    loadingTexts.length - 1
  );
  loadingText.value = loadingTexts[textIndex];
};

onMounted(() => {
  // 프로그레스 바 업데이트 (100ms마다)
  progressInterval = setInterval(() => {
    updateProgress();
    updateLoadingText();

    // 로딩 완료 시
    if (progress.value >= 100) {
      setTimeout(() => {
        emit('loading-complete');
      }, 100);
    }
  }, 100);
});

onUnmounted(() => {
  if (progressInterval) clearInterval(progressInterval);
});
</script>

<style scoped>
/* 파도 애니메이션 */
@keyframes wave {
  0%,
  100% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(calc(-1 * var(--wave-height, 20px)));
  }
}

.animate-wave {
  animation: wave 1.5s ease-in-out infinite;
}

/* 호버 효과 */
.animate-wave:hover img {
  transform: scale(1.05);
}

/* 추가적인 글로우 효과 */
@keyframes glow {
  0%,
  100% {
    filter: drop-shadow(0 0 5px rgba(195, 209, 131, 0.3));
  }
  50% {
    filter: drop-shadow(0 0 15px rgba(195, 209, 131, 0.6));
  }
}

.animate-wave img {
  animation:
    wave 1.5s ease-in-out infinite,
    glow 2s ease-in-out infinite;
  animation-delay: inherit, calc(var(--delay, 0s) + 0.5s);
}
</style>
