<template>
  <div class="reg">
    <ul>
      <div class="content">
        <li class="number">
          <div class="cell_phone">
            <input v-model="user" type="text" name placeholder="请输入学号">
          </div>
        </li>
        <li class="zc_mima">
          <div class="psw">
            <input v-model="pass" type="password" name placeholder="请输入原密码">
          </div>
        </li>
        <li class="code">
          <div class="huo">
            <input v-model="passtwo" type="password" name placeholder="请输入新密码">
            <!-- <div class="huoqu">获取验证码</div> -->
          </div>
        </li>
        <li class="Zc">
          <div :class="show?'hl':''" @click="updata">修改密码</div>
        </li>
      </div>
    </ul>
  </div>
</template>
<script type="text/javascript">
import { Toast } from "mint-ui";
export default {
  name: "Reg",
  components: {},
  data() {
    return {
      user: "",
      pass: "",
      passtwo: "",
      show: false
    };
  },
  methods: {
    hl() {
      if (this.user && this.pass && this.passtwo) {
        this.show = true;
      } else {
        this.show = false;
      }
    },
    updata() {
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
          console.log(res);
          if (res.msg == 200) {
            this.up();
          } else {
            Toast("密码错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    up() {
      this.$axios
        .post("/api/api/studer/uppass", {
          xuehao: this.user,
          mima: this.passtwo
        })
        .then(res => {
          if (res.msg == 200) {
            Toast("修改成功");
            setTimeout(() => {
              this.$router.go(0)
            }, 3000);
          } else {
            Toast("密码错误");
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  mounted() {},
  created() {},
  updated() {
    this.hl();
  }
};
</script>
<style lang="less" scoped>
//scoped声明作用域
@import "../../../styles/main.less";
.reg {
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
      .h(320);
      // background: darken;
      .number {
        .w(315);
        .h(45);
        position: absolute;
        // background:yellow;
        .top(51);
        .cell_phone {
          background: white;
          .w(315);
          .h(45);
          .lh(45);
          padding-bottom: 4px;
          border-radius: 5px;
          margin-top: -4px;

          input {
            .w(300);
            .h(45);
            border: 0;
            .fs(14);
            top: 0;
            position: absolute;
            .ml(15);
            outline: none;
          }
        }
      }

      .zc_mima {
        .w(315);
        .h(45);
        position: absolute;
        // background:yellow;
        .top(120);
        .psw {
          padding-bottom: 4px;
          background: white;
          border-radius: 5px;
          margin-top: -4px;
          .w(315);
          .h(45);
          .lh(45);
          input {
            position: absolute;
            .w(300);
            .h(45);
            border: 0;
            .fs(14);
            top: 0;
            .ml(15);
            outline: none;
          }
        }
      }
      .code {
        .w(315);
        .h(45);
        position: absolute;
        // background:yellow;
        .top(190);
        .huo {
          padding-bottom: 4px;
          background: white;
          border-radius: 5px;
          margin-top: -4px;
          .w(315);
          .h(45);
          .lh(45);
          input {
            position: absolute;
            .w(157);
            .h(45);
            border: 0;
            .fs(14);
            top: 0;
            .ml(15);
            outline: none;
          }
          .huoqu {
            .w(65);
            .h(45);
            .fs(13);
            .lh(45);
            padding-right: 10px;
            float: right;
            color: #e7693f;
          }
        }
      }
      .Zc {
        .w(315);
        .h(45);
        position: absolute;
        .top(270);
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
    }
  }
}
</style>