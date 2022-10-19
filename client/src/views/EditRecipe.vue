<template>
<div class="EditRecipePage">
  <div class="box-form">

    <b-row>
      <h1 id="page-title">Edit recipe</h1>
    </b-row>
    <!--- -->
  <b-row>
    <b-col id="left">
      <h4>Recipe name</h4>
    <!-- EDIT NAME -->
      <b-row>
        <b-col>
          <div v-if="this.editName">
            <b-form-input type="text" name="recipeName" v-model="recipe.recipe[0].name" class="form-control"></b-form-input>
          </div>
          <div v-else>
            <b-form-input type="text" name="recipeName" v-model="recipe.recipe[0].name" class="form-control" :disabled=true></b-form-input>
          </div>
        </b-col>
        <b-col>
          <b-button id="edit-name" class="edit-button" type="submit" @click="toggleName">Edit</b-button>
        </b-col>
      </b-row>
      <br>
      <b-row>
        <b-col>
          <h4>Recipe image</h4>
        </b-col>
        <b-col>
          <b-button id="edit-image" class="edit-button" type="submit" @click="toggleImage">Edit</b-button>
        </b-col>
      </b-row>
      <br>
<!-- EDIT IMAGE -->
    <b-row>
      <div v-if="changeImage">
        <div class="mb-3">
          <label for="formFile" class="form-label">Select file</label>
          <input class="form-control" type="file" id="formFile">
        </div>
      </div>
      <div v-else>
        <img :src="recipe.recipe[0].image">
      </div>
    </b-row>
    <br>
    <b-row>
      <b-col>
        <h4>Category</h4>
      </b-col>
      <b-col>
        <b-button id="edit-cat" class="edit-button" type="submit" @click="toggleCategory">Edit</b-button>
      </b-col>
    </b-row>
    <br>
<!-- EDIT CATEGORY -->
      <b-row>
        <div v-if="this.editCategory">
          <b-card id="category-card">
            <b-form-group v-slot="{ ariaDescribedby }">
              <b-form-radio-group
              v-model="selected"
              :options="options"
              :aria-describedby="ariaDescribedby"
              name="radios-stacked"
              stacked>
              </b-form-radio-group>
            </b-form-group>
          </b-card>
        </div>
        <div v-else >
          <b-card id="category-card-disabled">
            <b-form-group v-slot="{ ariaDescribedby }">
              <b-form-radio-group
              v-model="selected"
              :options="disabledOptions"
              :aria-describedby="ariaDescribedby"
              name="radios-stacked"
              stacked>
              </b-form-radio-group>
            </b-form-group>
          </b-card>
        </div>
      </b-row>
      <br>
    </b-col>
    <b-col id="right">
      <b-row>
        <b-col>
          <h4>Ingredients</h4>
        </b-col>
        <b-col>
          <b-button id="edit-ing" class="edit-button" type="submit" @click="toggleIngredients">Edit</b-button>
        </b-col>
      </b-row>
<!-- EDIT INGREDIENTS -->
<!-- TODO add pcs as option once backend enables it -->
      <b-row>
        <div v-if="this.editIngredients">
          <b-container>
          <div v-for="key in count" :key="key">
            <b-row>
              <b-col>
                <input type="number" size="20" placeholder="Amount" v-model="ingredientsObj[key-1].amount">
              </b-col>
              <b-col>
                <select class="form-select" aria-label="Unit" aria-placeholder="Unit" v-model="ingredientsObj[key-1].unit"> -->
                  <option value="pcs">pcs</option>
                  <option value="grams">grams</option>
                  <option value="kg">kg</option>
                  <option value="ml">ml</option>
                  <option value="dl">dl</option>
                  <option value="l">l</option>
                </select>
              </b-col>
              <b-col>
                <input type="text" placeholder="Item" v-model="ingredientsObj[key-1].item">
              </b-col>
            </b-row>
          </div>
          </b-container>
          <div class="controls">
            <a href="#" id="add_more_fields" @click="add"><i class="fa fa-plus"></i> Add Item</a>
            <a href="#" id="remove_fields"  @click="remove"><i class="fa fa-plus"></i> Remove Item</a>
          </div>
        </div>
        <div v-else>
          <ul>
            <li :recipe="recipe" v-for="ingredient in recipe.recipe[0].items"
            :key="ingredient.itemId">{{ingredient.amount}} {{ingredient.unit}} {{ingredient.item}}
            </li>
          </ul>
        </div>
      </b-row>
      <br>
      <b-row>
        <b-col>
          <h4>Instructions</h4>
        </b-col>
        <b-col>
          <b-button id="edit-instructions" class="edit-button" type="submit"  @click="toggleInstructions">Edit</b-button>
        </b-col>
      </b-row>
      <br>

<!-- EDIT INSTRUCTIONS -->
      <b-row>
        <div v-if="editInstructions">
          <textarea class="form-control" id="instructions" rows="10" v-model="instructionString"></textarea>
        </div>
        <div v-else>
          <textarea class="form-control" id="instructions" rows="10" v-model="this.recipe.recipe[0].instruction" disabled></textarea>
        </div>
      </b-row>
    </b-col>

    </b-row>
    <!-- SAVE, CANCEL -->
        <b-row>
          <b-col>
            <button type="submit" class="btn" id="save-btn" @click="saveChanges()">Save changes</button>
          </b-col>
          <b-col>
            <button type="submit" class="btn" id="cancel-btn" @click="cancelEdit()">Cancel</button>
          </b-col>
        </b-row>

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

      // input togglers
      editName: false,
      editCategory: false,
      editIngredients: false,
      editInstructions: false,
      changeImage: false,

      selected: null,
      options: [
        { text: 'Breakfast', value: 'Breakfast' },
        { text: 'Lunch', value: 'Lunch' },
        { text: 'Dinner', value: 'Dinner' },
        { text: 'Snack', value: 'Snack' }
      ],
      disabledOptions: [
        { text: 'Breakfast', value: 'Breakfast', disabled: true },
        { text: 'Lunch', value: 'Lunch', disabled: true },
        { text: 'Dinner', value: 'Dinner', disabled: true },
        { text: 'Snack', value: 'Snack', disabled: true }
      ],

      count: 0,
      ingredientsObj: [],

      instructionString: '',
      pictureURL: '', // TODO change to use file
      unitsArray: [],
      amountsArray: [],
      itemsArray: []
    }
  },
  beforeCreate() {
    Api.get('/profiles/' + localStorage.id + '/recipes/' + this.$route.params.id, {
      headers: {
        Authorization: 'Bearer ' + localStorage.getItem('token')
      }
    })
      .then(response => {
        console.log(response.data)
        this.recipe = response.data
        // needed for proper rendering and data binding
        this.selected = this.recipe.recipe[0].category
        this.instructionString = this.recipe.recipe[0].instruction

        // important for correct looping through array in render (for each key in count starts from 1)
        this.count = this.recipe.recipe.length + 1

        // for proper data binding of ingredients after edit
        this.ingredientsObj = this.recipe.recipe[0].items
      })
      .catch(error => {
        console.log(error.message)
      })
  },

  methods: {
    add() {
      this.ingredientsObj.push({ amount: null, unit: '', item: '' })
      this.count++
    },
    remove() {
      if (this.ingredientsObj.length > 1) {
        this.ingredientsObj.pop()
        this.count--
      } else {
        alert('Warning: cannot have less than 1 ingredient')
      }
    },
    saveChanges() {
      // TODO bind data image upload

      // add each not null ingredient in ingredients array
      for (let i = 0; i < this.count; i++) {
        if (this.ingredientsObj[i].amount > 0 && this.ingredientsObj[i].unit !== '' && this.ingredientsObj[i].item !== '') {
          this.recipe.recipe[0].items[i] = this.ingredientsObj[i]
        }
      }

      console.log(this.instructionString)
      // check if user deleted item in first row
      if (this.recipe.recipe[0].items[0].amount > 0 && this.recipe.recipe[0].items[0].unit !== '' && this.recipe.recipe[0].items[0].item !== '') {
        if (this.instructionString !== '') {
          Api.patch('/profiles/' + localStorage.id + '/recipes/' + this.$route.params.id, {
            name: this.recipe.recipe[0].name,
            category: this.selected,
            items: this.recipe.recipe[0].items,
            instruction: this.instructionString
            // imagePath: this.pictureURL
          },
          {
            headers: {
              Authorization: 'Bearer ' + localStorage.getItem('token')
            }
          }).then(response => {
            if (response.status === 200) {
              alert('Recipe was edited with succes!')
              this.$router.push(`/recipePage/${this.recipe.recipe[0]._id}`)
            }
          })
            .catch(error => {
              console.log(error)
            })
        } else {
          alert('Warning: Please enter instructions!')
        }
      } else {
        alert('Warning: Cannot have empty ingredient or negative amount!')
      }
    },
    cancelEdit() {
      this.$router.push('/userHome')
    },
    toggleName() {
      this.editName = true
      document.getElementById('edit-name').disabled = true
    },
    toggleImage() {
      this.changeImage = true
      document.getElementById('edit-image').disabled = true
    },
    toggleCategory() {
      this.editCategory = true
      document.getElementById('edit-cat').disabled = true
    },
    toggleInstructions() {
      this.editInstructions = true
      document.getElementById('edit-instructions').disabled = true
    },
    toggleIngredients() {
      this.editIngredients = true
      document.getElementById('edit-ing').disabled = true
    }

  }

}

</script>

<style lang="scss" scoped>
.EditRecipePage {
    background-image: url("../assets/edit-recipe-background.jpg");
    background-size: cover;
    background-attachment: fixed;
    position: relative;
    height: 110%;
    color: white;
  }

  #page-title {
    color: #fff;
    font-size: 50px;
    font-weight: bold;
    text-align: left;
    margin-top: 4%;
    margin-bottom: 2%;
    width: 100%;
    float: left;
  }

  h4 {
    text-decoration: underline;
  }
  .box-form{
    height: 100%;
    width: 100%;
    box-sizing: border-box;
    padding: 4%;
    padding-bottom: 1%;
    overflow: hidden;
  }

  .form-control {
  border-radius: 8px;
  display: inline-block;
  border: 0;
  outline: 0;
  box-shadow: 0px 4px 10px 0px #ddc20f7c;
  background-color: #f5eddbf1;
  color: #281401;
  }

  img {
    max-width: 350px;
    max-height: 350px;
    align-items: center;
  }

  .edit-button {
    margin-top: 0.2em;
    margin-bottom: 0.01em;
    margin-right: 1em;
    margin-left: 0.01em;
    float: center;
    color: rgb(1, 17, 0);
    font-size: 16px;
    padding: 10px 25px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 20px 0px #fce68c84;
    background-image: linear-gradient(135deg, #fce8ae 10%, #a37d01cb 100%);
      &:hover {
      color: rgb(253, 253, 253);
      text-decoration: underline;
      font-weight: bold;
      background-image: linear-gradient(135deg, #ffc800 10%, #453501 100%);
      box-shadow: 0px 4px 10px 0px #ffe979;
    }
  }

  #save-btn {
    margin-top: 0.2em;
    margin-bottom: 0.01em;
    margin-right: 1em;
    margin-left: 0.01em;
    float: center;
    color: rgb(1, 17, 0);
    font-size: 16px;
    padding: 10px 25px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 20px 0px #9bfc8c84;
    background-image: linear-gradient(135deg, #bafcae 10%, #01a304cb 100%);
      &:hover {
      color: rgb(253, 253, 253);
      text-decoration: underline;
      font-weight: bold;
      background-image: linear-gradient(135deg, #04ff00 10%, #01450d 100%);
      box-shadow: 0px 4px 10px 0px #98ff79;
    }
  }

  #cancel-btn {
    margin-top: 0.2em;
    margin-bottom: 0.01em;
    margin-right: 1em;
    margin-left: 0.01em;
    float: center;
    color: rgb(42, 2, 2);
    font-size: 16px;
    padding: 10px 25px;
    border-radius: 50px;
    display: inline-block;
    border: 0;
    outline: 0;
    box-shadow: 0px 4px 20px 0px #ea4e4e84;
    background-image: linear-gradient(135deg, #fa9191 10%, #a31401cb 100%);
      &:hover {
      color: rgb(253, 253, 253);
      text-decoration: underline;
      font-weight: bold;
      background-image: linear-gradient(135deg, #ff0000 10%, #450901 100%);
      box-shadow: 0px 4px 10px 0px #ff7979;
    }
  }

#category-card-disabled, #category-card {
  box-shadow: 0px 4px 10px 0px #ddc20f7c;
  color: #281401;
}

@media(max-width: 768px) {
  #page-title {
    padding-top: 10%;
  }
  #left {
    min-height: 70vh;
  }

  .btn {
    margin-top: 10%;
    margin-bottom: 40%;
  }
}

</style>
