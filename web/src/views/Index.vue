<template>
  <div class="index">
    <v-header></v-header>
    <router-view></router-view>
    <v-footer></v-footer>
  </div>
</template>

<script>
// @ is an alias to /src
import VHeader from '../components/main-header'
import VFooter from '../components/main-footer'


export default {
  name: "Index",
  components: {
    VHeader,
    VFooter
  }
};
</script>
