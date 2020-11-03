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
          <input placeholder="Edit" v-model.number="quantity" type ="number"  @input="quantityInput" />
          <span>Price:</span>
          <input placeholder="Edit" v-model.number="price" type ="number"  @input="priceInput" />
          <span>VAT:</span>
          <select v-model="vat">
            <option  disabled value="">Select VAT</option>
            <option>5</option>
            <option>8</option>
            <option>23</option>
          </select>
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
export default {
  name: "List",
   data() {
    return {
      vat:"",
      quantity:"",
      price:""
    }
  },
  props: {
    items: Array,
  },
  methods: {
      quantityInput(event) {
      this.value = event.target.value;
      console.log(this.value);
    },         
      priceInput(event) {
      this.value = event.target.value;
    },         
  },
  
  components: {

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
