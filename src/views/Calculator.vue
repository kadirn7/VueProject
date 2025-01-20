<template>
  <div class="calculator">
    <h1>Hesap Makinesi</h1>
    <div class="calc-container">
      <Display :value="display" />
      <Keypad 
        @number-click="handleNumber"
        @operator-click="handleOperator"
        @clear-click="clearDisplay"
        @equals-click="calculate"
        @decimal-click="handleDecimal"
      />
    </div>
  </div>
</template>

<script>
import Display from '../components/calculator/Display.vue'
import Keypad from '../components/calculator/Keypad.vue'

export default {
  name: 'Calculator',
  components: {
    Display,
    Keypad
  },
  data() {
    return {
      display: '0',
      previousValue: null,
      operator: null,
      newNumber: true
    }
  },
  methods: {
    handleNumber(number) {
      if (this.newNumber) {
        this.display = number.toString();
        this.newNumber = false;
      } else {
        this.display = this.display === '0' ? 
          number.toString() : 
          this.display + number;
      }
    },
    handleOperator(op) {
      this.calculate();
      this.previousValue = parseFloat(this.display);
      this.operator = op;
      this.newNumber = true;
    },
    handleDecimal() {
      if (!this.display.includes('.')) {
        this.display += '.';
      }
    },
    clearDisplay() {
      this.display = '0';
      this.previousValue = null;
      this.operator = null;
      this.newNumber = true;
    },
    calculate() {
      if (this.previousValue === null || this.operator === null) return;
      
      const current = parseFloat(this.display);
      let result;

      switch (this.operator) {
        case '+':
          result = this.previousValue + current;
          break;
        case '-':
          result = this.previousValue - current;
          break;
        case '*':
          result = this.previousValue * current;
          break;
        case '/':
          if (current === 0) {
            this.display = 'Hata';
            this.newNumber = true;
            return;
          }
          result = this.previousValue / current;
          break;
      }

      this.display = result.toString();
      this.previousValue = null;
      this.operator = null;
      this.newNumber = true;
    }
  }
}
</script>

<style scoped>
.calculator {
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
  text-align: center;
  margin-bottom: 60px;
}

.calc-container {
  background: #f5f5f5;
  border-radius: 10px;
  padding: 20px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
</style> 