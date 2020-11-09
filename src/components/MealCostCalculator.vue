<template>
  <div class = "tableContainer">
    <h3> {{meal.name}} </h3>
      <table class ="ingredientTable" border ="1">
        <thead>
          <th v-for="header in tHeader" :key = "header.id">{{header.name}}</th>
        </thead>
        <tbody>
          <tr v-for="({id, name, quantity, price, vat}, ingredientIndex) in meal.ingredients" :key="id">
            <td><strong>{{name}}</strong></td>
            <td><input 
              :id="`weight-${ingredientIndex}`" 
              placeholder="Edit" 
              v-model.number="meal.ingredients[ingredientIndex].quantity"  
              type="number"
            /></td>
            <td><input 
              :id="`price-${ingredientIndex}`" 
              placeholder="Edit" 
              v-model.number="meal.ingredients[ingredientIndex].price" 
              type="number"
            /></td>
            <td><select v-model="meal.ingredients[ingredientIndex].vat">
              <option v-for="option in vatOptions" :value="option.value" :key="option.id" :disabled="option.disabled">
                {{option.text}}
              </option>
            </select></td>
            <td><strong>{{calculateNetValue(quantity, price, ingredientIndex)}}</strong></td>
            <td><strong>{{calculateGrossValue(quantity, price, vat, ingredientIndex)}}</strong></td>
          </tr>
        </tbody>
      </table>
      <div class="newIngredient">
        <input placeholder="Ingredient name" @keypress.enter="addIngredient()"  @input="handleInput" :value="value">
        <button class="dim button" @click="addIngredient()">Add new ingredient</button>
      </div>
      <table class="weightTable" border = "1">
        <thead>
          <th>Total weight/Kg:</th>
          <th>Portion weight/g:</th>
          <th>Number of servings:</th>
        </thead>
        <tbody>
          <td><input type="number" :id="`totalWeight`" placeholder="Edit" v-model.number="meal.portions.totalWeight"></td>
          <td><input type="number" :id="`portionWeight`" placeholder="Edit" v-model.number="meal.portions.portionWeight"></td>
          <td>{{calculatePortionsCount(meal.portions.totalWeight, meal.portions.portionWeight)}}</td>
        </tbody>
      </table>
      <table class="costTable" border = "1">
        <thead>
          <th></th>
          <th>Net cost:</th>
          <th>Gross cost:</th>
        </thead>
        <tbody>
          <tr>
            <td><strong>Total:</strong></td>
            <td>{{totalNetCost()}}</td>
            <td>{{totalGrossCost()}}</td>
          </tr>
          <tr>
            <td><strong>Per portion:</strong></td>
            <td>{{portionNetCost()}}</td>
            <td>{{portionGrossCost()}}</td>
          </tr>
        </tbody>
      </table>
    <button class="dim button">SAVE</button>
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
      tHeader: [
        {id: 1, name: "Ingredient"}, 
        {id: 2, name: "Price"}, 
        {id: 3, name: "Weight/kg"}, 
        {id: 4, name: "VAT"}, 
        {id: 5, name: "Net value"}, 
        {id: 6, name: "Gross value"} 
      ],
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

        portionCount < 1 ? 0 : portionCount;

        return portionCount;
      },

      totalNetCost() {
        let total = 0;
        this.meal.ingredients.forEach(ingredient => {
        total += parseFloat(ingredient.net);
        });

        total = total.toFixed(2);
        this.meal.totalNetCost = total;
      
        return total;
      },

      totalGrossCost() {
        let total = 0;
        this.meal.ingredients.forEach(ingredient => {
        total += parseFloat(ingredient.gross);
        });

        total = total.toFixed(2);
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

th, td {
  border: none;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding-bottom: 0.5rem;
}

input{
  border-style: solid;
  border-width: 1px;
  background-color: rgb(245, 245, 245);
  padding: 0.2rem;
}

.costTable, .weightTable {
  border: none;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  margin: 1rem;
  margin-left:auto; 
  margin-right:0;
}

.ingredientTable {
  width: 100%;
  border: none;
}

.tableContainer {
  margin: 0 auto;
  width: 80vw;
  max-width: 1000px;
  position: relative;
}

.dim {
  opacity: 1;
  transition: opacity .15s ease-in;
}

.dim:hover, .dim:focus {
  opacity: .5;
  transition: opacity .15s ease-in;
}

.dim:active {
  opacity: .8;
  transition: opacity .15s ease-out;
}

.button {
  margin: 1rem;;
  font-size: .675rem;
  padding: 0.3rem 0.8rem 0.3rem 0.8rem;
  border-width: 0.2rem;
  border-color: navy;
  background-color: white;
  font-weight:lighter;
}

 
</style>
