import './App.css'
// import TextHighlighter from './components/TextHighlighter'
import ReactPopoverDemo from './components/ReactPopoverDemo'

function App() {
  return (
    <div className=" bg-gray-100 p-4">
      <div className="container mx-auto px-4">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          文本高亮库演示
        </h1>
        {/* <TextHighlighter /> */}
        <ReactPopoverDemo />
      </div>
    </div>
  )
}

export default App
