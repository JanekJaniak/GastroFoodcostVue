<template>
  <div>
    <ul>
      <li v-for="item in items" :key="item.id">
        {{ item.name }} 
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "List",
  props: {
    items: Array,
  },
  methods: {

    },
  
  components: {
  }
};
</script>

<style>
  
  ul {
    display:flex;
    flex-direction: column;
    align-items:center;
  }

  li {
    list-style-type: none;
    display: inline-flex;
  }

</style>
