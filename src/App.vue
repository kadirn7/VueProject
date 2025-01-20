<template>
  <div id="app">
    <div class="content-wrapper">
      <app-header></app-header>
      <nav>
        <router-link to="/">Ana Sayfa</router-link> |
        <router-link to="/todolist">TodoList</router-link> |
        <router-link to="/pomodoro">Pomodoro</router-link> |
        <router-link to="/calculator">Hesap Makinesi</router-link> |
        <router-link to="/weather">Hava Durumu</router-link> |
        <router-link to="/gallery">Galeri</router-link> |
        <router-link to="/about">Hakkımızda</router-link>
      </nav>
      <router-view></router-view>
    </div>
    <app-footer></app-footer>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'

export default {
  components: {
    "app-header": Header,
    "app-footer": Footer
  }
}
</script>

<style>
#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.content-wrapper {
  flex: 1;
}

nav {
  padding: 20px;
  text-align: center;
}

nav a {
  margin: 0 10px;
  text-decoration: none;
  color: #2c3e50;
}

nav a.router-link-active {
  color: #42b983;
}
</style>
