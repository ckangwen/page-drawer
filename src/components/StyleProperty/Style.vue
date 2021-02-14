<template>
  <div>
    <el-collapse accordion v-model="activeName">
      <el-collapse-item
        class="style-collapse-item"
        title="布局"
        name="Display"
      >
        <StyleProperty title="Display">
          <el-select v-model="styleData.display" filterable size="mini">
            <el-option label="block" value="block"></el-option>
            <el-option label="inline-block" value="inline-block"></el-option>
            <el-option label="inline" value="inline"></el-option>
            <el-option label="flex" value="flex"></el-option>
            <el-option label="none" value="none"></el-option>
          </el-select>
        </StyleProperty>
        <StyleProperty title="Position">
          <el-select v-model="styleData.position" filterable size="mini">
            <el-option label="static" value="static"></el-option>
            <el-option label="relative" value="relative"></el-option>
            <el-option label="absolute" value="absolute"></el-option>
            <el-option label="fixed" value="fixed"></el-option>
          </el-select>
        </StyleProperty>
        <StyleProperty v-for="item in positionProperties" :key="item" :title="capitalize(item)">
          <InputWithUnit
            v-model="styleData[item]"
            size="mini"
          ></InputWithUnit>
        </StyleProperty>
        <StyleProperty v-for="item in DimensionStyleProperties" :key="item" :title="capitalize(item)">
          <InputWithUnit
            v-model="styleData[item]"
            size="mini"
          ></InputWithUnit>
        </StyleProperty>
      </el-collapse-item>
      <el-collapse-item title="Flex" name="Flex">
        <StyleProperty title="Direction" style="width: 100%">
          <el-radio-group class="style-property-radio-group" size="mini" v-model="styleData['flex-direction']">
            <el-radio-button label="row">
              <el-tooltip content="row" placement="bottom" effect="light">
                <i class="iconfont style-row"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button label="row-reverse">
              <el-tooltip content="row-reverse" placement="bottom" effect="light">
                <i class="iconfont style-row-reverse"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button label="column">
              <el-tooltip content="column" placement="bottom" effect="light">
                <i class="iconfont style-column"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button label="column-reverse">
              <el-tooltip content="column-reverse" placement="bottom" effect="light">
                <i class="iconfont style-column-reverse"></i>
              </el-tooltip>
            </el-radio-button>
          </el-radio-group>
        </StyleProperty>
        <StyleProperty title="Justify" style="width: 100%">
          <el-radio-group class="style-property-radio-group" size="mini" v-model="styleData['justify-content']">
            <el-radio-button label="flex-start">
              <el-tooltip content="flex-start" placement="bottom" effect="light">
                <i class="iconfont style-main-start"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button label="flex-end">
              <el-tooltip content="flex-end" placement="bottom" effect="light">
                <i class="iconfont style-main-end"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button label="center">
              <el-tooltip content="center" placement="bottom" effect="light">
                <i class="iconfont style-main-center"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button label="justify-between">
              <el-tooltip content="justify-between" placement="bottom" effect="light">
                <i class="iconfont style-main-space-between"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button label="justify-around">
              <el-tooltip content="justify-around" placement="bottom" effect="light">
                <i class="iconfont style-main-space-around"></i>
              </el-tooltip>
            </el-radio-button>
          </el-radio-group>
        </StyleProperty>
        <StyleProperty title="Align" style="width: 100%">
          <el-radio-group class="style-property-radio-group" size="mini" v-model="styleData['align-items']">
            <el-radio-button label="flex-start">
              <el-tooltip content="flex-start" placement="bottom" effect="light">
                <i class="iconfont style-cross-start"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button label="flex-end">
              <el-tooltip content="flex-end" placement="bottom" effect="light">
                <i class="iconfont style-cross-end"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button label="center">
              <el-tooltip content="center" placement="bottom" effect="light">
                <i class="iconfont style-cross-center"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button label="stretch">
              <el-tooltip content="stretch" placement="bottom" effect="light">
                <i class="iconfont style-align-stretch"></i>
              </el-tooltip>
            </el-radio-button>
          </el-radio-group>
        </StyleProperty>
      </el-collapse-item>
      <el-collapse-item title="边框" name="Border">
        <StyleProperty title="Border" style="width: 100%">
          <div style="display: flex; margin-top: 5px;">
            <el-radio-group class="style-property-radio-group" style="width: 90px" size="mini" v-model="borderProperty">
              <div class="radio-icon-container">
                <el-radio label="border-top">
                  <i class="iconfont style-border-top"></i>
                </el-radio>
              </div>
              <div class="radio-icon-container">
                <el-radio label="border-left">
                  <i class="iconfont style-border-left"></i>
                </el-radio>
                <el-radio label="border">
                  <i class="iconfont style-border"></i>
                </el-radio>
                <el-radio label="border-right">
                  <i class="iconfont style-border-right"></i>
                </el-radio>
              </div>
              <div class="radio-icon-container">
                <el-radio label="border-bottom">
                  <i class="iconfont style-border-bottom"></i>
                </el-radio>
              </div>
            </el-radio-group>
            <div>
              <el-input v-model="borderWidth" size="mini" placeholder="边框宽度">
                 <template slot="append">px</template>
              </el-input>
              <div>
                <el-color-picker v-model="borderColor" size="mini"></el-color-picker>
              </div>
              <el-select v-model="borderStyle" filterable size="mini" style="width: 100%" placeholder="边框样式">
                <el-option v-for="item in borderStyleEnums" :key="item" :label="item" :value="item"></el-option>
              </el-select>
            </div>
          </div>
        </StyleProperty>

        <StyleProperty title="BorderRadius" style="width: 100%">
          <el-radio-group class="style-property-radio-group" v-model="borderRadiusType" size="mini" style="text-align: center; margin-bottom: 5px;">
            <el-radio-button label="all">
              <el-tooltip content="固定圆角" placement="top" effect="light">
                <i class="iconfont style-border-radius"></i>
              </el-tooltip>
            </el-radio-button>
            <el-radio-button label="single">
              <el-tooltip content="独立定义" placement="top" effect="light">
                <i class="iconfont style-border-top-right-radius"></i>
              </el-tooltip>
            </el-radio-button>
          </el-radio-group>

          <div v-if="borderRadiusType === 'all'">
            <el-input v-model="borderRadiusValue" size="mini" placeholder="边框圆角">
              <template slot="append">px</template>
            </el-input>
          </div>
          <div v-else>
            <el-input v-model="borderTopLeftRadiusValue" size="mini" class="border-radius-input">
              <template slot="prepend">
                <i class="iconfont style-border-top-left-radius"></i>
              </template>
              <template slot="append">px</template>
            </el-input>
            <el-input v-model="borderTopRightRadiusValue" size="mini" class="border-radius-input">
              <template slot="prepend">
                <i class="iconfont style-border-top-right-radius"></i>
              </template>
              <template slot="append">px</template>
            </el-input>
            <el-input v-model="borderBottomLeftRadiusValue" size="mini" class="border-radius-input">
              <template slot="prepend">
                <i class="iconfont style-border-bottom-left-radius"></i>
              </template>
              <template slot="append">px</template>
            </el-input>
            <el-input v-model="borderBottomRightRadiusValue" size="mini" class="border-radius-input">
              <template slot="prepend">
                <i class="iconfont style-border-bottom-right-radius"></i>
              </template>
              <template slot="append">px</template>
            </el-input>
          </div>
        </StyleProperty>
      </el-collapse-item>
      <el-collapse-item title="背景" name="Background">
        <div style="padding: 10px">
          <div style="margin-bottom: 10px">
            <span class="style-property-label">背景类型</span>
            <el-radio-group v-model="backgroundType" size="mini">
              <el-radio-button class="style-radio-button" label="color">
                <i class="iconfont style-color"></i>
              </el-radio-button>
              <el-radio-button label="image">
                <i class="iconfont style-image"></i>
              </el-radio-button>
            </el-radio-group>
          </div>
          <div v-if="backgroundType === 'color'" style="display: flex; align-item: center;">
            <span class="style-property-label">背景颜色</span>
            <el-color-picker v-model="styleData['background-color']" size="mini"></el-color-picker>
          </div>
          <div v-else>
            <el-input v-model="styleData['background-image']" size="mini" placeholder="输入图片url"></el-input>
            <div style="margin-top: 10px;">
              <span class="style-property-label">背景类型</span>
              <el-radio-group v-model="backgroundSizeType" size="mini">
                <el-radio-button label="cover"></el-radio-button>
                <el-radio-button label="contain"></el-radio-button>
                <el-radio-button label="percent"></el-radio-button>
              </el-radio-group>
            </div>
            <div v-if="backgroundSizeType === 'percent'">
              <div style="display: flex;margin-top: 10px;">
                <el-input v-model="backgroundSize.width" size="mini" placeholder="宽度" style="margin-right: 10px;"></el-input>
                <el-input v-model="backgroundSize.height" size="mini" placeholder="高度" style="margin: 0 10px;"></el-input>
              </div>
            </div>
            <div style="margin-top: 10px;">重复显示</div>
            <el-select v-model="styleData['background-repeat']" filterable size="mini">
              <el-option label="垂直,水平重复" value="repeat"></el-option>
              <el-option label="水平重复" value="repeat-x"></el-option>
              <el-option label="垂直重复" value="repeat-y"></el-option>
              <el-option label="不重复" value="no-repeat"></el-option>
            </el-select>
          </div>
        </div>
      </el-collapse-item>
      <el-collapse-item title="文字" name="Font">
        <StyleProperty title="字体粗细">
          <el-select v-model="styleData['font-weight']" size="mini" placeholder="粗细">
            <el-option label="正常" value="normal"></el-option>
            <el-option label="粗体" value="bolder"></el-option>
            <el-option label="细体" value="lighter"></el-option>
          </el-select>
        </StyleProperty>
        <StyleProperty title="字号">
          <el-input v-model="styleData['font-size']" size="mini" placeholder="字号"></el-input>
        </StyleProperty>
        <StyleProperty title="颜色">
          <div>
            <el-color-picker v-model="styleData.color" size="mini"></el-color-picker>
          </div>
        </StyleProperty>
        <StyleProperty title="行距">
          <el-input v-model="styleData['line-height']" size="mini" placeholder="行距"></el-input>
        </StyleProperty>
        <StyleProperty title="文本排列">
          <el-select v-model="styleData['text-align']" size="mini" placeholder="对齐">
            <el-option label="左对齐" value="left"></el-option>
            <el-option label="右对齐" value="right"></el-option>
            <el-option label="居中" value="center"></el-option>
            <el-option label="两端对齐" value="justify"></el-option>
            <el-option label="默认" value="inherit"></el-option>
          </el-select>
        </StyleProperty>
        <StyleProperty title="透明度" style="width: 90%">
          <el-slider v-model="opacity" input-size="mini" show-input :min="0" :max="1" :step="0.1"></el-slider>
        </StyleProperty>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>
<script>
import InputWithUnit from './InputWithUnit'
import StyleProperty from './StyleProperty'

const camelizeRE = /-(\w)/g
const camelize = (str) => {
  return str.replace(camelizeRE, (_, c) => (c ? c.toUpperCase() : ''))
}

const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1)
}
function equals(x, y) {
  const f1 = x instanceof Object;
  const f2 = y instanceof Object;
  if (!f1 || !f2) {
    return x === y
  }
  if (Object.keys(x).length !== Object.keys(y).length) {
    return false
  }
  for (const p in x) {
    const a = x[p] instanceof Object;
    const b = y[p] instanceof Object;
    if (a && b) {
      equals(x[p], y[p])
    } else if (x[p] != y[p]) {
      return false;
    }
  }
  return true;
}
export default {
  name: 'StyleComponent',
  components: {
    InputWithUnit,
    StyleProperty
  },
  props: {
    value: Object
  },
  data () {
    return {
      activeName: 'Display',
      styleData: {},
      DimensionStyleProperties: [
        'width',
        'height',
        'min-width',
        'min-height',
        'margin-top',
        'margin-right',
        'margin-bottom',
        'margin-left',
        'padding-top',
        'padding-right',
        'padding-bottom',
        'padding-left'
      ],
      positionProperties: [
        'top',
        'right',
        'bottom',
        'left'
      ],
      borderProperties: [
        'border-top',
        'border-bottom',
        'border-bottom',
        'border-left'
      ],
      borderStyleEnums: [
        'none',
        'solid',
        'dotted',
        'dashed',
        'double',
        'groove',
        'ridgt',
        'inside',
        'outside'
      ],
      borderProperty: '',
      borderWidth: '',
      borderColor: '',
      borderStyle: '',
      borderRadiusType: 'all',
      borderRadiusValue: '',
      borderTopLeftRadiusValue: '',
      borderTopRightRadiusValue: '',
      borderBottomLeftRadiusValue: '',
      borderBottomRightRadiusValue: '',
      backgroundType: 'color',
      backgroundSizeType: '',
      backgroundSize: {
        width: '',
        height: ''
      },
      opacity: 1
    }
  },
  computed: {
    borderValue () {
      return `${this.borderWidth}px ${this.borderColor} ${this.borderStyle}`
    }
  },
  watch: {
    value: {
      handler (curr, prev) {
        if (!equals(curr, prev)) {
          this.styleData = curr
        }
      },
      deep: true
    },
    styleData: {
      handler(val) {
        this.$emit('input', val)
      },
      deep: true
    },
    borderProperty (val) {
      this.$set(this.styleData, val, this.borderValue)
    },
    borderValue (val) {
      if (this.borderProperty) {
        this.$set(this.styleData, this.borderProperty, val)
      }
    },
    backgroundSizeType (val) {
      if (val !== 'percent') {
        this.$set(this.styleData, 'background-size', val)
      }
    },
    backgroundSize: {
      handler (val) {
        this.$set(this.styleData, 'background-size', `${val.width} ${val.height}`)
      },
      deep: true
    },
    borderRadiusValue(val) {
      val = parseInt(val)
      this.$set(this.styleData, 'border-radius', `${val}px`)
    },
    borderTopLeftRadiusValue(val) {
      val = parseInt(val)
      this.$set(this.styleData, 'border-top-left-radius', `${val}px`)
    },
    borderTopRightRadiusValue(val) {
      val = parseInt(val)
      this.$set(this.styleData, 'border-top-right-radius', `${val}px`)
    },
    borderBottomLeftRadiusValue(val) {
      val = parseInt(val)
      this.$set(this.styleData, 'border-bottom-left-radius', `${val}px`)
    },
    borderBottomRightRadiusValue(val) {
      val = parseInt(val)
      this.$set(this.styleData, 'border-bottom-right-radius', `${val}px`)
    },
    opacity(val) {
      this.$set(this.styleData, 'opacity', val)
    }
  },
  methods: {
    capitalize (str) {
      return capitalize(camelize(str))
    },
    onInput (e, key) {
      this.styleData[key] = e
    },
  }
}
</script>
<style>
@import "./icon.css";
.style-collapse-item .el-collapse-item__content {
  padding: 10px 15px;
  box-sizing: border-box;
}
.style-property-radio-group .el-radio__input {
  display: none;
}
.radio-icon-container {
  text-align: center;
}
.radio-icon-container .el-radio {
  margin: 0;
}
.radio-icon-container .el-radio__label {
  padding: 0;
}
.border-radius-input {
  width: calc(50% - 10px);
  box-sizing: border-box;
  margin: 0 5px 5px 5px;
}
.border-radius-input .el-input-group__append, .el-input-group__prepend {
  padding: 0 5px;
}
.style-property-label {
  width: 70px;
  display: inline-block;
}
.background-radio-button .el-radio-button--mini .el-radio-button__inner {
  padding: 7px 10px;
}
</style>
