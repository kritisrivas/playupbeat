(this.webpackJsonpplayupbeat=this.webpackJsonpplayupbeat||[]).push([[5],{139:function(e,t,a){"use strict";a.r(t);var s=a(0),c=a(54),n=a(11),i=a(12),r=a(8),l=a(4),d=a(2);t.default=()=>{const e=Object(s.useContext)(r.a),[t,a]=Object(s.useState)(!0),[o,j]=Object(s.useState)(""),[u,b]=Object(s.useState)(""),[p,h]=Object(s.useState)(""),[O,m]=Object(s.useState)(""),g=Object(l.o)();return Object(d.jsxs)("div",{className:"bodyDiv",children:[Object(d.jsx)(n.a,{}),Object(d.jsxs)("div",{className:"login-container",children:[Object(d.jsx)("h2",{children:"Admin Login"}),Object(d.jsxs)("form",{onSubmit:async a=>{if(a.preventDefault(),t)try{const t=await c.a.post("http://44.209.90.61:8080/users/login",{email:u,password:p});"admin"===t.data.role?(e.login(t.data.userId,t.data.role,t.data.token),g("/admin/dashboard")):m("Please login using admin account")}catch(s){m("Invalid credentials")}else try{const t="admin",a=await c.a.post("http://44.209.90.61:8080/users/signup",{name:o,email:u,password:p,role:t});e.login(a.data.userId,a.data.role,a.data.token),g("/admin/dashboard")}catch(s){m("Invalid credentials")}},children:[!t&&Object(d.jsxs)("div",{className:"form-group",children:[Object(d.jsx)("label",{children:"Name:"}),Object(d.jsx)("input",{type:"text",value:o,onChange:e=>j(e.target.value),required:!0})]}),Object(d.jsxs)("div",{className:"form-group",children:[Object(d.jsx)("label",{children:"Email:"}),Object(d.jsx)("input",{type:"email",value:u,onChange:e=>b(e.target.value),required:!0})]}),Object(d.jsxs)("div",{className:"form-group",children:[Object(d.jsx)("label",{children:"Password:"}),Object(d.jsx)("input",{type:"password",value:p,onChange:e=>h(e.target.value),required:!0})]}),O&&Object(d.jsx)("p",{className:"error",children:O}),Object(d.jsx)("button",{type:"submit",children:t?"LOGIN":"SIGNUP"}),Object(d.jsxs)("button",{className:"switchLoginBtn",onClick:()=>{a((e=>!e))},children:["Switch to ",t?"Signup":"Login"]})]})]}),Object(d.jsx)(i.a,{})]})}}}]);
//# sourceMappingURL=5.fa01a5fe.chunk.js.map