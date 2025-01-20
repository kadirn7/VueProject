<template>
  <div class="mini-timer" v-if="$store.state.isRunning">
    <div class="mini-content">
      <div class="time">{{ $store.getters.formattedTime }}</div>
      <div class="status" :class="{ break: $store.state.isBreak }">
        {{ $store.state.isBreak ? 'Mola' : 'Çalışma' }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MiniTimer'
}
</script>

<style scoped>
.mini-timer {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: #ffffff;
  padding: 10px 15px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  border: 1px solid #e0e0e0;
  min-width: 100px;
}

.mini-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 5px;
}

.time {
  font-size: 1.2rem;
  font-weight: bold;
  color: #2c3e50;
}

.status {
  font-size: 0.8rem;
  color: #42b983;
  font-weight: 500;
}

.status.break {
  color: #ff7675;
}
</style> 