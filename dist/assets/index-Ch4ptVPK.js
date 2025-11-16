(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const l of document.querySelectorAll('link[rel="modulepreload"]'))a(l);new MutationObserver(l=>{for(const c of l)if(c.type==="childList")for(const u of c.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&a(u)}).observe(document,{childList:!0,subtree:!0});function s(l){const c={};return l.integrity&&(c.integrity=l.integrity),l.referrerPolicy&&(c.referrerPolicy=l.referrerPolicy),l.crossOrigin==="use-credentials"?c.credentials="include":l.crossOrigin==="anonymous"?c.credentials="omit":c.credentials="same-origin",c}function a(l){if(l.ep)return;l.ep=!0;const c=s(l);fetch(l.href,c)}})();function S2(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}var pc={exports:{}},Xr={},fc={exports:{}},pe={};var cf;function N2(){if(cf)return pe;cf=1;var e=Symbol.for("react.element"),n=Symbol.for("react.portal"),s=Symbol.for("react.fragment"),a=Symbol.for("react.strict_mode"),l=Symbol.for("react.profiler"),c=Symbol.for("react.provider"),u=Symbol.for("react.context"),f=Symbol.for("react.forward_ref"),p=Symbol.for("react.suspense"),m=Symbol.for("react.memo"),g=Symbol.for("react.lazy"),v=Symbol.iterator;function b(C){return C===null||typeof C!="object"?null:(C=v&&C[v]||C["@@iterator"],typeof C=="function"?C:null)}var y={isMounted:function(){return!1},enqueueForceUpdate:function(){},enqueueReplaceState:function(){},enqueueSetState:function(){}},S=Object.assign,N={};function T(C,W,se){this.props=C,this.context=W,this.refs=N,this.updater=se||y}T.prototype.isReactComponent={},T.prototype.setState=function(C,W){if(typeof C!="object"&&typeof C!="function"&&C!=null)throw Error("setState(...): takes an object of state variables to update or a function which returns an object of state variables.");this.updater.enqueueSetState(this,C,W,"setState")},T.prototype.forceUpdate=function(C){this.updater.enqueueForceUpdate(this,C,"forceUpdate")};function L(){}L.prototype=T.prototype;function E(C,W,se){this.props=C,this.context=W,this.refs=N,this.updater=se||y}var P=E.prototype=new L;P.constructor=E,S(P,T.prototype),P.isPureReactComponent=!0;var B=Array.isArray,M=Object.prototype.hasOwnProperty,F={current:null},_={key:!0,ref:!0,__self:!0,__source:!0};function D(C,W,se){var he,de={},Se=null,ve=null;if(W!=null)for(he in W.ref!==void 0&&(ve=W.ref),W.key!==void 0&&(Se=""+W.key),W)M.call(W,he)&&!_.hasOwnProperty(he)&&(de[he]=W[he]);var je=arguments.length-2;if(je===1)de.children=se;else if(1<je){for(var be=Array(je),ht=0;ht<je;ht++)be[ht]=arguments[ht+2];de.children=be}if(C&&C.defaultProps)for(he in je=C.defaultProps,je)de[he]===void 0&&(de[he]=je[he]);return{$$typeof:e,type:C,key:Se,ref:ve,props:de,_owner:F.current}}function H(C,W){return{$$typeof:e,type:C.type,key:W,ref:C.ref,props:C.props,_owner:C._owner}}function Y(C){return typeof C=="object"&&C!==null&&C.$$typeof===e}function X(C){var W={"=":"=0",":":"=2"};return"$"+C.replace(/[=:]/g,function(se){return W[se]})}var re=/\/+/g;function ue(C,W){return typeof C=="object"&&C!==null&&C.key!=null?X(""+C.key):W.toString(36)}function me(C,W,se,he,de){var Se=typeof C;(Se==="undefined"||Se==="boolean")&&(C=null);var ve=!1;if(C===null)ve=!0;else switch(Se){case"string":case"number":ve=!0;break;case"object":switch(C.$$typeof){case e:case n:ve=!0}}if(ve)return ve=C,de=de(ve),C=he===""?"."+ue(ve,0):he,B(de)?(se="",C!=null&&(se=C.replace(re,"$&/")+"/"),me(de,W,se,"",function(ht){return ht})):de!=null&&(Y(de)&&(de=H(de,se+(!de.key||ve&&ve.key===de.key?"":(""+de.key).replace(re,"$&/")+"/")+C)),W.push(de)),1;if(ve=0,he=he===""?".":he+":",B(C))for(var je=0;je<C.length;je++){Se=C[je];var be=he+ue(Se,je);ve+=me(Se,W,se,be,de)}else if(be=b(C),typeof be=="function")for(C=be.call(C),je=0;!(Se=C.next()).done;)Se=Se.value,be=he+ue(Se,je++),ve+=me(Se,W,se,be,de);else if(Se==="object")throw W=String(C),Error("Objects are not valid as a React child (found: "+(W==="[object Object]"?"object with keys {"+Object.keys(C).join(", ")+"}":W)+"). If you meant to render a collection of children, use an array instead.");return ve}function we(C,W,se){if(C==null)return C;var he=[],de=0;return me(C,he,"","",function(Se){return W.call(se,Se,de++)}),he}function Ie(C){if(C._status===-1){var W=C._result;W=W(),W.then(function(se){(C._status===0||C._status===-1)&&(C._status=1,C._result=se)},function(se){(C._status===0||C._status===-1)&&(C._status=2,C._result=se)}),C._status===-1&&(C._status=0,C._result=W)}if(C._status===1)return C._result.default;throw C._result}var Z={current:null},O={transition:null},G={ReactCurrentDispatcher:Z,ReactCurrentBatchConfig:O,ReactCurrentOwner:F};return pe.Children={map:we,forEach:function(C,W,se){we(C,function(){W.apply(this,arguments)},se)},count:function(C){var W=0;return we(C,function(){W++}),W},toArray:function(C){return we(C,function(W){return W})||[]},only:function(C){if(!Y(C))throw Error("React.Children.only expected to receive a single React element child.");return C}},pe.Component=T,pe.Fragment=s,pe.Profiler=l,pe.PureComponent=E,pe.StrictMode=a,pe.Suspense=p,pe.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=G,pe.cloneElement=function(C,W,se){if(C==null)throw Error("React.cloneElement(...): The argument must be a React element, but you passed "+C+".");var he=S({},C.props),de=C.key,Se=C.ref,ve=C._owner;if(W!=null){if(W.ref!==void 0&&(Se=W.ref,ve=F.current),W.key!==void 0&&(de=""+W.key),C.type&&C.type.defaultProps)var je=C.type.defaultProps;for(be in W)M.call(W,be)&&!_.hasOwnProperty(be)&&(he[be]=W[be]===void 0&&je!==void 0?je[be]:W[be])}var be=arguments.length-2;if(be===1)he.children=se;else if(1<be){je=Array(be);for(var ht=0;ht<be;ht++)je[ht]=arguments[ht+2];he.children=je}return{$$typeof:e,type:C.type,key:de,ref:Se,props:he,_owner:ve}},pe.createContext=function(C){return C={$$typeof:u,_currentValue:C,_currentValue2:C,_threadCount:0,Provider:null,Consumer:null,_defaultValue:null,_globalName:null},C.Provider={$$typeof:c,_context:C},C.Consumer=C},pe.createElement=D,pe.createFactory=function(C){var W=D.bind(null,C);return W.type=C,W},pe.createRef=function(){return{current:null}},pe.forwardRef=function(C){return{$$typeof:f,render:C}},pe.isValidElement=Y,pe.lazy=function(C){return{$$typeof:g,_payload:{_status:-1,_result:C},_init:Ie}},pe.memo=function(C,W){return{$$typeof:m,type:C,compare:W===void 0?null:W}},pe.startTransition=function(C){var W=O.transition;O.transition={};try{C()}finally{O.transition=W}},pe.unstable_act=function(){throw Error("act(...) is not supported in production builds of React.")},pe.useCallback=function(C,W){return Z.current.useCallback(C,W)},pe.useContext=function(C){return Z.current.useContext(C)},pe.useDebugValue=function(){},pe.useDeferredValue=function(C){return Z.current.useDeferredValue(C)},pe.useEffect=function(C,W){return Z.current.useEffect(C,W)},pe.useId=function(){return Z.current.useId()},pe.useImperativeHandle=function(C,W,se){return Z.current.useImperativeHandle(C,W,se)},pe.useInsertionEffect=function(C,W){return Z.current.useInsertionEffect(C,W)},pe.useLayoutEffect=function(C,W){return Z.current.useLayoutEffect(C,W)},pe.useMemo=function(C,W){return Z.current.useMemo(C,W)},pe.useReducer=function(C,W,se){return Z.current.useReducer(C,W,se)},pe.useRef=function(C){return Z.current.useRef(C)},pe.useState=function(C){return Z.current.useState(C)},pe.useSyncExternalStore=function(C,W,se){return Z.current.useSyncExternalStore(C,W,se)},pe.useTransition=function(){return Z.current.useTransition()},pe.version="18.2.0",pe}var df;function vd(){return df||(df=1,fc.exports=N2()),fc.exports}var uf;function C2(){if(uf)return Xr;uf=1;var e=vd(),n=Symbol.for("react.element"),s=Symbol.for("react.fragment"),a=Object.prototype.hasOwnProperty,l=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,c={key:!0,ref:!0,__self:!0,__source:!0};function u(f,p,m){var g,v={},b=null,y=null;m!==void 0&&(b=""+m),p.key!==void 0&&(b=""+p.key),p.ref!==void 0&&(y=p.ref);for(g in p)a.call(p,g)&&!c.hasOwnProperty(g)&&(v[g]=p[g]);if(f&&f.defaultProps)for(g in p=f.defaultProps,p)v[g]===void 0&&(v[g]=p[g]);return{$$typeof:n,type:f,key:b,ref:y,props:v,_owner:l.current}}return Xr.Fragment=s,Xr.jsx=u,Xr.jsxs=u,Xr}var pf;function T2(){return pf||(pf=1,pc.exports=C2()),pc.exports}var i=T2(),j=vd();const Ce=S2(j);var Da={},hc={exports:{}},yt={},mc={exports:{}},gc={};var ff;function z2(){return ff||(ff=1,(function(e){function n(O,G){var C=O.length;O.push(G);e:for(;0<C;){var W=C-1>>>1,se=O[W];if(0<l(se,G))O[W]=G,O[C]=se,C=W;else break e}}function s(O){return O.length===0?null:O[0]}function a(O){if(O.length===0)return null;var G=O[0],C=O.pop();if(C!==G){O[0]=C;e:for(var W=0,se=O.length,he=se>>>1;W<he;){var de=2*(W+1)-1,Se=O[de],ve=de+1,je=O[ve];if(0>l(Se,C))ve<se&&0>l(je,Se)?(O[W]=je,O[ve]=C,W=ve):(O[W]=Se,O[de]=C,W=de);else if(ve<se&&0>l(je,C))O[W]=je,O[ve]=C,W=ve;else break e}}return G}function l(O,G){var C=O.sortIndex-G.sortIndex;return C!==0?C:O.id-G.id}if(typeof performance=="object"&&typeof performance.now=="function"){var c=performance;e.unstable_now=function(){return c.now()}}else{var u=Date,f=u.now();e.unstable_now=function(){return u.now()-f}}var p=[],m=[],g=1,v=null,b=3,y=!1,S=!1,N=!1,T=typeof setTimeout=="function"?setTimeout:null,L=typeof clearTimeout=="function"?clearTimeout:null,E=typeof setImmediate<"u"?setImmediate:null;typeof navigator<"u"&&navigator.scheduling!==void 0&&navigator.scheduling.isInputPending!==void 0&&navigator.scheduling.isInputPending.bind(navigator.scheduling);function P(O){for(var G=s(m);G!==null;){if(G.callback===null)a(m);else if(G.startTime<=O)a(m),G.sortIndex=G.expirationTime,n(p,G);else break;G=s(m)}}function B(O){if(N=!1,P(O),!S)if(s(p)!==null)S=!0,Ie(M);else{var G=s(m);G!==null&&Z(B,G.startTime-O)}}function M(O,G){S=!1,N&&(N=!1,L(D),D=-1),y=!0;var C=b;try{for(P(G),v=s(p);v!==null&&(!(v.expirationTime>G)||O&&!X());){var W=v.callback;if(typeof W=="function"){v.callback=null,b=v.priorityLevel;var se=W(v.expirationTime<=G);G=e.unstable_now(),typeof se=="function"?v.callback=se:v===s(p)&&a(p),P(G)}else a(p);v=s(p)}if(v!==null)var he=!0;else{var de=s(m);de!==null&&Z(B,de.startTime-G),he=!1}return he}finally{v=null,b=C,y=!1}}var F=!1,_=null,D=-1,H=5,Y=-1;function X(){return!(e.unstable_now()-Y<H)}function re(){if(_!==null){var O=e.unstable_now();Y=O;var G=!0;try{G=_(!0,O)}finally{G?ue():(F=!1,_=null)}}else F=!1}var ue;if(typeof E=="function")ue=function(){E(re)};else if(typeof MessageChannel<"u"){var me=new MessageChannel,we=me.port2;me.port1.onmessage=re,ue=function(){we.postMessage(null)}}else ue=function(){T(re,0)};function Ie(O){_=O,F||(F=!0,ue())}function Z(O,G){D=T(function(){O(e.unstable_now())},G)}e.unstable_IdlePriority=5,e.unstable_ImmediatePriority=1,e.unstable_LowPriority=4,e.unstable_NormalPriority=3,e.unstable_Profiling=null,e.unstable_UserBlockingPriority=2,e.unstable_cancelCallback=function(O){O.callback=null},e.unstable_continueExecution=function(){S||y||(S=!0,Ie(M))},e.unstable_forceFrameRate=function(O){0>O||125<O?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):H=0<O?Math.floor(1e3/O):5},e.unstable_getCurrentPriorityLevel=function(){return b},e.unstable_getFirstCallbackNode=function(){return s(p)},e.unstable_next=function(O){switch(b){case 1:case 2:case 3:var G=3;break;default:G=b}var C=b;b=G;try{return O()}finally{b=C}},e.unstable_pauseExecution=function(){},e.unstable_requestPaint=function(){},e.unstable_runWithPriority=function(O,G){switch(O){case 1:case 2:case 3:case 4:case 5:break;default:O=3}var C=b;b=O;try{return G()}finally{b=C}},e.unstable_scheduleCallback=function(O,G,C){var W=e.unstable_now();switch(typeof C=="object"&&C!==null?(C=C.delay,C=typeof C=="number"&&0<C?W+C:W):C=W,O){case 1:var se=-1;break;case 2:se=250;break;case 5:se=1073741823;break;case 4:se=1e4;break;default:se=5e3}return se=C+se,O={id:g++,callback:G,priorityLevel:O,startTime:C,expirationTime:se,sortIndex:-1},C>W?(O.sortIndex=C,n(m,O),s(p)===null&&O===s(m)&&(N?(L(D),D=-1):N=!0,Z(B,C-W))):(O.sortIndex=se,n(p,O),S||y||(S=!0,Ie(M))),O},e.unstable_shouldYield=X,e.unstable_wrapCallback=function(O){var G=b;return function(){var C=b;b=G;try{return O.apply(this,arguments)}finally{b=C}}}})(gc)),gc}var hf;function E2(){return hf||(hf=1,mc.exports=z2()),mc.exports}var mf;function P2(){if(mf)return yt;mf=1;var e=vd(),n=E2();function s(t){for(var r="https://reactjs.org/docs/error-decoder.html?invariant="+t,o=1;o<arguments.length;o++)r+="&args[]="+encodeURIComponent(arguments[o]);return"Minified React error #"+t+"; visit "+r+" for the full message or use the non-minified dev environment for full errors and additional helpful warnings."}var a=new Set,l={};function c(t,r){u(t,r),u(t+"Capture",r)}function u(t,r){for(l[t]=r,t=0;t<r.length;t++)a.add(r[t])}var f=!(typeof window>"u"||typeof window.document>"u"||typeof window.document.createElement>"u"),p=Object.prototype.hasOwnProperty,m=/^[:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD][:A-Z_a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02FF\u0370-\u037D\u037F-\u1FFF\u200C-\u200D\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD\-.0-9\u00B7\u0300-\u036F\u203F-\u2040]*$/,g={},v={};function b(t){return p.call(v,t)?!0:p.call(g,t)?!1:m.test(t)?v[t]=!0:(g[t]=!0,!1)}function y(t,r,o,d){if(o!==null&&o.type===0)return!1;switch(typeof r){case"function":case"symbol":return!0;case"boolean":return d?!1:o!==null?!o.acceptsBooleans:(t=t.toLowerCase().slice(0,5),t!=="data-"&&t!=="aria-");default:return!1}}function S(t,r,o,d){if(r===null||typeof r>"u"||y(t,r,o,d))return!0;if(d)return!1;if(o!==null)switch(o.type){case 3:return!r;case 4:return r===!1;case 5:return isNaN(r);case 6:return isNaN(r)||1>r}return!1}function N(t,r,o,d,h,x,w){this.acceptsBooleans=r===2||r===3||r===4,this.attributeName=d,this.attributeNamespace=h,this.mustUseProperty=o,this.propertyName=t,this.type=r,this.sanitizeURL=x,this.removeEmptyString=w}var T={};"children dangerouslySetInnerHTML defaultValue defaultChecked innerHTML suppressContentEditableWarning suppressHydrationWarning style".split(" ").forEach(function(t){T[t]=new N(t,0,!1,t,null,!1,!1)}),[["acceptCharset","accept-charset"],["className","class"],["htmlFor","for"],["httpEquiv","http-equiv"]].forEach(function(t){var r=t[0];T[r]=new N(r,1,!1,t[1],null,!1,!1)}),["contentEditable","draggable","spellCheck","value"].forEach(function(t){T[t]=new N(t,2,!1,t.toLowerCase(),null,!1,!1)}),["autoReverse","externalResourcesRequired","focusable","preserveAlpha"].forEach(function(t){T[t]=new N(t,2,!1,t,null,!1,!1)}),"allowFullScreen async autoFocus autoPlay controls default defer disabled disablePictureInPicture disableRemotePlayback formNoValidate hidden loop noModule noValidate open playsInline readOnly required reversed scoped seamless itemScope".split(" ").forEach(function(t){T[t]=new N(t,3,!1,t.toLowerCase(),null,!1,!1)}),["checked","multiple","muted","selected"].forEach(function(t){T[t]=new N(t,3,!0,t,null,!1,!1)}),["capture","download"].forEach(function(t){T[t]=new N(t,4,!1,t,null,!1,!1)}),["cols","rows","size","span"].forEach(function(t){T[t]=new N(t,6,!1,t,null,!1,!1)}),["rowSpan","start"].forEach(function(t){T[t]=new N(t,5,!1,t.toLowerCase(),null,!1,!1)});var L=/[\-:]([a-z])/g;function E(t){return t[1].toUpperCase()}"accent-height alignment-baseline arabic-form baseline-shift cap-height clip-path clip-rule color-interpolation color-interpolation-filters color-profile color-rendering dominant-baseline enable-background fill-opacity fill-rule flood-color flood-opacity font-family font-size font-size-adjust font-stretch font-style font-variant font-weight glyph-name glyph-orientation-horizontal glyph-orientation-vertical horiz-adv-x horiz-origin-x image-rendering letter-spacing lighting-color marker-end marker-mid marker-start overline-position overline-thickness paint-order panose-1 pointer-events rendering-intent shape-rendering stop-color stop-opacity strikethrough-position strikethrough-thickness stroke-dasharray stroke-dashoffset stroke-linecap stroke-linejoin stroke-miterlimit stroke-opacity stroke-width text-anchor text-decoration text-rendering underline-position underline-thickness unicode-bidi unicode-range units-per-em v-alphabetic v-hanging v-ideographic v-mathematical vector-effect vert-adv-y vert-origin-x vert-origin-y word-spacing writing-mode xmlns:xlink x-height".split(" ").forEach(function(t){var r=t.replace(L,E);T[r]=new N(r,1,!1,t,null,!1,!1)}),"xlink:actuate xlink:arcrole xlink:role xlink:show xlink:title xlink:type".split(" ").forEach(function(t){var r=t.replace(L,E);T[r]=new N(r,1,!1,t,"http://www.w3.org/1999/xlink",!1,!1)}),["xml:base","xml:lang","xml:space"].forEach(function(t){var r=t.replace(L,E);T[r]=new N(r,1,!1,t,"http://www.w3.org/XML/1998/namespace",!1,!1)}),["tabIndex","crossOrigin"].forEach(function(t){T[t]=new N(t,1,!1,t.toLowerCase(),null,!1,!1)}),T.xlinkHref=new N("xlinkHref",1,!1,"xlink:href","http://www.w3.org/1999/xlink",!0,!1),["src","href","action","formAction"].forEach(function(t){T[t]=new N(t,1,!1,t.toLowerCase(),null,!0,!0)});function P(t,r,o,d){var h=T.hasOwnProperty(r)?T[r]:null;(h!==null?h.type!==0:d||!(2<r.length)||r[0]!=="o"&&r[0]!=="O"||r[1]!=="n"&&r[1]!=="N")&&(S(r,o,h,d)&&(o=null),d||h===null?b(r)&&(o===null?t.removeAttribute(r):t.setAttribute(r,""+o)):h.mustUseProperty?t[h.propertyName]=o===null?h.type===3?!1:"":o:(r=h.attributeName,d=h.attributeNamespace,o===null?t.removeAttribute(r):(h=h.type,o=h===3||h===4&&o===!0?"":""+o,d?t.setAttributeNS(d,r,o):t.setAttribute(r,o))))}var B=e.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED,M=Symbol.for("react.element"),F=Symbol.for("react.portal"),_=Symbol.for("react.fragment"),D=Symbol.for("react.strict_mode"),H=Symbol.for("react.profiler"),Y=Symbol.for("react.provider"),X=Symbol.for("react.context"),re=Symbol.for("react.forward_ref"),ue=Symbol.for("react.suspense"),me=Symbol.for("react.suspense_list"),we=Symbol.for("react.memo"),Ie=Symbol.for("react.lazy"),Z=Symbol.for("react.offscreen"),O=Symbol.iterator;function G(t){return t===null||typeof t!="object"?null:(t=O&&t[O]||t["@@iterator"],typeof t=="function"?t:null)}var C=Object.assign,W;function se(t){if(W===void 0)try{throw Error()}catch(o){var r=o.stack.trim().match(/\n( *(at )?)/);W=r&&r[1]||""}return`
`+W+t}var he=!1;function de(t,r){if(!t||he)return"";he=!0;var o=Error.prepareStackTrace;Error.prepareStackTrace=void 0;try{if(r)if(r=function(){throw Error()},Object.defineProperty(r.prototype,"props",{set:function(){throw Error()}}),typeof Reflect=="object"&&Reflect.construct){try{Reflect.construct(r,[])}catch(V){var d=V}Reflect.construct(t,[],r)}else{try{r.call()}catch(V){d=V}t.call(r.prototype)}else{try{throw Error()}catch(V){d=V}t()}}catch(V){if(V&&d&&typeof V.stack=="string"){for(var h=V.stack.split(`
`),x=d.stack.split(`
`),w=h.length-1,k=x.length-1;1<=w&&0<=k&&h[w]!==x[k];)k--;for(;1<=w&&0<=k;w--,k--)if(h[w]!==x[k]){if(w!==1||k!==1)do if(w--,k--,0>k||h[w]!==x[k]){var z=`
`+h[w].replace(" at new "," at ");return t.displayName&&z.includes("<anonymous>")&&(z=z.replace("<anonymous>",t.displayName)),z}while(1<=w&&0<=k);break}}}finally{he=!1,Error.prepareStackTrace=o}return(t=t?t.displayName||t.name:"")?se(t):""}function Se(t){switch(t.tag){case 5:return se(t.type);case 16:return se("Lazy");case 13:return se("Suspense");case 19:return se("SuspenseList");case 0:case 2:case 15:return t=de(t.type,!1),t;case 11:return t=de(t.type.render,!1),t;case 1:return t=de(t.type,!0),t;default:return""}}function ve(t){if(t==null)return null;if(typeof t=="function")return t.displayName||t.name||null;if(typeof t=="string")return t;switch(t){case _:return"Fragment";case F:return"Portal";case H:return"Profiler";case D:return"StrictMode";case ue:return"Suspense";case me:return"SuspenseList"}if(typeof t=="object")switch(t.$$typeof){case X:return(t.displayName||"Context")+".Consumer";case Y:return(t._context.displayName||"Context")+".Provider";case re:var r=t.render;return t=t.displayName,t||(t=r.displayName||r.name||"",t=t!==""?"ForwardRef("+t+")":"ForwardRef"),t;case we:return r=t.displayName||null,r!==null?r:ve(t.type)||"Memo";case Ie:r=t._payload,t=t._init;try{return ve(t(r))}catch{}}return null}function je(t){var r=t.type;switch(t.tag){case 24:return"Cache";case 9:return(r.displayName||"Context")+".Consumer";case 10:return(r._context.displayName||"Context")+".Provider";case 18:return"DehydratedFragment";case 11:return t=r.render,t=t.displayName||t.name||"",r.displayName||(t!==""?"ForwardRef("+t+")":"ForwardRef");case 7:return"Fragment";case 5:return r;case 4:return"Portal";case 3:return"Root";case 6:return"Text";case 16:return ve(r);case 8:return r===D?"StrictMode":"Mode";case 22:return"Offscreen";case 12:return"Profiler";case 21:return"Scope";case 13:return"Suspense";case 19:return"SuspenseList";case 25:return"TracingMarker";case 1:case 0:case 17:case 2:case 14:case 15:if(typeof r=="function")return r.displayName||r.name||null;if(typeof r=="string")return r}return null}function be(t){switch(typeof t){case"boolean":case"number":case"string":case"undefined":return t;case"object":return t;default:return""}}function ht(t){var r=t.type;return(t=t.nodeName)&&t.toLowerCase()==="input"&&(r==="checkbox"||r==="radio")}function T1(t){var r=ht(t)?"checked":"value",o=Object.getOwnPropertyDescriptor(t.constructor.prototype,r),d=""+t[r];if(!t.hasOwnProperty(r)&&typeof o<"u"&&typeof o.get=="function"&&typeof o.set=="function"){var h=o.get,x=o.set;return Object.defineProperty(t,r,{configurable:!0,get:function(){return h.call(this)},set:function(w){d=""+w,x.call(this,w)}}),Object.defineProperty(t,r,{enumerable:o.enumerable}),{getValue:function(){return d},setValue:function(w){d=""+w},stopTracking:function(){t._valueTracker=null,delete t[r]}}}}function Ss(t){t._valueTracker||(t._valueTracker=T1(t))}function fu(t){if(!t)return!1;var r=t._valueTracker;if(!r)return!0;var o=r.getValue(),d="";return t&&(d=ht(t)?t.checked?"true":"false":t.value),t=d,t!==o?(r.setValue(t),!0):!1}function Ns(t){if(t=t||(typeof document<"u"?document:void 0),typeof t>"u")return null;try{return t.activeElement||t.body}catch{return t.body}}function bo(t,r){var o=r.checked;return C({},r,{defaultChecked:void 0,defaultValue:void 0,value:void 0,checked:o??t._wrapperState.initialChecked})}function hu(t,r){var o=r.defaultValue==null?"":r.defaultValue,d=r.checked!=null?r.checked:r.defaultChecked;o=be(r.value!=null?r.value:o),t._wrapperState={initialChecked:d,initialValue:o,controlled:r.type==="checkbox"||r.type==="radio"?r.checked!=null:r.value!=null}}function mu(t,r){r=r.checked,r!=null&&P(t,"checked",r,!1)}function yo(t,r){mu(t,r);var o=be(r.value),d=r.type;if(o!=null)d==="number"?(o===0&&t.value===""||t.value!=o)&&(t.value=""+o):t.value!==""+o&&(t.value=""+o);else if(d==="submit"||d==="reset"){t.removeAttribute("value");return}r.hasOwnProperty("value")?wo(t,r.type,o):r.hasOwnProperty("defaultValue")&&wo(t,r.type,be(r.defaultValue)),r.checked==null&&r.defaultChecked!=null&&(t.defaultChecked=!!r.defaultChecked)}function gu(t,r,o){if(r.hasOwnProperty("value")||r.hasOwnProperty("defaultValue")){var d=r.type;if(!(d!=="submit"&&d!=="reset"||r.value!==void 0&&r.value!==null))return;r=""+t._wrapperState.initialValue,o||r===t.value||(t.value=r),t.defaultValue=r}o=t.name,o!==""&&(t.name=""),t.defaultChecked=!!t._wrapperState.initialChecked,o!==""&&(t.name=o)}function wo(t,r,o){(r!=="number"||Ns(t.ownerDocument)!==t)&&(o==null?t.defaultValue=""+t._wrapperState.initialValue:t.defaultValue!==""+o&&(t.defaultValue=""+o))}var dr=Array.isArray;function ji(t,r,o,d){if(t=t.options,r){r={};for(var h=0;h<o.length;h++)r["$"+o[h]]=!0;for(o=0;o<t.length;o++)h=r.hasOwnProperty("$"+t[o].value),t[o].selected!==h&&(t[o].selected=h),h&&d&&(t[o].defaultSelected=!0)}else{for(o=""+be(o),r=null,h=0;h<t.length;h++){if(t[h].value===o){t[h].selected=!0,d&&(t[h].defaultSelected=!0);return}r!==null||t[h].disabled||(r=t[h])}r!==null&&(r.selected=!0)}}function jo(t,r){if(r.dangerouslySetInnerHTML!=null)throw Error(s(91));return C({},r,{value:void 0,defaultValue:void 0,children:""+t._wrapperState.initialValue})}function xu(t,r){var o=r.value;if(o==null){if(o=r.children,r=r.defaultValue,o!=null){if(r!=null)throw Error(s(92));if(dr(o)){if(1<o.length)throw Error(s(93));o=o[0]}r=o}r==null&&(r=""),o=r}t._wrapperState={initialValue:be(o)}}function vu(t,r){var o=be(r.value),d=be(r.defaultValue);o!=null&&(o=""+o,o!==t.value&&(t.value=o),r.defaultValue==null&&t.defaultValue!==o&&(t.defaultValue=o)),d!=null&&(t.defaultValue=""+d)}function bu(t){var r=t.textContent;r===t._wrapperState.initialValue&&r!==""&&r!==null&&(t.value=r)}function yu(t){switch(t){case"svg":return"http://www.w3.org/2000/svg";case"math":return"http://www.w3.org/1998/Math/MathML";default:return"http://www.w3.org/1999/xhtml"}}function ko(t,r){return t==null||t==="http://www.w3.org/1999/xhtml"?yu(r):t==="http://www.w3.org/2000/svg"&&r==="foreignObject"?"http://www.w3.org/1999/xhtml":t}var Cs,wu=(function(t){return typeof MSApp<"u"&&MSApp.execUnsafeLocalFunction?function(r,o,d,h){MSApp.execUnsafeLocalFunction(function(){return t(r,o,d,h)})}:t})(function(t,r){if(t.namespaceURI!=="http://www.w3.org/2000/svg"||"innerHTML"in t)t.innerHTML=r;else{for(Cs=Cs||document.createElement("div"),Cs.innerHTML="<svg>"+r.valueOf().toString()+"</svg>",r=Cs.firstChild;t.firstChild;)t.removeChild(t.firstChild);for(;r.firstChild;)t.appendChild(r.firstChild)}});function ur(t,r){if(r){var o=t.firstChild;if(o&&o===t.lastChild&&o.nodeType===3){o.nodeValue=r;return}}t.textContent=r}var pr={animationIterationCount:!0,aspectRatio:!0,borderImageOutset:!0,borderImageSlice:!0,borderImageWidth:!0,boxFlex:!0,boxFlexGroup:!0,boxOrdinalGroup:!0,columnCount:!0,columns:!0,flex:!0,flexGrow:!0,flexPositive:!0,flexShrink:!0,flexNegative:!0,flexOrder:!0,gridArea:!0,gridRow:!0,gridRowEnd:!0,gridRowSpan:!0,gridRowStart:!0,gridColumn:!0,gridColumnEnd:!0,gridColumnSpan:!0,gridColumnStart:!0,fontWeight:!0,lineClamp:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,tabSize:!0,widows:!0,zIndex:!0,zoom:!0,fillOpacity:!0,floodOpacity:!0,stopOpacity:!0,strokeDasharray:!0,strokeDashoffset:!0,strokeMiterlimit:!0,strokeOpacity:!0,strokeWidth:!0},z1=["Webkit","ms","Moz","O"];Object.keys(pr).forEach(function(t){z1.forEach(function(r){r=r+t.charAt(0).toUpperCase()+t.substring(1),pr[r]=pr[t]})});function ju(t,r,o){return r==null||typeof r=="boolean"||r===""?"":o||typeof r!="number"||r===0||pr.hasOwnProperty(t)&&pr[t]?(""+r).trim():r+"px"}function ku(t,r){t=t.style;for(var o in r)if(r.hasOwnProperty(o)){var d=o.indexOf("--")===0,h=ju(o,r[o],d);o==="float"&&(o="cssFloat"),d?t.setProperty(o,h):t[o]=h}}var E1=C({menuitem:!0},{area:!0,base:!0,br:!0,col:!0,embed:!0,hr:!0,img:!0,input:!0,keygen:!0,link:!0,meta:!0,param:!0,source:!0,track:!0,wbr:!0});function So(t,r){if(r){if(E1[t]&&(r.children!=null||r.dangerouslySetInnerHTML!=null))throw Error(s(137,t));if(r.dangerouslySetInnerHTML!=null){if(r.children!=null)throw Error(s(60));if(typeof r.dangerouslySetInnerHTML!="object"||!("__html"in r.dangerouslySetInnerHTML))throw Error(s(61))}if(r.style!=null&&typeof r.style!="object")throw Error(s(62))}}function No(t,r){if(t.indexOf("-")===-1)return typeof r.is=="string";switch(t){case"annotation-xml":case"color-profile":case"font-face":case"font-face-src":case"font-face-uri":case"font-face-format":case"font-face-name":case"missing-glyph":return!1;default:return!0}}var Co=null;function To(t){return t=t.target||t.srcElement||window,t.correspondingUseElement&&(t=t.correspondingUseElement),t.nodeType===3?t.parentNode:t}var zo=null,ki=null,Si=null;function Su(t){if(t=Dr(t)){if(typeof zo!="function")throw Error(s(280));var r=t.stateNode;r&&(r=Xs(r),zo(t.stateNode,t.type,r))}}function Nu(t){ki?Si?Si.push(t):Si=[t]:ki=t}function Cu(){if(ki){var t=ki,r=Si;if(Si=ki=null,Su(t),r)for(t=0;t<r.length;t++)Su(r[t])}}function Tu(t,r){return t(r)}function zu(){}var Eo=!1;function Eu(t,r,o){if(Eo)return t(r,o);Eo=!0;try{return Tu(t,r,o)}finally{Eo=!1,(ki!==null||Si!==null)&&(zu(),Cu())}}function fr(t,r){var o=t.stateNode;if(o===null)return null;var d=Xs(o);if(d===null)return null;o=d[r];e:switch(r){case"onClick":case"onClickCapture":case"onDoubleClick":case"onDoubleClickCapture":case"onMouseDown":case"onMouseDownCapture":case"onMouseMove":case"onMouseMoveCapture":case"onMouseUp":case"onMouseUpCapture":case"onMouseEnter":(d=!d.disabled)||(t=t.type,d=!(t==="button"||t==="input"||t==="select"||t==="textarea")),t=!d;break e;default:t=!1}if(t)return null;if(o&&typeof o!="function")throw Error(s(231,r,typeof o));return o}var Po=!1;if(f)try{var hr={};Object.defineProperty(hr,"passive",{get:function(){Po=!0}}),window.addEventListener("test",hr,hr),window.removeEventListener("test",hr,hr)}catch{Po=!1}function P1(t,r,o,d,h,x,w,k,z){var V=Array.prototype.slice.call(arguments,3);try{r.apply(o,V)}catch($){this.onError($)}}var mr=!1,Ts=null,zs=!1,Mo=null,M1={onError:function(t){mr=!0,Ts=t}};function A1(t,r,o,d,h,x,w,k,z){mr=!1,Ts=null,P1.apply(M1,arguments)}function L1(t,r,o,d,h,x,w,k,z){if(A1.apply(this,arguments),mr){if(mr){var V=Ts;mr=!1,Ts=null}else throw Error(s(198));zs||(zs=!0,Mo=V)}}function Zn(t){var r=t,o=t;if(t.alternate)for(;r.return;)r=r.return;else{t=r;do r=t,(r.flags&4098)!==0&&(o=r.return),t=r.return;while(t)}return r.tag===3?o:null}function Pu(t){if(t.tag===13){var r=t.memoizedState;if(r===null&&(t=t.alternate,t!==null&&(r=t.memoizedState)),r!==null)return r.dehydrated}return null}function Mu(t){if(Zn(t)!==t)throw Error(s(188))}function D1(t){var r=t.alternate;if(!r){if(r=Zn(t),r===null)throw Error(s(188));return r!==t?null:t}for(var o=t,d=r;;){var h=o.return;if(h===null)break;var x=h.alternate;if(x===null){if(d=h.return,d!==null){o=d;continue}break}if(h.child===x.child){for(x=h.child;x;){if(x===o)return Mu(h),t;if(x===d)return Mu(h),r;x=x.sibling}throw Error(s(188))}if(o.return!==d.return)o=h,d=x;else{for(var w=!1,k=h.child;k;){if(k===o){w=!0,o=h,d=x;break}if(k===d){w=!0,d=h,o=x;break}k=k.sibling}if(!w){for(k=x.child;k;){if(k===o){w=!0,o=x,d=h;break}if(k===d){w=!0,d=x,o=h;break}k=k.sibling}if(!w)throw Error(s(189))}}if(o.alternate!==d)throw Error(s(190))}if(o.tag!==3)throw Error(s(188));return o.stateNode.current===o?t:r}function Au(t){return t=D1(t),t!==null?Lu(t):null}function Lu(t){if(t.tag===5||t.tag===6)return t;for(t=t.child;t!==null;){var r=Lu(t);if(r!==null)return r;t=t.sibling}return null}var Du=n.unstable_scheduleCallback,Fu=n.unstable_cancelCallback,F1=n.unstable_shouldYield,R1=n.unstable_requestPaint,We=n.unstable_now,I1=n.unstable_getCurrentPriorityLevel,Ao=n.unstable_ImmediatePriority,Ru=n.unstable_UserBlockingPriority,Es=n.unstable_NormalPriority,O1=n.unstable_LowPriority,Iu=n.unstable_IdlePriority,Ps=null,Xt=null;function V1(t){if(Xt&&typeof Xt.onCommitFiberRoot=="function")try{Xt.onCommitFiberRoot(Ps,t,void 0,(t.current.flags&128)===128)}catch{}}var Vt=Math.clz32?Math.clz32:W1,B1=Math.log,_1=Math.LN2;function W1(t){return t>>>=0,t===0?32:31-(B1(t)/_1|0)|0}var Ms=64,As=4194304;function gr(t){switch(t&-t){case 1:return 1;case 2:return 2;case 4:return 4;case 8:return 8;case 16:return 16;case 32:return 32;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return t&4194240;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return t&130023424;case 134217728:return 134217728;case 268435456:return 268435456;case 536870912:return 536870912;case 1073741824:return 1073741824;default:return t}}function Ls(t,r){var o=t.pendingLanes;if(o===0)return 0;var d=0,h=t.suspendedLanes,x=t.pingedLanes,w=o&268435455;if(w!==0){var k=w&~h;k!==0?d=gr(k):(x&=w,x!==0&&(d=gr(x)))}else w=o&~h,w!==0?d=gr(w):x!==0&&(d=gr(x));if(d===0)return 0;if(r!==0&&r!==d&&(r&h)===0&&(h=d&-d,x=r&-r,h>=x||h===16&&(x&4194240)!==0))return r;if((d&4)!==0&&(d|=o&16),r=t.entangledLanes,r!==0)for(t=t.entanglements,r&=d;0<r;)o=31-Vt(r),h=1<<o,d|=t[o],r&=~h;return d}function U1(t,r){switch(t){case 1:case 2:case 4:return r+250;case 8:case 16:case 32:case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:return r+5e3;case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:return-1;case 134217728:case 268435456:case 536870912:case 1073741824:return-1;default:return-1}}function Y1(t,r){for(var o=t.suspendedLanes,d=t.pingedLanes,h=t.expirationTimes,x=t.pendingLanes;0<x;){var w=31-Vt(x),k=1<<w,z=h[w];z===-1?((k&o)===0||(k&d)!==0)&&(h[w]=U1(k,r)):z<=r&&(t.expiredLanes|=k),x&=~k}}function Lo(t){return t=t.pendingLanes&-1073741825,t!==0?t:t&1073741824?1073741824:0}function Ou(){var t=Ms;return Ms<<=1,(Ms&4194240)===0&&(Ms=64),t}function Do(t){for(var r=[],o=0;31>o;o++)r.push(t);return r}function xr(t,r,o){t.pendingLanes|=r,r!==536870912&&(t.suspendedLanes=0,t.pingedLanes=0),t=t.eventTimes,r=31-Vt(r),t[r]=o}function $1(t,r){var o=t.pendingLanes&~r;t.pendingLanes=r,t.suspendedLanes=0,t.pingedLanes=0,t.expiredLanes&=r,t.mutableReadLanes&=r,t.entangledLanes&=r,r=t.entanglements;var d=t.eventTimes;for(t=t.expirationTimes;0<o;){var h=31-Vt(o),x=1<<h;r[h]=0,d[h]=-1,t[h]=-1,o&=~x}}function Fo(t,r){var o=t.entangledLanes|=r;for(t=t.entanglements;o;){var d=31-Vt(o),h=1<<d;h&r|t[d]&r&&(t[d]|=r),o&=~h}}var ye=0;function Vu(t){return t&=-t,1<t?4<t?(t&268435455)!==0?16:536870912:4:1}var Bu,Ro,_u,Wu,Uu,Io=!1,Ds=[],Tn=null,zn=null,En=null,vr=new Map,br=new Map,Pn=[],H1="mousedown mouseup touchcancel touchend touchstart auxclick dblclick pointercancel pointerdown pointerup dragend dragstart drop compositionend compositionstart keydown keypress keyup input textInput copy cut paste click change contextmenu reset submit".split(" ");function Yu(t,r){switch(t){case"focusin":case"focusout":Tn=null;break;case"dragenter":case"dragleave":zn=null;break;case"mouseover":case"mouseout":En=null;break;case"pointerover":case"pointerout":vr.delete(r.pointerId);break;case"gotpointercapture":case"lostpointercapture":br.delete(r.pointerId)}}function yr(t,r,o,d,h,x){return t===null||t.nativeEvent!==x?(t={blockedOn:r,domEventName:o,eventSystemFlags:d,nativeEvent:x,targetContainers:[h]},r!==null&&(r=Dr(r),r!==null&&Ro(r)),t):(t.eventSystemFlags|=d,r=t.targetContainers,h!==null&&r.indexOf(h)===-1&&r.push(h),t)}function G1(t,r,o,d,h){switch(r){case"focusin":return Tn=yr(Tn,t,r,o,d,h),!0;case"dragenter":return zn=yr(zn,t,r,o,d,h),!0;case"mouseover":return En=yr(En,t,r,o,d,h),!0;case"pointerover":var x=h.pointerId;return vr.set(x,yr(vr.get(x)||null,t,r,o,d,h)),!0;case"gotpointercapture":return x=h.pointerId,br.set(x,yr(br.get(x)||null,t,r,o,d,h)),!0}return!1}function $u(t){var r=Jn(t.target);if(r!==null){var o=Zn(r);if(o!==null){if(r=o.tag,r===13){if(r=Pu(o),r!==null){t.blockedOn=r,Uu(t.priority,function(){_u(o)});return}}else if(r===3&&o.stateNode.current.memoizedState.isDehydrated){t.blockedOn=o.tag===3?o.stateNode.containerInfo:null;return}}}t.blockedOn=null}function Fs(t){if(t.blockedOn!==null)return!1;for(var r=t.targetContainers;0<r.length;){var o=Vo(t.domEventName,t.eventSystemFlags,r[0],t.nativeEvent);if(o===null){o=t.nativeEvent;var d=new o.constructor(o.type,o);Co=d,o.target.dispatchEvent(d),Co=null}else return r=Dr(o),r!==null&&Ro(r),t.blockedOn=o,!1;r.shift()}return!0}function Hu(t,r,o){Fs(t)&&o.delete(r)}function q1(){Io=!1,Tn!==null&&Fs(Tn)&&(Tn=null),zn!==null&&Fs(zn)&&(zn=null),En!==null&&Fs(En)&&(En=null),vr.forEach(Hu),br.forEach(Hu)}function wr(t,r){t.blockedOn===r&&(t.blockedOn=null,Io||(Io=!0,n.unstable_scheduleCallback(n.unstable_NormalPriority,q1)))}function jr(t){function r(h){return wr(h,t)}if(0<Ds.length){wr(Ds[0],t);for(var o=1;o<Ds.length;o++){var d=Ds[o];d.blockedOn===t&&(d.blockedOn=null)}}for(Tn!==null&&wr(Tn,t),zn!==null&&wr(zn,t),En!==null&&wr(En,t),vr.forEach(r),br.forEach(r),o=0;o<Pn.length;o++)d=Pn[o],d.blockedOn===t&&(d.blockedOn=null);for(;0<Pn.length&&(o=Pn[0],o.blockedOn===null);)$u(o),o.blockedOn===null&&Pn.shift()}var Ni=B.ReactCurrentBatchConfig,Rs=!0;function X1(t,r,o,d){var h=ye,x=Ni.transition;Ni.transition=null;try{ye=1,Oo(t,r,o,d)}finally{ye=h,Ni.transition=x}}function K1(t,r,o,d){var h=ye,x=Ni.transition;Ni.transition=null;try{ye=4,Oo(t,r,o,d)}finally{ye=h,Ni.transition=x}}function Oo(t,r,o,d){if(Rs){var h=Vo(t,r,o,d);if(h===null)nl(t,r,d,Is,o),Yu(t,d);else if(G1(h,t,r,o,d))d.stopPropagation();else if(Yu(t,d),r&4&&-1<H1.indexOf(t)){for(;h!==null;){var x=Dr(h);if(x!==null&&Bu(x),x=Vo(t,r,o,d),x===null&&nl(t,r,d,Is,o),x===h)break;h=x}h!==null&&d.stopPropagation()}else nl(t,r,d,null,o)}}var Is=null;function Vo(t,r,o,d){if(Is=null,t=To(d),t=Jn(t),t!==null)if(r=Zn(t),r===null)t=null;else if(o=r.tag,o===13){if(t=Pu(r),t!==null)return t;t=null}else if(o===3){if(r.stateNode.current.memoizedState.isDehydrated)return r.tag===3?r.stateNode.containerInfo:null;t=null}else r!==t&&(t=null);return Is=t,null}function Gu(t){switch(t){case"cancel":case"click":case"close":case"contextmenu":case"copy":case"cut":case"auxclick":case"dblclick":case"dragend":case"dragstart":case"drop":case"focusin":case"focusout":case"input":case"invalid":case"keydown":case"keypress":case"keyup":case"mousedown":case"mouseup":case"paste":case"pause":case"play":case"pointercancel":case"pointerdown":case"pointerup":case"ratechange":case"reset":case"resize":case"seeked":case"submit":case"touchcancel":case"touchend":case"touchstart":case"volumechange":case"change":case"selectionchange":case"textInput":case"compositionstart":case"compositionend":case"compositionupdate":case"beforeblur":case"afterblur":case"beforeinput":case"blur":case"fullscreenchange":case"focus":case"hashchange":case"popstate":case"select":case"selectstart":return 1;case"drag":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"mousemove":case"mouseout":case"mouseover":case"pointermove":case"pointerout":case"pointerover":case"scroll":case"toggle":case"touchmove":case"wheel":case"mouseenter":case"mouseleave":case"pointerenter":case"pointerleave":return 4;case"message":switch(I1()){case Ao:return 1;case Ru:return 4;case Es:case O1:return 16;case Iu:return 536870912;default:return 16}default:return 16}}var Mn=null,Bo=null,Os=null;function qu(){if(Os)return Os;var t,r=Bo,o=r.length,d,h="value"in Mn?Mn.value:Mn.textContent,x=h.length;for(t=0;t<o&&r[t]===h[t];t++);var w=o-t;for(d=1;d<=w&&r[o-d]===h[x-d];d++);return Os=h.slice(t,1<d?1-d:void 0)}function Vs(t){var r=t.keyCode;return"charCode"in t?(t=t.charCode,t===0&&r===13&&(t=13)):t=r,t===10&&(t=13),32<=t||t===13?t:0}function Bs(){return!0}function Xu(){return!1}function jt(t){function r(o,d,h,x,w){this._reactName=o,this._targetInst=h,this.type=d,this.nativeEvent=x,this.target=w,this.currentTarget=null;for(var k in t)t.hasOwnProperty(k)&&(o=t[k],this[k]=o?o(x):x[k]);return this.isDefaultPrevented=(x.defaultPrevented!=null?x.defaultPrevented:x.returnValue===!1)?Bs:Xu,this.isPropagationStopped=Xu,this}return C(r.prototype,{preventDefault:function(){this.defaultPrevented=!0;var o=this.nativeEvent;o&&(o.preventDefault?o.preventDefault():typeof o.returnValue!="unknown"&&(o.returnValue=!1),this.isDefaultPrevented=Bs)},stopPropagation:function(){var o=this.nativeEvent;o&&(o.stopPropagation?o.stopPropagation():typeof o.cancelBubble!="unknown"&&(o.cancelBubble=!0),this.isPropagationStopped=Bs)},persist:function(){},isPersistent:Bs}),r}var Ci={eventPhase:0,bubbles:0,cancelable:0,timeStamp:function(t){return t.timeStamp||Date.now()},defaultPrevented:0,isTrusted:0},_o=jt(Ci),kr=C({},Ci,{view:0,detail:0}),Q1=jt(kr),Wo,Uo,Sr,_s=C({},kr,{screenX:0,screenY:0,clientX:0,clientY:0,pageX:0,pageY:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,getModifierState:$o,button:0,buttons:0,relatedTarget:function(t){return t.relatedTarget===void 0?t.fromElement===t.srcElement?t.toElement:t.fromElement:t.relatedTarget},movementX:function(t){return"movementX"in t?t.movementX:(t!==Sr&&(Sr&&t.type==="mousemove"?(Wo=t.screenX-Sr.screenX,Uo=t.screenY-Sr.screenY):Uo=Wo=0,Sr=t),Wo)},movementY:function(t){return"movementY"in t?t.movementY:Uo}}),Ku=jt(_s),Z1=C({},_s,{dataTransfer:0}),J1=jt(Z1),ex=C({},kr,{relatedTarget:0}),Yo=jt(ex),tx=C({},Ci,{animationName:0,elapsedTime:0,pseudoElement:0}),nx=jt(tx),ix=C({},Ci,{clipboardData:function(t){return"clipboardData"in t?t.clipboardData:window.clipboardData}}),rx=jt(ix),sx=C({},Ci,{data:0}),Qu=jt(sx),ax={Esc:"Escape",Spacebar:" ",Left:"ArrowLeft",Up:"ArrowUp",Right:"ArrowRight",Down:"ArrowDown",Del:"Delete",Win:"OS",Menu:"ContextMenu",Apps:"ContextMenu",Scroll:"ScrollLock",MozPrintableKey:"Unidentified"},ox={8:"Backspace",9:"Tab",12:"Clear",13:"Enter",16:"Shift",17:"Control",18:"Alt",19:"Pause",20:"CapsLock",27:"Escape",32:" ",33:"PageUp",34:"PageDown",35:"End",36:"Home",37:"ArrowLeft",38:"ArrowUp",39:"ArrowRight",40:"ArrowDown",45:"Insert",46:"Delete",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"NumLock",145:"ScrollLock",224:"Meta"},lx={Alt:"altKey",Control:"ctrlKey",Meta:"metaKey",Shift:"shiftKey"};function cx(t){var r=this.nativeEvent;return r.getModifierState?r.getModifierState(t):(t=lx[t])?!!r[t]:!1}function $o(){return cx}var dx=C({},kr,{key:function(t){if(t.key){var r=ax[t.key]||t.key;if(r!=="Unidentified")return r}return t.type==="keypress"?(t=Vs(t),t===13?"Enter":String.fromCharCode(t)):t.type==="keydown"||t.type==="keyup"?ox[t.keyCode]||"Unidentified":""},code:0,location:0,ctrlKey:0,shiftKey:0,altKey:0,metaKey:0,repeat:0,locale:0,getModifierState:$o,charCode:function(t){return t.type==="keypress"?Vs(t):0},keyCode:function(t){return t.type==="keydown"||t.type==="keyup"?t.keyCode:0},which:function(t){return t.type==="keypress"?Vs(t):t.type==="keydown"||t.type==="keyup"?t.keyCode:0}}),ux=jt(dx),px=C({},_s,{pointerId:0,width:0,height:0,pressure:0,tangentialPressure:0,tiltX:0,tiltY:0,twist:0,pointerType:0,isPrimary:0}),Zu=jt(px),fx=C({},kr,{touches:0,targetTouches:0,changedTouches:0,altKey:0,metaKey:0,ctrlKey:0,shiftKey:0,getModifierState:$o}),hx=jt(fx),mx=C({},Ci,{propertyName:0,elapsedTime:0,pseudoElement:0}),gx=jt(mx),xx=C({},_s,{deltaX:function(t){return"deltaX"in t?t.deltaX:"wheelDeltaX"in t?-t.wheelDeltaX:0},deltaY:function(t){return"deltaY"in t?t.deltaY:"wheelDeltaY"in t?-t.wheelDeltaY:"wheelDelta"in t?-t.wheelDelta:0},deltaZ:0,deltaMode:0}),vx=jt(xx),bx=[9,13,27,32],Ho=f&&"CompositionEvent"in window,Nr=null;f&&"documentMode"in document&&(Nr=document.documentMode);var yx=f&&"TextEvent"in window&&!Nr,Ju=f&&(!Ho||Nr&&8<Nr&&11>=Nr),ep=" ",tp=!1;function np(t,r){switch(t){case"keyup":return bx.indexOf(r.keyCode)!==-1;case"keydown":return r.keyCode!==229;case"keypress":case"mousedown":case"focusout":return!0;default:return!1}}function ip(t){return t=t.detail,typeof t=="object"&&"data"in t?t.data:null}var Ti=!1;function wx(t,r){switch(t){case"compositionend":return ip(r);case"keypress":return r.which!==32?null:(tp=!0,ep);case"textInput":return t=r.data,t===ep&&tp?null:t;default:return null}}function jx(t,r){if(Ti)return t==="compositionend"||!Ho&&np(t,r)?(t=qu(),Os=Bo=Mn=null,Ti=!1,t):null;switch(t){case"paste":return null;case"keypress":if(!(r.ctrlKey||r.altKey||r.metaKey)||r.ctrlKey&&r.altKey){if(r.char&&1<r.char.length)return r.char;if(r.which)return String.fromCharCode(r.which)}return null;case"compositionend":return Ju&&r.locale!=="ko"?null:r.data;default:return null}}var kx={color:!0,date:!0,datetime:!0,"datetime-local":!0,email:!0,month:!0,number:!0,password:!0,range:!0,search:!0,tel:!0,text:!0,time:!0,url:!0,week:!0};function rp(t){var r=t&&t.nodeName&&t.nodeName.toLowerCase();return r==="input"?!!kx[t.type]:r==="textarea"}function sp(t,r,o,d){Nu(d),r=Hs(r,"onChange"),0<r.length&&(o=new _o("onChange","change",null,o,d),t.push({event:o,listeners:r}))}var Cr=null,Tr=null;function Sx(t){kp(t,0)}function Ws(t){var r=Ai(t);if(fu(r))return t}function Nx(t,r){if(t==="change")return r}var ap=!1;if(f){var Go;if(f){var qo="oninput"in document;if(!qo){var op=document.createElement("div");op.setAttribute("oninput","return;"),qo=typeof op.oninput=="function"}Go=qo}else Go=!1;ap=Go&&(!document.documentMode||9<document.documentMode)}function lp(){Cr&&(Cr.detachEvent("onpropertychange",cp),Tr=Cr=null)}function cp(t){if(t.propertyName==="value"&&Ws(Tr)){var r=[];sp(r,Tr,t,To(t)),Eu(Sx,r)}}function Cx(t,r,o){t==="focusin"?(lp(),Cr=r,Tr=o,Cr.attachEvent("onpropertychange",cp)):t==="focusout"&&lp()}function Tx(t){if(t==="selectionchange"||t==="keyup"||t==="keydown")return Ws(Tr)}function zx(t,r){if(t==="click")return Ws(r)}function Ex(t,r){if(t==="input"||t==="change")return Ws(r)}function Px(t,r){return t===r&&(t!==0||1/t===1/r)||t!==t&&r!==r}var Bt=typeof Object.is=="function"?Object.is:Px;function zr(t,r){if(Bt(t,r))return!0;if(typeof t!="object"||t===null||typeof r!="object"||r===null)return!1;var o=Object.keys(t),d=Object.keys(r);if(o.length!==d.length)return!1;for(d=0;d<o.length;d++){var h=o[d];if(!p.call(r,h)||!Bt(t[h],r[h]))return!1}return!0}function dp(t){for(;t&&t.firstChild;)t=t.firstChild;return t}function up(t,r){var o=dp(t);t=0;for(var d;o;){if(o.nodeType===3){if(d=t+o.textContent.length,t<=r&&d>=r)return{node:o,offset:r-t};t=d}e:{for(;o;){if(o.nextSibling){o=o.nextSibling;break e}o=o.parentNode}o=void 0}o=dp(o)}}function pp(t,r){return t&&r?t===r?!0:t&&t.nodeType===3?!1:r&&r.nodeType===3?pp(t,r.parentNode):"contains"in t?t.contains(r):t.compareDocumentPosition?!!(t.compareDocumentPosition(r)&16):!1:!1}function fp(){for(var t=window,r=Ns();r instanceof t.HTMLIFrameElement;){try{var o=typeof r.contentWindow.location.href=="string"}catch{o=!1}if(o)t=r.contentWindow;else break;r=Ns(t.document)}return r}function Xo(t){var r=t&&t.nodeName&&t.nodeName.toLowerCase();return r&&(r==="input"&&(t.type==="text"||t.type==="search"||t.type==="tel"||t.type==="url"||t.type==="password")||r==="textarea"||t.contentEditable==="true")}function Mx(t){var r=fp(),o=t.focusedElem,d=t.selectionRange;if(r!==o&&o&&o.ownerDocument&&pp(o.ownerDocument.documentElement,o)){if(d!==null&&Xo(o)){if(r=d.start,t=d.end,t===void 0&&(t=r),"selectionStart"in o)o.selectionStart=r,o.selectionEnd=Math.min(t,o.value.length);else if(t=(r=o.ownerDocument||document)&&r.defaultView||window,t.getSelection){t=t.getSelection();var h=o.textContent.length,x=Math.min(d.start,h);d=d.end===void 0?x:Math.min(d.end,h),!t.extend&&x>d&&(h=d,d=x,x=h),h=up(o,x);var w=up(o,d);h&&w&&(t.rangeCount!==1||t.anchorNode!==h.node||t.anchorOffset!==h.offset||t.focusNode!==w.node||t.focusOffset!==w.offset)&&(r=r.createRange(),r.setStart(h.node,h.offset),t.removeAllRanges(),x>d?(t.addRange(r),t.extend(w.node,w.offset)):(r.setEnd(w.node,w.offset),t.addRange(r)))}}for(r=[],t=o;t=t.parentNode;)t.nodeType===1&&r.push({element:t,left:t.scrollLeft,top:t.scrollTop});for(typeof o.focus=="function"&&o.focus(),o=0;o<r.length;o++)t=r[o],t.element.scrollLeft=t.left,t.element.scrollTop=t.top}}var Ax=f&&"documentMode"in document&&11>=document.documentMode,zi=null,Ko=null,Er=null,Qo=!1;function hp(t,r,o){var d=o.window===o?o.document:o.nodeType===9?o:o.ownerDocument;Qo||zi==null||zi!==Ns(d)||(d=zi,"selectionStart"in d&&Xo(d)?d={start:d.selectionStart,end:d.selectionEnd}:(d=(d.ownerDocument&&d.ownerDocument.defaultView||window).getSelection(),d={anchorNode:d.anchorNode,anchorOffset:d.anchorOffset,focusNode:d.focusNode,focusOffset:d.focusOffset}),Er&&zr(Er,d)||(Er=d,d=Hs(Ko,"onSelect"),0<d.length&&(r=new _o("onSelect","select",null,r,o),t.push({event:r,listeners:d}),r.target=zi)))}function Us(t,r){var o={};return o[t.toLowerCase()]=r.toLowerCase(),o["Webkit"+t]="webkit"+r,o["Moz"+t]="moz"+r,o}var Ei={animationend:Us("Animation","AnimationEnd"),animationiteration:Us("Animation","AnimationIteration"),animationstart:Us("Animation","AnimationStart"),transitionend:Us("Transition","TransitionEnd")},Zo={},mp={};f&&(mp=document.createElement("div").style,"AnimationEvent"in window||(delete Ei.animationend.animation,delete Ei.animationiteration.animation,delete Ei.animationstart.animation),"TransitionEvent"in window||delete Ei.transitionend.transition);function Ys(t){if(Zo[t])return Zo[t];if(!Ei[t])return t;var r=Ei[t],o;for(o in r)if(r.hasOwnProperty(o)&&o in mp)return Zo[t]=r[o];return t}var gp=Ys("animationend"),xp=Ys("animationiteration"),vp=Ys("animationstart"),bp=Ys("transitionend"),yp=new Map,wp="abort auxClick cancel canPlay canPlayThrough click close contextMenu copy cut drag dragEnd dragEnter dragExit dragLeave dragOver dragStart drop durationChange emptied encrypted ended error gotPointerCapture input invalid keyDown keyPress keyUp load loadedData loadedMetadata loadStart lostPointerCapture mouseDown mouseMove mouseOut mouseOver mouseUp paste pause play playing pointerCancel pointerDown pointerMove pointerOut pointerOver pointerUp progress rateChange reset resize seeked seeking stalled submit suspend timeUpdate touchCancel touchEnd touchStart volumeChange scroll toggle touchMove waiting wheel".split(" ");function An(t,r){yp.set(t,r),c(r,[t])}for(var Jo=0;Jo<wp.length;Jo++){var el=wp[Jo],Lx=el.toLowerCase(),Dx=el[0].toUpperCase()+el.slice(1);An(Lx,"on"+Dx)}An(gp,"onAnimationEnd"),An(xp,"onAnimationIteration"),An(vp,"onAnimationStart"),An("dblclick","onDoubleClick"),An("focusin","onFocus"),An("focusout","onBlur"),An(bp,"onTransitionEnd"),u("onMouseEnter",["mouseout","mouseover"]),u("onMouseLeave",["mouseout","mouseover"]),u("onPointerEnter",["pointerout","pointerover"]),u("onPointerLeave",["pointerout","pointerover"]),c("onChange","change click focusin focusout input keydown keyup selectionchange".split(" ")),c("onSelect","focusout contextmenu dragend focusin keydown keyup mousedown mouseup selectionchange".split(" ")),c("onBeforeInput",["compositionend","keypress","textInput","paste"]),c("onCompositionEnd","compositionend focusout keydown keypress keyup mousedown".split(" ")),c("onCompositionStart","compositionstart focusout keydown keypress keyup mousedown".split(" ")),c("onCompositionUpdate","compositionupdate focusout keydown keypress keyup mousedown".split(" "));var Pr="abort canplay canplaythrough durationchange emptied encrypted ended error loadeddata loadedmetadata loadstart pause play playing progress ratechange resize seeked seeking stalled suspend timeupdate volumechange waiting".split(" "),Fx=new Set("cancel close invalid load scroll toggle".split(" ").concat(Pr));function jp(t,r,o){var d=t.type||"unknown-event";t.currentTarget=o,L1(d,r,void 0,t),t.currentTarget=null}function kp(t,r){r=(r&4)!==0;for(var o=0;o<t.length;o++){var d=t[o],h=d.event;d=d.listeners;e:{var x=void 0;if(r)for(var w=d.length-1;0<=w;w--){var k=d[w],z=k.instance,V=k.currentTarget;if(k=k.listener,z!==x&&h.isPropagationStopped())break e;jp(h,k,V),x=z}else for(w=0;w<d.length;w++){if(k=d[w],z=k.instance,V=k.currentTarget,k=k.listener,z!==x&&h.isPropagationStopped())break e;jp(h,k,V),x=z}}}if(zs)throw t=Mo,zs=!1,Mo=null,t}function Te(t,r){var o=r[ll];o===void 0&&(o=r[ll]=new Set);var d=t+"__bubble";o.has(d)||(Sp(r,t,2,!1),o.add(d))}function tl(t,r,o){var d=0;r&&(d|=4),Sp(o,t,d,r)}var $s="_reactListening"+Math.random().toString(36).slice(2);function Mr(t){if(!t[$s]){t[$s]=!0,a.forEach(function(o){o!=="selectionchange"&&(Fx.has(o)||tl(o,!1,t),tl(o,!0,t))});var r=t.nodeType===9?t:t.ownerDocument;r===null||r[$s]||(r[$s]=!0,tl("selectionchange",!1,r))}}function Sp(t,r,o,d){switch(Gu(r)){case 1:var h=X1;break;case 4:h=K1;break;default:h=Oo}o=h.bind(null,r,o,t),h=void 0,!Po||r!=="touchstart"&&r!=="touchmove"&&r!=="wheel"||(h=!0),d?h!==void 0?t.addEventListener(r,o,{capture:!0,passive:h}):t.addEventListener(r,o,!0):h!==void 0?t.addEventListener(r,o,{passive:h}):t.addEventListener(r,o,!1)}function nl(t,r,o,d,h){var x=d;if((r&1)===0&&(r&2)===0&&d!==null)e:for(;;){if(d===null)return;var w=d.tag;if(w===3||w===4){var k=d.stateNode.containerInfo;if(k===h||k.nodeType===8&&k.parentNode===h)break;if(w===4)for(w=d.return;w!==null;){var z=w.tag;if((z===3||z===4)&&(z=w.stateNode.containerInfo,z===h||z.nodeType===8&&z.parentNode===h))return;w=w.return}for(;k!==null;){if(w=Jn(k),w===null)return;if(z=w.tag,z===5||z===6){d=x=w;continue e}k=k.parentNode}}d=d.return}Eu(function(){var V=x,$=To(o),q=[];e:{var U=yp.get(t);if(U!==void 0){var J=_o,te=t;switch(t){case"keypress":if(Vs(o)===0)break e;case"keydown":case"keyup":J=ux;break;case"focusin":te="focus",J=Yo;break;case"focusout":te="blur",J=Yo;break;case"beforeblur":case"afterblur":J=Yo;break;case"click":if(o.button===2)break e;case"auxclick":case"dblclick":case"mousedown":case"mousemove":case"mouseup":case"mouseout":case"mouseover":case"contextmenu":J=Ku;break;case"drag":case"dragend":case"dragenter":case"dragexit":case"dragleave":case"dragover":case"dragstart":case"drop":J=J1;break;case"touchcancel":case"touchend":case"touchmove":case"touchstart":J=hx;break;case gp:case xp:case vp:J=nx;break;case bp:J=gx;break;case"scroll":J=Q1;break;case"wheel":J=vx;break;case"copy":case"cut":case"paste":J=rx;break;case"gotpointercapture":case"lostpointercapture":case"pointercancel":case"pointerdown":case"pointermove":case"pointerout":case"pointerover":case"pointerup":J=Zu}var ne=(r&4)!==0,Ue=!ne&&t==="scroll",R=ne?U!==null?U+"Capture":null:U;ne=[];for(var A=V,I;A!==null;){I=A;var Q=I.stateNode;if(I.tag===5&&Q!==null&&(I=Q,R!==null&&(Q=fr(A,R),Q!=null&&ne.push(Ar(A,Q,I)))),Ue)break;A=A.return}0<ne.length&&(U=new J(U,te,null,o,$),q.push({event:U,listeners:ne}))}}if((r&7)===0){e:{if(U=t==="mouseover"||t==="pointerover",J=t==="mouseout"||t==="pointerout",U&&o!==Co&&(te=o.relatedTarget||o.fromElement)&&(Jn(te)||te[ln]))break e;if((J||U)&&(U=$.window===$?$:(U=$.ownerDocument)?U.defaultView||U.parentWindow:window,J?(te=o.relatedTarget||o.toElement,J=V,te=te?Jn(te):null,te!==null&&(Ue=Zn(te),te!==Ue||te.tag!==5&&te.tag!==6)&&(te=null)):(J=null,te=V),J!==te)){if(ne=Ku,Q="onMouseLeave",R="onMouseEnter",A="mouse",(t==="pointerout"||t==="pointerover")&&(ne=Zu,Q="onPointerLeave",R="onPointerEnter",A="pointer"),Ue=J==null?U:Ai(J),I=te==null?U:Ai(te),U=new ne(Q,A+"leave",J,o,$),U.target=Ue,U.relatedTarget=I,Q=null,Jn($)===V&&(ne=new ne(R,A+"enter",te,o,$),ne.target=I,ne.relatedTarget=Ue,Q=ne),Ue=Q,J&&te)t:{for(ne=J,R=te,A=0,I=ne;I;I=Pi(I))A++;for(I=0,Q=R;Q;Q=Pi(Q))I++;for(;0<A-I;)ne=Pi(ne),A--;for(;0<I-A;)R=Pi(R),I--;for(;A--;){if(ne===R||R!==null&&ne===R.alternate)break t;ne=Pi(ne),R=Pi(R)}ne=null}else ne=null;J!==null&&Np(q,U,J,ne,!1),te!==null&&Ue!==null&&Np(q,Ue,te,ne,!0)}}e:{if(U=V?Ai(V):window,J=U.nodeName&&U.nodeName.toLowerCase(),J==="select"||J==="input"&&U.type==="file")var ie=Nx;else if(rp(U))if(ap)ie=Ex;else{ie=Tx;var ae=Cx}else(J=U.nodeName)&&J.toLowerCase()==="input"&&(U.type==="checkbox"||U.type==="radio")&&(ie=zx);if(ie&&(ie=ie(t,V))){sp(q,ie,o,$);break e}ae&&ae(t,U,V),t==="focusout"&&(ae=U._wrapperState)&&ae.controlled&&U.type==="number"&&wo(U,"number",U.value)}switch(ae=V?Ai(V):window,t){case"focusin":(rp(ae)||ae.contentEditable==="true")&&(zi=ae,Ko=V,Er=null);break;case"focusout":Er=Ko=zi=null;break;case"mousedown":Qo=!0;break;case"contextmenu":case"mouseup":case"dragend":Qo=!1,hp(q,o,$);break;case"selectionchange":if(Ax)break;case"keydown":case"keyup":hp(q,o,$)}var oe;if(Ho)e:{switch(t){case"compositionstart":var ce="onCompositionStart";break e;case"compositionend":ce="onCompositionEnd";break e;case"compositionupdate":ce="onCompositionUpdate";break e}ce=void 0}else Ti?np(t,o)&&(ce="onCompositionEnd"):t==="keydown"&&o.keyCode===229&&(ce="onCompositionStart");ce&&(Ju&&o.locale!=="ko"&&(Ti||ce!=="onCompositionStart"?ce==="onCompositionEnd"&&Ti&&(oe=qu()):(Mn=$,Bo="value"in Mn?Mn.value:Mn.textContent,Ti=!0)),ae=Hs(V,ce),0<ae.length&&(ce=new Qu(ce,t,null,o,$),q.push({event:ce,listeners:ae}),oe?ce.data=oe:(oe=ip(o),oe!==null&&(ce.data=oe)))),(oe=yx?wx(t,o):jx(t,o))&&(V=Hs(V,"onBeforeInput"),0<V.length&&($=new Qu("onBeforeInput","beforeinput",null,o,$),q.push({event:$,listeners:V}),$.data=oe))}kp(q,r)})}function Ar(t,r,o){return{instance:t,listener:r,currentTarget:o}}function Hs(t,r){for(var o=r+"Capture",d=[];t!==null;){var h=t,x=h.stateNode;h.tag===5&&x!==null&&(h=x,x=fr(t,o),x!=null&&d.unshift(Ar(t,x,h)),x=fr(t,r),x!=null&&d.push(Ar(t,x,h))),t=t.return}return d}function Pi(t){if(t===null)return null;do t=t.return;while(t&&t.tag!==5);return t||null}function Np(t,r,o,d,h){for(var x=r._reactName,w=[];o!==null&&o!==d;){var k=o,z=k.alternate,V=k.stateNode;if(z!==null&&z===d)break;k.tag===5&&V!==null&&(k=V,h?(z=fr(o,x),z!=null&&w.unshift(Ar(o,z,k))):h||(z=fr(o,x),z!=null&&w.push(Ar(o,z,k)))),o=o.return}w.length!==0&&t.push({event:r,listeners:w})}var Rx=/\r\n?/g,Ix=/\u0000|\uFFFD/g;function Cp(t){return(typeof t=="string"?t:""+t).replace(Rx,`
`).replace(Ix,"")}function Gs(t,r,o){if(r=Cp(r),Cp(t)!==r&&o)throw Error(s(425))}function qs(){}var il=null,rl=null;function sl(t,r){return t==="textarea"||t==="noscript"||typeof r.children=="string"||typeof r.children=="number"||typeof r.dangerouslySetInnerHTML=="object"&&r.dangerouslySetInnerHTML!==null&&r.dangerouslySetInnerHTML.__html!=null}var al=typeof setTimeout=="function"?setTimeout:void 0,Ox=typeof clearTimeout=="function"?clearTimeout:void 0,Tp=typeof Promise=="function"?Promise:void 0,Vx=typeof queueMicrotask=="function"?queueMicrotask:typeof Tp<"u"?function(t){return Tp.resolve(null).then(t).catch(Bx)}:al;function Bx(t){setTimeout(function(){throw t})}function ol(t,r){var o=r,d=0;do{var h=o.nextSibling;if(t.removeChild(o),h&&h.nodeType===8)if(o=h.data,o==="/$"){if(d===0){t.removeChild(h),jr(r);return}d--}else o!=="$"&&o!=="$?"&&o!=="$!"||d++;o=h}while(o);jr(r)}function Ln(t){for(;t!=null;t=t.nextSibling){var r=t.nodeType;if(r===1||r===3)break;if(r===8){if(r=t.data,r==="$"||r==="$!"||r==="$?")break;if(r==="/$")return null}}return t}function zp(t){t=t.previousSibling;for(var r=0;t;){if(t.nodeType===8){var o=t.data;if(o==="$"||o==="$!"||o==="$?"){if(r===0)return t;r--}else o==="/$"&&r++}t=t.previousSibling}return null}var Mi=Math.random().toString(36).slice(2),Kt="__reactFiber$"+Mi,Lr="__reactProps$"+Mi,ln="__reactContainer$"+Mi,ll="__reactEvents$"+Mi,_x="__reactListeners$"+Mi,Wx="__reactHandles$"+Mi;function Jn(t){var r=t[Kt];if(r)return r;for(var o=t.parentNode;o;){if(r=o[ln]||o[Kt]){if(o=r.alternate,r.child!==null||o!==null&&o.child!==null)for(t=zp(t);t!==null;){if(o=t[Kt])return o;t=zp(t)}return r}t=o,o=t.parentNode}return null}function Dr(t){return t=t[Kt]||t[ln],!t||t.tag!==5&&t.tag!==6&&t.tag!==13&&t.tag!==3?null:t}function Ai(t){if(t.tag===5||t.tag===6)return t.stateNode;throw Error(s(33))}function Xs(t){return t[Lr]||null}var cl=[],Li=-1;function Dn(t){return{current:t}}function ze(t){0>Li||(t.current=cl[Li],cl[Li]=null,Li--)}function Ne(t,r){Li++,cl[Li]=t.current,t.current=r}var Fn={},rt=Dn(Fn),mt=Dn(!1),ei=Fn;function Di(t,r){var o=t.type.contextTypes;if(!o)return Fn;var d=t.stateNode;if(d&&d.__reactInternalMemoizedUnmaskedChildContext===r)return d.__reactInternalMemoizedMaskedChildContext;var h={},x;for(x in o)h[x]=r[x];return d&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=r,t.__reactInternalMemoizedMaskedChildContext=h),h}function gt(t){return t=t.childContextTypes,t!=null}function Ks(){ze(mt),ze(rt)}function Ep(t,r,o){if(rt.current!==Fn)throw Error(s(168));Ne(rt,r),Ne(mt,o)}function Pp(t,r,o){var d=t.stateNode;if(r=r.childContextTypes,typeof d.getChildContext!="function")return o;d=d.getChildContext();for(var h in d)if(!(h in r))throw Error(s(108,je(t)||"Unknown",h));return C({},o,d)}function Qs(t){return t=(t=t.stateNode)&&t.__reactInternalMemoizedMergedChildContext||Fn,ei=rt.current,Ne(rt,t),Ne(mt,mt.current),!0}function Mp(t,r,o){var d=t.stateNode;if(!d)throw Error(s(169));o?(t=Pp(t,r,ei),d.__reactInternalMemoizedMergedChildContext=t,ze(mt),ze(rt),Ne(rt,t)):ze(mt),Ne(mt,o)}var cn=null,Zs=!1,dl=!1;function Ap(t){cn===null?cn=[t]:cn.push(t)}function Ux(t){Zs=!0,Ap(t)}function Rn(){if(!dl&&cn!==null){dl=!0;var t=0,r=ye;try{var o=cn;for(ye=1;t<o.length;t++){var d=o[t];do d=d(!0);while(d!==null)}cn=null,Zs=!1}catch(h){throw cn!==null&&(cn=cn.slice(t+1)),Du(Ao,Rn),h}finally{ye=r,dl=!1}}return null}var Fi=[],Ri=0,Js=null,ea=0,Tt=[],zt=0,ti=null,dn=1,un="";function ni(t,r){Fi[Ri++]=ea,Fi[Ri++]=Js,Js=t,ea=r}function Lp(t,r,o){Tt[zt++]=dn,Tt[zt++]=un,Tt[zt++]=ti,ti=t;var d=dn;t=un;var h=32-Vt(d)-1;d&=~(1<<h),o+=1;var x=32-Vt(r)+h;if(30<x){var w=h-h%5;x=(d&(1<<w)-1).toString(32),d>>=w,h-=w,dn=1<<32-Vt(r)+h|o<<h|d,un=x+t}else dn=1<<x|o<<h|d,un=t}function ul(t){t.return!==null&&(ni(t,1),Lp(t,1,0))}function pl(t){for(;t===Js;)Js=Fi[--Ri],Fi[Ri]=null,ea=Fi[--Ri],Fi[Ri]=null;for(;t===ti;)ti=Tt[--zt],Tt[zt]=null,un=Tt[--zt],Tt[zt]=null,dn=Tt[--zt],Tt[zt]=null}var kt=null,St=null,Ee=!1,_t=null;function Dp(t,r){var o=At(5,null,null,0);o.elementType="DELETED",o.stateNode=r,o.return=t,r=t.deletions,r===null?(t.deletions=[o],t.flags|=16):r.push(o)}function Fp(t,r){switch(t.tag){case 5:var o=t.type;return r=r.nodeType!==1||o.toLowerCase()!==r.nodeName.toLowerCase()?null:r,r!==null?(t.stateNode=r,kt=t,St=Ln(r.firstChild),!0):!1;case 6:return r=t.pendingProps===""||r.nodeType!==3?null:r,r!==null?(t.stateNode=r,kt=t,St=null,!0):!1;case 13:return r=r.nodeType!==8?null:r,r!==null?(o=ti!==null?{id:dn,overflow:un}:null,t.memoizedState={dehydrated:r,treeContext:o,retryLane:1073741824},o=At(18,null,null,0),o.stateNode=r,o.return=t,t.child=o,kt=t,St=null,!0):!1;default:return!1}}function fl(t){return(t.mode&1)!==0&&(t.flags&128)===0}function hl(t){if(Ee){var r=St;if(r){var o=r;if(!Fp(t,r)){if(fl(t))throw Error(s(418));r=Ln(o.nextSibling);var d=kt;r&&Fp(t,r)?Dp(d,o):(t.flags=t.flags&-4097|2,Ee=!1,kt=t)}}else{if(fl(t))throw Error(s(418));t.flags=t.flags&-4097|2,Ee=!1,kt=t}}}function Rp(t){for(t=t.return;t!==null&&t.tag!==5&&t.tag!==3&&t.tag!==13;)t=t.return;kt=t}function ta(t){if(t!==kt)return!1;if(!Ee)return Rp(t),Ee=!0,!1;var r;if((r=t.tag!==3)&&!(r=t.tag!==5)&&(r=t.type,r=r!=="head"&&r!=="body"&&!sl(t.type,t.memoizedProps)),r&&(r=St)){if(fl(t))throw Ip(),Error(s(418));for(;r;)Dp(t,r),r=Ln(r.nextSibling)}if(Rp(t),t.tag===13){if(t=t.memoizedState,t=t!==null?t.dehydrated:null,!t)throw Error(s(317));e:{for(t=t.nextSibling,r=0;t;){if(t.nodeType===8){var o=t.data;if(o==="/$"){if(r===0){St=Ln(t.nextSibling);break e}r--}else o!=="$"&&o!=="$!"&&o!=="$?"||r++}t=t.nextSibling}St=null}}else St=kt?Ln(t.stateNode.nextSibling):null;return!0}function Ip(){for(var t=St;t;)t=Ln(t.nextSibling)}function Ii(){St=kt=null,Ee=!1}function ml(t){_t===null?_t=[t]:_t.push(t)}var Yx=B.ReactCurrentBatchConfig;function Wt(t,r){if(t&&t.defaultProps){r=C({},r),t=t.defaultProps;for(var o in t)r[o]===void 0&&(r[o]=t[o]);return r}return r}var na=Dn(null),ia=null,Oi=null,gl=null;function xl(){gl=Oi=ia=null}function vl(t){var r=na.current;ze(na),t._currentValue=r}function bl(t,r,o){for(;t!==null;){var d=t.alternate;if((t.childLanes&r)!==r?(t.childLanes|=r,d!==null&&(d.childLanes|=r)):d!==null&&(d.childLanes&r)!==r&&(d.childLanes|=r),t===o)break;t=t.return}}function Vi(t,r){ia=t,gl=Oi=null,t=t.dependencies,t!==null&&t.firstContext!==null&&((t.lanes&r)!==0&&(xt=!0),t.firstContext=null)}function Et(t){var r=t._currentValue;if(gl!==t)if(t={context:t,memoizedValue:r,next:null},Oi===null){if(ia===null)throw Error(s(308));Oi=t,ia.dependencies={lanes:0,firstContext:t}}else Oi=Oi.next=t;return r}var ii=null;function yl(t){ii===null?ii=[t]:ii.push(t)}function Op(t,r,o,d){var h=r.interleaved;return h===null?(o.next=o,yl(r)):(o.next=h.next,h.next=o),r.interleaved=o,pn(t,d)}function pn(t,r){t.lanes|=r;var o=t.alternate;for(o!==null&&(o.lanes|=r),o=t,t=t.return;t!==null;)t.childLanes|=r,o=t.alternate,o!==null&&(o.childLanes|=r),o=t,t=t.return;return o.tag===3?o.stateNode:null}var In=!1;function wl(t){t.updateQueue={baseState:t.memoizedState,firstBaseUpdate:null,lastBaseUpdate:null,shared:{pending:null,interleaved:null,lanes:0},effects:null}}function Vp(t,r){t=t.updateQueue,r.updateQueue===t&&(r.updateQueue={baseState:t.baseState,firstBaseUpdate:t.firstBaseUpdate,lastBaseUpdate:t.lastBaseUpdate,shared:t.shared,effects:t.effects})}function fn(t,r){return{eventTime:t,lane:r,tag:0,payload:null,callback:null,next:null}}function On(t,r,o){var d=t.updateQueue;if(d===null)return null;if(d=d.shared,(ge&2)!==0){var h=d.pending;return h===null?r.next=r:(r.next=h.next,h.next=r),d.pending=r,pn(t,o)}return h=d.interleaved,h===null?(r.next=r,yl(d)):(r.next=h.next,h.next=r),d.interleaved=r,pn(t,o)}function ra(t,r,o){if(r=r.updateQueue,r!==null&&(r=r.shared,(o&4194240)!==0)){var d=r.lanes;d&=t.pendingLanes,o|=d,r.lanes=o,Fo(t,o)}}function Bp(t,r){var o=t.updateQueue,d=t.alternate;if(d!==null&&(d=d.updateQueue,o===d)){var h=null,x=null;if(o=o.firstBaseUpdate,o!==null){do{var w={eventTime:o.eventTime,lane:o.lane,tag:o.tag,payload:o.payload,callback:o.callback,next:null};x===null?h=x=w:x=x.next=w,o=o.next}while(o!==null);x===null?h=x=r:x=x.next=r}else h=x=r;o={baseState:d.baseState,firstBaseUpdate:h,lastBaseUpdate:x,shared:d.shared,effects:d.effects},t.updateQueue=o;return}t=o.lastBaseUpdate,t===null?o.firstBaseUpdate=r:t.next=r,o.lastBaseUpdate=r}function sa(t,r,o,d){var h=t.updateQueue;In=!1;var x=h.firstBaseUpdate,w=h.lastBaseUpdate,k=h.shared.pending;if(k!==null){h.shared.pending=null;var z=k,V=z.next;z.next=null,w===null?x=V:w.next=V,w=z;var $=t.alternate;$!==null&&($=$.updateQueue,k=$.lastBaseUpdate,k!==w&&(k===null?$.firstBaseUpdate=V:k.next=V,$.lastBaseUpdate=z))}if(x!==null){var q=h.baseState;w=0,$=V=z=null,k=x;do{var U=k.lane,J=k.eventTime;if((d&U)===U){$!==null&&($=$.next={eventTime:J,lane:0,tag:k.tag,payload:k.payload,callback:k.callback,next:null});e:{var te=t,ne=k;switch(U=r,J=o,ne.tag){case 1:if(te=ne.payload,typeof te=="function"){q=te.call(J,q,U);break e}q=te;break e;case 3:te.flags=te.flags&-65537|128;case 0:if(te=ne.payload,U=typeof te=="function"?te.call(J,q,U):te,U==null)break e;q=C({},q,U);break e;case 2:In=!0}}k.callback!==null&&k.lane!==0&&(t.flags|=64,U=h.effects,U===null?h.effects=[k]:U.push(k))}else J={eventTime:J,lane:U,tag:k.tag,payload:k.payload,callback:k.callback,next:null},$===null?(V=$=J,z=q):$=$.next=J,w|=U;if(k=k.next,k===null){if(k=h.shared.pending,k===null)break;U=k,k=U.next,U.next=null,h.lastBaseUpdate=U,h.shared.pending=null}}while(!0);if($===null&&(z=q),h.baseState=z,h.firstBaseUpdate=V,h.lastBaseUpdate=$,r=h.shared.interleaved,r!==null){h=r;do w|=h.lane,h=h.next;while(h!==r)}else x===null&&(h.shared.lanes=0);ai|=w,t.lanes=w,t.memoizedState=q}}function _p(t,r,o){if(t=r.effects,r.effects=null,t!==null)for(r=0;r<t.length;r++){var d=t[r],h=d.callback;if(h!==null){if(d.callback=null,d=o,typeof h!="function")throw Error(s(191,h));h.call(d)}}}var Wp=new e.Component().refs;function jl(t,r,o,d){r=t.memoizedState,o=o(d,r),o=o==null?r:C({},r,o),t.memoizedState=o,t.lanes===0&&(t.updateQueue.baseState=o)}var aa={isMounted:function(t){return(t=t._reactInternals)?Zn(t)===t:!1},enqueueSetState:function(t,r,o){t=t._reactInternals;var d=ut(),h=Wn(t),x=fn(d,h);x.payload=r,o!=null&&(x.callback=o),r=On(t,x,h),r!==null&&($t(r,t,h,d),ra(r,t,h))},enqueueReplaceState:function(t,r,o){t=t._reactInternals;var d=ut(),h=Wn(t),x=fn(d,h);x.tag=1,x.payload=r,o!=null&&(x.callback=o),r=On(t,x,h),r!==null&&($t(r,t,h,d),ra(r,t,h))},enqueueForceUpdate:function(t,r){t=t._reactInternals;var o=ut(),d=Wn(t),h=fn(o,d);h.tag=2,r!=null&&(h.callback=r),r=On(t,h,d),r!==null&&($t(r,t,d,o),ra(r,t,d))}};function Up(t,r,o,d,h,x,w){return t=t.stateNode,typeof t.shouldComponentUpdate=="function"?t.shouldComponentUpdate(d,x,w):r.prototype&&r.prototype.isPureReactComponent?!zr(o,d)||!zr(h,x):!0}function Yp(t,r,o){var d=!1,h=Fn,x=r.contextType;return typeof x=="object"&&x!==null?x=Et(x):(h=gt(r)?ei:rt.current,d=r.contextTypes,x=(d=d!=null)?Di(t,h):Fn),r=new r(o,x),t.memoizedState=r.state!==null&&r.state!==void 0?r.state:null,r.updater=aa,t.stateNode=r,r._reactInternals=t,d&&(t=t.stateNode,t.__reactInternalMemoizedUnmaskedChildContext=h,t.__reactInternalMemoizedMaskedChildContext=x),r}function $p(t,r,o,d){t=r.state,typeof r.componentWillReceiveProps=="function"&&r.componentWillReceiveProps(o,d),typeof r.UNSAFE_componentWillReceiveProps=="function"&&r.UNSAFE_componentWillReceiveProps(o,d),r.state!==t&&aa.enqueueReplaceState(r,r.state,null)}function kl(t,r,o,d){var h=t.stateNode;h.props=o,h.state=t.memoizedState,h.refs=Wp,wl(t);var x=r.contextType;typeof x=="object"&&x!==null?h.context=Et(x):(x=gt(r)?ei:rt.current,h.context=Di(t,x)),h.state=t.memoizedState,x=r.getDerivedStateFromProps,typeof x=="function"&&(jl(t,r,x,o),h.state=t.memoizedState),typeof r.getDerivedStateFromProps=="function"||typeof h.getSnapshotBeforeUpdate=="function"||typeof h.UNSAFE_componentWillMount!="function"&&typeof h.componentWillMount!="function"||(r=h.state,typeof h.componentWillMount=="function"&&h.componentWillMount(),typeof h.UNSAFE_componentWillMount=="function"&&h.UNSAFE_componentWillMount(),r!==h.state&&aa.enqueueReplaceState(h,h.state,null),sa(t,o,h,d),h.state=t.memoizedState),typeof h.componentDidMount=="function"&&(t.flags|=4194308)}function Fr(t,r,o){if(t=o.ref,t!==null&&typeof t!="function"&&typeof t!="object"){if(o._owner){if(o=o._owner,o){if(o.tag!==1)throw Error(s(309));var d=o.stateNode}if(!d)throw Error(s(147,t));var h=d,x=""+t;return r!==null&&r.ref!==null&&typeof r.ref=="function"&&r.ref._stringRef===x?r.ref:(r=function(w){var k=h.refs;k===Wp&&(k=h.refs={}),w===null?delete k[x]:k[x]=w},r._stringRef=x,r)}if(typeof t!="string")throw Error(s(284));if(!o._owner)throw Error(s(290,t))}return t}function oa(t,r){throw t=Object.prototype.toString.call(r),Error(s(31,t==="[object Object]"?"object with keys {"+Object.keys(r).join(", ")+"}":t))}function Hp(t){var r=t._init;return r(t._payload)}function Gp(t){function r(R,A){if(t){var I=R.deletions;I===null?(R.deletions=[A],R.flags|=16):I.push(A)}}function o(R,A){if(!t)return null;for(;A!==null;)r(R,A),A=A.sibling;return null}function d(R,A){for(R=new Map;A!==null;)A.key!==null?R.set(A.key,A):R.set(A.index,A),A=A.sibling;return R}function h(R,A){return R=Yn(R,A),R.index=0,R.sibling=null,R}function x(R,A,I){return R.index=I,t?(I=R.alternate,I!==null?(I=I.index,I<A?(R.flags|=2,A):I):(R.flags|=2,A)):(R.flags|=1048576,A)}function w(R){return t&&R.alternate===null&&(R.flags|=2),R}function k(R,A,I,Q){return A===null||A.tag!==6?(A=ac(I,R.mode,Q),A.return=R,A):(A=h(A,I),A.return=R,A)}function z(R,A,I,Q){var ie=I.type;return ie===_?$(R,A,I.props.children,Q,I.key):A!==null&&(A.elementType===ie||typeof ie=="object"&&ie!==null&&ie.$$typeof===Ie&&Hp(ie)===A.type)?(Q=h(A,I.props),Q.ref=Fr(R,A,I),Q.return=R,Q):(Q=Ca(I.type,I.key,I.props,null,R.mode,Q),Q.ref=Fr(R,A,I),Q.return=R,Q)}function V(R,A,I,Q){return A===null||A.tag!==4||A.stateNode.containerInfo!==I.containerInfo||A.stateNode.implementation!==I.implementation?(A=oc(I,R.mode,Q),A.return=R,A):(A=h(A,I.children||[]),A.return=R,A)}function $(R,A,I,Q,ie){return A===null||A.tag!==7?(A=di(I,R.mode,Q,ie),A.return=R,A):(A=h(A,I),A.return=R,A)}function q(R,A,I){if(typeof A=="string"&&A!==""||typeof A=="number")return A=ac(""+A,R.mode,I),A.return=R,A;if(typeof A=="object"&&A!==null){switch(A.$$typeof){case M:return I=Ca(A.type,A.key,A.props,null,R.mode,I),I.ref=Fr(R,null,A),I.return=R,I;case F:return A=oc(A,R.mode,I),A.return=R,A;case Ie:var Q=A._init;return q(R,Q(A._payload),I)}if(dr(A)||G(A))return A=di(A,R.mode,I,null),A.return=R,A;oa(R,A)}return null}function U(R,A,I,Q){var ie=A!==null?A.key:null;if(typeof I=="string"&&I!==""||typeof I=="number")return ie!==null?null:k(R,A,""+I,Q);if(typeof I=="object"&&I!==null){switch(I.$$typeof){case M:return I.key===ie?z(R,A,I,Q):null;case F:return I.key===ie?V(R,A,I,Q):null;case Ie:return ie=I._init,U(R,A,ie(I._payload),Q)}if(dr(I)||G(I))return ie!==null?null:$(R,A,I,Q,null);oa(R,I)}return null}function J(R,A,I,Q,ie){if(typeof Q=="string"&&Q!==""||typeof Q=="number")return R=R.get(I)||null,k(A,R,""+Q,ie);if(typeof Q=="object"&&Q!==null){switch(Q.$$typeof){case M:return R=R.get(Q.key===null?I:Q.key)||null,z(A,R,Q,ie);case F:return R=R.get(Q.key===null?I:Q.key)||null,V(A,R,Q,ie);case Ie:var ae=Q._init;return J(R,A,I,ae(Q._payload),ie)}if(dr(Q)||G(Q))return R=R.get(I)||null,$(A,R,Q,ie,null);oa(A,Q)}return null}function te(R,A,I,Q){for(var ie=null,ae=null,oe=A,ce=A=0,Je=null;oe!==null&&ce<I.length;ce++){oe.index>ce?(Je=oe,oe=null):Je=oe.sibling;var xe=U(R,oe,I[ce],Q);if(xe===null){oe===null&&(oe=Je);break}t&&oe&&xe.alternate===null&&r(R,oe),A=x(xe,A,ce),ae===null?ie=xe:ae.sibling=xe,ae=xe,oe=Je}if(ce===I.length)return o(R,oe),Ee&&ni(R,ce),ie;if(oe===null){for(;ce<I.length;ce++)oe=q(R,I[ce],Q),oe!==null&&(A=x(oe,A,ce),ae===null?ie=oe:ae.sibling=oe,ae=oe);return Ee&&ni(R,ce),ie}for(oe=d(R,oe);ce<I.length;ce++)Je=J(oe,R,ce,I[ce],Q),Je!==null&&(t&&Je.alternate!==null&&oe.delete(Je.key===null?ce:Je.key),A=x(Je,A,ce),ae===null?ie=Je:ae.sibling=Je,ae=Je);return t&&oe.forEach(function($n){return r(R,$n)}),Ee&&ni(R,ce),ie}function ne(R,A,I,Q){var ie=G(I);if(typeof ie!="function")throw Error(s(150));if(I=ie.call(I),I==null)throw Error(s(151));for(var ae=ie=null,oe=A,ce=A=0,Je=null,xe=I.next();oe!==null&&!xe.done;ce++,xe=I.next()){oe.index>ce?(Je=oe,oe=null):Je=oe.sibling;var $n=U(R,oe,xe.value,Q);if($n===null){oe===null&&(oe=Je);break}t&&oe&&$n.alternate===null&&r(R,oe),A=x($n,A,ce),ae===null?ie=$n:ae.sibling=$n,ae=$n,oe=Je}if(xe.done)return o(R,oe),Ee&&ni(R,ce),ie;if(oe===null){for(;!xe.done;ce++,xe=I.next())xe=q(R,xe.value,Q),xe!==null&&(A=x(xe,A,ce),ae===null?ie=xe:ae.sibling=xe,ae=xe);return Ee&&ni(R,ce),ie}for(oe=d(R,oe);!xe.done;ce++,xe=I.next())xe=J(oe,R,ce,xe.value,Q),xe!==null&&(t&&xe.alternate!==null&&oe.delete(xe.key===null?ce:xe.key),A=x(xe,A,ce),ae===null?ie=xe:ae.sibling=xe,ae=xe);return t&&oe.forEach(function(k2){return r(R,k2)}),Ee&&ni(R,ce),ie}function Ue(R,A,I,Q){if(typeof I=="object"&&I!==null&&I.type===_&&I.key===null&&(I=I.props.children),typeof I=="object"&&I!==null){switch(I.$$typeof){case M:e:{for(var ie=I.key,ae=A;ae!==null;){if(ae.key===ie){if(ie=I.type,ie===_){if(ae.tag===7){o(R,ae.sibling),A=h(ae,I.props.children),A.return=R,R=A;break e}}else if(ae.elementType===ie||typeof ie=="object"&&ie!==null&&ie.$$typeof===Ie&&Hp(ie)===ae.type){o(R,ae.sibling),A=h(ae,I.props),A.ref=Fr(R,ae,I),A.return=R,R=A;break e}o(R,ae);break}else r(R,ae);ae=ae.sibling}I.type===_?(A=di(I.props.children,R.mode,Q,I.key),A.return=R,R=A):(Q=Ca(I.type,I.key,I.props,null,R.mode,Q),Q.ref=Fr(R,A,I),Q.return=R,R=Q)}return w(R);case F:e:{for(ae=I.key;A!==null;){if(A.key===ae)if(A.tag===4&&A.stateNode.containerInfo===I.containerInfo&&A.stateNode.implementation===I.implementation){o(R,A.sibling),A=h(A,I.children||[]),A.return=R,R=A;break e}else{o(R,A);break}else r(R,A);A=A.sibling}A=oc(I,R.mode,Q),A.return=R,R=A}return w(R);case Ie:return ae=I._init,Ue(R,A,ae(I._payload),Q)}if(dr(I))return te(R,A,I,Q);if(G(I))return ne(R,A,I,Q);oa(R,I)}return typeof I=="string"&&I!==""||typeof I=="number"?(I=""+I,A!==null&&A.tag===6?(o(R,A.sibling),A=h(A,I),A.return=R,R=A):(o(R,A),A=ac(I,R.mode,Q),A.return=R,R=A),w(R)):o(R,A)}return Ue}var Bi=Gp(!0),qp=Gp(!1),Rr={},Qt=Dn(Rr),Ir=Dn(Rr),Or=Dn(Rr);function ri(t){if(t===Rr)throw Error(s(174));return t}function Sl(t,r){switch(Ne(Or,r),Ne(Ir,t),Ne(Qt,Rr),t=r.nodeType,t){case 9:case 11:r=(r=r.documentElement)?r.namespaceURI:ko(null,"");break;default:t=t===8?r.parentNode:r,r=t.namespaceURI||null,t=t.tagName,r=ko(r,t)}ze(Qt),Ne(Qt,r)}function _i(){ze(Qt),ze(Ir),ze(Or)}function Xp(t){ri(Or.current);var r=ri(Qt.current),o=ko(r,t.type);r!==o&&(Ne(Ir,t),Ne(Qt,o))}function Nl(t){Ir.current===t&&(ze(Qt),ze(Ir))}var Ae=Dn(0);function la(t){for(var r=t;r!==null;){if(r.tag===13){var o=r.memoizedState;if(o!==null&&(o=o.dehydrated,o===null||o.data==="$?"||o.data==="$!"))return r}else if(r.tag===19&&r.memoizedProps.revealOrder!==void 0){if((r.flags&128)!==0)return r}else if(r.child!==null){r.child.return=r,r=r.child;continue}if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return null;r=r.return}r.sibling.return=r.return,r=r.sibling}return null}var Cl=[];function Tl(){for(var t=0;t<Cl.length;t++)Cl[t]._workInProgressVersionPrimary=null;Cl.length=0}var ca=B.ReactCurrentDispatcher,zl=B.ReactCurrentBatchConfig,si=0,Le=null,Ge=null,Qe=null,da=!1,Vr=!1,Br=0,$x=0;function st(){throw Error(s(321))}function El(t,r){if(r===null)return!1;for(var o=0;o<r.length&&o<t.length;o++)if(!Bt(t[o],r[o]))return!1;return!0}function Pl(t,r,o,d,h,x){if(si=x,Le=r,r.memoizedState=null,r.updateQueue=null,r.lanes=0,ca.current=t===null||t.memoizedState===null?Xx:Kx,t=o(d,h),Vr){x=0;do{if(Vr=!1,Br=0,25<=x)throw Error(s(301));x+=1,Qe=Ge=null,r.updateQueue=null,ca.current=Qx,t=o(d,h)}while(Vr)}if(ca.current=fa,r=Ge!==null&&Ge.next!==null,si=0,Qe=Ge=Le=null,da=!1,r)throw Error(s(300));return t}function Ml(){var t=Br!==0;return Br=0,t}function Zt(){var t={memoizedState:null,baseState:null,baseQueue:null,queue:null,next:null};return Qe===null?Le.memoizedState=Qe=t:Qe=Qe.next=t,Qe}function Pt(){if(Ge===null){var t=Le.alternate;t=t!==null?t.memoizedState:null}else t=Ge.next;var r=Qe===null?Le.memoizedState:Qe.next;if(r!==null)Qe=r,Ge=t;else{if(t===null)throw Error(s(310));Ge=t,t={memoizedState:Ge.memoizedState,baseState:Ge.baseState,baseQueue:Ge.baseQueue,queue:Ge.queue,next:null},Qe===null?Le.memoizedState=Qe=t:Qe=Qe.next=t}return Qe}function _r(t,r){return typeof r=="function"?r(t):r}function Al(t){var r=Pt(),o=r.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=t;var d=Ge,h=d.baseQueue,x=o.pending;if(x!==null){if(h!==null){var w=h.next;h.next=x.next,x.next=w}d.baseQueue=h=x,o.pending=null}if(h!==null){x=h.next,d=d.baseState;var k=w=null,z=null,V=x;do{var $=V.lane;if((si&$)===$)z!==null&&(z=z.next={lane:0,action:V.action,hasEagerState:V.hasEagerState,eagerState:V.eagerState,next:null}),d=V.hasEagerState?V.eagerState:t(d,V.action);else{var q={lane:$,action:V.action,hasEagerState:V.hasEagerState,eagerState:V.eagerState,next:null};z===null?(k=z=q,w=d):z=z.next=q,Le.lanes|=$,ai|=$}V=V.next}while(V!==null&&V!==x);z===null?w=d:z.next=k,Bt(d,r.memoizedState)||(xt=!0),r.memoizedState=d,r.baseState=w,r.baseQueue=z,o.lastRenderedState=d}if(t=o.interleaved,t!==null){h=t;do x=h.lane,Le.lanes|=x,ai|=x,h=h.next;while(h!==t)}else h===null&&(o.lanes=0);return[r.memoizedState,o.dispatch]}function Ll(t){var r=Pt(),o=r.queue;if(o===null)throw Error(s(311));o.lastRenderedReducer=t;var d=o.dispatch,h=o.pending,x=r.memoizedState;if(h!==null){o.pending=null;var w=h=h.next;do x=t(x,w.action),w=w.next;while(w!==h);Bt(x,r.memoizedState)||(xt=!0),r.memoizedState=x,r.baseQueue===null&&(r.baseState=x),o.lastRenderedState=x}return[x,d]}function Kp(){}function Qp(t,r){var o=Le,d=Pt(),h=r(),x=!Bt(d.memoizedState,h);if(x&&(d.memoizedState=h,xt=!0),d=d.queue,Dl(e0.bind(null,o,d,t),[t]),d.getSnapshot!==r||x||Qe!==null&&Qe.memoizedState.tag&1){if(o.flags|=2048,Wr(9,Jp.bind(null,o,d,h,r),void 0,null),Ze===null)throw Error(s(349));(si&30)!==0||Zp(o,r,h)}return h}function Zp(t,r,o){t.flags|=16384,t={getSnapshot:r,value:o},r=Le.updateQueue,r===null?(r={lastEffect:null,stores:null},Le.updateQueue=r,r.stores=[t]):(o=r.stores,o===null?r.stores=[t]:o.push(t))}function Jp(t,r,o,d){r.value=o,r.getSnapshot=d,t0(r)&&n0(t)}function e0(t,r,o){return o(function(){t0(r)&&n0(t)})}function t0(t){var r=t.getSnapshot;t=t.value;try{var o=r();return!Bt(t,o)}catch{return!0}}function n0(t){var r=pn(t,1);r!==null&&$t(r,t,1,-1)}function i0(t){var r=Zt();return typeof t=="function"&&(t=t()),r.memoizedState=r.baseState=t,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:_r,lastRenderedState:t},r.queue=t,t=t.dispatch=qx.bind(null,Le,t),[r.memoizedState,t]}function Wr(t,r,o,d){return t={tag:t,create:r,destroy:o,deps:d,next:null},r=Le.updateQueue,r===null?(r={lastEffect:null,stores:null},Le.updateQueue=r,r.lastEffect=t.next=t):(o=r.lastEffect,o===null?r.lastEffect=t.next=t:(d=o.next,o.next=t,t.next=d,r.lastEffect=t)),t}function r0(){return Pt().memoizedState}function ua(t,r,o,d){var h=Zt();Le.flags|=t,h.memoizedState=Wr(1|r,o,void 0,d===void 0?null:d)}function pa(t,r,o,d){var h=Pt();d=d===void 0?null:d;var x=void 0;if(Ge!==null){var w=Ge.memoizedState;if(x=w.destroy,d!==null&&El(d,w.deps)){h.memoizedState=Wr(r,o,x,d);return}}Le.flags|=t,h.memoizedState=Wr(1|r,o,x,d)}function s0(t,r){return ua(8390656,8,t,r)}function Dl(t,r){return pa(2048,8,t,r)}function a0(t,r){return pa(4,2,t,r)}function o0(t,r){return pa(4,4,t,r)}function l0(t,r){if(typeof r=="function")return t=t(),r(t),function(){r(null)};if(r!=null)return t=t(),r.current=t,function(){r.current=null}}function c0(t,r,o){return o=o!=null?o.concat([t]):null,pa(4,4,l0.bind(null,r,t),o)}function Fl(){}function d0(t,r){var o=Pt();r=r===void 0?null:r;var d=o.memoizedState;return d!==null&&r!==null&&El(r,d[1])?d[0]:(o.memoizedState=[t,r],t)}function u0(t,r){var o=Pt();r=r===void 0?null:r;var d=o.memoizedState;return d!==null&&r!==null&&El(r,d[1])?d[0]:(t=t(),o.memoizedState=[t,r],t)}function p0(t,r,o){return(si&21)===0?(t.baseState&&(t.baseState=!1,xt=!0),t.memoizedState=o):(Bt(o,r)||(o=Ou(),Le.lanes|=o,ai|=o,t.baseState=!0),r)}function Hx(t,r){var o=ye;ye=o!==0&&4>o?o:4,t(!0);var d=zl.transition;zl.transition={};try{t(!1),r()}finally{ye=o,zl.transition=d}}function f0(){return Pt().memoizedState}function Gx(t,r,o){var d=Wn(t);if(o={lane:d,action:o,hasEagerState:!1,eagerState:null,next:null},h0(t))m0(r,o);else if(o=Op(t,r,o,d),o!==null){var h=ut();$t(o,t,d,h),g0(o,r,d)}}function qx(t,r,o){var d=Wn(t),h={lane:d,action:o,hasEagerState:!1,eagerState:null,next:null};if(h0(t))m0(r,h);else{var x=t.alternate;if(t.lanes===0&&(x===null||x.lanes===0)&&(x=r.lastRenderedReducer,x!==null))try{var w=r.lastRenderedState,k=x(w,o);if(h.hasEagerState=!0,h.eagerState=k,Bt(k,w)){var z=r.interleaved;z===null?(h.next=h,yl(r)):(h.next=z.next,z.next=h),r.interleaved=h;return}}catch{}finally{}o=Op(t,r,h,d),o!==null&&(h=ut(),$t(o,t,d,h),g0(o,r,d))}}function h0(t){var r=t.alternate;return t===Le||r!==null&&r===Le}function m0(t,r){Vr=da=!0;var o=t.pending;o===null?r.next=r:(r.next=o.next,o.next=r),t.pending=r}function g0(t,r,o){if((o&4194240)!==0){var d=r.lanes;d&=t.pendingLanes,o|=d,r.lanes=o,Fo(t,o)}}var fa={readContext:Et,useCallback:st,useContext:st,useEffect:st,useImperativeHandle:st,useInsertionEffect:st,useLayoutEffect:st,useMemo:st,useReducer:st,useRef:st,useState:st,useDebugValue:st,useDeferredValue:st,useTransition:st,useMutableSource:st,useSyncExternalStore:st,useId:st,unstable_isNewReconciler:!1},Xx={readContext:Et,useCallback:function(t,r){return Zt().memoizedState=[t,r===void 0?null:r],t},useContext:Et,useEffect:s0,useImperativeHandle:function(t,r,o){return o=o!=null?o.concat([t]):null,ua(4194308,4,l0.bind(null,r,t),o)},useLayoutEffect:function(t,r){return ua(4194308,4,t,r)},useInsertionEffect:function(t,r){return ua(4,2,t,r)},useMemo:function(t,r){var o=Zt();return r=r===void 0?null:r,t=t(),o.memoizedState=[t,r],t},useReducer:function(t,r,o){var d=Zt();return r=o!==void 0?o(r):r,d.memoizedState=d.baseState=r,t={pending:null,interleaved:null,lanes:0,dispatch:null,lastRenderedReducer:t,lastRenderedState:r},d.queue=t,t=t.dispatch=Gx.bind(null,Le,t),[d.memoizedState,t]},useRef:function(t){var r=Zt();return t={current:t},r.memoizedState=t},useState:i0,useDebugValue:Fl,useDeferredValue:function(t){return Zt().memoizedState=t},useTransition:function(){var t=i0(!1),r=t[0];return t=Hx.bind(null,t[1]),Zt().memoizedState=t,[r,t]},useMutableSource:function(){},useSyncExternalStore:function(t,r,o){var d=Le,h=Zt();if(Ee){if(o===void 0)throw Error(s(407));o=o()}else{if(o=r(),Ze===null)throw Error(s(349));(si&30)!==0||Zp(d,r,o)}h.memoizedState=o;var x={value:o,getSnapshot:r};return h.queue=x,s0(e0.bind(null,d,x,t),[t]),d.flags|=2048,Wr(9,Jp.bind(null,d,x,o,r),void 0,null),o},useId:function(){var t=Zt(),r=Ze.identifierPrefix;if(Ee){var o=un,d=dn;o=(d&~(1<<32-Vt(d)-1)).toString(32)+o,r=":"+r+"R"+o,o=Br++,0<o&&(r+="H"+o.toString(32)),r+=":"}else o=$x++,r=":"+r+"r"+o.toString(32)+":";return t.memoizedState=r},unstable_isNewReconciler:!1},Kx={readContext:Et,useCallback:d0,useContext:Et,useEffect:Dl,useImperativeHandle:c0,useInsertionEffect:a0,useLayoutEffect:o0,useMemo:u0,useReducer:Al,useRef:r0,useState:function(){return Al(_r)},useDebugValue:Fl,useDeferredValue:function(t){var r=Pt();return p0(r,Ge.memoizedState,t)},useTransition:function(){var t=Al(_r)[0],r=Pt().memoizedState;return[t,r]},useMutableSource:Kp,useSyncExternalStore:Qp,useId:f0,unstable_isNewReconciler:!1},Qx={readContext:Et,useCallback:d0,useContext:Et,useEffect:Dl,useImperativeHandle:c0,useInsertionEffect:a0,useLayoutEffect:o0,useMemo:u0,useReducer:Ll,useRef:r0,useState:function(){return Ll(_r)},useDebugValue:Fl,useDeferredValue:function(t){var r=Pt();return Ge===null?r.memoizedState=t:p0(r,Ge.memoizedState,t)},useTransition:function(){var t=Ll(_r)[0],r=Pt().memoizedState;return[t,r]},useMutableSource:Kp,useSyncExternalStore:Qp,useId:f0,unstable_isNewReconciler:!1};function Wi(t,r){try{var o="",d=r;do o+=Se(d),d=d.return;while(d);var h=o}catch(x){h=`
Error generating stack: `+x.message+`
`+x.stack}return{value:t,source:r,stack:h,digest:null}}function Rl(t,r,o){return{value:t,source:null,stack:o??null,digest:r??null}}function Il(t,r){try{console.error(r.value)}catch(o){setTimeout(function(){throw o})}}var Zx=typeof WeakMap=="function"?WeakMap:Map;function x0(t,r,o){o=fn(-1,o),o.tag=3,o.payload={element:null};var d=r.value;return o.callback=function(){ya||(ya=!0,Zl=d),Il(t,r)},o}function v0(t,r,o){o=fn(-1,o),o.tag=3;var d=t.type.getDerivedStateFromError;if(typeof d=="function"){var h=r.value;o.payload=function(){return d(h)},o.callback=function(){Il(t,r)}}var x=t.stateNode;return x!==null&&typeof x.componentDidCatch=="function"&&(o.callback=function(){Il(t,r),typeof d!="function"&&(Bn===null?Bn=new Set([this]):Bn.add(this));var w=r.stack;this.componentDidCatch(r.value,{componentStack:w!==null?w:""})}),o}function b0(t,r,o){var d=t.pingCache;if(d===null){d=t.pingCache=new Zx;var h=new Set;d.set(r,h)}else h=d.get(r),h===void 0&&(h=new Set,d.set(r,h));h.has(o)||(h.add(o),t=p2.bind(null,t,r,o),r.then(t,t))}function y0(t){do{var r;if((r=t.tag===13)&&(r=t.memoizedState,r=r!==null?r.dehydrated!==null:!0),r)return t;t=t.return}while(t!==null);return null}function w0(t,r,o,d,h){return(t.mode&1)===0?(t===r?t.flags|=65536:(t.flags|=128,o.flags|=131072,o.flags&=-52805,o.tag===1&&(o.alternate===null?o.tag=17:(r=fn(-1,1),r.tag=2,On(o,r,1))),o.lanes|=1),t):(t.flags|=65536,t.lanes=h,t)}var Jx=B.ReactCurrentOwner,xt=!1;function dt(t,r,o,d){r.child=t===null?qp(r,null,o,d):Bi(r,t.child,o,d)}function j0(t,r,o,d,h){o=o.render;var x=r.ref;return Vi(r,h),d=Pl(t,r,o,d,x,h),o=Ml(),t!==null&&!xt?(r.updateQueue=t.updateQueue,r.flags&=-2053,t.lanes&=~h,hn(t,r,h)):(Ee&&o&&ul(r),r.flags|=1,dt(t,r,d,h),r.child)}function k0(t,r,o,d,h){if(t===null){var x=o.type;return typeof x=="function"&&!sc(x)&&x.defaultProps===void 0&&o.compare===null&&o.defaultProps===void 0?(r.tag=15,r.type=x,S0(t,r,x,d,h)):(t=Ca(o.type,null,d,r,r.mode,h),t.ref=r.ref,t.return=r,r.child=t)}if(x=t.child,(t.lanes&h)===0){var w=x.memoizedProps;if(o=o.compare,o=o!==null?o:zr,o(w,d)&&t.ref===r.ref)return hn(t,r,h)}return r.flags|=1,t=Yn(x,d),t.ref=r.ref,t.return=r,r.child=t}function S0(t,r,o,d,h){if(t!==null){var x=t.memoizedProps;if(zr(x,d)&&t.ref===r.ref)if(xt=!1,r.pendingProps=d=x,(t.lanes&h)!==0)(t.flags&131072)!==0&&(xt=!0);else return r.lanes=t.lanes,hn(t,r,h)}return Ol(t,r,o,d,h)}function N0(t,r,o){var d=r.pendingProps,h=d.children,x=t!==null?t.memoizedState:null;if(d.mode==="hidden")if((r.mode&1)===0)r.memoizedState={baseLanes:0,cachePool:null,transitions:null},Ne(Yi,Nt),Nt|=o;else{if((o&1073741824)===0)return t=x!==null?x.baseLanes|o:o,r.lanes=r.childLanes=1073741824,r.memoizedState={baseLanes:t,cachePool:null,transitions:null},r.updateQueue=null,Ne(Yi,Nt),Nt|=t,null;r.memoizedState={baseLanes:0,cachePool:null,transitions:null},d=x!==null?x.baseLanes:o,Ne(Yi,Nt),Nt|=d}else x!==null?(d=x.baseLanes|o,r.memoizedState=null):d=o,Ne(Yi,Nt),Nt|=d;return dt(t,r,h,o),r.child}function C0(t,r){var o=r.ref;(t===null&&o!==null||t!==null&&t.ref!==o)&&(r.flags|=512,r.flags|=2097152)}function Ol(t,r,o,d,h){var x=gt(o)?ei:rt.current;return x=Di(r,x),Vi(r,h),o=Pl(t,r,o,d,x,h),d=Ml(),t!==null&&!xt?(r.updateQueue=t.updateQueue,r.flags&=-2053,t.lanes&=~h,hn(t,r,h)):(Ee&&d&&ul(r),r.flags|=1,dt(t,r,o,h),r.child)}function T0(t,r,o,d,h){if(gt(o)){var x=!0;Qs(r)}else x=!1;if(Vi(r,h),r.stateNode===null)ma(t,r),Yp(r,o,d),kl(r,o,d,h),d=!0;else if(t===null){var w=r.stateNode,k=r.memoizedProps;w.props=k;var z=w.context,V=o.contextType;typeof V=="object"&&V!==null?V=Et(V):(V=gt(o)?ei:rt.current,V=Di(r,V));var $=o.getDerivedStateFromProps,q=typeof $=="function"||typeof w.getSnapshotBeforeUpdate=="function";q||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(k!==d||z!==V)&&$p(r,w,d,V),In=!1;var U=r.memoizedState;w.state=U,sa(r,d,w,h),z=r.memoizedState,k!==d||U!==z||mt.current||In?(typeof $=="function"&&(jl(r,o,$,d),z=r.memoizedState),(k=In||Up(r,o,k,d,U,z,V))?(q||typeof w.UNSAFE_componentWillMount!="function"&&typeof w.componentWillMount!="function"||(typeof w.componentWillMount=="function"&&w.componentWillMount(),typeof w.UNSAFE_componentWillMount=="function"&&w.UNSAFE_componentWillMount()),typeof w.componentDidMount=="function"&&(r.flags|=4194308)):(typeof w.componentDidMount=="function"&&(r.flags|=4194308),r.memoizedProps=d,r.memoizedState=z),w.props=d,w.state=z,w.context=V,d=k):(typeof w.componentDidMount=="function"&&(r.flags|=4194308),d=!1)}else{w=r.stateNode,Vp(t,r),k=r.memoizedProps,V=r.type===r.elementType?k:Wt(r.type,k),w.props=V,q=r.pendingProps,U=w.context,z=o.contextType,typeof z=="object"&&z!==null?z=Et(z):(z=gt(o)?ei:rt.current,z=Di(r,z));var J=o.getDerivedStateFromProps;($=typeof J=="function"||typeof w.getSnapshotBeforeUpdate=="function")||typeof w.UNSAFE_componentWillReceiveProps!="function"&&typeof w.componentWillReceiveProps!="function"||(k!==q||U!==z)&&$p(r,w,d,z),In=!1,U=r.memoizedState,w.state=U,sa(r,d,w,h);var te=r.memoizedState;k!==q||U!==te||mt.current||In?(typeof J=="function"&&(jl(r,o,J,d),te=r.memoizedState),(V=In||Up(r,o,V,d,U,te,z)||!1)?($||typeof w.UNSAFE_componentWillUpdate!="function"&&typeof w.componentWillUpdate!="function"||(typeof w.componentWillUpdate=="function"&&w.componentWillUpdate(d,te,z),typeof w.UNSAFE_componentWillUpdate=="function"&&w.UNSAFE_componentWillUpdate(d,te,z)),typeof w.componentDidUpdate=="function"&&(r.flags|=4),typeof w.getSnapshotBeforeUpdate=="function"&&(r.flags|=1024)):(typeof w.componentDidUpdate!="function"||k===t.memoizedProps&&U===t.memoizedState||(r.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||k===t.memoizedProps&&U===t.memoizedState||(r.flags|=1024),r.memoizedProps=d,r.memoizedState=te),w.props=d,w.state=te,w.context=z,d=V):(typeof w.componentDidUpdate!="function"||k===t.memoizedProps&&U===t.memoizedState||(r.flags|=4),typeof w.getSnapshotBeforeUpdate!="function"||k===t.memoizedProps&&U===t.memoizedState||(r.flags|=1024),d=!1)}return Vl(t,r,o,d,x,h)}function Vl(t,r,o,d,h,x){C0(t,r);var w=(r.flags&128)!==0;if(!d&&!w)return h&&Mp(r,o,!1),hn(t,r,x);d=r.stateNode,Jx.current=r;var k=w&&typeof o.getDerivedStateFromError!="function"?null:d.render();return r.flags|=1,t!==null&&w?(r.child=Bi(r,t.child,null,x),r.child=Bi(r,null,k,x)):dt(t,r,k,x),r.memoizedState=d.state,h&&Mp(r,o,!0),r.child}function z0(t){var r=t.stateNode;r.pendingContext?Ep(t,r.pendingContext,r.pendingContext!==r.context):r.context&&Ep(t,r.context,!1),Sl(t,r.containerInfo)}function E0(t,r,o,d,h){return Ii(),ml(h),r.flags|=256,dt(t,r,o,d),r.child}var Bl={dehydrated:null,treeContext:null,retryLane:0};function _l(t){return{baseLanes:t,cachePool:null,transitions:null}}function P0(t,r,o){var d=r.pendingProps,h=Ae.current,x=!1,w=(r.flags&128)!==0,k;if((k=w)||(k=t!==null&&t.memoizedState===null?!1:(h&2)!==0),k?(x=!0,r.flags&=-129):(t===null||t.memoizedState!==null)&&(h|=1),Ne(Ae,h&1),t===null)return hl(r),t=r.memoizedState,t!==null&&(t=t.dehydrated,t!==null)?((r.mode&1)===0?r.lanes=1:t.data==="$!"?r.lanes=8:r.lanes=1073741824,null):(w=d.children,t=d.fallback,x?(d=r.mode,x=r.child,w={mode:"hidden",children:w},(d&1)===0&&x!==null?(x.childLanes=0,x.pendingProps=w):x=Ta(w,d,0,null),t=di(t,d,o,null),x.return=r,t.return=r,x.sibling=t,r.child=x,r.child.memoizedState=_l(o),r.memoizedState=Bl,t):Wl(r,w));if(h=t.memoizedState,h!==null&&(k=h.dehydrated,k!==null))return e2(t,r,w,d,k,h,o);if(x){x=d.fallback,w=r.mode,h=t.child,k=h.sibling;var z={mode:"hidden",children:d.children};return(w&1)===0&&r.child!==h?(d=r.child,d.childLanes=0,d.pendingProps=z,r.deletions=null):(d=Yn(h,z),d.subtreeFlags=h.subtreeFlags&14680064),k!==null?x=Yn(k,x):(x=di(x,w,o,null),x.flags|=2),x.return=r,d.return=r,d.sibling=x,r.child=d,d=x,x=r.child,w=t.child.memoizedState,w=w===null?_l(o):{baseLanes:w.baseLanes|o,cachePool:null,transitions:w.transitions},x.memoizedState=w,x.childLanes=t.childLanes&~o,r.memoizedState=Bl,d}return x=t.child,t=x.sibling,d=Yn(x,{mode:"visible",children:d.children}),(r.mode&1)===0&&(d.lanes=o),d.return=r,d.sibling=null,t!==null&&(o=r.deletions,o===null?(r.deletions=[t],r.flags|=16):o.push(t)),r.child=d,r.memoizedState=null,d}function Wl(t,r){return r=Ta({mode:"visible",children:r},t.mode,0,null),r.return=t,t.child=r}function ha(t,r,o,d){return d!==null&&ml(d),Bi(r,t.child,null,o),t=Wl(r,r.pendingProps.children),t.flags|=2,r.memoizedState=null,t}function e2(t,r,o,d,h,x,w){if(o)return r.flags&256?(r.flags&=-257,d=Rl(Error(s(422))),ha(t,r,w,d)):r.memoizedState!==null?(r.child=t.child,r.flags|=128,null):(x=d.fallback,h=r.mode,d=Ta({mode:"visible",children:d.children},h,0,null),x=di(x,h,w,null),x.flags|=2,d.return=r,x.return=r,d.sibling=x,r.child=d,(r.mode&1)!==0&&Bi(r,t.child,null,w),r.child.memoizedState=_l(w),r.memoizedState=Bl,x);if((r.mode&1)===0)return ha(t,r,w,null);if(h.data==="$!"){if(d=h.nextSibling&&h.nextSibling.dataset,d)var k=d.dgst;return d=k,x=Error(s(419)),d=Rl(x,d,void 0),ha(t,r,w,d)}if(k=(w&t.childLanes)!==0,xt||k){if(d=Ze,d!==null){switch(w&-w){case 4:h=2;break;case 16:h=8;break;case 64:case 128:case 256:case 512:case 1024:case 2048:case 4096:case 8192:case 16384:case 32768:case 65536:case 131072:case 262144:case 524288:case 1048576:case 2097152:case 4194304:case 8388608:case 16777216:case 33554432:case 67108864:h=32;break;case 536870912:h=268435456;break;default:h=0}h=(h&(d.suspendedLanes|w))!==0?0:h,h!==0&&h!==x.retryLane&&(x.retryLane=h,pn(t,h),$t(d,t,h,-1))}return rc(),d=Rl(Error(s(421))),ha(t,r,w,d)}return h.data==="$?"?(r.flags|=128,r.child=t.child,r=f2.bind(null,t),h._reactRetry=r,null):(t=x.treeContext,St=Ln(h.nextSibling),kt=r,Ee=!0,_t=null,t!==null&&(Tt[zt++]=dn,Tt[zt++]=un,Tt[zt++]=ti,dn=t.id,un=t.overflow,ti=r),r=Wl(r,d.children),r.flags|=4096,r)}function M0(t,r,o){t.lanes|=r;var d=t.alternate;d!==null&&(d.lanes|=r),bl(t.return,r,o)}function Ul(t,r,o,d,h){var x=t.memoizedState;x===null?t.memoizedState={isBackwards:r,rendering:null,renderingStartTime:0,last:d,tail:o,tailMode:h}:(x.isBackwards=r,x.rendering=null,x.renderingStartTime=0,x.last=d,x.tail=o,x.tailMode=h)}function A0(t,r,o){var d=r.pendingProps,h=d.revealOrder,x=d.tail;if(dt(t,r,d.children,o),d=Ae.current,(d&2)!==0)d=d&1|2,r.flags|=128;else{if(t!==null&&(t.flags&128)!==0)e:for(t=r.child;t!==null;){if(t.tag===13)t.memoizedState!==null&&M0(t,o,r);else if(t.tag===19)M0(t,o,r);else if(t.child!==null){t.child.return=t,t=t.child;continue}if(t===r)break e;for(;t.sibling===null;){if(t.return===null||t.return===r)break e;t=t.return}t.sibling.return=t.return,t=t.sibling}d&=1}if(Ne(Ae,d),(r.mode&1)===0)r.memoizedState=null;else switch(h){case"forwards":for(o=r.child,h=null;o!==null;)t=o.alternate,t!==null&&la(t)===null&&(h=o),o=o.sibling;o=h,o===null?(h=r.child,r.child=null):(h=o.sibling,o.sibling=null),Ul(r,!1,h,o,x);break;case"backwards":for(o=null,h=r.child,r.child=null;h!==null;){if(t=h.alternate,t!==null&&la(t)===null){r.child=h;break}t=h.sibling,h.sibling=o,o=h,h=t}Ul(r,!0,o,null,x);break;case"together":Ul(r,!1,null,null,void 0);break;default:r.memoizedState=null}return r.child}function ma(t,r){(r.mode&1)===0&&t!==null&&(t.alternate=null,r.alternate=null,r.flags|=2)}function hn(t,r,o){if(t!==null&&(r.dependencies=t.dependencies),ai|=r.lanes,(o&r.childLanes)===0)return null;if(t!==null&&r.child!==t.child)throw Error(s(153));if(r.child!==null){for(t=r.child,o=Yn(t,t.pendingProps),r.child=o,o.return=r;t.sibling!==null;)t=t.sibling,o=o.sibling=Yn(t,t.pendingProps),o.return=r;o.sibling=null}return r.child}function t2(t,r,o){switch(r.tag){case 3:z0(r),Ii();break;case 5:Xp(r);break;case 1:gt(r.type)&&Qs(r);break;case 4:Sl(r,r.stateNode.containerInfo);break;case 10:var d=r.type._context,h=r.memoizedProps.value;Ne(na,d._currentValue),d._currentValue=h;break;case 13:if(d=r.memoizedState,d!==null)return d.dehydrated!==null?(Ne(Ae,Ae.current&1),r.flags|=128,null):(o&r.child.childLanes)!==0?P0(t,r,o):(Ne(Ae,Ae.current&1),t=hn(t,r,o),t!==null?t.sibling:null);Ne(Ae,Ae.current&1);break;case 19:if(d=(o&r.childLanes)!==0,(t.flags&128)!==0){if(d)return A0(t,r,o);r.flags|=128}if(h=r.memoizedState,h!==null&&(h.rendering=null,h.tail=null,h.lastEffect=null),Ne(Ae,Ae.current),d)break;return null;case 22:case 23:return r.lanes=0,N0(t,r,o)}return hn(t,r,o)}var L0,Yl,D0,F0;L0=function(t,r){for(var o=r.child;o!==null;){if(o.tag===5||o.tag===6)t.appendChild(o.stateNode);else if(o.tag!==4&&o.child!==null){o.child.return=o,o=o.child;continue}if(o===r)break;for(;o.sibling===null;){if(o.return===null||o.return===r)return;o=o.return}o.sibling.return=o.return,o=o.sibling}},Yl=function(){},D0=function(t,r,o,d){var h=t.memoizedProps;if(h!==d){t=r.stateNode,ri(Qt.current);var x=null;switch(o){case"input":h=bo(t,h),d=bo(t,d),x=[];break;case"select":h=C({},h,{value:void 0}),d=C({},d,{value:void 0}),x=[];break;case"textarea":h=jo(t,h),d=jo(t,d),x=[];break;default:typeof h.onClick!="function"&&typeof d.onClick=="function"&&(t.onclick=qs)}So(o,d);var w;o=null;for(V in h)if(!d.hasOwnProperty(V)&&h.hasOwnProperty(V)&&h[V]!=null)if(V==="style"){var k=h[V];for(w in k)k.hasOwnProperty(w)&&(o||(o={}),o[w]="")}else V!=="dangerouslySetInnerHTML"&&V!=="children"&&V!=="suppressContentEditableWarning"&&V!=="suppressHydrationWarning"&&V!=="autoFocus"&&(l.hasOwnProperty(V)?x||(x=[]):(x=x||[]).push(V,null));for(V in d){var z=d[V];if(k=h?.[V],d.hasOwnProperty(V)&&z!==k&&(z!=null||k!=null))if(V==="style")if(k){for(w in k)!k.hasOwnProperty(w)||z&&z.hasOwnProperty(w)||(o||(o={}),o[w]="");for(w in z)z.hasOwnProperty(w)&&k[w]!==z[w]&&(o||(o={}),o[w]=z[w])}else o||(x||(x=[]),x.push(V,o)),o=z;else V==="dangerouslySetInnerHTML"?(z=z?z.__html:void 0,k=k?k.__html:void 0,z!=null&&k!==z&&(x=x||[]).push(V,z)):V==="children"?typeof z!="string"&&typeof z!="number"||(x=x||[]).push(V,""+z):V!=="suppressContentEditableWarning"&&V!=="suppressHydrationWarning"&&(l.hasOwnProperty(V)?(z!=null&&V==="onScroll"&&Te("scroll",t),x||k===z||(x=[])):(x=x||[]).push(V,z))}o&&(x=x||[]).push("style",o);var V=x;(r.updateQueue=V)&&(r.flags|=4)}},F0=function(t,r,o,d){o!==d&&(r.flags|=4)};function Ur(t,r){if(!Ee)switch(t.tailMode){case"hidden":r=t.tail;for(var o=null;r!==null;)r.alternate!==null&&(o=r),r=r.sibling;o===null?t.tail=null:o.sibling=null;break;case"collapsed":o=t.tail;for(var d=null;o!==null;)o.alternate!==null&&(d=o),o=o.sibling;d===null?r||t.tail===null?t.tail=null:t.tail.sibling=null:d.sibling=null}}function at(t){var r=t.alternate!==null&&t.alternate.child===t.child,o=0,d=0;if(r)for(var h=t.child;h!==null;)o|=h.lanes|h.childLanes,d|=h.subtreeFlags&14680064,d|=h.flags&14680064,h.return=t,h=h.sibling;else for(h=t.child;h!==null;)o|=h.lanes|h.childLanes,d|=h.subtreeFlags,d|=h.flags,h.return=t,h=h.sibling;return t.subtreeFlags|=d,t.childLanes=o,r}function n2(t,r,o){var d=r.pendingProps;switch(pl(r),r.tag){case 2:case 16:case 15:case 0:case 11:case 7:case 8:case 12:case 9:case 14:return at(r),null;case 1:return gt(r.type)&&Ks(),at(r),null;case 3:return d=r.stateNode,_i(),ze(mt),ze(rt),Tl(),d.pendingContext&&(d.context=d.pendingContext,d.pendingContext=null),(t===null||t.child===null)&&(ta(r)?r.flags|=4:t===null||t.memoizedState.isDehydrated&&(r.flags&256)===0||(r.flags|=1024,_t!==null&&(tc(_t),_t=null))),Yl(t,r),at(r),null;case 5:Nl(r);var h=ri(Or.current);if(o=r.type,t!==null&&r.stateNode!=null)D0(t,r,o,d,h),t.ref!==r.ref&&(r.flags|=512,r.flags|=2097152);else{if(!d){if(r.stateNode===null)throw Error(s(166));return at(r),null}if(t=ri(Qt.current),ta(r)){d=r.stateNode,o=r.type;var x=r.memoizedProps;switch(d[Kt]=r,d[Lr]=x,t=(r.mode&1)!==0,o){case"dialog":Te("cancel",d),Te("close",d);break;case"iframe":case"object":case"embed":Te("load",d);break;case"video":case"audio":for(h=0;h<Pr.length;h++)Te(Pr[h],d);break;case"source":Te("error",d);break;case"img":case"image":case"link":Te("error",d),Te("load",d);break;case"details":Te("toggle",d);break;case"input":hu(d,x),Te("invalid",d);break;case"select":d._wrapperState={wasMultiple:!!x.multiple},Te("invalid",d);break;case"textarea":xu(d,x),Te("invalid",d)}So(o,x),h=null;for(var w in x)if(x.hasOwnProperty(w)){var k=x[w];w==="children"?typeof k=="string"?d.textContent!==k&&(x.suppressHydrationWarning!==!0&&Gs(d.textContent,k,t),h=["children",k]):typeof k=="number"&&d.textContent!==""+k&&(x.suppressHydrationWarning!==!0&&Gs(d.textContent,k,t),h=["children",""+k]):l.hasOwnProperty(w)&&k!=null&&w==="onScroll"&&Te("scroll",d)}switch(o){case"input":Ss(d),gu(d,x,!0);break;case"textarea":Ss(d),bu(d);break;case"select":case"option":break;default:typeof x.onClick=="function"&&(d.onclick=qs)}d=h,r.updateQueue=d,d!==null&&(r.flags|=4)}else{w=h.nodeType===9?h:h.ownerDocument,t==="http://www.w3.org/1999/xhtml"&&(t=yu(o)),t==="http://www.w3.org/1999/xhtml"?o==="script"?(t=w.createElement("div"),t.innerHTML="<script><\/script>",t=t.removeChild(t.firstChild)):typeof d.is=="string"?t=w.createElement(o,{is:d.is}):(t=w.createElement(o),o==="select"&&(w=t,d.multiple?w.multiple=!0:d.size&&(w.size=d.size))):t=w.createElementNS(t,o),t[Kt]=r,t[Lr]=d,L0(t,r,!1,!1),r.stateNode=t;e:{switch(w=No(o,d),o){case"dialog":Te("cancel",t),Te("close",t),h=d;break;case"iframe":case"object":case"embed":Te("load",t),h=d;break;case"video":case"audio":for(h=0;h<Pr.length;h++)Te(Pr[h],t);h=d;break;case"source":Te("error",t),h=d;break;case"img":case"image":case"link":Te("error",t),Te("load",t),h=d;break;case"details":Te("toggle",t),h=d;break;case"input":hu(t,d),h=bo(t,d),Te("invalid",t);break;case"option":h=d;break;case"select":t._wrapperState={wasMultiple:!!d.multiple},h=C({},d,{value:void 0}),Te("invalid",t);break;case"textarea":xu(t,d),h=jo(t,d),Te("invalid",t);break;default:h=d}So(o,h),k=h;for(x in k)if(k.hasOwnProperty(x)){var z=k[x];x==="style"?ku(t,z):x==="dangerouslySetInnerHTML"?(z=z?z.__html:void 0,z!=null&&wu(t,z)):x==="children"?typeof z=="string"?(o!=="textarea"||z!=="")&&ur(t,z):typeof z=="number"&&ur(t,""+z):x!=="suppressContentEditableWarning"&&x!=="suppressHydrationWarning"&&x!=="autoFocus"&&(l.hasOwnProperty(x)?z!=null&&x==="onScroll"&&Te("scroll",t):z!=null&&P(t,x,z,w))}switch(o){case"input":Ss(t),gu(t,d,!1);break;case"textarea":Ss(t),bu(t);break;case"option":d.value!=null&&t.setAttribute("value",""+be(d.value));break;case"select":t.multiple=!!d.multiple,x=d.value,x!=null?ji(t,!!d.multiple,x,!1):d.defaultValue!=null&&ji(t,!!d.multiple,d.defaultValue,!0);break;default:typeof h.onClick=="function"&&(t.onclick=qs)}switch(o){case"button":case"input":case"select":case"textarea":d=!!d.autoFocus;break e;case"img":d=!0;break e;default:d=!1}}d&&(r.flags|=4)}r.ref!==null&&(r.flags|=512,r.flags|=2097152)}return at(r),null;case 6:if(t&&r.stateNode!=null)F0(t,r,t.memoizedProps,d);else{if(typeof d!="string"&&r.stateNode===null)throw Error(s(166));if(o=ri(Or.current),ri(Qt.current),ta(r)){if(d=r.stateNode,o=r.memoizedProps,d[Kt]=r,(x=d.nodeValue!==o)&&(t=kt,t!==null))switch(t.tag){case 3:Gs(d.nodeValue,o,(t.mode&1)!==0);break;case 5:t.memoizedProps.suppressHydrationWarning!==!0&&Gs(d.nodeValue,o,(t.mode&1)!==0)}x&&(r.flags|=4)}else d=(o.nodeType===9?o:o.ownerDocument).createTextNode(d),d[Kt]=r,r.stateNode=d}return at(r),null;case 13:if(ze(Ae),d=r.memoizedState,t===null||t.memoizedState!==null&&t.memoizedState.dehydrated!==null){if(Ee&&St!==null&&(r.mode&1)!==0&&(r.flags&128)===0)Ip(),Ii(),r.flags|=98560,x=!1;else if(x=ta(r),d!==null&&d.dehydrated!==null){if(t===null){if(!x)throw Error(s(318));if(x=r.memoizedState,x=x!==null?x.dehydrated:null,!x)throw Error(s(317));x[Kt]=r}else Ii(),(r.flags&128)===0&&(r.memoizedState=null),r.flags|=4;at(r),x=!1}else _t!==null&&(tc(_t),_t=null),x=!0;if(!x)return r.flags&65536?r:null}return(r.flags&128)!==0?(r.lanes=o,r):(d=d!==null,d!==(t!==null&&t.memoizedState!==null)&&d&&(r.child.flags|=8192,(r.mode&1)!==0&&(t===null||(Ae.current&1)!==0?qe===0&&(qe=3):rc())),r.updateQueue!==null&&(r.flags|=4),at(r),null);case 4:return _i(),Yl(t,r),t===null&&Mr(r.stateNode.containerInfo),at(r),null;case 10:return vl(r.type._context),at(r),null;case 17:return gt(r.type)&&Ks(),at(r),null;case 19:if(ze(Ae),x=r.memoizedState,x===null)return at(r),null;if(d=(r.flags&128)!==0,w=x.rendering,w===null)if(d)Ur(x,!1);else{if(qe!==0||t!==null&&(t.flags&128)!==0)for(t=r.child;t!==null;){if(w=la(t),w!==null){for(r.flags|=128,Ur(x,!1),d=w.updateQueue,d!==null&&(r.updateQueue=d,r.flags|=4),r.subtreeFlags=0,d=o,o=r.child;o!==null;)x=o,t=d,x.flags&=14680066,w=x.alternate,w===null?(x.childLanes=0,x.lanes=t,x.child=null,x.subtreeFlags=0,x.memoizedProps=null,x.memoizedState=null,x.updateQueue=null,x.dependencies=null,x.stateNode=null):(x.childLanes=w.childLanes,x.lanes=w.lanes,x.child=w.child,x.subtreeFlags=0,x.deletions=null,x.memoizedProps=w.memoizedProps,x.memoizedState=w.memoizedState,x.updateQueue=w.updateQueue,x.type=w.type,t=w.dependencies,x.dependencies=t===null?null:{lanes:t.lanes,firstContext:t.firstContext}),o=o.sibling;return Ne(Ae,Ae.current&1|2),r.child}t=t.sibling}x.tail!==null&&We()>$i&&(r.flags|=128,d=!0,Ur(x,!1),r.lanes=4194304)}else{if(!d)if(t=la(w),t!==null){if(r.flags|=128,d=!0,o=t.updateQueue,o!==null&&(r.updateQueue=o,r.flags|=4),Ur(x,!0),x.tail===null&&x.tailMode==="hidden"&&!w.alternate&&!Ee)return at(r),null}else 2*We()-x.renderingStartTime>$i&&o!==1073741824&&(r.flags|=128,d=!0,Ur(x,!1),r.lanes=4194304);x.isBackwards?(w.sibling=r.child,r.child=w):(o=x.last,o!==null?o.sibling=w:r.child=w,x.last=w)}return x.tail!==null?(r=x.tail,x.rendering=r,x.tail=r.sibling,x.renderingStartTime=We(),r.sibling=null,o=Ae.current,Ne(Ae,d?o&1|2:o&1),r):(at(r),null);case 22:case 23:return ic(),d=r.memoizedState!==null,t!==null&&t.memoizedState!==null!==d&&(r.flags|=8192),d&&(r.mode&1)!==0?(Nt&1073741824)!==0&&(at(r),r.subtreeFlags&6&&(r.flags|=8192)):at(r),null;case 24:return null;case 25:return null}throw Error(s(156,r.tag))}function i2(t,r){switch(pl(r),r.tag){case 1:return gt(r.type)&&Ks(),t=r.flags,t&65536?(r.flags=t&-65537|128,r):null;case 3:return _i(),ze(mt),ze(rt),Tl(),t=r.flags,(t&65536)!==0&&(t&128)===0?(r.flags=t&-65537|128,r):null;case 5:return Nl(r),null;case 13:if(ze(Ae),t=r.memoizedState,t!==null&&t.dehydrated!==null){if(r.alternate===null)throw Error(s(340));Ii()}return t=r.flags,t&65536?(r.flags=t&-65537|128,r):null;case 19:return ze(Ae),null;case 4:return _i(),null;case 10:return vl(r.type._context),null;case 22:case 23:return ic(),null;case 24:return null;default:return null}}var ga=!1,ot=!1,r2=typeof WeakSet=="function"?WeakSet:Set,ee=null;function Ui(t,r){var o=t.ref;if(o!==null)if(typeof o=="function")try{o(null)}catch(d){Oe(t,r,d)}else o.current=null}function $l(t,r,o){try{o()}catch(d){Oe(t,r,d)}}var R0=!1;function s2(t,r){if(il=Rs,t=fp(),Xo(t)){if("selectionStart"in t)var o={start:t.selectionStart,end:t.selectionEnd};else e:{o=(o=t.ownerDocument)&&o.defaultView||window;var d=o.getSelection&&o.getSelection();if(d&&d.rangeCount!==0){o=d.anchorNode;var h=d.anchorOffset,x=d.focusNode;d=d.focusOffset;try{o.nodeType,x.nodeType}catch{o=null;break e}var w=0,k=-1,z=-1,V=0,$=0,q=t,U=null;t:for(;;){for(var J;q!==o||h!==0&&q.nodeType!==3||(k=w+h),q!==x||d!==0&&q.nodeType!==3||(z=w+d),q.nodeType===3&&(w+=q.nodeValue.length),(J=q.firstChild)!==null;)U=q,q=J;for(;;){if(q===t)break t;if(U===o&&++V===h&&(k=w),U===x&&++$===d&&(z=w),(J=q.nextSibling)!==null)break;q=U,U=q.parentNode}q=J}o=k===-1||z===-1?null:{start:k,end:z}}else o=null}o=o||{start:0,end:0}}else o=null;for(rl={focusedElem:t,selectionRange:o},Rs=!1,ee=r;ee!==null;)if(r=ee,t=r.child,(r.subtreeFlags&1028)!==0&&t!==null)t.return=r,ee=t;else for(;ee!==null;){r=ee;try{var te=r.alternate;if((r.flags&1024)!==0)switch(r.tag){case 0:case 11:case 15:break;case 1:if(te!==null){var ne=te.memoizedProps,Ue=te.memoizedState,R=r.stateNode,A=R.getSnapshotBeforeUpdate(r.elementType===r.type?ne:Wt(r.type,ne),Ue);R.__reactInternalSnapshotBeforeUpdate=A}break;case 3:var I=r.stateNode.containerInfo;I.nodeType===1?I.textContent="":I.nodeType===9&&I.documentElement&&I.removeChild(I.documentElement);break;case 5:case 6:case 4:case 17:break;default:throw Error(s(163))}}catch(Q){Oe(r,r.return,Q)}if(t=r.sibling,t!==null){t.return=r.return,ee=t;break}ee=r.return}return te=R0,R0=!1,te}function Yr(t,r,o){var d=r.updateQueue;if(d=d!==null?d.lastEffect:null,d!==null){var h=d=d.next;do{if((h.tag&t)===t){var x=h.destroy;h.destroy=void 0,x!==void 0&&$l(r,o,x)}h=h.next}while(h!==d)}}function xa(t,r){if(r=r.updateQueue,r=r!==null?r.lastEffect:null,r!==null){var o=r=r.next;do{if((o.tag&t)===t){var d=o.create;o.destroy=d()}o=o.next}while(o!==r)}}function Hl(t){var r=t.ref;if(r!==null){var o=t.stateNode;switch(t.tag){case 5:t=o;break;default:t=o}typeof r=="function"?r(t):r.current=t}}function I0(t){var r=t.alternate;r!==null&&(t.alternate=null,I0(r)),t.child=null,t.deletions=null,t.sibling=null,t.tag===5&&(r=t.stateNode,r!==null&&(delete r[Kt],delete r[Lr],delete r[ll],delete r[_x],delete r[Wx])),t.stateNode=null,t.return=null,t.dependencies=null,t.memoizedProps=null,t.memoizedState=null,t.pendingProps=null,t.stateNode=null,t.updateQueue=null}function O0(t){return t.tag===5||t.tag===3||t.tag===4}function V0(t){e:for(;;){for(;t.sibling===null;){if(t.return===null||O0(t.return))return null;t=t.return}for(t.sibling.return=t.return,t=t.sibling;t.tag!==5&&t.tag!==6&&t.tag!==18;){if(t.flags&2||t.child===null||t.tag===4)continue e;t.child.return=t,t=t.child}if(!(t.flags&2))return t.stateNode}}function Gl(t,r,o){var d=t.tag;if(d===5||d===6)t=t.stateNode,r?o.nodeType===8?o.parentNode.insertBefore(t,r):o.insertBefore(t,r):(o.nodeType===8?(r=o.parentNode,r.insertBefore(t,o)):(r=o,r.appendChild(t)),o=o._reactRootContainer,o!=null||r.onclick!==null||(r.onclick=qs));else if(d!==4&&(t=t.child,t!==null))for(Gl(t,r,o),t=t.sibling;t!==null;)Gl(t,r,o),t=t.sibling}function ql(t,r,o){var d=t.tag;if(d===5||d===6)t=t.stateNode,r?o.insertBefore(t,r):o.appendChild(t);else if(d!==4&&(t=t.child,t!==null))for(ql(t,r,o),t=t.sibling;t!==null;)ql(t,r,o),t=t.sibling}var et=null,Ut=!1;function Vn(t,r,o){for(o=o.child;o!==null;)B0(t,r,o),o=o.sibling}function B0(t,r,o){if(Xt&&typeof Xt.onCommitFiberUnmount=="function")try{Xt.onCommitFiberUnmount(Ps,o)}catch{}switch(o.tag){case 5:ot||Ui(o,r);case 6:var d=et,h=Ut;et=null,Vn(t,r,o),et=d,Ut=h,et!==null&&(Ut?(t=et,o=o.stateNode,t.nodeType===8?t.parentNode.removeChild(o):t.removeChild(o)):et.removeChild(o.stateNode));break;case 18:et!==null&&(Ut?(t=et,o=o.stateNode,t.nodeType===8?ol(t.parentNode,o):t.nodeType===1&&ol(t,o),jr(t)):ol(et,o.stateNode));break;case 4:d=et,h=Ut,et=o.stateNode.containerInfo,Ut=!0,Vn(t,r,o),et=d,Ut=h;break;case 0:case 11:case 14:case 15:if(!ot&&(d=o.updateQueue,d!==null&&(d=d.lastEffect,d!==null))){h=d=d.next;do{var x=h,w=x.destroy;x=x.tag,w!==void 0&&((x&2)!==0||(x&4)!==0)&&$l(o,r,w),h=h.next}while(h!==d)}Vn(t,r,o);break;case 1:if(!ot&&(Ui(o,r),d=o.stateNode,typeof d.componentWillUnmount=="function"))try{d.props=o.memoizedProps,d.state=o.memoizedState,d.componentWillUnmount()}catch(k){Oe(o,r,k)}Vn(t,r,o);break;case 21:Vn(t,r,o);break;case 22:o.mode&1?(ot=(d=ot)||o.memoizedState!==null,Vn(t,r,o),ot=d):Vn(t,r,o);break;default:Vn(t,r,o)}}function _0(t){var r=t.updateQueue;if(r!==null){t.updateQueue=null;var o=t.stateNode;o===null&&(o=t.stateNode=new r2),r.forEach(function(d){var h=h2.bind(null,t,d);o.has(d)||(o.add(d),d.then(h,h))})}}function Yt(t,r){var o=r.deletions;if(o!==null)for(var d=0;d<o.length;d++){var h=o[d];try{var x=t,w=r,k=w;e:for(;k!==null;){switch(k.tag){case 5:et=k.stateNode,Ut=!1;break e;case 3:et=k.stateNode.containerInfo,Ut=!0;break e;case 4:et=k.stateNode.containerInfo,Ut=!0;break e}k=k.return}if(et===null)throw Error(s(160));B0(x,w,h),et=null,Ut=!1;var z=h.alternate;z!==null&&(z.return=null),h.return=null}catch(V){Oe(h,r,V)}}if(r.subtreeFlags&12854)for(r=r.child;r!==null;)W0(r,t),r=r.sibling}function W0(t,r){var o=t.alternate,d=t.flags;switch(t.tag){case 0:case 11:case 14:case 15:if(Yt(r,t),Jt(t),d&4){try{Yr(3,t,t.return),xa(3,t)}catch(ne){Oe(t,t.return,ne)}try{Yr(5,t,t.return)}catch(ne){Oe(t,t.return,ne)}}break;case 1:Yt(r,t),Jt(t),d&512&&o!==null&&Ui(o,o.return);break;case 5:if(Yt(r,t),Jt(t),d&512&&o!==null&&Ui(o,o.return),t.flags&32){var h=t.stateNode;try{ur(h,"")}catch(ne){Oe(t,t.return,ne)}}if(d&4&&(h=t.stateNode,h!=null)){var x=t.memoizedProps,w=o!==null?o.memoizedProps:x,k=t.type,z=t.updateQueue;if(t.updateQueue=null,z!==null)try{k==="input"&&x.type==="radio"&&x.name!=null&&mu(h,x),No(k,w);var V=No(k,x);for(w=0;w<z.length;w+=2){var $=z[w],q=z[w+1];$==="style"?ku(h,q):$==="dangerouslySetInnerHTML"?wu(h,q):$==="children"?ur(h,q):P(h,$,q,V)}switch(k){case"input":yo(h,x);break;case"textarea":vu(h,x);break;case"select":var U=h._wrapperState.wasMultiple;h._wrapperState.wasMultiple=!!x.multiple;var J=x.value;J!=null?ji(h,!!x.multiple,J,!1):U!==!!x.multiple&&(x.defaultValue!=null?ji(h,!!x.multiple,x.defaultValue,!0):ji(h,!!x.multiple,x.multiple?[]:"",!1))}h[Lr]=x}catch(ne){Oe(t,t.return,ne)}}break;case 6:if(Yt(r,t),Jt(t),d&4){if(t.stateNode===null)throw Error(s(162));h=t.stateNode,x=t.memoizedProps;try{h.nodeValue=x}catch(ne){Oe(t,t.return,ne)}}break;case 3:if(Yt(r,t),Jt(t),d&4&&o!==null&&o.memoizedState.isDehydrated)try{jr(r.containerInfo)}catch(ne){Oe(t,t.return,ne)}break;case 4:Yt(r,t),Jt(t);break;case 13:Yt(r,t),Jt(t),h=t.child,h.flags&8192&&(x=h.memoizedState!==null,h.stateNode.isHidden=x,!x||h.alternate!==null&&h.alternate.memoizedState!==null||(Ql=We())),d&4&&_0(t);break;case 22:if($=o!==null&&o.memoizedState!==null,t.mode&1?(ot=(V=ot)||$,Yt(r,t),ot=V):Yt(r,t),Jt(t),d&8192){if(V=t.memoizedState!==null,(t.stateNode.isHidden=V)&&!$&&(t.mode&1)!==0)for(ee=t,$=t.child;$!==null;){for(q=ee=$;ee!==null;){switch(U=ee,J=U.child,U.tag){case 0:case 11:case 14:case 15:Yr(4,U,U.return);break;case 1:Ui(U,U.return);var te=U.stateNode;if(typeof te.componentWillUnmount=="function"){d=U,o=U.return;try{r=d,te.props=r.memoizedProps,te.state=r.memoizedState,te.componentWillUnmount()}catch(ne){Oe(d,o,ne)}}break;case 5:Ui(U,U.return);break;case 22:if(U.memoizedState!==null){$0(q);continue}}J!==null?(J.return=U,ee=J):$0(q)}$=$.sibling}e:for($=null,q=t;;){if(q.tag===5){if($===null){$=q;try{h=q.stateNode,V?(x=h.style,typeof x.setProperty=="function"?x.setProperty("display","none","important"):x.display="none"):(k=q.stateNode,z=q.memoizedProps.style,w=z!=null&&z.hasOwnProperty("display")?z.display:null,k.style.display=ju("display",w))}catch(ne){Oe(t,t.return,ne)}}}else if(q.tag===6){if($===null)try{q.stateNode.nodeValue=V?"":q.memoizedProps}catch(ne){Oe(t,t.return,ne)}}else if((q.tag!==22&&q.tag!==23||q.memoizedState===null||q===t)&&q.child!==null){q.child.return=q,q=q.child;continue}if(q===t)break e;for(;q.sibling===null;){if(q.return===null||q.return===t)break e;$===q&&($=null),q=q.return}$===q&&($=null),q.sibling.return=q.return,q=q.sibling}}break;case 19:Yt(r,t),Jt(t),d&4&&_0(t);break;case 21:break;default:Yt(r,t),Jt(t)}}function Jt(t){var r=t.flags;if(r&2){try{e:{for(var o=t.return;o!==null;){if(O0(o)){var d=o;break e}o=o.return}throw Error(s(160))}switch(d.tag){case 5:var h=d.stateNode;d.flags&32&&(ur(h,""),d.flags&=-33);var x=V0(t);ql(t,x,h);break;case 3:case 4:var w=d.stateNode.containerInfo,k=V0(t);Gl(t,k,w);break;default:throw Error(s(161))}}catch(z){Oe(t,t.return,z)}t.flags&=-3}r&4096&&(t.flags&=-4097)}function a2(t,r,o){ee=t,U0(t)}function U0(t,r,o){for(var d=(t.mode&1)!==0;ee!==null;){var h=ee,x=h.child;if(h.tag===22&&d){var w=h.memoizedState!==null||ga;if(!w){var k=h.alternate,z=k!==null&&k.memoizedState!==null||ot;k=ga;var V=ot;if(ga=w,(ot=z)&&!V)for(ee=h;ee!==null;)w=ee,z=w.child,w.tag===22&&w.memoizedState!==null?H0(h):z!==null?(z.return=w,ee=z):H0(h);for(;x!==null;)ee=x,U0(x),x=x.sibling;ee=h,ga=k,ot=V}Y0(t)}else(h.subtreeFlags&8772)!==0&&x!==null?(x.return=h,ee=x):Y0(t)}}function Y0(t){for(;ee!==null;){var r=ee;if((r.flags&8772)!==0){var o=r.alternate;try{if((r.flags&8772)!==0)switch(r.tag){case 0:case 11:case 15:ot||xa(5,r);break;case 1:var d=r.stateNode;if(r.flags&4&&!ot)if(o===null)d.componentDidMount();else{var h=r.elementType===r.type?o.memoizedProps:Wt(r.type,o.memoizedProps);d.componentDidUpdate(h,o.memoizedState,d.__reactInternalSnapshotBeforeUpdate)}var x=r.updateQueue;x!==null&&_p(r,x,d);break;case 3:var w=r.updateQueue;if(w!==null){if(o=null,r.child!==null)switch(r.child.tag){case 5:o=r.child.stateNode;break;case 1:o=r.child.stateNode}_p(r,w,o)}break;case 5:var k=r.stateNode;if(o===null&&r.flags&4){o=k;var z=r.memoizedProps;switch(r.type){case"button":case"input":case"select":case"textarea":z.autoFocus&&o.focus();break;case"img":z.src&&(o.src=z.src)}}break;case 6:break;case 4:break;case 12:break;case 13:if(r.memoizedState===null){var V=r.alternate;if(V!==null){var $=V.memoizedState;if($!==null){var q=$.dehydrated;q!==null&&jr(q)}}}break;case 19:case 17:case 21:case 22:case 23:case 25:break;default:throw Error(s(163))}ot||r.flags&512&&Hl(r)}catch(U){Oe(r,r.return,U)}}if(r===t){ee=null;break}if(o=r.sibling,o!==null){o.return=r.return,ee=o;break}ee=r.return}}function $0(t){for(;ee!==null;){var r=ee;if(r===t){ee=null;break}var o=r.sibling;if(o!==null){o.return=r.return,ee=o;break}ee=r.return}}function H0(t){for(;ee!==null;){var r=ee;try{switch(r.tag){case 0:case 11:case 15:var o=r.return;try{xa(4,r)}catch(z){Oe(r,o,z)}break;case 1:var d=r.stateNode;if(typeof d.componentDidMount=="function"){var h=r.return;try{d.componentDidMount()}catch(z){Oe(r,h,z)}}var x=r.return;try{Hl(r)}catch(z){Oe(r,x,z)}break;case 5:var w=r.return;try{Hl(r)}catch(z){Oe(r,w,z)}}}catch(z){Oe(r,r.return,z)}if(r===t){ee=null;break}var k=r.sibling;if(k!==null){k.return=r.return,ee=k;break}ee=r.return}}var o2=Math.ceil,va=B.ReactCurrentDispatcher,Xl=B.ReactCurrentOwner,Mt=B.ReactCurrentBatchConfig,ge=0,Ze=null,$e=null,tt=0,Nt=0,Yi=Dn(0),qe=0,$r=null,ai=0,ba=0,Kl=0,Hr=null,vt=null,Ql=0,$i=1/0,mn=null,ya=!1,Zl=null,Bn=null,wa=!1,_n=null,ja=0,Gr=0,Jl=null,ka=-1,Sa=0;function ut(){return(ge&6)!==0?We():ka!==-1?ka:ka=We()}function Wn(t){return(t.mode&1)===0?1:(ge&2)!==0&&tt!==0?tt&-tt:Yx.transition!==null?(Sa===0&&(Sa=Ou()),Sa):(t=ye,t!==0||(t=window.event,t=t===void 0?16:Gu(t.type)),t)}function $t(t,r,o,d){if(50<Gr)throw Gr=0,Jl=null,Error(s(185));xr(t,o,d),((ge&2)===0||t!==Ze)&&(t===Ze&&((ge&2)===0&&(ba|=o),qe===4&&Un(t,tt)),bt(t,d),o===1&&ge===0&&(r.mode&1)===0&&($i=We()+500,Zs&&Rn()))}function bt(t,r){var o=t.callbackNode;Y1(t,r);var d=Ls(t,t===Ze?tt:0);if(d===0)o!==null&&Fu(o),t.callbackNode=null,t.callbackPriority=0;else if(r=d&-d,t.callbackPriority!==r){if(o!=null&&Fu(o),r===1)t.tag===0?Ux(q0.bind(null,t)):Ap(q0.bind(null,t)),Vx(function(){(ge&6)===0&&Rn()}),o=null;else{switch(Vu(d)){case 1:o=Ao;break;case 4:o=Ru;break;case 16:o=Es;break;case 536870912:o=Iu;break;default:o=Es}o=nf(o,G0.bind(null,t))}t.callbackPriority=r,t.callbackNode=o}}function G0(t,r){if(ka=-1,Sa=0,(ge&6)!==0)throw Error(s(327));var o=t.callbackNode;if(Hi()&&t.callbackNode!==o)return null;var d=Ls(t,t===Ze?tt:0);if(d===0)return null;if((d&30)!==0||(d&t.expiredLanes)!==0||r)r=Na(t,d);else{r=d;var h=ge;ge|=2;var x=K0();(Ze!==t||tt!==r)&&(mn=null,$i=We()+500,li(t,r));do try{d2();break}catch(k){X0(t,k)}while(!0);xl(),va.current=x,ge=h,$e!==null?r=0:(Ze=null,tt=0,r=qe)}if(r!==0){if(r===2&&(h=Lo(t),h!==0&&(d=h,r=ec(t,h))),r===1)throw o=$r,li(t,0),Un(t,d),bt(t,We()),o;if(r===6)Un(t,d);else{if(h=t.current.alternate,(d&30)===0&&!l2(h)&&(r=Na(t,d),r===2&&(x=Lo(t),x!==0&&(d=x,r=ec(t,x))),r===1))throw o=$r,li(t,0),Un(t,d),bt(t,We()),o;switch(t.finishedWork=h,t.finishedLanes=d,r){case 0:case 1:throw Error(s(345));case 2:ci(t,vt,mn);break;case 3:if(Un(t,d),(d&130023424)===d&&(r=Ql+500-We(),10<r)){if(Ls(t,0)!==0)break;if(h=t.suspendedLanes,(h&d)!==d){ut(),t.pingedLanes|=t.suspendedLanes&h;break}t.timeoutHandle=al(ci.bind(null,t,vt,mn),r);break}ci(t,vt,mn);break;case 4:if(Un(t,d),(d&4194240)===d)break;for(r=t.eventTimes,h=-1;0<d;){var w=31-Vt(d);x=1<<w,w=r[w],w>h&&(h=w),d&=~x}if(d=h,d=We()-d,d=(120>d?120:480>d?480:1080>d?1080:1920>d?1920:3e3>d?3e3:4320>d?4320:1960*o2(d/1960))-d,10<d){t.timeoutHandle=al(ci.bind(null,t,vt,mn),d);break}ci(t,vt,mn);break;case 5:ci(t,vt,mn);break;default:throw Error(s(329))}}}return bt(t,We()),t.callbackNode===o?G0.bind(null,t):null}function ec(t,r){var o=Hr;return t.current.memoizedState.isDehydrated&&(li(t,r).flags|=256),t=Na(t,r),t!==2&&(r=vt,vt=o,r!==null&&tc(r)),t}function tc(t){vt===null?vt=t:vt.push.apply(vt,t)}function l2(t){for(var r=t;;){if(r.flags&16384){var o=r.updateQueue;if(o!==null&&(o=o.stores,o!==null))for(var d=0;d<o.length;d++){var h=o[d],x=h.getSnapshot;h=h.value;try{if(!Bt(x(),h))return!1}catch{return!1}}}if(o=r.child,r.subtreeFlags&16384&&o!==null)o.return=r,r=o;else{if(r===t)break;for(;r.sibling===null;){if(r.return===null||r.return===t)return!0;r=r.return}r.sibling.return=r.return,r=r.sibling}}return!0}function Un(t,r){for(r&=~Kl,r&=~ba,t.suspendedLanes|=r,t.pingedLanes&=~r,t=t.expirationTimes;0<r;){var o=31-Vt(r),d=1<<o;t[o]=-1,r&=~d}}function q0(t){if((ge&6)!==0)throw Error(s(327));Hi();var r=Ls(t,0);if((r&1)===0)return bt(t,We()),null;var o=Na(t,r);if(t.tag!==0&&o===2){var d=Lo(t);d!==0&&(r=d,o=ec(t,d))}if(o===1)throw o=$r,li(t,0),Un(t,r),bt(t,We()),o;if(o===6)throw Error(s(345));return t.finishedWork=t.current.alternate,t.finishedLanes=r,ci(t,vt,mn),bt(t,We()),null}function nc(t,r){var o=ge;ge|=1;try{return t(r)}finally{ge=o,ge===0&&($i=We()+500,Zs&&Rn())}}function oi(t){_n!==null&&_n.tag===0&&(ge&6)===0&&Hi();var r=ge;ge|=1;var o=Mt.transition,d=ye;try{if(Mt.transition=null,ye=1,t)return t()}finally{ye=d,Mt.transition=o,ge=r,(ge&6)===0&&Rn()}}function ic(){Nt=Yi.current,ze(Yi)}function li(t,r){t.finishedWork=null,t.finishedLanes=0;var o=t.timeoutHandle;if(o!==-1&&(t.timeoutHandle=-1,Ox(o)),$e!==null)for(o=$e.return;o!==null;){var d=o;switch(pl(d),d.tag){case 1:d=d.type.childContextTypes,d!=null&&Ks();break;case 3:_i(),ze(mt),ze(rt),Tl();break;case 5:Nl(d);break;case 4:_i();break;case 13:ze(Ae);break;case 19:ze(Ae);break;case 10:vl(d.type._context);break;case 22:case 23:ic()}o=o.return}if(Ze=t,$e=t=Yn(t.current,null),tt=Nt=r,qe=0,$r=null,Kl=ba=ai=0,vt=Hr=null,ii!==null){for(r=0;r<ii.length;r++)if(o=ii[r],d=o.interleaved,d!==null){o.interleaved=null;var h=d.next,x=o.pending;if(x!==null){var w=x.next;x.next=h,d.next=w}o.pending=d}ii=null}return t}function X0(t,r){do{var o=$e;try{if(xl(),ca.current=fa,da){for(var d=Le.memoizedState;d!==null;){var h=d.queue;h!==null&&(h.pending=null),d=d.next}da=!1}if(si=0,Qe=Ge=Le=null,Vr=!1,Br=0,Xl.current=null,o===null||o.return===null){qe=1,$r=r,$e=null;break}e:{var x=t,w=o.return,k=o,z=r;if(r=tt,k.flags|=32768,z!==null&&typeof z=="object"&&typeof z.then=="function"){var V=z,$=k,q=$.tag;if(($.mode&1)===0&&(q===0||q===11||q===15)){var U=$.alternate;U?($.updateQueue=U.updateQueue,$.memoizedState=U.memoizedState,$.lanes=U.lanes):($.updateQueue=null,$.memoizedState=null)}var J=y0(w);if(J!==null){J.flags&=-257,w0(J,w,k,x,r),J.mode&1&&b0(x,V,r),r=J,z=V;var te=r.updateQueue;if(te===null){var ne=new Set;ne.add(z),r.updateQueue=ne}else te.add(z);break e}else{if((r&1)===0){b0(x,V,r),rc();break e}z=Error(s(426))}}else if(Ee&&k.mode&1){var Ue=y0(w);if(Ue!==null){(Ue.flags&65536)===0&&(Ue.flags|=256),w0(Ue,w,k,x,r),ml(Wi(z,k));break e}}x=z=Wi(z,k),qe!==4&&(qe=2),Hr===null?Hr=[x]:Hr.push(x),x=w;do{switch(x.tag){case 3:x.flags|=65536,r&=-r,x.lanes|=r;var R=x0(x,z,r);Bp(x,R);break e;case 1:k=z;var A=x.type,I=x.stateNode;if((x.flags&128)===0&&(typeof A.getDerivedStateFromError=="function"||I!==null&&typeof I.componentDidCatch=="function"&&(Bn===null||!Bn.has(I)))){x.flags|=65536,r&=-r,x.lanes|=r;var Q=v0(x,k,r);Bp(x,Q);break e}}x=x.return}while(x!==null)}Z0(o)}catch(ie){r=ie,$e===o&&o!==null&&($e=o=o.return);continue}break}while(!0)}function K0(){var t=va.current;return va.current=fa,t===null?fa:t}function rc(){(qe===0||qe===3||qe===2)&&(qe=4),Ze===null||(ai&268435455)===0&&(ba&268435455)===0||Un(Ze,tt)}function Na(t,r){var o=ge;ge|=2;var d=K0();(Ze!==t||tt!==r)&&(mn=null,li(t,r));do try{c2();break}catch(h){X0(t,h)}while(!0);if(xl(),ge=o,va.current=d,$e!==null)throw Error(s(261));return Ze=null,tt=0,qe}function c2(){for(;$e!==null;)Q0($e)}function d2(){for(;$e!==null&&!F1();)Q0($e)}function Q0(t){var r=tf(t.alternate,t,Nt);t.memoizedProps=t.pendingProps,r===null?Z0(t):$e=r,Xl.current=null}function Z0(t){var r=t;do{var o=r.alternate;if(t=r.return,(r.flags&32768)===0){if(o=n2(o,r,Nt),o!==null){$e=o;return}}else{if(o=i2(o,r),o!==null){o.flags&=32767,$e=o;return}if(t!==null)t.flags|=32768,t.subtreeFlags=0,t.deletions=null;else{qe=6,$e=null;return}}if(r=r.sibling,r!==null){$e=r;return}$e=r=t}while(r!==null);qe===0&&(qe=5)}function ci(t,r,o){var d=ye,h=Mt.transition;try{Mt.transition=null,ye=1,u2(t,r,o,d)}finally{Mt.transition=h,ye=d}return null}function u2(t,r,o,d){do Hi();while(_n!==null);if((ge&6)!==0)throw Error(s(327));o=t.finishedWork;var h=t.finishedLanes;if(o===null)return null;if(t.finishedWork=null,t.finishedLanes=0,o===t.current)throw Error(s(177));t.callbackNode=null,t.callbackPriority=0;var x=o.lanes|o.childLanes;if($1(t,x),t===Ze&&($e=Ze=null,tt=0),(o.subtreeFlags&2064)===0&&(o.flags&2064)===0||wa||(wa=!0,nf(Es,function(){return Hi(),null})),x=(o.flags&15990)!==0,(o.subtreeFlags&15990)!==0||x){x=Mt.transition,Mt.transition=null;var w=ye;ye=1;var k=ge;ge|=4,Xl.current=null,s2(t,o),W0(o,t),Mx(rl),Rs=!!il,rl=il=null,t.current=o,a2(o),R1(),ge=k,ye=w,Mt.transition=x}else t.current=o;if(wa&&(wa=!1,_n=t,ja=h),x=t.pendingLanes,x===0&&(Bn=null),V1(o.stateNode),bt(t,We()),r!==null)for(d=t.onRecoverableError,o=0;o<r.length;o++)h=r[o],d(h.value,{componentStack:h.stack,digest:h.digest});if(ya)throw ya=!1,t=Zl,Zl=null,t;return(ja&1)!==0&&t.tag!==0&&Hi(),x=t.pendingLanes,(x&1)!==0?t===Jl?Gr++:(Gr=0,Jl=t):Gr=0,Rn(),null}function Hi(){if(_n!==null){var t=Vu(ja),r=Mt.transition,o=ye;try{if(Mt.transition=null,ye=16>t?16:t,_n===null)var d=!1;else{if(t=_n,_n=null,ja=0,(ge&6)!==0)throw Error(s(331));var h=ge;for(ge|=4,ee=t.current;ee!==null;){var x=ee,w=x.child;if((ee.flags&16)!==0){var k=x.deletions;if(k!==null){for(var z=0;z<k.length;z++){var V=k[z];for(ee=V;ee!==null;){var $=ee;switch($.tag){case 0:case 11:case 15:Yr(8,$,x)}var q=$.child;if(q!==null)q.return=$,ee=q;else for(;ee!==null;){$=ee;var U=$.sibling,J=$.return;if(I0($),$===V){ee=null;break}if(U!==null){U.return=J,ee=U;break}ee=J}}}var te=x.alternate;if(te!==null){var ne=te.child;if(ne!==null){te.child=null;do{var Ue=ne.sibling;ne.sibling=null,ne=Ue}while(ne!==null)}}ee=x}}if((x.subtreeFlags&2064)!==0&&w!==null)w.return=x,ee=w;else e:for(;ee!==null;){if(x=ee,(x.flags&2048)!==0)switch(x.tag){case 0:case 11:case 15:Yr(9,x,x.return)}var R=x.sibling;if(R!==null){R.return=x.return,ee=R;break e}ee=x.return}}var A=t.current;for(ee=A;ee!==null;){w=ee;var I=w.child;if((w.subtreeFlags&2064)!==0&&I!==null)I.return=w,ee=I;else e:for(w=A;ee!==null;){if(k=ee,(k.flags&2048)!==0)try{switch(k.tag){case 0:case 11:case 15:xa(9,k)}}catch(ie){Oe(k,k.return,ie)}if(k===w){ee=null;break e}var Q=k.sibling;if(Q!==null){Q.return=k.return,ee=Q;break e}ee=k.return}}if(ge=h,Rn(),Xt&&typeof Xt.onPostCommitFiberRoot=="function")try{Xt.onPostCommitFiberRoot(Ps,t)}catch{}d=!0}return d}finally{ye=o,Mt.transition=r}}return!1}function J0(t,r,o){r=Wi(o,r),r=x0(t,r,1),t=On(t,r,1),r=ut(),t!==null&&(xr(t,1,r),bt(t,r))}function Oe(t,r,o){if(t.tag===3)J0(t,t,o);else for(;r!==null;){if(r.tag===3){J0(r,t,o);break}else if(r.tag===1){var d=r.stateNode;if(typeof r.type.getDerivedStateFromError=="function"||typeof d.componentDidCatch=="function"&&(Bn===null||!Bn.has(d))){t=Wi(o,t),t=v0(r,t,1),r=On(r,t,1),t=ut(),r!==null&&(xr(r,1,t),bt(r,t));break}}r=r.return}}function p2(t,r,o){var d=t.pingCache;d!==null&&d.delete(r),r=ut(),t.pingedLanes|=t.suspendedLanes&o,Ze===t&&(tt&o)===o&&(qe===4||qe===3&&(tt&130023424)===tt&&500>We()-Ql?li(t,0):Kl|=o),bt(t,r)}function ef(t,r){r===0&&((t.mode&1)===0?r=1:(r=As,As<<=1,(As&130023424)===0&&(As=4194304)));var o=ut();t=pn(t,r),t!==null&&(xr(t,r,o),bt(t,o))}function f2(t){var r=t.memoizedState,o=0;r!==null&&(o=r.retryLane),ef(t,o)}function h2(t,r){var o=0;switch(t.tag){case 13:var d=t.stateNode,h=t.memoizedState;h!==null&&(o=h.retryLane);break;case 19:d=t.stateNode;break;default:throw Error(s(314))}d!==null&&d.delete(r),ef(t,o)}var tf;tf=function(t,r,o){if(t!==null)if(t.memoizedProps!==r.pendingProps||mt.current)xt=!0;else{if((t.lanes&o)===0&&(r.flags&128)===0)return xt=!1,t2(t,r,o);xt=(t.flags&131072)!==0}else xt=!1,Ee&&(r.flags&1048576)!==0&&Lp(r,ea,r.index);switch(r.lanes=0,r.tag){case 2:var d=r.type;ma(t,r),t=r.pendingProps;var h=Di(r,rt.current);Vi(r,o),h=Pl(null,r,d,t,h,o);var x=Ml();return r.flags|=1,typeof h=="object"&&h!==null&&typeof h.render=="function"&&h.$$typeof===void 0?(r.tag=1,r.memoizedState=null,r.updateQueue=null,gt(d)?(x=!0,Qs(r)):x=!1,r.memoizedState=h.state!==null&&h.state!==void 0?h.state:null,wl(r),h.updater=aa,r.stateNode=h,h._reactInternals=r,kl(r,d,t,o),r=Vl(null,r,d,!0,x,o)):(r.tag=0,Ee&&x&&ul(r),dt(null,r,h,o),r=r.child),r;case 16:d=r.elementType;e:{switch(ma(t,r),t=r.pendingProps,h=d._init,d=h(d._payload),r.type=d,h=r.tag=g2(d),t=Wt(d,t),h){case 0:r=Ol(null,r,d,t,o);break e;case 1:r=T0(null,r,d,t,o);break e;case 11:r=j0(null,r,d,t,o);break e;case 14:r=k0(null,r,d,Wt(d.type,t),o);break e}throw Error(s(306,d,""))}return r;case 0:return d=r.type,h=r.pendingProps,h=r.elementType===d?h:Wt(d,h),Ol(t,r,d,h,o);case 1:return d=r.type,h=r.pendingProps,h=r.elementType===d?h:Wt(d,h),T0(t,r,d,h,o);case 3:e:{if(z0(r),t===null)throw Error(s(387));d=r.pendingProps,x=r.memoizedState,h=x.element,Vp(t,r),sa(r,d,null,o);var w=r.memoizedState;if(d=w.element,x.isDehydrated)if(x={element:d,isDehydrated:!1,cache:w.cache,pendingSuspenseBoundaries:w.pendingSuspenseBoundaries,transitions:w.transitions},r.updateQueue.baseState=x,r.memoizedState=x,r.flags&256){h=Wi(Error(s(423)),r),r=E0(t,r,d,o,h);break e}else if(d!==h){h=Wi(Error(s(424)),r),r=E0(t,r,d,o,h);break e}else for(St=Ln(r.stateNode.containerInfo.firstChild),kt=r,Ee=!0,_t=null,o=qp(r,null,d,o),r.child=o;o;)o.flags=o.flags&-3|4096,o=o.sibling;else{if(Ii(),d===h){r=hn(t,r,o);break e}dt(t,r,d,o)}r=r.child}return r;case 5:return Xp(r),t===null&&hl(r),d=r.type,h=r.pendingProps,x=t!==null?t.memoizedProps:null,w=h.children,sl(d,h)?w=null:x!==null&&sl(d,x)&&(r.flags|=32),C0(t,r),dt(t,r,w,o),r.child;case 6:return t===null&&hl(r),null;case 13:return P0(t,r,o);case 4:return Sl(r,r.stateNode.containerInfo),d=r.pendingProps,t===null?r.child=Bi(r,null,d,o):dt(t,r,d,o),r.child;case 11:return d=r.type,h=r.pendingProps,h=r.elementType===d?h:Wt(d,h),j0(t,r,d,h,o);case 7:return dt(t,r,r.pendingProps,o),r.child;case 8:return dt(t,r,r.pendingProps.children,o),r.child;case 12:return dt(t,r,r.pendingProps.children,o),r.child;case 10:e:{if(d=r.type._context,h=r.pendingProps,x=r.memoizedProps,w=h.value,Ne(na,d._currentValue),d._currentValue=w,x!==null)if(Bt(x.value,w)){if(x.children===h.children&&!mt.current){r=hn(t,r,o);break e}}else for(x=r.child,x!==null&&(x.return=r);x!==null;){var k=x.dependencies;if(k!==null){w=x.child;for(var z=k.firstContext;z!==null;){if(z.context===d){if(x.tag===1){z=fn(-1,o&-o),z.tag=2;var V=x.updateQueue;if(V!==null){V=V.shared;var $=V.pending;$===null?z.next=z:(z.next=$.next,$.next=z),V.pending=z}}x.lanes|=o,z=x.alternate,z!==null&&(z.lanes|=o),bl(x.return,o,r),k.lanes|=o;break}z=z.next}}else if(x.tag===10)w=x.type===r.type?null:x.child;else if(x.tag===18){if(w=x.return,w===null)throw Error(s(341));w.lanes|=o,k=w.alternate,k!==null&&(k.lanes|=o),bl(w,o,r),w=x.sibling}else w=x.child;if(w!==null)w.return=x;else for(w=x;w!==null;){if(w===r){w=null;break}if(x=w.sibling,x!==null){x.return=w.return,w=x;break}w=w.return}x=w}dt(t,r,h.children,o),r=r.child}return r;case 9:return h=r.type,d=r.pendingProps.children,Vi(r,o),h=Et(h),d=d(h),r.flags|=1,dt(t,r,d,o),r.child;case 14:return d=r.type,h=Wt(d,r.pendingProps),h=Wt(d.type,h),k0(t,r,d,h,o);case 15:return S0(t,r,r.type,r.pendingProps,o);case 17:return d=r.type,h=r.pendingProps,h=r.elementType===d?h:Wt(d,h),ma(t,r),r.tag=1,gt(d)?(t=!0,Qs(r)):t=!1,Vi(r,o),Yp(r,d,h),kl(r,d,h,o),Vl(null,r,d,!0,t,o);case 19:return A0(t,r,o);case 22:return N0(t,r,o)}throw Error(s(156,r.tag))};function nf(t,r){return Du(t,r)}function m2(t,r,o,d){this.tag=t,this.key=o,this.sibling=this.child=this.return=this.stateNode=this.type=this.elementType=null,this.index=0,this.ref=null,this.pendingProps=r,this.dependencies=this.memoizedState=this.updateQueue=this.memoizedProps=null,this.mode=d,this.subtreeFlags=this.flags=0,this.deletions=null,this.childLanes=this.lanes=0,this.alternate=null}function At(t,r,o,d){return new m2(t,r,o,d)}function sc(t){return t=t.prototype,!(!t||!t.isReactComponent)}function g2(t){if(typeof t=="function")return sc(t)?1:0;if(t!=null){if(t=t.$$typeof,t===re)return 11;if(t===we)return 14}return 2}function Yn(t,r){var o=t.alternate;return o===null?(o=At(t.tag,r,t.key,t.mode),o.elementType=t.elementType,o.type=t.type,o.stateNode=t.stateNode,o.alternate=t,t.alternate=o):(o.pendingProps=r,o.type=t.type,o.flags=0,o.subtreeFlags=0,o.deletions=null),o.flags=t.flags&14680064,o.childLanes=t.childLanes,o.lanes=t.lanes,o.child=t.child,o.memoizedProps=t.memoizedProps,o.memoizedState=t.memoizedState,o.updateQueue=t.updateQueue,r=t.dependencies,o.dependencies=r===null?null:{lanes:r.lanes,firstContext:r.firstContext},o.sibling=t.sibling,o.index=t.index,o.ref=t.ref,o}function Ca(t,r,o,d,h,x){var w=2;if(d=t,typeof t=="function")sc(t)&&(w=1);else if(typeof t=="string")w=5;else e:switch(t){case _:return di(o.children,h,x,r);case D:w=8,h|=8;break;case H:return t=At(12,o,r,h|2),t.elementType=H,t.lanes=x,t;case ue:return t=At(13,o,r,h),t.elementType=ue,t.lanes=x,t;case me:return t=At(19,o,r,h),t.elementType=me,t.lanes=x,t;case Z:return Ta(o,h,x,r);default:if(typeof t=="object"&&t!==null)switch(t.$$typeof){case Y:w=10;break e;case X:w=9;break e;case re:w=11;break e;case we:w=14;break e;case Ie:w=16,d=null;break e}throw Error(s(130,t==null?t:typeof t,""))}return r=At(w,o,r,h),r.elementType=t,r.type=d,r.lanes=x,r}function di(t,r,o,d){return t=At(7,t,d,r),t.lanes=o,t}function Ta(t,r,o,d){return t=At(22,t,d,r),t.elementType=Z,t.lanes=o,t.stateNode={isHidden:!1},t}function ac(t,r,o){return t=At(6,t,null,r),t.lanes=o,t}function oc(t,r,o){return r=At(4,t.children!==null?t.children:[],t.key,r),r.lanes=o,r.stateNode={containerInfo:t.containerInfo,pendingChildren:null,implementation:t.implementation},r}function x2(t,r,o,d,h){this.tag=r,this.containerInfo=t,this.finishedWork=this.pingCache=this.current=this.pendingChildren=null,this.timeoutHandle=-1,this.callbackNode=this.pendingContext=this.context=null,this.callbackPriority=0,this.eventTimes=Do(0),this.expirationTimes=Do(-1),this.entangledLanes=this.finishedLanes=this.mutableReadLanes=this.expiredLanes=this.pingedLanes=this.suspendedLanes=this.pendingLanes=0,this.entanglements=Do(0),this.identifierPrefix=d,this.onRecoverableError=h,this.mutableSourceEagerHydrationData=null}function lc(t,r,o,d,h,x,w,k,z){return t=new x2(t,r,o,k,z),r===1?(r=1,x===!0&&(r|=8)):r=0,x=At(3,null,null,r),t.current=x,x.stateNode=t,x.memoizedState={element:d,isDehydrated:o,cache:null,transitions:null,pendingSuspenseBoundaries:null},wl(x),t}function v2(t,r,o){var d=3<arguments.length&&arguments[3]!==void 0?arguments[3]:null;return{$$typeof:F,key:d==null?null:""+d,children:t,containerInfo:r,implementation:o}}function rf(t){if(!t)return Fn;t=t._reactInternals;e:{if(Zn(t)!==t||t.tag!==1)throw Error(s(170));var r=t;do{switch(r.tag){case 3:r=r.stateNode.context;break e;case 1:if(gt(r.type)){r=r.stateNode.__reactInternalMemoizedMergedChildContext;break e}}r=r.return}while(r!==null);throw Error(s(171))}if(t.tag===1){var o=t.type;if(gt(o))return Pp(t,o,r)}return r}function sf(t,r,o,d,h,x,w,k,z){return t=lc(o,d,!0,t,h,x,w,k,z),t.context=rf(null),o=t.current,d=ut(),h=Wn(o),x=fn(d,h),x.callback=r??null,On(o,x,h),t.current.lanes=h,xr(t,h,d),bt(t,d),t}function za(t,r,o,d){var h=r.current,x=ut(),w=Wn(h);return o=rf(o),r.context===null?r.context=o:r.pendingContext=o,r=fn(x,w),r.payload={element:t},d=d===void 0?null:d,d!==null&&(r.callback=d),t=On(h,r,w),t!==null&&($t(t,h,w,x),ra(t,h,w)),w}function Ea(t){if(t=t.current,!t.child)return null;switch(t.child.tag){case 5:return t.child.stateNode;default:return t.child.stateNode}}function af(t,r){if(t=t.memoizedState,t!==null&&t.dehydrated!==null){var o=t.retryLane;t.retryLane=o!==0&&o<r?o:r}}function cc(t,r){af(t,r),(t=t.alternate)&&af(t,r)}function b2(){return null}var of=typeof reportError=="function"?reportError:function(t){console.error(t)};function dc(t){this._internalRoot=t}Pa.prototype.render=dc.prototype.render=function(t){var r=this._internalRoot;if(r===null)throw Error(s(409));za(t,r,null,null)},Pa.prototype.unmount=dc.prototype.unmount=function(){var t=this._internalRoot;if(t!==null){this._internalRoot=null;var r=t.containerInfo;oi(function(){za(null,t,null,null)}),r[ln]=null}};function Pa(t){this._internalRoot=t}Pa.prototype.unstable_scheduleHydration=function(t){if(t){var r=Wu();t={blockedOn:null,target:t,priority:r};for(var o=0;o<Pn.length&&r!==0&&r<Pn[o].priority;o++);Pn.splice(o,0,t),o===0&&$u(t)}};function uc(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11)}function Ma(t){return!(!t||t.nodeType!==1&&t.nodeType!==9&&t.nodeType!==11&&(t.nodeType!==8||t.nodeValue!==" react-mount-point-unstable "))}function lf(){}function y2(t,r,o,d,h){if(h){if(typeof d=="function"){var x=d;d=function(){var V=Ea(w);x.call(V)}}var w=sf(r,d,t,0,null,!1,!1,"",lf);return t._reactRootContainer=w,t[ln]=w.current,Mr(t.nodeType===8?t.parentNode:t),oi(),w}for(;h=t.lastChild;)t.removeChild(h);if(typeof d=="function"){var k=d;d=function(){var V=Ea(z);k.call(V)}}var z=lc(t,0,!1,null,null,!1,!1,"",lf);return t._reactRootContainer=z,t[ln]=z.current,Mr(t.nodeType===8?t.parentNode:t),oi(function(){za(r,z,o,d)}),z}function Aa(t,r,o,d,h){var x=o._reactRootContainer;if(x){var w=x;if(typeof h=="function"){var k=h;h=function(){var z=Ea(w);k.call(z)}}za(r,w,t,h)}else w=y2(o,r,t,h,d);return Ea(w)}Bu=function(t){switch(t.tag){case 3:var r=t.stateNode;if(r.current.memoizedState.isDehydrated){var o=gr(r.pendingLanes);o!==0&&(Fo(r,o|1),bt(r,We()),(ge&6)===0&&($i=We()+500,Rn()))}break;case 13:oi(function(){var d=pn(t,1);if(d!==null){var h=ut();$t(d,t,1,h)}}),cc(t,1)}},Ro=function(t){if(t.tag===13){var r=pn(t,134217728);if(r!==null){var o=ut();$t(r,t,134217728,o)}cc(t,134217728)}},_u=function(t){if(t.tag===13){var r=Wn(t),o=pn(t,r);if(o!==null){var d=ut();$t(o,t,r,d)}cc(t,r)}},Wu=function(){return ye},Uu=function(t,r){var o=ye;try{return ye=t,r()}finally{ye=o}},zo=function(t,r,o){switch(r){case"input":if(yo(t,o),r=o.name,o.type==="radio"&&r!=null){for(o=t;o.parentNode;)o=o.parentNode;for(o=o.querySelectorAll("input[name="+JSON.stringify(""+r)+'][type="radio"]'),r=0;r<o.length;r++){var d=o[r];if(d!==t&&d.form===t.form){var h=Xs(d);if(!h)throw Error(s(90));fu(d),yo(d,h)}}}break;case"textarea":vu(t,o);break;case"select":r=o.value,r!=null&&ji(t,!!o.multiple,r,!1)}},Tu=nc,zu=oi;var w2={usingClientEntryPoint:!1,Events:[Dr,Ai,Xs,Nu,Cu,nc]},qr={findFiberByHostInstance:Jn,bundleType:0,version:"18.2.0",rendererPackageName:"react-dom"},j2={bundleType:qr.bundleType,version:qr.version,rendererPackageName:qr.rendererPackageName,rendererConfig:qr.rendererConfig,overrideHookState:null,overrideHookStateDeletePath:null,overrideHookStateRenamePath:null,overrideProps:null,overridePropsDeletePath:null,overridePropsRenamePath:null,setErrorHandler:null,setSuspenseHandler:null,scheduleUpdate:null,currentDispatcherRef:B.ReactCurrentDispatcher,findHostInstanceByFiber:function(t){return t=Au(t),t===null?null:t.stateNode},findFiberByHostInstance:qr.findFiberByHostInstance||b2,findHostInstancesForRefresh:null,scheduleRefresh:null,scheduleRoot:null,setRefreshHandler:null,getCurrentFiber:null,reconcilerVersion:"18.2.0-next-9e3b772b8-20220608"};if(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__<"u"){var La=__REACT_DEVTOOLS_GLOBAL_HOOK__;if(!La.isDisabled&&La.supportsFiber)try{Ps=La.inject(j2),Xt=La}catch{}}return yt.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED=w2,yt.createPortal=function(t,r){var o=2<arguments.length&&arguments[2]!==void 0?arguments[2]:null;if(!uc(r))throw Error(s(200));return v2(t,r,null,o)},yt.createRoot=function(t,r){if(!uc(t))throw Error(s(299));var o=!1,d="",h=of;return r!=null&&(r.unstable_strictMode===!0&&(o=!0),r.identifierPrefix!==void 0&&(d=r.identifierPrefix),r.onRecoverableError!==void 0&&(h=r.onRecoverableError)),r=lc(t,1,!1,null,null,o,!1,d,h),t[ln]=r.current,Mr(t.nodeType===8?t.parentNode:t),new dc(r)},yt.findDOMNode=function(t){if(t==null)return null;if(t.nodeType===1)return t;var r=t._reactInternals;if(r===void 0)throw typeof t.render=="function"?Error(s(188)):(t=Object.keys(t).join(","),Error(s(268,t)));return t=Au(r),t=t===null?null:t.stateNode,t},yt.flushSync=function(t){return oi(t)},yt.hydrate=function(t,r,o){if(!Ma(r))throw Error(s(200));return Aa(null,t,r,!0,o)},yt.hydrateRoot=function(t,r,o){if(!uc(t))throw Error(s(405));var d=o!=null&&o.hydratedSources||null,h=!1,x="",w=of;if(o!=null&&(o.unstable_strictMode===!0&&(h=!0),o.identifierPrefix!==void 0&&(x=o.identifierPrefix),o.onRecoverableError!==void 0&&(w=o.onRecoverableError)),r=sf(r,null,t,1,o??null,h,!1,x,w),t[ln]=r.current,Mr(t),d)for(t=0;t<d.length;t++)o=d[t],h=o._getVersion,h=h(o._source),r.mutableSourceEagerHydrationData==null?r.mutableSourceEagerHydrationData=[o,h]:r.mutableSourceEagerHydrationData.push(o,h);return new Pa(r)},yt.render=function(t,r,o){if(!Ma(r))throw Error(s(200));return Aa(null,t,r,!1,o)},yt.unmountComponentAtNode=function(t){if(!Ma(t))throw Error(s(40));return t._reactRootContainer?(oi(function(){Aa(null,null,t,!1,function(){t._reactRootContainer=null,t[ln]=null})}),!0):!1},yt.unstable_batchedUpdates=nc,yt.unstable_renderSubtreeIntoContainer=function(t,r,o,d){if(!Ma(o))throw Error(s(200));if(t==null||t._reactInternals===void 0)throw Error(s(38));return Aa(t,r,o,!1,d)},yt.version="18.2.0-next-9e3b772b8-20220608",yt}var gf;function M2(){if(gf)return hc.exports;gf=1;function e(){if(!(typeof __REACT_DEVTOOLS_GLOBAL_HOOK__>"u"||typeof __REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE!="function"))try{__REACT_DEVTOOLS_GLOBAL_HOOK__.checkDCE(e)}catch(n){console.error(n)}}return e(),hc.exports=P2(),hc.exports}var xf;function A2(){if(xf)return Da;xf=1;var e=M2();return Da.createRoot=e.createRoot,Da.hydrateRoot=e.hydrateRoot,Da}var L2=A2();var vf="popstate";function D2(e={}){function n(a,l){let{pathname:c,search:u,hash:f}=a.location;return Wc("",{pathname:c,search:u,hash:f},l.state&&l.state.usr||null,l.state&&l.state.key||"default")}function s(a,l){return typeof l=="string"?l:os(l)}return R2(n,s,null,e)}function Re(e,n){if(e===!1||e===null||typeof e>"u")throw new Error(n)}function qt(e,n){if(!e){typeof console<"u"&&console.warn(n);try{throw new Error(n)}catch{}}}function F2(){return Math.random().toString(36).substring(2,10)}function bf(e,n){return{usr:e.state,key:e.key,idx:n}}function Wc(e,n,s=null,a){return{pathname:typeof e=="string"?e:e.pathname,search:"",hash:"",...typeof n=="string"?sr(n):n,state:s,key:n&&n.key||a||F2()}}function os({pathname:e="/",search:n="",hash:s=""}){return n&&n!=="?"&&(e+=n.charAt(0)==="?"?n:"?"+n),s&&s!=="#"&&(e+=s.charAt(0)==="#"?s:"#"+s),e}function sr(e){let n={};if(e){let s=e.indexOf("#");s>=0&&(n.hash=e.substring(s),e=e.substring(0,s));let a=e.indexOf("?");a>=0&&(n.search=e.substring(a),e=e.substring(0,a)),e&&(n.pathname=e)}return n}function R2(e,n,s,a={}){let{window:l=document.defaultView,v5Compat:c=!1}=a,u=l.history,f="POP",p=null,m=g();m==null&&(m=0,u.replaceState({...u.state,idx:m},""));function g(){return(u.state||{idx:null}).idx}function v(){f="POP";let T=g(),L=T==null?null:T-m;m=T,p&&p({action:f,location:N.location,delta:L})}function b(T,L){f="PUSH";let E=Wc(N.location,T,L);m=g()+1;let P=bf(E,m),B=N.createHref(E);try{u.pushState(P,"",B)}catch(M){if(M instanceof DOMException&&M.name==="DataCloneError")throw M;l.location.assign(B)}c&&p&&p({action:f,location:N.location,delta:1})}function y(T,L){f="REPLACE";let E=Wc(N.location,T,L);m=g();let P=bf(E,m),B=N.createHref(E);u.replaceState(P,"",B),c&&p&&p({action:f,location:N.location,delta:0})}function S(T){return I2(T)}let N={get action(){return f},get location(){return e(l,u)},listen(T){if(p)throw new Error("A history only accepts one active listener");return l.addEventListener(vf,v),p=T,()=>{l.removeEventListener(vf,v),p=null}},createHref(T){return n(l,T)},createURL:S,encodeLocation(T){let L=S(T);return{pathname:L.pathname,search:L.search,hash:L.hash}},push:b,replace:y,go(T){return u.go(T)}};return N}function I2(e,n=!1){let s="http://localhost";typeof window<"u"&&(s=window.location.origin!=="null"?window.location.origin:window.location.href),Re(s,"No window.location.(origin|href) available to create URL");let a=typeof e=="string"?e:os(e);return a=a.replace(/ $/,"%20"),!n&&a.startsWith("//")&&(a=s+a),new URL(a,s)}function Jh(e,n,s="/"){return O2(e,n,s,!1)}function O2(e,n,s,a){let l=typeof n=="string"?sr(n):n,c=jn(l.pathname||"/",s);if(c==null)return null;let u=em(e);V2(u);let f=null;for(let p=0;f==null&&p<u.length;++p){let m=K2(c);f=q2(u[p],m,a)}return f}function em(e,n=[],s=[],a="",l=!1){let c=(u,f,p=l,m)=>{let g={relativePath:m===void 0?u.path||"":m,caseSensitive:u.caseSensitive===!0,childrenIndex:f,route:u};if(g.relativePath.startsWith("/")){if(!g.relativePath.startsWith(a)&&p)return;Re(g.relativePath.startsWith(a),`Absolute route path "${g.relativePath}" nested under path "${a}" is not valid. An absolute child route path must start with the combined path of all its parent routes.`),g.relativePath=g.relativePath.slice(a.length)}let v=bn([a,g.relativePath]),b=s.concat(g);u.children&&u.children.length>0&&(Re(u.index!==!0,`Index routes must not have child routes. Please remove all child routes from route path "${v}".`),em(u.children,n,b,v,p)),!(u.path==null&&!u.index)&&n.push({path:v,score:H2(v,u.index),routesMeta:b})};return e.forEach((u,f)=>{if(u.path===""||!u.path?.includes("?"))c(u,f);else for(let p of tm(u.path))c(u,f,!0,p)}),n}function tm(e){let n=e.split("/");if(n.length===0)return[];let[s,...a]=n,l=s.endsWith("?"),c=s.replace(/\?$/,"");if(a.length===0)return l?[c,""]:[c];let u=tm(a.join("/")),f=[];return f.push(...u.map(p=>p===""?c:[c,p].join("/"))),l&&f.push(...u),f.map(p=>e.startsWith("/")&&p===""?"/":p)}function V2(e){e.sort((n,s)=>n.score!==s.score?s.score-n.score:G2(n.routesMeta.map(a=>a.childrenIndex),s.routesMeta.map(a=>a.childrenIndex)))}var B2=/^:[\w-]+$/,_2=3,W2=2,U2=1,Y2=10,$2=-2,yf=e=>e==="*";function H2(e,n){let s=e.split("/"),a=s.length;return s.some(yf)&&(a+=$2),n&&(a+=W2),s.filter(l=>!yf(l)).reduce((l,c)=>l+(B2.test(c)?_2:c===""?U2:Y2),a)}function G2(e,n){return e.length===n.length&&e.slice(0,-1).every((a,l)=>a===n[l])?e[e.length-1]-n[n.length-1]:0}function q2(e,n,s=!1){let{routesMeta:a}=e,l={},c="/",u=[];for(let f=0;f<a.length;++f){let p=a[f],m=f===a.length-1,g=c==="/"?n:n.slice(c.length)||"/",v=Xa({path:p.relativePath,caseSensitive:p.caseSensitive,end:m},g),b=p.route;if(!v&&m&&s&&!a[a.length-1].route.index&&(v=Xa({path:p.relativePath,caseSensitive:p.caseSensitive,end:!1},g)),!v)return null;Object.assign(l,v.params),u.push({params:l,pathname:bn([c,v.pathname]),pathnameBase:e5(bn([c,v.pathnameBase])),route:b}),v.pathnameBase!=="/"&&(c=bn([c,v.pathnameBase]))}return u}function Xa(e,n){typeof e=="string"&&(e={path:e,caseSensitive:!1,end:!0});let[s,a]=X2(e.path,e.caseSensitive,e.end),l=n.match(s);if(!l)return null;let c=l[0],u=c.replace(/(.)\/+$/,"$1"),f=l.slice(1);return{params:a.reduce((m,{paramName:g,isOptional:v},b)=>{if(g==="*"){let S=f[b]||"";u=c.slice(0,c.length-S.length).replace(/(.)\/+$/,"$1")}const y=f[b];return v&&!y?m[g]=void 0:m[g]=(y||"").replace(/%2F/g,"/"),m},{}),pathname:c,pathnameBase:u,pattern:e}}function X2(e,n=!1,s=!0){qt(e==="*"||!e.endsWith("*")||e.endsWith("/*"),`Route path "${e}" will be treated as if it were "${e.replace(/\*$/,"/*")}" because the \`*\` character must always follow a \`/\` in the pattern. To get rid of this warning, please change the route path to "${e.replace(/\*$/,"/*")}".`);let a=[],l="^"+e.replace(/\/*\*?$/,"").replace(/^\/*/,"/").replace(/[\\.*+^${}|()[\]]/g,"\\$&").replace(/\/:([\w-]+)(\?)?/g,(u,f,p)=>(a.push({paramName:f,isOptional:p!=null}),p?"/?([^\\/]+)?":"/([^\\/]+)")).replace(/\/([\w-]+)\?(\/|$)/g,"(/$1)?$2");return e.endsWith("*")?(a.push({paramName:"*"}),l+=e==="*"||e==="/*"?"(.*)$":"(?:\\/(.+)|\\/*)$"):s?l+="\\/*$":e!==""&&e!=="/"&&(l+="(?:(?=\\/|$))"),[new RegExp(l,n?void 0:"i"),a]}function K2(e){try{return e.split("/").map(n=>decodeURIComponent(n).replace(/\//g,"%2F")).join("/")}catch(n){return qt(!1,`The URL path "${e}" could not be decoded because it is a malformed URL segment. This is probably due to a bad percent encoding (${n}).`),e}}function jn(e,n){if(n==="/")return e;if(!e.toLowerCase().startsWith(n.toLowerCase()))return null;let s=n.endsWith("/")?n.length-1:n.length,a=e.charAt(s);return a&&a!=="/"?null:e.slice(s)||"/"}function Q2(e,n="/"){let{pathname:s,search:a="",hash:l=""}=typeof e=="string"?sr(e):e;return{pathname:s?s.startsWith("/")?s:Z2(s,n):n,search:t5(a),hash:n5(l)}}function Z2(e,n){let s=n.replace(/\/+$/,"").split("/");return e.split("/").forEach(l=>{l===".."?s.length>1&&s.pop():l!=="."&&s.push(l)}),s.length>1?s.join("/"):"/"}function xc(e,n,s,a){return`Cannot include a '${e}' character in a manually specified \`to.${n}\` field [${JSON.stringify(a)}].  Please separate it out to the \`to.${s}\` field. Alternatively you may provide the full path as a string in <Link to="..."> and the router will parse it for you.`}function J2(e){return e.filter((n,s)=>s===0||n.route.path&&n.route.path.length>0)}function nm(e){let n=J2(e);return n.map((s,a)=>a===n.length-1?s.pathname:s.pathnameBase)}function im(e,n,s,a=!1){let l;typeof e=="string"?l=sr(e):(l={...e},Re(!l.pathname||!l.pathname.includes("?"),xc("?","pathname","search",l)),Re(!l.pathname||!l.pathname.includes("#"),xc("#","pathname","hash",l)),Re(!l.search||!l.search.includes("#"),xc("#","search","hash",l)));let c=e===""||l.pathname==="",u=c?"/":l.pathname,f;if(u==null)f=s;else{let v=n.length-1;if(!a&&u.startsWith("..")){let b=u.split("/");for(;b[0]==="..";)b.shift(),v-=1;l.pathname=b.join("/")}f=v>=0?n[v]:"/"}let p=Q2(l,f),m=u&&u!=="/"&&u.endsWith("/"),g=(c||u===".")&&s.endsWith("/");return!p.pathname.endsWith("/")&&(m||g)&&(p.pathname+="/"),p}var bn=e=>e.join("/").replace(/\/\/+/g,"/"),e5=e=>e.replace(/\/+$/,"").replace(/^\/*/,"/"),t5=e=>!e||e==="?"?"":e.startsWith("?")?e:"?"+e,n5=e=>!e||e==="#"?"":e.startsWith("#")?e:"#"+e;function i5(e){return e!=null&&typeof e.status=="number"&&typeof e.statusText=="string"&&typeof e.internal=="boolean"&&"data"in e}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");var rm=["POST","PUT","PATCH","DELETE"];new Set(rm);var r5=["GET",...rm];new Set(r5);var ar=j.createContext(null);ar.displayName="DataRouter";var co=j.createContext(null);co.displayName="DataRouterState";j.createContext(!1);var sm=j.createContext({isTransitioning:!1});sm.displayName="ViewTransition";var s5=j.createContext(new Map);s5.displayName="Fetchers";var a5=j.createContext(null);a5.displayName="Await";var on=j.createContext(null);on.displayName="Navigation";var xs=j.createContext(null);xs.displayName="Location";var Nn=j.createContext({outlet:null,matches:[],isDataRoute:!1});Nn.displayName="Route";var bd=j.createContext(null);bd.displayName="RouteError";function o5(e,{relative:n}={}){Re(vs(),"useHref() may be used only in the context of a <Router> component.");let{basename:s,navigator:a}=j.useContext(on),{hash:l,pathname:c,search:u}=bs(e,{relative:n}),f=c;return s!=="/"&&(f=c==="/"?s:bn([s,c])),a.createHref({pathname:f,search:u,hash:l})}function vs(){return j.useContext(xs)!=null}function Cn(){return Re(vs(),"useLocation() may be used only in the context of a <Router> component."),j.useContext(xs).location}var am="You should call navigate() in a React.useEffect(), not when your component is first rendered.";function om(e){j.useContext(on).static||j.useLayoutEffect(e)}function uo(){let{isDataRoute:e}=j.useContext(Nn);return e?y5():l5()}function l5(){Re(vs(),"useNavigate() may be used only in the context of a <Router> component.");let e=j.useContext(ar),{basename:n,navigator:s}=j.useContext(on),{matches:a}=j.useContext(Nn),{pathname:l}=Cn(),c=JSON.stringify(nm(a)),u=j.useRef(!1);return om(()=>{u.current=!0}),j.useCallback((p,m={})=>{if(qt(u.current,am),!u.current)return;if(typeof p=="number"){s.go(p);return}let g=im(p,JSON.parse(c),l,m.relative==="path");e==null&&n!=="/"&&(g.pathname=g.pathname==="/"?n:bn([n,g.pathname])),(m.replace?s.replace:s.push)(g,m.state,m)},[n,s,c,l,e])}j.createContext(null);function bs(e,{relative:n}={}){let{matches:s}=j.useContext(Nn),{pathname:a}=Cn(),l=JSON.stringify(nm(s));return j.useMemo(()=>im(e,JSON.parse(l),a,n==="path"),[e,l,a,n])}function c5(e,n){return lm(e,n)}function lm(e,n,s,a,l){Re(vs(),"useRoutes() may be used only in the context of a <Router> component.");let{navigator:c}=j.useContext(on),{matches:u}=j.useContext(Nn),f=u[u.length-1],p=f?f.params:{},m=f?f.pathname:"/",g=f?f.pathnameBase:"/",v=f&&f.route;{let E=v&&v.path||"";cm(m,!v||E.endsWith("*")||E.endsWith("*?"),`You rendered descendant <Routes> (or called \`useRoutes()\`) at "${m}" (under <Route path="${E}">) but the parent route path has no trailing "*". This means if you navigate deeper, the parent won't match anymore and therefore the child routes will never render.

Please change the parent <Route path="${E}"> to <Route path="${E==="/"?"*":`${E}/*`}">.`)}let b=Cn(),y;if(n){let E=typeof n=="string"?sr(n):n;Re(g==="/"||E.pathname?.startsWith(g),`When overriding the location using \`<Routes location>\` or \`useRoutes(routes, location)\`, the location pathname must begin with the portion of the URL pathname that was matched by all parent routes. The current pathname base is "${g}" but pathname "${E.pathname}" was given in the \`location\` prop.`),y=E}else y=b;let S=y.pathname||"/",N=S;if(g!=="/"){let E=g.replace(/^\//,"").split("/");N="/"+S.replace(/^\//,"").split("/").slice(E.length).join("/")}let T=Jh(e,{pathname:N});qt(v||T!=null,`No routes matched location "${y.pathname}${y.search}${y.hash}" `),qt(T==null||T[T.length-1].route.element!==void 0||T[T.length-1].route.Component!==void 0||T[T.length-1].route.lazy!==void 0,`Matched leaf route at location "${y.pathname}${y.search}${y.hash}" does not have an element or Component. This means it will render an <Outlet /> with a null value by default resulting in an "empty" page.`);let L=h5(T&&T.map(E=>Object.assign({},E,{params:Object.assign({},p,E.params),pathname:bn([g,c.encodeLocation?c.encodeLocation(E.pathname.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:E.pathname]),pathnameBase:E.pathnameBase==="/"?g:bn([g,c.encodeLocation?c.encodeLocation(E.pathnameBase.replace(/\?/g,"%3F").replace(/#/g,"%23")).pathname:E.pathnameBase])})),u,s,a,l);return n&&L?j.createElement(xs.Provider,{value:{location:{pathname:"/",search:"",hash:"",state:null,key:"default",...y},navigationType:"POP"}},L):L}function d5(){let e=b5(),n=i5(e)?`${e.status} ${e.statusText}`:e instanceof Error?e.message:JSON.stringify(e),s=e instanceof Error?e.stack:null,a="rgba(200,200,200, 0.5)",l={padding:"0.5rem",backgroundColor:a},c={padding:"2px 4px",backgroundColor:a},u=null;return console.error("Error handled by React Router default ErrorBoundary:",e),u=j.createElement(j.Fragment,null,j.createElement("p",null,"💿 Hey developer 👋"),j.createElement("p",null,"You can provide a way better UX than this when your app throws errors by providing your own ",j.createElement("code",{style:c},"ErrorBoundary")," or"," ",j.createElement("code",{style:c},"errorElement")," prop on your route.")),j.createElement(j.Fragment,null,j.createElement("h2",null,"Unexpected Application Error!"),j.createElement("h3",{style:{fontStyle:"italic"}},n),s?j.createElement("pre",{style:l},s):null,u)}var u5=j.createElement(d5,null),p5=class extends j.Component{constructor(e){super(e),this.state={location:e.location,revalidation:e.revalidation,error:e.error}}static getDerivedStateFromError(e){return{error:e}}static getDerivedStateFromProps(e,n){return n.location!==e.location||n.revalidation!=="idle"&&e.revalidation==="idle"?{error:e.error,location:e.location,revalidation:e.revalidation}:{error:e.error!==void 0?e.error:n.error,location:n.location,revalidation:e.revalidation||n.revalidation}}componentDidCatch(e,n){this.props.unstable_onError?this.props.unstable_onError(e,n):console.error("React Router caught the following error during render",e)}render(){return this.state.error!==void 0?j.createElement(Nn.Provider,{value:this.props.routeContext},j.createElement(bd.Provider,{value:this.state.error,children:this.props.component})):this.props.children}};function f5({routeContext:e,match:n,children:s}){let a=j.useContext(ar);return a&&a.static&&a.staticContext&&(n.route.errorElement||n.route.ErrorBoundary)&&(a.staticContext._deepestRenderedBoundaryId=n.route.id),j.createElement(Nn.Provider,{value:e},s)}function h5(e,n=[],s=null,a=null,l=null){if(e==null){if(!s)return null;if(s.errors)e=s.matches;else if(n.length===0&&!s.initialized&&s.matches.length>0)e=s.matches;else return null}let c=e,u=s?.errors;if(u!=null){let m=c.findIndex(g=>g.route.id&&u?.[g.route.id]!==void 0);Re(m>=0,`Could not find a matching route for errors on route IDs: ${Object.keys(u).join(",")}`),c=c.slice(0,Math.min(c.length,m+1))}let f=!1,p=-1;if(s)for(let m=0;m<c.length;m++){let g=c[m];if((g.route.HydrateFallback||g.route.hydrateFallbackElement)&&(p=m),g.route.id){let{loaderData:v,errors:b}=s,y=g.route.loader&&!v.hasOwnProperty(g.route.id)&&(!b||b[g.route.id]===void 0);if(g.route.lazy||y){f=!0,p>=0?c=c.slice(0,p+1):c=[c[0]];break}}}return c.reduceRight((m,g,v)=>{let b,y=!1,S=null,N=null;s&&(b=u&&g.route.id?u[g.route.id]:void 0,S=g.route.errorElement||u5,f&&(p<0&&v===0?(cm("route-fallback",!1,"No `HydrateFallback` element provided to render during initial hydration"),y=!0,N=null):p===v&&(y=!0,N=g.route.hydrateFallbackElement||null)));let T=n.concat(c.slice(0,v+1)),L=()=>{let E;return b?E=S:y?E=N:g.route.Component?E=j.createElement(g.route.Component,null):g.route.element?E=g.route.element:E=m,j.createElement(f5,{match:g,routeContext:{outlet:m,matches:T,isDataRoute:s!=null},children:E})};return s&&(g.route.ErrorBoundary||g.route.errorElement||v===0)?j.createElement(p5,{location:s.location,revalidation:s.revalidation,component:S,error:b,children:L(),routeContext:{outlet:null,matches:T,isDataRoute:!0},unstable_onError:a}):L()},null)}function yd(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function m5(e){let n=j.useContext(ar);return Re(n,yd(e)),n}function g5(e){let n=j.useContext(co);return Re(n,yd(e)),n}function x5(e){let n=j.useContext(Nn);return Re(n,yd(e)),n}function wd(e){let n=x5(e),s=n.matches[n.matches.length-1];return Re(s.route.id,`${e} can only be used on routes that contain a unique "id"`),s.route.id}function v5(){return wd("useRouteId")}function b5(){let e=j.useContext(bd),n=g5("useRouteError"),s=wd("useRouteError");return e!==void 0?e:n.errors?.[s]}function y5(){let{router:e}=m5("useNavigate"),n=wd("useNavigate"),s=j.useRef(!1);return om(()=>{s.current=!0}),j.useCallback(async(l,c={})=>{qt(s.current,am),s.current&&(typeof l=="number"?e.navigate(l):await e.navigate(l,{fromRouteId:n,...c}))},[e,n])}var wf={};function cm(e,n,s){!n&&!wf[e]&&(wf[e]=!0,qt(!1,s))}j.memo(w5);function w5({routes:e,future:n,state:s,unstable_onError:a}){return lm(e,void 0,s,a,n)}function Pe(e){Re(!1,"A <Route> is only ever to be used as the child of <Routes> element, never rendered directly. Please wrap your <Route> in a <Routes>.")}function j5({basename:e="/",children:n=null,location:s,navigationType:a="POP",navigator:l,static:c=!1}){Re(!vs(),"You cannot render a <Router> inside another <Router>. You should never have more than one in your app.");let u=e.replace(/^\/*/,"/"),f=j.useMemo(()=>({basename:u,navigator:l,static:c,future:{}}),[u,l,c]);typeof s=="string"&&(s=sr(s));let{pathname:p="/",search:m="",hash:g="",state:v=null,key:b="default"}=s,y=j.useMemo(()=>{let S=jn(p,u);return S==null?null:{location:{pathname:S,search:m,hash:g,state:v,key:b},navigationType:a}},[u,p,m,g,v,b,a]);return qt(y!=null,`<Router basename="${u}"> is not able to match the URL "${p}${m}${g}" because it does not start with the basename, so the <Router> won't render anything.`),y==null?null:j.createElement(on.Provider,{value:f},j.createElement(xs.Provider,{children:n,value:y}))}function k5({children:e,location:n}){return c5(Uc(e),n)}function Uc(e,n=[]){let s=[];return j.Children.forEach(e,(a,l)=>{if(!j.isValidElement(a))return;let c=[...n,l];if(a.type===j.Fragment){s.push.apply(s,Uc(a.props.children,c));return}Re(a.type===Pe,`[${typeof a.type=="string"?a.type:a.type.name}] is not a <Route> component. All component children of <Routes> must be a <Route> or <React.Fragment>`),Re(!a.props.index||!a.props.children,"An index route cannot have child routes.");let u={id:a.props.id||c.join("-"),caseSensitive:a.props.caseSensitive,element:a.props.element,Component:a.props.Component,index:a.props.index,path:a.props.path,middleware:a.props.middleware,loader:a.props.loader,action:a.props.action,hydrateFallbackElement:a.props.hydrateFallbackElement,HydrateFallback:a.props.HydrateFallback,errorElement:a.props.errorElement,ErrorBoundary:a.props.ErrorBoundary,hasErrorBoundary:a.props.hasErrorBoundary===!0||a.props.ErrorBoundary!=null||a.props.errorElement!=null,shouldRevalidate:a.props.shouldRevalidate,handle:a.props.handle,lazy:a.props.lazy};a.props.children&&(u.children=Uc(a.props.children,c)),s.push(u)}),s}var Wa="get",Ua="application/x-www-form-urlencoded";function po(e){return e!=null&&typeof e.tagName=="string"}function S5(e){return po(e)&&e.tagName.toLowerCase()==="button"}function N5(e){return po(e)&&e.tagName.toLowerCase()==="form"}function C5(e){return po(e)&&e.tagName.toLowerCase()==="input"}function T5(e){return!!(e.metaKey||e.altKey||e.ctrlKey||e.shiftKey)}function z5(e,n){return e.button===0&&(!n||n==="_self")&&!T5(e)}function Yc(e=""){return new URLSearchParams(typeof e=="string"||Array.isArray(e)||e instanceof URLSearchParams?e:Object.keys(e).reduce((n,s)=>{let a=e[s];return n.concat(Array.isArray(a)?a.map(l=>[s,l]):[[s,a]])},[]))}function E5(e,n){let s=Yc(e);return n&&n.forEach((a,l)=>{s.has(l)||n.getAll(l).forEach(c=>{s.append(l,c)})}),s}var Fa=null;function P5(){if(Fa===null)try{new FormData(document.createElement("form"),0),Fa=!1}catch{Fa=!0}return Fa}var M5=new Set(["application/x-www-form-urlencoded","multipart/form-data","text/plain"]);function vc(e){return e!=null&&!M5.has(e)?(qt(!1,`"${e}" is not a valid \`encType\` for \`<Form>\`/\`<fetcher.Form>\` and will default to "${Ua}"`),null):e}function A5(e,n){let s,a,l,c,u;if(N5(e)){let f=e.getAttribute("action");a=f?jn(f,n):null,s=e.getAttribute("method")||Wa,l=vc(e.getAttribute("enctype"))||Ua,c=new FormData(e)}else if(S5(e)||C5(e)&&(e.type==="submit"||e.type==="image")){let f=e.form;if(f==null)throw new Error('Cannot submit a <button> or <input type="submit"> without a <form>');let p=e.getAttribute("formaction")||f.getAttribute("action");if(a=p?jn(p,n):null,s=e.getAttribute("formmethod")||f.getAttribute("method")||Wa,l=vc(e.getAttribute("formenctype"))||vc(f.getAttribute("enctype"))||Ua,c=new FormData(f,e),!P5()){let{name:m,type:g,value:v}=e;if(g==="image"){let b=m?`${m}.`:"";c.append(`${b}x`,"0"),c.append(`${b}y`,"0")}else m&&c.append(m,v)}}else{if(po(e))throw new Error('Cannot submit element that is not <form>, <button>, or <input type="submit|image">');s=Wa,a=null,l=Ua,u=e}return c&&l==="text/plain"&&(u=c,c=void 0),{action:a,method:s.toLowerCase(),encType:l,formData:c,body:u}}Object.getOwnPropertyNames(Object.prototype).sort().join("\0");function jd(e,n){if(e===!1||e===null||typeof e>"u")throw new Error(n)}function L5(e,n,s){let a=typeof e=="string"?new URL(e,typeof window>"u"?"server://singlefetch/":window.location.origin):e;return a.pathname==="/"?a.pathname=`_root.${s}`:n&&jn(a.pathname,n)==="/"?a.pathname=`${n.replace(/\/$/,"")}/_root.${s}`:a.pathname=`${a.pathname.replace(/\/$/,"")}.${s}`,a}async function D5(e,n){if(e.id in n)return n[e.id];try{let s=await import(e.module);return n[e.id]=s,s}catch(s){return console.error(`Error loading route module \`${e.module}\`, reloading page...`),console.error(s),window.__reactRouterContext&&window.__reactRouterContext.isSpaMode,window.location.reload(),new Promise(()=>{})}}function F5(e){return e==null?!1:e.href==null?e.rel==="preload"&&typeof e.imageSrcSet=="string"&&typeof e.imageSizes=="string":typeof e.rel=="string"&&typeof e.href=="string"}async function R5(e,n,s){let a=await Promise.all(e.map(async l=>{let c=n.routes[l.route.id];if(c){let u=await D5(c,s);return u.links?u.links():[]}return[]}));return B5(a.flat(1).filter(F5).filter(l=>l.rel==="stylesheet"||l.rel==="preload").map(l=>l.rel==="stylesheet"?{...l,rel:"prefetch",as:"style"}:{...l,rel:"prefetch"}))}function jf(e,n,s,a,l,c){let u=(p,m)=>s[m]?p.route.id!==s[m].route.id:!0,f=(p,m)=>s[m].pathname!==p.pathname||s[m].route.path?.endsWith("*")&&s[m].params["*"]!==p.params["*"];return c==="assets"?n.filter((p,m)=>u(p,m)||f(p,m)):c==="data"?n.filter((p,m)=>{let g=a.routes[p.route.id];if(!g||!g.hasLoader)return!1;if(u(p,m)||f(p,m))return!0;if(p.route.shouldRevalidate){let v=p.route.shouldRevalidate({currentUrl:new URL(l.pathname+l.search+l.hash,window.origin),currentParams:s[0]?.params||{},nextUrl:new URL(e,window.origin),nextParams:p.params,defaultShouldRevalidate:!0});if(typeof v=="boolean")return v}return!0}):[]}function I5(e,n,{includeHydrateFallback:s}={}){return O5(e.map(a=>{let l=n.routes[a.route.id];if(!l)return[];let c=[l.module];return l.clientActionModule&&(c=c.concat(l.clientActionModule)),l.clientLoaderModule&&(c=c.concat(l.clientLoaderModule)),s&&l.hydrateFallbackModule&&(c=c.concat(l.hydrateFallbackModule)),l.imports&&(c=c.concat(l.imports)),c}).flat(1))}function O5(e){return[...new Set(e)]}function V5(e){let n={},s=Object.keys(e).sort();for(let a of s)n[a]=e[a];return n}function B5(e,n){let s=new Set;return new Set(n),e.reduce((a,l)=>{let c=JSON.stringify(V5(l));return s.has(c)||(s.add(c),a.push({key:c,link:l})),a},[])}function dm(){let e=j.useContext(ar);return jd(e,"You must render this element inside a <DataRouterContext.Provider> element"),e}function _5(){let e=j.useContext(co);return jd(e,"You must render this element inside a <DataRouterStateContext.Provider> element"),e}var kd=j.createContext(void 0);kd.displayName="FrameworkContext";function um(){let e=j.useContext(kd);return jd(e,"You must render this element inside a <HydratedRouter> element"),e}function W5(e,n){let s=j.useContext(kd),[a,l]=j.useState(!1),[c,u]=j.useState(!1),{onFocus:f,onBlur:p,onMouseEnter:m,onMouseLeave:g,onTouchStart:v}=n,b=j.useRef(null);j.useEffect(()=>{if(e==="render"&&u(!0),e==="viewport"){let N=L=>{L.forEach(E=>{u(E.isIntersecting)})},T=new IntersectionObserver(N,{threshold:.5});return b.current&&T.observe(b.current),()=>{T.disconnect()}}},[e]),j.useEffect(()=>{if(a){let N=setTimeout(()=>{u(!0)},100);return()=>{clearTimeout(N)}}},[a]);let y=()=>{l(!0)},S=()=>{l(!1),u(!1)};return s?e!=="intent"?[c,b,{}]:[c,b,{onFocus:Kr(f,y),onBlur:Kr(p,S),onMouseEnter:Kr(m,y),onMouseLeave:Kr(g,S),onTouchStart:Kr(v,y)}]:[!1,b,{}]}function Kr(e,n){return s=>{e&&e(s),s.defaultPrevented||n(s)}}function U5({page:e,...n}){let{router:s}=dm(),a=j.useMemo(()=>Jh(s.routes,e,s.basename),[s.routes,e,s.basename]);return a?j.createElement($5,{page:e,matches:a,...n}):null}function Y5(e){let{manifest:n,routeModules:s}=um(),[a,l]=j.useState([]);return j.useEffect(()=>{let c=!1;return R5(e,n,s).then(u=>{c||l(u)}),()=>{c=!0}},[e,n,s]),a}function $5({page:e,matches:n,...s}){let a=Cn(),{manifest:l,routeModules:c}=um(),{basename:u}=dm(),{loaderData:f,matches:p}=_5(),m=j.useMemo(()=>jf(e,n,p,l,a,"data"),[e,n,p,l,a]),g=j.useMemo(()=>jf(e,n,p,l,a,"assets"),[e,n,p,l,a]),v=j.useMemo(()=>{if(e===a.pathname+a.search+a.hash)return[];let S=new Set,N=!1;if(n.forEach(L=>{let E=l.routes[L.route.id];!E||!E.hasLoader||(!m.some(P=>P.route.id===L.route.id)&&L.route.id in f&&c[L.route.id]?.shouldRevalidate||E.hasClientLoader?N=!0:S.add(L.route.id))}),S.size===0)return[];let T=L5(e,u,"data");return N&&S.size>0&&T.searchParams.set("_routes",n.filter(L=>S.has(L.route.id)).map(L=>L.route.id).join(",")),[T.pathname+T.search]},[u,f,a,l,m,n,e,c]),b=j.useMemo(()=>I5(g,l),[g,l]),y=Y5(g);return j.createElement(j.Fragment,null,v.map(S=>j.createElement("link",{key:S,rel:"prefetch",as:"fetch",href:S,...s})),b.map(S=>j.createElement("link",{key:S,rel:"modulepreload",href:S,...s})),y.map(({key:S,link:N})=>j.createElement("link",{key:S,nonce:s.nonce,...N})))}function H5(...e){return n=>{e.forEach(s=>{typeof s=="function"?s(n):s!=null&&(s.current=n)})}}var pm=typeof window<"u"&&typeof window.document<"u"&&typeof window.document.createElement<"u";try{pm&&(window.__reactRouterVersion="7.9.5")}catch{}function G5({basename:e,children:n,window:s}){let a=j.useRef();a.current==null&&(a.current=D2({window:s,v5Compat:!0}));let l=a.current,[c,u]=j.useState({action:l.action,location:l.location}),f=j.useCallback(p=>{j.startTransition(()=>u(p))},[u]);return j.useLayoutEffect(()=>l.listen(f),[l,f]),j.createElement(j5,{basename:e,children:n,location:c.location,navigationType:c.action,navigator:l})}var fm=/^(?:[a-z][a-z0-9+.-]*:|\/\/)/i,fe=j.forwardRef(function({onClick:n,discover:s="render",prefetch:a="none",relative:l,reloadDocument:c,replace:u,state:f,target:p,to:m,preventScrollReset:g,viewTransition:v,...b},y){let{basename:S}=j.useContext(on),N=typeof m=="string"&&fm.test(m),T,L=!1;if(typeof m=="string"&&N&&(T=m,pm))try{let H=new URL(window.location.href),Y=m.startsWith("//")?new URL(H.protocol+m):new URL(m),X=jn(Y.pathname,S);Y.origin===H.origin&&X!=null?m=X+Y.search+Y.hash:L=!0}catch{qt(!1,`<Link to="${m}"> contains an invalid URL which will probably break when clicked - please update to a valid URL path.`)}let E=o5(m,{relative:l}),[P,B,M]=W5(a,b),F=Q5(m,{replace:u,state:f,target:p,preventScrollReset:g,relative:l,viewTransition:v});function _(H){n&&n(H),H.defaultPrevented||F(H)}let D=j.createElement("a",{...b,...M,href:T||E,onClick:L||c?n:_,ref:H5(y,B),target:p,"data-discover":!N&&s==="render"?"true":void 0});return P&&!N?j.createElement(j.Fragment,null,D,j.createElement(U5,{page:E})):D});fe.displayName="Link";var q5=j.forwardRef(function({"aria-current":n="page",caseSensitive:s=!1,className:a="",end:l=!1,style:c,to:u,viewTransition:f,children:p,...m},g){let v=bs(u,{relative:m.relative}),b=Cn(),y=j.useContext(co),{navigator:S,basename:N}=j.useContext(on),T=y!=null&&iv(v)&&f===!0,L=S.encodeLocation?S.encodeLocation(v).pathname:v.pathname,E=b.pathname,P=y&&y.navigation&&y.navigation.location?y.navigation.location.pathname:null;s||(E=E.toLowerCase(),P=P?P.toLowerCase():null,L=L.toLowerCase()),P&&N&&(P=jn(P,N)||P);const B=L!=="/"&&L.endsWith("/")?L.length-1:L.length;let M=E===L||!l&&E.startsWith(L)&&E.charAt(B)==="/",F=P!=null&&(P===L||!l&&P.startsWith(L)&&P.charAt(L.length)==="/"),_={isActive:M,isPending:F,isTransitioning:T},D=M?n:void 0,H;typeof a=="function"?H=a(_):H=[a,M?"active":null,F?"pending":null,T?"transitioning":null].filter(Boolean).join(" ");let Y=typeof c=="function"?c(_):c;return j.createElement(fe,{...m,"aria-current":D,className:H,ref:g,style:Y,to:u,viewTransition:f},typeof p=="function"?p(_):p)});q5.displayName="NavLink";var X5=j.forwardRef(({discover:e="render",fetcherKey:n,navigate:s,reloadDocument:a,replace:l,state:c,method:u=Wa,action:f,onSubmit:p,relative:m,preventScrollReset:g,viewTransition:v,...b},y)=>{let S=tv(),N=nv(f,{relative:m}),T=u.toLowerCase()==="get"?"get":"post",L=typeof f=="string"&&fm.test(f),E=P=>{if(p&&p(P),P.defaultPrevented)return;P.preventDefault();let B=P.nativeEvent.submitter,M=B?.getAttribute("formmethod")||u;S(B||P.currentTarget,{fetcherKey:n,method:M,navigate:s,replace:l,state:c,relative:m,preventScrollReset:g,viewTransition:v})};return j.createElement("form",{ref:y,method:T,action:N,onSubmit:a?p:E,...b,"data-discover":!L&&e==="render"?"true":void 0})});X5.displayName="Form";function K5(e){return`${e} must be used within a data router.  See https://reactrouter.com/en/main/routers/picking-a-router.`}function hm(e){let n=j.useContext(ar);return Re(n,K5(e)),n}function Q5(e,{target:n,replace:s,state:a,preventScrollReset:l,relative:c,viewTransition:u}={}){let f=uo(),p=Cn(),m=bs(e,{relative:c});return j.useCallback(g=>{if(z5(g,n)){g.preventDefault();let v=s!==void 0?s:os(p)===os(m);f(e,{replace:v,state:a,preventScrollReset:l,relative:c,viewTransition:u})}},[p,f,m,s,a,n,e,l,c,u])}function Z5(e){qt(typeof URLSearchParams<"u","You cannot use the `useSearchParams` hook in a browser that does not support the URLSearchParams API. If you need to support Internet Explorer 11, we recommend you load a polyfill such as https://github.com/ungap/url-search-params.");let n=j.useRef(Yc(e)),s=j.useRef(!1),a=Cn(),l=j.useMemo(()=>E5(a.search,s.current?null:n.current),[a.search]),c=uo(),u=j.useCallback((f,p)=>{const m=Yc(typeof f=="function"?f(new URLSearchParams(l)):f);s.current=!0,c("?"+m,p)},[c,l]);return[l,u]}var J5=0,ev=()=>`__${String(++J5)}__`;function tv(){let{router:e}=hm("useSubmit"),{basename:n}=j.useContext(on),s=v5();return j.useCallback(async(a,l={})=>{let{action:c,method:u,encType:f,formData:p,body:m}=A5(a,n);if(l.navigate===!1){let g=l.fetcherKey||ev();await e.fetch(g,s,l.action||c,{preventScrollReset:l.preventScrollReset,formData:p,body:m,formMethod:l.method||u,formEncType:l.encType||f,flushSync:l.flushSync})}else await e.navigate(l.action||c,{preventScrollReset:l.preventScrollReset,formData:p,body:m,formMethod:l.method||u,formEncType:l.encType||f,replace:l.replace,state:l.state,fromRouteId:s,flushSync:l.flushSync,viewTransition:l.viewTransition})},[e,n,s])}function nv(e,{relative:n}={}){let{basename:s}=j.useContext(on),a=j.useContext(Nn);Re(a,"useFormAction must be used inside a RouteContext");let[l]=a.matches.slice(-1),c={...bs(e||".",{relative:n})},u=Cn();if(e==null){c.search=u.search;let f=new URLSearchParams(c.search),p=f.getAll("index");if(p.some(g=>g==="")){f.delete("index"),p.filter(v=>v).forEach(v=>f.append("index",v));let g=f.toString();c.search=g?`?${g}`:""}}return(!e||e===".")&&l.route.index&&(c.search=c.search?c.search.replace(/^\?/,"?index&"):"?index"),s!=="/"&&(c.pathname=c.pathname==="/"?s:bn([s,c.pathname])),os(c)}function iv(e,{relative:n}={}){let s=j.useContext(sm);Re(s!=null,"`useViewTransitionState` must be used within `react-router-dom`'s `RouterProvider`.  Did you accidentally import `RouterProvider` from `react-router`?");let{basename:a}=hm("useViewTransitionState"),l=bs(e,{relative:n});if(!s.isTransitioning)return!1;let c=jn(s.currentLocation.pathname,a)||s.currentLocation.pathname,u=jn(s.nextLocation.pathname,a)||s.nextLocation.pathname;return Xa(l.pathname,u)!=null||Xa(l.pathname,c)!=null}var mm={color:void 0,size:void 0,className:void 0,style:void 0,attr:void 0},kf=Ce.createContext&&Ce.createContext(mm),rv=["attr","size","title"];function sv(e,n){if(e==null)return{};var s=av(e,n),a,l;if(Object.getOwnPropertySymbols){var c=Object.getOwnPropertySymbols(e);for(l=0;l<c.length;l++)a=c[l],!(n.indexOf(a)>=0)&&Object.prototype.propertyIsEnumerable.call(e,a)&&(s[a]=e[a])}return s}function av(e,n){if(e==null)return{};var s={};for(var a in e)if(Object.prototype.hasOwnProperty.call(e,a)){if(n.indexOf(a)>=0)continue;s[a]=e[a]}return s}function Ka(){return Ka=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var s=arguments[n];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e},Ka.apply(this,arguments)}function Sf(e,n){var s=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);n&&(a=a.filter(function(l){return Object.getOwnPropertyDescriptor(e,l).enumerable})),s.push.apply(s,a)}return s}function Qa(e){for(var n=1;n<arguments.length;n++){var s=arguments[n]!=null?arguments[n]:{};n%2?Sf(Object(s),!0).forEach(function(a){ov(e,a,s[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(s)):Sf(Object(s)).forEach(function(a){Object.defineProperty(e,a,Object.getOwnPropertyDescriptor(s,a))})}return e}function ov(e,n,s){return n=lv(n),n in e?Object.defineProperty(e,n,{value:s,enumerable:!0,configurable:!0,writable:!0}):e[n]=s,e}function lv(e){var n=cv(e,"string");return typeof n=="symbol"?n:n+""}function cv(e,n){if(typeof e!="object"||!e)return e;var s=e[Symbol.toPrimitive];if(s!==void 0){var a=s.call(e,n);if(typeof a!="object")return a;throw new TypeError("@@toPrimitive must return a primitive value.")}return(n==="string"?String:Number)(e)}function gm(e){return e&&e.map((n,s)=>Ce.createElement(n.tag,Qa({key:s},n.attr),gm(n.child)))}function K(e){return n=>Ce.createElement(dv,Ka({attr:Qa({},e.attr)},n),gm(e.child))}function dv(e){var n=s=>{var{attr:a,size:l,title:c}=e,u=sv(e,rv),f=l||s.size||"1em",p;return s.className&&(p=s.className),e.className&&(p=(p?p+" ":"")+e.className),Ce.createElement("svg",Ka({stroke:"currentColor",fill:"currentColor",strokeWidth:"0"},s.attr,a,u,{className:p,style:Qa(Qa({color:e.color||s.color},s.style),e.style),height:f,width:f,xmlns:"http://www.w3.org/2000/svg"}),c&&Ce.createElement("title",null,c),e.children)};return kf!==void 0?Ce.createElement(kf.Consumer,null,s=>n(s)):n(mm)}function ls(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"22 12 18 12 15 21 9 3 6 12 2 12"},child:[]}]})(e)}function xm(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"19",y1:"12",x2:"5",y2:"12"},child:[]},{tag:"polyline",attr:{points:"12 19 5 12 12 5"},child:[]}]})(e)}function De(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"5",y1:"12",x2:"19",y2:"12"},child:[]},{tag:"polyline",attr:{points:"12 5 19 12 12 19"},child:[]}]})(e)}function Gt(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"8",r:"7"},child:[]},{tag:"polyline",attr:{points:"8.21 13.89 7 23 12 20 17 23 15.79 13.88"},child:[]}]})(e)}function Za(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"18",y1:"20",x2:"18",y2:"10"},child:[]},{tag:"line",attr:{x1:"12",y1:"20",x2:"12",y2:"4"},child:[]},{tag:"line",attr:{x1:"6",y1:"20",x2:"6",y2:"14"},child:[]}]})(e)}function Nf(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M4 19.5A2.5 2.5 0 0 1 6.5 17H20"},child:[]},{tag:"path",attr:{d:"M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"},child:[]}]})(e)}function Sd(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"},child:[]},{tag:"polyline",attr:{points:"3.27 6.96 12 12.01 20.73 6.96"},child:[]},{tag:"line",attr:{x1:"12",y1:"22.08",x2:"12",y2:"12"},child:[]}]})(e)}function it(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M22 11.08V12a10 10 0 1 1-5.93-9.14"},child:[]},{tag:"polyline",attr:{points:"22 4 12 14.01 9 11.01"},child:[]}]})(e)}function uv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"20 6 9 17 4 12"},child:[]}]})(e)}function pi(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"6 9 12 15 18 9"},child:[]}]})(e)}function pv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"9 18 15 12 9 6"},child:[]}]})(e)}function yn(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"polyline",attr:{points:"12 6 12 12 16 14"},child:[]}]})(e)}function Gn(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M18 10h-1.26A8 8 0 1 0 9 20h9a5 5 0 0 0 0-10z"},child:[]}]})(e)}function wn(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"16 18 22 12 16 6"},child:[]},{tag:"polyline",attr:{points:"8 6 2 12 8 18"},child:[]}]})(e)}function tr(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"4",y:"4",width:"16",height:"16",rx:"2",ry:"2"},child:[]},{tag:"rect",attr:{x:"9",y:"9",width:"6",height:"6"},child:[]},{tag:"line",attr:{x1:"9",y1:"1",x2:"9",y2:"4"},child:[]},{tag:"line",attr:{x1:"15",y1:"1",x2:"15",y2:"4"},child:[]},{tag:"line",attr:{x1:"9",y1:"20",x2:"9",y2:"23"},child:[]},{tag:"line",attr:{x1:"15",y1:"20",x2:"15",y2:"23"},child:[]},{tag:"line",attr:{x1:"20",y1:"9",x2:"23",y2:"9"},child:[]},{tag:"line",attr:{x1:"20",y1:"14",x2:"23",y2:"14"},child:[]},{tag:"line",attr:{x1:"1",y1:"9",x2:"4",y2:"9"},child:[]},{tag:"line",attr:{x1:"1",y1:"14",x2:"4",y2:"14"},child:[]}]})(e)}function Zi(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"ellipse",attr:{cx:"12",cy:"5",rx:"9",ry:"3"},child:[]},{tag:"path",attr:{d:"M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"},child:[]},{tag:"path",attr:{d:"M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"},child:[]}]})(e)}function Jr(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"12",y1:"1",x2:"12",y2:"23"},child:[]},{tag:"path",attr:{d:"M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"},child:[]}]})(e)}function fv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"8 17 12 21 16 17"},child:[]},{tag:"line",attr:{x1:"12",y1:"12",x2:"12",y2:"21"},child:[]},{tag:"path",attr:{d:"M20.88 18.09A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.29"},child:[]}]})(e)}function hv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"},child:[]},{tag:"polyline",attr:{points:"7 10 12 15 17 10"},child:[]},{tag:"line",attr:{x1:"12",y1:"15",x2:"12",y2:"3"},child:[]}]})(e)}function Nd(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"},child:[]},{tag:"polyline",attr:{points:"15 3 21 3 21 9"},child:[]},{tag:"line",attr:{x1:"10",y1:"14",x2:"21",y2:"3"},child:[]}]})(e)}function es(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"},child:[]},{tag:"circle",attr:{cx:"12",cy:"12",r:"3"},child:[]}]})(e)}function mv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"6",y1:"3",x2:"6",y2:"15"},child:[]},{tag:"circle",attr:{cx:"18",cy:"6",r:"3"},child:[]},{tag:"circle",attr:{cx:"6",cy:"18",r:"3"},child:[]},{tag:"path",attr:{d:"M18 9a9 9 0 0 1-9 9"},child:[]}]})(e)}function Cd(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"},child:[]}]})(e)}function an(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"line",attr:{x1:"2",y1:"12",x2:"22",y2:"12"},child:[]},{tag:"path",attr:{d:"M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"},child:[]}]})(e)}function gv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M3 18v-6a9 9 0 0 1 18 0v6"},child:[]},{tag:"path",attr:{d:"M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z"},child:[]}]})(e)}function fo(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"},child:[]}]})(e)}function xv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"path",attr:{d:"M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"},child:[]},{tag:"line",attr:{x1:"12",y1:"17",x2:"12.01",y2:"17"},child:[]}]})(e)}function vv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"2",y:"2",width:"20",height:"20",rx:"5",ry:"5"},child:[]},{tag:"path",attr:{d:"M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"},child:[]},{tag:"line",attr:{x1:"17.5",y1:"6.5",x2:"17.51",y2:"6.5"},child:[]}]})(e)}function Rt(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"12 2 2 7 12 12 22 7 12 2"},child:[]},{tag:"polyline",attr:{points:"2 17 12 22 22 17"},child:[]},{tag:"polyline",attr:{points:"2 12 12 17 22 12"},child:[]}]})(e)}function $c(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"3",width:"18",height:"18",rx:"2",ry:"2"},child:[]},{tag:"line",attr:{x1:"3",y1:"9",x2:"21",y2:"9"},child:[]},{tag:"line",attr:{x1:"9",y1:"21",x2:"9",y2:"9"},child:[]}]})(e)}function vm(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"},child:[]},{tag:"rect",attr:{x:"2",y:"9",width:"4",height:"12"},child:[]},{tag:"circle",attr:{cx:"4",cy:"4",r:"2"},child:[]}]})(e)}function cs(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"3",y:"11",width:"18",height:"11",rx:"2",ry:"2"},child:[]},{tag:"path",attr:{d:"M7 11V7a5 5 0 0 1 10 0v4"},child:[]}]})(e)}function en(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"},child:[]},{tag:"polyline",attr:{points:"22,6 12,13 2,6"},child:[]}]})(e)}function Hc(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"},child:[]},{tag:"circle",attr:{cx:"12",cy:"10",r:"3"},child:[]}]})(e)}function bv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"3",y1:"12",x2:"21",y2:"12"},child:[]},{tag:"line",attr:{x1:"3",y1:"6",x2:"21",y2:"6"},child:[]},{tag:"line",attr:{x1:"3",y1:"18",x2:"21",y2:"18"},child:[]}]})(e)}function yv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"},child:[]}]})(e)}function hi(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"},child:[]}]})(e)}function nr(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"2",y:"3",width:"20",height:"14",rx:"2",ry:"2"},child:[]},{tag:"line",attr:{x1:"8",y1:"21",x2:"16",y2:"21"},child:[]},{tag:"line",attr:{x1:"12",y1:"17",x2:"12",y2:"21"},child:[]}]})(e)}function wv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"16.5",y1:"9.4",x2:"7.5",y2:"4.21"},child:[]},{tag:"path",attr:{d:"M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"},child:[]},{tag:"polyline",attr:{points:"3.27 6.96 12 12.01 20.73 6.96"},child:[]},{tag:"line",attr:{x1:"12",y1:"22.08",x2:"12",y2:"12"},child:[]}]})(e)}function bi(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"},child:[]}]})(e)}function ho(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"23 4 23 10 17 10"},child:[]},{tag:"polyline",attr:{points:"1 20 1 14 7 14"},child:[]},{tag:"path",attr:{d:"M3.51 9a9 9 0 0 1 14.85-3.36L23 10M1 14l4.64 4.36A9 9 0 0 0 20.49 15"},child:[]}]})(e)}function jv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"22",y1:"2",x2:"11",y2:"13"},child:[]},{tag:"polygon",attr:{points:"22 2 15 22 11 13 2 9 22 2"},child:[]}]})(e)}function yi(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"2",y:"2",width:"20",height:"8",rx:"2",ry:"2"},child:[]},{tag:"rect",attr:{x:"2",y:"14",width:"20",height:"8",rx:"2",ry:"2"},child:[]},{tag:"line",attr:{x1:"6",y1:"6",x2:"6.01",y2:"6"},child:[]},{tag:"line",attr:{x1:"6",y1:"18",x2:"6.01",y2:"18"},child:[]}]})(e)}function Ja(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"3"},child:[]},{tag:"path",attr:{d:"M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"},child:[]}]})(e)}function lt(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"},child:[]}]})(e)}function Cf(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"9",cy:"21",r:"1"},child:[]},{tag:"circle",attr:{cx:"20",cy:"21",r:"1"},child:[]},{tag:"path",attr:{d:"M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"},child:[]}]})(e)}function tn(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"rect",attr:{x:"5",y:"2",width:"14",height:"20",rx:"2",ry:"2"},child:[]},{tag:"line",attr:{x1:"12",y1:"18",x2:"12.01",y2:"18"},child:[]}]})(e)}function eo(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"},child:[]}]})(e)}function xn(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"circle",attr:{cx:"12",cy:"12",r:"10"},child:[]},{tag:"circle",attr:{cx:"12",cy:"12",r:"6"},child:[]},{tag:"circle",attr:{cx:"12",cy:"12",r:"2"},child:[]}]})(e)}function Ke(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"23 6 13.5 15.5 8.5 10.5 1 18"},child:[]},{tag:"polyline",attr:{points:"17 6 23 6 23 12"},child:[]}]})(e)}function bm(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"},child:[]}]})(e)}function Tf(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polyline",attr:{points:"16 16 12 12 8 16"},child:[]},{tag:"line",attr:{x1:"12",y1:"12",x2:"12",y2:"21"},child:[]},{tag:"path",attr:{d:"M20.39 18.39A5 5 0 0 0 18 9h-1.26A8 8 0 1 0 3 16.3"},child:[]},{tag:"polyline",attr:{points:"16 16 12 12 8 16"},child:[]}]})(e)}function kv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"12",cy:"7",r:"4"},child:[]}]})(e)}function Xe(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"},child:[]},{tag:"circle",attr:{cx:"9",cy:"7",r:"4"},child:[]},{tag:"path",attr:{d:"M23 21v-2a4 4 0 0 0-3-3.87"},child:[]},{tag:"path",attr:{d:"M16 3.13a4 4 0 0 1 0 7.75"},child:[]}]})(e)}function Sv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"path",attr:{d:"M5 12.55a11 11 0 0 1 14.08 0"},child:[]},{tag:"path",attr:{d:"M1.42 9a16 16 0 0 1 21.16 0"},child:[]},{tag:"path",attr:{d:"M8.53 16.11a6 6 0 0 1 6.95 0"},child:[]},{tag:"line",attr:{x1:"12",y1:"20",x2:"12.01",y2:"20"},child:[]}]})(e)}function Nv(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"line",attr:{x1:"18",y1:"6",x2:"6",y2:"18"},child:[]},{tag:"line",attr:{x1:"6",y1:"6",x2:"18",y2:"18"},child:[]}]})(e)}function _e(e){return K({attr:{viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:"2",strokeLinecap:"round",strokeLinejoin:"round"},child:[{tag:"polygon",attr:{points:"13 2 3 14 12 14 11 22 21 10 12 10 13 2"},child:[]}]})(e)}const Td=()=>{const[e,n]=j.useState(!1),[s,a]=j.useState(!1),[l,c]=j.useState(!1),[u,f]=j.useState(!1),[p,m]=j.useState(!1),[g,v]=j.useState(!1),[b,y]=j.useState(!1),S=()=>{f(!u),u&&(m(!1),v(!1),y(!1))},N=()=>{f(!1),m(!1),v(!1),y(!1)};return i.jsxs("header",{className:"vp-nav",children:[i.jsx("div",{className:"vp-nav-inner",children:i.jsxs("div",{className:"vp-brand",children:[i.jsxs("div",{className:"vp-brand-left",children:[i.jsx("img",{src:"/src/assets/verapixels_logo_icon.jpg",alt:"Verapixel"}),i.jsx("span",{className:"vp-name",children:"Verapixels"})]}),i.jsxs("nav",{className:"vp-links",children:[i.jsx(fe,{to:"/",children:"Home"}),i.jsxs("div",{className:"vp-dropdown-wrapper",onMouseEnter:()=>n(!0),onMouseLeave:()=>n(!1),children:[i.jsxs("span",{className:"vp-dropdown-trigger",children:["About ",i.jsx(pi,{className:"dropdown-icon"})]}),e&&i.jsxs("div",{className:"vp-dropdown-menu",children:[i.jsx(fe,{to:"/aboutverapixels",className:"vp-dropdown-item",children:"About Verapixels"}),i.jsx(fe,{to:"/ourcoreteam",className:"vp-dropdown-item",children:"Our Core Team"}),i.jsx(fe,{to:"/howweworkandfunction",className:"vp-dropdown-item",children:"How We Work and Function"})]})]}),i.jsxs("div",{className:"vp-dropdown-wrapper",onMouseEnter:()=>a(!0),onMouseLeave:()=>a(!1),children:[i.jsxs("span",{className:"vp-dropdown-trigger",children:["Services ",i.jsx(pi,{className:"dropdown-icon"})]}),s&&i.jsxs("div",{className:"vp-dropdown-menu",children:[i.jsx(fe,{to:"/webdevelopment",className:"vp-dropdown-item",children:"Web Development"}),i.jsx(fe,{to:"/mobileappdevelopment",className:"vp-dropdown-item",children:"Mobile App Development"}),i.jsx(fe,{to:"/uiuxdesign",className:"vp-dropdown-item",children:"UI/UX Design"}),i.jsx(fe,{to:"/graphicdesign",className:"vp-dropdown-item",children:"Graphic Design"}),i.jsx(fe,{to:"/cybersecurity",className:"vp-dropdown-item",children:"Cybersecurity"}),i.jsx(fe,{to:"/digitalmarketing",className:"vp-dropdown-item",children:"Digital Marketing"})]})]}),i.jsxs("div",{className:"vp-dropdown-wrapper",onMouseEnter:()=>c(!0),onMouseLeave:()=>c(!1),children:[i.jsxs("span",{className:"vp-dropdown-trigger",children:["Portfolio ",i.jsx(pi,{className:"dropdown-icon"})]}),l&&i.jsxs("div",{className:"vp-dropdown-menu",children:[i.jsx(fe,{to:"/allprojects",className:"vp-dropdown-item",children:"All Projects"}),i.jsx(fe,{to:"/casestudies",className:"vp-dropdown-item",children:"Case Studies"})]})]}),i.jsx(fe,{to:"/career",children:"Career"})]}),i.jsxs("button",{className:"vp-mobile-menu-btn",onClick:S,children:[i.jsx(bv,{className:"menu-icon"}),i.jsx("span",{className:"menu-text",children:"Menu"})]}),i.jsx("div",{className:"vp-phone",children:i.jsxs(fe,{to:"/contact",className:"vp-phone-btn",children:[i.jsx(bi,{className:"phone-icon"}),i.jsx("span",{className:"phone-text",children:"Contact Us"})]})})]})}),i.jsx("div",{className:"vp-nav-underline"}),u&&i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"vp-mobile-overlay",onClick:N}),i.jsxs("div",{className:"vp-mobile-menu",children:[i.jsxs("div",{className:"vp-mobile-header",children:[i.jsx("span",{className:"vp-mobile-title",children:"Navigation"}),i.jsx("button",{className:"vp-mobile-close",onClick:N,children:i.jsx(Nv,{})})]}),i.jsxs("nav",{className:"vp-mobile-nav",children:[i.jsx(fe,{to:"/",className:"vp-mobile-link",onClick:N,children:"Home"}),i.jsxs("div",{className:"vp-mobile-accordion",children:[i.jsxs("button",{className:"vp-mobile-link vp-accordion-trigger",onClick:()=>m(!p),children:["About",i.jsx(pi,{className:`accordion-icon ${p?"open":""}`})]}),p&&i.jsxs("div",{className:"vp-mobile-submenu",children:[i.jsx(fe,{to:"/aboutverapixels",className:"vp-mobile-sublink",onClick:N,children:"About Verapixels"}),i.jsx(fe,{to:"/ourcoreteam",className:"vp-mobile-sublink",onClick:N,children:"Our Core Team"}),i.jsx(fe,{to:"/howweworkandfunction",className:"vp-mobile-sublink",onClick:N,children:"How We Work and Function"})]})]}),i.jsxs("div",{className:"vp-mobile-accordion",children:[i.jsxs("button",{className:"vp-mobile-link vp-accordion-trigger",onClick:()=>v(!g),children:["Services",i.jsx(pi,{className:`accordion-icon ${g?"open":""}`})]}),g&&i.jsxs("div",{className:"vp-mobile-submenu",children:[i.jsx(fe,{to:"/webdevelopment",className:"vp-mobile-sublink",onClick:N,children:"Web Development"}),i.jsx(fe,{to:"/mobileappdevelopment",className:"vp-mobile-sublink",onClick:N,children:"Mobile App Development"}),i.jsx(fe,{to:"/uiuxdesign",className:"vp-mobile-sublink",onClick:N,children:"UI/UX Design"}),i.jsx(fe,{to:"/graphicdesign",className:"vp-mobile-sublink",onClick:N,children:"Graphic Design"}),i.jsx(fe,{to:"/cybersecurity",className:"vp-mobile-sublink",onClick:N,children:"Cybersecurity"}),i.jsx(fe,{to:"/digitalmarketing",className:"vp-mobile-sublink",onClick:N,children:"Digital Marketing"})]})]}),i.jsxs("div",{className:"vp-mobile-accordion",children:[i.jsxs("button",{className:"vp-mobile-link vp-accordion-trigger",onClick:()=>y(!b),children:["Portfolio",i.jsx(pi,{className:`accordion-icon ${b?"open":""}`})]}),b&&i.jsxs("div",{className:"vp-mobile-submenu",children:[i.jsx(fe,{to:"/allprojects",className:"vp-mobile-sublink",onClick:N,children:"All Projects"}),i.jsx(fe,{to:"/casestudies",className:"vp-mobile-sublink",onClick:N,children:"Case Studies"})]})]}),i.jsx(fe,{to:"/career",className:"vp-mobile-link",onClick:N,children:"Career"}),i.jsxs(fe,{to:"/contact",className:"vp-mobile-cta",onClick:N,children:[i.jsx(bi,{})," Contact Us"]})]})]})]})]})},Cv=()=>{const{pathname:e}=Cn();return j.useEffect(()=>{window.scrollTo(0,0)},[e]),null};function zf(e){return e!==null&&typeof e=="object"&&"constructor"in e&&e.constructor===Object}function zd(e={},n={}){const s=["__proto__","constructor","prototype"];Object.keys(n).filter(a=>s.indexOf(a)<0).forEach(a=>{typeof e[a]>"u"?e[a]=n[a]:zf(n[a])&&zf(e[a])&&Object.keys(n[a]).length>0&&zd(e[a],n[a])})}const ym={body:{},addEventListener(){},removeEventListener(){},activeElement:{blur(){},nodeName:""},querySelector(){return null},querySelectorAll(){return[]},getElementById(){return null},createEvent(){return{initEvent(){}}},createElement(){return{children:[],childNodes:[],style:{},setAttribute(){},getElementsByTagName(){return[]}}},createElementNS(){return{}},importNode(){return null},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""}};function nn(){const e=typeof document<"u"?document:{};return zd(e,ym),e}const Tv={document:ym,navigator:{userAgent:""},location:{hash:"",host:"",hostname:"",href:"",origin:"",pathname:"",protocol:"",search:""},history:{replaceState(){},pushState(){},go(){},back(){}},CustomEvent:function(){return this},addEventListener(){},removeEventListener(){},getComputedStyle(){return{getPropertyValue(){return""}}},Image(){},Date(){},screen:{},setTimeout(){},clearTimeout(){},matchMedia(){return{}},requestAnimationFrame(e){return typeof setTimeout>"u"?(e(),null):setTimeout(e,0)},cancelAnimationFrame(e){typeof setTimeout>"u"||clearTimeout(e)}};function ft(){const e=typeof window<"u"?window:{};return zd(e,Tv),e}function zv(e=""){return e.trim().split(" ").filter(n=>!!n.trim())}function Ev(e){const n=e;Object.keys(n).forEach(s=>{try{n[s]=null}catch{}try{delete n[s]}catch{}})}function wm(e,n=0){return setTimeout(e,n)}function to(){return Date.now()}function Pv(e){const n=ft();let s;return n.getComputedStyle&&(s=n.getComputedStyle(e,null)),!s&&e.currentStyle&&(s=e.currentStyle),s||(s=e.style),s}function Mv(e,n="x"){const s=ft();let a,l,c;const u=Pv(e);return s.WebKitCSSMatrix?(l=u.transform||u.webkitTransform,l.split(",").length>6&&(l=l.split(", ").map(f=>f.replace(",",".")).join(", ")),c=new s.WebKitCSSMatrix(l==="none"?"":l)):(c=u.MozTransform||u.OTransform||u.MsTransform||u.msTransform||u.transform||u.getPropertyValue("transform").replace("translate(","matrix(1, 0, 0, 1,"),a=c.toString().split(",")),n==="x"&&(s.WebKitCSSMatrix?l=c.m41:a.length===16?l=parseFloat(a[12]):l=parseFloat(a[4])),n==="y"&&(s.WebKitCSSMatrix?l=c.m42:a.length===16?l=parseFloat(a[13]):l=parseFloat(a[5])),l||0}function Ra(e){return typeof e=="object"&&e!==null&&e.constructor&&Object.prototype.toString.call(e).slice(8,-1)==="Object"}function Av(e){return typeof window<"u"&&typeof window.HTMLElement<"u"?e instanceof HTMLElement:e&&(e.nodeType===1||e.nodeType===11)}function Ct(...e){const n=Object(e[0]),s=["__proto__","constructor","prototype"];for(let a=1;a<e.length;a+=1){const l=e[a];if(l!=null&&!Av(l)){const c=Object.keys(Object(l)).filter(u=>s.indexOf(u)<0);for(let u=0,f=c.length;u<f;u+=1){const p=c[u],m=Object.getOwnPropertyDescriptor(l,p);m!==void 0&&m.enumerable&&(Ra(n[p])&&Ra(l[p])?l[p].__swiper__?n[p]=l[p]:Ct(n[p],l[p]):!Ra(n[p])&&Ra(l[p])?(n[p]={},l[p].__swiper__?n[p]=l[p]:Ct(n[p],l[p])):n[p]=l[p])}}}return n}function Ia(e,n,s){e.style.setProperty(n,s)}function jm({swiper:e,targetPosition:n,side:s}){const a=ft(),l=-e.translate;let c=null,u;const f=e.params.speed;e.wrapperEl.style.scrollSnapType="none",a.cancelAnimationFrame(e.cssModeFrameID);const p=n>l?"next":"prev",m=(v,b)=>p==="next"&&v>=b||p==="prev"&&v<=b,g=()=>{u=new Date().getTime(),c===null&&(c=u);const v=Math.max(Math.min((u-c)/f,1),0),b=.5-Math.cos(v*Math.PI)/2;let y=l+b*(n-l);if(m(y,n)&&(y=n),e.wrapperEl.scrollTo({[s]:y}),m(y,n)){e.wrapperEl.style.overflow="hidden",e.wrapperEl.style.scrollSnapType="",setTimeout(()=>{e.wrapperEl.style.overflow="",e.wrapperEl.scrollTo({[s]:y})}),a.cancelAnimationFrame(e.cssModeFrameID);return}e.cssModeFrameID=a.requestAnimationFrame(g)};g()}function km(e){return e.querySelector(".swiper-slide-transform")||e.shadowRoot&&e.shadowRoot.querySelector(".swiper-slide-transform")||e}function vn(e,n=""){const s=ft(),a=[...e.children];return s.HTMLSlotElement&&e instanceof HTMLSlotElement&&a.push(...e.assignedElements()),n?a.filter(l=>l.matches(n)):a}function Lv(e,n){const s=[n];for(;s.length>0;){const a=s.shift();if(e===a)return!0;s.push(...a.children,...a.shadowRoot?a.shadowRoot.children:[],...a.assignedElements?a.assignedElements():[])}}function Dv(e,n){const s=ft();let a=n.contains(e);return!a&&s.HTMLSlotElement&&n instanceof HTMLSlotElement&&(a=[...n.assignedElements()].includes(e),a||(a=Lv(e,n))),a}function no(e){try{console.warn(e);return}catch{}}function Gc(e,n=[]){const s=document.createElement(e);return s.classList.add(...Array.isArray(n)?n:zv(n)),s}function Fv(e,n){const s=[];for(;e.previousElementSibling;){const a=e.previousElementSibling;n?a.matches(n)&&s.push(a):s.push(a),e=a}return s}function Rv(e,n){const s=[];for(;e.nextElementSibling;){const a=e.nextElementSibling;n?a.matches(n)&&s.push(a):s.push(a),e=a}return s}function qn(e,n){return ft().getComputedStyle(e,null).getPropertyValue(n)}function Ef(e){let n=e,s;if(n){for(s=0;(n=n.previousSibling)!==null;)n.nodeType===1&&(s+=1);return s}}function Iv(e,n){const s=[];let a=e.parentElement;for(;a;)s.push(a),a=a.parentElement;return s}function Ov(e,n){function s(a){a.target===e&&(n.call(e,a),e.removeEventListener("transitionend",s))}n&&e.addEventListener("transitionend",s)}function Pf(e,n,s){const a=ft();return e[n==="width"?"offsetWidth":"offsetHeight"]+parseFloat(a.getComputedStyle(e,null).getPropertyValue(n==="width"?"margin-right":"margin-top"))+parseFloat(a.getComputedStyle(e,null).getPropertyValue(n==="width"?"margin-left":"margin-bottom"))}function Mf(e,n=""){typeof trustedTypes<"u"?e.innerHTML=trustedTypes.createPolicy("html",{createHTML:s=>s}).createHTML(n):e.innerHTML=n}let bc;function Vv(){const e=ft(),n=nn();return{smoothScroll:n.documentElement&&n.documentElement.style&&"scrollBehavior"in n.documentElement.style,touch:!!("ontouchstart"in e||e.DocumentTouch&&n instanceof e.DocumentTouch)}}function Sm(){return bc||(bc=Vv()),bc}let yc;function Bv({userAgent:e}={}){const n=Sm(),s=ft(),a=s.navigator.platform,l=e||s.navigator.userAgent,c={ios:!1,android:!1},u=s.screen.width,f=s.screen.height,p=l.match(/(Android);?[\s\/]+([\d.]+)?/);let m=l.match(/(iPad)(?!\1).*OS\s([\d_]+)/);const g=l.match(/(iPod)(.*OS\s([\d_]+))?/),v=!m&&l.match(/(iPhone\sOS|iOS)\s([\d_]+)/),b=a==="Win32";let y=a==="MacIntel";const S=["1024x1366","1366x1024","834x1194","1194x834","834x1112","1112x834","768x1024","1024x768","820x1180","1180x820","810x1080","1080x810"];return!m&&y&&n.touch&&S.indexOf(`${u}x${f}`)>=0&&(m=l.match(/(Version)\/([\d.]+)/),m||(m=[0,1,"13_0_0"]),y=!1),p&&!b&&(c.os="android",c.android=!0),(m||v||g)&&(c.os="ios",c.ios=!0),c}function Nm(e={}){return yc||(yc=Bv(e)),yc}let wc;function _v(){const e=ft(),n=Nm();let s=!1;function a(){const f=e.navigator.userAgent.toLowerCase();return f.indexOf("safari")>=0&&f.indexOf("chrome")<0&&f.indexOf("android")<0}if(a()){const f=String(e.navigator.userAgent);if(f.includes("Version/")){const[p,m]=f.split("Version/")[1].split(" ")[0].split(".").map(g=>Number(g));s=p<16||p===16&&m<2}}const l=/(iPhone|iPod|iPad).*AppleWebKit(?!.*Safari)/i.test(e.navigator.userAgent),c=a(),u=c||l&&n.ios;return{isSafari:s||c,needPerspectiveFix:s,need3dFix:u,isWebView:l}}function Cm(){return wc||(wc=_v()),wc}function Wv({swiper:e,on:n,emit:s}){const a=ft();let l=null,c=null;const u=()=>{!e||e.destroyed||!e.initialized||(s("beforeResize"),s("resize"))},f=()=>{!e||e.destroyed||!e.initialized||(l=new ResizeObserver(g=>{c=a.requestAnimationFrame(()=>{const{width:v,height:b}=e;let y=v,S=b;g.forEach(({contentBoxSize:N,contentRect:T,target:L})=>{L&&L!==e.el||(y=T?T.width:(N[0]||N).inlineSize,S=T?T.height:(N[0]||N).blockSize)}),(y!==v||S!==b)&&u()})}),l.observe(e.el))},p=()=>{c&&a.cancelAnimationFrame(c),l&&l.unobserve&&e.el&&(l.unobserve(e.el),l=null)},m=()=>{!e||e.destroyed||!e.initialized||s("orientationchange")};n("init",()=>{if(e.params.resizeObserver&&typeof a.ResizeObserver<"u"){f();return}a.addEventListener("resize",u),a.addEventListener("orientationchange",m)}),n("destroy",()=>{p(),a.removeEventListener("resize",u),a.removeEventListener("orientationchange",m)})}function Uv({swiper:e,extendParams:n,on:s,emit:a}){const l=[],c=ft(),u=(m,g={})=>{const v=c.MutationObserver||c.WebkitMutationObserver,b=new v(y=>{if(e.__preventObserver__)return;if(y.length===1){a("observerUpdate",y[0]);return}const S=function(){a("observerUpdate",y[0])};c.requestAnimationFrame?c.requestAnimationFrame(S):c.setTimeout(S,0)});b.observe(m,{attributes:typeof g.attributes>"u"?!0:g.attributes,childList:e.isElement||(typeof g.childList>"u"?!0:g).childList,characterData:typeof g.characterData>"u"?!0:g.characterData}),l.push(b)},f=()=>{if(e.params.observer){if(e.params.observeParents){const m=Iv(e.hostEl);for(let g=0;g<m.length;g+=1)u(m[g])}u(e.hostEl,{childList:e.params.observeSlideChildren}),u(e.wrapperEl,{attributes:!1})}},p=()=>{l.forEach(m=>{m.disconnect()}),l.splice(0,l.length)};n({observer:!1,observeParents:!1,observeSlideChildren:!1}),s("init",f),s("destroy",p)}var Yv={on(e,n,s){const a=this;if(!a.eventsListeners||a.destroyed||typeof n!="function")return a;const l=s?"unshift":"push";return e.split(" ").forEach(c=>{a.eventsListeners[c]||(a.eventsListeners[c]=[]),a.eventsListeners[c][l](n)}),a},once(e,n,s){const a=this;if(!a.eventsListeners||a.destroyed||typeof n!="function")return a;function l(...c){a.off(e,l),l.__emitterProxy&&delete l.__emitterProxy,n.apply(a,c)}return l.__emitterProxy=n,a.on(e,l,s)},onAny(e,n){const s=this;if(!s.eventsListeners||s.destroyed||typeof e!="function")return s;const a=n?"unshift":"push";return s.eventsAnyListeners.indexOf(e)<0&&s.eventsAnyListeners[a](e),s},offAny(e){const n=this;if(!n.eventsListeners||n.destroyed||!n.eventsAnyListeners)return n;const s=n.eventsAnyListeners.indexOf(e);return s>=0&&n.eventsAnyListeners.splice(s,1),n},off(e,n){const s=this;return!s.eventsListeners||s.destroyed||!s.eventsListeners||e.split(" ").forEach(a=>{typeof n>"u"?s.eventsListeners[a]=[]:s.eventsListeners[a]&&s.eventsListeners[a].forEach((l,c)=>{(l===n||l.__emitterProxy&&l.__emitterProxy===n)&&s.eventsListeners[a].splice(c,1)})}),s},emit(...e){const n=this;if(!n.eventsListeners||n.destroyed||!n.eventsListeners)return n;let s,a,l;return typeof e[0]=="string"||Array.isArray(e[0])?(s=e[0],a=e.slice(1,e.length),l=n):(s=e[0].events,a=e[0].data,l=e[0].context||n),a.unshift(l),(Array.isArray(s)?s:s.split(" ")).forEach(u=>{n.eventsAnyListeners&&n.eventsAnyListeners.length&&n.eventsAnyListeners.forEach(f=>{f.apply(l,[u,...a])}),n.eventsListeners&&n.eventsListeners[u]&&n.eventsListeners[u].forEach(f=>{f.apply(l,a)})}),n}};function $v(){const e=this;let n,s;const a=e.el;typeof e.params.width<"u"&&e.params.width!==null?n=e.params.width:n=a.clientWidth,typeof e.params.height<"u"&&e.params.height!==null?s=e.params.height:s=a.clientHeight,!(n===0&&e.isHorizontal()||s===0&&e.isVertical())&&(n=n-parseInt(qn(a,"padding-left")||0,10)-parseInt(qn(a,"padding-right")||0,10),s=s-parseInt(qn(a,"padding-top")||0,10)-parseInt(qn(a,"padding-bottom")||0,10),Number.isNaN(n)&&(n=0),Number.isNaN(s)&&(s=0),Object.assign(e,{width:n,height:s,size:e.isHorizontal()?n:s}))}function Hv(){const e=this;function n(Y,X){return parseFloat(Y.getPropertyValue(e.getDirectionLabel(X))||0)}const s=e.params,{wrapperEl:a,slidesEl:l,rtlTranslate:c,wrongRTL:u}=e,f=e.virtual&&s.virtual.enabled,p=f?e.virtual.slides.length:e.slides.length,m=vn(l,`.${e.params.slideClass}, swiper-slide`),g=f?e.virtual.slides.length:m.length;let v=[];const b=[],y=[];let S=s.slidesOffsetBefore;typeof S=="function"&&(S=s.slidesOffsetBefore.call(e));let N=s.slidesOffsetAfter;typeof N=="function"&&(N=s.slidesOffsetAfter.call(e));const T=e.snapGrid.length,L=e.slidesGrid.length,E=e.size-S-N;let P=s.spaceBetween,B=-S,M=0,F=0;if(typeof E>"u")return;typeof P=="string"&&P.indexOf("%")>=0?P=parseFloat(P.replace("%",""))/100*E:typeof P=="string"&&(P=parseFloat(P)),e.virtualSize=-P-S-N,m.forEach(Y=>{c?Y.style.marginLeft="":Y.style.marginRight="",Y.style.marginBottom="",Y.style.marginTop=""}),s.centeredSlides&&s.cssMode&&(Ia(a,"--swiper-centered-offset-before",""),Ia(a,"--swiper-centered-offset-after",""));const _=s.grid&&s.grid.rows>1&&e.grid;_?e.grid.initSlides(m):e.grid&&e.grid.unsetSlides();let D;const H=s.slidesPerView==="auto"&&s.breakpoints&&Object.keys(s.breakpoints).filter(Y=>typeof s.breakpoints[Y].slidesPerView<"u").length>0;for(let Y=0;Y<g;Y+=1){D=0;const X=m[Y];if(!(X&&(_&&e.grid.updateSlide(Y,X,m),qn(X,"display")==="none"))){if(f&&s.slidesPerView==="auto")s.virtual.slidesPerViewAutoSlideSize&&(D=s.virtual.slidesPerViewAutoSlideSize),D&&X&&(s.roundLengths&&(D=Math.floor(D)),X.style[e.getDirectionLabel("width")]=`${D}px`);else if(s.slidesPerView==="auto"){H&&(X.style[e.getDirectionLabel("width")]="");const re=getComputedStyle(X),ue=X.style.transform,me=X.style.webkitTransform;if(ue&&(X.style.transform="none"),me&&(X.style.webkitTransform="none"),s.roundLengths)D=e.isHorizontal()?Pf(X,"width"):Pf(X,"height");else{const we=n(re,"width"),Ie=n(re,"padding-left"),Z=n(re,"padding-right"),O=n(re,"margin-left"),G=n(re,"margin-right"),C=re.getPropertyValue("box-sizing");if(C&&C==="border-box")D=we+O+G;else{const{clientWidth:W,offsetWidth:se}=X;D=we+Ie+Z+O+G+(se-W)}}ue&&(X.style.transform=ue),me&&(X.style.webkitTransform=me),s.roundLengths&&(D=Math.floor(D))}else D=(E-(s.slidesPerView-1)*P)/s.slidesPerView,s.roundLengths&&(D=Math.floor(D)),X&&(X.style[e.getDirectionLabel("width")]=`${D}px`);X&&(X.swiperSlideSize=D),y.push(D),s.centeredSlides?(B=B+D/2+M/2+P,M===0&&Y!==0&&(B=B-E/2-P),Y===0&&(B=B-E/2-P),Math.abs(B)<1/1e3&&(B=0),s.roundLengths&&(B=Math.floor(B)),F%s.slidesPerGroup===0&&v.push(B),b.push(B)):(s.roundLengths&&(B=Math.floor(B)),(F-Math.min(e.params.slidesPerGroupSkip,F))%e.params.slidesPerGroup===0&&v.push(B),b.push(B),B=B+D+P),e.virtualSize+=D+P,M=D,F+=1}}if(e.virtualSize=Math.max(e.virtualSize,E)+N,c&&u&&(s.effect==="slide"||s.effect==="coverflow")&&(a.style.width=`${e.virtualSize+P}px`),s.setWrapperSize&&(a.style[e.getDirectionLabel("width")]=`${e.virtualSize+P}px`),_&&e.grid.updateWrapperSize(D,v),!s.centeredSlides){const Y=[];for(let X=0;X<v.length;X+=1){let re=v[X];s.roundLengths&&(re=Math.floor(re)),v[X]<=e.virtualSize-E&&Y.push(re)}v=Y,Math.floor(e.virtualSize-E)-Math.floor(v[v.length-1])>1&&v.push(e.virtualSize-E)}if(f&&s.loop){const Y=y[0]+P;if(s.slidesPerGroup>1){const X=Math.ceil((e.virtual.slidesBefore+e.virtual.slidesAfter)/s.slidesPerGroup),re=Y*s.slidesPerGroup;for(let ue=0;ue<X;ue+=1)v.push(v[v.length-1]+re)}for(let X=0;X<e.virtual.slidesBefore+e.virtual.slidesAfter;X+=1)s.slidesPerGroup===1&&v.push(v[v.length-1]+Y),b.push(b[b.length-1]+Y),e.virtualSize+=Y}if(v.length===0&&(v=[0]),P!==0){const Y=e.isHorizontal()&&c?"marginLeft":e.getDirectionLabel("marginRight");m.filter((X,re)=>!s.cssMode||s.loop?!0:re!==m.length-1).forEach(X=>{X.style[Y]=`${P}px`})}if(s.centeredSlides&&s.centeredSlidesBounds){let Y=0;y.forEach(re=>{Y+=re+(P||0)}),Y-=P;const X=Y>E?Y-E:0;v=v.map(re=>re<=0?-S:re>X?X+N:re)}if(s.centerInsufficientSlides){let Y=0;y.forEach(re=>{Y+=re+(P||0)}),Y-=P;const X=(S||0)+(N||0);if(Y+X<E){const re=(E-Y-X)/2;v.forEach((ue,me)=>{v[me]=ue-re}),b.forEach((ue,me)=>{b[me]=ue+re})}}if(Object.assign(e,{slides:m,snapGrid:v,slidesGrid:b,slidesSizesGrid:y}),s.centeredSlides&&s.cssMode&&!s.centeredSlidesBounds){Ia(a,"--swiper-centered-offset-before",`${-v[0]}px`),Ia(a,"--swiper-centered-offset-after",`${e.size/2-y[y.length-1]/2}px`);const Y=-e.snapGrid[0],X=-e.slidesGrid[0];e.snapGrid=e.snapGrid.map(re=>re+Y),e.slidesGrid=e.slidesGrid.map(re=>re+X)}if(g!==p&&e.emit("slidesLengthChange"),v.length!==T&&(e.params.watchOverflow&&e.checkOverflow(),e.emit("snapGridLengthChange")),b.length!==L&&e.emit("slidesGridLengthChange"),s.watchSlidesProgress&&e.updateSlidesOffset(),e.emit("slidesUpdated"),!f&&!s.cssMode&&(s.effect==="slide"||s.effect==="fade")){const Y=`${s.containerModifierClass}backface-hidden`,X=e.el.classList.contains(Y);g<=s.maxBackfaceHiddenSlides?X||e.el.classList.add(Y):X&&e.el.classList.remove(Y)}}function Gv(e){const n=this,s=[],a=n.virtual&&n.params.virtual.enabled;let l=0,c;typeof e=="number"?n.setTransition(e):e===!0&&n.setTransition(n.params.speed);const u=f=>a?n.slides[n.getSlideIndexByData(f)]:n.slides[f];if(n.params.slidesPerView!=="auto"&&n.params.slidesPerView>1)if(n.params.centeredSlides)(n.visibleSlides||[]).forEach(f=>{s.push(f)});else for(c=0;c<Math.ceil(n.params.slidesPerView);c+=1){const f=n.activeIndex+c;if(f>n.slides.length&&!a)break;s.push(u(f))}else s.push(u(n.activeIndex));for(c=0;c<s.length;c+=1)if(typeof s[c]<"u"){const f=s[c].offsetHeight;l=f>l?f:l}(l||l===0)&&(n.wrapperEl.style.height=`${l}px`)}function qv(){const e=this,n=e.slides,s=e.isElement?e.isHorizontal()?e.wrapperEl.offsetLeft:e.wrapperEl.offsetTop:0;for(let a=0;a<n.length;a+=1)n[a].swiperSlideOffset=(e.isHorizontal()?n[a].offsetLeft:n[a].offsetTop)-s-e.cssOverflowAdjustment()}const Af=(e,n,s)=>{n&&!e.classList.contains(s)?e.classList.add(s):!n&&e.classList.contains(s)&&e.classList.remove(s)};function Xv(e=this&&this.translate||0){const n=this,s=n.params,{slides:a,rtlTranslate:l,snapGrid:c}=n;if(a.length===0)return;typeof a[0].swiperSlideOffset>"u"&&n.updateSlidesOffset();let u=-e;l&&(u=e),n.visibleSlidesIndexes=[],n.visibleSlides=[];let f=s.spaceBetween;typeof f=="string"&&f.indexOf("%")>=0?f=parseFloat(f.replace("%",""))/100*n.size:typeof f=="string"&&(f=parseFloat(f));for(let p=0;p<a.length;p+=1){const m=a[p];let g=m.swiperSlideOffset;s.cssMode&&s.centeredSlides&&(g-=a[0].swiperSlideOffset);const v=(u+(s.centeredSlides?n.minTranslate():0)-g)/(m.swiperSlideSize+f),b=(u-c[0]+(s.centeredSlides?n.minTranslate():0)-g)/(m.swiperSlideSize+f),y=-(u-g),S=y+n.slidesSizesGrid[p],N=y>=0&&y<=n.size-n.slidesSizesGrid[p],T=y>=0&&y<n.size-1||S>1&&S<=n.size||y<=0&&S>=n.size;T&&(n.visibleSlides.push(m),n.visibleSlidesIndexes.push(p)),Af(m,T,s.slideVisibleClass),Af(m,N,s.slideFullyVisibleClass),m.progress=l?-v:v,m.originalProgress=l?-b:b}}function Kv(e){const n=this;if(typeof e>"u"){const g=n.rtlTranslate?-1:1;e=n&&n.translate&&n.translate*g||0}const s=n.params,a=n.maxTranslate()-n.minTranslate();let{progress:l,isBeginning:c,isEnd:u,progressLoop:f}=n;const p=c,m=u;if(a===0)l=0,c=!0,u=!0;else{l=(e-n.minTranslate())/a;const g=Math.abs(e-n.minTranslate())<1,v=Math.abs(e-n.maxTranslate())<1;c=g||l<=0,u=v||l>=1,g&&(l=0),v&&(l=1)}if(s.loop){const g=n.getSlideIndexByData(0),v=n.getSlideIndexByData(n.slides.length-1),b=n.slidesGrid[g],y=n.slidesGrid[v],S=n.slidesGrid[n.slidesGrid.length-1],N=Math.abs(e);N>=b?f=(N-b)/S:f=(N+S-y)/S,f>1&&(f-=1)}Object.assign(n,{progress:l,progressLoop:f,isBeginning:c,isEnd:u}),(s.watchSlidesProgress||s.centeredSlides&&s.autoHeight)&&n.updateSlidesProgress(e),c&&!p&&n.emit("reachBeginning toEdge"),u&&!m&&n.emit("reachEnd toEdge"),(p&&!c||m&&!u)&&n.emit("fromEdge"),n.emit("progress",l)}const jc=(e,n,s)=>{n&&!e.classList.contains(s)?e.classList.add(s):!n&&e.classList.contains(s)&&e.classList.remove(s)};function Qv(){const e=this,{slides:n,params:s,slidesEl:a,activeIndex:l}=e,c=e.virtual&&s.virtual.enabled,u=e.grid&&s.grid&&s.grid.rows>1,f=v=>vn(a,`.${s.slideClass}${v}, swiper-slide${v}`)[0];let p,m,g;if(c)if(s.loop){let v=l-e.virtual.slidesBefore;v<0&&(v=e.virtual.slides.length+v),v>=e.virtual.slides.length&&(v-=e.virtual.slides.length),p=f(`[data-swiper-slide-index="${v}"]`)}else p=f(`[data-swiper-slide-index="${l}"]`);else u?(p=n.find(v=>v.column===l),g=n.find(v=>v.column===l+1),m=n.find(v=>v.column===l-1)):p=n[l];p&&(u||(g=Rv(p,`.${s.slideClass}, swiper-slide`)[0],s.loop&&!g&&(g=n[0]),m=Fv(p,`.${s.slideClass}, swiper-slide`)[0],s.loop&&!m===0&&(m=n[n.length-1]))),n.forEach(v=>{jc(v,v===p,s.slideActiveClass),jc(v,v===g,s.slideNextClass),jc(v,v===m,s.slidePrevClass)}),e.emitSlidesClasses()}const Ya=(e,n)=>{if(!e||e.destroyed||!e.params)return;const s=()=>e.isElement?"swiper-slide":`.${e.params.slideClass}`,a=n.closest(s());if(a){let l=a.querySelector(`.${e.params.lazyPreloaderClass}`);!l&&e.isElement&&(a.shadowRoot?l=a.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`):requestAnimationFrame(()=>{a.shadowRoot&&(l=a.shadowRoot.querySelector(`.${e.params.lazyPreloaderClass}`),l&&l.remove())})),l&&l.remove()}},kc=(e,n)=>{if(!e.slides[n])return;const s=e.slides[n].querySelector('[loading="lazy"]');s&&s.removeAttribute("loading")},qc=e=>{if(!e||e.destroyed||!e.params)return;let n=e.params.lazyPreloadPrevNext;const s=e.slides.length;if(!s||!n||n<0)return;n=Math.min(n,s);const a=e.params.slidesPerView==="auto"?e.slidesPerViewDynamic():Math.ceil(e.params.slidesPerView),l=e.activeIndex;if(e.params.grid&&e.params.grid.rows>1){const u=l,f=[u-n];f.push(...Array.from({length:n}).map((p,m)=>u+a+m)),e.slides.forEach((p,m)=>{f.includes(p.column)&&kc(e,m)});return}const c=l+a-1;if(e.params.rewind||e.params.loop)for(let u=l-n;u<=c+n;u+=1){const f=(u%s+s)%s;(f<l||f>c)&&kc(e,f)}else for(let u=Math.max(l-n,0);u<=Math.min(c+n,s-1);u+=1)u!==l&&(u>c||u<l)&&kc(e,u)};function Zv(e){const{slidesGrid:n,params:s}=e,a=e.rtlTranslate?e.translate:-e.translate;let l;for(let c=0;c<n.length;c+=1)typeof n[c+1]<"u"?a>=n[c]&&a<n[c+1]-(n[c+1]-n[c])/2?l=c:a>=n[c]&&a<n[c+1]&&(l=c+1):a>=n[c]&&(l=c);return s.normalizeSlideIndex&&(l<0||typeof l>"u")&&(l=0),l}function Jv(e){const n=this,s=n.rtlTranslate?n.translate:-n.translate,{snapGrid:a,params:l,activeIndex:c,realIndex:u,snapIndex:f}=n;let p=e,m;const g=y=>{let S=y-n.virtual.slidesBefore;return S<0&&(S=n.virtual.slides.length+S),S>=n.virtual.slides.length&&(S-=n.virtual.slides.length),S};if(typeof p>"u"&&(p=Zv(n)),a.indexOf(s)>=0)m=a.indexOf(s);else{const y=Math.min(l.slidesPerGroupSkip,p);m=y+Math.floor((p-y)/l.slidesPerGroup)}if(m>=a.length&&(m=a.length-1),p===c&&!n.params.loop){m!==f&&(n.snapIndex=m,n.emit("snapIndexChange"));return}if(p===c&&n.params.loop&&n.virtual&&n.params.virtual.enabled){n.realIndex=g(p);return}const v=n.grid&&l.grid&&l.grid.rows>1;let b;if(n.virtual&&l.virtual.enabled&&l.loop)b=g(p);else if(v){const y=n.slides.find(N=>N.column===p);let S=parseInt(y.getAttribute("data-swiper-slide-index"),10);Number.isNaN(S)&&(S=Math.max(n.slides.indexOf(y),0)),b=Math.floor(S/l.grid.rows)}else if(n.slides[p]){const y=n.slides[p].getAttribute("data-swiper-slide-index");y?b=parseInt(y,10):b=p}else b=p;Object.assign(n,{previousSnapIndex:f,snapIndex:m,previousRealIndex:u,realIndex:b,previousIndex:c,activeIndex:p}),n.initialized&&qc(n),n.emit("activeIndexChange"),n.emit("snapIndexChange"),(n.initialized||n.params.runCallbacksOnInit)&&(u!==b&&n.emit("realIndexChange"),n.emit("slideChange"))}function eb(e,n){const s=this,a=s.params;let l=e.closest(`.${a.slideClass}, swiper-slide`);!l&&s.isElement&&n&&n.length>1&&n.includes(e)&&[...n.slice(n.indexOf(e)+1,n.length)].forEach(f=>{!l&&f.matches&&f.matches(`.${a.slideClass}, swiper-slide`)&&(l=f)});let c=!1,u;if(l){for(let f=0;f<s.slides.length;f+=1)if(s.slides[f]===l){c=!0,u=f;break}}if(l&&c)s.clickedSlide=l,s.virtual&&s.params.virtual.enabled?s.clickedIndex=parseInt(l.getAttribute("data-swiper-slide-index"),10):s.clickedIndex=u;else{s.clickedSlide=void 0,s.clickedIndex=void 0;return}a.slideToClickedSlide&&s.clickedIndex!==void 0&&s.clickedIndex!==s.activeIndex&&s.slideToClickedSlide()}var tb={updateSize:$v,updateSlides:Hv,updateAutoHeight:Gv,updateSlidesOffset:qv,updateSlidesProgress:Xv,updateProgress:Kv,updateSlidesClasses:Qv,updateActiveIndex:Jv,updateClickedSlide:eb};function nb(e=this.isHorizontal()?"x":"y"){const n=this,{params:s,rtlTranslate:a,translate:l,wrapperEl:c}=n;if(s.virtualTranslate)return a?-l:l;if(s.cssMode)return l;let u=Mv(c,e);return u+=n.cssOverflowAdjustment(),a&&(u=-u),u||0}function ib(e,n){const s=this,{rtlTranslate:a,params:l,wrapperEl:c,progress:u}=s;let f=0,p=0;const m=0;s.isHorizontal()?f=a?-e:e:p=e,l.roundLengths&&(f=Math.floor(f),p=Math.floor(p)),s.previousTranslate=s.translate,s.translate=s.isHorizontal()?f:p,l.cssMode?c[s.isHorizontal()?"scrollLeft":"scrollTop"]=s.isHorizontal()?-f:-p:l.virtualTranslate||(s.isHorizontal()?f-=s.cssOverflowAdjustment():p-=s.cssOverflowAdjustment(),c.style.transform=`translate3d(${f}px, ${p}px, ${m}px)`);let g;const v=s.maxTranslate()-s.minTranslate();v===0?g=0:g=(e-s.minTranslate())/v,g!==u&&s.updateProgress(e),s.emit("setTranslate",s.translate,n)}function rb(){return-this.snapGrid[0]}function sb(){return-this.snapGrid[this.snapGrid.length-1]}function ab(e=0,n=this.params.speed,s=!0,a=!0,l){const c=this,{params:u,wrapperEl:f}=c;if(c.animating&&u.preventInteractionOnTransition)return!1;const p=c.minTranslate(),m=c.maxTranslate();let g;if(a&&e>p?g=p:a&&e<m?g=m:g=e,c.updateProgress(g),u.cssMode){const v=c.isHorizontal();if(n===0)f[v?"scrollLeft":"scrollTop"]=-g;else{if(!c.support.smoothScroll)return jm({swiper:c,targetPosition:-g,side:v?"left":"top"}),!0;f.scrollTo({[v?"left":"top"]:-g,behavior:"smooth"})}return!0}return n===0?(c.setTransition(0),c.setTranslate(g),s&&(c.emit("beforeTransitionStart",n,l),c.emit("transitionEnd"))):(c.setTransition(n),c.setTranslate(g),s&&(c.emit("beforeTransitionStart",n,l),c.emit("transitionStart")),c.animating||(c.animating=!0,c.onTranslateToWrapperTransitionEnd||(c.onTranslateToWrapperTransitionEnd=function(b){!c||c.destroyed||b.target===this&&(c.wrapperEl.removeEventListener("transitionend",c.onTranslateToWrapperTransitionEnd),c.onTranslateToWrapperTransitionEnd=null,delete c.onTranslateToWrapperTransitionEnd,c.animating=!1,s&&c.emit("transitionEnd"))}),c.wrapperEl.addEventListener("transitionend",c.onTranslateToWrapperTransitionEnd))),!0}var ob={getTranslate:nb,setTranslate:ib,minTranslate:rb,maxTranslate:sb,translateTo:ab};function lb(e,n){const s=this;s.params.cssMode||(s.wrapperEl.style.transitionDuration=`${e}ms`,s.wrapperEl.style.transitionDelay=e===0?"0ms":""),s.emit("setTransition",e,n)}function Tm({swiper:e,runCallbacks:n,direction:s,step:a}){const{activeIndex:l,previousIndex:c}=e;let u=s;u||(l>c?u="next":l<c?u="prev":u="reset"),e.emit(`transition${a}`),n&&u==="reset"?e.emit(`slideResetTransition${a}`):n&&l!==c&&(e.emit(`slideChangeTransition${a}`),u==="next"?e.emit(`slideNextTransition${a}`):e.emit(`slidePrevTransition${a}`))}function cb(e=!0,n){const s=this,{params:a}=s;a.cssMode||(a.autoHeight&&s.updateAutoHeight(),Tm({swiper:s,runCallbacks:e,direction:n,step:"Start"}))}function db(e=!0,n){const s=this,{params:a}=s;s.animating=!1,!a.cssMode&&(s.setTransition(0),Tm({swiper:s,runCallbacks:e,direction:n,step:"End"}))}var ub={setTransition:lb,transitionStart:cb,transitionEnd:db};function pb(e=0,n,s=!0,a,l){typeof e=="string"&&(e=parseInt(e,10));const c=this;let u=e;u<0&&(u=0);const{params:f,snapGrid:p,slidesGrid:m,previousIndex:g,activeIndex:v,rtlTranslate:b,wrapperEl:y,enabled:S}=c;if(!S&&!a&&!l||c.destroyed||c.animating&&f.preventInteractionOnTransition)return!1;typeof n>"u"&&(n=c.params.speed);const N=Math.min(c.params.slidesPerGroupSkip,u);let T=N+Math.floor((u-N)/c.params.slidesPerGroup);T>=p.length&&(T=p.length-1);const L=-p[T];if(f.normalizeSlideIndex)for(let _=0;_<m.length;_+=1){const D=-Math.floor(L*100),H=Math.floor(m[_]*100),Y=Math.floor(m[_+1]*100);typeof m[_+1]<"u"?D>=H&&D<Y-(Y-H)/2?u=_:D>=H&&D<Y&&(u=_+1):D>=H&&(u=_)}if(c.initialized&&u!==v&&(!c.allowSlideNext&&(b?L>c.translate&&L>c.minTranslate():L<c.translate&&L<c.minTranslate())||!c.allowSlidePrev&&L>c.translate&&L>c.maxTranslate()&&(v||0)!==u))return!1;u!==(g||0)&&s&&c.emit("beforeSlideChangeStart"),c.updateProgress(L);let E;u>v?E="next":u<v?E="prev":E="reset";const P=c.virtual&&c.params.virtual.enabled;if(!(P&&l)&&(b&&-L===c.translate||!b&&L===c.translate))return c.updateActiveIndex(u),f.autoHeight&&c.updateAutoHeight(),c.updateSlidesClasses(),f.effect!=="slide"&&c.setTranslate(L),E!=="reset"&&(c.transitionStart(s,E),c.transitionEnd(s,E)),!1;if(f.cssMode){const _=c.isHorizontal(),D=b?L:-L;if(n===0)P&&(c.wrapperEl.style.scrollSnapType="none",c._immediateVirtual=!0),P&&!c._cssModeVirtualInitialSet&&c.params.initialSlide>0?(c._cssModeVirtualInitialSet=!0,requestAnimationFrame(()=>{y[_?"scrollLeft":"scrollTop"]=D})):y[_?"scrollLeft":"scrollTop"]=D,P&&requestAnimationFrame(()=>{c.wrapperEl.style.scrollSnapType="",c._immediateVirtual=!1});else{if(!c.support.smoothScroll)return jm({swiper:c,targetPosition:D,side:_?"left":"top"}),!0;y.scrollTo({[_?"left":"top"]:D,behavior:"smooth"})}return!0}const F=Cm().isSafari;return P&&!l&&F&&c.isElement&&c.virtual.update(!1,!1,u),c.setTransition(n),c.setTranslate(L),c.updateActiveIndex(u),c.updateSlidesClasses(),c.emit("beforeTransitionStart",n,a),c.transitionStart(s,E),n===0?c.transitionEnd(s,E):c.animating||(c.animating=!0,c.onSlideToWrapperTransitionEnd||(c.onSlideToWrapperTransitionEnd=function(D){!c||c.destroyed||D.target===this&&(c.wrapperEl.removeEventListener("transitionend",c.onSlideToWrapperTransitionEnd),c.onSlideToWrapperTransitionEnd=null,delete c.onSlideToWrapperTransitionEnd,c.transitionEnd(s,E))}),c.wrapperEl.addEventListener("transitionend",c.onSlideToWrapperTransitionEnd)),!0}function fb(e=0,n,s=!0,a){typeof e=="string"&&(e=parseInt(e,10));const l=this;if(l.destroyed)return;typeof n>"u"&&(n=l.params.speed);const c=l.grid&&l.params.grid&&l.params.grid.rows>1;let u=e;if(l.params.loop)if(l.virtual&&l.params.virtual.enabled)u=u+l.virtual.slidesBefore;else{let f;if(c){const N=u*l.params.grid.rows;f=l.slides.find(T=>T.getAttribute("data-swiper-slide-index")*1===N).column}else f=l.getSlideIndexByData(u);const p=c?Math.ceil(l.slides.length/l.params.grid.rows):l.slides.length,{centeredSlides:m,slidesOffsetBefore:g,slidesOffsetAfter:v}=l.params,b=m||!!g||!!v;let y=l.params.slidesPerView;y==="auto"?y=l.slidesPerViewDynamic():(y=Math.ceil(parseFloat(l.params.slidesPerView,10)),b&&y%2===0&&(y=y+1));let S=p-f<y;if(b&&(S=S||f<Math.ceil(y/2)),a&&b&&l.params.slidesPerView!=="auto"&&!c&&(S=!1),S){const N=b?f<l.activeIndex?"prev":"next":f-l.activeIndex-1<l.params.slidesPerView?"next":"prev";l.loopFix({direction:N,slideTo:!0,activeSlideIndex:N==="next"?f+1:f-p+1,slideRealIndex:N==="next"?l.realIndex:void 0})}if(c){const N=u*l.params.grid.rows;u=l.slides.find(T=>T.getAttribute("data-swiper-slide-index")*1===N).column}else u=l.getSlideIndexByData(u)}return requestAnimationFrame(()=>{l.slideTo(u,n,s,a)}),l}function hb(e,n=!0,s){const a=this,{enabled:l,params:c,animating:u}=a;if(!l||a.destroyed)return a;typeof e>"u"&&(e=a.params.speed);let f=c.slidesPerGroup;c.slidesPerView==="auto"&&c.slidesPerGroup===1&&c.slidesPerGroupAuto&&(f=Math.max(a.slidesPerViewDynamic("current",!0),1));const p=a.activeIndex<c.slidesPerGroupSkip?1:f,m=a.virtual&&c.virtual.enabled;if(c.loop){if(u&&!m&&c.loopPreventsSliding)return!1;if(a.loopFix({direction:"next"}),a._clientLeft=a.wrapperEl.clientLeft,a.activeIndex===a.slides.length-1&&c.cssMode)return requestAnimationFrame(()=>{a.slideTo(a.activeIndex+p,e,n,s)}),!0}return c.rewind&&a.isEnd?a.slideTo(0,e,n,s):a.slideTo(a.activeIndex+p,e,n,s)}function mb(e,n=!0,s){const a=this,{params:l,snapGrid:c,slidesGrid:u,rtlTranslate:f,enabled:p,animating:m}=a;if(!p||a.destroyed)return a;typeof e>"u"&&(e=a.params.speed);const g=a.virtual&&l.virtual.enabled;if(l.loop){if(m&&!g&&l.loopPreventsSliding)return!1;a.loopFix({direction:"prev"}),a._clientLeft=a.wrapperEl.clientLeft}const v=f?a.translate:-a.translate;function b(E){return E<0?-Math.floor(Math.abs(E)):Math.floor(E)}const y=b(v),S=c.map(E=>b(E)),N=l.freeMode&&l.freeMode.enabled;let T=c[S.indexOf(y)-1];if(typeof T>"u"&&(l.cssMode||N)){let E;c.forEach((P,B)=>{y>=P&&(E=B)}),typeof E<"u"&&(T=N?c[E]:c[E>0?E-1:E])}let L=0;if(typeof T<"u"&&(L=u.indexOf(T),L<0&&(L=a.activeIndex-1),l.slidesPerView==="auto"&&l.slidesPerGroup===1&&l.slidesPerGroupAuto&&(L=L-a.slidesPerViewDynamic("previous",!0)+1,L=Math.max(L,0))),l.rewind&&a.isBeginning){const E=a.params.virtual&&a.params.virtual.enabled&&a.virtual?a.virtual.slides.length-1:a.slides.length-1;return a.slideTo(E,e,n,s)}else if(l.loop&&a.activeIndex===0&&l.cssMode)return requestAnimationFrame(()=>{a.slideTo(L,e,n,s)}),!0;return a.slideTo(L,e,n,s)}function gb(e,n=!0,s){const a=this;if(!a.destroyed)return typeof e>"u"&&(e=a.params.speed),a.slideTo(a.activeIndex,e,n,s)}function xb(e,n=!0,s,a=.5){const l=this;if(l.destroyed)return;typeof e>"u"&&(e=l.params.speed);let c=l.activeIndex;const u=Math.min(l.params.slidesPerGroupSkip,c),f=u+Math.floor((c-u)/l.params.slidesPerGroup),p=l.rtlTranslate?l.translate:-l.translate;if(p>=l.snapGrid[f]){const m=l.snapGrid[f],g=l.snapGrid[f+1];p-m>(g-m)*a&&(c+=l.params.slidesPerGroup)}else{const m=l.snapGrid[f-1],g=l.snapGrid[f];p-m<=(g-m)*a&&(c-=l.params.slidesPerGroup)}return c=Math.max(c,0),c=Math.min(c,l.slidesGrid.length-1),l.slideTo(c,e,n,s)}function vb(){const e=this;if(e.destroyed)return;const{params:n,slidesEl:s}=e,a=n.slidesPerView==="auto"?e.slidesPerViewDynamic():n.slidesPerView;let l=e.getSlideIndexWhenGrid(e.clickedIndex),c;const u=e.isElement?"swiper-slide":`.${n.slideClass}`,f=e.grid&&e.params.grid&&e.params.grid.rows>1;if(n.loop){if(e.animating)return;c=parseInt(e.clickedSlide.getAttribute("data-swiper-slide-index"),10),n.centeredSlides?e.slideToLoop(c):l>(f?(e.slides.length-a)/2-(e.params.grid.rows-1):e.slides.length-a)?(e.loopFix(),l=e.getSlideIndex(vn(s,`${u}[data-swiper-slide-index="${c}"]`)[0]),wm(()=>{e.slideTo(l)})):e.slideTo(l)}else e.slideTo(l)}var bb={slideTo:pb,slideToLoop:fb,slideNext:hb,slidePrev:mb,slideReset:gb,slideToClosest:xb,slideToClickedSlide:vb};function yb(e,n){const s=this,{params:a,slidesEl:l}=s;if(!a.loop||s.virtual&&s.params.virtual.enabled)return;const c=()=>{vn(l,`.${a.slideClass}, swiper-slide`).forEach((S,N)=>{S.setAttribute("data-swiper-slide-index",N)})},u=()=>{const y=vn(l,`.${a.slideBlankClass}`);y.forEach(S=>{S.remove()}),y.length>0&&(s.recalcSlides(),s.updateSlides())},f=s.grid&&a.grid&&a.grid.rows>1;a.loopAddBlankSlides&&(a.slidesPerGroup>1||f)&&u();const p=a.slidesPerGroup*(f?a.grid.rows:1),m=s.slides.length%p!==0,g=f&&s.slides.length%a.grid.rows!==0,v=y=>{for(let S=0;S<y;S+=1){const N=s.isElement?Gc("swiper-slide",[a.slideBlankClass]):Gc("div",[a.slideClass,a.slideBlankClass]);s.slidesEl.append(N)}};if(m){if(a.loopAddBlankSlides){const y=p-s.slides.length%p;v(y),s.recalcSlides(),s.updateSlides()}else no("Swiper Loop Warning: The number of slides is not even to slidesPerGroup, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");c()}else if(g){if(a.loopAddBlankSlides){const y=a.grid.rows-s.slides.length%a.grid.rows;v(y),s.recalcSlides(),s.updateSlides()}else no("Swiper Loop Warning: The number of slides is not even to grid.rows, loop mode may not function properly. You need to add more slides (or make duplicates, or empty slides)");c()}else c();const b=a.centeredSlides||!!a.slidesOffsetBefore||!!a.slidesOffsetAfter;s.loopFix({slideRealIndex:e,direction:b?void 0:"next",initial:n})}function wb({slideRealIndex:e,slideTo:n=!0,direction:s,setTranslate:a,activeSlideIndex:l,initial:c,byController:u,byMousewheel:f}={}){const p=this;if(!p.params.loop)return;p.emit("beforeLoopFix");const{slides:m,allowSlidePrev:g,allowSlideNext:v,slidesEl:b,params:y}=p,{centeredSlides:S,slidesOffsetBefore:N,slidesOffsetAfter:T,initialSlide:L}=y,E=S||!!N||!!T;if(p.allowSlidePrev=!0,p.allowSlideNext=!0,p.virtual&&y.virtual.enabled){n&&(!E&&p.snapIndex===0?p.slideTo(p.virtual.slides.length,0,!1,!0):E&&p.snapIndex<y.slidesPerView?p.slideTo(p.virtual.slides.length+p.snapIndex,0,!1,!0):p.snapIndex===p.snapGrid.length-1&&p.slideTo(p.virtual.slidesBefore,0,!1,!0)),p.allowSlidePrev=g,p.allowSlideNext=v,p.emit("loopFix");return}let P=y.slidesPerView;P==="auto"?P=p.slidesPerViewDynamic():(P=Math.ceil(parseFloat(y.slidesPerView,10)),E&&P%2===0&&(P=P+1));const B=y.slidesPerGroupAuto?P:y.slidesPerGroup;let M=E?Math.max(B,Math.ceil(P/2)):B;M%B!==0&&(M+=B-M%B),M+=y.loopAdditionalSlides,p.loopedSlides=M;const F=p.grid&&y.grid&&y.grid.rows>1;m.length<P+M||p.params.effect==="cards"&&m.length<P+M*2?no("Swiper Loop Warning: The number of slides is not enough for loop mode, it will be disabled or not function properly. You need to add more slides (or make duplicates) or lower the values of slidesPerView and slidesPerGroup parameters"):F&&y.grid.fill==="row"&&no("Swiper Loop Warning: Loop mode is not compatible with grid.fill = `row`");const _=[],D=[],H=F?Math.ceil(m.length/y.grid.rows):m.length,Y=c&&H-L<P&&!E;let X=Y?L:p.activeIndex;typeof l>"u"?l=p.getSlideIndex(m.find(O=>O.classList.contains(y.slideActiveClass))):X=l;const re=s==="next"||!s,ue=s==="prev"||!s;let me=0,we=0;const Z=(F?m[l].column:l)+(E&&typeof a>"u"?-P/2+.5:0);if(Z<M){me=Math.max(M-Z,B);for(let O=0;O<M-Z;O+=1){const G=O-Math.floor(O/H)*H;if(F){const C=H-G-1;for(let W=m.length-1;W>=0;W-=1)m[W].column===C&&_.push(W)}else _.push(H-G-1)}}else if(Z+P>H-M){we=Math.max(Z-(H-M*2),B),Y&&(we=Math.max(we,P-H+L+1));for(let O=0;O<we;O+=1){const G=O-Math.floor(O/H)*H;F?m.forEach((C,W)=>{C.column===G&&D.push(W)}):D.push(G)}}if(p.__preventObserver__=!0,requestAnimationFrame(()=>{p.__preventObserver__=!1}),p.params.effect==="cards"&&m.length<P+M*2&&(D.includes(l)&&D.splice(D.indexOf(l),1),_.includes(l)&&_.splice(_.indexOf(l),1)),ue&&_.forEach(O=>{m[O].swiperLoopMoveDOM=!0,b.prepend(m[O]),m[O].swiperLoopMoveDOM=!1}),re&&D.forEach(O=>{m[O].swiperLoopMoveDOM=!0,b.append(m[O]),m[O].swiperLoopMoveDOM=!1}),p.recalcSlides(),y.slidesPerView==="auto"?p.updateSlides():F&&(_.length>0&&ue||D.length>0&&re)&&p.slides.forEach((O,G)=>{p.grid.updateSlide(G,O,p.slides)}),y.watchSlidesProgress&&p.updateSlidesOffset(),n){if(_.length>0&&ue){if(typeof e>"u"){const O=p.slidesGrid[X],C=p.slidesGrid[X+me]-O;f?p.setTranslate(p.translate-C):(p.slideTo(X+Math.ceil(me),0,!1,!0),a&&(p.touchEventsData.startTranslate=p.touchEventsData.startTranslate-C,p.touchEventsData.currentTranslate=p.touchEventsData.currentTranslate-C))}else if(a){const O=F?_.length/y.grid.rows:_.length;p.slideTo(p.activeIndex+O,0,!1,!0),p.touchEventsData.currentTranslate=p.translate}}else if(D.length>0&&re)if(typeof e>"u"){const O=p.slidesGrid[X],C=p.slidesGrid[X-we]-O;f?p.setTranslate(p.translate-C):(p.slideTo(X-we,0,!1,!0),a&&(p.touchEventsData.startTranslate=p.touchEventsData.startTranslate-C,p.touchEventsData.currentTranslate=p.touchEventsData.currentTranslate-C))}else{const O=F?D.length/y.grid.rows:D.length;p.slideTo(p.activeIndex-O,0,!1,!0)}}if(p.allowSlidePrev=g,p.allowSlideNext=v,p.controller&&p.controller.control&&!u){const O={slideRealIndex:e,direction:s,setTranslate:a,activeSlideIndex:l,byController:!0};Array.isArray(p.controller.control)?p.controller.control.forEach(G=>{!G.destroyed&&G.params.loop&&G.loopFix({...O,slideTo:G.params.slidesPerView===y.slidesPerView?n:!1})}):p.controller.control instanceof p.constructor&&p.controller.control.params.loop&&p.controller.control.loopFix({...O,slideTo:p.controller.control.params.slidesPerView===y.slidesPerView?n:!1})}p.emit("loopFix")}function jb(){const e=this,{params:n,slidesEl:s}=e;if(!n.loop||!s||e.virtual&&e.params.virtual.enabled)return;e.recalcSlides();const a=[];e.slides.forEach(l=>{const c=typeof l.swiperSlideIndex>"u"?l.getAttribute("data-swiper-slide-index")*1:l.swiperSlideIndex;a[c]=l}),e.slides.forEach(l=>{l.removeAttribute("data-swiper-slide-index")}),a.forEach(l=>{s.append(l)}),e.recalcSlides(),e.slideTo(e.realIndex,0)}var kb={loopCreate:yb,loopFix:wb,loopDestroy:jb};function Sb(e){const n=this;if(!n.params.simulateTouch||n.params.watchOverflow&&n.isLocked||n.params.cssMode)return;const s=n.params.touchEventsTarget==="container"?n.el:n.wrapperEl;n.isElement&&(n.__preventObserver__=!0),s.style.cursor="move",s.style.cursor=e?"grabbing":"grab",n.isElement&&requestAnimationFrame(()=>{n.__preventObserver__=!1})}function Nb(){const e=this;e.params.watchOverflow&&e.isLocked||e.params.cssMode||(e.isElement&&(e.__preventObserver__=!0),e[e.params.touchEventsTarget==="container"?"el":"wrapperEl"].style.cursor="",e.isElement&&requestAnimationFrame(()=>{e.__preventObserver__=!1}))}var Cb={setGrabCursor:Sb,unsetGrabCursor:Nb};function Tb(e,n=this){function s(a){if(!a||a===nn()||a===ft())return null;a.assignedSlot&&(a=a.assignedSlot);const l=a.closest(e);return!l&&!a.getRootNode?null:l||s(a.getRootNode().host)}return s(n)}function Lf(e,n,s){const a=ft(),{params:l}=e,c=l.edgeSwipeDetection,u=l.edgeSwipeThreshold;return c&&(s<=u||s>=a.innerWidth-u)?c==="prevent"?(n.preventDefault(),!0):!1:!0}function zb(e){const n=this,s=nn();let a=e;a.originalEvent&&(a=a.originalEvent);const l=n.touchEventsData;if(a.type==="pointerdown"){if(l.pointerId!==null&&l.pointerId!==a.pointerId)return;l.pointerId=a.pointerId}else a.type==="touchstart"&&a.targetTouches.length===1&&(l.touchId=a.targetTouches[0].identifier);if(a.type==="touchstart"){Lf(n,a,a.targetTouches[0].pageX);return}const{params:c,touches:u,enabled:f}=n;if(!f||!c.simulateTouch&&a.pointerType==="mouse"||n.animating&&c.preventInteractionOnTransition)return;!n.animating&&c.cssMode&&c.loop&&n.loopFix();let p=a.target;if(c.touchEventsTarget==="wrapper"&&!Dv(p,n.wrapperEl)||"which"in a&&a.which===3||"button"in a&&a.button>0||l.isTouched&&l.isMoved)return;const m=!!c.noSwipingClass&&c.noSwipingClass!=="",g=a.composedPath?a.composedPath():a.path;m&&a.target&&a.target.shadowRoot&&g&&(p=g[0]);const v=c.noSwipingSelector?c.noSwipingSelector:`.${c.noSwipingClass}`,b=!!(a.target&&a.target.shadowRoot);if(c.noSwiping&&(b?Tb(v,p):p.closest(v))){n.allowClick=!0;return}if(c.swipeHandler&&!p.closest(c.swipeHandler))return;u.currentX=a.pageX,u.currentY=a.pageY;const y=u.currentX,S=u.currentY;if(!Lf(n,a,y))return;Object.assign(l,{isTouched:!0,isMoved:!1,allowTouchCallbacks:!0,isScrolling:void 0,startMoving:void 0}),u.startX=y,u.startY=S,l.touchStartTime=to(),n.allowClick=!0,n.updateSize(),n.swipeDirection=void 0,c.threshold>0&&(l.allowThresholdMove=!1);let N=!0;p.matches(l.focusableElements)&&(N=!1,p.nodeName==="SELECT"&&(l.isTouched=!1)),s.activeElement&&s.activeElement.matches(l.focusableElements)&&s.activeElement!==p&&(a.pointerType==="mouse"||a.pointerType!=="mouse"&&!p.matches(l.focusableElements))&&s.activeElement.blur();const T=N&&n.allowTouchMove&&c.touchStartPreventDefault;(c.touchStartForcePreventDefault||T)&&!p.isContentEditable&&a.preventDefault(),c.freeMode&&c.freeMode.enabled&&n.freeMode&&n.animating&&!c.cssMode&&n.freeMode.onTouchStart(),n.emit("touchStart",a)}function Eb(e){const n=nn(),s=this,a=s.touchEventsData,{params:l,touches:c,rtlTranslate:u,enabled:f}=s;if(!f||!l.simulateTouch&&e.pointerType==="mouse")return;let p=e;if(p.originalEvent&&(p=p.originalEvent),p.type==="pointermove"&&(a.touchId!==null||p.pointerId!==a.pointerId))return;let m;if(p.type==="touchmove"){if(m=[...p.changedTouches].find(M=>M.identifier===a.touchId),!m||m.identifier!==a.touchId)return}else m=p;if(!a.isTouched){a.startMoving&&a.isScrolling&&s.emit("touchMoveOpposite",p);return}const g=m.pageX,v=m.pageY;if(p.preventedByNestedSwiper){c.startX=g,c.startY=v;return}if(!s.allowTouchMove){p.target.matches(a.focusableElements)||(s.allowClick=!1),a.isTouched&&(Object.assign(c,{startX:g,startY:v,currentX:g,currentY:v}),a.touchStartTime=to());return}if(l.touchReleaseOnEdges&&!l.loop)if(s.isVertical()){if(v<c.startY&&s.translate<=s.maxTranslate()||v>c.startY&&s.translate>=s.minTranslate()){a.isTouched=!1,a.isMoved=!1;return}}else{if(u&&(g>c.startX&&-s.translate<=s.maxTranslate()||g<c.startX&&-s.translate>=s.minTranslate()))return;if(!u&&(g<c.startX&&s.translate<=s.maxTranslate()||g>c.startX&&s.translate>=s.minTranslate()))return}if(n.activeElement&&n.activeElement.matches(a.focusableElements)&&n.activeElement!==p.target&&p.pointerType!=="mouse"&&n.activeElement.blur(),n.activeElement&&p.target===n.activeElement&&p.target.matches(a.focusableElements)){a.isMoved=!0,s.allowClick=!1;return}a.allowTouchCallbacks&&s.emit("touchMove",p),c.previousX=c.currentX,c.previousY=c.currentY,c.currentX=g,c.currentY=v;const b=c.currentX-c.startX,y=c.currentY-c.startY;if(s.params.threshold&&Math.sqrt(b**2+y**2)<s.params.threshold)return;if(typeof a.isScrolling>"u"){let M;s.isHorizontal()&&c.currentY===c.startY||s.isVertical()&&c.currentX===c.startX?a.isScrolling=!1:b*b+y*y>=25&&(M=Math.atan2(Math.abs(y),Math.abs(b))*180/Math.PI,a.isScrolling=s.isHorizontal()?M>l.touchAngle:90-M>l.touchAngle)}if(a.isScrolling&&s.emit("touchMoveOpposite",p),typeof a.startMoving>"u"&&(c.currentX!==c.startX||c.currentY!==c.startY)&&(a.startMoving=!0),a.isScrolling||p.type==="touchmove"&&a.preventTouchMoveFromPointerMove){a.isTouched=!1;return}if(!a.startMoving)return;s.allowClick=!1,!l.cssMode&&p.cancelable&&p.preventDefault(),l.touchMoveStopPropagation&&!l.nested&&p.stopPropagation();let S=s.isHorizontal()?b:y,N=s.isHorizontal()?c.currentX-c.previousX:c.currentY-c.previousY;l.oneWayMovement&&(S=Math.abs(S)*(u?1:-1),N=Math.abs(N)*(u?1:-1)),c.diff=S,S*=l.touchRatio,u&&(S=-S,N=-N);const T=s.touchesDirection;s.swipeDirection=S>0?"prev":"next",s.touchesDirection=N>0?"prev":"next";const L=s.params.loop&&!l.cssMode,E=s.touchesDirection==="next"&&s.allowSlideNext||s.touchesDirection==="prev"&&s.allowSlidePrev;if(!a.isMoved){if(L&&E&&s.loopFix({direction:s.swipeDirection}),a.startTranslate=s.getTranslate(),s.setTransition(0),s.animating){const M=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0,detail:{bySwiperTouchMove:!0}});s.wrapperEl.dispatchEvent(M)}a.allowMomentumBounce=!1,l.grabCursor&&(s.allowSlideNext===!0||s.allowSlidePrev===!0)&&s.setGrabCursor(!0),s.emit("sliderFirstMove",p)}if(new Date().getTime(),l._loopSwapReset!==!1&&a.isMoved&&a.allowThresholdMove&&T!==s.touchesDirection&&L&&E&&Math.abs(S)>=1){Object.assign(c,{startX:g,startY:v,currentX:g,currentY:v,startTranslate:a.currentTranslate}),a.loopSwapReset=!0,a.startTranslate=a.currentTranslate;return}s.emit("sliderMove",p),a.isMoved=!0,a.currentTranslate=S+a.startTranslate;let P=!0,B=l.resistanceRatio;if(l.touchReleaseOnEdges&&(B=0),S>0?(L&&E&&a.allowThresholdMove&&a.currentTranslate>(l.centeredSlides?s.minTranslate()-s.slidesSizesGrid[s.activeIndex+1]-(l.slidesPerView!=="auto"&&s.slides.length-l.slidesPerView>=2?s.slidesSizesGrid[s.activeIndex+1]+s.params.spaceBetween:0)-s.params.spaceBetween:s.minTranslate())&&s.loopFix({direction:"prev",setTranslate:!0,activeSlideIndex:0}),a.currentTranslate>s.minTranslate()&&(P=!1,l.resistance&&(a.currentTranslate=s.minTranslate()-1+(-s.minTranslate()+a.startTranslate+S)**B))):S<0&&(L&&E&&a.allowThresholdMove&&a.currentTranslate<(l.centeredSlides?s.maxTranslate()+s.slidesSizesGrid[s.slidesSizesGrid.length-1]+s.params.spaceBetween+(l.slidesPerView!=="auto"&&s.slides.length-l.slidesPerView>=2?s.slidesSizesGrid[s.slidesSizesGrid.length-1]+s.params.spaceBetween:0):s.maxTranslate())&&s.loopFix({direction:"next",setTranslate:!0,activeSlideIndex:s.slides.length-(l.slidesPerView==="auto"?s.slidesPerViewDynamic():Math.ceil(parseFloat(l.slidesPerView,10)))}),a.currentTranslate<s.maxTranslate()&&(P=!1,l.resistance&&(a.currentTranslate=s.maxTranslate()+1-(s.maxTranslate()-a.startTranslate-S)**B))),P&&(p.preventedByNestedSwiper=!0),!s.allowSlideNext&&s.swipeDirection==="next"&&a.currentTranslate<a.startTranslate&&(a.currentTranslate=a.startTranslate),!s.allowSlidePrev&&s.swipeDirection==="prev"&&a.currentTranslate>a.startTranslate&&(a.currentTranslate=a.startTranslate),!s.allowSlidePrev&&!s.allowSlideNext&&(a.currentTranslate=a.startTranslate),l.threshold>0)if(Math.abs(S)>l.threshold||a.allowThresholdMove){if(!a.allowThresholdMove){a.allowThresholdMove=!0,c.startX=c.currentX,c.startY=c.currentY,a.currentTranslate=a.startTranslate,c.diff=s.isHorizontal()?c.currentX-c.startX:c.currentY-c.startY;return}}else{a.currentTranslate=a.startTranslate;return}!l.followFinger||l.cssMode||((l.freeMode&&l.freeMode.enabled&&s.freeMode||l.watchSlidesProgress)&&(s.updateActiveIndex(),s.updateSlidesClasses()),l.freeMode&&l.freeMode.enabled&&s.freeMode&&s.freeMode.onTouchMove(),s.updateProgress(a.currentTranslate),s.setTranslate(a.currentTranslate))}function Pb(e){const n=this,s=n.touchEventsData;let a=e;a.originalEvent&&(a=a.originalEvent);let l;if(a.type==="touchend"||a.type==="touchcancel"){if(l=[...a.changedTouches].find(M=>M.identifier===s.touchId),!l||l.identifier!==s.touchId)return}else{if(s.touchId!==null||a.pointerId!==s.pointerId)return;l=a}if(["pointercancel","pointerout","pointerleave","contextmenu"].includes(a.type)&&!(["pointercancel","contextmenu"].includes(a.type)&&(n.browser.isSafari||n.browser.isWebView)))return;s.pointerId=null,s.touchId=null;const{params:u,touches:f,rtlTranslate:p,slidesGrid:m,enabled:g}=n;if(!g||!u.simulateTouch&&a.pointerType==="mouse")return;if(s.allowTouchCallbacks&&n.emit("touchEnd",a),s.allowTouchCallbacks=!1,!s.isTouched){s.isMoved&&u.grabCursor&&n.setGrabCursor(!1),s.isMoved=!1,s.startMoving=!1;return}u.grabCursor&&s.isMoved&&s.isTouched&&(n.allowSlideNext===!0||n.allowSlidePrev===!0)&&n.setGrabCursor(!1);const v=to(),b=v-s.touchStartTime;if(n.allowClick){const M=a.path||a.composedPath&&a.composedPath();n.updateClickedSlide(M&&M[0]||a.target,M),n.emit("tap click",a),b<300&&v-s.lastClickTime<300&&n.emit("doubleTap doubleClick",a)}if(s.lastClickTime=to(),wm(()=>{n.destroyed||(n.allowClick=!0)}),!s.isTouched||!s.isMoved||!n.swipeDirection||f.diff===0&&!s.loopSwapReset||s.currentTranslate===s.startTranslate&&!s.loopSwapReset){s.isTouched=!1,s.isMoved=!1,s.startMoving=!1;return}s.isTouched=!1,s.isMoved=!1,s.startMoving=!1;let y;if(u.followFinger?y=p?n.translate:-n.translate:y=-s.currentTranslate,u.cssMode)return;if(u.freeMode&&u.freeMode.enabled){n.freeMode.onTouchEnd({currentPos:y});return}const S=y>=-n.maxTranslate()&&!n.params.loop;let N=0,T=n.slidesSizesGrid[0];for(let M=0;M<m.length;M+=M<u.slidesPerGroupSkip?1:u.slidesPerGroup){const F=M<u.slidesPerGroupSkip-1?1:u.slidesPerGroup;typeof m[M+F]<"u"?(S||y>=m[M]&&y<m[M+F])&&(N=M,T=m[M+F]-m[M]):(S||y>=m[M])&&(N=M,T=m[m.length-1]-m[m.length-2])}let L=null,E=null;u.rewind&&(n.isBeginning?E=u.virtual&&u.virtual.enabled&&n.virtual?n.virtual.slides.length-1:n.slides.length-1:n.isEnd&&(L=0));const P=(y-m[N])/T,B=N<u.slidesPerGroupSkip-1?1:u.slidesPerGroup;if(b>u.longSwipesMs){if(!u.longSwipes){n.slideTo(n.activeIndex);return}n.swipeDirection==="next"&&(P>=u.longSwipesRatio?n.slideTo(u.rewind&&n.isEnd?L:N+B):n.slideTo(N)),n.swipeDirection==="prev"&&(P>1-u.longSwipesRatio?n.slideTo(N+B):E!==null&&P<0&&Math.abs(P)>u.longSwipesRatio?n.slideTo(E):n.slideTo(N))}else{if(!u.shortSwipes){n.slideTo(n.activeIndex);return}n.navigation&&(a.target===n.navigation.nextEl||a.target===n.navigation.prevEl)?a.target===n.navigation.nextEl?n.slideTo(N+B):n.slideTo(N):(n.swipeDirection==="next"&&n.slideTo(L!==null?L:N+B),n.swipeDirection==="prev"&&n.slideTo(E!==null?E:N))}}function Df(){const e=this,{params:n,el:s}=e;if(s&&s.offsetWidth===0)return;n.breakpoints&&e.setBreakpoint();const{allowSlideNext:a,allowSlidePrev:l,snapGrid:c}=e,u=e.virtual&&e.params.virtual.enabled;e.allowSlideNext=!0,e.allowSlidePrev=!0,e.updateSize(),e.updateSlides(),e.updateSlidesClasses();const f=u&&n.loop;(n.slidesPerView==="auto"||n.slidesPerView>1)&&e.isEnd&&!e.isBeginning&&!e.params.centeredSlides&&!f?e.slideTo(e.slides.length-1,0,!1,!0):e.params.loop&&!u?e.slideToLoop(e.realIndex,0,!1,!0):e.slideTo(e.activeIndex,0,!1,!0),e.autoplay&&e.autoplay.running&&e.autoplay.paused&&(clearTimeout(e.autoplay.resizeTimeout),e.autoplay.resizeTimeout=setTimeout(()=>{e.autoplay&&e.autoplay.running&&e.autoplay.paused&&e.autoplay.resume()},500)),e.allowSlidePrev=l,e.allowSlideNext=a,e.params.watchOverflow&&c!==e.snapGrid&&e.checkOverflow()}function Mb(e){const n=this;n.enabled&&(n.allowClick||(n.params.preventClicks&&e.preventDefault(),n.params.preventClicksPropagation&&n.animating&&(e.stopPropagation(),e.stopImmediatePropagation())))}function Ab(){const e=this,{wrapperEl:n,rtlTranslate:s,enabled:a}=e;if(!a)return;e.previousTranslate=e.translate,e.isHorizontal()?e.translate=-n.scrollLeft:e.translate=-n.scrollTop,e.translate===0&&(e.translate=0),e.updateActiveIndex(),e.updateSlidesClasses();let l;const c=e.maxTranslate()-e.minTranslate();c===0?l=0:l=(e.translate-e.minTranslate())/c,l!==e.progress&&e.updateProgress(s?-e.translate:e.translate),e.emit("setTranslate",e.translate,!1)}function Lb(e){const n=this;Ya(n,e.target),!(n.params.cssMode||n.params.slidesPerView!=="auto"&&!n.params.autoHeight)&&n.update()}function Db(){const e=this;e.documentTouchHandlerProceeded||(e.documentTouchHandlerProceeded=!0,e.params.touchReleaseOnEdges&&(e.el.style.touchAction="auto"))}const zm=(e,n)=>{const s=nn(),{params:a,el:l,wrapperEl:c,device:u}=e,f=!!a.nested,p=n==="on"?"addEventListener":"removeEventListener",m=n;!l||typeof l=="string"||(s[p]("touchstart",e.onDocumentTouchStart,{passive:!1,capture:f}),l[p]("touchstart",e.onTouchStart,{passive:!1}),l[p]("pointerdown",e.onTouchStart,{passive:!1}),s[p]("touchmove",e.onTouchMove,{passive:!1,capture:f}),s[p]("pointermove",e.onTouchMove,{passive:!1,capture:f}),s[p]("touchend",e.onTouchEnd,{passive:!0}),s[p]("pointerup",e.onTouchEnd,{passive:!0}),s[p]("pointercancel",e.onTouchEnd,{passive:!0}),s[p]("touchcancel",e.onTouchEnd,{passive:!0}),s[p]("pointerout",e.onTouchEnd,{passive:!0}),s[p]("pointerleave",e.onTouchEnd,{passive:!0}),s[p]("contextmenu",e.onTouchEnd,{passive:!0}),(a.preventClicks||a.preventClicksPropagation)&&l[p]("click",e.onClick,!0),a.cssMode&&c[p]("scroll",e.onScroll),a.updateOnWindowResize?e[m](u.ios||u.android?"resize orientationchange observerUpdate":"resize observerUpdate",Df,!0):e[m]("observerUpdate",Df,!0),l[p]("load",e.onLoad,{capture:!0}))};function Fb(){const e=this,{params:n}=e;e.onTouchStart=zb.bind(e),e.onTouchMove=Eb.bind(e),e.onTouchEnd=Pb.bind(e),e.onDocumentTouchStart=Db.bind(e),n.cssMode&&(e.onScroll=Ab.bind(e)),e.onClick=Mb.bind(e),e.onLoad=Lb.bind(e),zm(e,"on")}function Rb(){zm(this,"off")}var Ib={attachEvents:Fb,detachEvents:Rb};const Ff=(e,n)=>e.grid&&n.grid&&n.grid.rows>1;function Ob(){const e=this,{realIndex:n,initialized:s,params:a,el:l}=e,c=a.breakpoints;if(!c||c&&Object.keys(c).length===0)return;const u=nn(),f=a.breakpointsBase==="window"||!a.breakpointsBase?a.breakpointsBase:"container",p=["window","container"].includes(a.breakpointsBase)||!a.breakpointsBase?e.el:u.querySelector(a.breakpointsBase),m=e.getBreakpoint(c,f,p);if(!m||e.currentBreakpoint===m)return;const v=(m in c?c[m]:void 0)||e.originalParams,b=Ff(e,a),y=Ff(e,v),S=e.params.grabCursor,N=v.grabCursor,T=a.enabled;b&&!y?(l.classList.remove(`${a.containerModifierClass}grid`,`${a.containerModifierClass}grid-column`),e.emitContainerClasses()):!b&&y&&(l.classList.add(`${a.containerModifierClass}grid`),(v.grid.fill&&v.grid.fill==="column"||!v.grid.fill&&a.grid.fill==="column")&&l.classList.add(`${a.containerModifierClass}grid-column`),e.emitContainerClasses()),S&&!N?e.unsetGrabCursor():!S&&N&&e.setGrabCursor(),["navigation","pagination","scrollbar"].forEach(F=>{if(typeof v[F]>"u")return;const _=a[F]&&a[F].enabled,D=v[F]&&v[F].enabled;_&&!D&&e[F].disable(),!_&&D&&e[F].enable()});const L=v.direction&&v.direction!==a.direction,E=a.loop&&(v.slidesPerView!==a.slidesPerView||L),P=a.loop;L&&s&&e.changeDirection(),Ct(e.params,v);const B=e.params.enabled,M=e.params.loop;Object.assign(e,{allowTouchMove:e.params.allowTouchMove,allowSlideNext:e.params.allowSlideNext,allowSlidePrev:e.params.allowSlidePrev}),T&&!B?e.disable():!T&&B&&e.enable(),e.currentBreakpoint=m,e.emit("_beforeBreakpoint",v),s&&(E?(e.loopDestroy(),e.loopCreate(n),e.updateSlides()):!P&&M?(e.loopCreate(n),e.updateSlides()):P&&!M&&e.loopDestroy()),e.emit("breakpoint",v)}function Vb(e,n="window",s){if(!e||n==="container"&&!s)return;let a=!1;const l=ft(),c=n==="window"?l.innerHeight:s.clientHeight,u=Object.keys(e).map(f=>{if(typeof f=="string"&&f.indexOf("@")===0){const p=parseFloat(f.substr(1));return{value:c*p,point:f}}return{value:f,point:f}});u.sort((f,p)=>parseInt(f.value,10)-parseInt(p.value,10));for(let f=0;f<u.length;f+=1){const{point:p,value:m}=u[f];n==="window"?l.matchMedia(`(min-width: ${m}px)`).matches&&(a=p):m<=s.clientWidth&&(a=p)}return a||"max"}var Bb={setBreakpoint:Ob,getBreakpoint:Vb};function _b(e,n){const s=[];return e.forEach(a=>{typeof a=="object"?Object.keys(a).forEach(l=>{a[l]&&s.push(n+l)}):typeof a=="string"&&s.push(n+a)}),s}function Wb(){const e=this,{classNames:n,params:s,rtl:a,el:l,device:c}=e,u=_b(["initialized",s.direction,{"free-mode":e.params.freeMode&&s.freeMode.enabled},{autoheight:s.autoHeight},{rtl:a},{grid:s.grid&&s.grid.rows>1},{"grid-column":s.grid&&s.grid.rows>1&&s.grid.fill==="column"},{android:c.android},{ios:c.ios},{"css-mode":s.cssMode},{centered:s.cssMode&&s.centeredSlides},{"watch-progress":s.watchSlidesProgress}],s.containerModifierClass);n.push(...u),l.classList.add(...n),e.emitContainerClasses()}function Ub(){const e=this,{el:n,classNames:s}=e;!n||typeof n=="string"||(n.classList.remove(...s),e.emitContainerClasses())}var Yb={addClasses:Wb,removeClasses:Ub};function $b(){const e=this,{isLocked:n,params:s}=e,{slidesOffsetBefore:a}=s;if(a){const l=e.slides.length-1,c=e.slidesGrid[l]+e.slidesSizesGrid[l]+a*2;e.isLocked=e.size>c}else e.isLocked=e.snapGrid.length===1;s.allowSlideNext===!0&&(e.allowSlideNext=!e.isLocked),s.allowSlidePrev===!0&&(e.allowSlidePrev=!e.isLocked),n&&n!==e.isLocked&&(e.isEnd=!1),n!==e.isLocked&&e.emit(e.isLocked?"lock":"unlock")}var Hb={checkOverflow:$b},Xc={init:!0,direction:"horizontal",oneWayMovement:!1,swiperElementNodeName:"SWIPER-CONTAINER",touchEventsTarget:"wrapper",initialSlide:0,speed:300,cssMode:!1,updateOnWindowResize:!0,resizeObserver:!0,nested:!1,createElements:!1,eventsPrefix:"swiper",enabled:!0,focusableElements:"input, select, option, textarea, button, video, label",width:null,height:null,preventInteractionOnTransition:!1,userAgent:null,url:null,edgeSwipeDetection:!1,edgeSwipeThreshold:20,autoHeight:!1,setWrapperSize:!1,virtualTranslate:!1,effect:"slide",breakpoints:void 0,breakpointsBase:"window",spaceBetween:0,slidesPerView:1,slidesPerGroup:1,slidesPerGroupSkip:0,slidesPerGroupAuto:!1,centeredSlides:!1,centeredSlidesBounds:!1,slidesOffsetBefore:0,slidesOffsetAfter:0,normalizeSlideIndex:!0,centerInsufficientSlides:!1,watchOverflow:!0,roundLengths:!1,touchRatio:1,touchAngle:45,simulateTouch:!0,shortSwipes:!0,longSwipes:!0,longSwipesRatio:.5,longSwipesMs:300,followFinger:!0,allowTouchMove:!0,threshold:5,touchMoveStopPropagation:!1,touchStartPreventDefault:!0,touchStartForcePreventDefault:!1,touchReleaseOnEdges:!1,uniqueNavElements:!0,resistance:!0,resistanceRatio:.85,watchSlidesProgress:!1,grabCursor:!1,preventClicks:!0,preventClicksPropagation:!0,slideToClickedSlide:!1,loop:!1,loopAddBlankSlides:!0,loopAdditionalSlides:0,loopPreventsSliding:!0,rewind:!1,allowSlidePrev:!0,allowSlideNext:!0,swipeHandler:null,noSwiping:!0,noSwipingClass:"swiper-no-swiping",noSwipingSelector:null,passiveListeners:!0,maxBackfaceHiddenSlides:10,containerModifierClass:"swiper-",slideClass:"swiper-slide",slideBlankClass:"swiper-slide-blank",slideActiveClass:"swiper-slide-active",slideVisibleClass:"swiper-slide-visible",slideFullyVisibleClass:"swiper-slide-fully-visible",slideNextClass:"swiper-slide-next",slidePrevClass:"swiper-slide-prev",wrapperClass:"swiper-wrapper",lazyPreloaderClass:"swiper-lazy-preloader",lazyPreloadPrevNext:0,runCallbacksOnInit:!0,_emitClasses:!1};function Gb(e,n){return function(a={}){const l=Object.keys(a)[0],c=a[l];if(typeof c!="object"||c===null){Ct(n,a);return}if(e[l]===!0&&(e[l]={enabled:!0}),l==="navigation"&&e[l]&&e[l].enabled&&!e[l].prevEl&&!e[l].nextEl&&(e[l].auto=!0),["pagination","scrollbar"].indexOf(l)>=0&&e[l]&&e[l].enabled&&!e[l].el&&(e[l].auto=!0),!(l in e&&"enabled"in c)){Ct(n,a);return}typeof e[l]=="object"&&!("enabled"in e[l])&&(e[l].enabled=!0),e[l]||(e[l]={enabled:!1}),Ct(n,a)}}const Sc={eventsEmitter:Yv,update:tb,translate:ob,transition:ub,slide:bb,loop:kb,grabCursor:Cb,events:Ib,breakpoints:Bb,checkOverflow:Hb,classes:Yb},Nc={};let Ed=class gn{constructor(...n){let s,a;n.length===1&&n[0].constructor&&Object.prototype.toString.call(n[0]).slice(8,-1)==="Object"?a=n[0]:[s,a]=n,a||(a={}),a=Ct({},a),s&&!a.el&&(a.el=s);const l=nn();if(a.el&&typeof a.el=="string"&&l.querySelectorAll(a.el).length>1){const p=[];return l.querySelectorAll(a.el).forEach(m=>{const g=Ct({},a,{el:m});p.push(new gn(g))}),p}const c=this;c.__swiper__=!0,c.support=Sm(),c.device=Nm({userAgent:a.userAgent}),c.browser=Cm(),c.eventsListeners={},c.eventsAnyListeners=[],c.modules=[...c.__modules__],a.modules&&Array.isArray(a.modules)&&c.modules.push(...a.modules);const u={};c.modules.forEach(p=>{p({params:a,swiper:c,extendParams:Gb(a,u),on:c.on.bind(c),once:c.once.bind(c),off:c.off.bind(c),emit:c.emit.bind(c)})});const f=Ct({},Xc,u);return c.params=Ct({},f,Nc,a),c.originalParams=Ct({},c.params),c.passedParams=Ct({},a),c.params&&c.params.on&&Object.keys(c.params.on).forEach(p=>{c.on(p,c.params.on[p])}),c.params&&c.params.onAny&&c.onAny(c.params.onAny),Object.assign(c,{enabled:c.params.enabled,el:s,classNames:[],slides:[],slidesGrid:[],snapGrid:[],slidesSizesGrid:[],isHorizontal(){return c.params.direction==="horizontal"},isVertical(){return c.params.direction==="vertical"},activeIndex:0,realIndex:0,isBeginning:!0,isEnd:!1,translate:0,previousTranslate:0,progress:0,velocity:0,animating:!1,cssOverflowAdjustment(){return Math.trunc(this.translate/2**23)*2**23},allowSlideNext:c.params.allowSlideNext,allowSlidePrev:c.params.allowSlidePrev,touchEventsData:{isTouched:void 0,isMoved:void 0,allowTouchCallbacks:void 0,touchStartTime:void 0,isScrolling:void 0,currentTranslate:void 0,startTranslate:void 0,allowThresholdMove:void 0,focusableElements:c.params.focusableElements,lastClickTime:0,clickTimeout:void 0,velocities:[],allowMomentumBounce:void 0,startMoving:void 0,pointerId:null,touchId:null},allowClick:!0,allowTouchMove:c.params.allowTouchMove,touches:{startX:0,startY:0,currentX:0,currentY:0,diff:0},imagesToLoad:[],imagesLoaded:0}),c.emit("_swiper"),c.params.init&&c.init(),c}getDirectionLabel(n){return this.isHorizontal()?n:{width:"height","margin-top":"margin-left","margin-bottom ":"margin-right","margin-left":"margin-top","margin-right":"margin-bottom","padding-left":"padding-top","padding-right":"padding-bottom",marginRight:"marginBottom"}[n]}getSlideIndex(n){const{slidesEl:s,params:a}=this,l=vn(s,`.${a.slideClass}, swiper-slide`),c=Ef(l[0]);return Ef(n)-c}getSlideIndexByData(n){return this.getSlideIndex(this.slides.find(s=>s.getAttribute("data-swiper-slide-index")*1===n))}getSlideIndexWhenGrid(n){return this.grid&&this.params.grid&&this.params.grid.rows>1&&(this.params.grid.fill==="column"?n=Math.floor(n/this.params.grid.rows):this.params.grid.fill==="row"&&(n=n%Math.ceil(this.slides.length/this.params.grid.rows))),n}recalcSlides(){const n=this,{slidesEl:s,params:a}=n;n.slides=vn(s,`.${a.slideClass}, swiper-slide`)}enable(){const n=this;n.enabled||(n.enabled=!0,n.params.grabCursor&&n.setGrabCursor(),n.emit("enable"))}disable(){const n=this;n.enabled&&(n.enabled=!1,n.params.grabCursor&&n.unsetGrabCursor(),n.emit("disable"))}setProgress(n,s){const a=this;n=Math.min(Math.max(n,0),1);const l=a.minTranslate(),u=(a.maxTranslate()-l)*n+l;a.translateTo(u,typeof s>"u"?0:s),a.updateActiveIndex(),a.updateSlidesClasses()}emitContainerClasses(){const n=this;if(!n.params._emitClasses||!n.el)return;const s=n.el.className.split(" ").filter(a=>a.indexOf("swiper")===0||a.indexOf(n.params.containerModifierClass)===0);n.emit("_containerClasses",s.join(" "))}getSlideClasses(n){const s=this;return s.destroyed?"":n.className.split(" ").filter(a=>a.indexOf("swiper-slide")===0||a.indexOf(s.params.slideClass)===0).join(" ")}emitSlidesClasses(){const n=this;if(!n.params._emitClasses||!n.el)return;const s=[];n.slides.forEach(a=>{const l=n.getSlideClasses(a);s.push({slideEl:a,classNames:l}),n.emit("_slideClass",a,l)}),n.emit("_slideClasses",s)}slidesPerViewDynamic(n="current",s=!1){const a=this,{params:l,slides:c,slidesGrid:u,slidesSizesGrid:f,size:p,activeIndex:m}=a;let g=1;if(typeof l.slidesPerView=="number")return l.slidesPerView;if(l.centeredSlides){let v=c[m]?Math.ceil(c[m].swiperSlideSize):0,b;for(let y=m+1;y<c.length;y+=1)c[y]&&!b&&(v+=Math.ceil(c[y].swiperSlideSize),g+=1,v>p&&(b=!0));for(let y=m-1;y>=0;y-=1)c[y]&&!b&&(v+=c[y].swiperSlideSize,g+=1,v>p&&(b=!0))}else if(n==="current")for(let v=m+1;v<c.length;v+=1)(s?u[v]+f[v]-u[m]<p:u[v]-u[m]<p)&&(g+=1);else for(let v=m-1;v>=0;v-=1)u[m]-u[v]<p&&(g+=1);return g}update(){const n=this;if(!n||n.destroyed)return;const{snapGrid:s,params:a}=n;a.breakpoints&&n.setBreakpoint(),[...n.el.querySelectorAll('[loading="lazy"]')].forEach(u=>{u.complete&&Ya(n,u)}),n.updateSize(),n.updateSlides(),n.updateProgress(),n.updateSlidesClasses();function l(){const u=n.rtlTranslate?n.translate*-1:n.translate,f=Math.min(Math.max(u,n.maxTranslate()),n.minTranslate());n.setTranslate(f),n.updateActiveIndex(),n.updateSlidesClasses()}let c;if(a.freeMode&&a.freeMode.enabled&&!a.cssMode)l(),a.autoHeight&&n.updateAutoHeight();else{if((a.slidesPerView==="auto"||a.slidesPerView>1)&&n.isEnd&&!a.centeredSlides){const u=n.virtual&&a.virtual.enabled?n.virtual.slides:n.slides;c=n.slideTo(u.length-1,0,!1,!0)}else c=n.slideTo(n.activeIndex,0,!1,!0);c||l()}a.watchOverflow&&s!==n.snapGrid&&n.checkOverflow(),n.emit("update")}changeDirection(n,s=!0){const a=this,l=a.params.direction;return n||(n=l==="horizontal"?"vertical":"horizontal"),n===l||n!=="horizontal"&&n!=="vertical"||(a.el.classList.remove(`${a.params.containerModifierClass}${l}`),a.el.classList.add(`${a.params.containerModifierClass}${n}`),a.emitContainerClasses(),a.params.direction=n,a.slides.forEach(c=>{n==="vertical"?c.style.width="":c.style.height=""}),a.emit("changeDirection"),s&&a.update()),a}changeLanguageDirection(n){const s=this;s.rtl&&n==="rtl"||!s.rtl&&n==="ltr"||(s.rtl=n==="rtl",s.rtlTranslate=s.params.direction==="horizontal"&&s.rtl,s.rtl?(s.el.classList.add(`${s.params.containerModifierClass}rtl`),s.el.dir="rtl"):(s.el.classList.remove(`${s.params.containerModifierClass}rtl`),s.el.dir="ltr"),s.update())}mount(n){const s=this;if(s.mounted)return!0;let a=n||s.params.el;if(typeof a=="string"&&(a=document.querySelector(a)),!a)return!1;a.swiper=s,a.parentNode&&a.parentNode.host&&a.parentNode.host.nodeName===s.params.swiperElementNodeName.toUpperCase()&&(s.isElement=!0);const l=()=>`.${(s.params.wrapperClass||"").trim().split(" ").join(".")}`;let u=a&&a.shadowRoot&&a.shadowRoot.querySelector?a.shadowRoot.querySelector(l()):vn(a,l())[0];return!u&&s.params.createElements&&(u=Gc("div",s.params.wrapperClass),a.append(u),vn(a,`.${s.params.slideClass}`).forEach(f=>{u.append(f)})),Object.assign(s,{el:a,wrapperEl:u,slidesEl:s.isElement&&!a.parentNode.host.slideSlots?a.parentNode.host:u,hostEl:s.isElement?a.parentNode.host:a,mounted:!0,rtl:a.dir.toLowerCase()==="rtl"||qn(a,"direction")==="rtl",rtlTranslate:s.params.direction==="horizontal"&&(a.dir.toLowerCase()==="rtl"||qn(a,"direction")==="rtl"),wrongRTL:qn(u,"display")==="-webkit-box"}),!0}init(n){const s=this;if(s.initialized||s.mount(n)===!1)return s;s.emit("beforeInit"),s.params.breakpoints&&s.setBreakpoint(),s.addClasses(),s.updateSize(),s.updateSlides(),s.params.watchOverflow&&s.checkOverflow(),s.params.grabCursor&&s.enabled&&s.setGrabCursor(),s.params.loop&&s.virtual&&s.params.virtual.enabled?s.slideTo(s.params.initialSlide+s.virtual.slidesBefore,0,s.params.runCallbacksOnInit,!1,!0):s.slideTo(s.params.initialSlide,0,s.params.runCallbacksOnInit,!1,!0),s.params.loop&&s.loopCreate(void 0,!0),s.attachEvents();const l=[...s.el.querySelectorAll('[loading="lazy"]')];return s.isElement&&l.push(...s.hostEl.querySelectorAll('[loading="lazy"]')),l.forEach(c=>{c.complete?Ya(s,c):c.addEventListener("load",u=>{Ya(s,u.target)})}),qc(s),s.initialized=!0,qc(s),s.emit("init"),s.emit("afterInit"),s}destroy(n=!0,s=!0){const a=this,{params:l,el:c,wrapperEl:u,slides:f}=a;return typeof a.params>"u"||a.destroyed||(a.emit("beforeDestroy"),a.initialized=!1,a.detachEvents(),l.loop&&a.loopDestroy(),s&&(a.removeClasses(),c&&typeof c!="string"&&c.removeAttribute("style"),u&&u.removeAttribute("style"),f&&f.length&&f.forEach(p=>{p.classList.remove(l.slideVisibleClass,l.slideFullyVisibleClass,l.slideActiveClass,l.slideNextClass,l.slidePrevClass),p.removeAttribute("style"),p.removeAttribute("data-swiper-slide-index")})),a.emit("destroy"),Object.keys(a.eventsListeners).forEach(p=>{a.off(p)}),n!==!1&&(a.el&&typeof a.el!="string"&&(a.el.swiper=null),Ev(a)),a.destroyed=!0),null}static extendDefaults(n){Ct(Nc,n)}static get extendedDefaults(){return Nc}static get defaults(){return Xc}static installModule(n){gn.prototype.__modules__||(gn.prototype.__modules__=[]);const s=gn.prototype.__modules__;typeof n=="function"&&s.indexOf(n)<0&&s.push(n)}static use(n){return Array.isArray(n)?(n.forEach(s=>gn.installModule(s)),gn):(gn.installModule(n),gn)}};Object.keys(Sc).forEach(e=>{Object.keys(Sc[e]).forEach(n=>{Ed.prototype[n]=Sc[e][n]})});Ed.use([Wv,Uv]);const Em=["eventsPrefix","injectStyles","injectStylesUrls","modules","init","_direction","oneWayMovement","swiperElementNodeName","touchEventsTarget","initialSlide","_speed","cssMode","updateOnWindowResize","resizeObserver","nested","focusableElements","_enabled","_width","_height","preventInteractionOnTransition","userAgent","url","_edgeSwipeDetection","_edgeSwipeThreshold","_freeMode","_autoHeight","setWrapperSize","virtualTranslate","_effect","breakpoints","breakpointsBase","_spaceBetween","_slidesPerView","maxBackfaceHiddenSlides","_grid","_slidesPerGroup","_slidesPerGroupSkip","_slidesPerGroupAuto","_centeredSlides","_centeredSlidesBounds","_slidesOffsetBefore","_slidesOffsetAfter","normalizeSlideIndex","_centerInsufficientSlides","_watchOverflow","roundLengths","touchRatio","touchAngle","simulateTouch","_shortSwipes","_longSwipes","longSwipesRatio","longSwipesMs","_followFinger","allowTouchMove","_threshold","touchMoveStopPropagation","touchStartPreventDefault","touchStartForcePreventDefault","touchReleaseOnEdges","uniqueNavElements","_resistance","_resistanceRatio","_watchSlidesProgress","_grabCursor","preventClicks","preventClicksPropagation","_slideToClickedSlide","_loop","loopAdditionalSlides","loopAddBlankSlides","loopPreventsSliding","_rewind","_allowSlidePrev","_allowSlideNext","_swipeHandler","_noSwiping","noSwipingClass","noSwipingSelector","passiveListeners","containerModifierClass","slideClass","slideActiveClass","slideVisibleClass","slideFullyVisibleClass","slideNextClass","slidePrevClass","slideBlankClass","wrapperClass","lazyPreloaderClass","lazyPreloadPrevNext","runCallbacksOnInit","observer","observeParents","observeSlideChildren","a11y","_autoplay","_controller","coverflowEffect","cubeEffect","fadeEffect","flipEffect","creativeEffect","cardsEffect","hashNavigation","history","keyboard","mousewheel","_navigation","_pagination","parallax","_scrollbar","_thumbs","virtual","zoom","control"];function wi(e){return typeof e=="object"&&e!==null&&e.constructor&&Object.prototype.toString.call(e).slice(8,-1)==="Object"&&!e.__swiper__}function Ji(e,n){const s=["__proto__","constructor","prototype"];Object.keys(n).filter(a=>s.indexOf(a)<0).forEach(a=>{typeof e[a]>"u"?e[a]=n[a]:wi(n[a])&&wi(e[a])&&Object.keys(n[a]).length>0?n[a].__swiper__?e[a]=n[a]:Ji(e[a],n[a]):e[a]=n[a]})}function Pm(e={}){return e.navigation&&typeof e.navigation.nextEl>"u"&&typeof e.navigation.prevEl>"u"}function Mm(e={}){return e.pagination&&typeof e.pagination.el>"u"}function Am(e={}){return e.scrollbar&&typeof e.scrollbar.el>"u"}function Lm(e=""){const n=e.split(" ").map(a=>a.trim()).filter(a=>!!a),s=[];return n.forEach(a=>{s.indexOf(a)<0&&s.push(a)}),s.join(" ")}function qb(e=""){return e?e.includes("swiper-wrapper")?e:`swiper-wrapper ${e}`:"swiper-wrapper"}function Xb({swiper:e,slides:n,passedParams:s,changedParams:a,nextEl:l,prevEl:c,scrollbarEl:u,paginationEl:f}){const p=a.filter(D=>D!=="children"&&D!=="direction"&&D!=="wrapperClass"),{params:m,pagination:g,navigation:v,scrollbar:b,virtual:y,thumbs:S}=e;let N,T,L,E,P,B,M,F;a.includes("thumbs")&&s.thumbs&&s.thumbs.swiper&&!s.thumbs.swiper.destroyed&&m.thumbs&&(!m.thumbs.swiper||m.thumbs.swiper.destroyed)&&(N=!0),a.includes("controller")&&s.controller&&s.controller.control&&m.controller&&!m.controller.control&&(T=!0),a.includes("pagination")&&s.pagination&&(s.pagination.el||f)&&(m.pagination||m.pagination===!1)&&g&&!g.el&&(L=!0),a.includes("scrollbar")&&s.scrollbar&&(s.scrollbar.el||u)&&(m.scrollbar||m.scrollbar===!1)&&b&&!b.el&&(E=!0),a.includes("navigation")&&s.navigation&&(s.navigation.prevEl||c)&&(s.navigation.nextEl||l)&&(m.navigation||m.navigation===!1)&&v&&!v.prevEl&&!v.nextEl&&(P=!0);const _=D=>{e[D]&&(e[D].destroy(),D==="navigation"?(e.isElement&&(e[D].prevEl.remove(),e[D].nextEl.remove()),m[D].prevEl=void 0,m[D].nextEl=void 0,e[D].prevEl=void 0,e[D].nextEl=void 0):(e.isElement&&e[D].el.remove(),m[D].el=void 0,e[D].el=void 0))};a.includes("loop")&&e.isElement&&(m.loop&&!s.loop?B=!0:!m.loop&&s.loop?M=!0:F=!0),p.forEach(D=>{if(wi(m[D])&&wi(s[D]))Object.assign(m[D],s[D]),(D==="navigation"||D==="pagination"||D==="scrollbar")&&"enabled"in s[D]&&!s[D].enabled&&_(D);else{const H=s[D];(H===!0||H===!1)&&(D==="navigation"||D==="pagination"||D==="scrollbar")?H===!1&&_(D):m[D]=s[D]}}),p.includes("controller")&&!T&&e.controller&&e.controller.control&&m.controller&&m.controller.control&&(e.controller.control=m.controller.control),a.includes("children")&&n&&y&&m.virtual.enabled?(y.slides=n,y.update(!0)):a.includes("virtual")&&y&&m.virtual.enabled&&(n&&(y.slides=n),y.update(!0)),a.includes("children")&&n&&m.loop&&(F=!0),N&&S.init()&&S.update(!0),T&&(e.controller.control=m.controller.control),L&&(e.isElement&&(!f||typeof f=="string")&&(f=document.createElement("div"),f.classList.add("swiper-pagination"),f.part.add("pagination"),e.el.appendChild(f)),f&&(m.pagination.el=f),g.init(),g.render(),g.update()),E&&(e.isElement&&(!u||typeof u=="string")&&(u=document.createElement("div"),u.classList.add("swiper-scrollbar"),u.part.add("scrollbar"),e.el.appendChild(u)),u&&(m.scrollbar.el=u),b.init(),b.updateSize(),b.setTranslate()),P&&(e.isElement&&((!l||typeof l=="string")&&(l=document.createElement("div"),l.classList.add("swiper-button-next"),Mf(l,e.navigation.arrowSvg),l.part.add("button-next"),e.el.appendChild(l)),(!c||typeof c=="string")&&(c=document.createElement("div"),c.classList.add("swiper-button-prev"),Mf(c,e.navigation.arrowSvg),c.part.add("button-prev"),e.el.appendChild(c))),l&&(m.navigation.nextEl=l),c&&(m.navigation.prevEl=c),v.init(),v.update()),a.includes("allowSlideNext")&&(e.allowSlideNext=s.allowSlideNext),a.includes("allowSlidePrev")&&(e.allowSlidePrev=s.allowSlidePrev),a.includes("direction")&&e.changeDirection(s.direction,!1),(B||F)&&e.loopDestroy(),(M||F)&&e.loopCreate(),e.update()}function Kb(e={},n=!0){const s={on:{}},a={},l={};Ji(s,Xc),s._emitClasses=!0,s.init=!1;const c={},u=Em.map(p=>p.replace(/_/,"")),f=Object.assign({},e);return Object.keys(f).forEach(p=>{typeof e[p]>"u"||(u.indexOf(p)>=0?wi(e[p])?(s[p]={},l[p]={},Ji(s[p],e[p]),Ji(l[p],e[p])):(s[p]=e[p],l[p]=e[p]):p.search(/on[A-Z]/)===0&&typeof e[p]=="function"?n?a[`${p[2].toLowerCase()}${p.substr(3)}`]=e[p]:s.on[`${p[2].toLowerCase()}${p.substr(3)}`]=e[p]:c[p]=e[p])}),["navigation","pagination","scrollbar"].forEach(p=>{s[p]===!0&&(s[p]={}),s[p]===!1&&delete s[p]}),{params:s,passedParams:l,rest:c,events:a}}function Qb({el:e,nextEl:n,prevEl:s,paginationEl:a,scrollbarEl:l,swiper:c},u){Pm(u)&&n&&s&&(c.params.navigation.nextEl=n,c.originalParams.navigation.nextEl=n,c.params.navigation.prevEl=s,c.originalParams.navigation.prevEl=s),Mm(u)&&a&&(c.params.pagination.el=a,c.originalParams.pagination.el=a),Am(u)&&l&&(c.params.scrollbar.el=l,c.originalParams.scrollbar.el=l),c.init(e)}function Zb(e,n,s,a,l){const c=[];if(!n)return c;const u=p=>{c.indexOf(p)<0&&c.push(p)};if(s&&a){const p=a.map(l),m=s.map(l);p.join("")!==m.join("")&&u("children"),a.length!==s.length&&u("children")}return Em.filter(p=>p[0]==="_").map(p=>p.replace(/_/,"")).forEach(p=>{if(p in e&&p in n)if(wi(e[p])&&wi(n[p])){const m=Object.keys(e[p]),g=Object.keys(n[p]);m.length!==g.length?u(p):(m.forEach(v=>{e[p][v]!==n[p][v]&&u(p)}),g.forEach(v=>{e[p][v]!==n[p][v]&&u(p)}))}else e[p]!==n[p]&&u(p)}),c}const Jb=e=>{!e||e.destroyed||!e.params.virtual||e.params.virtual&&!e.params.virtual.enabled||(e.updateSlides(),e.updateProgress(),e.updateSlidesClasses(),e.emit("_virtualUpdated"),e.parallax&&e.params.parallax&&e.params.parallax.enabled&&e.parallax.setTranslate())};function io(){return io=Object.assign?Object.assign.bind():function(e){for(var n=1;n<arguments.length;n++){var s=arguments[n];for(var a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a])}return e},io.apply(this,arguments)}function Dm(e){return e.type&&e.type.displayName&&e.type.displayName.includes("SwiperSlide")}function Fm(e){const n=[];return Ce.Children.toArray(e).forEach(s=>{Dm(s)?n.push(s):s.props&&s.props.children&&Fm(s.props.children).forEach(a=>n.push(a))}),n}function ey(e){const n=[],s={"container-start":[],"container-end":[],"wrapper-start":[],"wrapper-end":[]};return Ce.Children.toArray(e).forEach(a=>{if(Dm(a))n.push(a);else if(a.props&&a.props.slot&&s[a.props.slot])s[a.props.slot].push(a);else if(a.props&&a.props.children){const l=Fm(a.props.children);l.length>0?l.forEach(c=>n.push(c)):s["container-end"].push(a)}else s["container-end"].push(a)}),{slides:n,slots:s}}function ty(e,n,s){if(!s)return null;const a=g=>{let v=g;return g<0?v=n.length+g:v>=n.length&&(v=v-n.length),v},l=e.isHorizontal()?{[e.rtlTranslate?"right":"left"]:`${s.offset}px`}:{top:`${s.offset}px`},{from:c,to:u}=s,f=e.params.loop?-n.length:0,p=e.params.loop?n.length*2:n.length,m=[];for(let g=f;g<p;g+=1)g>=c&&g<=u&&m.push(n[a(g)]);return m.map((g,v)=>Ce.cloneElement(g,{swiper:e,style:l,key:g.props.virtualIndex||g.key||`slide-${v}`}))}function ts(e,n){return typeof window>"u"?j.useEffect(e,n):j.useLayoutEffect(e,n)}const Rf=j.createContext(null),ny=j.createContext(null),Rm=j.forwardRef(({className:e,tag:n="div",wrapperTag:s="div",children:a,onSwiper:l,...c}={},u)=>{let f=!1;const[p,m]=j.useState("swiper"),[g,v]=j.useState(null),[b,y]=j.useState(!1),S=j.useRef(!1),N=j.useRef(null),T=j.useRef(null),L=j.useRef(null),E=j.useRef(null),P=j.useRef(null),B=j.useRef(null),M=j.useRef(null),F=j.useRef(null),{params:_,passedParams:D,rest:H,events:Y}=Kb(c),{slides:X,slots:re}=ey(a),ue=()=>{y(!b)};Object.assign(_.on,{_containerClasses(O,G){m(G)}});const me=()=>{Object.assign(_.on,Y),f=!0;const O={..._};if(delete O.wrapperClass,T.current=new Ed(O),T.current.virtual&&T.current.params.virtual.enabled){T.current.virtual.slides=X;const G={cache:!1,slides:X,renderExternal:v,renderExternalUpdate:!1};Ji(T.current.params.virtual,G),Ji(T.current.originalParams.virtual,G)}};N.current||me(),T.current&&T.current.on("_beforeBreakpoint",ue);const we=()=>{f||!Y||!T.current||Object.keys(Y).forEach(O=>{T.current.on(O,Y[O])})},Ie=()=>{!Y||!T.current||Object.keys(Y).forEach(O=>{T.current.off(O,Y[O])})};j.useEffect(()=>()=>{T.current&&T.current.off("_beforeBreakpoint",ue)}),j.useEffect(()=>{!S.current&&T.current&&(T.current.emitSlidesClasses(),S.current=!0)}),ts(()=>{if(u&&(u.current=N.current),!!N.current)return T.current.destroyed&&me(),Qb({el:N.current,nextEl:P.current,prevEl:B.current,paginationEl:M.current,scrollbarEl:F.current,swiper:T.current},_),l&&!T.current.destroyed&&l(T.current),()=>{T.current&&!T.current.destroyed&&T.current.destroy(!0,!1)}},[]),ts(()=>{we();const O=Zb(D,L.current,X,E.current,G=>G.key);return L.current=D,E.current=X,O.length&&T.current&&!T.current.destroyed&&Xb({swiper:T.current,slides:X,passedParams:D,changedParams:O,nextEl:P.current,prevEl:B.current,scrollbarEl:F.current,paginationEl:M.current}),()=>{Ie()}}),ts(()=>{Jb(T.current)},[g]);function Z(){return _.virtual?ty(T.current,X,g):X.map((O,G)=>Ce.cloneElement(O,{swiper:T.current,swiperSlideIndex:G}))}return Ce.createElement(n,io({ref:N,className:Lm(`${p}${e?` ${e}`:""}`)},H),Ce.createElement(ny.Provider,{value:T.current},re["container-start"],Ce.createElement(s,{className:qb(_.wrapperClass)},re["wrapper-start"],Z(),re["wrapper-end"]),Pm(_)&&Ce.createElement(Ce.Fragment,null,Ce.createElement("div",{ref:B,className:"swiper-button-prev"}),Ce.createElement("div",{ref:P,className:"swiper-button-next"})),Am(_)&&Ce.createElement("div",{ref:F,className:"swiper-scrollbar"}),Mm(_)&&Ce.createElement("div",{ref:M,className:"swiper-pagination"}),re["container-end"]))});Rm.displayName="Swiper";const Im=j.forwardRef(({tag:e="div",children:n,className:s="",swiper:a,zoom:l,lazy:c,virtualIndex:u,swiperSlideIndex:f,...p}={},m)=>{const g=j.useRef(null),[v,b]=j.useState("swiper-slide"),[y,S]=j.useState(!1);function N(P,B,M){B===g.current&&b(M)}ts(()=>{if(typeof f<"u"&&(g.current.swiperSlideIndex=f),m&&(m.current=g.current),!(!g.current||!a)){if(a.destroyed){v!=="swiper-slide"&&b("swiper-slide");return}return a.on("_slideClass",N),()=>{a&&a.off("_slideClass",N)}}}),ts(()=>{a&&g.current&&!a.destroyed&&b(a.getSlideClasses(g.current))},[a]);const T={isActive:v.indexOf("swiper-slide-active")>=0,isVisible:v.indexOf("swiper-slide-visible")>=0,isPrev:v.indexOf("swiper-slide-prev")>=0,isNext:v.indexOf("swiper-slide-next")>=0},L=()=>typeof n=="function"?n(T):n,E=()=>{S(!0)};return Ce.createElement(e,io({ref:g,className:Lm(`${v}${s?` ${s}`:""}`),"data-swiper-slide-index":u,onLoad:E},p),l&&Ce.createElement(Rf.Provider,{value:T},Ce.createElement("div",{className:"swiper-zoom-container","data-swiper-zoom":typeof l=="number"?l:void 0},L(),c&&!y&&Ce.createElement("div",{className:"swiper-lazy-preloader"}))),!l&&Ce.createElement(Rf.Provider,{value:T},L(),c&&!y&&Ce.createElement("div",{className:"swiper-lazy-preloader"})))});Im.displayName="SwiperSlide";function iy({swiper:e,extendParams:n,on:s,emit:a,params:l}){e.autoplay={running:!1,paused:!1,timeLeft:0},n({autoplay:{enabled:!1,delay:3e3,waitForTransition:!0,disableOnInteraction:!1,stopOnLastSlide:!1,reverseDirection:!1,pauseOnMouseEnter:!1}});let c,u,f=l&&l.autoplay?l.autoplay.delay:3e3,p=l&&l.autoplay?l.autoplay.delay:3e3,m,g=new Date().getTime(),v,b,y,S,N,T,L;function E(Z){!e||e.destroyed||!e.wrapperEl||Z.target===e.wrapperEl&&(e.wrapperEl.removeEventListener("transitionend",E),!(L||Z.detail&&Z.detail.bySwiperTouchMove)&&H())}const P=()=>{if(e.destroyed||!e.autoplay.running)return;e.autoplay.paused?v=!0:v&&(p=m,v=!1);const Z=e.autoplay.paused?m:g+p-new Date().getTime();e.autoplay.timeLeft=Z,a("autoplayTimeLeft",Z,Z/f),u=requestAnimationFrame(()=>{P()})},B=()=>{let Z;return e.virtual&&e.params.virtual.enabled?Z=e.slides.find(G=>G.classList.contains("swiper-slide-active")):Z=e.slides[e.activeIndex],Z?parseInt(Z.getAttribute("data-swiper-autoplay"),10):void 0},M=Z=>{if(e.destroyed||!e.autoplay.running)return;cancelAnimationFrame(u),P();let O=typeof Z>"u"?e.params.autoplay.delay:Z;f=e.params.autoplay.delay,p=e.params.autoplay.delay;const G=B();!Number.isNaN(G)&&G>0&&typeof Z>"u"&&(O=G,f=G,p=G),m=O;const C=e.params.speed,W=()=>{!e||e.destroyed||(e.params.autoplay.reverseDirection?!e.isBeginning||e.params.loop||e.params.rewind?(e.slidePrev(C,!0,!0),a("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(e.slides.length-1,C,!0,!0),a("autoplay")):!e.isEnd||e.params.loop||e.params.rewind?(e.slideNext(C,!0,!0),a("autoplay")):e.params.autoplay.stopOnLastSlide||(e.slideTo(0,C,!0,!0),a("autoplay")),e.params.cssMode&&(g=new Date().getTime(),requestAnimationFrame(()=>{M()})))};return O>0?(clearTimeout(c),c=setTimeout(()=>{W()},O)):requestAnimationFrame(()=>{W()}),O},F=()=>{g=new Date().getTime(),e.autoplay.running=!0,M(),a("autoplayStart")},_=()=>{e.autoplay.running=!1,clearTimeout(c),cancelAnimationFrame(u),a("autoplayStop")},D=(Z,O)=>{if(e.destroyed||!e.autoplay.running)return;clearTimeout(c),Z||(T=!0);const G=()=>{a("autoplayPause"),e.params.autoplay.waitForTransition?e.wrapperEl.addEventListener("transitionend",E):H()};if(e.autoplay.paused=!0,O){N&&(m=e.params.autoplay.delay),N=!1,G();return}m=(m||e.params.autoplay.delay)-(new Date().getTime()-g),!(e.isEnd&&m<0&&!e.params.loop)&&(m<0&&(m=0),G())},H=()=>{e.isEnd&&m<0&&!e.params.loop||e.destroyed||!e.autoplay.running||(g=new Date().getTime(),T?(T=!1,M(m)):M(),e.autoplay.paused=!1,a("autoplayResume"))},Y=()=>{if(e.destroyed||!e.autoplay.running)return;const Z=nn();Z.visibilityState==="hidden"&&(T=!0,D(!0)),Z.visibilityState==="visible"&&H()},X=Z=>{Z.pointerType==="mouse"&&(T=!0,L=!0,!(e.animating||e.autoplay.paused)&&D(!0))},re=Z=>{Z.pointerType==="mouse"&&(L=!1,e.autoplay.paused&&H())},ue=()=>{e.params.autoplay.pauseOnMouseEnter&&(e.el.addEventListener("pointerenter",X),e.el.addEventListener("pointerleave",re))},me=()=>{e.el&&typeof e.el!="string"&&(e.el.removeEventListener("pointerenter",X),e.el.removeEventListener("pointerleave",re))},we=()=>{nn().addEventListener("visibilitychange",Y)},Ie=()=>{nn().removeEventListener("visibilitychange",Y)};s("init",()=>{e.params.autoplay.enabled&&(ue(),we(),F())}),s("destroy",()=>{me(),Ie(),e.autoplay.running&&_()}),s("_freeModeStaticRelease",()=>{(y||T)&&H()}),s("_freeModeNoMomentumRelease",()=>{e.params.autoplay.disableOnInteraction?_():D(!0,!0)}),s("beforeTransitionStart",(Z,O,G)=>{e.destroyed||!e.autoplay.running||(G||!e.params.autoplay.disableOnInteraction?D(!0,!0):_())}),s("sliderFirstMove",()=>{if(!(e.destroyed||!e.autoplay.running)){if(e.params.autoplay.disableOnInteraction){_();return}b=!0,y=!1,T=!1,S=setTimeout(()=>{T=!0,y=!0,D(!0)},200)}}),s("touchEnd",()=>{if(!(e.destroyed||!e.autoplay.running||!b)){if(clearTimeout(S),clearTimeout(c),e.params.autoplay.disableOnInteraction){y=!1,b=!1;return}y&&e.params.cssMode&&H(),y=!1,b=!1}}),s("slideChange",()=>{e.destroyed||!e.autoplay.running||(N=!0)}),Object.assign(e.autoplay,{start:F,stop:_,pause:D,resume:H})}function ry(e){const{effect:n,swiper:s,on:a,setTranslate:l,setTransition:c,overwriteParams:u,perspective:f,recreateShadows:p,getEffectParams:m}=e;a("beforeInit",()=>{if(s.params.effect!==n)return;s.classNames.push(`${s.params.containerModifierClass}${n}`),f&&f()&&s.classNames.push(`${s.params.containerModifierClass}3d`);const v=u?u():{};Object.assign(s.params,v),Object.assign(s.originalParams,v)}),a("setTranslate _virtualUpdated",()=>{s.params.effect===n&&l()}),a("setTransition",(v,b)=>{s.params.effect===n&&c(b)}),a("transitionEnd",()=>{if(s.params.effect===n&&p){if(!m||!m().slideShadows)return;s.slides.forEach(v=>{v.querySelectorAll(".swiper-slide-shadow-top, .swiper-slide-shadow-right, .swiper-slide-shadow-bottom, .swiper-slide-shadow-left").forEach(b=>b.remove())}),p()}});let g;a("virtualUpdate",()=>{s.params.effect===n&&(s.slides.length||(g=!0),requestAnimationFrame(()=>{g&&s.slides&&s.slides.length&&(l(),g=!1)}))})}function sy(e,n){const s=km(n);return s!==n&&(s.style.backfaceVisibility="hidden",s.style["-webkit-backface-visibility"]="hidden"),s}function ay({swiper:e,duration:n,transformElements:s,allSlides:a}){const{activeIndex:l}=e;if(e.params.virtualTranslate&&n!==0){let c=!1,u;u=s,u.forEach(f=>{Ov(f,()=>{if(c||!e||e.destroyed)return;c=!0,e.animating=!1;const p=new window.CustomEvent("transitionend",{bubbles:!0,cancelable:!0});e.wrapperEl.dispatchEvent(p)})})}}function oy({swiper:e,extendParams:n,on:s}){n({fadeEffect:{crossFade:!1}}),ry({effect:"fade",swiper:e,on:s,setTranslate:()=>{const{slides:c}=e,u=e.params.fadeEffect;for(let f=0;f<c.length;f+=1){const p=e.slides[f];let g=-p.swiperSlideOffset;e.params.virtualTranslate||(g-=e.translate);let v=0;e.isHorizontal()||(v=g,g=0);const b=e.params.fadeEffect.crossFade?Math.max(1-Math.abs(p.progress),0):1+Math.min(Math.max(p.progress,-1),0),y=sy(u,p);y.style.opacity=b,y.style.transform=`translate3d(${g}px, ${v}px, 0px)`}},setTransition:c=>{const u=e.slides.map(f=>km(f));u.forEach(f=>{f.style.transitionDuration=`${c}ms`}),ay({swiper:e,duration:c,transformElements:u,allSlides:!0})},overwriteParams:()=>({slidesPerView:1,slidesPerGroup:1,watchSlidesProgress:!0,spaceBetween:0,virtualTranslate:!e.params.cssMode})})}const ly="/verapixels/assets/veraintro-DUBjyMro.mp4";const cy=e=>e.replace(/([a-z0-9])([A-Z])/g,"$1-$2").toLowerCase(),dy=e=>e.replace(/^([A-Z])|[\s-_]+(\w)/g,(n,s,a)=>a?a.toUpperCase():s.toLowerCase()),If=e=>{const n=dy(e);return n.charAt(0).toUpperCase()+n.slice(1)},Om=(...e)=>e.filter((n,s,a)=>!!n&&n.trim()!==""&&a.indexOf(n)===s).join(" ").trim(),uy=e=>{for(const n in e)if(n.startsWith("aria-")||n==="role"||n==="title")return!0};var py={xmlns:"http://www.w3.org/2000/svg",width:24,height:24,viewBox:"0 0 24 24",fill:"none",stroke:"currentColor",strokeWidth:2,strokeLinecap:"round",strokeLinejoin:"round"};const fy=j.forwardRef(({color:e="currentColor",size:n=24,strokeWidth:s=2,absoluteStrokeWidth:a,className:l="",children:c,iconNode:u,...f},p)=>j.createElement("svg",{ref:p,...py,width:n,height:n,stroke:e,strokeWidth:a?Number(s)*24/Number(n):s,className:Om("lucide",l),...!c&&!uy(f)&&{"aria-hidden":"true"},...f},[...u.map(([m,g])=>j.createElement(m,g)),...Array.isArray(c)?c:[c]]));const ke=(e,n)=>{const s=j.forwardRef(({className:a,...l},c)=>j.createElement(fy,{ref:c,iconNode:n,className:Om(`lucide-${cy(If(e))}`,`lucide-${e}`,a),...l}));return s.displayName=If(e),s};const hy=[["path",{d:"M5 12h14",key:"1ays0h"}],["path",{d:"m12 5 7 7-7 7",key:"xquz4c"}]],ds=ke("arrow-right",hy);const my=[["path",{d:"M12 8V4H8",key:"hb8ula"}],["rect",{width:"16",height:"12",x:"4",y:"8",rx:"2",key:"enze0r"}],["path",{d:"M2 14h2",key:"vft8re"}],["path",{d:"M20 14h2",key:"4cs60a"}],["path",{d:"M15 13v2",key:"1xurst"}],["path",{d:"M9 13v2",key:"rq6x2g"}]],gy=ke("bot",my);const xy=[["path",{d:"M12 18V5",key:"adv99a"}],["path",{d:"M15 13a4.17 4.17 0 0 1-3-4 4.17 4.17 0 0 1-3 4",key:"1e3is1"}],["path",{d:"M17.598 6.5A3 3 0 1 0 12 5a3 3 0 1 0-5.598 1.5",key:"1gqd8o"}],["path",{d:"M17.997 5.125a4 4 0 0 1 2.526 5.77",key:"iwvgf7"}],["path",{d:"M18 18a4 4 0 0 0 2-7.464",key:"efp6ie"}],["path",{d:"M19.967 17.483A4 4 0 1 1 12 18a4 4 0 1 1-7.967-.517",key:"1gq6am"}],["path",{d:"M6 18a4 4 0 0 1-2-7.464",key:"k1g0md"}],["path",{d:"M6.003 5.125a4 4 0 0 0-2.526 5.77",key:"q97ue3"}]],Of=ke("brain",xy);const vy=[["path",{d:"M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16",key:"jecpp"}],["rect",{width:"20",height:"14",x:"2",y:"6",rx:"2",key:"i6l2r4"}]],by=ke("briefcase",vy);const yy=[["path",{d:"M21.801 10A10 10 0 1 1 17 3.335",key:"yps3ct"}],["path",{d:"m9 11 3 3L22 4",key:"1pflzl"}]],wy=ke("circle-check-big",yy);const jy=[["path",{d:"M12 6v6l4 2",key:"mmk7yg"}],["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}]],ky=ke("clock",jy);const Sy=[["path",{d:"m16 18 6-6-6-6",key:"eg8j8"}],["path",{d:"m8 6-6 6 6 6",key:"ppft3o"}]],Vm=ke("code",Sy);const Ny=[["path",{d:"M12 20v2",key:"1lh1kg"}],["path",{d:"M12 2v2",key:"tus03m"}],["path",{d:"M17 20v2",key:"1rnc9c"}],["path",{d:"M17 2v2",key:"11trls"}],["path",{d:"M2 12h2",key:"1t8f8n"}],["path",{d:"M2 17h2",key:"7oei6x"}],["path",{d:"M2 7h2",key:"asdhe0"}],["path",{d:"M20 12h2",key:"1q8mjw"}],["path",{d:"M20 17h2",key:"1fpfkl"}],["path",{d:"M20 7h2",key:"1o8tra"}],["path",{d:"M7 20v2",key:"4gnj0m"}],["path",{d:"M7 2v2",key:"1i4yhu"}],["rect",{x:"4",y:"4",width:"16",height:"16",rx:"2",key:"1vbyd7"}],["rect",{x:"8",y:"8",width:"8",height:"8",rx:"1",key:"z9xiuo"}]],Pd=ke("cpu",Ny);const Cy=[["ellipse",{cx:"12",cy:"5",rx:"9",ry:"3",key:"msslwz"}],["path",{d:"M3 5V19A9 3 0 0 0 21 19V5",key:"1wlel7"}],["path",{d:"M3 12A9 3 0 0 0 21 12",key:"mv7ke4"}]],Ty=ke("database",Cy);const zy=[["path",{d:"M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5",key:"1gvzjb"}],["path",{d:"M9 18h6",key:"x1upvd"}],["path",{d:"M10 22h4",key:"ceow96"}]],Ey=ke("lightbulb",zy);const Py=[["path",{d:"M8 3H5a2 2 0 0 0-2 2v3",key:"1dcmit"}],["path",{d:"M21 8V5a2 2 0 0 0-2-2h-3",key:"1e4gt3"}],["path",{d:"M3 16v3a2 2 0 0 0 2 2h3",key:"wsl5sc"}],["path",{d:"M16 21h3a2 2 0 0 0 2-2v-3",key:"18trek"}]],My=ke("maximize",Py);const Ay=[["path",{d:"M22 17a2 2 0 0 1-2 2H6.828a2 2 0 0 0-1.414.586l-2.202 2.202A.71.71 0 0 1 2 21.286V5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2z",key:"18887p"}]],Ly=ke("message-square",Ay);const Dy=[["path",{d:"M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z",key:"e79jfc"}],["circle",{cx:"13.5",cy:"6.5",r:".5",fill:"currentColor",key:"1okk4w"}],["circle",{cx:"17.5",cy:"10.5",r:".5",fill:"currentColor",key:"f64h9f"}],["circle",{cx:"6.5",cy:"12.5",r:".5",fill:"currentColor",key:"qy21gx"}],["circle",{cx:"8.5",cy:"7.5",r:".5",fill:"currentColor",key:"fotxhn"}]],Fy=ke("palette",Dy);const Ry=[["rect",{x:"14",y:"3",width:"5",height:"18",rx:"1",key:"kaeet6"}],["rect",{x:"5",y:"3",width:"5",height:"18",rx:"1",key:"1wsw3u"}]],Bm=ke("pause",Ry);const Iy=[["path",{d:"M5 5a2 2 0 0 1 3.008-1.728l11.997 6.998a2 2 0 0 1 .003 3.458l-12 7A2 2 0 0 1 5 19z",key:"10ikf1"}]],Kc=ke("play",Iy);const Oy=[["path",{d:"M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z",key:"m3kijz"}],["path",{d:"m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z",key:"1fmvmk"}],["path",{d:"M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0",key:"1f8sc4"}],["path",{d:"M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5",key:"qeys4"}]],Vy=ke("rocket",Oy);const By=[["path",{d:"M9.671 4.136a2.34 2.34 0 0 1 4.659 0 2.34 2.34 0 0 0 3.319 1.915 2.34 2.34 0 0 1 2.33 4.033 2.34 2.34 0 0 0 0 3.831 2.34 2.34 0 0 1-2.33 4.033 2.34 2.34 0 0 0-3.319 1.915 2.34 2.34 0 0 1-4.659 0 2.34 2.34 0 0 0-3.32-1.915 2.34 2.34 0 0 1-2.33-4.033 2.34 2.34 0 0 0 0-3.831A2.34 2.34 0 0 1 6.35 6.051a2.34 2.34 0 0 0 3.319-1.915",key:"1i5ecw"}],["circle",{cx:"12",cy:"12",r:"3",key:"1v7zrd"}]],_y=ke("settings",By);const Wy=[["path",{d:"M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z",key:"oel41y"}]],_m=ke("shield",Wy);const Uy=[["circle",{cx:"12",cy:"12",r:"10",key:"1mglay"}],["path",{d:"M8 14s1.5 2 4 2 4-2 4-2",key:"1y1vjs"}],["line",{x1:"9",x2:"9.01",y1:"9",y2:"9",key:"yxxnd0"}],["line",{x1:"15",x2:"15.01",y1:"9",y2:"9",key:"1p4y9e"}]],Yy=ke("smile",Uy);const $y=[["path",{d:"M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z",key:"1s2grr"}],["path",{d:"M20 2v4",key:"1rf3ol"}],["path",{d:"M22 4h-4",key:"gwowj6"}],["circle",{cx:"4",cy:"20",r:"2",key:"6kqj1y"}]],Hy=ke("sparkles",$y);const Gy=[["path",{d:"M16 7h6v6",key:"box55l"}],["path",{d:"m22 7-8.5 8.5-5-5L2 17",key:"1t1m79"}]],qy=ke("trending-up",Gy);const Xy=[["path",{d:"M10 14.66v1.626a2 2 0 0 1-.976 1.696A5 5 0 0 0 7 21.978",key:"1n3hpd"}],["path",{d:"M14 14.66v1.626a2 2 0 0 0 .976 1.696A5 5 0 0 1 17 21.978",key:"rfe1zi"}],["path",{d:"M18 9h1.5a1 1 0 0 0 0-5H18",key:"7xy6bh"}],["path",{d:"M4 22h16",key:"57wxv0"}],["path",{d:"M6 9a6 6 0 0 0 12 0V3a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1z",key:"1mhfuq"}],["path",{d:"M6 9H4.5a1 1 0 0 1 0-5H6",key:"tex48p"}]],Ky=ke("trophy",Xy);const Qy=[["path",{d:"M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2",key:"975kel"}],["circle",{cx:"12",cy:"7",r:"4",key:"17ys0d"}]],Zy=ke("user",Qy);const Jy=[["path",{d:"M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2",key:"1yyitq"}],["path",{d:"M16 3.128a4 4 0 0 1 0 7.744",key:"16gr8j"}],["path",{d:"M22 21v-2a4 4 0 0 0-3-3.87",key:"kshegd"}],["circle",{cx:"9",cy:"7",r:"4",key:"nufk8"}]],Wm=ke("users",Jy);const e4=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["path",{d:"M16 9a5 5 0 0 1 0 6",key:"1q6k2b"}],["path",{d:"M19.364 18.364a9 9 0 0 0 0-12.728",key:"ijwkga"}]],t4=ke("volume-2",e4);const n4=[["path",{d:"M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z",key:"uqj9uw"}],["line",{x1:"22",x2:"16",y1:"9",y2:"15",key:"1ewh16"}],["line",{x1:"16",x2:"22",y1:"9",y2:"15",key:"5ykzw1"}]],i4=ke("volume-x",n4);const r4=[["path",{d:"M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z",key:"1xq2db"}]],Md=ke("zap",r4),s4=()=>{const[e,n]=j.useState(!1),[s,a]=j.useState(!1),[l,c]=j.useState(!1),[u,f]=j.useState(!1),p=j.useRef(null),m=j.useRef(null),g=j.useRef(null),[v,b]=j.useState({projects:0,clients:0,members:0,awards:0}),y=[{icon:Md,title:"Brand",subtitle:"Creative Art & Design"},{icon:Pd,title:"Business",subtitle:"Consulting Services",featured:!0},{icon:_m,title:"Security",subtitle:"Cyber Security"},{icon:gy,title:"Automation",subtitle:"System Automation"},{icon:_y,title:"Support",subtitle:"Quick Maintenance"}],S=["MICROSOFT","GOOGLE","AMAZON","APPLE","META","NETFLIX","TESLA","NVIDIA","ADOBE","SPOTIFY"];j.useEffect(()=>{const P=new IntersectionObserver(([B])=>{B.isIntersecting&&c(!0)},{threshold:.5});return m.current&&P.observe(m.current),()=>P.disconnect()},[]),j.useEffect(()=>{const P=new IntersectionObserver(([B])=>{B.isIntersecting&&!u&&(f(!0),N())},{threshold:.5});return g.current&&P.observe(g.current),()=>P.disconnect()},[u]);const N=()=>{const P={projects:500,clients:50,members:30,awards:85},B=2e3,M=60,F=B/M;let _=0;const D=setInterval(()=>{_++;const H=_/M;b({projects:Math.floor(P.projects*H),clients:Math.floor(P.clients*H),members:Math.floor(P.members*H),awards:Math.floor(P.awards*H)}),_>=M&&(clearInterval(D),b(P))},F)},T=()=>{p.current&&(e?p.current.pause():p.current.play(),n(!e))},L=()=>{if(p.current){const P=!s;p.current.muted=P,a(P)}},E=()=>{p.current&&(document.fullscreenElement?document.exitFullscreen():p.current.requestFullscreen())};return i.jsxs("div",{className:"services-root",children:[i.jsx("section",{className:"services-hero",children:i.jsxs("div",{className:"services-container",children:[i.jsx("p",{className:"services-label",children:"LET'S EXPLORE MORE ABOUT US"}),i.jsxs("h2",{ref:m,className:`services-title ${l?"revealed":""}`,children:[i.jsx("span",{className:"title-bg",children:"WHAT WE'RE OFFERING TO"}),i.jsx("span",{className:"title-fg",children:"WHAT WE'RE OFFERING TO"})]}),i.jsxs("h2",{ref:m,className:`services-title ${l?"revealed":""}`,children:[i.jsx("span",{className:"title-bg",children:"OUR CUSTOMERS"}),i.jsx("span",{className:"title-fg",children:"OUR CUSTOMERS"})]}),i.jsx("p",{className:"services-desc",children:"In today's era, we set you up a website for your business to acquire more opportunities. We are here to provide the best services that fit your business."}),i.jsx("div",{className:"services-grid",children:y.map((P,B)=>{const M=P.icon;return i.jsxs("div",{className:`service-card ${P.featured?"featured":""}`,children:[i.jsx("div",{className:"service-icon",children:i.jsx(M,{size:48,strokeWidth:1.5})}),i.jsx("h3",{className:"service-title",children:P.title}),i.jsx("p",{className:"service-subtitle",children:P.subtitle})]},B)})})]})}),i.jsxs("section",{className:"marquee-section",children:[i.jsx("p",{className:"marquee-label",children:"Doing Things Together And You Overcome The Obstacle"}),i.jsx("div",{className:"marquee-wrapper",children:i.jsx("div",{className:"marquee-content",children:[...S,...S].map((P,B)=>i.jsx("span",{className:"marquee-item",children:P},B))})})]}),i.jsx("section",{className:"video-section",children:i.jsx("div",{className:"services-container",children:i.jsxs("div",{className:"video-grid",children:[i.jsxs("div",{className:"video-wrapper",children:[i.jsxs("div",{className:"video-badge",children:[i.jsx("div",{className:"badge-number",children:"13"}),i.jsxs("div",{className:"badge-text",children:["Years",i.jsx("br",{}),"Experience"]})]}),i.jsx("video",{ref:p,className:"custom-video",poster:"https://images.unsplash.com/photo-1542744173-8e7e53415bb0?w=800&h=600&fit=crop",onClick:T,children:i.jsx("source",{src:"https://www.w3schools.com/html/mov_bbb.mp4",type:"video/mp4"})}),i.jsx("button",{className:"video-play-btn",onClick:T,children:e?i.jsx(Bm,{size:32}):i.jsx(Kc,{size:32})}),i.jsxs("div",{className:"video-controls",children:[i.jsx("button",{className:"control-btn",onClick:L,children:s?i.jsx(i4,{size:20}):i.jsx(t4,{size:20})}),i.jsx("button",{className:"control-btn",onClick:E,children:i.jsx(My,{size:20})})]})]}),i.jsxs("div",{className:"video-content",children:[i.jsx("p",{className:"video-label",children:"GROW YOUR COMPANY WITH"}),i.jsx("h3",{className:"video-title",children:"WHAT WE'RE OFFERING TO OUR CUSTOMERS"}),i.jsx("p",{className:"video-text",children:"Our agency is a business you hire to outsource your digital marketing efforts, instead of handling in-house. They can provide your business with a variety of digital solutions."}),i.jsxs("div",{className:"video-features",children:[i.jsxs("div",{className:"feature-item",children:[i.jsx("div",{className:"feature-icon",children:i.jsx(Ey,{size:36,strokeWidth:1.5})}),i.jsxs("div",{children:[i.jsx("h4",{children:"Strategic Vision"}),i.jsx("p",{children:"Transform your business"})]})]}),i.jsxs("div",{className:"feature-item",children:[i.jsx("div",{className:"feature-icon",children:i.jsx(Vy,{size:36,strokeWidth:1.5})}),i.jsxs("div",{children:[i.jsx("h4",{children:"End-to-End Team Support"}),i.jsx("p",{children:"Dedicated team assistance"})]})]})]}),i.jsxs("div",{className:"video-info",children:[i.jsxs("div",{className:"info-avatars",children:[i.jsx("img",{src:"https://i.pravatar.cc/40?img=1",alt:"avatar"}),i.jsx("img",{src:"https://i.pravatar.cc/40?img=2",alt:"avatar"}),i.jsx("img",{src:"https://i.pravatar.cc/40?img=3",alt:"avatar"})]}),i.jsxs("div",{className:"info-text",children:[i.jsx("strong",{children:"Meet Customer"}),i.jsx("p",{children:"Our Clients Are Our Priority"})]}),i.jsxs("div",{className:"info-contact",children:[i.jsx("span",{children:"📞 CONTACT"}),i.jsx("strong",{children:"+234 000 0000"})]})]}),i.jsxs("div",{className:"video-actions",children:[i.jsx("button",{className:"action-btn primary",children:"DISCOVER"}),i.jsx("button",{className:"action-btn secondary",children:"OUR STORY"}),i.jsx("button",{className:"action-btn secondary",children:"LEARN MORE"})]})]})]})})}),i.jsx("section",{ref:g,className:"stats-section",children:i.jsxs("div",{className:"stats-grid",children:[i.jsxs("div",{className:"stat-card",children:[i.jsx("div",{className:"stat-icon",children:i.jsx(by,{size:48,strokeWidth:1.5})}),i.jsxs("div",{className:"stat-number",children:[v.projects,"K+"]}),i.jsx("div",{className:"stat-label",children:"Project Complete"})]}),i.jsxs("div",{className:"stat-card",children:[i.jsx("div",{className:"stat-icon",children:i.jsx(Yy,{size:48,strokeWidth:1.5})}),i.jsxs("div",{className:"stat-number",children:[v.clients,"K+"]}),i.jsx("div",{className:"stat-label",children:"Happy Clients"})]}),i.jsxs("div",{className:"stat-card",children:[i.jsx("div",{className:"stat-icon",children:i.jsx(Wm,{size:48,strokeWidth:1.5})}),i.jsxs("div",{className:"stat-number",children:[v.members,"K+"]}),i.jsx("div",{className:"stat-label",children:"Qualified Team"})]}),i.jsxs("div",{className:"stat-card",children:[i.jsx("div",{className:"stat-icon",children:i.jsx(Ky,{size:48,strokeWidth:1.5})}),i.jsxs("div",{className:"stat-number",children:[v.awards,"+"]}),i.jsx("div",{className:"stat-label",children:"Awards Winning"})]})]})}),i.jsx("style",{children:`
        .services-root {
          background: #000;
          color: #fff;
          overflow: hidden;
        }

        /* Services Section */
        .services-hero {
          padding: 100px 20px;
          background: linear-gradient(180deg, #000 0%, #0a0a0f 100%);
          position: relative;
        }

        .services-container {
          max-width: 1200px;
          margin: 0 auto;
        }

        .services-label {
          color: rgba(255, 255, 255, 0.5);
          font-size: 0.85rem;
          letter-spacing: 2px;
          margin-bottom: 20px;
          font-weight: 600;
        }

        .services-title {
          font-size: clamp(36px, 6vw, 72px);
          font-weight: 900;
          margin: 0 0 10px;
          position: relative;
          line-height: 1.1;
        }

        .title-bg, .title-fg {
          display: block;
        }

        .title-bg {
          color: rgba(255, 255, 255, 0.08);
          position: absolute;
          top: 0;
          left: 0;
        }

        .title-fg {
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
          clip-path: inset(0 100% 0 0);
          transition: clip-path 1.2s cubic-bezier(0.65, 0, 0.35, 1);
        }

        .services-title.revealed .title-fg {
          clip-path: inset(0 0 0 0);
        }

        .services-desc {
          max-width: 600px;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
          margin: 30px 0 60px;
          font-size: 1.05rem;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 20px;
        }

        .service-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 40px 24px;
          text-align: center;
          transition: all 0.4s ease;
          cursor: pointer;
        }

        .service-card.featured {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border: none;
          transform: scale(1.05);
        }

        .service-card:hover {
          transform: translateY(-10px);
          border-color: #6a00ff;
          box-shadow: 0 20px 60px rgba(106, 0, 255, 0.3);
        }

        .service-card.featured:hover {
          transform: scale(1.08) translateY(-10px);
        }

        .service-icon {
          margin-bottom: 20px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .service-icon svg {
          filter: drop-shadow(0 4px 12px rgba(106, 0, 255, 0.3));
        }

        .service-card.featured .service-icon svg {
          filter: drop-shadow(0 4px 12px rgba(255, 255, 255, 0.4));
        }

        .service-title {
          font-size: 1.2rem;
          font-weight: 700;
          margin: 0 0 8px;
        }

        .service-subtitle {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          margin: 0;
        }

        .service-card.featured .service-subtitle {
          color: rgba(255, 255, 255, 0.95);
        }

        /* Marquee */
        .marquee-section {
          padding: 60px 0;
          background: #000;
          border-top: 1px solid rgba(106, 0, 255, 0.2);
          border-bottom: 1px solid rgba(106, 0, 255, 0.2);
        }

        .marquee-label {
          text-align: center;
          color: rgba(255, 255, 255, 0.4);
          font-size: 0.9rem;
          margin-bottom: 30px;
        }

        .marquee-wrapper {
          overflow: hidden;
          position: relative;
        }

        .marquee-content {
          display: flex;
          gap: 80px;
          animation: marquee 30s linear infinite;
        }

        .marquee-item {
          font-size: 2rem;
          font-weight: 900;
          color: rgba(255, 255, 255, 0.15);
          white-space: nowrap;
          letter-spacing: 4px;
        }

        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }

        /* Video Section */
        .video-section {
          padding: 100px 20px;
          background: #000;
        }

        .video-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(400px, 1fr));
          gap: 60px;
          align-items: center;
        }

        .video-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(106, 0, 255, 0.3);
        }

        .video-badge {
          position: absolute;
          top: 30px;
          left: 30px;
          z-index: 10;
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          border-radius: 16px;
          padding: 20px;
          text-align: center;
          box-shadow: 0 10px 40px rgba(106, 0, 255, 0.5);
        }

        .badge-number {
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1;
        }

        .badge-text {
          font-size: 0.85rem;
          font-weight: 600;
          line-height: 1.2;
          margin-top: 5px;
        }

        .custom-video {
          width: 100%;
          height: 500px;
          object-fit: cover;
          display: block;
          cursor: pointer;
        }

        .video-play-btn {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          color: #6a00ff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(106, 0, 255, 0.4);
        }

        .video-play-btn:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 15px 60px rgba(106, 0, 255, 0.6);
        }

        .video-controls {
          position: absolute;
          bottom: 20px;
          right: 20px;
          display: flex;
          gap: 10px;
        }

        .control-btn {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff!important;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .control-btn:hover {
          background: rgba(106, 0, 255, 0.8);
          border-color: #6a00ff;
        }

        .video-content {
          padding: 20px;
        }

        .video-label {
          color: #6a00ff;
          font-size: 0.85rem;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 15px;
        }

        .video-title {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 900;
          margin: 0 0 20px;
          line-height: 1.2;
        }

        .video-text {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
          margin-bottom: 30px;
        }

        .video-features {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 30px;
        }

        .feature-item {
          display: flex;
          gap: 15px;
          align-items: flex-start;
        }

        .feature-icon {
          flex-shrink: 0;
          color: #00d4ff;
        }

        .feature-item h4 {
          margin: 0 0 5px;
          font-size: 1.1rem;
        }

        .feature-item p {
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .video-info {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.05);
          margin-bottom: 30px;
        }

        .info-avatars {
          display: flex;
        }

        .info-avatars img {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          border: 2px solid #000;
          margin-left: -10px;
        }

        .info-avatars img:first-child {
          margin-left: 0;
        }

        .info-text strong {
          display: block;
          font-size: 0.95rem;
          margin-bottom: 2px;
        }

        .info-text p {
          margin: 0;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .info-contact {
          margin-left: auto;
          text-align: right;
        }

        .info-contact span {
          display: block;
          font-size: 0.75rem;
          color: rgba(255, 255, 255, 0.5);
          margin-bottom: 5px;
        }

        .info-contact strong {
          font-size: 1rem;
          color: #00d4ff;
        }

        .video-actions {
          display: flex;
          gap: 15px;
          flex-wrap: wrap;
        }

        .action-btn {
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.3s ease;
          border: none;
        }

        .action-btn.primary {
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          color: #fff;
        }

        .action-btn.primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(106, 0, 255, 0.4);
        }

        .action-btn.secondary {
          background: rgba(255, 255, 255, 0.05);
          color: #fff;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .action-btn.secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: #6a00ff;
        }

        /* Stats Section */
        .stats-section {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          padding: 80px 20px;
        }

        .stats-grid {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
        }

        .stat-card {
          text-align: center;
        }

        .stat-icon {
          margin-bottom: 15px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .stat-icon svg {
          filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.3));
        }

        .stat-number {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 900;
          margin-bottom: 10px;
          text-shadow: 0 5px 20px rgba(0, 0, 0, 0.3);
        }

        .stat-label {
          font-size: 1rem;
          font-weight: 600;
          opacity: 0.95;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .video-grid {
            grid-template-columns: 1fr;
          }

          .services-grid {
            grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 30px;
          }

          .custom-video {
            height: 300px;
          }

          .video-info {
            flex-direction: column;
            align-items: flex-start;
            gap: 15px;
          }

          .info-contact {
            margin-left: 0;
            text-align: left;
          }
        }
      `})]})},a4=()=>{const e=[{icon:Pd,title:"We're Recognized IT Solutions Company",subtitle:"Industry Leader"},{icon:qy,title:"We're Boosting Your Business Growth",subtitle:"Proven Results"},{icon:Wm,title:"We're Leading Your Team with Care",subtitle:"Expert Support"}];return i.jsxs("div",{className:"tech-banner-root",children:[i.jsxs("div",{className:"tech-banner-container",children:[i.jsxs("div",{className:"tech-content-section",children:[i.jsxs("div",{className:"tech-content-header",children:[i.jsxs("div",{className:"tech-header-badge",children:[i.jsx(wy,{size:20}),i.jsx("span",{children:"TRUSTED BY 1000+ BUSINESSES"})]}),i.jsxs("h2",{className:"tech-main-title",children:["Why Our Technology Solutions",i.jsx("br",{}),i.jsx("span",{className:"tech-gradient-text",children:"Company Stands Out?"})]})]}),i.jsx("div",{className:"tech-reasons-list",children:e.map((n,s)=>{const a=n.icon;return i.jsxs("div",{className:"tech-reason-item",children:[i.jsx("div",{className:"tech-reason-icon",children:i.jsx(a,{size:28,strokeWidth:2})}),i.jsxs("div",{className:"tech-reason-content",children:[i.jsx("h3",{children:n.title}),i.jsx("p",{children:n.subtitle})]}),i.jsx("div",{className:"tech-reason-arrow",children:i.jsx(ds,{size:24})})]},s)})}),i.jsxs("div",{className:"tech-website-link",children:[i.jsx("span",{className:"tech-link-icon",children:"🌐"}),i.jsx("span",{className:"tech-link-text",children:"www.YourTechCompany.com"})]}),i.jsxs("div",{className:"tech-cta-section",children:[i.jsxs("div",{className:"tech-cta-content",children:[i.jsx("h3",{children:"Get The Best Source for IT Solutions and Service"}),i.jsx("p",{children:"Transform your business with cutting-edge technology solutions"})]}),i.jsxs("button",{className:"tech-cta-button",children:["Get Started",i.jsx(ds,{size:20})]})]})]}),i.jsx("div",{className:"tech-image-section",children:i.jsxs("div",{className:"tech-image-wrapper",children:[i.jsx("img",{src:"https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=900&fit=crop",alt:"Tech team collaboration",className:"tech-main-image"}),i.jsx("div",{className:"tech-image-overlay"}),i.jsxs("div",{className:"tech-floating-stat tech-stat-1",children:[i.jsx("div",{className:"tech-stat-icon",children:"💼"}),i.jsxs("div",{className:"tech-stat-content",children:[i.jsx("div",{className:"tech-stat-number",children:"500K+"}),i.jsx("div",{className:"tech-stat-label",children:"Projects"})]})]}),i.jsxs("div",{className:"tech-floating-stat tech-stat-2",children:[i.jsx("div",{className:"tech-stat-icon",children:"⚡"}),i.jsxs("div",{className:"tech-stat-content",children:[i.jsx("div",{className:"tech-stat-number",children:"99%"}),i.jsx("div",{className:"tech-stat-label",children:"Success Rate"})]})]})]})})]}),i.jsx("style",{children:`
        .tech-banner-root {
          background: #000;
          color: #fff;
          padding: 80px 20px;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .tech-banner-container {
          max-width: 1400px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        /* Content Section */
        .tech-content-section {
          padding: 40px;
        }

        .tech-content-header {
          margin-bottom: 50px;
        }

        .tech-header-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(106, 0, 255, 0.1);
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 10px 20px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 1.5px;
          color: #00d4ff;
          margin-bottom: 30px;
        }

        .tech-header-badge svg {
          color: #00d4ff;
        }

        .tech-main-title {
          font-size: clamp(32px, 4vw, 48px);
          font-weight: 900;
          line-height: 1.2;
          margin: 0;
        }

        .tech-gradient-text {
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        /* Reasons List */
        .tech-reasons-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
          margin-bottom: 40px;
        }

        .tech-reason-item {
          display: flex;
          align-items: center;
          gap: 20px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 20px;
          transition: all 0.3s ease;
          cursor: pointer;
        }

        .tech-reason-item:hover {
          background: rgba(106, 0, 255, 0.1);
          border-color: #6a00ff;
          transform: translateX(10px);
        }

        .tech-reason-icon {
          width: 60px;
          height: 60px;
          border-radius: 12px;
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .tech-reason-content {
          flex: 1;
        }

        .tech-reason-content h3 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 5px;
        }

        .tech-reason-content p {
          margin: 0;
          color: rgba(255, 255, 255, 0.6);
          font-size: 0.9rem;
        }

        .tech-reason-arrow {
          color: #00d4ff;
          opacity: 0;
          transform: translateX(-10px);
          transition: all 0.3s ease;
        }

        .tech-reason-item:hover .tech-reason-arrow {
          opacity: 1;
          transform: translateX(0);
        }

        /* Website Link */
        .tech-website-link {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.1rem;
          font-weight: 600;
          color: #00d4ff;
          margin-bottom: 50px;
          padding: 15px 0;
        }

        .tech-link-icon {
          font-size: 1.5rem;
        }

        /* CTA Section */
        .tech-cta-section {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border-radius: 20px;
          padding: 40px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
          box-shadow: 0 20px 60px rgba(106, 0, 255, 0.4);
        }

        .tech-cta-content h3 {
          font-size: 1.4rem;
          font-weight: 800;
          margin: 0 0 10px;
          line-height: 1.3;
        }

        .tech-cta-content p {
          margin: 0;
          opacity: 0.95;
          font-size: 0.95rem;
        }

        .tech-cta-button {
          background: #fff;
          color: #6a00ff;
          border: none;
          padding: 16px 32px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .tech-cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        /* Image Section */
        .tech-image-section {
          position: relative;
          height: 700px;
        }

        .tech-image-wrapper {
          position: relative;
          width: 100%;
          height: 100%;
          border-radius: 24px;
          overflow: hidden;
        }

        .tech-main-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .tech-image-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            rgba(106, 0, 255, 0.3) 0%,
            rgba(0, 212, 255, 0.3) 100%
          );
        }

        /* Floating Stats */
        .tech-floating-stat {
          position: absolute;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          padding: 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          animation: techFloat 3s ease-in-out infinite;
        }

        .tech-stat-1 {
          top: 50px;
          left: -30px;
          animation-delay: 0s;
        }

        .tech-stat-2 {
          bottom: 80px;
          right: -30px;
          animation-delay: 1.5s;
        }

        @keyframes techFloat {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }

        .tech-stat-icon {
          font-size: 2rem;
          filter: drop-shadow(0 4px 12px rgba(106, 0, 255, 0.5));
        }

        .tech-stat-number {
          font-size: 1.8rem;
          font-weight: 900;
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
        }

        .tech-stat-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.7);
          margin-top: 5px;
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .tech-banner-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .tech-image-section {
            height: 500px;
          }

          .tech-cta-section {
            flex-direction: column;
            text-align: center;
          }

          .tech-stat-1 {
            left: 20px;
          }

          .tech-stat-2 {
            right: 20px;
          }
        }

        @media (max-width: 768px) {
          .tech-banner-root {
            padding: 40px 20px;
          }

          .tech-content-section {
            padding: 20px;
          }

          .tech-cta-section {
            padding: 30px 20px;
          }

          .tech-cta-content h3 {
            font-size: 1.1rem;
          }

          .tech-reason-item {
            padding: 15px;
          }

          .tech-reason-icon {
            width: 50px;
            height: 50px;
          }
        }
      `})]})},o4=()=>{const[e,n]=j.useState(!1),[s,a]=j.useState(!1),l=j.useRef(null),c=j.useRef(null);j.useEffect(()=>{const p=new IntersectionObserver(([m])=>{m.isIntersecting&&a(!0)},{threshold:.2});return c.current&&p.observe(c.current),()=>p.disconnect()},[]);const u=()=>{l.current&&(e?(l.current.pause(),n(!1)):(l.current.play().catch(p=>{console.log("Play was prevented:",p)}),n(!0)))},f=[{icon:Of,title:"Neural Learning",description:"Advanced machine learning algorithms that adapt to your needs",color:"#6a00ff"},{icon:Ly,title:"Natural Conversations",description:"Human-like interactions powered by cutting-edge NLP",color:"#00d4ff"},{icon:_m,title:"Secure & Private",description:"Enterprise-grade security with end-to-end encryption",color:"#6a00ff"},{icon:Md,title:"Lightning Fast",description:"Real-time responses with millisecond processing speed",color:"#00d4ff"},{icon:Vm,title:"Smart Automation",description:"Automate complex workflows with intelligent decision-making",color:"#6a00ff"},{icon:Ty,title:"Data Intelligence",description:"Extract insights from massive datasets effortlessly",color:"#00d4ff"}];return i.jsxs("div",{className:"vera-ai-root",ref:c,children:[i.jsx("div",{className:"vera-bg-grid"}),i.jsx("div",{className:"vera-bg-gradient"}),i.jsxs("div",{className:"vera-ai-container",children:[i.jsxs("div",{className:`vera-ai-header ${s?"vera-animate-in":""}`,children:[i.jsxs("div",{className:"vera-status-badge",children:[i.jsx("div",{className:"vera-pulse-dot"}),i.jsx("span",{children:"IN DEVELOPMENT"})]}),i.jsxs("h1",{className:"vera-ai-title",children:["Meet ",i.jsx("span",{className:"vera-gradient-text",children:"VERA"}),i.jsx(Hy,{className:"vera-sparkle-icon",size:40})]}),i.jsx("p",{className:"vera-ai-subtitle",children:"Your Next-Generation AI Assistant"}),i.jsx("p",{className:"vera-ai-description",children:"VERA (Virtual Enhanced Reasoning Assistant) is our revolutionary AI system currently in development. Designed to transform how businesses operate, VERA combines cutting-edge artificial intelligence with intuitive design to deliver unprecedented automation and insights."})]}),i.jsxs("div",{className:"vera-content-grid",children:[i.jsx("div",{className:`vera-video-section ${s?"vera-animate-in":""}`,children:i.jsxs("div",{className:"vera-video-container",children:[i.jsxs("div",{className:"vera-video-wrapper",children:[i.jsx("video",{ref:l,className:"vera-ai-video",poster:"https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop",onClick:u,children:i.jsx("source",{src:"https://www.w3schools.com/html/mov_bbb.mp4",type:"video/mp4"})}),i.jsx("button",{className:"vera-play-button",onClick:u,children:e?i.jsx(Bm,{size:36}):i.jsx(Kc,{size:36})}),i.jsxs("div",{className:"vera-ai-indicator vera-indicator-1",children:[i.jsx(Pd,{size:20}),i.jsx("span",{children:"Processing..."})]}),i.jsxs("div",{className:"vera-ai-indicator vera-indicator-2",children:[i.jsx(Of,{size:20}),i.jsx("span",{children:"Learning"})]})]}),i.jsxs("div",{className:"vera-video-info",children:[i.jsxs("div",{className:"vera-info-badge",children:[i.jsx(Kc,{size:16}),i.jsx("span",{children:"2:30 Demo Video"})]}),i.jsx("h3",{children:"See VERA in Action"}),i.jsx("p",{children:"Watch how VERA revolutionizes business automation"})]})]})}),i.jsx("div",{className:`vera-features-section ${s?"vera-animate-in":""}`,children:i.jsx("div",{className:"vera-features-grid",children:f.map((p,m)=>{const g=p.icon;return i.jsxs("div",{className:"vera-feature-card",style:{animationDelay:`${m*.1}s`},children:[i.jsx("div",{className:"vera-feature-icon",style:{background:`linear-gradient(135deg, ${p.color}, ${p.color}dd)`},children:i.jsx(g,{size:24,strokeWidth:2})}),i.jsx("h4",{children:p.title}),i.jsx("p",{children:p.description})]},m)})})})]}),i.jsxs("div",{className:`vera-cta-section ${s?"vera-animate-in":""}`,children:[i.jsxs("div",{className:"vera-cta-content",children:[i.jsx("h2",{children:"Ready to Experience the Future?"}),i.jsx("p",{children:"Discover everything VERA can do for your business"})]}),i.jsxs("button",{className:"vera-cta-button",children:[i.jsx("span",{children:"Explore VERA"}),i.jsx(ds,{size:20})]})]}),i.jsxs("div",{className:`vera-stats-bar ${s?"vera-animate-in":""}`,children:[i.jsxs("div",{className:"vera-stat-item",children:[i.jsx("div",{className:"vera-stat-number",children:"99.9%"}),i.jsx("div",{className:"vera-stat-label",children:"Accuracy"})]}),i.jsx("div",{className:"vera-stat-divider"}),i.jsxs("div",{className:"vera-stat-item",children:[i.jsx("div",{className:"vera-stat-number",children:"<10ms"}),i.jsx("div",{className:"vera-stat-label",children:"Response Time"})]}),i.jsx("div",{className:"vera-stat-divider"}),i.jsxs("div",{className:"vera-stat-item",children:[i.jsx("div",{className:"vera-stat-number",children:"24/7"}),i.jsx("div",{className:"vera-stat-label",children:"Available"})]}),i.jsx("div",{className:"vera-stat-divider"}),i.jsxs("div",{className:"vera-stat-item",children:[i.jsx("div",{className:"vera-stat-number",children:"100+"}),i.jsx("div",{className:"vera-stat-label",children:"Languages"})]})]})]}),i.jsx("style",{children:`
        .vera-ai-root {
          background: #000;
          color: #fff;
          padding: 120px 20px;
          position: relative;
          overflow: hidden;
        }

        /* Animated Background */
        .vera-bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(106, 0, 255, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106, 0, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: veraGridMove 20s linear infinite;
        }

        @keyframes veraGridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .vera-bg-gradient {
          position: absolute;
          inset: 0;
          background: radial-gradient(
            circle at 20% 50%, 
            rgba(106, 0, 255, 0.15) 0%, 
            transparent 50%
          ),
          radial-gradient(
            circle at 80% 50%, 
            rgba(0, 212, 255, 0.15) 0%, 
            transparent 50%
          );
        }

        .vera-ai-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .vera-ai-header {
          text-align: center;
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .vera-ai-header.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
        }

        .vera-status-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(106, 0, 255, 0.1);
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 10px 24px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 30px;
        }

        .vera-pulse-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00d4ff;
          animation: veraPulse 2s ease-in-out infinite;
        }

        @keyframes veraPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.2);
          }
        }

        .vera-ai-title {
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 900;
          margin: 0 0 20px;
          position: relative;
          display: inline-block;
        }

        .vera-gradient-text {
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          position: relative;
        }

        .vera-sparkle-icon {
          position: absolute;
          top: -10px;
          right: -50px;
          color: #00d4ff;
          animation: veraSparkle 3s ease-in-out infinite;
        }

        @keyframes veraSparkle {
          0%, 100% {
            transform: rotate(0deg) scale(1);
            opacity: 0.8;
          }
          50% {
            transform: rotate(180deg) scale(1.2);
            opacity: 1;
          }
        }

        .vera-ai-subtitle {
          font-size: clamp(20px, 3vw, 32px);
          font-weight: 700;
          color: rgba(255, 255, 255, 0.9);
          margin: 0 0 30px;
        }

        .vera-ai-description {
          max-width: 800px;
          margin: 0 auto;
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Content Grid */
        .vera-content-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          margin-bottom: 80px;
        }

        .vera-video-section,
        .vera-features-section {
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .vera-video-section.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.2s;
        }

        .vera-features-section.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.4s;
        }

        /* Video Section */
        .vera-video-container {
          position: relative;
        }

        .vera-video-wrapper {
          position: relative;
          border-radius: 24px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(106, 0, 255, 0.4);
          aspect-ratio: 16/9;
        }

        .vera-ai-video {
          width: 100%;
          height: 100%;
          object-fit: cover;
          cursor: pointer;
        }

        .vera-play-button {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.95);
          border: none;
          color: #6a00ff;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(106, 0, 255, 0.4);
        }

        .vera-play-button:hover {
          transform: translate(-50%, -50%) scale(1.1);
          box-shadow: 0 15px 60px rgba(106, 0, 255, 0.6);
        }

        .vera-ai-indicator {
          position: absolute;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          border: 1px solid rgba(106, 0, 255, 0.3);
          border-radius: 12px;
          padding: 12px 16px;
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 0.85rem;
          font-weight: 600;
          animation: veraFloat 3s ease-in-out infinite;
        }

        .vera-indicator-1 {
          top: 20px;
          left: 20px;
          color: #00d4ff;
        }

        .vera-indicator-2 {
          bottom: 20px;
          right: 20px;
          color: #6a00ff;
          animation-delay: 1.5s;
        }

        @keyframes veraFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .vera-video-info {
          margin-top: 30px;
        }

        .vera-info-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(106, 0, 255, 0.1);
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 8px 16px;
          border-radius: 8px;
          font-size: 0.85rem;
          color: #00d4ff;
          margin-bottom: 15px;
        }

        .vera-video-info h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin: 0 0 10px;
        }

        .vera-video-info p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Features Grid */
        .vera-features-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
        }

        .vera-feature-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          padding: 24px;
          transition: all 0.3s ease;
          cursor: pointer;
          opacity: 0;
          animation: veraFadeInUp 0.6s ease forwards;
        }

        @keyframes veraFadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .vera-feature-card {
          transform: translateY(20px);
        }

        .vera-feature-card:hover {
          transform: translateY(-10px);
          border-color: #6a00ff;
          box-shadow: 0 20px 60px rgba(106, 0, 255, 0.3);
        }

        .vera-feature-icon {
          width: 56px;
          height: 56px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 16px;
          box-shadow: 0 10px 30px rgba(106, 0, 255, 0.3);
        }

        .vera-feature-card h4 {
          font-size: 1.1rem;
          font-weight: 700;
          margin: 0 0 10px;
        }

        .vera-feature-card p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          line-height: 1.6;
        }

        /* CTA Section */
        .vera-cta-section {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border-radius: 24px;
          padding: 60px 80px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 40px;
          box-shadow: 0 30px 80px rgba(106, 0, 255, 0.4);
          margin-bottom: 60px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .vera-cta-section.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.6s;
        }

        .vera-cta-content h2 {
          font-size: clamp(24px, 4vw, 36px);
          font-weight: 900;
          margin: 0 0 10px;
        }

        .vera-cta-content p {
          margin: 0;
          font-size: 1.1rem;
          opacity: 0.95;
        }

        .vera-cta-button {
          background: #fff;
          color: #6a00ff;
          border: none;
          padding: 20px 40px;
          border-radius: 12px;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          white-space: nowrap;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .vera-cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        /* Stats Bar */
        .vera-stats-bar {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 60px;
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .vera-stats-bar.vera-animate-in {
          opacity: 1;
          transform: translateY(0);
          transition-delay: 0.8s;
        }

        .vera-stat-item {
          text-align: center;
        }

        .vera-stat-number {
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          line-height: 1;
          margin-bottom: 10px;
        }

        .vera-stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .vera-stat-divider {
          width: 1px;
          height: 60px;
          background: rgba(255, 255, 255, 0.1);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .vera-content-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .vera-features-grid {
            grid-template-columns: 1fr;
          }

          .vera-cta-section {
            flex-direction: column;
            text-align: center;
            padding: 40px;
          }

          .vera-stats-bar {
            flex-wrap: wrap;
            gap: 30px;
          }

          .vera-stat-divider {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .vera-ai-root {
            padding: 60px 20px;
          }

          .vera-sparkle-icon {
            right: -30px;
            top: -5px;
          }

          .vera-features-grid {
            grid-template-columns: 1fr;
          }
        }
      `})]})},l4=()=>{const[e,n]=j.useState(null),[s,a]=j.useState(!1),l=j.useRef(null);j.useEffect(()=>{const u=new IntersectionObserver(([f])=>{f.isIntersecting&&a(!0)},{threshold:.2});return l.current&&u.observe(l.current),()=>u.disconnect()},[]);const c=[{id:1,title:"5 UI/UX Tricks That Make Websites Feel Premium",excerpt:"Discover the secret design patterns that top tech companies use to create luxury digital experiences that captivate users.",author:"Sarah Chen",readTime:"8 min read",date:"Oct 25, 2024",category:"Design",icon:Fy,gradient:"linear-gradient(135deg, #6a00ff 0%, #8b5cf6 100%)",image:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=400&fit=crop"},{id:2,title:"How Fast Websites Boost Business Revenue",excerpt:"Learn why website speed is directly tied to conversion rates and discover optimization techniques that increase sales.",author:"Michael Zhang",readTime:"6 min read",date:"Oct 22, 2024",category:"Performance",icon:Md,gradient:"linear-gradient(135deg, #00d4ff 0%, #0ea5e9 100%)",image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop"},{id:3,title:"The Tech Behind Smooth Animations",excerpt:"Dive deep into the frameworks and principles that power buttery-smooth animations in modern web applications.",author:"Alex Rivera",readTime:"10 min read",date:"Oct 20, 2024",category:"Development",icon:Vm,gradient:"linear-gradient(135deg, #a855f7 0%, #ec4899 100%)",image:"https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=600&h=400&fit=crop"}];return i.jsxs("div",{className:"blog-root",ref:l,children:[i.jsx("div",{className:"blog-bg-grid"}),i.jsx("div",{className:"blog-bg-orbs"}),i.jsxs("div",{className:"blog-container",children:[i.jsxs("div",{className:`blog-header ${s?"blog-fade-in":""}`,children:[i.jsxs("div",{className:"blog-badge",children:[i.jsx("div",{className:"blog-badge-dot"}),i.jsx("span",{children:"INSIGHTS & INNOVATION"})]}),i.jsxs("h2",{className:"blog-title",children:["Latest From Our ",i.jsx("span",{className:"blog-gradient-text",children:"Tech Blog"})]}),i.jsx("p",{className:"blog-subtitle",children:"Stay ahead with cutting-edge insights, tutorials, and industry trends"})]}),i.jsx("div",{className:"blog-grid",children:c.map((u,f)=>{const p=u.icon;return i.jsxs("div",{className:`blog-card ${s?"blog-fade-in":""}`,style:{animationDelay:`${f*.15}s`},onMouseEnter:()=>n(u.id),onMouseLeave:()=>n(null),children:[i.jsxs("div",{className:"blog-card-image-wrapper",children:[i.jsx("img",{src:u.image,alt:u.title,className:"blog-card-image"}),i.jsx("div",{className:"blog-card-overlay",style:{background:u.gradient}}),i.jsxs("div",{className:"blog-category-badge",children:[i.jsx(p,{size:16}),i.jsx("span",{children:u.category})]}),i.jsx("div",{className:`blog-floating-icon ${e===u.id?"blog-icon-active":""}`,style:{background:u.gradient},children:i.jsx(p,{size:32})})]}),i.jsxs("div",{className:"blog-card-content",children:[i.jsx("h3",{className:"blog-card-title",children:u.title}),i.jsx("p",{className:"blog-card-excerpt",children:u.excerpt}),i.jsxs("div",{className:"blog-card-meta",children:[i.jsxs("div",{className:"blog-meta-item",children:[i.jsx(Zy,{size:16}),i.jsx("span",{children:u.author})]}),i.jsxs("div",{className:"blog-meta-item",children:[i.jsx(ky,{size:16}),i.jsx("span",{children:u.readTime})]})]}),i.jsxs("button",{className:"blog-read-more",children:[i.jsx("span",{children:"Read Article"}),i.jsx(ds,{size:20,className:e===u.id?"blog-arrow-active":""})]})]}),i.jsx("div",{className:"blog-card-3d-layer"})]},u.id)})}),i.jsx("div",{className:`blog-cta ${s?"blog-fade-in":""}`,style:{animationDelay:"0.8s"},children:i.jsxs("button",{className:"blog-view-all-btn",children:[i.jsx("span",{children:"View All Blog Posts"}),i.jsx(ds,{size:24})]})})]}),i.jsx("style",{children:`
        .blog-root {
          background: #000;
          color: #fff;
          padding: 120px 20px;
          position: relative;
          overflow: hidden;
        }

        /* Background Effects */
        .blog-bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(106, 0, 255, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(106, 0, 255, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: blogGridMove 30s linear infinite;
        }

        @keyframes blogGridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .blog-bg-orbs {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(circle at 10% 20%, rgba(106, 0, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 90% 80%, rgba(0, 212, 255, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 50% 50%, rgba(168, 85, 247, 0.05) 0%, transparent 50%);
        }

        .blog-container {
          max-width: 1400px;
          margin: 0 auto;
          position: relative;
          z-index: 1;
        }

        /* Header */
        .blog-header {
          text-align: center;
          margin-bottom: 80px;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .blog-header.blog-fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .blog-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(106, 0, 255, 0.1);
          border: 1px solid rgba(106, 0, 255, 0.3);
          padding: 10px 24px;
          border-radius: 50px;
          font-size: 0.75rem;
          font-weight: 700;
          letter-spacing: 2px;
          margin-bottom: 30px;
        }

        .blog-badge-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #00d4ff;
          animation: blogPulse 2s ease-in-out infinite;
        }

        @keyframes blogPulse {
          0%, 100% {
            opacity: 1;
            transform: scale(1);
          }
          50% {
            opacity: 0.5;
            transform: scale(1.3);
          }
        }

        .blog-title {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          margin: 0 0 20px;
          line-height: 1.2;
        }

        .blog-gradient-text {
          background: linear-gradient(90deg, #6a00ff 0%, #00d4ff 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .blog-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          margin: 0;
        }

        /* Blog Grid */
        .blog-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
          margin-bottom: 80px;
        }

        .blog-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.05);
          border-radius: 24px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
          cursor: pointer;
          position: relative;
          opacity: 0;
          transform: translateY(30px) scale(0.95);
        }

        .blog-card.blog-fade-in {
          animation: blogCardFadeIn 0.8s ease forwards;
        }

        @keyframes blogCardFadeIn {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        .blog-card:hover {
          transform: translateY(-15px) scale(1.02);
          border-color: #6a00ff;
          box-shadow: 0 30px 80px rgba(106, 0, 255, 0.4);
        }

        /* Card Image */
        .blog-card-image-wrapper {
          position: relative;
          height: 240px;
          overflow: hidden;
        }

        .blog-card-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .blog-card:hover .blog-card-image {
          transform: scale(1.1);
        }

        .blog-card-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.5;
          transition: opacity 0.3s ease;
        }

        .blog-card:hover .blog-card-overlay {
          opacity: 0.7;
        }

        .blog-category-badge {
          position: absolute;
          top: 20px;
          left: 20px;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          padding: 8px 16px;
          border-radius: 50px;
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          font-weight: 600;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        /* 3D Floating Icon */
        .blog-floating-icon {
          position: absolute;
          bottom: -30px;
          right: 20px;
          width: 70px;
          height: 70px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
          transform: translateY(0) rotateX(0) rotateY(0);
          transition: all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .blog-floating-icon.blog-icon-active {
          transform: translateY(-20px) rotateX(-15deg) rotateY(15deg);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
        }

        /* Card Content */
        .blog-card-content {
          padding: 30px;
        }

        .blog-card-title {
          font-size: 1.4rem;
          font-weight: 800;
          margin: 0 0 15px;
          line-height: 1.3;
          color: #fff;
        }

        .blog-card-excerpt {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.7;
          margin: 0 0 20px;
        }

        /* Meta Info */
        .blog-card-meta {
          display: flex;
          gap: 20px;
          margin-bottom: 25px;
          padding-bottom: 20px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.05);
        }

        .blog-meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .blog-meta-item svg {
          color: #00d4ff;
        }

        /* Read More Button */
        .blog-read-more {
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #fff;
          padding: 12px 24px;
          border-radius: 10px;
          font-weight: 700;
          font-size: 0.95rem;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
          width: 100%;
          justify-content: center;
        }

        .blog-read-more:hover {
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          border-color: transparent;
          transform: translateY(-2px);
        }

        .blog-arrow-active {
          animation: blogArrowSlide 0.6s ease infinite;
        }

        @keyframes blogArrowSlide {
          0%, 100% { transform: translateX(0); }
          50% { transform: translateX(5px); }
        }

        /* 3D Layer Effect */
        .blog-card-3d-layer {
          position: absolute;
          inset: -2px;
          background: linear-gradient(135deg, #6a00ff, #00d4ff);
          border-radius: 24px;
          opacity: 0;
          z-index: -1;
          filter: blur(20px);
          transition: opacity 0.3s ease;
        }

        .blog-card:hover .blog-card-3d-layer {
          opacity: 0.3;
        }

        /* CTA Section */
        .blog-cta {
          text-align: center;
          opacity: 0;
          transform: translateY(30px);
          transition: all 0.8s ease;
        }

        .blog-cta.blog-fade-in {
          opacity: 1;
          transform: translateY(0);
        }

        .blog-view-all-btn {
          background: linear-gradient(135deg, #6a00ff 0%, #00d4ff 100%);
          border: none;
          color: #fff;
          padding: 20px 50px;
          border-radius: 14px;
          font-weight: 800;
          font-size: 1.1rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 15px;
          transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
          box-shadow: 0 20px 60px rgba(106, 0, 255, 0.4);
          position: relative;
          overflow: hidden;
        }

        .blog-view-all-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00d4ff 0%, #6a00ff 100%);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .blog-view-all-btn:hover::before {
          opacity: 1;
        }

        .blog-view-all-btn:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 30px 80px rgba(106, 0, 255, 0.6);
        }

        .blog-view-all-btn span {
          position: relative;
          z-index: 1;
        }

        .blog-view-all-btn svg {
          position: relative;
          z-index: 1;
          transition: transform 0.3s ease;
        }

        .blog-view-all-btn:hover svg {
          transform: translateX(5px);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 30px;
          }
        }

        @media (max-width: 768px) {
          .blog-root {
            padding: 60px 20px;
          }

          .blog-header {
            margin-bottom: 50px;
          }

          .blog-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .blog-card-content {
            padding: 25px;
          }

          .blog-view-all-btn {
            padding: 16px 40px;
            font-size: 1rem;
          }
        }
      `})]})},c4=({size:e=20})=>i.jsx("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,children:i.jsx("path",{d:"M21 15a2 2 0 0 1-2 2H8l-5 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})}),d4=({size:e=18})=>i.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,children:[i.jsx("path",{d:"M3 12h18",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}),i.jsx("path",{d:"M6 6v12",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}),i.jsx("path",{d:"M12 6v12",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"}),i.jsx("path",{d:"M18 6v12",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round"})]}),u4=({size:e=18})=>i.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,children:[i.jsx("rect",{x:"3",y:"7",width:"18",height:"13",rx:"2",stroke:"currentColor",strokeWidth:"1.4"}),i.jsx("path",{d:"M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round"})]}),p4=({size:e=18})=>i.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,children:[i.jsx("path",{d:"M21 10v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-6",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"}),i.jsx("path",{d:"M7 10V7a5 5 0 0 1 10 0v3",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})]}),f4=({size:e=18})=>i.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,children:[i.jsx("circle",{cx:"12",cy:"8",r:"1.5",stroke:"currentColor",strokeWidth:"1.4"}),i.jsx("path",{d:"M12 11v6",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round"}),i.jsx("path",{d:"M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0z",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})]}),h4=({size:e=18})=>i.jsx("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,children:i.jsx("path",{d:"M7 11a4 4 0 0 1-4 4v4h6v-4H7v-4zM17 11a4 4 0 0 1-4 4v4h6v-4h-2v-4z",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})}),m4=({size:e=16})=>i.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,children:[i.jsx("path",{d:"M22 2L11 13",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"}),i.jsx("path",{d:"M22 2L15 22l-4-9-9-4 20-7z",stroke:"currentColor",strokeWidth:"1.6",strokeLinecap:"round",strokeLinejoin:"round"})]}),g4=({size:e=16})=>i.jsxs("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,children:[i.jsx("path",{d:"M12 4v2M12 18v2M4 12h2M18 12h2M5 5l1.5 1.5M17.5 17.5L19 19M19 5l-1.5 1.5M5 19l1.5-1.5",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"}),i.jsx("circle",{cx:"12",cy:"12",r:"3",stroke:"currentColor",strokeWidth:"1.4"})]}),x4=({size:e=16})=>i.jsx("svg",{width:e,height:e,viewBox:"0 0 24 24",fill:"none","aria-hidden":!0,children:i.jsx("path",{d:"M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z",stroke:"currentColor",strokeWidth:"1.4",strokeLinecap:"round",strokeLinejoin:"round"})}),Vf=[{keywords:["who is ocholi divine","tell me about ocholi divine","founder","ocholi","divine ocholi","ceo"],answer:"Ocholi Divine is the visionary founder and CEO of Verapixels. He's a frontend developer and digital innovator with a passion for blending cutting-edge design, modern technology, and exceptional user experience. Under his leadership, Verapixels has become a forward-thinking technology and creative agency dedicated to solving real business challenges through beautiful, functional digital products. His expertise spans web development, UI/UX design, and digital strategy.",link:{text:"Meet Our Core Team",url:"/ourcoreteam"}},{keywords:["what is verapixels","about verapixels","tell me about verapixels","who are you","company info","your company"],answer:"Verapixels is a technology and creative agency specializing in building exceptional websites, digital products, and comprehensive brand systems. We combine world-class design with engineering excellence to deliver production-ready experiences that drive business results. Our approach is rooted in truth and clarity (Vera = truth, Pixels = digital elements), ensuring every project we create is honest, clear, and delivers genuine value to our clients and their users.",link:{text:"Discover More About Verapixels",url:"/aboutverapixels"}},{keywords:["team","who works at verapixels","meet the team","core team","staff","employees"],answer:"Our core team consists of talented frontend developers, UI/UX designers, brand strategists, and digital specialists. We're a distributed team that scales based on project needs, ensuring you always get the right expertise for your specific requirements. Every team member is carefully selected for their skills, creativity, and commitment to excellence. We believe in craftsmanship, collaboration, and delivering work we're proud of.",link:{text:"Meet Our Core Team",url:"/ourcoreteam"}},{keywords:["how you work","work process","workflow","how we work","function","methodology","approach"],answer:"Our work process is designed for transparency, efficiency, and exceptional results. We follow a proven methodology: Discovery (understanding your needs), Strategy (planning the approach), Design (creating beautiful interfaces), Development (building with modern tech), Testing (ensuring quality), and Launch (delivering excellence). We maintain clear communication throughout, provide regular updates, and work collaboratively with clients at every stage. Our agile-friendly approach means you're involved in the journey from start to finish.",link:{text:"Learn How We Work and Function",url:"/howweworkandfunction"}},{keywords:["testimonials","reviews","client feedback","what clients say","success stories","client reviews"],answer:"Our clients consistently praise our attention to detail, technical expertise, and ability to deliver on time. We've helped startups scale, SMEs modernize their digital presence, and established brands refresh their identity. Our testimonials showcase real results: increased conversions, improved user engagement, and digital products that truly serve business goals. We measure success through client satisfaction and tangible business outcomes.",link:{text:"Read Client Testimonials",url:"/clienttestimonials"}},{keywords:["services","what do you offer","what services","offerings","what you do","your services"],answer:"Verapixels offers a comprehensive suite of digital services: Web Development (custom websites and web applications), Mobile App Development (iOS and Android), UI/UX Design (user-centered interfaces), Cybersecurity (protecting your digital assets), and Digital Marketing (growing your online presence). We provide end-to-end solutions from concept to launch, ensuring every project is built with modern technology, beautiful design, and measurable results.",link:{text:"Explore All Our Services",url:"/webdevelopment"}},{keywords:["web development","website development","build website","web dev","website","create website","develop website"],answer:"Our web development service creates fast, secure, and scalable websites using modern technologies like React, TypeScript, and Node.js. We build responsive websites that work perfectly on all devices, implement SEO best practices, ensure accessibility standards, and optimize for performance. Whether you need a corporate website, landing page, or complex web application, we deliver production-ready solutions that drive business growth and provide exceptional user experiences.",link:{text:"Learn About Web Development",url:"/webdevelopment"}},{keywords:["mobile app","mobile development","ios","android","app development","mobile application"],answer:"We develop native and cross-platform mobile applications for iOS and Android that combine stunning design with powerful functionality. Our mobile apps are built with performance, security, and user experience at the forefront. We handle the entire process: strategy, design, development, testing, and App Store/Play Store deployment. From startups to enterprises, we create mobile solutions that engage users and achieve your business objectives.",link:{text:"Explore Mobile App Development",url:"/mobileappdevelopment"}},{keywords:["ui ux","ui/ux","user experience","user interface","design","ux design","ui design"],answer:"Our UI/UX design service focuses on creating intuitive, beautiful interfaces that users love. We conduct thorough user research, create wireframes and prototypes, perform usability testing, and deliver pixel-perfect designs in Figma. Our approach combines aesthetic excellence with data-driven decisions, ensuring your digital products are not just beautiful but highly functional and conversion-optimized. We design for accessibility, ensuring everyone can use your product effectively.",link:{text:"Discover UI/UX Design Services",url:"/uiuxdesign"}},{keywords:["cybersecurity","security","cyber security","protection","secure","data security"],answer:"Our cybersecurity service protects your digital assets from threats and vulnerabilities. We provide security audits, penetration testing, vulnerability assessments, secure coding practices, and ongoing security monitoring. We implement industry-standard security measures including HTTPS, data encryption, secure authentication, and compliance with data protection regulations. Your business and customer data security is our priority, and we stay updated with the latest security best practices.",link:{text:"Learn About Cybersecurity",url:"/cybersecurity"}},{keywords:["digital marketing","marketing","seo","online marketing","grow business","marketing services"],answer:"Our digital marketing service helps you reach and engage your target audience effectively. We offer SEO optimization, content strategy, social media marketing, email campaigns, analytics setup, and conversion rate optimization. We create data-driven marketing strategies that increase visibility, drive qualified traffic, and convert visitors into customers. Our approach combines creative content with technical optimization for maximum ROI on your marketing investment.",link:{text:"Explore Digital Marketing",url:"/digitalmarketing"}},{keywords:["portfolio","work","projects","show me work","examples","your work","past work"],answer:"Our portfolio showcases the diverse range of projects we've delivered for clients across industries. From sleek corporate websites to complex web applications, e-commerce platforms, and mobile apps, each project demonstrates our commitment to quality, innovation, and results. We've worked with startups, SMEs, NGOs, and established brands, helping them achieve their digital goals through exceptional design and development.",link:{text:"View Our Complete Portfolio",url:"/clientportfolio"}},{keywords:["client portfolio","clients","who you worked with","client work"],answer:"Our client portfolio features successful projects delivered for businesses across various industries. We've partnered with innovative startups, growing SMEs, non-profit organizations, and personal brands to create digital solutions that drive real business results. Each client relationship is built on trust, transparency, and our commitment to exceeding expectations. We adapt our approach to meet each client's unique needs and goals.",link:{text:"See Our Client Portfolio",url:"/clientportfolio"}},{keywords:["all projects","project showcase","your projects","view projects"],answer:"Browse through all our completed projects to see the breadth and depth of our capabilities. Our project gallery includes websites, mobile apps, e-commerce solutions, brand systems, and digital products across multiple industries. Each project tells a story of collaboration, problem-solving, and delivering solutions that exceed client expectations and delight end users.",link:{text:"Browse All Projects",url:"/allprojects"}},{keywords:["web applications","web apps","saas","web application","web app portfolio"],answer:"We specialize in building powerful web applications that solve complex business problems. Our web apps are built with modern frameworks like React and Node.js, featuring intuitive interfaces, robust backends, secure authentication, and scalable architecture. Whether you need a SaaS platform, internal dashboard, or custom business tool, we deliver web applications that are fast, reliable, and user-friendly.",link:{text:"Explore Web Applications",url:"/webapplications"}},{keywords:["mobile apps","mobile applications","app portfolio","mobile app portfolio"],answer:"Our mobile app portfolio demonstrates our expertise in creating engaging iOS and Android applications. We've built apps for various purposes: productivity tools, social platforms, e-commerce, entertainment, and business solutions. Each app is designed with careful attention to mobile UX best practices, performance optimization, and platform-specific guidelines to ensure a native feel and smooth user experience.",link:{text:"View Mobile Apps Portfolio",url:"/mobileapps"}},{keywords:["ecommerce","online store","e-commerce","shop","ecommerce solutions","online shop"],answer:"Our e-commerce solutions help businesses sell online effectively. We build secure, conversion-optimized online stores with integrated payment gateways, inventory management, order tracking, and customer accounts. Our e-commerce platforms are designed to provide seamless shopping experiences that drive sales, with mobile-responsive designs, fast checkout processes, and powerful admin panels for easy management.",link:{text:"See E-commerce Solutions",url:"/ecommercesolutions"}},{keywords:["case studies","case study","success stories","results","client results"],answer:"Our case studies provide in-depth looks at how we've solved real business challenges for our clients. Each case study details the client's objectives, our strategic approach, the solution we implemented, and the measurable results achieved. From increased conversion rates to improved user engagement and business growth, our case studies demonstrate the tangible value we deliver through thoughtful design and technical excellence.",link:{text:"Read Our Case Studies",url:"/casestudies"}},{keywords:["pricing","cost","how much","price","rates","budget","how much do you charge"],answer:"Our pricing is project-based and depends on scope, complexity, and timeline. We offer transparent, competitive rates with no hidden fees. We require full payment upfront to ensure we can dedicate our complete focus and resources to delivering premium quality work. This payment structure allows us to maintain our high standards and commit fully to your project's success. Contact us for a detailed, customized quote tailored to your specific needs.",link:{text:"Get a Custom Quote",url:"/contact"}},{keywords:["payment","payment policy","pay","upfront payment","payment method"],answer:"We require full payment upfront for all projects. This payment policy ensures we can allocate dedicated resources, maintain our premium service quality, and focus entirely on delivering exceptional results without financial constraints. Our upfront payment structure reflects our commitment to your project from day one and allows us to work without compromise. We accept bank transfers, credit cards, and digital payments for your convenience.",link:{text:"Contact Us About Payment",url:"/contact"}},{keywords:["timeline","how long","duration","delivery time","project timeline","timeframe"],answer:"Project timelines vary based on scope and complexity. Simple websites typically take 2-4 weeks, while more complex projects like web applications or comprehensive e-commerce solutions may take 6-8 weeks or longer. During our discovery phase, we'll provide you with a detailed timeline that includes milestones, review points, and final delivery date. We pride ourselves on delivering on time while maintaining our quality standards.",link:{text:"Discuss Your Project Timeline",url:"/contact"}},{keywords:["quote","get quote","request quote","free quote","estimate","quotation"],answer:"Request a free, no-obligation quote for your project! Simply provide us with details about your requirements, goals, and timeline through our contact form. We'll review your needs, ask any clarifying questions, and provide you with a comprehensive proposal that includes scope, timeline, deliverables, and investment required. Our quotes are detailed and transparent, so you know exactly what to expect.",link:{text:"Request Your Free Quote",url:"/contact"}},{keywords:["contact","reach out","get in touch","email","phone","talk to agent","contact you"],answer:"We'd love to hear from you! You can contact us through our dedicated contact page, email us at info@verapixel.com, or use this chat assistant. We typically respond within 24 hours during business days. Whether you have a project inquiry, need a quote, or just want to discuss your ideas, our team is ready to help. You can also request to talk to an agent directly for immediate assistance.",link:{text:"Contact Us Now",url:"/contact"}},{keywords:["technology","tech stack","technologies","what you use","frameworks","tech"],answer:"We use cutting-edge technologies to build modern, performant digital products. Our stack includes React and TypeScript for frontend development, Node.js for backend services, modern CSS frameworks, and deployment platforms like Vercel and Netlify. We choose the right technology for each project, prioritizing performance, maintainability, and scalability. Our team stays current with industry best practices and emerging technologies to deliver future-proof solutions.",link:{text:"Learn More About Our Services",url:"/webdevelopment"}},{keywords:["responsive","mobile friendly","mobile responsive","works on mobile","mobile optimization"],answer:"Every website and application we build is fully responsive and mobile-friendly. We follow a mobile-first design approach, ensuring your digital product looks stunning and functions flawlessly on all devices - from smartphones and tablets to desktop computers and large displays. We test across multiple screen sizes, browsers, and devices to guarantee a consistent, optimized experience for every user, regardless of how they access your site.",link:{text:"See Our Responsive Designs",url:"/clientportfolio"}},{keywords:["seo","search engine","google","search optimization","ranking","seo optimization"],answer:"SEO is built into every project we create. We implement comprehensive on-page SEO including semantic HTML markup, optimized meta tags, proper heading structure, fast page load speeds, mobile optimization, XML sitemaps, and schema markup. We also provide guidance on content strategy and technical SEO best practices. Our goal is to ensure your website is discoverable by search engines and ranks well for relevant keywords, driving organic traffic to your business.",link:{text:"Learn About Our SEO Approach",url:"/digitalmarketing"}},{keywords:["cms","content management","update content","edit website","content system"],answer:"We integrate powerful content management systems that make updating your website easy, even without technical knowledge. We work with modern headless CMS solutions like Sanity and Strapi, as well as WordPress when preferred. Our CMS implementations feature intuitive admin panels, drag-and-drop editors, media management, and preview functionality, allowing you to manage your content confidently and efficiently.",link:{text:"Discover Our Technical Capabilities",url:"/webdevelopment"}},{keywords:["maintenance","support","updates","ongoing support","website maintenance"],answer:"We offer comprehensive maintenance and support plans to keep your digital products running smoothly. Our maintenance services include regular security updates, performance monitoring, bug fixes, content updates, backups, uptime monitoring, and technical support. We provide different service levels with defined SLAs to match your needs, ensuring your website or application remains secure, fast, and up-to-date long after launch.",link:{text:"Contact Us About Maintenance",url:"/contact"}},{keywords:["accessibility","a11y","wcag","accessible","disabilities"],answer:"Accessibility is a core priority in everything we build. We follow WCAG guidelines to ensure your digital products are usable by everyone, including people with disabilities. Our accessibility practices include semantic HTML, proper ARIA labels, keyboard navigation, screen reader optimization, sufficient color contrast, and alternative text for images. We believe in creating inclusive digital experiences that don't exclude anyone.",link:{text:"Learn About Our Quality Standards",url:"/howweworkandfunction"}},{keywords:["performance","speed","fast","loading time","page speed"],answer:"Performance is critical to user experience and business success. We optimize every project for maximum speed through techniques like code splitting, lazy loading, image optimization, CDN integration, and efficient caching strategies. We measure performance using Lighthouse and Core Web Vitals, ensuring your site loads quickly even on slower connections. Fast websites improve user satisfaction, conversion rates, and search engine rankings.",link:{text:"See Our Performance Standards",url:"/webdevelopment"}},{keywords:["start","how to start","begin","getting started","onboarding","how do i start"],answer:"Starting a project with Verapixels is simple and straightforward. First, reach out through our contact form or this chat. We'll schedule a discovery call to understand your needs, goals, and vision. Then we'll provide a detailed proposal with scope, timeline, and investment. Once you approve and make payment, we kick off with research and planning, followed by design, development, testing, and launch. Throughout the process, we maintain clear communication and keep you involved at every milestone.",link:{text:"Start Your Project Now",url:"/contact"}},{keywords:["hello","hi","hey","greetings","good morning","good afternoon"],answer:"Hello! Welcome to Verapixels! I'm Vee, your virtual assistant. I'm here to answer questions about our services, portfolio, team, processes, and anything else you'd like to know. Feel free to ask me anything, or use the quick action buttons to navigate to specific pages. How can I help you today?",link:null},{keywords:["thanks","thank you","appreciate","thanks a lot"],answer:"You're very welcome! I'm glad I could help. If you have any more questions about Verapixels or would like to discuss a project, feel free to ask or visit our contact page. We're here to help bring your digital vision to life!",link:{text:"Contact Us",url:"/contact"}},{keywords:["help","assist","support","need help"],answer:"I'm here to help! You can ask me about Verapixels' services, view our portfolio, learn about our team and process, get pricing information, or request a quote. I can also direct you to specific pages or connect you with a human agent. What would you like to know more about?",link:null}],Ot=()=>{const[e,n]=j.useState(!1),[s,a]=j.useState([]),[l,c]=j.useState(""),[u,f]=j.useState(!1),[p,m]=j.useState(0),[g,v]=j.useState(()=>(typeof window<"u"&&localStorage.getItem("vee-theme"))==="light"?"light":"dark"),b=j.useRef(null),y=j.useRef(null),S=[{id:"about",label:"About Verapixels",icon:i.jsx(f4,{}),link:"/aboutverapixels"},{id:"services",label:"Our Services",icon:i.jsx(d4,{}),link:"/webdevelopment"},{id:"portfolio",label:"View Portfolio",icon:i.jsx(u4,{}),link:"/clientportfolio"},{id:"contact",label:"Contact Us",icon:i.jsx(p4,{}),link:"/contact"},{id:"quote",label:"Get a Quote",icon:i.jsx(h4,{}),link:"/contact"}];j.useEffect(()=>{typeof document<"u"&&(document.documentElement.setAttribute("data-theme",g),localStorage.setItem("vee-theme",g))},[g]),j.useEffect(()=>{if(s.length===0){const F={id:Date.now(),sender:"vee",text:"Hi — I'm Vee, your Verapixels assistant! 👋 I can answer questions about our services, portfolio, team, pricing, and process. Pick a quick option below or ask me anything about Verapixels!",timestamp:new Date,link:null};a([F]),m(1)}},[]),j.useEffect(()=>{N()},[s]),j.useEffect(()=>{e&&m(0)},[e]);const N=()=>{b.current?.scrollIntoView({behavior:"smooth"}),setTimeout(()=>{y.current&&(y.current.scrollTop=y.current.scrollHeight)},80)},T=(F,_)=>{const D={id:Date.now()+Math.floor(Math.random()*1e3),sender:"vee",text:F,timestamp:new Date,link:_??null};return a(H=>[...H,D]),D},L=F=>{if(!F)return null;const _=F.toLowerCase().trim();for(const Y of Vf)for(const X of Y.keywords)if(_.includes(X.toLowerCase()))return{text:Y.answer,link:Y.link??null};const D=_.split(/\W+/).filter(Boolean);let H=null;for(const Y of Vf){let X=0;for(const re of Y.keywords){const ue=re.toLowerCase().split(/\W+/).filter(Boolean);for(const me of ue)D.includes(me)&&(X+=1)}X>0&&(!H||X>H.score)&&(H={entry:Y,score:X})}return H&&H.score>=2?{text:H.entry.answer,link:H.entry.link??null}:null},E=(F,_)=>{const D={id:Date.now(),sender:"user",text:_??F,timestamp:new Date};a(H=>[...H,D]),f(!0),setTimeout(()=>{let H;F==="about"?H={text:"Verapixels is a technology and creative agency that combines world-class design with engineering excellence. We build websites, digital products, and brand systems that drive real business results. Learn more about our story, mission, and what makes us different.",link:{text:"About Verapixels",url:"/aboutverapixels"}}:F==="services"?H={text:"We offer comprehensive digital services including Web Development, Mobile App Development, UI/UX Design, Cybersecurity, and Digital Marketing. Each service is delivered with attention to detail, modern technology, and a focus on measurable results.",link:{text:"Explore Our Services",url:"/webdevelopment"}}:F==="portfolio"?H={text:"Explore our portfolio of successful projects across industries. From beautiful websites to powerful web applications, mobile apps, and e-commerce solutions - see how we've helped clients achieve their digital goals.",link:{text:"View Portfolio",url:"/clientportfolio"}}:F==="contact"?H={text:"Ready to start your project? Get in touch with our team! We respond within 24 hours and offer free consultations to discuss your needs, goals, and how we can help bring your vision to life.",link:{text:"Contact Us",url:"/contact"}}:F==="quote"?H={text:"Request a free, detailed quote for your project. Tell us about your requirements, timeline, and goals, and we'll provide a comprehensive proposal with transparent pricing and clear deliverables.",link:{text:"Get Your Free Quote",url:"/contact"}}:H={text:"Here's the information you requested."},T(H.text,H.link??null),f(!1),e||m(Y=>Y+1)},900)},P=()=>{const F=l.trim();if(!F||u)return;const _={id:Date.now(),sender:"user",text:F,timestamp:new Date};a(D=>[...D,_]),c(""),f(!0),setTimeout(()=>{const D=L(F);D?T(D.text,D.link??null):T("I couldn't find a specific answer to that question, but I can help you explore our main pages where you might find what you're looking for. Try asking about our services, portfolio, team, or process - or contact us directly for personalized assistance!",{text:"Contact Our Team",url:"/contact"}),f(!1),e||m(H=>H+1)},900+Math.floor(Math.random()*700))},B=F=>{F.key==="Enter"&&!F.shiftKey&&(F.preventDefault(),P())},M=()=>v(F=>F==="dark"?"light":"dark");return i.jsxs("div",{className:"vee-chat-root",style:{fontFamily:"Inter, system-ui, -apple-system, sans-serif"},children:[!e&&i.jsxs("button",{className:"vee-chat-button",onClick:()=>n(!0),"aria-label":"Open Vee Chat",title:"Open Vee — Verapixels Assistant",style:{position:"fixed",right:24,bottom:24,width:64,height:64,borderRadius:"999px",border:"none",background:"linear-gradient(135deg,#0063f4,#00bfff)",color:"#fff",boxShadow:"0 10px 30px rgba(0,0,0,0.35)",display:"flex",alignItems:"center",justifyContent:"center",cursor:"pointer",zIndex:9999},children:[i.jsx(c4,{}),p>0&&i.jsx("span",{style:{position:"absolute",right:-4,top:-4,background:"#ff3b30",color:"#fff",width:24,height:24,borderRadius:12,display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,border:"2px solid white"},children:p})]}),e&&i.jsxs("div",{className:"vee-chat-window",style:{position:"fixed",right:24,bottom:24,width:420,maxWidth:"calc(100vw - 48px)",height:620,display:"flex",flexDirection:"column",background:g==="dark"?"rgba(8,10,18,0.98)":"#fff",color:g==="dark"?"#e6eef9":"#0b1220",borderRadius:16,boxShadow:"0 30px 80px rgba(0,0,0,0.45)",zIndex:1e4,overflow:"hidden"},children:[i.jsxs("div",{style:{display:"flex",alignItems:"center",justifyContent:"space-between",padding:"14px 16px",background:g==="dark"?"linear-gradient(90deg,#0063f4,#00bfff)":"linear-gradient(90deg,#0b6bff,#00bfff)",color:"#fff"},children:[i.jsxs("div",{style:{display:"flex",gap:12,alignItems:"center"},children:[i.jsx("div",{style:{width:44,height:44,borderRadius:10,background:"#fff",display:"flex",alignItems:"center",justifyContent:"center",color:"#0063f4",fontWeight:800,fontSize:18},children:"V"}),i.jsxs("div",{style:{lineHeight:1},children:[i.jsx("div",{style:{fontWeight:800},children:"Vee"}),i.jsx("div",{style:{fontSize:12,opacity:.95},children:"Your Verapixels Assistant"})]})]}),i.jsxs("div",{style:{display:"flex",gap:8,alignItems:"center"},children:[i.jsxs("button",{onClick:M,"aria-label":"Toggle theme",style:{border:"none",background:"transparent",color:"#fff",cursor:"pointer",display:"flex",alignItems:"center",gap:8,padding:"8px 10px"},title:`Switch to ${g==="dark"?"light":"dark"} mode`,children:[g==="dark"?i.jsx(g4,{}):i.jsx(x4,{}),i.jsx("span",{style:{fontSize:12,fontWeight:700},children:g==="dark"?"Light":"Dark"})]}),i.jsx("button",{onClick:()=>n(!1),"aria-label":"Close chat",style:{width:36,height:36,borderRadius:10,border:"none",background:"rgba(255,255,255,0.15)",color:"#fff",cursor:"pointer"},children:"✕"})]})]}),i.jsxs("div",{style:{flex:1,display:"flex",flexDirection:"column",minHeight:0},children:[i.jsxs("div",{ref:y,className:"vee-chat-messages",style:{flex:1,overflowY:"auto",padding:16,gap:12,display:"flex",flexDirection:"column",background:g==="dark"?"linear-gradient(180deg, rgba(0,0,0,0.12), transparent)":"transparent"},children:[s.length<=1&&i.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:10},children:[i.jsx("div",{style:{fontWeight:800,fontSize:14},children:"Quick actions"}),i.jsx("div",{style:{display:"flex",gap:8,flexWrap:"wrap"},children:S.map(F=>i.jsxs("button",{onClick:()=>E(F.id,F.label),style:{display:"inline-flex",gap:8,alignItems:"center",padding:"8px 12px",borderRadius:12,border:"1px solid rgba(255,255,255,0.06)",background:g==="dark"?"rgba(255,255,255,0.04)":"#f5f7fb",color:g==="dark"?"#fff":"#0b1220",cursor:"pointer"},children:[i.jsx("span",{style:{width:18,height:18},children:F.icon}),i.jsx("span",{style:{fontWeight:700},children:F.label})]},F.id))}),i.jsx("div",{style:{fontSize:13,color:g==="dark"?"rgba(255,255,255,0.7)":"rgba(0,0,0,0.6)"},children:"Don't see what you're looking for? Type your question below."})]}),s.map(F=>i.jsxs("div",{style:{display:"flex",gap:10,alignItems:"flex-end",justifyContent:F.sender==="user"?"flex-end":"flex-start"},children:[F.sender==="vee"&&i.jsx("div",{style:{width:36,height:36,borderRadius:10,background:g==="dark"?"linear-gradient(135deg,#0063f4,#00bfff)":"#0b6bff",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700,flexShrink:0},children:"V"}),i.jsxs("div",{style:{maxWidth:"78%",textAlign:"left",display:"flex",flexDirection:"column",gap:8},children:[i.jsx("div",{style:{padding:"10px 14px",borderRadius:12,background:F.sender==="user"?g==="dark"?"rgba(255,255,255,0.06)":"#eef3ff":g==="dark"?"rgba(0,99,244,0.12)":"#eaf5ff",color:g==="dark"?"#e6eef9":"#04102a",border:"1px solid rgba(0,0,0,0.04)"},children:i.jsx("div",{style:{whiteSpace:"pre-wrap",lineHeight:1.45,fontSize:14},children:F.text})}),F.link&&i.jsxs("a",{href:F.link.url,style:{display:"inline-flex",alignItems:"center",gap:8,padding:"8px 12px",borderRadius:10,background:g==="dark"?"rgba(255,255,255,0.03)":"#fff",border:"1px solid rgba(0,0,0,0.06)",textDecoration:"none",color:g==="dark"?"#00d4ff":"#0077ff",width:"fit-content",fontWeight:700,fontSize:13},children:[F.link.text,i.jsx("span",{style:{transform:"rotate(-90deg)",display:"inline-block"},children:"›"})]})]}),F.sender==="user"&&i.jsx("div",{style:{width:36,height:36,borderRadius:10,background:g==="dark"?"rgba(255,255,255,0.06)":"#dfeeff",display:"flex",alignItems:"center",justifyContent:"center",color:g==="dark"?"#fff":"#0b1220",fontWeight:700,flexShrink:0},children:"U"})]},F.id)),u&&i.jsxs("div",{style:{display:"flex",gap:10,alignItems:"center"},children:[i.jsx("div",{style:{width:36,height:36,borderRadius:10,background:"linear-gradient(135deg,#0063f4,#00bfff)",color:"#fff",display:"flex",alignItems:"center",justifyContent:"center",fontWeight:700},children:"V"}),i.jsx("div",{style:{padding:"8px 12px",borderRadius:12,background:g==="dark"?"rgba(255,255,255,0.04)":"#f5f7fb"},children:i.jsxs("div",{style:{display:"flex",gap:6},children:[i.jsx("div",{style:{width:6,height:6,borderRadius:6,background:g==="dark"?"#dfefff":"#0063f4",animation:"vee-typing 1.4s infinite"}}),i.jsx("div",{style:{width:6,height:6,borderRadius:6,background:g==="dark"?"#bcdcff":"#0077ff",animation:"vee-typing 1.4s 0.15s infinite"}}),i.jsx("div",{style:{width:6,height:6,borderRadius:6,background:g==="dark"?"#93c7ff":"#0099ff",animation:"vee-typing 1.4s 0.3s infinite"}})]})})]}),i.jsx("div",{ref:b})]}),i.jsxs("div",{style:{padding:12,borderTop:g==="dark"?"1px solid rgba(255,255,255,0.04)":"1px solid rgba(10,20,40,0.04)",display:"flex",gap:8,alignItems:"center"},children:[i.jsx("input",{type:"text",placeholder:"Ask Vee about Verapixels...",value:l,onChange:F=>c(F.target.value),onKeyDown:B,disabled:u,style:{flex:1,padding:"12px 14px",borderRadius:12,border:"1px solid rgba(0,0,0,0.06)",outline:"none",background:g==="dark"?"rgba(255,255,255,0.02)":"#fff",color:g==="dark"?"#fff":"#0b1220",fontSize:14}}),i.jsx("button",{onClick:P,disabled:!l.trim()||u,"aria-label":"Send",style:{width:44,height:44,borderRadius:10,border:"none",background:l.trim()&&!u?"linear-gradient(135deg,#0063f4,#00bfff)":g==="dark"?"rgba(255,255,255,0.1)":"#e0e0e0",display:"inline-flex",alignItems:"center",justifyContent:"center",color:"#fff",cursor:l.trim()&&!u?"pointer":"not-allowed",opacity:l.trim()&&!u?1:.5},children:i.jsx(m4,{})})]})]})]}),i.jsx("style",{children:`
        @keyframes vee-typing {
          0%, 60%, 100% { transform: translateY(0); opacity: 0.7; }
          30% { transform: translateY(-6px); opacity: 1; }
        }
      `})]})},Ad=j.createContext({});function Ld(e){const n=j.useRef(null);return n.current===null&&(n.current=e()),n.current}const Dd=typeof window<"u",Um=Dd?j.useLayoutEffect:j.useEffect,mo=j.createContext(null);function Fd(e,n){e.indexOf(n)===-1&&e.push(n)}function Rd(e,n){const s=e.indexOf(n);s>-1&&e.splice(s,1)}const kn=(e,n,s)=>s>n?n:s<e?e:s;let Id=()=>{};const Sn={},Ym=e=>/^-?(?:\d+(?:\.\d+)?|\.\d+)$/u.test(e);function $m(e){return typeof e=="object"&&e!==null}const Hm=e=>/^0[^.\s]+$/u.test(e);function Od(e){let n;return()=>(n===void 0&&(n=e()),n)}const It=e=>e,v4=(e,n)=>s=>n(e(s)),ys=(...e)=>e.reduce(v4),us=(e,n,s)=>{const a=n-e;return a===0?1:(s-e)/a};class Vd{constructor(){this.subscriptions=[]}add(n){return Fd(this.subscriptions,n),()=>Rd(this.subscriptions,n)}notify(n,s,a){const l=this.subscriptions.length;if(l)if(l===1)this.subscriptions[0](n,s,a);else for(let c=0;c<l;c++){const u=this.subscriptions[c];u&&u(n,s,a)}}getSize(){return this.subscriptions.length}clear(){this.subscriptions.length=0}}const rn=e=>e*1e3,Ft=e=>e/1e3;function Gm(e,n){return n?e*(1e3/n):0}const qm=(e,n,s)=>(((1-3*s+3*n)*e+(3*s-6*n))*e+3*n)*e,b4=1e-7,y4=12;function w4(e,n,s,a,l){let c,u,f=0;do u=n+(s-n)/2,c=qm(u,a,l)-e,c>0?s=u:n=u;while(Math.abs(c)>b4&&++f<y4);return u}function ws(e,n,s,a){if(e===n&&s===a)return It;const l=c=>w4(c,0,1,e,s);return c=>c===0||c===1?c:qm(l(c),n,a)}const Xm=e=>n=>n<=.5?e(2*n)/2:(2-e(2*(1-n)))/2,Km=e=>n=>1-e(1-n),Qm=ws(.33,1.53,.69,.99),Bd=Km(Qm),Zm=Xm(Bd),Jm=e=>(e*=2)<1?.5*Bd(e):.5*(2-Math.pow(2,-10*(e-1))),_d=e=>1-Math.sin(Math.acos(e)),eg=Km(_d),tg=Xm(_d),j4=ws(.42,0,1,1),k4=ws(0,0,.58,1),ng=ws(.42,0,.58,1),S4=e=>Array.isArray(e)&&typeof e[0]!="number",ig=e=>Array.isArray(e)&&typeof e[0]=="number",N4={linear:It,easeIn:j4,easeInOut:ng,easeOut:k4,circIn:_d,circInOut:tg,circOut:eg,backIn:Bd,backInOut:Zm,backOut:Qm,anticipate:Jm},C4=e=>typeof e=="string",Bf=e=>{if(ig(e)){Id(e.length===4);const[n,s,a,l]=e;return ws(n,s,a,l)}else if(C4(e))return N4[e];return e},Oa=["setup","read","resolveKeyframes","preUpdate","update","preRender","render","postRender"];function T4(e,n){let s=new Set,a=new Set,l=!1,c=!1;const u=new WeakSet;let f={delta:0,timestamp:0,isProcessing:!1};function p(g){u.has(g)&&(m.schedule(g),e()),g(f)}const m={schedule:(g,v=!1,b=!1)=>{const S=b&&l?s:a;return v&&u.add(g),S.has(g)||S.add(g),g},cancel:g=>{a.delete(g),u.delete(g)},process:g=>{if(f=g,l){c=!0;return}l=!0,[s,a]=[a,s],s.forEach(p),s.clear(),l=!1,c&&(c=!1,m.process(g))}};return m}const z4=40;function rg(e,n){let s=!1,a=!0;const l={delta:0,timestamp:0,isProcessing:!1},c=()=>s=!0,u=Oa.reduce((P,B)=>(P[B]=T4(c),P),{}),{setup:f,read:p,resolveKeyframes:m,preUpdate:g,update:v,preRender:b,render:y,postRender:S}=u,N=()=>{const P=Sn.useManualTiming?l.timestamp:performance.now();s=!1,Sn.useManualTiming||(l.delta=a?1e3/60:Math.max(Math.min(P-l.timestamp,z4),1)),l.timestamp=P,l.isProcessing=!0,f.process(l),p.process(l),m.process(l),g.process(l),v.process(l),b.process(l),y.process(l),S.process(l),l.isProcessing=!1,s&&n&&(a=!1,e(N))},T=()=>{s=!0,a=!0,l.isProcessing||e(N)};return{schedule:Oa.reduce((P,B)=>{const M=u[B];return P[B]=(F,_=!1,D=!1)=>(s||T(),M.schedule(F,_,D)),P},{}),cancel:P=>{for(let B=0;B<Oa.length;B++)u[Oa[B]].cancel(P)},state:l,steps:u}}const{schedule:Me,cancel:Xn,state:nt,steps:Cc}=rg(typeof requestAnimationFrame<"u"?requestAnimationFrame:It,!0);let $a;function E4(){$a=void 0}const wt={now:()=>($a===void 0&&wt.set(nt.isProcessing||Sn.useManualTiming?nt.timestamp:performance.now()),$a),set:e=>{$a=e,queueMicrotask(E4)}},sg=e=>n=>typeof n=="string"&&n.startsWith(e),Wd=sg("--"),P4=sg("var(--"),Ud=e=>P4(e)?M4.test(e.split("/*")[0].trim()):!1,M4=/var\(--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)$/iu,or={test:e=>typeof e=="number",parse:parseFloat,transform:e=>e},ps={...or,transform:e=>kn(0,1,e)},Va={...or,default:1},ns=e=>Math.round(e*1e5)/1e5,Yd=/-?(?:\d+(?:\.\d+)?|\.\d+)/gu;function A4(e){return e==null}const L4=/^(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))$/iu,$d=(e,n)=>s=>!!(typeof s=="string"&&L4.test(s)&&s.startsWith(e)||n&&!A4(s)&&Object.prototype.hasOwnProperty.call(s,n)),ag=(e,n,s)=>a=>{if(typeof a!="string")return a;const[l,c,u,f]=a.match(Yd);return{[e]:parseFloat(l),[n]:parseFloat(c),[s]:parseFloat(u),alpha:f!==void 0?parseFloat(f):1}},D4=e=>kn(0,255,e),Tc={...or,transform:e=>Math.round(D4(e))},mi={test:$d("rgb","red"),parse:ag("red","green","blue"),transform:({red:e,green:n,blue:s,alpha:a=1})=>"rgba("+Tc.transform(e)+", "+Tc.transform(n)+", "+Tc.transform(s)+", "+ns(ps.transform(a))+")"};function F4(e){let n="",s="",a="",l="";return e.length>5?(n=e.substring(1,3),s=e.substring(3,5),a=e.substring(5,7),l=e.substring(7,9)):(n=e.substring(1,2),s=e.substring(2,3),a=e.substring(3,4),l=e.substring(4,5),n+=n,s+=s,a+=a,l+=l),{red:parseInt(n,16),green:parseInt(s,16),blue:parseInt(a,16),alpha:l?parseInt(l,16)/255:1}}const Qc={test:$d("#"),parse:F4,transform:mi.transform},js=e=>({test:n=>typeof n=="string"&&n.endsWith(e)&&n.split(" ").length===1,parse:parseFloat,transform:n=>`${n}${e}`}),Hn=js("deg"),sn=js("%"),le=js("px"),R4=js("vh"),I4=js("vw"),_f={...sn,parse:e=>sn.parse(e)/100,transform:e=>sn.transform(e*100)},Gi={test:$d("hsl","hue"),parse:ag("hue","saturation","lightness"),transform:({hue:e,saturation:n,lightness:s,alpha:a=1})=>"hsla("+Math.round(e)+", "+sn.transform(ns(n))+", "+sn.transform(ns(s))+", "+ns(ps.transform(a))+")"},He={test:e=>mi.test(e)||Qc.test(e)||Gi.test(e),parse:e=>mi.test(e)?mi.parse(e):Gi.test(e)?Gi.parse(e):Qc.parse(e),transform:e=>typeof e=="string"?e:e.hasOwnProperty("red")?mi.transform(e):Gi.transform(e),getAnimatableNone:e=>{const n=He.parse(e);return n.alpha=0,He.transform(n)}},O4=/(?:#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\))/giu;function V4(e){return isNaN(e)&&typeof e=="string"&&(e.match(Yd)?.length||0)+(e.match(O4)?.length||0)>0}const og="number",lg="color",B4="var",_4="var(",Wf="${}",W4=/var\s*\(\s*--(?:[\w-]+\s*|[\w-]+\s*,(?:\s*[^)(\s]|\s*\((?:[^)(]|\([^)(]*\))*\))+\s*)\)|#[\da-f]{3,8}|(?:rgb|hsl)a?\((?:-?[\d.]+%?[,\s]+){2}-?[\d.]+%?\s*(?:[,/]\s*)?(?:\b\d+(?:\.\d+)?|\.\d+)?%?\)|-?(?:\d+(?:\.\d+)?|\.\d+)/giu;function fs(e){const n=e.toString(),s=[],a={color:[],number:[],var:[]},l=[];let c=0;const f=n.replace(W4,p=>(He.test(p)?(a.color.push(c),l.push(lg),s.push(He.parse(p))):p.startsWith(_4)?(a.var.push(c),l.push(B4),s.push(p)):(a.number.push(c),l.push(og),s.push(parseFloat(p))),++c,Wf)).split(Wf);return{values:s,split:f,indexes:a,types:l}}function cg(e){return fs(e).values}function dg(e){const{split:n,types:s}=fs(e),a=n.length;return l=>{let c="";for(let u=0;u<a;u++)if(c+=n[u],l[u]!==void 0){const f=s[u];f===og?c+=ns(l[u]):f===lg?c+=He.transform(l[u]):c+=l[u]}return c}}const U4=e=>typeof e=="number"?0:He.test(e)?He.getAnimatableNone(e):e;function Y4(e){const n=cg(e);return dg(e)(n.map(U4))}const Kn={test:V4,parse:cg,createTransformer:dg,getAnimatableNone:Y4};function zc(e,n,s){return s<0&&(s+=1),s>1&&(s-=1),s<1/6?e+(n-e)*6*s:s<1/2?n:s<2/3?e+(n-e)*(2/3-s)*6:e}function $4({hue:e,saturation:n,lightness:s,alpha:a}){e/=360,n/=100,s/=100;let l=0,c=0,u=0;if(!n)l=c=u=s;else{const f=s<.5?s*(1+n):s+n-s*n,p=2*s-f;l=zc(p,f,e+1/3),c=zc(p,f,e),u=zc(p,f,e-1/3)}return{red:Math.round(l*255),green:Math.round(c*255),blue:Math.round(u*255),alpha:a}}function ro(e,n){return s=>s>0?n:e}const Fe=(e,n,s)=>e+(n-e)*s,Ec=(e,n,s)=>{const a=e*e,l=s*(n*n-a)+a;return l<0?0:Math.sqrt(l)},H4=[Qc,mi,Gi],G4=e=>H4.find(n=>n.test(e));function Uf(e){const n=G4(e);if(!n)return!1;let s=n.parse(e);return n===Gi&&(s=$4(s)),s}const Yf=(e,n)=>{const s=Uf(e),a=Uf(n);if(!s||!a)return ro(e,n);const l={...s};return c=>(l.red=Ec(s.red,a.red,c),l.green=Ec(s.green,a.green,c),l.blue=Ec(s.blue,a.blue,c),l.alpha=Fe(s.alpha,a.alpha,c),mi.transform(l))},Zc=new Set(["none","hidden"]);function q4(e,n){return Zc.has(e)?s=>s<=0?e:n:s=>s>=1?n:e}function X4(e,n){return s=>Fe(e,n,s)}function Hd(e){return typeof e=="number"?X4:typeof e=="string"?Ud(e)?ro:He.test(e)?Yf:Z4:Array.isArray(e)?ug:typeof e=="object"?He.test(e)?Yf:K4:ro}function ug(e,n){const s=[...e],a=s.length,l=e.map((c,u)=>Hd(c)(c,n[u]));return c=>{for(let u=0;u<a;u++)s[u]=l[u](c);return s}}function K4(e,n){const s={...e,...n},a={};for(const l in s)e[l]!==void 0&&n[l]!==void 0&&(a[l]=Hd(e[l])(e[l],n[l]));return l=>{for(const c in a)s[c]=a[c](l);return s}}function Q4(e,n){const s=[],a={color:0,var:0,number:0};for(let l=0;l<n.values.length;l++){const c=n.types[l],u=e.indexes[c][a[c]],f=e.values[u]??0;s[l]=f,a[c]++}return s}const Z4=(e,n)=>{const s=Kn.createTransformer(n),a=fs(e),l=fs(n);return a.indexes.var.length===l.indexes.var.length&&a.indexes.color.length===l.indexes.color.length&&a.indexes.number.length>=l.indexes.number.length?Zc.has(e)&&!l.values.length||Zc.has(n)&&!a.values.length?q4(e,n):ys(ug(Q4(a,l),l.values),s):ro(e,n)};function pg(e,n,s){return typeof e=="number"&&typeof n=="number"&&typeof s=="number"?Fe(e,n,s):Hd(e)(e,n)}const J4=e=>{const n=({timestamp:s})=>e(s);return{start:(s=!0)=>Me.update(n,s),stop:()=>Xn(n),now:()=>nt.isProcessing?nt.timestamp:wt.now()}},fg=(e,n,s=10)=>{let a="";const l=Math.max(Math.round(n/s),2);for(let c=0;c<l;c++)a+=Math.round(e(c/(l-1))*1e4)/1e4+", ";return`linear(${a.substring(0,a.length-2)})`},so=2e4;function Gd(e){let n=0;const s=50;let a=e.next(n);for(;!a.done&&n<so;)n+=s,a=e.next(n);return n>=so?1/0:n}function e3(e,n=100,s){const a=s({...e,keyframes:[0,n]}),l=Math.min(Gd(a),so);return{type:"keyframes",ease:c=>a.next(l*c).value/n,duration:Ft(l)}}const t3=5;function hg(e,n,s){const a=Math.max(n-t3,0);return Gm(s-e(a),n-a)}const Be={stiffness:100,damping:10,mass:1,velocity:0,duration:800,bounce:.3,visualDuration:.3,restSpeed:{granular:.01,default:2},restDelta:{granular:.005,default:.5},minDuration:.01,maxDuration:10,minDamping:.05,maxDamping:1},Pc=.001;function n3({duration:e=Be.duration,bounce:n=Be.bounce,velocity:s=Be.velocity,mass:a=Be.mass}){let l,c,u=1-n;u=kn(Be.minDamping,Be.maxDamping,u),e=kn(Be.minDuration,Be.maxDuration,Ft(e)),u<1?(l=m=>{const g=m*u,v=g*e,b=g-s,y=Jc(m,u),S=Math.exp(-v);return Pc-b/y*S},c=m=>{const v=m*u*e,b=v*s+s,y=Math.pow(u,2)*Math.pow(m,2)*e,S=Math.exp(-v),N=Jc(Math.pow(m,2),u);return(-l(m)+Pc>0?-1:1)*((b-y)*S)/N}):(l=m=>{const g=Math.exp(-m*e),v=(m-s)*e+1;return-Pc+g*v},c=m=>{const g=Math.exp(-m*e),v=(s-m)*(e*e);return g*v});const f=5/e,p=r3(l,c,f);if(e=rn(e),isNaN(p))return{stiffness:Be.stiffness,damping:Be.damping,duration:e};{const m=Math.pow(p,2)*a;return{stiffness:m,damping:u*2*Math.sqrt(a*m),duration:e}}}const i3=12;function r3(e,n,s){let a=s;for(let l=1;l<i3;l++)a=a-e(a)/n(a);return a}function Jc(e,n){return e*Math.sqrt(1-n*n)}const s3=["duration","bounce"],a3=["stiffness","damping","mass"];function $f(e,n){return n.some(s=>e[s]!==void 0)}function o3(e){let n={velocity:Be.velocity,stiffness:Be.stiffness,damping:Be.damping,mass:Be.mass,isResolvedFromDuration:!1,...e};if(!$f(e,a3)&&$f(e,s3))if(e.visualDuration){const s=e.visualDuration,a=2*Math.PI/(s*1.2),l=a*a,c=2*kn(.05,1,1-(e.bounce||0))*Math.sqrt(l);n={...n,mass:Be.mass,stiffness:l,damping:c}}else{const s=n3(e);n={...n,...s,mass:Be.mass},n.isResolvedFromDuration=!0}return n}function ao(e=Be.visualDuration,n=Be.bounce){const s=typeof e!="object"?{visualDuration:e,keyframes:[0,1],bounce:n}:e;let{restSpeed:a,restDelta:l}=s;const c=s.keyframes[0],u=s.keyframes[s.keyframes.length-1],f={done:!1,value:c},{stiffness:p,damping:m,mass:g,duration:v,velocity:b,isResolvedFromDuration:y}=o3({...s,velocity:-Ft(s.velocity||0)}),S=b||0,N=m/(2*Math.sqrt(p*g)),T=u-c,L=Ft(Math.sqrt(p/g)),E=Math.abs(T)<5;a||(a=E?Be.restSpeed.granular:Be.restSpeed.default),l||(l=E?Be.restDelta.granular:Be.restDelta.default);let P;if(N<1){const M=Jc(L,N);P=F=>{const _=Math.exp(-N*L*F);return u-_*((S+N*L*T)/M*Math.sin(M*F)+T*Math.cos(M*F))}}else if(N===1)P=M=>u-Math.exp(-L*M)*(T+(S+L*T)*M);else{const M=L*Math.sqrt(N*N-1);P=F=>{const _=Math.exp(-N*L*F),D=Math.min(M*F,300);return u-_*((S+N*L*T)*Math.sinh(D)+M*T*Math.cosh(D))/M}}const B={calculatedDuration:y&&v||null,next:M=>{const F=P(M);if(y)f.done=M>=v;else{let _=M===0?S:0;N<1&&(_=M===0?rn(S):hg(P,M,F));const D=Math.abs(_)<=a,H=Math.abs(u-F)<=l;f.done=D&&H}return f.value=f.done?u:F,f},toString:()=>{const M=Math.min(Gd(B),so),F=fg(_=>B.next(M*_).value,M,30);return M+"ms "+F},toTransition:()=>{}};return B}ao.applyToOptions=e=>{const n=e3(e,100,ao);return e.ease=n.ease,e.duration=rn(n.duration),e.type="keyframes",e};function ed({keyframes:e,velocity:n=0,power:s=.8,timeConstant:a=325,bounceDamping:l=10,bounceStiffness:c=500,modifyTarget:u,min:f,max:p,restDelta:m=.5,restSpeed:g}){const v=e[0],b={done:!1,value:v},y=D=>f!==void 0&&D<f||p!==void 0&&D>p,S=D=>f===void 0?p:p===void 0||Math.abs(f-D)<Math.abs(p-D)?f:p;let N=s*n;const T=v+N,L=u===void 0?T:u(T);L!==T&&(N=L-v);const E=D=>-N*Math.exp(-D/a),P=D=>L+E(D),B=D=>{const H=E(D),Y=P(D);b.done=Math.abs(H)<=m,b.value=b.done?L:Y};let M,F;const _=D=>{y(b.value)&&(M=D,F=ao({keyframes:[b.value,S(b.value)],velocity:hg(P,D,b.value),damping:l,stiffness:c,restDelta:m,restSpeed:g}))};return _(0),{calculatedDuration:null,next:D=>{let H=!1;return!F&&M===void 0&&(H=!0,B(D),_(D)),M!==void 0&&D>=M?F.next(D-M):(!H&&B(D),b)}}}function l3(e,n,s){const a=[],l=s||Sn.mix||pg,c=e.length-1;for(let u=0;u<c;u++){let f=l(e[u],e[u+1]);if(n){const p=Array.isArray(n)?n[u]||It:n;f=ys(p,f)}a.push(f)}return a}function c3(e,n,{clamp:s=!0,ease:a,mixer:l}={}){const c=e.length;if(Id(c===n.length),c===1)return()=>n[0];if(c===2&&n[0]===n[1])return()=>n[1];const u=e[0]===e[1];e[0]>e[c-1]&&(e=[...e].reverse(),n=[...n].reverse());const f=l3(n,a,l),p=f.length,m=g=>{if(u&&g<e[0])return n[0];let v=0;if(p>1)for(;v<e.length-2&&!(g<e[v+1]);v++);const b=us(e[v],e[v+1],g);return f[v](b)};return s?g=>m(kn(e[0],e[c-1],g)):m}function d3(e,n){const s=e[e.length-1];for(let a=1;a<=n;a++){const l=us(0,n,a);e.push(Fe(s,1,l))}}function u3(e){const n=[0];return d3(n,e.length-1),n}function p3(e,n){return e.map(s=>s*n)}function f3(e,n){return e.map(()=>n||ng).splice(0,e.length-1)}function is({duration:e=300,keyframes:n,times:s,ease:a="easeInOut"}){const l=S4(a)?a.map(Bf):Bf(a),c={done:!1,value:n[0]},u=p3(s&&s.length===n.length?s:u3(n),e),f=c3(u,n,{ease:Array.isArray(l)?l:f3(n,l)});return{calculatedDuration:e,next:p=>(c.value=f(p),c.done=p>=e,c)}}const h3=e=>e!==null;function qd(e,{repeat:n,repeatType:s="loop"},a,l=1){const c=e.filter(h3),f=l<0||n&&s!=="loop"&&n%2===1?0:c.length-1;return!f||a===void 0?c[f]:a}const m3={decay:ed,inertia:ed,tween:is,keyframes:is,spring:ao};function mg(e){typeof e.type=="string"&&(e.type=m3[e.type])}class Xd{constructor(){this.updateFinished()}get finished(){return this._finished}updateFinished(){this._finished=new Promise(n=>{this.resolve=n})}notifyFinished(){this.resolve()}then(n,s){return this.finished.then(n,s)}}const g3=e=>e/100;class Kd extends Xd{constructor(n){super(),this.state="idle",this.startTime=null,this.isStopped=!1,this.currentTime=0,this.holdTime=null,this.playbackSpeed=1,this.stop=()=>{const{motionValue:s}=this.options;s&&s.updatedAt!==wt.now()&&this.tick(wt.now()),this.isStopped=!0,this.state!=="idle"&&(this.teardown(),this.options.onStop?.())},this.options=n,this.initAnimation(),this.play(),n.autoplay===!1&&this.pause()}initAnimation(){const{options:n}=this;mg(n);const{type:s=is,repeat:a=0,repeatDelay:l=0,repeatType:c,velocity:u=0}=n;let{keyframes:f}=n;const p=s||is;p!==is&&typeof f[0]!="number"&&(this.mixKeyframes=ys(g3,pg(f[0],f[1])),f=[0,100]);const m=p({...n,keyframes:f});c==="mirror"&&(this.mirroredGenerator=p({...n,keyframes:[...f].reverse(),velocity:-u})),m.calculatedDuration===null&&(m.calculatedDuration=Gd(m));const{calculatedDuration:g}=m;this.calculatedDuration=g,this.resolvedDuration=g+l,this.totalDuration=this.resolvedDuration*(a+1)-l,this.generator=m}updateTime(n){const s=Math.round(n-this.startTime)*this.playbackSpeed;this.holdTime!==null?this.currentTime=this.holdTime:this.currentTime=s}tick(n,s=!1){const{generator:a,totalDuration:l,mixKeyframes:c,mirroredGenerator:u,resolvedDuration:f,calculatedDuration:p}=this;if(this.startTime===null)return a.next(0);const{delay:m=0,keyframes:g,repeat:v,repeatType:b,repeatDelay:y,type:S,onUpdate:N,finalKeyframe:T}=this.options;this.speed>0?this.startTime=Math.min(this.startTime,n):this.speed<0&&(this.startTime=Math.min(n-l/this.speed,this.startTime)),s?this.currentTime=n:this.updateTime(n);const L=this.currentTime-m*(this.playbackSpeed>=0?1:-1),E=this.playbackSpeed>=0?L<0:L>l;this.currentTime=Math.max(L,0),this.state==="finished"&&this.holdTime===null&&(this.currentTime=l);let P=this.currentTime,B=a;if(v){const D=Math.min(this.currentTime,l)/f;let H=Math.floor(D),Y=D%1;!Y&&D>=1&&(Y=1),Y===1&&H--,H=Math.min(H,v+1),!!(H%2)&&(b==="reverse"?(Y=1-Y,y&&(Y-=y/f)):b==="mirror"&&(B=u)),P=kn(0,1,Y)*f}const M=E?{done:!1,value:g[0]}:B.next(P);c&&(M.value=c(M.value));let{done:F}=M;!E&&p!==null&&(F=this.playbackSpeed>=0?this.currentTime>=l:this.currentTime<=0);const _=this.holdTime===null&&(this.state==="finished"||this.state==="running"&&F);return _&&S!==ed&&(M.value=qd(g,this.options,T,this.speed)),N&&N(M.value),_&&this.finish(),M}then(n,s){return this.finished.then(n,s)}get duration(){return Ft(this.calculatedDuration)}get iterationDuration(){const{delay:n=0}=this.options||{};return this.duration+Ft(n)}get time(){return Ft(this.currentTime)}set time(n){n=rn(n),this.currentTime=n,this.startTime===null||this.holdTime!==null||this.playbackSpeed===0?this.holdTime=n:this.driver&&(this.startTime=this.driver.now()-n/this.playbackSpeed),this.driver?.start(!1)}get speed(){return this.playbackSpeed}set speed(n){this.updateTime(wt.now());const s=this.playbackSpeed!==n;this.playbackSpeed=n,s&&(this.time=Ft(this.currentTime))}play(){if(this.isStopped)return;const{driver:n=J4,startTime:s}=this.options;this.driver||(this.driver=n(l=>this.tick(l))),this.options.onPlay?.();const a=this.driver.now();this.state==="finished"?(this.updateFinished(),this.startTime=a):this.holdTime!==null?this.startTime=a-this.holdTime:this.startTime||(this.startTime=s??a),this.state==="finished"&&this.speed<0&&(this.startTime+=this.calculatedDuration),this.holdTime=null,this.state="running",this.driver.start()}pause(){this.state="paused",this.updateTime(wt.now()),this.holdTime=this.currentTime}complete(){this.state!=="running"&&this.play(),this.state="finished",this.holdTime=null}finish(){this.notifyFinished(),this.teardown(),this.state="finished",this.options.onComplete?.()}cancel(){this.holdTime=null,this.startTime=0,this.tick(0),this.teardown(),this.options.onCancel?.()}teardown(){this.state="idle",this.stopDriver(),this.startTime=this.holdTime=null}stopDriver(){this.driver&&(this.driver.stop(),this.driver=void 0)}sample(n){return this.startTime=0,this.tick(n,!0)}attachTimeline(n){return this.options.allowFlatten&&(this.options.type="keyframes",this.options.ease="linear",this.initAnimation()),this.driver?.stop(),n.observe(this)}}function x3(e){for(let n=1;n<e.length;n++)e[n]??(e[n]=e[n-1])}const gi=e=>e*180/Math.PI,td=e=>{const n=gi(Math.atan2(e[1],e[0]));return nd(n)},v3={x:4,y:5,translateX:4,translateY:5,scaleX:0,scaleY:3,scale:e=>(Math.abs(e[0])+Math.abs(e[3]))/2,rotate:td,rotateZ:td,skewX:e=>gi(Math.atan(e[1])),skewY:e=>gi(Math.atan(e[2])),skew:e=>(Math.abs(e[1])+Math.abs(e[2]))/2},nd=e=>(e=e%360,e<0&&(e+=360),e),Hf=td,Gf=e=>Math.sqrt(e[0]*e[0]+e[1]*e[1]),qf=e=>Math.sqrt(e[4]*e[4]+e[5]*e[5]),b3={x:12,y:13,z:14,translateX:12,translateY:13,translateZ:14,scaleX:Gf,scaleY:qf,scale:e=>(Gf(e)+qf(e))/2,rotateX:e=>nd(gi(Math.atan2(e[6],e[5]))),rotateY:e=>nd(gi(Math.atan2(-e[2],e[0]))),rotateZ:Hf,rotate:Hf,skewX:e=>gi(Math.atan(e[4])),skewY:e=>gi(Math.atan(e[1])),skew:e=>(Math.abs(e[1])+Math.abs(e[4]))/2};function id(e){return e.includes("scale")?1:0}function rd(e,n){if(!e||e==="none")return id(n);const s=e.match(/^matrix3d\(([-\d.e\s,]+)\)$/u);let a,l;if(s)a=b3,l=s;else{const f=e.match(/^matrix\(([-\d.e\s,]+)\)$/u);a=v3,l=f}if(!l)return id(n);const c=a[n],u=l[1].split(",").map(w3);return typeof c=="function"?c(u):u[c]}const y3=(e,n)=>{const{transform:s="none"}=getComputedStyle(e);return rd(s,n)};function w3(e){return parseFloat(e.trim())}const lr=["transformPerspective","x","y","z","translateX","translateY","translateZ","scale","scaleX","scaleY","rotate","rotateX","rotateY","rotateZ","skew","skewX","skewY"],cr=new Set(lr),Xf=e=>e===or||e===le,j3=new Set(["x","y","z"]),k3=lr.filter(e=>!j3.has(e));function S3(e){const n=[];return k3.forEach(s=>{const a=e.getValue(s);a!==void 0&&(n.push([s,a.get()]),a.set(s.startsWith("scale")?1:0))}),n}const xi={width:({x:e},{paddingLeft:n="0",paddingRight:s="0"})=>e.max-e.min-parseFloat(n)-parseFloat(s),height:({y:e},{paddingTop:n="0",paddingBottom:s="0"})=>e.max-e.min-parseFloat(n)-parseFloat(s),top:(e,{top:n})=>parseFloat(n),left:(e,{left:n})=>parseFloat(n),bottom:({y:e},{top:n})=>parseFloat(n)+(e.max-e.min),right:({x:e},{left:n})=>parseFloat(n)+(e.max-e.min),x:(e,{transform:n})=>rd(n,"x"),y:(e,{transform:n})=>rd(n,"y")};xi.translateX=xi.x;xi.translateY=xi.y;const vi=new Set;let sd=!1,ad=!1,od=!1;function gg(){if(ad){const e=Array.from(vi).filter(a=>a.needsMeasurement),n=new Set(e.map(a=>a.element)),s=new Map;n.forEach(a=>{const l=S3(a);l.length&&(s.set(a,l),a.render())}),e.forEach(a=>a.measureInitialState()),n.forEach(a=>{a.render();const l=s.get(a);l&&l.forEach(([c,u])=>{a.getValue(c)?.set(u)})}),e.forEach(a=>a.measureEndState()),e.forEach(a=>{a.suspendedScrollY!==void 0&&window.scrollTo(0,a.suspendedScrollY)})}ad=!1,sd=!1,vi.forEach(e=>e.complete(od)),vi.clear()}function xg(){vi.forEach(e=>{e.readKeyframes(),e.needsMeasurement&&(ad=!0)})}function N3(){od=!0,xg(),gg(),od=!1}class Qd{constructor(n,s,a,l,c,u=!1){this.state="pending",this.isAsync=!1,this.needsMeasurement=!1,this.unresolvedKeyframes=[...n],this.onComplete=s,this.name=a,this.motionValue=l,this.element=c,this.isAsync=u}scheduleResolve(){this.state="scheduled",this.isAsync?(vi.add(this),sd||(sd=!0,Me.read(xg),Me.resolveKeyframes(gg))):(this.readKeyframes(),this.complete())}readKeyframes(){const{unresolvedKeyframes:n,name:s,element:a,motionValue:l}=this;if(n[0]===null){const c=l?.get(),u=n[n.length-1];if(c!==void 0)n[0]=c;else if(a&&s){const f=a.readValue(s,u);f!=null&&(n[0]=f)}n[0]===void 0&&(n[0]=u),l&&c===void 0&&l.set(n[0])}x3(n)}setFinalKeyframe(){}measureInitialState(){}renderEndStyles(){}measureEndState(){}complete(n=!1){this.state="complete",this.onComplete(this.unresolvedKeyframes,this.finalKeyframe,n),vi.delete(this)}cancel(){this.state==="scheduled"&&(vi.delete(this),this.state="pending")}resume(){this.state==="pending"&&this.scheduleResolve()}}const C3=e=>e.startsWith("--");function T3(e,n,s){C3(n)?e.style.setProperty(n,s):e.style[n]=s}const z3=Od(()=>window.ScrollTimeline!==void 0),E3={};function P3(e,n){const s=Od(e);return()=>E3[n]??s()}const vg=P3(()=>{try{document.createElement("div").animate({opacity:0},{easing:"linear(0, 1)"})}catch{return!1}return!0},"linearEasing"),Zr=([e,n,s,a])=>`cubic-bezier(${e}, ${n}, ${s}, ${a})`,Kf={linear:"linear",ease:"ease",easeIn:"ease-in",easeOut:"ease-out",easeInOut:"ease-in-out",circIn:Zr([0,.65,.55,1]),circOut:Zr([.55,0,1,.45]),backIn:Zr([.31,.01,.66,-.59]),backOut:Zr([.33,1.53,.69,.99])};function bg(e,n){if(e)return typeof e=="function"?vg()?fg(e,n):"ease-out":ig(e)?Zr(e):Array.isArray(e)?e.map(s=>bg(s,n)||Kf.easeOut):Kf[e]}function M3(e,n,s,{delay:a=0,duration:l=300,repeat:c=0,repeatType:u="loop",ease:f="easeOut",times:p}={},m=void 0){const g={[n]:s};p&&(g.offset=p);const v=bg(f,l);Array.isArray(v)&&(g.easing=v);const b={delay:a,duration:l,easing:Array.isArray(v)?"linear":v,fill:"both",iterations:c+1,direction:u==="reverse"?"alternate":"normal"};return m&&(b.pseudoElement=m),e.animate(g,b)}function yg(e){return typeof e=="function"&&"applyToOptions"in e}function A3({type:e,...n}){return yg(e)&&vg()?e.applyToOptions(n):(n.duration??(n.duration=300),n.ease??(n.ease="easeOut"),n)}class L3 extends Xd{constructor(n){if(super(),this.finishedTime=null,this.isStopped=!1,!n)return;const{element:s,name:a,keyframes:l,pseudoElement:c,allowFlatten:u=!1,finalKeyframe:f,onComplete:p}=n;this.isPseudoElement=!!c,this.allowFlatten=u,this.options=n,Id(typeof n.type!="string");const m=A3(n);this.animation=M3(s,a,l,m,c),m.autoplay===!1&&this.animation.pause(),this.animation.onfinish=()=>{if(this.finishedTime=this.time,!c){const g=qd(l,this.options,f,this.speed);this.updateMotionValue?this.updateMotionValue(g):T3(s,a,g),this.animation.cancel()}p?.(),this.notifyFinished()}}play(){this.isStopped||(this.animation.play(),this.state==="finished"&&this.updateFinished())}pause(){this.animation.pause()}complete(){this.animation.finish?.()}cancel(){try{this.animation.cancel()}catch{}}stop(){if(this.isStopped)return;this.isStopped=!0;const{state:n}=this;n==="idle"||n==="finished"||(this.updateMotionValue?this.updateMotionValue():this.commitStyles(),this.isPseudoElement||this.cancel())}commitStyles(){this.isPseudoElement||this.animation.commitStyles?.()}get duration(){const n=this.animation.effect?.getComputedTiming?.().duration||0;return Ft(Number(n))}get iterationDuration(){const{delay:n=0}=this.options||{};return this.duration+Ft(n)}get time(){return Ft(Number(this.animation.currentTime)||0)}set time(n){this.finishedTime=null,this.animation.currentTime=rn(n)}get speed(){return this.animation.playbackRate}set speed(n){n<0&&(this.finishedTime=null),this.animation.playbackRate=n}get state(){return this.finishedTime!==null?"finished":this.animation.playState}get startTime(){return Number(this.animation.startTime)}set startTime(n){this.animation.startTime=n}attachTimeline({timeline:n,observe:s}){return this.allowFlatten&&this.animation.effect?.updateTiming({easing:"linear"}),this.animation.onfinish=null,n&&z3()?(this.animation.timeline=n,It):s(this)}}const wg={anticipate:Jm,backInOut:Zm,circInOut:tg};function D3(e){return e in wg}function F3(e){typeof e.ease=="string"&&D3(e.ease)&&(e.ease=wg[e.ease])}const Qf=10;class R3 extends L3{constructor(n){F3(n),mg(n),super(n),n.startTime&&(this.startTime=n.startTime),this.options=n}updateMotionValue(n){const{motionValue:s,onUpdate:a,onComplete:l,element:c,...u}=this.options;if(!s)return;if(n!==void 0){s.set(n);return}const f=new Kd({...u,autoplay:!1}),p=rn(this.finishedTime??this.time);s.setWithVelocity(f.sample(p-Qf).value,f.sample(p).value,Qf),f.stop()}}const Zf=(e,n)=>n==="zIndex"?!1:!!(typeof e=="number"||Array.isArray(e)||typeof e=="string"&&(Kn.test(e)||e==="0")&&!e.startsWith("url("));function I3(e){const n=e[0];if(e.length===1)return!0;for(let s=0;s<e.length;s++)if(e[s]!==n)return!0}function O3(e,n,s,a){const l=e[0];if(l===null)return!1;if(n==="display"||n==="visibility")return!0;const c=e[e.length-1],u=Zf(l,n),f=Zf(c,n);return!u||!f?!1:I3(e)||(s==="spring"||yg(s))&&a}function ld(e){e.duration=0,e.type="keyframes"}const V3=new Set(["opacity","clipPath","filter","transform"]),B3=Od(()=>Object.hasOwnProperty.call(Element.prototype,"animate"));function _3(e){const{motionValue:n,name:s,repeatDelay:a,repeatType:l,damping:c,type:u}=e;if(!(n?.owner?.current instanceof HTMLElement))return!1;const{onUpdate:p,transformTemplate:m}=n.owner.getProps();return B3()&&s&&V3.has(s)&&(s!=="transform"||!m)&&!p&&!a&&l!=="mirror"&&c!==0&&u!=="inertia"}const W3=40;class U3 extends Xd{constructor({autoplay:n=!0,delay:s=0,type:a="keyframes",repeat:l=0,repeatDelay:c=0,repeatType:u="loop",keyframes:f,name:p,motionValue:m,element:g,...v}){super(),this.stop=()=>{this._animation&&(this._animation.stop(),this.stopTimeline?.()),this.keyframeResolver?.cancel()},this.createdAt=wt.now();const b={autoplay:n,delay:s,type:a,repeat:l,repeatDelay:c,repeatType:u,name:p,motionValue:m,element:g,...v},y=g?.KeyframeResolver||Qd;this.keyframeResolver=new y(f,(S,N,T)=>this.onKeyframesResolved(S,N,b,!T),p,m,g),this.keyframeResolver?.scheduleResolve()}onKeyframesResolved(n,s,a,l){this.keyframeResolver=void 0;const{name:c,type:u,velocity:f,delay:p,isHandoff:m,onUpdate:g}=a;this.resolvedAt=wt.now(),O3(n,c,u,f)||((Sn.instantAnimations||!p)&&g?.(qd(n,a,s)),n[0]=n[n.length-1],ld(a),a.repeat=0);const b={startTime:l?this.resolvedAt?this.resolvedAt-this.createdAt>W3?this.resolvedAt:this.createdAt:this.createdAt:void 0,finalKeyframe:s,...a,keyframes:n},y=!m&&_3(b)?new R3({...b,element:b.motionValue.owner.current}):new Kd(b);y.finished.then(()=>this.notifyFinished()).catch(It),this.pendingTimeline&&(this.stopTimeline=y.attachTimeline(this.pendingTimeline),this.pendingTimeline=void 0),this._animation=y}get finished(){return this._animation?this.animation.finished:this._finished}then(n,s){return this.finished.finally(n).then(()=>{})}get animation(){return this._animation||(this.keyframeResolver?.resume(),N3()),this._animation}get duration(){return this.animation.duration}get iterationDuration(){return this.animation.iterationDuration}get time(){return this.animation.time}set time(n){this.animation.time=n}get speed(){return this.animation.speed}get state(){return this.animation.state}set speed(n){this.animation.speed=n}get startTime(){return this.animation.startTime}attachTimeline(n){return this._animation?this.stopTimeline=this.animation.attachTimeline(n):this.pendingTimeline=n,()=>this.stop()}play(){this.animation.play()}pause(){this.animation.pause()}complete(){this.animation.complete()}cancel(){this._animation&&this.animation.cancel(),this.keyframeResolver?.cancel()}}const Y3=/^var\(--(?:([\w-]+)|([\w-]+), ?([a-zA-Z\d ()%#.,-]+))\)/u;function $3(e){const n=Y3.exec(e);if(!n)return[,];const[,s,a,l]=n;return[`--${s??a}`,l]}function jg(e,n,s=1){const[a,l]=$3(e);if(!a)return;const c=window.getComputedStyle(n).getPropertyValue(a);if(c){const u=c.trim();return Ym(u)?parseFloat(u):u}return Ud(l)?jg(l,n,s+1):l}function Zd(e,n){return e?.[n]??e?.default??e}const kg=new Set(["width","height","top","left","right","bottom",...lr]),H3={test:e=>e==="auto",parse:e=>e},Sg=e=>n=>n.test(e),Ng=[or,le,sn,Hn,I4,R4,H3],Jf=e=>Ng.find(Sg(e));function G3(e){return typeof e=="number"?e===0:e!==null?e==="none"||e==="0"||Hm(e):!0}const q3=new Set(["brightness","contrast","saturate","opacity"]);function X3(e){const[n,s]=e.slice(0,-1).split("(");if(n==="drop-shadow")return e;const[a]=s.match(Yd)||[];if(!a)return e;const l=s.replace(a,"");let c=q3.has(n)?1:0;return a!==s&&(c*=100),n+"("+c+l+")"}const K3=/\b([a-z-]*)\(.*?\)/gu,cd={...Kn,getAnimatableNone:e=>{const n=e.match(K3);return n?n.map(X3).join(" "):e}},eh={...or,transform:Math.round},Q3={rotate:Hn,rotateX:Hn,rotateY:Hn,rotateZ:Hn,scale:Va,scaleX:Va,scaleY:Va,scaleZ:Va,skew:Hn,skewX:Hn,skewY:Hn,distance:le,translateX:le,translateY:le,translateZ:le,x:le,y:le,z:le,perspective:le,transformPerspective:le,opacity:ps,originX:_f,originY:_f,originZ:le},Jd={borderWidth:le,borderTopWidth:le,borderRightWidth:le,borderBottomWidth:le,borderLeftWidth:le,borderRadius:le,radius:le,borderTopLeftRadius:le,borderTopRightRadius:le,borderBottomRightRadius:le,borderBottomLeftRadius:le,width:le,maxWidth:le,height:le,maxHeight:le,top:le,right:le,bottom:le,left:le,padding:le,paddingTop:le,paddingRight:le,paddingBottom:le,paddingLeft:le,margin:le,marginTop:le,marginRight:le,marginBottom:le,marginLeft:le,backgroundPositionX:le,backgroundPositionY:le,...Q3,zIndex:eh,fillOpacity:ps,strokeOpacity:ps,numOctaves:eh},Z3={...Jd,color:He,backgroundColor:He,outlineColor:He,fill:He,stroke:He,borderColor:He,borderTopColor:He,borderRightColor:He,borderBottomColor:He,borderLeftColor:He,filter:cd,WebkitFilter:cd},Cg=e=>Z3[e];function Tg(e,n){let s=Cg(e);return s!==cd&&(s=Kn),s.getAnimatableNone?s.getAnimatableNone(n):void 0}const J3=new Set(["auto","none","0"]);function ew(e,n,s){let a=0,l;for(;a<e.length&&!l;){const c=e[a];typeof c=="string"&&!J3.has(c)&&fs(c).values.length&&(l=e[a]),a++}if(l&&s)for(const c of n)e[c]=Tg(s,l)}class tw extends Qd{constructor(n,s,a,l,c){super(n,s,a,l,c,!0)}readKeyframes(){const{unresolvedKeyframes:n,element:s,name:a}=this;if(!s||!s.current)return;super.readKeyframes();for(let p=0;p<n.length;p++){let m=n[p];if(typeof m=="string"&&(m=m.trim(),Ud(m))){const g=jg(m,s.current);g!==void 0&&(n[p]=g),p===n.length-1&&(this.finalKeyframe=m)}}if(this.resolveNoneKeyframes(),!kg.has(a)||n.length!==2)return;const[l,c]=n,u=Jf(l),f=Jf(c);if(u!==f)if(Xf(u)&&Xf(f))for(let p=0;p<n.length;p++){const m=n[p];typeof m=="string"&&(n[p]=parseFloat(m))}else xi[a]&&(this.needsMeasurement=!0)}resolveNoneKeyframes(){const{unresolvedKeyframes:n,name:s}=this,a=[];for(let l=0;l<n.length;l++)(n[l]===null||G3(n[l]))&&a.push(l);a.length&&ew(n,a,s)}measureInitialState(){const{element:n,unresolvedKeyframes:s,name:a}=this;if(!n||!n.current)return;a==="height"&&(this.suspendedScrollY=window.pageYOffset),this.measuredOrigin=xi[a](n.measureViewportBox(),window.getComputedStyle(n.current)),s[0]=this.measuredOrigin;const l=s[s.length-1];l!==void 0&&n.getValue(a,l).jump(l,!1)}measureEndState(){const{element:n,name:s,unresolvedKeyframes:a}=this;if(!n||!n.current)return;const l=n.getValue(s);l&&l.jump(this.measuredOrigin,!1);const c=a.length-1,u=a[c];a[c]=xi[s](n.measureViewportBox(),window.getComputedStyle(n.current)),u!==null&&this.finalKeyframe===void 0&&(this.finalKeyframe=u),this.removedTransforms?.length&&this.removedTransforms.forEach(([f,p])=>{n.getValue(f).set(p)}),this.resolveNoneKeyframes()}}function nw(e,n,s){if(e instanceof EventTarget)return[e];if(typeof e=="string"){let a=document;const l=s?.[e]??a.querySelectorAll(e);return l?Array.from(l):[]}return Array.from(e)}const zg=(e,n)=>n&&typeof e=="number"?n.transform(e):e;function Eg(e){return $m(e)&&"offsetHeight"in e}const th=30,iw=e=>!isNaN(parseFloat(e));class rw{constructor(n,s={}){this.canTrackVelocity=null,this.events={},this.updateAndNotify=a=>{const l=wt.now();if(this.updatedAt!==l&&this.setPrevFrameValue(),this.prev=this.current,this.setCurrent(a),this.current!==this.prev&&(this.events.change?.notify(this.current),this.dependents))for(const c of this.dependents)c.dirty()},this.hasAnimated=!1,this.setCurrent(n),this.owner=s.owner}setCurrent(n){this.current=n,this.updatedAt=wt.now(),this.canTrackVelocity===null&&n!==void 0&&(this.canTrackVelocity=iw(this.current))}setPrevFrameValue(n=this.current){this.prevFrameValue=n,this.prevUpdatedAt=this.updatedAt}onChange(n){return this.on("change",n)}on(n,s){this.events[n]||(this.events[n]=new Vd);const a=this.events[n].add(s);return n==="change"?()=>{a(),Me.read(()=>{this.events.change.getSize()||this.stop()})}:a}clearListeners(){for(const n in this.events)this.events[n].clear()}attach(n,s){this.passiveEffect=n,this.stopPassiveEffect=s}set(n){this.passiveEffect?this.passiveEffect(n,this.updateAndNotify):this.updateAndNotify(n)}setWithVelocity(n,s,a){this.set(s),this.prev=void 0,this.prevFrameValue=n,this.prevUpdatedAt=this.updatedAt-a}jump(n,s=!0){this.updateAndNotify(n),this.prev=n,this.prevUpdatedAt=this.prevFrameValue=void 0,s&&this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}dirty(){this.events.change?.notify(this.current)}addDependent(n){this.dependents||(this.dependents=new Set),this.dependents.add(n)}removeDependent(n){this.dependents&&this.dependents.delete(n)}get(){return this.current}getPrevious(){return this.prev}getVelocity(){const n=wt.now();if(!this.canTrackVelocity||this.prevFrameValue===void 0||n-this.updatedAt>th)return 0;const s=Math.min(this.updatedAt-this.prevUpdatedAt,th);return Gm(parseFloat(this.current)-parseFloat(this.prevFrameValue),s)}start(n){return this.stop(),new Promise(s=>{this.hasAnimated=!0,this.animation=n(s),this.events.animationStart&&this.events.animationStart.notify()}).then(()=>{this.events.animationComplete&&this.events.animationComplete.notify(),this.clearAnimation()})}stop(){this.animation&&(this.animation.stop(),this.events.animationCancel&&this.events.animationCancel.notify()),this.clearAnimation()}isAnimating(){return!!this.animation}clearAnimation(){delete this.animation}destroy(){this.dependents?.clear(),this.events.destroy?.notify(),this.clearListeners(),this.stop(),this.stopPassiveEffect&&this.stopPassiveEffect()}}function ir(e,n){return new rw(e,n)}const{schedule:eu}=rg(queueMicrotask,!1),Ht={x:!1,y:!1};function Pg(){return Ht.x||Ht.y}function sw(e){return e==="x"||e==="y"?Ht[e]?null:(Ht[e]=!0,()=>{Ht[e]=!1}):Ht.x||Ht.y?null:(Ht.x=Ht.y=!0,()=>{Ht.x=Ht.y=!1})}function Mg(e,n){const s=nw(e),a=new AbortController,l={passive:!0,...n,signal:a.signal};return[s,l,()=>a.abort()]}function nh(e){return!(e.pointerType==="touch"||Pg())}function aw(e,n,s={}){const[a,l,c]=Mg(e,s),u=f=>{if(!nh(f))return;const{target:p}=f,m=n(p,f);if(typeof m!="function"||!p)return;const g=v=>{nh(v)&&(m(v),p.removeEventListener("pointerleave",g))};p.addEventListener("pointerleave",g,l)};return a.forEach(f=>{f.addEventListener("pointerenter",u,l)}),c}const Ag=(e,n)=>n?e===n?!0:Ag(e,n.parentElement):!1,tu=e=>e.pointerType==="mouse"?typeof e.button!="number"||e.button<=0:e.isPrimary!==!1,ow=new Set(["BUTTON","INPUT","SELECT","TEXTAREA","A"]);function lw(e){return ow.has(e.tagName)||e.tabIndex!==-1}const Ha=new WeakSet;function ih(e){return n=>{n.key==="Enter"&&e(n)}}function Mc(e,n){e.dispatchEvent(new PointerEvent("pointer"+n,{isPrimary:!0,bubbles:!0}))}const cw=(e,n)=>{const s=e.currentTarget;if(!s)return;const a=ih(()=>{if(Ha.has(s))return;Mc(s,"down");const l=ih(()=>{Mc(s,"up")}),c=()=>Mc(s,"cancel");s.addEventListener("keyup",l,n),s.addEventListener("blur",c,n)});s.addEventListener("keydown",a,n),s.addEventListener("blur",()=>s.removeEventListener("keydown",a),n)};function rh(e){return tu(e)&&!Pg()}function dw(e,n,s={}){const[a,l,c]=Mg(e,s),u=f=>{const p=f.currentTarget;if(!rh(f))return;Ha.add(p);const m=n(p,f),g=(y,S)=>{window.removeEventListener("pointerup",v),window.removeEventListener("pointercancel",b),Ha.has(p)&&Ha.delete(p),rh(y)&&typeof m=="function"&&m(y,{success:S})},v=y=>{g(y,p===window||p===document||s.useGlobalTarget||Ag(p,y.target))},b=y=>{g(y,!1)};window.addEventListener("pointerup",v,l),window.addEventListener("pointercancel",b,l)};return a.forEach(f=>{(s.useGlobalTarget?window:f).addEventListener("pointerdown",u,l),Eg(f)&&(f.addEventListener("focus",m=>cw(m,l)),!lw(f)&&!f.hasAttribute("tabindex")&&(f.tabIndex=0))}),c}function Lg(e){return $m(e)&&"ownerSVGElement"in e}function uw(e){return Lg(e)&&e.tagName==="svg"}const ct=e=>!!(e&&e.getVelocity),pw=[...Ng,He,Kn],fw=e=>pw.find(Sg(e)),nu=j.createContext({transformPagePoint:e=>e,isStatic:!1,reducedMotion:"never"});function sh(e,n){if(typeof e=="function")return e(n);e!=null&&(e.current=n)}function hw(...e){return n=>{let s=!1;const a=e.map(l=>{const c=sh(l,n);return!s&&typeof c=="function"&&(s=!0),c});if(s)return()=>{for(let l=0;l<a.length;l++){const c=a[l];typeof c=="function"?c():sh(e[l],null)}}}}function mw(...e){return j.useCallback(hw(...e),e)}class gw extends j.Component{getSnapshotBeforeUpdate(n){const s=this.props.childRef.current;if(s&&n.isPresent&&!this.props.isPresent){const a=s.offsetParent,l=Eg(a)&&a.offsetWidth||0,c=this.props.sizeRef.current;c.height=s.offsetHeight||0,c.width=s.offsetWidth||0,c.top=s.offsetTop,c.left=s.offsetLeft,c.right=l-c.width-c.left}return null}componentDidUpdate(){}render(){return this.props.children}}function xw({children:e,isPresent:n,anchorX:s,root:a}){const l=j.useId(),c=j.useRef(null),u=j.useRef({width:0,height:0,top:0,left:0,right:0}),{nonce:f}=j.useContext(nu),p=mw(c,e?.ref);return j.useInsertionEffect(()=>{const{width:m,height:g,top:v,left:b,right:y}=u.current;if(n||!c.current||!m||!g)return;const S=s==="left"?`left: ${b}`:`right: ${y}`;c.current.dataset.motionPopId=l;const N=document.createElement("style");f&&(N.nonce=f);const T=a??document.head;return T.appendChild(N),N.sheet&&N.sheet.insertRule(`
          [data-motion-pop-id="${l}"] {
            position: absolute !important;
            width: ${m}px !important;
            height: ${g}px !important;
            ${S}px !important;
            top: ${v}px !important;
          }
        `),()=>{T.contains(N)&&T.removeChild(N)}},[n]),i.jsx(gw,{isPresent:n,childRef:c,sizeRef:u,children:j.cloneElement(e,{ref:p})})}const vw=({children:e,initial:n,isPresent:s,onExitComplete:a,custom:l,presenceAffectsLayout:c,mode:u,anchorX:f,root:p})=>{const m=Ld(bw),g=j.useId();let v=!0,b=j.useMemo(()=>(v=!1,{id:g,initial:n,isPresent:s,custom:l,onExitComplete:y=>{m.set(y,!0);for(const S of m.values())if(!S)return;a&&a()},register:y=>(m.set(y,!1),()=>m.delete(y))}),[s,m,a]);return c&&v&&(b={...b}),j.useMemo(()=>{m.forEach((y,S)=>m.set(S,!1))},[s]),j.useEffect(()=>{!s&&!m.size&&a&&a()},[s]),u==="popLayout"&&(e=i.jsx(xw,{isPresent:s,anchorX:f,root:p,children:e})),i.jsx(mo.Provider,{value:b,children:e})};function bw(){return new Map}function Dg(e=!0){const n=j.useContext(mo);if(n===null)return[!0,null];const{isPresent:s,onExitComplete:a,register:l}=n,c=j.useId();j.useEffect(()=>{if(e)return l(c)},[e]);const u=j.useCallback(()=>e&&a&&a(c),[c,a,e]);return!s&&a?[!1,u]:[!0]}const Ba=e=>e.key||"";function ah(e){const n=[];return j.Children.forEach(e,s=>{j.isValidElement(s)&&n.push(s)}),n}const yw=({children:e,custom:n,initial:s=!0,onExitComplete:a,presenceAffectsLayout:l=!0,mode:c="sync",propagate:u=!1,anchorX:f="left",root:p})=>{const[m,g]=Dg(u),v=j.useMemo(()=>ah(e),[e]),b=u&&!m?[]:v.map(Ba),y=j.useRef(!0),S=j.useRef(v),N=Ld(()=>new Map),[T,L]=j.useState(v),[E,P]=j.useState(v);Um(()=>{y.current=!1,S.current=v;for(let F=0;F<E.length;F++){const _=Ba(E[F]);b.includes(_)?N.delete(_):N.get(_)!==!0&&N.set(_,!1)}},[E,b.length,b.join("-")]);const B=[];if(v!==T){let F=[...v];for(let _=0;_<E.length;_++){const D=E[_],H=Ba(D);b.includes(H)||(F.splice(_,0,D),B.push(D))}return c==="wait"&&B.length&&(F=B),P(ah(F)),L(v),null}const{forceRender:M}=j.useContext(Ad);return i.jsx(i.Fragment,{children:E.map(F=>{const _=Ba(F),D=u&&!m?!1:v===E||b.includes(_),H=()=>{if(N.has(_))N.set(_,!0);else return;let Y=!0;N.forEach(X=>{X||(Y=!1)}),Y&&(M?.(),P(S.current),u&&g?.(),a&&a())};return i.jsx(vw,{isPresent:D,initial:!y.current||s?void 0:!1,custom:n,presenceAffectsLayout:l,mode:c,root:p,onExitComplete:D?void 0:H,anchorX:f,children:F},_)})})},Fg=j.createContext({strict:!1}),oh={animation:["animate","variants","whileHover","whileTap","exit","whileInView","whileFocus","whileDrag"],exit:["exit"],drag:["drag","dragControls"],focus:["whileFocus"],hover:["whileHover","onHoverStart","onHoverEnd"],tap:["whileTap","onTap","onTapStart","onTapCancel"],pan:["onPan","onPanStart","onPanSessionStart","onPanEnd"],inView:["whileInView","onViewportEnter","onViewportLeave"],layout:["layout","layoutId"]},rr={};for(const e in oh)rr[e]={isEnabled:n=>oh[e].some(s=>!!n[s])};function ww(e){for(const n in e)rr[n]={...rr[n],...e[n]}}const jw=new Set(["animate","exit","variants","initial","style","values","variants","transition","transformTemplate","custom","inherit","onBeforeLayoutMeasure","onAnimationStart","onAnimationComplete","onUpdate","onDragStart","onDrag","onDragEnd","onMeasureDragConstraints","onDirectionLock","onDragTransitionEnd","_dragX","_dragY","onHoverStart","onHoverEnd","onViewportEnter","onViewportLeave","globalTapTarget","ignoreStrict","viewport"]);function oo(e){return e.startsWith("while")||e.startsWith("drag")&&e!=="draggable"||e.startsWith("layout")||e.startsWith("onTap")||e.startsWith("onPan")||e.startsWith("onLayout")||jw.has(e)}let Rg=e=>!oo(e);function kw(e){typeof e=="function"&&(Rg=n=>n.startsWith("on")?!oo(n):e(n))}try{kw(require("@emotion/is-prop-valid").default)}catch{}function Sw(e,n,s){const a={};for(const l in e)l==="values"&&typeof e.values=="object"||(Rg(l)||s===!0&&oo(l)||!n&&!oo(l)||e.draggable&&l.startsWith("onDrag"))&&(a[l]=e[l]);return a}const go=j.createContext({});function xo(e){return e!==null&&typeof e=="object"&&typeof e.start=="function"}function hs(e){return typeof e=="string"||Array.isArray(e)}const iu=["animate","whileInView","whileFocus","whileHover","whileTap","whileDrag","exit"],ru=["initial",...iu];function vo(e){return xo(e.animate)||ru.some(n=>hs(e[n]))}function Ig(e){return!!(vo(e)||e.variants)}function Nw(e,n){if(vo(e)){const{initial:s,animate:a}=e;return{initial:s===!1||hs(s)?s:void 0,animate:hs(a)?a:void 0}}return e.inherit!==!1?n:{}}function Cw(e){const{initial:n,animate:s}=Nw(e,j.useContext(go));return j.useMemo(()=>({initial:n,animate:s}),[lh(n),lh(s)])}function lh(e){return Array.isArray(e)?e.join(" "):e}const ms={};function Tw(e){for(const n in e)ms[n]=e[n],Wd(n)&&(ms[n].isCSSVariable=!0)}function Og(e,{layout:n,layoutId:s}){return cr.has(e)||e.startsWith("origin")||(n||s!==void 0)&&(!!ms[e]||e==="opacity")}const zw={x:"translateX",y:"translateY",z:"translateZ",transformPerspective:"perspective"},Ew=lr.length;function Pw(e,n,s){let a="",l=!0;for(let c=0;c<Ew;c++){const u=lr[c],f=e[u];if(f===void 0)continue;let p=!0;if(typeof f=="number"?p=f===(u.startsWith("scale")?1:0):p=parseFloat(f)===0,!p||s){const m=zg(f,Jd[u]);if(!p){l=!1;const g=zw[u]||u;a+=`${g}(${m}) `}s&&(n[u]=m)}}return a=a.trim(),s?a=s(n,l?"":a):l&&(a="none"),a}function su(e,n,s){const{style:a,vars:l,transformOrigin:c}=e;let u=!1,f=!1;for(const p in n){const m=n[p];if(cr.has(p)){u=!0;continue}else if(Wd(p)){l[p]=m;continue}else{const g=zg(m,Jd[p]);p.startsWith("origin")?(f=!0,c[p]=g):a[p]=g}}if(n.transform||(u||s?a.transform=Pw(n,e.transform,s):a.transform&&(a.transform="none")),f){const{originX:p="50%",originY:m="50%",originZ:g=0}=c;a.transformOrigin=`${p} ${m} ${g}`}}const au=()=>({style:{},transform:{},transformOrigin:{},vars:{}});function Vg(e,n,s){for(const a in n)!ct(n[a])&&!Og(a,s)&&(e[a]=n[a])}function Mw({transformTemplate:e},n){return j.useMemo(()=>{const s=au();return su(s,n,e),Object.assign({},s.vars,s.style)},[n])}function Aw(e,n){const s=e.style||{},a={};return Vg(a,s,e),Object.assign(a,Mw(e,n)),a}function Lw(e,n){const s={},a=Aw(e,n);return e.drag&&e.dragListener!==!1&&(s.draggable=!1,a.userSelect=a.WebkitUserSelect=a.WebkitTouchCallout="none",a.touchAction=e.drag===!0?"none":`pan-${e.drag==="x"?"y":"x"}`),e.tabIndex===void 0&&(e.onTap||e.onTapStart||e.whileTap)&&(s.tabIndex=0),s.style=a,s}const Dw={offset:"stroke-dashoffset",array:"stroke-dasharray"},Fw={offset:"strokeDashoffset",array:"strokeDasharray"};function Rw(e,n,s=1,a=0,l=!0){e.pathLength=1;const c=l?Dw:Fw;e[c.offset]=le.transform(-a);const u=le.transform(n),f=le.transform(s);e[c.array]=`${u} ${f}`}function Bg(e,{attrX:n,attrY:s,attrScale:a,pathLength:l,pathSpacing:c=1,pathOffset:u=0,...f},p,m,g){if(su(e,f,m),p){e.style.viewBox&&(e.attrs.viewBox=e.style.viewBox);return}e.attrs=e.style,e.style={};const{attrs:v,style:b}=e;v.transform&&(b.transform=v.transform,delete v.transform),(b.transform||v.transformOrigin)&&(b.transformOrigin=v.transformOrigin??"50% 50%",delete v.transformOrigin),b.transform&&(b.transformBox=g?.transformBox??"fill-box",delete v.transformBox),n!==void 0&&(v.x=n),s!==void 0&&(v.y=s),a!==void 0&&(v.scale=a),l!==void 0&&Rw(v,l,c,u,!1)}const _g=()=>({...au(),attrs:{}}),Wg=e=>typeof e=="string"&&e.toLowerCase()==="svg";function Iw(e,n,s,a){const l=j.useMemo(()=>{const c=_g();return Bg(c,n,Wg(a),e.transformTemplate,e.style),{...c.attrs,style:{...c.style}}},[n]);if(e.style){const c={};Vg(c,e.style,e),l.style={...c,...l.style}}return l}const Ow=["animate","circle","defs","desc","ellipse","g","image","line","filter","marker","mask","metadata","path","pattern","polygon","polyline","rect","stop","switch","symbol","svg","text","tspan","use","view"];function ou(e){return typeof e!="string"||e.includes("-")?!1:!!(Ow.indexOf(e)>-1||/[A-Z]/u.test(e))}function Vw(e,n,s,{latestValues:a},l,c=!1){const f=(ou(e)?Iw:Lw)(n,a,l,e),p=Sw(n,typeof e=="string",c),m=e!==j.Fragment?{...p,...f,ref:s}:{},{children:g}=n,v=j.useMemo(()=>ct(g)?g.get():g,[g]);return j.createElement(e,{...m,children:v})}function ch(e){const n=[{},{}];return e?.values.forEach((s,a)=>{n[0][a]=s.get(),n[1][a]=s.getVelocity()}),n}function lu(e,n,s,a){if(typeof n=="function"){const[l,c]=ch(a);n=n(s!==void 0?s:e.custom,l,c)}if(typeof n=="string"&&(n=e.variants&&e.variants[n]),typeof n=="function"){const[l,c]=ch(a);n=n(s!==void 0?s:e.custom,l,c)}return n}function Ga(e){return ct(e)?e.get():e}function Bw({scrapeMotionValuesFromProps:e,createRenderState:n},s,a,l){return{latestValues:_w(s,a,l,e),renderState:n()}}function _w(e,n,s,a){const l={},c=a(e,{});for(const b in c)l[b]=Ga(c[b]);let{initial:u,animate:f}=e;const p=vo(e),m=Ig(e);n&&m&&!p&&e.inherit!==!1&&(u===void 0&&(u=n.initial),f===void 0&&(f=n.animate));let g=s?s.initial===!1:!1;g=g||u===!1;const v=g?f:u;if(v&&typeof v!="boolean"&&!xo(v)){const b=Array.isArray(v)?v:[v];for(let y=0;y<b.length;y++){const S=lu(e,b[y]);if(S){const{transitionEnd:N,transition:T,...L}=S;for(const E in L){let P=L[E];if(Array.isArray(P)){const B=g?P.length-1:0;P=P[B]}P!==null&&(l[E]=P)}for(const E in N)l[E]=N[E]}}}return l}const Ug=e=>(n,s)=>{const a=j.useContext(go),l=j.useContext(mo),c=()=>Bw(e,n,a,l);return s?c():Ld(c)};function cu(e,n,s){const{style:a}=e,l={};for(const c in a)(ct(a[c])||n.style&&ct(n.style[c])||Og(c,e)||s?.getValue(c)?.liveStyle!==void 0)&&(l[c]=a[c]);return l}const Ww=Ug({scrapeMotionValuesFromProps:cu,createRenderState:au});function Yg(e,n,s){const a=cu(e,n,s);for(const l in e)if(ct(e[l])||ct(n[l])){const c=lr.indexOf(l)!==-1?"attr"+l.charAt(0).toUpperCase()+l.substring(1):l;a[c]=e[l]}return a}const Uw=Ug({scrapeMotionValuesFromProps:Yg,createRenderState:_g}),Yw=Symbol.for("motionComponentSymbol");function qi(e){return e&&typeof e=="object"&&Object.prototype.hasOwnProperty.call(e,"current")}function $w(e,n,s){return j.useCallback(a=>{a&&e.onMount&&e.onMount(a),n&&(a?n.mount(a):n.unmount()),s&&(typeof s=="function"?s(a):qi(s)&&(s.current=a))},[n])}const du=e=>e.replace(/([a-z])([A-Z])/gu,"$1-$2").toLowerCase(),Hw="framerAppearId",$g="data-"+du(Hw),Hg=j.createContext({});function Gw(e,n,s,a,l){const{visualElement:c}=j.useContext(go),u=j.useContext(Fg),f=j.useContext(mo),p=j.useContext(nu).reducedMotion,m=j.useRef(null);a=a||u.renderer,!m.current&&a&&(m.current=a(e,{visualState:n,parent:c,props:s,presenceContext:f,blockInitialAnimation:f?f.initial===!1:!1,reducedMotionConfig:p}));const g=m.current,v=j.useContext(Hg);g&&!g.projection&&l&&(g.type==="html"||g.type==="svg")&&qw(m.current,s,l,v);const b=j.useRef(!1);j.useInsertionEffect(()=>{g&&b.current&&g.update(s,f)});const y=s[$g],S=j.useRef(!!y&&!window.MotionHandoffIsComplete?.(y)&&window.MotionHasOptimisedAnimation?.(y));return Um(()=>{g&&(b.current=!0,window.MotionIsMounted=!0,g.updateFeatures(),g.scheduleRenderMicrotask(),S.current&&g.animationState&&g.animationState.animateChanges())}),j.useEffect(()=>{g&&(!S.current&&g.animationState&&g.animationState.animateChanges(),S.current&&(queueMicrotask(()=>{window.MotionHandoffMarkAsComplete?.(y)}),S.current=!1),g.enteringChildren=void 0)}),g}function qw(e,n,s,a){const{layoutId:l,layout:c,drag:u,dragConstraints:f,layoutScroll:p,layoutRoot:m,layoutCrossfade:g}=n;e.projection=new s(e.latestValues,n["data-framer-portal-id"]?void 0:Gg(e.parent)),e.projection.setOptions({layoutId:l,layout:c,alwaysMeasureLayout:!!u||f&&qi(f),visualElement:e,animationType:typeof c=="string"?c:"both",initialPromotionConfig:a,crossfade:g,layoutScroll:p,layoutRoot:m})}function Gg(e){if(e)return e.options.allowProjection!==!1?e.projection:Gg(e.parent)}function Ac(e,{forwardMotionProps:n=!1}={},s,a){s&&ww(s);const l=ou(e)?Uw:Ww;function c(f,p){let m;const g={...j.useContext(nu),...f,layoutId:Xw(f)},{isStatic:v}=g,b=Cw(f),y=l(f,v);if(!v&&Dd){Kw();const S=Qw(g);m=S.MeasureLayout,b.visualElement=Gw(e,y,g,a,S.ProjectionNode)}return i.jsxs(go.Provider,{value:b,children:[m&&b.visualElement?i.jsx(m,{visualElement:b.visualElement,...g}):null,Vw(e,f,$w(y,b.visualElement,p),y,v,n)]})}c.displayName=`motion.${typeof e=="string"?e:`create(${e.displayName??e.name??""})`}`;const u=j.forwardRef(c);return u[Yw]=e,u}function Xw({layoutId:e}){const n=j.useContext(Ad).id;return n&&e!==void 0?n+"-"+e:e}function Kw(e,n){j.useContext(Fg).strict}function Qw(e){const{drag:n,layout:s}=rr;if(!n&&!s)return{};const a={...n,...s};return{MeasureLayout:n?.isEnabled(e)||s?.isEnabled(e)?a.MeasureLayout:void 0,ProjectionNode:a.ProjectionNode}}function Zw(e,n){if(typeof Proxy>"u")return Ac;const s=new Map,a=(c,u)=>Ac(c,u,e,n),l=(c,u)=>a(c,u);return new Proxy(l,{get:(c,u)=>u==="create"?a:(s.has(u)||s.set(u,Ac(u,void 0,e,n)),s.get(u))})}function qg({top:e,left:n,right:s,bottom:a}){return{x:{min:n,max:s},y:{min:e,max:a}}}function Jw({x:e,y:n}){return{top:n.min,right:e.max,bottom:n.max,left:e.min}}function e6(e,n){if(!n)return e;const s=n({x:e.left,y:e.top}),a=n({x:e.right,y:e.bottom});return{top:s.y,left:s.x,bottom:a.y,right:a.x}}function Lc(e){return e===void 0||e===1}function dd({scale:e,scaleX:n,scaleY:s}){return!Lc(e)||!Lc(n)||!Lc(s)}function fi(e){return dd(e)||Xg(e)||e.z||e.rotate||e.rotateX||e.rotateY||e.skewX||e.skewY}function Xg(e){return dh(e.x)||dh(e.y)}function dh(e){return e&&e!=="0%"}function lo(e,n,s){const a=e-s,l=n*a;return s+l}function uh(e,n,s,a,l){return l!==void 0&&(e=lo(e,l,a)),lo(e,s,a)+n}function ud(e,n=0,s=1,a,l){e.min=uh(e.min,n,s,a,l),e.max=uh(e.max,n,s,a,l)}function Kg(e,{x:n,y:s}){ud(e.x,n.translate,n.scale,n.originPoint),ud(e.y,s.translate,s.scale,s.originPoint)}const ph=.999999999999,fh=1.0000000000001;function t6(e,n,s,a=!1){const l=s.length;if(!l)return;n.x=n.y=1;let c,u;for(let f=0;f<l;f++){c=s[f],u=c.projectionDelta;const{visualElement:p}=c.options;p&&p.props.style&&p.props.style.display==="contents"||(a&&c.options.layoutScroll&&c.scroll&&c!==c.root&&Ki(e,{x:-c.scroll.offset.x,y:-c.scroll.offset.y}),u&&(n.x*=u.x.scale,n.y*=u.y.scale,Kg(e,u)),a&&fi(c.latestValues)&&Ki(e,c.latestValues))}n.x<fh&&n.x>ph&&(n.x=1),n.y<fh&&n.y>ph&&(n.y=1)}function Xi(e,n){e.min=e.min+n,e.max=e.max+n}function hh(e,n,s,a,l=.5){const c=Fe(e.min,e.max,l);ud(e,n,s,c,a)}function Ki(e,n){hh(e.x,n.x,n.scaleX,n.scale,n.originX),hh(e.y,n.y,n.scaleY,n.scale,n.originY)}function Qg(e,n){return qg(e6(e.getBoundingClientRect(),n))}function n6(e,n,s){const a=Qg(e,s),{scroll:l}=n;return l&&(Xi(a.x,l.offset.x),Xi(a.y,l.offset.y)),a}const mh=()=>({translate:0,scale:1,origin:0,originPoint:0}),Qi=()=>({x:mh(),y:mh()}),gh=()=>({min:0,max:0}),Ye=()=>({x:gh(),y:gh()}),pd={current:null},Zg={current:!1};function i6(){if(Zg.current=!0,!!Dd)if(window.matchMedia){const e=window.matchMedia("(prefers-reduced-motion)"),n=()=>pd.current=e.matches;e.addEventListener("change",n),n()}else pd.current=!1}const r6=new WeakMap;function s6(e,n,s){for(const a in n){const l=n[a],c=s[a];if(ct(l))e.addValue(a,l);else if(ct(c))e.addValue(a,ir(l,{owner:e}));else if(c!==l)if(e.hasValue(a)){const u=e.getValue(a);u.liveStyle===!0?u.jump(l):u.hasAnimated||u.set(l)}else{const u=e.getStaticValue(a);e.addValue(a,ir(u!==void 0?u:l,{owner:e}))}}for(const a in s)n[a]===void 0&&e.removeValue(a);return n}const xh=["AnimationStart","AnimationComplete","Update","BeforeLayoutMeasure","LayoutMeasure","LayoutAnimationStart","LayoutAnimationComplete"];class a6{scrapeMotionValuesFromProps(n,s,a){return{}}constructor({parent:n,props:s,presenceContext:a,reducedMotionConfig:l,blockInitialAnimation:c,visualState:u},f={}){this.current=null,this.children=new Set,this.isVariantNode=!1,this.isControllingVariants=!1,this.shouldReduceMotion=null,this.values=new Map,this.KeyframeResolver=Qd,this.features={},this.valueSubscriptions=new Map,this.prevMotionValues={},this.events={},this.propEventSubscriptions={},this.notifyUpdate=()=>this.notify("Update",this.latestValues),this.render=()=>{this.current&&(this.triggerBuild(),this.renderInstance(this.current,this.renderState,this.props.style,this.projection))},this.renderScheduledAt=0,this.scheduleRender=()=>{const b=wt.now();this.renderScheduledAt<b&&(this.renderScheduledAt=b,Me.render(this.render,!1,!0))};const{latestValues:p,renderState:m}=u;this.latestValues=p,this.baseTarget={...p},this.initialValues=s.initial?{...p}:{},this.renderState=m,this.parent=n,this.props=s,this.presenceContext=a,this.depth=n?n.depth+1:0,this.reducedMotionConfig=l,this.options=f,this.blockInitialAnimation=!!c,this.isControllingVariants=vo(s),this.isVariantNode=Ig(s),this.isVariantNode&&(this.variantChildren=new Set),this.manuallyAnimateOnMount=!!(n&&n.current);const{willChange:g,...v}=this.scrapeMotionValuesFromProps(s,{},this);for(const b in v){const y=v[b];p[b]!==void 0&&ct(y)&&y.set(p[b])}}mount(n){this.current=n,r6.set(n,this),this.projection&&!this.projection.instance&&this.projection.mount(n),this.parent&&this.isVariantNode&&!this.isControllingVariants&&(this.removeFromVariantTree=this.parent.addVariantChild(this)),this.values.forEach((s,a)=>this.bindToMotionValue(a,s)),Zg.current||i6(),this.shouldReduceMotion=this.reducedMotionConfig==="never"?!1:this.reducedMotionConfig==="always"?!0:pd.current,this.parent?.addChild(this),this.update(this.props,this.presenceContext)}unmount(){this.projection&&this.projection.unmount(),Xn(this.notifyUpdate),Xn(this.render),this.valueSubscriptions.forEach(n=>n()),this.valueSubscriptions.clear(),this.removeFromVariantTree&&this.removeFromVariantTree(),this.parent?.removeChild(this);for(const n in this.events)this.events[n].clear();for(const n in this.features){const s=this.features[n];s&&(s.unmount(),s.isMounted=!1)}this.current=null}addChild(n){this.children.add(n),this.enteringChildren??(this.enteringChildren=new Set),this.enteringChildren.add(n)}removeChild(n){this.children.delete(n),this.enteringChildren&&this.enteringChildren.delete(n)}bindToMotionValue(n,s){this.valueSubscriptions.has(n)&&this.valueSubscriptions.get(n)();const a=cr.has(n);a&&this.onBindTransform&&this.onBindTransform();const l=s.on("change",u=>{this.latestValues[n]=u,this.props.onUpdate&&Me.preRender(this.notifyUpdate),a&&this.projection&&(this.projection.isTransformDirty=!0),this.scheduleRender()});let c;window.MotionCheckAppearSync&&(c=window.MotionCheckAppearSync(this,n,s)),this.valueSubscriptions.set(n,()=>{l(),c&&c(),s.owner&&s.stop()})}sortNodePosition(n){return!this.current||!this.sortInstanceNodePosition||this.type!==n.type?0:this.sortInstanceNodePosition(this.current,n.current)}updateFeatures(){let n="animation";for(n in rr){const s=rr[n];if(!s)continue;const{isEnabled:a,Feature:l}=s;if(!this.features[n]&&l&&a(this.props)&&(this.features[n]=new l(this)),this.features[n]){const c=this.features[n];c.isMounted?c.update():(c.mount(),c.isMounted=!0)}}}triggerBuild(){this.build(this.renderState,this.latestValues,this.props)}measureViewportBox(){return this.current?this.measureInstanceViewportBox(this.current,this.props):Ye()}getStaticValue(n){return this.latestValues[n]}setStaticValue(n,s){this.latestValues[n]=s}update(n,s){(n.transformTemplate||this.props.transformTemplate)&&this.scheduleRender(),this.prevProps=this.props,this.props=n,this.prevPresenceContext=this.presenceContext,this.presenceContext=s;for(let a=0;a<xh.length;a++){const l=xh[a];this.propEventSubscriptions[l]&&(this.propEventSubscriptions[l](),delete this.propEventSubscriptions[l]);const c="on"+l,u=n[c];u&&(this.propEventSubscriptions[l]=this.on(l,u))}this.prevMotionValues=s6(this,this.scrapeMotionValuesFromProps(n,this.prevProps,this),this.prevMotionValues),this.handleChildMotionValue&&this.handleChildMotionValue()}getProps(){return this.props}getVariant(n){return this.props.variants?this.props.variants[n]:void 0}getDefaultTransition(){return this.props.transition}getTransformPagePoint(){return this.props.transformPagePoint}getClosestVariantNode(){return this.isVariantNode?this:this.parent?this.parent.getClosestVariantNode():void 0}addVariantChild(n){const s=this.getClosestVariantNode();if(s)return s.variantChildren&&s.variantChildren.add(n),()=>s.variantChildren.delete(n)}addValue(n,s){const a=this.values.get(n);s!==a&&(a&&this.removeValue(n),this.bindToMotionValue(n,s),this.values.set(n,s),this.latestValues[n]=s.get())}removeValue(n){this.values.delete(n);const s=this.valueSubscriptions.get(n);s&&(s(),this.valueSubscriptions.delete(n)),delete this.latestValues[n],this.removeValueFromRenderState(n,this.renderState)}hasValue(n){return this.values.has(n)}getValue(n,s){if(this.props.values&&this.props.values[n])return this.props.values[n];let a=this.values.get(n);return a===void 0&&s!==void 0&&(a=ir(s===null?void 0:s,{owner:this}),this.addValue(n,a)),a}readValue(n,s){let a=this.latestValues[n]!==void 0||!this.current?this.latestValues[n]:this.getBaseTargetFromProps(this.props,n)??this.readValueFromInstance(this.current,n,this.options);return a!=null&&(typeof a=="string"&&(Ym(a)||Hm(a))?a=parseFloat(a):!fw(a)&&Kn.test(s)&&(a=Tg(n,s)),this.setBaseTarget(n,ct(a)?a.get():a)),ct(a)?a.get():a}setBaseTarget(n,s){this.baseTarget[n]=s}getBaseTarget(n){const{initial:s}=this.props;let a;if(typeof s=="string"||typeof s=="object"){const c=lu(this.props,s,this.presenceContext?.custom);c&&(a=c[n])}if(s&&a!==void 0)return a;const l=this.getBaseTargetFromProps(this.props,n);return l!==void 0&&!ct(l)?l:this.initialValues[n]!==void 0&&a===void 0?void 0:this.baseTarget[n]}on(n,s){return this.events[n]||(this.events[n]=new Vd),this.events[n].add(s)}notify(n,...s){this.events[n]&&this.events[n].notify(...s)}scheduleRenderMicrotask(){eu.render(this.render)}}class Jg extends a6{constructor(){super(...arguments),this.KeyframeResolver=tw}sortInstanceNodePosition(n,s){return n.compareDocumentPosition(s)&2?1:-1}getBaseTargetFromProps(n,s){return n.style?n.style[s]:void 0}removeValueFromRenderState(n,{vars:s,style:a}){delete s[n],delete a[n]}handleChildMotionValue(){this.childSubscription&&(this.childSubscription(),delete this.childSubscription);const{children:n}=this.props;ct(n)&&(this.childSubscription=n.on("change",s=>{this.current&&(this.current.textContent=`${s}`)}))}}function e1(e,{style:n,vars:s},a,l){const c=e.style;let u;for(u in n)c[u]=n[u];l?.applyProjectionStyles(c,a);for(u in s)c.setProperty(u,s[u])}function o6(e){return window.getComputedStyle(e)}class l6 extends Jg{constructor(){super(...arguments),this.type="html",this.renderInstance=e1}readValueFromInstance(n,s){if(cr.has(s))return this.projection?.isProjecting?id(s):y3(n,s);{const a=o6(n),l=(Wd(s)?a.getPropertyValue(s):a[s])||0;return typeof l=="string"?l.trim():l}}measureInstanceViewportBox(n,{transformPagePoint:s}){return Qg(n,s)}build(n,s,a){su(n,s,a.transformTemplate)}scrapeMotionValuesFromProps(n,s,a){return cu(n,s,a)}}const t1=new Set(["baseFrequency","diffuseConstant","kernelMatrix","kernelUnitLength","keySplines","keyTimes","limitingConeAngle","markerHeight","markerWidth","numOctaves","targetX","targetY","surfaceScale","specularConstant","specularExponent","stdDeviation","tableValues","viewBox","gradientTransform","pathLength","startOffset","textLength","lengthAdjust"]);function c6(e,n,s,a){e1(e,n,void 0,a);for(const l in n.attrs)e.setAttribute(t1.has(l)?l:du(l),n.attrs[l])}class d6 extends Jg{constructor(){super(...arguments),this.type="svg",this.isSVGTag=!1,this.measureInstanceViewportBox=Ye}getBaseTargetFromProps(n,s){return n[s]}readValueFromInstance(n,s){if(cr.has(s)){const a=Cg(s);return a&&a.default||0}return s=t1.has(s)?s:du(s),n.getAttribute(s)}scrapeMotionValuesFromProps(n,s,a){return Yg(n,s,a)}build(n,s,a){Bg(n,s,this.isSVGTag,a.transformTemplate,a.style)}renderInstance(n,s,a,l){c6(n,s,a,l)}mount(n){this.isSVGTag=Wg(n.tagName),super.mount(n)}}const u6=(e,n)=>ou(e)?new d6(n):new l6(n,{allowProjection:e!==j.Fragment});function er(e,n,s){const a=e.getProps();return lu(a,n,s!==void 0?s:a.custom,e)}const fd=e=>Array.isArray(e);function p6(e,n,s){e.hasValue(n)?e.getValue(n).set(s):e.addValue(n,ir(s))}function f6(e){return fd(e)?e[e.length-1]||0:e}function h6(e,n){const s=er(e,n);let{transitionEnd:a={},transition:l={},...c}=s||{};c={...c,...a};for(const u in c){const f=f6(c[u]);p6(e,u,f)}}function m6(e){return!!(ct(e)&&e.add)}function hd(e,n){const s=e.getValue("willChange");if(m6(s))return s.add(n);if(!s&&Sn.WillChange){const a=new Sn.WillChange("auto");e.addValue("willChange",a),a.add(n)}}function n1(e){return e.props[$g]}const g6=e=>e!==null;function x6(e,{repeat:n,repeatType:s="loop"},a){const l=e.filter(g6),c=n&&s!=="loop"&&n%2===1?0:l.length-1;return l[c]}const v6={type:"spring",stiffness:500,damping:25,restSpeed:10},b6=e=>({type:"spring",stiffness:550,damping:e===0?2*Math.sqrt(550):30,restSpeed:10}),y6={type:"keyframes",duration:.8},w6={type:"keyframes",ease:[.25,.1,.35,1],duration:.3},j6=(e,{keyframes:n})=>n.length>2?y6:cr.has(e)?e.startsWith("scale")?b6(n[1]):v6:w6;function k6({when:e,delay:n,delayChildren:s,staggerChildren:a,staggerDirection:l,repeat:c,repeatType:u,repeatDelay:f,from:p,elapsed:m,...g}){return!!Object.keys(g).length}const uu=(e,n,s,a={},l,c)=>u=>{const f=Zd(a,e)||{},p=f.delay||a.delay||0;let{elapsed:m=0}=a;m=m-rn(p);const g={keyframes:Array.isArray(s)?s:[null,s],ease:"easeOut",velocity:n.getVelocity(),...f,delay:-m,onUpdate:b=>{n.set(b),f.onUpdate&&f.onUpdate(b)},onComplete:()=>{u(),f.onComplete&&f.onComplete()},name:e,motionValue:n,element:c?void 0:l};k6(f)||Object.assign(g,j6(e,g)),g.duration&&(g.duration=rn(g.duration)),g.repeatDelay&&(g.repeatDelay=rn(g.repeatDelay)),g.from!==void 0&&(g.keyframes[0]=g.from);let v=!1;if((g.type===!1||g.duration===0&&!g.repeatDelay)&&(ld(g),g.delay===0&&(v=!0)),(Sn.instantAnimations||Sn.skipAnimations)&&(v=!0,ld(g),g.delay=0),g.allowFlatten=!f.type&&!f.ease,v&&!c&&n.get()!==void 0){const b=x6(g.keyframes,f);if(b!==void 0){Me.update(()=>{g.onUpdate(b),g.onComplete()});return}}return f.isSync?new Kd(g):new U3(g)};function S6({protectedKeys:e,needsAnimating:n},s){const a=e.hasOwnProperty(s)&&n[s]!==!0;return n[s]=!1,a}function i1(e,n,{delay:s=0,transitionOverride:a,type:l}={}){let{transition:c=e.getDefaultTransition(),transitionEnd:u,...f}=n;a&&(c=a);const p=[],m=l&&e.animationState&&e.animationState.getState()[l];for(const g in f){const v=e.getValue(g,e.latestValues[g]??null),b=f[g];if(b===void 0||m&&S6(m,g))continue;const y={delay:s,...Zd(c||{},g)},S=v.get();if(S!==void 0&&!v.isAnimating&&!Array.isArray(b)&&b===S&&!y.velocity)continue;let N=!1;if(window.MotionHandoffAnimation){const L=n1(e);if(L){const E=window.MotionHandoffAnimation(L,g,Me);E!==null&&(y.startTime=E,N=!0)}}hd(e,g),v.start(uu(g,v,b,e.shouldReduceMotion&&kg.has(g)?{type:!1}:y,e,N));const T=v.animation;T&&p.push(T)}return u&&Promise.all(p).then(()=>{Me.update(()=>{u&&h6(e,u)})}),p}function r1(e,n,s,a=0,l=1){const c=Array.from(e).sort((m,g)=>m.sortNodePosition(g)).indexOf(n),u=e.size,f=(u-1)*a;return typeof s=="function"?s(c,u):l===1?c*a:f-c*a}function md(e,n,s={}){const a=er(e,n,s.type==="exit"?e.presenceContext?.custom:void 0);let{transition:l=e.getDefaultTransition()||{}}=a||{};s.transitionOverride&&(l=s.transitionOverride);const c=a?()=>Promise.all(i1(e,a,s)):()=>Promise.resolve(),u=e.variantChildren&&e.variantChildren.size?(p=0)=>{const{delayChildren:m=0,staggerChildren:g,staggerDirection:v}=l;return N6(e,n,p,m,g,v,s)}:()=>Promise.resolve(),{when:f}=l;if(f){const[p,m]=f==="beforeChildren"?[c,u]:[u,c];return p().then(()=>m())}else return Promise.all([c(),u(s.delay)])}function N6(e,n,s=0,a=0,l=0,c=1,u){const f=[];for(const p of e.variantChildren)p.notify("AnimationStart",n),f.push(md(p,n,{...u,delay:s+(typeof a=="function"?0:a)+r1(e.variantChildren,p,a,l,c)}).then(()=>p.notify("AnimationComplete",n)));return Promise.all(f)}function C6(e,n,s={}){e.notify("AnimationStart",n);let a;if(Array.isArray(n)){const l=n.map(c=>md(e,c,s));a=Promise.all(l)}else if(typeof n=="string")a=md(e,n,s);else{const l=typeof n=="function"?er(e,n,s.custom):n;a=Promise.all(i1(e,l,s))}return a.then(()=>{e.notify("AnimationComplete",n)})}function s1(e,n){if(!Array.isArray(n))return!1;const s=n.length;if(s!==e.length)return!1;for(let a=0;a<s;a++)if(n[a]!==e[a])return!1;return!0}const T6=ru.length;function a1(e){if(!e)return;if(!e.isControllingVariants){const s=e.parent?a1(e.parent)||{}:{};return e.props.initial!==void 0&&(s.initial=e.props.initial),s}const n={};for(let s=0;s<T6;s++){const a=ru[s],l=e.props[a];(hs(l)||l===!1)&&(n[a]=l)}return n}const z6=[...iu].reverse(),E6=iu.length;function P6(e){return n=>Promise.all(n.map(({animation:s,options:a})=>C6(e,s,a)))}function M6(e){let n=P6(e),s=vh(),a=!0;const l=p=>(m,g)=>{const v=er(e,g,p==="exit"?e.presenceContext?.custom:void 0);if(v){const{transition:b,transitionEnd:y,...S}=v;m={...m,...S,...y}}return m};function c(p){n=p(e)}function u(p){const{props:m}=e,g=a1(e.parent)||{},v=[],b=new Set;let y={},S=1/0;for(let T=0;T<E6;T++){const L=z6[T],E=s[L],P=m[L]!==void 0?m[L]:g[L],B=hs(P),M=L===p?E.isActive:null;M===!1&&(S=T);let F=P===g[L]&&P!==m[L]&&B;if(F&&a&&e.manuallyAnimateOnMount&&(F=!1),E.protectedKeys={...y},!E.isActive&&M===null||!P&&!E.prevProp||xo(P)||typeof P=="boolean")continue;const _=A6(E.prevProp,P);let D=_||L===p&&E.isActive&&!F&&B||T>S&&B,H=!1;const Y=Array.isArray(P)?P:[P];let X=Y.reduce(l(L),{});M===!1&&(X={});const{prevResolvedValues:re={}}=E,ue={...re,...X},me=Z=>{D=!0,b.has(Z)&&(H=!0,b.delete(Z)),E.needsAnimating[Z]=!0;const O=e.getValue(Z);O&&(O.liveStyle=!1)};for(const Z in ue){const O=X[Z],G=re[Z];if(y.hasOwnProperty(Z))continue;let C=!1;fd(O)&&fd(G)?C=!s1(O,G):C=O!==G,C?O!=null?me(Z):b.add(Z):O!==void 0&&b.has(Z)?me(Z):E.protectedKeys[Z]=!0}E.prevProp=P,E.prevResolvedValues=X,E.isActive&&(y={...y,...X}),a&&e.blockInitialAnimation&&(D=!1);const we=F&&_;D&&(!we||H)&&v.push(...Y.map(Z=>{const O={type:L};if(typeof Z=="string"&&a&&!we&&e.manuallyAnimateOnMount&&e.parent){const{parent:G}=e,C=er(G,Z);if(G.enteringChildren&&C){const{delayChildren:W}=C.transition||{};O.delay=r1(G.enteringChildren,e,W)}}return{animation:Z,options:O}}))}if(b.size){const T={};if(typeof m.initial!="boolean"){const L=er(e,Array.isArray(m.initial)?m.initial[0]:m.initial);L&&L.transition&&(T.transition=L.transition)}b.forEach(L=>{const E=e.getBaseTarget(L),P=e.getValue(L);P&&(P.liveStyle=!0),T[L]=E??null}),v.push({animation:T})}let N=!!v.length;return a&&(m.initial===!1||m.initial===m.animate)&&!e.manuallyAnimateOnMount&&(N=!1),a=!1,N?n(v):Promise.resolve()}function f(p,m){if(s[p].isActive===m)return Promise.resolve();e.variantChildren?.forEach(v=>v.animationState?.setActive(p,m)),s[p].isActive=m;const g=u(p);for(const v in s)s[v].protectedKeys={};return g}return{animateChanges:u,setActive:f,setAnimateFunction:c,getState:()=>s,reset:()=>{s=vh()}}}function A6(e,n){return typeof n=="string"?n!==e:Array.isArray(n)?!s1(n,e):!1}function ui(e=!1){return{isActive:e,protectedKeys:{},needsAnimating:{},prevResolvedValues:{}}}function vh(){return{animate:ui(!0),whileInView:ui(),whileHover:ui(),whileTap:ui(),whileDrag:ui(),whileFocus:ui(),exit:ui()}}class Qn{constructor(n){this.isMounted=!1,this.node=n}update(){}}class L6 extends Qn{constructor(n){super(n),n.animationState||(n.animationState=M6(n))}updateAnimationControlsSubscription(){const{animate:n}=this.node.getProps();xo(n)&&(this.unmountControls=n.subscribe(this.node))}mount(){this.updateAnimationControlsSubscription()}update(){const{animate:n}=this.node.getProps(),{animate:s}=this.node.prevProps||{};n!==s&&this.updateAnimationControlsSubscription()}unmount(){this.node.animationState.reset(),this.unmountControls?.()}}let D6=0;class F6 extends Qn{constructor(){super(...arguments),this.id=D6++}update(){if(!this.node.presenceContext)return;const{isPresent:n,onExitComplete:s}=this.node.presenceContext,{isPresent:a}=this.node.prevPresenceContext||{};if(!this.node.animationState||n===a)return;const l=this.node.animationState.setActive("exit",!n);s&&!n&&l.then(()=>{s(this.id)})}mount(){const{register:n,onExitComplete:s}=this.node.presenceContext||{};s&&s(this.id),n&&(this.unmount=n(this.id))}unmount(){}}const R6={animation:{Feature:L6},exit:{Feature:F6}};function gs(e,n,s,a={passive:!0}){return e.addEventListener(n,s,a),()=>e.removeEventListener(n,s)}function ks(e){return{point:{x:e.pageX,y:e.pageY}}}const I6=e=>n=>tu(n)&&e(n,ks(n));function rs(e,n,s,a){return gs(e,n,I6(s),a)}const o1=1e-4,O6=1-o1,V6=1+o1,l1=.01,B6=0-l1,_6=0+l1;function pt(e){return e.max-e.min}function W6(e,n,s){return Math.abs(e-n)<=s}function bh(e,n,s,a=.5){e.origin=a,e.originPoint=Fe(n.min,n.max,e.origin),e.scale=pt(s)/pt(n),e.translate=Fe(s.min,s.max,e.origin)-e.originPoint,(e.scale>=O6&&e.scale<=V6||isNaN(e.scale))&&(e.scale=1),(e.translate>=B6&&e.translate<=_6||isNaN(e.translate))&&(e.translate=0)}function ss(e,n,s,a){bh(e.x,n.x,s.x,a?a.originX:void 0),bh(e.y,n.y,s.y,a?a.originY:void 0)}function yh(e,n,s){e.min=s.min+n.min,e.max=e.min+pt(n)}function U6(e,n,s){yh(e.x,n.x,s.x),yh(e.y,n.y,s.y)}function wh(e,n,s){e.min=n.min-s.min,e.max=e.min+pt(n)}function as(e,n,s){wh(e.x,n.x,s.x),wh(e.y,n.y,s.y)}function Dt(e){return[e("x"),e("y")]}const c1=({current:e})=>e?e.ownerDocument.defaultView:null,jh=(e,n)=>Math.abs(e-n);function Y6(e,n){const s=jh(e.x,n.x),a=jh(e.y,n.y);return Math.sqrt(s**2+a**2)}class d1{constructor(n,s,{transformPagePoint:a,contextWindow:l=window,dragSnapToOrigin:c=!1,distanceThreshold:u=3}={}){if(this.startEvent=null,this.lastMoveEvent=null,this.lastMoveEventInfo=null,this.handlers={},this.contextWindow=window,this.updatePoint=()=>{if(!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const b=Fc(this.lastMoveEventInfo,this.history),y=this.startEvent!==null,S=Y6(b.offset,{x:0,y:0})>=this.distanceThreshold;if(!y&&!S)return;const{point:N}=b,{timestamp:T}=nt;this.history.push({...N,timestamp:T});const{onStart:L,onMove:E}=this.handlers;y||(L&&L(this.lastMoveEvent,b),this.startEvent=this.lastMoveEvent),E&&E(this.lastMoveEvent,b)},this.handlePointerMove=(b,y)=>{this.lastMoveEvent=b,this.lastMoveEventInfo=Dc(y,this.transformPagePoint),Me.update(this.updatePoint,!0)},this.handlePointerUp=(b,y)=>{this.end();const{onEnd:S,onSessionEnd:N,resumeAnimation:T}=this.handlers;if(this.dragSnapToOrigin&&T&&T(),!(this.lastMoveEvent&&this.lastMoveEventInfo))return;const L=Fc(b.type==="pointercancel"?this.lastMoveEventInfo:Dc(y,this.transformPagePoint),this.history);this.startEvent&&S&&S(b,L),N&&N(b,L)},!tu(n))return;this.dragSnapToOrigin=c,this.handlers=s,this.transformPagePoint=a,this.distanceThreshold=u,this.contextWindow=l||window;const f=ks(n),p=Dc(f,this.transformPagePoint),{point:m}=p,{timestamp:g}=nt;this.history=[{...m,timestamp:g}];const{onSessionStart:v}=s;v&&v(n,Fc(p,this.history)),this.removeListeners=ys(rs(this.contextWindow,"pointermove",this.handlePointerMove),rs(this.contextWindow,"pointerup",this.handlePointerUp),rs(this.contextWindow,"pointercancel",this.handlePointerUp))}updateHandlers(n){this.handlers=n}end(){this.removeListeners&&this.removeListeners(),Xn(this.updatePoint)}}function Dc(e,n){return n?{point:n(e.point)}:e}function kh(e,n){return{x:e.x-n.x,y:e.y-n.y}}function Fc({point:e},n){return{point:e,delta:kh(e,u1(n)),offset:kh(e,$6(n)),velocity:H6(n,.1)}}function $6(e){return e[0]}function u1(e){return e[e.length-1]}function H6(e,n){if(e.length<2)return{x:0,y:0};let s=e.length-1,a=null;const l=u1(e);for(;s>=0&&(a=e[s],!(l.timestamp-a.timestamp>rn(n)));)s--;if(!a)return{x:0,y:0};const c=Ft(l.timestamp-a.timestamp);if(c===0)return{x:0,y:0};const u={x:(l.x-a.x)/c,y:(l.y-a.y)/c};return u.x===1/0&&(u.x=0),u.y===1/0&&(u.y=0),u}function G6(e,{min:n,max:s},a){return n!==void 0&&e<n?e=a?Fe(n,e,a.min):Math.max(e,n):s!==void 0&&e>s&&(e=a?Fe(s,e,a.max):Math.min(e,s)),e}function Sh(e,n,s){return{min:n!==void 0?e.min+n:void 0,max:s!==void 0?e.max+s-(e.max-e.min):void 0}}function q6(e,{top:n,left:s,bottom:a,right:l}){return{x:Sh(e.x,s,l),y:Sh(e.y,n,a)}}function Nh(e,n){let s=n.min-e.min,a=n.max-e.max;return n.max-n.min<e.max-e.min&&([s,a]=[a,s]),{min:s,max:a}}function X6(e,n){return{x:Nh(e.x,n.x),y:Nh(e.y,n.y)}}function K6(e,n){let s=.5;const a=pt(e),l=pt(n);return l>a?s=us(n.min,n.max-a,e.min):a>l&&(s=us(e.min,e.max-l,n.min)),kn(0,1,s)}function Q6(e,n){const s={};return n.min!==void 0&&(s.min=n.min-e.min),n.max!==void 0&&(s.max=n.max-e.min),s}const gd=.35;function Z6(e=gd){return e===!1?e=0:e===!0&&(e=gd),{x:Ch(e,"left","right"),y:Ch(e,"top","bottom")}}function Ch(e,n,s){return{min:Th(e,n),max:Th(e,s)}}function Th(e,n){return typeof e=="number"?e:e[n]||0}const J6=new WeakMap;class e8{constructor(n){this.openDragLock=null,this.isDragging=!1,this.currentDirection=null,this.originPoint={x:0,y:0},this.constraints=!1,this.hasMutatedConstraints=!1,this.elastic=Ye(),this.latestPointerEvent=null,this.latestPanInfo=null,this.visualElement=n}start(n,{snapToCursor:s=!1,distanceThreshold:a}={}){const{presenceContext:l}=this.visualElement;if(l&&l.isPresent===!1)return;const c=v=>{const{dragSnapToOrigin:b}=this.getProps();b?this.pauseAnimation():this.stopAnimation(),s&&this.snapToCursor(ks(v).point)},u=(v,b)=>{const{drag:y,dragPropagation:S,onDragStart:N}=this.getProps();if(y&&!S&&(this.openDragLock&&this.openDragLock(),this.openDragLock=sw(y),!this.openDragLock))return;this.latestPointerEvent=v,this.latestPanInfo=b,this.isDragging=!0,this.currentDirection=null,this.resolveConstraints(),this.visualElement.projection&&(this.visualElement.projection.isAnimationBlocked=!0,this.visualElement.projection.target=void 0),Dt(L=>{let E=this.getAxisMotionValue(L).get()||0;if(sn.test(E)){const{projection:P}=this.visualElement;if(P&&P.layout){const B=P.layout.layoutBox[L];B&&(E=pt(B)*(parseFloat(E)/100))}}this.originPoint[L]=E}),N&&Me.postRender(()=>N(v,b)),hd(this.visualElement,"transform");const{animationState:T}=this.visualElement;T&&T.setActive("whileDrag",!0)},f=(v,b)=>{this.latestPointerEvent=v,this.latestPanInfo=b;const{dragPropagation:y,dragDirectionLock:S,onDirectionLock:N,onDrag:T}=this.getProps();if(!y&&!this.openDragLock)return;const{offset:L}=b;if(S&&this.currentDirection===null){this.currentDirection=t8(L),this.currentDirection!==null&&N&&N(this.currentDirection);return}this.updateAxis("x",b.point,L),this.updateAxis("y",b.point,L),this.visualElement.render(),T&&T(v,b)},p=(v,b)=>{this.latestPointerEvent=v,this.latestPanInfo=b,this.stop(v,b),this.latestPointerEvent=null,this.latestPanInfo=null},m=()=>Dt(v=>this.getAnimationState(v)==="paused"&&this.getAxisMotionValue(v).animation?.play()),{dragSnapToOrigin:g}=this.getProps();this.panSession=new d1(n,{onSessionStart:c,onStart:u,onMove:f,onSessionEnd:p,resumeAnimation:m},{transformPagePoint:this.visualElement.getTransformPagePoint(),dragSnapToOrigin:g,distanceThreshold:a,contextWindow:c1(this.visualElement)})}stop(n,s){const a=n||this.latestPointerEvent,l=s||this.latestPanInfo,c=this.isDragging;if(this.cancel(),!c||!l||!a)return;const{velocity:u}=l;this.startAnimation(u);const{onDragEnd:f}=this.getProps();f&&Me.postRender(()=>f(a,l))}cancel(){this.isDragging=!1;const{projection:n,animationState:s}=this.visualElement;n&&(n.isAnimationBlocked=!1),this.panSession&&this.panSession.end(),this.panSession=void 0;const{dragPropagation:a}=this.getProps();!a&&this.openDragLock&&(this.openDragLock(),this.openDragLock=null),s&&s.setActive("whileDrag",!1)}updateAxis(n,s,a){const{drag:l}=this.getProps();if(!a||!_a(n,l,this.currentDirection))return;const c=this.getAxisMotionValue(n);let u=this.originPoint[n]+a[n];this.constraints&&this.constraints[n]&&(u=G6(u,this.constraints[n],this.elastic[n])),c.set(u)}resolveConstraints(){const{dragConstraints:n,dragElastic:s}=this.getProps(),a=this.visualElement.projection&&!this.visualElement.projection.layout?this.visualElement.projection.measure(!1):this.visualElement.projection?.layout,l=this.constraints;n&&qi(n)?this.constraints||(this.constraints=this.resolveRefConstraints()):n&&a?this.constraints=q6(a.layoutBox,n):this.constraints=!1,this.elastic=Z6(s),l!==this.constraints&&a&&this.constraints&&!this.hasMutatedConstraints&&Dt(c=>{this.constraints!==!1&&this.getAxisMotionValue(c)&&(this.constraints[c]=Q6(a.layoutBox[c],this.constraints[c]))})}resolveRefConstraints(){const{dragConstraints:n,onMeasureDragConstraints:s}=this.getProps();if(!n||!qi(n))return!1;const a=n.current,{projection:l}=this.visualElement;if(!l||!l.layout)return!1;const c=n6(a,l.root,this.visualElement.getTransformPagePoint());let u=X6(l.layout.layoutBox,c);if(s){const f=s(Jw(u));this.hasMutatedConstraints=!!f,f&&(u=qg(f))}return u}startAnimation(n){const{drag:s,dragMomentum:a,dragElastic:l,dragTransition:c,dragSnapToOrigin:u,onDragTransitionEnd:f}=this.getProps(),p=this.constraints||{},m=Dt(g=>{if(!_a(g,s,this.currentDirection))return;let v=p&&p[g]||{};u&&(v={min:0,max:0});const b=l?200:1e6,y=l?40:1e7,S={type:"inertia",velocity:a?n[g]:0,bounceStiffness:b,bounceDamping:y,timeConstant:750,restDelta:1,restSpeed:10,...c,...v};return this.startAxisValueAnimation(g,S)});return Promise.all(m).then(f)}startAxisValueAnimation(n,s){const a=this.getAxisMotionValue(n);return hd(this.visualElement,n),a.start(uu(n,a,0,s,this.visualElement,!1))}stopAnimation(){Dt(n=>this.getAxisMotionValue(n).stop())}pauseAnimation(){Dt(n=>this.getAxisMotionValue(n).animation?.pause())}getAnimationState(n){return this.getAxisMotionValue(n).animation?.state}getAxisMotionValue(n){const s=`_drag${n.toUpperCase()}`,a=this.visualElement.getProps(),l=a[s];return l||this.visualElement.getValue(n,(a.initial?a.initial[n]:void 0)||0)}snapToCursor(n){Dt(s=>{const{drag:a}=this.getProps();if(!_a(s,a,this.currentDirection))return;const{projection:l}=this.visualElement,c=this.getAxisMotionValue(s);if(l&&l.layout){const{min:u,max:f}=l.layout.layoutBox[s];c.set(n[s]-Fe(u,f,.5))}})}scalePositionWithinConstraints(){if(!this.visualElement.current)return;const{drag:n,dragConstraints:s}=this.getProps(),{projection:a}=this.visualElement;if(!qi(s)||!a||!this.constraints)return;this.stopAnimation();const l={x:0,y:0};Dt(u=>{const f=this.getAxisMotionValue(u);if(f&&this.constraints!==!1){const p=f.get();l[u]=K6({min:p,max:p},this.constraints[u])}});const{transformTemplate:c}=this.visualElement.getProps();this.visualElement.current.style.transform=c?c({},""):"none",a.root&&a.root.updateScroll(),a.updateLayout(),this.resolveConstraints(),Dt(u=>{if(!_a(u,n,null))return;const f=this.getAxisMotionValue(u),{min:p,max:m}=this.constraints[u];f.set(Fe(p,m,l[u]))})}addListeners(){if(!this.visualElement.current)return;J6.set(this.visualElement,this);const n=this.visualElement.current,s=rs(n,"pointerdown",p=>{const{drag:m,dragListener:g=!0}=this.getProps();m&&g&&this.start(p)}),a=()=>{const{dragConstraints:p}=this.getProps();qi(p)&&p.current&&(this.constraints=this.resolveRefConstraints())},{projection:l}=this.visualElement,c=l.addEventListener("measure",a);l&&!l.layout&&(l.root&&l.root.updateScroll(),l.updateLayout()),Me.read(a);const u=gs(window,"resize",()=>this.scalePositionWithinConstraints()),f=l.addEventListener("didUpdate",(({delta:p,hasLayoutChanged:m})=>{this.isDragging&&m&&(Dt(g=>{const v=this.getAxisMotionValue(g);v&&(this.originPoint[g]+=p[g].translate,v.set(v.get()+p[g].translate))}),this.visualElement.render())}));return()=>{u(),s(),c(),f&&f()}}getProps(){const n=this.visualElement.getProps(),{drag:s=!1,dragDirectionLock:a=!1,dragPropagation:l=!1,dragConstraints:c=!1,dragElastic:u=gd,dragMomentum:f=!0}=n;return{...n,drag:s,dragDirectionLock:a,dragPropagation:l,dragConstraints:c,dragElastic:u,dragMomentum:f}}}function _a(e,n,s){return(n===!0||n===e)&&(s===null||s===e)}function t8(e,n=10){let s=null;return Math.abs(e.y)>n?s="y":Math.abs(e.x)>n&&(s="x"),s}class n8 extends Qn{constructor(n){super(n),this.removeGroupControls=It,this.removeListeners=It,this.controls=new e8(n)}mount(){const{dragControls:n}=this.node.getProps();n&&(this.removeGroupControls=n.subscribe(this.controls)),this.removeListeners=this.controls.addListeners()||It}unmount(){this.removeGroupControls(),this.removeListeners()}}const zh=e=>(n,s)=>{e&&Me.postRender(()=>e(n,s))};class i8 extends Qn{constructor(){super(...arguments),this.removePointerDownListener=It}onPointerDown(n){this.session=new d1(n,this.createPanHandlers(),{transformPagePoint:this.node.getTransformPagePoint(),contextWindow:c1(this.node)})}createPanHandlers(){const{onPanSessionStart:n,onPanStart:s,onPan:a,onPanEnd:l}=this.node.getProps();return{onSessionStart:zh(n),onStart:zh(s),onMove:a,onEnd:(c,u)=>{delete this.session,l&&Me.postRender(()=>l(c,u))}}}mount(){this.removePointerDownListener=rs(this.node.current,"pointerdown",n=>this.onPointerDown(n))}update(){this.session&&this.session.updateHandlers(this.createPanHandlers())}unmount(){this.removePointerDownListener(),this.session&&this.session.end()}}const qa={hasAnimatedSinceResize:!0,hasEverUpdated:!1};function Eh(e,n){return n.max===n.min?0:e/(n.max-n.min)*100}const Qr={correct:(e,n)=>{if(!n.target)return e;if(typeof e=="string")if(le.test(e))e=parseFloat(e);else return e;const s=Eh(e,n.target.x),a=Eh(e,n.target.y);return`${s}% ${a}%`}},r8={correct:(e,{treeScale:n,projectionDelta:s})=>{const a=e,l=Kn.parse(e);if(l.length>5)return a;const c=Kn.createTransformer(e),u=typeof l[0]!="number"?1:0,f=s.x.scale*n.x,p=s.y.scale*n.y;l[0+u]/=f,l[1+u]/=p;const m=Fe(f,p,.5);return typeof l[2+u]=="number"&&(l[2+u]/=m),typeof l[3+u]=="number"&&(l[3+u]/=m),c(l)}};let Rc=!1;class s8 extends j.Component{componentDidMount(){const{visualElement:n,layoutGroup:s,switchLayoutGroup:a,layoutId:l}=this.props,{projection:c}=n;Tw(a8),c&&(s.group&&s.group.add(c),a&&a.register&&l&&a.register(c),Rc&&c.root.didUpdate(),c.addEventListener("animationComplete",()=>{this.safeToRemove()}),c.setOptions({...c.options,onExitComplete:()=>this.safeToRemove()})),qa.hasEverUpdated=!0}getSnapshotBeforeUpdate(n){const{layoutDependency:s,visualElement:a,drag:l,isPresent:c}=this.props,{projection:u}=a;return u&&(u.isPresent=c,Rc=!0,l||n.layoutDependency!==s||s===void 0||n.isPresent!==c?u.willUpdate():this.safeToRemove(),n.isPresent!==c&&(c?u.promote():u.relegate()||Me.postRender(()=>{const f=u.getStack();(!f||!f.members.length)&&this.safeToRemove()}))),null}componentDidUpdate(){const{projection:n}=this.props.visualElement;n&&(n.root.didUpdate(),eu.postRender(()=>{!n.currentAnimation&&n.isLead()&&this.safeToRemove()}))}componentWillUnmount(){const{visualElement:n,layoutGroup:s,switchLayoutGroup:a}=this.props,{projection:l}=n;Rc=!0,l&&(l.scheduleCheckAfterUnmount(),s&&s.group&&s.group.remove(l),a&&a.deregister&&a.deregister(l))}safeToRemove(){const{safeToRemove:n}=this.props;n&&n()}render(){return null}}function p1(e){const[n,s]=Dg(),a=j.useContext(Ad);return i.jsx(s8,{...e,layoutGroup:a,switchLayoutGroup:j.useContext(Hg),isPresent:n,safeToRemove:s})}const a8={borderRadius:{...Qr,applyTo:["borderTopLeftRadius","borderTopRightRadius","borderBottomLeftRadius","borderBottomRightRadius"]},borderTopLeftRadius:Qr,borderTopRightRadius:Qr,borderBottomLeftRadius:Qr,borderBottomRightRadius:Qr,boxShadow:r8};function o8(e,n,s){const a=ct(e)?e:ir(e);return a.start(uu("",a,n,s)),a.animation}const l8=(e,n)=>e.depth-n.depth;class c8{constructor(){this.children=[],this.isDirty=!1}add(n){Fd(this.children,n),this.isDirty=!0}remove(n){Rd(this.children,n),this.isDirty=!0}forEach(n){this.isDirty&&this.children.sort(l8),this.isDirty=!1,this.children.forEach(n)}}function d8(e,n){const s=wt.now(),a=({timestamp:l})=>{const c=l-s;c>=n&&(Xn(a),e(c-n))};return Me.setup(a,!0),()=>Xn(a)}const f1=["TopLeft","TopRight","BottomLeft","BottomRight"],u8=f1.length,Ph=e=>typeof e=="string"?parseFloat(e):e,Mh=e=>typeof e=="number"||le.test(e);function p8(e,n,s,a,l,c){l?(e.opacity=Fe(0,s.opacity??1,f8(a)),e.opacityExit=Fe(n.opacity??1,0,h8(a))):c&&(e.opacity=Fe(n.opacity??1,s.opacity??1,a));for(let u=0;u<u8;u++){const f=`border${f1[u]}Radius`;let p=Ah(n,f),m=Ah(s,f);if(p===void 0&&m===void 0)continue;p||(p=0),m||(m=0),p===0||m===0||Mh(p)===Mh(m)?(e[f]=Math.max(Fe(Ph(p),Ph(m),a),0),(sn.test(m)||sn.test(p))&&(e[f]+="%")):e[f]=m}(n.rotate||s.rotate)&&(e.rotate=Fe(n.rotate||0,s.rotate||0,a))}function Ah(e,n){return e[n]!==void 0?e[n]:e.borderRadius}const f8=h1(0,.5,eg),h8=h1(.5,.95,It);function h1(e,n,s){return a=>a<e?0:a>n?1:s(us(e,n,a))}function Lh(e,n){e.min=n.min,e.max=n.max}function Lt(e,n){Lh(e.x,n.x),Lh(e.y,n.y)}function Dh(e,n){e.translate=n.translate,e.scale=n.scale,e.originPoint=n.originPoint,e.origin=n.origin}function Fh(e,n,s,a,l){return e-=n,e=lo(e,1/s,a),l!==void 0&&(e=lo(e,1/l,a)),e}function m8(e,n=0,s=1,a=.5,l,c=e,u=e){if(sn.test(n)&&(n=parseFloat(n),n=Fe(u.min,u.max,n/100)-u.min),typeof n!="number")return;let f=Fe(c.min,c.max,a);e===c&&(f-=n),e.min=Fh(e.min,n,s,f,l),e.max=Fh(e.max,n,s,f,l)}function Rh(e,n,[s,a,l],c,u){m8(e,n[s],n[a],n[l],n.scale,c,u)}const g8=["x","scaleX","originX"],x8=["y","scaleY","originY"];function Ih(e,n,s,a){Rh(e.x,n,g8,s?s.x:void 0,a?a.x:void 0),Rh(e.y,n,x8,s?s.y:void 0,a?a.y:void 0)}function Oh(e){return e.translate===0&&e.scale===1}function m1(e){return Oh(e.x)&&Oh(e.y)}function Vh(e,n){return e.min===n.min&&e.max===n.max}function v8(e,n){return Vh(e.x,n.x)&&Vh(e.y,n.y)}function Bh(e,n){return Math.round(e.min)===Math.round(n.min)&&Math.round(e.max)===Math.round(n.max)}function g1(e,n){return Bh(e.x,n.x)&&Bh(e.y,n.y)}function _h(e){return pt(e.x)/pt(e.y)}function Wh(e,n){return e.translate===n.translate&&e.scale===n.scale&&e.originPoint===n.originPoint}class b8{constructor(){this.members=[]}add(n){Fd(this.members,n),n.scheduleRender()}remove(n){if(Rd(this.members,n),n===this.prevLead&&(this.prevLead=void 0),n===this.lead){const s=this.members[this.members.length-1];s&&this.promote(s)}}relegate(n){const s=this.members.findIndex(l=>n===l);if(s===0)return!1;let a;for(let l=s;l>=0;l--){const c=this.members[l];if(c.isPresent!==!1){a=c;break}}return a?(this.promote(a),!0):!1}promote(n,s){const a=this.lead;if(n!==a&&(this.prevLead=a,this.lead=n,n.show(),a)){a.instance&&a.scheduleRender(),n.scheduleRender(),n.resumeFrom=a,s&&(n.resumeFrom.preserveOpacity=!0),a.snapshot&&(n.snapshot=a.snapshot,n.snapshot.latestValues=a.animationValues||a.latestValues),n.root&&n.root.isUpdating&&(n.isLayoutDirty=!0);const{crossfade:l}=n.options;l===!1&&a.hide()}}exitAnimationComplete(){this.members.forEach(n=>{const{options:s,resumingFrom:a}=n;s.onExitComplete&&s.onExitComplete(),a&&a.options.onExitComplete&&a.options.onExitComplete()})}scheduleRender(){this.members.forEach(n=>{n.instance&&n.scheduleRender(!1)})}removeLeadSnapshot(){this.lead&&this.lead.snapshot&&(this.lead.snapshot=void 0)}}function y8(e,n,s){let a="";const l=e.x.translate/n.x,c=e.y.translate/n.y,u=s?.z||0;if((l||c||u)&&(a=`translate3d(${l}px, ${c}px, ${u}px) `),(n.x!==1||n.y!==1)&&(a+=`scale(${1/n.x}, ${1/n.y}) `),s){const{transformPerspective:m,rotate:g,rotateX:v,rotateY:b,skewX:y,skewY:S}=s;m&&(a=`perspective(${m}px) ${a}`),g&&(a+=`rotate(${g}deg) `),v&&(a+=`rotateX(${v}deg) `),b&&(a+=`rotateY(${b}deg) `),y&&(a+=`skewX(${y}deg) `),S&&(a+=`skewY(${S}deg) `)}const f=e.x.scale*n.x,p=e.y.scale*n.y;return(f!==1||p!==1)&&(a+=`scale(${f}, ${p})`),a||"none"}const Ic=["","X","Y","Z"],w8=1e3;let j8=0;function Oc(e,n,s,a){const{latestValues:l}=n;l[e]&&(s[e]=l[e],n.setStaticValue(e,0),a&&(a[e]=0))}function x1(e){if(e.hasCheckedOptimisedAppear=!0,e.root===e)return;const{visualElement:n}=e.options;if(!n)return;const s=n1(n);if(window.MotionHasOptimisedAnimation(s,"transform")){const{layout:l,layoutId:c}=e.options;window.MotionCancelOptimisedAnimation(s,"transform",Me,!(l||c))}const{parent:a}=e;a&&!a.hasCheckedOptimisedAppear&&x1(a)}function v1({attachResizeListener:e,defaultParent:n,measureScroll:s,checkIsScrollRoot:a,resetTransform:l}){return class{constructor(u={},f=n?.()){this.id=j8++,this.animationId=0,this.animationCommitId=0,this.children=new Set,this.options={},this.isTreeAnimating=!1,this.isAnimationBlocked=!1,this.isLayoutDirty=!1,this.isProjectionDirty=!1,this.isSharedProjectionDirty=!1,this.isTransformDirty=!1,this.updateManuallyBlocked=!1,this.updateBlockedByResize=!1,this.isUpdating=!1,this.isSVG=!1,this.needsReset=!1,this.shouldResetTransform=!1,this.hasCheckedOptimisedAppear=!1,this.treeScale={x:1,y:1},this.eventHandlers=new Map,this.hasTreeAnimated=!1,this.updateScheduled=!1,this.scheduleUpdate=()=>this.update(),this.projectionUpdateScheduled=!1,this.checkUpdateFailed=()=>{this.isUpdating&&(this.isUpdating=!1,this.clearAllSnapshots())},this.updateProjection=()=>{this.projectionUpdateScheduled=!1,this.nodes.forEach(N8),this.nodes.forEach(E8),this.nodes.forEach(P8),this.nodes.forEach(C8)},this.resolvedRelativeTargetAt=0,this.hasProjected=!1,this.isVisible=!0,this.animationProgress=0,this.sharedNodes=new Map,this.latestValues=u,this.root=f?f.root||f:this,this.path=f?[...f.path,f]:[],this.parent=f,this.depth=f?f.depth+1:0;for(let p=0;p<this.path.length;p++)this.path[p].shouldResetTransform=!0;this.root===this&&(this.nodes=new c8)}addEventListener(u,f){return this.eventHandlers.has(u)||this.eventHandlers.set(u,new Vd),this.eventHandlers.get(u).add(f)}notifyListeners(u,...f){const p=this.eventHandlers.get(u);p&&p.notify(...f)}hasListeners(u){return this.eventHandlers.has(u)}mount(u){if(this.instance)return;this.isSVG=Lg(u)&&!uw(u),this.instance=u;const{layoutId:f,layout:p,visualElement:m}=this.options;if(m&&!m.current&&m.mount(u),this.root.nodes.add(this),this.parent&&this.parent.children.add(this),this.root.hasTreeAnimated&&(p||f)&&(this.isLayoutDirty=!0),e){let g,v=0;const b=()=>this.root.updateBlockedByResize=!1;Me.read(()=>{v=window.innerWidth}),e(u,()=>{const y=window.innerWidth;y!==v&&(v=y,this.root.updateBlockedByResize=!0,g&&g(),g=d8(b,250),qa.hasAnimatedSinceResize&&(qa.hasAnimatedSinceResize=!1,this.nodes.forEach($h)))})}f&&this.root.registerSharedNode(f,this),this.options.animate!==!1&&m&&(f||p)&&this.addEventListener("didUpdate",({delta:g,hasLayoutChanged:v,hasRelativeLayoutChanged:b,layout:y})=>{if(this.isTreeAnimationBlocked()){this.target=void 0,this.relativeTarget=void 0;return}const S=this.options.transition||m.getDefaultTransition()||F8,{onLayoutAnimationStart:N,onLayoutAnimationComplete:T}=m.getProps(),L=!this.targetLayout||!g1(this.targetLayout,y),E=!v&&b;if(this.options.layoutRoot||this.resumeFrom||E||v&&(L||!this.currentAnimation)){this.resumeFrom&&(this.resumingFrom=this.resumeFrom,this.resumingFrom.resumingFrom=void 0);const P={...Zd(S,"layout"),onPlay:N,onComplete:T};(m.shouldReduceMotion||this.options.layoutRoot)&&(P.delay=0,P.type=!1),this.startAnimation(P),this.setAnimationOrigin(g,E)}else v||$h(this),this.isLead()&&this.options.onExitComplete&&this.options.onExitComplete();this.targetLayout=y})}unmount(){this.options.layoutId&&this.willUpdate(),this.root.nodes.remove(this);const u=this.getStack();u&&u.remove(this),this.parent&&this.parent.children.delete(this),this.instance=void 0,this.eventHandlers.clear(),Xn(this.updateProjection)}blockUpdate(){this.updateManuallyBlocked=!0}unblockUpdate(){this.updateManuallyBlocked=!1}isUpdateBlocked(){return this.updateManuallyBlocked||this.updateBlockedByResize}isTreeAnimationBlocked(){return this.isAnimationBlocked||this.parent&&this.parent.isTreeAnimationBlocked()||!1}startUpdate(){this.isUpdateBlocked()||(this.isUpdating=!0,this.nodes&&this.nodes.forEach(M8),this.animationId++)}getTransformTemplate(){const{visualElement:u}=this.options;return u&&u.getProps().transformTemplate}willUpdate(u=!0){if(this.root.hasTreeAnimated=!0,this.root.isUpdateBlocked()){this.options.onExitComplete&&this.options.onExitComplete();return}if(window.MotionCancelOptimisedAnimation&&!this.hasCheckedOptimisedAppear&&x1(this),!this.root.isUpdating&&this.root.startUpdate(),this.isLayoutDirty)return;this.isLayoutDirty=!0;for(let g=0;g<this.path.length;g++){const v=this.path[g];v.shouldResetTransform=!0,v.updateScroll("snapshot"),v.options.layoutRoot&&v.willUpdate(!1)}const{layoutId:f,layout:p}=this.options;if(f===void 0&&!p)return;const m=this.getTransformTemplate();this.prevTransformTemplateValue=m?m(this.latestValues,""):void 0,this.updateSnapshot(),u&&this.notifyListeners("willUpdate")}update(){if(this.updateScheduled=!1,this.isUpdateBlocked()){this.unblockUpdate(),this.clearAllSnapshots(),this.nodes.forEach(Uh);return}if(this.animationId<=this.animationCommitId){this.nodes.forEach(Yh);return}this.animationCommitId=this.animationId,this.isUpdating?(this.isUpdating=!1,this.nodes.forEach(z8),this.nodes.forEach(k8),this.nodes.forEach(S8)):this.nodes.forEach(Yh),this.clearAllSnapshots();const f=wt.now();nt.delta=kn(0,1e3/60,f-nt.timestamp),nt.timestamp=f,nt.isProcessing=!0,Cc.update.process(nt),Cc.preRender.process(nt),Cc.render.process(nt),nt.isProcessing=!1}didUpdate(){this.updateScheduled||(this.updateScheduled=!0,eu.read(this.scheduleUpdate))}clearAllSnapshots(){this.nodes.forEach(T8),this.sharedNodes.forEach(A8)}scheduleUpdateProjection(){this.projectionUpdateScheduled||(this.projectionUpdateScheduled=!0,Me.preRender(this.updateProjection,!1,!0))}scheduleCheckAfterUnmount(){Me.postRender(()=>{this.isLayoutDirty?this.root.didUpdate():this.root.checkUpdateFailed()})}updateSnapshot(){this.snapshot||!this.instance||(this.snapshot=this.measure(),this.snapshot&&!pt(this.snapshot.measuredBox.x)&&!pt(this.snapshot.measuredBox.y)&&(this.snapshot=void 0))}updateLayout(){if(!this.instance||(this.updateScroll(),!(this.options.alwaysMeasureLayout&&this.isLead())&&!this.isLayoutDirty))return;if(this.resumeFrom&&!this.resumeFrom.instance)for(let p=0;p<this.path.length;p++)this.path[p].updateScroll();const u=this.layout;this.layout=this.measure(!1),this.layoutCorrected=Ye(),this.isLayoutDirty=!1,this.projectionDelta=void 0,this.notifyListeners("measure",this.layout.layoutBox);const{visualElement:f}=this.options;f&&f.notify("LayoutMeasure",this.layout.layoutBox,u?u.layoutBox:void 0)}updateScroll(u="measure"){let f=!!(this.options.layoutScroll&&this.instance);if(this.scroll&&this.scroll.animationId===this.root.animationId&&this.scroll.phase===u&&(f=!1),f&&this.instance){const p=a(this.instance);this.scroll={animationId:this.root.animationId,phase:u,isRoot:p,offset:s(this.instance),wasRoot:this.scroll?this.scroll.isRoot:p}}}resetTransform(){if(!l)return;const u=this.isLayoutDirty||this.shouldResetTransform||this.options.alwaysMeasureLayout,f=this.projectionDelta&&!m1(this.projectionDelta),p=this.getTransformTemplate(),m=p?p(this.latestValues,""):void 0,g=m!==this.prevTransformTemplateValue;u&&this.instance&&(f||fi(this.latestValues)||g)&&(l(this.instance,m),this.shouldResetTransform=!1,this.scheduleRender())}measure(u=!0){const f=this.measurePageBox();let p=this.removeElementScroll(f);return u&&(p=this.removeTransform(p)),R8(p),{animationId:this.root.animationId,measuredBox:f,layoutBox:p,latestValues:{},source:this.id}}measurePageBox(){const{visualElement:u}=this.options;if(!u)return Ye();const f=u.measureViewportBox();if(!(this.scroll?.wasRoot||this.path.some(I8))){const{scroll:m}=this.root;m&&(Xi(f.x,m.offset.x),Xi(f.y,m.offset.y))}return f}removeElementScroll(u){const f=Ye();if(Lt(f,u),this.scroll?.wasRoot)return f;for(let p=0;p<this.path.length;p++){const m=this.path[p],{scroll:g,options:v}=m;m!==this.root&&g&&v.layoutScroll&&(g.wasRoot&&Lt(f,u),Xi(f.x,g.offset.x),Xi(f.y,g.offset.y))}return f}applyTransform(u,f=!1){const p=Ye();Lt(p,u);for(let m=0;m<this.path.length;m++){const g=this.path[m];!f&&g.options.layoutScroll&&g.scroll&&g!==g.root&&Ki(p,{x:-g.scroll.offset.x,y:-g.scroll.offset.y}),fi(g.latestValues)&&Ki(p,g.latestValues)}return fi(this.latestValues)&&Ki(p,this.latestValues),p}removeTransform(u){const f=Ye();Lt(f,u);for(let p=0;p<this.path.length;p++){const m=this.path[p];if(!m.instance||!fi(m.latestValues))continue;dd(m.latestValues)&&m.updateSnapshot();const g=Ye(),v=m.measurePageBox();Lt(g,v),Ih(f,m.latestValues,m.snapshot?m.snapshot.layoutBox:void 0,g)}return fi(this.latestValues)&&Ih(f,this.latestValues),f}setTargetDelta(u){this.targetDelta=u,this.root.scheduleUpdateProjection(),this.isProjectionDirty=!0}setOptions(u){this.options={...this.options,...u,crossfade:u.crossfade!==void 0?u.crossfade:!0}}clearMeasurements(){this.scroll=void 0,this.layout=void 0,this.snapshot=void 0,this.prevTransformTemplateValue=void 0,this.targetDelta=void 0,this.target=void 0,this.isLayoutDirty=!1}forceRelativeParentToResolveTarget(){this.relativeParent&&this.relativeParent.resolvedRelativeTargetAt!==nt.timestamp&&this.relativeParent.resolveTargetDelta(!0)}resolveTargetDelta(u=!1){const f=this.getLead();this.isProjectionDirty||(this.isProjectionDirty=f.isProjectionDirty),this.isTransformDirty||(this.isTransformDirty=f.isTransformDirty),this.isSharedProjectionDirty||(this.isSharedProjectionDirty=f.isSharedProjectionDirty);const p=!!this.resumingFrom||this!==f;if(!(u||p&&this.isSharedProjectionDirty||this.isProjectionDirty||this.parent?.isProjectionDirty||this.attemptToResolveRelativeTarget||this.root.updateBlockedByResize))return;const{layout:g,layoutId:v}=this.options;if(!(!this.layout||!(g||v))){if(this.resolvedRelativeTargetAt=nt.timestamp,!this.targetDelta&&!this.relativeTarget){const b=this.getClosestProjectingParent();b&&b.layout&&this.animationProgress!==1?(this.relativeParent=b,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Ye(),this.relativeTargetOrigin=Ye(),as(this.relativeTargetOrigin,this.layout.layoutBox,b.layout.layoutBox),Lt(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}if(!(!this.relativeTarget&&!this.targetDelta)&&(this.target||(this.target=Ye(),this.targetWithTransforms=Ye()),this.relativeTarget&&this.relativeTargetOrigin&&this.relativeParent&&this.relativeParent.target?(this.forceRelativeParentToResolveTarget(),U6(this.target,this.relativeTarget,this.relativeParent.target)):this.targetDelta?(this.resumingFrom?this.target=this.applyTransform(this.layout.layoutBox):Lt(this.target,this.layout.layoutBox),Kg(this.target,this.targetDelta)):Lt(this.target,this.layout.layoutBox),this.attemptToResolveRelativeTarget)){this.attemptToResolveRelativeTarget=!1;const b=this.getClosestProjectingParent();b&&!!b.resumingFrom==!!this.resumingFrom&&!b.options.layoutScroll&&b.target&&this.animationProgress!==1?(this.relativeParent=b,this.forceRelativeParentToResolveTarget(),this.relativeTarget=Ye(),this.relativeTargetOrigin=Ye(),as(this.relativeTargetOrigin,this.target,b.target),Lt(this.relativeTarget,this.relativeTargetOrigin)):this.relativeParent=this.relativeTarget=void 0}}}getClosestProjectingParent(){if(!(!this.parent||dd(this.parent.latestValues)||Xg(this.parent.latestValues)))return this.parent.isProjecting()?this.parent:this.parent.getClosestProjectingParent()}isProjecting(){return!!((this.relativeTarget||this.targetDelta||this.options.layoutRoot)&&this.layout)}calcProjection(){const u=this.getLead(),f=!!this.resumingFrom||this!==u;let p=!0;if((this.isProjectionDirty||this.parent?.isProjectionDirty)&&(p=!1),f&&(this.isSharedProjectionDirty||this.isTransformDirty)&&(p=!1),this.resolvedRelativeTargetAt===nt.timestamp&&(p=!1),p)return;const{layout:m,layoutId:g}=this.options;if(this.isTreeAnimating=!!(this.parent&&this.parent.isTreeAnimating||this.currentAnimation||this.pendingAnimation),this.isTreeAnimating||(this.targetDelta=this.relativeTarget=void 0),!this.layout||!(m||g))return;Lt(this.layoutCorrected,this.layout.layoutBox);const v=this.treeScale.x,b=this.treeScale.y;t6(this.layoutCorrected,this.treeScale,this.path,f),u.layout&&!u.target&&(this.treeScale.x!==1||this.treeScale.y!==1)&&(u.target=u.layout.layoutBox,u.targetWithTransforms=Ye());const{target:y}=u;if(!y){this.prevProjectionDelta&&(this.createProjectionDeltas(),this.scheduleRender());return}!this.projectionDelta||!this.prevProjectionDelta?this.createProjectionDeltas():(Dh(this.prevProjectionDelta.x,this.projectionDelta.x),Dh(this.prevProjectionDelta.y,this.projectionDelta.y)),ss(this.projectionDelta,this.layoutCorrected,y,this.latestValues),(this.treeScale.x!==v||this.treeScale.y!==b||!Wh(this.projectionDelta.x,this.prevProjectionDelta.x)||!Wh(this.projectionDelta.y,this.prevProjectionDelta.y))&&(this.hasProjected=!0,this.scheduleRender(),this.notifyListeners("projectionUpdate",y))}hide(){this.isVisible=!1}show(){this.isVisible=!0}scheduleRender(u=!0){if(this.options.visualElement?.scheduleRender(),u){const f=this.getStack();f&&f.scheduleRender()}this.resumingFrom&&!this.resumingFrom.instance&&(this.resumingFrom=void 0)}createProjectionDeltas(){this.prevProjectionDelta=Qi(),this.projectionDelta=Qi(),this.projectionDeltaWithTransform=Qi()}setAnimationOrigin(u,f=!1){const p=this.snapshot,m=p?p.latestValues:{},g={...this.latestValues},v=Qi();(!this.relativeParent||!this.relativeParent.options.layoutRoot)&&(this.relativeTarget=this.relativeTargetOrigin=void 0),this.attemptToResolveRelativeTarget=!f;const b=Ye(),y=p?p.source:void 0,S=this.layout?this.layout.source:void 0,N=y!==S,T=this.getStack(),L=!T||T.members.length<=1,E=!!(N&&!L&&this.options.crossfade===!0&&!this.path.some(D8));this.animationProgress=0;let P;this.mixTargetDelta=B=>{const M=B/1e3;Hh(v.x,u.x,M),Hh(v.y,u.y,M),this.setTargetDelta(v),this.relativeTarget&&this.relativeTargetOrigin&&this.layout&&this.relativeParent&&this.relativeParent.layout&&(as(b,this.layout.layoutBox,this.relativeParent.layout.layoutBox),L8(this.relativeTarget,this.relativeTargetOrigin,b,M),P&&v8(this.relativeTarget,P)&&(this.isProjectionDirty=!1),P||(P=Ye()),Lt(P,this.relativeTarget)),N&&(this.animationValues=g,p8(g,m,this.latestValues,M,E,L)),this.root.scheduleUpdateProjection(),this.scheduleRender(),this.animationProgress=M},this.mixTargetDelta(this.options.layoutRoot?1e3:0)}startAnimation(u){this.notifyListeners("animationStart"),this.currentAnimation?.stop(),this.resumingFrom?.currentAnimation?.stop(),this.pendingAnimation&&(Xn(this.pendingAnimation),this.pendingAnimation=void 0),this.pendingAnimation=Me.update(()=>{qa.hasAnimatedSinceResize=!0,this.motionValue||(this.motionValue=ir(0)),this.currentAnimation=o8(this.motionValue,[0,1e3],{...u,velocity:0,isSync:!0,onUpdate:f=>{this.mixTargetDelta(f),u.onUpdate&&u.onUpdate(f)},onStop:()=>{},onComplete:()=>{u.onComplete&&u.onComplete(),this.completeAnimation()}}),this.resumingFrom&&(this.resumingFrom.currentAnimation=this.currentAnimation),this.pendingAnimation=void 0})}completeAnimation(){this.resumingFrom&&(this.resumingFrom.currentAnimation=void 0,this.resumingFrom.preserveOpacity=void 0);const u=this.getStack();u&&u.exitAnimationComplete(),this.resumingFrom=this.currentAnimation=this.animationValues=void 0,this.notifyListeners("animationComplete")}finishAnimation(){this.currentAnimation&&(this.mixTargetDelta&&this.mixTargetDelta(w8),this.currentAnimation.stop()),this.completeAnimation()}applyTransformsToTarget(){const u=this.getLead();let{targetWithTransforms:f,target:p,layout:m,latestValues:g}=u;if(!(!f||!p||!m)){if(this!==u&&this.layout&&m&&b1(this.options.animationType,this.layout.layoutBox,m.layoutBox)){p=this.target||Ye();const v=pt(this.layout.layoutBox.x);p.x.min=u.target.x.min,p.x.max=p.x.min+v;const b=pt(this.layout.layoutBox.y);p.y.min=u.target.y.min,p.y.max=p.y.min+b}Lt(f,p),Ki(f,g),ss(this.projectionDeltaWithTransform,this.layoutCorrected,f,g)}}registerSharedNode(u,f){this.sharedNodes.has(u)||this.sharedNodes.set(u,new b8),this.sharedNodes.get(u).add(f);const m=f.options.initialPromotionConfig;f.promote({transition:m?m.transition:void 0,preserveFollowOpacity:m&&m.shouldPreserveFollowOpacity?m.shouldPreserveFollowOpacity(f):void 0})}isLead(){const u=this.getStack();return u?u.lead===this:!0}getLead(){const{layoutId:u}=this.options;return u?this.getStack()?.lead||this:this}getPrevLead(){const{layoutId:u}=this.options;return u?this.getStack()?.prevLead:void 0}getStack(){const{layoutId:u}=this.options;if(u)return this.root.sharedNodes.get(u)}promote({needsReset:u,transition:f,preserveFollowOpacity:p}={}){const m=this.getStack();m&&m.promote(this,p),u&&(this.projectionDelta=void 0,this.needsReset=!0),f&&this.setOptions({transition:f})}relegate(){const u=this.getStack();return u?u.relegate(this):!1}resetSkewAndRotation(){const{visualElement:u}=this.options;if(!u)return;let f=!1;const{latestValues:p}=u;if((p.z||p.rotate||p.rotateX||p.rotateY||p.rotateZ||p.skewX||p.skewY)&&(f=!0),!f)return;const m={};p.z&&Oc("z",u,m,this.animationValues);for(let g=0;g<Ic.length;g++)Oc(`rotate${Ic[g]}`,u,m,this.animationValues),Oc(`skew${Ic[g]}`,u,m,this.animationValues);u.render();for(const g in m)u.setStaticValue(g,m[g]),this.animationValues&&(this.animationValues[g]=m[g]);u.scheduleRender()}applyProjectionStyles(u,f){if(!this.instance||this.isSVG)return;if(!this.isVisible){u.visibility="hidden";return}const p=this.getTransformTemplate();if(this.needsReset){this.needsReset=!1,u.visibility="",u.opacity="",u.pointerEvents=Ga(f?.pointerEvents)||"",u.transform=p?p(this.latestValues,""):"none";return}const m=this.getLead();if(!this.projectionDelta||!this.layout||!m.target){this.options.layoutId&&(u.opacity=this.latestValues.opacity!==void 0?this.latestValues.opacity:1,u.pointerEvents=Ga(f?.pointerEvents)||""),this.hasProjected&&!fi(this.latestValues)&&(u.transform=p?p({},""):"none",this.hasProjected=!1);return}u.visibility="";const g=m.animationValues||m.latestValues;this.applyTransformsToTarget();let v=y8(this.projectionDeltaWithTransform,this.treeScale,g);p&&(v=p(g,v)),u.transform=v;const{x:b,y}=this.projectionDelta;u.transformOrigin=`${b.origin*100}% ${y.origin*100}% 0`,m.animationValues?u.opacity=m===this?g.opacity??this.latestValues.opacity??1:this.preserveOpacity?this.latestValues.opacity:g.opacityExit:u.opacity=m===this?g.opacity!==void 0?g.opacity:"":g.opacityExit!==void 0?g.opacityExit:0;for(const S in ms){if(g[S]===void 0)continue;const{correct:N,applyTo:T,isCSSVariable:L}=ms[S],E=v==="none"?g[S]:N(g[S],m);if(T){const P=T.length;for(let B=0;B<P;B++)u[T[B]]=E}else L?this.options.visualElement.renderState.vars[S]=E:u[S]=E}this.options.layoutId&&(u.pointerEvents=m===this?Ga(f?.pointerEvents)||"":"none")}clearSnapshot(){this.resumeFrom=this.snapshot=void 0}resetTree(){this.root.nodes.forEach(u=>u.currentAnimation?.stop()),this.root.nodes.forEach(Uh),this.root.sharedNodes.clear()}}}function k8(e){e.updateLayout()}function S8(e){const n=e.resumeFrom?.snapshot||e.snapshot;if(e.isLead()&&e.layout&&n&&e.hasListeners("didUpdate")){const{layoutBox:s,measuredBox:a}=e.layout,{animationType:l}=e.options,c=n.source!==e.layout.source;l==="size"?Dt(g=>{const v=c?n.measuredBox[g]:n.layoutBox[g],b=pt(v);v.min=s[g].min,v.max=v.min+b}):b1(l,n.layoutBox,s)&&Dt(g=>{const v=c?n.measuredBox[g]:n.layoutBox[g],b=pt(s[g]);v.max=v.min+b,e.relativeTarget&&!e.currentAnimation&&(e.isProjectionDirty=!0,e.relativeTarget[g].max=e.relativeTarget[g].min+b)});const u=Qi();ss(u,s,n.layoutBox);const f=Qi();c?ss(f,e.applyTransform(a,!0),n.measuredBox):ss(f,s,n.layoutBox);const p=!m1(u);let m=!1;if(!e.resumeFrom){const g=e.getClosestProjectingParent();if(g&&!g.resumeFrom){const{snapshot:v,layout:b}=g;if(v&&b){const y=Ye();as(y,n.layoutBox,v.layoutBox);const S=Ye();as(S,s,b.layoutBox),g1(y,S)||(m=!0),g.options.layoutRoot&&(e.relativeTarget=S,e.relativeTargetOrigin=y,e.relativeParent=g)}}}e.notifyListeners("didUpdate",{layout:s,snapshot:n,delta:f,layoutDelta:u,hasLayoutChanged:p,hasRelativeLayoutChanged:m})}else if(e.isLead()){const{onExitComplete:s}=e.options;s&&s()}e.options.transition=void 0}function N8(e){e.parent&&(e.isProjecting()||(e.isProjectionDirty=e.parent.isProjectionDirty),e.isSharedProjectionDirty||(e.isSharedProjectionDirty=!!(e.isProjectionDirty||e.parent.isProjectionDirty||e.parent.isSharedProjectionDirty)),e.isTransformDirty||(e.isTransformDirty=e.parent.isTransformDirty))}function C8(e){e.isProjectionDirty=e.isSharedProjectionDirty=e.isTransformDirty=!1}function T8(e){e.clearSnapshot()}function Uh(e){e.clearMeasurements()}function Yh(e){e.isLayoutDirty=!1}function z8(e){const{visualElement:n}=e.options;n&&n.getProps().onBeforeLayoutMeasure&&n.notify("BeforeLayoutMeasure"),e.resetTransform()}function $h(e){e.finishAnimation(),e.targetDelta=e.relativeTarget=e.target=void 0,e.isProjectionDirty=!0}function E8(e){e.resolveTargetDelta()}function P8(e){e.calcProjection()}function M8(e){e.resetSkewAndRotation()}function A8(e){e.removeLeadSnapshot()}function Hh(e,n,s){e.translate=Fe(n.translate,0,s),e.scale=Fe(n.scale,1,s),e.origin=n.origin,e.originPoint=n.originPoint}function Gh(e,n,s,a){e.min=Fe(n.min,s.min,a),e.max=Fe(n.max,s.max,a)}function L8(e,n,s,a){Gh(e.x,n.x,s.x,a),Gh(e.y,n.y,s.y,a)}function D8(e){return e.animationValues&&e.animationValues.opacityExit!==void 0}const F8={duration:.45,ease:[.4,0,.1,1]},qh=e=>typeof navigator<"u"&&navigator.userAgent&&navigator.userAgent.toLowerCase().includes(e),Xh=qh("applewebkit/")&&!qh("chrome/")?Math.round:It;function Kh(e){e.min=Xh(e.min),e.max=Xh(e.max)}function R8(e){Kh(e.x),Kh(e.y)}function b1(e,n,s){return e==="position"||e==="preserve-aspect"&&!W6(_h(n),_h(s),.2)}function I8(e){return e!==e.root&&e.scroll?.wasRoot}const O8=v1({attachResizeListener:(e,n)=>gs(e,"resize",n),measureScroll:()=>({x:document.documentElement.scrollLeft||document.body.scrollLeft,y:document.documentElement.scrollTop||document.body.scrollTop}),checkIsScrollRoot:()=>!0}),Vc={current:void 0},y1=v1({measureScroll:e=>({x:e.scrollLeft,y:e.scrollTop}),defaultParent:()=>{if(!Vc.current){const e=new O8({});e.mount(window),e.setOptions({layoutScroll:!0}),Vc.current=e}return Vc.current},resetTransform:(e,n)=>{e.style.transform=n!==void 0?n:"none"},checkIsScrollRoot:e=>window.getComputedStyle(e).position==="fixed"}),V8={pan:{Feature:i8},drag:{Feature:n8,ProjectionNode:y1,MeasureLayout:p1}};function Qh(e,n,s){const{props:a}=e;e.animationState&&a.whileHover&&e.animationState.setActive("whileHover",s==="Start");const l="onHover"+s,c=a[l];c&&Me.postRender(()=>c(n,ks(n)))}class B8 extends Qn{mount(){const{current:n}=this.node;n&&(this.unmount=aw(n,(s,a)=>(Qh(this.node,a,"Start"),l=>Qh(this.node,l,"End"))))}unmount(){}}class _8 extends Qn{constructor(){super(...arguments),this.isActive=!1}onFocus(){let n=!1;try{n=this.node.current.matches(":focus-visible")}catch{n=!0}!n||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!0),this.isActive=!0)}onBlur(){!this.isActive||!this.node.animationState||(this.node.animationState.setActive("whileFocus",!1),this.isActive=!1)}mount(){this.unmount=ys(gs(this.node.current,"focus",()=>this.onFocus()),gs(this.node.current,"blur",()=>this.onBlur()))}unmount(){}}function Zh(e,n,s){const{props:a}=e;if(e.current instanceof HTMLButtonElement&&e.current.disabled)return;e.animationState&&a.whileTap&&e.animationState.setActive("whileTap",s==="Start");const l="onTap"+(s==="End"?"":s),c=a[l];c&&Me.postRender(()=>c(n,ks(n)))}class W8 extends Qn{mount(){const{current:n}=this.node;n&&(this.unmount=dw(n,(s,a)=>(Zh(this.node,a,"Start"),(l,{success:c})=>Zh(this.node,l,c?"End":"Cancel")),{useGlobalTarget:this.node.props.globalTapTarget}))}unmount(){}}const xd=new WeakMap,Bc=new WeakMap,U8=e=>{const n=xd.get(e.target);n&&n(e)},Y8=e=>{e.forEach(U8)};function $8({root:e,...n}){const s=e||document;Bc.has(s)||Bc.set(s,{});const a=Bc.get(s),l=JSON.stringify(n);return a[l]||(a[l]=new IntersectionObserver(Y8,{root:e,...n})),a[l]}function H8(e,n,s){const a=$8(n);return xd.set(e,s),a.observe(e),()=>{xd.delete(e),a.unobserve(e)}}const G8={some:0,all:1};class q8 extends Qn{constructor(){super(...arguments),this.hasEnteredView=!1,this.isInView=!1}startObserver(){this.unmount();const{viewport:n={}}=this.node.getProps(),{root:s,margin:a,amount:l="some",once:c}=n,u={root:s?s.current:void 0,rootMargin:a,threshold:typeof l=="number"?l:G8[l]},f=p=>{const{isIntersecting:m}=p;if(this.isInView===m||(this.isInView=m,c&&!m&&this.hasEnteredView))return;m&&(this.hasEnteredView=!0),this.node.animationState&&this.node.animationState.setActive("whileInView",m);const{onViewportEnter:g,onViewportLeave:v}=this.node.getProps(),b=m?g:v;b&&b(p)};return H8(this.node.current,u,f)}mount(){this.startObserver()}update(){if(typeof IntersectionObserver>"u")return;const{props:n,prevProps:s}=this.node;["amount","margin","root"].some(X8(n,s))&&this.startObserver()}unmount(){}}function X8({viewport:e={}},{viewport:n={}}={}){return s=>e[s]!==n[s]}const K8={inView:{Feature:q8},tap:{Feature:W8},focus:{Feature:_8},hover:{Feature:B8}},Q8={layout:{ProjectionNode:y1,MeasureLayout:p1}},Z8={...R6,...K8,...V8,...Q8},Ve=Zw(Z8,u6),_c=[{question:"What is Verapixels and what do you do?",answer:"Verapixels is a technology & creative agency that builds websites, digital products, and brand systems.",category:"About"},{question:"Who founded Verapixels and what's your mission?",answer:"Founded by Ocholi Divine and team, our mission is creating beautiful, performant digital products that solve business problems.",category:"About"},{question:"What services does Verapixels offer?",answer:"Web Design, Frontend Development, UI/UX Design, Branding, Graphic Design, Video Editing, and Tech Consultation.",category:"Services"},{question:"Do you offer e-commerce website development?",answer:"Yes! We build secure e-commerce storefronts with payment integrations and optimized checkout experiences.",category:"Services"},{question:"Do you provide branding and logo design?",answer:"Yes. We create complete brand identities including logos, color palettes, typography, and visual guidelines.",category:"Services"},{question:"Do you provide ongoing support and maintenance?",answer:"Yes. We offer maintenance plans for updates, security patches, and ongoing improvements.",category:"Services"},{question:"What technology stack does Verapixels use?",answer:"We use modern technologies like React, TypeScript, and Node.js, choosing the right stack for each project.",category:"Technical"},{question:"Are your websites mobile-friendly and responsive?",answer:"Yes. Every website we build is fully responsive and optimized for all devices.",category:"Technical"},{question:"Do you implement SEO best practices?",answer:"Yes. Our sites include semantic HTML, proper metadata, performance optimizations, and analytics setup.",category:"Technical"},{question:"Do you offer content management systems (CMS)?",answer:"Yes. We integrate headless CMS or WordPress for easy content updates.",category:"Technical"},{question:"What's your typical project timeline?",answer:"Simple sites take 2-4 weeks; complex projects 6-8 weeks.",category:"Process & Pricing"},{question:"Do you work with international clients?",answer:"Yes! We work globally and accept multiple currencies.",category:"Process & Pricing"},{question:"What's your design process like?",answer:"Discovery → prototype → user testing → iterate → handoff. We validate designs with real users.",category:"Process & Pricing"},{question:"Do you create custom designs or use templates?",answer:"Fully custom designs only. No templates.",category:"Process & Pricing"},{question:"How do you ensure website accessibility?",answer:"We use semantic markup, keyboard navigation, ARIA labels, and WCAG-compliant contrast ratios.",category:"Process & Pricing"},{question:"What is your payment policy?",answer:"We require full payment upfront to dedicate our full resources and deliver premium quality work without compromise.",category:"Payment"},{question:"What payment methods do you accept?",answer:"Bank transfers, credit cards, and digital payments.",category:"Payment"},{question:"Do you offer refunds?",answer:"No. Due to the custom nature and full resource commitment, refunds are not available. We ensure satisfaction through detailed planning and continuous communication.",category:"Payment"}];function pu(){const[e,n]=j.useState(null),[s,a]=j.useState("All"),l=["All",...Array.from(new Set(_c.map(f=>f.category)))].filter(Boolean),c=s==="All"?_c:_c.filter(f=>f.category===s),u=f=>{n(e===f?null:f)};return i.jsxs("section",{className:"faq-container",children:[i.jsxs("div",{className:"faq-background",children:[i.jsx("div",{className:"faq-background-circle circle-1"}),i.jsx("div",{className:"faq-background-circle circle-2"}),i.jsx("div",{className:"faq-background-circle circle-3"}),i.jsx("div",{className:"faq-grid-overlay"})]}),i.jsxs(Ve.div,{className:"faq-header",initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{duration:.8},children:[i.jsx("h2",{className:"faq-title",children:"Frequently Asked Questions"}),i.jsx("p",{className:"faq-subtitle",children:"Get answers about our services, process, and payment policies"})]}),i.jsx(Ve.div,{className:"faq-categories",initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.2},children:l.map(f=>i.jsx("button",{className:`faq-category ${s===f?"active":""}`,onClick:()=>a(f),children:f},f))}),i.jsx("div",{className:"faq-list",children:c.map((f,p)=>i.jsx(Ve.div,{className:"faq-item",initial:{opacity:0,y:30,scale:.95},animate:{opacity:1,y:0,scale:1},transition:{delay:p*.1,duration:.5,type:"spring",stiffness:100},whileHover:{scale:1.02,transition:{duration:.2}},children:i.jsx("div",{className:"faq-card",children:i.jsxs("div",{className:"faq-card-inner",children:[i.jsxs("div",{className:"faq-header-content",children:[i.jsx("h3",{className:"faq-question",children:f.question}),i.jsx(Ve.button,{className:"toggle-btn",onClick:()=>u(p),whileHover:{scale:1.1,rotate:90},whileTap:{scale:.9},children:i.jsx(Ve.span,{animate:{rotate:e===p?45:0},transition:{duration:.3},children:"+"})})]}),i.jsx(yw,{children:e===p&&i.jsx(Ve.div,{className:"faq-answer-container",initial:{height:0,opacity:0},animate:{height:"auto",opacity:1},exit:{height:0,opacity:0},transition:{duration:.4,ease:"easeInOut"},children:i.jsx(Ve.div,{className:"faq-answer",initial:{opacity:0,x:-20},animate:{opacity:1,x:0},transition:{delay:.2},children:f.answer})})})]})})},p))}),i.jsx(Ve.div,{className:"faq-cta",initial:{opacity:0,y:40},animate:{opacity:1,y:0},transition:{duration:.6,delay:.8},children:i.jsxs("div",{className:"cta-content",children:[i.jsx("h3",{children:"Ready to get started?"}),i.jsx("p",{children:"Begin your project with Verapixels - full payment ensures our dedicated premium service"}),i.jsxs(Ve.button,{className:"cta-button",onClick:()=>window.location.href="/#contact",whileHover:{scale:1.05},whileTap:{scale:.95},children:[i.jsx("span",{children:"Start Your Project"}),i.jsx("span",{className:"cta-arrow",children:"→"})]})]})}),i.jsx(Ot,{})]})}const J8=[{title:"IT Software Solutions & Technology",subtitle:"We craft scalable web apps, beautiful UI and powerful digital experiences.",cta:"Get Started"},{title:"Web & Mobile Development",subtitle:"Fast, performant and accessible interfaces that convert users to customers.",cta:"View Projects"},{title:"Creative Design & Branding",subtitle:"Brand systems that stand out — from identity to motion design.",cta:"See Our Work"},{title:"Cloud & DevOps",subtitle:"Reliable infrastructure to scale and ship faster with automation.",cta:"Learn More"},{title:"Cybersecurity & Support",subtitle:"Protecting your users and systems with battle-tested practices.",cta:"Talk to Sales"}],ej=6e3,tj=()=>{const e=j.useRef(null),[n,s]=j.useState(0);function a(l){const c=l.realIndex??l.activeIndex;s(c)}return i.jsxs("div",{className:"vp-root",children:[i.jsx(Td,{}),i.jsxs("main",{className:"vp-hero",children:[i.jsx("video",{className:"vp-bg-video",autoPlay:!0,muted:!0,loop:!0,playsInline:!0,preload:"auto",children:i.jsx("source",{src:ly,type:"video/mp4"})}),i.jsx("div",{className:"vp-bg-overlay"}),i.jsx(Rm,{effect:"fade",loop:!0,autoplay:{delay:ej,disableOnInteraction:!1},modules:[iy,oy],onSlideChange:a,onSwiper:l=>e.current=l,className:"vp-swiper",children:J8.map((l,c)=>{const u=c%2===0?"left":"right";return i.jsx(Im,{children:i.jsxs("div",{className:`vp-side-wrap ${u}`,children:[i.jsx("div",{className:"vp-geo"}),i.jsxs("div",{className:"vp-content-wrap",children:[i.jsx("h1",{className:"vp-title",children:l.title}),i.jsx("p",{className:"vp-sub",children:l.subtitle}),i.jsxs("div",{className:"vp-ctas",children:[i.jsxs("button",{className:"vp-primary",children:[l.cta," ",i.jsx(pv,{})]}),i.jsx("button",{className:"vp-secondary",children:"Learn more"})]})]})]})},c)})})]}),i.jsx(Ot,{}),i.jsx(s4,{}),i.jsx(a4,{}),i.jsx(o4,{}),i.jsx(l4,{}),i.jsx(pu,{})]})},nj=()=>{const[e,n]=j.useState({x:0,y:0}),[s,a]=j.useState(0);j.useEffect(()=>{const u=p=>{n({x:p.clientX,y:p.clientY})},f=()=>{a(window.scrollY)};return window.addEventListener("mousemove",u),window.addEventListener("scroll",f),()=>{window.removeEventListener("mousemove",u),window.removeEventListener("scroll",f)}},[]);const l=[{icon:i.jsx(_e,{}),title:"Innovation First",description:"We push boundaries with cutting-edge technology, creating solutions that define the future of digital experiences.",color:"#FFD700"},{icon:i.jsx(fo,{}),title:"Client-Centric Approach",description:"Your success is our mission. We build lasting partnerships through transparency, dedication, and exceptional results.",color:"#FF6B9D"},{icon:i.jsx(xn,{}),title:"Pixel-Perfect Execution",description:"Every detail matters. We craft solutions with precision, ensuring flawless design and seamless functionality.",color:"#00D1FF"},{icon:i.jsx(Gt,{}),title:"Excellence Driven",description:"We don't just meet expectations—we exceed them. Quality and innovation are at the heart of everything we build.",color:"#00FF88"}],c=[{year:"2025",title:"Foundation",description:"Verapixels was born from a vision to transform digital experiences"},{year:"2025",title:"First Client",description:"Delivered our first project, setting the standard for excellence"},{year:"2025+",title:"Growing Impact",description:"Expanding our reach and building the future of tech solutions"}];return i.jsxs("div",{className:"about-page",children:[i.jsx(Td,{}),i.jsxs("div",{className:"about-bg-particles",children:[i.jsx("div",{className:"particle particle-1",style:{transform:`translate(${e.x*.02}px, ${e.y*.02}px)`}}),i.jsx("div",{className:"particle particle-2",style:{transform:`translate(${e.x*-.03}px, ${e.y*-.03}px)`}}),i.jsx("div",{className:"particle particle-3",style:{transform:`translate(${e.x*.04}px, ${e.y*-.02}px)`}})]}),i.jsx("section",{className:"about-hero",children:i.jsxs("div",{className:"about-container",children:[i.jsxs("div",{className:"hero-content",children:[i.jsxs("div",{className:"hero-badge",style:{transform:`translateY(${s*.1}px)`},children:[i.jsx(eo,{})," Founded in 2025"]}),i.jsxs("h1",{className:"hero-title",children:["The Story Behind",i.jsx("br",{}),i.jsx("span",{className:"gradient-text",children:"Verapixels"})]}),i.jsx("p",{className:"hero-subtitle",children:"Where innovation meets precision, and every pixel tells a story of excellence."})]}),i.jsx("div",{className:"hero-visual",style:{transform:`perspective(1000px) rotateY(${e.x*.01}deg) rotateX(${e.y*-.01}deg)`},children:i.jsxs("div",{className:"floating-cube",children:[i.jsx("div",{className:"cube-face front"}),i.jsx("div",{className:"cube-face back"}),i.jsx("div",{className:"cube-face left"}),i.jsx("div",{className:"cube-face right"}),i.jsx("div",{className:"cube-face top"}),i.jsx("div",{className:"cube-face bottom"})]})})]})}),i.jsx("section",{className:"founder-section",children:i.jsx("div",{className:"about-container",children:i.jsxs("div",{className:"founder-grid",children:[i.jsx("div",{className:"founder-image-wrapper",children:i.jsxs("div",{className:"founder-frame",children:[i.jsx("img",{src:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",alt:"Ocholi Divine",className:"founder-image"}),i.jsx("div",{className:"founder-glow"})]})}),i.jsxs("div",{className:"founder-content",children:[i.jsxs("div",{className:"founder-label",children:[i.jsx(Nf,{})," Our Founder"]}),i.jsxs("h2",{className:"section-title",children:["Meet ",i.jsx("span",{className:"gradient-text",children:"Ocholi Divine"})]}),i.jsx("p",{className:"founder-text",children:"In 2025, Ocholi Divine embarked on a journey to revolutionize the digital landscape. With a passion for technology and an eye for perfection, he founded Verapixels with a clear vision: to create digital experiences that don't just work—they inspire."}),i.jsx("p",{className:"founder-text",children:'"I wanted to build a company where innovation meets craftsmanship, where every line of code and every design element serves a purpose. Verapixels represents that commitment to excellence."'}),i.jsxs("div",{className:"founder-stats",children:[i.jsxs("div",{className:"stat-box",children:[i.jsx(wn,{className:"stat-icon"}),i.jsx("div",{className:"stat-label",children:"Tech Visionary"})]}),i.jsxs("div",{className:"stat-box",children:[i.jsx(xn,{className:"stat-icon"}),i.jsx("div",{className:"stat-label",children:"Problem Solver"})]}),i.jsxs("div",{className:"stat-box",children:[i.jsx(Ke,{className:"stat-icon"}),i.jsx("div",{className:"stat-label",children:"Innovation Leader"})]})]})]})]})})}),i.jsx("section",{className:"origin-section",children:i.jsxs("div",{className:"about-container",children:[i.jsxs("div",{className:"origin-header",children:[i.jsxs("h2",{className:"section-title text-center",children:["The Birth of ",i.jsx("span",{className:"gradient-text",children:"Verapixels"})]}),i.jsx("p",{className:"section-subtitle",children:"How a late-night scroll became a tech revolution"})]}),i.jsxs("div",{className:"origin-story",children:[i.jsxs("div",{className:"story-card",children:[i.jsx("div",{className:"story-number",children:"01"}),i.jsx("div",{className:"story-icon",children:i.jsx(Nf,{})}),i.jsx("h3",{className:"story-title",children:"The Search Begins"}),i.jsx("p",{className:"story-text",children:`It started with a prayer and a simple question: "What should I name my business?" Late one night, scrolling through TikTok for inspiration, I searched "how to name a business." That's when I discovered "Vera"—a word that resonated with truth and authenticity.`})]}),i.jsxs("div",{className:"story-card",children:[i.jsx("div",{className:"story-number",children:"02"}),i.jsx("div",{className:"story-icon",children:i.jsx(Rt,{})}),i.jsx("h3",{className:"story-title",children:"The Pixel Moment"}),i.jsx("p",{className:"story-text",children:`Then came the memory—my first day at tech school. A close friend asked our teacher about "pixels," and that word stuck with me. Pixels are the building blocks of everything digital. They're what make designs come alive, what turn concepts into reality.`})]}),i.jsxs("div",{className:"story-card",children:[i.jsx("div",{className:"story-number",children:"03"}),i.jsx("div",{className:"story-icon",children:i.jsx(eo,{})}),i.jsx("h3",{className:"story-title",children:"Perfect Fusion"}),i.jsx("p",{className:"story-text",children:`I combined "Vera" with "Pixels" because that's what we do—we create truth through pixels. When you give a design element the right padding, the right spacing, the perfect 20px—and it looks absolutely flawless—that's the Verapixels standard. We make things look not just good, but perfect.`})]})]})]})}),i.jsx("section",{className:"meaning-section",children:i.jsx("div",{className:"about-container",children:i.jsxs("div",{className:"meaning-content",children:[i.jsx("div",{className:"meaning-visual",children:i.jsx("div",{className:"pixel-grid",children:[...Array(25)].map((u,f)=>i.jsx("div",{className:"pixel-dot",style:{animationDelay:`${f*.1}s`}},f))})}),i.jsxs("div",{className:"meaning-text",children:[i.jsxs("h2",{className:"section-title",children:["What ",i.jsx("span",{className:"gradient-text",children:"Verapixels"})," Means"]}),i.jsxs("div",{className:"meaning-breakdown",children:[i.jsxs("div",{className:"word-part",children:[i.jsx("h3",{className:"word-title",children:"VERA"}),i.jsx("p",{className:"word-description",children:'Derived from Latin, meaning "truth" and "authenticity." It represents our commitment to honest, transparent partnerships and genuine innovation.'})]}),i.jsx("div",{className:"plus-sign",children:"+"}),i.jsxs("div",{className:"word-part",children:[i.jsx("h3",{className:"word-title",children:"PIXELS"}),i.jsx("p",{className:"word-description",children:"The fundamental building blocks of digital design. Every great interface, every stunning visual—it all starts with pixels perfectly placed."})]})]}),i.jsxs("div",{className:"meaning-result",children:[i.jsx("h3",{className:"result-title",children:"= Authentic Digital Excellence"}),i.jsx("p",{className:"result-text",children:"Verapixels embodies the perfect union of truth and precision. We believe that great technology isn't just about functionality—it's about creating experiences that are authentic, beautiful, and meticulously crafted down to the last pixel."})]})]})]})})}),i.jsx("section",{className:"mission-section",children:i.jsx("div",{className:"about-container",children:i.jsxs("div",{className:"mission-grid",children:[i.jsxs("div",{className:"mission-card",children:[i.jsx("div",{className:"mission-icon",children:i.jsx(xn,{})}),i.jsx("h3",{className:"mission-title",children:"Our Mission"}),i.jsx("p",{className:"mission-text",children:"To empower businesses with cutting-edge digital solutions that drive growth, inspire innovation, and deliver measurable results. We're here to transform your vision into pixel-perfect reality."})]}),i.jsxs("div",{className:"mission-card",children:[i.jsx("div",{className:"mission-icon",children:i.jsx(_e,{})}),i.jsx("h3",{className:"mission-title",children:"Our Vision"}),i.jsx("p",{className:"mission-text",children:"To become the leading force in digital innovation, setting new standards for excellence in web development, design, and technology solutions. We envision a future where every business has access to world-class digital experiences."})]})]})})}),i.jsx("section",{className:"values-section",children:i.jsxs("div",{className:"about-container",children:[i.jsxs("h2",{className:"section-title text-center",children:["Our Core ",i.jsx("span",{className:"gradient-text",children:"Values"})]}),i.jsx("p",{className:"section-subtitle",children:"The principles that drive everything we do"}),i.jsx("div",{className:"values-grid",children:l.map((u,f)=>i.jsxs("div",{className:"value-card",style:{animationDelay:`${f*.15}s`},children:[i.jsx("div",{className:"value-icon",style:{color:u.color},children:u.icon}),i.jsx("h3",{className:"value-title",children:u.title}),i.jsx("p",{className:"value-description",children:u.description}),i.jsx("div",{className:"value-glow",style:{background:u.color}})]},f))})]})}),i.jsx("section",{className:"timeline-section",children:i.jsxs("div",{className:"about-container",children:[i.jsxs("h2",{className:"section-title text-center",children:["Our ",i.jsx("span",{className:"gradient-text",children:"Journey"})]}),i.jsx("p",{className:"section-subtitle",children:"Building the future, one pixel at a time"}),i.jsx("div",{className:"timeline",children:c.map((u,f)=>i.jsxs("div",{className:"timeline-item",style:{animationDelay:`${f*.2}s`},children:[i.jsx("div",{className:"timeline-dot"}),i.jsxs("div",{className:"timeline-content",children:[i.jsx("div",{className:"timeline-year",children:u.year}),i.jsx("h3",{className:"timeline-title",children:u.title}),i.jsx("p",{className:"timeline-text",children:u.description})]})]},f))})]})}),i.jsx("section",{className:"cta-section",children:i.jsx("div",{className:"about-container",children:i.jsxs("div",{className:"cta-content",children:[i.jsx("h2",{className:"cta-title",children:"Ready to Create Something Amazing?"}),i.jsx("p",{className:"cta-description",children:"Let's bring your vision to life with pixel-perfect precision"}),i.jsxs("div",{className:"cta-buttons",children:[i.jsxs("button",{className:"btn-primary-large",children:["Start Your Project ",i.jsx(De,{})]}),i.jsx("button",{className:"btn-secondary-large",children:"View Our Work"})]}),i.jsxs("div",{className:"social-section",children:[i.jsx("span",{className:"social-label",children:"Connect With Us:"}),i.jsxs("div",{className:"social-links",children:[i.jsx("a",{href:"#",className:"social-link-large",children:i.jsx(Cd,{})}),i.jsx("a",{href:"#",className:"social-link-large",children:i.jsx(vm,{})}),i.jsx("a",{href:"#",className:"social-link-large",children:i.jsx(bm,{})}),i.jsx("a",{href:"#",className:"social-link-large",children:i.jsx(vv,{})})]})]})]})})}),i.jsx("style",{children:`
        .about-page {
          background: #000;
          color: #fff;
          overflow-x: hidden;
          position: relative;
        }

        /* Animated Background */
        .about-bg-particles {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .particle {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.12;
          animation: float 10s ease-in-out infinite;
        }

        .particle-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          top: 10%;
          left: -15%;
        }

        .particle-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #00ff88, #0063f4);
          top: 50%;
          right: -10%;
          animation-delay: 3s;
        }

        .particle-3 {
          width: 450px;
          height: 450px;
          background: linear-gradient(135deg, #ffd700, #ff6b9d);
          bottom: 10%;
          left: 40%;
          animation-delay: 6s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
        }

        .about-container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 20px;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .about-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 0 80px;
        }

        .hero-content {
          flex: 1;
          animation: slideInLeft 1s ease;
        }

        @keyframes slideInLeft {
          from { opacity: 0; transform: translateX(-50px); }
          to { opacity: 1; transform: translateX(0); }
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(0, 99, 244, 0.15);
          border: 1px solid rgba(0, 99, 244, 0.4);
          border-radius: 25px;
          color: #00bfff;
          font-weight: 700;
          font-size: 0.95rem;
          margin-bottom: 24px;
        }

        .hero-title {
          font-size: clamp(40px, 7vw, 72px);
          font-weight: 900;
          line-height: 1.1;
          margin: 0 0 24px;
          letter-spacing: -0.03em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #0063f4 0%, #00bfff 50%, #00ff88 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          max-width: 600px;
        }

        /* 3D Floating Cube */
        .hero-visual {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: transform 0.1s ease;
        }

        .floating-cube {
          width: 220px;
          height: 220px;
          position: relative;
          transform-style: preserve-3d;
          animation: rotateCube 25s infinite linear;
        }

        @keyframes rotateCube {
          from { transform: rotateX(0) rotateY(0) rotateZ(0); }
          to { transform: rotateX(360deg) rotateY(360deg) rotateZ(360deg); }
        }

        .cube-face {
          position: absolute;
          width: 220px;
          height: 220px;
          border: 2px solid rgba(0, 99, 244, 0.6);
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.15), rgba(0, 191, 255, 0.08));
          backdrop-filter: blur(15px);
          box-shadow: 0 0 40px rgba(0, 99, 244, 0.3);
        }

        .cube-face.front  { transform: translateZ(110px); }
        .cube-face.back   { transform: rotateY(180deg) translateZ(110px); }
        .cube-face.left   { transform: rotateY(-90deg) translateZ(110px); }
        .cube-face.right  { transform: rotateY(90deg) translateZ(110px); }
        .cube-face.top    { transform: rotateX(90deg) translateZ(110px); }
        .cube-face.bottom { transform: rotateX(-90deg) translateZ(110px); }

        /* Founder Section */
        .founder-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.03), transparent);
        }

        .founder-grid {
          display: grid;
          grid-template-columns: 1fr 1.2fr;
          gap: 80px;
          align-items: center;
        }

        .founder-image-wrapper {
          position: relative;
        }

        .founder-frame {
          position: relative;
          border-radius: 30px;
          overflow: hidden;
          border: 3px solid rgba(0, 99, 244, 0.3);
          box-shadow: 0 30px 80px rgba(0, 99, 244, 0.2);
          animation: fadeInUp 1s ease;
        }

        .founder-image {
          width: 100%;
          height: 600px;
          object-fit: cover;
          display: block;
        }

        .founder-glow {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.2), rgba(0, 191, 255, 0.1));
        }

        .founder-content {
          animation: fadeInUp 1s ease 0.2s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .founder-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(0, 99, 244, 0.1);
          border: 1px solid rgba(0, 99, 244, 0.3);
          border-radius: 20px;
          color: #00bfff;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 20px;
        }

        .section-title {
          font-size: clamp(36px, 5vw, 52px);
          font-weight: 900;
          line-height: 1.2;
          margin: 0 0 28px;
        }

        .text-center {
          text-align: center;
        }

        .section-subtitle {
          font-size: 1.15rem;
          color: rgba(255, 255, 255, 0.7);
          text-align: center;
          margin: -16px 0 60px;
        }

        .founder-text {
          font-size: 1.1rem;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 24px;
        }

        .founder-stats {
          display: flex;
          gap: 20px;
          margin-top: 40px;
          flex-wrap: wrap;
        }

        .stat-box {
          flex: 1;
          min-width: 140px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .stat-box:hover {
          background: rgba(0, 99, 244, 0.1);
          border-color: rgba(0, 99, 244, 0.4);
          transform: translateY(-5px);
        }

        .stat-icon {
          font-size: 32px;
          color: #00bfff;
          margin-bottom: 12px;
        }

        .stat-label {
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        /* Origin Story Section */
        .origin-section {
          padding: 120px 0;
        }

        .origin-header {
          margin-bottom: 80px;
        }

        .origin-story {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }

        .story-card {
          position: relative;
          padding: 50px 35px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 24px;
          transition: all 0.4s ease;
          overflow: hidden;
          animation: fadeInUp 0.8s ease both;
        }

        .story-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .story-number {
          position: absolute;
          top: 20px;
          right: 30px;
          font-size: 64px;
          font-weight: 900;
          color: rgba(0, 99, 244, 0.1);
          line-height: 1;
        }

        .story-icon {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-radius: 18px;
          color: #fff;
          font-size: 32px;
          margin-bottom: 24px;
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.3);
        }

        .story-title {
          font-size: 1.6rem;
          font-weight: 700;
          margin: 0 0 16px;
        }

        .story-text {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        /* Name Meaning Section */
        .meaning-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.05), transparent);
        }

        .meaning-content {
          display: grid;
          grid-template-columns: 1fr 1.5fr;
          gap: 80px;
          align-items: center;
        }

        .meaning-visual {
          position: relative;
          height: 500px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pixel-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 20px;
        }

        .pixel-dot {
          width: 60px;
          height: 60px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-radius: 12px;
          animation: pixelPulse 2s ease-in-out infinite;
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
        }

        @keyframes pixelPulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(0.8); opacity: 0.6; }
        }

        .meaning-breakdown {
          display: flex;
          align-items: center;
          gap: 30px;
          margin: 40px 0;
          flex-wrap: wrap;
        }

        .word-part {
          flex: 1;
          min-width: 200px;
        }

        .word-title {
          font-size: 2rem;
          font-weight: 900;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 12px;
        }

        .word-description {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        .plus-sign {
          font-size: 3rem;
          font-weight: 900;
          color: #00bfff;
        }

        .meaning-result {
          padding: 35px;
          background: rgba(0, 99, 244, 0.08);
          border: 2px solid rgba(0, 99, 244, 0.3);
          border-radius: 20px;
          margin-top: 40px;
        }

        .result-title {
          font-size: 1.8rem;
          font-weight: 800;
          color: #00bfff;
          margin: 0 0 16px;
        }

        .result-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
        }

        /* Mission Section */
        .mission-section {
          padding: 120px 0;
        }

      .mission-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(450px, 1fr));
          gap: 40px;
        }

        .mission-card {
          padding: 50px 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .mission-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .mission-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .mission-card:hover::before {
          opacity: 1;
        }

        .mission-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-radius: 20px;
          color: #fff;
          font-size: 36px;
          margin-bottom: 28px;
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.4);
          position: relative;
          z-index: 1;
        }

        .mission-title {
          font-size: 2rem;
          font-weight: 800;
          margin: 0 0 20px;
          position: relative;
          z-index: 1;
        }

        .mission-text {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
          position: relative;
          z-index: 1;
        }

        /* Values Section */
        .values-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.03), transparent);
        }

        .values-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 35px;
          margin-top: 60px;
        }

        .value-card {
          position: relative;
          padding: 45px 35px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.4s ease;
          overflow: hidden;
          animation: fadeInUp 0.8s ease both;
        }

        .value-card:hover {
          transform: translateY(-10px) scale(1.02);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
        }

        .value-glow {
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          opacity: 0;
          filter: blur(60px);
          transition: opacity 0.4s ease;
        }

        .value-card:hover .value-glow {
          opacity: 0.3;
        }

        .value-icon {
          font-size: 48px;
          margin-bottom: 24px;
          display: block;
        }

        .value-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin: 0 0 16px;
          position: relative;
          z-index: 1;
        }

        .value-description {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
          position: relative;
          z-index: 1;
        }

        /* Timeline Section */
        .timeline-section {
          padding: 120px 0;
        }

        .timeline {
          position: relative;
          max-width: 800px;
          margin: 80px auto 0;
        }

        .timeline::before {
          content: '';
          position: absolute;
          left: 30px;
          top: 0;
          bottom: 0;
          width: 3px;
          background: linear-gradient(180deg, #0063f4, #00bfff, #00ff88);
        }

        .timeline-item {
          position: relative;
          padding-left: 90px;
          margin-bottom: 80px;
          animation: fadeInUp 0.8s ease both;
        }

        .timeline-dot {
          position: absolute;
          left: 18px;
          top: 8px;
          width: 28px;
          height: 28px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border: 4px solid #000;
          border-radius: 50%;
          box-shadow: 0 0 30px rgba(0, 99, 244, 0.6);
          animation: pulse 2s ease-in-out infinite;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); box-shadow: 0 0 30px rgba(0, 99, 244, 0.6); }
          50% { transform: scale(1.1); box-shadow: 0 0 50px rgba(0, 99, 244, 0.8); }
        }

        .timeline-content {
          padding: 35px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.4s ease;
        }

        .timeline-content:hover {
          background: rgba(0, 99, 244, 0.05);
          border-color: rgba(0, 99, 244, 0.4);
          transform: translateX(10px);
        }

        .timeline-year {
          display: inline-block;
          padding: 8px 18px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-radius: 12px;
          font-weight: 800;
          font-size: 0.95rem;
          margin-bottom: 16px;
          color: #fff;
        }

        .timeline-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin: 0 0 12px;
        }

        .timeline-text {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
          margin: 0;
        }

        /* CTA Section */
        .cta-section {
          padding: 120px 0 80px;
          text-align: center;
        }

        .cta-content {
          max-width: 800px;
          margin: 0 auto;
        }

        .cta-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 900;
          line-height: 1.2;
          margin: 0 0 24px;
        }

        .cta-description {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 50px;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }

        .btn-primary-large, .btn-secondary-large {
          padding: 18px 40px;
          font-size: 1.1rem;
          font-weight: 700;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: inline-flex;
          align-items: center;
          gap: 12px;
        }

        .btn-primary-large {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: #fff;
          box-shadow: 0 10px 40px rgba(0, 99, 244, 0.4);
        }

        .btn-primary-large:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(0, 99, 244, 0.6);
        }

        .btn-secondary-large {
          background: transparent;
          color: #fff;
          border: 2px solid rgba(255, 255, 255, 0.2);
        }

        .btn-secondary-large:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-3px);
        }

        .social-section {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 30px;
          flex-wrap: wrap;
        }

        .social-label {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        .social-links {
          display: flex;
          gap: 16px;
        }

        .social-link-large {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50%;
          color: #fff;
          font-size: 22px;
          transition: all 0.3s ease;
          text-decoration: none;
        }

        .social-link-large:hover {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-color: transparent;
          transform: translateY(-5px) scale(1.1);
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.5);
        }

        /* Responsive Design */
        @media (max-width: 968px) {
          .about-hero .about-container {
            flex-direction: column;
            text-align: center;
          }

          .hero-subtitle {
            max-width: 100%;
          }

          .floating-cube {
            margin-top: 60px;
          }

          .founder-grid,
          .meaning-content {
            grid-template-columns: 1fr;
            gap: 50px;
          }

          .founder-image {
            height: 500px;
          }

          .mission-grid,
          .values-grid {
            grid-template-columns: 1fr;
          }

          .origin-story {
            grid-template-columns: 1fr;
          }

          .meaning-breakdown {
            flex-direction: column;
            align-items: flex-start;
          }

          .plus-sign {
            align-self: center;
          }
        }

        @media (max-width: 640px) {
          .hero-title {
            font-size: 36px;
          }

          .section-title {
            font-size: 32px;
          }

          .cta-title {
            font-size: 32px;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .btn-primary-large,
          .btn-secondary-large {
            width: 100%;
            justify-content: center;
          }

          .timeline::before {
            left: 15px;
          }

          .timeline-dot {
            left: 3px;
          }

          .timeline-item {
            padding-left: 60px;
          }

          .founder-stats {
            flex-direction: column;
          }

          .stat-box {
            min-width: 100%;
          }
        }
      `}),i.jsx(Ot,{}),i.jsx(pu,{})]})},ij=()=>{const[e,n]=j.useState(0),[s,a]=j.useState(0);j.useEffect(()=>{const p=()=>{a(window.scrollY)};return window.addEventListener("scroll",p),()=>window.removeEventListener("scroll",p)},[]);const l=[{number:"01",title:"Discovery & Research",icon:i.jsx(xn,{}),description:"We dive deep into understanding your business, goals, target audience, and market landscape. Every great project starts with knowing exactly what success looks like.",details:["Stakeholder interviews & workshops","Competitor analysis & market research","User persona development","Requirements gathering & documentation"],color:"#0063f4",duration:"1-2 weeks"},{number:"02",title:"Strategy & Planning",icon:i.jsx(Rt,{}),description:"Armed with insights, we craft a comprehensive roadmap. This blueprint ensures everyone is aligned and every pixel serves a purpose.",details:["Project scope & timeline definition","Technology stack selection","Architecture & design planning","Resource allocation & team assembly"],color:"#00bfff",duration:"1 week"},{number:"03",title:"Design & Prototyping",icon:i.jsx(nr,{}),description:"Our creative team brings concepts to life. From wireframes to high-fidelity designs, we create experiences that captivate and convert.",details:["Wireframing & user flow mapping","Visual design & brand integration","Interactive prototypes","Design system development"],color:"#00ff88",duration:"2-3 weeks"},{number:"04",title:"Development & Iteration",icon:i.jsx(wn,{}),description:"Where ideas become reality. Our developers build robust, scalable solutions using cutting-edge technologies and best practices.",details:["Agile sprint-based development","Continuous integration & deployment","Regular code reviews & testing","Weekly progress demonstrations"],color:"#ffd700",duration:"4-12 weeks"},{number:"05",title:"Testing & Quality Assurance",icon:i.jsx(lt,{}),description:"Perfection is in the details. We rigorously test every feature, interaction, and edge case to ensure flawless performance.",details:["Automated & manual testing","Cross-browser & device compatibility","Performance optimization","Security audits & penetration testing"],color:"#ff6b9d",duration:"1-2 weeks"},{number:"06",title:"Launch & Deployment",icon:i.jsx(_e,{}),description:"It's showtime! We handle the entire deployment process, ensuring a smooth transition from development to production.",details:["Deployment strategy & rollout plan","Server configuration & optimization","Final quality checks","Go-live monitoring & support"],color:"#9d4edd",duration:"3-5 days"},{number:"07",title:"Support & Evolution",icon:i.jsx(ho,{}),description:"Our partnership doesn't end at launch. We provide ongoing support, monitoring, and continuous improvements to keep you ahead.",details:["24/7 technical support","Performance monitoring & analytics","Regular updates & maintenance","Feature enhancements & scaling"],color:"#00d1ff",duration:"Ongoing"}],c=[{icon:i.jsx(Xe,{}),title:"Client-First Mindset",description:"Your success is our north star. We treat every project as if it were our own business."},{icon:i.jsx(hi,{}),title:"Transparent Communication",description:"No jargon, no surprises. We keep you in the loop with clear, honest updates at every stage."},{icon:i.jsx(Ja,{}),title:"Agile & Adaptive",description:"Markets change, requirements evolve. We stay flexible and responsive to keep you competitive."},{icon:i.jsx(Gt,{}),title:"Quality Over Speed",description:"We move fast, but never at the expense of excellence. Every deliverable meets our high standards."},{icon:i.jsx(mv,{}),title:"Collaborative Approach",description:"Your team + our team = dream team. We work as an extension of your organization."},{icon:i.jsx(fo,{}),title:"Passion-Driven",description:"We love what we do, and it shows. Every project gets our full dedication and creativity."}],u=[{name:"Figma",category:"Design",icon:"🎨"},{name:"React",category:"Frontend",icon:"⚛️"},{name:"Node.js",category:"Backend",icon:"🟢"},{name:"AWS",category:"Cloud",icon:"☁️"},{name:"Docker",category:"DevOps",icon:"🐳"},{name:"Git",category:"Version Control",icon:"🔀"},{name:"Jira",category:"Project Management",icon:"📊"},{name:"Slack",category:"Communication",icon:"💬"}],f=[{icon:i.jsx(yn,{}),value:"48hrs",label:"Average Response Time"},{icon:i.jsx(Ke,{}),value:"98%",label:"On-Time Delivery"},{icon:i.jsx(eo,{}),value:"5.0",label:"Client Satisfaction"},{icon:i.jsx(it,{}),value:"100%",label:"Quality Assurance"}];return i.jsxs("div",{className:"work-page",children:[i.jsxs("div",{className:"work-bg",children:[i.jsx("div",{className:"bg-grid"}),i.jsx("div",{className:"bg-gradient gradient-1"}),i.jsx("div",{className:"bg-gradient gradient-2"}),i.jsx("div",{className:"bg-gradient gradient-3"})]}),i.jsx("section",{className:"work-hero",children:i.jsxs("div",{className:"work-container",children:[i.jsxs("div",{className:"hero-badge",children:[i.jsx(Ja,{})," Our Methodology"]}),i.jsxs("h1",{className:"hero-title",children:["How We ",i.jsx("span",{className:"gradient-text",children:"Work & Function"})]}),i.jsx("p",{className:"hero-subtitle",children:"A proven process that transforms ideas into exceptional digital experiences. Transparent, collaborative, and designed for success."}),i.jsx("div",{className:"metrics-grid",children:f.map((p,m)=>i.jsxs("div",{className:"metric-card",style:{animationDelay:`${m*.1}s`},children:[i.jsx("div",{className:"metric-icon",children:p.icon}),i.jsx("div",{className:"metric-value",children:p.value}),i.jsx("div",{className:"metric-label",children:p.label})]},m))})]})}),i.jsx("section",{className:"process-section",children:i.jsxs("div",{className:"work-container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Our ",i.jsx("span",{className:"gradient-text",children:"7-Step Process"})]}),i.jsx("p",{className:"section-subtitle",children:"From concept to launch and beyond—every step carefully orchestrated for maximum impact"})]}),i.jsx("div",{className:"process-timeline",children:l.map((p,m)=>i.jsxs("div",{className:`process-step ${e===m?"active":""}`,onMouseEnter:()=>n(m),style:{animationDelay:`${m*.1}s`},children:[i.jsx("div",{className:"step-number",style:{color:p.color},children:p.number}),i.jsx("div",{className:"step-icon",style:{background:p.color},children:p.icon}),i.jsxs("div",{className:"step-content",children:[i.jsxs("div",{className:"step-header",children:[i.jsx("h3",{className:"step-title",children:p.title}),i.jsxs("span",{className:"step-duration",style:{color:p.color},children:[i.jsx(yn,{})," ",p.duration]})]}),i.jsx("p",{className:"step-description",children:p.description}),i.jsx("ul",{className:"step-details",children:p.details.map((g,v)=>i.jsxs("li",{className:"detail-item",children:[i.jsx(it,{style:{color:p.color}}),i.jsx("span",{children:g})]},v))})]}),i.jsx("div",{className:"step-connector"}),i.jsx("div",{className:"step-glow",style:{background:p.color}})]},m))})]})}),i.jsx("section",{className:"principles-section",children:i.jsxs("div",{className:"work-container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Our Core ",i.jsx("span",{className:"gradient-text",children:"Principles"})]}),i.jsx("p",{className:"section-subtitle",children:"The values that guide every decision, every line of code, and every pixel we craft"})]}),i.jsx("div",{className:"principles-grid",children:c.map((p,m)=>i.jsxs("div",{className:"principle-card",style:{animationDelay:`${m*.1}s`},children:[i.jsx("div",{className:"principle-icon",children:p.icon}),i.jsx("h3",{className:"principle-title",children:p.title}),i.jsx("p",{className:"principle-description",children:p.description}),i.jsx("div",{className:"principle-line"})]},m))})]})}),i.jsx("section",{className:"tools-section",children:i.jsxs("div",{className:"work-container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Our ",i.jsx("span",{className:"gradient-text",children:"Tech Stack"})]}),i.jsx("p",{className:"section-subtitle",children:"Industry-leading tools and technologies that power our solutions"})]}),i.jsx("div",{className:"tools-grid",children:u.map((p,m)=>i.jsxs("div",{className:"tool-card",style:{animationDelay:`${m*.05}s`},children:[i.jsx("div",{className:"tool-icon",children:p.icon}),i.jsx("div",{className:"tool-name",children:p.name}),i.jsx("div",{className:"tool-category",children:p.category})]},m))})]})}),i.jsx("section",{className:"cta-section",children:i.jsx("div",{className:"work-container",children:i.jsxs("div",{className:"cta-content",children:[i.jsx("div",{className:"cta-icon",children:i.jsx(_e,{})}),i.jsx("h2",{className:"cta-title",children:"Ready to Start Your Project?"}),i.jsx("p",{className:"cta-text",children:"Let's discuss how our proven process can bring your vision to life. Schedule a free consultation today."}),i.jsxs("button",{className:"cta-button",children:["Get Started ",i.jsx(De,{})]})]})})}),i.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .work-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Animated Background */
        .work-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-grid {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 99, 244, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 99, 244, 0.05) 1px, transparent 1px);
          background-size: 50px 50px;
          animation: gridMove 20s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }

        .bg-gradient {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.15;
          animation: floatGradient 15s ease-in-out infinite;
        }

        .gradient-1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          top: -10%;
          left: -10%;
        }

        .gradient-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #00ff88, #0063f4);
          top: 50%;
          right: -10%;
          animation-delay: 5s;
        }

        .gradient-3 {
          width: 550px;
          height: 550px;
          background: linear-gradient(135deg, #ffd700, #ff6b9d);
          bottom: -10%;
          left: 40%;
          animation-delay: 10s;
        }

        @keyframes floatGradient {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-40px, 40px) scale(0.9); }
        }

        .work-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .work-hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          padding: 140px 0 80px;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(0, 99, 244, 0.15);
          border: 1px solid rgba(0, 99, 244, 0.4);
          border-radius: 30px;
          color: #00bfff;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 30px;
          animation: fadeInDown 1s ease;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-size: clamp(48px, 8vw, 88px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 30px;
          animation: fadeInUp 1s ease 0.2s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, #0063f4 0%, #00bfff 50%, #00ff88 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.35rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          max-width: 800px;
          margin: 0 auto 60px;
          animation: fadeInUp 1s ease 0.4s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Metrics Grid */
        .metrics-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 30px;
          margin-top: 60px;
        }

        .metric-card {
          padding: 35px 25px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          animation: fadeInUp 0.8s ease both;
        }

        .metric-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .metric-icon {
          font-size: 42px;
          color: #00bfff;
          margin-bottom: 20px;
        }

        .metric-value {
          font-size: 2.8rem;
          font-weight: 900;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 10px;
        }

        .metric-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        /* Section Header */
        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
          max-width: 700px;
          margin: 0 auto;
        }

        /* Process Timeline */
        .process-section {
          padding: 120px 0;
        }

        .process-timeline {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }

        .process-step {
          position: relative;
          padding: 50px 40px 50px 140px;
          margin-bottom: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 25px;
          transition: all 0.5s ease;
          animation: fadeInUp 0.8s ease both;
          overflow: hidden;
        }

        .process-step:hover,
        .process-step.active {
          transform: translateX(10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .step-number {
          position: absolute;
          top: 30px;
          left: 40px;
          font-size: 4rem;
          font-weight: 900;
          opacity: 0.15;
          line-height: 1;
        }

        .step-icon {
          position: absolute;
          top: 50px;
          left: 40px;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          font-size: 32px;
          color: #fff;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
          z-index: 1;
        }

        .step-content {
          position: relative;
          z-index: 1;
        }

        .step-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 16px;
          flex-wrap: wrap;
          gap: 15px;
        }

        .step-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin: 0;
        }

        .step-duration {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 20px;
          font-size: 0.95rem;
          font-weight: 700;
        }

        .step-description {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 24px;
        }

        .step-details {
          list-style: none;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 12px;
        }

        .detail-item {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .detail-item svg {
          flex-shrink: 0;
          font-size: 18px;
        }

        .step-connector {
          position: absolute;
          left: 74px;
          top: 130px;
          bottom: -40px;
          width: 2px;
          background: linear-gradient(180deg, rgba(0, 99, 244, 0.5), transparent);
        }

        .process-step:last-child .step-connector {
          display: none;
        }

        .step-glow {
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 300px;
          height: 300px;
          border-radius: 50%;
          opacity: 0;
          filter: blur(80px);
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .process-step:hover .step-glow,
        .process-step.active .step-glow {
          opacity: 0.2;
        }

        /* Principles Section */
        .principles-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.03), transparent);
        }

        .principles-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }

        .principle-card {
          position: relative;
          padding: 45px 35px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          transition: all 0.4s ease;
          animation: fadeInUp 0.8s ease both;
        }

        .principle-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.3);
        }

        .principle-icon {
          font-size: 48px;
          color: #00bfff;
          margin-bottom: 24px;
        }

        .principle-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .principle-description {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
        }

        .principle-line {
          width: 60px;
          height: 4px;
          background: linear-gradient(90deg, #0063f4, #00bfff);
          border-radius: 2px;
          margin-top: 24px;
          transition: width 0.4s ease;
        }

        .principle-card:hover .principle-line {
          width: 100px;
        }

        /* Tools Section */
        .tools-section {
          padding: 120px 0;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 25px;
        }

        .tool-card {
          padding: 35px 25px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease both;
        }

        .tool-card:hover {
          transform: translateY(-8px) scale(1.05);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
          box-shadow: 0 15px 50px rgba(0, 99, 244, 0.3);
        }

        .tool-icon {
          font-size: 3.5rem;
          margin-bottom: 16px;
        }

        .tool-name {
          font-size: 1.2rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .tool-category {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        /* CTA Section */
        .cta-section {
          padding: 120px 0;
        }

        .cta-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 80px 50px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          position: relative;
          overflow: hidden;
        }

        .cta-content::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), transparent);
          opacity: 0.5;
        }

        .cta-icon {
          font-size: 80px;
          color: #00bfff;
          margin-bottom: 30px;
          animation: pulse 2s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .cta-title {
          font-size: 3rem;
          font-weight: 900;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .cta-text {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        .cta-button {
          padding: 20px 50px;
          font-size: 1.2rem;
          font-weight: 700;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: #fff;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
          box-shadow: 0 10px 40px rgba(0, 99, 244, 0.4);
        }

        .cta-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.6);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .process-step {
            padding: 40px 30px 40px 120px;
          }

          .step-icon {
            width: 60px;
            height: 60px;
            font-size: 28px;
            left: 30px;
            top: 40px;
          }

          .step-number {
            left: 30px;
            font-size: 3rem;
          }

          .step-connector {
            left: 60px;
          }
        }

        @media (max-width: 768px) {
          .work-container {
            padding: 0 20px;
          }

          .hero-title {
            font-size: 42px;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .metrics-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .metric-value {
            font-size: 2.2rem;
          }

          .section-title {
            font-size: 36px;
          }

          .process-step {
            padding: 120px 25px 30px 25px;
          }

          .step-number {
            top: 20px;
            left: 25px;
            font-size: 2.5rem;
          }

          .step-icon {
            top: 20px;
            left: auto;
            right: 25px;
            width: 55px;
            height: 55px;
            font-size: 24px;
          }

          .step-connector {
            display: none;
          }

          .step-title {
            font-size: 1.5rem;
          }

          .step-details {
            grid-template-columns: 1fr;
          }

          .principles-grid {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .tools-grid {
            grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
            gap: 20px;
          }

          .tool-icon {
            font-size: 2.8rem;
          }

          .cta-content {
            padding: 60px 30px;
          }

          .cta-title {
            font-size: 2rem;
          }

          .cta-text {
            font-size: 1.05rem;
          }
        }

        @media (max-width: 480px) {
          .metrics-grid {
            grid-template-columns: 1fr;
          }

          .hero-badge {
            font-size: 0.9rem;
            padding: 10px 18px;
          }

          .step-header {
            flex-direction: column;
            align-items: flex-start;
          }

          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .cta-button {
            width: 100%;
            justify-content: center;
            padding: 18px 40px;
          }
        }
      `}),i.jsx(Ot,{}),i.jsx(pu,{})]})},rj=()=>i.jsxs("div",{children:[i.jsx("h1",{children:"Client Portfolio"}),i.jsx("p",{children:"Here you can find our client portfolio."})]}),sj=()=>{const[e,n]=j.useState({x:0,y:0}),[s,a]=j.useState(null);j.useEffect(()=>{const u=f=>{n({x:f.clientX,y:f.clientY})};return window.addEventListener("mousemove",u),()=>window.removeEventListener("mousemove",u)},[]);const l=[{name:"Ocholi Divine",role:"Founder & CEO",image:"https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&h=600&fit=crop",bio:"Visionary leader driving innovation and excellence at Verapixels",specialties:["Strategy","Innovation","Leadership"],social:{github:"#",linkedin:"#",twitter:"#",email:"divine@verapixels.com"},color:"#0063f4"},{name:"Sarah Chen",role:"Lead Developer",image:"https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=600&h=600&fit=crop",bio:"Full-stack wizard crafting elegant solutions to complex problems",specialties:["React","Node.js","Cloud"],social:{github:"#",linkedin:"#",twitter:"#",email:"sarah@verapixels.com"},color:"#00bfff"},{name:"Marcus Johnson",role:"Creative Director",image:"https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&h=600&fit=crop",bio:"Design genius transforming ideas into stunning visual experiences",specialties:["UI/UX","Branding","Animation"],social:{github:"#",linkedin:"#",twitter:"#",email:"marcus@verapixels.com"},color:"#00ff88"},{name:"Amara Williams",role:"Tech Lead",image:"https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&h=600&fit=crop",bio:"Architecture expert building scalable systems that power the future",specialties:["DevOps","Security","Microservices"],social:{github:"#",linkedin:"#",twitter:"#",email:"amara@verapixels.com"},color:"#ffd700"},{name:"David Park",role:"Product Manager",image:"https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=600&h=600&fit=crop",bio:"Strategic thinker aligning technology with business goals",specialties:["Product Strategy","Agile","Analytics"],social:{github:"#",linkedin:"#",twitter:"#",email:"david@verapixels.com"},color:"#ff6b9d"},{name:"Elena Rodriguez",role:"Marketing Director",image:"https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=600&h=600&fit=crop",bio:"Brand storyteller connecting technology with human experiences",specialties:["Digital Marketing","Content","Growth"],social:{github:"#",linkedin:"#",twitter:"#",email:"elena@verapixels.com"},color:"#9d4edd"}],c=[{icon:i.jsx(Xe,{}),value:"15+",label:"Team Members",color:"#0063f4"},{icon:i.jsx(Gt,{}),value:"50+",label:"Projects Delivered",color:"#00ff88"},{icon:i.jsx(eo,{}),value:"98%",label:"Client Satisfaction",color:"#ffd700"},{icon:i.jsx(_e,{}),value:"24/7",label:"Support Available",color:"#ff6b9d"}];return i.jsxs("div",{className:"team-page",children:[i.jsxs("div",{className:"team-bg",children:[i.jsx("div",{className:"bg-orb orb-1",style:{transform:`translate(${e.x*.02}px, ${e.y*.02}px)`}}),i.jsx("div",{className:"bg-orb orb-2",style:{transform:`translate(${e.x*-.03}px, ${e.y*-.03}px)`}}),i.jsx("div",{className:"bg-orb orb-3",style:{transform:`translate(${e.x*.04}px, ${e.y*-.02}px)`}})]}),i.jsx("section",{className:"team-hero",children:i.jsxs("div",{className:"team-container",children:[i.jsxs("div",{className:"hero-badge",children:[i.jsx(fo,{})," Meet the Minds Behind Verapixels"]}),i.jsxs("h1",{className:"hero-title",children:["Our ",i.jsx("span",{className:"gradient-text",children:"Core Team"})]}),i.jsx("p",{className:"hero-subtitle",children:"A collective of passionate innovators, creators, and problem solvers dedicated to building the future of digital experiences"}),i.jsxs("div",{className:"floating-icons",children:[i.jsx("div",{className:"float-icon",style:{animationDelay:"0s"},children:i.jsx(wn,{})}),i.jsx("div",{className:"float-icon",style:{animationDelay:"0.5s"},children:i.jsx($c,{})}),i.jsx("div",{className:"float-icon",style:{animationDelay:"1s"},children:i.jsx(Ke,{})}),i.jsx("div",{className:"float-icon",style:{animationDelay:"1.5s"},children:i.jsx(_e,{})})]})]})}),i.jsx("section",{className:"stats-section",children:i.jsx("div",{className:"team-container",children:i.jsx("div",{className:"stats-grid",children:c.map((u,f)=>i.jsxs("div",{className:"stat-card",style:{animationDelay:`${f*.1}s`},children:[i.jsx("div",{className:"stat-icon",style:{color:u.color},children:u.icon}),i.jsx("div",{className:"stat-value",style:{color:u.color},children:u.value}),i.jsx("div",{className:"stat-label",children:u.label}),i.jsx("div",{className:"stat-glow",style:{background:u.color}})]},f))})})}),i.jsx("section",{className:"team-grid-section",children:i.jsx("div",{className:"team-container",children:i.jsx("div",{className:"team-grid",children:l.map((u,f)=>i.jsxs("div",{className:`member-card ${s===f?"active":""}`,onMouseEnter:()=>a(f),onMouseLeave:()=>a(null),style:{animationDelay:`${f*.1}s`},children:[i.jsx("div",{className:"card-glow",style:{background:u.color}}),i.jsxs("div",{className:"member-image-wrapper",children:[i.jsx("img",{src:u.image,alt:u.name,className:"member-image"}),i.jsx("div",{className:"image-overlay",style:{background:`linear-gradient(135deg, ${u.color}33, transparent)`}}),i.jsxs("div",{className:"social-overlay",children:[i.jsx("a",{href:u.social.github,className:"social-icon",children:i.jsx(Cd,{})}),i.jsx("a",{href:u.social.linkedin,className:"social-icon",children:i.jsx(vm,{})}),i.jsx("a",{href:u.social.twitter,className:"social-icon",children:i.jsx(bm,{})}),i.jsx("a",{href:`mailto:${u.social.email}`,className:"social-icon",children:i.jsx(en,{})})]})]}),i.jsxs("div",{className:"member-info",children:[i.jsx("h3",{className:"member-name",children:u.name}),i.jsx("div",{className:"member-role",style:{color:u.color},children:u.role}),i.jsx("p",{className:"member-bio",children:u.bio}),i.jsx("div",{className:"specialties",children:u.specialties.map((p,m)=>i.jsx("span",{className:"specialty-tag",style:{borderColor:u.color,color:u.color},children:p},m))})]}),i.jsx("div",{className:"card-corner",style:{borderColor:u.color}})]},f))})})}),i.jsx("section",{className:"join-section",children:i.jsx("div",{className:"team-container",children:i.jsxs("div",{className:"join-content",children:[i.jsx("div",{className:"join-icon",children:i.jsx(Xe,{})}),i.jsx("h2",{className:"join-title",children:"Want to Join Our Team?"}),i.jsx("p",{className:"join-text",children:"We're always looking for talented individuals who share our passion for innovation and excellence. Join us in building the future of digital experiences."}),i.jsxs("button",{className:"join-button",children:["View Open Positions ",i.jsx(_e,{})]})]})})}),i.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .team-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Animated Background */
        .team-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.15;
          animation: float 12s ease-in-out infinite;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          top: -10%;
          left: -10%;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #00ff88, #0063f4);
          top: 40%;
          right: -10%;
          animation-delay: 4s;
        }

        .orb-3 {
          width: 550px;
          height: 550px;
          background: linear-gradient(135deg, #ffd700, #ff6b9d);
          bottom: -10%;
          left: 30%;
          animation-delay: 8s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        .team-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .team-hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 140px 0 80px;
          position: relative;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(0, 99, 244, 0.15);
          border: 1px solid rgba(0, 99, 244, 0.4);
          border-radius: 30px;
          color: #00bfff;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 30px;
          animation: fadeInDown 1s ease;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-size: clamp(48px, 8vw, 88px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 30px;
          animation: fadeInUp 1s ease 0.2s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, #0063f4 0%, #00bfff 50%, #00ff88 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.35rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          max-width: 800px;
          margin: 0 auto;
          animation: fadeInUp 1s ease 0.4s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Floating Icons */
        .floating-icons {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .float-icon {
          position: absolute;
          font-size: 40px;
          color: rgba(0, 99, 244, 0.3);
          animation: floatAround 15s ease-in-out infinite;
        }

        .float-icon:nth-child(1) { top: 20%; left: 10%; }
        .float-icon:nth-child(2) { top: 15%; right: 15%; }
        .float-icon:nth-child(3) { bottom: 25%; left: 15%; }
        .float-icon:nth-child(4) { bottom: 20%; right: 10%; }

        @keyframes floatAround {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          25% { transform: translate(20px, -20px) rotate(90deg); }
          50% { transform: translate(-20px, 20px) rotate(180deg); }
          75% { transform: translate(20px, 20px) rotate(270deg); }
        }

        /* Stats Section */
        .stats-section {
          padding: 60px 0;
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 30px;
        }

        .stat-card {
          position: relative;
          padding: 40px 30px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          text-align: center;
          transition: all 0.4s ease;
          overflow: hidden;
          animation: fadeInUp 0.8s ease both;
        }

        .stat-card:hover {
          transform: translateY(-10px);
          border-color: rgba(0, 99, 244, 0.5);
          background: rgba(0, 99, 244, 0.05);
        }

        .stat-glow {
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          opacity: 0;
          filter: blur(60px);
          transition: opacity 0.4s ease;
        }

        .stat-card:hover .stat-glow {
          opacity: 0.3;
        }

        .stat-icon {
          font-size: 48px;
          margin-bottom: 20px;
        }

        .stat-value {
          font-size: 3rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 12px;
        }

        .stat-label {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        /* Team Grid */
        .team-grid-section {
          padding: 100px 0;
        }

        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 50px;
        }

        .member-card {
          position: relative;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          overflow: hidden;
          transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.8s ease both;
        }

        .member-card:hover {
          transform: translateY(-15px) scale(1.02);
          border-color: rgba(0, 99, 244, 0.6);
          box-shadow: 0 30px 80px rgba(0, 99, 244, 0.4);
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          opacity: 0;
          filter: blur(80px);
          transition: opacity 0.5s ease;
          pointer-events: none;
        }

        .member-card:hover .card-glow {
          opacity: 0.15;
        }

        /* Member Image */
        .member-image-wrapper {
          position: relative;
          width: 100%;
          height: 420px;
          overflow: hidden;
        }

        .member-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.6s ease;
        }

        .member-card:hover .member-image {
          transform: scale(1.1);
        }

        .image-overlay {
          position: absolute;
          inset: 0;
          opacity: 0.6;
          transition: opacity 0.4s ease;
        }

        .member-card:hover .image-overlay {
          opacity: 0.8;
        }

        /* Social Overlay */
        .social-overlay {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 20px;
          background: rgba(0, 0, 0, 0.85);
          backdrop-filter: blur(10px);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .member-card:hover .social-overlay {
          opacity: 1;
        }

        .social-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: #fff;
          font-size: 22px;
          text-decoration: none;
          transition: all 0.3s ease;
          transform: translateY(20px);
        }

        .member-card:hover .social-icon {
          transform: translateY(0);
        }

        .social-icon:nth-child(1) { transition-delay: 0.1s; }
        .social-icon:nth-child(2) { transition-delay: 0.15s; }
        .social-icon:nth-child(3) { transition-delay: 0.2s; }
        .social-icon:nth-child(4) { transition-delay: 0.25s; }

        .social-icon:hover {
          background: #00bfff;
          border-color: #00bfff;
          transform: translateY(0) scale(1.15);
        }

        /* Member Info */
        .member-info {
          padding: 35px 30px;
        }

        .member-name {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .member-role {
          font-size: 1.1rem;
          font-weight: 700;
          margin-bottom: 16px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .member-bio {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 20px;
        }

        /* Specialties */
        .specialties {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
        }

        .specialty-tag {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .specialty-tag:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        /* Card Corner Decoration */
        .card-corner {
          position: absolute;
          top: 20px;
          right: 20px;
          width: 40px;
          height: 40px;
          border-top: 3px solid;
          border-right: 3px solid;
          border-radius: 0 10px 0 0;
          opacity: 0.3;
          transition: all 0.4s ease;
        }

        .member-card:hover .card-corner {
          opacity: 1;
          width: 60px;
          height: 60px;
        }

        /* Join Section */
        .join-section {
          padding: 100px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.05), transparent);
        }

        .join-content {
          text-align: center;
          max-width: 700px;
          margin: 0 auto;
          padding: 60px 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          position: relative;
          overflow: hidden;
        }

        .join-content::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), transparent);
          opacity: 0.5;
        }

        .join-icon {
          font-size: 72px;
          color: #00bfff;
          margin-bottom: 30px;
          animation: bounce 2s ease infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .join-title {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .join-text {
          font-size: 1.15rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        .join-button {
          padding: 18px 45px;
          font-size: 1.15rem;
          font-weight: 700;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          color: #fff;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
          box-shadow: 0 10px 40px rgba(0, 99, 244, 0.4);
        }

        .join-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.6);
        }

        /* Responsive */
        @media (max-width: 1200px) {
          .team-grid {
            grid-template-columns: repeat(auto-fill, minmax(340px, 1fr));
            gap: 40px;
          }
        }

        @media (max-width: 768px) {
          .team-container {
            padding: 0 20px;
          }

          .hero-title {
            font-size: 48px;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .team-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .member-image-wrapper {
            height: 350px;
          }

          .join-title {
            font-size: 2rem;
          }
        }

        @media (max-width: 480px) {
          .stats-grid {
            grid-template-columns: 1fr;
          }

          .stat-value {
            font-size: 2.5rem;
          }
        }
      `}),i.jsx(Ot,{})]})},aj=()=>i.jsxs("div",{children:[i.jsx("h1",{children:"Client Testimonials"}),i.jsx("p",{children:"Here you can find our client testimonials."})]}),oj=()=>i.jsxs("div",{children:[i.jsx("h1",{children:"Corporate Social Responsibility"}),i.jsx("p",{children:"Here you can find our corporate social responsibility initiatives."})]}),lj=()=>i.jsxs("div",{children:[i.jsx("h1",{children:"Start Your Career with Us"}),i.jsx("p",{children:"Here you can find information about starting your career with us."})]});function cj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M16.606 20.705v-2.371c-1.263 1.082-3.884 1.795-7.066 1.795-3.184 0-5.805-.714-7.068-1.797v2.369c0 1.168 2.903 2.47 7.068 2.47 4.16 0 7.06-1.3 7.066-2.466zm.001-6.765l.817-.005v.005c0 .517-.258.998-.75 1.441.601.54.75 1.071.75 1.449a1661.7 1661.7 0 0 0 0 3.87c0 1.881-3.389 3.3-7.884 3.3-4.471 0-7.846-1.404-7.88-3.27a583.119 583.119 0 0 1-.003-3.909c.001-.375.15-.9.745-1.437-.592-.538-.743-1.062-.746-1.435v-3.892c.002-.377.153-.903.747-1.438-.593-.54-.744-1.062-.747-1.435 0-1.357-.002-2.735.002-3.897C1.674 1.412 5.056 0 9.54 0c2.159 0 4.233.356 5.689.974l-.315.766c-1.36-.58-3.319-.91-5.374-.91-4.165 0-7.067 1.3-7.067 2.47 0 1.168 2.902 2.47 7.067 2.47.115 0 .222 0 .334-.005l.033.828c-.122.006-.245.006-.367.006-3.184 0-5.805-.714-7.068-1.798v2.38c.005.45.45.843.821 1.093 1.116.736 3.114 1.239 5.34 1.342l-.037.829c-2.254-.105-4.23-.59-5.5-1.332-.318.245-.623.573-.623.952 0 1.168 2.902 2.47 7.067 2.47.411 0 .812-.014 1.203-.042l.06.826c-.41.03-.833.045-1.263.045-3.184 0-5.805-.713-7.068-1.797v2.368c.005.462.449.855.821 1.104 1.275.842 3.67 1.366 6.247 1.366h.182v.83H9.54c-2.62 0-4.99-.507-6.444-1.359-.317.245-.623.574-.623.954 0 1.168 2.902 2.47 7.067 2.47 4.159 0 7.058-1.298 7.066-2.465v-.007c0-.377-.303-.705-.62-.948a5.732 5.732 0 0 1-.662.336l-.316-.764c.3-.128.56-.266.776-.412.376-.254.823-.651.823-1.1zm4.377-6.915h-2.717a.406.406 0 0 1-.332-.173.42.42 0 0 1-.055-.375l1.204-3.597h-5.403l-2.583 4.974h2.623c.128 0 .248.06.325.164a.418.418 0 0 1 .069.36l-2.249 8.365zm1.249-.128l-10.89 11.608a.408.408 0 0 1-.498.075.418.418 0 0 1-.192-.471l2.534-9.426h-2.766a.407.407 0 0 1-.349-.2.418.418 0 0 1-.012-.407l3.014-5.804a.408.408 0 0 1 .36-.222h6.22c.132 0 .256.065.332.174a.422.422 0 0 1 .055.374l-1.204 3.598h3.1c.164 0 .31.099.375.251a.422.422 0 0 1-.08.45zM3.085 20.723a8.107 8.107 0 0 0 1.72.72l.233-.794a7.32 7.32 0 0 1-1.546-.645zm1.72-5.984l.233-.795a7.262 7.262 0 0 1-1.546-.646l-.407.72a8.051 8.051 0 0 0 1.72.72zm-1.72-7.427l.407-.719c.418.244.939.462 1.546.646l-.232.794a8.046 8.046 0 0 1-1.72-.72Z"},child:[]}]})(e)}function dj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M1.5 0h21l-1.91 21.563L11.977 24l-8.565-2.438L1.5 0zm17.09 4.413L5.41 4.41l.213 2.622 10.125.002-.255 2.716h-6.64l.24 2.573h6.182l-.366 3.523-2.91.804-2.956-.81-.188-2.11h-2.61l.29 3.855L12 19.288l5.373-1.53L18.59 4.414z"},child:[]}]})(e)}function uj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M11.146 0h3.924v18.166c-2.013.382-3.491.535-5.096.535-4.791 0-7.288-2.166-7.288-6.32 0-4.002 2.65-6.6 6.753-6.6.637 0 1.121.05 1.707.203zm0 9.143a3.894 3.894 0 00-1.325-.204c-1.988 0-3.134 1.223-3.134 3.365 0 2.09 1.096 3.236 3.109 3.236.433 0 .79-.025 1.35-.102V9.142zM21.314 6.06v9.098c0 3.134-.229 4.638-.917 5.937-.637 1.249-1.478 2.039-3.211 2.905l-3.644-1.733c1.733-.815 2.574-1.53 3.109-2.625.561-1.121.739-2.421.739-5.835V6.059h3.924zM17.39.021h3.924v4.026H17.39z"},child:[]}]})(e)}function pj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M13.983 11.078h2.119a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.119a.185.185 0 00-.185.185v1.888c0 .102.083.185.185.185m-2.954-5.43h2.118a.186.186 0 00.186-.186V3.574a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m0 2.716h2.118a.187.187 0 00.186-.186V6.29a.186.186 0 00-.186-.185h-2.118a.185.185 0 00-.185.185v1.887c0 .102.082.185.185.186m-2.93 0h2.12a.186.186 0 00.184-.186V6.29a.185.185 0 00-.185-.185H8.1a.185.185 0 00-.185.185v1.887c0 .102.083.185.185.186m-2.964 0h2.119a.186.186 0 00.185-.186V6.29a.185.185 0 00-.185-.185H5.136a.186.186 0 00-.186.185v1.887c0 .102.084.185.186.186m5.893 2.715h2.118a.186.186 0 00.186-.185V9.006a.186.186 0 00-.186-.186h-2.118a.185.185 0 00-.185.185v1.888c0 .102.082.185.185.185m-2.93 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.083.185.185.185m-2.964 0h2.119a.185.185 0 00.185-.185V9.006a.185.185 0 00-.184-.186h-2.12a.186.186 0 00-.186.186v1.887c0 .102.084.185.186.185m-2.92 0h2.12a.185.185 0 00.184-.185V9.006a.185.185 0 00-.184-.186h-2.12a.185.185 0 00-.184.185v1.888c0 .102.082.185.185.185M23.763 9.89c-.065-.051-.672-.51-1.954-.51-.338.001-.676.03-1.01.087-.248-1.7-1.653-2.53-1.716-2.566l-.344-.199-.226.327c-.284.438-.49.922-.612 1.43-.23.97-.09 1.882.403 2.661-.595.332-1.55.413-1.744.42H.751a.751.751 0 00-.75.748 11.376 11.376 0 00.692 4.062c.545 1.428 1.355 2.48 2.41 3.124 1.18.723 3.1 1.137 5.275 1.137.983.003 1.963-.086 2.93-.266a12.248 12.248 0 003.823-1.389c.98-.567 1.86-1.288 2.61-2.136 1.252-1.418 1.998-2.997 2.553-4.4h.221c1.372 0 2.215-.549 2.68-1.009.309-.293.55-.65.707-1.046l.098-.288Z"},child:[]}]})(e)}function fj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M7.257 9.132L11.816 6.5a.369.369 0 0 1 .368 0l4.559 2.632a.369.369 0 0 1 .184.32v5.263a.37.37 0 0 1-.184.319l-4.559 2.632a.369.369 0 0 1-.368 0l-4.559-2.632a.369.369 0 0 1-.184-.32V9.452a.37.37 0 0 1 .184-.32M23.852 11.53l-5.446-9.475c-.198-.343-.564-.596-.96-.596H6.555c-.396 0-.762.253-.96.596L.149 11.509a1.127 1.127 0 0 0 0 1.117l5.447 9.398c.197.342.563.517.959.517h10.893c.395 0 .76-.17.959-.512l5.446-9.413a1.069 1.069 0 0 0 0-1.086m-4.51 4.556a.4.4 0 0 1-.204.338L12.2 20.426a.395.395 0 0 1-.392 0l-6.943-4.002a.4.4 0 0 1-.205-.338V8.08c0-.14.083-.269.204-.338L11.8 3.74c.12-.07.272-.07.392 0l6.943 4.003a.4.4 0 0 1 .206.338z"},child:[]}]})(e)}function hj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M24 18.588a1.529 1.529 0 01-1.895-.72l-3.45-4.771-.5-.667-4.003 5.444a1.466 1.466 0 01-1.802.708l5.158-6.92-4.798-6.251a1.595 1.595 0 011.9.666l3.576 4.83 3.596-4.81a1.435 1.435 0 011.788-.668L21.708 7.9l-2.522 3.283a.666.666 0 000 .994l4.804 6.412zM.002 11.576l.42-2.075c1.154-4.103 5.858-5.81 9.094-3.27 1.895 1.489 2.368 3.597 2.275 5.973H1.116C.943 16.447 4.005 19.009 7.92 17.7a4.078 4.078 0 002.582-2.876c.207-.666.548-.78 1.174-.588a5.417 5.417 0 01-2.589 3.957 6.272 6.272 0 01-7.306-.933 6.575 6.575 0 01-1.64-3.858c0-.235-.08-.455-.134-.666A88.33 88.33 0 010 11.577zm1.127-.286h9.654c-.06-3.076-2.001-5.258-4.59-5.278-2.882-.04-4.944 2.094-5.071 5.264z"},child:[]}]})(e)}function mj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M19.455 8.369c-.538-.748-1.778-2.285-3.681-4.569-.826-.991-1.535-1.832-1.884-2.245a146 146 0 0 0-.488-.576l-.207-.245-.113-.133-.022-.032-.01-.005L12.57 0l-.609.488c-1.555 1.246-2.828 2.851-3.681 4.64-.523 1.064-.864 2.105-1.043 3.176-.047.241-.088.489-.121.738-.209-.017-.421-.028-.632-.033-.018-.001-.035-.002-.059-.003a7.46 7.46 0 0 0-2.28.274l-.317.089-.163.286c-.765 1.342-1.198 2.869-1.252 4.416-.07 2.01.477 3.954 1.583 5.625 1.082 1.633 2.61 2.882 4.42 3.611l.236.095.071.025.003-.001a9.59 9.59 0 0 0 2.941.568q.171.006.342.006c1.273 0 2.513-.249 3.69-.742l.008.004.313-.145a9.63 9.63 0 0 0 3.927-3.335c1.01-1.49 1.577-3.234 1.641-5.042.075-2.161-.643-4.304-2.133-6.371m-7.083 6.695c.328 1.244.264 2.44-.191 3.558-1.135-1.12-1.967-2.352-2.475-3.665-.543-1.404-.87-2.74-.974-3.975.48.157.922.366 1.315.622 1.132.737 1.914 1.902 2.325 3.461zm.207 6.022c.482.368.99.712 1.513 1.028-.771.21-1.565.302-2.369.273a8 8 0 0 1-.373-.022c.458-.394.869-.823 1.228-1.279zm1.347-6.431c-.516-1.957-1.527-3.437-3.002-4.398-.647-.421-1.385-.741-2.194-.95.011-.134.026-.268.043-.4.014-.113.03-.216.046-.313.133-.689.332-1.37.589-2.025.099-.25.206-.499.321-.74l.004-.008c.177-.358.376-.719.61-1.105l.092-.152-.003-.001c.544-.851 1.197-1.627 1.942-2.311l.288.341c.672.796 1.304 1.548 1.878 2.237 1.291 1.549 2.966 3.583 3.612 4.48 1.277 1.771 1.893 3.579 1.83 5.375-.049 1.395-.461 2.755-1.195 3.933-.694 1.116-1.661 2.05-2.8 2.708-.636-.318-1.559-.839-2.539-1.599.79-1.575.952-3.28.479-5.072zm-2.575 5.397c-.725.939-1.587 1.55-2.09 1.856-.081-.029-.163-.06-.243-.093l-.065-.026c-1.49-.616-2.747-1.656-3.635-3.01-.907-1.384-1.356-2.993-1.298-4.653.041-1.19.338-2.327.882-3.379.316-.07.638-.114.96-.131l.084-.002c.162-.003.324-.003.478 0 .227.011.454.035.677.07.073 1.513.445 3.145 1.105 4.852.637 1.644 1.694 3.162 3.144 4.515z"},child:[]}]})(e)}function gj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M23.546 10.93L13.067.452c-.604-.603-1.582-.603-2.188 0L8.708 2.627l2.76 2.76c.645-.215 1.379-.07 1.889.441.516.515.658 1.258.438 1.9l2.658 2.66c.645-.223 1.387-.078 1.9.435.721.72.721 1.884 0 2.604-.719.719-1.881.719-2.6 0-.539-.541-.674-1.337-.404-1.996L12.86 8.955v6.525c.176.086.342.203.488.348.713.721.713 1.883 0 2.6-.719.721-1.889.721-2.609 0-.719-.719-.719-1.879 0-2.598.182-.18.387-.316.605-.406V8.835c-.217-.091-.424-.222-.6-.401-.545-.545-.676-1.342-.396-2.009L7.636 3.7.45 10.881c-.6.605-.6 1.584 0 2.189l10.48 10.477c.604.604 1.582.604 2.186 0l10.43-10.43c.605-.603.605-1.582 0-2.187"},child:[]}]})(e)}function xj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M12.002 0a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm8.54 4.931a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm0 9.862a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm-8.54 4.931a2.138 2.138 0 1 0 0 4.276 2.138 2.138 0 1 0 0-4.276zm-8.542-4.93a2.138 2.138 0 1 0 0 4.276 2.138 2.138 0 1 0 0-4.277zm0-9.863a2.138 2.138 0 1 0 0 4.277 2.138 2.138 0 1 0 0-4.277zm8.542-3.378L2.953 6.777v10.448l9.049 5.224 9.047-5.224V6.777zm0 1.601 7.66 13.27H4.34zm-1.387.371L3.97 15.037V7.363zm2.774 0 6.646 3.838v7.674zM5.355 17.44h13.293l-6.646 3.836z"},child:[]}]})(e)}function vj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z"},child:[]}]})(e)}function bj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"},child:[]}]})(e)}function yj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M22.251 11.82a3.117 3.117 0 0 0-2.328-3.01L22.911 0H8.104L11.1 8.838a3.116 3.116 0 0 0-2.244 2.988c0 1.043.52 1.967 1.313 2.536a8.279 8.279 0 0 1-1.084 1.244 8.14 8.14 0 0 1-2.55 1.647c-.834-.563-1.195-1.556-.869-2.446a3.11 3.11 0 0 0-.91-6.08 3.117 3.117 0 0 0-3.113 3.113c0 .848.347 1.626.903 2.182-.048.097-.097.195-.146.299-.465.959-.993 2.043-1.195 3.259-.403 2.432.257 4.384 1.849 5.489A5.093 5.093 0 0 0 5.999 24c1.827 0 3.682-.917 5.475-1.807 1.279-.632 2.599-1.292 3.898-1.612.48-.118.98-.187 1.508-.264 1.07-.153 2.175-.312 3.168-.89a4.482 4.482 0 0 0 2.182-3.091c.174-.994 0-1.994-.444-2.87.298-.48.465-1.042.465-1.647zm-1.355 0c0 .965-.785 1.75-1.75 1.75a1.753 1.753 0 0 1-1.085-3.126l.007-.007c.056-.042.118-.084.18-.125 0 0 .008 0 .008-.007.028-.014.055-.035.083-.05.007 0 .014-.006.021-.006.028-.014.063-.028.097-.042.035-.014.07-.027.098-.041.007 0 .013-.007.02-.007.028-.007.056-.021.084-.028.007 0 .02-.007.028-.007.034-.007.062-.014.097-.02h.007l.104-.022c.007 0 .02 0 .028-.007.028 0 .055-.007.083-.007h.035c.035 0 .07-.007.111-.007h.09c.028 0 .05 0 .077.007h.014c.055.007.111.014.167.028a1.766 1.766 0 0 1 1.396 1.723zM10.043 1.39h10.93l-2.509 7.4c-.104.02-.208.055-.312.09l-2.64-5.385-2.648 5.35c-.104-.034-.216-.055-.327-.076l-2.494-7.38zm4.968 9.825a3.083 3.083 0 0 0-.938-1.668l1.438-2.904 1.452 2.967c-.43.43-.743.98-.868 1.605H15.01zm-3.481-1.098c.034-.007.062-.014.097-.02h.02c.029-.008.056-.008.084-.015h.028c.028 0 .049-.007.076-.007h.271c.028 0 .049.007.07.007.014 0 .02 0 .035.007.027.007.048.007.076.014.007 0 .014 0 .028.007l.097.02h.007c.028.008.056.015.083.029.007 0 .014.007.028.007.021.007.049.014.07.027.007 0 .014.007.02.007.028.014.056.021.084.035h.007a.374.374 0 0 1 .09.049h.007c.028.014.056.034.084.048.007 0 .007.007.013.007.028.014.05.035.077.049l.007.007c.083.062.16.132.236.201l.007.007a1.747 1.747 0 0 1 .48 1.209 1.752 1.752 0 0 1-3.502 0 1.742 1.742 0 0 1 1.32-1.695zm-6.838-.049c.966 0 1.751.786 1.751 1.751s-.785 1.751-1.75 1.751-1.752-.785-1.752-1.75.786-1.752 1.751-1.752zm16.163 6.025a3.07 3.07 0 0 1-1.508 2.133c-.758.438-1.689.577-2.669.716a17.29 17.29 0 0 0-1.64.291c-1.445.355-2.834 1.05-4.182 1.717-1.724.854-3.35 1.66-4.857 1.66a3.645 3.645 0 0 1-2.154-.688c-1.529-1.056-1.453-3.036-1.272-4.12.167-1.015.632-1.966 1.077-2.877.028-.055.049-.104.077-.16.152.056.312.098.479.126-.264 1.473.486 2.994 1.946 3.745l.264.139.284-.104c1.216-.431 2.342-1.133 3.336-2.071a9.334 9.334 0 0 0 1.445-1.716c.16.027.32.034.48.034a3.117 3.117 0 0 0 3.008-2.327h1.167a3.109 3.109 0 0 0 3.01 2.327c.576 0 1.11-.16 1.57-.43.18.52.236 1.063.139 1.605z"},child:[]}]})(e)}function wj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M10.204 14.35l.007.01-.999 2.413a5.171 5.171 0 0 1-2.075-2.597l2.578-.437.004.005a.44.44 0 0 1 .484.606zm-.833-2.129a.44.44 0 0 0 .173-.756l.002-.011L7.585 9.7a5.143 5.143 0 0 0-.73 3.255l2.514-.725.002-.009zm1.145-1.98a.44.44 0 0 0 .699-.337l.01-.005.15-2.62a5.144 5.144 0 0 0-3.01 1.442l2.147 1.523.004-.002zm.76 2.75l.723.349.722-.347.18-.78-.5-.623h-.804l-.5.623.179.779zm1.5-3.095a.44.44 0 0 0 .7.336l.008.003 2.134-1.513a5.188 5.188 0 0 0-2.992-1.442l.148 2.615.002.001zm10.876 5.97l-5.773 7.181a1.6 1.6 0 0 1-1.248.594l-9.261.003a1.6 1.6 0 0 1-1.247-.596l-5.776-7.18a1.583 1.583 0 0 1-.307-1.34L2.1 5.573c.108-.47.425-.864.863-1.073L11.305.513a1.606 1.606 0 0 1 1.385 0l8.345 3.985c.438.209.755.604.863 1.073l2.062 8.955c.108.47-.005.963-.308 1.34zm-3.289-2.057c-.042-.01-.103-.026-.145-.034-.174-.033-.315-.025-.479-.038-.35-.037-.638-.067-.895-.148-.105-.04-.18-.165-.216-.216l-.201-.059a6.45 6.45 0 0 0-.105-2.332 6.465 6.465 0 0 0-.936-2.163c.052-.047.15-.133.177-.159.008-.09.001-.183.094-.282.197-.185.444-.338.743-.522.142-.084.273-.137.415-.242.032-.024.076-.062.11-.089.24-.191.295-.52.123-.736-.172-.216-.506-.236-.745-.045-.034.027-.08.062-.111.088-.134.116-.217.23-.33.35-.246.25-.45.458-.673.609-.097.056-.239.037-.303.033l-.19.135a6.545 6.545 0 0 0-4.146-2.003l-.012-.223c-.065-.062-.143-.115-.163-.25-.022-.268.015-.557.057-.905.023-.163.061-.298.068-.475.001-.04-.001-.099-.001-.142 0-.306-.224-.555-.5-.555-.275 0-.499.249-.499.555l.001.014c0 .041-.002.092 0 .128.006.177.044.312.067.475.042.348.078.637.056.906a.545.545 0 0 1-.162.258l-.012.211a6.424 6.424 0 0 0-4.166 2.003 8.373 8.373 0 0 1-.18-.128c-.09.012-.18.04-.297-.029-.223-.15-.427-.358-.673-.608-.113-.12-.195-.234-.329-.349-.03-.026-.077-.062-.111-.088a.594.594 0 0 0-.348-.132.481.481 0 0 0-.398.176c-.172.216-.117.546.123.737l.007.005.104.083c.142.105.272.159.414.242.299.185.546.338.743.522.076.082.09.226.1.288l.16.143a6.462 6.462 0 0 0-1.02 4.506l-.208.06c-.055.072-.133.184-.215.217-.257.081-.546.11-.895.147-.164.014-.305.006-.48.039-.037.007-.09.02-.133.03l-.004.002-.007.002c-.295.071-.484.342-.423.608.061.267.349.429.645.365l.007-.001.01-.003.129-.029c.17-.046.294-.113.448-.172.33-.118.604-.217.87-.256.112-.009.23.069.288.101l.217-.037a6.5 6.5 0 0 0 2.88 3.596l-.09.218c.033.084.069.199.044.282-.097.252-.263.517-.452.813-.091.136-.185.242-.268.399-.02.037-.045.095-.064.134-.128.275-.034.591.213.71.248.12.556-.007.69-.282v-.002c.02-.039.046-.09.062-.127.07-.162.094-.301.144-.458.132-.332.205-.68.387-.897.05-.06.13-.082.215-.105l.113-.205a6.453 6.453 0 0 0 4.609.012l.106.192c.086.028.18.042.256.155.136.232.229.507.342.84.05.156.074.295.145.457.016.037.043.09.062.129.133.276.442.402.69.282.247-.118.341-.435.213-.71-.02-.039-.045-.096-.065-.134-.083-.156-.177-.261-.268-.398-.19-.296-.346-.541-.443-.793-.04-.13.007-.21.038-.294-.018-.022-.059-.144-.083-.202a6.499 6.499 0 0 0 2.88-3.622c.064.01.176.03.213.038.075-.05.144-.114.28-.104.266.039.54.138.87.256.154.06.277.128.448.173.036.01.088.019.13.028l.009.003.007.001c.297.064.584-.098.645-.365.06-.266-.128-.537-.423-.608zM16.4 9.701l-1.95 1.746v.005a.44.44 0 0 0 .173.757l.003.01 2.526.728a5.199 5.199 0 0 0-.108-1.674A5.208 5.208 0 0 0 16.4 9.7zm-4.013 5.325a.437.437 0 0 0-.404-.232.44.44 0 0 0-.372.233h-.002l-1.268 2.292a5.164 5.164 0 0 0 3.326.003l-1.27-2.296h-.01zm1.888-1.293a.44.44 0 0 0-.27.036.44.44 0 0 0-.214.572l-.003.004 1.01 2.438a5.15 5.15 0 0 0 2.081-2.615l-2.6-.44-.004.005z"},child:[]}]})(e)}function jj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M17.193 9.555c-1.264-5.58-4.252-7.414-4.573-8.115-.28-.394-.53-.954-.735-1.44-.036.495-.055.685-.523 1.184-.723.566-4.438 3.682-4.74 10.02-.282 5.912 4.27 9.435 4.888 9.884l.07.05A73.49 73.49 0 0111.91 24h.481c.114-1.032.284-2.056.51-3.07.417-.296.604-.463.85-.693a11.342 11.342 0 003.639-8.464c.01-.814-.103-1.662-.197-2.218zm-5.336 8.195s0-8.291.275-8.29c.213 0 .49 10.695.49 10.695-.381-.045-.765-1.76-.765-2.405z"},child:[]}]})(e)}function kj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M18.665 21.978C16.758 23.255 14.465 24 12 24 5.377 24 0 18.623 0 12S5.377 0 12 0s12 5.377 12 12c0 3.583-1.574 6.801-4.067 9.001L9.219 7.2H7.2v9.596h1.615V9.251l9.85 12.727Zm-3.332-8.533 1.6 2.061V7.2h-1.6v6.245Z"},child:[]}]})(e)}function Sj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M12 0L1.605 6v12L12 24l10.395-6V6L12 0zm6 16.59c0 .705-.646 1.29-1.529 1.29-.631 0-1.351-.255-1.801-.81l-6-7.141v6.66c0 .721-.57 1.29-1.274 1.29H7.32c-.721 0-1.29-.6-1.29-1.29V7.41c0-.705.63-1.29 1.5-1.29.646 0 1.38.255 1.83.81l5.97 7.141V7.41c0-.721.6-1.29 1.29-1.29h.075c.72 0 1.29.6 1.29 1.29v9.18H18z"},child:[]}]})(e)}function Nj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M11.998,24c-0.321,0-0.641-0.084-0.922-0.247l-2.936-1.737c-0.438-0.245-0.224-0.332-0.08-0.383 c0.585-0.203,0.703-0.25,1.328-0.604c0.065-0.037,0.151-0.023,0.218,0.017l2.256,1.339c0.082,0.045,0.197,0.045,0.272,0l8.795-5.076 c0.082-0.047,0.134-0.141,0.134-0.238V6.921c0-0.099-0.053-0.192-0.137-0.242l-8.791-5.072c-0.081-0.047-0.189-0.047-0.271,0 L3.075,6.68C2.99,6.729,2.936,6.825,2.936,6.921v10.15c0,0.097,0.054,0.189,0.139,0.235l2.409,1.392 c1.307,0.654,2.108-0.116,2.108-0.89V7.787c0-0.142,0.114-0.253,0.256-0.253h1.115c0.139,0,0.255,0.112,0.255,0.253v10.021 c0,1.745-0.95,2.745-2.604,2.745c-0.508,0-0.909,0-2.026-0.551L2.28,18.675c-0.57-0.329-0.922-0.945-0.922-1.604V6.921 c0-0.659,0.353-1.275,0.922-1.603l8.795-5.082c0.557-0.315,1.296-0.315,1.848,0l8.794,5.082c0.57,0.329,0.924,0.944,0.924,1.603 v10.15c0,0.659-0.354,1.273-0.924,1.604l-8.794,5.078C12.643,23.916,12.324,24,11.998,24z M19.099,13.993 c0-1.9-1.284-2.406-3.987-2.763c-2.731-0.361-3.009-0.548-3.009-1.187c0-0.528,0.235-1.233,2.258-1.233 c1.807,0,2.473,0.389,2.747,1.607c0.024,0.115,0.129,0.199,0.247,0.199h1.141c0.071,0,0.138-0.031,0.186-0.081 c0.048-0.054,0.074-0.123,0.067-0.196c-0.177-2.098-1.571-3.076-4.388-3.076c-2.508,0-4.004,1.058-4.004,2.833 c0,1.925,1.488,2.457,3.895,2.695c2.88,0.282,3.103,0.703,3.103,1.269c0,0.983-0.789,1.402-2.642,1.402 c-2.327,0-2.839-0.584-3.011-1.742c-0.02-0.124-0.126-0.215-0.253-0.215h-1.137c-0.141,0-0.254,0.112-0.254,0.253 c0,1.482,0.806,3.248,4.655,3.248C17.501,17.007,19.099,15.91,19.099,13.993z"},child:[]}]})(e)}function Cj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M23.5594 14.7228a.5269.5269 0 0 0-.0563-.1191c-.139-.2632-.4768-.3418-1.0074-.2321-1.6533.3411-2.2935.1312-2.5256-.0191 1.342-2.0482 2.445-4.522 3.0411-6.8297.2714-1.0507.7982-3.5237.1222-4.7316a1.5641 1.5641 0 0 0-.1509-.235C21.6931.9086 19.8007.0248 17.5099.0005c-1.4947-.0158-2.7705.3461-3.1161.4794a9.449 9.449 0 0 0-.5159-.0816 8.044 8.044 0 0 0-1.3114-.1278c-1.1822-.0184-2.2038.2642-3.0498.8406-.8573-.3211-4.7888-1.645-7.2219.0788C.9359 2.1526.3086 3.8733.4302 6.3043c.0409.818.5069 3.334 1.2423 5.7436.4598 1.5065.9387 2.7019 1.4334 3.582.553.9942 1.1259 1.5933 1.7143 1.7895.4474.1491 1.1327.1441 1.8581-.7279.8012-.9635 1.5903-1.8258 1.9446-2.2069.4351.2355.9064.3625 1.39.3772a.0569.0569 0 0 0 .0004.0041 11.0312 11.0312 0 0 0-.2472.3054c-.3389.4302-.4094.5197-1.5002.7443-.3102.064-1.1344.2339-1.1464.8115-.0025.1224.0329.2309.0919.3268.2269.4231.9216.6097 1.015.6331 1.3345.3335 2.5044.092 3.3714-.6787-.017 2.231.0775 4.4174.3454 5.0874.2212.5529.7618 1.9045 2.4692 1.9043.2505 0 .5263-.0291.8296-.0941 1.7819-.3821 2.5557-1.1696 2.855-2.9059.1503-.8707.4016-2.8753.5388-4.1012.0169-.0703.0357-.1207.057-.1362.0007-.0005.0697-.0471.4272.0307a.3673.3673 0 0 0 .0443.0068l.2539.0223.0149.001c.8468.0384 1.9114-.1426 2.5312-.4308.6438-.2988 1.8057-1.0323 1.5951-1.6698zM2.371 11.8765c-.7435-2.4358-1.1779-4.8851-1.2123-5.5719-.1086-2.1714.4171-3.6829 1.5623-4.4927 1.8367-1.2986 4.8398-.5408 6.108-.13-.0032.0032-.0066.0061-.0098.0094-2.0238 2.044-1.9758 5.536-1.9708 5.7495-.0002.0823.0066.1989.0162.3593.0348.5873.0996 1.6804-.0735 2.9184-.1609 1.1504.1937 2.2764.9728 3.0892.0806.0841.1648.1631.2518.2374-.3468.3714-1.1004 1.1926-1.9025 2.1576-.5677.6825-.9597.5517-1.0886.5087-.3919-.1307-.813-.5871-1.2381-1.3223-.4796-.839-.9635-2.0317-1.4155-3.5126zm6.0072 5.0871c-.1711-.0428-.3271-.1132-.4322-.1772.0889-.0394.2374-.0902.4833-.1409 1.2833-.2641 1.4815-.4506 1.9143-1.0002.0992-.126.2116-.2687.3673-.4426a.3549.3549 0 0 0 .0737-.1298c.1708-.1513.2724-.1099.4369-.0417.156.0646.3078.26.3695.4752.0291.1016.0619.2945-.0452.4444-.9043 1.2658-2.2216 1.2494-3.1676 1.0128zm2.094-3.988-.0525.141c-.133.3566-.2567.6881-.3334 1.003-.6674-.0021-1.3168-.2872-1.8105-.8024-.6279-.6551-.9131-1.5664-.7825-2.5004.1828-1.3079.1153-2.4468.079-3.0586-.005-.0857-.0095-.1607-.0122-.2199.2957-.2621 1.6659-.9962 2.6429-.7724.4459.1022.7176.4057.8305.928.5846 2.7038.0774 3.8307-.3302 4.7363-.084.1866-.1633.3629-.2311.5454zm7.3637 4.5725c-.0169.1768-.0358.376-.0618.5959l-.146.4383a.3547.3547 0 0 0-.0182.1077c-.0059.4747-.054.6489-.115.8693-.0634.2292-.1353.4891-.1794 1.0575-.11 1.4143-.8782 2.2267-2.4172 2.5565-1.5155.3251-1.7843-.4968-2.0212-1.2217a6.5824 6.5824 0 0 0-.0769-.2266c-.2154-.5858-.1911-1.4119-.1574-2.5551.0165-.5612-.0249-1.9013-.3302-2.6462.0044-.2932.0106-.5909.019-.8918a.3529.3529 0 0 0-.0153-.1126 1.4927 1.4927 0 0 0-.0439-.208c-.1226-.4283-.4213-.7866-.7797-.9351-.1424-.059-.4038-.1672-.7178-.0869.067-.276.1831-.5875.309-.9249l.0529-.142c.0595-.16.134-.3257.213-.5012.4265-.9476 1.0106-2.2453.3766-5.1772-.2374-1.0981-1.0304-1.6343-2.2324-1.5098-.7207.0746-1.3799.3654-1.7088.5321a5.6716 5.6716 0 0 0-.1958.1041c.0918-1.1064.4386-3.1741 1.7357-4.4823a4.0306 4.0306 0 0 1 .3033-.276.3532.3532 0 0 0 .1447-.0644c.7524-.5706 1.6945-.8506 2.802-.8325.4091.0067.8017.0339 1.1742.081 1.939.3544 3.2439 1.4468 4.0359 2.3827.8143.9623 1.2552 1.9315 1.4312 2.4543-1.3232-.1346-2.2234.1268-2.6797.779-.9926 1.4189.543 4.1729 1.2811 5.4964.1353.2426.2522.4522.2889.5413.2403.5825.5515.9713.7787 1.2552.0696.087.1372.1714.1885.245-.4008.1155-1.1208.3825-1.0552 1.717-.0123.1563-.0423.4469-.0834.8148-.0461.2077-.0702.4603-.0994.7662zm.8905-1.6211c-.0405-.8316.2691-.9185.5967-1.0105a2.8566 2.8566 0 0 0 .135-.0406 1.202 1.202 0 0 0 .1342.103c.5703.3765 1.5823.4213 3.0068.1344-.2016.1769-.5189.3994-.9533.6011-.4098.1903-1.0957.333-1.7473.3636-.7197.0336-1.0859-.0807-1.1721-.151zm.5695-9.2712c-.0059.3508-.0542.6692-.1054 1.0017-.055.3576-.112.7274-.1264 1.1762-.0142.4368.0404.8909.0932 1.3301.1066.887.216 1.8003-.2075 2.7014a3.5272 3.5272 0 0 1-.1876-.3856c-.0527-.1276-.1669-.3326-.3251-.6162-.6156-1.1041-2.0574-3.6896-1.3193-4.7446.3795-.5427 1.3408-.5661 2.1781-.463zm.2284 7.0137a12.3762 12.3762 0 0 0-.0853-.1074l-.0355-.0444c.7262-1.1995.5842-2.3862.4578-3.4385-.0519-.4318-.1009-.8396-.0885-1.2226.0129-.4061.0666-.7543.1185-1.0911.0639-.415.1288-.8443.1109-1.3505.0134-.0531.0188-.1158.0118-.1902-.0457-.4855-.5999-1.938-1.7294-3.253-.6076-.7073-1.4896-1.4972-2.6889-2.0395.5251-.1066 1.2328-.2035 2.0244-.1859 2.0515.0456 3.6746.8135 4.8242 2.2824a.908.908 0 0 1 .0667.1002c.7231 1.3556-.2762 6.2751-2.9867 10.5405zm-8.8166-6.1162c-.025.1794-.3089.4225-.6211.4225a.5821.5821 0 0 1-.0809-.0056c-.1873-.026-.3765-.144-.5059-.3156-.0458-.0605-.1203-.178-.1055-.2844.0055-.0401.0261-.0985.0925-.1488.1182-.0894.3518-.1226.6096-.0867.3163.0441.6426.1938.6113.4186zm7.9305-.4114c.0111.0792-.049.201-.1531.3102-.0683.0717-.212.1961-.4079.2232a.5456.5456 0 0 1-.075.0052c-.2935 0-.5414-.2344-.5607-.3717-.024-.1765.2641-.3106.5611-.352.297-.0414.6111.0088.6356.1851z"},child:[]}]})(e)}function Tj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M8.571 23.429A.571.571 0 0 1 8 24H2.286a.571.571 0 0 1 0-1.143H8c.316 0 .571.256.571.572zM8 20.57H6.857a.571.571 0 0 0 0 1.143H8a.571.571 0 0 0 0-1.143zm-5.714 1.143H4.57a.571.571 0 0 0 0-1.143H2.286a.571.571 0 0 0 0 1.143zM8 18.286H2.286a.571.571 0 0 0 0 1.143H8a.571.571 0 0 0 0-1.143zM16 16H5.714a.571.571 0 0 0 0 1.143H16A.571.571 0 0 0 16 16zM2.286 17.143h1.143a.571.571 0 0 0 0-1.143H2.286a.571.571 0 0 0 0 1.143zm17.143-3.429H16a.571.571 0 0 0 0 1.143h3.429a.571.571 0 0 0 0-1.143zM9.143 14.857h4.571a.571.571 0 0 0 0-1.143H9.143a.571.571 0 0 0 0 1.143zm-6.857 0h4.571a.571.571 0 0 0 0-1.143H2.286a.571.571 0 0 0 0 1.143zM20.57 11.43H11.43a.571.571 0 0 0 0 1.142h9.142a.571.571 0 0 0 0-1.142zM9.714 12a.571.571 0 0 0-.571-.571H5.714a.571.571 0 0 0 0 1.142h3.429A.571.571 0 0 0 9.714 12zm-7.428.571h1.143a.571.571 0 0 0 0-1.142H2.286a.571.571 0 0 0 0 1.142zm19.428-3.428H16a.571.571 0 0 0 0 1.143h5.714a.571.571 0 0 0 0-1.143zM2.286 10.286H8a.571.571 0 0 0 0-1.143H2.286a.571.571 0 0 0 0 1.143zm13.143-2.857c0 .315.255.571.571.571h5.714a.571.571 0 0 0 0-1.143H16a.571.571 0 0 0-.571.572zm-8.572-.572a.571.571 0 0 0 0 1.143H8a.571.571 0 0 0 0-1.143H6.857zM2.286 8H4.57a.571.571 0 0 0 0-1.143H2.286a.571.571 0 0 0 0 1.143zm16.571-2.857c0 .315.256.571.572.571h1.142a.571.571 0 0 0 0-1.143H19.43a.571.571 0 0 0-.572.572zm-1.143 0a.571.571 0 0 0-.571-.572H12.57a.571.571 0 0 0 0 1.143h4.572a.571.571 0 0 0 .571-.571zm-15.428.571h8a.571.571 0 0 0 0-1.143h-8a.571.571 0 0 0 0 1.143zm5.143-2.857c0 .316.255.572.571.572h11.429a.571.571 0 0 0 0-1.143H8a.571.571 0 0 0-.571.571zm-5.143.572h3.428a.571.571 0 0 0 0-1.143H2.286a.571.571 0 0 0 0 1.143zm0-2.286H16A.571.571 0 0 0 16 0H2.286a.571.571 0 0 0 0 1.143z"},child:[]}]})(e)}function zj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M14.25.18l.9.2.73.26.59.3.45.32.34.34.25.34.16.33.1.3.04.26.02.2-.01.13V8.5l-.05.63-.13.55-.21.46-.26.38-.3.31-.33.25-.35.19-.35.14-.33.1-.3.07-.26.04-.21.02H8.77l-.69.05-.59.14-.5.22-.41.27-.33.32-.27.35-.2.36-.15.37-.1.35-.07.32-.04.27-.02.21v3.06H3.17l-.21-.03-.28-.07-.32-.12-.35-.18-.36-.26-.36-.36-.35-.46-.32-.59-.28-.73-.21-.88-.14-1.05-.05-1.23.06-1.22.16-1.04.24-.87.32-.71.36-.57.4-.44.42-.33.42-.24.4-.16.36-.1.32-.05.24-.01h.16l.06.01h8.16v-.83H6.18l-.01-2.75-.02-.37.05-.34.11-.31.17-.28.25-.26.31-.23.38-.2.44-.18.51-.15.58-.12.64-.1.71-.06.77-.04.84-.02 1.27.05zm-6.3 1.98l-.23.33-.08.41.08.41.23.34.33.22.41.09.41-.09.33-.22.23-.34.08-.41-.08-.41-.23-.33-.33-.22-.41-.09-.41.09zm13.09 3.95l.28.06.32.12.35.18.36.27.36.35.35.47.32.59.28.73.21.88.14 1.04.05 1.23-.06 1.23-.16 1.04-.24.86-.32.71-.36.57-.4.45-.42.33-.42.24-.4.16-.36.09-.32.05-.24.02-.16-.01h-8.22v.82h5.84l.01 2.76.02.36-.05.34-.11.31-.17.29-.25.25-.31.24-.38.2-.44.17-.51.15-.58.13-.64.09-.71.07-.77.04-.84.01-1.27-.04-1.07-.14-.9-.2-.73-.25-.59-.3-.45-.33-.34-.34-.25-.34-.16-.33-.1-.3-.04-.25-.02-.2.01-.13v-5.34l.05-.64.13-.54.21-.46.26-.38.3-.32.33-.24.35-.2.35-.14.33-.1.3-.06.26-.04.21-.02.13-.01h5.84l.69-.05.59-.14.5-.21.41-.28.33-.32.27-.35.2-.36.15-.36.1-.35.07-.32.04-.28.02-.21V6.07h2.09l.14.01zm-6.47 14.25l-.23.33-.08.41.08.41.23.33.33.23.41.08.41-.08.33-.23.23-.33.08-.41-.08-.41-.23-.33-.33-.23-.41-.08-.41.08z"},child:[]}]})(e)}function Ej(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M14.23 12.004a2.236 2.236 0 0 1-2.235 2.236 2.236 2.236 0 0 1-2.236-2.236 2.236 2.236 0 0 1 2.235-2.236 2.236 2.236 0 0 1 2.236 2.236zm2.648-10.69c-1.346 0-3.107.96-4.888 2.622-1.78-1.653-3.542-2.602-4.887-2.602-.41 0-.783.093-1.106.278-1.375.793-1.683 3.264-.973 6.365C1.98 8.917 0 10.42 0 12.004c0 1.59 1.99 3.097 5.043 4.03-.704 3.113-.39 5.588.988 6.38.32.187.69.275 1.102.275 1.345 0 3.107-.96 4.888-2.624 1.78 1.654 3.542 2.603 4.887 2.603.41 0 .783-.09 1.106-.275 1.374-.792 1.683-3.263.973-6.365C22.02 15.096 24 13.59 24 12.004c0-1.59-1.99-3.097-5.043-4.032.704-3.11.39-5.587-.988-6.38-.318-.184-.688-.277-1.092-.278zm-.005 1.09v.006c.225 0 .406.044.558.127.666.382.955 1.835.73 3.704-.054.46-.142.945-.25 1.44-.96-.236-2.006-.417-3.107-.534-.66-.905-1.345-1.727-2.035-2.447 1.592-1.48 3.087-2.292 4.105-2.295zm-9.77.02c1.012 0 2.514.808 4.11 2.28-.686.72-1.37 1.537-2.02 2.442-1.107.117-2.154.298-3.113.538-.112-.49-.195-.964-.254-1.42-.23-1.868.054-3.32.714-3.707.19-.09.4-.127.563-.132zm4.882 3.05c.455.468.91.992 1.36 1.564-.44-.02-.89-.034-1.345-.034-.46 0-.915.01-1.36.034.44-.572.895-1.096 1.345-1.565zM12 8.1c.74 0 1.477.034 2.202.093.406.582.802 1.203 1.183 1.86.372.64.71 1.29 1.018 1.946-.308.655-.646 1.31-1.013 1.95-.38.66-.773 1.288-1.18 1.87-.728.063-1.466.098-2.21.098-.74 0-1.477-.035-2.202-.093-.406-.582-.802-1.204-1.183-1.86-.372-.64-.71-1.29-1.018-1.946.303-.657.646-1.313 1.013-1.954.38-.66.773-1.286 1.18-1.868.728-.064 1.466-.098 2.21-.098zm-3.635.254c-.24.377-.48.763-.704 1.16-.225.39-.435.782-.635 1.174-.265-.656-.49-1.31-.676-1.947.64-.15 1.315-.283 2.015-.386zm7.26 0c.695.103 1.365.23 2.006.387-.18.632-.405 1.282-.66 1.933-.2-.39-.41-.783-.64-1.174-.225-.392-.465-.774-.705-1.146zm3.063.675c.484.15.944.317 1.375.498 1.732.74 2.852 1.708 2.852 2.476-.005.768-1.125 1.74-2.857 2.475-.42.18-.88.342-1.355.493-.28-.958-.646-1.956-1.1-2.98.45-1.017.81-2.01 1.085-2.964zm-13.395.004c.278.96.645 1.957 1.1 2.98-.45 1.017-.812 2.01-1.086 2.964-.484-.15-.944-.318-1.37-.5-1.732-.737-2.852-1.706-2.852-2.474 0-.768 1.12-1.742 2.852-2.476.42-.18.88-.342 1.356-.494zm11.678 4.28c.265.657.49 1.312.676 1.948-.64.157-1.316.29-2.016.39.24-.375.48-.762.705-1.158.225-.39.435-.788.636-1.18zm-9.945.02c.2.392.41.783.64 1.175.23.39.465.772.705 1.143-.695-.102-1.365-.23-2.006-.386.18-.63.406-1.282.66-1.933zM17.92 16.32c.112.493.2.968.254 1.423.23 1.868-.054 3.32-.714 3.708-.147.09-.338.128-.563.128-1.012 0-2.514-.807-4.11-2.28.686-.72 1.37-1.536 2.02-2.44 1.107-.118 2.154-.3 3.113-.54zm-11.83.01c.96.234 2.006.415 3.107.532.66.905 1.345 1.727 2.035 2.446-1.595 1.483-3.092 2.295-4.11 2.295-.22-.005-.406-.05-.553-.132-.666-.38-.955-1.834-.73-3.703.054-.46.142-.944.25-1.438zm4.56.64c.44.02.89.034 1.345.034.46 0 .915-.01 1.36-.034-.44.572-.895 1.095-1.345 1.565-.455-.47-.91-.993-1.36-1.565z"},child:[]}]})(e)}function Pj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M22.71 13.145c-1.66 2.092-3.452 4.483-7.038 4.483-3.203 0-4.397-2.825-4.48-5.12.701 1.484 2.073 2.685 4.214 2.63 4.117-.133 6.94-3.852 6.94-7.239 0-4.05-3.022-6.972-8.268-6.972-3.752 0-8.4 1.428-11.455 3.685C2.59 6.937 3.885 9.958 4.35 9.626c2.648-1.904 4.748-3.13 6.784-3.744C8.12 9.244.886 17.05 0 18.425c.1 1.261 1.66 4.648 2.424 4.648.232 0 .431-.133.664-.365a100.49 100.49 0 0 0 5.54-6.765c.222 3.104 1.748 6.898 6.014 6.898 3.819 0 7.604-2.756 9.33-8.965.2-.764-.73-1.361-1.261-.73zm-4.349-5.013c0 1.959-1.926 2.922-3.685 2.922-.941 0-1.664-.247-2.235-.568 1.051-1.592 2.092-3.225 3.21-4.973 1.972.334 2.71 1.43 2.71 2.619z"},child:[]}]})(e)}function Mj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M12 0c6.627 0 12 5.373 12 12s-5.373 12-12 12S0 18.627 0 12 5.373 0 12 0zM9.615 15.998c.175.645.156 1.248-.024 1.792l-.065.18c-.024.061-.052.12-.078.176-.14.29-.326.56-.555.81-.698.759-1.672 1.047-2.09.805-.45-.262-.226-1.335.584-2.19.871-.918 2.12-1.509 2.12-1.509v-.003l.108-.061zm9.911-10.861c-.542-2.133-4.077-2.834-7.422-1.645-1.989.707-4.144 1.818-5.693 3.267C4.568 8.48 4.275 9.98 4.396 10.607c.427 2.211 3.457 3.657 4.703 4.73v.006c-.367.18-3.056 1.529-3.686 2.925-.675 1.47.105 2.521.615 2.655 1.575.436 3.195-.36 4.065-1.649.84-1.261.766-2.881.404-3.676.496-.135 1.08-.195 1.83-.104 2.101.24 2.521 1.56 2.43 2.1-.09.539-.523.854-.674.944-.15.091-.195.12-.181.181.015.09.091.09.21.075.165-.03 1.096-.45 1.141-1.471.045-1.29-1.186-2.729-3.375-2.7-.9.016-1.471.091-1.875.256-.03-.045-.061-.075-.105-.105-1.35-1.455-3.855-2.475-3.75-4.41.03-.705.285-2.564 4.8-4.814 3.705-1.846 6.661-1.335 7.171-.21.733 1.604-1.576 4.59-5.431 5.024-1.47.165-2.235-.404-2.431-.615-.209-.225-.239-.24-.314-.194-.12.06-.045.255 0 .375.12.3.585.825 1.396 1.095.704.225 2.43.359 4.5-.45 2.324-.899 4.139-3.405 3.614-5.505l.073.067z"},child:[]}]})(e)}function Aj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M12.001,4.8c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 C13.666,10.618,15.027,12,18.001,12c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C16.337,6.182,14.976,4.8,12.001,4.8z M6.001,12c-3.2,0-5.2,1.6-6,4.8c1.2-1.6,2.6-2.2,4.2-1.8c0.913,0.228,1.565,0.89,2.288,1.624 c1.177,1.194,2.538,2.576,5.512,2.576c3.2,0,5.2-1.6,6-4.8c-1.2,1.6-2.6,2.2-4.2,1.8c-0.913-0.228-1.565-0.89-2.288-1.624 C10.337,13.382,8.976,12,6.001,12z"},child:[]}]})(e)}function Lj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M1.125 0C.502 0 0 .502 0 1.125v21.75C0 23.498.502 24 1.125 24h21.75c.623 0 1.125-.502 1.125-1.125V1.125C24 .502 23.498 0 22.875 0zm17.363 9.75c.612 0 1.154.037 1.627.111a6.38 6.38 0 0 1 1.306.34v2.458a3.95 3.95 0 0 0-.643-.361 5.093 5.093 0 0 0-.717-.26 5.453 5.453 0 0 0-1.426-.2c-.3 0-.573.028-.819.086a2.1 2.1 0 0 0-.623.242c-.17.104-.3.229-.393.374a.888.888 0 0 0-.14.49c0 .196.053.373.156.529.104.156.252.304.443.444s.423.276.696.41c.273.135.582.274.926.416.47.197.892.407 1.266.628.374.222.695.473.963.753.268.279.472.598.614.957.142.359.214.776.214 1.253 0 .657-.125 1.21-.373 1.656a3.033 3.033 0 0 1-1.012 1.085 4.38 4.38 0 0 1-1.487.596c-.566.12-1.163.18-1.79.18a9.916 9.916 0 0 1-1.84-.164 5.544 5.544 0 0 1-1.512-.493v-2.63a5.033 5.033 0 0 0 3.237 1.2c.333 0 .624-.03.872-.09.249-.06.456-.144.623-.25.166-.108.29-.234.373-.38a1.023 1.023 0 0 0-.074-1.089 2.12 2.12 0 0 0-.537-.5 5.597 5.597 0 0 0-.807-.444 27.72 27.72 0 0 0-1.007-.436c-.918-.383-1.602-.852-2.053-1.405-.45-.553-.676-1.222-.676-2.005 0-.614.123-1.141.369-1.582.246-.441.58-.804 1.004-1.089a4.494 4.494 0 0 1 1.47-.629 7.536 7.536 0 0 1 1.77-.201zm-15.113.188h9.563v2.166H9.506v9.646H6.789v-9.646H3.375z"},child:[]}]})(e)}function Dj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M24 22.525H0l12-21.05 12 21.05z"},child:[]}]})(e)}function Fj(e){return K({attr:{role:"img",viewBox:"0 0 24 24"},child:[{tag:"path",attr:{d:"M22.1987 18.498l-9.7699 5.5022v-4.2855l6.0872-3.3338 3.6826 2.117zm.6683-.6026V6.3884l-3.5752 2.0544v7.396zm-21.0657.6026l9.7699 5.5022v-4.2855L5.484 16.3809l-3.6826 2.117zm-.6683-.6026V6.3884l3.5751 2.0544v7.396zm.4183-12.2515l10.0199-5.644v4.1434L5.152 7.6586l-.0489.028zm20.8975 0l-10.02-5.644v4.1434l6.4192 3.5154.0489.028 3.5518-2.0427zm-10.8775 13.096l-6.0056-3.2873V8.9384l6.0054 3.4525v6.349zm.8575 0l6.0053-3.2873V8.9384l-6.0053 3.4525zM5.9724 8.1845l6.0287-3.3015L18.03 8.1845l-6.0288 3.4665z"},child:[]}]})(e)}const Rj=()=>{const[e,n]=j.useState(0),[s,a]=j.useState({x:0,y:0});j.useEffect(()=>{const g=v=>{a({x:v.clientX,y:v.clientY})};return window.addEventListener("mousemove",g),()=>window.removeEventListener("mousemove",g)},[]);const l=[{icon:i.jsx(nr,{}),title:"Custom Web Applications",description:"Tailored solutions built from scratch to match your unique business requirements and workflows.",features:["Scalable Architecture","Advanced Functionality","Custom Integrations","Admin Dashboards"],color:"#0063f4"},{icon:i.jsx(an,{}),title:"E-Commerce Solutions",description:"Powerful online stores that convert visitors into customers with seamless shopping experiences.",features:["Payment Gateway Integration","Inventory Management","Shopping Cart Optimization","Analytics Dashboard"],color:"#00ff88"},{icon:i.jsx(Rt,{}),title:"Progressive Web Apps",description:"Fast, reliable, and engaging web apps that work offline and feel like native applications.",features:["Offline Functionality","Push Notifications","App-Like Experience","Cross-Platform"],color:"#00bfff"},{icon:i.jsx($c,{}),title:"Landing Pages & Websites",description:"Stunning, conversion-focused pages designed to captivate your audience and drive results.",features:["Responsive Design","SEO Optimized","Fast Loading","Lead Generation"],color:"#ffd700"},{icon:i.jsx(Gn,{}),title:"API Development & Integration",description:"Robust APIs and seamless third-party integrations to extend your web application's capabilities.",features:["RESTful APIs","GraphQL","Third-Party Services","Microservices"],color:"#ff6b9d"},{icon:i.jsx(Zi,{}),title:"CMS Development",description:"Content management systems that empower your team to update and manage content effortlessly.",features:["Custom CMS","WordPress","Headless CMS","Content Workflows"],color:"#9d4edd"}],c=[{name:"Frontend",stack:[{name:"React",icon:i.jsx(Ej,{}),description:"Modern UI library for dynamic interfaces",color:"#61DAFB"},{name:"Next.js",icon:i.jsx(kj,{}),description:"Production-ready React framework",color:"#000000"},{name:"TypeScript",icon:i.jsx(Lj,{}),description:"Type-safe JavaScript development",color:"#3178C6"},{name:"JavaScript",icon:i.jsx(bj,{}),description:"Core web programming language",color:"#F7DF1E"},{name:"Tailwind CSS",icon:i.jsx(Aj,{}),description:"Utility-first CSS framework",color:"#06B6D4"},{name:"HTML5",icon:i.jsx(vj,{}),description:"Modern web markup language",color:"#E34F26"},{name:"CSS3",icon:i.jsx(dj,{}),description:"Advanced styling and animations",color:"#1572B6"},{name:"Sass",icon:i.jsx(Mj,{}),description:"Professional-grade CSS extension",color:"#CC6699"}]},{name:"Backend",stack:[{name:"Node.js",icon:i.jsx(Nj,{}),description:"JavaScript runtime for servers",color:"#339933"},{name:"Express.js",icon:i.jsx(hj,{}),description:"Minimal web framework for Node.js",color:"#000000"},{name:"Python",icon:i.jsx(zj,{}),description:"Versatile backend language",color:"#3776AB"},{name:"Django",icon:i.jsx(uj,{}),description:"High-level Python web framework",color:"#092E20"},{name:"PostgreSQL",icon:i.jsx(Cj,{}),description:"Powerful relational database",color:"#4169E1"},{name:"MongoDB",icon:i.jsx(jj,{}),description:"Flexible NoSQL database",color:"#47A248"},{name:"Redis",icon:i.jsx(Pj,{}),description:"In-memory data structure store",color:"#DC382D"},{name:"GraphQL",icon:i.jsx(xj,{}),description:"Query language for APIs",color:"#E10098"}]},{name:"Cloud & DevOps",stack:[{name:"AWS",icon:i.jsx(cj,{}),description:"Cloud infrastructure solutions",color:"#FF9900"},{name:"Docker",icon:i.jsx(pj,{}),description:"Containerization platform",color:"#2496ED"},{name:"Kubernetes",icon:i.jsx(wj,{}),description:"Container orchestration system",color:"#326CE5"},{name:"Vercel",icon:i.jsx(Dj,{}),description:"Instant deployment platform",color:"#000000"},{name:"Firebase",icon:i.jsx(mj,{}),description:"Google's development platform",color:"#FFCA28"},{name:"NGINX",icon:i.jsx(Sj,{}),description:"High-performance web server",color:"#009639"},{name:"Git",icon:i.jsx(gj,{}),description:"Version control system",color:"#F05032"},{name:"Webpack",icon:i.jsx(Fj,{}),description:"Module bundler for JavaScript",color:"#8DD6F9"}]},{name:"Tools & Testing",stack:[{name:"Jest",icon:i.jsx(yj,{}),description:"JavaScript testing framework",color:"#C21325"},{name:"ESLint",icon:i.jsx(fj,{}),description:"Code linting utility",color:"#4B32C3"},{name:"Prettier",icon:i.jsx(Tj,{}),description:"Code formatter",color:"#F7B93E"}]}],u=[{step:"01",title:"Discovery & Planning",description:"We analyze your requirements, define project scope, and create a detailed development roadmap.",icon:i.jsx(xn,{})},{step:"02",title:"Design & Prototyping",description:"Our designers craft intuitive interfaces and interactive prototypes for your approval.",icon:i.jsx($c,{})},{step:"03",title:"Development",description:"Our developers build your web application using cutting-edge technologies and best practices.",icon:i.jsx(wn,{})},{step:"04",title:"Testing & QA",description:"Rigorous testing ensures your application is bug-free, secure, and performs flawlessly.",icon:i.jsx(lt,{})},{step:"05",title:"Launch & Support",description:"We deploy your application and provide ongoing maintenance and support.",icon:i.jsx(_e,{})}],f=[{icon:i.jsx(tn,{}),title:"Responsive Design",description:"Perfect experience on every device, from mobile to desktop"},{icon:i.jsx(_e,{}),title:"Lightning Fast",description:"Optimized for speed with sub-second load times"},{icon:i.jsx(lt,{}),title:"Secure & Reliable",description:"Enterprise-grade security and 99.9% uptime guarantee"},{icon:i.jsx(Ke,{}),title:"SEO Optimized",description:"Built to rank high on search engines from day one"},{icon:i.jsx(Ja,{}),title:"Easy to Maintain",description:"Clean code and documentation for effortless updates"},{icon:i.jsx(Gt,{}),title:"Scalable Solutions",description:"Architecture that grows with your business needs"}],p=[{icon:i.jsx(wn,{}),value:"500+",label:"Projects Delivered"},{icon:i.jsx(yn,{}),value:"95%",label:"On-Time Delivery"},{icon:i.jsx(Gt,{}),value:"4.9/5",label:"Client Rating"},{icon:i.jsx(Ke,{}),value:"200%",label:"Avg. ROI Increase"}],m=[{icon:i.jsx(bi,{}),title:"Call Us",description:"Speak with our team directly",action:"Customer Service"},{icon:i.jsx(yv,{}),title:"WhatsApp",description:"Quick chat support",action:"Message Us"},{icon:i.jsx(en,{}),title:"Email",description:"Send us your requirements",action:"Email Us"},{icon:i.jsx(an,{}),title:"Social Media",description:"Connect on social platforms",action:"Follow Us"}];return i.jsxs("div",{className:"webdev-page",children:[i.jsxs("div",{className:"webdev-bg",children:[i.jsx("div",{className:"bg-orb orb-1",style:{transform:`translate(${s.x*.02}px, ${s.y*.02}px)`}}),i.jsx("div",{className:"bg-orb orb-2",style:{transform:`translate(${s.x*-.03}px, ${s.y*-.03}px)`}}),i.jsx("div",{className:"bg-orb orb-3",style:{transform:`translate(${s.x*.015}px, ${s.y*-.025}px)`}}),i.jsx("div",{className:"code-pattern"}),i.jsx("div",{className:"gradient-mesh"})]}),i.jsx("section",{className:"webdev-hero",children:i.jsxs("div",{className:"webdev-container",children:[i.jsxs("div",{className:"hero-content",children:[i.jsxs("div",{className:"hero-badge",children:[i.jsx(wn,{})," Web Development Services"]}),i.jsxs("h1",{className:"hero-title",children:["Build Powerful Web Applications",i.jsx("br",{}),i.jsx("span",{className:"gradient-text",children:"That Drive Results"})]}),i.jsx("p",{className:"hero-subtitle",children:"From stunning websites to complex web applications, we create digital experiences that engage users, boost conversions, and scale with your business."}),i.jsxs("div",{className:"hero-buttons",children:[i.jsxs("button",{className:"btn-primary",children:["Start Your Project ",i.jsx(De,{})]}),i.jsx("button",{className:"btn-secondary",children:"View Portfolio"})]}),i.jsx("div",{className:"hero-stats",children:p.map((g,v)=>i.jsxs("div",{className:"stat-item",children:[i.jsx("div",{className:"stat-icon",children:g.icon}),i.jsx("div",{className:"stat-value",children:g.value}),i.jsx("div",{className:"stat-label",children:g.label})]},v))})]}),i.jsx("div",{className:"hero-visual",children:i.jsxs("div",{className:"code-window",children:[i.jsxs("div",{className:"window-header",children:[i.jsxs("div",{className:"window-buttons",children:[i.jsx("span",{className:"btn-red"}),i.jsx("span",{className:"btn-yellow"}),i.jsx("span",{className:"btn-green"})]}),i.jsx("span",{className:"window-title",children:"app.jsx"})]}),i.jsx("div",{className:"code-content",children:i.jsx("pre",{children:i.jsx("code",{children:`import React from 'react';

const App = () => {
  return (
    <div className="app">
      <h1>Building Amazing
          Web Experiences</h1>
      <p>With Verapixels</p>
    </div>
  );
};

export default App;`})})})]})})]})}),i.jsx("section",{className:"services-section",children:i.jsxs("div",{className:"webdev-container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Our ",i.jsx("span",{className:"gradient-text",children:"Web Development"})," Services"]}),i.jsx("p",{className:"section-subtitle",children:"Comprehensive solutions tailored to your business needs"})]}),i.jsx("div",{className:"services-grid",children:l.map((g,v)=>i.jsxs("div",{className:"service-card",style:{animationDelay:`${v*.1}s`},children:[i.jsx("div",{className:"service-icon",style:{color:g.color},children:g.icon}),i.jsx("h3",{className:"service-title",children:g.title}),i.jsx("p",{className:"service-description",children:g.description}),i.jsx("ul",{className:"service-features",children:g.features.map((b,y)=>i.jsxs("li",{children:[i.jsx(it,{style:{color:g.color}}),i.jsx("span",{children:b})]},y))}),i.jsx("div",{className:"service-glow",style:{background:g.color}})]},v))})]})}),i.jsx("section",{className:"tech-section",children:i.jsxs("div",{className:"webdev-container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Cutting-Edge ",i.jsx("span",{className:"gradient-text",children:"Technologies"})]}),i.jsx("p",{className:"section-subtitle",children:"We use the best tools and frameworks to build exceptional web applications"})]}),i.jsx("div",{className:"tech-tabs",children:c.map((g,v)=>i.jsx("button",{className:`tech-tab ${e===v?"active":""}`,onClick:()=>n(v),children:g.name},v))}),i.jsx("div",{className:"tech-content",children:i.jsx("div",{className:"tech-grid",children:c[e].stack.map((g,v)=>i.jsxs("div",{className:"tech-card",style:{animationDelay:`${v*.1}s`},children:[i.jsx("div",{className:"tech-icon",style:{color:g.color},children:g.icon}),i.jsx("h4",{className:"tech-name",children:g.name}),i.jsx("p",{className:"tech-description",children:g.description}),i.jsx("div",{className:"tech-glow",style:{background:g.color}})]},v))})})]})}),i.jsx("section",{className:"process-section",children:i.jsxs("div",{className:"webdev-container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Our Development ",i.jsx("span",{className:"gradient-text",children:"Process"})]}),i.jsx("p",{className:"section-subtitle",children:"A proven approach that delivers exceptional results"})]}),i.jsx("div",{className:"process-grid",children:u.map((g,v)=>i.jsxs("div",{className:"process-card",style:{animationDelay:`${v*.1}s`},children:[i.jsx("div",{className:"process-number",children:g.step}),i.jsx("div",{className:"process-icon",children:g.icon}),i.jsx("h3",{className:"process-title",children:g.title}),i.jsx("p",{className:"process-description",children:g.description}),v<u.length-1&&i.jsx("div",{className:"process-arrow",children:i.jsx(De,{})})]},v))})]})}),i.jsx("section",{className:"benefits-section",children:i.jsxs("div",{className:"webdev-container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Why Choose ",i.jsx("span",{className:"gradient-text",children:"Verapixels"})]}),i.jsx("p",{className:"section-subtitle",children:"The advantages of working with our expert team"})]}),i.jsx("div",{className:"benefits-grid",children:f.map((g,v)=>i.jsxs("div",{className:"benefit-card",style:{animationDelay:`${v*.1}s`},children:[i.jsx("div",{className:"benefit-icon",children:g.icon}),i.jsx("h3",{className:"benefit-title",children:g.title}),i.jsx("p",{className:"benefit-description",children:g.description})]},v))})]})}),i.jsx("section",{className:"pricing-section",children:i.jsxs("div",{className:"webdev-container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Get a ",i.jsx("span",{className:"gradient-text",children:"Custom Quote"})]}),i.jsx("p",{className:"section-subtitle",children:"Every project is unique. Contact us for personalized pricing tailored to your specific needs"})]}),i.jsx("div",{className:"contact-grid",children:m.map((g,v)=>i.jsxs("div",{className:"contact-card",style:{animationDelay:`${v*.1}s`},children:[i.jsx("div",{className:"contact-icon",children:g.icon}),i.jsx("h3",{className:"contact-title",children:g.title}),i.jsx("p",{className:"contact-description",children:g.description}),i.jsxs("button",{className:"contact-button",children:[g.action," ",i.jsx(De,{})]})]},v))}),i.jsx("div",{className:"pricing-note",children:i.jsxs("div",{className:"note-content",children:[i.jsx(it,{className:"note-icon"}),i.jsx("p",{children:"Our team will work with you to understand your requirements and provide a detailed quote that fits your budget and timeline."})]})})]})}),i.jsx("section",{className:"cta-section",children:i.jsx("div",{className:"webdev-container",children:i.jsxs("div",{className:"cta-content",children:[i.jsx("h2",{className:"cta-title",children:"Ready to Build Something Amazing?"}),i.jsx("p",{className:"cta-text",children:"Let's turn your vision into a powerful web application that drives growth and delights users."}),i.jsxs("div",{className:"cta-buttons",children:[i.jsxs("button",{className:"btn-primary-large",children:["Schedule Free Consultation ",i.jsx(De,{})]}),i.jsx("button",{className:"btn-secondary-large",children:"Chat With Us"})]})]})})}),i.jsx(Ot,{}),i.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .webdev-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        .webdev-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.2;
          animation: floatOrb 15s ease-in-out infinite;
        }

        .orb-1 {
          width: 700px;
          height: 700px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          top: -15%;
          left: -10%;
        }

        .orb-2 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #00ff88, #ffd700);
          bottom: -10%;
          right: -10%;
          animation-delay: 7s;
        }

        .orb-3 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #ff6b9d, #9d4edd);
          top: 50%;
          left: 50%;
          animation-delay: 3.5s;
        }

        @keyframes floatOrb {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(60px, -60px) scale(1.15); }
          66% { transform: translate(-50px, 50px) scale(0.85); }
        }

        .code-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(0, 99, 244, 0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(0, 99, 244, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          animation: patternMove 40s linear infinite;
        }

        @keyframes patternMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }

        .gradient-mesh {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 20% 30%, rgba(0, 99, 244, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 70%, rgba(0, 255, 136, 0.08) 0%, transparent 50%),
            radial-gradient(ellipse at 50% 50%, rgba(255, 107, 157, 0.06) 0%, transparent 50%);
          animation: meshMove 20s ease-in-out infinite;
        }

        @keyframes meshMove {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }

        .webdev-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        .webdev-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 140px 0 80px;
        }

        .webdev-hero .webdev-container {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(0, 99, 244, 0.2);
          border: 1px solid rgba(0, 99, 244, 0.5);
          border-radius: 30px;
          color: #00bfff;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 30px;
          animation: fadeInDown 1s ease;
          backdrop-filter: blur(10px);
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-size: clamp(42px, 6vw, 68px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 30px;
          animation: fadeInUp 1s ease 0.2s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, #0063f4 0%, #00bfff 30%, #00ff88 60%, #ffd700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% auto;
          animation: gradientShift 5s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% center; }
          50% { background-position: 100% center; }
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 40px;
          animation: fadeInUp 1s ease 0.4s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-buttons {
          display: flex;
          gap: 20px;
          margin-bottom: 60px;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease 0.6s both;
        }

        .btn-primary, .btn-secondary {
          padding: 18px 38px;
          font-size: 1.05rem;
          font-weight: 700;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.4s ease;
          display: inline-flex;
          align-items: center;
          gap: 10px;
          color: #fff; /* Fixed: Ensure text color stays white */
        }

        .btn-primary {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          box-shadow: 0 10px 40px rgba(0, 99, 244, 0.5);
          position: relative;
          overflow: hidden;
        }

        .btn-primary::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00bfff, #00ff88);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .btn-primary:hover::before {
          opacity: 1;
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(0, 99, 244, 0.7);
          color: #fff; /* Fixed: Keep text white on hover */
        }

        .btn-primary svg, .btn-primary span {
          position: relative;
          z-index: 1;
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-3px);
          box-shadow: 0 10px 30px rgba(255, 255, 255, 0.1);
          color: #fff; /* Fixed: Keep text white on hover */
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 30px;
        }

        .stat-item {
          text-align: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .stat-item:hover {
          transform: translateY(-5px);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 99, 244, 0.4);
          box-shadow: 0 10px 30px rgba(0, 99, 244, 0.2);
        }

        .stat-icon {
          font-size: 32px;
          color: #00bfff;
          margin-bottom: 12px;
        }

        .stat-value {
          font-size: 2.2rem;
          font-weight: 900;
          background: linear-gradient(135deg, #0063f4, #00bfff, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        .hero-visual {
          animation: fadeInUp 1s ease 0.8s both;
        }

        .code-window {
          background: rgba(15, 15, 25, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.6);
          backdrop-filter: blur(20px);
          transition: all 0.4s ease;
        }

        .code-window:hover {
          transform: translateY(-10px);
          box-shadow: 0 40px 100px rgba(0, 99, 244, 0.3);
        }

        .window-header {
          background: rgba(255, 255, 255, 0.05);
          padding: 18px 24px;
          display: flex;
          align-items: center;
          gap: 15px;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .window-buttons {
          display: flex;
          gap: 8px;
        }

        .window-buttons span {
          width: 13px;
          height: 13px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }

        .code-window:hover .window-buttons span {
          transform: scale(1.1);
        }

        .btn-red { background: #ff5f56; box-shadow: 0 0 10px rgba(255, 95, 86, 0.5); }
        .btn-yellow { background: #ffbd2e; box-shadow: 0 0 10px rgba(255, 189, 46, 0.5); }
        .btn-green { background: #27c93f; box-shadow: 0 0 10px rgba(39, 201, 63, 0.5); }

        .window-title {
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          font-weight: 600;
        }

        .code-content {
          padding: 35px;
          font-family: 'Courier New', monospace;
        }

        .code-content pre {
          margin: 0;
        }

        .code-content code {
          color: #00ff88;
          font-size: 0.95rem;
          line-height: 1.9;
          text-shadow: 0 0 10px rgba(0, 255, 136, 0.3);
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          line-height: 1.2;
          margin-bottom: 20px;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.75);
          max-width: 700px;
          margin: 0 auto;
          line-height: 1.7;
        }

        .services-section {
          padding: 120px 0;
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(380px, 1fr));
          gap: 40px;
        }

        .service-card {
          position: relative;
          padding: 50px 40px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          transition: all 0.5s ease;
          overflow: hidden;
          animation: fadeInUp 0.8s ease both;
          backdrop-filter: blur(10px);
        }

        .service-card:hover {
          transform: translateY(-15px);
          border-color: rgba(0, 99, 244, 0.6);
          background: rgba(0, 99, 244, 0.08);
          box-shadow: 0 25px 70px rgba(0, 99, 244, 0.4);
        }

        .service-icon {
          font-size: 56px;
          margin-bottom: 28px;
          transition: all 0.4s ease;
        }

        .service-card:hover .service-icon {
          transform: scale(1.1) rotate(5deg);
        }

        .service-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .service-description {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 28px;
        }

        .service-features {
          list-style: none;
        }

        .service-features li {
          display: flex;
          align-items: center;
          gap: 14px;
          margin-bottom: 14px;
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.9);
          transition: all 0.3s ease;
        }

        .service-features li:hover {
          transform: translateX(5px);
        }

        .service-features svg {
          flex-shrink: 0;
          font-size: 20px;
        }

        .service-glow {
          position: absolute;
          bottom: -50%;
          right: -50%;
          width: 350px;
          height: 350px;
          border-radius: 50%;
          opacity: 0;
          filter: blur(100px);
          transition: opacity 0.5s ease;
        }

        .service-card:hover .service-glow {
          opacity: 0.25;
        }

        .tech-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.04), transparent);
        }

        .tech-tabs {
          display: flex;
          justify-content: center;
          gap: 20px;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }

        .tech-tab {
          padding: 16px 36px;
          font-size: 1.1rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.04);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          color: rgba(255, 255, 255, 0.7);
          cursor: pointer;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .tech-tab:hover {
          background: rgba(255, 255, 255, 0.08);
          border-color: rgba(0, 99, 244, 0.4);
          transform: translateY(-3px);
        }

        .tech-tab.active {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-color: transparent;
          color: #fff;
          box-shadow: 0 8px 30px rgba(0, 99, 244, 0.4);
        }

        .tech-content {
          min-height: 400px;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 35px;
        }

        .tech-card {
          position: relative;
          padding: 45px 35px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          animation: fadeInUp 0.6s ease both;
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .tech-card:hover {
          transform: translateY(-12px) scale(1.02);
          border-color: rgba(0, 99, 244, 0.6);
          background: rgba(0, 99, 244, 0.08);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.35);
        }

        .tech-icon {
          font-size: 3.5rem;
          margin-bottom: 24px;
          transition: all 0.4s ease;
        }

        .tech-card:hover .tech-icon {
          transform: scale(1.15);
        }

        .tech-name {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 14px;
          position: relative;
          z-index: 1;
        }

        .tech-description {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.75);
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }

        .tech-glow {
          position: absolute;
          bottom: -30%;
          right: -30%;
          width: 150px;
          height: 150px;
          border-radius: 50%;
          opacity: 0;
          filter: blur(40px);
          transition: opacity 0.4s ease;
        }

        .tech-card:hover .tech-glow {
          opacity: 0.2;
        }

        .process-section {
          padding: 120px 0;
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 35px;
        }

        .process-card {
          position: relative;
          padding: 45px 35px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          text-align: center;
          transition: all 0.5s ease;
          animation: fadeInUp 0.8s ease both;
          backdrop-filter: blur(10px);
        }

        .process-card:hover {
          transform: translateY(-12px);
          border-color: rgba(0, 99, 244, 0.6);
          background: rgba(0, 99, 244, 0.08);
          box-shadow: 0 25px 70px rgba(0, 99, 244, 0.35);
        }

        .process-number {
          position: absolute;
          top: 24px;
          right: 24px;
          font-size: 3.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.2), rgba(0, 191, 255, 0.1));
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .process-icon {
          font-size: 52px;
          color: #00bfff;
          margin-bottom: 28px;
          transition: all 0.4s ease;
        }

        .process-card:hover .process-icon {
          transform: scale(1.15) rotate(5deg);
        }

        .process-title {
          font-size: 1.6rem;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .process-description {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
        }

        .process-arrow {
          position: absolute;
          top: 50%;
          right: -18px;
          transform: translateY(-50%);
          font-size: 28px;
          color: rgba(0, 99, 244, 0.4);
          z-index: 2;
          animation: arrowPulse 2s ease-in-out infinite;
        }

        @keyframes arrowPulse {
          0%, 100% { transform: translateY(-50%) translateX(0); }
          50% { transform: translateY(-50%) translateX(5px); }
        }

        .benefits-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.04), transparent);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 40px;
        }

        .benefit-card {
          padding: 45px 40px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          transition: all 0.5s ease;
          animation: fadeInUp 0.8s ease both;
          backdrop-filter: blur(10px);
        }

        .benefit-card:hover {
          transform: translateY(-12px);
          border-color: rgba(0, 99, 244, 0.6);
          background: rgba(0, 99, 244, 0.08);
          box-shadow: 0 25px 70px rgba(0, 99, 244, 0.35);
        }

        .benefit-icon {
          font-size: 52px;
          color: #00bfff;
          margin-bottom: 28px;
          transition: all 0.4s ease;
        }

        .benefit-card:hover .benefit-icon {
          transform: scale(1.15) rotate(-5deg);
        }

        .benefit-title {
          font-size: 1.7rem;
          font-weight: 800;
          margin-bottom: 18px;
        }

        .benefit-description {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
        }

        .pricing-section {
          padding: 120px 0;
        }

        .contact-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 40px;
          max-width: 1200px;
          margin: 0 auto 60px;
        }

        .contact-card {
          position: relative;
          padding: 50px 40px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 24px;
          text-align: center;
          transition: all 0.5s ease;
          animation: fadeInUp 0.8s ease both;
          backdrop-filter: blur(10px);
          overflow: hidden;
        }

        .contact-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .contact-card:hover::before {
          opacity: 1;
        }

        .contact-card:hover {
          transform: translateY(-15px);
          border-color: rgba(0, 99, 244, 0.6);
          box-shadow: 0 25px 70px rgba(0, 99, 244, 0.4);
        }

        .contact-icon {
          font-size: 56px;
          color: #00bfff;
          margin-bottom: 28px;
          transition: all 0.4s ease;
          position: relative;
          z-index: 1;
        }

        .contact-card:hover .contact-icon {
          transform: scale(1.2) rotate(10deg);
          color: #00ff88;
        }

        .contact-title {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .contact-description {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 32px;
          line-height: 1.7;
          position: relative;
          z-index: 1;
        }

        .contact-button {
          width: 100%;
          padding: 16px 32px;
          font-size: 1.1rem;
          font-weight: 700;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.15);
          border-radius: 50px;
          color: #fff;
          cursor: pointer;
          transition: all 0.4s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          position: relative;
          z-index: 1;
          backdrop-filter: blur(10px);
        }

        .contact-button:hover {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-color: transparent;
          box-shadow: 0 10px 40px rgba(0, 99, 244, 0.5);
          transform: translateY(-3px);
          color: #fff; /* Fixed: Keep text white on hover */
        }

        .pricing-note {
          max-width: 900px;
          margin: 0 auto;
          padding: 40px;
          background: rgba(0, 99, 244, 0.08);
          border: 1px solid rgba(0, 99, 244, 0.3);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .note-content {
          display: flex;
          align-items: center;
          gap: 20px;
          text-align: left;
        }

        .note-icon {
          font-size: 32px;
          color: #00ff88;
          flex-shrink: 0;
        }

        .note-content p {
          font-size: 1.1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.85);
          margin: 0;
        }

        .cta-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.06), transparent);
        }

        .cta-content {
          text-align: center;
          max-width: 1000px;
          margin: 0 auto;
          padding: 90px 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 30px;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .cta-content::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.15), rgba(0, 191, 255, 0.1), transparent);
          opacity: 0.6;
        }

        .cta-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 900;
          margin-bottom: 28px;
          position: relative;
          z-index: 1;
        }

        .cta-text {
          font-size: 1.3rem;
          line-height: 1.9;
          color: rgba(255, 255, 255, 0.85);
          margin-bottom: 50px;
          position: relative;
          z-index: 1;
        }

        .cta-buttons {
          display: flex;
          gap: 24px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .btn-primary-large, .btn-secondary-large {
          padding: 22px 50px;
          font-size: 1.2rem;
          font-weight: 700;
          border-radius: 50px;
          border: none;
          cursor: pointer;
          transition: all 0.4s ease;
          display: inline-flex;
          align-items: center;
          gap: 14px;
          color: #fff; /* Fixed: Ensure text color stays white */
        }

        .btn-primary-large {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          box-shadow: 0 12px 45px rgba(0, 99, 244, 0.5);
          position: relative;
          overflow: hidden;
        }

        .btn-primary-large::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, #00bfff, #00ff88);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .btn-primary-large:hover::before {
          opacity: 1;
        }

        .btn-primary-large:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.7);
          color: #fff; /* Fixed: Keep text white on hover */
        }

        .btn-primary-large svg, .btn-primary-large span {
          position: relative;
          z-index: 1;
        }

        .btn-secondary-large {
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.25);
          backdrop-filter: blur(10px);
        }

        .btn-secondary-large:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.5);
          transform: translateY(-5px);
          box-shadow: 0 15px 40px rgba(255, 255, 255, 0.15);
          color: #fff; /* Fixed: Keep text white on hover */
        }

        @media (max-width: 1024px) {
          .webdev-hero .webdev-container {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .hero-visual {
            order: -1;
          }

          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
          }

          .services-grid {
            grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          }

          .process-arrow {
            display: none;
          }
        }

        @media (max-width: 768px) {
          .webdev-container {
            padding: 0 24px;
          }

          .hero-title {
            font-size: 38px;
          }

          .hero-subtitle {
            font-size: 1.15rem;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .btn-primary, .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .hero-stats {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .section-title {
            font-size: 34px;
          }

          .services-grid,
          .benefits-grid,
          .contact-grid {
            grid-template-columns: 1fr;
          }

          .tech-grid {
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          }

          .process-grid {
            grid-template-columns: 1fr;
          }

          .cta-content {
            padding: 70px 40px;
          }

          .cta-title {
            font-size: 30px;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .btn-primary-large,
          .btn-secondary-large {
            width: 100%;
            justify-content: center;
          }

          .note-content {
            flex-direction: column;
            text-align: center;
          }
        }

        @media (max-width: 480px) {
          .webdev-container {
            padding: 0 20px;
          }

          .hero-stats {
            grid-template-columns: 1fr;
          }

          .stat-value {
            font-size: 2rem;
          }

          .tech-tabs {
            flex-direction: column;
            align-items: stretch;
          }

          .tech-tab {
            text-align: center;
          }

          .code-content {
            padding: 24px;
          }

          .code-content code {
            font-size: 0.85rem;
          }

          .service-card,
          .benefit-card,
          .contact-card,
          .process-card {
            padding: 35px 28px;
          }

          .cta-content {
            padding: 50px 30px;
          }

          .pricing-note {
            padding: 30px 24px;
          }
        }
      `})]})},Ij=()=>{const e=uo(),[n,s]=j.useState(0),[a,l]=j.useState(0);j.useEffect(()=>{const g=()=>s(window.scrollY);return window.addEventListener("scroll",g),()=>window.removeEventListener("scroll",g)},[]);const c=[{icon:i.jsx(tn,{}),title:"Native iOS Development",description:"Build powerful, high-performance iOS applications using Swift and the latest Apple frameworks.",features:["Swift & SwiftUI development","Apple ecosystem integration","App Store optimization","iOS-specific features"],category:"ios"},{icon:i.jsx(tn,{}),title:"Native Android Development",description:"Create robust Android applications with Kotlin and modern Android development tools.",features:["Kotlin & Jetpack Compose","Material Design implementation","Google Play optimization","Android-specific features"],category:"android"},{icon:i.jsx(Rt,{}),title:"Cross-Platform Apps",description:"Develop once, deploy everywhere with React Native and Flutter for maximum reach.",features:["Single codebase deployment","Native performance","Cost-effective solution","Faster time to market"],category:"cross-platform"},{icon:i.jsx(Sd,{}),title:"Enterprise Mobile Solutions",description:"Secure, scalable mobile applications for large organizations and businesses.",features:["Enterprise security protocols","Backend integration","Custom workflows","Advanced analytics"],category:"enterprise"}],u={crossPlatform:[{name:"React Native",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"},{name:"Flutter",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"},{name:"Ionic",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg"}],native:[{name:"Swift",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg"},{name:"Kotlin",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg"},{name:"Java",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"},{name:"Objective-C",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg"}],backend:[{name:"Node.js",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"},{name:"Python",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"},{name:"Firebase",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"},{name:"GraphQL",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"}],tools:[{name:"Xcode",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg"},{name:"Android Studio",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg"},{name:"VS Code",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg"},{name:"Git",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"}]},f=[{icon:i.jsx(_e,{}),title:"High Performance",desc:"Optimized for speed and smooth user experience"},{icon:i.jsx(lt,{}),title:"Secure & Safe",desc:"Bank-level encryption and security standards"},{icon:i.jsx(Ke,{}),title:"Scalable",desc:"Grows seamlessly with your user base"},{icon:i.jsx(Xe,{}),title:"User-Centric",desc:"Intuitive interfaces that users love"},{icon:i.jsx(cs,{}),title:"Data Privacy",desc:"GDPR compliant and privacy-focused"},{icon:i.jsx(Sv,{}),title:"Offline Support",desc:"Works seamlessly without internet"}],p=[{num:"01",title:"Discovery",desc:"Understanding your vision and requirements"},{num:"02",title:"Design",desc:"Creating beautiful and intuitive UI/UX"},{num:"03",title:"Development",desc:"Building with cutting-edge technologies"},{num:"04",title:"Testing",desc:"Rigorous QA across all devices"},{num:"05",title:"Launch",desc:"App store deployment and support"}],m=g=>{e(`/mobile-app-learn-more?category=${g}`)};return i.jsxs("div",{className:"mobile-app-page",children:[i.jsxs("div",{className:"mobile-bg",children:[i.jsx("div",{className:"grid-pattern"}),i.jsxs("div",{className:"floating-elements",children:[i.jsx("div",{className:"float-shape shape-1",style:{transform:`translateY(${n*.1}px)`}}),i.jsx("div",{className:"float-shape shape-2",style:{transform:`translateY(${n*-.15}px)`}}),i.jsx("div",{className:"float-shape shape-3",style:{transform:`translateY(${n*.08}px)`}})]})]}),i.jsx("section",{className:"mobile-hero",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"hero-grid",children:[i.jsxs("div",{className:"hero-content",children:[i.jsxs("div",{className:"hero-badge",children:[i.jsx(tn,{className:"badge-icon"}),i.jsx("span",{children:"Mobile App Development"})]}),i.jsxs("h1",{className:"hero-title",children:["Build Amazing Mobile Apps",i.jsx("br",{}),i.jsx("span",{className:"title-gradient",children:"For iOS & Android"})]}),i.jsx("p",{className:"hero-description",children:"Transform your ideas into powerful mobile applications that engage users and drive business growth. Native and cross-platform solutions tailored to your needs."}),i.jsxs("div",{className:"hero-cta",children:[i.jsxs("button",{className:"cta-primary",children:["Start Your Project",i.jsx(De,{})]}),i.jsxs("button",{className:"cta-secondary",children:[i.jsx(hi,{}),"Get Free Consultation"]})]}),i.jsxs("div",{className:"hero-stats",children:[i.jsxs("div",{className:"stat-box",children:[i.jsx("div",{className:"stat-value",children:"200+"}),i.jsx("div",{className:"stat-label",children:"Apps Launched"})]}),i.jsxs("div",{className:"stat-box",children:[i.jsx("div",{className:"stat-value",children:"5M+"}),i.jsx("div",{className:"stat-label",children:"Downloads"})]}),i.jsxs("div",{className:"stat-box",children:[i.jsx("div",{className:"stat-value",children:"4.8★"}),i.jsx("div",{className:"stat-label",children:"Average Rating"})]})]})]}),i.jsxs("div",{className:"hero-visual",children:[i.jsxs("div",{className:"floating-icons",children:[i.jsx("div",{className:"float-icon icon-1",children:i.jsx(hv,{})}),i.jsx("div",{className:"float-icon icon-2",children:i.jsx(tr,{})}),i.jsx("div",{className:"float-icon icon-3",children:i.jsx(ls,{})}),i.jsx("div",{className:"float-icon icon-4",children:i.jsx(nr,{})})]}),i.jsxs("div",{className:"phone-images-stack",children:[i.jsx("img",{src:"https://images.unsplash.com/photo-1592286927505-b7e6ab36524c?w=400&h=800&fit=crop&q=80",alt:"Mobile App 1",className:"phone-img phone-img-1"}),i.jsx("img",{src:"https://images.unsplash.com/photo-1551650975-87deedd944c3?w=400&h=800&fit=crop&q=80",alt:"Mobile App 2",className:"phone-img phone-img-2"}),i.jsx("img",{src:"https://images.unsplash.com/photo-1556656793-08538906a9f8?w=400&h=800&fit=crop&q=80",alt:"Mobile App 3",className:"phone-img phone-img-3"})]})]})]})})}),i.jsx("section",{className:"services-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Mobile Development ",i.jsx("span",{className:"highlight",children:"Services"})]}),i.jsx("p",{className:"section-desc",children:"Comprehensive mobile solutions for every platform"})]}),i.jsxs("div",{className:"services-layout",children:[i.jsx("div",{className:"services-nav",children:c.map((g,v)=>i.jsxs("button",{className:`service-nav-item ${a===v?"active":""}`,onClick:()=>l(v),children:[i.jsx("div",{className:"nav-icon",children:g.icon}),i.jsx("span",{children:g.title})]},v))}),i.jsxs("div",{className:"service-display",children:[i.jsx("div",{className:"service-icon-large",children:c[a].icon}),i.jsx("h3",{className:"service-title-large",children:c[a].title}),i.jsx("p",{className:"service-desc-large",children:c[a].description}),i.jsx("div",{className:"service-features-list",children:c[a].features.map((g,v)=>i.jsxs("div",{className:"feature-item",children:[i.jsx(it,{className:"feature-check"}),i.jsx("span",{children:g})]},v))}),i.jsxs("button",{className:"service-learn-more",onClick:()=>m(c[a].category),children:["Learn More ",i.jsx(De,{})]})]})]})]})}),i.jsx("section",{className:"tech-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Technology ",i.jsx("span",{className:"highlight",children:"Stack"})]}),i.jsx("p",{className:"section-desc",children:"Leveraging the best mobile development technologies"})]}),i.jsxs("div",{className:"tech-categories",children:[i.jsxs("div",{className:"tech-category",children:[i.jsx("h3",{className:"category-title",children:"Cross-Platform"}),i.jsx("div",{className:"tech-grid",children:u.crossPlatform.map((g,v)=>i.jsxs("div",{className:"tech-item",children:[i.jsx("img",{src:g.icon,alt:g.name}),i.jsx("span",{children:g.name})]},v))})]}),i.jsxs("div",{className:"tech-category",children:[i.jsx("h3",{className:"category-title",children:"Native Development"}),i.jsx("div",{className:"tech-grid",children:u.native.map((g,v)=>i.jsxs("div",{className:"tech-item",children:[i.jsx("img",{src:g.icon,alt:g.name}),i.jsx("span",{children:g.name})]},v))})]}),i.jsxs("div",{className:"tech-category",children:[i.jsx("h3",{className:"category-title",children:"Backend & APIs"}),i.jsx("div",{className:"tech-grid",children:u.backend.map((g,v)=>i.jsxs("div",{className:"tech-item",children:[i.jsx("img",{src:g.icon,alt:g.name}),i.jsx("span",{children:g.name})]},v))})]}),i.jsxs("div",{className:"tech-category",children:[i.jsx("h3",{className:"category-title",children:"Development Tools"}),i.jsx("div",{className:"tech-grid",children:u.tools.map((g,v)=>i.jsxs("div",{className:"tech-item",children:[i.jsx("img",{src:g.icon,alt:g.name}),i.jsx("span",{children:g.name})]},v))})]})]})]})}),i.jsx("section",{className:"features-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Why Choose ",i.jsx("span",{className:"highlight",children:"Verapixels"})]}),i.jsx("p",{className:"section-desc",children:"Excellence in mobile app development"})]}),i.jsx("div",{className:"features-grid",children:f.map((g,v)=>i.jsxs("div",{className:"feature-card",children:[i.jsx("div",{className:"feature-icon-wrapper",children:g.icon}),i.jsx("h3",{className:"feature-title",children:g.title}),i.jsx("p",{className:"feature-desc",children:g.desc})]},v))})]})}),i.jsx("section",{className:"process-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Development ",i.jsx("span",{className:"highlight",children:"Process"})]}),i.jsx("p",{className:"section-desc",children:"Our proven approach to building successful apps"})]}),i.jsx("div",{className:"process-timeline",children:p.map((g,v)=>i.jsxs("div",{className:"process-step",children:[i.jsx("div",{className:"step-number",children:g.num}),i.jsxs("div",{className:"step-content",children:[i.jsx("h3",{className:"step-title",children:g.title}),i.jsx("p",{className:"step-desc",children:g.desc})]}),v<p.length-1&&i.jsx("div",{className:"step-connector"})]},v))})]})}),i.jsx("section",{className:"final-cta",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"cta-card",children:[i.jsx(ho,{className:"cta-icon"}),i.jsx("h2",{className:"cta-title",children:"Ready to Launch Your Mobile App?"}),i.jsx("p",{className:"cta-text",children:"Let's bring your mobile app idea to life and reach millions of users."}),i.jsxs("div",{className:"cta-actions",children:[i.jsxs("button",{className:"cta-btn-primary",children:[i.jsx(bi,{}),"Call Us Now"]}),i.jsxs("button",{className:"cta-btn-secondary",children:[i.jsx(en,{}),"Send Message"]}),i.jsxs("button",{className:"cta-btn-tertiary",children:[i.jsx(an,{}),"View Portfolio"]})]})]})})}),i.jsx(Ot,{}),i.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .mobile-app-page {
          background: #0a0a0f;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .mobile-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(88, 101, 242, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(88, 101, 242, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridMove 30s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .floating-elements {
          position: absolute;
          inset: 0;
        }

        .float-shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
        }

        .shape-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #5865f2, #7289da);
          top: 10%;
          right: 10%;
          animation: float 20s ease-in-out infinite;
        }

        .shape-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #f43f5e, #ec4899);
          bottom: 20%;
          left: 10%;
          animation: float 25s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          top: 50%;
          left: 50%;
          animation: float 22s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-30px, 30px) rotate(240deg); }
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .mobile-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 0 60px;
        }

        .hero-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-content {
          max-width: 600px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          background: rgba(88, 101, 242, 0.15);
          border: 1px solid rgba(88, 101, 242, 0.4);
          border-radius: 50px;
          color: #7289da;
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
        }

        .badge-icon {
          font-size: 18px;
        }

        .hero-title {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 28px;
          letter-spacing: -0.02em;
        }

        .title-gradient {
          background: linear-gradient(135deg, #5865f2 0%, #7289da 50%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.25rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 40px;
        }

        .hero-cta {
          display: flex;
          gap: 16px;
          margin-bottom: 50px;
          flex-wrap: wrap;
        }

        .cta-primary, .cta-secondary {
          padding: 18px 36px;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-primary {
          background: linear-gradient(135deg, #5865f2, #7289da);
          color: white;
          box-shadow: 0 10px 30px rgba(88, 101, 242, 0.4);
        }

        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(88, 101, 242, 0.6);
        }

        .cta-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-3px);
        }

        .hero-stats {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
        }

        .stat-box {
          text-align: center;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #5865f2, #7289da);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        .hero-visual {
          position: relative;
          height: 650px;
          perspective: 1500px;
        }

        .phone-images-stack {
          position: absolute;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .phone-img {
          position: absolute;
          width: 320px;
          height: 650px;
          object-fit: cover;
          border-radius: 45px;
          box-shadow: 
            0 50px 100px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.1),
            0 0 60px rgba(88, 101, 242, 0.2);
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          transform-style: preserve-3d;
        }

        .phone-img-1 {
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%) rotate(-12deg) translateZ(50px);
          z-index: 3;
          animation: phoneImg1Float 6s ease-in-out infinite;
        }

        .phone-img-2 {
          left: 50%;
          top: 50%;
          transform: translate(-25%, -50%) rotate(8deg) translateZ(0px);
          z-index: 2;
          animation: phoneImg2Float 7s ease-in-out infinite;
        }

        .phone-img-3 {
          left: 50%;
          top: 50%;
          transform: translate(-75%, -50%) rotate(-3deg) translateZ(-50px);
          z-index: 1;
          animation: phoneImg3Float 8s ease-in-out infinite;
        }

        @keyframes phoneImg1Float {
          0%, 100% { transform: translate(-50%, -50%) rotate(-12deg) translateZ(50px) translateY(0); }
          50% { transform: translate(-50%, -50%) rotate(-12deg) translateZ(50px) translateY(-20px); }
        }

        @keyframes phoneImg2Float {
          0%, 100% { transform: translate(-25%, -50%) rotate(8deg) translateZ(0px) translateY(0); }
          50% { transform: translate(-25%, -50%) rotate(8deg) translateZ(0px) translateY(-25px); }
        }

        @keyframes phoneImg3Float {
          0%, 100% { transform: translate(-75%, -50%) rotate(-3deg) translateZ(-50px) translateY(0); }
          50% { transform: translate(-75%, -50%) rotate(-3deg) translateZ(-50px) translateY(-15px); }
        }

        .phone-img:hover {
          transform: translate(-50%, -50%) rotate(0deg) scale(1.1) translateZ(150px) !important;
          z-index: 10 !important;
          box-shadow: 
            0 70px 140px rgba(88, 101, 242, 0.5),
            0 0 0 2px rgba(88, 101, 242, 0.4),
            0 0 80px rgba(88, 101, 242, 0.4);
          animation: none !important;
          filter: brightness(1.1);
        }

        .floating-icons {
          position: absolute;
          inset: 0;
          pointer-events: none;
        }

        .float-icon {
          position: absolute;
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(88, 101, 242, 0.15);
          border: 1px solid rgba(88, 101, 242, 0.3);
          border-radius: 12px;
          color: #5865f2;
          font-size: 24px;
          backdrop-filter: blur(10px);
          animation: floatIcon 3s ease-in-out infinite;
        }

        .icon-1 {
          top: 10%;
          right: 5%;
          animation-delay: 0s;
        }

        .icon-2 {
          top: 50%;
          right: 0%;
          animation-delay: 0.5s;
        }

        .icon-3 {
          bottom: 20%;
          right: 8%;
          animation-delay: 1s;
        }

        .icon-4 {
          top: 30%;
          left: 5%;
          animation-delay: 1.5s;
        }

        @keyframes floatIcon {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .services-section {
          padding: 100px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 800;
          margin-bottom: 16px;
        }

        .highlight {
          color: #5865f2;
        }

        .section-desc {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.65);
        }

        .services-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 60px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 40px;
          backdrop-filter: blur(10px);
        }

        .services-nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .service-nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .nav-icon {
          font-size: 24px;
          color: #5865f2;
        }

        .service-nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(88, 101, 242, 0.3);
          transform: translateX(5px);
        }

        .service-nav-item.active {
          background: rgba(88, 101, 242, 0.15);
          border-color: #5865f2;
          color: white;
        }

        .service-display {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .service-icon-large {
          font-size: 64px;
          color: #5865f2;
        }

        .service-title-large {
          font-size: 2.5rem;
          font-weight: 800;
        }

        .service-desc-large {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
        }

        .service-features-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 20px 0;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .feature-check {
          color: #5865f2;
          font-size: 20px;
          flex-shrink: 0;
        }

        .service-learn-more {
          align-self: flex-start;
          padding: 14px 32px;
          background: rgba(88, 101, 242, 0.15);
          border: 1px solid #5865f2;
          border-radius: 10px;
          color: white;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .service-learn-more:hover {
          background: #5865f2;
          transform: translateX(5px);
        }

        .tech-section {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .tech-categories {
          display: grid;
          gap: 60px;
        }

        .tech-category {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 40px;
          backdrop-filter: blur(10px);
        }

        .category-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 32px;
          color: #5865f2;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 24px;
        }

        .tech-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .tech-item:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(88, 101, 242, 0.4);
          box-shadow: 0 10px 30px rgba(88, 101, 242, 0.2);
        }

        .tech-item img {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }

        .tech-item span {
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          text-align: center;
        }

        .features-section {
          padding: 100px 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .feature-card {
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .feature-card:hover {
          transform: translateY(-10px);
          background: rgba(88, 101, 242, 0.08);
          border-color: rgba(88, 101, 242, 0.4);
          box-shadow: 0 20px 50px rgba(88, 101, 242, 0.3);
        }

        .feature-icon-wrapper {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(88, 101, 242, 0.15);
          border-radius: 16px;
          margin-bottom: 24px;
          font-size: 32px;
          color: #5865f2;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .feature-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        .process-section {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .process-timeline {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .process-step {
          position: relative;
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 40px;
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .process-step:hover {
          transform: translateX(10px);
          background: rgba(88, 101, 242, 0.08);
          border-color: rgba(88, 101, 242, 0.4);
          box-shadow: 0 15px 40px rgba(88, 101, 242, 0.25);
        }

        .step-number {
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(135deg, #5865f2, #7289da);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .step-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .step-title {
          font-size: 2rem;
          font-weight: 700;
        }

        .step-desc {
          font-size: 1.15rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        .step-connector {
          position: absolute;
          left: 80px;
          bottom: -40px;
          width: 2px;
          height: 40px;
          background: linear-gradient(180deg, #5865f2, transparent);
        }

        .process-step:last-child .step-connector {
          display: none;
        }

        .final-cta {
          padding: 100px 0 120px;
        }

        .cta-card {
          max-width: 1000px;
          margin: 0 auto;
          padding: 80px 60px;
          background: linear-gradient(135deg, rgba(88, 101, 242, 0.15), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(88, 101, 242, 0.3);
          border-radius: 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .cta-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(88, 101, 242, 0.2), transparent 70%);
          opacity: 0.5;
        }

        .cta-icon {
          font-size: 64px;
          color: #5865f2;
          margin-bottom: 32px;
          animation: spin 10s linear infinite;
          position: relative;
          z-index: 1;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .cta-title {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 800;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .cta-text {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 48px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }

        .cta-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .cta-btn-primary, .cta-btn-secondary, .cta-btn-tertiary {
          padding: 18px 36px;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .cta-btn-primary {
          background: linear-gradient(135deg, #5865f2, #7289da);
          color: white;
          box-shadow: 0 10px 30px rgba(88, 101, 242, 0.4);
        }

        .cta-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(88, 101, 242, 0.6);
        }

        .cta-btn-secondary {
          background: rgba(244, 63, 94, 0.2);
          color: white;
          border: 2px solid #f43f5e;
        }

        .cta-btn-secondary:hover {
          background: #f43f5e;
          transform: translateY(-3px);
        }

        .cta-btn-tertiary {
          background: rgba(139, 92, 246, 0.2);
          color: white;
          border: 2px solid #8b5cf6;
        }

        .cta-btn-tertiary:hover {
          background: #8b5cf6;
          transform: translateY(-3px);
        }

        @media (max-width: 1024px) {
          .hero-grid {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .hero-visual {
            height: 500px;
          }

          .phone-img {
            width: 260px;
            height: 540px;
          }

          .services-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .services-nav {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 10px;
          }

          .service-nav-item {
            min-width: 200px;
          }

          .process-step {
            grid-template-columns: 80px 1fr;
            gap: 24px;
            padding: 32px;
          }

          .step-number {
            font-size: 3rem;
          }

          .step-connector {
            left: 60px;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 36px;
          }

          .hero-description {
            font-size: 1.15rem;
          }

          .hero-cta {
            flex-direction: column;
            align-items: stretch;
          }

          .cta-primary, .cta-secondary {
            justify-content: center;
          }

          .hero-stats {
            grid-template-columns: repeat(3, 1fr);
            gap: 16px;
          }

          .stat-value {
            font-size: 2rem;
          }

          .hero-visual {
            height: 400px;
          }

          .phone-img {
            width: 220px;
            height: 460px;
          }

          .phone-img-1 {
            transform: translate(-50%, -50%) rotate(0deg);
          }

          .phone-img-2 {
            transform: translate(-20%, -50%) rotate(5deg);
          }

          .phone-img-3 {
            transform: translate(-80%, -50%) rotate(-5deg);
          }

          .services-layout {
            padding: 24px;
          }

          .services-nav {
            flex-direction: column;
          }

          .service-nav-item {
            min-width: auto;
          }

          .service-title-large {
            font-size: 1.8rem;
          }

          .tech-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 16px;
          }

          .tech-item {
            padding: 20px 12px;
          }

          .tech-item img {
            width: 40px;
            height: 40px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .process-step {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 28px;
          }

          .step-number {
            font-size: 2.5rem;
          }

          .step-connector {
            display: none;
          }

          .cta-card {
            padding: 60px 32px;
          }

          .cta-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .cta-btn-primary, .cta-btn-secondary, .cta-btn-tertiary {
            justify-content: center;
          }

          .floating-icons {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 16px;
          }

          .hero-badge {
            font-size: 0.85rem;
            padding: 10px 20px;
          }

          .hero-stats {
            grid-template-columns: 1fr;
          }

          .section-title {
            font-size: 28px;
          }

          .section-desc {
            font-size: 1rem;
          }

          .tech-category {
            padding: 24px;
          }

          .category-title {
            font-size: 1.4rem;
          }

          .feature-card {
            padding: 28px;
          }

          .feature-icon-wrapper {
            width: 56px;
            height: 56px;
            font-size: 28px;
          }

          .cta-icon {
            font-size: 48px;
          }

          .phone-images-stack {
            transform: scale(0.75);
          }

          .phone-img {
            width: 200px;
            height: 420px;
          }
        }
      `})]})},Oj=()=>{const[e,n]=j.useState(0),[s,a]=j.useState(0),[l,c]=j.useState(null);j.useEffect(()=>{const b=()=>a(window.scrollY);return window.addEventListener("scroll",b),()=>window.removeEventListener("scroll",b)},[]),j.useEffect(()=>{const b=setInterval(()=>{n(y=>(y+1)%u.length)},5e3);return()=>clearInterval(b)},[]);const u=[{id:1,title:"E-Commerce Mobile App",category:"Mobile Design",image:"https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=800&h=600&fit=crop",description:"Modern shopping experience with intuitive navigation",tools:["Figma","Sketch","Principle"],caseStudyUrl:"#",githubUrl:"#"},{id:2,title:"Banking Dashboard",category:"Web Design",image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",description:"Clean and secure financial management interface",tools:["Adobe XD","Figma","After Effects"],caseStudyUrl:"#",githubUrl:"#"},{id:3,title:"Fitness Tracking App",category:"Mobile Design",image:"https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop",description:"Motivating workout and health monitoring experience",tools:["Figma","Protopie","Illustrator"],caseStudyUrl:"#",githubUrl:"#"},{id:4,title:"Real Estate Platform",category:"Web Design",image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",description:"Elegant property search and listing interface",tools:["Sketch","InVision","Photoshop"],caseStudyUrl:"#",githubUrl:"#"},{id:5,title:"Social Media Dashboard",category:"Web Design",image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",description:"Analytics and engagement tracking made simple",tools:["Figma","Framer","Adobe XD"],caseStudyUrl:"#",githubUrl:"#"},{id:6,title:"Food Delivery App",category:"Mobile Design",image:"https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop",description:"Delightful food ordering experience",tools:["Figma","Principle","Illustrator"],caseStudyUrl:"#",githubUrl:"#"}],f=[{name:"Figma",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg",description:"Collaborative design"},{name:"Adobe XD",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xd/xd-plain.svg",description:"Prototyping & wireframing"},{name:"Sketch",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sketch/sketch-original.svg",description:"Vector design tool"},{name:"Illustrator",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/illustrator/illustrator-plain.svg",description:"Vector graphics"},{name:"Photoshop",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg",description:"Image editing"},{name:"After Effects",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/aftereffects/aftereffects-original.svg",description:"Motion graphics"}],p=[{icon:i.jsx(nr,{}),title:"Web Design",description:"Responsive and beautiful web interfaces that convert visitors into customers"},{icon:i.jsx(tn,{}),title:"Mobile Design",description:"Native iOS and Android designs optimized for touch and mobile experiences"},{icon:i.jsx(Rt,{}),title:"UI Design",description:"Pixel-perfect interfaces with consistent design systems and components"},{icon:i.jsx(_e,{}),title:"UX Strategy",description:"User research, personas, journey maps, and usability testing"}],m=[{icon:i.jsx(Xe,{}),value:"500+",label:"Happy Clients"},{icon:i.jsx(Gt,{}),value:"50+",label:"Design Awards"},{icon:i.jsx(Ke,{}),value:"98%",label:"Success Rate"}],g=()=>{n(b=>(b+1)%u.length)},v=()=>{n(b=>(b-1+u.length)%u.length)};return i.jsxs("div",{className:"uiux-page",children:[i.jsxs("div",{className:"animated-bg",children:[i.jsxs("div",{className:"gradient-orbs",children:[i.jsx("div",{className:"orb orb-1"}),i.jsx("div",{className:"orb orb-2"}),i.jsx("div",{className:"orb orb-3"})]}),i.jsx("div",{className:"grid-overlay"})]}),i.jsx("section",{className:"hero-section",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"hero-content",children:[i.jsxs("div",{className:"hero-text",children:[i.jsxs("div",{className:"hero-badge",children:[i.jsx(Rt,{}),i.jsx("span",{children:"UI/UX Design Services"})]}),i.jsxs("h1",{className:"hero-title",children:["We Design ",i.jsx("span",{className:"gradient-text",children:"Experiences"})," That Users Love"]}),i.jsx("p",{className:"hero-description",children:"Transform your ideas into stunning, user-friendly designs. We create interfaces that not only look beautiful but drive engagement and conversions through thoughtful UX strategy."}),i.jsxs("div",{className:"hero-buttons",children:[i.jsxs("button",{className:"btn-primary",children:["Start Your Project",i.jsx(De,{})]}),i.jsxs("button",{className:"btn-secondary",children:["View Portfolio",i.jsx(es,{})]})]}),i.jsx("div",{className:"hero-stats",children:m.map((b,y)=>i.jsxs("div",{className:"stat-item",children:[i.jsx("div",{className:"stat-icon",children:b.icon}),i.jsxs("div",{className:"stat-details",children:[i.jsx("div",{className:"stat-value",children:b.value}),i.jsx("div",{className:"stat-label",children:b.label})]})]},y))})]}),i.jsx("div",{className:"hero-visual",children:i.jsxs("div",{className:"design-mockup",children:[i.jsx("img",{src:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600&h=800&fit=crop",alt:"UI/UX Design",className:"mockup-img"}),i.jsxs("div",{className:"floating-card card-1",children:[i.jsx(nr,{}),i.jsx("span",{children:"Responsive Design"})]}),i.jsxs("div",{className:"floating-card card-2",children:[i.jsx(tn,{}),i.jsx("span",{children:"Mobile First"})]}),i.jsxs("div",{className:"floating-card card-3",children:[i.jsx(_e,{}),i.jsx("span",{children:"Fast & Smooth"})]})]})})]})})}),i.jsx("section",{className:"services-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Our ",i.jsx("span",{className:"gradient-text",children:"Design Services"})]}),i.jsx("p",{className:"section-subtitle",children:"Comprehensive UI/UX solutions tailored to your needs"})]}),i.jsx("div",{className:"services-grid",children:p.map((b,y)=>i.jsxs("div",{className:"service-card",children:[i.jsx("div",{className:"service-icon",children:b.icon}),i.jsx("h3",{children:b.title}),i.jsx("p",{children:b.description})]},y))})]})}),i.jsx("section",{className:"portfolio-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Our ",i.jsx("span",{className:"gradient-text",children:"Design Portfolio"})]}),i.jsx("p",{className:"section-subtitle",children:"Explore our latest UI/UX design projects"})]}),i.jsxs("div",{className:"carousel-container",children:[i.jsx("button",{className:"carousel-btn prev",onClick:v,children:i.jsx(xm,{})}),i.jsx("div",{className:"carousel-wrapper",children:i.jsx("div",{className:"carousel-track",style:{transform:`translateX(-${e*100}%)`},children:u.map((b,y)=>i.jsx("div",{className:"carousel-slide",onMouseEnter:()=>c(b.id),onMouseLeave:()=>c(null),children:i.jsxs("div",{className:"project-image-wrapper",children:[i.jsx("img",{src:b.image,alt:b.title}),l===b.id&&i.jsx("div",{className:"project-overlay",children:i.jsxs("div",{className:"overlay-content",children:[i.jsx("h3",{children:b.title}),i.jsx("p",{className:"project-category",children:b.category}),i.jsx("p",{className:"project-desc",children:b.description}),i.jsx("div",{className:"project-tools",children:b.tools.map((S,N)=>i.jsx("span",{className:"tool-tag",children:S},N))}),i.jsxs("div",{className:"project-buttons",children:[i.jsxs("a",{href:b.caseStudyUrl,className:"project-btn",children:[i.jsx(es,{}),"Case Study"]}),i.jsxs("a",{href:b.githubUrl,className:"project-btn",children:[i.jsx(Cd,{}),"View Code"]})]})]})})]})},b.id))})}),i.jsx("button",{className:"carousel-btn next",onClick:g,children:i.jsx(De,{})})]}),i.jsx("div",{className:"carousel-indicators",children:u.map((b,y)=>i.jsx("button",{className:`indicator ${e===y?"active":""}`,onClick:()=>n(y)},y))})]})}),i.jsx("section",{className:"tools-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Design ",i.jsx("span",{className:"gradient-text",children:"Tools We Use"})]}),i.jsx("p",{className:"section-subtitle",children:"Industry-leading software for world-class designs"})]}),i.jsx("div",{className:"tools-grid",children:f.map((b,y)=>i.jsxs("div",{className:"tool-card",children:[i.jsx("div",{className:"tool-icon-wrapper",children:i.jsx("img",{src:b.icon,alt:b.name})}),i.jsx("h4",{children:b.name}),i.jsx("p",{children:b.description})]},y))})]})}),i.jsx("section",{className:"process-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Our ",i.jsx("span",{className:"gradient-text",children:"Design Process"})]}),i.jsx("p",{className:"section-subtitle",children:"A proven approach to creating exceptional user experiences"})]}),i.jsx("div",{className:"process-timeline",children:[{step:"01",title:"Research",desc:"User research, competitor analysis, and market insights"},{step:"02",title:"Wireframe",desc:"Low-fidelity sketches and information architecture"},{step:"03",title:"Design",desc:"High-fidelity mockups with visual design system"},{step:"04",title:"Prototype",desc:"Interactive prototypes for testing and validation"},{step:"05",title:"Test",desc:"Usability testing and iterative improvements"},{step:"06",title:"Deliver",desc:"Final designs with developer handoff documentation"}].map((b,y)=>i.jsxs("div",{className:"process-step",children:[i.jsx("div",{className:"step-number",children:b.step}),i.jsxs("div",{className:"step-content",children:[i.jsx("h3",{children:b.title}),i.jsx("p",{children:b.desc})]}),y<5&&i.jsx("div",{className:"step-connector"})]},y))})]})}),i.jsx("section",{className:"cta-section",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"cta-box",children:[i.jsx("div",{className:"cta-glow"}),i.jsx(Rt,{className:"cta-icon"}),i.jsx("h2",{children:"Ready to Create Something Amazing?"}),i.jsx("p",{children:"Let's transform your vision into a beautiful, user-friendly design that drives results."}),i.jsxs("div",{className:"cta-buttons",children:[i.jsxs("button",{className:"btn-primary",children:["Get Started Today",i.jsx(De,{})]}),i.jsxs("button",{className:"btn-secondary",children:["Schedule Consultation",i.jsx(Nd,{})]})]})]})})}),i.jsx(Ot,{}),i.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .uiux-page {
          background: #000000;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
        }

        .animated-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .gradient-orbs {
          position: absolute;
          inset: 0;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.2;
          animation: orbFloat 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: #007AFF;
          top: -300px;
          left: -300px;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: #FF6B9D;
          bottom: -250px;
          right: -250px;
          animation-delay: -7s;
        }

        .orb-3 {
          width: 550px;
          height: 550px;
          background: #8B5CF6;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -14s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -30px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        .grid-overlay {
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 50px, rgba(255, 255, 255, 0.02) 51px),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 50px, rgba(255, 255, 255, 0.02) 51px);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .hero-section {
          padding: 120px 0 100px;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #007AFF;
          margin-bottom: 24px;
          backdrop-filter: blur(10px);
        }

        .hero-title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #007AFF, #FF6B9D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 40px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }

        .btn-primary,
        .btn-secondary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .btn-primary {
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          color: white;
          box-shadow: 0 10px 30px rgba(0, 122, 255, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 122, 255, 0.6);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.2);
          color: white;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-3px);
        }

        .hero-stats {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #007AFF, #FF6B9D);
          border-radius: 12px;
          font-size: 24px;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 900;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .hero-visual {
          position: relative;
        }

        .design-mockup {
          position: relative;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-20px); }
        }

        .mockup-img {
          width: 100%;
          max-width: 500px;
          height: auto;
          border-radius: 24px;
          box-shadow: 0 30px 80px rgba(0, 122, 255, 0.3);
        }

        .floating-card {
          position: absolute;
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 24px;
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 12px;
          backdrop-filter: blur(20px);
          font-weight: 600;
          animation: floatCard 4s ease-in-out infinite;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        }

        .floating-card svg {
          font-size: 24px;
          color: #007AFF;
        }

        .card-1 {
          top: 10%;
          right: -50px;
          animation-delay: 0s;
        }

        .card-2 {
          top: 50%;
          left: -50px;
          animation-delay: -1.5s;
        }

        .card-3 {
          bottom: 10%;
          right: -30px;
          animation-delay: -3s;
        }

        @keyframes floatCard {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        /* Services Section */
        .services-section {
          padding: 100px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 900;
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .service-card {
          padding: 40px 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
        }

        .service-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 50px rgba(0, 122, 255, 0.3);
        }

        .service-icon {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border-radius: 16px;
          font-size: 32px;
          margin-bottom: 24px;
        }

        .service-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .service-card p {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Portfolio Carousel */
        .portfolio-section {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .carousel-container {
          position: relative;
          max-width: 1000px;
          margin: 0 auto;
        }

        .carousel-wrapper {
          overflow: hidden;
          border-radius: 24px;
        }

        .carousel-track {
          display: flex;
          transition: transform 0.6s ease-in-out;
        }

        .carousel-slide {
          min-width: 100%;
          position: relative;
        }

        .project-image-wrapper {
          position: relative;
          width: 100%;
          height: 600px;
          overflow: hidden;
          border-radius: 24px;
        }

        .project-image-wrapper img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.5s ease;
        }

        .carousel-slide:hover .project-image-wrapper img {
          transform: scale(1.1);
        }

        .project-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95), rgba(0, 0, 0, 0.3));
          display: flex;
          align-items: flex-end;
          padding: 40px;
          animation: fadeInUp 0.4s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .overlay-content {
          width: 100%;
        }

        .overlay-content h3 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .project-category {
          color: #007AFF;
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
          margin-bottom: 12px;
        }

        .project-desc {
          font-size: 1.1rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 20px;
        }

        .project-tools {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
          margin-bottom: 24px;
        }

        .tool-tag {
          padding: 6px 14px;
          background: rgba(0, 122, 255, 0.2);
          border: 1px solid rgba(0, 122, 255, 0.4);
          border-radius: 6px;
          font-size: 0.85rem;
          font-weight: 600;
          color: #5AC8FA;
        }

        .project-buttons {
          display: flex;
          gap: 12px;
        }

        .project-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          color: white;
          font-weight: 700;
          text-decoration: none;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .project-btn:hover {
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border-color: transparent;
          transform: translateY(-2px);
        }

        .carousel-btn {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-radius: 50%;
          color: white;
          font-size: 24px;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          z-index: 10;
        }

        .carousel-btn:hover {
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          transform: translateY(-50%) scale(1.1);
        }

        .carousel-btn.prev {
          left: -80px;
        }

        .carousel-btn.next {
          right: -80px;
        }

        .carousel-indicators {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 40px;
        }

        .indicator {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .indicator:hover {
          background: rgba(255, 255, 255, 0.5);
        }

        .indicator.active {
          width: 40px;
          border-radius: 6px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
        }

        /* Tools Section */
        .tools-section {
          padding: 100px 0;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .tool-card {
          padding: 40px 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .tool-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 50px rgba(0, 122, 255, 0.3);
        }

        .tool-icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .tool-card:hover .tool-icon-wrapper {
          transform: scale(1.1) rotateY(180deg);
        }

        .tool-icon-wrapper img {
          width: 50px;
          height: 50px;
          object-fit: contain;
        }

        .tool-card h4 {
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .tool-card p {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Process Section */
        .process-section {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .process-timeline {
          max-width: 1000px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 40px;
        }

        .process-step {
          position: relative;
          padding: 40px 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
        }

        .process-step:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 50px rgba(0, 122, 255, 0.3);
        }

        .step-number {
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: 900;
          margin-bottom: 24px;
          box-shadow: 0 10px 30px rgba(0, 122, 255, 0.4);
        }

        .step-content h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .step-content p {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        /* CTA Section */
        .cta-section {
          padding: 100px 0 120px;
        }

        .cta-box {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(0, 122, 255, 0.3);
          border-radius: 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .cta-glow {
          position: absolute;
          inset: -50%;
          background: linear-gradient(135deg, #007AFF, #FF6B9D);
          opacity: 0.1;
          filter: blur(100px);
          animation: glowRotate 10s linear infinite;
        }

        @keyframes glowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .cta-icon {
          font-size: 64px;
          color: #007AFF;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
          animation: iconBounce 2s ease-in-out infinite;
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .cta-box h2 {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 900;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .cta-box p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .carousel-btn.prev {
            left: 20px;
          }

          .carousel-btn.next {
            right: 20px;
          }
        }

        @media (max-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .hero-visual {
            order: -1;
          }

          .design-mockup {
            display: flex;
            justify-content: center;
          }

          .mockup-img {
            max-width: 400px;
          }

          .floating-card {
            display: none;
          }

          .process-timeline {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 80px 0 60px;
          }

          .hero-title {
            font-size: 36px;
          }

          .hero-description {
            font-size: 1rem;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .hero-stats {
            flex-direction: column;
            gap: 20px;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .project-image-wrapper {
            height: 400px;
          }

          .overlay-content h3 {
            font-size: 1.5rem;
          }

          .project-buttons {
            flex-direction: column;
          }

          .carousel-btn {
            width: 50px;
            height: 50px;
            font-size: 20px;
          }

          .carousel-btn.prev {
            left: 10px;
          }

          .carousel-btn.next {
            right: 10px;
          }

          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .process-timeline {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .cta-box {
            padding: 60px 32px;
          }

          .cta-buttons {
            flex-direction: column;
          }
        }

        @media (max-width: 480px) {
          .hero-badge {
            font-size: 0.8rem;
            padding: 8px 16px;
          }

          .hero-title {
            font-size: 28px;
          }

          .stat-icon {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .stat-value {
            font-size: 1.5rem;
          }

          .section-title {
            font-size: 28px;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          .service-icon {
            width: 60px;
            height: 60px;
            font-size: 28px;
          }

          .project-image-wrapper {
            height: 300px;
          }

          .overlay-content {
            padding: 20px;
          }

          .carousel-btn {
            width: 40px;
            height: 40px;
            font-size: 18px;
          }

          .tools-grid {
            grid-template-columns: 1fr;
          }

          .tool-icon-wrapper {
            width: 70px;
            height: 70px;
          }

          .tool-icon-wrapper img {
            width: 40px;
            height: 40px;
          }

          .step-number {
            width: 50px;
            height: 50px;
            font-size: 1.2rem;
          }

          .cta-icon {
            font-size: 48px;
          }
        }
      `})]})},Vj=()=>{const[e,n]=j.useState(0),[s,a]=j.useState({x:0,y:0}),l=j.useRef(null);j.useEffect(()=>{const m=()=>n(window.scrollY),g=v=>{a({x:v.clientX,y:v.clientY})};return window.addEventListener("scroll",m),window.addEventListener("mousemove",g),()=>{window.removeEventListener("scroll",m),window.removeEventListener("mousemove",g)}},[]),j.useEffect(()=>{const m=l.current;if(!m)return;const g=m.getContext("2d");if(!g)return;m.width=window.innerWidth,m.height=window.innerHeight;const v=m.width,b=m.height;class y{x;y;size;speedX;speedY;opacity;constructor(){this.x=Math.random()*v,this.y=Math.random()*b,this.size=Math.random()*2+1,this.speedX=Math.random()*.5-.25,this.speedY=Math.random()*.5-.25,this.opacity=Math.random()*.5+.2}update(){this.x+=this.speedX,this.y+=this.speedY,this.x>v&&(this.x=0),this.x<0&&(this.x=v),this.y>b&&(this.y=0),this.y<0&&(this.y=b)}draw(){g&&(g.fillStyle=`rgba(88, 101, 242, ${this.opacity})`,g.beginPath(),g.arc(this.x,this.y,this.size,0,Math.PI*2),g.fill())}}const S=[],N=80;for(let E=0;E<N;E++)S.push(new y);const T=()=>{!m||!g||(g.clearRect(0,0,m.width,m.height),S.forEach(E=>{E.update(),E.draw()}),S.forEach((E,P)=>{S.slice(P+1).forEach(B=>{const M=E.x-B.x,F=E.y-B.y,_=Math.sqrt(M*M+F*F);_<120&&g&&(g.strokeStyle=`rgba(88, 101, 242, ${.15*(1-_/120)})`,g.lineWidth=1,g.beginPath(),g.moveTo(E.x,E.y),g.lineTo(B.x,B.y),g.stroke())})}),requestAnimationFrame(T))};T();const L=()=>{m&&(m.width=window.innerWidth,m.height=window.innerHeight)};return window.addEventListener("resize",L),()=>window.removeEventListener("resize",L)},[]);const c=[{icon:i.jsx(Gn,{}),title:"Cloud Infrastructure",description:"Scalable and reliable cloud infrastructure solutions",features:["Auto-scaling","Load balancing","99.99% uptime","Global CDN"]},{icon:i.jsx(yi,{}),title:"Cloud Migration",description:"Seamless migration of your applications to the cloud",features:["Zero downtime","Data integrity","Cost optimization","Security first"]},{icon:i.jsx(Zi,{}),title:"Cloud Storage",description:"Secure and accessible storage solutions",features:["Unlimited storage","Auto-backup","Encryption","Fast access"]},{icon:i.jsx(lt,{}),title:"Cloud Security",description:"Enterprise-grade security for your cloud assets",features:["DDoS protection","Firewall","SSL/TLS","Compliance"]}],u=[{name:"AWS",logo:"☁️",color:"#FF9900"},{name:"Azure",logo:"☁️",color:"#0089D6"},{name:"Google Cloud",logo:"☁️",color:"#4285F4"},{name:"IBM Cloud",logo:"☁️",color:"#0F62FE"}],f=[{value:"99.99%",label:"Uptime SLA",icon:i.jsx(ls,{})},{value:"500+",label:"Cloud Projects",icon:i.jsx(Ke,{})},{value:"50TB+",label:"Data Managed",icon:i.jsx(Zi,{})},{value:"24/7",label:"Support",icon:i.jsx(lt,{})}],p=[{icon:i.jsx(_e,{}),title:"Lightning Fast",desc:"Optimized performance globally"},{icon:i.jsx(cs,{}),title:"Ultra Secure",desc:"Military-grade encryption"},{icon:i.jsx(Ke,{}),title:"Auto-Scale",desc:"Scale on demand automatically"},{icon:i.jsx(an,{}),title:"Global Reach",desc:"Deploy anywhere instantly"},{icon:i.jsx(ho,{}),title:"Auto Backup",desc:"Never lose your data"},{icon:i.jsx(Za,{}),title:"Analytics",desc:"Real-time insights"}];return i.jsxs("div",{className:"cloud-solutions",children:[i.jsx("canvas",{ref:l,className:"particle-canvas"}),i.jsxs("section",{className:"hero-section",children:[i.jsxs("div",{className:"hero-content",children:[i.jsxs("div",{className:"floating-badge",style:{transform:`translateY(${Math.sin(e*.01)*10}px)`},children:[i.jsx(Gn,{className:"badge-icon"}),i.jsx("span",{children:"Cloud Solutions"})]}),i.jsxs("h1",{className:"hero-title",children:[i.jsx("span",{className:"title-line",children:"Power Your Business"}),i.jsx("span",{className:"title-gradient",children:"With Cloud Technology"})]}),i.jsx("p",{className:"hero-subtitle",children:"Transform your infrastructure with cutting-edge cloud solutions. Scale infinitely, secure completely, deploy globally."}),i.jsxs("div",{className:"hero-buttons",children:[i.jsxs("button",{className:"btn-primary",children:[i.jsx(Tf,{}),"Get Started",i.jsx(De,{})]}),i.jsxs("button",{className:"btn-secondary",children:[i.jsx(Ja,{}),"Explore Services"]})]}),i.jsx("div",{className:"stats-grid",children:f.map((m,g)=>i.jsxs("div",{className:"stat-card",style:{animationDelay:`${g*.1}s`},children:[i.jsx("div",{className:"stat-icon",children:m.icon}),i.jsx("div",{className:"stat-value",children:m.value}),i.jsx("div",{className:"stat-label",children:m.label})]},g))})]}),i.jsxs("div",{className:"hero-visual",style:{transform:`translate(${s.x*.02}px, ${s.y*.02}px)`},children:[i.jsxs("div",{className:"cloud-orbit orbit-1",children:[i.jsx("div",{className:"orbit-node node-1",children:i.jsx(yi,{})}),i.jsx("div",{className:"orbit-node node-2",children:i.jsx(Zi,{})}),i.jsx("div",{className:"orbit-node node-3",children:i.jsx(tr,{})})]}),i.jsxs("div",{className:"cloud-orbit orbit-2",children:[i.jsx("div",{className:"orbit-node node-4",children:i.jsx(lt,{})}),i.jsx("div",{className:"orbit-node node-5",children:i.jsx(_e,{})})]}),i.jsx("div",{className:"cloud-center",children:i.jsx(Gn,{})})]})]}),i.jsxs("section",{className:"solutions-section",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Cloud ",i.jsx("span",{className:"highlight",children:"Solutions"})]}),i.jsx("p",{className:"section-subtitle",children:"Comprehensive cloud services tailored to your needs"})]}),i.jsx("div",{className:"solutions-grid",children:c.map((m,g)=>i.jsxs("div",{className:"solution-card",style:{animationDelay:`${g*.15}s`},children:[i.jsx("div",{className:"card-glow"}),i.jsx("div",{className:"solution-icon",children:m.icon}),i.jsx("h3",{className:"solution-title",children:m.title}),i.jsx("p",{className:"solution-desc",children:m.description}),i.jsx("ul",{className:"solution-features",children:m.features.map((v,b)=>i.jsxs("li",{children:[i.jsx(uv,{}),i.jsx("span",{children:v})]},b))}),i.jsxs("button",{className:"card-btn",children:["Learn More ",i.jsx(De,{})]})]},g))})]}),i.jsxs("section",{className:"benefits-section",children:[i.jsx("div",{className:"section-header",children:i.jsxs("h2",{className:"section-title",children:["Why Choose ",i.jsx("span",{className:"highlight",children:"Our Cloud"})]})}),i.jsx("div",{className:"benefits-grid",children:p.map((m,g)=>i.jsxs("div",{className:"benefit-card",style:{animationDelay:`${g*.1}s`},children:[i.jsx("div",{className:"benefit-icon-wrapper",children:m.icon}),i.jsx("h3",{className:"benefit-title",children:m.title}),i.jsx("p",{className:"benefit-desc",children:m.desc})]},g))})]}),i.jsxs("section",{className:"providers-section",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Multi-Cloud ",i.jsx("span",{className:"highlight",children:"Platform"})]}),i.jsx("p",{className:"section-subtitle",children:"Deploy on any major cloud provider"})]}),i.jsx("div",{className:"providers-grid",children:u.map((m,g)=>i.jsxs("div",{className:"provider-card",style:{animationDelay:`${g*.1}s`,"--provider-color":m.color},children:[i.jsx("div",{className:"provider-logo",children:m.logo}),i.jsx("div",{className:"provider-name",children:m.name}),i.jsxs("div",{className:"provider-status",children:[i.jsx("div",{className:"status-dot"}),i.jsx("span",{children:"Available"})]})]},g))})]}),i.jsx("section",{className:"cta-section",children:i.jsxs("div",{className:"cta-container",children:[i.jsxs("div",{className:"cta-content",children:[i.jsx(Tf,{className:"cta-icon"}),i.jsx("h2",{className:"cta-title",children:"Ready to Move to the Cloud?"}),i.jsx("p",{className:"cta-text",children:"Start your cloud journey today and transform your business infrastructure"}),i.jsxs("div",{className:"cta-buttons",children:[i.jsxs("button",{className:"btn-cta-primary",children:[i.jsx(Gn,{}),"Start Free Trial"]}),i.jsxs("button",{className:"btn-cta-secondary",children:[i.jsx(fv,{}),"Schedule Demo"]})]})]}),i.jsxs("div",{className:"cta-visual",children:[i.jsx("div",{className:"pulse-ring ring-1"}),i.jsx("div",{className:"pulse-ring ring-2"}),i.jsx("div",{className:"pulse-ring ring-3"}),i.jsx("div",{className:"pulse-center",children:i.jsx(an,{})})]})]})}),i.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .cloud-solutions {
          background: #0a0a0f;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .particle-canvas {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          pointer-events: none;
          z-index: 0;
        }

        section {
          position: relative;
          z-index: 1;
          padding: 120px 24px;
          max-width: 1400px;
          margin: 0 auto;
        }

        /* Hero Section */
        .hero-section {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          padding-top: 140px;
        }

        .floating-badge {
          display: inline-flex;
          align-items: center;
          gap: 12px;
          padding: 12px 28px;
          background: rgba(88, 101, 242, 0.15);
          border: 1px solid rgba(88, 101, 242, 0.4);
          border-radius: 50px;
          font-weight: 600;
          font-size: 0.9rem;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
          box-shadow: 0 0 30px rgba(88, 101, 242, 0.3);
        }

        .badge-icon {
          font-size: 20px;
          color: #5865f2;
        }

        .hero-title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 28px;
          letter-spacing: -0.03em;
        }

        .title-line {
          display: block;
        }

        .title-gradient {
          display: block;
          background: linear-gradient(135deg, #5865f2 0%, #7289da 50%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          background-size: 200% auto;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-subtitle {
          font-size: 1.3rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 48px;
          max-width: 600px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }

        .btn-primary, .btn-secondary {
          padding: 18px 32px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .btn-primary {
          background: linear-gradient(135deg, #5865f2, #7289da);
          color: white;
          box-shadow: 0 10px 40px rgba(88, 101, 242, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(88, 101, 242, 0.6);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(88, 101, 242, 0.5);
          transform: translateY(-3px);
        }

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 24px;
        }

        .stat-card {
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: fadeInUp 0.6s ease backwards;
          transition: all 0.3s ease;
        }

        .stat-card:hover {
          transform: translateY(-5px);
          background: rgba(88, 101, 242, 0.1);
          border-color: rgba(88, 101, 242, 0.4);
          box-shadow: 0 10px 30px rgba(88, 101, 242, 0.3);
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .stat-icon {
          font-size: 32px;
          color: #5865f2;
          margin-bottom: 12px;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 900;
          background: linear-gradient(135deg, #5865f2, #7289da);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          font-weight: 600;
        }

        /* 3D Cloud Visualization */
        .hero-visual {
          position: relative;
          height: 600px;
          display: flex;
          align-items: center;
          justify-content: center;
          perspective: 1500px;
        }

        .cloud-center {
          width: 200px;
          height: 200px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(88, 101, 242, 0.2), rgba(139, 92, 246, 0.2));
          border: 2px solid rgba(88, 101, 242, 0.4);
          border-radius: 50%;
          font-size: 80px;
          color: #5865f2;
          box-shadow: 
            0 0 60px rgba(88, 101, 242, 0.4),
            inset 0 0 60px rgba(88, 101, 242, 0.2);
          animation: pulse 3s ease-in-out infinite;
          backdrop-filter: blur(10px);
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .cloud-orbit {
          position: absolute;
          border: 1px dashed rgba(88, 101, 242, 0.2);
          border-radius: 50%;
          animation: rotate 20s linear infinite;
        }

        .orbit-1 {
          width: 400px;
          height: 400px;
        }

        .orbit-2 {
          width: 300px;
          height: 300px;
          animation-duration: 15s;
          animation-direction: reverse;
        }

        @keyframes rotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .orbit-node {
          position: absolute;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(10, 10, 15, 0.9);
          border: 2px solid rgba(88, 101, 242, 0.5);
          border-radius: 50%;
          font-size: 28px;
          color: #5865f2;
          box-shadow: 0 0 30px rgba(88, 101, 242, 0.5);
          backdrop-filter: blur(10px);
          animation: float 3s ease-in-out infinite;
        }

        .node-1 { top: 0; left: 50%; transform: translateX(-50%); animation-delay: 0s; }
        .node-2 { top: 50%; right: 0; transform: translateY(-50%); animation-delay: 0.5s; }
        .node-3 { bottom: 0; left: 50%; transform: translateX(-50%); animation-delay: 1s; }
        .node-4 { top: 0; left: 50%; transform: translateX(-50%); animation-delay: 0.3s; }
        .node-5 { bottom: 0; left: 50%; transform: translateX(-50%); animation-delay: 0.8s; }

        @keyframes float {
          0%, 100% { transform: translate(-50%, 0); }
          50% { transform: translate(-50%, -10px); }
        }

        /* Solutions Section */
        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(36px, 5vw, 56px);
          font-weight: 900;
          margin-bottom: 16px;
        }

        .highlight {
          color: #5865f2;
        }

        .section-subtitle {
          font-size: 1.25rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .solutions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .solution-card {
          position: relative;
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          backdrop-filter: blur(10px);
          overflow: hidden;
          animation: fadeInUp 0.8s ease backwards;
          transition: all 0.4s ease;
        }

        .solution-card:hover {
          transform: translateY(-10px);
          border-color: rgba(88, 101, 242, 0.5);
          box-shadow: 0 20px 60px rgba(88, 101, 242, 0.3);
        }

        .solution-card:hover .card-glow {
          opacity: 1;
        }

        .card-glow {
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, rgba(88, 101, 242, 0.15), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .solution-icon {
          font-size: 48px;
          color: #5865f2;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .solution-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 16px;
          position: relative;
          z-index: 1;
        }

        .solution-desc {
          font-size: 1.1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .solution-features {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
        }

        .solution-features li {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .solution-features li svg {
          color: #5865f2;
          font-size: 18px;
          flex-shrink: 0;
        }

        .card-btn {
          padding: 14px 28px;
          background: rgba(88, 101, 242, 0.15);
          border: 1px solid #5865f2;
          border-radius: 10px;
          color: white;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
        }

        .card-btn:hover {
          background: #5865f2;
          transform: translateX(5px);
        }

        /* Benefits Section */
        .benefits-section {
          background: rgba(255, 255, 255, 0.01);
        }

        .benefits-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 28px;
        }

        .benefit-card {
          padding: 36px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: fadeInUp 0.8s ease backwards;
          transition: all 0.3s ease;
        }

        .benefit-card:hover {
          transform: translateY(-8px);
          background: rgba(88, 101, 242, 0.08);
          border-color: rgba(88, 101, 242, 0.4);
          box-shadow: 0 15px 40px rgba(88, 101, 242, 0.25);
        }

        .benefit-icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(88, 101, 242, 0.15), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(88, 101, 242, 0.3);
          border-radius: 50%;
          font-size: 36px;
          color: #5865f2;
          transition: all 0.3s ease;
        }

        .benefit-card:hover .benefit-icon-wrapper {
          transform: scale(1.1) rotate(10deg);
          box-shadow: 0 0 40px rgba(88, 101, 242, 0.4);
        }

        .benefit-title {
          font-size: 1.4rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .benefit-desc {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.65);
        }

        /* Providers Section */
        .providers-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 32px;
        }

        .provider-card {
          padding: 48px 32px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: fadeInUp 0.8s ease backwards;
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .provider-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 0%, var(--provider-color, #5865f2), transparent 70%);
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .provider-card:hover {
          transform: translateY(-10px);
          border-color: var(--provider-color, #5865f2);
          box-shadow: 0 20px 50px rgba(88, 101, 242, 0.3);
        }

        .provider-card:hover::before {
          opacity: 0.15;
        }

        .provider-logo {
          font-size: 64px;
          margin-bottom: 24px;
          filter: drop-shadow(0 0 20px var(--provider-color, #5865f2));
        }

        .provider-name {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 16px;
        }

        .provider-status {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .status-dot {
          width: 8px;
          height: 8px;
          background: #10b981;
          border-radius: 50%;
          animation: statusPulse 2s ease-in-out infinite;
        }

        @keyframes statusPulse {
          0%, 100% { opacity: 1; box-shadow: 0 0 10px #10b981; }
          50% { opacity: 0.5; box-shadow: 0 0 20px #10b981; }
        }

        /* CTA Section */
        .cta-section {
          padding: 140px 24px;
          background: linear-gradient(135deg, rgba(88, 101, 242, 0.05), rgba(139, 92, 246, 0.05));
        }

        .cta-container {
          max-width: 1200px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
          padding: 80px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(88, 101, 242, 0.3);
          border-radius: 32px;
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
        }

        .cta-container::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 30% 30%, rgba(88, 101, 242, 0.15), transparent 60%);
        }

        .cta-content {
          position: relative;
          z-index: 1;
        }

        .cta-icon {
          font-size: 56px;
          color: #5865f2;
          margin-bottom: 24px;
          animation: bounce 2s ease-in-out infinite;
        }

        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .cta-title {
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 900;
          margin-bottom: 20px;
        }

        .cta-text {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 40px;
        }

        .cta-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
        }

        .btn-cta-primary, .btn-cta-secondary {
          padding: 18px 36px;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
        }

        .btn-cta-primary {
          background: linear-gradient(135deg, #5865f2, #7289da);
          color: white;
          box-shadow: 0 10px 40px rgba(88, 101, 242, 0.4);
        }

        .btn-cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(88, 101, 242, 0.6);
        }

        .btn-cta-secondary {
          background: rgba(139, 92, 246, 0.2);
          color: white;
          border: 2px solid #8b5cf6;
        }

        .btn-cta-secondary:hover {
          background: #8b5cf6;
          transform: translateY(-3px);
        }

        .cta-visual {
          position: relative;
          height: 400px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pulse-ring {
          position: absolute;
          border: 2px solid rgba(88, 101, 242, 0.3);
          border-radius: 50%;
          animation: pulseRing 3s ease-out infinite;
        }

        .ring-1 {
          width: 300px;
          height: 300px;
          animation-delay: 0s;
        }

        .ring-2 {
          width: 350px;
          height: 350px;
          animation-delay: 1s;
        }

        .ring-3 {
          width: 400px;
          height: 400px;
          animation-delay: 2s;
        }

        @keyframes pulseRing {
          0% {
            transform: scale(0.5);
            opacity: 0;
          }
          50% {
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0;
          }
        }

        .pulse-center {
          width: 180px;
          height: 180px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, rgba(88, 101, 242, 0.3), rgba(139, 92, 246, 0.3));
          border: 3px solid rgba(88, 101, 242, 0.5);
          border-radius: 50%;
          font-size: 72px;
          color: #5865f2;
          box-shadow: 
            0 0 60px rgba(88, 101, 242, 0.5),
            inset 0 0 40px rgba(88, 101, 242, 0.3);
          animation: pulse 3s ease-in-out infinite;
          backdrop-filter: blur(10px);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-section {
            grid-template-columns: 1fr;
            gap: 60px;
            padding-top: 100px;
          }

          .hero-visual {
            height: 500px;
          }

          .stats-grid {
            grid-template-columns: repeat(2, 1fr);
          }

          .cta-container {
            grid-template-columns: 1fr;
            gap: 60px;
            padding: 60px 40px;
          }

          .cta-visual {
            height: 350px;
          }

          .ring-1 { width: 250px; height: 250px; }
          .ring-2 { width: 300px; height: 300px; }
          .ring-3 { width: 350px; height: 350px; }
          .pulse-center { width: 150px; height: 150px; font-size: 60px; }
        }

        @media (max-width: 768px) {
          section {
            padding: 80px 20px;
          }

          .hero-title {
            font-size: 40px;
          }

          .hero-subtitle {
            font-size: 1.15rem;
          }

          .hero-buttons {
            flex-direction: column;
            align-items: stretch;
          }

          .btn-primary, .btn-secondary {
            justify-content: center;
          }

          .stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .hero-visual {
            height: 400px;
          }

          .cloud-center {
            width: 150px;
            height: 150px;
            font-size: 60px;
          }

          .orbit-1 {
            width: 300px;
            height: 300px;
          }

          .orbit-2 {
            width: 220px;
            height: 220px;
          }

          .orbit-node {
            width: 50px;
            height: 50px;
            font-size: 24px;
          }

          .solutions-grid {
            grid-template-columns: 1fr;
          }

          .benefits-grid {
            grid-template-columns: 1fr;
          }

          .providers-grid {
            grid-template-columns: 1fr;
          }

          .cta-container {
            padding: 40px 24px;
          }

          .cta-title {
            font-size: 32px;
          }

          .cta-text {
            font-size: 1.1rem;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .btn-cta-primary, .btn-cta-secondary {
            justify-content: center;
          }

          .cta-visual {
            height: 300px;
          }

          .ring-1 { width: 200px; height: 200px; }
          .ring-2 { width: 240px; height: 240px; }
          .ring-3 { width: 280px; height: 280px; }
          .pulse-center { width: 130px; height: 130px; font-size: 52px; }
        }

        @media (max-width: 480px) {
          .hero-title {
            font-size: 32px;
          }

          .floating-badge {
            font-size: 0.85rem;
            padding: 10px 20px;
          }

          .section-title {
            font-size: 32px;
          }

          .section-subtitle {
            font-size: 1.05rem;
          }

          .solution-card {
            padding: 32px 24px;
          }

          .benefit-card {
            padding: 28px;
          }

          .benefit-icon-wrapper {
            width: 70px;
            height: 70px;
            font-size: 32px;
          }

          .provider-card {
            padding: 36px 24px;
          }

          .provider-logo {
            font-size: 52px;
          }

          .cta-icon {
            font-size: 48px;
          }

          .hero-visual {
            height: 350px;
          }

          .cloud-center {
            width: 120px;
            height: 120px;
            font-size: 48px;
          }

          .orbit-1 {
            width: 250px;
            height: 250px;
          }

          .orbit-2 {
            width: 180px;
            height: 180px;
          }

          .orbit-node {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }
        }
      `})]})},Bj=()=>i.jsxs("div",{children:[i.jsx("h1",{children:"DevOps Services"}),i.jsx("p",{children:"Here you can find our DevOps services."})]}),_j=()=>{const[e,n]=j.useState(0),[s,a]=j.useState(0),[l,c]=j.useState(null),[u,f]=j.useState({x:0,y:0});j.useEffect(()=>{const b=()=>a(window.scrollY),y=S=>{f({x:S.clientX,y:S.clientY})};return window.addEventListener("scroll",b),window.addEventListener("mousemove",y),()=>{window.removeEventListener("scroll",b),window.removeEventListener("mousemove",y)}},[]),j.useEffect(()=>{const b=setInterval(()=>{n(y=>(y+1)%m.length)},5e3);return()=>clearInterval(b)},[]);const p=[{icon:i.jsx(lt,{}),title:"Penetration Testing",description:"Comprehensive security assessments to identify vulnerabilities before attackers do",features:["Network Testing","Web App Testing","Social Engineering","Physical Security"]},{icon:i.jsx(cs,{}),title:"Security Audits",description:"In-depth analysis of your security posture and compliance requirements",features:["Policy Review","Access Control","Compliance Check","Risk Assessment"]},{icon:i.jsx(es,{}),title:"Threat Monitoring",description:"24/7 real-time threat detection and incident response services",features:["SIEM Integration","Real-time Alerts","Incident Response","Forensic Analysis"]},{icon:i.jsx(Gn,{}),title:"Cloud Security",description:"Secure your cloud infrastructure across AWS, Azure, and Google Cloud",features:["Cloud Audit","Configuration","Data Encryption","Access Management"]},{icon:i.jsx(Zi,{}),title:"Data Protection",description:"Safeguard sensitive data with encryption and access controls",features:["Data Encryption","DLP Solutions","Backup Security","Privacy Compliance"]},{icon:i.jsx(yi,{}),title:"Network Security",description:"Protect your network infrastructure from cyber threats",features:["Firewall Config","VPN Setup","Network Segmentation","IDS/IPS"]}],m=[{title:"Ransomware Protection",description:"Advanced defense against ransomware attacks",impact:"99.9% Detection Rate",image:"https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&h=600&fit=crop"},{title:"DDoS Mitigation",description:"Real-time protection against distributed attacks",impact:"500Gbps+ Capacity",image:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop"},{title:"Zero-Day Threats",description:"AI-powered detection of unknown vulnerabilities",impact:"< 1min Response Time",image:"https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&h=600&fit=crop"},{title:"Insider Threats",description:"Behavioral analysis to detect malicious insiders",impact:"95% Prevention Rate",image:"https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=800&h=600&fit=crop"}],g=[{icon:i.jsx(Xe,{}),value:"1000+",label:"Protected Clients"},{icon:i.jsx(Gt,{}),value:"15+",label:"Industry Certifications"},{icon:i.jsx(Ke,{}),value:"99.9%",label:"Uptime Guarantee"}],v=[{name:"Metasploit",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",description:"Penetration testing"},{name:"Wireshark",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",description:"Network analysis"},{name:"Burp Suite",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/chrome/chrome-original.svg",description:"Web app security"},{name:"Nmap",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg",description:"Network scanning"},{name:"Splunk",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg",description:"SIEM platform"},{name:"Nessus",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg",description:"Vulnerability scanner"}];return i.jsxs("div",{className:"cyber-page",children:[i.jsxs("div",{className:"cyber-bg",children:[i.jsx("div",{className:"matrix-rain"}),i.jsx("div",{className:"cyber-grid"}),i.jsxs("div",{className:"glow-orbs",children:[i.jsx("div",{className:"orb orb-1",style:{transform:`translate(${u.x*.02}px, ${u.y*.02}px)`}}),i.jsx("div",{className:"orb orb-2",style:{transform:`translate(${-u.x*.01}px, ${-u.y*.01}px)`}}),i.jsx("div",{className:"orb orb-3",style:{transform:`translate(${u.x*.015}px, ${-u.y*.015}px)`}})]}),i.jsx("div",{className:"scan-lines"})]}),i.jsx("section",{className:"hero-section",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"hero-content",children:[i.jsxs("div",{className:"hero-text",children:[i.jsxs("div",{className:"hero-badge",children:[i.jsx(lt,{}),i.jsx("span",{children:"Enterprise Cybersecurity"})]}),i.jsxs("h1",{className:"hero-title",children:["Defend Your Digital ",i.jsx("span",{className:"gradient-text",children:"Assets"})," With Advanced Security"]}),i.jsx("p",{className:"hero-description",children:"Comprehensive cybersecurity solutions to protect your business from evolving threats. Our expert team provides 24/7 monitoring, threat intelligence, and incident response."}),i.jsxs("div",{className:"hero-buttons",children:[i.jsxs("button",{className:"btn-primary",children:["Get Security Audit",i.jsx(De,{})]}),i.jsxs("button",{className:"btn-secondary",children:["View Services",i.jsx(es,{})]})]}),i.jsx("div",{className:"hero-stats",children:g.map((b,y)=>i.jsxs("div",{className:"stat-item",children:[i.jsx("div",{className:"stat-icon",children:b.icon}),i.jsxs("div",{className:"stat-details",children:[i.jsx("div",{className:"stat-value",children:b.value}),i.jsx("div",{className:"stat-label",children:b.label})]})]},y))})]}),i.jsx("div",{className:"hero-visual",children:i.jsxs("div",{className:"shield-animation",children:[i.jsx("div",{className:"shield-core",children:i.jsx(lt,{})}),i.jsx("div",{className:"shield-ring ring-1"}),i.jsx("div",{className:"shield-ring ring-2"}),i.jsx("div",{className:"shield-ring ring-3"}),i.jsx("div",{className:"data-particle p1",children:i.jsx(cs,{})}),i.jsx("div",{className:"data-particle p2",children:i.jsx(_e,{})}),i.jsx("div",{className:"data-particle p3",children:i.jsx(ls,{})}),i.jsx("div",{className:"data-particle p4",children:i.jsx(tr,{})})]})})]})})}),i.jsx("section",{className:"threat-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:[i.jsx("span",{className:"gradient-text",children:"Threat Protection"})," Coverage"]}),i.jsx("p",{className:"section-subtitle",children:"Comprehensive defense against modern cyber threats"})]}),i.jsx("div",{className:"threat-carousel",children:i.jsx("div",{className:"carousel-track",style:{transform:`translateX(-${e*100}%)`},children:m.map((b,y)=>i.jsx("div",{className:"threat-slide",children:i.jsxs("div",{className:"threat-image",children:[i.jsx("img",{src:b.image,alt:b.title}),i.jsx("div",{className:"threat-overlay",children:i.jsxs("div",{className:"threat-content",children:[i.jsx("h3",{children:b.title}),i.jsx("p",{children:b.description}),i.jsxs("div",{className:"threat-impact",children:[i.jsx(it,{}),i.jsx("span",{children:b.impact})]})]})})]})},y))})}),i.jsx("div",{className:"carousel-dots",children:m.map((b,y)=>i.jsx("button",{className:`dot ${e===y?"active":""}`,onClick:()=>n(y)},y))})]})}),i.jsx("section",{className:"services-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Our ",i.jsx("span",{className:"gradient-text",children:"Security Services"})]}),i.jsx("p",{className:"section-subtitle",children:"End-to-end cybersecurity solutions for your business"})]}),i.jsx("div",{className:"services-grid",children:p.map((b,y)=>i.jsxs("div",{className:"service-card",onMouseEnter:()=>c(y),onMouseLeave:()=>c(null),children:[i.jsx("div",{className:"service-icon-wrapper",children:i.jsx("div",{className:"service-icon",children:b.icon})}),i.jsx("h3",{children:b.title}),i.jsx("p",{children:b.description}),l===y&&i.jsx("div",{className:"service-features",children:b.features.map((S,N)=>i.jsxs("div",{className:"feature-item",children:[i.jsx(it,{}),i.jsx("span",{children:S})]},N))})]},y))})]})}),i.jsx("section",{className:"tools-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:[i.jsx("span",{className:"gradient-text",children:"Tools"})," We Master"]}),i.jsx("p",{className:"section-subtitle",children:"Industry-leading security tools and frameworks"})]}),i.jsx("div",{className:"tools-grid",children:v.map((b,y)=>i.jsxs("div",{className:"tool-card",children:[i.jsx("div",{className:"tool-icon-wrapper",children:i.jsx("img",{src:b.icon,alt:b.name})}),i.jsx("h4",{children:b.name}),i.jsx("p",{children:b.description})]},y))})]})}),i.jsx("section",{className:"process-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Our ",i.jsx("span",{className:"gradient-text",children:"Security Process"})]}),i.jsx("p",{className:"section-subtitle",children:"A systematic approach to protecting your business"})]}),i.jsx("div",{className:"process-grid",children:[{step:"01",title:"Assessment",desc:"Comprehensive security audit and vulnerability assessment",icon:i.jsx(es,{})},{step:"02",title:"Strategy",desc:"Custom security roadmap tailored to your business",icon:i.jsx(an,{})},{step:"03",title:"Implementation",desc:"Deploy security controls and monitoring systems",icon:i.jsx(yi,{})},{step:"04",title:"Monitoring",desc:"24/7 threat detection and real-time alerts",icon:i.jsx(ls,{})},{step:"05",title:"Response",desc:"Rapid incident response and threat mitigation",icon:i.jsx(_e,{})},{step:"06",title:"Optimization",desc:"Continuous improvement and security updates",icon:i.jsx(Ke,{})}].map((b,y)=>i.jsxs("div",{className:"process-card",children:[i.jsx("div",{className:"process-number",children:b.step}),i.jsx("div",{className:"process-icon",children:b.icon}),i.jsx("h3",{children:b.title}),i.jsx("p",{children:b.desc})]},y))})]})}),i.jsx("section",{className:"cta-section",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"cta-box",children:[i.jsx("div",{className:"cta-glow"}),i.jsx(lt,{className:"cta-icon"}),i.jsx("h2",{children:"Ready to Secure Your Business?"}),i.jsx("p",{children:"Get a free security assessment and discover vulnerabilities before attackers do."}),i.jsxs("div",{className:"cta-buttons",children:[i.jsxs("button",{className:"btn-primary",children:["Schedule Consultation",i.jsx(De,{})]}),i.jsxs("button",{className:"btn-secondary",children:["Contact Security Team",i.jsx(Nd,{})]})]})]})})}),i.jsx(Ot,{}),i.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .cyber-page {
          background: #000000;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          overflow-x: hidden;
        }

        .cyber-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .matrix-rain {
          position: absolute;
          inset: 0;
          background: 
            linear-gradient(transparent 30%, rgba(0, 255, 65, 0.03) 70%),
            repeating-linear-gradient(
              0deg,
              transparent,
              transparent 2px,
              rgba(0, 255, 65, 0.03) 4px
            );
          animation: matrixScroll 20s linear infinite;
        }

        @keyframes matrixScroll {
          from { background-position: 0 0; }
          to { background-position: 0 100px; }
        }

        .cyber-grid {
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(0deg, rgba(0, 255, 65, 0.05) 0px, transparent 1px, transparent 40px, rgba(0, 255, 65, 0.05) 41px),
            repeating-linear-gradient(90deg, rgba(0, 255, 65, 0.05) 0px, transparent 1px, transparent 40px, rgba(0, 255, 65, 0.05) 41px);
          transform: perspective(500px) rotateX(60deg);
          transform-origin: center bottom;
        }

        .glow-orbs {
          position: absolute;
          inset: 0;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
          transition: transform 0.3s ease-out;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: #00ff41;
          top: -250px;
          left: -250px;
          animation: pulse 8s ease-in-out infinite;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: #ff0055;
          bottom: -200px;
          right: -200px;
          animation: pulse 6s ease-in-out infinite;
          animation-delay: -3s;
        }

        .orb-3 {
          width: 450px;
          height: 450px;
          background: #00d4ff;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation: pulse 10s ease-in-out infinite;
          animation-delay: -6s;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 0.3; }
          50% { transform: scale(1.2); opacity: 0.2; }
        }

        .scan-lines {
          position: absolute;
          inset: 0;
          background: repeating-linear-gradient(
            0deg,
            rgba(0, 255, 65, 0.03) 0px,
            transparent 2px,
            transparent 4px,
            rgba(0, 255, 65, 0.03) 6px
          );
          animation: scanMove 8s linear infinite;
        }

        @keyframes scanMove {
          from { transform: translateY(0); }
          to { transform: translateY(6px); }
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .hero-section {
          padding: 120px 0 100px;
          min-height: 100vh;
          display: flex;
          align-items: center;
        }

        .hero-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 80px;
          align-items: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 10px 20px;
          background: rgba(0, 255, 65, 0.1);
          border: 1px solid rgba(0, 255, 65, 0.3);
          border-radius: 50px;
          font-size: 0.9rem;
          font-weight: 600;
          color: #00ff41;
          margin-bottom: 24px;
          backdrop-filter: blur(10px);
        }

        .hero-title {
          font-size: clamp(40px, 6vw, 72px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 24px;
          letter-spacing: -0.02em;
        }

        .gradient-text {
          background: linear-gradient(135deg, #00ff41, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 40px;
        }

        .hero-buttons {
          display: flex;
          gap: 16px;
          flex-wrap: wrap;
          margin-bottom: 60px;
        }

        .btn-primary,
        .btn-secondary {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .btn-primary {
          background: linear-gradient(135deg, #00ff41, #00d4ff);
          color: #000;
          box-shadow: 0 10px 30px rgba(0, 255, 65, 0.4);
        }

        .btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 255, 65, 0.6);
        }

        .btn-secondary {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(0, 255, 65, 0.3);
          color: white;
          backdrop-filter: blur(10px);
        }

        .btn-secondary:hover {
          background: rgba(0, 255, 65, 0.1);
          border-color: rgba(0, 255, 65, 0.5);
          transform: translateY(-3px);
        }

        .hero-stats {
          display: flex;
          gap: 40px;
          flex-wrap: wrap;
        }

        .stat-item {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .stat-icon {
          width: 50px;
          height: 50px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00ff41, #00d4ff);
          border-radius: 12px;
          font-size: 24px;
          color: #000;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 900;
          line-height: 1;
        }

        .stat-label {
          font-size: 0.85rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .shield-animation {
          position: relative;
          width: 300px;
          height: 300px;
          animation: float 6s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0) rotateY(0deg); }
          50% { transform: translateY(-20px) rotateY(180deg); }
        }

        .shield-core {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 100px;
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00ff41, #00d4ff);
          border-radius: 20px;
          font-size: 50px;
          color: #000;
          box-shadow: 0 0 60px rgba(0, 255, 65, 0.6);
          z-index: 10;
        }

        .shield-ring {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          border: 2px solid rgba(0, 255, 65, 0.3);
          border-radius: 50%;
          animation: ringPulse 3s ease-in-out infinite;
        }

        .ring-1 {
          width: 150px;
          height: 150px;
          animation-delay: 0s;
        }

        .ring-2 {
          width: 200px;
          height: 200px;
          animation-delay: -1s;
        }

        .ring-3 {
          width: 250px;
          height: 250px;
          animation-delay: -2s;
        }

        @keyframes ringPulse {
          0%, 100% { 
            transform: translate(-50%, -50%) scale(1);
            opacity: 0.3;
          }
          50% { 
            transform: translate(-50%, -50%) scale(1.2);
            opacity: 0.1;
          }
        }

        .data-particle {
          position: absolute;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 255, 65, 0.2);
          border: 1px solid rgba(0, 255, 65, 0.5);
          border-radius: 8px;
          font-size: 20px;
          color: #00ff41;
          backdrop-filter: blur(10px);
          animation: particleOrbit 8s linear infinite;
        }

        .p1 {
          animation-delay: 0s;
        }

        .p2 {
          animation-delay: -2s;
        }

        .p3 {
          animation-delay: -4s;
        }

        .p4 {
          animation-delay: -6s;
        }

        @keyframes particleOrbit {
          from {
            transform: rotate(0deg) translateX(150px) rotate(0deg);
          }
          to {
            transform: rotate(360deg) translateX(150px) rotate(-360deg);
          }
        }

        .threat-section,
        .services-section,
        .tools-section,
        .process-section {
          padding: 100px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 900;
          margin-bottom: 16px;
        }

        .section-subtitle {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .threat-carousel {
          max-width: 900px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 24px;
        }

        .carousel-track {
          display: flex;
          transition: transform 0.6s ease-in-out;
        }

        .threat-slide {
          min-width: 100%;
        }

        .threat-image {
          position: relative;
          height: 500px;
          overflow: hidden;
          border-radius: 24px;
        }

        .threat-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .threat-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(to top, rgba(0, 0, 0, 0.95), transparent);
          display: flex;
          align-items: flex-end;
          padding: 40px;
        }

        .threat-content h3 {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 12px;
        }

        .threat-content p {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 20px;
        }

        .threat-impact {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          background: rgba(0, 255, 65, 0.2);
          border: 1px solid rgba(0, 255, 65, 0.4);
          border-radius: 8px;
          font-size: 1.1rem;
          font-weight: 700;
          color: #00ff41;
          width: fit-content;
        }

        .carousel-dots {
          display: flex;
          gap: 12px;
          justify-content: center;
          margin-top: 40px;
        }

        .dot {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.3);
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .dot:hover {
          background: rgba(0, 255, 65, 0.5);
        }

        .dot.active {
          width: 40px;
          border-radius: 6px;
          background: linear-gradient(135deg, #00ff41, #00d4ff);
        }

        .services-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 32px;
        }

        .service-card {
          padding: 40px 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(0, 255, 65, 0.2);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          cursor: pointer;
          min-height: 320px;
        }

        .service-card:hover {
          transform: translateY(-10px) scale(1.02);
          background: rgba(0, 255, 65, 0.05);
          border-color: rgba(0, 255, 65, 0.5);
          box-shadow: 0 20px 60px rgba(0, 255, 65, 0.3);
        }

        .service-icon-wrapper {
          margin-bottom: 24px;
        }

        .service-icon {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #00ff41, #00d4ff);
          border-radius: 16px;
          font-size: 32px;
          color: #000;
          box-shadow: 0 10px 30px rgba(0, 255, 65, 0.4);
          animation: iconFloat 3s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .service-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 16px;
        }

        .service-card > p {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 20px;
        }

        .service-features {
          animation: fadeInUp 0.4s ease-out;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 0;
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.8);
        }

        .feature-item svg {
          color: #00ff41;
          font-size: 18px;
          flex-shrink: 0;
        }

        .tools-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 32px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .tool-card {
          padding: 40px 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(0, 255, 65, 0.2);
          border-radius: 20px;
          text-align: center;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .tool-card:hover {
          transform: translateY(-10px) rotateY(10deg);
          background: rgba(0, 255, 65, 0.05);
          border-color: rgba(0, 255, 65, 0.5);
          box-shadow: 0 20px 60px rgba(0, 255, 65, 0.3);
        }

        .tool-icon-wrapper {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 255, 65, 0.1);
          border: 2px solid rgba(0, 255, 65, 0.3);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .tool-card:hover .tool-icon-wrapper {
          transform: scale(1.1) rotateZ(360deg);
          background: rgba(0, 255, 65, 0.2);
        }

        .tool-icon-wrapper img {
          width: 50px;
          height: 50px;
          object-fit: contain;
          filter: brightness(0) invert(1);
        }

        .tool-card h4 {
          font-size: 1.3rem;
          font-weight: 800;
          margin-bottom: 8px;
        }

        .tool-card p {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .process-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .process-card {
          padding: 40px 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(0, 255, 65, 0.2);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          position: relative;
          overflow: hidden;
        }

        .process-card::before {
          content: '';
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(0, 255, 65, 0.1), transparent);
          transform: rotate(45deg);
          transition: all 0.6s ease;
        }

        .process-card:hover::before {
          transform: rotate(45deg) translateY(100%);
        }

        .process-card:hover {
          transform: translateY(-10px);
          background: rgba(0, 255, 65, 0.05);
          border-color: rgba(0, 255, 65, 0.5);
          box-shadow: 0 20px 60px rgba(0, 255, 65, 0.3);
        }

        .process-number {
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(135deg, #00ff41, #00d4ff);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
          margin-bottom: 16px;
        }

        .process-icon {
          font-size: 48px;
          color: #00ff41;
          margin-bottom: 20px;
        }

        .process-card h3 {
          font-size: 1.5rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .process-card p {
          font-size: 1rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        .cta-section {
          padding: 100px 0 120px;
        }

        .cta-box {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(0, 255, 65, 0.3);
          border-radius: 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .cta-glow {
          position: absolute;
          inset: -50%;
          background: linear-gradient(135deg, #00ff41, #00d4ff);
          opacity: 0.15;
          filter: blur(80px);
          animation: glowRotate 10s linear infinite;
        }

        @keyframes glowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .cta-icon {
          font-size: 64px;
          color: #00ff41;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
          animation: shieldPulse 2s ease-in-out infinite;
        }

        @keyframes shieldPulse {
          0%, 100% { 
            transform: scale(1);
            filter: drop-shadow(0 0 20px rgba(0, 255, 65, 0.5));
          }
          50% { 
            transform: scale(1.1);
            filter: drop-shadow(0 0 40px rgba(0, 255, 65, 0.8));
          }
        }

        .cta-box h2 {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 900;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .cta-box p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }

        .cta-buttons {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        @media (max-width: 992px) {
          .hero-content {
            grid-template-columns: 1fr;
            gap: 60px;
          }

          .hero-visual {
            order: -1;
          }

          .shield-animation {
            width: 250px;
            height: 250px;
          }

          .services-grid {
            grid-template-columns: 1fr;
          }

          .process-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 80px 0 60px;
          }

          .hero-title {
            font-size: 36px;
          }

          .hero-description {
            font-size: 1rem;
          }

          .hero-buttons {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
            justify-content: center;
          }

          .hero-stats {
            flex-direction: column;
            gap: 20px;
          }

          .threat-image {
            height: 400px;
          }

          .threat-content h3 {
            font-size: 1.8rem;
          }

          .tools-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
          }

          .process-grid {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .cta-box {
            padding: 60px 32px;
          }

          .cta-buttons {
            flex-direction: column;
          }

          .btn-primary,
          .btn-secondary {
            width: 100%;
          }
        }

        @media (max-width: 480px) {
          .hero-badge {
            font-size: 0.8rem;
            padding: 8px 16px;
          }

          .hero-title {
            font-size: 28px;
          }

          .shield-animation {
            width: 200px;
            height: 200px;
          }

          .shield-core {
            width: 80px;
            height: 80px;
            font-size: 40px;
          }

          .section-title {
            font-size: 28px;
          }

          .section-subtitle {
            font-size: 1rem;
          }

          .threat-image {
            height: 300px;
          }

          .threat-content {
            padding: 20px;
          }

          .threat-content h3 {
            font-size: 1.5rem;
          }

          .tools-grid {
            grid-template-columns: 1fr;
          }

          .cta-icon {
            font-size: 48px;
          }
        }
      `})]})},Wj=()=>i.jsxs("div",{children:[i.jsx("h1",{children:"Digital Marketing"}),i.jsx("p",{children:"Here you can find our digital marketing services."})]}),Uj=()=>{const e=uo(),[n]=Z5(),s=n.get("category"),[a,l]=j.useState(s||"ios"),[c,u]=j.useState(0),[f,p]=j.useState(0);j.useEffect(()=>{s&&(s==="ios"||s==="android"||s==="cross-platform"||s==="enterprise")&&l(s)},[s]),j.useEffect(()=>{const b=()=>u(window.scrollY);return window.addEventListener("scroll",b),()=>window.removeEventListener("scroll",b)},[]),j.useEffect(()=>{const b=setInterval(()=>{p(y=>(y+1)%m[a].features.length)},4e3);return()=>clearInterval(b)},[a]);const m={ios:{title:"Native iOS Development",subtitle:"Build powerful apps for iPhone, iPad, and Apple Watch",description:"Create stunning iOS applications using Swift and SwiftUI with the latest Apple technologies. Our expert team delivers premium experiences that Apple users love.",icon:i.jsx(tn,{}),color:"#007AFF",gradient:"linear-gradient(135deg, #007AFF, #5AC8FA)",features:[{icon:i.jsx(wn,{}),title:"Swift & SwiftUI",desc:"Modern Swift language with declarative SwiftUI framework for beautiful, performant apps"},{icon:i.jsx(Rt,{}),title:"iOS Ecosystem",desc:"Full integration with iCloud, Apple Pay, HealthKit, ARKit, and Core ML"},{icon:i.jsx(lt,{}),title:"App Store Ready",desc:"Complete App Store optimization and compliance with Apple guidelines"},{icon:i.jsx(tr,{}),title:"Performance",desc:"Metal graphics, Core Animation, and optimized code for smooth 60fps experiences"}],technologies:[{name:"Swift",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/swift/swift-original.svg"},{name:"Xcode",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/xcode/xcode-original.svg"},{name:"Objective-C",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/objectivec/objectivec-plain.svg"}],benefits:["Premium user experience with native iOS design","Access to latest iOS features and APIs","Superior performance and battery efficiency","Seamless Apple ecosystem integration","High-quality App Store presence"],process:[{step:"01",title:"Requirements",desc:"Define iOS-specific features and Apple guidelines"},{step:"02",title:"UI/UX Design",desc:"Create beautiful interfaces following Apple HIG"},{step:"03",title:"Development",desc:"Build with Swift and latest iOS frameworks"},{step:"04",title:"Testing",desc:"Rigorous testing on all iOS devices"},{step:"05",title:"Deployment",desc:"App Store submission and launch"}],stats:[{icon:i.jsx(Xe,{}),value:"1.5B+",label:"iOS Users Worldwide"},{icon:i.jsx(Jr,{}),value:"$85B",label:"App Store Revenue"},{icon:i.jsx(Gt,{}),value:"4.7★",label:"Average App Rating"}]},android:{title:"Native Android Development",subtitle:"Reach billions with powerful Android applications",description:"Build feature-rich Android apps using Kotlin and Jetpack Compose. Leverage Google's powerful ecosystem and reach the world's largest mobile platform.",icon:i.jsx(tn,{}),color:"#3DDC84",gradient:"linear-gradient(135deg, #3DDC84, #07C160)",features:[{icon:i.jsx(wn,{}),title:"Kotlin & Jetpack",desc:"Modern Kotlin with Jetpack Compose for efficient, maintainable Android apps"},{icon:i.jsx(Rt,{}),title:"Material Design",desc:"Beautiful Material Design 3 with dynamic theming and modern components"},{icon:i.jsx(an,{}),title:"Google Services",desc:"Integration with Google Play, Maps, Firebase, ML Kit, and Android Auto"},{icon:i.jsx(wv,{}),title:"Multi-Device",desc:"Support for phones, tablets, foldables, Wear OS, and Android TV"}],technologies:[{name:"Kotlin",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg"},{name:"Android Studio",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/androidstudio/androidstudio-original.svg"},{name:"Java",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"}],benefits:["Largest mobile market with 3+ billion devices","Flexible customization and device support","Google Play services integration","Open-source platform advantages","Extensive hardware compatibility"],process:[{step:"01",title:"Planning",desc:"Define Android features and target devices"},{step:"02",title:"Design",desc:"Material Design implementation and prototyping"},{step:"03",title:"Development",desc:"Build with Kotlin and Android Jetpack"},{step:"04",title:"QA Testing",desc:"Test across multiple devices and OS versions"},{step:"05",title:"Launch",desc:"Google Play Store optimization and release"}],stats:[{icon:i.jsx(Xe,{}),value:"3B+",label:"Android Devices"},{icon:i.jsx(an,{}),value:"190+",label:"Countries Reached"},{icon:i.jsx(Ke,{}),value:"72%",label:"Market Share"}]},"cross-platform":{title:"Cross-Platform Development",subtitle:"Build once, deploy everywhere with modern frameworks",description:"Develop powerful apps with React Native and Flutter. Single codebase for iOS and Android with near-native performance and reduced development time.",icon:i.jsx(Rt,{}),color:"#FF6B9D",gradient:"linear-gradient(135deg, #FF6B9D, #C084FC)",features:[{icon:i.jsx(_e,{}),title:"Single Codebase",desc:"Write once, deploy to iOS and Android from one shared codebase"},{icon:i.jsx(yn,{}),title:"Faster Development",desc:"Reduce development time by 50% with hot reload and shared logic"},{icon:i.jsx(Jr,{}),title:"Cost Effective",desc:"Lower development and maintenance costs with unified codebase"},{icon:i.jsx(tr,{}),title:"Native Performance",desc:"Near-native performance with platform-specific optimizations"}],technologies:[{name:"React Native",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"},{name:"Flutter",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg"},{name:"Ionic",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/ionic/ionic-original.svg"}],benefits:["Single codebase for multiple platforms","Faster time to market for both iOS and Android","Reduced development and maintenance costs","Easy updates across all platforms","Large developer community and libraries"],process:[{step:"01",title:"Strategy",desc:"Choose framework and define shared architecture"},{step:"02",title:"Design",desc:"Create unified UI that works across platforms"},{step:"03",title:"Build",desc:"Develop with React Native or Flutter"},{step:"04",title:"Test",desc:"Comprehensive testing on iOS and Android"},{step:"05",title:"Deploy",desc:"Simultaneous launch on both app stores"}],stats:[{icon:i.jsx(yn,{}),value:"50%",label:"Faster Development"},{icon:i.jsx(Jr,{}),value:"40%",label:"Cost Reduction"},{icon:i.jsx(Xe,{}),value:"2x",label:"Market Reach"}]},enterprise:{title:"Enterprise Mobile Solutions",subtitle:"Secure, scalable apps for large organizations",description:"Build enterprise-grade mobile applications with advanced security, custom integrations, and scalable architecture. Perfect for large teams and complex workflows.",icon:i.jsx(Sd,{}),color:"#8B5CF6",gradient:"linear-gradient(135deg, #8B5CF6, #6366F1)",features:[{icon:i.jsx(lt,{}),title:"Enterprise Security",desc:"Bank-level encryption, MDM support, and compliance with SOC 2, HIPAA"},{icon:i.jsx(yi,{}),title:"Backend Integration",desc:"Seamless integration with SAP, Salesforce, Oracle, and custom systems"},{icon:i.jsx(Zi,{}),title:"Data Management",desc:"Offline sync, real-time data, and secure cloud storage solutions"},{icon:i.jsx(Gn,{}),title:"Scalability",desc:"Architecture that handles thousands of users and massive data loads"}],technologies:[{name:"Node.js",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"},{name:"Docker",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"},{name:"Kubernetes",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"}],benefits:["Enterprise-grade security and compliance","Custom workflow automation","Legacy system integration","Advanced analytics and reporting","24/7 support and maintenance"],process:[{step:"01",title:"Discovery",desc:"Understand enterprise requirements and systems"},{step:"02",title:"Architecture",desc:"Design scalable, secure enterprise architecture"},{step:"03",title:"Development",desc:"Build with enterprise frameworks and security"},{step:"04",title:"Integration",desc:"Connect with existing enterprise systems"},{step:"05",title:"Support",desc:"Ongoing maintenance and 24/7 support"}],stats:[{icon:i.jsx(Xe,{}),value:"10K+",label:"Enterprise Users"},{icon:i.jsx(lt,{}),value:"99.9%",label:"Uptime SLA"},{icon:i.jsx(yi,{}),value:"100+",label:"System Integrations"}]}},g=m[a],v=()=>{e(-1)};return i.jsxs("div",{className:"learn-more-page",children:[i.jsxs("div",{className:"tech-bg",children:[i.jsx("div",{className:"hexagon-pattern"}),i.jsx("div",{className:"particle-field",children:[...Array(30)].map((b,y)=>i.jsx("div",{className:"particle",style:{left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,animationDelay:`${Math.random()*5}s`,animationDuration:`${5+Math.random()*10}s`}},y))}),i.jsx("div",{className:"gradient-overlay"})]}),i.jsx("div",{className:"back-nav",children:i.jsxs("button",{className:"back-btn",onClick:v,children:[i.jsx(xm,{}),i.jsx("span",{children:"Back to Services"})]})}),i.jsx("section",{className:"detail-hero",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"hero-content-center",children:[i.jsx("div",{className:"hero-icon-large",style:{background:g.gradient},children:g.icon}),i.jsx("h1",{className:"hero-title-large",children:g.title}),i.jsx("p",{className:"hero-subtitle-large",children:g.subtitle}),i.jsx("p",{className:"hero-description-large",children:g.description}),i.jsx("div",{className:"hero-stats-grid",children:g.stats.map((b,y)=>i.jsxs("div",{className:"stat-card",children:[i.jsx("div",{className:"stat-icon",style:{color:g.color},children:b.icon}),i.jsx("div",{className:"stat-value",children:b.value}),i.jsx("div",{className:"stat-label",children:b.label})]},y))})]})})}),i.jsx("section",{className:"features-showcase",children:i.jsxs("div",{className:"container",children:[i.jsxs("h2",{className:"section-title-center",children:["Key ",i.jsx("span",{style:{color:g.color},children:"Features"})]}),i.jsxs("div",{className:"features-interactive",children:[i.jsx("div",{className:"features-nav-vertical",children:g.features.map((b,y)=>i.jsxs("button",{className:`feature-nav-btn ${f===y?"active":""}`,onClick:()=>p(y),style:f===y?{borderColor:g.color}:{},children:[i.jsx("div",{className:"feature-nav-icon",style:f===y?{color:g.color}:{},children:b.icon}),i.jsx("span",{children:b.title})]},y))}),i.jsxs("div",{className:"feature-display-card",children:[i.jsx("div",{className:"feature-icon-3d",style:{background:g.gradient},children:g.features[f].icon}),i.jsx("h3",{className:"feature-title-large",children:g.features[f].title}),i.jsx("p",{className:"feature-desc-large",children:g.features[f].desc}),i.jsx("div",{className:"feature-animation",children:i.jsxs("div",{className:"code-block",children:[i.jsx("div",{className:"code-line",style:{animationDelay:"0s"}}),i.jsx("div",{className:"code-line",style:{animationDelay:"0.1s"}}),i.jsx("div",{className:"code-line short",style:{animationDelay:"0.2s"}}),i.jsx("div",{className:"code-line",style:{animationDelay:"0.3s"}}),i.jsx("div",{className:"code-line short",style:{animationDelay:"0.4s"}})]})})]})]})]})}),i.jsx("section",{className:"tech-showcase",children:i.jsxs("div",{className:"container",children:[i.jsxs("h2",{className:"section-title-center",children:["Core ",i.jsx("span",{style:{color:g.color},children:"Technologies"})]}),i.jsx("div",{className:"tech-cards-3d",children:g.technologies.map((b,y)=>i.jsx("div",{className:"tech-card-3d",children:i.jsxs("div",{className:"tech-card-inner",children:[i.jsxs("div",{className:"tech-card-front",children:[i.jsx("img",{src:b.icon,alt:b.name}),i.jsx("h4",{children:b.name})]}),i.jsxs("div",{className:"tech-card-back",style:{background:g.gradient},children:[i.jsx(it,{}),i.jsx("p",{children:"Expert Level"})]})]})},y))})]})}),i.jsx("section",{className:"benefits-section-detail",children:i.jsxs("div",{className:"container",children:[i.jsxs("h2",{className:"section-title-center",children:["Why Choose ",i.jsx("span",{style:{color:g.color},children:"This Approach"})]}),i.jsx("div",{className:"benefits-grid-detail",children:g.benefits.map((b,y)=>i.jsxs("div",{className:"benefit-item-detail",style:{animationDelay:`${y*.1}s`},children:[i.jsx("div",{className:"benefit-check",style:{background:g.gradient},children:i.jsx(it,{})}),i.jsx("p",{children:b})]},y))})]})}),i.jsx("section",{className:"process-section-detail",children:i.jsxs("div",{className:"container",children:[i.jsxs("h2",{className:"section-title-center",children:["Development ",i.jsx("span",{style:{color:g.color},children:"Process"})]}),i.jsx("div",{className:"process-flow",children:g.process.map((b,y)=>i.jsxs("div",{className:"process-node",children:[i.jsx("div",{className:"process-circle",style:{background:g.gradient},children:b.step}),i.jsxs("div",{className:"process-content-node",children:[i.jsx("h3",{children:b.title}),i.jsx("p",{children:b.desc})]}),y<g.process.length-1&&i.jsx("div",{className:"process-line",style:{background:g.gradient}})]},y))})]})}),i.jsx("section",{className:"cta-section-detail",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"cta-box-3d",style:{borderColor:g.color},children:[i.jsx("div",{className:"cta-glow",style:{background:g.gradient}}),i.jsx(nr,{className:"cta-icon-large",style:{color:g.color}}),i.jsx("h2",{children:"Ready to Get Started?"}),i.jsx("p",{children:"Let's build something amazing together. Contact us for a free consultation."}),i.jsxs("div",{className:"cta-buttons-row",children:[i.jsx("button",{className:"cta-btn-solid",style:{background:g.gradient},children:"Start Project"}),i.jsx("button",{className:"cta-btn-outline",style:{borderColor:g.color,color:g.color},children:"Schedule Call"})]})]})})}),i.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .learn-more-page {
          background: #000000;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .tech-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .hexagon-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 40px, rgba(255, 255, 255, 0.02) 41px),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 40px, rgba(255, 255, 255, 0.02) 41px),
            repeating-linear-gradient(45deg, transparent 0px, transparent 50px, rgba(255, 255, 255, 0.02) 51px, transparent 56px),
            repeating-linear-gradient(-45deg, transparent 0px, transparent 50px, rgba(255, 255, 255, 0.02) 51px, transparent 56px);
          animation: hexMove 20s linear infinite;
        }

        @keyframes hexMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }

        .particle-field {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: particleFloat linear infinite;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% {
            opacity: 1;
          }
          90% {
            opacity: 1;
          }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        .gradient-overlay {
          position: absolute;
          inset: 0;
          background: 
            radial-gradient(ellipse at 20% 20%, rgba(88, 101, 242, 0.1) 0%, transparent 50%),
            radial-gradient(ellipse at 80% 80%, rgba(139, 92, 246, 0.1) 0%, transparent 50%);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .back-nav {
          padding: 24px 0;
          position: relative;
          z-index: 10;
        }

        .back-btn {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
          margin-left: 24px;
        }

        .back-btn:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateX(-5px);
        }

        .detail-hero {
          padding: 60px 0 100px;
        }

        .hero-content-center {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-icon-large {
          width: 120px;
          height: 120px;
          margin: 0 auto 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 30px;
          font-size: 56px;
          color: white;
          animation: iconFloat 3s ease-in-out infinite;
          box-shadow: 0 20px 60px rgba(88, 101, 242, 0.4);
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-15px) rotate(5deg); }
        }

        .hero-title-large {
          font-size: clamp(36px, 6vw, 64px);
          font-weight: 900;
          margin-bottom: 20px;
          letter-spacing: -0.02em;
        }

        .hero-subtitle-large {
          font-size: 1.5rem;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 24px;
          font-weight: 600;
        }

        .hero-description-large {
          font-size: 1.15rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.65);
          margin-bottom: 60px;
        }

        .hero-stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 24px;
          max-width: 800px;
          margin: 0 auto;
        }

        .stat-card {
          padding: 32px 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
        }

        .stat-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 50px rgba(88, 101, 242, 0.3);
        }

        .stat-icon {
          font-size: 32px;
          margin-bottom: 16px;
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
          text-transform: uppercase;
          letter-spacing: 0.5px;
        }

        .features-showcase {
          padding: 100px 0;
        }

        .section-title-center {
          text-align: center;
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 900;
          margin-bottom: 80px;
        }

        .features-interactive {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 60px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .features-nav-vertical {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .feature-nav-btn {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .feature-nav-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(8px);
        }

        .feature-nav-btn.active {
          background: rgba(255, 255, 255, 0.08);
          color: white;
        }

        .feature-nav-icon {
          font-size: 28px;
        }

        .feature-display-card {
          padding: 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          backdrop-filter: blur(10px);
          position: relative;
          overflow: hidden;
        }

        .feature-icon-3d {
          width: 100px;
          height: 100px;
          margin-bottom: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 24px;
          font-size: 48px;
          color: white;
          box-shadow: 0 15px 40px rgba(88, 101, 242, 0.4);
          animation: icon3D 4s ease-in-out infinite;
        }

        @keyframes icon3D {
          0%, 100% { transform: perspective(500px) rotateY(0deg); }
          50% { transform: perspective(500px) rotateY(15deg); }
        }

        .feature-title-large {
          font-size: 2.5rem;
          font-weight: 800;
          margin-bottom: 20px;
        }

        .feature-desc-large {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 40px;
        }

        .feature-animation {
          margin-top: 40px;
        }

        .code-block {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .code-line {
          height: 12px;
          background: linear-gradient(90deg, rgba(88, 101, 242, 0.4), rgba(88, 101, 242, 0.1));
          border-radius: 6px;
          animation: codeLine 2s ease-in-out infinite;
        }

        .code-line.short {
          width: 60%;
        }

        @keyframes codeLine {
          0%, 100% { opacity: 0.3; transform: scaleX(0.95); }
          50% { opacity: 1; transform: scaleX(1); }
        }

        .tech-showcase {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .tech-cards-3d {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 40px;
          max-width: 800px;
          margin: 0 auto;
          perspective: 1000px;
        }

        .tech-card-3d {
          height: 250px;
          perspective: 1000px;
          cursor: pointer;
        }

        .tech-card-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.8s;
          transform-style: preserve-3d;
        }

        .tech-card-3d:hover .tech-card-inner {
          transform: rotateY(180deg);
        }

        .tech-card-front,
        .tech-card-back {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          border-radius: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 20px;
        }

        .tech-card-front {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(10px);
        }

        .tech-card-front img {
          width: 80px;
          height: 80px;
          object-fit: contain;
        }

        .tech-card-front h4 {
          font-size: 1.3rem;
          font-weight: 700;
        }

        .tech-card-back {
          transform: rotateY(180deg);
          color: white;
        }

        .tech-card-back svg {
          font-size: 48px;
        }

        .tech-card-back p {
          font-size: 1.1rem;
          font-weight: 700;
        }

        .benefits-section-detail {
          padding: 100px 0;
        }

        .benefits-grid-detail {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
          gap: 24px;
          max-width: 1000px;
          margin: 0 auto;
        }

        .benefit-item-detail {
          display: flex;
          align-items: center;
          gap: 20px;
          padding: 28px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          backdrop-filter: blur(10px);
          animation: slideInUp 0.6s ease-out both;
          transition: all 0.3s ease;
        }

        .benefit-item-detail:hover {
          transform: translateX(10px);
          background: rgba(255, 255, 255, 0.05);
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .benefit-check {
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          font-size: 24px;
          color: white;
        }

        .benefit-item-detail p {
          font-size: 1.05rem;
          line-height: 1.6;
          color: rgba(255, 255, 255, 0.85);
        }

        .process-section-detail {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .process-flow {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
          position: relative;
        }

        .process-node {
          display: grid;
          grid-template-columns: 80px 1fr;
          gap: 32px;
          align-items: center;
          position: relative;
        }

        .process-circle {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 1.5rem;
          font-weight: 900;
          color: white;
          box-shadow: 0 10px 40px rgba(88, 101, 242, 0.5);
          animation: pulseCircle 2s ease-in-out infinite;
        }

        @keyframes pulseCircle {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .process-content-node {
          padding: 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          backdrop-filter: blur(10px);
        }

        .process-content-node h3 {
          font-size: 1.8rem;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .process-content-node p {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        .process-line {
          position: absolute;
          left: 40px;
          top: 80px;
          width: 3px;
          height: 80px;
          opacity: 0.5;
        }

        .cta-section-detail {
          padding: 100px 0 120px;
        }

        .cta-box-3d {
          max-width: 900px;
          margin: 0 auto;
          padding: 80px 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid;
          border-radius: 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .cta-glow {
          position: absolute;
          inset: -50%;
          opacity: 0.1;
          filter: blur(100px);
          animation: glowRotate 10s linear infinite;
        }

        @keyframes glowRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .cta-icon-large {
          font-size: 64px;
          margin-bottom: 32px;
          position: relative;
          z-index: 1;
          animation: iconBounce 2s ease-in-out infinite;
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-15px); }
        }

        .cta-box-3d h2 {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 900;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .cta-box-3d p {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 48px;
          position: relative;
          z-index: 1;
        }

        .cta-buttons-row {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .cta-btn-solid,
        .cta-btn-outline {
          padding: 18px 40px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          border: 2px solid transparent;
        }

        .cta-btn-solid {
          color: white;
          box-shadow: 0 10px 40px rgba(88, 101, 242, 0.4);
        }

        .cta-btn-solid:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(88, 101, 242, 0.6);
        }

        .cta-btn-outline {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }

        .cta-btn-outline:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-3px);
        }

        @media (max-width: 1024px) {
          .features-interactive {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .features-nav-vertical {
            flex-direction: row;
            overflow-x: auto;
          }

          .feature-nav-btn {
            min-width: 200px;
          }

          .process-node {
            grid-template-columns: 60px 1fr;
            gap: 20px;
          }

          .process-circle {
            width: 60px;
            height: 60px;
            font-size: 1.2rem;
          }

          .process-line {
            left: 30px;
            height: 60px;
          }
        }

        @media (max-width: 768px) {
          .hero-stats-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .features-nav-vertical {
            flex-direction: column;
          }

          .feature-nav-btn {
            min-width: auto;
          }

          .feature-display-card {
            padding: 40px 32px;
          }

          .tech-cards-3d {
            grid-template-columns: 1fr;
            gap: 24px;
          }

          .benefits-grid-detail {
            grid-template-columns: 1fr;
          }

          .process-node {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .process-circle {
            margin: 0 auto;
          }

          .process-line {
            display: none;
          }

          .cta-box-3d {
            padding: 60px 32px;
          }

          .cta-buttons-row {
            flex-direction: column;
            align-items: stretch;
          }
        }

        @media (max-width: 480px) {
          .back-btn {
            margin-left: 0;
            width: 100%;
            justify-content: center;
          }

          .hero-icon-large {
            width: 100px;
            height: 100px;
            font-size: 48px;
          }

          .feature-icon-3d {
            width: 80px;
            height: 80px;
            font-size: 40px;
          }

          .stat-card {
            padding: 24px 20px;
          }

          .tech-card-3d {
            height: 200px;
          }

          .tech-card-front img {
            width: 60px;
            height: 60px;
          }
        }
      `})]})},Yj=()=>{const[e,n]=j.useState("All"),[s,a]=j.useState(null),l=[{id:1,title:"TechFlow SaaS Platform",category:"Web Application",description:"A comprehensive project management platform with real-time collaboration, built with React and Node.js. Features include task tracking, team communication, and advanced analytics.",image:"https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop",tags:["React","Node.js","UI/UX","SaaS"],caseStudyUrl:"/casestudies",liveUrl:"https://example.com",year:"2024",client:"TechFlow Inc."},{id:2,title:"ShopEase E-commerce",category:"Website",description:"Modern e-commerce platform with seamless checkout experience, inventory management, and customer analytics. Increased conversion rates by 45%.",image:"https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",tags:["E-commerce","Stripe","SEO","Mobile-First"],caseStudyUrl:"/casestudies",liveUrl:"https://example.com",year:"2024",client:"ShopEase"},{id:3,title:"FitTrack Mobile App",category:"Mobile App",description:"iOS and Android fitness tracking app with personalized workout plans, nutrition tracking, and social features. Over 50K downloads in first month.",image:"https://images.unsplash.com/photo-1551650975-87deedd944c3?w=800&h=600&fit=crop",tags:["React Native","iOS","Android","Health"],caseStudyUrl:"/casestudies",year:"2023",client:"FitTrack"},{id:4,title:"BrandCo Identity System",category:"Branding",description:"Complete brand identity including logo design, color system, typography, and brand guidelines. Created a cohesive visual language across all touchpoints.",image:"https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop",tags:["Logo Design","Brand Identity","Style Guide"],caseStudyUrl:"/casestudies",year:"2024",client:"BrandCo"},{id:5,title:"HealthHub Dashboard",category:"UI/UX Design",description:"Patient management dashboard for healthcare providers. Focused on clarity, accessibility, and efficient workflows. Reduced task completion time by 60%.",image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",tags:["Healthcare","Dashboard","Accessibility","Figma"],caseStudyUrl:"/casestudies",year:"2023",client:"HealthHub"},{id:6,title:"Crypto Wallet App",category:"Mobile App",description:"Secure cryptocurrency wallet with multi-chain support, real-time price tracking, and seamless trading. Bank-grade security with biometric authentication.",image:"https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=800&h=600&fit=crop",tags:["Blockchain","Security","iOS","Android"],caseStudyUrl:"/casestudies",liveUrl:"https://example.com",year:"2024",client:"CryptoVault"},{id:7,title:"EduLearn Platform",category:"Web Application",description:"Online learning platform with video streaming, interactive quizzes, progress tracking, and certificate generation. Served over 100K students.",image:"https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",tags:["EdTech","Video Streaming","LMS","React"],caseStudyUrl:"/casestudies",liveUrl:"https://example.com",year:"2023",client:"EduLearn"},{id:8,title:"Luxury Hotel Website",category:"Website",description:"Premium hotel booking website with immersive visuals, seamless reservation system, and virtual tours. Booking conversion increased by 38%.",image:"https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800&h=600&fit=crop",tags:["Hospitality","Booking System","3D","Premium"],caseStudyUrl:"/casestudies",liveUrl:"https://example.com",year:"2024",client:"Grand Luxury Hotels"},{id:9,title:"StartupX Brand Kit",category:"Branding",description:"Modern tech startup branding with logo variations, color palette, typography system, and application examples across digital and print media.",image:"https://images.unsplash.com/photo-1558655146-364adaf1fcc9?w=800&h=600&fit=crop",tags:["Startup","Logo","Tech Branding","Modern"],caseStudyUrl:"/casestudies",year:"2023",client:"StartupX"},{id:10,title:"FoodieHub Delivery App",category:"Mobile App",description:"Food delivery app with real-time tracking, smart recommendations, and seamless payment. Optimized for speed and reliability during peak hours.",image:"https://images.unsplash.com/photo-1526367790999-0150786686a2?w=800&h=600&fit=crop",tags:["Food Tech","Maps","Real-time","Payment"],caseStudyUrl:"/casestudies",liveUrl:"https://example.com",year:"2024",client:"FoodieHub"},{id:11,title:"Finance Dashboard UI",category:"UI/UX Design",description:"Investment portfolio dashboard with data visualization, market insights, and transaction management. Clean, professional interface for financial data.",image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",tags:["FinTech","Data Viz","Dashboard","Professional"],caseStudyUrl:"/casestudies",year:"2023",client:"InvestPro"},{id:12,title:"Real Estate Portal",category:"Website",description:"Property listing platform with advanced search filters, 3D virtual tours, mortgage calculator, and agent matching. Revolutionary property browsing experience.",image:"https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop",tags:["Real Estate","3D Tours","Search","Maps"],caseStudyUrl:"/casestudies",liveUrl:"https://example.com",year:"2024",client:"HomeFinder"}],c=["All","Website","Web Application","Mobile App","UI/UX Design","Branding"],u=e==="All"?l:l.filter(f=>f.category===e);return i.jsxs("div",{className:"min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 text-white overflow-hidden",children:[i.jsxs("div",{className:"fixed inset-0 overflow-hidden pointer-events-none",children:[i.jsx("div",{className:"absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse"}),i.jsx("div",{className:"absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse",style:{animationDelay:"1s"}}),i.jsx("div",{className:"absolute top-1/2 left-1/2 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse",style:{animationDelay:"2s"}})]}),i.jsx("div",{className:"fixed inset-0 bg-[linear-gradient(rgba(99,102,241,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(99,102,241,0.03)_1px,transparent_1px)] bg-[size:50px_50px] pointer-events-none"}),i.jsxs("div",{className:"relative z-10 container mx-auto px-6 pt-64 pb-20",children:[i.jsxs(Ve.div,{initial:{opacity:0,y:-50},animate:{opacity:1,y:0},transition:{duration:.8},className:"text-center mb-16",children:[i.jsx(Ve.div,{initial:{scale:.9,opacity:0},animate:{scale:1,opacity:1},transition:{duration:.6,delay:.2},className:"inline-block mb-4",children:i.jsx("span",{className:"px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 rounded-full text-sm font-semibold backdrop-blur-sm"})}),i.jsx("h1",{className:"text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-blue-400 via-cyan-400 to-purple-400 bg-clip-text text-transparent",children:"All Projects"}),i.jsx("p",{className:"text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed",children:"Explore our diverse portfolio of successful projects spanning websites, mobile apps, branding, and UI/UX design. Each project showcases our commitment to excellence and innovation."})]}),i.jsx(Ve.div,{initial:{opacity:0,y:20},animate:{opacity:1,y:0},transition:{duration:.6,delay:.4},className:"flex flex-wrap justify-center gap-3 mb-16",children:c.map((f,p)=>i.jsx(Ve.button,{initial:{opacity:0,scale:.9},animate:{opacity:1,scale:1},transition:{delay:.5+p*.1},whileHover:{scale:1.05,y:-2},whileTap:{scale:.95},onClick:()=>n(f),className:`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${e===f?"bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/50":"bg-slate-800/50 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50"}`,children:f},f))}),i.jsx(Ve.div,{layout:!0,className:"grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8",children:u.map((f,p)=>i.jsxs(Ve.div,{layout:!0,initial:{opacity:0,y:50},animate:{opacity:1,y:0},exit:{opacity:0,scale:.9},transition:{duration:.5,delay:p*.1},onMouseEnter:()=>a(f.id),onMouseLeave:()=>a(null),className:"group relative bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-slate-700/50 hover:border-blue-500/50 transition-all duration-500",style:{transform:s===f.id?"translateY(-8px)":"translateY(0)"},children:[i.jsxs("div",{className:"relative h-64 overflow-hidden",children:[i.jsx(Ve.img,{src:f.image,alt:f.title,className:"w-full h-full object-cover",whileHover:{scale:1.1},transition:{duration:.6}}),i.jsx(Ve.div,{initial:{opacity:0},animate:{opacity:s===f.id?1:0},className:"absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent flex items-end p-6",children:i.jsxs("div",{className:"flex gap-3",children:[i.jsxs(Ve.a,{href:f.caseStudyUrl,initial:{y:20,opacity:0},animate:{y:s===f.id?0:20,opacity:s===f.id?1:0},transition:{delay:.1},className:"px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors",children:[i.jsx("span",{children:"📖"})," Case Study"]}),f.liveUrl&&i.jsxs(Ve.a,{href:f.liveUrl,target:"_blank",rel:"noopener noreferrer",initial:{y:20,opacity:0},animate:{y:s===f.id?0:20,opacity:s===f.id?1:0},transition:{delay:.2},className:"px-4 py-2 bg-purple-500 hover:bg-purple-600 rounded-lg text-sm font-semibold flex items-center gap-2 transition-colors",children:[i.jsx("span",{children:"🚀"})," Live Project"]})]})}),i.jsx("div",{className:"absolute top-4 left-4",children:i.jsx("span",{className:"px-3 py-1 bg-slate-900/80 backdrop-blur-sm border border-blue-500/30 rounded-full text-xs font-semibold text-blue-400",children:f.category})}),i.jsx("div",{className:"absolute top-4 right-4",children:i.jsx("span",{className:"px-3 py-1 bg-slate-900/80 backdrop-blur-sm border border-purple-500/30 rounded-full text-xs font-semibold text-purple-400",children:f.year})})]}),i.jsxs("div",{className:"p-6",children:[i.jsx("h3",{className:"text-2xl font-bold mb-2 group-hover:text-blue-400 transition-colors",children:f.title}),i.jsxs("p",{className:"text-sm text-slate-400 mb-3",children:["Client: ",f.client]}),i.jsx("p",{className:"text-slate-300 mb-4 line-clamp-3",children:f.description}),i.jsx("div",{className:"flex flex-wrap gap-2",children:f.tags.map((m,g)=>i.jsx("span",{className:"px-3 py-1 bg-slate-700/50 rounded-full text-xs text-slate-300 border border-slate-600/50",children:m},g))})]}),i.jsx(Ve.div,{className:"absolute inset-0 rounded-2xl pointer-events-none",animate:{boxShadow:s===f.id?"0 20px 60px rgba(59, 130, 246, 0.3), 0 0 0 1px rgba(59, 130, 246, 0.5)":"0 0 0 1px rgba(71, 85, 105, 0.5)"},transition:{duration:.3}})]},f.id))}),i.jsx(Ve.div,{initial:{opacity:0,y:50},animate:{opacity:1,y:0},transition:{duration:.8,delay:.6},className:"mt-20 text-center",children:i.jsx("div",{className:"inline-block p-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-2xl",children:i.jsxs("div",{className:"bg-slate-900 rounded-xl p-12",children:[i.jsx("h2",{className:"text-4xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent",children:"Ready to Start Your Project?"}),i.jsx("p",{className:"text-slate-400 mb-8 max-w-2xl mx-auto",children:"Let's create something amazing together. Contact us for a free consultation and quote."}),i.jsxs(Ve.a,{href:"/contact",whileHover:{scale:1.05},whileTap:{scale:.95},className:"inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl font-bold text-lg hover:shadow-lg hover:shadow-blue-500/50 transition-all",children:[i.jsx("span",{children:"🚀"})," Get Started"]})]})})})]}),i.jsx(Ot,{}),i.jsx("style",{children:`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-pulse {
          animation: pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
      `})]})},$j=()=>{const[e,n]=j.useState(0),[s,a]=j.useState(0);j.useEffect(()=>{const p=()=>n(window.scrollY);return window.addEventListener("scroll",p),()=>window.removeEventListener("scroll",p)},[]);const l=[{icon:i.jsx(tr,{}),title:"Custom Web Applications",description:"Build powerful, scalable applications tailored to your business logic and workflows.",features:["Custom business logic implementation","Real-time data processing","Advanced user permissions","Integrated dashboard analytics"]},{icon:i.jsx(yi,{}),title:"SaaS Platforms",description:"Multi-tenant software solutions with subscription management and user analytics.",features:["Multi-tenant architecture","Subscription billing integration","User analytics & reporting","API access management"]},{icon:i.jsx(Sd,{}),title:"Enterprise Solutions",description:"Large-scale applications with complex integrations and high-security requirements.",features:["Enterprise-grade security","Legacy system integration","Custom workflow automation","Advanced reporting tools"]},{icon:i.jsx(ls,{}),title:"Progressive Web Apps",description:"App-like experiences that work offline and deliver native functionality.",features:["Offline-first architecture","Push notifications","Home screen installation","Background sync"]}],c={frontend:[{name:"React",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg"},{name:"Next.js",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg"},{name:"TypeScript",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg"},{name:"Vue.js",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vuejs/vuejs-original.svg"},{name:"Angular",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/angularjs/angularjs-original.svg"},{name:"Tailwind CSS",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tailwindcss/tailwindcss-plain.svg"}],backend:[{name:"Node.js",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg"},{name:"Python",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"},{name:"Django",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/django/django-plain.svg"},{name:"Express",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg"},{name:"GraphQL",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg"},{name:"FastAPI",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"}],database:[{name:"PostgreSQL",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"},{name:"MongoDB",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg"},{name:"Redis",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg"},{name:"MySQL",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"},{name:"Firebase",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg"},{name:"Elasticsearch",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/elasticsearch/elasticsearch-original.svg"}],devops:[{name:"Docker",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"},{name:"Kubernetes",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"},{name:"AWS",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/amazonwebservices/amazonwebservices-original-wordmark.svg"},{name:"Git",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg"},{name:"NGINX",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nginx/nginx-original.svg"},{name:"Jenkins",icon:"https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jenkins/jenkins-original.svg"}]},u=[{icon:i.jsx(_e,{}),title:"High Performance",desc:"Lightning-fast load times and optimized code"},{icon:i.jsx(lt,{}),title:"Secure by Design",desc:"Enterprise-level security and encryption"},{icon:i.jsx(Ke,{}),title:"Scalable Architecture",desc:"Grows seamlessly with your business"},{icon:i.jsx(Xe,{}),title:"User-Centric",desc:"Intuitive interfaces that users love"},{icon:i.jsx(cs,{}),title:"Data Privacy",desc:"GDPR compliant and privacy-focused"},{icon:i.jsx(Za,{}),title:"Analytics Ready",desc:"Built-in tracking and reporting"}],f=[{num:"01",title:"Discovery",desc:"Understanding your needs and defining requirements"},{num:"02",title:"Architecture",desc:"Designing scalable system architecture"},{num:"03",title:"Development",desc:"Agile development with regular updates"},{num:"04",title:"Testing",desc:"Comprehensive QA and user testing"},{num:"05",title:"Deployment",desc:"Smooth launch and ongoing support"}];return i.jsxs("div",{className:"webapp-page",children:[i.jsxs("div",{className:"webapp-bg",children:[i.jsx("div",{className:"grid-lines"}),i.jsxs("div",{className:"floating-shapes",children:[i.jsx("div",{className:"shape shape-1",style:{transform:`translateY(${e*.1}px)`}}),i.jsx("div",{className:"shape shape-2",style:{transform:`translateY(${e*-.15}px)`}}),i.jsx("div",{className:"shape shape-3",style:{transform:`translateY(${e*.08}px)`}})]})]}),i.jsx("section",{className:"webapp-hero",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"hero-content-wrapper",children:[i.jsxs("div",{className:"hero-badge",children:[i.jsx(wn,{className:"badge-icon"}),i.jsx("span",{children:"Enterprise Web Applications"})]}),i.jsxs("h1",{className:"hero-title",children:["Transform Your Business With",i.jsx("br",{}),i.jsx("span",{className:"title-gradient",children:"Custom Web Applications"})]}),i.jsx("p",{className:"hero-description",children:"We build high-performance web applications that streamline operations, enhance user experiences, and drive measurable business growth."}),i.jsxs("div",{className:"hero-cta",children:[i.jsxs("button",{className:"cta-primary",children:["Start Your Project",i.jsx(De,{})]}),i.jsxs("button",{className:"cta-secondary",children:[i.jsx(hi,{}),"Schedule Consultation"]})]}),i.jsxs("div",{className:"trust-badges",children:[i.jsxs("div",{className:"badge-item",children:[i.jsx(it,{}),i.jsx("span",{children:"300+ Apps Built"})]}),i.jsxs("div",{className:"badge-item",children:[i.jsx(it,{}),i.jsx("span",{children:"99.9% Uptime"})]}),i.jsxs("div",{className:"badge-item",children:[i.jsx(it,{}),i.jsx("span",{children:"24/7 Support"})]})]})]})})}),i.jsx("section",{className:"services-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Application Development ",i.jsx("span",{className:"highlight",children:"Services"})]}),i.jsx("p",{className:"section-desc",children:"Comprehensive solutions for modern web applications"})]}),i.jsxs("div",{className:"services-layout",children:[i.jsx("div",{className:"services-nav",children:l.map((p,m)=>i.jsxs("button",{className:`service-nav-item ${s===m?"active":""}`,onClick:()=>a(m),children:[i.jsx("div",{className:"nav-icon",children:p.icon}),i.jsx("span",{children:p.title})]},m))}),i.jsxs("div",{className:"service-display",children:[i.jsx("div",{className:"service-icon-large",children:l[s].icon}),i.jsx("h3",{className:"service-title-large",children:l[s].title}),i.jsx("p",{className:"service-desc-large",children:l[s].description}),i.jsx("div",{className:"service-features-list",children:l[s].features.map((p,m)=>i.jsxs("div",{className:"feature-item",children:[i.jsx(it,{className:"feature-check"}),i.jsx("span",{children:p})]},m))}),i.jsxs("button",{className:"service-learn-more",children:["Learn More ",i.jsx(De,{})]})]})]})]})}),i.jsx("section",{className:"tech-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Technology ",i.jsx("span",{className:"highlight",children:"Stack"})]}),i.jsx("p",{className:"section-desc",children:"Leveraging cutting-edge technologies for robust applications"})]}),i.jsxs("div",{className:"tech-categories",children:[i.jsxs("div",{className:"tech-category",children:[i.jsx("h3",{className:"category-title",children:"Frontend"}),i.jsx("div",{className:"tech-grid",children:c.frontend.map((p,m)=>i.jsxs("div",{className:"tech-item",children:[i.jsx("img",{src:p.icon,alt:p.name}),i.jsx("span",{children:p.name})]},m))})]}),i.jsxs("div",{className:"tech-category",children:[i.jsx("h3",{className:"category-title",children:"Backend"}),i.jsx("div",{className:"tech-grid",children:c.backend.map((p,m)=>i.jsxs("div",{className:"tech-item",children:[i.jsx("img",{src:p.icon,alt:p.name}),i.jsx("span",{children:p.name})]},m))})]}),i.jsxs("div",{className:"tech-category",children:[i.jsx("h3",{className:"category-title",children:"Database"}),i.jsx("div",{className:"tech-grid",children:c.database.map((p,m)=>i.jsxs("div",{className:"tech-item",children:[i.jsx("img",{src:p.icon,alt:p.name}),i.jsx("span",{children:p.name})]},m))})]}),i.jsxs("div",{className:"tech-category",children:[i.jsx("h3",{className:"category-title",children:"DevOps"}),i.jsx("div",{className:"tech-grid",children:c.devops.map((p,m)=>i.jsxs("div",{className:"tech-item",children:[i.jsx("img",{src:p.icon,alt:p.name}),i.jsx("span",{children:p.name})]},m))})]})]})]})}),i.jsx("section",{className:"features-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Why Choose ",i.jsx("span",{className:"highlight",children:"Verapixels"})]}),i.jsx("p",{className:"section-desc",children:"Excellence in every aspect of application development"})]}),i.jsx("div",{className:"features-grid",children:u.map((p,m)=>i.jsxs("div",{className:"feature-card",children:[i.jsx("div",{className:"feature-icon-wrapper",children:p.icon}),i.jsx("h3",{className:"feature-title",children:p.title}),i.jsx("p",{className:"feature-desc",children:p.desc})]},m))})]})}),i.jsx("section",{className:"process-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"section-header",children:[i.jsxs("h2",{className:"section-title",children:["Development ",i.jsx("span",{className:"highlight",children:"Process"})]}),i.jsx("p",{className:"section-desc",children:"Our proven methodology for delivering exceptional results"})]}),i.jsx("div",{className:"process-timeline",children:f.map((p,m)=>i.jsxs("div",{className:"process-step",children:[i.jsx("div",{className:"step-number",children:p.num}),i.jsxs("div",{className:"step-content",children:[i.jsx("h3",{className:"step-title",children:p.title}),i.jsx("p",{className:"step-desc",children:p.desc})]}),m<f.length-1&&i.jsx("div",{className:"step-connector"})]},m))})]})}),i.jsx("section",{className:"final-cta",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"cta-card",children:[i.jsx(ho,{className:"cta-icon"}),i.jsx("h2",{className:"cta-title",children:"Ready to Build Your Application?"}),i.jsx("p",{className:"cta-text",children:"Let's discuss your project and create a solution that drives your business forward."}),i.jsxs("div",{className:"cta-actions",children:[i.jsxs("button",{className:"cta-btn-primary",children:[i.jsx(bi,{}),"Call Us Now"]}),i.jsxs("button",{className:"cta-btn-secondary",children:[i.jsx(en,{}),"Send Message"]}),i.jsxs("button",{className:"cta-btn-tertiary",children:[i.jsx(an,{}),"View Portfolio"]})]})]})})}),i.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .webapp-page {
          background: #0a0a0f;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .webapp-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .grid-lines {
          position: absolute;
          inset: 0;
          background-image: 
            linear-gradient(rgba(88, 101, 242, 0.03) 1px, transparent 1px),
            linear-gradient(90deg, rgba(88, 101, 242, 0.03) 1px, transparent 1px);
          background-size: 60px 60px;
          animation: gridMove 30s linear infinite;
        }

        @keyframes gridMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(60px, 60px); }
        }

        .floating-shapes {
          position: absolute;
          inset: 0;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.15;
        }

        .shape-1 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #5865f2, #7289da);
          top: 10%;
          right: 10%;
          animation: float 20s ease-in-out infinite;
        }

        .shape-2 {
          width: 400px;
          height: 400px;
          background: linear-gradient(135deg, #f43f5e, #ec4899);
          bottom: 20%;
          left: 10%;
          animation: float 25s ease-in-out infinite reverse;
        }

        .shape-3 {
          width: 350px;
          height: 350px;
          background: linear-gradient(135deg, #8b5cf6, #a855f7);
          top: 50%;
          left: 50%;
          animation: float 22s ease-in-out infinite;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) rotate(0deg); }
          33% { transform: translate(30px, -30px) rotate(120deg); }
          66% { transform: translate(-30px, 30px) rotate(240deg); }
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .webapp-hero {
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 100px 0 60px;
        }

        .hero-content-wrapper {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 28px;
          background: rgba(88, 101, 242, 0.15);
          border: 1px solid rgba(88, 101, 242, 0.4);
          border-radius: 50px;
          color: #7289da;
          font-weight: 600;
          font-size: 0.95rem;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
        }

        .badge-icon {
          font-size: 18px;
        }

        .hero-title {
          font-size: clamp(36px, 7vw, 72px);
          font-weight: 800;
          line-height: 1.1;
          margin-bottom: 28px;
          letter-spacing: -0.02em;
        }

        .title-gradient {
          background: linear-gradient(135deg, #5865f2 0%, #7289da 50%, #8b5cf6 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-description {
          font-size: 1.35rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 48px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
        }

        .hero-cta {
          display: flex;
          gap: 20px;
          justify-content: center;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }

        .cta-primary, .cta-secondary {
          padding: 18px 40px;
          border-radius: 12px;
          font-size: 1.1rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .cta-primary {
          background: linear-gradient(135deg, #5865f2, #7289da);
          color: white;
          box-shadow: 0 10px 30px rgba(88, 101, 242, 0.4);
        }

        .cta-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(88, 101, 242, 0.6);
        }

        .cta-secondary {
          background: rgba(255, 255, 255, 0.05);
          color: white;
          border: 2px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }

        .cta-secondary:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(255, 255, 255, 0.4);
          transform: translateY(-3px);
        }

        .trust-badges {
          display: flex;
          gap: 40px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .badge-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          font-weight: 600;
        }

        .badge-item svg {
          color: #5865f2;
          font-size: 20px;
        }

        /* Services Section */
        .services-section {
          padding: 100px 0;
        }

        .section-header {
          text-align: center;
          margin-bottom: 80px;
        }

        .section-title {
          font-size: clamp(32px, 5vw, 56px);
          font-weight: 800;
          margin-bottom: 16px;
        }

        .highlight {
          color: #5865f2;
        }

        .section-desc {
          font-size: 1.2rem;
          color: rgba(255, 255, 255, 0.65);
        }

        .services-layout {
          display: grid;
          grid-template-columns: 300px 1fr;
          gap: 60px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          padding: 40px;
          backdrop-filter: blur(10px);
        }

        .services-nav {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .service-nav-item {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          text-align: left;
        }

        .nav-icon {
          font-size: 24px;
          color: #5865f2;
        }

        .service-nav-item:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(88, 101, 242, 0.3);
          transform: translateX(5px);
        }

        .service-nav-item.active {
          background: rgba(88, 101, 242, 0.15);
          border-color: #5865f2;
          color: white;
        }

        .service-display {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .service-icon-large {
          font-size: 64px;
          color: #5865f2;
        }

        .service-title-large {
          font-size: 2.5rem;
          font-weight: 800;
        }

        .service-desc-large {
          font-size: 1.2rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
        }

        .service-features-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin: 20px 0;
        }

        .feature-item {
          display: flex;
          align-items: center;
          gap: 12px;
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.85);
        }

        .feature-check {
          color: #5865f2;
          font-size: 20px;
          flex-shrink: 0;
        }

        .service-learn-more {
          align-self: flex-start;
          padding: 14px 32px;
          background: rgba(88, 101, 242, 0.15);
          border: 1px solid #5865f2;
          border-radius: 10px;
          color: white;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
        }

        .service-learn-more:hover {
          background: #5865f2;
          transform: translateX(5px);
        }

        /* Technologies Section */
        .tech-section {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .tech-categories {
          display: grid;
          gap: 60px;
        }

        .tech-category {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 20px;
          padding: 40px;
          backdrop-filter: blur(10px);
        }

        .category-title {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 32px;
          color: #5865f2;
        }

        .tech-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: 24px;
        }

        .tech-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 24px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.06);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .tech-item:hover {
          transform: translateY(-8px);
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(88, 101, 242, 0.4);
          box-shadow: 0 10px 30px rgba(88, 101, 242, 0.2);
        }

        .tech-item img {
          width: 48px;
          height: 48px;
          object-fit: contain;
        }

        .tech-item span {
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.85);
          text-align: center;
        }

        /* Features Section */
        .features-section {
          padding: 100px 0;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
        }

        .feature-card {
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .feature-card:hover {
          transform: translateY(-10px);
          background: rgba(88, 101, 242, 0.08);
          border-color: rgba(88, 101, 242, 0.4);
          box-shadow: 0 20px 50px rgba(88, 101, 242, 0.3);
        }

        .feature-icon-wrapper {
          width: 64px;
          height: 64px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(88, 101, 242, 0.15);
          border-radius: 16px;
          margin-bottom: 24px;
          font-size: 32px;
          color: #5865f2;
          transition: all 0.3s ease;
        }

        .feature-card:hover .feature-icon-wrapper {
          transform: scale(1.1) rotate(5deg);
        }

        .feature-title {
          font-size: 1.5rem;
          font-weight: 700;
          margin-bottom: 12px;
        }

        .feature-desc {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Process Section */
        .process-section {
          padding: 100px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .process-timeline {
          max-width: 1000px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 40px;
        }

        .process-step {
          position: relative;
          display: grid;
          grid-template-columns: 120px 1fr;
          gap: 40px;
          padding: 40px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          transition: all 0.4s ease;
          backdrop-filter: blur(10px);
        }

        .process-step:hover {
          transform: translateX(10px);
          background: rgba(88, 101, 242, 0.08);
          border-color: rgba(88, 101, 242, 0.4);
          box-shadow: 0 15px 40px rgba(88, 101, 242, 0.25);
        }

        .step-number {
          font-size: 4rem;
          font-weight: 900;
          background: linear-gradient(135deg, #5865f2, #7289da);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          line-height: 1;
        }

        .step-content {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .step-title {
          font-size: 2rem;
          font-weight: 700;
        }

        .step-desc {
          font-size: 1.15rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.7);
        }

        .step-connector {
          position: absolute;
          left: 80px;
          bottom: -40px;
          width: 2px;
          height: 40px;
          background: linear-gradient(180deg, #5865f2, transparent);
        }

        .process-step:last-child .step-connector {
          display: none;
        }

        /* Final CTA Section */
        .final-cta {
          padding: 100px 0 120px;
        }

        .cta-card {
          max-width: 1000px;
          margin: 0 auto;
          padding: 80px 60px;
          background: linear-gradient(135deg, rgba(88, 101, 242, 0.15), rgba(139, 92, 246, 0.1));
          border: 1px solid rgba(88, 101, 242, 0.3);
          border-radius: 32px;
          text-align: center;
          position: relative;
          overflow: hidden;
          backdrop-filter: blur(20px);
        }

        .cta-card::before {
          content: '';
          position: absolute;
          inset: 0;
          background: radial-gradient(circle at 50% 50%, rgba(88, 101, 242, 0.2), transparent 70%);
          opacity: 0.5;
        }

        .cta-icon {
          font-size: 64px;
          color: #5865f2;
          margin-bottom: 32px;
          animation: spin 10s linear infinite;
          position: relative;
          z-index: 1;
        }

        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        .cta-title {
          font-size: clamp(28px, 5vw, 48px);
          font-weight: 800;
          margin-bottom: 20px;
          position: relative;
          z-index: 1;
        }

        .cta-text {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.75);
          margin-bottom: 48px;
          max-width: 700px;
          margin-left: auto;
          margin-right: auto;
          position: relative;
          z-index: 1;
        }

        .cta-actions {
          display: flex;
          gap: 20px;
          justify-content: center;
          flex-wrap: wrap;
          position: relative;
          z-index: 1;
        }

        .cta-btn-primary, .cta-btn-secondary, .cta-btn-tertiary {
          padding: 18px 36px;
          border-radius: 12px;
          font-size: 1.05rem;
          font-weight: 700;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 10px;
          transition: all 0.3s ease;
        }

        .cta-btn-primary {
          background: linear-gradient(135deg, #5865f2, #7289da);
          color: white;
          box-shadow: 0 10px 30px rgba(88, 101, 242, 0.4);
        }

        .cta-btn-primary:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(88, 101, 242, 0.6);
        }

        .cta-btn-secondary {
          background: rgba(244, 63, 94, 0.2);
          color: white;
          border: 2px solid #f43f5e;
        }

        .cta-btn-secondary:hover {
          background: #f43f5e;
          transform: translateY(-3px);
        }

        .cta-btn-tertiary {
          background: rgba(139, 92, 246, 0.2);
          color: white;
          border: 2px solid #8b5cf6;
        }

        .cta-btn-tertiary:hover {
          background: #8b5cf6;
          transform: translateY(-3px);
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .services-layout {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .services-nav {
            flex-direction: row;
            overflow-x: auto;
            padding-bottom: 10px;
          }

          .service-nav-item {
            min-width: 200px;
          }

          .process-step {
            grid-template-columns: 80px 1fr;
            gap: 24px;
            padding: 32px;
          }

          .step-number {
            font-size: 3rem;
          }

          .step-connector {
            left: 60px;
          }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 36px;
          }

          .hero-description {
            font-size: 1.15rem;
          }

          .hero-cta {
            flex-direction: column;
            align-items: stretch;
          }

          .cta-primary, .cta-secondary {
            justify-content: center;
          }

          .trust-badges {
            flex-direction: column;
            gap: 20px;
          }

          .services-layout {
            padding: 24px;
          }

          .services-nav {
            flex-direction: column;
          }

          .service-nav-item {
            min-width: auto;
          }

          .service-title-large {
            font-size: 1.8rem;
          }

          .tech-grid {
            grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
            gap: 16px;
          }

          .tech-item {
            padding: 20px 12px;
          }

          .tech-item img {
            width: 40px;
            height: 40px;
          }

          .features-grid {
            grid-template-columns: 1fr;
          }

          .process-step {
            grid-template-columns: 1fr;
            gap: 20px;
            padding: 28px;
          }

          .step-number {
            font-size: 2.5rem;
          }

          .step-connector {
            display: none;
          }

          .cta-card {
            padding: 60px 32px;
          }

          .cta-actions {
            flex-direction: column;
            align-items: stretch;
          }

          .cta-btn-primary, .cta-btn-secondary, .cta-btn-tertiary {
            justify-content: center;
          }
        }

        @media (max-width: 480px) {
          .container {
            padding: 0 16px;
          }

          .hero-badge {
            font-size: 0.85rem;
            padding: 10px 20px;
          }

          .section-title {
            font-size: 28px;
          }

          .section-desc {
            font-size: 1rem;
          }

          .tech-category {
            padding: 24px;
          }

          .category-title {
            font-size: 1.4rem;
          }

          .feature-card {
            padding: 28px;
          }

          .feature-icon-wrapper {
            width: 56px;
            height: 56px;
            font-size: 28px;
          }

          .cta-icon {
            font-size: 48px;
          }
        }
      `})]})},Hj=()=>i.jsxs("div",{children:[i.jsx("h1",{children:"Mobile Apps"}),i.jsx("p",{children:"Here you can find our mobile app solutions."})]}),Gj=()=>i.jsxs("div",{children:[i.jsx("h1",{children:"E-commerce Solutions"}),i.jsx("p",{children:"Here you can find our e-commerce solutions."})]}),qj=()=>i.jsxs("div",{children:[i.jsx("h1",{children:"Enterprise Software"}),i.jsx("p",{children:"Here you can find our enterprise software solutions."})]}),Xj=()=>{const[e,n]=j.useState({x:0,y:0}),[s,a]=j.useState(null),[l,c]=j.useState("All");j.useEffect(()=>{const m=g=>{n({x:g.clientX,y:g.clientY})};return window.addEventListener("mousemove",m),()=>window.removeEventListener("mousemove",m)},[]);const u=["All","E-Commerce","Mobile App","Web Platform","Enterprise"],f=[{id:1,title:"TechMart E-Commerce Transformation",category:"E-Commerce",client:"TechMart Inc.",duration:"6 months",image:"https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop",icon:i.jsx(Cf,{}),color:"#0063f4",challenge:"Outdated platform causing 60% cart abandonment and poor mobile experience",solution:"Complete redesign with React, headless CMS, and optimized checkout flow",results:[{metric:"Sales Increase",value:"+185%",icon:i.jsx(Ke,{})},{metric:"Cart Abandonment",value:"-62%",icon:i.jsx(Cf,{})},{metric:"Mobile Traffic",value:"+240%",icon:i.jsx(tn,{})},{metric:"Page Load Time",value:"-75%",icon:i.jsx(_e,{})}],technologies:["React","Node.js","MongoDB","AWS","Stripe"],testimonial:{text:"Verapixels transformed our business. The new platform exceeded all expectations.",author:"Sarah Johnson",role:"CEO, TechMart"}},{id:2,title:"HealthTrack Mobile App Launch",category:"Mobile App",client:"HealthTrack Solutions",duration:"4 months",image:"https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&h=600&fit=crop",icon:i.jsx(tn,{}),color:"#00ff88",challenge:"Need for HIPAA-compliant health monitoring app with real-time sync",solution:"Native iOS/Android apps with secure cloud infrastructure and AI insights",results:[{metric:"Active Users",value:"50K+",icon:i.jsx(Xe,{})},{metric:"App Rating",value:"4.9/5",icon:i.jsx(Gt,{})},{metric:"Data Sync Speed",value:"<2s",icon:i.jsx(_e,{})},{metric:"User Retention",value:"89%",icon:i.jsx(xn,{})}],technologies:["React Native","Firebase","TensorFlow","AWS","Node.js"],testimonial:{text:"The app has revolutionized how our patients track their health metrics.",author:"Dr. Michael Chen",role:"CTO, HealthTrack"}},{id:3,title:"FinanceHub Banking Platform",category:"Web Platform",client:"FinanceHub Corp",duration:"8 months",image:"https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop",icon:i.jsx(Jr,{}),color:"#ffd700",challenge:"Legacy banking system with security vulnerabilities and poor UX",solution:"Modern fintech platform with microservices architecture and enhanced security",results:[{metric:"Transaction Volume",value:"+320%",icon:i.jsx(Za,{})},{metric:"Security Score",value:"99.9%",icon:i.jsx(it,{})},{metric:"Customer Satisfaction",value:"+95%",icon:i.jsx(Xe,{})},{metric:"Processing Time",value:"-85%",icon:i.jsx(yn,{})}],technologies:["Angular","Java","PostgreSQL","Kubernetes","Redis"],testimonial:{text:"Security, speed, and user experience - they nailed all three perfectly.",author:"David Martinez",role:"Head of Digital, FinanceHub"}},{id:4,title:"GlobalLogistics Supply Chain System",category:"Enterprise",client:"GlobalLogistics Inc",duration:"10 months",image:"https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&h=600&fit=crop",icon:i.jsx(an,{}),color:"#ff6b9d",challenge:"Inefficient tracking system leading to delays and lost shipments",solution:"Real-time IoT-enabled tracking platform with AI-powered route optimization",results:[{metric:"Delivery Speed",value:"+145%",icon:i.jsx(Ke,{})},{metric:"Cost Reduction",value:"-42%",icon:i.jsx(Jr,{})},{metric:"Tracking Accuracy",value:"99.8%",icon:i.jsx(xn,{})},{metric:"Customer NPS",value:"+78",icon:i.jsx(Gt,{})}],technologies:["Vue.js","Python","IoT","TensorFlow","Azure"],testimonial:{text:"This system has completely transformed our supply chain operations.",author:"Amanda Williams",role:"COO, GlobalLogistics"}},{id:5,title:"EduLearn Online Platform",category:"Web Platform",client:"EduLearn Academy",duration:"5 months",image:"https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop",icon:i.jsx(Rt,{}),color:"#00bfff",challenge:"Need for scalable e-learning platform supporting 100K+ concurrent users",solution:"Cloud-native platform with video streaming, live classes, and AI tutoring",results:[{metric:"Student Enrollment",value:"+450%",icon:i.jsx(Xe,{})},{metric:"Course Completion",value:"+78%",icon:i.jsx(xn,{})},{metric:"System Uptime",value:"99.99%",icon:i.jsx(it,{})},{metric:"Engagement Rate",value:"+210%",icon:i.jsx(Za,{})}],technologies:["Next.js","GraphQL","PostgreSQL","WebRTC","AWS"],testimonial:{text:"The platform handles our massive user base flawlessly. Exceptional work!",author:"Prof. Robert Taylor",role:"Founder, EduLearn"}},{id:6,title:"CloudSync Enterprise Suite",category:"Enterprise",client:"CloudSync Technologies",duration:"7 months",image:"https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop",icon:i.jsx(Gn,{}),color:"#9d4edd",challenge:"Fragmented tools causing collaboration issues across global teams",solution:"Unified workspace with real-time collaboration, automation, and integrations",results:[{metric:"Productivity Gain",value:"+165%",icon:i.jsx(Ke,{})},{metric:"Tool Consolidation",value:"-87%",icon:i.jsx(Rt,{})},{metric:"Team Satisfaction",value:"94%",icon:i.jsx(Xe,{})},{metric:"Time Saved",value:"15hrs/week",icon:i.jsx(yn,{})}],technologies:["React","WebSocket","Redis","Docker","GCP"],testimonial:{text:"Our teams are now more connected and productive than ever before.",author:"Lisa Anderson",role:"VP Operations, CloudSync"}}],p=l==="All"?f:f.filter(m=>m.category===l);return i.jsxs("div",{className:"case-studies-page",children:[i.jsxs("div",{className:"case-bg",children:[i.jsx("div",{className:"bg-orb orb-1",style:{transform:`translate(${e.x*.02}px, ${e.y*.02}px)`}}),i.jsx("div",{className:"bg-orb orb-2",style:{transform:`translate(${-e.x*.03}px, ${-e.y*.03}px)`}}),i.jsx("div",{className:"bg-orb orb-3",style:{transform:`translate(${e.x*.04}px, ${-e.y*.02}px)`}})]}),i.jsx("section",{className:"case-hero",children:i.jsxs("div",{className:"case-container",children:[i.jsxs("div",{className:"hero-badge",children:[i.jsx(Gt,{})," Success Stories That Inspire"]}),i.jsxs("h1",{className:"hero-title",children:["Our ",i.jsx("span",{className:"gradient-text",children:"Case Studies"})]}),i.jsx("p",{className:"hero-subtitle",children:"Real results from real clients. Discover how we've helped businesses transform their digital presence and achieve remarkable growth."}),i.jsxs("div",{className:"hero-stats",children:[i.jsxs("div",{className:"hero-stat",children:[i.jsx("div",{className:"stat-icon",style:{background:"#0063f4"},children:i.jsx(xn,{})}),i.jsx("div",{className:"stat-value",children:"50+"}),i.jsx("div",{className:"stat-label",children:"Projects Completed"})]}),i.jsxs("div",{className:"hero-stat",children:[i.jsx("div",{className:"stat-icon",style:{background:"#00ff88"},children:i.jsx(Ke,{})}),i.jsx("div",{className:"stat-value",children:"250%"}),i.jsx("div",{className:"stat-label",children:"Avg Growth"})]}),i.jsxs("div",{className:"hero-stat",children:[i.jsx("div",{className:"stat-icon",style:{background:"#ffd700"},children:i.jsx(Xe,{})}),i.jsx("div",{className:"stat-value",children:"100%"}),i.jsx("div",{className:"stat-label",children:"Client Satisfaction"})]})]})]})}),i.jsx("section",{className:"filter-section",children:i.jsx("div",{className:"case-container",children:i.jsx("div",{className:"category-filters",children:u.map((m,g)=>i.jsx("button",{className:`filter-btn ${l===m?"active":""}`,onClick:()=>c(m),children:m},g))})})}),i.jsx("section",{className:"cases-grid-section",children:i.jsx("div",{className:"case-container",children:i.jsx("div",{className:"cases-grid",children:p.map((m,g)=>i.jsxs("div",{className:`case-card ${s===g?"active":""}`,onMouseEnter:()=>a(g),onMouseLeave:()=>a(null),style:{animationDelay:`${g*.1}s`},children:[i.jsx("div",{className:"card-glow",style:{background:m.color}}),i.jsxs("div",{className:"case-image-wrapper",children:[i.jsx("img",{src:m.image,alt:m.title,className:"case-image"}),i.jsx("div",{className:"image-gradient",style:{background:`linear-gradient(135deg, ${m.color}66, transparent)`}}),i.jsx("div",{className:"case-icon-badge",style:{background:m.color},children:m.icon}),i.jsx("div",{className:"category-tag",style:{borderColor:m.color,color:m.color},children:m.category})]}),i.jsxs("div",{className:"case-content",children:[i.jsx("h3",{className:"case-title",children:m.title}),i.jsxs("div",{className:"case-meta",children:[i.jsxs("span",{className:"meta-item",children:[i.jsx(Xe,{}),m.client]}),i.jsxs("span",{className:"meta-item",children:[i.jsx(yn,{}),m.duration]})]}),i.jsxs("div",{className:"case-section",children:[i.jsx("h4",{className:"section-title",style:{color:m.color},children:"Challenge"}),i.jsx("p",{className:"section-text",children:m.challenge})]}),i.jsxs("div",{className:"case-section",children:[i.jsx("h4",{className:"section-title",style:{color:m.color},children:"Solution"}),i.jsx("p",{className:"section-text",children:m.solution})]}),i.jsx("div",{className:"results-grid",children:m.results.map((v,b)=>i.jsxs("div",{className:"result-item",children:[i.jsx("div",{className:"result-icon",style:{color:m.color},children:v.icon}),i.jsx("div",{className:"result-value",style:{color:m.color},children:v.value}),i.jsx("div",{className:"result-label",children:v.metric})]},b))}),i.jsxs("div",{className:"tech-stack",children:[i.jsx("h4",{className:"section-title",style:{color:m.color},children:"Technologies"}),i.jsx("div",{className:"tech-tags",children:m.technologies.map((v,b)=>i.jsx("span",{className:"tech-tag",style:{borderColor:m.color},children:v},b))})]}),i.jsxs("div",{className:"testimonial",style:{borderLeftColor:m.color},children:[i.jsxs("p",{className:"testimonial-text",children:['"',m.testimonial.text,'"']}),i.jsxs("div",{className:"testimonial-author",children:[i.jsx("strong",{children:m.testimonial.author}),i.jsx("span",{children:m.testimonial.role})]})]}),i.jsxs("button",{className:"view-case-btn",style:{background:m.color},children:["View Full Case Study",i.jsx(Nd,{})]})]})]},m.id))})})}),i.jsx("section",{className:"cta-section",children:i.jsx("div",{className:"case-container",children:i.jsxs("div",{className:"cta-content",children:[i.jsx("div",{className:"cta-icon",children:i.jsx(_e,{})}),i.jsx("h2",{className:"cta-title",children:"Ready to Write Your Success Story?"}),i.jsx("p",{className:"cta-text",children:"Let's collaborate to create exceptional digital experiences that drive real results for your business."}),i.jsxs("button",{className:"cta-button",children:["Start Your Project",i.jsx(De,{})]})]})})}),i.jsx(Ot,{}),i.jsx("style",{children:`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .case-studies-page {
          background: #000;
          color: #fff;
          min-height: 100vh;
          position: relative;
          overflow-x: hidden;
        }

        /* Animated Background */
        .case-bg {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .bg-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(140px);
          opacity: 0.15;
          animation: float 12s ease-in-out infinite;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          top: -10%;
          left: -10%;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: linear-gradient(135deg, #00ff88, #ffd700);
          top: 40%;
          right: -10%;
          animation-delay: 4s;
        }

        .orb-3 {
          width: 550px;
          height: 550px;
          background: linear-gradient(135deg, #ff6b9d, #9d4edd);
          bottom: -10%;
          left: 30%;
          animation-delay: 8s;
        }

        @keyframes float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(40px, -40px) scale(1.1); }
          66% { transform: translate(-30px, 30px) scale(0.9); }
        }

        .case-container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 40px;
          position: relative;
          z-index: 1;
        }

        /* Hero Section */
        .case-hero {
          min-height: 80vh;
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          padding: 140px 0 80px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 12px 24px;
          background: rgba(0, 99, 244, 0.15);
          border: 1px solid rgba(0, 99, 244, 0.4);
          border-radius: 30px;
          color: #00bfff;
          font-weight: 700;
          font-size: 1rem;
          margin-bottom: 30px;
          animation: fadeInDown 1s ease;
        }

        @keyframes fadeInDown {
          from { opacity: 0; transform: translateY(-30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-title {
          font-size: clamp(48px, 8vw, 88px);
          font-weight: 900;
          line-height: 1.1;
          margin-bottom: 30px;
          animation: fadeInUp 1s ease 0.2s both;
        }

        .gradient-text {
          background: linear-gradient(135deg, #0063f4 0%, #00ff88 50%, #ffd700 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .hero-subtitle {
          font-size: 1.35rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          max-width: 800px;
          margin: 0 auto 60px;
          animation: fadeInUp 1s ease 0.4s both;
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-stats {
          display: flex;
          gap: 60px;
          justify-content: center;
          flex-wrap: wrap;
          animation: fadeInUp 1s ease 0.6s both;
        }

        .hero-stat {
          text-align: center;
        }

        .stat-icon {
          width: 60px;
          height: 60px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          font-size: 28px;
          color: #fff;
          animation: iconFloat 3s ease-in-out infinite;
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 900;
          line-height: 1;
          margin-bottom: 8px;
        }

        .stat-label {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Filter Section */
        .filter-section {
          padding: 40px 0;
        }

        .category-filters {
          display: flex;
          gap: 16px;
          justify-content: center;
          flex-wrap: wrap;
        }

        .filter-btn {
          padding: 12px 28px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.15);
          border-radius: 30px;
          color: rgba(255, 255, 255, 0.8);
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .filter-btn:hover {
          background: rgba(0, 99, 244, 0.2);
          border-color: rgba(0, 99, 244, 0.5);
          color: #00bfff;
          transform: translateY(-2px);
        }

        .filter-btn.active {
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border-color: transparent;
          color: #fff;
        }

        /* Cases Grid */
        .cases-grid-section {
          padding: 80px 0;
        }

        .cases-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(500px, 1fr));
          gap: 60px;
        }

        .case-card {
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 30px;
          overflow: hidden;
          position: relative;
          transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1);
          animation: fadeInUp 0.8s ease both;
        }

        .case-card:hover {
          transform: translateY(-20px);
          border-color: rgba(0, 99, 244, 0.5);
          box-shadow: 0 40px 100px rgba(0, 99, 244, 0.4);
        }

        .card-glow {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          opacity: 0;
          filter: blur(100px);
          transition: opacity 0.6s ease;
          pointer-events: none;
        }

        .case-card:hover .card-glow {
          opacity: 0.2;
        }

        /* Case Image */
        .case-image-wrapper {
          position: relative;
          height: 350px;
          overflow: hidden;
        }

        .case-image {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.8s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .case-card:hover .case-image {
          transform: scale(1.15) rotate(2deg);
        }

        .image-gradient {
          position: absolute;
          inset: 0;
          opacity: 0.5;
          transition: opacity 0.6s ease;
        }

        .case-card:hover .image-gradient {
          opacity: 0.7;
        }

        .case-icon-badge {
          position: absolute;
          top: 30px;
          left: 30px;
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 18px;
          font-size: 32px;
          color: #fff;
          box-shadow: 0 10px 40px rgba(0, 0, 0, 0.4);
          animation: iconBounce 2s ease-in-out infinite;
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .category-tag {
          position: absolute;
          top: 30px;
          right: 30px;
          padding: 8px 20px;
          background: rgba(0, 0, 0, 0.7);
          backdrop-filter: blur(10px);
          border: 2px solid;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        /* Case Content */
        .case-content {
          padding: 40px;
        }

        .case-title {
          font-size: 1.8rem;
          font-weight: 900;
          margin-bottom: 20px;
          line-height: 1.3;
        }

        .case-meta {
          display: flex;
          gap: 24px;
          margin-bottom: 30px;
          flex-wrap: wrap;
        }

        .meta-item {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
        }

        .case-section {
          margin-bottom: 24px;
        }

        .section-title {
          font-size: 1.1rem;
          font-weight: 800;
          margin-bottom: 10px;
          text-transform: uppercase;
          letter-spacing: 1px;
        }

        .section-text {
          font-size: 1.05rem;
          line-height: 1.7;
          color: rgba(255, 255, 255, 0.8);
        }

        /* Results Grid */
        .results-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 20px;
          margin: 30px 0;
        }

        .result-item {
          padding: 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          text-align: center;
          transition: all 0.3s ease;
        }

        .result-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateY(-5px);
        }

        .result-icon {
          font-size: 32px;
          margin-bottom: 10px;
        }

        .result-value {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 6px;
        }

        .result-label {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Tech Stack */
        .tech-stack {
          margin: 30px 0;
        }

        .tech-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-top: 12px;
        }

        .tech-tag {
          padding: 8px 16px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .tech-tag:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateY(-2px);
        }

        /* Testimonial */
        .testimonial {
          margin: 30px 0;
          padding: 24px;
          padding-left: 30px;
          background: rgba(255, 255, 255, 0.03);
          border-left: 4px solid;
          border-radius: 12px;
        }

        .testimonial-text {
          font-size: 1.05rem;
          line-height: 1.7;
          font-style: italic;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 16px;
        }

        .testimonial-author {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .testimonial-author strong {
          font-size: 1rem;
          color: #fff;
        }

        .testimonial-author span {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* View Case Button */
        .view-case-btn {
          width: 100%;
          padding: 16px 32px;
          margin-top: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          border: none;
          border-radius: 50px;
          color: #fff;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        }

        .view-case-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.5);
        }

        /* CTA Section */
        .cta-section {
          padding: 120px 0;
          background: linear-gradient(180deg, transparent, rgba(0, 99, 244, 0.05), transparent);
        }

        .cta-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto;
          padding: 80px 60px;
          background: rgba(255, 255, 255, 0.02);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 40px;
          position: relative;
          overflow: hidden;
        }

        .cta-content::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(0, 99, 244, 0.1), transparent);
          opacity: 0.5;
        }

        .cta-icon {
          font-size: 80px;
          background: linear-gradient(135deg, #0063f4, #00ff88);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-bottom: 30px;
          animation: pulse 2s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .cta-title {
          font-size: 2.8rem;
          font-weight: 900;
          margin-bottom: 24px;
          position: relative;
          z-index: 1;
        }

        .cta-text {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          margin-bottom: 40px;
          position: relative;
          z-index: 1;
        }

        .cta-button {
          padding: 18px 48px;
          background: linear-gradient(135deg, #0063f4, #00bfff);
          border: none;
          border-radius: 50px;
          color: #fff;
          font-size: 1.15rem;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 12px;
          transition: all 0.3s ease;
          position: relative;
          z-index: 1;
          box-shadow: 0 15px 50px rgba(0, 99, 244, 0.4);
        }

        .cta-button:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 60px rgba(0, 99, 244, 0.6);
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .cases-grid {
            grid-template-columns: 1fr;
            gap: 50px;
          }
        }

        @media (max-width: 768px) {
          .case-container {
            padding: 0 20px;
          }

          .hero-title {
            font-size: 48px;
          }

          .hero-subtitle {
            font-size: 1.1rem;
          }

          .hero-stats {
            gap: 30px;
          }

          .stat-icon {
            width: 50px;
            height: 50px;
            font-size: 24px;
          }

          .stat-value {
            font-size: 2rem;
          }

          .category-filters {
            gap: 10px;
          }

          .filter-btn {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .case-image-wrapper {
            height: 280px;
          }

          .case-icon-badge {
            width: 60px;
            height: 60px;
            font-size: 28px;
            top: 20px;
            left: 20px;
          }

          .category-tag {
            top: 20px;
            right: 20px;
            padding: 6px 16px;
            font-size: 0.8rem;
          }

          .case-content {
            padding: 30px 24px;
          }

          .case-title {
            font-size: 1.5rem;
          }

          .results-grid {
            grid-template-columns: 1fr;
            gap: 16px;
          }

          .result-value {
            font-size: 1.8rem;
          }

          .cta-content {
            padding: 60px 40px;
          }

          .cta-icon {
            font-size: 60px;
          }

          .cta-title {
            font-size: 2rem;
          }

          .cta-text {
            font-size: 1.1rem;
          }
        }

        @media (max-width: 480px) {
          .hero-badge {
            font-size: 0.85rem;
            padding: 10px 20px;
          }

          .hero-title {
            font-size: 36px;
          }

          .hero-stats {
            flex-direction: column;
            gap: 24px;
          }

          .case-image-wrapper {
            height: 240px;
          }

          .case-meta {
            flex-direction: column;
            gap: 12px;
          }

          .section-title {
            font-size: 1rem;
          }

          .section-text {
            font-size: 1rem;
          }

          .tech-tags {
            gap: 8px;
          }

          .tech-tag {
            padding: 6px 14px;
            font-size: 0.85rem;
          }

          .testimonial {
            padding: 20px;
            padding-left: 24px;
          }

          .testimonial-text {
            font-size: 1rem;
          }

          .view-case-btn {
            padding: 14px 28px;
            font-size: 1rem;
          }

          .cta-content {
            padding: 50px 30px;
          }

          .cta-icon {
            font-size: 50px;
          }

          .cta-title {
            font-size: 1.8rem;
          }

          .cta-button {
            padding: 16px 40px;
            font-size: 1rem;
          }
        }

        /* Additional 3D Effects */
        @keyframes rotate3d {
          0% { transform: rotateY(0deg); }
          100% { transform: rotateY(360deg); }
        }

        .case-card.active .case-icon-badge {
          animation: rotate3d 1s ease-in-out;
        }

        /* Parallax Effect on Scroll */
        .case-card {
          transform-style: preserve-3d;
          perspective: 1000px;
        }

        .case-card:hover .case-content {
          transform: translateZ(20px);
        }

        .case-card:hover .case-image {
          transform: scale(1.15) rotate(2deg) translateZ(10px);
        }

        /* Shimmer Effect */
        @keyframes shimmer {
          0% { background-position: -1000px 0; }
          100% { background-position: 1000px 0; }
        }

        .view-case-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            90deg,
            transparent,
            rgba(255, 255, 255, 0.2),
            transparent
          );
          transition: left 0.5s ease;
        }

        .view-case-btn:hover::before {
          left: 100%;
        }

        /* Glitch Effect on Hover */
        .case-title {
          position: relative;
        }

        .case-card:hover .case-title::before,
        .case-card:hover .case-title::after {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
        }

        /* Floating Animation for Stats */
        .hero-stat {
          animation: floatStat 3s ease-in-out infinite;
        }

        .hero-stat:nth-child(1) { animation-delay: 0s; }
        .hero-stat:nth-child(2) { animation-delay: 0.5s; }
        .hero-stat:nth-child(3) { animation-delay: 1s; }

        @keyframes floatStat {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }

        /* Glow Pulse Effect */
        @keyframes glowPulse {
          0%, 100% { box-shadow: 0 0 20px rgba(0, 99, 244, 0.5); }
          50% { box-shadow: 0 0 40px rgba(0, 99, 244, 0.8); }
        }

        .filter-btn.active {
          animation: glowPulse 2s ease-in-out infinite;
        }

        /* Smooth Reveal Animation */
        @keyframes smoothReveal {
          from {
            opacity: 0;
            transform: translateY(40px) rotateX(-10deg);
          }
          to {
            opacity: 1;
            transform: translateY(0) rotateX(0deg);
          }
        }

        .case-card {
          animation: smoothReveal 0.8s cubic-bezier(0.4, 0, 0.2, 1) both;
        }

        /* Hover Lift Effect */
        .result-item {
          transform-style: preserve-3d;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .result-item:hover {
          transform: translateY(-5px) translateZ(20px);
          box-shadow: 0 15px 40px rgba(0, 0, 0, 0.3);
        }

        /* Border Animation */
        @keyframes borderFlow {
          0% { stroke-dashoffset: 1000; }
          100% { stroke-dashoffset: 0; }
        }

        .case-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border-radius: 30px;
          padding: 1px;
          background: linear-gradient(135deg, transparent, rgba(0, 99, 244, 0.5), transparent);
          -webkit-mask: linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;
          opacity: 0;
          transition: opacity 0.5s ease;
        }

        .case-card:hover::before {
          opacity: 1;
        }
      `})]})};function w1(e){return K({attr:{viewBox:"0 0 320 512"},child:[{tag:"path",attr:{d:"M279.14 288l14.22-92.66h-88.91v-60.13c0-25.35 12.42-50.06 52.24-50.06h40.42V6.26S260.43 0 225.36 0c-73.22 0-121.08 44.38-121.08 124.72v70.62H22.89V288h81.39v224h100.17V288z"},child:[]}]})(e)}function Kj(e){return K({attr:{viewBox:"0 0 496 512"},child:[{tag:"path",attr:{d:"M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3.3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5.3-6.2 2.3zm44.2-1.7c-2.9.7-4.9 2.6-4.6 4.9.3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 20.9 2.3-16 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3.7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3.3 2.9 2.3 3.9 1.6 1 3.6.7 4.3-.7.7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3.7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3.7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"},child:[]}]})(e)}function j1(e){return K({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z"},child:[]}]})(e)}function k1(e){return K({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"},child:[]}]})(e)}function S1(e){return K({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M448,209.91a210.06,210.06,0,0,1-122.77-39.25V349.38A162.55,162.55,0,1,1,185,188.31V278.2a74.62,74.62,0,1,0,52.23,71.18V0l88,0a121.18,121.18,0,0,0,1.86,22.17h0A122.18,122.18,0,0,0,381,102.39a121.43,121.43,0,0,0,67,20.14Z"},child:[]}]})(e)}function N1(e){return K({attr:{viewBox:"0 0 512 512"},child:[{tag:"path",attr:{d:"M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"},child:[]}]})(e)}function C1(e){return K({attr:{viewBox:"0 0 448 512"},child:[{tag:"path",attr:{d:"M380.9 97.1C339 55.1 283.2 32 223.9 32c-122.4 0-222 99.6-222 222 0 39.1 10.2 77.3 29.6 111L0 480l117.7-30.9c32.4 17.7 68.9 27 106.1 27h.1c122.3 0 224.1-99.6 224.1-222 0-59.3-25.2-115-67.1-157zm-157 341.6c-33.2 0-65.7-8.9-94-25.7l-6.7-4-69.8 18.3L72 359.2l-4.4-7c-18.5-29.4-28.2-63.3-28.2-98.2 0-101.7 82.8-184.5 184.6-184.5 49.3 0 95.6 19.2 130.4 54.1 34.8 34.9 56.2 81.2 56.1 130.5 0 101.8-84.9 184.6-186.6 184.6zm101.2-138.2c-5.5-2.8-32.8-16.2-37.9-18-5.1-1.9-8.8-2.8-12.5 2.8-3.7 5.6-14.3 18-17.6 21.8-3.2 3.7-6.5 4.2-12 1.4-32.6-16.3-54-29.1-75.5-66-5.7-9.8 5.7-9.1 16.3-30.3 1.8-3.7.9-6.9-.5-9.7-1.4-2.8-12.5-30.1-17.1-41.2-4.5-10.8-9.1-9.3-12.5-9.5-3.2-.2-6.9-.2-10.6-.2-3.7 0-9.7 1.4-14.8 6.9-5.1 5.6-19.4 19-19.4 46.3 0 27.3 19.9 53.7 22.6 57.4 2.8 3.7 39.1 59.7 94.8 83.8 35.2 15.2 49 16.5 66.6 13.9 10.7-1.6 32.8-13.4 37.4-26.4 4.6-13 4.6-24.1 3.2-26.4-1.3-2.5-5-3.9-10.5-6.6z"},child:[]}]})(e)}function Qj(e){return K({attr:{viewBox:"0 0 576 512"},child:[{tag:"path",attr:{d:"M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"},child:[]}]})(e)}const Zj=()=>{const[e,n]=j.useState({name:"",email:"",subject:"",message:""}),[s,a]=j.useState(!1),[l,c]=j.useState(!1),[u,f]=j.useState(0),[p,m]=j.useState("general"),[g,v]=j.useState(null);j.useEffect(()=>{const M=()=>f(window.scrollY);return window.addEventListener("scroll",M),()=>window.removeEventListener("scroll",M)},[]);const b=M=>{n({...e,[M.target.name]:M.target.value})},y=async M=>{M.preventDefault(),a(!0),setTimeout(()=>{a(!1),c(!0),n({name:"",email:"",subject:"",message:""}),setTimeout(()=>c(!1),5e3)},2e3)},S=[{icon:i.jsx(w1,{}),name:"Facebook",url:"#",color:"#5918f2ff"},{icon:i.jsx(N1,{}),name:"Twitter/X",url:"#",color:"#1DA1F2"},{icon:i.jsx(j1,{}),name:"Instagram",url:"#",color:"#E4405F"},{icon:i.jsx(k1,{}),name:"LinkedIn",url:"#",color:"#0A66C2"},{icon:i.jsx(S1,{}),name:"TikTok",url:"#",color:"#3a0808ff"},{icon:i.jsx(C1,{}),name:"WhatsApp",url:"#",color:"#25D366"}],N=[{icon:i.jsx(en,{}),title:"Email",value:"hello@yourcompany.com",link:"mailto:hello@yourcompany.com",color:"#007AFF"},{icon:i.jsx(bi,{}),title:"Phone",value:"+1 (555) 123-4567",link:"tel:+15551234567",color:"#FF6B9D"},{icon:i.jsx(Hc,{}),title:"Location",value:"Lagos, Nigeria",link:"#map",color:"#3DDC84"}],T=[{day:"Monday - Friday",time:"9:00 AM - 6:00 PM"},{day:"Saturday",time:"10:00 AM - 4:00 PM"},{day:"Sunday",time:"Closed"}],L=[{icon:i.jsx(_e,{}),title:"Fast Response",desc:"24-hour response guarantee",color:"#FF6B9D"},{icon:i.jsx(lt,{}),title:"Secure & Private",desc:"Your data is always protected",color:"#007AFF"},{icon:i.jsx(Ke,{}),title:"Proven Results",desc:"500+ successful projects",color:"#3DDC84"},{icon:i.jsx(Xe,{}),title:"Expert Team",desc:"50+ professionals ready to help",color:"#8B5CF6"}],E=[{question:"What is your typical response time?",answer:"We aim to respond to all inquiries within 24 hours during business days. For urgent matters, you can reach us via phone or WhatsApp for immediate assistance."},{question:"Do you offer free consultations?",answer:"Yes! We offer a free 30-minute initial consultation to discuss your project requirements and how we can help bring your vision to life."},{question:"What services do you provide?",answer:"We offer mobile app development (iOS & Android), web development, UI/UX design, enterprise solutions, and digital transformation consulting."},{question:"How do you handle project pricing?",answer:"Pricing varies based on project scope, complexity, and timeline. After our initial consultation, we provide a detailed quote tailored to your specific needs."},{question:"Do you provide ongoing support?",answer:"Absolutely! We offer comprehensive post-launch support and maintenance packages to ensure your application runs smoothly and stays up-to-date."}],P=[{id:"general",label:"General Inquiry",icon:i.jsx(hi,{})},{id:"support",label:"Technical Support",icon:i.jsx(gv,{})},{id:"sales",label:"Sales & Pricing",icon:i.jsx(Ke,{})},{id:"partnership",label:"Partnership",icon:i.jsx(Xe,{})}],B=[{name:"Sarah Johnson",role:"CEO, TechStart Inc.",image:"https://i.pravatar.cc/150?img=1",text:"Working with this team was an absolute pleasure. They delivered our mobile app ahead of schedule and exceeded all expectations!"},{name:"Michael Chen",role:"Founder, AppVenture",image:"https://i.pravatar.cc/150?img=2",text:"Outstanding communication and technical expertise. Our app now has over 100K downloads thanks to their brilliant development work."},{name:"Emily Rodriguez",role:"CTO, Digital Dreams",image:"https://i.pravatar.cc/150?img=3",text:"The best development team we've worked with. Professional, responsive, and truly committed to our success."}];return i.jsxs("div",{className:"contact-page",children:[i.jsxs("div",{className:"bg-container",children:[i.jsx("div",{className:"hexagon-pattern"}),i.jsx("div",{className:"particle-field",children:[...Array(40)].map((M,F)=>i.jsx("div",{className:"particle",style:{left:`${Math.random()*100}%`,top:`${Math.random()*100}%`,animationDelay:`${Math.random()*5}s`,animationDuration:`${5+Math.random()*10}s`}},F))}),i.jsxs("div",{className:"gradient-orbs",children:[i.jsx("div",{className:"orb orb-1"}),i.jsx("div",{className:"orb orb-2"}),i.jsx("div",{className:"orb orb-3"})]})]}),i.jsx("section",{className:"hero-section",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"hero-content",children:[i.jsxs("div",{className:"contact-badge",children:[i.jsx(en,{className:"badge-icon"}),i.jsx("span",{children:"Get in Touch"})]}),i.jsxs("h1",{className:"hero-title",children:[i.jsx("span",{className:"title-line","data-text":"Contact",children:"Contact"}),i.jsx("span",{className:"title-line gradient-text","data-text":"Us",children:"Us"})]}),i.jsx("p",{className:"hero-subtitle",children:"Let's turn your ideas into reality. We're here to help you build something amazing."}),i.jsx("div",{className:"social-grid",children:S.map((M,F)=>i.jsxs("a",{href:M.url,className:"social-card",style:{"--hover-color":M.color},target:"_blank",rel:"noopener noreferrer",children:[i.jsx("div",{className:"social-icon",children:M.icon}),i.jsx("span",{className:"social-name",children:M.name}),i.jsx("div",{className:"social-glow",style:{background:M.color}})]},F))})]})})}),i.jsx("section",{className:"why-section",children:i.jsxs("div",{className:"container",children:[i.jsx("h2",{className:"section-title",children:"Why Choose Us"}),i.jsx("div",{className:"why-grid",children:L.map((M,F)=>i.jsxs("div",{className:"why-card",style:{animationDelay:`${F*.1}s`},children:[i.jsx("div",{className:"why-icon",style:{background:`linear-gradient(135deg, ${M.color}, ${M.color}dd)`},children:M.icon}),i.jsx("h3",{children:M.title}),i.jsx("p",{children:M.desc})]},F))})]})}),i.jsx("section",{className:"info-section",children:i.jsx("div",{className:"container",children:i.jsx("div",{className:"info-grid",children:N.map((M,F)=>i.jsxs("a",{href:M.link,className:"info-card",style:{animationDelay:`${F*.1}s`},children:[i.jsx("div",{className:"info-icon",style:{background:`linear-gradient(135deg, ${M.color}, ${M.color}dd)`},children:M.icon}),i.jsx("h3",{className:"info-title",children:M.title}),i.jsx("p",{className:"info-value",children:M.value}),i.jsx("div",{className:"card-shine"})]},F))})})}),i.jsx("section",{className:"hours-section",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"hours-wrapper",children:[i.jsxs("div",{className:"hours-header",children:[i.jsx(yn,{className:"hours-icon"}),i.jsx("h2",{children:"Business Hours"}),i.jsx("p",{children:"We're here when you need us"})]}),i.jsx("div",{className:"hours-list",children:T.map((M,F)=>i.jsxs("div",{className:"hours-item",children:[i.jsx("span",{className:"hours-day",children:M.day}),i.jsx("span",{className:"hours-dots"}),i.jsx("span",{className:"hours-time",children:M.time})]},F))})]})})}),i.jsx("section",{className:"form-section",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"form-wrapper",children:[i.jsxs("div",{className:"form-container",children:[i.jsxs("div",{className:"form-header",children:[i.jsx(hi,{className:"form-header-icon"}),i.jsx("h2",{children:"Send us a Message"}),i.jsx("p",{children:"Choose your inquiry type and we'll route it to the right team"})]}),i.jsx("div",{className:"contact-tabs",children:P.map(M=>i.jsxs("button",{className:`tab-btn ${p===M.id?"active":""}`,onClick:()=>m(M.id),children:[M.icon,i.jsx("span",{children:M.label})]},M.id))}),i.jsxs("form",{onSubmit:y,className:"contact-form",children:[i.jsxs("div",{className:"form-grid",children:[i.jsxs("div",{className:"form-group",children:[i.jsxs("label",{htmlFor:"name",children:[i.jsx(kv,{}),i.jsx("span",{children:"Your Name"})]}),i.jsx("input",{type:"text",id:"name",name:"name",value:e.name,onChange:b,placeholder:"John Doe",required:!0})]}),i.jsxs("div",{className:"form-group",children:[i.jsxs("label",{htmlFor:"email",children:[i.jsx(en,{}),i.jsx("span",{children:"Email Address"})]}),i.jsx("input",{type:"email",id:"email",name:"email",value:e.email,onChange:b,placeholder:"john@example.com",required:!0})]})]}),i.jsxs("div",{className:"form-group",children:[i.jsxs("label",{htmlFor:"subject",children:[i.jsx(hi,{}),i.jsx("span",{children:"Subject"})]}),i.jsx("input",{type:"text",id:"subject",name:"subject",value:e.subject,onChange:b,placeholder:"How can we help you?",required:!0})]}),i.jsxs("div",{className:"form-group",children:[i.jsxs("label",{htmlFor:"message",children:[i.jsx(hi,{}),i.jsx("span",{children:"Message"})]}),i.jsx("textarea",{id:"message",name:"message",value:e.message,onChange:b,placeholder:"Tell us more about your project...",rows:6,required:!0})]}),i.jsx("button",{type:"submit",className:"submit-btn",disabled:s,children:s?i.jsxs(i.Fragment,{children:[i.jsx("div",{className:"spinner"}),i.jsx("span",{children:"Sending..."})]}):i.jsxs(i.Fragment,{children:[i.jsx(jv,{}),i.jsx("span",{children:"Send Message"})]})})]})]}),i.jsxs("div",{className:"form-decoration",children:[i.jsx("div",{className:"deco-circle deco-1"}),i.jsx("div",{className:"deco-circle deco-2"}),i.jsx("div",{className:"deco-circle deco-3"})]})]})})}),i.jsx("section",{className:"faq-section",children:i.jsxs("div",{className:"container",children:[i.jsxs("div",{className:"faq-header",children:[i.jsx(xv,{className:"faq-icon"}),i.jsx("h2",{children:"Frequently Asked Questions"}),i.jsx("p",{children:"Quick answers to common questions"})]}),i.jsx("div",{className:"faq-list",children:E.map((M,F)=>i.jsxs("div",{className:"faq-item",children:[i.jsxs("button",{className:`faq-question ${g===F?"active":""}`,onClick:()=>v(g===F?null:F),children:[i.jsx("span",{children:M.question}),i.jsx(pi,{className:`faq-chevron ${g===F?"rotate":""}`})]}),i.jsx("div",{className:`faq-answer ${g===F?"show":""}`,children:i.jsx("p",{children:M.answer})})]},F))})]})}),i.jsx("section",{className:"testimonials-section",children:i.jsxs("div",{className:"container",children:[i.jsx("h2",{className:"section-title",children:"What Our Clients Say"}),i.jsx("div",{className:"testimonials-grid",children:B.map((M,F)=>i.jsxs("div",{className:"testimonial-card",style:{animationDelay:`${F*.15}s`},children:[i.jsx("div",{className:"testimonial-content",children:i.jsxs("p",{children:['"',M.text,'"']})}),i.jsxs("div",{className:"testimonial-author",children:[i.jsx("img",{src:M.image,alt:M.name}),i.jsxs("div",{children:[i.jsx("h4",{children:M.name}),i.jsx("p",{children:M.role})]})]})]},F))})]})}),i.jsx("section",{className:"map-section",id:"map",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"map-wrapper",children:[i.jsx("div",{className:"map-overlay",children:i.jsxs("div",{className:"map-info",children:[i.jsx(Hc,{className:"map-pin-icon"}),i.jsx("h3",{children:"Visit Our Office"}),i.jsx("p",{children:"123 Tech Boulevard, Victoria Island"}),i.jsx("p",{children:"Lagos, Nigeria"}),i.jsx("button",{className:"map-btn",children:"Get Directions"})]})}),i.jsx("iframe",{src:"https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d253682.62022494493!2d3.2406440682923!3d6.524378999999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b8b2ae68280c1%3A0xdc9e87a367c3d9cb!2sLagos!5e0!3m2!1sen!2sng!4v1699999999999!5m2!1sen!2sng",width:"100%",height:"450",style:{border:0,borderRadius:"20px"},allowFullScreen:!0,loading:"lazy"})]})})}),l&&i.jsx("div",{className:"success-modal",children:i.jsxs("div",{className:"success-content",children:[i.jsx("div",{className:"success-icon",children:i.jsx(it,{})}),i.jsx("h3",{children:"Message Sent Successfully!"}),i.jsx("p",{children:"Thank you for reaching out. We'll get back to you soon!"}),i.jsx("button",{onClick:()=>c(!1),className:"success-close",children:"Got it!"})]})}),i.jsx(Ot,{}),i.jsx("style",{children:`
        * {
          scroll-behavior: smooth;
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .contact-page {
          background: #000000;
          color: #ffffff;
          min-height: 100vh;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
          position: relative;
          overflow-x: hidden;
        }

        .bg-container {
          position: fixed;
          inset: 0;
          pointer-events: none;
          z-index: 0;
        }

        .hexagon-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 40px, rgba(255, 255, 255, 0.02) 41px),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 40px, rgba(255, 255, 255, 0.02) 41px);
          animation: hexMove 20s linear infinite;
        }

        @keyframes hexMove {
          0% { transform: translate(0, 0); }
          100% { transform: translate(40px, 40px); }
        }

        .particle-field {
          position: absolute;
          inset: 0;
          overflow: hidden;
        }

        .particle {
          position: absolute;
          width: 3px;
          height: 3px;
          background: rgba(255, 255, 255, 0.3);
          border-radius: 50%;
          animation: particleFloat linear infinite;
        }

        @keyframes particleFloat {
          0% {
            transform: translateY(0) translateX(0);
            opacity: 0;
          }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% {
            transform: translateY(-100vh) translateX(50px);
            opacity: 0;
          }
        }

        .gradient-orbs {
          position: absolute;
          inset: 0;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(100px);
          opacity: 0.3;
          animation: orbFloat 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 500px;
          height: 500px;
          background: #007AFF;
          top: -250px;
          left: -250px;
        }

        .orb-2 {
          width: 400px;
          height: 400px;
          background: #FF6B9D;
          bottom: -200px;
          right: -200px;
          animation-delay: -5s;
        }

        .orb-3 {
          width: 450px;
          height: 450px;
          background: #8B5CF6;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -10s;
        }

        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(50px, -50px) scale(1.1); }
          66% { transform: translate(-50px, 50px) scale(0.9); }
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        .section-title {
          text-align: center;
          font-size: clamp(32px, 5vw, 48px);
          font-weight: 900;
          margin-bottom: 60px;
          background: linear-gradient(135deg, #007AFF, #FF6B9D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        /* Hero Section */
        .hero-section {
          padding: 120px 0 80px;
          position: relative;
        }

        .hero-content {
          max-width: 900px;
          margin: 0 auto;
          text-align: center;
        }

        .contact-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 12px 24px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 50px;
          margin-bottom: 32px;
          backdrop-filter: blur(10px);
          animation: fadeInUp 0.6s ease-out;
        }

        .badge-icon {
          font-size: 20px;
          color: #007AFF;
        }

        .hero-title {
          font-size: clamp(48px, 8vw, 96px);
          font-weight: 900;
          margin-bottom: 24px;
          line-height: 1.1;
        }

        .title-line {
          display: block;
          position: relative;
          animation: fadeInUp 0.8s ease-out backwards;
        }

        .title-line:nth-child(1) {
          animation-delay: 0.2s;
        }

        .title-line:nth-child(2) {
          animation-delay: 0.4s;
        }

        .title-line::before {
          content: attr(data-text);
          position: absolute;
          left: 0;
          top: 0;
          width: 100%;
          height: 100%;
          text-shadow: 
            2px 2px 0 rgba(255, 107, 157, 0.5),
            -2px -2px 0 rgba(0, 122, 255, 0.5);
          z-index: -1;
          animation: glitch 3s infinite;
        }

        @keyframes glitch {
          0%, 100% { clip-path: inset(0 0 0 0); }
          10% { clip-path: inset(20% 0 60% 0); transform: translateX(2px); }
          20% { clip-path: inset(60% 0 20% 0); transform: translateX(-2px); }
          30% { clip-path: inset(40% 0 40% 0); }
        }

        .gradient-text {
          background: linear-gradient(135deg, #007AFF, #FF6B9D, #8B5CF6);
          background-size: 200% 200%;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 3s ease infinite;
        }

        @keyframes gradientShift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }

        .hero-subtitle {
          font-size: 1.25rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 60px;
          animation: fadeInUp 1s ease-out backwards;
          animation-delay: 0.6s;
        }

        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Social Links */
        .social-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: 20px;
          max-width: 800px;
          margin: 0 auto;
        }

        .social-card {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 28px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 20px;
          text-decoration: none;
          color: white;
          transition: all 0.4s ease;
          overflow: hidden;
          backdrop-filter: blur(10px);
        }

        .social-card:hover {
          transform: translateY(-10px) scale(1.05);
          border-color: var(--hover-color);
          box-shadow: 0 20px 60px rgba(0, 122, 255, 0.3);
        }

        .social-icon {
          font-size: 32px;
          transition: all 0.4s ease;
          position: relative;
          z-index: 2;
        }

        .social-card:hover .social-icon {
          transform: rotateY(360deg) scale(1.2);
          color: var(--hover-color);
        }

        .social-name {
          font-size: 0.95rem;
          font-weight: 600;
          position: relative;
          z-index: 2;
        }

        .social-glow {
          position: absolute;
          inset: -100%;
          opacity: 0;
          filter: blur(40px);
          transition: opacity 0.4s ease;
        }

        .social-card:hover .social-glow {
          opacity: 0.3;
        }

        /* Why Choose Us */
        .why-section {
          padding: 80px 0;
        }

        .why-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
          gap: 32px;
        }

        .why-card {
          padding: 40px 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          text-align: center;
          backdrop-filter: blur(10px);
          animation: slideInUp 0.6s ease-out backwards;
          transition: all 0.4s ease;
        }

        .why-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 60px rgba(0, 122, 255, 0.2);
        }

        .why-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          font-size: 36px;
          color: white;
          box-shadow: 0 10px 40px rgba(0, 122, 255, 0.4);
          animation: iconFloat 3s ease-in-out infinite;
        }

        .why-card h3 {
          font-size: 1.3rem;
          margin-bottom: 12px;
        }

        .why-card p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(50px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes iconFloat {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-10px) rotate(5deg); }
        }

        /* Contact Info */
        .info-section {
          padding: 60px 0;
        }

        .info-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 32px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .info-card {
          position: relative;
          padding: 40px 32px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          text-align: center;
          overflow: hidden;
          backdrop-filter: blur(10px);
          animation: slideInUp 0.6s ease-out backwards;
          transition: all 0.4s ease;
          text-decoration: none;
          color: white;
          display: block;
        }

        .info-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 60px rgba(0, 122, 255, 0.2);
        }

        .info-icon {
          width: 80px;
          height: 80px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 20px;
          font-size: 36px;
          color: white;
          box-shadow: 0 10px 40px rgba(0, 122, 255, 0.4);
          animation: iconFloat 3s ease-in-out infinite;
        }

        .info-title {
          font-size: 1.25rem;
          font-weight: 700;
          margin-bottom: 8px;
        }

        .info-value {
          font-size: 1rem;
          color: rgba(255, 255, 255, 0.7);
        }

        .card-shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          transform: rotate(45deg);
          animation: shine 3s infinite;
        }

        @keyframes shine {
          0% { transform: translateX(-100%) translateY(-100%) rotate(45deg); }
          100% { transform: translateX(100%) translateY(100%) rotate(45deg); }
        }

        /* Working Hours */
        .hours-section {
          padding: 80px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .hours-wrapper {
          max-width: 600px;
          margin: 0 auto;
          padding: 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          backdrop-filter: blur(20px);
        }

        .hours-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .hours-icon {
          font-size: 56px;
          color: #007AFF;
          margin-bottom: 20px;
          animation: iconPulse 2s ease-in-out infinite;
        }

        @keyframes iconPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.1); }
        }

        .hours-header h2 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 12px;
        }

        .hours-header p {
          color: rgba(255, 255, 255, 0.7);
        }

        .hours-list {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .hours-item {
          display: flex;
          align-items: center;
          padding: 20px;
          background: rgba(255, 255, 255, 0.02);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .hours-item:hover {
          background: rgba(255, 255, 255, 0.05);
          transform: translateX(10px);
        }

        .hours-day {
          font-weight: 700;
          min-width: 150px;
        }

        .hours-dots {
          flex: 1;
          height: 2px;
          background: repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.3) 0, rgba(255, 255, 255, 0.3) 4px, transparent 4px, transparent 8px);
          margin: 0 16px;
        }

        .hours-time {
          color: rgba(255, 255, 255, 0.7);
          font-weight: 600;
        }

        /* Form Section */
        .form-section {
          padding: 80px 0 120px;
        }

        .form-wrapper {
          max-width: 900px;
          margin: 0 auto;
          position: relative;
        }

        .form-container {
          position: relative;
          padding: 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          backdrop-filter: blur(20px);
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
          z-index: 2;
        }

        .form-header {
          text-align: center;
          margin-bottom: 48px;
        }

        .form-header-icon {
          font-size: 56px;
          color: #007AFF;
          margin-bottom: 20px;
          animation: iconPulse 2s ease-in-out infinite;
        }

        .form-header h2 {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 12px;
        }

        .form-header p {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.7);
        }

        /* Tabs */
        .contact-tabs {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: 12px;
          margin-bottom: 40px;
        }

        .tab-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.03);
          border: 2px solid rgba(255, 255, 255, 0.08);
          border-radius: 12px;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .tab-btn:hover {
          background: rgba(255, 255, 255, 0.05);
          border-color: rgba(255, 255, 255, 0.15);
        }

        .tab-btn.active {
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border-color: #007AFF;
          color: white;
        }

        .tab-btn svg {
          font-size: 18px;
        }

        .contact-form {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 24px;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .form-group label {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.95rem;
          font-weight: 600;
          color: rgba(255, 255, 255, 0.9);
        }

        .form-group label svg {
          font-size: 18px;
          color: #007AFF;
        }

        .form-group input,
        .form-group textarea {
          padding: 16px 20px;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-family: inherit;
          transition: all 0.3s ease;
          backdrop-filter: blur(10px);
        }

        .form-group input:focus,
        .form-group textarea:focus {
          outline: none;
          border-color: #007AFF;
          background: rgba(255, 255, 255, 0.08);
          box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }

        .form-group textarea {
          resize: vertical;
          min-height: 120px;
        }

        .submit-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 18px 40px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(0, 122, 255, 0.4);
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(0, 122, 255, 0.6);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transform: translateX(-100%);
          transition: transform 0.6s;
        }

        .submit-btn:hover::before {
          transform: translateX(100%);
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .form-decoration {
          position: absolute;
          inset: -100px;
          pointer-events: none;
          z-index: 1;
        }

        .deco-circle {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          opacity: 0.2;
          animation: decoFloat 15s ease-in-out infinite;
        }

        .deco-1 {
          width: 300px;
          height: 300px;
          background: #007AFF;
          top: -150px;
          right: -150px;
        }

        .deco-2 {
          width: 250px;
          height: 250px;
          background: #FF6B9D;
          bottom: -125px;
          left: -125px;
          animation-delay: -5s;
        }

        .deco-3 {
          width: 200px;
          height: 200px;
          background: #8B5CF6;
          top: 50%;
          right: -100px;
          animation-delay: -10s;
        }

        @keyframes decoFloat {
          0%, 100% { transform: translate(0, 0); }
          33% { transform: translate(30px, -30px); }
          66% { transform: translate(-30px, 30px); }
        }

        /* FAQ Section */
        .faq-section {
          padding: 80px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .faq-header {
          text-align: center;
          margin-bottom: 60px;
        }

        .faq-icon {
          font-size: 56px;
          color: #8B5CF6;
          margin-bottom: 20px;
          animation: iconPulse 2s ease-in-out infinite;
        }

        .faq-header h2 {
          font-size: 2.5rem;
          font-weight: 900;
          margin-bottom: 12px;
        }

        .faq-header p {
          color: rgba(255, 255, 255, 0.7);
          font-size: 1.1rem;
        }

        .faq-list {
          max-width: 900px;
          margin: 0 auto;
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .faq-item {
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 16px;
          overflow: hidden;
          backdrop-filter: blur(10px);
          transition: all 0.3s ease;
        }

        .faq-item:hover {
          background: rgba(255, 255, 255, 0.05);
        }

        .faq-question {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 24px 28px;
          background: transparent;
          border: none;
          color: white;
          font-size: 1.1rem;
          font-weight: 700;
          text-align: left;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .faq-question:hover {
          color: #007AFF;
        }

        .faq-question.active {
          color: #007AFF;
        }

        .faq-chevron {
          font-size: 24px;
          transition: transform 0.3s ease;
        }

        .faq-chevron.rotate {
          transform: rotate(180deg);
        }

        .faq-answer {
          max-height: 0;
          overflow: hidden;
          transition: max-height 0.3s ease, padding 0.3s ease;
        }

        .faq-answer.show {
          max-height: 300px;
          padding: 0 28px 24px;
        }

        .faq-answer p {
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.8;
          font-size: 1rem;
        }

        /* Testimonials */
        .testimonials-section {
          padding: 80px 0;
        }

        .testimonials-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
          gap: 32px;
        }

        .testimonial-card {
          padding: 40px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 24px;
          backdrop-filter: blur(10px);
          animation: slideInUp 0.6s ease-out backwards;
          transition: all 0.4s ease;
        }

        .testimonial-card:hover {
          transform: translateY(-10px);
          background: rgba(255, 255, 255, 0.05);
          box-shadow: 0 20px 60px rgba(0, 122, 255, 0.2);
        }

        .testimonial-content {
          margin-bottom: 24px;
        }

        .testimonial-content p {
          font-size: 1.05rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.8);
          font-style: italic;
        }

        .testimonial-author {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .testimonial-author img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
          border: 2px solid #007AFF;
        }

        .testimonial-author h4 {
          font-size: 1.1rem;
          margin-bottom: 4px;
        }

        .testimonial-author p {
          font-size: 0.9rem;
          color: rgba(255, 255, 255, 0.6);
        }

        /* Map Section */
        .map-section {
          padding: 80px 0;
          background: rgba(255, 255, 255, 0.01);
        }

        .map-wrapper {
          position: relative;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 30px 80px rgba(0, 0, 0, 0.5);
        }

        .map-overlay {
          position: absolute;
          top: 24px;
          left: 24px;
          z-index: 10;
        }

        .map-info {
          padding: 32px;
          background: rgba(0, 0, 0, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 20px;
          backdrop-filter: blur(20px);
          max-width: 320px;
        }

        .map-pin-icon {
          font-size: 40px;
          color: #FF6B9D;
          margin-bottom: 16px;
        }

        .map-info h3 {
          font-size: 1.5rem;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .map-info p {
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 8px;
          line-height: 1.6;
        }

        .map-btn {
          margin-top: 20px;
          padding: 12px 24px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border: none;
          border-radius: 10px;
          color: white;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          width: 100%;
        }

        .map-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 30px rgba(0, 122, 255, 0.5);
        }

        /* Success Modal */
        .success-modal {
          position: fixed;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(0, 0, 0, 0.8);
          backdrop-filter: blur(10px);
          z-index: 1000;
          animation: fadeIn 0.3s ease-out;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        .success-content {
          max-width: 500px;
          padding: 60px 40px;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 32px;
          text-align: center;
          backdrop-filter: blur(20px);
          animation: scaleIn 0.4s ease-out;
        }

        @keyframes scaleIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        .success-icon {
          width: 100px;
          height: 100px;
          margin: 0 auto 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #3DDC84, #07C160);
          border-radius: 50%;
          font-size: 56px;
          color: white;
          box-shadow: 0 20px 60px rgba(61, 220, 132, 0.5);
          animation: successPulse 2s ease-in-out infinite;
        }

        @keyframes successPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        .success-content h3 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 16px;
        }

        .success-content p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 32px;
          line-height: 1.6;
        }

        .success-close {
          padding: 16px 48px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1.05rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          box-shadow: 0 10px 40px rgba(0, 122, 255, 0.4);
        }

        .success-close:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 50px rgba(0, 122, 255, 0.6);
        }

        /* Responsive */
        @media (max-width: 1024px) {
          .contact-tabs {
            grid-template-columns: repeat(2, 1fr);
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 80px 0 60px;
          }

          .hero-title {
            font-size: clamp(36px, 10vw, 64px);
          }

          .hero-subtitle {
            font-size: 1.1rem;
            margin-bottom: 40px;
          }

          .social-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 16px;
          }

          .why-grid {
            grid-template-columns: 1fr;
          }

          .info-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .hours-wrapper {
            padding: 40px 24px;
          }

          .hours-day {
            min-width: 120px;
          }

          .form-container {
            padding: 40px 24px;
          }

          .form-header-icon {
            font-size: 48px;
          }

          .form-header h2 {
            font-size: 2rem;
          }

          .contact-tabs {
            grid-template-columns: 1fr;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .submit-btn {
            padding: 16px 32px;
            font-size: 1rem;
          }

          .testimonials-grid {
            grid-template-columns: 1fr;
          }

          .map-overlay {
            position: static;
            padding: 24px;
          }

          .map-info {
            max-width: 100%;
          }

          .success-content {
            margin: 0 20px;
            padding: 40px 24px;
          }

          .success-icon {
            width: 80px;
            height: 80px;
            font-size: 48px;
          }

          .success-content h3 {
            font-size: 1.5rem;
          }
        }

        @media (max-width: 480px) {
          .contact-badge {
            padding: 10px 20px;
            font-size: 0.9rem;
          }

          .badge-icon {
            font-size: 18px;
          }

          .hero-title {
            margin-bottom: 20px;
          }

          .social-grid {
            grid-template-columns: 1fr;
          }

          .social-card {
            padding: 20px 16px;
          }

          .social-icon {
            font-size: 28px;
          }

          .info-card {
            padding: 32px 24px;
          }

          .info-icon {
            width: 70px;
            height: 70px;
            font-size: 32px;
          }

          .hours-item {
            flex-direction: column;
            text-align: center;
            gap: 12px;
          }

          .hours-dots {
            display: none;
          }

          .form-container {
            padding: 32px 20px;
          }

          .form-header h2 {
            font-size: 1.75rem;
          }

          .form-header p {
            font-size: 0.95rem;
          }

          .form-group input,
          .form-group textarea {
            padding: 14px 16px;
            font-size: 0.95rem;
          }

          .tab-btn {
            font-size: 0.85rem;
            padding: 14px 16px;
          }

          .faq-question {
            font-size: 1rem;
            padding: 20px;
          }

          .testimonial-card {
            padding: 28px 24px;
          }
        }
      `})]})},Jj=()=>{const[e,n]=j.useState(""),[s,a]=j.useState(!1),[l,c]=j.useState(!1),u=b=>{b.preventDefault(),c(!0),setTimeout(()=>{c(!1),a(!0),n(""),setTimeout(()=>a(!1),4e3)},1500)},f=[{name:"About Verapixels",path:"/aboutverapixels"},{name:"Our Core Team",path:"/ourcoreteam"},{name:"How We Work",path:"/howweworkandfunction"},{name:"Client Portfolio",path:"/clientportfolio"},{name:"Testimonials",path:"/clienttestimonials"},{name:"CSR",path:"/corporatesocialresponsibility"},{name:"Careers",path:"/startyourcareerwithus"}],p=[{name:"Web Development",path:"/webdevelopment"},{name:"Mobile App Development",path:"/mobileappdevelopment"},{name:"UI/UX Design",path:"/uiuxdesign"},{name:"Cloud Solutions",path:"/cloudsolutions"},{name:"DevOps Services",path:"/devopsservices"},{name:"Cybersecurity",path:"/cybersecurity"},{name:"Digital Marketing",path:"/digitalmarketing"}],m=[{name:"All Projects",path:"/allprojects"},{name:"Web Applications",path:"/webapplications"},{name:"Mobile Apps",path:"/mobileapps"},{name:"E-commerce Solutions",path:"/ecommercesolutions"},{name:"Enterprise Software",path:"/enterprisesoftware"},{name:"Case Studies",path:"/casestudies"}],g=[{name:"Home",path:"/"},{name:"Contact",path:"/contact"},{name:"Privacy Policy",path:"/privacy"},{name:"Terms of Service",path:"/terms"},{name:"Blog",path:"/blog"},{name:"FAQ",path:"/faq"}],v=[{icon:i.jsx(w1,{}),url:"#",color:"#1877F2",name:"Facebook"},{icon:i.jsx(N1,{}),url:"#",color:"#1DA1F2",name:"Twitter"},{icon:i.jsx(j1,{}),url:"#",color:"#E4405F",name:"Instagram"},{icon:i.jsx(k1,{}),url:"#",color:"#0A66C2",name:"LinkedIn"},{icon:i.jsx(S1,{}),url:"#",color:"#000000",name:"TikTok"},{icon:i.jsx(C1,{}),url:"#",color:"#25D366",name:"WhatsApp"},{icon:i.jsx(Qj,{}),url:"#",color:"#FF0000",name:"YouTube"},{icon:i.jsx(Kj,{}),url:"#",color:"#333333",name:"GitHub"}];return i.jsxs("footer",{className:"vp-footer",children:[i.jsxs("div",{className:"footer-bg",children:[i.jsxs("div",{className:"footer-orbs",children:[i.jsx("div",{className:"footer-orb orb-1"}),i.jsx("div",{className:"footer-orb orb-2"}),i.jsx("div",{className:"footer-orb orb-3"})]}),i.jsx("div",{className:"footer-grid-pattern"})]}),i.jsx("div",{className:"newsletter-section",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"newsletter-wrapper",children:[i.jsxs("div",{className:"newsletter-content",children:[i.jsx("div",{className:"newsletter-icon",children:i.jsx(en,{})}),i.jsxs("div",{className:"newsletter-text",children:[i.jsx("h3",{children:"Subscribe to Our Newsletter"}),i.jsx("p",{children:"Get the latest updates, insights, and exclusive offers delivered to your inbox"})]})]}),i.jsxs("div",{className:"newsletter-form-wrapper",children:[i.jsxs("div",{className:"newsletter-input-wrapper",children:[i.jsx(en,{className:"input-icon"}),i.jsx("input",{type:"email",value:e,onChange:b=>n(b.target.value),placeholder:"Enter your email address",required:!0,disabled:l,onKeyPress:b=>b.key==="Enter"&&u(b)}),i.jsx("button",{onClick:u,disabled:l,children:l?i.jsx("div",{className:"spinner"}):i.jsxs(i.Fragment,{children:[i.jsx("span",{children:"Subscribe"}),i.jsx(De,{})]})})]}),s&&i.jsxs("div",{className:"newsletter-success",children:[i.jsx(it,{}),i.jsx("span",{children:"Successfully subscribed! Check your email for confirmation."})]})]})]})})}),i.jsx("div",{className:"footer-main",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"footer-grid",children:[i.jsxs("div",{className:"footer-col footer-brand",children:[i.jsxs("div",{className:"brand-logo",children:[i.jsx("img",{src:"/src/assets/verapixels_logo_icon.jpg",alt:"Verapixels"}),i.jsx("span",{children:"Verapixels"})]}),i.jsx("p",{className:"brand-description",children:"Transforming ideas into powerful digital solutions. We build cutting-edge web and mobile applications that drive business growth."}),i.jsxs("div",{className:"contact-info",children:[i.jsxs("a",{href:"tel:+15551234567",className:"contact-item",children:[i.jsx(bi,{}),i.jsx("span",{children:"+1 (555) 123-4567"})]}),i.jsxs("a",{href:"mailto:hello@verapixels.com",className:"contact-item",children:[i.jsx(en,{}),i.jsx("span",{children:"hello@verapixels.com"})]}),i.jsxs("div",{className:"contact-item",children:[i.jsx(Hc,{}),i.jsx("span",{children:"Lagos, Nigeria"})]})]}),i.jsx("div",{className:"social-links",children:v.map((b,y)=>i.jsx("a",{href:b.url,className:"social-link",style:{"--social-color":b.color},target:"_blank",rel:"noopener noreferrer","aria-label":b.name,children:b.icon},y))})]}),i.jsxs("div",{className:"footer-col",children:[i.jsx("h4",{className:"footer-title",children:"About Us"}),i.jsx("ul",{className:"footer-links",children:f.map((b,y)=>i.jsx("li",{children:i.jsxs(fe,{to:b.path,children:[i.jsx(De,{className:"link-icon"}),b.name]})},y))})]}),i.jsxs("div",{className:"footer-col",children:[i.jsx("h4",{className:"footer-title",children:"Services"}),i.jsx("ul",{className:"footer-links",children:p.map((b,y)=>i.jsx("li",{children:i.jsxs(fe,{to:b.path,children:[i.jsx(De,{className:"link-icon"}),b.name]})},y))})]}),i.jsxs("div",{className:"footer-col",children:[i.jsx("h4",{className:"footer-title",children:"Portfolio"}),i.jsx("ul",{className:"footer-links",children:m.map((b,y)=>i.jsx("li",{children:i.jsxs(fe,{to:b.path,children:[i.jsx(De,{className:"link-icon"}),b.name]})},y))})]}),i.jsxs("div",{className:"footer-col",children:[i.jsx("h4",{className:"footer-title",children:"Quick Links"}),i.jsx("ul",{className:"footer-links",children:g.map((b,y)=>i.jsx("li",{children:i.jsxs(fe,{to:b.path,children:[i.jsx(De,{className:"link-icon"}),b.name]})},y))})]})]})})}),i.jsx("div",{className:"footer-bottom",children:i.jsx("div",{className:"container",children:i.jsxs("div",{className:"footer-bottom-content",children:[i.jsxs("p",{className:"copyright",children:["© ",new Date().getFullYear()," Verapixels. All rights reserved."]}),i.jsxs("p",{className:"made-with",children:["Made with ",i.jsx(fo,{className:"heart-icon"})," by Verapixels Team"]}),i.jsxs("div",{className:"footer-bottom-links",children:[i.jsx(fe,{to:"/privacy",children:"Privacy"}),i.jsx("span",{className:"separator",children:"•"}),i.jsx(fe,{to:"/terms",children:"Terms"}),i.jsx("span",{className:"separator",children:"•"}),i.jsx(fe,{to:"/cookies",children:"Cookies"})]})]})})}),i.jsx("style",{children:`
         .vp-footer {
          background: #000000;
          color: #ffffff;
          position: relative;
          overflow: hidden;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
        }

        .footer-bg {
          position: absolute;
          inset: 0;
          pointer-events: none;
          overflow: hidden;
        }

        .footer-orbs {
          position: absolute;
          inset: 0;
        }

        .footer-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(120px);
          opacity: 0.2;
          animation: orbPulse 20s ease-in-out infinite;
        }

        .orb-1 {
          width: 600px;
          height: 600px;
          background: #007AFF;
          top: -300px;
          left: -300px;
        }

        .orb-2 {
          width: 500px;
          height: 500px;
          background: #FF6B9D;
          bottom: -250px;
          right: -250px;
          animation-delay: -7s;
        }

        .orb-3 {
          width: 550px;
          height: 550px;
          background: #8B5CF6;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          animation-delay: -14s;
        }

        @keyframes orbPulse {
          0%, 100% { transform: scale(1); opacity: 0.2; }
          50% { transform: scale(1.2); opacity: 0.3; }
        }

        .footer-grid-pattern {
          position: absolute;
          inset: 0;
          background-image: 
            repeating-linear-gradient(0deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 50px, rgba(255, 255, 255, 0.02) 51px),
            repeating-linear-gradient(90deg, rgba(255, 255, 255, 0.02) 0px, transparent 1px, transparent 50px, rgba(255, 255, 255, 0.02) 51px);
        }

        .container {
          max-width: 1400px;
          margin: 0 auto;
          padding: 0 24px;
          position: relative;
          z-index: 1;
        }

        /* Newsletter Section */
        .newsletter-section {
          padding: 80px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }

        .newsletter-wrapper {
          max-width: 1200px;
          margin: 0 auto;
          padding: 60px;
          background: rgba(255, 255, 255, 0.03);
          border: 1px solid rgba(255, 255, 255, 0.08);
          border-radius: 32px;
          backdrop-filter: blur(20px);
          position: relative;
          overflow: hidden;
        }

        .newsletter-wrapper::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #007AFF, #FF6B9D, transparent);
          animation: shimmer 3s infinite;
        }

        @keyframes shimmer {
          0%, 100% { transform: translateX(-100%); }
          50% { transform: translateX(100%); }
        }

        .newsletter-content {
          display: flex;
          align-items: center;
          gap: 24px;
          margin-bottom: 32px;
        }

        .newsletter-icon {
          width: 80px;
          height: 80px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border-radius: 20px;
          font-size: 36px;
          flex-shrink: 0;
          box-shadow: 0 10px 40px rgba(0, 122, 255, 0.4);
          animation: iconBounce 3s ease-in-out infinite;
        }

        @keyframes iconBounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }

        .newsletter-text h3 {
          font-size: 2rem;
          font-weight: 900;
          margin-bottom: 8px;
          background: linear-gradient(135deg, #007AFF, #FF6B9D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .newsletter-text p {
          font-size: 1.05rem;
          color: rgba(255, 255, 255, 0.7);
          line-height: 1.6;
        }

        .newsletter-form-wrapper {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .newsletter-input-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px;
          background: rgba(255, 255, 255, 0.05);
          border: 2px solid rgba(255, 255, 255, 0.1);
          border-radius: 16px;
          transition: all 0.3s ease;
        }

        .newsletter-input-wrapper:focus-within {
          border-color: #007AFF;
          box-shadow: 0 0 0 4px rgba(0, 122, 255, 0.1);
        }

        .input-icon {
          font-size: 24px;
          color: rgba(255, 255, 255, 0.5);
          margin-left: 16px;
        }

        .newsletter-input-wrapper input {
          flex: 1;
          padding: 16px;
          background: transparent;
          border: none;
          color: white;
          font-size: 1rem;
          outline: none;
        }

        .newsletter-input-wrapper input::placeholder {
          color: rgba(255, 255, 255, 0.5);
        }

        .newsletter-input-wrapper button {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 16px 32px;
          background: linear-gradient(135deg, #007AFF, #5AC8FA);
          border: none;
          border-radius: 12px;
          color: white;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .newsletter-input-wrapper button:hover:not(:disabled) {
          transform: translateX(5px);
          box-shadow: 0 10px 30px rgba(0, 122, 255, 0.5);
        }

        .newsletter-input-wrapper button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: white;
          border-radius: 50%;
          animation: spin 0.8s linear infinite;
        }

        @keyframes spin {
          to { transform: rotate(360deg); }
        }

        .newsletter-success {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 16px 20px;
          background: rgba(61, 220, 132, 0.1);
          border: 1px solid rgba(61, 220, 132, 0.3);
          border-radius: 12px;
          color: #3DDC84;
          font-weight: 600;
          animation: slideInUp 0.4s ease-out;
        }

        .newsletter-success svg {
          font-size: 24px;
        }

        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* Main Footer */
        .footer-main {
          padding: 80px 0 40px;
        }

        .footer-grid {
          display: grid;
          grid-template-columns: 2fr repeat(4, 1fr);
          gap: 60px;
        }

        .footer-col {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        /* Brand Column */
        .footer-brand {
          padding-right: 40px;
        }

        .brand-logo {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 20px;
        }

        .brand-logo img {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          object-fit: cover;
        }

        .brand-logo span {
          font-size: 1.5rem;
          font-weight: 900;
          background: linear-gradient(135deg, #007AFF, #FF6B9D);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        .brand-description {
          font-size: 1rem;
          line-height: 1.8;
          color: rgba(255, 255, 255, 0.7);
          margin-bottom: 24px;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 16px;
          margin-bottom: 24px;
        }

        .contact-item {
          display: flex;
          align-items: center;
          gap: 12px;
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .contact-item:hover {
          color: #007AFF;
          transform: translateX(5px);
        }

        .contact-item svg {
          font-size: 20px;
          color: #007AFF;
        }

        .social-links {
          display: flex;
          flex-wrap: wrap;
          gap: 12px;
        }

        .social-link {
          width: 48px;
          height: 48px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          color: white;
          font-size: 20px;
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .social-link::before {
          content: '';
          position: absolute;
          inset: 0;
          background: var(--social-color);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .social-link:hover {
          transform: translateY(-5px) scale(1.1);
          border-color: var(--social-color);
          box-shadow: 0 10px 30px rgba(0, 122, 255, 0.3);
        }

        .social-link:hover::before {
          opacity: 0.2;
        }

        .social-link svg {
          position: relative;
          z-index: 1;
        }

        /* Footer Links */
        .footer-title {
          font-size: 1.25rem;
          font-weight: 900;
          margin-bottom: 4px;
          color: white;
          position: relative;
          padding-bottom: 12px;
        }

        .footer-title::after {
          content: '';
          position: absolute;
          bottom: 0;
          left: 0;
          width: 40px;
          height: 3px;
          background: linear-gradient(90deg, #007AFF, #FF6B9D);
          border-radius: 2px;
        }

        .footer-links {
          list-style: none;
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .footer-links li a {
          display: flex;
          align-items: center;
          gap: 8px;
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          transition: all 0.3s ease;
          font-size: 0.95rem;
        }

        .footer-links li a:hover {
          color: #007AFF;
          transform: translateX(5px);
        }

        .link-icon {
          font-size: 14px;
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .footer-links li a:hover .link-icon {
          opacity: 1;
        }

        /* Footer Bottom */
        .footer-bottom {
          padding: 32px 0;
          border-top: 1px solid rgba(255, 255, 255, 0.1);
        }

        .footer-bottom-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          flex-wrap: wrap;
          gap: 20px;
        }

        .copyright,
        .made-with {
          font-size: 0.95rem;
          color: rgba(255, 255, 255, 0.6);
        }

        .made-with {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .heart-icon {
          color: #FF6B9D;
          animation: heartbeat 1.5s ease-in-out infinite;
        }

        @keyframes heartbeat {
          0%, 100% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1); }
        }

        .footer-bottom-links {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .footer-bottom-links a {
          color: rgba(255, 255, 255, 0.6);
          text-decoration: none;
          font-size: 0.95rem;
          transition: color 0.3s ease;
        }

        .footer-bottom-links a:hover {
          color: #007AFF;
        }

        .separator {
          color: rgba(255, 255, 255, 0.3);
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .footer-grid {
            grid-template-columns: 2fr 1fr 1fr;
            gap: 40px;
          }

          .footer-col:nth-child(4),
          .footer-col:nth-child(5) {
            grid-column: span 1;
          }
        }

        @media (max-width: 992px) {
          .footer-grid {
            grid-template-columns: repeat(2, 1fr);
            gap: 40px;
          }

          .footer-brand {
            grid-column: span 2;
            padding-right: 0;
          }
        }

        @media (max-width: 768px) {
          .newsletter-section {
            padding: 60px 0;
          }

          .newsletter-wrapper {
            padding: 40px 24px;
          }

          .newsletter-content {
            flex-direction: column;
            text-align: center;
          }

          .newsletter-text h3 {
            font-size: 1.5rem;
          }

          .newsletter-input-wrapper {
            flex-direction: column;
            align-items: stretch;
          }

          .newsletter-input-wrapper button {
            width: 100%;
            justify-content: center;
          }

          .footer-main {
            padding: 60px 0 40px;
          }

          .footer-grid {
            grid-template-columns: 1fr;
            gap: 40px;
          }

          .footer-brand {
            grid-column: span 1;
          }

          .social-links {
            justify-content: center;
          }

          .footer-bottom-content {
            flex-direction: column;
            text-align: center;
            gap: 16px;
          }
        }

        @media (max-width: 480px) {
          .newsletter-icon {
            width: 64px;
            height: 64px;
            font-size: 28px;
          }

          .newsletter-text h3 {
            font-size: 1.25rem;
          }

          .newsletter-text p {
            font-size: 0.95rem;
          }

          .brand-logo img {
            width: 40px;
            height: 40px;
          }

          .brand-logo span {
            font-size: 1.25rem;
          }

          .social-link {
            width: 44px;
            height: 44px;
            font-size: 18px;
          }

          .footer-title {
            font-size: 1.1rem;
          }

          .footer-links li a {
            font-size: 0.9rem;
          }

          .footer-bottom-links {
            flex-direction: column;
            gap: 8px;
          }

          .separator {
            display: none;
          }
        }
      `})]})},ek=()=>i.jsxs("div",{children:[i.jsx(Cv,{}),i.jsx(Td,{}),"+",i.jsxs(k5,{children:[i.jsx(Pe,{path:"/",element:i.jsx(tj,{})}),i.jsx(Pe,{path:"/aboutverapixels",element:i.jsx(nj,{})}),i.jsx(Pe,{path:"/ourcoreteam",element:i.jsx(sj,{})}),i.jsx(Pe,{path:"/howweworkandfunction",element:i.jsx(ij,{})}),i.jsx(Pe,{path:"/clientportfolio",element:i.jsx(rj,{})}),i.jsx(Pe,{path:"/clienttestimonials",element:i.jsx(aj,{})}),i.jsx(Pe,{path:"/corporatesocialresponsibility",element:i.jsx(oj,{})}),i.jsx(Pe,{path:"/startyourcareerwithus",element:i.jsx(lj,{})}),i.jsx(Pe,{path:"/webdevelopment",element:i.jsx(Rj,{})}),i.jsx(Pe,{path:"/mobileappdevelopment",element:i.jsx(Ij,{})}),i.jsx(Pe,{path:"/mobile-app-learn-more",element:i.jsx(Uj,{})})," ",i.jsx(Pe,{path:"/uiuxdesign",element:i.jsx(Oj,{})}),i.jsx(Pe,{path:"/cloudsolutions",element:i.jsx(Vj,{})}),i.jsx(Pe,{path:"/devopsservices",element:i.jsx(Bj,{})}),i.jsx(Pe,{path:"/cybersecurity",element:i.jsx(_j,{})}),i.jsx(Pe,{path:"/digitalmarketing",element:i.jsx(Wj,{})}),i.jsx(Pe,{path:"/allprojects",element:i.jsx(Yj,{})}),i.jsx(Pe,{path:"/webapplications",element:i.jsx($j,{})}),i.jsx(Pe,{path:"/mobileapps",element:i.jsx(Hj,{})}),i.jsx(Pe,{path:"/ecommercesolutions",element:i.jsx(Gj,{})}),i.jsx(Pe,{path:"/enterprisesoftware",element:i.jsx(qj,{})}),i.jsx(Pe,{path:"/casestudies",element:i.jsx(Xj,{})}),i.jsx(Pe,{path:"/contact",element:i.jsx(Zj,{})})]}),i.jsx(Jj,{})]});L2.createRoot(document.getElementById("root")).render(i.jsx(j.StrictMode,{children:i.jsx(G5,{basename:"/",children:i.jsx(ek,{})})}));
