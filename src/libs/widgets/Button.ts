const Template = {
  functional: true,
  render(h: any, ctx: any) {
    console.log(ctx)
    return h('van-button', ctx.props, [])
  },
}