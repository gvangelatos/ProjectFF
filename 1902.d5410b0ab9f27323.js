"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[1902],{1902:(u,n,a)=>{a.r(n),a.d(n,{SettingsPage:()=>c});var d=a(6895),i=a(433),t=a(7002),e=a(8256);let c=(()=>{class s{constructor(o){this.document=o,this.darkMode=!1}ngOnInit(){localStorage.getItem("darkMode")?(this.darkMode="true"===localStorage.getItem("darkMode"),this.darkMode?this.document.body.classList.add("dark"):this.document.body.classList.remove("dark")):window.matchMedia("(prefers-color-scheme: dark)").matches?(this.darkMode=!0,this.document.body.classList.add("dark"),localStorage.setItem("darkMode","true")):(this.darkMode=!1,localStorage.setItem("darkMode","false"))}toggleTheme(o){this.darkMode=!this.darkMode,this.darkMode?(this.document.body.classList.add("dark"),localStorage.setItem("darkMode","true")):(this.document.body.classList.remove("dark"),localStorage.setItem("darkMode","false"))}}return s.\u0275fac=function(o){return new(o||s)(e.Y36(d.K0))},s.\u0275cmp=e.Xpm({type:s,selectors:[["app-settings"]],standalone:!0,features:[e.jDz],decls:17,vars:4,consts:[[3,"translucent"],["slot","start"],["defaultHref","/home/tabs/feed"],[3,"fullscreen"],["collapse","condense"],["size","large"],["size-sm","6","offset-sm","3"],["lines","none"],["justify","space-between","color","primary",3,"enableOnOffLabels","checked","ionChange"]],template:function(o,l){1&o&&(e.TgZ(0,"ion-header",0)(1,"ion-toolbar")(2,"ion-buttons",1),e._UZ(3,"ion-back-button",2),e.qZA(),e.TgZ(4,"ion-title"),e._uU(5,"Settings"),e.qZA()()(),e.TgZ(6,"ion-content",3)(7,"ion-header",4)(8,"ion-toolbar")(9,"ion-title",5),e._uU(10,"Settings"),e.qZA()()(),e.TgZ(11,"ion-grid")(12,"ion-row")(13,"ion-col",6)(14,"ion-item",7)(15,"ion-toggle",8),e.NdJ("ionChange",function(g){return l.toggleTheme(g)}),e._uU(16," Toggle Dark Mode "),e.qZA()()()()()()),2&o&&(e.Q6J("translucent",!0),e.xp6(6),e.Q6J("fullscreen",!0),e.xp6(9),e.Q6J("enableOnOffLabels",!0)("checked",l.darkMode))},dependencies:[t.Pc,t.oU,t.Sm,t.wI,t.W2,t.jY,t.Gu,t.Ie,t.Nd,t.wd,t.ho,t.sr,t.w,t.cs,d.ez,i.u5]}),s})()}}]);