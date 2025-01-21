<template>
  <div class="tictactoe">
    <h1>Tic Tac Toe</h1>
    
    <!-- Mod Seçimi -->
    <div class="game-mode">
      <button 
        @click="setGameMode('pvp')" 
        :class="{ active: gameMode === 'pvp' }"
      >
        İki Oyunculu
      </button>
      <button 
        @click="setGameMode('ai')" 
        :class="{ active: gameMode === 'ai' }"
      >
        Bilgisayara Karşı
      </button>
    </div>

    <div class="game-info">
      <p v-if="winner">
        Kazanan: <span :class="winner">{{ winner === 'O' && gameMode === 'ai' ? 'Bilgisayar' : winner }}</span>
      </p>
      <p v-else-if="isDraw">
        Berabere!
      </p>
      <p v-else>
        Sıra: <span :class="currentPlayer">
          {{ currentPlayer === 'O' && gameMode === 'ai' ? 'Bilgisayar' : currentPlayer }}
        </span>
      </p>
    </div>

    <div class="game-board">
      <div 
        v-for="(cell, index) in board" 
        :key="index"
        class="cell"
        :class="{ 
          'X': cell === 'X',
          'O': cell === 'O',
          'winner': winningCells.includes(index)
        }"
        @click="makeMove(index)"
      >
        {{ cell }}
      </div>
    </div>

    <div class="game-controls">
      <button @click="resetGame" class="reset-btn">Yeni Oyun</button>
      <div class="score">
        <p>X: {{ score.X }}</p>
        <p>O: {{ score.O }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TicTacToe',
  data() {
    return {
      board: Array(9).fill(null),
      currentPlayer: 'X',
      winner: null,
      winningCells: [],
      score: {
        X: 0,
        O: 0
      },
      gameMode: 'pvp' // 'pvp' veya 'ai'
    }
  },
  computed: {
    isDraw() {
      return !this.winner && !this.board.includes(null)
    }
  },
  methods: {
    setGameMode(mode) {
      if (this.gameMode !== mode) {
        this.gameMode = mode
        this.resetGame()
        this.score = { X: 0, O: 0 }
        this.saveScore()
      }
    },
    makeMove(index) {
      if (this.board[index] || this.winner) return
      if (this.gameMode === 'ai' && this.currentPlayer === 'O') return

      this.board[index] = this.currentPlayer
      
      if (this.checkWinner()) {
        this.winner = this.currentPlayer
        this.score[this.currentPlayer]++
        this.saveScore()
      } else if (!this.isDraw) {
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'
        
        // Bilgisayar hamlesi
        if (this.gameMode === 'ai' && this.currentPlayer === 'O') {
          this.$nextTick(() => {
            setTimeout(() => {
              this.makeAIMove()
            }, 500)
          })
        }
      }
    },
    makeAIMove() {
      const move = this.findBestMove()
      if (move !== null) {
        this.board[move] = 'O'
        
        if (this.checkWinner()) {
          this.winner = 'O'
          this.score.O++
          this.saveScore()
        } else {
          this.currentPlayer = 'X'
        }
      }
    },
    findBestMove() {
      // 1. Kazanma hamlesi varsa yap
      const winMove = this.findWinningMove('O')
      if (winMove !== null) return winMove

      // 2. Rakibin kazanmasını engelle
      const blockMove = this.findWinningMove('X')
      if (blockMove !== null) return blockMove

      // 3. Merkezi al
      if (this.board[4] === null) return 4

      // 4. Köşeleri tercih et
      const corners = [0, 2, 6, 8]
      const availableCorners = corners.filter(i => this.board[i] === null)
      if (availableCorners.length > 0) {
        return availableCorners[Math.floor(Math.random() * availableCorners.length)]
      }

      // 5. Boş bir yer seç
      const availableMoves = this.board
        .map((cell, index) => cell === null ? index : null)
        .filter(cell => cell !== null)
      
      if (availableMoves.length > 0) {
        return availableMoves[Math.floor(Math.random() * availableMoves.length)]
      }

      return null
    },
    findWinningMove(player) {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
      ]

      for (let pattern of winPatterns) {
        const [a, b, c] = pattern
        const line = [this.board[a], this.board[b], this.board[c]]
        const playerCount = line.filter(cell => cell === player).length
        const nullCount = line.filter(cell => cell === null).length

        if (playerCount === 2 && nullCount === 1) {
          return pattern[line.findIndex(cell => cell === null)]
        }
      }

      return null
    },
    checkWinner() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Yatay
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Dikey
        [0, 4, 8], [2, 4, 6] // Çapraz
      ]

      for (let pattern of winPatterns) {
        const [a, b, c] = pattern
        if (
          this.board[a] &&
          this.board[a] === this.board[b] &&
          this.board[a] === this.board[c]
        ) {
          this.winningCells = pattern
          return true
        }
      }
      return false
    },
    resetGame() {
      this.board = Array(9).fill(null)
      this.currentPlayer = 'X'
      this.winner = null
      this.winningCells = []
    },
    saveScore() {
      localStorage.setItem(`tictactoe-score-${this.gameMode}`, JSON.stringify(this.score))
    },
    loadScore() {
      const savedScore = localStorage.getItem(`tictactoe-score-${this.gameMode}`)
      if (savedScore) {
        this.score = JSON.parse(savedScore)
      }
    }
  },
  watch: {
    gameMode: {
      handler(newMode) {
        this.loadScore()
      },
      immediate: true
    }
  }
}
</script>

<style scoped>
.tictactoe {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
}

.game-info {
  margin: 20px 0;
  font-size: 1.2rem;
}

.game-board {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  margin: 20px 0;
  background: #f5f5f5;
  padding: 10px;
  border-radius: 10px;
}

.cell {
  aspect-ratio: 1;
  background: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  cursor: pointer;
  border-radius: 5px;
  transition: all 0.3s ease;
}

.cell:hover:not(.X):not(.O) {
  background: #e0e0e0;
}

.cell.X {
  color: #e74c3c;
}

.cell.O {
  color: #3498db;
}

.cell.winner {
  background: #f1c40f;
  color: white;
}

.game-controls {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
}

.reset-btn {
  padding: 10px 20px;
  background: #42b983;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background 0.3s;
}

.reset-btn:hover {
  background: #3aa876;
}

.score {
  display: flex;
  gap: 20px;
  font-size: 1.2rem;
  font-weight: bold;
}

.score p {
  margin: 0;
}

.X {
  color: #e74c3c;
}

.O {
  color: #3498db;
}

.game-mode {
  display: flex;
  gap: 10px;
  justify-content: center;
  margin: 20px 0;
}

.game-mode button {
  padding: 8px 16px;
  border: 2px solid #42b983;
  background: white;
  color: #42b983;
  border-radius: 20px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: all 0.3s;
}

.game-mode button.active {
  background: #42b983;
  color: white;
}

.game-mode button:hover {
  transform: translateY(-2px);
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}
</style> 