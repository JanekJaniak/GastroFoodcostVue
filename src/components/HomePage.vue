<template>
  <div class="home">
    <h1>{{ msg }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    msg: String
  }
}
</script>

<style scoped>

  h1 {
    color: green;
    font-weight: 1000;
  }

</style>
