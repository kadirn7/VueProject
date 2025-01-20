<template>
  <div class="task-item">
    <div v-if="!isEditing" class="task-view">
      <input 
        type="checkbox" 
        :checked="task.completed"
        @change="$emit('toggle-complete', task)"
      >
      <span :class="{ completed: task.completed }">{{ task.text }}</span>
      <div class="task-actions">
        <button @click="startEditing">Düzenle</button>
        <button @click="$emit('delete-task')" class="delete">Sil</button>
      </div>
    </div>
    
    <div v-else class="task-edit">
      <input 
        type="text" 
        v-model="editedText"
        @keyup.enter="saveEdit"
      >
      <button @click="saveEdit">Kaydet</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TaskItem',
  props: {
    task: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      editedText: this.task.text
    }
  },
  methods: {
    startEditing() {
      this.isEditing = true;
      this.editedText = this.task.text;
    },
    saveEdit() {
      if (this.editedText.trim()) {
        this.$emit('update-task', this.editedText);
        this.isEditing = false;
      }
    }
  }
}
</script>

<style scoped>
.task-item {
  background: #f5f5f5;
  padding: 10px;
  border-radius: 4px;
}

.task-view {
  display: flex;
  align-items: center;
  gap: 10px;
}

.task-view span {
  flex: 1;
}

.task-actions {
  display: flex;
  gap: 5px;
}

.completed {
  text-decoration: line-through;
  color: #666;
}

.task-edit {
  display: flex;
  gap: 10px;
}

.task-edit input {
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

button.delete {
  background-color: #ff4444;
}

button.delete:hover {
  background-color: #cc0000;
}
</style> 