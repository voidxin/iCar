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

	;__weex_define__("@weex-component/98608737c7f5d1236e5b96f51694472f", [], function(__weex_require__, exports, __weex_module__){

	;
	  __webpack_require__(1);
	  
	  __weex_module__.exports = {
	    data: function () {return {
	      navBarHeight: 88,
	      navtitle: 'iCar新闻',
	      dir: '',
	      baseURL: '',
	      screenW: 0,
	      isLoaded: true,
	      page: 1,
	      loadingDisplay: 'hide',
	      refreshDisplay: 'hide',
	      loadingText: 'Loading...',
	      freshFlag:0,
	      itemList: [],
	      //网络获取的数据
	      items:[],
	      loading_display : 'hide',
	      page:1,
	       //多图片的url分割显示还需要优化，这里暂且显示固定的三张图片
	      images:[{url:'http://image.bitautoimg.com/wapimg-216-144/appimage/cms/20161219/w480_h320_2eeb3bfca665445ea89f792b0d0e0df5.jpg'},{url:'http://image.bitautoimg.com/wapimg-216-144/appimage/cms/20161219/w480_h320_fbdeb99a5986437ba35c5f2f2bc7a2d7.jpg'},
	      {url:'http://image.bitautoimg.com/wapimg-216-144/appimage/cms/20161219/w480_h320_28b3175dd16949e0b3a47b9d1335e1ba.jpg'}],
	          
	    }},
	    ready: function (){
	        var self = this;
	        self.requestData();
	    },
	    created: function() {

	      var config  = this.$getConfig();
	      var url = config.bundleUrl;
	      this.title = decodeURIComponent(this._getUrlParam(url, 'icar_title'));

	      //宽度
	      //在5s或se上获取的宽度用在slider上有bug，宽度不够
	      if(config.env.deviceWidth == 640){
	        this.screenW = 750;
	      }else{
	        this.screenW = config.env.deviceWidth;
	      }
	      
	     

	      this.loadBaseUrl();

	      this.$getConfig(function (config) {
	        var env = config.env;
	        if(env.platform == 'iOS'){
	          var scale = env.scale;
	          var deviceWidth = env.deviceWidth / scale;
	          this.navBarHeight = 64.0 * 750.0 / deviceWidth;
	        }
	      }.bind(this));

	      this.$on('naviBar.rightItem.click',function(e){
	        duration = 2;
	        this.$call('modal', 'toast', {
	          'message': 'naviBar.rightItem.click',
	          'duration': duration
	          });
	      });

	      this.$on('naviBar.leftItem.click',function(e){
	        duration = 2;
	        this.$call('modal', 'toast', {
	          'message': 'naviBar.leftItem.click',
	          'duration': duration
	          });
	      });
	    },
	    methods: {
	      requestData : function(){
	         var self = this
	          var stream = __weex_require__('@weex-module/stream')
	          var modal = __weex_require__('@weex-module/modal')
	          var GET_URL = 'http://api.ycapp.yiche.com/appnews/toutiaov64/?page='+self.page+'&length=20&platform=2'
	          if (self.freshFlag == 0) {
	             self.toast('加载数据中...')
	          }
	         
	          stream.fetch({
	            method: 'GET',
	            url: GET_URL,
	            type: 'json'
	          }, function(ret) {  
	              if (self.freshFlag == 0) {
	                self.toast('数据加载完成') 
	              }
	              
	              if (typeof ret == 'string') {
	              ret = JSON.parse(ret)
	            }
	            if (!ret.ok) {
	              modal.alert({
	                message: '获取数据失败',
	                okTitle: '好'
	              })
	            } else {
	             
	              if (typeof ret.data == 'string') {
	                ret.data = JSON.parse(ret.data)
	              }
	              
	              if (self.page == 1) {
	                self.items = ret.data.data.list;
	                self.itemList.push(self.items[0]);
	                 self.itemList.push(self.items[1]);
	                  self.itemList.push(self.items[2]);
	                  self.items.splice(0,3);
	              }else{
	                for (var i = 0; i < ret.data.data.list.length; i++) {
	                  self.items.push(ret.data.data.list[i]);
	                }
	              }
	              //多图片的url分割显示还需要优化，这里暂且显示固定的三张图片
	              // for (var i = 0; i < self.items.length; i++) {
	              //    var dic = self.items[i];
	              //    var picCover = dic.picCover;
	              //    var type = dic.type;
	              //    var picArr = new Array();
	              //    if (type == 3) {
	              //     picArr = picCover.split(";");
	              //     var imageDic = {};
	              //     for (var j = 0; j < picArr.length; j++) {
	              //        var urlDic = {"url" : picArr[j]};
	              //        var key = 'url';
	              //        imageDic[key] = urlDic;
	              //     }
	              //     // var key = 'imageGroups'
	              //     // dic[key] = imageDic;
	              //     // self.items.splice(i,1,dic);
	              //      self.images.push(imageDic);
	              //    }
	              // }

	              
	            }
	          },function(response){
	            // self.toastTips('get:' + GET_URL);
	          });
	      },
	       onloading: function (e) {
	        this.loading_display = "show"
	        this.page = this.page + 1
	        this.requestData();
	        this.freshFlag = 1;
	        setTimeout(function () {
	          this.loading_display = 'hide'

	        }.bind(this), 1000)
	      },
	      toast: function(msg, duration) {
	        duration = duration || 2;
	        var modal = __weex_require__('@weex-module/modal');
	        modal.toast({
	          'message': msg,
	          'duration': duration
	        });

	      },
	      push: function(newsId) {
	        var vm = this;
	        var params = {
	          'url':  vm.baseURL + 'contentDetail.js?icar_title=详情&newsId=' + newsId,
	          'animated' : 'true',
	        }
	        vm.$call('navigator','push',params, function () {});
	      },

	      pop: function() {
	        var vm = this;
	        var params = {
	          'animated' : 'true',
	        }
	        vm.$call('navigator','pop',params, function () {});
	      },
	       _getUrlParam: function(url, key){
	                var reg = new RegExp('[?|&]' + key + '=([^&]+)');
	                var match = url.match(reg);
	                return match && match[1];
	      },

	      loadBaseUrl : function(){
	            var bundleUrl = this.$getConfig().bundleUrl;
	            bundleUrl = new String(bundleUrl);

	            var nativeBase;
	            var isAndroidAssets = bundleUrl.indexOf('file://assets/') >= 0;

	            var isiOSAssets = bundleUrl.indexOf('file:///') >= 0 && bundleUrl.indexOf('VXCar.app') > 0;
	            if (isAndroidAssets) {
	              nativeBase = 'file://assets/';
	            }
	            else if (isiOSAssets) {
	              nativeBase = bundleUrl.substring(0, bundleUrl.lastIndexOf('/') + 1);
	            }
	            else {
	              var host = 'localhost:12500';
	              var matches = /\/\/([^\/]+?)\//.exec(this.$getConfig().bundleUrl);
	              if (matches && matches.length >= 2) {
	                host = matches[1];
	              }
	              nativeBase = 'http://' + host + '/' + this.dir + '/dist/';
	            }
	            var h5Base = './index.html?page=./' + this.dir + '/dist/';
	            //Native端
	            var base = nativeBase;
	            //H5端
	            if (typeof window === 'object') {
	              base = h5Base;
	            }
	            this.baseURL = base;
	      },
	      toutiaoClicked : function(e){
	          var self = this
	          var dic = self.items[e];
	          var newsId = dic.newsId;
	         
	          self.push(newsId);
	      },
	      //搜索按钮点击,push到新的页面
	      searchAction : function(){
	          var vm = this;
	          var params = {
	            'url':  vm.baseURL + 'searchContent.js',
	            'animated' : 'true',
	          }
	          vm.$call('navigator','push',params, function () {});
	      },
	      //滚动视图点击事件
	      headViewClicked : function(item){
	         var self = this
	        self.push(item.newsId);



	      },
	    //   refreshData: function (e) {
	    //   var self = this
	    //   self.items = [];
	    //   self.itemList = [];
	    //   self.page = 1;
	    //   self.freshFlag = 1;
	    //   self.requestData();
	    //   self.refreshDisplay = 'show'
	    //    setTimeout(function () {
	    //       self.refreshDisplay = 'hide'
	    //       self.toast('刷新成功');

	    //     }.bind(self), 1000)
	      
	    // },
	    }
	  }

	;__weex_module__.exports.template = __weex_module__.exports.template || {}
	;Object.assign(__weex_module__.exports.template, {
	  "type": "wxc-navpage",
	  "attr": {
	    "dataRole": "none",
	    "height": function () {return this.navBarHeight},
	    "backgroundColor": "rgb(246,246,246)",
	    "title": function () {return this.navtitle},
	    "titleColor": "rgb(44,112,223)"
	  },
	  "children": [
	    {
	      "type": "list",
	      "children": [
	        {
	          "type": "cell",
	          "append": "tree",
	          "style": {
	            "height": 395,
	            "backgroundColor": "#efefef",
	            "borderBottomColor": "#eeeeee",
	            "borderBottomWidth": 2,
	            "borderBottomStyle": "solid"
	          },
	          "children": [
	            {
	              "type": "div",
	              "style": {
	                "height": 100,
	                "backgroundColor": "#efefef",
	                "marginLeft": 0,
	                "marginRight": 0,
	                "marginTop": 0,
	                "justifyContent": "center"
	              },
	              "children": [
	                {
	                  "type": "div",
	                  "style": {
	                    "alignItems": "center",
	                    "justifyContent": "center",
	                    "alignContent": "center",
	                    "backgroundColor": "#FFFFFF",
	                    "borderRadius": 7,
	                    "flexDirection": "row",
	                    "marginLeft": 50,
	                    "marginRight": 50,
	                    "height": 60
	                  },
	                  "events": {
	                    "click": "searchAction"
	                  },
	                  "children": [
	                    {
	                      "type": "image",
	                      "attr": {
	                        "src": "http://7xwl0f.com1.z0.glb.clouddn.com/ic_search_night_nor@2x.png",
	                        "resize": "cover"
	                      },
	                      "style": {
	                        "height": 34,
	                        "width": 32
	                      }
	                    },
	                    {
	                      "type": "text",
	                      "style": {
	                        "fontSize": 30,
	                        "textAlign": "left"
	                      },
	                      "attr": {
	                        "value": "点击搜索"
	                      }
	                    }
	                  ]
	                }
	              ]
	            },
	            {
	              "type": "div",
	              "style": {
	                "marginTop": 15
	              },
	              "children": [
	                {
	                  "type": "slider",
	                  "style": {
	                    "flexDirection": "row",
	                    "height": 280
	                  },
	                  "attr": {
	                    "interval": "3000",
	                    "autoPlay": "true"
	                  },
	                  "children": [
	                    {
	                      "type": "div",
	                      "repeat": {
	                        "expression": function () {return this.itemList},
	                        "value": "item"
	                      },
	                      "events": {
	                        "click": function ($event) {this.headViewClicked(this.item,$event)}
	                      },
	                      "children": [
	                        {
	                          "type": "image",
	                          "style": {
	                            "height": 280,
	                            "width": function () {return this.screenW}
	                          },
	                          "attr": {
	                            "src": function () {return this.item.picCover},
	                            "resize": "cover"
	                          }
	                        },
	                        {
	                          "type": "text",
	                          "style": {
	                            "position": "absolute",
	                            "bottom": 0,
	                            "left": 15,
	                            "color": "#FFFFFF",
	                            "fontSize": 35
	                          },
	                          "attr": {
	                            "value": function () {return this.item.title}
	                          }
	                        }
	                      ]
	                    },
	                    {
	                      "type": "indicator",
	                      "style": {
	                        "width": 100,
	                        "height": 50,
	                        "position": "absolute",
	                        "bottom": 0,
	                        "right": 10,
	                        "itemColor": "gray",
	                        "itemSelectedColor": "white",
	                        "itemSize": 15
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
	          "repeat": function () {return this.items},
	          "events": {
	            "click": function ($event) {this.toutiaoClicked(this.$index,$event)}
	          },
	          "children": [
	            {
	              "type": "div",
	              "shown": function () {return this.type!=3},
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
	              "shown": function () {return this.type==3},
	              "style": {
	                "height": 310
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
	          "type": "refresh",
	          "style": {
	            "width": 750,
	            "padding": 30
	          },
	          "events": {
	            "refresh": "refreshData"
	          },
	          "attr": {
	            "display": function () {return this.refreshDisplay}
	          },
	          "children": [
	            {
	              "type": "text",
	              "style": {
	                "textAlign": "center"
	              },
	              "attr": {
	                "value": "↓ 刷新数据"
	              }
	            },
	            {
	              "type": "loading-indicator",
	              "classList": [
	                "indicator"
	              ]
	            }
	          ]
	        },
	        {
	          "type": "loading",
	          "classList": [
	            "refresh-view"
	          ],
	          "attr": {
	            "display": function () {return this.loading_display}
	          },
	          "events": {
	            "loading": "onloading"
	          },
	          "children": [
	            {
	              "type": "text",
	              "classList": [
	                "refresh-arrow"
	              ],
	              "style": {
	                "textAlign": "center",
	                "color": "rgb(238,162,54)"
	              },
	              "shown": function () {return (this.refresh_display==='hide')},
	              "attr": {
	                "value": "Load more"
	              }
	            },
	            {
	              "type": "loading-indicator",
	              "style": {
	                "height": 60,
	                "width": 60,
	                "color": "#3192e1"
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
	  "refresh-view": {
	    "height": 120,
	    "width": 750,
	    "display": "flex",
	    "MsFlexAlign": "center",
	    "WebkitAlignItems": "center",
	    "WebkitBoxAlign": "center",
	    "alignItems": "center"
	  }
	})
	})
	;__weex_bootstrap__("@weex-component/98608737c7f5d1236e5b96f51694472f", {
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