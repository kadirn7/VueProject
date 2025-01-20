<template>
  <div class="weather">
    <h1>Hava Durumu</h1>
    
    <div class="weather-container">
      <div class="city-select">
        <select v-model="selectedCity" @change="getWeather">
          <option value="">Şehir Seçin</option>
          <option v-for="city in cities" :key="city.id" :value="city.name">
            {{ city.name }}
          </option>
        </select>
      </div>

      <div v-if="weatherData" class="weather-info">
        <div class="weather-main">
          <img :src="weatherData.current.condition.icon" :alt="weatherData.current.condition.text">
          <h2>{{ selectedCity }}</h2>
          <p class="temperature">{{ weatherData.current.temp_c }}°C</p>
          <p class="description">{{ weatherData.current.condition.text }}</p>
        </div>
        
        <div class="weather-details">
          <div class="detail">
            <span>Hissedilen</span>
            <span>{{ weatherData.current.feelslike_c }}°C</span>
          </div>
          <div class="detail">
            <span>Nem</span>
            <span>{{ weatherData.current.humidity }}%</span>
          </div>
          <div class="detail">
            <span>Rüzgar</span>
            <span>{{ weatherData.current.wind_kph }} km/s</span>
          </div>
        </div>
      </div>

      <div v-else-if="error" class="error">
        {{ error }}
      </div>

      <div v-else class="placeholder">
        Lütfen bir şehir seçin
      </div>
    </div>
  </div>
</template>

<script>
const API_KEY = '395656507dea407db65205600252001'

export default {
  name: 'Weather',
  data() {
    return {
      selectedCity: '',
      weatherData: null,
      error: null,
      cities: [
        { id: 1, name: 'Adana' },
        { id: 2, name: 'Ankara' },
        { id: 3, name: 'Antalya' },
        { id: 4, name: 'Bursa' },
        { id: 5, name: 'Eskisehir' },
        { id: 6, name: 'Gaziantep' },
        { id: 7, name: 'Hatay' },
        { id: 8, name: 'Istanbul' },
        { id: 9, name: 'Izmir' },
        { id: 10, name: 'Konya' },
        { id: 11, name: 'Trabzon' }
      ]
    }
  },
  methods: {
    async getWeather() {
      if (!this.selectedCity) return
      
      try {
        this.error = null
        const response = await fetch(
          `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${this.selectedCity}&aqi=no&lang=tr`
        )
        
        if (!response.ok) {
          throw new Error('Hava durumu bilgisi alınamadı')
        }
        
        this.weatherData = await response.json()
      } catch (err) {
        this.error = err.message
        this.weatherData = null
      }
    }
  }
}
</script>

<style scoped>
.weather {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
}

.weather-container {
  background: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.city-select {
  margin-bottom: 20px;
}

select {
  width: 200px;
  padding: 10px;
  border-radius: 5px;
  border: 1px solid #ddd;
  font-size: 1rem;
}

.weather-info {
  text-align: center;
}

.weather-main {
  margin-bottom: 20px;
}

.weather-main img {
  width: 100px;
  height: 100px;
}

.temperature {
  font-size: 3rem;
  margin: 10px 0;
  color: #2c3e50;
}

.description {
  color: #666;
  text-transform: capitalize;
}

.weather-details {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  padding: 20px;
  background: white;
  border-radius: 8px;
}

.detail {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.detail span:first-child {
  color: #666;
  font-size: 0.9rem;
}

.detail span:last-child {
  font-size: 1.1rem;
  font-weight: bold;
  color: #2c3e50;
}

.error {
  color: #ff4444;
  text-align: center;
  padding: 20px;
}

.placeholder {
  text-align: center;
  color: #666;
  padding: 40px;
}
</style> 