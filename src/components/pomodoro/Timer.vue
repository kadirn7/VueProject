<template>
  <div class="timer">
    {{ formatTime(currentTime) }}
  </div>
  <div class="timer-type">
    {{ isBreak ? 'Mola Zamanı' : 'Çalışma Zamanı' }}
  </div>
</template>

<script>
export default {
  name: 'Timer',
  props: {
    currentTime: {
      type: Number,
      required: true
    },
    isBreak: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = seconds % 60;
      return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  }
}
</script>

<style scoped>
.timer {
  font-size: 6rem;
  font-weight: bold;
  color: #2c3e50;
  margin: 20px 0;
}

.timer-type {
  font-size: 1.5rem;
  color: #42b983;
  margin-bottom: 20px;
}
</style> 