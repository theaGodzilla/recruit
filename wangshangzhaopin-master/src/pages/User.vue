<template>
  <div class="users">
    <div class="btns">
      <el-button size="mini" @click="toAddUser()">添加学生</el-button>
    </div>
    <div class="content" v-loading="loading">
      <el-col :span="5" v-for="(u,index) in users" :key="index" class="everyuser">
        <img :src="u.imgUrl?u.imgUrl:userface" style="width: 100px;height: 100px">
        <div class="userjz">
          <div>
            <span>姓名:</span>
            <span>{{u.name}}</span>
          </div>
          <div>
            <span>学号:</span>
            <span>{{u.xuehao}}</span>
          </div>
          <!-- <div>
            <span>注册时间:</span>
            <span>{{u.regTime?u.regTime:'--'}}</span>
          </div>-->
          <div>
            <span>邮箱:</span>
            <span>{{u.email}}</span>
          </div>
          <div>
            <span>专业:</span>
            <span>{{u.major}}</span>
          </div>
		  <div>
            <span>外语水平:</span>
            <span>{{u.language}}</span>
          </div>
		  <div>
            <span>求职意向:</span>
            <span>{{u.job}}</span>
          </div>
		  <div>
            <span>理想薪资:</span>
            <span>{{u.like}}</span>
          </div>
		  <div>
            <span>工作城市:</span>
            <span>{{u.city}}</span>
          </div>
          <!-- <div>
            <span>状态:</span>
            <el-switch
              v-model="u.enabled"
              active-color="#13ce66"
              inactive-color="#ff4949"
              @change="changeStatus(u)"
            ></el-switch>
          </div> -->
          <div>
            <span>操作:</span>
            <i class="fa fa-trash" @click="deleteUserById(u._id)"></i>
          </div>
        </div>
      </el-col>
    </div>
    <div class="model">
      <el-dialog :title="userDialog.title" :visible.sync="userDialog.visible">
        <el-form :model="userForm" ref="userForm" :rules="rules" status-icon>
          <el-form-item prop="username" label="姓名" label-width="120px">
            <el-input v-model="userForm.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="password" label="学号" label-width="120px">
            <el-input v-model="userForm.password" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item prop="password1" label="确认密码" label-width="120px">
            <el-input type="password" v-model="userForm.password1" autocomplete="off"></el-input>
          </el-form-item>-->
          <el-form-item prop="nickname" label="专业" label-width="120px">
            <el-input v-model="userForm.nickname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item prop="email" label="邮箱" label-width="120px">
            <el-input v-model="userForm.email" autocomplete="off"></el-input>
          </el-form-item>
		  <el-form-item label="外语水平" label-width="120px">
            <el-input v-model="userForm.language" autocomplete="off"></el-input>
          </el-form-item>
		  <el-form-item label="求职意向" label-width="120px">
            <el-input v-model="userForm.job" autocomplete="off"></el-input>
          </el-form-item>
		  <el-form-item label="理想薪资" label-width="120px">
            <el-input v-model="userForm.like" autocomplete="off"></el-input>
          </el-form-item>
		  <el-form-item label="工作城市" label-width="120px">
            <el-input v-model="userForm.city" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="头像上传" label-width="120px">
            <el-button size="mini" @click="toggleShow">设置头像</el-button>
            <my-upload
              field="file"
              @crop-success="cropSuccess"
              @crop-upload-success="cropUploadSuccess"
              @crop-upload-fail="cropUploadFail"
              v-model="show"
              :width="300"
              :height="300"
              url="http://39.108.188.49:8099/manager/file/upload"
              :params="params"
              :headers="headers"
              img-format="jpg"
            ></my-upload>
            <img :src="imgDataUrl">
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeUserDialog('userForm')">取 消</el-button>
          <el-button type="primary" size="small" @click="saveOrUpdateUser('userForm')">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
// import axios from '@/http/axios'
import myUpload from "vue-image-crop-upload";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error("请输入学号"));
      } else {
        if (this.userForm.password1 !== "") {
          this.$refs.userForm.validateField("password1");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === undefined) {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.userForm.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      // 头像
      show: true,
      params: {
        token: "123456798",
        name: "avatar"
      },
      headers: {
        smail: "*_~"
      },
      imgDataUrl: "",
      // 头像结束

      time: "",
      imageUrl: "",
      userface:
        "https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=2328144574,80036497&fm=27&gp=0.jpg",
      users: [],
      userDialog: {
        title: "",
        radio: 1,
        visible: false
      },
      userForm: {},
      rules: {
        username: [
          { required: true, message: "请输入姓名", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, validator: validatePass, trigger: "blur" }
        ],
        // password1: [
        //   { required: true, validator: validatePass2, trigger: "blur" }
        // ],
        nickname: [
          { required: true, message: "请输入专业", trigger: "blur" },
          { min: 1, max: 20, message: "长度在 1 到 20 个字符", trigger: "blur" }
        ],
        email: [{ required: true, message: "请输入邮箱", trigger: "blur" }]
      },
      loading: false
    };
  },
  created() {
    this.findAllUsers();
  },
  components: {
    "my-upload": myUpload
  },
  methods: {
    toggleShow() {
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field) {
      console.log("-------- crop success --------");
      this.imgDataUrl = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field) {
      console.log("-------- upload success --------");
      console.log(jsonData);
      console.log("field: " + field);
    },
    cropUploadFail(status, field) {
      console.log("-------- upload fail --------");
      console.log(status);
      console.log("field: " + field);
    },

    changeStatus(u) {
      let obj = {
        id: u.id,
        status: u.enabled
      };
      let url = "/manager/user/changeStatus";
      axios
        .post(url, obj)
        .then(({ data: result }) => {
          if (result.status == 200) {
            this.$notify({
              title: u.enabled ? "开启" : "关闭",
              message: u.enabled ? "成功开启" : "成功关闭",
              type: "success"
            });
          } else {
            this.$notify({
              title: "错误",
              message: "修改失败"
            });
          }
        })
        .catch(error => {
          this.$notify({
            type: "error",
            title: "错误",
            message: "错误,无法修改"
          });
        });
    },
    deleteUserById(id) {
      this.$confirm("此操作将永久删除该学生信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let url = "/api/api/studer/delstuder";
          this.$axios
            .post(url, {
              id
            })
            .then(res => {
              console.log(res);
              if (res.msg == "删除成功") {
                this.$notify({
                  title: "成功",
                  message: res.msg,
                  type: "成功"
                });
              } else {
                this.$notify({
                  title: "错误",
                  message: "无法删除"
                });
              }
              this.findAllUsers();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    closeUserDialog(formName) {
      this.userDialog.visible = false;
      this.imageUrl = "";
      this.imgDataUrl = "";
      if (formName) {
        this.$refs[formName].resetFields();
      }
    },
    saveOrUpdateUser(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // this.findTimes();
          // this.userForm.regTime = this.time;
          this.userForm.userface = this.imgDataUrl;
          let url = "/api/api/studer/studer";
          this.$axios
            .post(url, {
              name: this.userForm.username,
              xuehao: this.userForm.password,
              email: this.userForm.email,
              imgUrl: this.userForm.userface,
              major: this.userForm.nickname,
              language: this.userForm.language,
              job: this.userForm.job,
              like: this.userForm.like,
              city: this.userForm.city,
            })
            .then(res => {
              console.log(res);
              if (res.msg == "数据插入成功") {
                this.closeUserDialog();
                this.$notify({
                  title: "成功",
                  message: "添加成功",
                  type: "success"
                });
                this.findAllUsers();
              } else {
                this.$notify({
                  title: "错误",
                  message: '添加错误'
                });
              }
            })
            .catch(error => {
              this.$notify({
                type: "error",
                title: "错误",
                message: "网络异常"
              });
            });
        } else {
          return false;
        }
      });
    },
    toAddUser() {
      this.userForm = {};
      this.userDialog.title = "添加学生";
      this.userDialog.visible = true;
    },
    findAllUsers() {
      this.loading = true;
      this.$axios
        .post("/api/api/studer/findstuder", {
          pagesize: 10, //第一页几条
          target: 1 //目标页
        })
        .then(res => {
          this.users = res.data.studerlist;
        })
        .catch(err => {
          console.log(err);
        })
        .finally(() => {
          this.loading = false;
        });
    },
    findTimes() {
      let date = new Date();
      let year = date.getFullYear();
      let month = date.getMonth() + 1;
      let day = date.getDate();
      if (month < 10) {
        month = "0" + month;
      }
      if (day < 10) {
        day = "0" + day;
      }
      this.time = year + "-" + month + "-" + day;
    }
  }
};
</script>
<style scoped>
.content {
  padding: 1em 3em;
  overflow: hidden;
}
.everyuser {
  background-color: #f0f0f0;
  margin: 1em 1em;
  padding: 0.5em;
  text-align: center;
}
.userjz {
  width: 180px;
  text-align: left;
  margin: 0 auto;
  overflow-x: hidden;
}
.userjz span {
  line-height: 24px;
}
i.fa {
  margin: 0 0.3em;
  cursor: pointer;
}
i.fa-trash {
  color: #f56c6c;
}
</style>