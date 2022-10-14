<template>
    <div class="test">
        <HomeAnimationWithVideo/>
    </div>
 </template>

<script>
import HomeAnimationWithVideo from './homeAnimationWithVideo.vue'
export default {
  name: 'test',
  components: { HomeAnimationWithVideo },
  methods: {

  }
}
</script>

 <style lang="scss" scoped>
/*
.fadeout {
  animation: fadeout 4s forwards;
}
@keyframes fadeout {
  to {
    opacity: 0;
    visibility: hidden;
  }
}
*/
 </style>
