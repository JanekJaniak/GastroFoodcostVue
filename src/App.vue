<template lang="pug">
  div.app
    h1.heading-main Gastro Helper
      div.nav
        router-link.heading-primary(to="/") Meal Cost Calculator / 

        router-link.heading-primary(to="/IngredientLossCalc") Ingredient Loss Calculator

    router-view
</template>

<style lang='sass'>
@import './style.sass'

.app 
  font-family: Avenir, Helvetica, Arial, sans-serif
  -webkit-font-smoothing: antialiased
  -moz-osx-font-smoothing: grayscale
  text-align: center
  color: #2c3e50
  margin-top: 60px

.nav 
  padding: 30px
  
  a 
    font-weight: bold
    color: rgb(2, 2, 184)

    &.router-link-exact-active 
        color: rgb(2, 130, 91)
</style>
