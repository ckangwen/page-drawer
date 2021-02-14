<template>
  <div class="form-item">
    <div>{{ title }}</div>
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'StyleFormItem',
  props: {
    title: String
  }
}
</script>
<style lang="scss" scoped>
.form-item {
  display: inline-flex;
  flex-direction: column;
  box-sizing: border-box;
  width: 50%;
  margin-bottom: 10px;
  padding: 0 10px;
}
</style>
