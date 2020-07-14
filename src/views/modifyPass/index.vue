<template>
  <!--修改密码-->
    <div class="modifyPass">
      <myHeader></myHeader>
      <ul class="list">
        <li><span>旧密码</span>
          <input type="password" placeholder="输入旧密码" v-model="oldPass" @change="oldPassFN">
        </li>
        <li><span>新密码</span>
          <input type="password" placeholder="建议使用至少两种字符组合"  v-model="newPass" @change="newPassFN"></li>
        <li><span>确认密码</span>
          <input type="password" placeholder="请再次输入密码" v-model="confirmPass"  @change="confirmPassFN">
        </li>
      </ul>

      <div class="button active" @click="modifyPassword">
        提交
      </div>
    </div>
</template>

<script>
  import myHeader from '../../components/myHeader.vue';
  import {modifyPasswordAPI} from '@/api/my.js';
  import md5 from 'blueimp-md5';
  import Cookies from 'js-cookie';
  let rex=/^[A-Za-z0-9]{6,}$/;
    export default {
        name: 'HelloWorld',
        data() {
            return {
              newPass:'',
              oldPass:'',
              confirmPass:'',
            }
        },
      components:{myHeader},
        created() {
        },
        watch: {
          newPass(n,o){

            console.log(rex.test(n))
          },
        },
        methods: {
          modifyPassword(){
            if(!this.oldPassFN()||
            !this.newPassFN()||
            !this.confirmPassFN()){
              return
            }
            modifyPasswordAPI({
              checkPwd: md5(this.confirmPass),
              newPwd: md5(this.newPass),
              oldPwd: md5(this.oldPass),
              phone: Cookies.get('phone')
            }).then(res=>{
              if(res.data.status){
                this.$valert.show('恭喜您，密码修改成功');
                this.$store.commit('signOUT');
                this.$router.push('/loginPassword')
              }else{
                this.$valert.show(res.data.msg);
              }
            })
          },

          /*验证旧密码*/
          oldPassFN(){
            if(this.oldPass.trim()==''){
              this.$valert.show('旧密码不能为空');
              return false
            }
            if(!rex.test(this.oldPass)){
              this.$valert.show('旧密码输入的不正确，请更改');
              return false
            }else{
              return true
            }
          },
          /*验证新密码*//*新密码不能和旧密码一样*/
          newPassFN(){
            if(this.newPass.trim()==''){
              this.$valert.show('新密码不能为空');
              return false
            }
            if(!rex.test(this.newPass)){
              this.$valert.show('新密码输入的不正确，请更改')
              return false
            }else{
              if(this.newPass==this.oldPass){
                this.$valert.show('新密码不能和旧密码一样')
                return false
              }else{
                return true
              }
            }
          },
          /*验证确认密码*/
          confirmPassFN(){
            if(this.confirmPass.trim()==''){
              this.$valert.show('确认密码不能为空');
              return false
            }
            if(!rex.test(this.confirmPass)){
              this.$valert.show('确认密码输入的不正确，请更改')
              return false
            }else{
              console.log('新密码和确认',this.newPass,this.confirmPass)
              if(this.newPass!=this.confirmPass){
                this.$valert.show('请保持确认密码和新密码一致')
                return false
              }else{
                return true
              }
            }

          },
        },
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.modifyPass{
  background: #f8f8f8;
  height: 100%;
  width: 100%;
  .list {
    padding-top: .44rem;
    background: #fff;
    li {
      border-bottom: 1px solid #EEEEEE;
      padding: 0 .12rem;
      height: .56rem;
      line-height: .56rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        font-size: .15rem;
        color: #202021
      }
      input {
        width: 2.65rem;
        height: .56rem;
        line-height: .56rem;
        border: none;
        font-size: .15rem;
      }
      input::-webkit-input-placeholder{
        color: #878787;
      }
      input::-o-input-placeholder {
        color: #878787;
      }
      input::-moz-input-placeholder {
        color: #878787;
      }
      input::-ms-input-placeholder {
        color: #878787;
      }

    }

  }

  .button {
    margin: .5rem auto 0;
    text-align: center;
    width: 3.05rem;
    height: .42rem;
    line-height: .42rem;
    font-size: .15rem;
    color: #5F6775;
    border-radius: .21rem;
    background: #E6E6E6;
    box-shadow: 0.01rem .03rem .06rem 0rem rgba(0,0,0,0.1);
  }
  .active{
    background: url("../../assets/img/detail/button.png") no-repeat;
    background-size: cover;
    color: #fff;
    font-weight: bold;
    box-shadow: 0.01rem .03rem .06rem 0rem rgba(15, 122, 203,0.1);

  }
}
</style>
