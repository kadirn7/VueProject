<template>
  <div class="game-container">
    <div class="game-title">
      <h1>2048</h1>
      <div class="game-info">
        <p>Sayıları birleştirerek 2048'e ulaşın!</p>
        <div class="instructions">
          <div class="instruction-item">
            <span class="key-icon">↑↓←→</span>
            <span>Yön tuşlarını kullanarak kareleri hareket ettirin</span>
          </div>
          <div class="instruction-item">
            <span class="key-icon">2+2</span>
            <span>Aynı sayıları birleştirerek ilerleyin</span>
          </div>
        </div>
      </div>
    </div>

    <div class="header">
      <div class="score-container">
        <div class="score-box">
          <div class="score-label">Skor</div>
          <div class="score-value">{{ score }}</div>
        </div>
        <div class="score-box">
          <div class="score-label">Rekor</div>
          <div class="score-value">{{ highScore }}</div>
        </div>
      </div>
      <button @click="newGame" class="new-game-btn">Yeni Oyun</button>
    </div>

    <div class="grid">
      <div v-for="(row, rowIndex) in board" :key="rowIndex" class="row">
        <div
          v-for="(cell, colIndex) in row"
          :key="`${rowIndex}-${colIndex}`"
          class="cell"
          :class="{ [`value-${cell}`]: cell !== 0 }"
        >
          {{ cell !== 0 ? cell : '' }}
        </div>
      </div>
    </div>

    <!-- Mobil kontroller -->
    <div class="mobile-controls">
      <div class="controls-row">
        <button class="control-btn up" @click="move('up')">
          <i class="fas fa-chevron-up"></i>
        </button>
      </div>
      <div class="controls-row">
        <button class="control-btn left" @click="move('left')">
          <i class="fas fa-chevron-left"></i>
        </button>
        <button class="control-btn down" @click="move('down')">
          <i class="fas fa-chevron-down"></i>
        </button>
        <button class="control-btn right" @click="move('right')">
          <i class="fas fa-chevron-right"></i>
        </button>
      </div>
    </div>

    <!-- Oyun Sonu Modal -->
    <div v-if="gameOver" class="game-over-modal" @click="hideGameOver">
      <div class="modal-content">
        <h2>Oyun Bitti!</h2>
        <p>Skorunuz: {{ score }}</p>
        <p v-if="score === highScore && score > 0" class="new-record">Yeni Rekor! 🎉</p>
        <button @click.stop="newGame" class="new-game-btn">Yeni Oyun</button>
        <p class="tap-to-close">(Kapatmak için herhangi bir yere tıklayın)</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Game2048',
  data() {
    return {
      board: [],
      score: 0,
      highScore: 0,
      gameOver: false
    }
  },
  created() {
    this.initGame()
    window.addEventListener('keydown', this.handleKeyPress)
    // Yerel depolamadan en yüksek skoru al
    const savedHighScore = localStorage.getItem('2048-highscore')
    if (savedHighScore) {
      this.highScore = parseInt(savedHighScore)
    }
  },
  beforeDestroy() {
    window.removeEventListener('keydown', this.handleKeyPress)
  },
  methods: {
    initGame() {
      // Boş tahtayı oluştur
      this.board = Array(4).fill().map(() => Array(4).fill(0))
      this.score = 0
      this.gameOver = false
      // Başlangıç için 2 sayı ekle
      this.addNewNumber()
      this.addNewNumber()
    },
    addNewNumber() {
      const emptyCells = []
      // Boş hücreleri bul
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (this.board[i][j] === 0) {
            emptyCells.push({ x: i, y: j })
          }
        }
      }
      if (emptyCells.length > 0) {
        // Rastgele bir boş hücre seç
        const randomCell = emptyCells[Math.floor(Math.random() * emptyCells.length)]
        // %90 ihtimalle 2, %10 ihtimalle 4 ekle
        this.board[randomCell.x][randomCell.y] = Math.random() < 0.9 ? 2 : 4
      }
    },
    handleKeyPress(event) {
      if (this.gameOver) return

      // Sayfa kaydırmasını engelle
      event.preventDefault()

      let moved = false
      switch (event.key) {
        case 'ArrowUp':
          moved = this.moveUp()
          break
        case 'ArrowDown':
          moved = this.moveDown()
          break
        case 'ArrowLeft':
          moved = this.moveLeft()
          break
        case 'ArrowRight':
          moved = this.moveRight()
          break
        default:
          return
      }

      if (moved) {
        this.addNewNumber()
        if (this.checkGameOver()) {
          this.gameOver = true
          if (this.score > this.highScore) {
            this.highScore = this.score
            localStorage.setItem('2048-highscore', this.score)
          }
        }
      }
    },
    moveLeft() {
      let moved = false
      for (let i = 0; i < 4; i++) {
        const row = this.board[i].filter(cell => cell !== 0)
        for (let j = 0; j < row.length - 1; j++) {
          if (row[j] === row[j + 1]) {
            row[j] *= 2
            this.score += row[j]
            row.splice(j + 1, 1)
            moved = true
          }
        }
        const newRow = row.concat(Array(4 - row.length).fill(0))
        if (newRow.join(',') !== this.board[i].join(',')) {
          moved = true
        }
        this.board[i] = newRow
      }
      return moved
    },
    moveRight() {
      let moved = false
      for (let i = 0; i < 4; i++) {
        const row = this.board[i].filter(cell => cell !== 0)
        for (let j = row.length - 1; j > 0; j--) {
          if (row[j] === row[j - 1]) {
            row[j] *= 2
            this.score += row[j]
            row.splice(j - 1, 1)
            moved = true
          }
        }
        const newRow = Array(4 - row.length).fill(0).concat(row)
        if (newRow.join(',') !== this.board[i].join(',')) {
          moved = true
        }
        this.board[i] = newRow
      }
      return moved
    },
    moveUp() {
      let moved = false
      for (let j = 0; j < 4; j++) {
        let column = this.board.map(row => row[j]).filter(cell => cell !== 0)
        for (let i = 0; i < column.length - 1; i++) {
          if (column[i] === column[i + 1]) {
            column[i] *= 2
            this.score += column[i]
            column.splice(i + 1, 1)
            moved = true
          }
        }
        column = column.concat(Array(4 - column.length).fill(0))
        for (let i = 0; i < 4; i++) {
          if (this.board[i][j] !== column[i]) {
            moved = true
          }
          this.board[i][j] = column[i]
        }
      }
      return moved
    },
    moveDown() {
      let moved = false
      for (let j = 0; j < 4; j++) {
        let column = this.board.map(row => row[j]).filter(cell => cell !== 0)
        for (let i = column.length - 1; i > 0; i--) {
          if (column[i] === column[i - 1]) {
            column[i] *= 2
            this.score += column[i]
            column.splice(i - 1, 1)
            moved = true
          }
        }
        column = Array(4 - column.length).fill(0).concat(column)
        for (let i = 0; i < 4; i++) {
          if (this.board[i][j] !== column[i]) {
            moved = true
          }
          this.board[i][j] = column[i]
        }
      }
      return moved
    },
    checkGameOver() {
      // Boş hücre var mı kontrol et
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (this.board[i][j] === 0) return false
        }
      }
      // Birleştirilebilecek komşu hücreler var mı kontrol et
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          if (
            (i < 3 && this.board[i][j] === this.board[i + 1][j]) ||
            (j < 3 && this.board[i][j] === this.board[i][j + 1])
          ) {
            return false
          }
        }
      }
      return true
    },
    newGame() {
      this.initGame()
    },
    hideGameOver() {
      this.gameOver = false
    },
    move(direction) {
      switch (direction) {
        case 'up':
          this.handleKeyPress({ key: 'ArrowUp' })
          break
        case 'down':
          this.handleKeyPress({ key: 'ArrowDown' })
          break
        case 'left':
          this.handleKeyPress({ key: 'ArrowLeft' })
          break
        case 'right':
          this.handleKeyPress({ key: 'ArrowRight' })
          break
      }
    }
  }
}
</script>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  overflow: hidden;
  height: 100%;
}

.game-container {
  max-width: 100%;
  height: 100vh;
  margin: 0;
  padding: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #faf8ef;
  box-sizing: border-box;
  overflow: hidden;
}

.game-title {
  text-align: center;
  margin-bottom: 20px;
  color: #776e65;
}

.game-title h1 {
  font-size: 3em;
  margin: 0 0 10px 0;
  font-weight: bold;
}

.game-info {
  max-width: 400px;
  margin: 0 auto;
  padding: 15px;
  background-color: #8f7a66;
  border-radius: 6px;
  color: white;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.game-info p {
  margin: 0 0 15px 0;
  font-size: 1.1em;
  font-weight: bold;
}

.instructions {
  display: flex;
  flex-direction: column;
  gap: 10px;
  font-size: 0.9em;
}

.instruction-item {
  display: flex;
  align-items: center;
  gap: 10px;
}

.key-icon {
  background-color: #faf8ef;
  color: #776e65;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  min-width: 45px;
  display: inline-block;
  text-align: center;
}

.header {
  width: 100%;
  max-width: 400px;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.score-container {
  display: flex;
  gap: 15px;
}

.score-box {
  background-color: #8f7a66;
  padding: 8px 15px;
  border-radius: 3px;
  text-align: center;
  min-width: 80px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.score-label {
  color: #eee4da;
  font-size: 0.9em;
  margin-bottom: 2px;
  text-transform: uppercase;
  font-weight: bold;
}

.score-value {
  color: white;
  font-size: 1.2em;
  font-weight: bold;
}

.new-game-btn {
  padding: 8px 15px;
  font-size: 1em;
  background-color: #8f7a66;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  font-weight: bold;
  text-transform: uppercase;
}

.new-game-btn:hover {
  background-color: #9f8b77;
  transform: translateY(-1px);
  box-shadow: 0 3px 5px rgba(0, 0, 0, 0.15);
  transition: all 0.2s ease;
}

.grid {
  width: min(400px, 95vw);
  aspect-ratio: 1;
  background-color: #bbada0;
  padding: 8px;
  border-radius: 6px;
  margin: 0 auto;
}

.row {
  display: flex;
  height: calc(25% - 6px);
  margin-bottom: 8px;
}

.row:last-child {
  margin-bottom: 0;
}

.cell {
  width: calc(25% - 6px);
  height: 100%;
  margin-right: 8px;
  background-color: rgba(238, 228, 218, 0.35);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-weight: bold;
  color: #776e65;
  font-size: min(1.8em, 5vw);
}

.cell:last-child {
  margin-right: 0;
}

.value-2 { background-color: #eee4da; }
.value-4 { background-color: #ede0c8; }
.value-8 { background-color: #f2b179; color: #f9f6f2; }
.value-16 { background-color: #f59563; color: #f9f6f2; }
.value-32 { background-color: #f67c5f; color: #f9f6f2; }
.value-64 { background-color: #f65e3b; color: #f9f6f2; }
.value-128 { background-color: #edcf72; color: #f9f6f2; font-size: 1.6em; }
.value-256 { background-color: #edcc61; color: #f9f6f2; font-size: 1.6em; }
.value-512 { background-color: #edc850; color: #f9f6f2; font-size: 1.6em; }
.value-1024 { background-color: #edc53f; color: #f9f6f2; font-size: 1.4em; }
.value-2048 { background-color: #edc22e; color: #f9f6f2; font-size: 1.4em; }

.game-over-modal {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
  animation: fadeIn 0.3s ease-in;
}

.modal-content {
  background-color: #faf8ef;
  padding: 30px;
  border-radius: 10px;
  text-align: center;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.2);
  animation: slideIn 0.3s ease-out;
}

.modal-content h2 {
  color: #776e65;
  font-size: 2.5em;
  margin: 0 0 20px 0;
}

.modal-content p {
  color: #776e65;
  font-size: 1.2em;
  margin: 10px 0;
}

.new-record {
  color: #f65e3b !important;
  font-weight: bold;
  font-size: 1.4em !important;
}

.tap-to-close {
  margin-top: 20px;
  font-size: 0.9em !important;
  color: #a9a9a9 !important;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes slideIn {
  from {
    transform: translateY(-20px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

@media (max-height: 700px) {
  .cell {
    width: 60px;
    height: 60px;
    font-size: 1.4em;
  }
}

@media (max-width: 500px) {
  .cell {
    width: calc((100vw - 80px) / 4);
    height: calc((100vw - 80px) / 4);
    margin-right: 5px;
    font-size: 1.4em;
  }
  
  .row {
    margin-bottom: 5px;
  }

  .game-title h1 {
    font-size: 2.5em;
  }

  .game-info {
    margin: 0 10px;
    padding: 10px;
  }

  .instructions {
    font-size: 0.8em;
  }
}

.mobile-controls {
  display: none; /* Varsayılan olarak gizli */
  margin-top: 20px;
  width: 100%;
  max-width: 200px;
}

/* Mobil cihazlarda göster */
@media (max-width: 768px) {
  .mobile-controls {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
}

.controls-row {
  display: flex;
  gap: 10px;
  justify-content: center;
}

.control-btn {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: none;
  background-color: #8f7a66;
  color: white;
  font-size: 20px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background-color 0.2s;
}

.control-btn:active {
  background-color: #6b5c4c;
  transform: scale(0.95);
}
</style>
