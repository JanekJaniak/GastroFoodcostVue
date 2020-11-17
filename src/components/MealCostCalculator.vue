<template lang="pug">
  div.meal_cost_calculator
    h1.heading-primary Food Cost Calculator

    h2.heading-secondary {{meal.name}}

    ingredients-table(
      :ingredients="meal.ingredients"
      :vatOptions="vatOptions",
      :tHeader="tHeader"
      @inputChange="updateInputValue"
      @vatChange="updateVat"
    )

    table.table-calculate
      thead
        th.table__inner Total meal weight/Kg:

        th.table__inner Portion weight/g:

        th.table__inner Number of servings:

      tbody
        td.table__inner
          input.input( 
            type="number" 
            :id="`totalWeight`"
            placeholder="Edit"
            v-model.number="meal.total.weight" 
            @focus="selectInput($event)"
          )

        td.table__inner
          input.input( 
            type="number" 
            :id="`portionWeight`" 
            placeholder="Edit" 
            v-model.number="meal.portion.weight" 
            @focus="selectInput($event)"
          )

        td.table__inner {{calculatePortionsCount(meal.total.weight, meal.portion.weight)}}

    table.table-calculate
      thead
        th.table__inner 

        th.table__inner Net cost:

        th.table__inner Gross cost:

      tbody
        tr
          td.table__inner
            strong Total:

          td.table__inner {{calculateTotalCost('net')}}

          td.table__inner {{calculateTotalCost('gross')}}
          
        tr
          td.table__inner 
            strong Per portion:

          td.table__inner {{calculatePortionCost('net')}}

          td.table__inner {{calculatePortionCost('gross')}}

    button.button.button-dim SAVE
</template>

<script>
import IngredientsTable from './IngredientsTable'
import { uuid } from 'vue-uuid'; 
export default {
  name: 'MealCostCalculator',
   data() {
    return {
      meal: {
        name: 'Bigos',
        id: 1,
        ingredients: [
          {
            id: 1,
            name: 'Lopatka',
            quantity : 4.1,
            price: 10.45,
            vat: '1', 
            gross: 0,
            net: 0,
          },
          {
            id: 2,
            name: 'Kielbasa',
            quantity: 1.6,
            price: 20.99,
            vat:  1,
            gross: 0,
            net: 0,
          },
        ],
        portion: {
          totalWeight: 0,
          weight: 0,
          count: 0,
          cost: {
            net: 0,
            gross: 0,
          }
        },
        total: {
          cost: {
            net: 0,
            gross: 0,
          },
          weight: 0,
        },
      },

      vatOptions: [
        { text: 'Select Vat', value: 1, disabled: true},
        { text: '5', value: 1.05},
        { text: '8', value: 1.08},
        { text: '23', value: 1.23}      
      ],

      newIngredientInputValue: '',

      tHeader: [
        {id: 1, name: 'Ingredient'}, 
        {id: 2, name: 'Price'}, 
        {id: 3, name: 'Weight/kg'}, 
        {id: 4, name: 'VAT'}, 
        {id: 5, name: 'Net value'}, 
        {id: 6, name: 'Gross value'} 
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
          vat: 1,
          gross: 0,
          net: 0,
        };

        if(this.newIngredientInputValue) {
          this.meal.ingredients.push(newIngredient);
          this.newIngredientInputValue = '';
        }
      },

      calculatePortionsCount(totalWeight, portionWeight) {
        let portionCount = 0;

        if (this.meal.total.weight && this.meal.portion.weight ) {  
          portionCount = totalWeight / (portionWeight / 1000);
          portionCount = portionCount < 1 ? 0 : Math.round(portionCount);

          this.meal.portion.count = portionCount;
        }

        return portionCount;
      },

      calculateTotalCost(costType) {
        let total = 0;
        this.meal.ingredients.forEach(ingredient => {
          total += parseFloat(ingredient[costType]);
        });

        total = parseFloat(total.toFixed(2));
        this.meal.total.cost[costType] = total;
        
        return total;
      },

      calculatePortionCost(costType) {
        let portion = 0;
        
        if (this.meal.total.cost[costType] && this.meal.portion.count) {
          portion = (this.meal.total.cost[costType] / this.meal.portion.count).toFixed(2); 
          
          this.meal.portion.cost[costType] = parseFloat(portion);
        }

        return this.meal.portion.cost[costType];
      },

      removeItem(id) {
        this.meal.ingredients = this.meal.ingredients.filter(ingredient =>ingredient.id != id)
      },

      selectInput(event) {
        event.target.select();
      },

      updateInputValue({value, index, field}) {
        this.meal.ingredients[index][field] = parseFloat(value);
      },

      updateVat ({value, index}) { 
        this.meal.ingredients[index].vat = value
      }

  },

  components: {
    'ingredients-table': IngredientsTable
  }

}
</script>

<style lang="sass">
.meal_cost_calculator
  margin: 0 auto
  width: 80vw
  max-width: 1000px
  position: relative
</style>
