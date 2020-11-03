<template>
  <div>
    <span>VAT:</span>
    <select v-model="vat">
        <option disabled value="">Select VAT</option>
        <option>5</option>
        <option>8</option>
        <option>23</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'VatSelector',
  data() {
      return {
          vat: ""
      }
  }
}  
</script>