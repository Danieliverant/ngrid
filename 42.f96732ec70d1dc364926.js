(window.webpackJsonp=window.webpackJsonp||[]).push([[42],{"3JFK":function(e,t,r){"use strict";r.d(t,"a",(function(){return o}));var i=r("qFEQ"),c=r("GAih"),n=r("cc5W"),s=r("EM62");let o=(()=>{class e{}return e.\u0275mod=s.Qb({type:e}),e.\u0275inj=s.Pb({factory:function(t){return new(t||e)},imports:[[i.i,c.e,n.l],i.i,c.e,n.l]}),e})()},D57K:function(e,t,r){"use strict";function i(e,t,r,i){var c,n=arguments.length,s=n<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,r):i;if("object"==typeof Reflect&&"function"==typeof Reflect.decorate)s=Reflect.decorate(e,t,r,i);else for(var o=e.length-1;o>=0;o--)(c=e[o])&&(s=(n<3?c(s):n>3?c(t,r,s):c(t,r))||s);return n>3&&s&&Object.defineProperty(t,r,s),s}r.d(t,"a",(function(){return i}))},iku8:function(e,t,r){"use strict";r.r(t),r.d(t,"ColumnResizeExampleModule",(function(){return w}));var i=r("D57K"),c=r("2kYt"),n=r("XApm"),s=r("ykWx"),o=r("cc5W"),a=r("3JFK"),l=r("JRn2"),p=r("EM62"),u=r("Ht9o");let d=(()=>{let e=class{constructor(e){this.datasource=e,this.columns=Object(n.s)().table({prop:"id",width:"40px"},{prop:"name",resize:!0},{prop:"gender",resize:!0,width:"50px"},{prop:"birthdate",type:"date"}).build(),this.ds=Object(n.t)().onTrigger(()=>this.datasource.getPeople(0,500)).create()}};return e.\u0275fac=function(t){return new(t||e)(p.Sb(l.a))},e.\u0275cmp=p.Mb({type:e,selectors:[["pbl-column-resize-example"]],decls:1,vars:2,consts:[[1,"pbl-ngrid-cell-ellipsis","pbl-ngrid-header-cell-ellipsis",3,"dataSource","columns"]],template:function(e,t){1&e&&p.Tb(0,"pbl-ngrid",0),2&e&&p.rc("dataSource",t.ds)("columns",t.columns)},directives:[u.a],styles:[""],encapsulation:2,changeDetection:0}),e=Object(i.a)([Object(o.e)("pbl-column-resize-example",{title:"Simple Resizing"})],e),e})(),b=(()=>{let e=class{constructor(e){this.datasource=e,this.columns=Object(n.s)().table({prop:"id",width:"40px"},{prop:"name",width:"15%"},{prop:"gender",width:"50px"},{prop:"birthdate",type:"date",maxWidth:120}).build(),this.ds=Object(n.t)().onTrigger(()=>this.datasource.getPeople(0,500)).create()}resize(){const e=this.ds.hostGrid.columnApi.findColumn("id");this.ds.hostGrid.columnApi.resizeColumn(e,"200px")}};return e.\u0275fac=function(t){return new(t||e)(p.Sb(l.a))},e.\u0275cmp=p.Mb({type:e,selectors:[["pbl-resizing-with-the-api-example"]],decls:6,vars:2,consts:[[3,"click"],[1,"pbl-ngrid-cell-ellipsis","pbl-ngrid-header-cell-ellipsis",3,"dataSource","columns"],["pblTable1",""]],template:function(e,t){if(1&e){const e=p.Zb();p.Yb(0,"button",0),p.gc("click",(function(){return t.resize()})),p.Lc(1,"Resize id to 200px"),p.Xb(),p.Yb(2,"button",0),p.gc("click",(function(){return p.zc(e),p.wc(5).autoSizeColumnToFit()})),p.Lc(3,"Fit Content"),p.Xb(),p.Tb(4,"pbl-ngrid",1,2)}2&e&&(p.Gb(4),p.rc("dataSource",t.ds)("columns",t.columns))},directives:[u.a],styles:[""],encapsulation:2,changeDetection:0}),e=Object(i.a)([Object(o.e)("pbl-resizing-with-the-api-example",{title:"Resizing With The Api"})],e),e})(),m=(()=>{let e=class{constructor(e){this.datasource=e,this.columns=Object(n.s)().table({prop:"id",width:"40px"},{prop:"name",resize:!0,minWidth:100,maxWidth:300},{prop:"gender",resize:!0,minWidth:50},{prop:"birthdate",type:"date"}).build(),this.ds=Object(n.t)().onTrigger(()=>this.datasource.getPeople(0,500)).create()}};return e.\u0275fac=function(t){return new(t||e)(p.Sb(l.a))},e.\u0275cmp=p.Mb({type:e,selectors:[["pbl-resize-boundaries-example"]],decls:1,vars:2,consts:[[3,"dataSource","columns"]],template:function(e,t){1&e&&p.Tb(0,"pbl-ngrid",0),2&e&&p.rc("dataSource",t.ds)("columns",t.columns)},directives:[u.a],styles:[""],encapsulation:2,changeDetection:0}),e=Object(i.a)([Object(o.e)("pbl-resize-boundaries-example",{title:"Resize Boundaries"})],e),e})();var h=r("G+V8"),g=r("+A54");function f(e,t){1&e&&(p.Yb(0,"pbl-ngrid-drag-resize",2),p.Tb(1,"span",3),p.Xb()),2&e&&p.rc("context",t.$implicit)("grabAreaWidth",8)}let z=(()=>{let e=class{constructor(e){this.datasource=e,this.columns=Object(n.s)().default({resize:!0}).table({prop:"id",wontBudge:!0,width:"40px"},{prop:"name"},{prop:"gender",width:"50px"},{prop:"email",width:"150px"},{prop:"country"},{prop:"language"},{prop:"birthdate",type:"date"},{prop:"balance"}).headerGroup({prop:"name",span:1,label:"Group A"},{prop:"country",span:1,label:"Group B"}).build(),this.ds=Object(n.t)().onTrigger(()=>this.datasource.getPeople(0,500)).create()}};return e.\u0275fac=function(t){return new(t||e)(p.Sb(l.a))},e.\u0275cmp=p.Mb({type:e,selectors:[["pbl-custom-resizing-example"]],decls:2,vars:2,consts:[[3,"dataSource","columns"],[3,"context","grabAreaWidth",4,"pblNgridCellResizerRef"],[3,"context","grabAreaWidth"],[1,"pbl-ngrid-column-resizer-handle"]],template:function(e,t){1&e&&(p.Yb(0,"pbl-ngrid",0),p.Jc(1,f,2,2,"pbl-ngrid-drag-resize",1),p.Xb()),2&e&&p.rc("dataSource",t.ds)("columns",t.columns)},directives:[u.a,h.a,g.b],styles:[""],encapsulation:2,changeDetection:0}),e=Object(i.a)([Object(o.e)("pbl-custom-resizing-example",{title:"Custom Resizing"})],e),e})(),w=(()=>{let e=class{};return e.\u0275mod=p.Qb({type:e}),e.\u0275inj=p.Pb({factory:function(t){return new(t||e)},imports:[[c.c,a.a,n.l,s.a.withDefaultTemplates()]]}),e=Object(i.a)([Object(o.a)(d,b,m,z)],e),e})()}}]);