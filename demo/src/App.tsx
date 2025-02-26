import './App.css'
import TextHighlighter from './components/TextHighlighter'

function App() {
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          文本高亮库演示
        </h1>
        <TextHighlighter />
      </div>
    </div>
  )
}

export default App
