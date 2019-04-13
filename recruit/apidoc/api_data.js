define({ "api": [
  {
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "optional": false,
            "field": "varname1",
            "description": "<p>No type.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "varname2",
            "description": "<p>With type.</p>"
          }
        ]
      }
    },
    "type": "",
    "url": "",
    "version": "0.0.0",
    "filename": "router/apidoc/main.js",
    "group": "D__HTML5_san_day06_router_apidoc_main_js",
    "groupTitle": "D__HTML5_san_day06_router_apidoc_main_js",
    "name": ""
  },
  {
    "type": "post",
    "url": "/user/login/",
    "title": "登录",
    "name": "Login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>用户名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>用户密码.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>登录成功.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>登录失败.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/email/",
    "title": "获取邮箱验证码",
    "name": "email",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "us",
            "description": "<p>Users unique ID.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>Users unique ID.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>Firstname of the User.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>Lastname of the User.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/email/",
    "title": "获取邮箱验证码",
    "name": "email",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>用户邮箱</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>验证码发送失败.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>验证码已发送.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/reg/",
    "title": "注册",
    "name": "reg",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Users unique 用名.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>注册ok.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>注册失败.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/studer/delstuder/删除学生",
    "title": "",
    "name": "delstuder",
    "group": "studer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>获取id,根据id删除.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>删除失败.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>删除成功.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/studer.js",
    "groupTitle": "studer"
  },
  {
    "type": "post",
    "url": "/studer/fstuder/模糊查询",
    "title": "",
    "name": "fstuder",
    "group": "studer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job",
            "description": "<p>工作.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "target",
            "description": "<p>目标页.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pagesize",
            "description": "<p>一页显示多少条.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "total",
            "description": "<p>总条数.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>模糊查询成功.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>模糊查询失败.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/studer.js",
    "groupTitle": "studer"
  },
  {
    "type": "post",
    "url": "/studer/getstuderID/",
    "title": "获取学生id",
    "name": "getstuderID",
    "group": "studer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>获取id值.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>查询成功.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>查询失败.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/studer.js",
    "groupTitle": "studer"
  },
  {
    "type": "post",
    "url": "/studer/studer/",
    "title": "插入学生的信息",
    "name": "studer",
    "group": "studer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>用户名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img",
            "description": "<p>图片.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sex",
            "description": "<p>性别.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "language",
            "description": "<p>语言.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "time",
            "description": "<p>时间.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "major",
            "description": "<p>专业.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job",
            "description": "<p>工作.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "like",
            "description": "<p>喜欢.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>数据插入失败.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>数据插入成功.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/studer.js",
    "groupTitle": "studer"
  },
  {
    "type": "post",
    "url": "/studer/findstuder/",
    "title": "查找学生的信息",
    "name": "studer",
    "group": "studer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pagesiz",
            "description": "<p>第一页有几条.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "target",
            "description": "<p>目标页.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "total",
            "description": "<p>送条数.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>请求ok.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>请求失败.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/studer.js",
    "groupTitle": "studer"
  },
  {
    "type": "post",
    "url": "/studer/upstuder/",
    "title": "更新学生数据",
    "name": "upstuder",
    "group": "studer",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>姓名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "img",
            "description": "<p>图片.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "sex",
            "description": "<p>性别.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>邮箱.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "language",
            "description": "<p>语言.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "time",
            "description": "<p>时间.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "major",
            "description": "<p>专业.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "job",
            "description": "<p>工作.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "like",
            "description": "<p>喜欢.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>id.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>更新成功.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>更新失败.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/studer.js",
    "groupTitle": "studer"
  },
  {
    "type": "post",
    "url": "/upimg/img",
    "title": "文件上传",
    "name": "img",
    "group": "upimg",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "test",
            "description": "<p>单文件上传(single).</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>错误码.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "msg",
            "description": "<p>上传成功.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "path",
            "description": "<p>图片路径.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "router/upimg.js",
    "groupTitle": "upimg"
  }
] });
