<template lang="pug">
  div.ingredients-table
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
            strong {{ name }}

          td.table__inner
            input.input( 
              placeholder="Edit"
              :value="price"
              @input="handleInput($event, ingredientIndex, 'price')"  
              type="number"
              @focus="selectInput($event)"
            )

          td.table__inner
            input.input( 
              placeholder="Edit" 
              :value="quantity"
              @input="handleInput($event, ingredientIndex, 'quantity')" 
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
                @select="handleSelect($event, ingredientIndex)"
              ) {{option.text}}

          td.table__inner
            strong calculateNetValue

          td.table__inner
            strong calculateGrossValue

          td.table__inner.table__inner-no_border
            button.button.button-remove(
              @click=""
            ) X

    div.new__ingredient
      input.input( 
        placeholder="Ingredient name" 
        @keypress.enter=""
        :value="value"
        @input="" 
      )

      button.button.button-dim(@click="") Add new ingredient
</template>  

<script>
  export default {
    name: 'IngredientsTable',
      data() {
        return {
          id: '',
          value: ''
        }
      },
    
    props: {
      ingredients: Array,
      vatOptions: Array,
      tHeader: Array
    },

    methods: {
      selectInput(event) {
        event.target.select();
      },

      handleInput(event, index, field) {
        this.$emit('inputChange',{value:event.target.value, index, field})
      },

      handleSelect(event, index) {
        this.$emit('vatChange',{value:event.target.value, index})
      },


    },
    
  }
</script>