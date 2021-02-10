<template>
  <el-container>
    <Aside />
    <Main />

    <!-- <EditableOverlay /> -->
    <Bottom />
  </el-container>
</template>

<script>
import Header from "@/components/Header";
import Aside from "@/components/Aside";
import Main from "@/components/Main";
import Bottom from "@/components/Bottom.vue";
// import EditableOverlay from "@/components/EditableOverlay";

import { defineComponent } from "@vue/composition-api";

export default defineComponent({
  name: "App",
  components: {
    Header,
    Aside,
    Main,
    Bottom
  }
});
</script>
