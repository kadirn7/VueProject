<template>
  <div class="pomodoro">
    <h1>Pomodoro Timer</h1>
    
    <div class="timer-container">
      <Timer 
        :current-time="$store.state.currentTime"
        :is-break="$store.state.isBreak"
      />
      
      <Controls 
        :is-running="$store.state.isRunning"
        @start="startTimer"
        @pause="pauseTimer"
        @reset="resetTimer"
      />
      
      <Settings 
        :work-duration="$store.state.workDuration"
        :break-duration="$store.state.breakDuration"
        :is-running="$store.state.isRunning"
        @update:workDuration="updateWorkDuration"
        @update:breakDuration="updateBreakDuration"
      />

      <div class="stats">
        <p>Toplam Çalışma Süresi: {{ $store.getters.formattedTotalTime }}</p>
        <p>Tamamlanan Pomodoro: {{ $store.state.completedSessions }}</p>
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
  methods: {
    startTimer() {
      this.$store.dispatch('startTimer')
    },
    pauseTimer() {
      this.$store.dispatch('pauseTimer')
    },
    resetTimer() {
      this.$store.dispatch('resetTimer')
    },
    updateWorkDuration(duration) {
      this.$store.commit('setWorkDuration', duration)
    },
    updateBreakDuration(duration) {
      this.$store.commit('setBreakDuration', duration)
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
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style> 