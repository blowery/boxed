"use strict";(self.webpackChunkdocs=self.webpackChunkdocs||[]).push([[676],{3905:function(e,t,n){n.d(t,{Zo:function(){return c},kt:function(){return d}});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var p=r.createContext({}),s=function(e){var t=r.useContext(p),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},c=function(e){var t=s(e.components);return r.createElement(p.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,p=e.parentName,c=l(e,["components","mdxType","originalType","parentName"]),m=s(n),d=o,h=m["".concat(p,".").concat(d)]||m[d]||u[d]||a;return n?r.createElement(h,i(i({ref:t},c),{},{components:n})):r.createElement(h,i({ref:t},c))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var p in t)hasOwnProperty.call(t,p)&&(l[p]=t[p]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9265:function(e,t,n){n.r(t),n.d(t,{contentTitle:function(){return p},default:function(){return m},frontMatter:function(){return l},metadata:function(){return s},toc:function(){return c}});var r=n(7462),o=n(3366),a=(n(7294),n(3905)),i=["components"],l={title:"Trivia",sidebar_label:"Trivia"},p=void 0,s={unversionedId:"trivia",id:"trivia",isDocsHomePage:!1,title:"Trivia",description:"How does Boxed work?",source:"@site/docs/trivia.md",sourceDirName:".",slug:"/trivia",permalink:"/boxed/trivia",editUrl:"https://github.com/bloodyowl/rescript-test/edit/main/docs/docs/trivia.md",version:"current",frontMatter:{title:"Trivia",sidebar_label:"Trivia"},sidebar:"docs",previous:{title:"Getting started",permalink:"/boxed/"},next:{title:"Option",permalink:"/boxed/option"}},c=[{value:"How does Boxed work?",id:"how-does-boxed-work",children:[]},{value:"Where&#39;s <em>{insert category theory terminology}</em>?",id:"wheres-insert-category-theory-terminology",children:[]}],u={toc:c};function m(e){var t=e.components,l=(0,o.Z)(e,i);return(0,a.kt)("wrapper",(0,r.Z)({},u,l,{components:t,mdxType:"MDXLayout"}),(0,a.kt)("h2",{id:"how-does-boxed-work"},"How does Boxed work?"),(0,a.kt)("p",null,"We aim for a good compromise between ",(0,a.kt)("strong",{parentName:"p"},"performance"),", ",(0,a.kt)("strong",{parentName:"p"},"developer experience")," and ability to ",(0,a.kt)("strong",{parentName:"p"},"leverage TypeScript"),"."),(0,a.kt)("p",null,'How we achieve this is by "tweaking" how TypeScript sees our types. For most of them, the first thing we do is create a ',(0,a.kt)("inlineCode",{parentName:"p"},"class")," that holds the utility methods."),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"class OptionClass<Value> {\n  // ...\n  map(f) {\n    /* ... */\n  }\n}\n")),(0,a.kt)("p",null,"Then, we create a type on top of it with a ",(0,a.kt)("strong",{parentName:"p"},"discriminating union"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'type Option<Value> =\n  | (OptionClass<Value> & { tag: "Some"; value: Value })\n  | (OptionClass<Value> & { tag: "None"; value: undefined });\n')),(0,a.kt)("p",null,"This allows to ",(0,a.kt)("strong",{parentName:"p"},"pattern-match")," the values, while sharing the methods in memory."),(0,a.kt)("p",null,"For performance, we make the prototype methods cleaner make rebuilding it from ",(0,a.kt)("inlineCode",{parentName:"p"},"Object.create(null)"),":"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},"const proto = Object.create(\n  null,\n  Object.getOwnPropertyDescriptors(OptionClass.prototype)\n);\n")),(0,a.kt)("p",null,"We then use ",(0,a.kt)("inlineCode",{parentName:"p"},"Object.create(proto)")," to create new instances, on which we set our values:"),(0,a.kt)("pre",null,(0,a.kt)("code",{parentName:"pre",className:"language-ts"},'const option = Object.create(proto) as Option<Value>;\noption.tag = "Some";\noption.value = value;\nreturn option;\n')),(0,a.kt)("h2",{id:"wheres-insert-category-theory-terminology"},"Where's ",(0,a.kt)("em",{parentName:"h2"},"{insert category theory terminology}"),"?"),(0,a.kt)("p",null,"We want this library to be ",(0,a.kt)("strong",{parentName:"p"},"as simple as possible"),"."),(0,a.kt)("p",null,"While the theoretical concepts in languages such as Haskell are really interesting and powerful, we don't want to add that kind of ",(0,a.kt)("strong",{parentName:"p"},"knowledge barrier")," for a library that can benefit to lots. That's also the reason why we use simple wording, such as ",(0,a.kt)("inlineCode",{parentName:"p"},"Result.Ok")," & ",(0,a.kt)("inlineCode",{parentName:"p"},"Result.Error")," instead of more abstract naming like ",(0,a.kt)("inlineCode",{parentName:"p"},"Either.Left")," & ",(0,a.kt)("inlineCode",{parentName:"p"},"Either.Right"),"."),(0,a.kt)("p",null,"That's also the reason why we settled on an API that leverages JavaScript objects to provide chaining (although we're likely to provide a functional API once ",(0,a.kt)("a",{parentName:"p",href:"https://github.com/tc39/proposal-pipeline-operator"},"the pipeline operator")," lands in JS)."),(0,a.kt)("p",null,(0,a.kt)("img",{src:n(3600).Z})))}m.isMDXComponent=!0},3600:function(e,t,n){t.Z=n.p+"assets/images/profunctor-optics-5da0c027fb8f430abacd7390d1fa6393.jpg"}}]);