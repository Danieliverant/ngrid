(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{"W/qk":function(e,t,i){"use strict";i.r(t),i.d(t,"InfiniteScrollExampleModule",(function(){return P}));var n=i("D57K"),s=i("2kYt"),o=i("XApm"),a=i("/kex"),r=i("66mq"),l=i("mcY/"),c=i("cc5W"),p=i("3JFK"),d=i("JRn2"),h=i("EM62"),m=i("Ht9o");function g(e,t){1&e&&h.Tb(0,"mat-progress-bar",2)}let u=(()=>{let e=class{constructor(e){this.datasource=e,this.loading=!1,this.columns=Object(o.s)().table({prop:"id",width:"100px"},{prop:"name",width:"100px"},{prop:"gender",width:"50px"},{prop:"birthdate",type:"date",width:"25%"}).build(),this.ds=Object(o.t)().onTrigger(e=>this.allPeople?(this.loading=!1,Promise.resolve(this.allPeople.slice(0,Math.min(this.allPeople.length,this.ds.source.length+50)))):this.datasource.getPeople(100,1e3).then(e=>(this.allPeople=e,this.allPeople.slice(0,Math.min(this.allPeople.length,(this.ds.source||[]).length+50))))).create()}ngAfterViewInit(){this.ds.onRenderedDataChanged.subscribe(()=>{this.ds.length-this.ds.renderStart<20&&(this.loading||(this.loading=!0,setTimeout(()=>this.ds.refresh(),1e3*Math.random())))})}};return e.\u0275fac=function(t){return new(t||e)(h.Sb(d.a))},e.\u0275cmp=h.Mb({type:e,selectors:[["pbl-infinite-scroll-example"]],decls:2,vars:3,consts:[[3,"dataSource","columns"],["mode","indeterminate",4,"ngIf"],["mode","indeterminate"]],template:function(e,t){1&e&&(h.Yb(0,"pbl-ngrid",0),h.Jc(1,g,1,0,"mat-progress-bar",1),h.Xb()),2&e&&(h.rc("dataSource",t.ds)("columns",t.columns),h.Gb(1),h.rc("ngIf",t.loading))},directives:[m.a,s.t,r.a],styles:[""],encapsulation:2,changeDetection:0}),e=Object(n.a)([Object(c.e)("pbl-infinite-scroll-example",{title:"Infinite Scroll"})],e),e})();var b=i("IdLP");function w(e,t){1&e&&h.Tb(0,"mat-progress-bar",2)}let f=(()=>{let e=class{constructor(e){this.client=e,this.columns=Object(o.s)().table({prop:"id",width:"100px",pIndex:!0},{prop:"name",width:"100px",editable:!0},{prop:"gender",width:"50px"},{prop:"birthdate",type:"date",width:"25%"}).build(),this.ds=Object(l.b)().withInfiniteScrollOptions({blockSize:100,initialVirtualSize:100}).withCacheOptions("sequenceBlocks").onTrigger(e=>{if(e.isInitial)return this.ds.setCacheSize(800),this.client.getPeople({pagination:{itemsPerPage:100,page:1}}).then(t=>(this.ds.updateVirtualSize(t.pagination.totalItems),e.updateTotalLength(t.pagination.totalItems),t.items));{console.log(e.fromRow,e.toRow);const t=e.fromRow%100,i=Math.floor(e.fromRow/100)+1,n=[this.client.getPeople({pagination:{itemsPerPage:100,page:i}})];return t>0&&n.push(this.client.getPeople({pagination:{itemsPerPage:100,page:i+1}})),new b.a(i=>(console.log(`NEW CALL WITH ${e.fromRow} - ${e.toRow}`),Promise.all(n).then(([e,n])=>{const s=e.items.slice(t,100);n&&s.push(...n.items.slice(0,t)),i.next(s),i.complete()}).catch(e=>i.error(e)),()=>console.log(`DONE WITH ${e.fromRow} - ${e.toRow}`)))}}).create()}};return e.\u0275fac=function(t){return new(t||e)(h.Sb(d.b))},e.\u0275cmp=h.Mb({type:e,selectors:[["pbl-infinite-scroll-data-source-example"]],decls:3,vars:5,consts:[[3,"dataSource","columns"],["mode","indeterminate",4,"ngIf"],["mode","indeterminate"]],template:function(e,t){1&e&&(h.Yb(0,"pbl-ngrid",0),h.Jc(1,w,1,0,"mat-progress-bar",1),h.lc(2,"async"),h.Xb()),2&e&&(h.rc("dataSource",t.ds)("columns",t.columns),h.Gb(1),h.rc("ngIf",h.mc(2,3,t.ds.adapter.virtualRowsLoading)))},directives:[m.a,s.t,r.a],pipes:[s.b],styles:[""],encapsulation:2,changeDetection:0}),e=Object(n.a)([Object(c.e)("pbl-infinite-scroll-data-source-example",{title:"Infinite Scroll Data Source"})],e),e})();function S(e,t){1&e&&h.Tb(0,"mat-progress-bar",2)}let x=(()=>{let e=class{constructor(e){this.client=e,this.columns=Object(o.s)().table({prop:"id",width:"100px",pIndex:!0},{prop:"name",width:"100px",editable:!0},{prop:"gender",width:"50px"},{prop:"birthdate",type:"date",width:"25%"}).build(),this.ds=Object(l.b)().withInfiniteScrollOptions({blockSize:100,initialVirtualSize:100}).withCacheOptions("fragmentedBlocks",{strictPaging:!1}).onTrigger(e=>e.isInitial?(this.ds.setCacheSize(800),this.client.getPeople({pagination:{skip:0,limit:100}}).then(t=>(this.ds.updateVirtualSize(t.pagination.totalItems),e.updateTotalLength(t.pagination.totalItems),t.items))):(console.log(e.fromRow,e.toRow),this.client.getPeople({pagination:{skip:e.fromRow,limit:e.toRow-e.fromRow+1}}).then(e=>e.items))).create()}};return e.\u0275fac=function(t){return new(t||e)(h.Sb(d.b))},e.\u0275cmp=h.Mb({type:e,selectors:[["pbl-index-based-paging-example"]],decls:3,vars:5,consts:[[3,"dataSource","columns"],["mode","indeterminate",4,"ngIf"],["mode","indeterminate"]],template:function(e,t){1&e&&(h.Yb(0,"pbl-ngrid",0),h.Jc(1,S,1,0,"mat-progress-bar",1),h.lc(2,"async"),h.Xb()),2&e&&(h.rc("dataSource",t.ds)("columns",t.columns),h.Gb(1),h.rc("ngIf",h.mc(2,3,t.ds.adapter.virtualRowsLoading)))},directives:[m.a,s.t,r.a],pipes:[s.b],styles:[""],encapsulation:2,changeDetection:0}),e=Object(n.a)([Object(c.e)("pbl-index-based-paging-example",{title:"Index Based Paging"})],e),e})(),I=(()=>{let e=class{constructor(e){this.client=e,this.columns=Object(o.s)().table({prop:"id",width:"100px",pIndex:!0},{prop:"name",width:"100px"},{prop:"gender",width:"50px"},{prop:"birthdate",type:"date",width:"25%"}).build(),this.ds=Object(l.b)().withInfiniteScrollOptions({blockSize:100,initialVirtualSize:100}).withCacheOptions("fragmentedBlocks",{strictPaging:!1}).setCustomTriggers("filter","sort").onTrigger(e=>{if(e.isInitial)return this.ds.setCacheSize(800),this.client.getPeople({pagination:{skip:0,limit:100}}).then(t=>(this.ds.updateVirtualSize(t.pagination.totalItems),e.updateTotalLength(t.pagination.totalItems),t.items));switch(e.eventSource){case"infiniteScroll":return this.client.getPeople({pagination:{skip:e.fromRow,limit:e.toRow-e.fromRow+1}}).then(e=>e.items);case"customTrigger":break;default:throw new Error("This should NEVER EVENT happen...")}}).create()}};return e.\u0275fac=function(t){return new(t||e)(h.Sb(d.b))},e.\u0275cmp=h.Mb({type:e,selectors:[["pbl-custom-triggers-example"]],decls:1,vars:2,consts:[[3,"dataSource","columns"]],template:function(e,t){1&e&&h.Tb(0,"pbl-ngrid",0),2&e&&h.rc("dataSource",t.ds)("columns",t.columns)},directives:[m.a],styles:[""],encapsulation:2,changeDetection:0}),e=Object(n.a)([Object(c.e)("pbl-custom-triggers-example",{title:"Custom Triggers"})],e),e})(),P=(()=>{let e=class{};return e.\u0275mod=h.Qb({type:e}),e.\u0275inj=h.Pb({factory:function(t){return new(t||e)},imports:[[s.c,p.a,r.b,o.l,a.a,l.a]]}),e=Object(n.a)([Object(c.a)(u,f,x,I)],e),e})()}}]);