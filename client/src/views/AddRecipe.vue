<template>
<div class="container-fluid">

  <div class="row">
    <div class="col">
      <h1>Create new recipe</h1>
      <br>
    </div>
    <div class="col">
      <button type="submit" class="btn btn-success">Save recipe</button>
    </div>
  </div>
  <div class="row">
    <div class="col" id="left">

      <h4>Add recipe image</h4>
      <div class="mb-3">
        <label for="formFile" class="form-label">Select file</label>
        <input class="form-control" type="file" id="formFile">
      </div>

      <div>
        <h4>Choose recipe category</h4>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-radio-group
          v-model="selected"
          :options="options"
          :aria-describedby="ariaDescribedby"
          name="radios-stacked"
          stacked>
          </b-form-radio-group>
        </b-form-group>
      </div>

      </div>
    <div class="col" id="right">
      <div class="row">
        <h4>Ingredients list</h4>
        <br>
        <div class="card-body">
          <b-form id="ingredients-section">
            <table id="ingredients">
              <tr>
                <td>
                  <div class="col-4">
                    <input type="text" name="item1" class="form-control" placeholder="ingredient">
                  </div>
                </td>

                <td>
                  <div class="col-2">
                    <input type="number" name="amount1" class="form-control" placeholder="amount">
                  </div>
                </td>
                <!-- TODO: fix select size in comparison to other fields -->
                <td>
                <div class="col-4">
                  <select class="form-select" aria-label="Unit">
                    <option selected>unit</option>
                    <option value="grams">grams</option>
                    <option value="tablespoon">tablespoon</option>
                    <option value="teaspoon">teaspoon</option>
                    <option value="dl">dl</option>
                    <option value="ml">ml</option>
                  </select>
                </div>
              </td>
              </tr>
              <tr></tr>
            </table>
          </b-form>
          <button class="btn btn-dark float-right mt-2" v-on:click="addRow()">Add more +</button>
        </div>
      </div>
      <h4>Instructions</h4>
      <textarea class="form-control" id="instructions" rows="10"></textarea>
    </div>
  </div>

</div>
</template>

<script>
let counter = 1
export default {
  name: 'addRecipe',
  data() {
    return {
      selected: 'first',
      options: [
        { text: 'Breakfast', value: 'breakfast' },
        { text: 'Lunch', value: 'lunch' },
        { text: 'Dinner', value: 'dinner' },
        { text: 'Dessert', value: 'dessert' },
        { text: 'Side', value: 'side' },
        { text: 'Snack', value: 'snack' }
      ]
    }
  },
  methods: {
    goToRecipes() {
      this.$router.push('/recipes')
    },
    addRow() {
      console.log(counter)
      // FIXED - fix add (not showing the ingredients field)
      const table = document.getElementById('ingredients')
      const row = table.insertRow()
      counter++
      const html = '<div class="row" id="r' + counter + '"><div class="col-4"><input type="text" name="item' + counter + '" class="form-control" placeholder="ingredient"></div><div class="col-2"><input type="number" name="amount' + counter + '" class="form-control" placeholder="amount"></div><div class="col-4"><select class="form-select" aria-label="Unit"><option selected>unit</option><option value="grams">grams</option><option value="tablespoon">tablespoon</option><option value="teaspoon">teaspoon</option><option value="dl">dl</option><option value="ml">ml</option></select></div><div class="col-1"><br><button type="button" id="' + counter + '" class="btn btn-danger" v-on:click="deleteRow()">Remove</button></div></div>'
      // const form = document.getElementById('ingredients-section')
      row.innerHTML += html
    },
    // TODO - fix delete
    deleteRow() {
      console.log(counter)
      document.getElementById('ingredients').deleteRow(counter - 1)
      console.log(counter)
      counter--
    }

  }
}
</script>

<style scoped>
    h1 {
        color:black
    }

</style>
