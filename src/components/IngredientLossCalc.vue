<template lang="pug">
  div.ingredient_loss_calculator
    h1.heading-primary ingredient loss calculator / in progress

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
          },
          {
            id: 2,
            name: 'Bolognese',
            unitsSold: 30,
            ingredientPerUnit: 150,
            inventoryStart: 0,
            inventoryEnd: 700,
          }
        ],
      }
    }
}
</script>
