<template>
   <section>
    <h1>
       <span>M</span>
       <span>Y</span>
       <span>N</span>
       <span>U</span>
       <span>T</span>
       <span>R</span>
       <span>I</span>
       <span>O</span>
       <span>N</span>
       <span>P</span>
       <span>L</span>
       <span>A</span>
       <span>N</span>
       <span>N</span>
       <span>E</span>
       <span>R</span>
    </h1>
 </section>
</template>

<script>
export default {

}
</script>

<style scoped>
section {
 height: 100vh;
}

h1 {
 font-family: Verdana, Arial, Helvetica, sans-serif;
 margin: 0;
 padding:0;
 position: absolute;
 top: -17%;
 left: 40%;
 font-weight: 600;
 transform: translate(-50%);
 width: 100%;
 text-align: center;
 color: rgb(242, 246, 239);
 border-bottom: 1px solid rgba(17, 209, 26, 0.793);
 font-size: 3em;
 letter-spacing: 0.15em;

}
h1 span {
 opacity: 0;
 display: inline-block;
 animation: animate 1s linear forwards;
}
@keyframes animate{
 0%
 {
     opacity: 0;
     transform: rotateY(90deg);
     filter: blur(10px);
 }
 100%
 {
     opacity: 1;
     transform: rotateY(0deg);
     filter: blur(0px);
 }
}

h1 span:nth-child(1){
animation-delay: 1s;
}
h1 span:nth-child(2){
animation-delay: 1.2s;
}
h1 span:nth-child(3){
animation-delay: 1.4s;
}
h1 span:nth-child(4){
animation-delay: 1.6s;
}
h1 span:nth-child(5){
animation-delay: 1.8s;
}
h1 span:nth-child(6){
animation-delay: 2s;
}
h1 span:nth-child(7){
animation-delay: 2.2s;
}
h1 span:nth-child(8){
animation-delay: 2.4s;
}
h1 span:nth-child(9){
animation-delay: 2.6s;
}
h1 span:nth-child(10){
animation-delay: 2.8s;
}
h1 span:nth-child(11){
animation-delay: 3s;
}
h1 span:nth-child(12){
animation-delay: 3.2s;
}
h1 span:nth-child(13){
animation-delay: 3.4s;
}
h1 span:nth-child(14){
animation-delay: 3.6s;
}
h1 span:nth-child(15){
animation-delay: 3.8s;
}
h1 span:nth-child(16){
animation-delay: 4s;
}

@media(max-width: 1200px){
   h1 {
      top:-24%;
      margin-left: -3%;
      font-size: 2.6em;
   }
}

@media(max-width: 768px){
  section {
  height: 80vh;
  }
  h1 {
    top:-18%;
    margin-left: 8%;
    font-size: 2.0em;
   }
}
</style>
