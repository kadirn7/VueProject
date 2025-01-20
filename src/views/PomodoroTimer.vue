<template>
  <div class="pomodoro">
    <h1>Pomodoro Timer</h1>
    
    <div class="timer-container">
      <Timer 
        :current-time="currentTime"
        :is-break="isBreak"
      />
      
      <Controls 
        :is-running="isRunning"
        @start="startTimer"
        @pause="pauseTimer"
        @reset="resetTimer"
      />

      <Settings 
        v-model:work-duration="workDuration"
        v-model:break-duration="breakDuration"
        :is-running="isRunning"
      />

      <div class="stats" v-if="totalWorkTime > 0">
        <p>Toplam Çalışma Süresi: {{ formatTotalTime(totalWorkTime) }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import Timer from '../components/pomodoro/Timer.vue'
import Controls from '../components/pomodoro/Controls.vue'
import Settings from '../components/pomodoro/Settings.vue'

export default {
  name: 'PomodoroTimer',
  components: {
    Timer,
    Controls,
    Settings
  },
  data() {
    return {
      workDuration: 25,
      breakDuration: 5,
      currentTime: 25 * 60,
      isRunning: false,
      isBreak: false,
      timer: null,
      totalWorkTime: 0,
      lastTimestamp: null
    }
  },
  created() {
    // LocalStorage'dan verileri yükle
    const savedState = localStorage.getItem('pomodoro-state');
    if (savedState) {
      const state = JSON.parse(savedState);
      this.workDuration = state.workDuration;
      this.breakDuration = state.breakDuration;
      this.currentTime = state.currentTime;
      this.isBreak = state.isBreak;
      this.totalWorkTime = state.totalWorkTime || 0;
      
      // Eğer timer çalışıyorduysa, kaldığı yerden devam et
      if (state.isRunning) {
        this.startTimer();
      }
    }
  },
  methods: {
    saveState() {
      const state = {
        workDuration: this.workDuration,
        breakDuration: this.breakDuration,
        currentTime: this.currentTime,
        isRunning: this.isRunning,
        isBreak: this.isBreak,
        totalWorkTime: this.totalWorkTime
      };
      localStorage.setItem('pomodoro-state', JSON.stringify(state));
    },
    startTimer() {
      if (!this.isRunning) {
        this.isRunning = true;
        this.lastTimestamp = Date.now();
        
        this.timer = setInterval(() => {
          if (this.currentTime > 0) {
            this.currentTime--;
            
            // Çalışma süresini hesapla (sadece çalışma modunda)
            if (!this.isBreak) {
              const now = Date.now();
              this.totalWorkTime += (now - this.lastTimestamp) / 1000;
              this.lastTimestamp = now;
            }
          } else {
            this.handleTimerComplete();
          }
          this.saveState();
        }, 1000);
      }
    },
    pauseTimer() {
      clearInterval(this.timer);
      this.isRunning = false;
      this.saveState();
    },
    resetTimer() {
      this.pauseTimer();
      this.isBreak = false;
      this.currentTime = this.workDuration * 60;
      this.saveState();
    },
    handleTimerComplete() {
      this.playNotificationSound();
      this.isBreak = !this.isBreak;
      this.currentTime = (this.isBreak ? this.breakDuration : this.workDuration) * 60;
      this.saveState();
    },
    playNotificationSound() {
      const audio = new Audio('https://actions.google.com/sounds/v1/alarms/beep_short.ogg');
      audio.play();
    },
    formatTotalTime(seconds) {
      const hours = Math.floor(seconds / 3600);
      const minutes = Math.floor((seconds % 3600) / 60);
      return `${hours} saat ${minutes} dakika`;
    }
  },
  beforeUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  },
  watch: {
    workDuration(newValue) {
      if (!this.isRunning && !this.isBreak) {
        this.currentTime = newValue * 60;
        this.saveState();
      }
    }
  }
}
</script>

<style scoped>
.pomodoro {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.timer-container {
  background: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  margin-top: 20px;
}

.stats {
  margin-top: 20px;
  padding: 10px;
  background: #e8f5e9;
  border-radius: 5px;
  color: #2c3e50;
}
</style> 