import { Routes, Route } from 'react-router-dom'
import Layout from './components/layout/Layout'
import Home from './pages/Home/Home'
import Tools from './pages/Tools/Tools'
import ToolDetail from './pages/Tools/ToolDetail'
import BudgetCalculator from './pages/Tools/BudgetCalculator'
import MediaDownloader from './pages/Tools/MediaDownloader'

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tools" element={<Tools />} />
        <Route path="/tools/budget-calculator" element={<BudgetCalculator />} />
        <Route path="/tools/:toolId" element={<ToolDetail />} />
        <Route path="/tools/media-downloader" element={<MediaDownloader />} />
      </Routes>
    </Layout>
  )
}

export default App 