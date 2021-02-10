const Card = (context: any) => {
  return (
    <div {...context.data} {...context.props}>
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

export default {
  name: "card",
  template: Card,
  title: "卡片",
  icon: "el-icon-plus"
};
