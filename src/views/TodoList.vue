<template>
  <div class="todolist">
    <h1>TodoList Projesi</h1>
    
    <TaskForm @add-task="addTask" />

    <div class="task-list">
      <TaskItem
        v-for="(task, index) in sortedTasks"
        :key="task.id"
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
  computed: {
    sortedTasks() {
      // Görevleri ters çevirerek yeni eklenenler üstte görünsün
      return [...this.tasks].reverse();
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
        id: Date.now(), // Benzersiz ID ekle
        text,
        completed: false,
        createdAt: new Date().toISOString() // Oluşturma zamanını kaydet
      });
      this.saveTasks(); // Yeni görev eklendiğinde kaydet
    },
    toggleComplete(index) {
      // reverse() nedeniyle gerçek indeksi hesapla
      const realIndex = this.tasks.length - 1 - index;
      this.tasks[realIndex].completed = !this.tasks[realIndex].completed;
      this.saveTasks(); // Görev durumu değiştiğinde kaydet
    },
    updateTask(index, text) {
      // reverse() nedeniyle gerçek indeksi hesapla
      const realIndex = this.tasks.length - 1 - index;
      this.tasks[realIndex].text = text;
      this.saveTasks(); // Görev güncellendiğinde kaydet
    },
    deleteTask(index) {
      // reverse() nedeniyle gerçek indeksi hesapla
      const realIndex = this.tasks.length - 1 - index;
      this.tasks.splice(realIndex, 1);
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