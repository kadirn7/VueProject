<template>
  <div class="add-task">
    <input 
      type="text" 
      v-model="taskText" 
      placeholder="Yeni görev ekle..."
      @keyup.enter="handleSubmit"
    >
    <button @click="handleSubmit">Ekle</button>
  </div>
</template>

<script>
export default {
  name: 'TaskForm',
  data() {
    return {
      taskText: ''
    }
  },
  methods: {
    handleSubmit() {
      if (this.taskText.trim()) {
        this.$emit('add-task', this.taskText);
        this.taskText = '';
      }
    }
  }
}
</script>

<style scoped>
.add-task {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.add-task input {
  flex: 1;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #3aa876;
}
</style> 