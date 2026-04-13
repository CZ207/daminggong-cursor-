import React, { useState, useMemo } from 'react';
import KnowledgeGraph from '../components/KnowledgeGraph'; 
import staticData from '../data.json'; 

export default function HanyuanSearch() {
  const [selectedNode, setSelectedNode] = useState<any>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));

  // 计算可见的图谱节点
  const visibleGraph = useMemo(() => {
    const visibleNodeIds = new Set<string>(['root']);
    
    staticData.links.forEach(link => {
      if (!link.source || !link.target) return;
      const sourceId = typeof link.source === 'object' ? (link.source as any).id : link.source;
      const targetId = typeof link.target === 'object' ? (link.target as any).id : link.target;
      
      if (expandedNodes.has(sourceId)) {
        visibleNodeIds.add(sourceId);
        visibleNodeIds.add(targetId);
      }
      if (expandedNodes.has(targetId)) {
        visibleNodeIds.add(sourceId);
        visibleNodeIds.add(targetId);
      }
    });

    const vNodes = staticData.nodes.filter(n => visibleNodeIds.has(n.id)).map(n => {
      const hasHidden = staticData.links.some(l => {
        if (!l.source || !l.target) return false;
        const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
        const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
        if (sourceId === n.id && !visibleNodeIds.has(targetId)) return true;
        if (targetId === n.id && !visibleNodeIds.has(sourceId)) return true;
        return false;
      });
      return { ...n, hasHiddenChildren: hasHidden };
    });

    const vLinks = staticData.links.filter(l => {
      if (!l.source || !l.target) return false;
      const sourceId = typeof l.source === 'object' ? (l.source as any).id : l.source;
      const targetId = typeof l.target === 'object' ? (l.target as any).id : l.target;
      return visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
    });

    return { nodes: vNodes, links: vLinks };
  }, [expandedNodes]);

  const handleNodeClick = (node: any) => {
    setSelectedNode(node);
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(node.id)) {
        if (node.id !== 'root') next.delete(node.id);
      } else {
        next.add(node.id);
      }
      return next;
    });
  };

  return (
    // 加了 pt-[72px] 来给你的全局 TopNav 腾出空间
    <div className="h-screen w-full bg-[#f4ebd0] text-[#3e2723] flex flex-col font-serif overflow-hidden pt-[72px]">
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        {/* Sidebar */}
        <div className="w-full lg:w-80 bg-[#e8dcc4] border-r border-[#bcaaa4] p-6 flex flex-col gap-6 overflow-y-auto shadow-inner">
          <div>
            <h2 className="text-sm font-bold text-[#5c1a1b] uppercase tracking-wider mb-3 border-b border-[#bcaaa4] pb-2">使用说明</h2>
            <p className="text-sm text-[#5d4037] leading-relaxed">
              这是一个关于唐代大明宫的动态知识图谱。<br/><br/>
              • 初始仅展示核心框架。<br/>
              • <b>点击节点</b>即可展开或收起相关的关联信息，并在此处查看详情。<br/>
              • 拖拽节点可以调整布局，滚动鼠标可以缩放。
            </p>
          </div>

          {selectedNode && (
            <div className="mt-2 border-t border-[#bcaaa4] pt-6 flex flex-col gap-4">
              <h2 className="text-sm font-bold text-[#5c1a1b] uppercase tracking-wider mb-1 border-b border-[#bcaaa4] pb-2">节点详情</h2>
              
              <div className="bg-[#f4ebd0] rounded-sm p-4 border border-[#bcaaa4] shadow-sm">
                <h3 className="text-xl font-bold text-[#5c1a1b] mb-2">{selectedNode.label}</h3>
                <p className="text-xs text-[#8d6e63] mb-3 font-sans">ID: {selectedNode.id}</p>
                
                {/* Image Placeholder */}
                <div className="w-full aspect-video bg-[#d7ccc8] rounded-sm mb-4 overflow-hidden border border-[#bcaaa4] flex items-center justify-center relative">
                  <img 
                    src={`https://picsum.photos/seed/${selectedNode.id}/400/300?grayscale&blur=2`} 
                    alt={selectedNode.label}
                    className="w-full h-full object-cover opacity-80 mix-blend-multiply"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <span className="text-[#5c1a1b] font-bold text-sm bg-[#f4ebd0]/80 px-2 py-1 rounded">图片占位</span>
                  </div>
                </div>

                {/* Text Description Placeholder */}
                <div className="text-sm text-[#3e2723] leading-relaxed space-y-2">
                  <p>
                    此处为【{selectedNode.label}】的详细介绍文本占位符。您可以在代码中根据节点的 ID ({selectedNode.id}) 动态加载并替换这里的文字内容。
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Graph Area */}
        <div className="flex-1 relative p-4 lg:p-6 bg-[#f4ebd0]">
          <KnowledgeGraph data={visibleGraph} onNodeClick={handleNodeClick} />
        </div>
      </main>
    </div>
  );
}