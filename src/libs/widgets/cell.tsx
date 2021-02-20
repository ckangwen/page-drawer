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
    property: CellSettings,
    default: []
  }
}

const Cell = (context: any) => {
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
  const { cellSettings = [] } = props
  return (
    <van-cell-group>
      {
        cellSettings.map((item: Record<string, any>) => {
          return (
            <van-cell { ...item } />
          )
        } )
      }
    </van-cell-group>
  )
};
export default {
  template: Cell,
  settings: CellGroupSettings,
};
