<template>
  <div class="controls">
    <button @click="$emit('start')" v-if="!isRunning">Başlat</button>
    <button @click="$emit('pause')" v-else>Duraklat</button>
    <button @click="$emit('reset')">Sıfırla</button>
  </div>
</template>

<script>
export default {
  name: 'Controls',
  props: {
    isRunning: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.controls {
  margin: 20px 0;
  display: flex;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 10px 20px;
  font-size: 1.1rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  background-color: #42b983;
  color: white;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #3aa876;
}
</style> 