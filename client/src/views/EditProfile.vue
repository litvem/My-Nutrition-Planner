<template>
  <div class="card">
    <div id="title">
      <h2>Edit profile</h2>
    </div>
    <div id="editProfile">
      <div class="d-flex flex-row mt-2 mb-2 align-items-center gap-3">
        <label>Username:</label>
        <input class="form-control" type="text" ref="id" :disabled="!isEditing" :class="{view: !isEditing}" :value="user._id">
      </div>

      <div class="d-flex flex-row mt-2 mb-2 align-items-center gap-2">
        <label>Password:</label>
        <input class="form-control" type="password" ref="password" :disabled="!isEditing" :class="{view: !isEditing}" :value="user.password">
      </div>

      <div class="d-flex flex-row mt-2 mb-2 align-items-center gap-2">
        <label>Secret question:</label>
        <input class="form-control" type="text" ref="question" :disabled="!isEditing" :class="{view: !isEditing}" :value="user.question">
      </div>

      <div class="d-flex flex-row mt-2 align-items-center gap-2">
        <label>Answer:</label>
        <input class="form-control" type="text" ref="answer" :disabled="!isEditing" :class="{view: !isEditing}" :value="user.answer">
      </div>

      <div class="mt-3 mb-3">
        <button class="btn btn-sm btn-success" @click="isEditing = !isEditing" v-if="!isEditing">Edit</button>
        <button class="btn btn-sm btn-success me-1" @click="save" v-else-if="isEditing">Save</button>
        <button class="btn btn-sm btn-danger" v-if="isEditing" @click="isEditing = false">Cancel</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'editProfile',
  data: function () {
    return {
      isEditing: false,
      user: {
        _id: 'demo@gmail.com',
        password: 'password',
        question: 'What is my favourite berry?',
        answer: 'raspberry'
      }
    }
  },
  methods: {
    goToProfile() {
      this.$router.push('/profile')
    },
    save() {
      this.user._id = this.$refs._id.value
      this.user.password = this.$refs.password.value
      this.user.question = this.$refs.question.value
      this.user.answer = this.$refs.answer.value
      this.isEditing = !this.isEditing
    }
  }
}
</script>

<style scoped>
  h2 {
    font-size: 3vmax;
    line-height: 1;
    font-weight: 700;
    margin-top: 20px;
    margin-bottom: 40px;
    text-align: center;
  }
  .view {
  border-color: transparent;
  background-color: initial !important;
  color: initial
  }

  .form-control:focus{
   outline: none;
   box-shadow: none;
  }

  .mt-5{
    margin-top: 10px;
    margin-bottom: 20px;
    margin-right: 10px;
  }

  body{
    height: 100vh;
    background-color:#eee;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .card{
    margin: 15rem;
    width: 50%;
    height: 50%;
    background: #FFFFFF;
    border-radius: 10px;
    overflow: hidden;
    display: flex;
    flex: 1;
    align-items: center;
    justify-content: space-between;
    box-shadow: 0 0 20px 6px #090b6f85;
  }

  .btn:focus{
    outline: none;
    box-shadow: none;
  }
</style>
