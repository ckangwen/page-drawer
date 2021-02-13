<template>
  <el-container style="flex-direction: column">
    <Header />
    <el-container style="padding: 0">
      <Aside />
      <Main />
      <Setting />
    </el-container>
    <Bottom />
  </el-container>
</template>

<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Main from "@/components/Main";
import Bottom from "@/components/Bottom.vue";
import Setting from "@/components/Setting.vue";
// import EditableOverlay from "@/components/EditableOverlay";

import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Aside,
    Main,
    Bottom,
    Setting
  }
});
</script>
