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
  name: "App",
  data() {
    return {
      items: [
        {
          name:"Bigos",
          id:1,
          ingredients:[
           {
            id:1,
            name:"Lopatka",
            quantity:4.1,
            price:10.45,
            vat:5,
            gros:"",
            net:"",
           },
           {
            id:2,
            name:"Kielbasa",
            quantity:1.6,
            price:20.99,
            vat:5,
            gros:"",
            net:"",
           },
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
