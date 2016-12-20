/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/1c1124c58b4f6dd0a330537a451b7490", [], function(__weex_require__, exports, __weex_module__){

	;  __webpack_require__(1);  __weex_module__.exports = {    data: function () {return {      navBarHeight:128,      baseURL:'',      dir:'',       //网络获取的数据      datas:{},      users:{},      fances:0,      contents:[],      styles:[],      carserialData:[],      commentData:{},      commentList:[],      show:false,      newsId:0,      tableDatas:[],      screenW:0,      //相关新闻      relatedList:[],     images:[{url:'http://image.bitautoimg.com/wapimg-216-144/appimage/cms/20161219/w480_h320_2eeb3bfca665445ea89f792b0d0e0df5.jpg'},{url:'http://image.bitautoimg.com/wapimg-216-144/appimage/cms/20161219/w480_h320_fbdeb99a5986437ba35c5f2f2bc7a2d7.jpg'},      {url:'http://image.bitautoimg.com/wapimg-216-144/appimage/cms/20161219/w480_h320_28b3175dd16949e0b3a47b9d1335e1ba.jpg'}],    }},    ready:function(){        var self = this;        self.requestData();        self.requestRealData();        self.requestRelatedNewsData();         self.baseConfig();    },    created: function() {      var self = this;      var config  = self.$getConfig();      var url = config.bundleUrl;      self.title = decodeURIComponent(this._getUrlParam(url, 'icar_title'));      self.newsId = decodeURIComponent(this._getUrlParam(url,'newsId'));      self.loadBaseUrl();      //宽度      //在5s或se上获取的宽度用在slider上有bug，宽度不够      if(config.env.deviceWidth == 640){        self.screenW = 750;      }else{        self.screenW = config.env.deviceWidth;      }    },    methods: {      loadBaseUrl : function(){            var bundleUrl = this.$getConfig().bundleUrl;            bundleUrl = new String(bundleUrl);            var nativeBase;            var isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;            var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('VXCar.app') > 0;            if (isAndroidAssets) {              nativeBase = 'file://assets/';            }            else if (isiOSAssets) {              nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);            }            else {              var host = 'localhost:12500';              var matches = /\/\/([^\/]+?)\//.exec(this.$getConfig().bundleUrl);              if (matches && matches.length >= 2) {                host = matches[1];              }              nativeBase = 'http://' + host + '/' + this.dir + '/dist/';            }            var h5Base = './index.html?page=./' + this.dir + '/dist/';            //Native端            var base = nativeBase;            //H5端            if (typeof window === 'object') {              base = h5Base;            }            this.baseURL = base;                 },      //评论数据      requestRealData : function(){        var self = this          var stream = __weex_require__('@weex-module/stream')          var modal = __weex_require__('@weex-module/modal')          var GET_URL = 'http://api.ycapp.yiche.com/appnews/GetStructRealData?newsId='+self.newsId+'&type=11&mediaId=(null)&deviceId=9A69644FB98984C33214173968CA602D&plat=2&voteids=(null)'          stream.fetch({            method: 'GET',            url: GET_URL,            type: 'json'          }, function(ret) {                              if (typeof ret == 'string') {              ret = JSON.parse(ret)            }            if (!ret.ok) {              modal.alert({                message: '获取数据失败',                okTitle: '好'              })            } else {                           if (typeof ret.data == 'string') {                ret.data = JSON.parse(ret.data)              }                              self.commentData = ret.data.data.commentData;                self.commentList = ret.data.data.commentData.commentList;                          }          },function(response){            // self.toastTips('get:' + GET_URL);          });      },      requestData : function(){         var self = this          var stream = __weex_require__('@weex-module/stream')          var modal = __weex_require__('@weex-module/modal')          var GET_URL = 'http://api.ycapp.yiche.com/appnews/GetStructNews?newsId='+self.newsId+'&ts=20161215074823&plat=2&theme=0&version=7.6'          self.toast('加载数据中...')          stream.fetch({            method: 'GET',            url: GET_URL,            type: 'json'          }, function(ret) {                             if (typeof ret == 'string') {              ret = JSON.parse(ret)            }            if (!ret.ok) {              modal.alert({                message: '获取数据失败',                okTitle: '好'              })            } else {                           if (typeof ret.data == 'string') {                ret.data = JSON.parse(ret.data)              }                            self.datas = ret.data.data;              if (ret.data.data.hasOwnProperty("user") ) {                self.users = ret.data.data.user;                //保留两位小数                self.fances = (ret.data.data.user.fansCount / 10000).toFixed(2);              }                            //内容              self.contents = ret.data.data.content;              //相关车型              self.carserialData = ret.data.data.carserialData;                          }          },function(response){            // self.toastTips('get:' + GET_URL);          });      },      //相关新闻      requestRelatedNewsData : function(){         var self = this          var stream = __weex_require__('@weex-module/stream')          var modal = __weex_require__('@weex-module/modal')          var GET_URL = 'http://extapi.ycapp.yiche.com/appnews/GetAllRelatedNewsList?DeviceId=9A69644FB98984C33214173968CA602D&newsId='+self.newsId+'&NewsType=0&Num=3&ts=20161220114255&plat=2'          stream.fetch({            method: 'GET',            url: GET_URL,            type: 'json'          }, function(ret) {                             if (typeof ret == 'string') {              ret = JSON.parse(ret)            }            if (!ret.ok) {              modal.alert({                message: '获取数据失败',                okTitle: '好'              })            } else {                           if (typeof ret.data == 'string') {                ret.data = JSON.parse(ret.data)              }                            self.relatedList = ret.data.data.list;                                       }          },function(response){            // self.toastTips('get:' + GET_URL);          });      },       toast: function(msg, duration) {        duration = duration || 6;        var modal = __weex_require__('@weex-module/modal');        modal.toast({          'message': msg,          'duration': duration        });      },      //查看更多评论      commentDetail : function(){        this.push();      },      readMore : function(){        this.pudh();      },      //评论按钮点击事件      commentClicked : function(){         var self = this;         self.show = true;      },      //取消评论      cancelClicked : function(){          var self = this;        self.show = false;      },      //发布评论      commentConfirmClicked : function(){          var self = this;          self.show = false;      },      //输入框事件监听      change: function() {        this.toast('hehehehehehe');      },      input: function() {        this.toast('hehehehehehe');      },      //点击相关车型之后      toutiaoClicked : function(e){         var self = this          var dic = self.relatedList[e];          var newsId = dic.newsId;          var params = {            'url':  self.baseURL + 'contentDetail.js?icar_title=详情&newsId=' + newsId,            'animated' : 'true',          }         self.$call('navigator','push',params, function () {});      },      //询问底价点击事件      askedPriceClicked : function(){          var self = this          var params = {            'url':  self.baseURL + 'askedPrice.js',            'animated' : 'true',          }         self.$call('navigator','push',params, function () {});      },       push: function() {        var vm = this;        var params = {          'url':  vm.baseURL + 'comment.js?icar_title=评论&newsId=' + vm.newsId,          'animated' : 'true',        }        vm.$call('navigator','push',params, function () {});      },       _getUrl: function(url, key){                var isExits = url.indexOf(key);                if(isExits > -1){                    return url.split('url=')[1];                }      },      _getUrlParam: function(url, key){          var reg = new RegExp('[?|&]' + key + '=([^&]+)');          var match = url.match(reg);          return match && match[1];      },      baseConfig: function(){            var config  = this.$getConfig();            this.$on('naviBar.leftItem.click',function(e){                //pop back                var params = {                    'animated' : 'true',                }                var navigator = __weex_require__('@weex-module/navigator');                navigator.pop(params, function(e) {});            });      },    },  }
	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "wxc-navpage",
	  "attr": {
	    "dataRole": "none",
	    "height": function () {return this.navBarHeight},
	    "backgroundColor": "rgb(246,246,246)",
	    "title": function () {return this.title},
	    "titleColor": "rgb(44,112,223)",
	    "leftItemSrc": "http://7xwl0f.com1.z0.glb.clouddn.com/ic_arrow_nor@2x.png"
	  },
	  "children": [
	    {
	      "type": "list",
	      "children": [
	        {
	          "type": "cell",
	          "append": "tree",
	          "shown": function () {return this.datas.user},
	          "style": {
	            "height": 300,
	            "marginTop": 30
	          },
	          "children": [
	            {
	              "type": "div",
	              "style": {
	                "height": 125,
	                "justifyContent": "center"
	              },
	              "children": [
	                {
	                  "type": "text",
	                  "style": {
	                    "fontSize": 45,
	                    "lines": 3,
	                    "height": 125,
	                    "marginLeft": 20,
	                    "marginRight": 30
	                  },
	                  "attr": {
	                    "value": function () {return this.datas.title}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "style": {
	                "flexDirection": "row",
	                "height": 125
	              },
	              "children": [
	                {
	                  "type": "div",
	                  "style": {
	                    "flex": 0.2,
	                    "alignItems": "center",
	                    "justifyContent": "center"
	                  },
	                  "children": [
	                    {
	                      "type": "image",
	                      "attr": {
	                        "src": function () {return this.users.userAvatar}
	                      },
	                      "style": {
	                        "height": 110,
	                        "width": 110,
	                        "borderRadius": 55
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "flex": 0.8,
	                    "justifyContent": "center"
	                  },
	                  "children": [
	                    {
	                      "type": "text",
	                      "style": {
	                        "fontSize": 35,
	                        "color": "#0000FF",
	                        "flex": 0.5,
	                        "lines": 1
	                      },
	                      "attr": {
	                        "value": function () {return this.datas.src}
	                      }
	                    },
	                    {
	                      "type": "text",
	                      "style": {
	                        "fontSize": 32,
	                        "color": "#808080",
	                        "flex": 0.5,
	                        "lines": 1
	                      },
	                      "attr": {
	                        "value": function () {return '已有' + (this.fances) + '万人关注 ' + (this.datas.publishTime)}
	                      }
	                    }
	                  ]
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "shown": function () {return !this.datas.user},
	          "style": {
	            "height": 175,
	            "marginTop": 30
	          },
	          "children": [
	            {
	              "type": "div",
	              "style": {
	                "height": 125,
	                "justifyContent": "center"
	              },
	              "children": [
	                {
	                  "type": "text",
	                  "style": {
	                    "fontSize": 45,
	                    "lines": 3,
	                    "height": 125,
	                    "marginLeft": 20,
	                    "marginRight": 30
	                  },
	                  "attr": {
	                    "value": function () {return this.datas.title}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "style": {
	                "flexDirection": "row",
	                "height": 50,
	                "alignItems": "center"
	              },
	              "children": [
	                {
	                  "type": "text",
	                  "style": {
	                    "color": "#808080",
	                    "fontSize": 30,
	                    "marginLeft": 30
	                  },
	                  "attr": {
	                    "value": function () {return (this.datas.src) + ' ' + (this.datas.publishTime)}
	                  }
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "repeat": function () {return this.contents},
	          "style": {
	            "marginTop": function () {return !this.datas.user?30:0}
	          },
	          "children": [
	            {
	              "type": "div",
	              "shown": function () {return this.type==1},
	              "style": {
	                "marginTop": 30
	              },
	              "children": [
	                {
	                  "type": "text",
	                  "style": {
	                    "fontSize": 40,
	                    "marginLeft": 30,
	                    "marginRight": 30,
	                    "fontWeight": "normal",
	                    "fontStyle": "normal"
	                  },
	                  "attr": {
	                    "value": function () {return this.content}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "shown": function () {return this.type==2},
	              "style": {
	                "justifyContent": "center",
	                "alignItems": "center",
	                "marginTop": 15
	              },
	              "children": [
	                {
	                  "type": "image",
	                  "attr": {
	                    "src": function () {return this.content},
	                    "resize": "cover"
	                  },
	                  "style": {
	                    "height": function () {return this.style[0].height},
	                    "width": function () {return this.style[0].width}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "shown": function () {return this.type==200},
	              "style": {
	                "marginTop": 15
	              },
	              "children": [
	                {
	                  "type": "div",
	                  "style": {
	                    "flexDirection": "row",
	                    "marginLeft": 0,
	                    "justifyContent": "center",
	                    "alignContent": "center"
	                  },
	                  "children": [
	                    {
	                      "type": "image",
	                      "attr": {
	                        "src": function () {return this.content},
	                        "resize": "cover"
	                      },
	                      "style": {
	                        "height": function () {return this.style[0].height},
	                        "width": function () {return this.style[0].width}
	                      }
	                    }
	                  ]
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "shown": function () {return this.type==3},
	              "style": {
	                "marginTop": 30
	              },
	              "children": [
	                {
	                  "type": "div",
	                  "repeat": {
	                    "expression": function () {return this.tableData.content},
	                    "value": "item"
	                  },
	                  "children": [
	                    {
	                      "type": "div",
	                      "style": {
	                        "flexDirection": "row"
	                      },
	                      "children": [
	                        {
	                          "type": "div",
	                          "repeat": {
	                            "expression": function () {return this.item},
	                            "value": "dic"
	                          },
	                          "style": {
	                            "justifyContent": "center"
	                          },
	                          "children": [
	                            {
	                              "type": "div",
	                              "style": {
	                                "alignItems": "center",
	                                "justifyContent": "center",
	                                "alignContent": "center",
	                                "width": function () {return this.screenW/this.item.length},
	                                "marginLeft": 0
	                              },
	                              "children": [
	                                {
	                                  "type": "text",
	                                  "style": {
	                                    "fontSize": 30
	                                  },
	                                  "attr": {
	                                    "value": function () {return this.dic.content}
	                                  }
	                                }
	                              ]
	                            }
	                          ]
	                        }
	                      ]
	                    },
	                    {
	                      "type": "div",
	                      "style": {
	                        "backgroundColor": "rgb(235,235,235)",
	                        "height": 1
	                      }
	                    }
	                  ]
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "style": {
	            "height": 50,
	            "backgroundColor": "rgb(235,235,235)",
	            "marginTop": 45
	          }
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "style": {
	            "height": 100,
	            "alignItems": "center",
	            "flexDirection": "row",
	            "marginTop": 30
	          },
	          "children": [
	            {
	              "type": "div",
	              "style": {
	                "height": 55,
	                "width": 8,
	                "backgroundColor": "#0000FF"
	              }
	            },
	            {
	              "type": "text",
	              "style": {
	                "fontSize": 35,
	                "color": "#808080",
	                "left": 30
	              },
	              "attr": {
	                "value": "相关新闻"
	              }
	            },
	            {
	              "type": "div",
	              "style": {
	                "backgroundColor": "rgb(237,237,237)",
	                "height": 1,
	                "left": 0,
	                "right": 0,
	                "bottom": 0,
	                "position": "absolute"
	              }
	            }
	          ]
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "repeat": function () {return this.relatedList},
	          "style": {
	            "marginTop": 35
	          },
	          "events": {
	            "click": function ($event) {this.toutiaoClicked(this.$index,$event)}
	          },
	          "children": [
	            {
	              "type": "div",
	              "shown": function () {return this.type!=23},
	              "style": {
	                "height": 200,
	                "flexDirection": "row"
	              },
	              "children": [
	                {
	                  "type": "div",
	                  "style": {
	                    "flex": 0.3,
	                    "justifyContent": "center",
	                    "alignContent": "center",
	                    "alignItems": "center"
	                  },
	                  "children": [
	                    {
	                      "type": "image",
	                      "attr": {
	                        "src": function () {return this.picCover},
	                        "resize": "cover"
	                      },
	                      "style": {
	                        "width": 200,
	                        "height": 150
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "flex": 0.7,
	                    "justifyContent": "center"
	                  },
	                  "children": [
	                    {
	                      "type": "div",
	                      "style": {
	                        "height": 150
	                      },
	                      "children": [
	                        {
	                          "type": "div",
	                          "style": {
	                            "flex": 0.7,
	                            "justifyContent": "center"
	                          },
	                          "children": [
	                            {
	                              "type": "text",
	                              "style": {
	                                "fontSize": 35,
	                                "marginLeft": 15,
	                                "marginRight": 15,
	                                "textAlign": "left",
	                                "lines": 3,
	                                "height": 100
	                              },
	                              "attr": {
	                                "value": function () {return this.title}
	                              }
	                            }
	                          ]
	                        },
	                        {
	                          "type": "div",
	                          "style": {
	                            "flexDirection": "row",
	                            "flex": 0.3
	                          },
	                          "children": [
	                            {
	                              "type": "div",
	                              "style": {
	                                "flex": 0.7,
	                                "justifyContent": "center"
	                              },
	                              "children": [
	                                {
	                                  "type": "text",
	                                  "style": {
	                                    "marginLeft": 15,
	                                    "marginRight": 5,
	                                    "fontSize": 25,
	                                    "color": "#808080"
	                                  },
	                                  "attr": {
	                                    "value": function () {return this.src}
	                                  }
	                                }
	                              ]
	                            },
	                            {
	                              "type": "div",
	                              "style": {
	                                "flex": 0.3,
	                                "justifyContent": "center",
	                                "flexDirection": "row",
	                                "alignItems": "center"
	                              },
	                              "children": [
	                                {
	                                  "type": "image",
	                                  "attr": {
	                                    "src": "http://7xwl0f.com1.z0.glb.clouddn.com/comment_comunity_ngt@2x.png"
	                                  },
	                                  "style": {
	                                    "height": 25,
	                                    "width": 25
	                                  }
	                                },
	                                {
	                                  "type": "text",
	                                  "style": {
	                                    "marginRight": 15,
	                                    "marginLeft": 15,
	                                    "fontSize": 25,
	                                    "color": "#808080"
	                                  },
	                                  "attr": {
	                                    "value": function () {return this.commentCount}
	                                  }
	                                }
	                              ]
	                            }
	                          ]
	                        }
	                      ]
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "backgroundColor": "rgb(237,237,237)",
	                    "height": 1,
	                    "left": 0,
	                    "right": 0,
	                    "bottom": 0,
	                    "position": "absolute"
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "shown": function () {return this.type==23},
	              "style": {
	                "height": 310
	              },
	              "events": {
	                "click": function ($event) {this.toutiaoClicked(this.$index,$event)}
	              },
	              "children": [
	                {
	                  "type": "div",
	                  "style": {
	                    "height": 70,
	                    "justifyContent": "center",
	                    "alignContent": "center"
	                  },
	                  "children": [
	                    {
	                      "type": "text",
	                      "style": {
	                        "fontSize": 35,
	                        "lines": 2,
	                        "marginLeft": 15,
	                        "marginRight": 15
	                      },
	                      "attr": {
	                        "value": function () {return this.title}
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "height": 170,
	                    "flexDirection": "row"
	                  },
	                  "children": [
	                    {
	                      "type": "div",
	                      "repeat": function () {return this.images},
	                      "style": {
	                        "alignContent": "center",
	                        "justifyContent": "center",
	                        "alignItems": "center"
	                      },
	                      "children": [
	                        {
	                          "type": "image",
	                          "attr": {
	                            "src": function () {return this.url},
	                            "resize": "cover"
	                          },
	                          "style": {
	                            "marginLeft": 15,
	                            "height": 150,
	                            "width": function () {return this.screenW/this.images.length-20}
	                          }
	                        }
	                      ]
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "height": 70,
	                    "justifyContent": "center",
	                    "flexDirection": "row"
	                  },
	                  "children": [
	                    {
	                      "type": "div",
	                      "style": {
	                        "flex": 0.6,
	                        "justifyContent": "center"
	                      },
	                      "children": [
	                        {
	                          "type": "text",
	                          "style": {
	                            "left": 15,
	                            "lines": 1,
	                            "textAlign": "left",
	                            "color": "#808080"
	                          },
	                          "attr": {
	                            "value": function () {return this.src}
	                          }
	                        }
	                      ]
	                    },
	                    {
	                      "type": "div",
	                      "style": {
	                        "flex": 0.4,
	                        "justifyContent": "center"
	                      },
	                      "children": [
	                        {
	                          "type": "text",
	                          "style": {
	                            "right": 15,
	                            "lines": 1,
	                            "textAlign": "right",
	                            "color": "#808080"
	                          },
	                          "attr": {
	                            "value": function () {return (this.commentCount) + '评论'}
	                          }
	                        }
	                      ]
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "backgroundColor": "rgb(237,237,237)",
	                    "height": 1,
	                    "left": 0,
	                    "right": 0,
	                    "bottom": 0,
	                    "position": "absolute"
	                  }
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "style": {
	            "height": 50,
	            "backgroundColor": "rgb(235,235,235)",
	            "marginTop": 45
	          }
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "style": {
	            "height": 100,
	            "alignItems": "center",
	            "flexDirection": "row",
	            "marginTop": 30
	          },
	          "children": [
	            {
	              "type": "div",
	              "style": {
	                "height": 55,
	                "width": 8,
	                "backgroundColor": "#0000FF"
	              }
	            },
	            {
	              "type": "text",
	              "style": {
	                "fontSize": 35,
	                "color": "#808080",
	                "left": 30
	              },
	              "attr": {
	                "value": "相关车型"
	              }
	            },
	            {
	              "type": "div",
	              "style": {
	                "backgroundColor": "rgb(237,237,237)",
	                "height": 1,
	                "left": 0,
	                "right": 0,
	                "bottom": 0,
	                "position": "absolute"
	              }
	            }
	          ]
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "repeat": function () {return this.carserialData},
	          "style": {
	            "height": 200,
	            "flexDirection": "row"
	          },
	          "children": [
	            {
	              "type": "div",
	              "style": {
	                "flex": 0.3,
	                "justifyContent": "center",
	                "alignContent": "center",
	                "alignItems": "center"
	              },
	              "children": [
	                {
	                  "type": "image",
	                  "attr": {
	                    "src": function () {return this.coverurl},
	                    "resize": "cover"
	                  },
	                  "style": {
	                    "width": 200,
	                    "height": 150
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "style": {
	                "flex": 0.7,
	                "justifyContent": "center"
	              },
	              "children": [
	                {
	                  "type": "div",
	                  "style": {
	                    "height": 150,
	                    "flexDirection": "row"
	                  },
	                  "children": [
	                    {
	                      "type": "div",
	                      "style": {
	                        "flex": 0.6,
	                        "justifyContent": "center"
	                      },
	                      "children": [
	                        {
	                          "type": "text",
	                          "style": {
	                            "fontSize": 40
	                          },
	                          "attr": {
	                            "value": function () {return this.name}
	                          }
	                        },
	                        {
	                          "type": "text",
	                          "style": {
	                            "fontSize": 30,
	                            "color": "#FF0000",
	                            "marginTop": 15
	                          },
	                          "attr": {
	                            "value": function () {return this.price}
	                          }
	                        }
	                      ]
	                    },
	                    {
	                      "type": "div",
	                      "style": {
	                        "flex": 0.4,
	                        "justifyContent": "center"
	                      },
	                      "children": [
	                        {
	                          "type": "wxc-button",
	                          "attr": {
	                            "type": "success",
	                            "size": "small",
	                            "value": "询问底价"
	                          },
	                          "events": {
	                            "click": "askedPriceClicked"
	                          },
	                          "style": {
	                            "backgroundColor": "rgb(44,112,223)",
	                            "borderColor": "rgb(44,112,223)",
	                            "width": 180,
	                            "height": 80
	                          }
	                        }
	                      ]
	                    }
	                  ]
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "style": {
	                "backgroundColor": "rgb(237,237,237)",
	                "height": 1,
	                "left": 0,
	                "right": 0,
	                "bottom": 0,
	                "position": "absolute"
	              }
	            }
	          ]
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "style": {
	            "height": 40,
	            "backgroundColor": "rgb(235,235,235)"
	          }
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "style": {
	            "height": 100,
	            "alignItems": "center",
	            "flexDirection": "row"
	          },
	          "children": [
	            {
	              "type": "div",
	              "style": {
	                "height": 55,
	                "width": 8,
	                "backgroundColor": "#0000FF"
	              }
	            },
	            {
	              "type": "text",
	              "style": {
	                "fontSize": 35,
	                "color": "#808080",
	                "left": 30
	              },
	              "attr": {
	                "value": "最新评论"
	              }
	            }
	          ]
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "repeat": function () {return this.commentList},
	          "children": [
	            {
	              "type": "div",
	              "style": {
	                "flexDirection": "row"
	              },
	              "children": [
	                {
	                  "type": "div",
	                  "style": {
	                    "flex": 0.2,
	                    "alignContent": "center",
	                    "alignItems": "center",
	                    "marginTop": 30
	                  },
	                  "children": [
	                    {
	                      "type": "image",
	                      "attr": {
	                        "src": function () {return this.user.userAvatar}
	                      },
	                      "style": {
	                        "height": 80,
	                        "width": 80,
	                        "borderRadius": 40
	                      }
	                    }
	                  ]
	                },
	                {
	                  "type": "div",
	                  "style": {
	                    "flex": 0.8,
	                    "marginTop": 30
	                  },
	                  "children": [
	                    {
	                      "type": "div",
	                      "style": {
	                        "height": 50,
	                        "flexDirection": "row"
	                      },
	                      "children": [
	                        {
	                          "type": "text",
	                          "style": {
	                            "fontSize": 33,
	                            "color": "#808080"
	                          },
	                          "attr": {
	                            "value": function () {return this.user.nickName}
	                          }
	                        },
	                        {
	                          "type": "image",
	                          "attr": {
	                            "src": "http://7xwl0f.com1.z0.glb.clouddn.com/zhongdaxingche_night_off@2x.png"
	                          },
	                          "style": {
	                            "height": 25,
	                            "width": 75,
	                            "marginLeft": 8
	                          }
	                        }
	                      ]
	                    },
	                    {
	                      "type": "div",
	                      "style": {
	                        "fontSize": 35,
	                        "marginTop": 15
	                      },
	                      "children": [
	                        {
	                          "type": "text",
	                          "attr": {
	                            "value": function () {return this.content}
	                          }
	                        }
	                      ]
	                    },
	                    {
	                      "type": "div",
	                      "style": {
	                        "flexDirection": "row",
	                        "marginTop": 30
	                      },
	                      "children": [
	                        {
	                          "type": "div",
	                          "style": {
	                            "flex": 0.8,
	                            "justifyContent": "center"
	                          },
	                          "children": [
	                            {
	                              "type": "text",
	                              "style": {
	                                "height": 30,
	                                "marginRight": 15,
	                                "fontSize": 25,
	                                "color": "#808080"
	                              },
	                              "attr": {
	                                "value": function () {return this.createtime}
	                              }
	                            }
	                          ]
	                        },
	                        {
	                          "type": "div",
	                          "style": {
	                            "flex": 0.2,
	                            "justifyContent": "center"
	                          },
	                          "children": [
	                            {
	                              "type": "image",
	                              "attr": {
	                                "src": "http://7xwl0f.com1.z0.glb.clouddn.com/comment_comunity_ngt@2x.png"
	                              },
	                              "style": {
	                                "height": 35,
	                                "width": 35,
	                                "marginRight": 15
	                              }
	                            }
	                          ]
	                        }
	                      ]
	                    }
	                  ]
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "style": {
	                "height": 30,
	                "marginTop": 0
	              }
	            },
	            {
	              "type": "div",
	              "style": {
	                "backgroundColor": "rgb(237,237,237)",
	                "height": 1,
	                "left": 0,
	                "right": 0,
	                "bottom": 0,
	                "position": "absolute"
	              }
	            }
	          ]
	        },
	        {
	          "type": "cell",
	          "append": "tree",
	          "style": {
	            "height": 120,
	            "justifyContent": "center",
	            "alignContent": "center",
	            "alignItems": "center"
	          },
	          "children": [
	            {
	              "type": "text",
	              "style": {
	                "fontSize": 35,
	                "color": "rgb(44,112,223)"
	              },
	              "events": {
	                "click": "commentDetail"
	              },
	              "attr": {
	                "value": function () {return '查看更多评论(共' + (this.commentData.count) + '条) >'}
	              }
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "style": {
	        "height": 120,
	        "backgroundColor": "rgb(246,246,246)",
	        "flexDirection": "row"
	      },
	      "children": [
	        {
	          "type": "div",
	          "style": {
	            "flex": 0.4,
	            "justifyContent": "center",
	            "marginLeft": 15,
	            "marginRight": 15
	          },
	          "children": [
	            {
	              "type": "div",
	              "style": {
	                "backgroundColor": "#FFFFFF",
	                "borderRadius": 10,
	                "justifyContent": "center",
	                "height": 80
	              },
	              "events": {
	                "click": "commentClicked"
	              },
	              "children": [
	                {
	                  "type": "text",
	                  "style": {
	                    "fontSize": 30,
	                    "color": "#808080",
	                    "marginLeft": 15
	                  },
	                  "attr": {
	                    "value": "发射评论吧..."
	                  }
	                }
	              ]
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "style": {
	            "flex": 0.6,
	            "flexDirection": "row",
	            "justifyContent": "center",
	            "alignItems": "center"
	          },
	          "children": [
	            {
	              "type": "div",
	              "style": {
	                "flex": 0.4,
	                "flexDirection": "row",
	                "justifyContent": "center"
	              },
	              "events": {
	                "click": "commentDetail"
	              },
	              "children": [
	                {
	                  "type": "image",
	                  "attr": {
	                    "src": "http://7xwl0f.com1.z0.glb.clouddn.com/comment_comunity_nor_highlight@2x.png"
	                  },
	                  "style": {
	                    "height": 40,
	                    "width": 40
	                  }
	                },
	                {
	                  "type": "text",
	                  "style": {
	                    "fontSize": 28,
	                    "color": "rgb(44,112,223)",
	                    "marginLeft": 5,
	                    "lines": 1,
	                    "height": 40
	                  },
	                  "attr": {
	                    "value": function () {return this.commentData.count}
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "style": {
	                "flex": 0.3,
	                "flexDirection": "row",
	                "justifyContent": "center"
	              },
	              "children": [
	                {
	                  "type": "image",
	                  "attr": {
	                    "src": "http://7xwl0f.com1.z0.glb.clouddn.com/newsDetail_ic_share@2x.png"
	                  },
	                  "style": {
	                    "height": 40,
	                    "width": 40
	                  }
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "style": {
	                "flex": 0.3,
	                "flexDirection": "row",
	                "justifyContent": "center"
	              },
	              "children": [
	                {
	                  "type": "image",
	                  "attr": {
	                    "src": "http://7xwl0f.com1.z0.glb.clouddn.com/newsDetail_ic_config@2x.png"
	                  },
	                  "style": {
	                    "height": 40,
	                    "width": 40
	                  }
	                }
	              ]
	            }
	          ]
	        }
	      ]
	    },
	    {
	      "type": "div",
	      "shown": function () {return this.show},
	      "style": {
	        "justifyContent": "center",
	        "backgroundColor": "rgb(171,171,171)",
	        "position": "fixed",
	        "opacity": 0.8,
	        "filter": "alpha(opacity=40)",
	        "zIndex": 99,
	        "left": 0,
	        "top": 0,
	        "bottom": 0,
	        "right": 0
	      }
	    },
	    {
	      "type": "div",
	      "shown": function () {return this.show},
	      "style": {
	        "justifyContent": "center",
	        "height": 500,
	        "zIndex": 190,
	        "backgroundColor": "rgb(246,246,246)",
	        "position": "fixed",
	        "left": 30,
	        "top": 200,
	        "bottom": 450,
	        "right": 30,
	        "borderRadius": 10
	      },
	      "children": [
	        {
	          "type": "div",
	          "style": {
	            "justifyContent": "center",
	            "alignItems": "center",
	            "flexDirection": "row",
	            "flex": 0.2,
	            "marginTop": 15
	          },
	          "children": [
	            {
	              "type": "text",
	              "style": {
	                "flex": 0.3,
	                "fontSize": 40,
	                "color": "rgb(44,112,223)",
	                "textAlign": "center"
	              },
	              "events": {
	                "click": "cancelClicked"
	              },
	              "attr": {
	                "value": "取消"
	              }
	            },
	            {
	              "type": "text",
	              "style": {
	                "flex": 0.4,
	                "fontSize": 45,
	                "textAlign": "center"
	              },
	              "attr": {
	                "value": "评论"
	              }
	            },
	            {
	              "type": "text",
	              "style": {
	                "flex": 0.3,
	                "fontSize": 40,
	                "textAlign": "center",
	                "color": "#808080"
	              },
	              "events": {
	                "click": "commentConfirmClicked"
	              },
	              "attr": {
	                "value": "发布"
	              }
	            }
	          ]
	        },
	        {
	          "type": "div",
	          "children": [
	            {
	              "type": "textarea",
	              "classList": [
	                "input"
	              ],
	              "attr": {
	                "autofocus": "true",
	                "placeholder": "点击输入...",
	                "input": "input"
	              },
	              "events": {
	                "change": "change"
	              }
	            }
	          ]
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "input": {
	    "fontSize": 35,
	    "height": 370,
	    "marginLeft": 30,
	    "marginRight": 30,
	    "marginBottom": 30,
	    "borderRadius": 7,
	    "backgroundColor": "#FFFFFF"
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/1c1124c58b4f6dd0a330537a451b7490", {
	  "transformerVersion": "0.3.1"
	},undefined)

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/index", [], function(__weex_require__, exports, __weex_module__){
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);

	})

/***/ },
/* 2 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-button", [], function(__weex_require__, exports, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      type: 'default',
	      size: 'large',
	      value: ''
	    }},
	    methods: {
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": function () {return ['btn', 'btn-' + (this.type), 'btn-sz-' + (this.size)]},
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['btn-txt', 'btn-txt-' + (this.type), 'btn-txt-sz-' + (this.size)]},
	      "attr": {
	        "value": function () {return this.value}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "btn": {
	    "marginBottom": 0,
	    "alignItems": "center",
	    "justifyContent": "center",
	    "borderWidth": 1,
	    "borderStyle": "solid",
	    "borderColor": "#333333"
	  },
	  "btn-default": {
	    "color": "rgb(51,51,51)"
	  },
	  "btn-primary": {
	    "backgroundColor": "rgb(40,96,144)",
	    "borderColor": "rgb(40,96,144)"
	  },
	  "btn-success": {
	    "backgroundColor": "rgb(92,184,92)",
	    "borderColor": "rgb(76,174,76)"
	  },
	  "btn-info": {
	    "backgroundColor": "rgb(91,192,222)",
	    "borderColor": "rgb(70,184,218)"
	  },
	  "btn-warning": {
	    "backgroundColor": "rgb(240,173,78)",
	    "borderColor": "rgb(238,162,54)"
	  },
	  "btn-danger": {
	    "backgroundColor": "rgb(217,83,79)",
	    "borderColor": "rgb(212,63,58)"
	  },
	  "btn-link": {
	    "borderColor": "rgba(0,0,0,0)",
	    "borderRadius": 0
	  },
	  "btn-txt-default": {
	    "color": "rgb(51,51,51)"
	  },
	  "btn-txt-primary": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-success": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-info": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-warning": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-danger": {
	    "color": "rgb(255,255,255)"
	  },
	  "btn-txt-link": {
	    "color": "rgb(51,122,183)"
	  },
	  "btn-sz-large": {
	    "width": 300,
	    "height": 100,
	    "paddingTop": 25,
	    "paddingBottom": 25,
	    "paddingLeft": 40,
	    "paddingRight": 40,
	    "borderRadius": 15
	  },
	  "btn-sz-middle": {
	    "width": 240,
	    "height": 80,
	    "paddingTop": 15,
	    "paddingBottom": 15,
	    "paddingLeft": 30,
	    "paddingRight": 30,
	    "borderRadius": 10
	  },
	  "btn-sz-small": {
	    "width": 170,
	    "height": 60,
	    "paddingTop": 12,
	    "paddingBottom": 12,
	    "paddingLeft": 25,
	    "paddingRight": 25,
	    "borderRadius": 7
	  },
	  "btn-txt-sz-large": {
	    "fontSize": 45
	  },
	  "btn-txt-sz-middle": {
	    "fontSize": 35
	  },
	  "btn-txt-sz-small": {
	    "fontSize": 30
	  }
	})
	})

/***/ },
/* 3 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-hn", [], function(__weex_require__, exports, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      level: 1,
	      value: ''
	    }},
	    methods: {}
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": function () {return ['h' + (this.level)]},
	  "style": {
	    "justifyContent": "center"
	  },
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['txt-h' + (this.level)]},
	      "attr": {
	        "value": function () {return this.value}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "h1": {
	    "height": 110,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "h2": {
	    "height": 110,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "h3": {
	    "height": 110,
	    "paddingTop": 20,
	    "paddingBottom": 20
	  },
	  "txt-h1": {
	    "fontSize": 70
	  },
	  "txt-h2": {
	    "fontSize": 52
	  },
	  "txt-h3": {
	    "fontSize": 42
	  }
	})
	})

/***/ },
/* 4 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-list-item", [], function(__weex_require__, exports, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      bgColor: '#ffffff'
	    }},
	    methods: {
	      touchstart: function() {
	        // FIXME android touch
	        // TODO adaptive opposite bgColor
	//        this.bgColor = '#e6e6e6';
	      },
	      touchend: function() {
	        // FIXME android touchend not triggered
	//        this.bgColor = '#ffffff';
	      }
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "item"
	  ],
	  "events": {
	    "touchstart": "touchstart",
	    "touchend": "touchend"
	  },
	  "style": {
	    "backgroundColor": function () {return this.bgColor}
	  },
	  "children": [
	    {
	      "type": "content"
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "item": {
	    "paddingTop": 25,
	    "paddingBottom": 25,
	    "paddingLeft": 35,
	    "paddingRight": 35,
	    "height": 160,
	    "justifyContent": "center",
	    "borderBottomWidth": 1,
	    "borderColor": "#dddddd"
	  }
	})
	})

/***/ },
/* 5 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-panel", [], function(__weex_require__, exports, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      type: 'default',
	      title: '',
	      paddingBody: 20,
	      paddingHead: 20,
	      dataClass: '', // FIXME transfer class
	      border: 0
	    }},
	    ready: function() {
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": function () {return ['panel', 'panel-' + (this.type)]},
	  "style": {
	    "borderWidth": function () {return this.border}
	  },
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['panel-header', 'panel-header-' + (this.type)]},
	      "style": {
	        "paddingTop": function () {return this.paddingHead},
	        "paddingBottom": function () {return this.paddingHead},
	        "paddingLeft": function () {return this.paddingHead*1.5},
	        "paddingRight": function () {return this.paddingHead*1.5}
	      },
	      "attr": {
	        "value": function () {return this.title}
	      }
	    },
	    {
	      "type": "div",
	      "classList": function () {return ['panel-body', 'panel-body-' + (this.type)]},
	      "style": {
	        "paddingTop": function () {return this.paddingBody},
	        "paddingBottom": function () {return this.paddingBody},
	        "paddingLeft": function () {return this.paddingBody*1.5},
	        "paddingRight": function () {return this.paddingBody*1.5}
	      },
	      "children": [
	        {
	          "type": "content"
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "panel": {
	    "marginBottom": 20,
	    "backgroundColor": "#ffffff",
	    "borderColor": "#dddddd",
	    "borderWidth": 1
	  },
	  "panel-primary": {
	    "borderColor": "rgb(40,96,144)"
	  },
	  "panel-success": {
	    "borderColor": "rgb(76,174,76)"
	  },
	  "panel-info": {
	    "borderColor": "rgb(70,184,218)"
	  },
	  "panel-warning": {
	    "borderColor": "rgb(238,162,54)"
	  },
	  "panel-danger": {
	    "borderColor": "rgb(212,63,58)"
	  },
	  "panel-header": {
	    "backgroundColor": "#f5f5f5",
	    "fontSize": 40,
	    "color": "#333333"
	  },
	  "panel-header-primary": {
	    "backgroundColor": "rgb(40,96,144)",
	    "color": "#ffffff"
	  },
	  "panel-header-success": {
	    "backgroundColor": "rgb(92,184,92)",
	    "color": "#ffffff"
	  },
	  "panel-header-info": {
	    "backgroundColor": "rgb(91,192,222)",
	    "color": "#ffffff"
	  },
	  "panel-header-warning": {
	    "backgroundColor": "rgb(240,173,78)",
	    "color": "#ffffff"
	  },
	  "panel-header-danger": {
	    "backgroundColor": "rgb(217,83,79)",
	    "color": "#ffffff"
	  },
	  "panel-body": {}
	})
	})

/***/ },
/* 6 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-tip", [], function(__weex_require__, exports, __weex_module__){

	;
	  __weex_module__.exports = {
	    data: function () {return {
	      type: 'success',
	      value: ''
	    }}
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": function () {return ['tip', 'tip-' + (this.type)]},
	  "children": [
	    {
	      "type": "text",
	      "classList": function () {return ['tip-txt', 'tip-txt-' + (this.type)]},
	      "attr": {
	        "value": function () {return this.value}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "tip": {
	    "paddingLeft": 36,
	    "paddingRight": 36,
	    "paddingTop": 36,
	    "paddingBottom": 36,
	    "borderRadius": 10
	  },
	  "tip-txt": {
	    "fontSize": 28
	  },
	  "tip-success": {
	    "backgroundColor": "#dff0d8",
	    "borderColor": "#d6e9c6"
	  },
	  "tip-txt-success": {
	    "color": "#3c763d"
	  },
	  "tip-info": {
	    "backgroundColor": "#d9edf7",
	    "borderColor": "#bce8f1"
	  },
	  "tip-txt-info": {
	    "color": "#31708f"
	  },
	  "tip-warning": {
	    "backgroundColor": "#fcf8e3",
	    "borderColor": "#faebcc"
	  },
	  "tip-txt-warning": {
	    "color": "#8a6d3b"
	  },
	  "tip-danger": {
	    "backgroundColor": "#f2dede",
	    "borderColor": "#ebccd1"
	  },
	  "tip-txt-danger": {
	    "color": "#a94442"
	  }
	})
	})

/***/ },
/* 7 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-countdown", [], function(__weex_require__, exports, __weex_module__){

	;
	__weex_module__.exports = {
	    data: function () {return {
	        now: 0,
	        remain: 0,
	        time: {
	            elapse: 0,
	            D: '0',
	            DD: '0',
	            h: '0',
	            hh: '00',
	            H: '0',
	            HH: '0',
	            m: '0',
	            mm: '00',
	            M: '0',
	            MM: '0',
	            s: '0',
	            ss: '00',
	            S: '0',
	            SS: '0'
	        },
	        outofview: false
	    }},
	    ready: function() {
	        if (this.remain <= 0) {
	            return;
	        }
	        // this.isWeb = this.$getConfig().env.platform === 'Web';
	        this.now = Date.now();
	        this.nextTick();
	    },
	    methods: {
	        nextTick: function() {
	            if (this.outofview) {
	                setTimeout(this.nextTick.bind(this), 1000);
	            } else {
	                this.time.elapse = parseInt((Date.now() - this.now) / 1000);

	                if (this.calc()) {
	                    this.$emit('tick', Object.assign({}, this.time));
	                    setTimeout(this.nextTick.bind(this), 1000);
	                } else {
	                    this.$emit('alarm', Object.assign({}, this.time));
	                }
	                this._app.updateActions(); 
	            }
	        },
	        format: function(str) {
	            if (str.length >= 2) {
	                return str;
	            } else {
	                return '0' + str;
	            }
	        },
	        calc: function() {
	            var remain = this.remain - this.time.elapse;
	            if (remain < 0) {
	                remain = 0;
	            }
	            this.time.D = String(parseInt(remain / 86400));
	            this.time.DD = this.format(this.time.D);
	            this.time.h = String(parseInt((remain - parseInt(this.time.D) * 86400) / 3600));
	            this.time.hh = this.format(this.time.h);
	            this.time.H = String(parseInt(remain / 3600));
	            this.time.HH = this.format(this.time.H);
	            this.time.m = String(parseInt((remain - parseInt(this.time.H) * 3600) / 60));
	            this.time.mm = this.format(this.time.m);
	            this.time.M = String(parseInt(remain / 60));
	            this.time.MM = this.format(this.time.M);
	            this.time.s = String(remain - parseInt(this.time.M) * 60);
	            this.time.ss = this.format(this.time.s);
	            this.time.S = String(remain);
	            this.time.SS = this.format(this.time.S);
	            // console.log(remain, this.D, this.h, this.hh, this.H, this.HH, this.m, this.MM, this.s, this.ss, this.S, this.SS);
	            return remain > 0;
	        },
	        appeared: function() {
	            this.outofview = false;
	        },
	        disappeared: function() {
	            this.outofview = true;
	        }
	    }
	}

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "style": {
	    "overflow": "hidden",
	    "flexDirection": "row"
	  },
	  "events": {
	    "appear": "appeared",
	    "disappear": "disappeared"
	  },
	  "children": [
	    {
	      "type": "content"
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "wrap": {
	    "overflow": "hidden"
	  }
	})
	})

/***/ },
/* 8 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-marquee", [], function(__weex_require__, exports, __weex_module__){

	;
	__weex_module__.exports = {
	    data: function () {return {
	        step: 0,
	        count: 0,
	        index: 1,
	        duration: 0,
	        interval: 0,
	        outofview: false
	    }},
	    ready: function () {
	        if (this.interval > 0
	                && this.step > 0
	                && this.duration > 0) {
	            this.nextTick();    
	        }
	    },
	    methods: {
	        nextTick: function() {
	            var self = this;
	            if (this.outofview) {
	                setTimeout(self.nextTick.bind(self), self.interval);
	            } else {
	                setTimeout(function() {
	                    self.animation(self.nextTick.bind(self));
	                }, self.interval);
	            }
	        },
	        animation: function(cb) {
	            var self = this;
	            var offset = -self.step * self.index;
	            var $animation = __weex_require__('@weex-module/animation');
	            $animation.transition(this.$el('anim'), {
	              styles: {
	                transform: 'translateY(' + String(offset) + 'px) translateZ(0)'
	              },
	              timingFunction: 'ease',
	              duration: self.duration
	            }, function() {
	                self.index = (self.index + 1) % (self.count);
	                self.$emit('change', {
	                    index: self.index,
	                    count: self.count
	                });
	                cb && cb();
	            });
	        },
	        appeared: function() {
	            this.outofview = false;
	        },
	        disappeared: function() {
	            this.outofview = true;
	        }
	    }
	}

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "wrap"
	  ],
	  "events": {
	    "appear": "appeared",
	    "disappear": "disappeared"
	  },
	  "children": [
	    {
	      "type": "div",
	      "id": "anim",
	      "classList": [
	        "anim"
	      ],
	      "children": [
	        {
	          "type": "content"
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "wrap": {
	    "overflow": "hidden",
	    "position": "relative"
	  },
	  "anim": {
	    "flexDirection": "column",
	    "position": "absolute",
	    "transform": "translateY(0) translateZ(0)"
	  }
	})
	})

/***/ },
/* 9 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-navbar", [], function(__weex_require__, exports, __weex_module__){

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          dataRole: 'navbar',

	          //导航条背景色
	          backgroundColor: 'black',

	          //导航条高度
	          height: 88,

	          //导航条标题 
	          title: "",

	          //导航条标题颜色
	          titleColor: 'black',

	          //右侧按钮图片
	          rightItemSrc: '',

	          //右侧按钮标题
	          rightItemTitle: '',

	          //右侧按钮标题颜色
	          rightItemColor: 'black',

	          //左侧按钮图片
	          leftItemSrc: '',

	          //左侧按钮标题
	          leftItemTitle: '',

	          //左侧按钮颜色
	          leftItemColor: 'black',
	        }},
	        methods: {
	          onclickrightitem: function (e) {
	            this.$dispatch('naviBar.rightItem.click', {});
	          },
	          onclickleftitem: function (e) {
	            this.$dispatch('naviBar.leftItem.click', {});
	          }
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "container"
	  ],
	  "style": {
	    "height": function () {return this.height},
	    "backgroundColor": function () {return this.backgroundColor}
	  },
	  "attr": {
	    "dataRole": function () {return this.dataRole}
	  },
	  "children": [
	    {
	      "type": "text",
	      "classList": [
	        "right-text"
	      ],
	      "style": {
	        "color": function () {return this.rightItemColor}
	      },
	      "attr": {
	        "naviItemPosition": "right",
	        "value": function () {return this.rightItemTitle}
	      },
	      "shown": function () {return !this.rightItemSrc},
	      "events": {
	        "click": "onclickrightitem"
	      }
	    },
	    {
	      "type": "image",
	      "classList": [
	        "right-image"
	      ],
	      "attr": {
	        "naviItemPosition": "right",
	        "src": function () {return this.rightItemSrc}
	      },
	      "shown": function () {return this.rightItemSrc},
	      "events": {
	        "click": "onclickrightitem"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "left-text"
	      ],
	      "style": {
	        "color": function () {return this.leftItemColor}
	      },
	      "attr": {
	        "naviItemPosition": "left",
	        "value": function () {return this.leftItemTitle}
	      },
	      "shown": function () {return !this.leftItemSrc},
	      "events": {
	        "click": "onclickleftitem"
	      }
	    },
	    {
	      "type": "image",
	      "classList": [
	        "left-image"
	      ],
	      "attr": {
	        "naviItemPosition": "left",
	        "src": function () {return this.leftItemSrc}
	      },
	      "shown": function () {return this.leftItemSrc},
	      "events": {
	        "click": "onclickleftitem"
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "center-text"
	      ],
	      "style": {
	        "color": function () {return this.titleColor}
	      },
	      "attr": {
	        "naviItemPosition": "center",
	        "value": function () {return this.title}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "container": {
	    "flexDirection": "row",
	    "position": "fixed",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "width": 750
	  },
	  "right-text": {
	    "position": "absolute",
	    "bottom": 28,
	    "right": 32,
	    "textAlign": "right",
	    "fontSize": 32,
	    "fontFamily": "'Open Sans', sans-serif"
	  },
	  "left-text": {
	    "position": "absolute",
	    "bottom": 28,
	    "left": 32,
	    "textAlign": "left",
	    "fontSize": 32,
	    "fontFamily": "'Open Sans', sans-serif"
	  },
	  "center-text": {
	    "position": "absolute",
	    "bottom": 25,
	    "left": 172,
	    "right": 172,
	    "textAlign": "center",
	    "fontSize": 36,
	    "fontWeight": "bold"
	  },
	  "left-image": {
	    "position": "absolute",
	    "bottom": 20,
	    "left": 28,
	    "width": 50,
	    "height": 50
	  },
	  "right-image": {
	    "position": "absolute",
	    "bottom": 20,
	    "right": 28,
	    "width": 50,
	    "height": 50
	  }
	})
	})

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/wxc-navpage", [], function(__weex_require__, exports, __weex_module__){
	__webpack_require__(9);

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          dataRole: 'navbar',
	          backgroundColor: 'black',
	          height: 88,
	          title: "",
	          titleColor: 'black',
	          rightItemSrc: '',
	          rightItemTitle: '',
	          rightItemColor: 'black',
	          leftItemSrc: '',
	          leftItemTitle: '',
	          leftItemColor: 'black',
	        }}
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "wrapper"
	  ],
	  "children": [
	    {
	      "type": "wxc-navbar",
	      "attr": {
	        "dataRole": function () {return this.dataRole},
	        "height": function () {return this.height},
	        "backgroundColor": function () {return this.backgroundColor},
	        "title": function () {return this.title},
	        "titleColor": function () {return this.titleColor},
	        "leftItemSrc": function () {return this.leftItemSrc},
	        "leftItemTitle": function () {return this.leftItemTitle},
	        "leftItemColor": function () {return this.leftItemColor},
	        "rightItemSrc": function () {return this.rightItemSrc},
	        "rightItemTitle": function () {return this.rightItemTitle},
	        "rightItemColor": function () {return this.rightItemColor}
	      }
	    },
	    {
	      "type": "div",
	      "classList": [
	        "wrapper"
	      ],
	      "style": {
	        "marginTop": function () {return this.height}
	      },
	      "children": [
	        {
	          "type": "content"
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "wrapper": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "width": 750
	  }
	})
	})

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	;__weex_define__("@weex-component/wxc-tabbar", [], function(__weex_require__, exports, __weex_module__){
	__webpack_require__(12);

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          tabItems: [ ],
	          selectedIndex: 0,
	          selectedColor: '#ff0000',
	          unselectedColor: '#000000',
	        }},
	        created: function () {
	          this.selected(this.selectedIndex);

	          this.$on('tabItem.onClick',function(e){
	            var detail= e.detail;
	            this.selectedIndex = detail.index;
	            this.selected(detail.index);

	            var params = {
	              index: detail.index
	            };
	            this.$dispatch('tabBar.onClick', params);
	          });
	        },
	        methods: {
	            selected: function(index) {
	              for(var i = 0; i < this.tabItems.length; i++) {
	                var tabItem = this.tabItems[i];
	                if(i == index){
	                  tabItem.icon = tabItem.selectedImage;
	                  tabItem.titleColor = this.selectedColor;
	                  tabItem.visibility = 'visible';
	                }
	                else {
	                  tabItem.icon = tabItem.image;
	                  tabItem.titleColor = this.unselectedColor;
	                  tabItem.visibility = 'hidden';
	                }
	              }
	            },  
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "wrapper"
	  ],
	  "children": [
	    {
	      "type": "embed",
	      "classList": [
	        "content"
	      ],
	      "style": {
	        "visibility": function () {return this.visibility}
	      },
	      "repeat": function () {return this.tabItems},
	      "attr": {
	        "src": function () {return this.src},
	        "type": "weex"
	      }
	    },
	    {
	      "type": "div",
	      "classList": [
	        "tabbar"
	      ],
	      "append": "tree",
	      "children": [
	        {
	          "type": "wxc-tabitem",
	          "repeat": function () {return this.tabItems},
	          "attr": {
	            "index": function () {return this.index},
	            "icon": function () {return this.icon},
	            "title": function () {return this.title},
	            "titleColor": function () {return this.titleColor}
	          }
	        }
	      ]
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "wrapper": {
	    "width": 750,
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0
	  },
	  "content": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "bottom": 0,
	    "marginTop": 0,
	    "marginBottom": 88
	  },
	  "tabbar": {
	    "flexDirection": "row",
	    "position": "fixed",
	    "bottom": 0,
	    "left": 0,
	    "right": 0,
	    "height": 88
	  }
	})
	})

/***/ },
/* 12 */
/***/ function(module, exports) {

	;__weex_define__("@weex-component/wxc-tabitem", [], function(__weex_require__, exports, __weex_module__){

	;
	    __weex_module__.exports = {
	        data: function () {return {
	          index: 0,
	          title: '',
	          titleColor: '#000000',
	          icon: '',
	          backgroundColor: '#ffffff',
	        }},
	        methods: {
	          onclickitem: function (e) {
	            var vm = this;
	            var params = {
	              index: vm.index
	            };
	            vm.$dispatch('tabItem.onClick', params);
	          }
	        }
	    }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "div",
	  "classList": [
	    "container"
	  ],
	  "style": {
	    "backgroundColor": function () {return this.backgroundColor}
	  },
	  "events": {
	    "click": "onclickitem"
	  },
	  "children": [
	    {
	      "type": "image",
	      "classList": [
	        "top-line"
	      ],
	      "attr": {
	        "src": "http://gtms03.alicdn.com/tps/i3/TB1mdsiMpXXXXXpXXXXNw4JIXXX-640-4.png"
	      }
	    },
	    {
	      "type": "image",
	      "classList": [
	        "tab-icon"
	      ],
	      "attr": {
	        "src": function () {return this.icon}
	      }
	    },
	    {
	      "type": "text",
	      "classList": [
	        "tab-text"
	      ],
	      "style": {
	        "color": function () {return this.titleColor}
	      },
	      "attr": {
	        "value": function () {return this.title}
	      }
	    }
	  ]
	})
	;__weex_module__.exports.style = __weex_module__.exports.style || {}
	;Object.assign(__weex_module__.exports.style, {
	  "container": {
	    "flex": 1,
	    "flexDirection": "column",
	    "alignItems": "center",
	    "justifyContent": "center",
	    "height": 88
	  },
	  "top-line": {
	    "position": "absolute",
	    "top": 0,
	    "left": 0,
	    "right": 0,
	    "height": 2
	  },
	  "tab-icon": {
	    "marginTop": 5,
	    "width": 40,
	    "height": 40
	  },
	  "tab-text": {
	    "marginTop": 5,
	    "textAlign": "center",
	    "fontSize": 20
	  }
	})
	})

/***/ }
/******/ ]);