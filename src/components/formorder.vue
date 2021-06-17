<template>
  <div @click="toClose2" class="form-wrap-zakaz">

    <form @submit.prevent="validHandler">

      <p @click="closeForm" title="закрыть" class="closeForm">&#10006;</p>

      <h3>Дата поездки: {{ chosenDate.startDay }} {{ chosenDate.mth }}</h3>
      <p v-if="sendMailAnswer">{{ sendMailAnswer }}</p>
      <p v-else>Вводите только латинские символы</p>

      <input type="text" placeholder="Ваше имя"
      v-model.trim="orderData.name"
      :class="$v.orderData.name.$error ? 'alarm' : ''"
      >
      <input type="tel" placeholder="телефон"
      v-model.trim="orderData.phone"
      :class="$v.orderData.phone.$error ? 'alarm' : ''"
      >
      <input type="email" placeholder="e-mail"
      v-model.trim="orderData.mail"
      :class="$v.orderData.mail.$error ? 'alarm' : ''"
      >
      <input type="hidden" v-model="theDate">
      
      <div class="chBox">
        <input type="checkbox" name="getCall" v-model="orderData.reqcalling">
        <label for="getCall">заказать звонок</label>
      </div>

      <button v-if="isBtn" type="submit">&#10004; заказать</button>

    </form>
  </div>
</template>

<script>
import { email, required, alphaNum, numeric } from 'vuelidate/lib/validators'

export default {
  name: 'formzakaz',

  data(){
    return{
      orderData:{
        name: '',
        phone: '',
        mail: '',
        dayData: '12',
        reqcalling: false,
      },
      sendMailAnswer: '',
      URLtomail: '/tomailsendler-feniks.php',
      isBtn: true
    }
  },

  validations:{
    orderData:{
      name:{required, alphaNum},
      phone:{required, numeric},
      mail:{email, required}
    }
  },

  props: ['chosenDate'],

  computed:{
    theDate(){
      let dateInfo = `${this.chosenDate.startDay} ${this.chosenDate.mth}`
      this.orderData.dayData = dateInfo
      return dateInfo
    }
  },

  methods:{
    validHandler(){
      this.$v.$touch()
      if(this.$v.$invalid){
        return
      }
      this.formDataTOmail()
    },

    async formDataTOmail(){
      const packet = new URLSearchParams(this.orderData)
      if(process.env.NODE_ENV === 'production'){
        // this.URLtomail = 'https://fenikstour.ru/assets/php/tomailsendler-feniks.php'
        this.URLtomail = './assets/php/tomailsendler-feniks.php'
      }
      try {
        const qwe = await fetch(this.URLtomail, {
          method: 'post',
          body: packet
        })
        const answer = await qwe.text()
        this.sendMailAnswer = answer
        this.clearForm()
      } catch (error) {
        console.log(error)
      }
    },

    closeForm(){
      this.clearForm()
      this.$emit('rre', false)
    },

    toClose2(e){
      const uh = e.target.closest('.form-wrap-zakaz')
      if(e.target == uh){
        this.closeForm()
      }
    },

    clearForm(){
      this.orderData.name = ''
      this.orderData.phone = ''
      this.orderData.mail = ''
      this.orderData.reqcalling = false
      setTimeout(() => { this.$v.$reset() }, 0)
      this.isBtn = false
    }
  }
}
</script>

<style>
.form-wrap-zakaz{
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
  z-index: 2;
}
.form-wrap-zakaz input{
  font-size: 17px;
  border-radius: 4px;
  padding: .2rem;
  margin: .5rem 0;
  width: 100%;
  border: 1px solid #a5a5a5;
}
.form-wrap-zakaz input:focus{
  background: #2579bf;
  color: #fff;
  outline: none;
  border: none;
}
.form-wrap-zakaz input:focus::placeholder{
  color:rgb(214, 214, 214);
}
.form-wrap-zakaz .chBox{
  display: flex;
  align-items: center;
  margin: .5rem;
  width: 100%;
}
.form-wrap-zakaz [type="checkbox"]{
  cursor: pointer;
  width: 16px;
  height: 16px;
  margin-right: .5rem;
}
.form-wrap-zakaz .alarm{
  border: 1px solid #a5a5a5;
  border-bottom: 2px solid red;
}
.form-wrap-zakaz h3{
  color: #2579bf;
}
.form-wrap-zakaz p{
  text-align: center;
  margin: 0;
  margin-bottom: 1rem;
}
.form-wrap-zakaz form button{
  background: #2579bf;
  border: none;
  border-radius: 4px;
  padding: .1rem .5rem .2rem .5rem;
  color: #fff;
  cursor: pointer;
  font-size: 15px;
  box-shadow: 0 0 0 rgb(0 0 0 / 30%)

}
.form-wrap-zakaz form button:hover{
  box-shadow: 0 3px 3px rgb(0 0 0 / 30%)
}
.form-wrap-zakaz form .closeForm{
  position: absolute;
  right: 8px;
  top: 8px;
}
.form-wrap-zakaz form .closeForm:hover{
  color: #888;
}

.form-wrap-zakaz form{
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: 0 auto;
  outline: 100vh solid rgb(99,99,99,.5);
  background: #fff;
  padding: 1rem;
  border-radius: 5px;
  position: relative;
}

.closeForm{
  cursor: pointer;
}
</style>