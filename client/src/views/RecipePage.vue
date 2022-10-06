<template>
  <div id = "background" class="container">
    <div class="row">
      <h1>Recipe Name</h1>
    </div>

    <div class="row">
      <div class="col-6" id="left">

        <div class="row">
          <img src="https://images.unsplash.com/photo-1512621776951-a57141f2eefd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=870&q=80">
        </div>

        <br>

          <div class="row">
            <div class="col">
              <div class="alert alert-success" role="alert"> <a href="#" class="alert-link">Category</a></div>
            </div>
          </div>

          <div class="row">
                  <div class="col">
                    <b-button v-b-toggle.collapse-1 variant="primary">Add to Plan</b-button>
                    <b-collapse id="collapse-1" class="mt-2">
                        <b-card>
                        <p class="card-text">Choose week:</p>
                        <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-checkbox-group
                        v-model="selected"
                        :options="options"
                        :aria-describedby="ariaDescribedby"
                        name="radios-stacked"
                        stacked>
                        </b-form-checkbox-group>
                        </b-form-group>
                    </b-card>
                    </b-collapse>
                  </div>
                  <div class="col">
                    <b-button variant="danger">Delete recipe</b-button>
                  </div>

        </div>
    </div>
    <div class="col-6" id="right">
            <b-card>
                <h4>Ingredients</h4>
                <ul>
                  <li>150 grams eggs</li>
                </ul>
                <br>

                <h4>Instructions</h4>
                <p>Heat oven to 250 Celsius</p>
                <p>Bring water to boil</p>
                <p>Add pasta</p>
            </b-card>
        </div>
      </div>

        </div>
</template>

<script>
export default {
  name: 'recipe-page',
  data() {
    return {
      selected: 'first',
      options: [
        { text: '2022-Week 39', value: '39' },
        { text: '2022-Week 40', value: '40' }
      ]
    }
  }
}
</script>

<style scoped>
img {
    max-width: 350px;
    max-height: 350px;
    border: 3px solid black;
    box-shadow: inset 0px 0px 10px 20px gray;
}

#background {
  background-image: url('https://img.freepik.com/premium-photo/cutting-board-vegetables_1220-2560.jpg?w=996')
}
</style>
