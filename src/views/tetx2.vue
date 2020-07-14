<template>


  <div>
    <input id="upload_file" type="file" accept='image/*' name="file" @change="fileChange($event)"/>
    <!--<div class="image-item space" @click="showActionSheet()">
      1111
      2222
      3333
      4444
      <div class="image-up"></div>
    </div>-->

    <div class="upload_warp">
      <div class="upload_warp_img">
        <img :src="img" alt="">
        <div class="upload_warp_img_div" v-for="(item,index) in imgList">
          <div class="upload_warp_img_div_top">
            <img src="../assets/img/detail/eval.png" class="upload_warp_img_div_del" @click="fileDel(index)">
          </div>

          <!--<img :src="item.file.src" style="display: inline-block;">-->
        </div>
        <div class="upload_warp_left" id="upload_warp_left" @click="fileClick()" v-if="this.imgList.length < 6">

          <!--<img src="../assets/upload.png">-->
          <img src="../assets/img/detail/start1.png" class="imgs"/>
        </div>
      </div>

    </div>

    <div class="upload_warp_text">
      <span>选中{{imgList.length}}张文件，共{{bytesToSize(this.size)}}</span>
    </div>
  </div>

</template>

<script type="text/ecmascript-6">
import {saveImgAPI} from '@/api/my.js';
  import $ from 'jquery';
  export default {
    name: "cameras-and-albums",
    data(){
      return{
        imgList: [],
        datas: new FormData(),
        files:0,
        size:0,
        img:'',
      }
    },
    methods:{
      //调用相册&相机
      fileClick() {
        console.log(1)
        $('#upload_file').click();

      },
      //调用手机摄像头并拍照
      /*getImage() {
        console.log(2)
        let cmr = plus.camera.getCamera();
        cmr.captureImage(function(p) {
          plus.io.resolveLocalFileSystemURL(p, function(entry) {
            compressImage(entry.toLocalURL(),entry.name);
          }, function(e) {
            plus.nativeUI.toast("读取拍照文件错误：" + e.message);
          });
        }, function(e) {
        }, {
          filter: 'image'
        });
      },*/
      //从相册选择照片
      /*galleryImgs() {
        console.log(3)
        plus.gallery.pick(function(e) {
          let name = e.substr(e.lastIndexOf('/') + 1);
          compressImage(e,name);
        }, function(e) {
        }, {
          filter: "image"
        });
      },*/
      //点击事件，弹出选择摄像头和相册的选项
      /*showActionSheet() {
        console.log(4)
        let bts = [{
          title: "拍照"
        }, {
          title: "从相册选择"
        }];
        plus.nativeUI.actionSheet({
            cancel: "取消",
            buttons: bts
          },
          function(e) {
            if (e.index == 1) {
              this.getImage();
            } else if (e.index == 2) {
              this.galleryImgs();
            }
          }
        );
      },*/
      fileChange(el) {
        let self=this;
        this.files=$("#upload_file").get(0);
        if(el.target.files[0].type.indexOf('image'>=0)){
          //说明是图片
          let len='data:image/jpeg;base64,'.length;
          lrz(el.target.files[0],{width: 400})
            .then(function (rst) {
              self.img=rst.base64;
              let suffixName=rst.origin.name.slice(rst.origin.name.indexOf('.'));
              // 处理成功会执行
              /*self.imgList.push(rst.base64);*/
              let data={code: rst.base64,
                contentType: rst.origin.type,
                originalFileName:rst.origin.name,
                size:rst.fileLen,
                suffixName: suffixName};
              console.log('压缩图',rst.base64.substring(len));

              saveImgAPI(data).then(res=>{
                console.log('上传图片成功',res.data)

                /*if(res.data.status){
                  console.log('上传图片成功',res.data)
                }*/
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

        console.log('TUPIAN',self.imgList)
        /*console.log(5)
        this.files=$("#upload_file").get(0).files;
        console.log(this.files.length);
        for(let i=0;i<this.files.length;i++){
          this.datas.append("file",this.files[i]);
        }
        this.show1=false;
        console.log(typeof this.files);
        console.log(this.files);
        if (!el.target.files[0].size) return;
        this.fileList(el.target);
        el.target.value = ''*/
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

          /*if(res.data.status){
            console.log('上传图片成功',res.data)
          }*/
        })
      },
      fileDel(index) {
        console.log(9)
        this.size = this.size - this.imgList[index].file.size;//总大小
        this.imgList.splice(index, 1);
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
      dragenter(el) {
        console.log(11)
        el.stopPropagation();
        el.preventDefault();
      },
      dragover(el) {
        console.log(12)
        el.stopPropagation();
        el.preventDefault();
      },
      drop(el) {
        console.log(13)
        el.stopPropagation();
        el.preventDefault();
        this.fileList(el.dataTransfer);
      },
      shows(et,tx){
        console.log(14)
        this.strut=et;
        this.txt=tx;
      },
      handleClick(){
        console.log(15)
        this.$store.commit('add')
      },
    },
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
  /*.Wheel{
    width: 100%;
    height: 2rem;
    position: relative;
    .item{
      width: 100%;
      height: 2rem;


      img{
        width: 100%;
        height: 2rem;
        animation: myfirst1 4s infinite;
        -moz-animation:myfirst1 4s infinite;	!* Firefox *!
        -webkit-animation: myfirst1 4s infinite;	!* Safari 和 Chrome *!
        -o-animation: myfirst1 4s infinite;

      }
    }
    .indexList{
      width: 100%;
      position: absolute;
      bottom: .1rem;
      display: flex;
      justify-content: center;
      li{
        width: .05rem;
        height: .05rem;
        background:rgba(255,255,255,.6);
        border-radius: .02rem;
        margin: 0 .04rem;
        float: left;
      }
      .active{
        animation: myfirst .5s forwards;
        -moz-animation: myfirst .5s forwards;	!* Firefox *!
        -webkit-animation: myfirst .5s forwards;	!* Safari 和 Chrome *!
        -o-animation: myfirst .5s forwards;

      }
    }
    @keyframes myfirst
    {
      to {transform: scaleX(2);background:rgba(255,255,255,1);}
    }

    @-moz-keyframes myfirst !* Firefox *!
    {
      to {transform: scaleX(2);background:rgba(255,255,255,1);}
    }

    @-webkit-keyframes myfirst !* Safari 和 Chrome *!
    {
      to {transform: scaleX(2);background:rgba(255,255,255,1);}
    }

    @-o-keyframes myfirst !* Opera *!
    {
      to {transform: scaleX(2);background:rgba(255,255,255,1);}
    }








    @keyframes myfirst1
    {
      0%{opacity: 0.8}
      10%{opacity: 1}
      100%{opacity: 1}
    }

    @-moz-keyframes myfirst1 !* Firefox *!
    {
      0%{opacity: 0.8}
      10%{opacity: 1}
      100%{opacity: 1}
    }

    @-webkit-keyframes myfirst1 !* Safari 和 Chrome *!
    {
      0%{opacity: 0.8}
      10%{opacity: 1}
      100%{opacity: 1}
    }

    @-o-keyframes myfirst1 !* Opera *!
    {
      0%{opacity: 0.8}
      10%{opacity: 1}
      100%{opacity: 1}
    }
  }*/

  /*音频*/
  .audioCss {
    height: 1rem;
    width: 100%;
    padding-bottom: 0.3rem;
    padding-top: 0.16rem;
    .line {
      margin: 0 auto;
      width: 3.35rem;
      height: 3px;
      background: #9B9B9B;
      position: relative;
      span {
        position: absolute;
        /*width: 30%;*/
        height: 3px;
        background: #1278bd;
        left: 0;
        top: 0;
      }
      .step {
        width: 0.05rem;
        height: 0.18rem;
        position: absolute;
        top: -0.07rem;
        background: #1278bd;
        border-radius: 0.03rem;
      }
    }
    .line:before {
      content: '';
      position: absolute;
      width: 0.08rem;
      height: 0.08rem;
      border-radius: 50%;
      background: #1278bd;
      top: -0.03rem;
      left: -0.08rem;
    }
    .line:after {
      content: '';
      position: absolute;
      width: 0.08rem;
      height: 0.08rem;
      border-radius: 50%;
      background: #9B9B9B;
      top: -0.03rem;
      right: -0.08rem;
    }
    .time {
      padding-top: .1rem;
      display: flex;
      justify-content: space-between;
      color: #424242;
      font-size: .1rem;
    }
    .buttons {
      padding-top: 0.27rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 0.62rem;
      .small {
        width: 0.26rem;
        height: 0.235rem;
      }
      .big {
        width: 0.62rem;
        height: 0.62rem;
      }
    }
  }
  .bar {
    width: 100%;
    height: 3px;
    line-height:3px;

    .progressbar {
      width: 100%;
      height:3px;
      background-color: #cac8ba;
      margin-top:.1rem;
      border-radius:3px;
      position: relative;
    }

    .greenbar {
      width: 0%;
      height:3px;
      border-radius:3px;
      position: absolute;
      top: 0;
      left: 0;
      background-color: #1296db;

      .yuan {
        display: inline-block;
        padding:.1rem .03rem;
        position: absolute;
        top: -0.07rem;
        right:-.05rem;
        background: #1278bd;
        border-radius: 0.03rem;
      }
    }
  }

</style>
<!--<template>
  <div class="infinite-list-wrapper" style="overflow:auto">
    <ul
      class="list"
      v-infinite-scroll="load"
      infinite-scroll-disabled="disabled">
      <li v-for="i in count" class="list-item">{{ i }}</li>
    </ul>
    <p v-if="loading">加载中...</p>
    <p v-if="noMore">没有更多了</p>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        count: 10,
        loading: false
      }
    },
    computed: {
      noMore () {
        return this.count >= 20
      },
      disabled () {
        return this.loading || this.noMore
      }
    },
    methods: {
      load () {
        this.loading = true
        setTimeout(() => {
          this.count += 2
          this.loading = false
        }, 2000)
      }
    }
  }
</script>
<style lang="less">
  .infinite-list-wrapper{
    height: 3rem;
  }
  .list{
    width: 100%;
    text-align: center;

    li{
      height: .8rem;
      line-height: .8rem;
      margin-bottom: .05rem;
      background: #ccc;
    }
  }
</style>
-->
