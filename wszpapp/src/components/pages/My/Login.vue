<template>
  <div class="login">
    <ul>
      <div class="content">
        <li class="phone">
          <div class="tu">
            <img src="../../../../img/phone.png">
            <input v-model="user" type="text" name placeholder="请输入学号">
          </div>
        </li>
        <li class="mima">
          <div class="suo">
            <img src="../../../../img/suo.png">
            <input v-model="pass" type="password" name placeholder="请输入密码">
          </div>
        </li>
        <li class="Lj">
          <div :class="show?'hl':''" @click="login">立即登陆</div>
        </li>
        <div class="wj">
          <a></a>
        </div>
      </div>
    </ul>
  </div>
</template>
<script type="text/javascript">
import { Toast } from "mint-ui";
export default {
  name: "Login",
  components: {},
  data() {
    return {
      info: {},
      user: "",
      pass: "",
      show: false
    };
  },
  methods: {
    login() {
      if (!this.user) {
        Toast("请输入学号");
      } else if (!this.pass) {
        Toast("请输入密码");
      } else {
        this.$axios
          .post("/api/api/studer/getxuehao", {
            xuehao: this.user
          })
          .then(res => {
            if (res == "yes") {
              this.log();
            } else {
              Toast("用户不存在");
            }
          })
          .catch(err => {
            console.log(err);
          });
      }
    },
    log() {
      this.$axios
        .post("/api/api/studer/sreg", {
          xuehao: this.user,
          mima: this.pass
        })
        .then(res => {
          if (res.msg == 200) {
            this.info=res.data[0]
            window.localStorage.setItem("user", this.user);
            window.localStorage.setItem("info", JSON.stringify(this.info));
            this.$store.commit("changeLogin", true);
            this.$router.go(-1);
          } else {
            Toast("密码错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    hl() {
      if (this.user && this.pass) {
        this.show = true;
      } else {
        this.show = false;
      }
    }
  },
  mounted() {},
  created() {
  },
  updated() {
    this.hl();
  }
};
</script>
<style lang="less" scoped>
//scoped声明作用域
@import "../../../styles/main.less";
.login {
  .w(375);
  .h(625);
  background: #fdeece;

  ul {
    .w(315);
    .h(274);
    z-index: 999;
    margin: 0 auto;
    position: relative;
    .content {
      .w(315);
      .h(274);
      // background: darken;
      .phone {
        .w(315);
        .h(45);
        position: absolute;
        // background:yellow;
        .top(51);
        .tu {
          background: white;
          .w(315);
          .h(45);
          .lh(45);
          padding-bottom: 4px;
          border-radius: 10px;
          margin-top: -4px;
          img {
            .w(13);
            .h(22);
            .ml(11);
            .mr(11);
          }
          input {
            .w(276);
            .h(45);
            border: 0;
            .fs(14);
            top: 0;
            position: absolute;
            outline: none;
          }
        }
      }

      .mima {
        .w(315);
        .h(45);
        position: absolute;
        // background:yellow;
        .top(120);
        .suo {
          padding-bottom: 4px;
          background: white;
          border-radius: 10px;
          margin-top: -4px;
          .w(315);
          .h(45);
          .lh(45);
          img {
            .w(13);
            .h(20);
            .ml(11);
            .mr(11);
          }
          input {
            position: absolute;
            .w(275);
            .h(45);
            border: 0;
            .fs(14);
            top: 0;
            outline: none;
          }
        }
      }
      .Lj {
        .w(315);
        .h(45);
        position: absolute;
        .top(200);
        border-radius: 20px;
        text-align: center;
        background: #c3c3c3;
        border: 1px solid #ccc;
        .fs(13);
        .lh(45);
        color: white;
        .hl {
          border-radius: 20px;
          background: orange;
        }
      }
      .wj {
        position: absolute;
        .top(270);
        .fs(13);
        right: 0;
      }
    }
  }
}
</style>