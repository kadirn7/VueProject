<template>
  <div class="about">
    <div class="about-container">
      <div class="profile-section">
        <div class="profile-image">
          <span class="avatar">AP</span>
        </div>
        <h1>AbdulKadir Paşaoğlu</h1>
        <p class="title">Bilgisayar Mühendisi Adayı</p>
        <div class="social-links">
          <a href="https://github.com/kadirn7" target="_blank" class="github-link">
            <i class="fab fa-github"></i>
            GitHub Profilim
          </a>
          <a href="https://www.linkedin.com/in/kadir-pasaoglu/" target="_blank" class="linkedin-link">
            <i class="fab fa-linkedin"></i>
            LinkedIn
          </a>
        </div>
      </div>

      <div class="content-section">
        <h2>Hakkımda</h2>
        <p>
          Merhaba! Ben AbdulKadir Paşaoğlu. Karadeniz Teknik Üniversitesi Bilgisayar Mühendisliği 
          4. sınıf öğrencisiyim. Yazılım geliştirme konusunda tutkulu ve sürekli öğrenmeye açık 
          bir geliştiriciyim.
        </p>

        <h2>Projeler & Yetenekler</h2>
        <p>
          Bu portföy web uygulaması, modern web teknolojilerini kullanarak geliştirdiğim 
          projelerden biridir. Vue.js başta olmak üzere güncel frontend teknolojilerini 
          aktif olarak kullanmaktayım. Projede:
        </p>
        <ul>
          <li>Todo List Uygulaması</li>
          <li>Pomodoro Timer</li>
          <li>Hesap Makinesi</li>
          <li>Hava Durumu Uygulaması</li>
          <li>Resim Galerisi</li>
          <li>Mini Blog</li>
        </ul>
        <p>gibi farklı özelliklere sahip modüller bulunmaktadır.</p>

        <h2>Teknolojiler</h2>
        <div class="tech-stack">
          <span class="tech-tag">Vue.js</span>
          <span class="tech-tag">JavaScript</span>
          <span class="tech-tag">HTML5</span>
          <span class="tech-tag">CSS3</span>
          <span class="tech-tag">Git</span>
          <span class="tech-tag">Responsive Design</span>
          <span class="tech-tag">Angular</span>
          <span class="tech-tag">C#</span>
          <span class="tech-tag">.NET</span>
          <span class="tech-tag">Python</span>
          <span class="tech-tag">SQL</span>
        </div>

        <h2>İletişim & Sosyal Medya</h2>
        <p>
          Yazılım geliştirme, yeni teknolojiler ve potansiyel iş birlikleri 
          hakkında görüşmek için benimle iletişime geçebilirsiniz. GitHub profilimden 
          diğer projelerimi inceleyebilirsiniz.
        </p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'About'
}
</script>

<style scoped>
.about {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.about-container {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.profile-section {
  background: linear-gradient(135deg, #42b983 0%, #3aa876 100%);
  color: white;
  padding: 40px 20px;
  text-align: center;
}

.profile-image {
  width: 120px;
  height: 120px;
  margin: 0 auto 20px;
}

.avatar {
  width: 100%;
  height: 100%;
  background: white;
  color: #42b983;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.5rem;
  font-weight: bold;
}

.title {
  font-size: 1.2rem;
  opacity: 0.9;
  margin-top: 5px;
}

.content-section {
  padding: 30px;
}

h2 {
  color: #2c3e50;
  margin-top: 30px;
  margin-bottom: 15px;
  font-size: 1.5rem;
}

p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 15px;
}

ul {
  color: #666;
  line-height: 1.6;
  margin-left: 20px;
  margin-bottom: 15px;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 15px 0;
}

.tech-tag {
  background: #f5f5f5;
  color: #2c3e50;
  padding: 5px 12px;
  border-radius: 15px;
  font-size: 0.9rem;
  transition: all 0.3s ease;
}

.tech-tag:hover {
  background: #42b983;
  color: white;
  transform: translateY(-2px);
}

.social-links {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  gap: 15px;
}

.github-link, .linkedin-link {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: rgba(255, 255, 255, 0.1);
  color: white;
  text-decoration: none;
  border-radius: 20px;
  transition: all 0.3s ease;
}

.github-link:hover, .linkedin-link:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: translateY(-2px);
}

.linkedin-link {
  background: rgba(10, 102, 194, 0.2); /* LinkedIn mavi tonu */
}

.linkedin-link:hover {
  background: rgba(10, 102, 194, 0.3);
}

.github-link i, .linkedin-link i {
  font-size: 1.2rem;
}
</style> 