<template lang="pug">
    table(class="weight-table")
        thead
        th Total meal weight/Kg:

        th Portion weight/g:

        th Number of servings:

        tbody
            td
                input( 
                type="number" 
                :id="`totalWeight`"
                placeholder="Edit"
                v-model.number="meal.total.weight" 
                @focus="selectInput($event)"
                )

            td
                input( 
                type="number" 
                :id="`portionWeight`" 
                placeholder="Edit" 
                v-model.number="meal.portion.weight" 
                @focus="selectInput($event)"
                )

            td {{calculatePortionsCount(meal.total.weight, meal.portion.weight)}}

    table(class="cost-table")
        thead
            th 

            th Net cost:

            th Gross cost:

        tbody
            tr
                td
                strong Total:

                td {{calculateTotalCost('net')}}

                td {{calculateTotalCost('gross')}}
                
            tr
                td 
                strong Per portion:

                td {{calculatePortionCost('net')}}

                td {{calculatePortionCost('gross')}}
</template>

<script>
export default {
    name: 'TotalCostComponent',

    methods: {
        selectInput(event) {
            event.target.select();
      },

      calculatePortionsCount(totalWeight, portionWeight) {
        let portionCount = 0;

        if (this.meal.total.weight && this.meal.portion.weight ) {  
          portionCount = totalWeight / (portionWeight / 1000);
          portionCount = portionCount < 1 ? 0 : Math.round(portionCount);

          this.meal.portion.count = portionCount;
        }

        return portionCount;
      },

      calculateTotalCost(costType) {
        let total = 0;
        this.meal.ingredients.forEach(ingredient => {
          total += parseFloat(ingredient[costType]);
        });

        total = parseFloat(total.toFixed(2));
        this.meal.total.cost[costType] = total;
        
        return total;
      },

      calculatePortionCost(costType) {
        let portion = 0;
        
        if (this.meal.total.cost[costType] && this.meal.portion.count) {
          portion = (this.meal.total.cost[costType] / this.meal.portion.count).toFixed(2); 
          
          this.meal.portion.cost[costType] = parseFloat(portion);
        }

        return this.meal.portion.cost[costType];
      },
    },
}
</script>

<style>
th, td {
    border: none; 
    border-bottom-style: solid;
    border-bottom-width: 1px;
    padding-bottom: 0.5rem;
}

input {
    border-style: solid;
    border-width: 1px;
    background-color: rgb(245, 245, 245);
    padding: 0.2rem;
    font-weight: 700;
}

input:focus {
    outline-color:  rgb(76, 76, 250);
}

select {
    background-color: rgb(245, 245, 245);
}

.cost-table, .weight-table {
    border: none;
    border-bottom-style: solid;
    border-bottom-width: 1px;
    margin: 1rem;
    margin-left: auto; 
    margin-right: 0;
}

.dim:hover {
    background-color: rgb(4, 4, 122);
    border-color: black;
    transition: .5s ease-in;
}

.dim:active {
    color: black;
    background-color: rgb(188, 207, 248);
    border-color: rgb(76, 76, 250);
    transition:.2s ease-out;
}

.button {
    margin: 1rem;;
    font-size: .6rem;
    padding: 0.3rem 0.8rem 0.3rem 0.8rem;
    border-width: 0.2rem;
    border-color: rgb(98, 98, 241);
    background-color: rgb(58, 58, 241);
    color: white;
    font-weight: 700;
}

.remove-button {
    background-color: red;
    font-weight: 900;
}

.remove-button:hover {
    background-color: rgb(248, 149, 149);
    font-weight: 900;
    transition: .3s ease-in;
}

.remove-button:active {
    background-color: red;
    font-weight: 900;
    color: white;
}

.remove-button-wrapper {
    border: none;
}
</style>