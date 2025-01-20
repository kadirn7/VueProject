<template>
  <div class="gallery">
    <h1>Resim Galerisi</h1>
    
    <div class="upload-section">
      <input 
        type="file" 
        ref="fileInput"
        @change="handleFileUpload"
        accept="image/*"
        multiple
        class="file-input"
      >
      <button @click="$refs.fileInput.click()" class="upload-btn">
        Resim Yükle
      </button>
    </div>

    <div v-if="images.length === 0" class="empty-gallery">
      Henüz resim yüklenmedi. Yukarıdaki butonu kullanarak resim ekleyebilirsiniz.
    </div>

    <div v-else class="gallery-grid">
      <div 
        v-for="(image, index) in images" 
        :key="index"
        class="image-card"
        @click="openLightbox(index)"
      >
        <img :src="image.url" :alt="image.name">
        <div class="image-overlay">
          <span class="image-name">{{ image.name }}</span>
          <button @click.stop="deleteImage(index)" class="delete-btn">
            Sil
          </button>
        </div>
      </div>
    </div>

    <!-- Lightbox -->
    <div v-if="lightbox.show" class="lightbox" @click="closeLightbox">
      <button class="close-btn" @click="closeLightbox">&times;</button>
      <button 
        v-if="images.length > 1" 
        class="nav-btn prev" 
        @click.stop="navigate(-1)"
      >&lt;</button>
      <button 
        v-if="images.length > 1" 
        class="nav-btn next" 
        @click.stop="navigate(1)"
      >&gt;</button>
      <div class="lightbox-content" @click.stop>
        <img 
          :src="images[lightbox.currentIndex].url" 
          alt="Tam ekran görüntü"
          @wheel.prevent="handleZoom"
          :style="{ transform: `scale(${zoomLevel})` }"
        >
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Gallery',
  data() {
    return {
      images: [],
      lightbox: {
        show: false,
        currentIndex: 0
      },
      zoomLevel: 1
    }
  },
  created() {
    // LocalStorage'dan resimleri yükle
    const savedImages = localStorage.getItem('gallery-images')
    if (savedImages) {
      this.images = JSON.parse(savedImages)
    }
  },
  methods: {
    handleFileUpload(event) {
      const files = event.target.files
      if (!files.length) return

      Array.from(files).forEach(file => {
        if (!file.type.startsWith('image/')) return

        const reader = new FileReader()
        reader.onload = (e) => {
          this.images.push({
            name: file.name,
            url: e.target.result,
            date: new Date().toISOString()
          })
          this.saveImages()
        }
        reader.readAsDataURL(file)
      })
    },
    deleteImage(index) {
      if (confirm('Bu resmi silmek istediğinizden emin misiniz?')) {
        this.images.splice(index, 1)
        this.saveImages()
      }
    },
    saveImages() {
      localStorage.setItem('gallery-images', JSON.stringify(this.images))
    },
    openLightbox(index) {
      this.lightbox.currentIndex = index
      this.lightbox.show = true
      this.zoomLevel = 1
      document.body.style.overflow = 'hidden'
    },
    closeLightbox() {
      this.lightbox.show = false
      document.body.style.overflow = 'auto'
    },
    navigate(direction) {
      let newIndex = this.lightbox.currentIndex + direction
      if (newIndex >= this.images.length) newIndex = 0
      if (newIndex < 0) newIndex = this.images.length - 1
      this.lightbox.currentIndex = newIndex
    },
    handleZoom(event) {
      const delta = event.deltaY > 0 ? -0.1 : 0.1
      const newZoom = this.zoomLevel + delta
      
      this.zoomLevel = Math.min(Math.max(1, newZoom), 3)
    }
  }
}
</script>

<style scoped>
.gallery {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.upload-section {
  margin: 20px 0;
  text-align: center;
}

.file-input {
  display: none;
}

.upload-btn {
  padding: 10px 20px;
  background-color: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1.1rem;
  transition: background-color 0.3s;
}

.upload-btn:hover {
  background-color: #3aa876;
}

.empty-gallery {
  text-align: center;
  padding: 40px;
  color: #666;
  background: #f5f5f5;
  border-radius: 10px;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
  padding: 20px 0;
}

.image-card {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
  cursor: pointer;
  aspect-ratio: 1;
}

.image-card img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.image-card:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-card:hover .image-overlay {
  opacity: 1;
}

.delete-btn {
  padding: 5px 10px;
  background: #ff4444;
  border: none;
  border-radius: 3px;
  color: white;
  cursor: pointer;
}

.delete-btn:hover {
  background: #cc0000;
}

/* Lightbox Styles */
.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox-content {
  height: 90vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.lightbox-content img {
  max-width: 95vw;
  max-height: 90vh;
  object-fit: contain;
  transition: transform 0.1s ease;
  cursor: zoom-in;
}

.close-btn {
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  z-index: 1001;
}

.nav-btn {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  padding: 20px 15px;
  cursor: pointer;
  font-size: 1.5rem;
  transition: background-color 0.3s;
}

.nav-btn:hover {
  background: rgba(255, 255, 255, 0.3);
}

.prev {
  left: 20px;
}

.next {
  right: 20px;
}
</style> 