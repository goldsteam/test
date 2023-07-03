'use strict';var _typeof='function'==typeof Symbol&&'symbol'==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&'function'==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?'symbol':typeof a};/*
 * LiveGames Game Frame Generator
 * @version: 1.4.3
*/(function(a){a(window)})(function(a){var b={constants:{games:{1:'tombala',2:'tombalaslot',3:'overunder',4:'kilic',5:'roulette',8:'hippodrome'},gameConfig:{tombala:{type:!0},overunder:{type:!1},tombalaslot:{type:!1},kilic:{type:!1},roulette:{type:!0},hippodrome:{type:!1}}},config:{baseUrl:'https://lobby6.lgio.net',stageUrl:null,width:'100%',height:'100%',container:'lgf-container',game:0,origin:null,params:null,generateURL:null},frame:null,container:null,device:function b(){var a=!1;if('maxTouchPoints'in navigator)a=0<navigator.maxTouchPoints;else if('msMaxTouchPoints'in navigator)a=0<navigator.msMaxTouchPoints;else{var c=window.matchMedia&&matchMedia('(pointer:coarse)');if(c&&'(pointer:coarse)'===c.media)a=!!c.matches;else if('orientation'in window)a=!0;else{var d=navigator.userAgent;a=/\b(BlackBerry|webOS|iPhone|IEMobile)\b/i.test(d)||/\b(Android|Windows Phone|iPad|iPod)\b/i.test(d)}}return a},getGameName:function d(a){if('string'==typeof a&&isNaN(a))return a;var c='number'==typeof a?a:'object'===('undefined'==typeof a?'undefined':_typeof(a))&&a.id?a.id:'';return b.constants.games[c]||''},setCookie:function g(b,c,d){var e=new Date,f='';d?e.setTime(e.getTime()+1e3*(60*(60*(24*d)))):e.setTime(e.getTime()+60000),f='; expires='+e.toUTCString(),a.document.cookie=b+'='+(c||'')+f+'; path=/'},getCookie:function g(a){for(var b,d=a+'=',e=document.cookie.split(';'),f=0;f<e.length;f++){for(b=e[f];' '===b.charAt(0);)b=b.substring(1,b.length);if(0===b.indexOf(d))return b.substring(d.length,b.length)}return null},paramsToQueryString:function f(){var a=b.config.generateURL||b.config.params;if(!Object.keys(a).length)return'';var c=[];Object.keys(a).forEach(function(b){a[b]&&c.push(window.encodeURIComponent(b)+'='+window.encodeURIComponent(a[b]))});var d='&origin='+(b.config.origin?b.config.origin:window.location.origin),e='';return 0===b.config.game?b.config.gameId&&(e+='gameId='+b.config.gameId+'&'):'string'==typeof b.config.game?e='game='+b.config.game+'&':'number'==typeof b.config.game?e='game='+b.constants.games[b.config.game]+'&':'object'===_typeof(b.config.game)&&(e='game='+b.constants.games[b.config.game.id]+'&','undefined'!=typeof b.config.game.auto&&'true'===b.config.game.auto+''&&(e+='auto='+b.config.game.auto+'&'),b.constants.gameConfig[b.constants.games[b.config.game.id]]&&b.constants.gameConfig[b.constants.games[b.config.game.id]].type&&(e+='type='+b.config.game.type+'&')),'/'+(b.config.generateURL?'init':'')+'?'+e+c.join('&')+d},transportToLobby:function a(){return b.config.game?(b.config.game=0,b.createFrameSource()):null},createFrameSource:function i(){var c=/^(https?)/,d=a.location.protocol,e=b.config.only?'/'+b.config.only:'';!b.config.generateURL&&b.device()&&b.config.game&&(e='/'+b.getGameName(b.config.game));var f=''+(c.test(b.config.baseUrl)?'':''+d)+b.config.baseUrl+e+b.paramsToQueryString(),g=new URL(f),h=new URLSearchParams(g.search);return b.config.params.lobbyUrl?f+='&lobbyUrl='+window.btoa(g.origin+'/?'+h.toString()):(h.delete('gameId'),f+='&lobbyUrl='+window.btoa(g.origin+'/?'+h.toString())),f},appendIframe:function d(){b.config.baseUrl=b.config.stageUrl?b.config.stageUrl:'https://lobby.lgio.net';var a=b.createFrameSource();if(b.config.generateURL&&b.config.generateURL.platformType&&'mobile'===b.config.generateURL.platformType.toLowerCase())return void(window.location.href=a);if(b.device()&&b.config.params&&b.config.params.platformType&&'mobile'===b.config.params.platformType.toLowerCase()){var e=a.split(b.config.baseUrl);return e[1]=''+b.constants.games[b.config.game.id]+e[1],void(window.location.href=''+e[0]+b.config.baseUrl+'/'+e[1])}if(!b.config.forceIframe&&b.device()&&b.config.params)return void(window.location.href=a);if(b.container=document.getElementById(b.config.container),null===b.container)return void console.log('LGWIframe container could not found.');var c=document.getElementById(b.config.container.concat('-iframe'));return null===c?void(b.container.style.display='inline-block',b.container.style.width='100%',b.frame=document.createElement('iframe'),b.frame.name=b.config.container,b.frame.id=b.config.container.concat('-iframe'),b.frame.width='100%',b.frame.height='100%',b.frame.setAttribute('frameborder','0'),b.frame.setAttribute('allowFullScreen','true'),b.frame.setAttribute('webkitallowfullscreen','true'),b.frame.setAttribute('mozallowfullscreen','true'),b.frame.scrolling='no',b.frame.src=b.createFrameSource(),b.container.appendChild(b.frame),b.frame.addEventListener('load',function(){console.log('content size >>>',b.frame.contentWindow.length),alert('content size >>>',b.frame.contentWindow.length)}),b.frame.addEventListener('error',function(a){console.log('content error >>>',a),alert('content error >>>',a)}),b.container.style.height=300>window.innerHeight?'800px':window.innerHeight+'px'):void(c.src=a)},prefixIgniter:function g(a,b){for(var c=['webkit','moz','ms','o',''],d=0,e=void 0,f=void 0;d<c.length&&!a[e];){if(e=b,''===c[d]&&(e=e.substr(0,1).toLowerCase()+e.substr(1)),e=c[d]+e,f=_typeof(a[e]),'undefined'!==f)return c=[c[d]],'function'===f?a[e]():a[e];d++}},toggleFullScreen:function a(){b.prefixIgniter(document,'FullScreen')||b.prefixIgniter(document,'IsFullScreen')?document.exitFullscreen():b.prefixIgniter(b.frame,'RequestFullScreen')},parseMessage:function f(a){if(a){for(var b,c=a.split('&'),d={},e=0;e<c.length;e++)b=c[e].split('='),d[b[0]]=decodeURIComponent(b[1]);return d}return null},messageResolver:function a(){if('undefined'!=typeof window.postMessage){var c,d;if('undefined'!=typeof window.addEventListener)c='addEventListener',d='message';else if('undefined'!=typeof window.attachEvent)c='attachEvent',d='onmessage';else return;var f=function(a){var c=a.data instanceof Object?a.data:b.parseMessage(a.data);if(c instanceof Object)for(var d=Object.keys(c),e=0;e<d.length;e++)if('openGame'===d[e])b.openGame(c[d[e]]);else if('redirectLobby'===c[d[e]]&&b.config.params.lobbyUrl)b.redirect(b.config.params.lobbyUrl);else if('toggleFullscreen'===c[d[e]])b.toggleFullScreen();else if('refreshLobby'===c[d[e]]){var h=b.transportToLobby();h&&b.redirect(h)}else if('close'===c[d[e]]){var f=b.createFrameSource(),g=new URL(f);if(b.config.gameId){var i=new URLSearchParams(g.search);i.delete('gameId'),b.redirect(g.origin+'/?'+i.toString())}else b.config.game?b.redirect(f.replace('/'+b.getGameName(b.config.game),'')):b.redirect(g.origin+'/'+g.search)}};window[c](d,function(a){f(a)},!1)}},openGame:function c(a){b.setCookie('LGFrameGame',a),'undefined'==typeof b.config.redirectUrl?console.log('LGFrame redirect url is not defined.'):b.redirect(b.config.redirectUrl)},redirect:function b(a){window.location.href=a},resize:function a(){b.container.style.height=window.innerHeight+'px'},init:function d(){if(window.addEventListener('resize',b.resize,!1),'undefined'==typeof a.LGFrameObject)return void console.log('LGFrameObject is not defined.');var c=a[a.LGFrameObject];if('undefined'==typeof c.update&&(c.update=function(a){c.q[0]=[],c.q[0].push('config',a),b.init()}),c.q&&c.q.length){for(var e=0;e<c.q.length;e++)if(1<c.q[e].length&&'config'===c.q[e][0]&&c.q[e][1]instanceof Object)b.config=Object.assign({},b.config,c.q[e][1]),b.appendIframe();else return void console.log('LGFrame config is not defined.');}else return void console.log('LGFrame config is not defined.');return b.messageResolver(),!0}};b.init()});
