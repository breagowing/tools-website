import { ToolCategory } from '../types/tool'

// 婚庆策划师专用工具数据
const mockData: ToolCategory[] = [
  {
    id: 'planning',
    name: '婚礼策划',
    icon: '💍',
    description: '婚礼策划和时间管理工具',
    tools: [
      {
        id: 'wedding-budget-calculator',
        name: '婚礼预算计算器',
        description: '智能计算婚礼各项费用，合理分配预算',
        category: 'planning',
        icon: '💰',
        path: '/tools/wedding-budget-calculator',
        featured: true,
        tags: ['预算', '费用', '策划']
      },
      {
        id: 'wedding-timeline',
        name: '婚礼时间线规划',
        description: '制定详细的婚礼筹备时间计划表',
        category: 'planning',
        icon: '📅',
        path: '/tools/wedding-timeline',
        featured: true,
        tags: ['时间线', '计划', '筹备']
      },
      {
        id: 'guest-calculator',
        name: '宾客数量计算',
        description: '根据场地和预算计算合适的宾客人数',
        category: 'planning',
        icon: '👥',
        path: '/tools/guest-calculator',
        tags: ['宾客', '人数', '场地']
      },
      {
        id: 'wedding-checklist',
        name: '婚礼清单生成器',
        description: '生成详细的婚礼筹备清单，确保不遗漏',
        category: 'planning',
        icon: '📋',
        path: '/tools/wedding-checklist',
        tags: ['清单', '筹备', '提醒']
      }
    ]
  },
  {
    id: 'calculation',
    name: '计算工具',
    icon: '🔢',
    description: '婚礼相关的各种计算工具',
    tools: [
      {
        id: 'seating-calculator',
        name: '座位安排计算',
        description: '根据宾客关系和桌型计算最佳座位安排',
        category: 'calculation',
        icon: '🪑',
        path: '/tools/seating-calculator',
        featured: true,
        tags: ['座位', '安排', '桌型']
      },
      {
        id: 'food-calculator',
        name: '餐饮用量计算',
        description: '计算婚宴所需的菜品、酒水、甜品数量',
        category: 'calculation',
        icon: '🍽️',
        path: '/tools/food-calculator',
        tags: ['餐饮', '用量', '酒水']
      },
      {
        id: 'flower-calculator',
        name: '花材用量计算',
        description: '计算手捧花、胸花、装饰花等所需花材',
        category: 'calculation',
        icon: '🌸',
        path: '/tools/flower-calculator',
        tags: ['花材', '装饰', '手捧花']
      },
      {
        id: 'venue-calculator',
        name: '场地面积计算',
        description: '根据宾客数量计算所需场地面积',
        category: 'calculation',
        icon: '🏛️',
        path: '/tools/venue-calculator',
        isComingSoon: true,
        tags: ['场地', '面积', '容量']
      }
    ]
  },
  {
    id: 'design',
    name: '设计工具',
    icon: '🎨',
    description: '婚礼视觉设计和配色工具',
    tools: [
      {
        id: 'wedding-color-palette',
        name: '婚礼配色方案',
        description: '生成专业的婚礼主题配色方案',
        category: 'design',
        icon: '🌈',
        path: '/tools/wedding-color-palette',
        featured: true,
        tags: ['配色', '主题', '色彩']
      },
      {
        id: 'invitation-designer',
        name: '邀请函设计助手',
        description: '设计和预览婚礼邀请函样式',
        category: 'design',
        icon: '💌',
        path: '/tools/invitation-designer',
        tags: ['邀请函', '设计', '模板']
      },
      {
        id: 'qr-invitation',
        name: '电子请柬二维码',
        description: '生成电子婚礼邀请函二维码',
        category: 'design',
        icon: '📱',
        path: '/tools/qr-invitation',
        tags: ['二维码', '电子请柬', '分享']
      },
      {
        id: 'photo-resizer',
        name: '婚纱照尺寸调整',
        description: '调整婚纱照到标准尺寸，适配各种用途',
        category: 'design',
        icon: '📷',
        path: '/tools/photo-resizer',
        isComingSoon: true,
        tags: ['照片', '尺寸', '婚纱照']
      }
    ]
  },
  {
    id: 'document',
    name: '文档工具',
    icon: '📄',
    description: '婚礼文档和合同管理工具',
    tools: [
      {
        id: 'contract-generator',
        name: '婚庆合同生成器',
        description: '生成标准的婚庆服务合同模板',
        category: 'document',
        icon: '📜',
        path: '/tools/contract-generator',
        tags: ['合同', '法律', '服务']
      },
      {
        id: 'vow-generator',
        name: '婚礼誓词助手',
        description: '帮助新人创作个性化的婚礼誓词',
        category: 'document',
        icon: '💕',
        path: '/tools/vow-generator',
        tags: ['誓词', '创作', '个性化']
      },
      {
        id: 'vendor-list',
        name: '供应商清单管理',
        description: '管理和组织婚礼供应商联系信息',
        category: 'document',
        icon: '📞',
        path: '/tools/vendor-list',
        isComingSoon: true,
        tags: ['供应商', '联系人', '管理']
      },
      {
        id: 'gift-tracker',
        name: '礼金记录管理',
        description: '记录和管理婚礼礼金，生成感谢名单',
        category: 'document',
        icon: '🎁',
        path: '/tools/gift-tracker',
        isComingSoon: true,
        tags: ['礼金', '记录', '感谢']
      }
    ]
  }
]

export const mockService = {
  // 获取所有工具分类
  getTools: (): Promise<ToolCategory[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(mockData)
      }, 100) // 模拟网络延迟
    })
  },

  // 根据ID获取工具
  getToolById: (id: string) => {
    return new Promise(resolve => {
      setTimeout(() => {
        const allTools = mockData.flatMap(cat => cat.tools)
        const tool = allTools.find(tool => tool.id === id)
        resolve(tool)
      }, 100)
    })
  },

  // 根据分类获取工具
  getToolsByCategory: (categoryId: string): Promise<ToolCategory | undefined> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const category = mockData.find(cat => cat.id === categoryId)
        resolve(category)
      }, 100)
    })
  },

  // 搜索工具
  searchTools: (query: string): Promise<ToolCategory[]> => {
    return new Promise(resolve => {
      setTimeout(() => {
        const filteredData = mockData.map(category => ({
          ...category,
          tools: category.tools.filter(tool => 
            tool.name.toLowerCase().includes(query.toLowerCase()) ||
            tool.description.toLowerCase().includes(query.toLowerCase()) ||
            tool.tags?.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
          )
        })).filter(category => category.tools.length > 0)
        
        resolve(filteredData)
      }, 200)
    })
  }
} 