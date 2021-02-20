import { WidgetBuilder } from './WidgetBuilder';
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

const settings = {
  img: {
    title: 'img',
    type: 'string',
    default: 'https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png'
  }
}

WidgetBuilder.registerWidget(Card, {
  name: 'card',
  title: '卡片',
  icon: 'el-icon-s-help',
  settings
})