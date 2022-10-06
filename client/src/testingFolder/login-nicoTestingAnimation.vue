<template>
        <div class="box">
            <div class="form">
                <h2>Sign in </h2>
                <h2>Sign in </h2>
                   <div class="inputBox">
                       <input type =" text" required="required"/>
                     <span>Username</span>
                     <i></i>
                  </div>
                     <div class="inputBox">
                     <input type =" password" required="required"/>
                     <span>Password</span>
                     </div>
                     <i></i>
                     <div class="links">
                        <a href="#">Sign up</a>
                     </div>
                    <input type="submit" value="Login"/>
            </div>
        </div>
</template>

<script>
export default {
  name: 'test'

}
</script>

<style lang="scss" scoped>

*{
    margin:0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', sans-serif;
}

.animatedLogin{
    position: relative;
    width: 380px;
    height: 420px;
    border-radius: 8px;
}
.box {
    position:relative;
    width: 380 px;
    height: 420 px;
    background-color: rgba(7, 6, 9, 0.457);
    border-radius: 8px;
    overflow: hidden;
}
.box::before{
    content:'';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 380 px;
    height: 420 px;
    background: linear-gradient(0deg,transparent,#17eb48e7,#17eb48e7);
    transform-origin: bottom right;
    animation: animate 6s linear infinite;
}
.box::after{
    content:'';
    position: absolute;
    top: -50%;
    left: -50%;
    width: 380 px;
    height: 420 px;
    background: linear-gradient(0deg,transparent,#17eb48e7,#17eb48e7);
    transform-origin: bottom right;
    animation: animate 6s linear infinite;
    animation-delay: -3s;
}

@keyframes animate{
    0%{
        transform: rotate(0deg);
    }
    100%{
        transform: rotate(360deg);
    }
}
.form{
    position: absolute;
    inset: 2px;
    border-radius: 8px;
    background: rgba(7, 6, 9, 0.457);
    z-index: 10;
    padding: 50px 40px;
    display: flex;
    flex-direction: column;

    .h2 {
    color:#17eb48e7;
    font-weight: 500;
    text-align: center;
    letter-spacing: 0.1em;
    }
}
.inputBox{
    position: relative;
    width: 300px;
    margin-top: 35xp;

    input{
        position: relative;
        width: 100%;
        padding: 20px 10px 10px;
        background: transparent;
        border: none;
        outline: none;
        color:#23242a;
        font-size: 1em;
        letter-spacing: 0.05em;
        z-index: 10;
    }

    span {
        position: absolute;
        left: 0;
        padding: 20px 0px 10px;
        font-size: 1em;
        color: #8f8f8f;
        pointer-events: none;
        letter-spacing: 0.05em;
        transition: 0.5;
    }
    input:valid ~ span,
    input:focus ~ span {
        color:#17eb48e7;
        transform: translateX(0xp) translateY(-34xp);
        font-size:0.75em;
    }
    i{
       position: absolute;
       left: 0;
       bottom: 0;
       width: 100%;
       height: 2px;
       background:#17eb48e7;
       transition: 0.5s;
       pointer-events: none;
       z-index: 9;
    }
    input:valid ~ i,
    input:focus ~ i {
        height: 44xp;
    }
}
.links{
    display: flex;
    justify-content: space-between;

    a{
        margin: 10px 0;
        font-size: 0.75em;
        color: #8f8f8f;
        text-decoration: none;

        &:hover, &:nth-child(2){
            color:#17eb48e7;
        }
    }
}

input[type="submit"]{
    border:none;
    outline: none;
    background:#17eb48e7;
    padding: 11px 25px;
    width: 100px;
    margin-top: 10px;
    border-radius: 4xp;
    font-weight: 600;
    cursor:pointer;
}

</style>
