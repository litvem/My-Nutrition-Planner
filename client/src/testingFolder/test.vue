<template>
    <div class="splash">
        <HomeAnimationWithVideo/>
    </div>
 </template>

<script>
import HomeAnimationWithVideo from './homeAnimationWithVideo.vue'
export default {
  name: 'splash',
  components: { HomeAnimationWithVideo },
  methods: {

  }
}
</script>

 <style scoped>
.fadeout {
  animation: fadeout 4s forwards;
}
@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
 </style>
