<template>
  <div class="settings">
    <div class="setting-group">
      <label>Çalışma Süresi (dk):</label>
      <select :value="workDuration" @input="$emit('update:workDuration', $event.target.value)" :disabled="isRunning">
        <option value="25">25</option>
        <option value="30">30</option>
        <option value="45">45</option>
        <option value="60">60</option>
      </select>
    </div>

    <div class="setting-group">
      <label>Mola Süresi (dk):</label>
      <select :value="breakDuration" @input="$emit('update:breakDuration', $event.target.value)" :disabled="isRunning">
        <option value="5">5</option>
        <option value="10">10</option>
        <option value="15">15</option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Settings',
  props: {
    workDuration: {
      type: [Number, String],
      required: true
    },
    breakDuration: {
      type: [Number, String],
      required: true
    },
    isRunning: {
      type: Boolean,
      default: false
    }
  }
}
</script>

<style scoped>
.settings {
  margin-top: 20px;
  display: flex;
  gap: 20px;
  justify-content: center;
}

.setting-group {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

select {
  padding: 5px;
  border-radius: 4px;
  border: 1px solid #ddd;
}

label {
  font-size: 0.9rem;
  color: #666;
}
</style> 