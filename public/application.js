var app=window.angular.module("WebApp",["ng","ngResource"]);app&&console.log("ng:app");

window.app.controller("HomeCtrl",["$scope","$rootScope","$http",function(e,r,o){e.view="login",e.enableView=function(r){e.view=r},e.isEnabledView=function(r){return window.angular.equals(e.view,r)},e.doRegister=function(){o.post("/api/register/"+e.register.email).success(function(r){"InternalError"!==r.code&&(e.view="login",e.alert="Email registered. Check your email inbox.",e.error="")}).error(function(r){e.alert="",e.error=r.error?r.error:r})}}]);
window.app.controller("ListCtrl",["$scope","$rootScope","$http",function(e,o,r){e.model=!1,e.search="",e.feed=[],e.resources=[];var n=function(o,n){return o?(e.model=o,void r.get("/api/"+o).success(function(o){"InternalError"!==o.code&&(e.feed=o,n&&n())}).error(function(o){e.error=o.error?o.error:o})):!1},t=function(o){for(var r in e.feed)if(e.feed[r]._id===o){e.edit=e.feed[r];break}if(!e.edit){var n="/"+e.model+"/new";window.location.pathname!==n&&(window.location.pathname=n)}};e.update=function(){r.put("/api/"+e.model+"/"+e.id,e.edit).success(function(o){console.log(o),e.alert="Message: "+e.model+" updated"}).error(function(o){e.error=o.error?o.error:o})},e.create=function(o){r.post("/api/"+e.model,o).success(function(o){e.alert="Message: "+e.model+" created",n(e.model,function(){window.location.pathname="/"+e.model+"/"+o[0]._id})}).error(function(o){e.error=o.error?o.error:o})},e["delete"]=function(){r["delete"]("/api/"+e.model+"/"+e.id).success(function(){e.alert="Message: "+e.model+" deleted";var o="/"+e.model+"/new";window.location.pathname=o}).error(function(o){e.error=o.error?o.error:o})};var c=function(){var o="";for(var r in e.resources)e.resources.hasOwnProperty(r)&&(o=o+"/"+e.resources[r]+"/",e.resources.length-1!=r&&(o+="|"));var n=window.location.pathname.match(new RegExp("(W|^)("+o+")(W|$)"));return n?n[0]:!1};e.setHashId=function(o){window.location.pathname="/"+e.model+"/"+o._id},o.$on("load:resources",function(r,t){e.resources=t;var a=c();a&&(a=c(),n(a),o.$emit("load:param",a)),console.log("load:resources")}),o.$on("change:model",function(e,o){window.location.pathname="/"+o+"/new",console.log("change:model")}),o.$on("watch:search",function(o,r){e.search=r,console.log("watch:search")}),e.$watch("model",function(o){n(o,function(){t(e.id)}),console.log("watch:model")})}]);
window.app.controller("NavBarCtrl",["$scope","$rootScope","$http",function(e,o,t){e.search="",e.themes=[],e.resources=[];var r=function(){var e="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css",o=window.localStorage.getItem("theme");return null===o?e:o};e.setTheme=function(o){e.theme=o.css,window.localStorage.setItem("theme",o.css)},e.delTheme=function(){e.theme=!1,window.localStorage.removeItem("theme")},e.setResource=function(e){o.$emit("change:model",e)},o.$on("load:param",function(o,t){e.model=t,console.log("load:param")}),e.$watch("search",function(e){o.$emit("watch:search",e)}),e.theme=r(),t.get("/properties.json").success(function(t){"InternalError"!==t.code&&(e.resources=t.resources,e.themes=t.themes,o.$emit("load:resources",t.resources||[]))}).error(function(e){console.log(e)})}]);