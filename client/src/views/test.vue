<template>
  <div class="animationBox"></div>
</template>

<script>
export default {

}
</script>

<style scope>
*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Lucida Sans';

}

body{
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(58,56,56);
    height: 100vh;
}

animationBox{
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    position: relative;
    padding: 15xp;
    width: 240px;
    height: 280px;
    box-shadow: 8px 8px 5px 2px black;
    border-radius: 15px;
    overflow: hidden;
}

div::before{
    content: '';
    border-radius: 15px;
    background: conic-gradient(rgb(0, 255, 13) 25deg,rgb(255, 251, 15),70deg,transparent 140deg);
    width: 160%;
    height: 160%;
    position: absolute;
    animation:rotate 2.5s linear infinite;

}

div::after{
    display: flex;
    align-items: center;
    justify-content: center;
    content: "MNP";
    position: absolute;
    color: rgb(55, 220, 18);
    font-size: 32px;
    line-height: 2;
    border-radius: 12px;
    width: 220px;
    height: 260px;
    background: rgb(58, 56, 56);
    box-shadow: inset 15px 15px 15px rgb(20, 20, 20);

}
@keyframes rotate{
    0% {
        transform: rotate(0deg);
    }100%{
        transform: rotate(-360deg);
    }
}

</style>
