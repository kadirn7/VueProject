<template>
  <div class="todolist">
    <h1>TodoList Projesi</h1>
    
    <TaskForm @add-task="addTask" />

    <div class="task-list">
      <TaskItem
        v-for="(task, index) in tasks"
        :key="index"
        :task="task"
        @toggle-complete="toggleComplete(index)"
        @update-task="text => updateTask(index, text)"
        @delete-task="deleteTask(index)"
      />
    </div>
  </div>
</template>

<script>
import TaskForm from '../components/todo/TaskForm.vue'
import TaskItem from '../components/todo/TaskItem.vue'

export default {
  name: 'TodoList',
  components: {
    TaskForm,
    TaskItem
  },
  data() {
    return {
      tasks: []
    }
  },
  created() {
    // Sayfa yüklendiğinde localStorage'dan verileri al
    const savedTasks = localStorage.getItem('todo-tasks');
    if (savedTasks) {
      this.tasks = JSON.parse(savedTasks);
    }
  },
  methods: {
    // LocalStorage'a kaydetme metodu
    saveTasks() {
      localStorage.setItem('todo-tasks', JSON.stringify(this.tasks));
    },
    addTask(text) {
      this.tasks.push({
        text,
        completed: false
      });
      this.saveTasks(); // Yeni görev eklendiğinde kaydet
    },
    toggleComplete(index) {
      this.tasks[index].completed = !this.tasks[index].completed;
      this.saveTasks(); // Görev durumu değiştiğinde kaydet
    },
    updateTask(index, text) {
      this.tasks[index].text = text;
      this.saveTasks(); // Görev güncellendiğinde kaydet
    },
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.saveTasks(); // Görev silindiğinde kaydet
    }
  }
}
</script>

<style scoped>
.todolist {
  padding: 20px;
  max-width: 800px;
  margin: 0 auto;
}

.task-list {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style> 