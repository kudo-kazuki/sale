import{d as g,v as P,r as o,g as _,q as v,o as d,a as f,i as m,t as h,k as u,P as x,y,z as k,_ as q}from"./index-CR06nOXn.js";import{P as A}from"./Pagination-BIFsXIP2.js";const E={class:"Page"},S=5,i=10,L=g({__name:"index",setup(w){const r=P(),n=o([]),a=o(!1),s=o(0),t=o(1),l=async()=>{if(a.value)return!1;a.value=!0;const e={searchWord:r.query.q||"",perPage:i,page:t.value},c=await y(e);n.value=c.posts,s.value=c.total,await k(),a.value=!1,console.log("posts",n.value),console.log("total",s.value)};_(()=>{l().catch(e=>console.error(e))}),v(()=>r.query.q,e=>{e&&(console.log("newQuery",e),t.value=1,l())});const p=e=>{t.value=e,l()};return(e,c)=>(d(),f("section",E,[m("h1",null,"検索結果 "+h(s.value)+"件",1),u(x,{posts:n.value,isLoading:a.value},null,8,["posts","isLoading"]),u(A,{currentPage:t.value,maxDisplayPages:S,itemsPerPage:i,total:s.value,"onOnClick:pageNumber":p},null,8,["currentPage","total"])]))}}),I=q(L,[["__scopeId","data-v-e3b99ecf"]]);export{I as default};