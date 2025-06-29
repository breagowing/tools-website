import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { ToolCategory } from '../../types/tool'
import { mockService } from '../../services/mockService'
import ToolCard from '../../components/common/ToolCard'

const Home = () => {
  const [featuredTools, setFeaturedTools] = useState<ToolCategory[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFeaturedTools = async () => {
      try {
        const categories = await mockService.getTools()
        // 获取前3个分类作为推荐工具
        setFeaturedTools(categories.slice(0, 3))
              } catch (error) {
          console.error('Failed to fetch featured tools:', error)
        } finally {
        setLoading(false)
      }
    }

    fetchFeaturedTools()
  }, [])

  // 获取要显示的工具
  const toolsToShow = featuredTools.flatMap(category => 
    category.tools.slice(0, 2)
  )

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary-50 to-blue-50 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            便捷实用的
            <span className="text-primary-600"> 在线工具集合</span>
          </h1>
          <p className="text-xl text-secondary-600 mb-8 max-w-3xl mx-auto">
            无需下载安装，打开浏览器即可使用。涵盖开发、设计、文本处理、图片处理等多个领域的实用工具。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools"
              className="btn-primary px-8 py-3 text-lg inline-flex items-center justify-center"
            >
              <span>探索所有工具</span>
              <svg className="ml-2 h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
            <a
              href="#featured"
              className="btn-secondary px-8 py-3 text-lg inline-flex items-center justify-center"
            >
              查看推荐工具
            </a>
          </div>
        </div>
      </section>

      {/* Featured Tools Section */}
      <section id="featured" className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🌟 推荐工具
            </h2>
            <p className="text-lg text-secondary-600">
              精选最受欢迎和最实用的在线工具
            </p>
          </div>



          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map(i => (
                <div key={i} className="animate-pulse">
                  <div className="bg-secondary-200 rounded-xl h-48"></div>
                </div>
              ))}
            </div>
          ) : toolsToShow.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                没有找到推荐工具
              </h3>
              <p className="text-gray-600">
                工具数据可能未正确加载
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {toolsToShow.map(tool => (
                <ToolCard key={tool.id} tool={tool} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-secondary-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              🚀 为什么选择我们
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">⚡</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                快速便捷
              </h3>
              <p className="text-secondary-600">
                无需下载安装，打开浏览器即可使用，响应迅速
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔒</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                安全可靠
              </h3>
              <p className="text-secondary-600">
                所有处理均在本地完成，不上传任何数据，保护隐私
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                响应式设计
              </h3>
              <p className="text-secondary-600">
                完美适配桌面端和移动端，随时随地使用
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 