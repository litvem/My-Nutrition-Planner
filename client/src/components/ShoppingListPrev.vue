<template>
    <div class="card">
        <p>{{name}}</p>
    </div>
</template>

<script>
export default {
  name: 'shopping-list-prev',
  props: {
    name: {
      type: String,
      required: true
    }
  }
}
</script>

<style>

</style>
