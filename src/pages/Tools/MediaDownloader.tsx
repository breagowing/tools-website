import { useState, useCallback } from 'react'
import { Link } from 'react-router-dom'

// 支持的平台类型
type SupportedPlatform = 'xiaohongshu' | 'douyin' | 'unknown'

// 媒体类型
type MediaType = 'image' | 'video' | 'unknown'

// 解析结果接口
interface ParseResult {
  id: string
  platform: SupportedPlatform
  type: MediaType
  title: string
  description: string
  thumbnail: string
  downloadUrl: string
  author: string
  tags: string[]
  createdAt: string
}

// 下载历史接口
interface DownloadHistory {
  id: string
  originalUrl: string
  result: ParseResult
  downloadedAt: string
  category: string
}

const MediaDownloader = () => {
  const [inputUrl, setInputUrl] = useState<string>('')
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [parseResult, setParseResult] = useState<ParseResult | null>(null)
  const [error, setError] = useState<string>('')
  const [downloadHistory, setDownloadHistory] = useState<DownloadHistory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>('婚礼现场')

  // 婚礼素材分类
  const categories = [
    '婚礼现场', '布置装饰', '婚纱造型', '摄影构图', 
    '花艺设计', '甜品台', '迎宾区', '仪式现场'
  ]

  // 检测平台类型
  const detectPlatform = (url: string): SupportedPlatform => {
    if (url.includes('xiaohongshu.com') || url.includes('xhslink.com')) {
      return 'xiaohongshu'
    }
    if (url.includes('douyin.com') || url.includes('iesdouyin.com')) {
      return 'douyin'
    }
    return 'unknown'
  }

  // Mock解析函数（演示版本）
  const mockParse = (url: string): Promise<ParseResult> => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const platform = detectPlatform(url)
        
        if (platform === 'unknown') {
          reject(new Error('暂不支持该平台，请使用小红书或抖音链接'))
          return
        }

        // Mock数据
        const mockResults = {
          xiaohongshu: {
            id: `xhs_${Date.now()}`,
            platform: 'xiaohongshu' as SupportedPlatform,
            type: 'image' as MediaType,
            title: '【婚礼现场】森系户外婚礼布置灵感',
            description: '简约而不简单的森系婚礼，绿植与白纱的完美结合，营造自然浪漫的氛围...',
            thumbnail: 'https://via.placeholder.com/300x400/FFE4E6/FF69B4?text=小红书婚礼素材',
            downloadUrl: 'mock://download/xhs/image',
            author: '婚礼策划师小美',
            tags: ['森系婚礼', '户外婚礼', '布置', '绿植'],
            createdAt: '2024-01-15'
          },
          douyin: {
            id: `dy_${Date.now()}`,
            platform: 'douyin' as SupportedPlatform,
            type: 'video' as MediaType,
            title: '超美婚礼入场仪式，新娘美翻了！',
            description: '这个入场方式太有创意了，花瓣雨配上音乐，氛围感拉满！',
            thumbnail: 'https://via.placeholder.com/300x400/E6F3FF/1890FF?text=抖音婚礼视频',
            downloadUrl: 'mock://download/douyin/video',
            author: '婚庆达人',
            tags: ['入场仪式', '花瓣雨', '创意', '氛围'],
            createdAt: '2024-01-16'
          }
        }

        resolve(mockResults[platform])
      }, 2000) // 模拟解析时间
    })
  }

  // 解析链接
  const handleParse = async () => {
    if (!inputUrl.trim()) {
      setError('请输入有效的链接地址')
      return
    }

    setIsLoading(true)
    setError('')
    setParseResult(null)

    try {
      const result = await mockParse(inputUrl.trim())
      setParseResult(result)
    } catch (err) {
      setError(err instanceof Error ? err.message : '解析失败，请重试')
    } finally {
      setIsLoading(false)
    }
  }

  // 下载素材
  const handleDownload = () => {
    if (!parseResult) return

    // 添加到下载历史
    const historyItem: DownloadHistory = {
      id: `history_${Date.now()}`,
      originalUrl: inputUrl,
      result: parseResult,
      downloadedAt: new Date().toLocaleString(),
      category: selectedCategory
    }

    setDownloadHistory(prev => [historyItem, ...prev])

    // 模拟下载
    const link = document.createElement('a')
    link.href = parseResult.downloadUrl
    link.download = `${parseResult.title}.${parseResult.type === 'video' ? 'mp4' : 'jpg'}`
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)

    // 显示成功提示
    alert(`素材已保存到"${selectedCategory}"分类！`)
  }

  // 清空输入
  const handleClear = () => {
    setInputUrl('')
    setParseResult(null)
    setError('')
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-primary-600">首页</Link>
          <span>/</span>
          <Link to="/tools" className="hover:text-primary-600">专业工具</Link>
          <span>/</span>
          <span className="text-primary-600">婚礼素材下载器</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <span className="text-5xl mr-4">⬇️</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                婚礼素材下载器
              </h1>
              <p className="text-lg text-gray-600">
                从小红书、抖音等平台下载婚礼案例图片和视频素材
              </p>
            </div>
          </div>

          {/* 支持平台展示 */}
          <div className="flex flex-wrap gap-4 mb-6">
            <div className="flex items-center bg-red-50 px-3 py-2 rounded-lg">
              <span className="text-lg mr-2">📘</span>
              <span className="text-sm font-medium text-red-700">小红书</span>
            </div>
            <div className="flex items-center bg-purple-50 px-3 py-2 rounded-lg">
              <span className="text-lg mr-2">🎵</span>
              <span className="text-sm font-medium text-purple-700">抖音</span>
            </div>
            <div className="flex items-center bg-gray-100 px-3 py-2 rounded-lg">
              <span className="text-lg mr-2">🔮</span>
              <span className="text-sm font-medium text-gray-600">更多平台即将支持</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：链接解析 */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">🔗 链接解析</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    粘贴素材链接地址
                  </label>
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={inputUrl}
                      onChange={(e) => setInputUrl(e.target.value)}
                      placeholder="请输入小红书或抖音的链接地址..."
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                      disabled={isLoading}
                    />
                    <button
                      onClick={handleClear}
                      className="px-4 py-3 text-gray-500 hover:text-gray-700 border border-gray-300 rounded-lg"
                      disabled={isLoading}
                    >
                      清空
                    </button>
                  </div>
                </div>

                <button
                  onClick={handleParse}
                  disabled={isLoading || !inputUrl.trim()}
                  className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <div className="flex items-center justify-center">
                      <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2"></div>
                      解析中...
                    </div>
                  ) : (
                    '🚀 开始解析'
                  )}
                </button>

                {/* 错误提示 */}
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
                    <div className="flex items-center">
                      <span className="text-red-600 mr-2">❌</span>
                      <span className="text-sm text-red-800">{error}</span>
                    </div>
                  </div>
                )}

                {/* 解析结果 */}
                {parseResult && (
                  <div className="border border-green-200 rounded-lg p-4 bg-green-50">
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="font-medium text-green-900">✅ 解析成功</h4>
                      <span className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded">
                        {parseResult.platform === 'xiaohongshu' ? '小红书' : '抖音'}
                      </span>
                    </div>

                    <div className="flex space-x-4">
                      <img
                        src={parseResult.thumbnail}
                        alt={parseResult.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-900 mb-1">{parseResult.title}</h5>
                        <p className="text-sm text-gray-600 mb-2">{parseResult.description}</p>
                        <div className="flex items-center text-xs text-gray-500 space-x-4">
                          <span>👤 {parseResult.author}</span>
                          <span>📅 {parseResult.createdAt}</span>
                          <span>{parseResult.type === 'video' ? '🎥 视频' : '🖼️ 图片'}</span>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-3">
                      {parseResult.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <div className="flex items-center justify-between mt-4 pt-4 border-t border-green-200">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          素材分类
                        </label>
                        <select
                          value={selectedCategory}
                          onChange={(e) => setSelectedCategory(e.target.value)}
                          className="px-3 py-1 border border-gray-300 rounded text-sm"
                        >
                          {categories.map(cat => (
                            <option key={cat} value={cat}>{cat}</option>
                          ))}
                        </select>
                      </div>
                      <button
                        onClick={handleDownload}
                        className="btn-primary px-6 py-2"
                      >
                        💾 下载素材
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* 使用说明 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📖 使用说明</h3>
              <div className="space-y-3 text-sm text-gray-600">
                <div className="flex items-start">
                  <span className="text-primary-600 mr-2">1.</span>
                  <div>
                    <strong>小红书：</strong>复制笔记分享链接，支持图片和视频内容
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-600 mr-2">2.</span>
                  <div>
                    <strong>抖音：</strong>复制视频分享链接，自动解析视频内容
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-600 mr-2">3.</span>
                  <div>
                    <strong>分类管理：</strong>可将素材按婚礼场景分类保存，便于后续查找
                  </div>
                </div>
                <div className="flex items-start">
                  <span className="text-primary-600 mr-2">4.</span>
                  <div>
                    <strong>版权提醒：</strong>下载的素材仅供学习参考，商用请联系原作者授权
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* 右侧：下载历史 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">📂 下载历史</h3>
              
              {downloadHistory.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <span className="text-4xl block mb-2">📥</span>
                  <p className="text-sm">暂无下载记录</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {downloadHistory.slice(0, 5).map((item) => (
                    <div key={item.id} className="border border-gray-200 rounded-lg p-3">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-xs text-gray-500">{item.category}</span>
                        <span className="text-xs text-gray-400">{item.downloadedAt}</span>
                      </div>
                      <h4 className="font-medium text-sm text-gray-900 mb-1 line-clamp-2">
                        {item.result.title}
                      </h4>
                      <div className="flex items-center text-xs text-gray-500">
                        <span className="mr-2">
                          {item.result.platform === 'xiaohongshu' ? '📘' : '🎵'}
                        </span>
                        <span className="mr-2">
                          {item.result.type === 'video' ? '🎥' : '🖼️'}
                        </span>
                        <span>{item.result.author}</span>
                      </div>
                    </div>
                  ))}
                  
                  {downloadHistory.length > 5 && (
                    <div className="text-center pt-2">
                      <button className="text-sm text-primary-600 hover:text-primary-700">
                        查看全部 {downloadHistory.length} 条记录
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* 素材分类统计 */}
            {downloadHistory.length > 0 && (
              <div className="bg-white rounded-xl shadow-sm p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">📊 分类统计</h3>
                <div className="space-y-2">
                  {categories.map(category => {
                    const count = downloadHistory.filter(item => item.category === category).length
                    return count > 0 ? (
                      <div key={category} className="flex justify-between items-center text-sm">
                        <span className="text-gray-700">{category}</span>
                        <span className="text-primary-600 font-medium">{count}</span>
                      </div>
                    ) : null
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default MediaDownloader 