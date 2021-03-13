import { WidgetBuilder } from '../WidgetBuilder';
const Card = (context: any) => {
  return (
    <div {...(context.data || {})} {...(context.props || {})}>
      <el-card bodyStyle={{ padding: 0 }}>
        <img
          src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
          class="image"
        />
        <div style="padding: 14px;">
          <span>好吃的汉堡</span>
          <div class="bottom clearfix">
            <time class="time">2020-10-12</time>
            <el-button type="text" class="button">
              操作按钮
            </el-button>
          </div>
        </div>
      </el-card>
    </div>
  );
};

const settings = 
  {
    "thumb": {
      "type": "string",  
      "title": "左侧图片"
    },
    "thumb-mode": {
      "type": "string",
      "title": "左侧图片裁剪、缩放的模式，可选值参考小程序 image 组件 mode 属性值",
      "default": "aspectFit"
    },
    "title": {
      "type": "string",
      "title": "标题"
    },
    "desc": {
      "type": "string",
      "title": "描述"
    },
    "tag": {
      "type": "string",
      "title": "标签"
    },
    "num": {
      "type": "number",
      "title": "商品数量"
    },
    "price": {
      "type": "string",
      "title": "商品价格"
    },
    "origin-price": {
      "type": "string",
      "title": "商品划线原价"
    },
    "centered": {
      "type": "string",
      "title": "内容是否垂直居中",
      "default": "false"
    },
    "currency": {
      "type": "string",
      "title": "货币符号",
      "default": "¥"
    },
    "thumb-link": {
      "type": "string",
      "title": "点击左侧图片后跳转的链接地址"
    },
    "link-type": {
      "type": "string",
      "title": "链接跳转类型，可选值为 redirectTo switchTab reLaunch",
      "default": "navigateTo"
    },
    "lazy-load": {
      "type": "boolean",
      "title": "是否开启图片懒加载",
      "default": true
    }
  
}

WidgetBuilder.registerWidget(Card, {
  name: 'card',
  title: '卡片',
  icon: 'el-icon-s-help',
  settings
})