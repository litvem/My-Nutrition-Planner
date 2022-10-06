<template>
    <div class="form">
        <label for="recipename">Name</label>
        <input type="text" v-model="name" name="name" />
        <label for="category">Category</label>
        <input type="text" v-model="category" name="category" />
        <label for="instruction">Instruction</label>
        <input type="text" v-model="instruction" name="instruction" />
        <input style="display:none" type="file"
        @change="onFileSelected" ref="fileInput">
        <button @click="$refs.fileInput.click()">Choice file</button>
        <button @click="uploadImage">Upload</button>
    </div>
</template>

<script>
import { Api } from '../Api'

export default {
  name: 'image',
  data() {
    return {
      name: '',
      category: '',
      instruction: '',
      selectedFile: null
    }
  },
  method: {
    onFileSelected(event) {
      this.selectedFile = event.target.files[0]
      console.log(event)
    },
    uploadImage() {
      const id = localStorage.getItem('id')
      const formData = new FormData()
      formData.append('image', this.selectedFile, this.selectedFile.name)
      Api.post('/profiles/' + id + '/recipes', formData)
        .then(response => {
          console.log(response)
        })
        .catch(error => {
          console.error(error)
        })
    }
  }
}
</script>

<style scoped>

</style>
