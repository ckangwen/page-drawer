<template>
    <div class="style-input-with-unit">
      <el-input
        class="main-content"
        :size="size"
        :value="currentValue"
        @input="onValueInput"
      ></el-input>
      <el-select class="unit" :size="size" :value="currentUnit" @input="onUnitInput" placeholder="">
        <el-option label="" value=""></el-option>
        <el-option label="px" value="px"></el-option>
        <el-option label="%" value="%"></el-option>
        <el-option label="vh" value="vh"></el-option>
      </el-select>
  </div>
</template>

<script>
export default {
  name: 'StyleInputNumber',
  props: {
    value: String,
    size: String
  },
  data () {
    return {
      currentValue: '',
      currentUnit: ''
    }
  },
  computed: {
    finalValue() {
      return `${this.currentValue}${this.currentUnit}`
    }
  },
  watch: {
    value: {
      handler (val) {
        if (!val) return
        if (val === 'auto') {
          this.currentValue = val || ''
          this.currentUnit = ''
        } else {
          this.currentValue = parseInt(val) || ''
          this.currentUnit = val.substring(`${this.currentValue}`.length)
        }
      },
      immediate: true
    },
    finalValue(curr, prev) {
      if (curr !== prev) {
        this.$emit('input', curr)
      }
    }
  },
  methods: {
    onValueInput(val) {
      this.currentValue = val
    },
    onUnitInput(val) {
      this.currentUnit = val
    }
  }
}
</script>
<style>
.style-input-with-unit {
  display: flex;
}
.unit {
  width: 30px;
  box-sizing: border-box;
}
.unit .el-input__suffix-inner {
  display: none;
}
.unit .el-input__inner {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  padding: 0 !important;
  text-align: center;
  border-left-width: 0.5px;
}
.main-content .el-input__inner {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  text-align: left;
  padding-left: 10px!important;
  box-sizing: border-box;
  border-right-width: 0.5px;
}
</style>
