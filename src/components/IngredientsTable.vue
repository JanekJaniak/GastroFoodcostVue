<template lang="pug">
  table.table
    thead
      th.table__inner(
        v-for="header in tHeader" 
        :key="header.id"
      ) {{header.name}}

    tbody
      tr.table__tr(
        v-for="({id, name, quantity, price, vat}, ingredientIndex) in ingredients" 
        :key="id"
      )
        td.table__inner
          strong {{name}}

        td.table__inner
          input.input( 
            :id="`weight-${ingredientIndex}`"
            placeholder="Edit"
            v-model.number="ingredients[ingredientIndex].quantity"  
            type="number"
            @focus="selectInput($event)"
          )

        td.table__inner
          input.input( 
            :id="`price-${ingredientIndex}`" 
            placeholder="Edit" 
            v-model.number="ingredients[ingredientIndex].price" 
            type="number"
            @focus="selectInput($event)"
          )

        td.table__inner
          select(v-model="ingredients[ingredientIndex].vat")
            option( 
              v-for="option in vatOptions" 
              :value="option.value"
              :key="option.id"
              :disabled="option.disabled"
            ) {{option.text}}

        td.table__inner
          strong {{calculateNetValue(quantity, price, ingredientIndex)}}

        td.table__inner
          strong {{calculateGrossValue(quantity, price, vat, ingredientIndex)}}

        td.table__inner.table__inner-no_border
          button.button.button-remove(
            @click="removeItem(id)"
          ) X

  div.new__ingredient
    input.input( 
      placeholder="Ingredient name" 
      @keypress.enter="addIngredient()"  
      @input="handleInput" 
      :value="newIngredientInputValue"
    )

    button.button.button-dim(@click="addIngredient()") Add new ingredient
</template>  

<script>
  export default {
    name: 'IngredientsTable',
      data() {
        return {
          value: ''
        }
      },
    
    props: {
      ingredients: Array,
      vatOptions: Array,
      tHeader: Array
    },

    methods: {
      
    },
    
  }
</script>