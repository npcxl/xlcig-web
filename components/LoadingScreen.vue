<template>
  <div class="loading-screen" v-if="show">
    <div class="loader">
      <div class="nucleus"></div>
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
      <div class="ring"></div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  show: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.loading-screen {
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}

.loader {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  animation: pulse 2s infinite ease-in-out;
}

.ring {
  position: absolute;
  width: 190px;
  height: 190px;
  border: 2px solid transparent;
  border-radius: 50%;
  --color: #00f5ff;
  border-bottom: 8px solid var(--color);
  animation: rotate1 1s ease-in-out infinite;
  box-shadow: 0 0 4px rgba(0, 245, 255, 0.3);
}

@keyframes rotate1 {
  from {
    transform: rotateX(50deg) rotateZ(110deg);
  }

  to {
    transform: rotateX(50deg) rotateZ(470deg);
  }
}

.ring:nth-child(2) {
  --color: #00d4ff;
  animation-name: rotate2;
}

@keyframes rotate2 {
  from {
    transform: rotateX(20deg) rotateY(50deg) rotateZ(20deg);
  }

  to {
    transform: rotateX(20deg) rotateY(50deg) rotateZ(380deg);
  }
}

.ring:nth-child(3) {
  --color: #0080ff;
  animation-name: rotate3;
}

@keyframes rotate3 {
  from {
    transform: rotateX(40deg) rotateY(130deg) rotateZ(450deg);
  }

  to {
    transform: rotateX(40deg) rotateY(130deg) rotateZ(90deg);
  }
}

.ring:nth-child(4) {
  --color: #00f5ff;
  animation-name: rotate4;
  width: 380px;
  height: 380px;
  border: 2px solid transparent;
  border-bottom: 16px solid var(--color);
}

@keyframes rotate4 {
  from {
    transform: rotateX(50deg) rotateZ(470deg);
  }

  to {
    transform: rotateX(50deg) rotateZ(110deg);
  }
}

.ring:nth-child(5) {
  --color: #00d4ff;
  animation-name: rotate5;
  width: 380px;
  height: 380px;
  border: 2px solid transparent;
  border-bottom: 16px solid var(--color);
}

@keyframes rotate5 {
  from {
    transform: rotateX(20deg) rotateY(50deg) rotateZ(380deg);
  }

  to {
    transform: rotateX(20deg) rotateY(50deg) rotateZ(20deg);
  }
}

.ring:nth-child(6) {
  --color: #0080ff;
  animation-name: rotate6;
  width: 380px;
  height: 380px;
  border: 2px solid transparent;
  border-bottom: 16px solid var(--color);
}

@keyframes rotate6 {
  from {
    transform: rotateX(40deg) rotateY(130deg) rotateZ(90deg);
  }

  to {
    transform: rotateX(40deg) rotateY(130deg) rotateZ(450deg);
  }
}

/* Pulsing animation for nucleus */
@keyframes pulse {

  0%,
  100% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow:
      0 0 20px #00f5ff,
      0 0 40px #00d4ff;
  }

  50% {
    transform: translate(-50%, -50%) scale(1.2);
    box-shadow:
      0 0 30px #00f5ff,
      0 0 60px #00d4ff;
  }
}

.nucleus {
  width: 20px;
  height: 20px;
  background: radial-gradient(circle, #00f5ff, #00d4ff);
  border-radius: 50%;
  box-shadow:
    0px 0 20px #00f5ff,
    0 0 40px #00d4ff;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  animation: pulse 1s ease-in-out infinite;
}
</style>