<template>
  <div id="app">
    <app-header></app-header>
    <nav>
      <router-link to="/">Ana Sayfa</router-link> |
      <router-link to="/about">Hakkımızda</router-link>
    </nav>
    <router-view></router-view>
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

<style scoped>
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
