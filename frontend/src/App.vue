<template>
  <div id="app">
      <Home />
      <div id ="content" class="content">
      <router-view></router-view>
      </div>
    </div>
</template>

<script>
import Home from './components/Home.vue'
export default {
  name: "App",
  components:{
    Home,
  },
};
</script>




