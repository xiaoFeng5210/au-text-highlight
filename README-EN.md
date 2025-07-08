# au-text-highlight

**[中文](README.md) | English**

Official version v1.1.51 released
Implement text selection, keyword highlighting, and selection detection in 3 lines of code. Includes React popover components for text selection!

## Project Overview
In modern web applications, features like text highlighting, selection translation, and keyword search are becoming increasingly common. This module provides a complete solution including:
- 🎯 **Text Selection Detection** - Precisely capture user-selected text positions
- 🌈 **Smart Highlighting** - Automatically highlight specified text areas with custom styling
- 💬 **Selection Popover** - React popover component that appears after text selection
- 🔧 **Highly Customizable** - Support for complete customization of styles, behaviors, and interactions
- 📝 **Keyword Matching** - Efficiently match keyword positions in text

## Installation
```bash
npm install au-text-highlight
```

## Core Features

### 1. Keyword Matching & Position Extraction
Extract precise positions of keywords in text, supporting single keywords or keyword arrays.

```javascript
import { auExtractText } from 'au-text-highlight'

// Single keyword matching
const result1 = auExtractText({
  text: 'GPT is an amazing AI technology, GPT is changing the world',
  keywords: 'GPT'
})
// Returns: [
//   { keyword: 'GPT', start: 0, end: 3 },
//   { keyword: 'GPT', start: 33, end: 36 }
// ]

// Multiple keywords matching
const result2 = auExtractText({
  text: 'JavaScript and TypeScript are both great languages',
  keywords: ['JavaScript', 'TypeScript']
})
// Returns: [
//   { keyword: 'JavaScript', start: 0, end: 10 },
//   { keyword: 'TypeScript', start: 15, end: 25 }
// ]
```

### 2. Text Selection Detection
Get position information of user-selected text for subsequent highlighting or other operations.

```javascript
import { getSelectionRange, getSelectionRangeContent } from 'au-text-highlight'

// Get start and end positions of selection
const containerElement = document.getElementById('text-container')
const [startIndex, endIndex] = getSelectionRange(containerElement)

// Get selection content and Selection object
const { content, section } = getSelectionRangeContent()
console.log('Selected text:', content)
```

### 3. Text Highlighting
Automatically highlight text based on position information, with support for custom styles and unique identifiers.

```javascript
import { sectionRangeHighlight } from 'au-text-highlight'

const containerElement = document.getElementById('text-container')

// Basic highlighting
sectionRangeHighlight(containerElement, [
  { start: 0, end: 5 },
  { start: 10, end: 15 }
])

// Highlighting with unique identifiers (for future operations)
sectionRangeHighlight(containerElement, [
  { start: 0, end: 5, gid: 'highlight-1' },
  { start: 10, end: 15, gid: 'highlight-2' }
])
```

**Highlighting Style Details:**
- Highlighted elements are wrapped with `<span>` tags
- Default class name: `word_comment_mark`
- Includes accessibility attributes: `role="text"` and `aria-label="highlighted content"`
- Supports setting unique IDs via gid parameter for future deletion or modification

**Custom Highlighting Styles:**
```css
.word_comment_mark {
  background-color: #ffeb3b;
  padding: 2px 4px;
  border-radius: 3px;
  border: 1px solid #ffc107;
}

/* Or use ID selectors for specific highlights */
#highlight-1 {
  background-color: #e3f2fd;
  border: 1px solid #2196f3;
}
```

## React Components

### 1. AuSelectionPopover Component
React version of text selection popover component with fully customizable content.

```tsx
import React from 'react'
import { ReactAuSelectionPopover } from 'au-text-highlight'

function MyComponent() {
  const handleShow = (position) => {
    console.log('Selected text:', position.text)
  }

  const handleHide = () => {
    console.log('Popover hidden')
  }

  return (
    <div>
      <div id="text-container">
        Select any text here to see the custom action panel.
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
          <button onClick={() => alert('Translate feature')}>🌐 Translate</button>
          <button onClick={() => alert('Search feature')}>🔍 Search</button>
          <button onClick={() => alert('Copy feature')}>📋 Copy</button>
        </div>
      </ReactAuSelectionPopover>
    </div>
  )
}
```

**AuSelectionPopover Props:**
- `children`: React.ReactNode - Popover content (required)
- `distance`: number - Distance from popover to selection, default 10px
- `className`: string - Custom CSS class name
- `style`: React.CSSProperties - Custom styles
- `container`: HTMLElement - Container element for limiting text selection detection
- `onShow`: (position) => void - Callback when popover is shown
- `onHide`: () => void - Callback when popover is hidden
- `disabled`: boolean - Whether to disable popover, default false
- `portal`: boolean - Whether to use Portal rendering, default true
- `zIndex`: number - Popover z-index, default 9999

### 2. useTextSelection Hook
React Hook for text selection detection.

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
      console.log('Selected text:', selection.text)
      console.log('Position info:', selection.x, selection.y)
    }
  }, [selection])

  return (
    <div>
      <div id="text-container">
        Select text here, console will output selection info.
      </div>
      <div>
        Status:
        {' '}
        {isSelecting ? 'Selecting' : 'Not selecting'}
        {selection && (
          <p>
            Selected:
            {selection.text}
          </p>
        )}
        <button onClick={clearSelection}>Clear Selection</button>
      </div>
    </div>
  )
}
```

**useTextSelection Parameters:**
- `delay`: number - Selection detection delay time, default 100ms
- `container`: HTMLElement - Container element for limiting detection scope

**useTextSelection Return Values:**
- `selection`: TriggerPosition | null - Current selection information
- `isSelecting`: boolean - Whether text is being selected
- `clearSelection`: () => void - Clear current selection
- `getTriggerPosition`: () => TriggerPosition | null - Manually get selection position

## Complete Examples

### Comprehensive Usage Example
```javascript
import {
  auExtractText,
  getSelectionRange,
  sectionRangeHighlight
} from 'au-text-highlight'

// 1. Search and highlight keywords
function highlightKeywords(containerElement, keywords) {
  const text = containerElement.textContent
  const matches = auExtractText({ text, keywords })

  // Highlight all matched keywords
  const positions = matches.map((match, index) => ({
    start: match.start,
    end: match.end,
    gid: `keyword-${index}`
  }))

  sectionRangeHighlight(containerElement, positions)
}

// 2. User selection highlighting
function highlightUserSelection(containerElement) {
  const [start, end] = getSelectionRange(containerElement)
  sectionRangeHighlight(containerElement, [
    { start, end, gid: 'user-selection' }
  ])
}

// Usage example
const container = document.getElementById('article')
highlightKeywords(container, ['JavaScript', 'React', 'TypeScript'])
```

### Complete React Example
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
    alert(`Translate: ${selectedText}`)
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
        This is demonstration text. Select any text to see the action menu,
        you can translate the selected text or highlight all similar words on the page.
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
          <button onClick={handleTranslate}>🌐 Translate</button>
          <button onClick={handleHighlight}>🎨 Highlight Similar Words</button>
        </div>
      </ReactAuSelectionPopover>
    </div>
  )
}
```

## TypeScript Definitions

```typescript
// Basic configuration
interface DeafultConfig {
  text: string
  keywords: string | string[]
}

// Position information
interface TriggerPosition {
  text: string
  x: number
  y: number
  width: number
  height: number
}

// Highlight position
interface HighlightPosition {
  start: number
  end: number
  gid?: string
}

// Match result
interface MatchResult {
  keyword: string
  start: number
  end: number
}
```

## Version Changelog
- v1.1.0
  - Official release with comprehensive documentation
  - Complete solution for text selection, commenting, and selection features
  - Added React popover component that appears after user text selection

## Advanced Features
More features coming soon, stay tuned for updates!

## Browser Compatibility
- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## Contributing
Issues and Pull Requests are welcome! If you have great ideas or find bugs, feel free to contribute.

## License
MIT License
