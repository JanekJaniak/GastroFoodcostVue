<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">
        <strong>{{ item.name }}</strong>
        <br>
        <ul>
          <li v-for="ingredient in item.ingredients" :key="ingredient.id">
            {{ingredient.name}}
          <InputHandler :itemID="ingredient.id" :inputType="quantity"/>
          <InputHandler :itemID="ingredient.id" :inputType="price"/>
          </li>
        </ul>
        
      </li>
    </ul>
  </div>
</template>

<script>
import InputHandler from "./InputHandler"
export default {
  name: "List",
  props: {
    items: Array,
  },
  methods: {

    },
  
  components: {
    InputHandler
  }
};
</script>

<style>
  
  ul {
    list-style: none;
    display:flex;
    flex-direction: column;
    align-items:flex-start;
  }

</style>
