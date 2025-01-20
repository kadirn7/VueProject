<template>
  <div class="keypad">
    <div class="row" v-for="row in buttons" :key="row[0]">
      <button 
        v-for="button in row" 
        :key="button"
        @click="handleClick(button)"
        :class="getButtonClass(button)"
      >
        {{ button }}
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Keypad',
  data() {
    return {
      buttons: [
        ['7', '8', '9', '/'],
        ['4', '5', '6', '*'],
        ['1', '2', '3', '-'],
        ['0', '.', '=', '+'],
        ['C']
      ]
    }
  },
  methods: {
    handleClick(button) {
      if (button === 'C') {
        this.$emit('clear-click');
      } else if (button === '=') {
        this.$emit('equals-click');
      } else if (['+', '-', '*', '/'].includes(button)) {
        this.$emit('operator-click', button);
      } else if (button === '.') {
        this.$emit('decimal-click');
      } else {
        this.$emit('number-click', parseInt(button));
      }
    },
    getButtonClass(button) {
      return {
        'operator': ['+', '-', '*', '/'].includes(button),
        'equals': button === '=',
        'clear': button === 'C'
      }
    }
  }
}
</script>

<style scoped>
.keypad {
  display: grid;
  gap: 10px;
}

.row {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
}

.row:last-child {
  grid-template-columns: 1fr;
}

button {
  padding: 15px;
  font-size: 1.2rem;
  border: none;
  border-radius: 5px;
  background: #fff;
  cursor: pointer;
  transition: all 0.3s;
}

button:hover {
  background: #e0e0e0;
}

.operator {
  background: #42b983;
  color: white;
}

.operator:hover {
  background: #3aa876;
}

.equals {
  background: #2c3e50;
  color: white;
}

.equals:hover {
  background: #1a2634;
}

.clear {
  background: #ff4444;
  color: white;
}

.clear:hover {
  background: #cc0000;
}
</style> 