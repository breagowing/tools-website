import { useState, useCallback, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { 
  PieChart, 
  Pie, 
  Cell, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer 
} from 'recharts'

// 预算分类接口
interface BudgetCategory {
  id: string
  name: string
  percentage: number
  color: string
  icon: string
  description: string
}

// 默认预算分配（基于行业标准）
const defaultCategories: BudgetCategory[] = [
  {
    id: 'venue',
    name: '场地费用',
    percentage: 40,
    color: '#3B82F6',
    icon: '🏛️',
    description: '婚礼场地租赁、装饰布置费用'
  },
  {
    id: 'catering',
    name: '餐饮费用',
    percentage: 30,
    color: '#10B981',
    icon: '🍽️',
    description: '婚宴菜品、酒水、服务费用'
  },
  {
    id: 'photography',
    name: '摄影摄像',
    percentage: 15,
    color: '#F59E0B',
    icon: '📸',
    description: '婚礼摄影、摄像、后期制作'
  },
  {
    id: 'flowers',
    name: '花艺装饰',
    percentage: 8,
    color: '#EF4444',
    icon: '🌸',
    description: '手捧花、胸花、会场花艺装饰'
  },
  {
    id: 'dress',
    name: '服装造型',
    percentage: 5,
    color: '#8B5CF6',
    icon: '👗',
    description: '婚纱、西装、化妆造型'
  },
  {
    id: 'misc',
    name: '其他费用',
    percentage: 2,
    color: '#6B7280',
    icon: '📋',
    description: '邀请函、礼品、交通等杂费'
  }
]

const BudgetCalculator = () => {
  const [totalBudget, setTotalBudget] = useState<number>(100000)
  const [categories, setCategories] = useState<BudgetCategory[]>(defaultCategories)
  const [activeCategory, setActiveCategory] = useState<string | null>(null)
  const [chartType, setChartType] = useState<'pie' | 'bar'>('pie')

  // 计算各项费用
  const calculateAmounts = useCallback(() => {
    return categories.map(category => ({
      ...category,
      amount: (totalBudget * category.percentage) / 100
    }))
  }, [totalBudget, categories])

  // 更新分类百分比
  const updateCategoryPercentage = (categoryId: string, newPercentage: number) => {
    setCategories(prev => 
      prev.map(cat => 
        cat.id === categoryId 
          ? { ...cat, percentage: Math.max(0, Math.min(100, newPercentage)) }
          : cat
      )
    )
  }

  // 重置为默认分配
  const resetToDefault = () => {
    setCategories(defaultCategories)
  }

  // 确保总百分比为100%
  const normalizePercentages = () => {
    const total = categories.reduce((sum, cat) => sum + cat.percentage, 0)
    if (total !== 100) {
      setCategories(prev => 
        prev.map(cat => ({
          ...cat,
          percentage: Math.round((cat.percentage / total) * 100 * 100) / 100
        }))
      )
    }
  }

  const calculatedAmounts = calculateAmounts()
  const currentTotal = categories.reduce((sum, cat) => sum + cat.percentage, 0)

  // 格式化金额显示
  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('zh-CN', {
      style: 'currency',
      currency: 'CNY',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount)
  }

  // 导出预算表
  const exportBudget = () => {
    const data = calculatedAmounts.map(item => 
      `${item.name},${item.percentage}%,${formatAmount(item.amount)}`
    ).join('\n')
    
    const content = `婚礼预算分配表\n总预算,${formatAmount(totalBudget)}\n\n分类,占比,金额\n${data}`
    
    const blob = new Blob([content], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `婚礼预算分配_${formatAmount(totalBudget)}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-6">
          <Link to="/" className="hover:text-primary-600">首页</Link>
          <span>/</span>
          <Link to="/tools" className="hover:text-primary-600">专业工具</Link>
          <span>/</span>
          <span className="text-primary-600">婚礼预算计算器</span>
        </nav>

        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex items-center mb-6">
            <span className="text-5xl mr-4">💰</span>
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                婚礼预算计算器
              </h1>
              <p className="text-lg text-gray-600">
                智能计算婚礼各项费用分配，帮助您合理控制预算
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 左侧：输入控制 */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">💵 总预算设置</h3>
              
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  婚礼总预算（元）
                </label>
                <input
                  type="number"
                  value={totalBudget}
                  onChange={(e) => setTotalBudget(Number(e.target.value) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  placeholder="请输入总预算"
                  min="0"
                  step="1000"
                />
              </div>

              <div className="text-center py-4 bg-primary-50 rounded-lg">
                <div className="text-2xl font-bold text-primary-600">
                  {formatAmount(totalBudget)}
                </div>
                <div className="text-sm text-gray-600">总预算</div>
              </div>
            </div>

            {/* 快速预算模板 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">⚡ 快速模板</h3>
              
              <div className="space-y-2">
                {[
                  { name: '经济型婚礼', amount: 50000 },
                  { name: '标准型婚礼', amount: 100000 },
                  { name: '豪华型婚礼', amount: 200000 },
                  { name: '奢华型婚礼', amount: 500000 }
                ].map(template => (
                  <button
                    key={template.name}
                    onClick={() => setTotalBudget(template.amount)}
                    className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="font-medium text-gray-900">{template.name}</div>
                    <div className="text-sm text-gray-600">{formatAmount(template.amount)}</div>
                  </button>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <button
                  onClick={resetToDefault}
                  className="w-full btn-secondary text-sm py-2"
                >
                  重置为推荐分配
                </button>
              </div>
            </div>
          </div>

          {/* 右侧：数据可视化和预算分配详情 */}
          <div className="lg:col-span-2 space-y-6">
            {/* 数据可视化区域 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">📊 预算可视化</h3>
                <div className="flex space-x-2">
                  <button
                    onClick={() => setChartType('pie')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      chartType === 'pie'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    🥧 饼图
                  </button>
                  <button
                    onClick={() => setChartType('bar')}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      chartType === 'bar'
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    📊 柱状图
                  </button>
                </div>
              </div>

              <div className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  {chartType === 'pie' ? (
                    <PieChart>
                      <Pie
                        data={calculatedAmounts}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percentage }) => `${name} ${percentage}%`}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="amount"
                      >
                        {calculatedAmounts.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip 
                        formatter={(value: number, name: string) => [formatAmount(value), '金额']}
                        labelFormatter={(label: string) => `分类: ${label}`}
                      />
                      <Legend />
                    </PieChart>
                  ) : (
                    <BarChart
                      data={calculatedAmounts}
                      margin={{
                        top: 20,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis 
                        dataKey="name" 
                        angle={-45}
                        textAnchor="end"
                        height={100}
                        fontSize={12}
                      />
                      <YAxis 
                        tickFormatter={(value) => `${(value / 1000).toFixed(0)}k`}
                      />
                      <Tooltip
                        formatter={(value: number) => [formatAmount(value), '金额']}
                        labelFormatter={(label: string) => `分类: ${label}`}
                      />
                      <Bar 
                        dataKey="amount" 
                        fill="#3B82F6"
                        radius={[4, 4, 0, 0]}
                      >
                        {calculatedAmounts.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  )}
                </ResponsiveContainer>
              </div>

              {/* 图表说明 */}
              <div className="mt-4 flex flex-wrap gap-3">
                {calculatedAmounts.map((category) => (
                  <div key={category.id} className="flex items-center">
                    <div 
                      className="w-3 h-3 rounded-full mr-2"
                      style={{ backgroundColor: category.color }}
                    ></div>
                    <span className="text-sm text-gray-600">
                      {category.icon} {category.name}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 预算分配详情 */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-lg font-semibold text-gray-900">💎 预算分配明细</h3>
                <div className="flex items-center space-x-4">
                  <div className="text-sm">
                    <span className="text-gray-600">总分配：</span>
                    <span className={`font-medium ${currentTotal === 100 ? 'text-green-600' : 'text-red-600'}`}>
                      {currentTotal.toFixed(1)}%
                    </span>
                  </div>
                  <button
                    onClick={exportBudget}
                    className="btn-primary text-sm px-4 py-2"
                  >
                    导出预算表
                  </button>
                </div>
              </div>

              {currentTotal !== 100 && (
                <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
                  <div className="flex items-center">
                    <span className="text-yellow-600 mr-2">⚠️</span>
                    <span className="text-sm text-yellow-800">
                      当前分配总和为 {currentTotal.toFixed(1)}%，建议调整至100%
                    </span>
                    <button
                      onClick={normalizePercentages}
                      className="ml-auto text-sm text-yellow-600 hover:text-yellow-800 underline"
                    >
                      自动调整
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-4">
                {calculatedAmounts.map((category) => (
                  <div
                    key={category.id}
                    className={`border rounded-lg p-4 transition-all ${
                      activeCategory === category.id
                        ? 'border-primary-300 bg-primary-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center">
                        <span className="text-2xl mr-3">{category.icon}</span>
                        <div>
                          <h4 className="font-medium text-gray-900">{category.name}</h4>
                          <p className="text-sm text-gray-600">{category.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          {formatAmount(category.amount)}
                        </div>
                        <div className="text-sm text-gray-600">
                          {category.percentage}%
                        </div>
                      </div>
                    </div>

                    {/* 百分比调整滑块 */}
                    <div className="flex items-center space-x-4">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-600 w-8">0%</span>
                          <input
                            type="range"
                            min="0"
                            max="60"
                            step="0.5"
                            value={category.percentage}
                            onChange={(e) => updateCategoryPercentage(category.id, Number(e.target.value))}
                            className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                            aria-label={`调整${category.name}百分比`}
                            title={`调整${category.name}百分比`}
                            style={{
                              background: `linear-gradient(to right, ${category.color} 0%, ${category.color} ${(category.percentage / 60) * 100}%, #e5e7eb ${(category.percentage / 60) * 100}%, #e5e7eb 100%)`
                            }}
                          />
                          <span className="text-sm text-gray-600 w-12">60%</span>
                        </div>
                      </div>
                      <div className="w-20">
                        <input
                          type="number"
                          value={category.percentage}
                          onChange={(e) => updateCategoryPercentage(category.id, Number(e.target.value))}
                          className="w-full px-2 py-1 text-sm border border-gray-300 rounded"
                          min="0"
                          max="100"
                          step="0.5"
                          aria-label={`${category.name}百分比精确值`}
                          title={`${category.name}百分比精确值`}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* 预算建议 */}
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium text-blue-900 mb-2">💡 预算建议</h4>
                <ul className="text-sm text-blue-800 space-y-1">
                  <li>• 场地费用通常占预算的40%左右，是最大的支出项</li>
                  <li>• 餐饮费用建议控制在30%以内，可根据宾客数量调整</li>
                  <li>• 摄影摄像是永久纪念，建议分配15%左右</li>
                  <li>• 预留2-5%的应急资金，应对突发情况</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default BudgetCalculator 