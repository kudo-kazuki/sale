import{d as M,m as A,u as E,c as P,o,w as L,T as F,a as i,b as l,e as S,t as D,n as C,f as N,_ as B,r as m,g as V,h as $,i as f,j as x,F as W,k as I,l as z,p as X,q as H,s as Q,v as R,x as q,L as Y}from"./index-Bxpq43On.js";import{u as O}from"./meta-DxkICGRB.js";import{b as k,a as p,c as j,d as b,f as U,u as G,C as J}from"./CircleLinkItem-Bc7mb57A.js";import{B as K}from"./Breadcrumbs-DK2zOzf2.js";var Z={lessThanXSeconds:{one:"1秒未満",other:"{{count}}秒未満",oneWithSuffix:"約1秒",otherWithSuffix:"約{{count}}秒"},xSeconds:{one:"1秒",other:"{{count}}秒"},halfAMinute:"30秒",lessThanXMinutes:{one:"1分未満",other:"{{count}}分未満",oneWithSuffix:"約1分",otherWithSuffix:"約{{count}}分"},xMinutes:{one:"1分",other:"{{count}}分"},aboutXHours:{one:"約1時間",other:"約{{count}}時間"},xHours:{one:"1時間",other:"{{count}}時間"},xDays:{one:"1日",other:"{{count}}日"},aboutXWeeks:{one:"約1週間",other:"約{{count}}週間"},xWeeks:{one:"1週間",other:"{{count}}週間"},aboutXMonths:{one:"約1か月",other:"約{{count}}か月"},xMonths:{one:"1か月",other:"{{count}}か月"},aboutXYears:{one:"約1年",other:"約{{count}}年"},xYears:{one:"1年",other:"{{count}}年"},overXYears:{one:"1年以上",other:"{{count}}年以上"},almostXYears:{one:"1年近く",other:"{{count}}年近く"}},ee=function(t,a,e){e=e||{};var n,r=Z[t];return typeof r=="string"?n=r:a===1?e.addSuffix&&r.oneWithSuffix?n=r.oneWithSuffix:n=r.one:e.addSuffix&&r.otherWithSuffix?n=r.otherWithSuffix.replace("{{count}}",String(a)):n=r.other.replace("{{count}}",String(a)),e.addSuffix?e.comparison&&e.comparison>0?n+"後":n+"前":n},te={full:"y年M月d日EEEE",long:"y年M月d日",medium:"y/MM/dd",short:"y/MM/dd"},ae={full:"H時mm分ss秒 zzzz",long:"H:mm:ss z",medium:"H:mm:ss",short:"H:mm"},re={full:"{{date}} {{time}}",long:"{{date}} {{time}}",medium:"{{date}} {{time}}",short:"{{date}} {{time}}"},ne={date:k({formats:te,defaultWidth:"full"}),time:k({formats:ae,defaultWidth:"full"}),dateTime:k({formats:re,defaultWidth:"full"})},oe={lastWeek:"先週のeeeeのp",yesterday:"昨日のp",today:"今日のp",tomorrow:"明日のp",nextWeek:"翌週のeeeeのp",other:"P"},se=function(t,a,e,n){return oe[t]},ie={narrow:["BC","AC"],abbreviated:["紀元前","西暦"],wide:["紀元前","西暦"]},ue={narrow:["1","2","3","4"],abbreviated:["Q1","Q2","Q3","Q4"],wide:["第1四半期","第2四半期","第3四半期","第4四半期"]},le={narrow:["1","2","3","4","5","6","7","8","9","10","11","12"],abbreviated:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"],wide:["1月","2月","3月","4月","5月","6月","7月","8月","9月","10月","11月","12月"]},de={narrow:["日","月","火","水","木","金","土"],short:["日","月","火","水","木","金","土"],abbreviated:["日","月","火","水","木","金","土"],wide:["日曜日","月曜日","火曜日","水曜日","木曜日","金曜日","土曜日"]},ce={narrow:{am:"午前",pm:"午後",midnight:"深夜",noon:"正午",morning:"朝",afternoon:"午後",evening:"夜",night:"深夜"},abbreviated:{am:"午前",pm:"午後",midnight:"深夜",noon:"正午",morning:"朝",afternoon:"午後",evening:"夜",night:"深夜"},wide:{am:"午前",pm:"午後",midnight:"深夜",noon:"正午",morning:"朝",afternoon:"午後",evening:"夜",night:"深夜"}},me={narrow:{am:"午前",pm:"午後",midnight:"深夜",noon:"正午",morning:"朝",afternoon:"午後",evening:"夜",night:"深夜"},abbreviated:{am:"午前",pm:"午後",midnight:"深夜",noon:"正午",morning:"朝",afternoon:"午後",evening:"夜",night:"深夜"},wide:{am:"午前",pm:"午後",midnight:"深夜",noon:"正午",morning:"朝",afternoon:"午後",evening:"夜",night:"深夜"}},he=function(t,a){var e=Number(t),n=String(a==null?void 0:a.unit);switch(n){case"year":return"".concat(e,"年");case"quarter":return"第".concat(e,"四半期");case"month":return"".concat(e,"月");case"week":return"第".concat(e,"週");case"date":return"".concat(e,"日");case"hour":return"".concat(e,"時");case"minute":return"".concat(e,"分");case"second":return"".concat(e,"秒");default:return"".concat(e)}},fe={ordinalNumber:he,era:p({values:ie,defaultWidth:"wide"}),quarter:p({values:ue,defaultWidth:"wide",argumentCallback:function(t){return Number(t)-1}}),month:p({values:le,defaultWidth:"wide"}),day:p({values:de,defaultWidth:"wide"}),dayPeriod:p({values:ce,defaultWidth:"wide",formattingValues:me,defaultFormattingWidth:"wide"})},ve=/^第?\d+(年|四半期|月|週|日|時|分|秒)?/i,ge=/\d+/i,_e={narrow:/^(B\.?C\.?|A\.?D\.?)/i,abbreviated:/^(紀元[前後]|西暦)/i,wide:/^(紀元[前後]|西暦)/i},ye={narrow:[/^B/i,/^A/i],any:[/^(紀元前)/i,/^(西暦|紀元後)/i]},pe={narrow:/^[1234]/i,abbreviated:/^Q[1234]/i,wide:/^第[1234一二三四１２３４]四半期/i},be={any:[/(1|一|１)/i,/(2|二|２)/i,/(3|三|３)/i,/(4|四|４)/i]},we={narrow:/^([123456789]|1[012])/,abbreviated:/^([123456789]|1[012])月/i,wide:/^([123456789]|1[012])月/i},Pe={any:[/^1\D/,/^2/,/^3/,/^4/,/^5/,/^6/,/^7/,/^8/,/^9/,/^10/,/^11/,/^12/]},xe={narrow:/^[日月火水木金土]/,short:/^[日月火水木金土]/,abbreviated:/^[日月火水木金土]/,wide:/^[日月火水木金土]曜日/},ke={any:[/^日/,/^月/,/^火/,/^水/,/^木/,/^金/,/^土/]},Se={any:/^(AM|PM|午前|午後|正午|深夜|真夜中|夜|朝)/i},De={any:{am:/^(A|午前)/i,pm:/^(P|午後)/i,midnight:/^深夜|真夜中/i,noon:/^正午/i,morning:/^朝/i,afternoon:/^午後/i,evening:/^夜/i,night:/^深夜/i}},We={ordinalNumber:j({matchPattern:ve,parsePattern:ge,valueCallback:function(t){return parseInt(t,10)}}),era:b({matchPatterns:_e,defaultMatchWidth:"wide",parsePatterns:ye,defaultParseWidth:"any"}),quarter:b({matchPatterns:pe,defaultMatchWidth:"wide",parsePatterns:be,defaultParseWidth:"any",valueCallback:function(t){return t+1}}),month:b({matchPatterns:we,defaultMatchWidth:"wide",parsePatterns:Pe,defaultParseWidth:"any"}),day:b({matchPatterns:xe,defaultMatchWidth:"wide",parsePatterns:ke,defaultParseWidth:"any"}),dayPeriod:b({matchPatterns:Se,defaultMatchWidth:"any",parsePatterns:De,defaultParseWidth:"any"})},Me={code:"ja",formatDistance:ee,formatLong:ne,formatRelative:se,localize:fe,match:We,options:{weekStartsOn:0,firstWeekContainsDate:1}};const Be=s=>{const t=new Date(s);return U(t,"yyyy年M月d日",{locale:Me})},Ce=["src"],Ie=500,Te=M({__name:"Toast",props:A({text:{},color:{default:"green"},icon:{},x:{},y:{}},{isShow:{type:Boolean,default:!1},isShowModifiers:{}}),emits:["update:isShow"],setup(s){const t=E(s,"isShow"),a=()=>{setTimeout(()=>{t.value=!1},Ie)};return(e,n)=>(o(),P(F,{name:"fade",onAfterEnter:a},{default:L(()=>[t.value?(o(),i("div",{key:0,class:C(["Toast",[`Toast--${e.color}`]]),style:N({top:`${e.y}px`,left:`${e.x}px`})},[e.icon?(o(),i("img",{key:0,class:"Toast__icon",src:e.icon,alt:""},null,8,Ce)):l("",!0),S(" "+D(e.text),1)],6)):l("",!0)]),_:1}))}}),Ae=B(Te,[["__scopeId","data-v-1ce41937"]]),Ee={class:"AddButton"},Le=["src"],Fe={class:"AddButton__text"},Ne=M({__name:"AddButton",props:{isDisabled:{type:Boolean},id:{},name:{},image:{},description:{},num:{},price:{},categories:{},tags:{}},setup(s){const t=G(),a=s;console.log("cartStore.items",t.items);const e=m(0),n=m(0),r=m(null),d=m(!1),w=c=>{if(d.value||t.hasItem(a.id))return!1;const h={id:a.id,name:a.name,image:a.image,description:a.description,categories:a.categories,tags:a.tags};t.addItem(h),console.log("cartStore.items",t.items),e.value=c.clientX-80,n.value=c.clientY-60,d.value=!0};return V(()=>{r.value&&r.value.addEventListener("click",w)}),$(()=>{r.value&&r.value.removeEventListener("click",w)}),(c,h)=>(o(),i("div",Ee,[f("button",{class:C(["AddButton__button",[{"AddButton__button--disabled":c.isDisabled||x(t).hasItem(c.id)}]]),ref_key:"buttonRef",ref:r},[f("img",{class:"AddButton__icon",src:x(z),alt:""},null,8,Le),f("span",Fe,[x(t).hasItem(c.id)?(o(),i(W,{key:1},[S("カート追加済み")],64)):(o(),i(W,{key:0},[S("カートに入れる")],64))])],2),I(Ae,{text:"カートに追加しました",color:"green",x:e.value,y:n.value,isShow:d.value,"onUpdate:isShow":h[0]||(h[0]=u=>d.value=u)},null,8,["x","y","isShow"])]))}}),Ve=B(Ne,[["__scopeId","data-v-a7a42c23"]]),$e={class:"Detail"},ze={class:"Detail__section"},Xe={class:"Detail__h1"},He={key:1,class:"Detail__categories"},Qe={key:2,class:"Detail__date"},Re={key:3,class:"Detail__hero"},qe=["src"],Ye=["innerHTML"],Oe=M({__name:"index",setup(s){const t=X(),a=R(),e=m(null),n=m(!0),r=m([]),d=m([]),w=a.params.id,c=async()=>{var u;if(e.value&&e.value.categories&&((u=e.value.categories)!=null&&u.length))try{d.value=await t.getCategoryByIds(e.value.categories)}catch(y){console.error("Error fetching categories:",y)}},h=async u=>{var y;try{n.value=!0;const v=await q(u);e.value=v,console.log("post",e.value),O(e.value.title.rendered,e.value.content.rendered.substring(0,150)),r.value=[];const g=e.value.categories&&((y=e.value.categories)!=null&&y.length)?e.value.categories[0]:null;if(g){const _=t.categories.find(T=>T.id===g);_&&r.value.push({text:_.name,href:`/category/${g}`})}r.value.push({text:e.value.title.rendered}),c(),n.value=!1}catch(v){console.error("Error fetching post:",v)}};return h(w),H(()=>a.params.id,u=>{u&&h(u)}),(u,y)=>{var v,g;return o(),i("article",$e,[f("section",ze,[r.value&&r.value.length?(o(),P(K,{key:0,items:r.value},null,8,["items"])):l("",!0),f("h1",Xe,D(e.value?e.value.title.rendered:""),1),d.value.length?(o(),i("ul",He,[(o(!0),i(W,null,Q(d.value,_=>(o(),i("li",{key:_.id},[I(J,{text:_.name,href:`/category/${_.id}`},null,8,["text","href"])]))),128))])):l("",!0),e.value&&e.value.date?(o(),i("p",Qe,[f("time",null,D(e.value?x(Be)(e.value.date):"不明"),1)])):l("",!0),e.value&&e.value.featured_media_details&&e.value.featured_media_details.source_url?(o(),i("figure",Re,[f("img",{class:"Detail__heroImg",src:(g=(v=e.value)==null?void 0:v.featured_media_details)==null?void 0:g.source_url,alt:""},null,8,qe)])):l("",!0),e.value?(o(),i("div",{key:4,innerHTML:e.value.content.rendered},null,8,Ye)):l("",!0),e.value?(o(),P(Ve,{key:5,id:e.value.id,name:e.value.title.rendered,image:e.value.featured_media_details?e.value.featured_media_details.source_url:null,categories:e.value.categories??[],tags:e.value.tags??[]},null,8,["id","name","image","categories","tags"])):l("",!0)]),n.value?(o(),P(Y,{key:0,class:"Detail__loading"})):l("",!0)])}}}),Ke=B(Oe,[["__scopeId","data-v-64b6d58e"]]);export{Ke as default};
