<template lang="pug">
  div(class='home')
    h1 {{ msg }}
</template>

<script>
export default {
  name: 'HomePage',
  props: {
    msg: String
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Josefin+Sans:400,400i,600,600i');

  h1 {
    font-family: 'Josefin Sans', sans-serif;
    font-size: 60px;
    margin-bottom: 30px;
    color: rgb(4, 4, 122);
    text-decoration: underline lightblue ;
  }

</style>
