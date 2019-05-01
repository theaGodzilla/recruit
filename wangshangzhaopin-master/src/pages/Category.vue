<template>
  <div class="article">
    <!-- 按钮区 -->
    <div class="btns">
      <!-- <el-select v-model="params.categoryId" size="mini" clearable placeholder="请选择">
        <el-option v-for="c in categories" :label="c.name" :value="c.id" :key="c.id"></el-option>
      </el-select>-->
      <el-input
        style="width: 120px"
        size="mini"
        placeholder="请输入关键字"
        v-model="params.keywords"
        clearable
      ></el-input>
      <!-- <el-button size="mini" @click="toAddArticle()">添加</el-button> -->
      <el-button size="mini" @click="batchDeleteArticle">批量邀约</el-button>
    </div>
    <!-- 按钮区结束 -->
    <!-- 数据区 -->
    <div class="article_table" v-loading="loading">
      <el-table
        size="small"
        :data="articles"
        :border="true"
        stripe
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="45"></el-table-column>
        <el-table-column prop="title" label="招聘标题" width="180"></el-table-column>
        <el-table-column prop="sname" label="投递学生姓名"></el-table-column>
        <el-table-column prop="qname" label="投递企业"></el-table-column>
        <el-table-column prop="date" label="投递时间"></el-table-column>
        <el-table-column prop="yao" label="投递状态"></el-table-column>
        <!-- <el-table-column prop="121312" label="公司规模"></el-table-column> -->
        <!-- <el-table-column prop="educationText" label="职位要求"></el-table-column> -->
        <!-- <el-table-column prop="days_a_week" label="工作时间"></el-table-column> -->
        <el-table-column label="操作">
          <template slot-scope="{row}">
            <!-- <i class="fa fa-trash" @click="deleteArticle(row._id)"></i> -->
            <!-- <i class="fa fa-pencil" @click="toAddArticle(row)"></i> -->
            <i class="fa fa-pencil" @click="openModel(row._id)"></i>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 数据区结束 -->
    <!-- 分页 -->
    <div class="page">
      <el-pagination
        layout="prev, pager, next"
        :page-size="params.pageSize"
        @current-change="hadleCurrentChange"
        :total="total"
      ></el-pagination>
    </div>
    <!-- 分页结束 -->
    <!-- 模态框区 -->
    <div class="model">
      <el-dialog :title="articleDialog.title" :visible.sync="articleDialog.visible" fullscreen>
        <!-- {{articleDialog.form.fileIds}} -->
        <el-form :model="articleDialog.form" :rules="rules" ref="articleDialog.form">
          <el-form-item prop="title" label="招聘标题" label-width="120px">
            <el-input v-model="articleDialog.form.title" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item
            style="display: inline-block;"
            label="所属方向"
            label-width="120px"
            prop="categoryId"
          >
            <el-select v-model="articleDialog.form.categoryId" placeholder="请选择">
              <el-option v-for="c in categories" :label="c.name" :key="c.id" :value="c.id"></el-option>
            </el-select>
          </el-form-item>-->
          <el-form-item prop="title" label="招聘企业" label-width="120px">
            <el-input v-model="articleDialog.form.companyFullname" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="工作时间" label-width="120px">
            <el-input v-model="articleDialog.form.days_a_week" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="薪资" label-width="120px">
            <el-input v-model="articleDialog.form.salaryText" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="城市" label-width="120px">
            <el-input v-model="articleDialog.form.city" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="公司规模" label-width="120px">
            <el-input v-model="articleDialog.form.workerNumber" autocomplete="off"></el-input>
          </el-form-item>
          <!-- <el-form-item label="职位要求" label-width="120px">
            <el-input v-model="articleDialog.form.educationText" autocomplete="off"></el-input>
          </el-form-item>-->

          <el-form-item prop="comment" label="职位要求" label-width="120px">
            <el-input
              type="textarea"
              :rows="4"
              placeholder="请输入内容"
              v-model="articleDialog.form.educationText"
            ></el-input>
          </el-form-item>
          <!-- <el-form-item prop="liststyle" label="发布样式" label-width="120px">
            <el-radio v-model="articleDialog.form.liststyle" label="style-one">
              <img src="../images/style1.jpg" style="width: 120px; height: 40px;">
            </el-radio>
            <el-radio v-model="articleDialog.form.liststyle" label="style-two">
              <img src="../images/style2.jpg" style="width: 120px; height: 40px;">
            </el-radio>
          </el-form-item>
          <el-form-item label="缩略图" label-width="120px">-->

          <!-- action="http://120.78.164.247:8888/manager/file/upload" -->

          <!-- <el-upload
              action="http://39.108.188.49:8099/manager/file/upload"
              :on-success="handleUploadSuccess"
              :on-remove="handleUploadRemove"
              :file-list="articleDialog.fileList"
              list-type="picture"
            >
              <el-button size="small" type="primary">点击上传</el-button>
              <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
            </el-upload>
          </el-form-item>
          <el-form-item prop="content" label="文章正文" label-width="120px">
            <mavon-editor ref="md" v-model="articleDialog.form.content"/>
          </el-form-item>-->
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button size="small" @click="closeArticleDialog('articleDialog.form')">取 消</el-button>
          <el-button
            type="primary"
            size="small"
            @click="saveOrUpdateArticle('articleDialog.form',true)"
          >确 定</el-button>
        </div>
      </el-dialog>
    </div>
    <!-- 模态框区结束 -->
  </div>
</template>
<script>
// import axios from '@/http/axios'
export default {
  data() {
    return {
      loading: false,
      ids: [],
      categories: [],
      articles: [],
      total: 0,
      params: {
        page: 0,
        pageSize: 10,
        keywords: ""
      },
      articleDialog: {
        title: "",
        radio: 1,
        form: {},
        visible: false,
        fileList: []
      },
      rules: {
        title: [{ required: true, message: "请输入招聘标题", trigger: "blur" }],
        content: [
          { required: true, message: "请输入招聘正文信息", trigger: "blur" }
        ],
        categoryId: [
          { required: true, message: "请选择父级方向", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    // 只要params中任意参数改变,就要刷新页面
    params: {
      handler: function() {
        this.findAllArticles();
      },
      deep: true
    }
  },
  created() {
    this.findAllArticles();
    // this.findAllCategories();
  },
  methods: {
    //删除附件
    handleUploadRemove(file) {
      // 调用接口删除图片
      axios
        .get("/manager/file/delete", {
          params: {
            id: file.name
          }
        })
        .then(() => {
          // 从fileIds中移除
          _.remove(this.articleDialog.form.fileIds, id => {
            return id == file.name;
          });
          this.articleDialog.form.fileIds.push(1);
          this.articleDialog.form.fileIds.pop();
          this.$notify({ title: "成功", message: "操作成功" });
        })
        .catch(() => {
          this.$notify({ title: "错误", message: "网络异常" });
        });
    },
    handleSelectionChange(val) {
      this.ids = [];
      val.forEach(item => {
        this.ids.push(item._id);
      });
    },
    batchDeleteArticle() {
      this.$confirm("此操作将批量邀请学生参加面试, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let url = "/api/api/delivery/many";
          this.$axios.post(url, { ids: this.ids }).then(res => {
            if (res.msg == "ok") {
              this.$notify({
                title: "成功",
                message: "邀请成功",
                type: "success"
              });
            } else {
              this.$notify({
                title: "发生错误",
                message: "后台数据异常"
              });
            }
            this.findAllArticles();
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消邀请"
          });
        });
    },
    closeArticleDialog(formName) {
      this.articleDialog.visible = false;
      if (formName) {
        this.$refs[formName].resetFields();
      }
    },
    openModel(id) {
      this.$confirm("是否要求该生参加面试?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/api/delivery/one", {
              _id: id
            })
            .then(res => {
              if (res.msg == "ok") {
                this.$notify({
                  title: "成功",
                  message: "邀请成功",
                  type: "success"
                });
              } else {
                this.$notify({
                  title: "错误",
                  message: "无法邀请"
                });
              }
              this.findAllArticles();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消邀请"
          });
        });
    },
    updateSss() {
      // this.userForm.userface = this.imgDataUrl;
      let url = "/api/api/sss/updatesss";
      this.$axios
        .post(url, this.articleDialog.form)
        .then(res => {
          if (res.msg == "ok") {
            this.closeArticleDialog();
            this.$notify({
              title: "成功",
              message: "修改成功",
              type: "success"
            });
            this.findAllArticles();
          } else {
            this.$notify({
              title: "错误",
              message: "修改错误"
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
    },
    saveOrUpdateArticle(formName, type) {
      if (type) {
        this.updateSss();
      } else {
        this.$refs[formName].validate(valid => {
          if (valid) {
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
            let time = year + "-" + month + "-" + day;
            // this.articleDialog.form.source = this.$refs.md.d_render;
            this.articleDialog.form.activeTime = time;
            let url = "/api/api/sss/addsss";
            this.$axios
              .post(url, this.articleDialog.form)
              .then(res => {
                console.log(res);
                if (res.msg == "ok") {
                  this.closeArticleDialog();
                  this.$notify({
                    title: "成功",
                    message: "添加成功",
                    type: "success"
                  });
                  this.findAllArticles();
                } else {
                  this.$notify({
                    title: "错误",
                    message: "添加错误"
                  });
                }
              })
              .catch(error => {
                this.$notify({
                  type: "error",
                  title: "错误",
                  message: "网络异常"
                });
                console.log(error);
              });
          } else {
            return false;
          }
        });
      }
    },
    handleUploadSuccess(response, file, fileList) {
      file.name = response.data.id;
      this.articleDialog.form.fileIds.push(response.data.id);
    },
    toAddArticle(row) {
      if (row) {
        // 处理表单数据
        let c = _.cloneDeep(row);
        // 显示默认缩略图
        this.articleDialog.fileList = c.articleFileVMs.map(item => {
          return {
            name: item.cmsFile.id,
            url: "http://39.108.81.60:8888/group1/" + item.cmsFile.id
          };
        });
        //处理表单数据
        // 依赖栏目   category -> categoryId
        c.categoryId = c.category.id;
        delete c.category;
        // 依赖文件  articleFileVMs -> fileIds
        c.fileIds = c.articleFileVMs.map(item => item.cmsFile.id);
        delete c.articleFileVMs;
        // 取消默认空值
        for (let key in c) {
          let val = c[key];
          if (!val) {
            delete c[key];
          }
        }
        this.articleDialog.form = c;
        this.articleDialog.title = "修改招聘信息";
      } else {
        this.articleDialog.form = {
          liststyle: "style-one",
          fileIds: [],
          categoryId: this.params.categoryId
        };
        this.articleDialog.fileList = [];
        this.articleDialog.title = "添加招聘信息";
      }
      this.articleDialog.visible = true;
    },
    hadleCurrentChange(page) {
      this.params.page = page - 1;
    },
    deleteArticle(id) {
      this.$confirm("此操作将永久删除该信息, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          this.$axios
            .post("/api/api/sss/delsss", {
              id
            })
            .then(res => {
              if (res.msg == "ok") {
                this.$notify({
                  title: "成功",
                  message: "删除成功",
                  type: "success"
                });
              } else {
                this.$notify({
                  title: "错误",
                  message: "无法删除"
                });
              }
              this.findAllArticles();
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    findAllArticles() {
      this.loading = true;
      this.$axios
        .post("/api/api/delivery/findall", {
          pageSize: this.params.pageSize,
          target: this.params.page,
          job: this.params.keywords
        })
        .then(res => {
          console.log(res);
          if (res.msg == 200) {
            this.articles = res.data.data;
            this.total = res.data.total;
            console.log(this.total);
          }
        })
        .catch(error => {
          this.$notify({
            title: "错误",
            message: "网络异常"
          });
        })
        .finally(() => {
          this.loading = false;
        });
    },
    findAllCategories() {
      let url = "/manager/category/findAllCategory";
      axios
        .get(url)
        .then(({ data: result }) => {
          this.categories = result.data;
        })
        .catch(error => {
          this.$notify({
            title: "错误",
            message: "网络异常",
            type: "error"
          });
        });
    }
  }
};
</script>
<style scoped>
i.fa {
  margin: 0 0.3em;
  cursor: pointer;
}
i.fa.fa-trash {
  color: #f56c6c;
}
.table {
  padding: 1em 0 0 0;
}
.page {
  position: absolute;
  bottom: 15%;
  right: 1%;
}
</style>