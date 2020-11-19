<template lang="pug">
  div
    h1.heading-main {{ appName }}

      div.components-bar
        h2.heading-primary Recipe Cost Calculator

        h2.heading-primary Ingredient Loss Calculator
</template>

<script>
export default {
  name: 'Header',
  props: {
    appName: String
  }
}
</script>

<style lang="sass">
.components-bar
  display: flex
  justify-content: space-around
  margin: 0 auto
  width: 80vw
  max-width: 1000px
</style>
