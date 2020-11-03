<template>
    <div>
        <input  type ="number" :value="value" @input="handleInput" />
        <!-- v-model.number="age" -->
    </div>
</template>

<script>
export default {
  name: "InputHandler",
  data() {
    return {
      value: "",
    };
  },
  props: {
        itemID: Number,
        action: Function,
        actionName: String,
    },
  methods: {
     handleInput(event) {
      this.value = event.target.value;
      console.log(this.value);
      console.log(this.itemID);
    },
  },
};
</script>