<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">
        <strong> {{item.name}} </strong>
        <br>
        <ul>
          <li v-for="ingredient in item.ingredients" :key="ingredient.id">
          <strong>{{ingredient.name}}</strong>
          <span>Weight:</span>  
          <InputHandler :itemID="ingredient.id" :action="changeQuantity" :actionName="quantity"/>
          <span>Price:</span>
          <InputHandler :itemID="ingredient.id" :action="changePrice" :actionName="price"/>
          <VatSelector :itemID="ingredient.id" />
          <strong>Net Value:</strong>
          <strong>Gross Value:</strong>
          </li>
        </ul>
      </li>
      <li>Total Value List</li>
    </ul>
  </div>
</template>

<script>
import InputHandler from "./InputHandler"
import VatSelector from "./VatSelector"
export default {
  name: "List",
  props: {
    items: Array,
  },
  methods: {
    changeQuantity(itemID) {
      console.log(itemID);
    },           
    changePrice(itemID) {
      console.log(itemID);
    },           
  },
  
  components: {
    InputHandler,
    VatSelector
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

  li {
    display: flex;
    
  }

</style>
