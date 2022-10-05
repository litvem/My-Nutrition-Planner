<template>
    <b-form id="ingredients-section">
    <table id="ingredients">
        <tr>
        <td>
            <div class="col-4">
            <input type="text" name="item1" class="form-control" placeholder="ingredient">
            </div>
        </td>

        <td>
            <div class="col-3">
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
</template>

<script>
export default {
  name: 'ingredient-row',
  props: {
    item: {
      type: String,
      required: true
    },
    amount: {
      type: Number,
      required: true
    },
    unit: {
      type: String,
      required: true
    },
    instructions: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
