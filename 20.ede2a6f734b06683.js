"use strict";(self.webpackChunkangular_challenge=self.webpackChunkangular_challenge||[]).push([[20],{9020:(p,d,s)=>{s.r(d),s.d(d,{TuiDetails:()=>i,TuiDetailsContent:()=>l,TuiSummary:()=>c});var a=s(9220);const i=a.Node.create({name:"details",addOptions:()=>({HTMLAttributes:{}}),addAttributes:()=>({opened:{default:!0,keepOnSplit:!1,parseHTML:e=>"true"===e.getAttribute("data-opened"),renderHTML:e=>({"data-opened":e.opened})}}),content:"summary detailsContent",group:"block",allowGapCursor:!0,isolating:!0,parseHTML:()=>[{tag:"details"}],renderHTML({HTMLAttributes:e}){return["div",{class:"details-wrapper details-wrapper_rendered"},["details",(0,a.mergeAttributes)(this.options.HTMLAttributes,e),0],["button",{class:"details-arrow"}]]},addNodeView:()=>({node:e})=>{const t=document.createElement("div"),r=document.createElement("details"),n=document.createElement("button");return t.className="details-wrapper",n.className="details-arrow",r.open=e.attrs.opened,n.addEventListener("click",()=>{r.open=!r.open,e.attrs.opened=r.open}),t.append(r,n),{dom:t,contentDOM:r}},addCommands(){return{setDetails:()=>({commands:e,state:t})=>{const r=t.selection.$head.parent.textContent,n=t.doc.cut(t.selection.from,t.selection.to),o=n.content.size?(0,a.getHTMLFromFragment)(n.content,t.schema):r;return e.insertContent(`<details data-opened="true"><summary><p></p></summary><div data-type="details-content"><p>${o}</p></div></details><p></p>`)},removeDetails:()=>({state:e,dispatch:t})=>function u(e,t,r){const n=e.selection.$anchor;for(let o=n.depth;o>0;o--)if(n.node(o).type.name===r)return t&&t(e.tr.delete(n.before(o),n.after(o)).scrollIntoView()),!0;return!1}(e,t,this.name)}}}),l=a.Node.create({name:"detailsContent",content:"block+",group:"block",allowGapCursor:!0,parseHTML:()=>[{tag:'div[data-type="details-content"]'}],renderHTML({HTMLAttributes:e}){return["div",(0,a.mergeAttributes)(this.options.HTMLAttributes,e,{"data-type":"details-content"}),0]}}),c=a.Node.create({name:"summary",addOptions:()=>({HTMLAttributes:{}}),content:"paragraph",group:"block",parseHTML:()=>[{tag:"summary"}],renderHTML({HTMLAttributes:e}){return["summary",(0,a.mergeAttributes)(this.options.HTMLAttributes,e),0]}})}}]);