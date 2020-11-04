<template>
  <div>
      <div v-for="item in items" :key="item.id">
        <strong> {{item.name}} </strong>
        <br>
        <div>
          <div v-for="ingredient in item.ingredients" :key="ingredient.id">
          <strong>{{ingredient.name}}</strong>
          <label>Weight:</label>  
          <input placeholder="Edit" v-model.number="ingredient.quantity" type ="number" />
          <label>Price/Kg:</label>
          <input placeholder="Edit" v-model.number="ingredient.price" type ="number" />
          <label>VAT:</label>
          <select v-model="ingredient.vat" >
            <option v-for="option in ingredient.options" :value="option.value" :key="option.id" >
              {{option.text}}
            </option>
          </select>
          <strong>Net Value:{{calculateNetValue(ingredient.quantity,ingredient.price)}}</strong>
          <strong>Gross Value:{{calculateGrossValue(ingredient.quantity,ingredient.price,ingredient.vat)}}</strong>
          </div>
        </div>
      </div>
    <div>
      <input @input="handleInput">
      <button @click="addIngredient">Add new ingredient</button>
    </div>
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
            vat:"1",
            options: [
              { text: "Select Vat", value:1},
              { text: "5", value:1.05},
              { text: "8", value:1.08},
              { text: "23", value:1.23}
            ],
            gross:"",
            net:"",
           },
           {
            id:2,
            name:"Kielbasa",
            quantity:1.6,
            price:20.99,
            vat:"",
            gross:"",
            net:"",
           },
          ]
        }
      ]
    }
  },
  methods: {
      calculateNetValue(quantity,price) {
         return (quantity * price).toFixed(2);
      },
      calculateGrossValue(quantity,price,vat) {
        return (quantity * price * vat).toFixed(2);
      },
      addIngredient() {
        console.log('hej');
      },
      handleInput() {
        console.log('hejhej');
      }

  },
  components: {
  }
}
</script>

<style>
 
</style>
