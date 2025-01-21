<template>
  <div class="home">
    <div class="projects-grid">
      <div class="project-card" @click="$router.push('/todolist')">
        <h3>TodoList Projesi</h3>
        <p>Vue.js ile geliştirilmiş todo list uygulaması</p>
      </div>
      <div class="project-card" @click="$router.push('/pomodoro')">
        <h3>Pomodoro Timer</h3>
        <p>Zaman yönetimi için Pomodoro tekniği uygulaması</p>
      </div>
      <div class="project-card" @click="$router.push('/calculator')">
        <h3>Hesap Makinesi</h3>
        <p>Temel matematiksel işlemler için hesap makinesi uygulaması</p>
      </div>
      <div class="project-card" @click="$router.push('/weather')">
        <h3>Hava Durumu</h3>
        <p>Türkiye şehirleri için güncel hava durumu bilgileri</p>
      </div>
      <div class="project-card" @click="$router.push('/gallery')">
        <h3>Resim Galerisi</h3>
        <p>Resimlerinizi yükleyip düzenleyebileceğiniz galeri uygulaması</p>
      </div>
      <div class="project-card" @click="$router.push('/blog')">
        <h3>Mini Blog</h3>
        <p>Blog yazılarınızı paylaşabileceğiniz mini blog uygulaması</p>
      </div>
      <div class="project-card" @click="$router.push('/tictactoe')">
        <h3>Tic Tac Toe</h3>
        <p>İki kişilik klasik XOX oyunu</p>
      </div>
      <div class="project-card" @click="$router.push('/2048')">
        <h3>2048</h3>
        <p>Klasik 2048 sayı birleştirme oyunu</p>
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