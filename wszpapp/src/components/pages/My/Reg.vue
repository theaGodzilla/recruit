<template>
  <div class="reg">
    <ul>
      <div class="content">
        <li class="number">
          <div class="cell_phone">
            <input type="text" name placeholder="请输入您的手机号">
          </div>
        </li>
        <li class="zc_mima">
          <div class="psw">
            <input type="text" name placeholder="请输入您的密码">
          </div>
        </li>
        <li class="code">
          <div class="huo">
            <input type="text" name placeholder="请填写验证码">
            <div class="huoqu">获取验证码</div>
          </div>
        </li>
        <li class="Zc">
          <div class="Zcbtn">
            <a>注册并登陆</a>
          </div>
        </li>
      </div>
    </ul>
  </div>
</template>
<script type="text/javascript">
export default {
  name: "Reg",
  components: {},
  data() {
    return {
      test: 111111111111
    };
  },
  methods: {},
  mounted() {},
  created() {}
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
      }
    }
  }
}
</style>