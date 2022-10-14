<template>
   <section>
   <h2> You need to log in</h2>
   <video autoplay muted class="smokeVideo">
      <source src="@/assets/smoke.mp4" type="video/mp4"/>
   </video>
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

<style lang="scss" scoped>
section{
   width: 100%;
   height: 100vh;
   position:absolute;
   background: #000;

}

video{
object-fit: cover;
height: 100vh;
width: 80%;
object-fit: contain;
z-index: -99;
}

h1 {
 margin: 0;
 padding:0;
 position:absolute;
 top:50%;
 left: 50%;
 transform: translate(-50%);
 width:100%;
 height: 50%;
 text-align: center;
 color: #ffff;
 font-size: 5em;
 font-family: sans-serif;
 letter-spacing: 0.2em;
 z-index: 99;
}
h1 span {
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
animation-delay: 2.1s;
}
h1 span:nth-child(7){
animation-delay: 2.4s;
}
h1 span:nth-child(8){
animation-delay: 2.6s;
}
h1 span:nth-child(9){
animation-delay: 2.8s;
}
h1 span:nth-child(10){
animation-delay: 3.1s;
}
h1 span:nth-child(11){
animation-delay: 3.3s;
}
h1 span:nth-child(12){
animation-delay: 3.5s;
}
h1 span:nth-child(13){
animation-delay: 3.7s;
}
h1 span:nth-child(14){
animation-delay: 3.9s;
}
h1 span:nth-child(15){
animation-delay: 4.1s;
}
h1 span:nth-child(16){
animation-delay: 4.5s;
}

@media(max-width: 1200px){

   h1{
      top:-24%;
      margin-left: -3%;
      font-size: 2.6em;
   }
}

@media(max-width: 768px){
   h1{
    top:-18%;
    margin-left: 8%;
    font-size: 2.2em;
   }
}
</style>
