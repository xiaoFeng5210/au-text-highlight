function e(e){var o=e.text,r=e.keywords;if("string"==typeof r){var t="\\b".concat(r,"\\b"),a=new RegExp(t,"gi");if(!o.match(a))throw new Error("未匹配到关键字, 请检查内容");var n=o.replace(a,'<span style="color: red;">'.concat(r,"</span>"));console.log(n)}}export{e as default};
//# sourceMappingURL=bundle.esm.js.map
