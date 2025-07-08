import React, { useState, useRef } from 'react'
import { ReactAuSelectionPopover, sectionRangeHighlight, getSelectionRange, type PopoverComponentRef } from '../../../src/index'
import '../assets/style.css'

interface TriggerPosition {
  text: string
  x: number
  y: number
  width: number
  height: number
}

const ReactPopoverDemo: React.FC = () => {
  const [selectedText, setSelectedText] = useState<string>('')
  const [isPopoverVisible, setIsPopoverVisible] = useState(false)
  const [distance, setDistance] = useState(5)
  const [disabled, setDisabled] = useState(false)
  const [rangeArr, setRangeArr] = useState<{ start: number, end: number }[]>([])
  const textContainerRef = useRef<HTMLDivElement>(null)
  const popoverRef = useRef<PopoverComponentRef>(null)
  const handleShow = (position: TriggerPosition) => {
    setSelectedText(position.text)
    setIsPopoverVisible(true)
    if (textContainerRef.current) {
      const area = getSelectionRange(textContainerRef.current)
      setRangeArr([{ start: area[0], end: area[1] }])
    }
  }

  const handleHide = () => {
    setIsPopoverVisible(false)
  }

  const handleTranslate = () => {
    if (selectedText) {
      alert(`翻译功能：${selectedText}`)
    }
  }

  const handleSearch = () => {
    if (selectedText) {
      window.open(`https://www.google.com/search?q=${encodeURIComponent(selectedText)}`, '_blank')
    }
  }

  const handleCopy = async () => {
    if (selectedText) {
      try {
        await navigator.clipboard.writeText(selectedText)
        alert('已复制到剪贴板')
      } catch (error) {
        console.error('复制失败:', error)
      }
    }
  }

  const highlightWords = () => {
    if (textContainerRef.current) {
      sectionRangeHighlight(textContainerRef.current, [{ start: 71, end: 75 }])
    }
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">React Popover 组件演示</h2>
      {/* 控制面板 */}
      <div className="mb-6 bg-gray-50 rounded-lg">
        <h3 className="text-lg font-semibold mb-3 text-gray-700">配置选项</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              距离 (px)
            </label>
            <input
              type="number"
              value={distance}
              onChange={(e) => setDistance(Number(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              min="0"
              max="50"
            />
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="disabled"
              checked={disabled}
              onChange={(e) => setDisabled(e.target.checked)}
              className="mr-2"
            />
            <label htmlFor="disabled" className="text-sm font-medium text-gray-700">
              禁用 Popover
            </label>
          </div>
          {/* 高亮关键字 */}
          <div className="flex items-center">
            <button onClick={highlightWords}>高亮关键词</button>
          </div>
          <div className="flex items-center">
            <div className={`px-3 py-1 rounded-full text-sm ${isPopoverVisible
              ? 'bg-green-100 text-green-800'
              : 'bg-gray-100 text-gray-600'
              }`}>
              状态: {isPopoverVisible ? '显示中' : '隐藏'}
            </div>
          </div>
        </div>
      </div>

      {/* 演示文本区域 */}
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-2 text-gray-700">选择文本试试：</h3>
        <div
          ref={textContainerRef}
          className="p-6 border-2 border-gray-300 rounded-lg bg-gray-50 leading-relaxed text-gray-800 border-dashed"
          style={{ userSelect: 'text' }}
        >
          <p className="mb-4">
            这是一个 <strong>React Popover</strong> 组件的演示。你可以选择这段文本中的任何内容，
            会自动弹出一个包含操作按钮的 popover。
          </p>
          <p className="mb-4">
            该组件支持 <em>插槽模式</em>，你可以在 popover 中放入任何自定义内容，比如按钮、表单、
            或者其他复杂的交互元素。组件会自动处理位置计算、边界检测和响应式布局。
          </p>
          <p className="mb-4">
            功能特性包括：
          </p>
          <ul className="list-disc list-inside mb-4 space-y-1">
            <li>📝 文本选区自动检测</li>
            <li>📍 智能位置计算和边界检测</li>
            <li>🎨 完全自定义的样式和内容</li>
            <li>📱 响应式设计，支持移动端</li>
            <li>⚡ 高性能，使用 React Hooks 优化</li>
            <li>🔧 丰富的配置选项</li>
          </ul>
          <p>
            试试选择不同长度的文本，包括 <span className="bg-yellow-200">短词</span>、
            <span className="text-blue-600">长句子</span>，或者跨越多行的文本内容，
            看看 popover 如何智能地调整位置以获得最佳的用户体验。
          </p>
        </div>
      </div>

      {/* 当前选中的文本显示 */}
      {selectedText && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-800">
            <strong>当前选中：</strong> "{selectedText}"
          </p>
        </div>
      )}

      {/* React Popover 组件 */}
      <ReactAuSelectionPopover
        ref={popoverRef}
        distance={distance}
        disabled={disabled}
        container={textContainerRef.current || undefined}
        onShow={handleShow}
        onHide={handleHide}
        className="react-popover-demo"
        style={{
          backgroundColor: 'white',
          border: '1px solid #e5e7eb',
          borderRadius: '8px',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
          padding: '8px',
          minWidth: '200px',
        }}
      >
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <button
              onClick={handleTranslate}
              className="flex-1 px-3 py-2 bg-blue-500 text-gray-800 text-sm rounded hover:bg-blue-600 transition-colors"
            >
              🌐 翻译
            </button>
            <button
              onClick={handleSearch}
              className="flex-1 px-3 py-2 bg-green-500 text-gray-800 text-sm rounded hover:bg-green-600 transition-colors"
            >
              🔍 搜索
            </button>
          </div>
          <button
            onClick={handleCopy}
            className="w-full px-3 py-2 bg-gray-500 text-gray-800 text-sm rounded hover:bg-gray-600 transition-colors"
          >
            📋 复制
          </button>
          <div className="mt-2 p-2 bg-gray-100 rounded text-xs text-gray-600">
            选中: {selectedText.length > 20 ? `${selectedText.slice(0, 20)}...` : selectedText}
          </div>
          <div className="mt-2 p-2 bg-gray-100 rounded text-xs text-gray-600">
            区间：{rangeArr[0]?.start} ~ {rangeArr[0]?.end}
          </div>
          <div className="flex items-center">
            <button onClick={() => popoverRef.current?.close()}>关闭</button>
          </div>
        </div>
      </ReactAuSelectionPopover>

      {/* 使用说明 */}
      <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <h3 className="text-lg font-semibold mb-2 text-blue-800">使用说明</h3>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• 选择上方文本区域中的任意文本</li>
          <li>• Popover 会自动出现在选中文本附近</li>
          <li>• 点击 Popover 外部区域可以关闭它</li>
          <li>• 可以通过配置选项调整行为</li>
          <li>• 支持键盘导航和无障碍访问</li>
        </ul>
      </div>
    </div>
  )
}

export default ReactPopoverDemo 
