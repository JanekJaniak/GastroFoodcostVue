<template lang="pug">
  div.ingredient_loss_calculator
    div.date-input
      h2.heading-secondary Please input time span of the calculation

      label.label(for="startDateInput") Start date: 

      input.input(
        type="date" 
        :id="`startDateInput`"
        placeholder="Edit"
        v-model.number="ingredient.startDate" 
      )

      label.label(for="endDateInput") End date: 
      
      input.input(
        type="date" 
        :id="`endDateInput`"
        placeholder="Edit"
        v-model.number="ingredient.startDate" 
      )

      div.ingredient-table
        table.table
          thead
            th.table__inner(
              v-for="header in ingredientHeaders" 
              :key="header.id"
            ) {{ header.name }}

          tbody
            td.table__inner
              input.input(
                type="text" 
                :id="`ingredientName`"
                placeholder="Edit"
                v-model.number="ingredient.name" 
              )

            td.table__inner
                input.input( 
                type="number" 
                placeholder="Edit"
                v-model.number="ingredient.inventoryStart"
                @focus="selectInput($event)"
              )

            td.table__inner
                input.input( 
                type="number" 
                placeholder="Edit"
                v-model.number="ingredient.inventoryEnd"
                @focus="selectInput($event)"
              )

            td.table__inner
                input.input( 
                type="number" 
                placeholder="Edit"
                v-model.number="ingredient.purcheses"
                @focus="selectInput($event)"
              )

      h2.heading-secondary Meals containg chosen ingredient ({{ ingredient.name }}):

      table.table
        thead
          th.table__inner(
            v-for="header in mealHeaders" 
            :key="header.id"
          ) {{ header.name }}

        tbody
          tr.table__tr(
            v-for="({ id, name, unitsSold, ingredientPerUnit, inventoryStart, inventoryEnd }, mealIndex) in meals" 
            :key="id"
          )
            td.table__inner
              strong {{ name }}

            td.table__inner
              input.input( 
                type="number" 
                placeholder="Edit"
                v-model.number="inventoryStart"
                @focus="selectInput($event)"
              )
            
            td.table__inner
              input.input( 
                type="number" 
                placeholder="Edit"
                v-model.number="inventoryEnd"
                @focus="selectInput($event)"
              )

            td.table__inner
              input.input( 
                type="number" 
                placeholder="Edit"
                v-model.number="ingredientPerUnit"
                @focus="selectInput($event)"
              )
            
            td.table__inner
              input.input( 
                type="number" 
                placeholder="Edit"
                v-model.number="unitsSold"
                @focus="selectInput($event)"
              )

            td.table__inner.table__inner-no_border
              button.button.button-remove(
                @click="handleRemoveButton(id)"
              ) X

    div.new__ingredient
      input.input( 
        placeholder="Meal name" 
        @keypress.enter=""
        :value="value"
        @input="" 
      )

      button.button.button-dim(@click="") Add new meal 

    button.button.button-dim SAVE
</template>

<script>
export default {
  name: 'IngredientsLossCalc',
    data() {
      return {
        ingredient: {
          name: 'Szynka',
          startDate: '',
          endDate: '',
          loss: '',
          inventoryStart: 2,
          inventoryEnd: 1,
          purcheses: 35,
        },
        meals: [
          {
            id: 1,
            name: 'Shepherds pie',
            unitsSold: 20,
            ingredientPerUnit: 200,
            inventoryStart: 300,
            inventoryEnd: 450,
            loss: 0
          },
          {
            id: 2,
            name: 'Bolognese',
            unitsSold: 30,
            ingredientPerUnit: 150,
            inventoryStart: 0,
            inventoryEnd: 700,
            loss: 0
          }
        ],
        ingredientHeaders: [
          {id: 1, name: 'Ingredient name'}, 
          {id: 2, name: 'Start inventory / kg'}, 
          {id: 3, name: 'End inventory / kg'}, 
          {id: 4, name: 'Purcheses / kg'},
        ],
        mealHeaders: [
          {id: 1, name: 'Name'}, 
          {id: 2, name: 'Start inv. / gm'}, 
          {id: 3, name: 'End inv. / gm'}, 
          {id: 4, name: 'Weight per portion / gm'}, 
          {id: 5, name: 'Portions sold'}, 
      ],
      }
    },

  methods: {
     selectInput(event) {
      event.target.select();
    },
  }
}
</script>

<style lang="sass">
.ingredient_loss_calculator
  margin: 0 auto
  width: 80vw
  max-width: 1000px
  position: relative

.ingredient-table
  margin-top: 3vh

.label
  margin-left: 10px

.ingredient-name 
  margin: 3vh
  
</style>
