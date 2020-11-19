<template>
  <div id="app">
    <Header appName="Gastro Helper"/>
    <RecipeCostCalculator/>
  </div>
</template>

<script>
import Header from './components/Header.vue';
import RecipeCostCalculator from "./components/RecipeCostCalculator.vue";

export default {
  name: "App",
  
  components: {
    Header,
    RecipeCostCalculator,
  }
}
</script>

<style lang='sass'>
@import './style.sass'

#app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

</style>
