<template>
  <!-- 모달 오버레이 -->
  <div
    v-if="isLoading"
    class="fixed inset-0 flex items-center justify-center bg-black/20 z-50"
    @click.self="handleOverlayClick"
  >
    <!-- 모달 컨텐츠 -->
    <div
      class="bg-ivory rounded-2xl max-w-md w-70 shadow-2xl h-55 flex flex-col items-center justify-center gap-4"
    >
      <!-- 캐릭터 파도 애니메이션 영역 -->
      <div class="flex items-center justify-center">
        <!-- 캐릭터들이 일렬로 배치 -->
        <div
          v-for="(character, index) in characters"
          :key="character.name"
          class="flex flex-col items-center animate-wave"
          :style="{
            animationDelay: index * 0.1 + 's',
            '--wave-height': '10px',
          }"
        >
          <img
            :src="character.src"
            :alt="character.name"
            class="w-12 h-12 object-contain drop-shadow-lg transition-transform duration-300"
          />
        </div>
      </div>

      <!-- 로딩 스피너 -->
      <p class="text-limegreen-800 text-2xl">로딩중...</p>
    </div>
  </div>
</template>

<script setup>
import { onUnmounted, ref, watch } from 'vue';

// 캐릭터 이미지 import
import characterA from '@/assets/img/characters/A.png';
import characterB from '@/assets/img/characters/B.png';
import characterC from '@/assets/img/characters/C.png';
import characterD from '@/assets/img/characters/D.png';
import characterE from '@/assets/img/characters/E.png';

// Props
const props = defineProps({
  isLoading: {
    type: Boolean,
    default: true,
  },
  autoClose: {
    type: Boolean,
    default: true,
  },
  duration: {
    type: Number,
    default: 2000, // 기본 2초 (20 * 100ms)
  },
  allowOverlayClose: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['loading-complete', 'close']);

// 캐릭터 데이터 - 모든 캐릭터가 항상 보임
const characters = ref([
  { src: characterA, name: 'A' },
  { src: characterB, name: 'B' },
  { src: characterC, name: 'C' },
  { src: characterD, name: 'D' },
  { src: characterE, name: 'E' },
]);

let loadingTimeout;

// 로딩 시작
const startLoading = () => {
  if (props.autoClose) {
    // duration 시간 후 자동 완료
    loadingTimeout = setTimeout(() => {
      emit('loading-complete');
      emit('close');
    }, props.duration);
  }
};

// 로딩 정지
const stopLoading = () => {
  if (loadingTimeout) {
    clearTimeout(loadingTimeout);
    loadingTimeout = null;
  }
};

// 오버레이 클릭 처리
const handleOverlayClick = () => {
  if (props.allowOverlayClose) {
    stopLoading();
    emit('close');
  }
};

// 로딩 상태가 변경될 때 처리
watch(
  () => props.isLoading,
  newValue => {
    if (newValue) {
      startLoading();
    } else {
      stopLoading();
    }
  },
  { immediate: true }
);

onUnmounted(() => {
  stopLoading();
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
    transform: translateY(calc(-1 * var(--wave-height, 10px)));
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

/* 로딩 스피너 bounce 애니메이션 */
@keyframes spinner-bounce {
  0%,
  80%,
  100% {
    transform: scale(0.8);
    opacity: 0.6;
  }
  40% {
    transform: scale(1.2);
    opacity: 1;
  }
}

.animate-bounce-delay-0 {
  animation: spinner-bounce 1.4s infinite ease-in-out;
  animation-delay: 0s;
}

.animate-bounce-delay-1 {
  animation: spinner-bounce 1.4s infinite ease-in-out;
  animation-delay: 0.16s;
}

.animate-bounce-delay-2 {
  animation: spinner-bounce 1.4s infinite ease-in-out;
  animation-delay: 0.32s;
}

.animate-bounce-delay-3 {
  animation: spinner-bounce 1.4s infinite ease-in-out;
  animation-delay: 0.48s;
}

.animate-bounce-delay-4 {
  animation: spinner-bounce 1.4s infinite ease-in-out;
  animation-delay: 0.64s;
}

.animate-wave img {
  animation:
    wave 1.5s ease-in-out infinite,
    glow 2s ease-in-out infinite;
  animation-delay: inherit, calc(var(--delay, 0s) + 0.5s);
}

/* 모달 등장 애니메이션 */
.modal-enter-active,
.modal-leave-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-content-enter-active,
.modal-content-leave-active {
  transition: transform 0.3s ease;
}

.modal-content-enter-from,
.modal-content-leave-to {
  transform: scale(0.9);
}
</style>
