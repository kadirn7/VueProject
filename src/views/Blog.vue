<template>
  <div class="blog">
    <div class="blog-header">
      <h1>Mini Blog</h1>
      <button 
        @click="showForm = !showForm" 
        class="add-button"
        :class="{ active: showForm }"
      >
        <span class="icon">{{ showForm ? '×' : '+' }}</span>
        {{ showForm ? 'Vazgeç' : 'Blog Ekle' }}
      </button>
    </div>
    
    <!-- Blog Yazısı Ekleme Formu -->
    <transition name="slide">
      <div v-if="showForm" class="blog-form">
        <h2>Yeni Blog Yazısı</h2>
        <input 
          v-model="newPost.title" 
          type="text" 
          placeholder="Başlık"
          class="form-input"
        >
        <textarea 
          v-model="newPost.content" 
          placeholder="İçerik"
          class="form-input"
          rows="4"
        ></textarea>
        <div class="form-footer">
          <input 
            type="file" 
            ref="imageInput"
            @change="handleImageUpload" 
            accept="image/*"
            class="file-input"
          >
          <button @click="$refs.imageInput.click()" class="btn secondary">
            Resim Ekle
          </button>
          <button @click="addPost" class="btn primary" :disabled="!isValidPost">
            Yayınla
          </button>
        </div>
      </div>
    </transition>

    <!-- Blog Yazıları Listesi -->
    <div class="blog-list">
      <div v-if="posts.length === 0" class="empty-state">
        <span class="empty-icon">📝</span>
        <p>Henüz blog yazısı yok.</p>
        <button @click="showForm = true" class="btn primary">İlk Yazıyı Ekle</button>
      </div>
      
      <div v-else class="posts">
        <div v-for="post in sortedPosts" :key="post.id" class="post-card">
          <img 
            v-if="post.image" 
            :src="post.image" 
            :alt="post.title"
            class="post-image"
          >
          <div class="post-content">
            <!-- Düzenleme modu için koşullu render -->
            <div v-if="editingPost && editingPost.id === post.id">
              <input 
                v-model="editingPost.title" 
                class="form-input"
                placeholder="Başlık"
              >
              <textarea 
                v-model="editingPost.content" 
                class="form-input"
                rows="4"
                placeholder="İçerik"
              ></textarea>
              <div class="edit-actions">
                <button @click="saveEdit" class="btn primary">Kaydet</button>
                <button @click="cancelEdit" class="btn secondary">İptal</button>
              </div>
            </div>
            <!-- Normal görünüm -->
            <div v-else>
              <h3>{{ post.title }}</h3>
              <p class="post-date">{{ formatDate(post.date) }}</p>
              <p class="post-text">{{ post.content }}</p>
              <div class="post-actions">
                <button @click="startEdit(post)" class="btn secondary">
                  Düzenle
                </button>
                <button @click="deletePost(post.id)" class="btn danger">
                  Sil
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Blog',
  data() {
    return {
      showForm: false,
      newPost: {
        title: '',
        content: '',
        image: null
      },
      posts: [],
      editingPost: null // Düzenlenen post için yeni state
    }
  },
  computed: {
    isValidPost() {
      return this.newPost.title.trim() && this.newPost.content.trim()
    },
    sortedPosts() {
      return [...this.posts].sort((a, b) => b.date - a.date)
    }
  },
  methods: {
    addPost() {
      if (!this.isValidPost) return

      const post = {
        id: Date.now(),
        title: this.newPost.title,
        content: this.newPost.content,
        image: this.newPost.image,
        date: new Date().getTime()
      }

      this.posts.push(post)
      this.savePosts()
      this.resetForm()
      this.showForm = false
    },
    deletePost(id) {
      if (confirm('Bu blog yazısını silmek istediğinizden emin misiniz?')) {
        this.posts = this.posts.filter(post => post.id !== id)
        this.savePosts()
      }
    },
    handleImageUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      if (!file.type.startsWith('image/')) {
        alert('Lütfen bir resim dosyası seçin')
        return
      }

      const reader = new FileReader()
      reader.onload = (e) => {
        this.newPost.image = e.target.result
      }
      reader.readAsDataURL(file)
    },
    resetForm() {
      this.newPost = {
        title: '',
        content: '',
        image: null
      }
      if (this.$refs.imageInput) {
        this.$refs.imageInput.value = ''
      }
    },
    formatDate(timestamp) {
      return new Date(timestamp).toLocaleDateString('tr-TR', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    },
    savePosts() {
      localStorage.setItem('blog-posts', JSON.stringify(this.posts))
    },
    loadPosts() {
      const savedPosts = localStorage.getItem('blog-posts')
      if (savedPosts) {
        this.posts = JSON.parse(savedPosts)
      }
    },
    // Düzenleme işlemleri için yeni metodlar
    startEdit(post) {
      this.editingPost = {
        id: post.id,
        title: post.title,
        content: post.content,
        image: post.image,
        date: post.date
      }
    },
    
    saveEdit() {
      if (!this.editingPost.title.trim() || !this.editingPost.content.trim()) {
        alert('Başlık ve içerik alanları boş bırakılamaz!')
        return
      }

      const index = this.posts.findIndex(p => p.id === this.editingPost.id)
      if (index !== -1) {
        // Düzenleme tarihini güncelle
        this.editingPost.date = new Date().getTime()
        this.posts[index] = { ...this.editingPost }
        this.savePosts()
      }
      this.editingPost = null
    },
    
    cancelEdit() {
      this.editingPost = null
    }
  },
  created() {
    this.loadPosts()
  }
}
</script>

<style scoped>
.blog {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.blog-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-button {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 25px;
  cursor: pointer;
  font-size: 1rem;
  transition: all 0.3s ease;
}

.add-button:hover {
  background: #3aa876;
  transform: translateY(-2px);
}

.add-button.active {
  background: #ff4444;
}

.add-button.active:hover {
  background: #cc0000;
}

.icon {
  font-size: 1.5rem;
  line-height: 1;
}

/* Form animasyonu */
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.blog-form {
  background: #f5f5f5;
  padding: 20px;
  border-radius: 8px;
  margin-bottom: 30px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.form-input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

.form-footer {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 10px;
}

.file-input {
  display: none;
}

.btn {
  padding: 6px 12px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.2s ease;
}

.btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.btn.primary {
  background: #42b983;
  color: white;
}

.btn.primary:hover {
  background: #3aa876;
}

.btn.secondary {
  background: #6c757d;
  color: white;
}

.btn.secondary:hover {
  background: #5a6268;
}

.btn.danger {
  background: #ff4444;
  color: white;
}

.btn.danger:hover {
  background: #cc0000;
}

.posts {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.post-card {
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  position: relative;
}

.post-card:hover {
  transform: translateY(-5px);
}

.post-image {
  width: 100%;
  height: 200px;
  object-fit: cover;
}

.post-content {
  padding: 20px;
}

.post-date {
  color: #666;
  font-size: 0.9rem;
  margin: 5px 0;
}

.post-text {
  margin: 10px 0;
  line-height: 1.5;
  white-space: pre-line;
}

.post-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 10px;
}

.empty-state {
  text-align: center;
  padding: 60px 20px;
  background: #f5f5f5;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.empty-icon {
  font-size: 48px;
  opacity: 0.7;
}

.edit-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 15px;
}

/* Düzenleme formu stilleri */
.post-content .form-input {
  margin: 8px 0;
  background: #f8f9fa;
}

/* Düzenleme modu için ek stiller */
.post-card.editing {
  border: 2px solid #42b983;
}
</style> 