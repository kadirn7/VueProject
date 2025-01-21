<template>
  <div class="game-container">
    <div class="header">
      <div class="score-container">
        <div>Skor: {{ score }}</div>
        <div>En Yüksek Skor: {{ highScore }}</div>
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
    }
  }
}
</script>

<style scoped>
.game-container {
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.score-container {
  font-size: 1.2em;
}

.new-game-btn {
  padding: 10px 20px;
  font-size: 1.1em;
  background-color: #8f7a66;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.new-game-btn:hover {
  background-color: #9f8b77;
}

.grid {
  background-color: #bbada0;
  padding: 10px;
  border-radius: 6px;
}

.row {
  display: flex;
  margin-bottom: 10px;
}

.row:last-child {
  margin-bottom: 0;
}

.cell {
  width: 80px;
  height: 80px;
  margin-right: 10px;
  background-color: rgba(238, 228, 218, 0.35);
  border-radius: 3px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 1.8em;
  font-weight: bold;
  color: #776e65;
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
</style>
