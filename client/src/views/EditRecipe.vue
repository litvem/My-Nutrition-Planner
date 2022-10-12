<template>
<div>
<div id ="background" class="container-fluid">

  <div class="row">
    <div class="col">
      <h1>Edit recipe</h1>
      <!-- Save, cancel button warning when button is pressed that the changes will be lost -->
      <br>
    </div>

  </div>
  <div class="row">
    <div class="col" id="left">
      <h4>Edit recipe name</h4>
      <section v-bind="editName" v-if="editName">
        <b-form-input type="text" name="recipeName" v-model="recipeName" class="form-control"></b-form-input>
      </section>
      <div v-else>
        <b-form-input type="text" name="recipeName" v-model="recipeName" class="form-control" :disabled="true"></b-form-input>
      </div>
      <b-button type="submit" variant="primary" v-on:click="toggleName()">Edit Name</b-button>

<!--
      <h4>Add recipe image</h4>
      <div class="mb-3">
        <label for="formFile" class="form-label">Select file</label>
        <input class="form-control" type="file" id="formFile">

        <input type="text" name="imgURL" class="form-control" placeholder="Add image URL" v-model="pictureURL">

      </div>
-->
      <div>
        <h4>Edit recipe category</h4>
        <b-form-group v-slot="{ ariaDescribedby }">
          <b-form-radio-group
          v-model="selected"
          :options="options"
          :aria-describedby="ariaDescribedby"
          name="radios-stacked"
          stacked>
          </b-form-radio-group>
        </b-form-group>
        <button type="submit" class="btn btn-success" @click="save">Save recipe</button>

      </div>

      </div>
    <div class="col" id="right">
      <div class="row">
        <h4>Edit ingredients list</h4>
        <br>
        <br>
        <div class="card-body">
            <div class="form-inline">
              <input type="number" placeholder="Amount" v-model="firstAmount">
              <select class="form-select" aria-label="Unit" aria-placeholder="Unit" v-model="firstUnit">
                <option value="grams">grams</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="dl">dl</option>
                <option value="l">l</option>
              </select>
              <input type="text" placeholder="Item" v-model="firstItem">
          </div>

          <div v-for="key in count" :key="key">
            <div class="form-inline">
              <input type="number" size="20" placeholder="Amount" v-model="amounts['amount'+key]" :id="key">
              <select class="form-select" aria-label="Unit" v-model="units['unit'+key]" :id="key">
                <option value="grams">grams</option>
                <option value="kg">kg</option>
                <option value="ml">ml</option>
                <option value="dl">dl</option>
                <option value="l">l</option>
              </select>
              <input type="text" placeholder="Item" v-model="items['item'+key]" :id="key">
            </div>
          </div>
    <div class="controls">
      <a href="#" id="add_more_fields" @click="add"><i class="fa fa-plus"></i> Add Item</a>
      <a href="#" id="remove_fields"  @click="remove"><i class="fa fa-plus"></i> Remove Item</a>
    </div>
    </div>
      </div>
      <h4>Instructions</h4>
      <textarea class="form-control" id="instructions" rows="10" v-model="instructions"></textarea>
    </div>
  </div>
  </div>

</div>
</template>

<script>
import { Api } from '@/Api'

export default {
  name: 'edit-recipe',
  data() {
    return {
      recipe: null,
      recipeName: 'def',
      editName: true
      // editPictureURL: false,
    }
  },
  setup() {
    Api.get('/profiles/' + localStorage.id + '/recipes/' + this.$route.params.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        console.log(response.data)
        this.recipe = response.data
        this.recipeName = this.recipe.recipe[0].name
        console.log(this.recipeName)
      })
      .catch(error => {
        console.log(error.message)
      })
  },
  methods: {
    saveChanges() {

    },
    cancelEdit() {
      this.$router.push('/userHome')
    },
    toggleName() {
      // this.recipeName = this.recipe.recipe[0].name
      this.editName = !this.editName
    },
    toggleImageURL() {

    },
    toggleCategory() {

    },
    toggleInstructions() {

    },
    toggleItngredients() {
      //
    }

  }

}

</script>

<style scoped>

</style>
