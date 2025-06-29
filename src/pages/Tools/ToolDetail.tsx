import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Tool } from '../../types/tool'
import { mockService } from '../../services/mockService'

const ToolDetail = () => {
  const { toolId } = useParams<{ toolId: string }>()
  const [tool, setTool] = useState<Tool | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTool = async () => {
      if (!toolId) return
      
      try {
        setLoading(true)
        const toolData = await mockService.getToolById(toolId)
        setTool(toolData as Tool)
      } catch (error) {
        console.error('Failed to fetch tool:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTool()
  }, [toolId])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="animate-pulse">
            <div className="h-8 bg-secondary-200 rounded w-1/4 mb-4"></div>
            <div className="h-12 bg-secondary-200 rounded w-1/2 mb-6"></div>
            <div className="h-64 bg-secondary-200 rounded"></div>
          </div>
        </div>
      </div>
    )
  }

  if (!tool) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            工具不存在
          </h1>
          <p className="text-secondary-600 mb-8">
            抱歉，您访问的工具不存在或已被移除
          </p>
          <Link
            to="/tools"
            className="btn-primary"
          >
            返回工具列表
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-secondary-600 mb-6">
          <Link to="/" className="hover:text-primary-600">
            首页
          </Link>
          <span>/</span>
          <Link to="/tools" className="hover:text-primary-600">
            工具
          </Link>
          <span>/</span>
          <span className="text-primary-600">{tool.name}</span>
        </nav>

        {/* Tool Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex items-center">
              <span className="text-5xl mr-4" role="img" aria-label={tool.name}>
                {tool.icon}
              </span>
              <div>
                <h1 className="text-3xl font-bold text-gray-900 mb-2">
                  {tool.name}
                </h1>
                <p className="text-lg text-secondary-600">
                  {tool.description}
                </p>
              </div>
            </div>
            
            {tool.isComingSoon && (
              <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-secondary-100 text-secondary-800">
                即将上线
              </span>
            )}
          </div>

          {tool.tags && tool.tags.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {tool.tags.map(tag => (
                <span
                  key={tag}
                  className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Tool Interface */}
        <div className="bg-white rounded-xl shadow-sm p-8">
          {tool.isComingSoon ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🚧</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                工具开发中
              </h3>
              <p className="text-secondary-600 mb-6">
                该工具正在开发中，敬请期待！
              </p>
              <Link
                to="/tools"
                className="btn-primary"
              >
                浏览其他工具
              </Link>
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                工具界面即将完成
              </h3>
              <p className="text-secondary-600 mb-6">
                {tool.name} 的交互界面正在完善中，敬请期待！
              </p>
              <div className="flex justify-center space-x-4">
                <Link
                  to="/tools"
                  className="btn-secondary"
                >
                  返回工具列表
                </Link>
                <button
                  onClick={() => window.history.back()}
                  className="btn-primary"
                >
                  返回上页
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ToolDetail 