import { Link } from 'react-router-dom'
import { Tool } from '../../types/tool'

interface ToolCardProps {
  tool: Tool
}

const ToolCard = ({ tool }: ToolCardProps) => {
  return (
    <div className="card hover:scale-105 transform transition-all duration-200 animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center">
          <span className="text-3xl mr-3" role="img" aria-label={tool.name}>
            {tool.icon}
          </span>
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {tool.name}
            </h3>
            {tool.featured && (
              <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                推荐
              </span>
            )}
          </div>
        </div>
        {tool.isComingSoon && (
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-secondary-100 text-secondary-800">
            即将上线
          </span>
        )}
      </div>
      
      <p className="text-secondary-600 mb-4 flex-1">
        {tool.description}
      </p>
      
      {tool.tags && tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {tool.tags.map(tag => (
            <span
              key={tag}
              className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-secondary-100 text-secondary-700"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      
      <div className="pt-4 border-t border-secondary-100">
        {tool.isComingSoon ? (
          <button
            disabled
            className="w-full bg-secondary-300 text-secondary-500 py-2 px-4 rounded-lg cursor-not-allowed"
          >
            即将上线
          </button>
        ) : (
          <Link
            to={tool.path}
            className="block w-full bg-primary-600 hover:bg-primary-700 text-white text-center py-2 px-4 rounded-lg transition-colors duration-200 font-medium"
          >
            使用工具
          </Link>
        )}
      </div>
    </div>
  )
}

export default ToolCard 