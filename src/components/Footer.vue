<template>
  <footer class="app-footer">
    <div class="footer-content">
      <p class="copyright">
        <a 
          href="https://www.linkedin.com/in/kadir-pasaoglu/" 
          target="_blank" 
          class="author"
        >
          @AbdulKadir Paşaoğlu
        </a>
        &copy; {{ new Date().getFullYear() }} Tüm hakları saklıdır.
      </p>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'Footer'
}
</script>

<style scoped>
.app-footer {
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
  margin-top: auto;
}

.footer-content {
  max-width: 1200px;
  margin: 0 auto;
}

.copyright {
  color: #6c757d;
  font-size: 0.9rem;
}

.author {
  color: #42b983;
  font-weight: 500;
  margin-right: 10px;
  text-decoration: none;
  transition: color 0.3s ease;
}

.author:hover {
  color: #3aa876;
}
</style> 