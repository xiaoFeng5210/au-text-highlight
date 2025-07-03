import { useEffect, useRef, useState } from 'react';
import { auExtractText, DrawWordConstituencyPopover, sectionRangeHighlight, getSelectionRange, getSelectionRangeContent } from '../../../lib/bundle.esm.js';


const TextHighlighter = () => {
  const textRef = useRef<HTMLDivElement>(null);
  const [selectedRange, setSelectedRange] = useState<[number, number] | null>(null);
  const [keyword, setKeyword] = useState<string>('参数');

  const handleHighlight = () => {
    if (textRef.current) {
      // const text = textRef.current.innerText;
      // const results = auExtractText({ text, keywords: keyword });
      // sectionRangeHighlight(
      //   textRef.current,
      //   results.map((v: ExtractResult): HighlightRange => ({ start: v.start, end: v.end }))
      // );
      sectionRangeHighlight(textRef.current, [{ start: 13, end: 15 }])
      const { content, section } = getSelectionRangeContent()
      console.log(content, section)
    }
  };

  const handleGetRange = () => {
    if (textRef.current) {
      const range = getSelectionRange(textRef.current);
      setSelectedRange(range);
    }
  };

  useEffect(() => {
    new DrawWordConstituencyPopover('popover_highlighter')
  }, [])

  return (
    <div id="text-highlighter" className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <div id="popover_highlighter" className="w-30 h-10 bg-gray-500">
        测试popover
      </div>
      <h2 className="text-2xl font-bold mb-4 text-gray-800">文本高亮演示</h2>

      <div className="mb-4">
        <label htmlFor="keyword" className="block text-sm font-medium text-gray-700 mb-1">
          关键词
        </label>
        <div className="flex gap-2">
          <input
            id="keyword"
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="输入要高亮的关键词"
          />
        </div>
      </div>

      <div
        ref={textRef}
        className="p-4 border border-gray-300 rounded-md mb-4 min-h-[200px] bg-gray-50"
        contentEditable
        suppressContentEditableWarning
      >
        与其前身<span>GPT-2</span> 一样，
        <span>它是<strong>一种</strong>仅解码器的深度神经网络</span>
        <span>[2] 转换器模型，它通过一种称为"注意力"的技术取代了递归和基于卷积的架构。
          [3] 这种注意力机制允许模型有选择地关注它预测最相关的输入文本片段。
          [4] GPT-3 有 1750 亿个参数，每个<b>参数</b>精度为 16 位，需要 350GB 的存储空间，因为每个参数占用 2 个字节。它的上下文窗口大小为 2048 个令牌，并且在许多任务中表现出强大的"零样本"和"少样本"学习能力。</span>
      </div>

      <div className="flex gap-3 mb-4">
        <button
          onClick={handleHighlight}
          className="px-4 py-2 bg-blue-600 text-black rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          高亮关键词
        </button>
        <button
          onClick={handleGetRange}
          className="px-4 py-2 bg-gray-600 text-black rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
        >
          获取选区范围
        </button>
      </div>

      {selectedRange && (
        <div className="p-4 bg-gray-100 rounded-md">
          <h3 className="text-lg font-semibold mb-2 text-gray-800">选区范围</h3>
          <p className="text-gray-700">
            开始位置: <span className="font-mono bg-gray-200 px-1 rounded">{selectedRange[0]}</span>
            <br />
            结束位置: <span className="font-mono bg-gray-200 px-1 rounded">{selectedRange[1]}</span>
          </p>
        </div>
      )}
    </div>
  );
};

export default TextHighlighter; 
