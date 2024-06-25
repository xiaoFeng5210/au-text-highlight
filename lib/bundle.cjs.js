"use strict";module.exports=function(e){var o=e.text,r=e.keywords;if("string"==typeof r){var t="\\b".concat(r,"\\b"),c=new RegExp(t,"gi");if(!o.match(c))throw new Error("未匹配到关键字, 请检查内容");var n=o.replace(c,'<span style="color: red;">'.concat(r,"</span>"));console.log(n)}};
//# sourceMappingURL=bundle.cjs.js.map
