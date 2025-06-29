import { useEffect, useState } from 'react'
import { ToolCategory } from '../../types/tool'
import { mockService } from '../../services/mockService'
import ToolCard from '../../components/common/ToolCard'

const Tools = () => {
  const [categories, setCategories] = useState<ToolCategory[]>([])
  const [loading, setLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  useEffect(() => {
    const fetchTools = async () => {
      try {
        setLoading(true)
        if (searchQuery.trim()) {
          const results = await mockService.searchTools(searchQuery)
          setCategories(results)
        } else {
          const allCategories = await mockService.getTools()
          setCategories(allCategories)
        }
      } catch (error) {
        console.error('Failed to fetch tools:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTools()
  }, [searchQuery])

  // 过滤分类
  const filteredCategories = selectedCategory === 'all' 
    ? categories 
    : categories.filter((cat: ToolCategory) => cat.id === selectedCategory)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            💍 专业工具
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            发现和使用各种专业的婚庆策划工具，让您的婚礼策划更高效
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-secondary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="搜索工具..."
                value={searchQuery}
                onChange={handleSearch}
                className="input-field pl-10"
              />
            </div>

            {/* Category Filter */}
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === 'all'
                    ? 'bg-primary-600 text-white'
                    : 'bg-white text-secondary-600 hover:bg-secondary-100'
                }`}
              >
                全部
              </button>
              {categories.map((category: ToolCategory) => (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white'
                      : 'bg-white text-secondary-600 hover:bg-secondary-100'
                  }`}
                >
                  {category.icon} {category.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Tools Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-white rounded-xl h-64 shadow-sm"></div>
              </div>
            ))}
          </div>
        ) : filteredCategories.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              没有找到相关工具
            </h3>
            <p className="text-secondary-600">
              尝试使用不同的搜索词或浏览其他分类
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {filteredCategories.map((category: ToolCategory) => (
              <div key={category.id} className="animate-slide-up">
                <div className="flex items-center mb-6">
                  <span className="text-3xl mr-3" role="img" aria-label={category.name}>
                    {category.icon}
                  </span>
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {category.name}
                    </h2>
                    {category.description && (
                      <p className="text-secondary-600 mt-1">
                        {category.description}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {category.tools.map(tool => (
                    <ToolCard key={tool.id} tool={tool} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default Tools 