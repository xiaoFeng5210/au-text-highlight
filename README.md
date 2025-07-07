# au-text-highlight

**中文 | [English](README-EN.md)**

正式版已发布

3行代码实现划词相关功能、关键字高亮、选区检测等功能。附带React版本划词popover组件。专为解决划词翻译，划词评论，web文本高亮等这类需求！目前再探索完善，如有其他相关需求以及bug请提供issue或者发邮箱（aurora.coder.zqf@gmail.com）

## 项目背景
在现代Web应用中，文本高亮、划词翻译、关键字搜索等功能越来越常见。本模块提供了一套完整的解决方案，包括：
- 🎯 **文本选区检测** - 精确获取用户划词选中的文本位置
- 🌈 **智能高亮** - 自动高亮指定文本区域，支持自定义样式
- 💬 **划词弹窗** - 选区后出现React popover组件
- 🔧 **高度可定制** - 支持样式、行为、交互的完全自定义
- 📝 **关键字匹配** - 高效匹配文本中的关键词位置

## 安装
```bash
npm install au-text-highlight
```

## 核心功能

### 1. 关键字匹配与位置获取
提取文本中关键词的精确位置，支持单个关键词或关键词数组。

```javascript
import { auExtractText } from 'au-text-highlight'

// 单个关键词匹配
const result1 = auExtractText({
  text: 'GPT是一种神奇的AI技术，GPT正在改变世界',
  keywords: 'GPT'
})
// 返回: [
//   { keyword: 'GPT', start: 0, end: 3 },
//   { keyword: 'GPT', start: 15, end: 18 }
// ]

// 多个关键词匹配
const result2 = auExtractText({
  text: 'JavaScript和TypeScript都是很棒的语言',
  keywords: ['JavaScript', 'TypeScript']
})
// 返回: [
//   { keyword: 'JavaScript', start: 0, end: 10 },
//   { keyword: 'TypeScript', start: 11, end: 21 }
// ]
```

### 2. 文本选区检测
获取用户选中文本的位置信息，用于后续的高亮或其他操作。

```javascript
import { getSelectionRange, getSelectionRangeContent } from 'au-text-highlight'

// 获取选区的起始和结束位置
const containerElement = document.getElementById('text-container')
const [startIndex, endIndex] = getSelectionRange(containerElement)

// 获取选区内容和Selection对象
const { content, section } = getSelectionRangeContent()
console.log('选中的文本:', content)
```

### 3. 文本高亮
根据位置信息自动高亮文本，支持自定义样式和唯一标识。

```javascript
import { sectionRangeHighlight } from 'au-text-highlight'

const containerElement = document.getElementById('text-container')

// 基础高亮
sectionRangeHighlight(containerElement, [
  { start: 0, end: 5 },
  { start: 10, end: 15 }
])

// 带唯一标识的高亮（便于后续操作）
sectionRangeHighlight(containerElement, [
  { start: 0, end: 5, gid: 'highlight-1' },
  { start: 10, end: 15, gid: 'highlight-2' }
])
```

**高亮样式说明：**
- 高亮元素使用 `<span>` 标签包裹
- 默认class名称：`word_comment_mark`
- 包含无障碍属性：`role="text"` 和 `aria-label="高亮内容"`
- 支持通过gid参数设置唯一id，便于后续删除或修改

**自定义高亮样式：**
```css
.word_comment_mark {
  background-color: #ffeb3b;
  padding: 2px 4px;
  border-radius: 3px;
  border: 1px solid #ffc107;
}

/* 或者通过id选择器自定义特定高亮 */
#highlight-1 {
  background-color: #e3f2fd;
  border: 1px solid #2196f3;
}
```

<!-- ### 4. 原生JavaScript划词弹窗
使用原生JavaScript实现的划词弹窗功能。

```javascript
import { DrawWordConstituencyPopover } from 'au-text-highlight'

// 创建弹窗HTML元素
const popoverElement = document.createElement('div')
popoverElement.id = 'my-popover'
popoverElement.innerHTML = `
  <div style="background: white; border: 1px solid #ccc; padding: 10px; border-radius: 5px;">
    <button onclick="translate()">翻译</button>
    <button onclick="search()">搜索</button>
  </div>
`

// 初始化弹窗
const popover = new DrawWordConstituencyPopover('my-popover', {
  distance: 10 // 弹窗距离选区的距离
})
``` -->

## React组件

### 1. AuSelectionPopover 组件
React版本的文本选区弹窗组件，支持完全自定义内容。

```tsx
import React from 'react'
import { ReactAuSelectionPopover } from 'au-text-highlight'

function MyComponent() {
  const handleShow = (position) => {
    console.log('选中文本:', position.text)
  }

  const handleHide = () => {
    console.log('弹窗隐藏')
  }

  return (
    <div>
      <div id="text-container">
        选择这段文本试试看，会弹出自定义的操作面板。
      </div>

      <ReactAuSelectionPopover
        distance={10}
        container={document.getElementById('text-container')}
        onShow={handleShow}
        onHide={handleHide}
        className="my-popover"
        style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          padding: '12px'
        }}
      >
        <div>
          <button onClick={() => alert('翻译功能')}>🌐 翻译</button>
          <button onClick={() => alert('搜索功能')}>🔍 搜索</button>
          <button onClick={() => alert('复制功能')}>📋 复制</button>
        </div>
      </ReactAuSelectionPopover>
    </div>
  )
}
```

**AuSelectionPopover Props:**
- `children`: React.ReactNode - 弹窗内容（必需）
- `distance`: number - 弹窗距离选区的距离，默认10px
- `className`: string - 自定义CSS类名
- `style`: React.CSSProperties - 自定义样式
- `container`: HTMLElement - 限定文本选区检测的容器元素
- `onShow`: (position) => void - 弹窗显示时的回调
- `onHide`: () => void - 弹窗隐藏时的回调
- `disabled`: boolean - 是否禁用弹窗，默认false
- `portal`: boolean - 是否使用Portal渲染，默认true
- `zIndex`: number - 弹窗层级，默认9999

### 2. useTextSelection Hook
用于文本选区检测的React Hook。

```tsx
import React from 'react'
import { useTextSelection } from 'au-text-highlight'

function MyComponent() {
  const { selection, isSelecting, clearSelection } = useTextSelection({
    delay: 100,
    container: document.getElementById('text-container')
  })

  React.useEffect(() => {
    if (selection) {
      console.log('选中文本:', selection.text)
      console.log('位置信息:', selection.x, selection.y)
    }
  }, [selection])

  return (
    <div>
      <div id="text-container">
        选择这段文本，控制台会输出选区信息。
      </div>
      <div>
        状态:
        {' '}
        {isSelecting ? '选择中' : '未选择'}
        {selection && (
          <p>
            选中:
            {selection.text}
          </p>
        )}
        <button onClick={clearSelection}>清除选区</button>
      </div>
    </div>
  )
}
```

**useTextSelection 参数:**
- `delay`: number - 选区检测延迟时间，默认100ms
- `container`: HTMLElement - 限定检测范围的容器元素

**useTextSelection 返回值:**
- `selection`: TriggerPosition | null - 当前选区信息
- `isSelecting`: boolean - 是否正在选择文本
- `clearSelection`: () => void - 清除当前选区
- `getTriggerPosition`: () => TriggerPosition | null - 手动获取选区位置

## 完整示例

### 综合使用示例
```javascript
import {
  auExtractText,
  getSelectionRange,
  sectionRangeHighlight
} from 'au-text-highlight'

// 1. 搜索并高亮关键词
function highlightKeywords(containerElement, keywords) {
  const text = containerElement.textContent
  const matches = auExtractText({ text, keywords })

  // 高亮所有匹配的关键词
  const positions = matches.map((match, index) => ({
    start: match.start,
    end: match.end,
    gid: `keyword-${index}`
  }))

  sectionRangeHighlight(containerElement, positions)
}

// 2. 用户选区高亮
function highlightUserSelection(containerElement) {
  const [start, end] = getSelectionRange(containerElement)
  sectionRangeHighlight(containerElement, [
    { start, end, gid: 'user-selection' }
  ])
}

// 使用示例
const container = document.getElementById('article')
highlightKeywords(container, ['JavaScript', 'React', 'TypeScript'])
```

### React完整示例
```tsx
import React, { useRef, useState } from 'react'
import {
  ReactAuSelectionPopover,
  auExtractText,
  sectionRangeHighlight
} from 'au-text-highlight'

function TextHighlightDemo() {
  const [selectedText, setSelectedText] = useState('')
  const containerRef = useRef<HTMLDivElement>(null)

  const handleShow = (position) => {
    setSelectedText(position.text)
  }

  const handleTranslate = () => {
    alert(`翻译: ${selectedText}`)
  }

  const handleHighlight = () => {
    if (containerRef.current) {
      const text = containerRef.current.textContent
      const matches = auExtractText({ text, keywords: selectedText })

      const positions = matches.map((match, index) => ({
        start: match.start,
        end: match.end,
        gid: `highlight-${index}`
      }))

      sectionRangeHighlight(containerRef.current, positions)
    }
  }

  return (
    <div>
      <div ref={containerRef} className="text-content">
        这是一段演示文本。选择任意文字会弹出操作菜单，
        你可以翻译选中的文本，或者高亮页面中所有相同的词语。
      </div>

      <ReactAuSelectionPopover
        container={containerRef.current}
        onShow={handleShow}
        style={{
          backgroundColor: 'white',
          border: '1px solid #ccc',
          borderRadius: '6px',
          padding: '8px',
          boxShadow: '0 2px 10px rgba(0,0,0,0.1)'
        }}
      >
        <div className="popover-content">
          <button onClick={handleTranslate}>🌐 翻译</button>
          <button onClick={handleHighlight}>🎨 高亮相同词语</button>
        </div>
      </ReactAuSelectionPopover>
    </div>
  )
}
```

## 版本更新日志
- v1.1.0
  - 正式版发布，完善文档，提供全面的划词评论，划词等功能的解决方案
  - 增加react popover组件，用户划词选区后会出现popover组件

## 高级功能
未完待续，后续持续更新ing

<!-- ### 删除高亮
```javascript
// 删除特定高亮
function removeHighlight(gid) {
  const element = document.getElementById(gid)
  if (element) {
    const parent = element.parentNode
    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element)
    }
    parent.removeChild(element)
  }
}

// 删除所有高亮
function removeAllHighlights() {
  const highlights = document.querySelectorAll('.word_comment_mark')
  highlights.forEach((element) => {
    const parent = element.parentNode
    while (element.firstChild) {
      parent.insertBefore(element.firstChild, element)
    }
    parent.removeChild(element)
  })
}
``` -->
<!--
### 自定义弹窗样式
```css
.au-text-highlight-popover {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 12px;
  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
  color: white;
  padding: 16px;
  min-width: 200px;
  animation: fadeInUp 0.3s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
``` -->

## 浏览器兼容性
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 贡献
欢迎提交Issue和Pull Request！如果你有好的想法或发现了bug，请随时参与贡献。
