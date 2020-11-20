<template lang="pug">
  div.ingredients-table
    table.table
      thead
        th.table__inner(
          v-for="header in tHeader" 
          :key="header.id"
        ) {{ header.name }}

      tbody
        tr.table__tr(
          v-for="({ id, name, quantity, price, vat }, ingredientIndex) in ingredients" 
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
                @select="handleInput($event, ingredientIndex, 'vat')"
              ) {{ option.text }}

          td.table__inner
            strong {{ calculateValue(quantity, price, vat, ingredientIndex, 'net') }}

          td.table__inner
            strong {{ calculateValue(quantity, price, vat, ingredientIndex, 'gross') }}

          td.table__inner.table__inner-no_border
            button.button.button-remove(
              @click="handleRemoveButton(id)"
            ) X

    div.new__ingredient
      input.input( 
        placeholder="Ingredient name" 
        @keypress.enter="handleNewIngredientButton"
        :value="value"
        @input="handleNewIngredientInput" 
      )

      button.button.button-dim(@click="handleNewIngredientButton") Add new ingredient
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
    handleInput(event, index, type) {
      if(event.target.value) {
        this.$emit('update', { value:event.target.value, index, type })
      }
    },

    calculateValue(quantity, price, vat, index, type) {
      if(type === 'net') {
        const value = (quantity * price).toFixed(2);

        this.$emit('update', { value, index, type })

        return value
      } else {
        const value = (quantity * price * vat).toFixed(2);

        this.$emit('update', { value, index, type })

        return value
      }
    },

    handleRemoveButton(id) {
      this.$emit('remove', id)
    },

    handleNewIngredientInput(event) {
      this.value = event.target.value
    },

    handleNewIngredientButton() {
      const value = this.value

      if(this.value){
        this.$emit('create', value)
        this.value = ''
      }
    },

    selectInput(event) {
      event.target.select();
    }
  }
}
</script>
