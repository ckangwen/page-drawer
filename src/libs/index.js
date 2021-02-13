/* eslint-disable @typescript-eslint/camelcase */
const str = `function render(h, context) {
    return h(
      "div",
      _vue_babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default()([{}, context.data, {}, context.props]),
      [h("el-card", {
      "attrs": {
        "bodyStyle": {
          padding: 0
        }
      }
    }, [h("img", {
      "attrs": {
        "src": "https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
      },
      "class": "image"
    }), h("div", {
      "style": "padding: 14px;"
    }, [h("span", ["\u597D\u5403\u7684\u6C49\u5821"]), h("div", {
      "class": "bottom clearfix"
    }, [h("time", {
      "class": "time"
    }, ["2020-10-12"]), h("el-button", {
      "attrs": {
        "type": "text"
      },
      "class": "button"
    }, ["\u64CD\u4F5C\u6309\u94AE"])])])])]);
  }`;

// const res = str.match(/h\(\"(\w+)\",/g);

const d = "1【ddd】sfdsaf【ccc】fdsaf【bbbb】";
const res = str.match(/[^h\(\"]+(?=\",)/);

// str.match(/[^xxx]+(?=xxx,)/g);

const h = (tag, props, children) => {
  return {
    componentName: tag,
    componentProps: props,
    children
  };
};

const _vue_babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default = () => {
  return function(...args) {
    const _props = [].concat(...args);
    let props = {};
    _props.forEach(p => {
      props = Object.assign(props, p);
    });
    return props;
  };
};

const context = {
  data: {},
  props: {}
};

// const str2 = "return " + str;
// const res5 = new Function(str2);
// const res6 = res5(h, context);
// console.log(res6());

// const func1 = "function log() { return sum(1, 3) }";
// const func6 = `return function aa(sum) { return function log() { return sum(1, 3) } }`;
// function sum(a, b) {
//   return a + b;
// }
// const func2 = new Function(func6);
// const fun3 = func2();
// const fun4 = fun3(sum);
// const fun5 = fun4();

const renderWrapperFunctionStr = `return function renderWrapperFn( _vue_babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default) { return ${str} }`;

const fun = new Function(renderWrapperFunctionStr);
const renderWrapperFn = fun();
const render = renderWrapperFn(
  _vue_babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default
);
const renderFn = render(h, context);
console.log(JSON.stringify(renderFn, null, 2));

function toTree(data: Record<TreeKey, NodeDeclaration>, keys = [ROOT_ID]) {
  if (Object.keys(data).length === 0) return [];

  return keys.map(k => {
    const item = data[k];
    const style = item.style || {};
    const styleText = Object.keys(style)
      .map(p => {
        return `${k}: ${style[p]}`;
      })
      .join("; ");
    const node: NodeTree = {
      componentName: item.componentName,
      className: item.class ? item.class.join(" ") : "",
      style: styleText,
      children: toTree(data, item.children || [])
    };

    return node;
  });
}

function renderJSXToStrinf(renderFnStr, context) {
  if (!context.data) {
    context.data = {};
  }
  if (!context.props) {
    context.props = {};
  }
  const renderWrapperFunctionStr = `return function renderWrapperFn( _vue_babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default) { return ${renderFnStr} }`;
  const fun = new Function(renderWrapperFunctionStr);
  const renderWrapperFn = fun();
  const render = renderWrapperFn(
    _vue_babel_helper_vue_jsx_merge_props__WEBPACK_IMPORTED_MODULE_0___default
  );

  const createElementMockFn = (tag, props, children) => {
    return {
      componentName: tag,
      componentProps: props,
      children
    };
  };

  const tree = render(createElementMockFn, context);
}
