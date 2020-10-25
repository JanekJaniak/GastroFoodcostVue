<template>
  <div id="app">
    <HomePage msg="Food Cost Calculator"/>
    <List :items="items" />
  </div>
</template>

<script>
import HomePage from './components/HomePage.vue';
import List from "./components/RenderList.vue";

export default {
  name: 'App',
  Data() {
    return {
      items: [
        {
          name:"Bigos",
          id:"",
          ingredients:[
           {
            id:1,
            name:"Szynka",
            quantity:5,
            price:10,
            vat:5,
            gros:"",
            net:"",
          }
          ]
        }
      ]
    }
  },
  methods: {

  },
  components: {
    HomePage,
    List,
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
