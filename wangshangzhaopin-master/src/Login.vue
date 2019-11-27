<template>
  <div class="login">
    <h2>网上招聘后台管理系统</h2>
    <el-form :model="userform" :rules="rules" ref="userform">
      <el-form-item prop="username" label="用户名" label-width="80px">
        <el-input v-model="userform.username"></el-input>
      </el-form-item>
      <el-form-item prop="password" label="密码" label-width="80px">
        <el-input type="password" v-model="userform.password"></el-input>
      </el-form-item>
    </el-form>
    <div class="dl">
      <el-button @click="login">登录</el-button>
    </div>
  </div>
</template>
<script>
import axios from "@/http/axios";
export default {
  data() {
    return {
      userform: {},
      res: {},
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    login() {
      if (!this.userform.username) {
        this.$message("请输入账号");
      } else if (!this.userform.password) {
        this.$message("请输入密码");
      } else {
        this.$axios
          .post("/api/api/user/uspd", {
            name: this.userform.username
          })
          .then(res => {
            console.log(res);
            if (res == "ok") {
              this.log();
            } else {
              this.$message("账号不存在");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    log() {
      this.$axios
        .post("/api/api/user/login", {
          name: this.userform.username,
          pass: this.userform.password
        })
        .then(res => {
          if (res.msg == "ok") {
            this.res = res.data[0];
            if (this.res.stu) {
              localStorage.setItem("user", JSON.stringify(this.res));
              window.vm.currentComponent = "App";
            } else {
              this.$message("该用户无使用权限");
            }
          } else {
            this.$message("密码错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    logi() {
      // axios.post('/login',this.form)
      // .then(({data:result})=>{
      // 	if(result.status == 200 && result.message == '登录成功'){
      // 		window.vm.currentComponent = 'App';
      // 		localStorage.setItem('user',JSON.stringify(result.data));
      // 	} else {
      // 		console.log(result);
      // 	}
      // })
      // .catch((error)=>{
      // 	alert('用户名或密码错误');
      // 	console.log('error',error);
      // });
      this.$refs.userform.validate(valid => {
        if (valid) {
          console.log(this.userform);
          if (
            this.userform.username == "xu" &&
            this.userform.password == "123"
          ) {
            localStorage.setItem("user", JSON.stringify(this.userform));
            window.vm.currentComponent = "App";
          } else {
            alert("用户名或密码错误");
          }
        } else {
          return false;
        }
      });
      // this.$root.currentComponent = 'App';
    }
  }
};
</script>
<style scoped>
.login {
  width: 36%;
  padding: 1em;
  margin: 100px auto 0;
  text-align: center;
  border: 1px solid #ccc;
}
.login h2 {
  margin: 1em 0;
}
.login .dl {
  text-align: right;
}
</style>