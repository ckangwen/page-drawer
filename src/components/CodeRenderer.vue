<script>
import { parseJSX } from "@/libs";
const str = `
<div>
  <p>Nice</p>
</div>
`;
export default {
  functional: true,
  props: {
    code: String
  },
  render(h, context) {
    // const { props } = context;
    // const code = props.code;
    const code = parseJSX(str);
    const render = Function("h", `return ${code}`);
    return render(h);
  }
};
</script>
