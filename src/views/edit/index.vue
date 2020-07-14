<template>
  <!--编辑资料-->
  <div class="edit">
    <listHeader @saveInfo="toInfo"></listHeader>


    <!--内容-->
    <ul class="cont">
      <li><h1>头像</h1>
        <input id="upload_file" type="file" accept='image/*' name="file" @change="fileChange($event)" style="display: none"/>
        <div  @click="fileClick()">

          <!--<img :src="imgList[0].file.src" style="display: inline-block;">-->
          <!--<img :src="img" alt="">-->
          <img :src="img?img:(imgId?imgLink(imgId):defoultHead)" alt="" class="big">
          <img src="../../assets/img/personal/iconleft.png" alt="" class="small"></div>
      </li>
      <li><h1>昵称</h1>
        <div @click="isShow=true,isType=2">{{info.nickName?info.nickName:info.account}}<img src="../../assets/img/personal/iconleft.png" alt="" class="small">
        </div>
      </li>
      <li><h1>性别</h1>
        <div @click="isShow=true,isType=3">{{isSEX==1?'男':isSEX==0?'女':'保密'}}<img src="../../assets/img/personal/iconleft.png" alt="" class="small"></div>
      </li>
      <li><h1>真实姓名</h1>
        <div @click="isShow=true,isType=4">{{info.name}}<img src="../../assets/img/personal/iconleft.png" alt="" class="small"></div>
      </li>

    </ul>

    <div class="setCont" v-if="isShow" @click="isShow=false">
      <div class="setHead" v-if="isType==1" @click.stop="">
        <h1>拍照</h1>
        <h1>从相册选择</h1>
      </div>
      <div class="cancel" v-if="isType==1||isType==3" @click="isShow=false">取消</div>

      <!--设置昵称-->
      <div class="setName" v-if="isType==2||isType==4" @click.stop="">
        <h1>{{isType == 2 ? '输入昵称' : '输入姓名'}}</h1>
        <input type="text" placeholder="昵称2-8个数字或英文字符" v-model="nickName" v-if="isType==2" maxlength="8">
        <input type="text" placeholder="姓名2-10个字符" v-model="name" maxlength="10" v-else>
        <div class="button">
          <span @click="cancelName">取消</span>
          <span @click="saveName">确定</span>
        </div>
      </div>

      <!--设置性别-->
      <div class="setGender setHead" v-if="isType==3" @click.stop="">
        <h1 v-for="(iSex,indexS) in sex" :key="indexS" @click="isSEX=iSex.code,isShow=false">{{iSex.sex}}</h1>
      </div>

    </div>
  </div>
</template>

<script>
  import $ from 'jquery';
  import listHeader from '../../components/listHeader.vue';
  import defoultHead from '../../assets/img/personal/head.png';
  import {getMemberAPI,saveInfoAPI,saveImgAPI} from '@/api/my.js';

  export default {
    name: 'HelloWorld',
    data() {
      return {
        nickName:'',
        name:'',
        isSEX:2,
        sex:[{sex:'男',code:1},{sex:'女',code:0}],
        isShow: false,
        isType: 0,
        info:{
          img:null,
          account:null,
        },
        img:'',
        defoultHead:defoultHead,
        imgList:null,
        datas: new FormData(),
        files:0,
        size:0,
        imgId:null,
      }
    },
    components: {listHeader},
    created() {
      this.getMember();
    },
    watch: {
      isShow(n,o){
        if(n){
          this.nickName='';
          this.name='';
        }else{
        }
      },
    },
    methods: {
      getMember() {
        console.log(this.$store.state.userId)
        getMemberAPI(this.$store.state.userId).then(res => {
          this.info = res.data.data;
          this.nickName=this.info.nickName;
          this.imgId=this.info.img;
          this.isSEX=this.info.sex;
        })
      },


      //调用相册&相机
      fileClick() {
        $('#upload_file').click();
      },


      fileChange(el) {
        let self=this;

        if(el.target.files[0].type.indexOf('image'>=0)){

          let len='data:image/jpeg;base64,'.length;
          lrz(el.target.files[0],{width: 400})
            .then(function (rst) {
              self.img=rst.base64;
              let suffixName=rst.origin.name.slice(rst.origin.name.indexOf('.'));
              let imgStr=rst.base64.substring(len);
              // 处理成功会执行
              /*self.imgList.push(rst.base64);*/
              let data={code: imgStr,
                contentType: rst.origin.type,
                originalFileName:rst.origin.name,
                size:rst.fileLen,
                suffixName: suffixName};
              saveImgAPI(data).then(res=>{
                self.imgId=res.data;
              })


            })
            .catch(function (err){
              // 处理失败会执行
            })
            .always(function () {
              // 不管是成功失败，都会执行
            });

        }else{
          this.$valert.show('请选择图片');
        }
      },

      fileList(fileList) {
        console.log(6)
        let files = fileList.files;
        for (let i = 0; i < files.length; i++) {
          //判断是否为文件夹
          if (files[i].type != '') {
            this.fileAdd(files[i]);
          } else {
            //文件夹处理
            this.folders(fileList.items[i]);
          }
        }
      },


      //文件夹处理
      folders(files) {
        console.log(7)
        let _this = this;
        //判断是否为原生file
        if (files.kind) {
          files = files.webkitGetAsEntry();
        }
        files.createReader().readEntries(function (file) {
          for (let i = 0; i < file.length; i++) {
            if (file[i].isFile) {
              _this.foldersAdd(file[i]);
            } else {
              _this.folders(file[i]);
            }
          }
        })
      },
      fileAdd(file) {
        this.imgList=[];
        console.log(8,file)
        //总大小
        this.size = this.size + file.size;
        //判断是否为图片文件
        if (file.type.indexOf('image') == -1) {
          file.src = 'wenjian.png';
          this.imgList.push({
            file
          });
        } else {
          let reader = new FileReader();
          reader.vue = this;
          reader.readAsDataURL(file);
          reader.onload = function () {
            file.src = this.result;
            this.vue.imgList.push({
              file
            });
          }
        }

        let formData = new FormData();
        /*formData.append(file);*/
        formData.append("file", file);

        let config = {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }

        /*this.$http.post('/upload', formData, config).then(function (res) {
          if (res.status === 2000) {
            /!*这里做处理*!/
          }
        })*/
        saveImgAPI(formData).then(res=>{
          console.log('上传图片成功',res.data)
          this.imgId=res.data;
          /*if(res.data.status){
            console.log('上传图片成功',res.data)
          }*/
        })
      },
      bytesToSize(bytes) {
        console.log(10)
        if (bytes === 0){
          return '0 B';
        }
        let k = 1000, // or 1024
          sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
          i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
      },
      saveName(){

        if(this.isType==2){
          /*验证昵称 */
          let regexp=/^[A-Za-z0-9]{2,8}$/;
          if(regexp.test(this.nickName)){
            this.isShow=false;
            this.$set(this.info,'nickName',this.nickName);
          }else{
            this.$valert.show('请输入2-8个英文或数字');
          }

        }else{
          if(this.name.length>=2){
            this.isShow=false;
            this.$set(this.info,'name',this.name);
          }else{
            this.$valert.show('请输入2-10个字符');
          }
        }
      },
      cancelName(){
        this.isShow=false;
        /*if(this.isType==2){
          this.nickName=this.info.nickName;
        }else{
          this.name=this.info.name;
        }*/
      },
      /*保存按钮*/
      toInfo(){
        console.log(1111122222)
        let  data={
            /*academic: 学历 ,*/
            account: this.info.account,
            /*dept: 科室/部门 ,*/
          /*email: 邮箱 ,*/
          img: this.imgId,
          name: this.info.name,
          nickName: this.info.nickName,
          /*organName: 机构名称 ,*/
          sex: this.isSEX,
          /*title: 职称*/
        };
        saveInfoAPI(data).then(res=>{
          if(res.data.status){
            this.$valert.show('修改成功');
            this.$router.push('/my');
          }
        })
      },


    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  .edit {
    width: 100%;
    height: 100%;
    background: #f8f8f8;
    .cont {
      background: #fff;
      width: 100%;
      padding-top: 0.45rem;
      li {
        padding: .15rem;
        border-bottom: 1px solid #eee;
        display: flex;
        justify-content: space-between;
        align-items: center;
        min-height: .18rem;
        line-height: .18rem;
        h1 {
          font-size: .15rem;
          color: #202021;
          font-weight: normal;
          line-height: .18rem;
        }
        div {
          display: flex;
          justify-content: flex-end;
          align-content: center;
          align-items: center;
          color: #696969;
          font-size: .13rem;
          .big {
            width: .63rem;
            height: .63rem;
            border-radius: 50%;
          }
          .small {
            width: .08rem;
            height: .14rem;
            padding-left: .08rem;
          }
        }
      }
    }

    /*设置*/
    .setCont {
      width: 100%;
      height: 100%;
      position: fixed;
      background: rgba(0, 0, 0, 0.3);
      padding-top: 1.7rem;
      top: 0;
      left: 0;
      z-index: 12;
      display: flex;
      justify-content: center;
      .setHead {
        width: 3.51rem;
        height: 1.15rem;
        background: #fff;
        border-radius: .1rem;
        position: fixed;
        bottom: .75rem;
        text-align: center;
        h1 {
          font-size: .16rem;
          color: #222;
          font-weight: normal;
          line-height: .57rem;
          border-bottom: 1px solid #EBEBEB;
        }
        h1:last-child {
          border: none;
        }
      }
      .cancel {
        font-size: .16rem;
        color: #222;
        position: fixed;
        width: 3.51rem;
        height: .57rem;
        line-height: .57rem;
        background: #fff;
        border-radius: .1rem;
        bottom: .08rem;
        text-align: center;

      }

      /*设置昵称*/
      .setName {
        width: 2.7rem;
        height: 1.62rem;
        background: rgba(255, 255, 255, .9);
        border-radius: .1rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        justify-content: space-between;
        h1 {
          font-size: .18rem;
          color: #333333;
          padding-top: .22rem;
          height: .17rem;
          line-height: .17rem;
        }
        input {
          width: 2.3rem;
          height: .33rem;
          line-height: .33rem;
          border: 1px solid #CCCCCC;
          padding-left: .07rem;
          font-size: .12rem;
          margin-top: .05rem;
        }
        input::-webkit-input-placeholder {
          color: #C7C7CC;
        }
        input::-o-input-placeholder {
          color: #C7C7CC;
        }
        input::-moz-input-placeholder {
          color: #C7C7CC;
        }
        input::-ms-input-placeholder {
          color: #C7C7CC;
        }
        .button {
          width: 100%;
          border-top: 1px solid #D9DADE;
          display: flex;
          justify-content: space-between;
          span {
            display: inline-block;
            width: 49.5%;
            line-height: .44rem;
            text-align: center;
            color: #0650B4;
            font-size: .18rem;
            border-right: 1px solid #D9DADE;
          }
          span:last-child {
            border: none;
          }
        }
      }
    }

  }
</style>
