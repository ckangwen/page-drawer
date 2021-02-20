import { transform } from "@babel/standalone";
import jsxSyntaxPlugin from "@babel/plugin-syntax-jsx";
import jsxPreset from "@vue/babel-preset-jsx";

export function parseJSX(jsx: string) {
  const result = transform(jsx, {
    plugins: [jsxSyntaxPlugin],
    presets: [jsxPreset]
  });

  return result.code;
}

// TODO
