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
          <input placeholder="Edit" v-model.number="ingredient.quantity" type ="number" />
          <span>Price:</span>
          <input placeholder="Edit" v-model.number="ingredient.price" type ="number" />
          <span>VAT:</span>
          <select v-model.number="ingredient.vat" >
            <option  disabled value="">Select VAT</option>
            <option>5</option>
            <option>8</option>
            <option>23</option>
          </select>
          <strong>Net Value:{{calculateValue(ingredient.quantity,ingredient.price)}}</strong>
          <strong>Gross Value:</strong>
          </li>
        </ul>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "List",
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
       calculateValue(quantity,price) {
         return (quantity*price).toFixed(2);
      },         
  },
  
  components: {

  }
}
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
