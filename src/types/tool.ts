export interface Tool {
  id: string;
  name: string;
  description: string;
  category: string;
  icon: string;
  path: string;
  isComingSoon?: boolean;
  tags?: string[];
  featured?: boolean;
}

export interface ToolCategory {
  id: string;
  name: string;
  icon: string;
  description?: string;
  tools: Tool[];
}

export interface ToolSearchParams {
  query?: string;
  category?: string;
  tags?: string[];
} 