import { ToolCategory } from '../types/tool'

// Mock数据
const mockData: ToolCategory[] = [
  {
    id: 'text',
    name: '文本工具',
    icon: '📝',
    description: '各种文本处理和格式化工具',
    tools: [
      {
        id: 'json-formatter',
        name: 'JSON格式化',
        description: '格式化和验证JSON数据，支持压缩和美化',
        category: 'text',
        icon: '🔧',
        path: '/tools/json-formatter',
        featured: true,
        tags: ['JSON', '格式化', '验证']
      },
      {
        id: 'base64-encoder',
        name: 'Base64编解码',
        description: 'Base64编码和解码工具，支持文本和文件',
        category: 'text',
        icon: '🔐',
        path: '/tools/base64-encoder',
        tags: ['Base64', '编码', '解码']
      },
      {
        id: 'url-encoder',
        name: 'URL编解码',
        description: 'URL编码和解码，处理特殊字符',
        category: 'text',
        icon: '🌐',
        path: '/tools/url-encoder',
        tags: ['URL', '编码', '解码']
      },
      {
        id: 'markdown-converter',
        name: 'Markdown转换',
        description: 'Markdown与HTML互相转换',
        category: 'text',
        icon: '📄',
        path: '/tools/markdown-converter',
        isComingSoon: true,
        tags: ['Markdown', 'HTML', '转换']
      }
    ]
  },
  {
    id: 'image',
    name: '图片工具',
    icon: '🖼️',
    description: '图片处理和优化工具',
    tools: [
      {
        id: 'image-compressor',
        name: '图片压缩',
        description: '在线压缩图片，减少文件大小',
        category: 'image',
        icon: '📦',
        path: '/tools/image-compressor',
        featured: true,
        tags: ['图片', '压缩', '优化']
      },
      {
        id: 'image-converter',
        name: '图片格式转换',
        description: '支持JPG、PNG、WebP等格式互转',
        category: 'image',
        icon: '🔄',
        path: '/tools/image-converter',
        isComingSoon: true,
        tags: ['图片', '转换', '格式']
      },
      {
        id: 'qr-generator',
        name: '二维码生成',
        description: '生成各种样式的二维码',
        category: 'image',
        icon: '📱',
        path: '/tools/qr-generator',
        tags: ['二维码', '生成', 'QR码']
      }
    ]
  },
  {
    id: 'developer',
    name: '开发工具',
    icon: '⚙️',
    description: '面向开发者的实用工具',
    tools: [
      {
        id: 'color-picker',
        name: '颜色选择器',
        description: '颜色选择和格式转换工具',
        category: 'developer',
        icon: '🎨',
        path: '/tools/color-picker',
        featured: true,
        tags: ['颜色', '选择器', 'CSS']
      },
      {
        id: 'regex-tester',
        name: '正则表达式测试',
        description: '测试和验证正则表达式',
        category: 'developer',
        icon: '🔍',
        path: '/tools/regex-tester',
        tags: ['正则', '测试', '验证']
      },
      {
        id: 'hash-generator',
        name: 'Hash生成器',
        description: '生成MD5、SHA1、SHA256等Hash值',
        category: 'developer',
        icon: '#️⃣',
        path: '/tools/hash-generator',
        tags: ['Hash', 'MD5', 'SHA256']
      },
      {
        id: 'timestamp-converter',
        name: '时间戳转换',
        description: '时间戳与日期时间互相转换',
        category: 'developer',
        icon: '⏰',
        path: '/tools/timestamp-converter',
        tags: ['时间戳', '日期', '转换']
      }
    ]
  },
  {
    id: 'calculator',
    name: '计算工具',
    icon: '🔢',
    description: '各种计算和换算工具',
    tools: [
      {
        id: 'unit-converter',
        name: '单位转换',
        description: '长度、重量、温度等单位转换',
        category: 'calculator',
        icon: '📏',
        path: '/tools/unit-converter',
        isComingSoon: true,
        tags: ['单位', '转换', '计算']
      },
      {
        id: 'percentage-calculator',
        name: '百分比计算',
        description: '各种百分比计算工具',
        category: 'calculator',
        icon: '%',
        path: '/tools/percentage-calculator',
        isComingSoon: true,
        tags: ['百分比', '计算', '数学']
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