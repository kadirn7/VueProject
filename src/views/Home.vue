<template>
  <div class="home">
    <h1>Vuejs Projelerim</h1>
    <div class="projects-grid">
      <div class="project-card" @click="$router.push('/todolist')">
        <h3>TodoList Projesi</h3>
        <p>Vue.js ile geliştirilmiş todo list uygulaması</p>
      </div>
      <!-- Diğer projeler buraya eklenebilir -->
    </div>
  </div>
</template>

<script>
export default {
  name: 'Home'
}
</script>

<style scoped>
.home {
  padding: 20px;
  text-align: center;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px;
}

.project-card {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  cursor: pointer;
  transition: transform 0.2s;
}

.project-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}
</style> 