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
            专业
            <span className="text-primary-600"> 婚礼策划师</span>
            工具集合
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            为婚庆公司和婚礼策划师量身定制的专业工具平台。提供预算计算、时间规划、座位安排等实用工具，让每一场婚礼都完美无瑕。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/tools"
              className="btn-primary px-8 py-3 text-lg inline-flex items-center justify-center"
            >
              <span>探索专业工具</span>
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
            <p className="text-lg text-gray-600">
              精选最受欢迎和最实用的婚庆策划工具
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
                <span className="text-2xl">💍</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                专业策划
              </h3>
              <p className="text-gray-600">
                专为婚礼策划师设计，涵盖预算、时间、座位等核心需求
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                数据驱动
              </h3>
              <p className="text-gray-600">
                智能计算和分析，让每个决策都有数据支撑
              </p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✨</span>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                完美执行
              </h3>
              <p className="text-gray-600">
                详细的清单和提醒，确保婚礼执行完美无瑕
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home 