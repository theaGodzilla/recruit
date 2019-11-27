<template>
  <div class="page-field">
    <Head title="我的简历" headright="保存"></Head>
    <div class="page-field-wrapper">
      <div class="page-part">
        <mt-field label="简历名称" placeholder="请输入简历名称" v-model="info.title"></mt-field>
        <mt-field label="应聘岗位" placeholder="请输入应聘岗位" v-model="info.job"></mt-field>
        <mt-field label="姓名" placeholder="请输入姓名" :attr="{maxlength: 10}" v-model="info.name"></mt-field>
        <mt-field label="学历" placeholder="请输入学历" v-model="info.education"></mt-field>
        <mt-field label="专业" placeholder="请输入专业" v-model="info.major"></mt-field>
        <mt-field label="邮箱" placeholder="请输入邮箱" type="emaill" v-model="info.emaill"></mt-field>
        <mt-field label="手机号" placeholder="请输入手机号" type="tel" v-model="info.phone"></mt-field>
        <mt-field label="地址" placeholder="请输入地址" v-model="info.address"></mt-field>
        <mt-field label="出生年月" placeholder="请输入出生年月" type="date" v-model="info.date"></mt-field>
        <mt-field label="工作经验" placeholder="请输入工作经验" type="textarea" rows="4" v-model="info.work"></mt-field>
        <mt-field label="教育背景" placeholder="请输入教育背景" type="textarea" rows="4" v-model="info.school"></mt-field>
        <mt-field
          label="个人总结"
          placeholder="请输入个人总结"
          type="textarea"
          rows="4"
          v-model="info.summary"
        ></mt-field>
        <mt-field label placeholder type="textarea" rows="2" v-model="userk"></mt-field>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>
<script>
import Head from "./Head";
import Footer from "./Footer";
import Vue from "vue";
import { Field, Toast } from "mint-ui";
Vue.component(Field.name, Field);
export default {
  name: "Resume",
  components: { Head, Footer },
  data() {
    return {
      info: {},
      userk: "",
      sid: null,
      isOk: false
    };
  },
  methods: {
    faSend() {
      if (this.isOk) {
        this.updateresume();
      } else {
        this.addResume();
      }
    },
    addResume() {
      console.log(this.info);
      console.log(this.sid);
      this.$axios
        .post("/api/api/resume/addresume", {
          info: this.info,
          sid: this.sid
        })
        .then(res => {
          if (res.msg == 'ok') {
            Toast("添加成功");
            this.getDate();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    updateresume() {
      this.$axios
        .post("/api/api/resume/updateresume", {
          info: this.info,
          id: this.info._id
        })
        .then(res => {
          this.info = res.data[0];
          if (res.err === 0) {
            Toast("修改成功");
             this.getDate();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getDate() {
      this.$axios
        .post("/api/api/resume/findresume", {
          id: this.sid
        })
        .then(res => {
          console.log(res);
          console.log(res.data.length);
          if (res.data.length > 0) {
            this.isOk = true;
            this.info = res.data[0];
            window.localStorage.setItem("resume", JSON.stringify(this.info));
          } else {
            this.isOk = false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.sid = JSON.parse(window.localStorage.getItem("info")).xuehao;
    this.getDate();
  }
};
</script>
