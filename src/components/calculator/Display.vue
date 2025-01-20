<template>
  <div class="display">
    {{ value }}
  </div>
</template>

<script>
export default {
  name: 'Display',
  props: {
    value: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
.display {
  background: #fff;
  padding: 20px;
  text-align: right;
  font-size: 2rem;
  margin-bottom: 20px;
  border-radius: 5px;
  border: 1px solid #ddd;
  min-height: 60px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  overflow: hidden;
}
</style> 