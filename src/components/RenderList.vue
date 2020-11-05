<template>
  <div>
      <div v-for = "(item, index) in items" :key = "item.id">
        <h3> {{item.name}} </h3>
        <div>
          <div v-for = "(ingredient, index) in item.ingredients" :key = "ingredient.id">
            <strong>{{ingredient.name}}</strong>
            <label :for = "`weight-${index}`" >Weight:</label>  
            <input :id = "`weight-${index}`" placeholder= "Edit" v-model.number = "ingredient.quantity" type = "number" />
            <label :for = "`price-${index}`" >Price/Kg:</label>
            <input :id = "`price-${index}`" placeholder = "Edit" v-model.number = "ingredient.price" type = "number" />
            <label>VAT:</label>
            <select v-model = "ingredient.vat" >
              <option v-for = "option in vatOptions" :value = "option.value" :key = "option.id" :disabled = "option.disabled" >
                {{option.text}}
              </option>
            </select>
            <strong>Net Value:{{calculateNetValue(ingredient.quantity, ingredient.price)}}</strong>
            <strong>Gross Value:{{calculateGrossValue(ingredient.quantity, ingredient.price, ingredient.vat)}}</strong>
          </div>
        </div>
        <div>
          <input placeholder = "Ingredient name" @keypress.enter = "addIngredient(index)"  @input = "handleInput">
          <button @click = "addIngredient(index)" :itemIndex = index >Add new ingredient</button>
        </div>
        <button>SAVE</button>
      </div>
  </div>
</template>

<script>
import { uuid } from 'vue-uuid'; 
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
            gross:"",
            net:"",
           },
           {
            id:2,
            name:"Kielbasa",
            quantity:1.6,
            price:20.99,
            vat:"1",
            gross:"",
            net:"",
           },
          ]
        }
      ],
      vatOptions: [
              { text: "Select Vat", value:1, disabled: true},
              { text: "5", value:1.05},
              { text: "8", value:1.08},
              { text: "23", value:1.23}
      ],
    }
  },
  methods: {
      calculateNetValue(quantity,price) {
         return (quantity * price).toFixed(2);
      },
      calculateGrossValue(quantity,price,vat) {
        return (quantity * price * vat).toFixed(2);
      },
      handleInput(event) {
        this.value = event.target.value;
      },
      addIngredient(index) {
        const newID = uuid.v4();
        const newIngredient = {
          id:newID,
          name:this.value,
          quantity:"",
          price:"",
          vat:"1",
          gross:"",
          net:"",
        };
        if(this.value) {
        this.items[index].ingredients.push(newIngredient);
        this.value = "";
        }
      }
  },
  components: {
  }
}
</script>

<style>
 
</style>
