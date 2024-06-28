# au-text-highlight
文本关键字匹配模块, 主要用于以后的文字高亮和关键字检索, 后续会探索更多用途

## 项目背景
在一些应用场景中，比如划词（翻译，评论，等其他功能），搜索引擎，文本高亮等，都需要对文本进行关键字匹配, 并做相关处理，这个模块就是为了解决这一系列问题而生的。

## 安装
```shell
npm install au-text-highlight
```

## 使用
使用方面很简单，本模块提供了以下几个函数

- 用户划取一段内容时，获取选区的startIndex, endIndex，只需要传入包裹的dom元素即可
```javascript
import { getSelectionRange } from 'au-text-highlight'

const results = getSelectionRange(dom)
```

- 自动高亮相关的关键字，只需要传入关键字的开始位置和结束位置和dom元素[{start: number, end: number}]的数组即可
```javascript
import { sectionRangeHighlight } from 'au-text-highlight'
const results = sectionRangeHighlight(dom, [{start: 0, end: 3}])
```

- 匹配一段字符串中的关键字的开始位置和结束位置 (如果匹配到多个，都会放到数组里), 参数是一段字符串和关键字
```javascript
import { auExtractText } from 'au-text-highlight'

 const results = auExtractText({text, keywords: '关键字'})

 results: [
   {
      keyword: '关键字',
      start: 0,
      end: 3,
    }
 ]
```

## 贡献
如果你有好的想法或者发现了bug，欢迎提issue或者提交PR，非常欢迎参与！