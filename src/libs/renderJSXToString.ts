type NodeTree = {
  componentName: string;
  componentProps: Record<string, any>;
  children: NodeTree[];
};

function generateCode(data: NodeTree) {
  if (typeof data === "string") {
    return data;
  }

  const { componentName, componentProps, children = [] } = data;
  // componentProps: class style attrs props domProps on directives slot ref scopedSlots

  let code = "";
  code += `<${componentName} `;
  const props = {
    class: componentProps.class,
    style: componentProps.style,
    ...(componentProps.attrs || {}),
    ...(componentProps.props || {}),
    ...(componentProps.domProps || {})
  };

  Object.keys(props).forEach(k => {
    const val = props[k];
    if (val == null || val == "") return;
    if (
      Array.isArray(val) ||
      typeof val === "number" ||
      typeof val === "boolean"
    ) {
      code += `:${k}="${val}" `;
    } else if (typeof val === "object") {
      code += `:${k}='${JSON.stringify(val)}' `;
    } else {
      code += `${k}="${val}" `;
    }
  });

  if (componentName === 'img') {
    code += '/>'
  } else {
    code += ">\n" + children.map(child => generateCode(child)).join("\n");
    code += `</${componentName}>`;
  }
  return code;
}

const createElementMockFn = (tag: string, props: any, children: any[]) => {
  if (Array.isArray(props)) {
    children = props;
    props = {};
  }
  return {
    componentName: tag,
    componentProps: props,
    children
  };
};
const vueBabelMergePropsHeplerMockFn = () => {
  return function(...args: any[]) {
    const _props = [].concat(...args);
    let props = {};
    _props.forEach(p => {
      props = Object.assign(props, p);
    });
    return props;
  };
};

export function renderJSXToString(
  renderFn: any,
  context: Record<string, any> = {}
) {
  let renderFnStr = "";
  if (renderFn.functional) {
    renderFnStr = renderFn.render.toString();
  } else if (typeof renderFn === "string") {
    renderFnStr = renderFn;
  }
  context.data = context.data || {};
  context.props = context.props || {};
  const renderWrapperFunctionStr = `return function renderWrapperFn( _vue_babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default) { return ${renderFnStr} }`;
  const fun = new Function(renderWrapperFunctionStr);
  const renderWrapperFn = fun();
  const render = renderWrapperFn(vueBabelMergePropsHeplerMockFn);

  if (typeof render === 'function') {
    const tree = render(createElementMockFn, context);
    const code = generateCode(tree);
    return code
  }
}
