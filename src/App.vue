<template>
  <div id="app">
    <HomePage msg="Meal Cost Calculator"/>
    <MealCostCalculator />
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue';
import MealCostCalculator from "./components/MealCostCalculator.vue";

export default {
  name: "App",
  
  components: {
    HomePage,
    MealCostCalculator,
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
