<template>
  <div class="table-container">
    <h2>Food Cost Calculator</h2>
    <h3>{{meal.name}}</h3>
    <table class="ingredient-table">
      <thead>
        <th v-for="header in tHeader" :key="header.id">{{header.name}}</th>
      </thead>
      <tbody>
        <tr v-for="({id, name, quantity, price, vat}, ingredientIndex) in meal.ingredients" :key="id">
          <td><strong>{{name}}</strong></td>
          <td>
            <input 
              :id="`weight-${ingredientIndex}`" 
              placeholder="Edit" 
              v-model.number="meal.ingredients[ingredientIndex].quantity"  
              type="number"
              onFocus="this.select()"
            />
          </td>
          <td>
            <input 
              :id="`price-${ingredientIndex}`" 
              placeholder="Edit" 
              v-model.number="meal.ingredients[ingredientIndex].price" 
              type="number"
              onFocus="this.select()"
            />
          </td>
          <td><select v-model="meal.ingredients[ingredientIndex].vat">
            <option 
              v-for="option in vatOptions" 
              :value="option.value" 
              :key="option.id" 
              :disabled="option.disabled"
            >
              {{option.text}}
            </option>
          </select></td>
          <td>
            <strong>{{calculateNetValue(quantity, price, ingredientIndex)}}</strong>
          </td>
          <td>
            <strong>{{calculateGrossValue(quantity, price, vat, ingredientIndex)}}</strong>
          </td>
          <td class="remove-button-wrapper" @click="removeItem(id)"><button class="remove-button">X</button></td>
        </tr>
      </tbody>
    </table>
    <div class="newIngredient">
      <input 
        placeholder="Ingredient name" 
        @keypress.enter="addIngredient()"  
        @input="handleInput" 
        :value="newIngredientInputValue"
      >
      <button class="dim button" @click="addIngredient()">Add new ingredient</button>
    </div>
    <table class="weight-table">
      <thead>
        <th>Total weight/Kg:</th>
        <th>Portion weight/g:</th>
        <th>Number of servings:</th>
      </thead>
      <tbody>
        <td>
          <input 
            type="number" 
            :id="`totalWeight`" 
            placeholder="Edit" 
            v-model.number="meal.portions.totalWeight" 
            onFocus="this.select()"
          >
        </td>
        <td>
          <input 
            type="number" 
            :id="`portionWeight`" 
            placeholder="Edit" 
            v-model.number="meal.portions.portionWeight" 
            onFocus="this.select()"
          >
        </td>
        <td>{{calculatePortionsCount(meal.portions.totalWeight, meal.portions.portionWeight)}}</td>
      </tbody>
    </table>
    <table class="cost-table">
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
        name: "Bigos",
        id: 1,
        ingredients: [
          {
            id: 1,
            name: "Lopatka",
            quantity : 4.1,
            price: 10.45,
            vat: "1", 
            gross: 0,
            net: 0,
          },
          {
            id: 2,
            name: "Kielbasa",
            quantity: 1.6,
            price: 20.99,
            vat: "1",
            gross: 0,
            net: 0,
          },
        ],
        portions: {
          totalWeight: 0,
          portionWeight: 0,
          portionsCount: 0,
          portionNetCost: 0,
          portionGrossCost: 0,
        },
        totalNetCost: 0,
        totalGrossCost: 0,
        totalPortionNetCost: 0,
        totalportionGrossCost: 0,
      },

      vatOptions: [
        { text: "Select Vat", value: 1, disabled: true},
        { text: "5", value: 1.05},
        { text: "8", value: 1.08},
        { text: "23", value: 1.23}      
      ],

      newIngredientInputValue: "",

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
        const netValue = (quantity * price).toFixed(2);
        this.meal.ingredients[ingredientIndex].net = netValue

        return netValue;
      },

      calculateGrossValue(quantity, price, vat, ingredientIndex) {
        const grossValue = (quantity * price * vat).toFixed(2);
        this.meal.ingredients[ingredientIndex].gross = grossValue;

        return grossValue;
      },

      handleInput(event) {
        this.newIngredientInputValue = event.target.value;
      },

      addIngredient() {
        const newID = uuid.v4();

        const newIngredient = {
          id: newID,
          name: this.newIngredientInputValue,
          quantity: 0,
          price: 0,
          vat: "1",
          gross: 0,
          net: 0,
        };

        if(this.newIngredientInputValue) {
          this.meal.ingredients.push(newIngredient);
          this.newIngredientInputValue = "";
        }
      },

      calculatePortionsCount(totalWeight, portionWeight) {
        let portionCount = 0;

        if (this.meal.portions.totalWeight && this.meal.portions.portionWeight ) {  
          portionCount = totalWeight / (portionWeight / 1000);
          portionCount = portionCount < 1 ? 0 : Math.round(portionCount);

          this.meal.portions.portionsCount = portionCount;
        }

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
        let portion = 0;
        if (this.meal.totalNetCost && this.meal.portions.portionsCount) {
          portion = (this.meal.totalNetCost / this.meal.portions.portionsCount).toFixed(2); 

          this.meal.portions.portionNetCost = portion;
        }

        return portion;
      },

      portionGrossCost() {
        let portion = 0;
        if (this.meal.totalGrossCost && this.meal.portions.portionsCount) {
          portion = (this.meal.totalGrossCost / this.meal.portions.portionsCount).toFixed(2); 

          this.meal.portions.portionGrossCost = portion;
        }

        return portion;
      },

      removeItem(id) {
        this.meal.ingredients = this.meal.ingredients.filter(ingredient =>ingredient.id != id)
      },
  },
}
</script>

<style>

h2 {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.8rem;
   color: rgb(2, 2, 184);
}

h3 {
  font-family: 'Josefin Sans', sans-serif;
  font-size: 1.5rem;
  font-weight: 700;
}
th, td {
  border: none;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  padding-bottom: 0.5rem;
}

input {
  border-style: solid;
  border-width: 1px;
  background-color: rgb(245, 245, 245);
  padding: 0.2rem;
  font-weight: 700;
}

input:focus {
  outline-color:  rgb(76, 76, 250);
}

select {
   background-color: rgb(245, 245, 245);
}

.cost-table, .weight-table {
  border: none;
  border-bottom-style: solid;
  border-bottom-width: 1px;
  margin: 1rem;
  margin-left: auto; 
  margin-right: 0;
}

.ingredient-table {
  width: 100%;
  border: none;
}

.table-container {
  margin: 0 auto;
  width: 80vw;
  max-width: 1000px;
  position: relative;
}

.dim:hover {
  background-color: rgb(4, 4, 122);
  border-color: black;
  transition: .5s ease-in;
}

.dim:active {
  color: black;
  background-color: rgb(188, 207, 248);
  border-color: rgb(76, 76, 250);
  transition:.2s ease-out;
}

.button {
  margin: 1rem;;
  font-size: .6rem;
  padding: 0.3rem 0.8rem 0.3rem 0.8rem;
  border-width: 0.2rem;
  border-color: rgb(98, 98, 241);
  background-color: rgb(58, 58, 241);
  color: white;
  font-weight: 700;
}

.remove-button {
  background-color: red;
  font-weight: 900;
}
.remove-button:hover {
  background-color: rgb(248, 149, 149);
  font-weight: 900;
  transition: .3s ease-in;
}

.remove-button:active {
  background-color: red;
  font-weight: 900;
  color: white;
}

.remove-button-wrapper {
  border: none;
}

</style>
