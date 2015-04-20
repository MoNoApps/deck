var app=window.angular.module("WebApp",["ng","ngResource"]);app&&console.log("ng:app");

window.app.controller("HomeCtrl",["$scope","$rootScope","$http",function(r,e,o){r.view="login",r.enableView=function(e){r.view=e},r.isEnabledView=function(e){return window.angular.equals(r.view,e)},r.doRegister=function(){o.post("/api/register/"+r.register.email).success(function(e){"InternalError"!==e.code&&(r.view="login",r.alert="Email registered. Check your email inbox.",r.error="")}).error(function(e){r.alert="",r.error=e.error?e.error:e})},r.login=function(){o.post("/api/login",r.user).success(function(e){"InternalError"!==e.code&&(r.error=!1,window.localStorage.setItem("token",e.token),window.location="/users")}).error(function(e,o){return 401===o?(r.error="Unauthorized",!1):void(r.error=e.error?e.error:e)})}}]);
window.app.controller("ListCtrl",["$scope","$rootScope","$http",function(o,e,n){o.model=!1,o.search="",o.commons={},o.feed=[],o.resources=[];var r="?token="+window.localStorage.getItem("token"),t=function(e,t){return e?(o.model=e,void n.get("/api/"+e+r).success(function(e){"InternalError"!==e.code&&(o.feed=e,t&&t())}).error(function(e,n){return 401===n?(window.location="/",!1):void(o.error=e.error?e.error:e)})):!1},c=function(e){for(var n in o.feed)if(o.feed[n]._id===e){o.edit=o.feed[n];break}if(!o.edit){var r="/"+o.model+"/new";window.location.pathname!==r&&(window.location.pathname=r)}},a=function(){var e="";for(var n in o.resources)o.resources.hasOwnProperty(n)&&(e=e+"/"+o.resources[n]+"/",o.resources.length-1!==n&&(e+="|"));var r=window.location.pathname.match(new RegExp("(W|^)("+e+")(W|$)"));return r?r[0]:!1};o.update=function(){n.put("/api/"+o.model+"/"+o.id+r,o.edit).success(function(){o.alert="Message: "+o.model+" updated"}).error(function(e){o.error=e.error?e.error:e})},o.create=function(e){n.post("/api/"+o.model+r,e).success(function(e){o.alert="Message: "+o.model+" created",t(o.model,function(){window.location.pathname="/"+o.model+"/"+e[0]._id})}).error(function(e){o.error=e.error?e.error:e})},o["delete"]=function(){n["delete"]("/api/"+o.model+"/"+o.id+r).success(function(){o.alert="Message: "+o.model+" deleted";var e="/"+o.model+"/new";window.location.pathname=e}).error(function(e){o.error=e.error?e.error:e})},o.setHashId=function(e){window.location.pathname="/"+o.model+"/"+e._id},o.toggle=function(o,e){o[e]=o[e]?!1:!0},e.$on("load:commons",function(e,n){o.commons=n,console.log("load:commons")}),e.$on("load:resources",function(n,r){o.resources=r;var c=a();c&&(c=a(),t(c),e.$emit("load:param",c)),console.log("load:resources")}),e.$on("change:model",function(o,e){window.location.pathname="/"+e+"/new",console.log("change:model")}),e.$on("watch:search",function(e,n){o.search=n,console.log("watch:search")}),o.$watch("model",function(e){t(e,function(){c(o.id)}),console.log("watch:model")})}]);
window.app.controller("NavBarCtrl",["$scope","$rootScope","$http",function(e,o,t){e.search="",e.themes=[],e.resources=[];var n="?token="+window.localStorage.getItem("token"),r=function(){var e="//maxcdn.bootstrapcdn.com/bootstrap/3.3.1/css/bootstrap.min.css",o=window.localStorage.getItem("theme");return null===o?e:o};e.setTheme=function(o){e.theme=o.css,window.localStorage.setItem("theme",o.css)},e.delTheme=function(){e.theme=!1,window.localStorage.removeItem("theme")},e.setResource=function(e){o.$emit("change:model",e)},e.logout=function(){window.localStorage.removeItem("token"),window.location="/"},e.getProperties=function(){t.get("/api/properties"+n).success(function(t){"InternalError"!==t.code&&(e.themes=t.themes,e.resources=t.resources,o.$emit("load:commons",t.commons||{}),o.$emit("load:resources",t.resources||[]))}).error(function(e){console.log(e)})},o.$on("load:param",function(o,t){e.model=t,console.log("load:param")}),e.$watch("search",function(e){o.$emit("watch:search",e)}),e.theme=r(),"?token=null"!==n&&e.getProperties()}]);