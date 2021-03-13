const CellSettings = {
  title: {
    title: 'title',
    type: 'string',
    default: '单元格'
  },
  icon: {
    title: 'icon',
    type: 'string',
    default: 'star-o'
  },
  'is-link': {
    title: 'is-link',
    type: 'boolean',
    default: true
  }
}

const CellGroupSettings = {
  cellSettings: {
    title: 'cell settings',
    type: 'ObjectArray',
    properties: CellSettings,
    default: []
  }
}

const Component = (context: any) => {
  let props: Record<string, any> = {}
  if (context.data) {
    props = Object.assign(
      {},
      {
        class: context.data.class || '',
        style: context.data.style || {},
      },
      context.data.attrs,
      context.data.props,
    );
  }
  const { cellSettings = [], style = {} } = props
  console.log(props)
  return (
    <div style={style}>
      <van-cell-group>
        {
          cellSettings.map((item: Record<string, any>) => {
            return (
              <van-cell props={item} { ...item } />
            )
          } )
        }
      </van-cell-group>
    </div>
  )
};
export default {
  template: Component,
  settings: CellGroupSettings,
};
