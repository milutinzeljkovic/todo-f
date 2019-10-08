<template>
  <div id="app">
    <Header/>
    <router-view/>
  </div>
</template>

<script>
import Header from './components/Header';
import { mapActions } from 'vuex';

export default {
  name: 'app',
  methods: {
    ...mapActions(['fetchCurrentUser'])
  },
  components: {
    Header
  },
  created(){
    this.fetchCurrentUser();
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
