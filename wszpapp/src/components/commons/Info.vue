<template>
  <div class="page-field">
    <Head title="个人信息"></Head>
    <div class="page-field-wrapper">
      <mt-field label="姓名" placeholder="请输入姓名" readonly :attr="{maxlength: 10}" v-model="info.name"></mt-field>
      <mt-field label="学号" placeholder="请输入学号" type="number" readonly v-model="info.xuehao"></mt-field>
      <mt-field label="邮箱" placeholder="请输入邮箱" type="emaill" v-model="info.email"></mt-field>
      <mt-field label="英语" placeholder="请输入英语级别" type="tel" readonly v-model="info.language"></mt-field>
      <!-- <mt-field label="学历" placeholder="请输入学历" readonly v-model="info.xueli"></mt-field> -->
      <mt-field label="专业" placeholder="请输入专业" readonly v-model="info.major"></mt-field>
      <mt-field label="住址" placeholder="请输入住址" v-model="info.city"></mt-field>
      <mt-field label="求职意向" placeholder="请输入求职意向" v-model="info.job"></mt-field>
      <mt-field label="理想薪资" placeholder="请输入理想薪资" v-model="info.like"></mt-field>
      <!-- <mt-field label="数字" placeholder="请输入数字" type="number" v-model="info"></mt-field>
      <mt-field label="生日" placeholder="请输入生日" type="date" v-model="info"></mt-field>-->
      <!-- <mt-field label="自我介绍" placeholder="自我介绍" type="textarea" rows="4" v-model="info"></mt-field> -->
    </div>
  </div>
</template>
<script>
import Head from "./Head";
import Vue from "vue";
import { Field } from "mint-ui";
Vue.component(Field.name, Field);
export default {
  name: "Info",
  components: { Head },
  props: ["title"],
  data() {
    return {
      info: {}
    };
  },
  methods: {},
  created() {
    if (this.$store.state.login) {
      const id = JSON.parse(window.localStorage.getItem("info"))._id;
      this.$axios
        .post("/api/api/studer/getstuderID", {
          id,
        })
        .then(res => {
          this.info=res.data[0]
        })
        .catch(err => {
          console.log(err);
        });
      this.$store.commit("changeSliderShow", true);
    } else {
      this.$router.push("dl/login");
    }
  }
};
</script>
