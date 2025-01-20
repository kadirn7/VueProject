import { createStore } from 'vuex'

export default createStore({
  state: {
    currentTime: 1500, // 25 dakika
    isRunning: false,
    isBreak: false,
    workDuration: 25,
    breakDuration: 5,
    timer: null,
    completedSessions: 0,
    totalWorkTime: 0,  // Toplam çalışma süresi (saniye)
    lastTimestamp: null
  },
  mutations: {
    setCurrentTime(state, time) {
      state.currentTime = time
    },
    setIsRunning(state, status) {
      state.isRunning = status
    },
    setIsBreak(state, status) {
      state.isBreak = status
    },
    setTimer(state, timer) {
      state.timer = timer
    },
    setWorkDuration(state, duration) {
      state.workDuration = duration
      if (!state.isBreak) {
        state.currentTime = duration * 60
      }
    },
    setBreakDuration(state, duration) {
      state.breakDuration = duration
      if (state.isBreak) {
        state.currentTime = duration * 60
      }
    },
    incrementCompletedSessions(state) {
      state.completedSessions++
    },
    setTotalWorkTime(state, time) {
      state.totalWorkTime = time
    },
    setLastTimestamp(state, timestamp) {
      state.lastTimestamp = timestamp
    },
    updateTotalWorkTime(state) {
      if (!state.isBreak && state.lastTimestamp) {
        const now = Date.now()
        state.totalWorkTime += (now - state.lastTimestamp) / 1000
        state.lastTimestamp = now
      }
    },
    setCompletedSessions(state, count) {
      state.completedSessions = count
    }
  },
  actions: {
    initializeStore({ commit, dispatch, state }) {
      const savedState = localStorage.getItem('pomodoro-state')
      if (savedState) {
        const data = JSON.parse(savedState)
        commit('setTotalWorkTime', data.totalWorkTime || 0)
        commit('setCompletedSessions', data.completedSessions || 0)
        commit('setCurrentTime', data.currentTime || state.workDuration * 60)
        commit('setIsBreak', data.isBreak || false)
        commit('setWorkDuration', data.workDuration || 25)
        commit('setBreakDuration', data.breakDuration || 5)
        
        // Eğer timer çalışıyorsa devam et
        if (data.isRunning) {
          dispatch('startTimer')
        }
      }
    },
    
    saveState({ state }) {
      const stateToSave = {
        totalWorkTime: state.totalWorkTime,
        completedSessions: state.completedSessions,
        currentTime: state.currentTime,
        isBreak: state.isBreak,
        workDuration: state.workDuration,
        breakDuration: state.breakDuration,
        isRunning: state.isRunning
      }
      localStorage.setItem('pomodoro-state', JSON.stringify(stateToSave))
    },
    
    startTimer({ commit, state, dispatch }) {
      if (state.timer) return

      commit('setLastTimestamp', Date.now())
      
      const timer = setInterval(() => {
        if (state.currentTime > 0) {
          commit('setCurrentTime', state.currentTime - 1)
          if (!state.isBreak) {
            commit('updateTotalWorkTime')
          }
          dispatch('saveState') // Her saniye durumu kaydet
        } else {
          dispatch('handleTimerComplete')
        }
      }, 1000)

      commit('setTimer', timer)
      commit('setIsRunning', true)
      dispatch('saveState')
    },
    
    pauseTimer({ commit, state, dispatch }) {
      if (state.timer) {
        clearInterval(state.timer)
        commit('setTimer', null)
        commit('setIsRunning', false)
        dispatch('saveState')
      }
    },
    
    resetTimer({ commit, state, dispatch }) {
      if (state.timer) {
        clearInterval(state.timer)
        commit('setTimer', null)
      }
      // Her zaman çalışma moduna dön
      commit('setIsBreak', false)
      commit('setIsRunning', false)
      commit('setCurrentTime', state.workDuration * 60)
      dispatch('saveState')
    },
    
    handleTimerComplete({ commit, state, dispatch }) {
      const audio = new Audio('/notification.mp3')
      audio.play()

      if (!state.isBreak) {
        commit('setIsBreak', true)
        commit('setCurrentTime', state.breakDuration * 60)
        commit('incrementCompletedSessions')
      } else {
        commit('setIsBreak', false)
        commit('setCurrentTime', state.workDuration * 60)
      }

      // Timer'ı durdurmadan devam et
      dispatch('saveState')
    }
  },
  getters: {
    formattedTime: state => {
      const minutes = Math.floor(state.currentTime / 60)
      const seconds = state.currentTime % 60
      return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`
    },
    formattedTotalTime: state => {
      const hours = Math.floor(state.totalWorkTime / 3600)
      const minutes = Math.floor((state.totalWorkTime % 3600) / 60)
      return `${hours} saat ${minutes} dakika`
    }
  }
}) 