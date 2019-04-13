define({ "api": [
  {
    "type": "post",
    "url": "/user/login",
    "title": "登录",
    "name": "login",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>登录名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>登录密码.</p>"
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
            "field": "data",
            "description": "<p>登录成功.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>登录失败.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/reg",
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
            "description": "<p>注册名.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "pass",
            "description": "<p>注册密码.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "code",
            "description": "<p>验证码.</p>"
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
            "field": "data",
            "description": "<p>注册成功.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "err",
            "description": "<p>注册失败.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/getcode",
    "title": "验证码",
    "name": "reg",
    "group": "User",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>email.</p>"
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
            "description": "<p>参数错误.</p>"
          },
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "resolve",
            "description": "<p>验证码已发送.</p>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "./user.js",
    "groupTitle": "User"
  },
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
    "filename": "./apidoc/main.js",
    "group": "d__HTML5_san_day06_router_apidoc_main_js",
    "groupTitle": "d__HTML5_san_day06_router_apidoc_main_js",
    "name": ""
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
    "filename": "./upimg.js",
    "groupTitle": "upimg"
  }
] });
