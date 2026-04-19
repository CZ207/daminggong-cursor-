import { useState, useMemo } from 'react';
import KnowledgeGraph from '../components/KnowledgeGraph';
import staticData from '../data.json';

type GraphNode = {
  id: string;
  label: string;
  group?: number;
  hasHiddenChildren?: boolean;
};

type GraphLink = {
  source: string | { id: string };
  target: string | { id: string };
  label?: string;
};

export default function HanyuanSearch() {
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set(['root']));

  const visibleGraph = useMemo(() => {
    const visibleNodeIds = new Set<string>(['root']);

    staticData.links.forEach((link: GraphLink) => {
      if (!link.source || !link.target) return;
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;

      if (expandedNodes.has(sourceId)) {
        visibleNodeIds.add(sourceId);
        visibleNodeIds.add(targetId);
      }
      if (expandedNodes.has(targetId)) {
        visibleNodeIds.add(sourceId);
        visibleNodeIds.add(targetId);
      }
    });

    const vNodes = staticData.nodes
      .filter((node: GraphNode) => visibleNodeIds.has(node.id))
      .map((node: GraphNode) => {
        const hasHidden = staticData.links.some((link: GraphLink) => {
          if (!link.source || !link.target) return false;
          const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
          const targetId = typeof link.target === 'object' ? link.target.id : link.target;
          if (sourceId === node.id && !visibleNodeIds.has(targetId)) return true;
          if (targetId === node.id && !visibleNodeIds.has(sourceId)) return true;
          return false;
        });
        return { ...node, hasHiddenChildren: hasHidden };
      });

    const vLinks = staticData.links.filter((link: GraphLink) => {
      if (!link.source || !link.target) return false;
      const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
      const targetId = typeof link.target === 'object' ? link.target.id : link.target;
      return visibleNodeIds.has(sourceId) && visibleNodeIds.has(targetId);
    });

    return { nodes: vNodes, links: vLinks };
  }, [expandedNodes]);

  const relationshipDetails = useMemo(() => {
    if (!selectedNode) return [];

    return staticData.links
      .filter((link: GraphLink) => {
        if (!link.source || !link.target) return false;
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        return sourceId === selectedNode.id || targetId === selectedNode.id;
      })
      .map((link: GraphLink) => {
        const sourceId = typeof link.source === 'object' ? link.source.id : link.source;
        const targetId = typeof link.target === 'object' ? link.target.id : link.target;
        const isSource = sourceId === selectedNode.id;
        const relatedNodeId = isSource ? targetId : sourceId;
        const relatedNode = staticData.nodes.find((node: GraphNode) => node.id === relatedNodeId);

        return {
          relatedNodeId,
          relatedNodeLabel: relatedNode?.label ?? relatedNodeId,
          relationLabel: link.label ?? '未命名关系'
        };
      });
  }, [selectedNode]);

  const handleNodeClick = (node: GraphNode) => {
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
    <div className="h-screen w-full bg-[#f4ebd0] text-[#3e2723] flex flex-col font-serif overflow-hidden pt-[72px]">
      <main className="flex-1 flex flex-col lg:flex-row overflow-hidden">
        <div className="w-full lg:w-80 bg-[#e8dcc4] border-r border-[#bcaaa4] p-6 flex flex-col gap-6 overflow-y-auto shadow-inner">
          <div>
            <h2 className="text-sm font-bold text-[#5c1a1b] uppercase tracking-wider mb-3 border-b border-[#bcaaa4] pb-2">使用说明</h2>
            <p className="text-sm text-[#5d4037] leading-relaxed">
              这是一个关于唐代大明宫的动态知识图谱。<br /><br />
              • 初始仅展示核心框架。<br />
              • <b>点击节点</b>即可展开或收起相关的关联信息，并在此处查看详情。<br />
              • 拖拽节点可以调整布局，滚动鼠标可以缩放。
            </p>
          </div>

          {selectedNode && (
            <div className="mt-2 border-t border-[#bcaaa4] pt-6 flex flex-col gap-4">
              <h2 className="text-sm font-bold text-[#5c1a1b] uppercase tracking-wider mb-1 border-b border-[#bcaaa4] pb-2">节点详情</h2>

              <div className="bg-[#f4ebd0] rounded-sm p-4 border border-[#bcaaa4] shadow-sm">
                <h3 className="text-xl font-bold text-[#5c1a1b] mb-2">{selectedNode.label}</h3>
                <p className="text-xs text-[#8d6e63] mb-3 font-sans">ID: {selectedNode.id}</p>

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

                <div className="text-sm text-[#3e2723] leading-relaxed space-y-2">
                  <p>
                    此处为【{selectedNode.label}】的详细介绍文本占位符。您可以在代码中根据节点的 ID ({selectedNode.id}) 动态加载并替换这里的文字内容。
                  </p>
                </div>

                <div className="mt-5 border-t border-[#bcaaa4] pt-4">
                  <h4 className="text-sm font-bold text-[#5c1a1b] uppercase tracking-wider mb-3">关联关系</h4>
                  <div className="space-y-2">
                    {relationshipDetails.length > 0 ? (
                      relationshipDetails.map((relation, index) => (
                        <div
                          key={`${relation.relatedNodeId}-${relation.relationLabel}-${index}`}
                          className="rounded-sm border border-[#d7ccc8] bg-[#efe5cf] px-3 py-2"
                        >
                          <div className="text-sm text-[#3e2723] leading-relaxed">
                            与<span className="mx-1 font-bold text-[#5c1a1b]">{relation.relatedNodeLabel}</span>的关系：
                            <span className="ml-1 font-bold text-[#8a3b12]">{relation.relationLabel}</span>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-sm text-[#8d6e63]">当前节点暂无可显示的关联关系。</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 relative p-4 lg:p-6 bg-[#f4ebd0]">
          <KnowledgeGraph data={visibleGraph} onNodeClick={handleNodeClick} />
        </div>
      </main>
    </div>
  );
}
