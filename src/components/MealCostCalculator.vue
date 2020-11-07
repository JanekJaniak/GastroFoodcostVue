<template>
  <div>
        <h3> {{meal.name}} </h3>
        <div>
          <div v-for="({id, name, quantity, price, vat}, ingredientIndex) in meal.ingredients" :key="id">
            <strong>{{name}}</strong>
            <label :for="`weight-${ingredientIndex}`">Weight:</label>  
            <input 
              :id="`weight-${ingredientIndex}`" 
              placeholder="Edit" 
              v-model.number="meal.ingredients[ingredientIndex].quantity"  
              type="number"
            />
            <label :for="`price-${ingredientIndex}`">Price/Kg:</label>
            <input :id="`price-${ingredientIndex}`" placeholder="Edit" v-model.number="meal.ingredients[ingredientIndex].price" type="number"/>
            <label>VAT:</label>
            <select v-model="meal.ingredients[ingredientIndex].vat">
              <option v-for="option in vatOptions" :value="option.value" :key="option.id" :disabled="option.disabled">
                {{option.text}}
              </option>
            </select>
            <strong>Net Value:{{calculateNetValue(quantity, price, ingredientIndex)}}</strong>
            <strong>Gross Value:{{calculateGrossValue(quantity,price,vat, ingredientIndex)}}</strong>
          </div>
        </div>
        <div>
          <input placeholder="Ingredient name" @keypress.enter="addIngredient()"  @input="handleInput" :value="value">
          <button @click="addIngredient()">Add new ingredient</button>
        </div>
        <div>
          <label :for="`totalWeight`">Total weight/Kg:</label>
          <input type="number" :id="`totalWeight`" placeholder="Edit" v-model.number="meal.portions.totalWeight">
          <label :for="`portionWeight`">Portion weight/g:</label>
          <input type="number" :id="`portionWeight`" placeholder="Edit" v-model.number="meal.portions.portionWeight">
          <strong>Number of servings: {{calculatePortionsCount(meal.portions.totalWeight, meal.portions.portionWeight)}}</strong>
        </div>
        <div>
          <strong>Total net cost: {{totalNetCost()}}</strong>
          <strong>Total gross cost: {{totalGrossCost()}}</strong>
        </div>
        <div>
          <strong>Portion net cost: {{portionNetCost()}}</strong>
          <strong>Portion gross cost: {{portionGrossCost()}}</strong>
        </div>
        <button>SAVE</button>
      </div>
</template>

<script>
import { uuid } from 'vue-uuid'; 
export default {
  name: "MealCostCalculator",
   data() {
    return {
      meal: {
        name:"Bigos",
        id:1,
        ingredients:[
          {
          id:1,
          name:"Lopatka",
          quantity:4.1,
          price:10.45,
          vat:"1", 
          gross:0,
          net:0,
          },
          {
          id:2,
          name:"Kielbasa",
          quantity:1.6,
          price:20.99,
          vat:"1",
          gross:0,
          net:0,
          },
        ],
        portions: {
          totalWeight: "",
          portionWeight: "",
          portionsCount:"",
          portionNetCost: 0,
          portionGrossCost: 0,
        },
        totalNetCost: 0,
        totalGrossCost: 0,
        totalPortionNetCost: 0,
        totalportionGrossCost: 0,
      },

      vatOptions: [
        { text: "Select Vat", value:1, disabled: true},
        { text: "5", value:1.05},
        { text: "8", value:1.08},
        { text: "23", value:1.23}      
      ],
      value: "",
    }
  },
  
  methods: {
      calculateNetValue(quantity, price, ingredientIndex) {
        const netValue =  (quantity * price).toFixed(2);
        this.meal.ingredients[ingredientIndex].net = netValue
        return netValue;
      },

      calculateGrossValue(quantity,price,vat, ingredientIndex) {
        const grossValue = (quantity * price * vat).toFixed(2);
        this.meal.ingredients[ingredientIndex].gross = grossValue;

        return grossValue;
      },

      handleInput(event) {
        this.value = event.target.value;
      },

      addIngredient() {
        const newID = uuid.v4();

        const newIngredient = {
          id: newID,
          name: this.value,
          quantity: "",
          price: "",
          vat: "1",
          gross: "",
          net: "",
        };

        if(this.value) {
          this.meal.ingredients.push(newIngredient);
          this.value = "";
        }
      },

      calculatePortionsCount(totalWeight, portionWeight) {
        let portionCount = 0;

        if ((this.meal.portions.totalWeight == "" && this.meal.portions.totalWeight == 0) || (this.meal.portions.portionWeight == "" && this.meal.portions.portionWeight == 0)) {
          portionCount = 0;
        } 
        else {
          portionCount = Math.round(totalWeight / (portionWeight / 1000));
          this.meal.portions.portionsCount = portionCount;
        }

        return portionCount;
      },

      totalNetCost() {
        let total = 0;
        this.meal.ingredients.forEach(ingredient => {
        
        total += parseFloat(ingredient.net);
        });
        this.meal.totalNetCost = total;
      
        return total;
      },

      totalGrossCost() {
        let total = 0;
        this.meal.ingredients.forEach(ingredient => {
        
        total += parseFloat(ingredient.gross);
        });
        this.meal.totalGrossCost = total;

        return total;
      },

      portionNetCost() {
        let portion = this.meal.totalNetCost / this.meal.portions.portionsCount;

        if ((this.meal.totalNetCost == "" && this.meal.totalNetCost == 0) || (this.meal.portions.portionsCount == "" && this.meal.portions.portionsCount == 0)) {
          portion = 0;
        } 
        else {
          portion = (this.meal.totalNetCost / this.meal.portions.portionsCount).toFixed(2);
          this.meal.portions.portionNetCost = portion;
        }

        return portion;
      },

      portionGrossCost() {
        let portion = this.meal.totalGrossCost / this.meal.portions.portionsCount;

        if ((this.meal.totalGrossCost == "" && this.meal.totalGrossCost == 0) || (this.meal.portions.portionsCount == "" && this.meal.portions.portionsCount == 0)) {
          portion = 0;
        } 
        else {
          portion = (this.meal.totalGrossCost / this.meal.portions.portionsCount).toFixed(2);
          this.meal.portions.portionGrossCost = portion;
        }

        return portion;
      },
  },

}
</script>

<style>
 
</style>
