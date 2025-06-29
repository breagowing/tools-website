import { ToolCategory } from '../types/tool'

// 婚庆专业工具Mock数据
const mockData: ToolCategory[] = [
  {
    id: 'planning',
    name: '婚礼策划工具',
    icon: '💍',
    description: '专业婚礼策划和预算管理工具',
    tools: [
      {
        id: 'budget-calculator',
        name: '婚礼预算计算器',
        description: '智能计算婚礼各项费用分配，帮助合理控制预算',
        category: 'planning',
        icon: '💰',
        path: '/tools/budget-calculator',
        featured: true,
        tags: ['预算', '费用', '计算']
      },
      {
        id: 'timeline-planner',
        name: '婚礼时间线规划',
        description: '制定详细的婚礼筹备时间计划和提醒事项',
        category: 'planning',
        icon: '📅',
        path: '/tools/timeline-planner',
        featured: true,
        tags: ['时间线', '规划', '筹备']
      },
      {
        id: 'guest-calculator',
        name: '宾客数量计算',
        description: '根据场地容量和预算计算最适宜的宾客人数',
        category: 'planning',
        icon: '👥',
        path: '/tools/guest-calculator',
        tags: ['宾客', '人数', '场地']
      },
      {
        id: 'checklist-generator',
        name: '婚礼清单生成器',
        description: '生成详细的婚礼筹备清单和执行计划',
        category: 'planning',
        icon: '📋',
        path: '/tools/checklist-generator',
        featured: true,
        tags: ['清单', '筹备', '计划']
      }
    ]
  },
  {
    id: 'calculation',
    name: '计算工具',
    icon: '🔢',
    description: '婚礼相关的专业计算工具',
    tools: [
      {
        id: 'seating-calculator',
        name: '座位安排计算',
        description: '根据宾客关系和桌型智能计算座位安排方案',
        category: 'calculation',
        icon: '🪑',
        path: '/tools/seating-calculator',
        tags: ['座位', '安排', '宾客关系']
      },
      {
        id: 'catering-calculator',
        name: '餐饮用量计算',
        description: '精确计算婚宴菜品、酒水、甜品等用量需求',
        category: 'calculation',
        icon: '🍽️',
        path: '/tools/catering-calculator',
        featured: true,
        tags: ['餐饮', '用量', '婚宴']
      },
      {
        id: 'flower-calculator',
        name: '花材用量计算',
        description: '计算手捧花、胸花、装饰花等各类花材用量',
        category: 'calculation',
        icon: '🌸',
        path: '/tools/flower-calculator',
        tags: ['花材', '装饰', '用量']
      },
      {
        id: 'venue-calculator',
        name: '场地面积计算',
        description: '根据宾客人数和活动类型计算所需场地面积',
        category: 'calculation',
        icon: '🏛️',
        path: '/tools/venue-calculator',
        tags: ['场地', '面积', '空间规划']
      }
    ]
  },
  {
    id: 'design',
    name: '设计工具',
    icon: '🎨',
    description: '婚礼视觉设计和创意工具',
    tools: [
      {
        id: 'color-scheme',
        name: '婚礼配色方案',
        description: '生成专业的婚礼主题配色和装饰色彩搭配',
        category: 'design',
        icon: '🌈',
        path: '/tools/color-scheme',
        featured: true,
        tags: ['配色', '主题', '装饰']
      },
      {
        id: 'invitation-designer',
        name: '邀请函设计助手',
        description: '在线设计和预览个性化婚礼邀请函样式',
        category: 'design',
        icon: '💌',
        path: '/tools/invitation-designer',
        tags: ['邀请函', '设计', '个性化']
      },
      {
        id: 'qr-invitation',
        name: '电子请柬二维码',
        description: '生成电子邀请函二维码，方便宾客分享和回复',
        category: 'design',
        icon: '📱',
        path: '/tools/qr-invitation',
        tags: ['二维码', '电子请柬', '分享']
      },
      {
        id: 'photo-resizer',
        name: '婚纱照尺寸调整',
        description: '调整婚纱照片到标准展示尺寸和打印规格',
        category: 'design',
        icon: '📸',
        path: '/tools/photo-resizer',
        tags: ['照片', '尺寸', '婚纱照']
      },
      {
        id: 'media-downloader',
        name: '婚礼素材下载器',
        description: '从小红书、抖音等平台下载婚礼案例图片和视频素材',
        category: 'design',
        icon: '⬇️',
        path: '/tools/media-downloader',
        featured: true,
        tags: ['素材', '下载', '小红书', '抖音', '视频', '图片']
      }
    ]
  },
  {
    id: 'document',
    name: '文档工具',
    icon: '📄',
    description: '婚庆相关文档和记录管理',
    tools: [
      {
        id: 'contract-generator',
        name: '婚庆合同生成器',
        description: '生成标准的婚庆服务合同和协议模板',
        category: 'document',
        icon: '📋',
        path: '/tools/contract-generator',
        tags: ['合同', '协议', '法律文档']
      },
      {
        id: 'vow-assistant',
        name: '婚礼誓词助手',
        description: '帮助新人创作个性化的婚礼誓词和致辞',
        category: 'document',
        icon: '💕',
        path: '/tools/vow-assistant',
        tags: ['誓词', '致辞', '个性化']
      },
      {
        id: 'vendor-manager',
        name: '供应商清单管理',
        description: '管理和记录婚庆供应商联系信息和服务详情',
        category: 'document',
        icon: '📞',
        path: '/tools/vendor-manager',
        featured: true,
        tags: ['供应商', '联系人', '管理']
      },
      {
        id: 'gift-tracker',
        name: '礼金记录管理',
        description: '记录和管理婚礼收到的礼金和礼品信息',
        category: 'document',
        icon: '🎁',
        path: '/tools/gift-tracker',
        tags: ['礼金', '礼品', '记录']
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