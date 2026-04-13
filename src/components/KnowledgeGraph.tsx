import React, { useRef, useEffect, useState, useMemo } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { CSS2DRenderer, CSS2DObject } from 'three/examples/jsm/renderers/CSS2DRenderer.js';
import * as THREE from 'three';

interface KnowledgeGraphProps {
  data: { nodes: any[], links: any[] };
  onNodeClick?: (node: any) => void;
}

export default function KnowledgeGraph({ data, onNodeClick }: KnowledgeGraphProps) {
  const fgRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 800, height: 600 });
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (containerRef.current) {
      const { clientWidth, clientHeight } = containerRef.current;
      setDimensions({ width: clientWidth, height: clientHeight });
    }

    const handleResize = () => {
      if (containerRef.current) {
        const { clientWidth, clientHeight } = containerRef.current;
        setDimensions({ width: clientWidth, height: clientHeight });
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Deep clone data to prevent internal mutation issues and fix root node to center
  const graphData = useMemo(() => {
    return {
      nodes: data.nodes.map(n => {
        const node = { ...n };
        if (node.id === 'root') {
          // Fix the core node "大明宫" at the center of the sphere
          node.fx = 0;
          node.fy = 0;
          node.fz = 0;
        }
        return node;
      }),
      links: data.links.map(l => ({ ...l }))
    };
  }, [data]);

  const extraRenderers = useMemo(() => [new CSS2DRenderer()], []);

  useEffect(() => {
    if (fgRef.current) {
      const scene = fgRef.current.scene();
      
      // Add a faint background sphere to visualize the "globe"
      if (scene && !scene.getObjectByName('background-sphere')) {
        const geometry = new THREE.SphereGeometry(118, 32, 32);
        const material = new THREE.MeshBasicMaterial({
          color: 0x8b4513, // Brownish historical color
          transparent: true,
          opacity: 0.08,
          wireframe: true
        });
        const sphere = new THREE.Mesh(geometry, material);
        sphere.name = 'background-sphere';
        scene.add(sphere);
      }

      // Spread out nodes to form a nice sphere around the center, but keep it compact
      fgRef.current.d3Force('charge').strength(-100);
      fgRef.current.d3Force('link').distance(40);

      // Custom force to push nodes to the surface of a sphere
      const radialForce = function(alpha: number) {
        const nodes = graphData.nodes;
        const radius = 120; // Target radius for the sphere surface
        nodes.forEach((node: any) => {
          if (node.id === 'root') return; // Keep root at center
          
          const dx = node.x || 0.1;
          const dy = node.y || 0.1;
          const dz = node.z || 0.1;
          const distance = Math.sqrt(dx * dx + dy * dy + dz * dz);
          
          // Push/pull towards the target radius
          const k = ((radius - distance) / distance) * alpha * 0.8;
          
          node.vx += dx * k;
          node.vy += dy * k;
          node.vz += dz * k;
        });
      };
      fgRef.current.d3Force('radial', radialForce);
    }
  }, [graphData]);

  useEffect(() => {
    // Move camera closer initially so text is readable
    const timeout = setTimeout(() => {
      if (fgRef.current) {
        fgRef.current.cameraPosition({ z: 250 }, null, 1000);
      }
    }, 100);
    return () => clearTimeout(timeout);
  }, []);

  useEffect(() => {
    let animationFrameId: number;

    const animate = () => {
      if (fgRef.current) {
        const scene = fgRef.current.scene();
        const camera = fgRef.current.camera();
        
        if (scene) {
          // Slowly rotate the entire 3D sphere
          scene.rotation.y += 0.002;
          scene.rotation.x += 0.001;
        }

        if (camera && scene) {
          const cameraPos = camera.position.clone().normalize();
          const time = Date.now();
          
          graphData.nodes.forEach(node => {
            if (node.__threeObj && node.__threeObj.element) {
              const hitArea = node.__threeObj.element;
              const label = hitArea.firstChild as HTMLElement;
              
              if (label) {
                // Calculate distance-based scale and opacity
                const nodePos = new THREE.Vector3(node.x || 0, node.y || 0, node.z || 0);
                
                // Apply scene rotation to get true world position
                nodePos.applyEuler(scene.rotation);
                
                const dot = nodePos.dot(cameraPos);
                const clampedDot = Math.max(-120, Math.min(120, dot));
                const normalized = (clampedDot + 120) / 240; // 0 (furthest) to 1 (closest)
                
                const opacity = 0.1 + normalized * 0.9;
                let scale = 0.5 + normalized * 0.7; // 0.5 to 1.2
                
                // Add pulse effect for expandable nodes
                if (node.hasHiddenChildren) {
                  const pulse = Math.sin(time / 150) * 0.1 + 1.0;
                  scale *= pulse;
                }
                
                // Apply styles
                label.style.opacity = opacity.toString();
                label.style.transform = `scale(${scale})`;
                
                // Update z-index so closer nodes render on top and are clickable
                if (hitArea.style.zIndex !== '1000') {
                  hitArea.style.zIndex = Math.floor(normalized * 100).toString();
                }
              }
            }
          });
        }
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => cancelAnimationFrame(animationFrameId);
  }, [graphData]);

  return (
    <div ref={containerRef} className="w-full h-full bg-[#f4ebd0] rounded-sm overflow-hidden shadow-xl border border-[#bcaaa4] relative">
      <ForceGraph3D
        ref={fgRef}
        width={dimensions.width}
        height={dimensions.height}
        graphData={graphData}
        extraRenderers={extraRenderers}
        nodeLabel="" // Disable default tooltip since we have text sprites
        nodeAutoColorBy="group"
        linkDirectionalArrowLength={4}
        linkDirectionalArrowRelPos={1}
        linkDirectionalParticles={2}
        linkDirectionalParticleWidth={1.5}
        linkDirectionalParticleSpeed={0.005}
        linkColor={(link: any) => {
          const isRoot = link.source.id === 'root' || link.target.id === 'root' || link.source === 'root' || link.target === 'root';
          return isRoot ? 'rgba(139, 69, 19, 0.6)' : 'rgba(139, 69, 19, 0.25)'; // Dark brown for links
        }}
        linkWidth={(link: any) => {
          const isRoot = link.source.id === 'root' || link.target.id === 'root' || link.source === 'root' || link.target === 'root';
          return isRoot ? 1.5 : 0.5;
        }}
        backgroundColor="#f4ebd0"
        nodeThreeObject={(node: any) => {
          const displayLabel = node.hasHiddenChildren ? `${node.label} ⊞` : node.label;
          
          // Use CSS2DObject for crisp, readable HTML text that doesn't shrink when zooming out
          
          // Create a wrapper hit area for a "magnetic" hover feel
          const hitArea = document.createElement('div');
          hitArea.style.padding = '15px'; // Invisible magnetic area
          hitArea.style.pointerEvents = 'auto'; // allow clicking the HTML element
          hitArea.style.cursor = 'pointer';
          hitArea.className = 'node-hit-area';

          const nodeEl = document.createElement('div');
          nodeEl.textContent = displayLabel;
          // Historical colors for text and background
          nodeEl.style.color = node.hasHiddenChildren ? '#5c1a1b' : '#080100';
          nodeEl.style.backgroundColor = 'rgba(232, 220, 196, 0.95)';
          nodeEl.style.border = `1px solid ${node.id === 'root' ? '#5c1a1b' : '#8b4513'}`;
          nodeEl.style.borderRadius = '4px'; // Less rounded, more traditional
          nodeEl.style.fontFamily = 'serif'; // Serif font for historical feel
          
          // 💡 在这里调整文字的内边距 (Padding) - 格式: '上下边距 左右边距'
          nodeEl.style.padding = node.id === 'root' ? '10px 20px' : '6px 14px';
          
          // 💡 在这里调整文字的大小 (Font Size) - 核心节点(root)默认22px，其他节点默认16px
          nodeEl.style.fontSize = node.id === 'root' ? '22px' : '16px';
          
          nodeEl.style.fontWeight = 'bold';
          // Use 'scale' property instead of 'transform' to avoid conflicting with CSS2DRenderer's position updates
          nodeEl.style.transition = 'scale 0.15s ease-out, box-shadow 0.15s ease-out, background-color 0.15s ease-out';
          nodeEl.className = 'node-label shadow-sm';
          
          hitArea.appendChild(nodeEl);
          
          // Hover effect
          hitArea.onmouseenter = () => {
            nodeEl.style.scale = '1.15';
            nodeEl.style.boxShadow = `0 4px 12px rgba(139, 69, 19, 0.3)`;
            nodeEl.style.backgroundColor = '#fdf6e3';
            hitArea.style.zIndex = '1000';
          };
          hitArea.onmouseleave = () => {
            nodeEl.style.scale = '1';
            nodeEl.style.boxShadow = 'none';
            nodeEl.style.backgroundColor = 'rgba(232, 220, 196, 0.95)';
            // zIndex will be restored by the animation loop based on distance
          };
          
          // Click handler
          hitArea.onclick = () => {
            if (onNodeClick) onNodeClick(node);
          };

          return new CSS2DObject(hitArea);
        }}
        nodeThreeObjectExtend={false} // Hide the default 3D sphere, only show HTML text
        onNodeClick={onNodeClick}
      />
    </div>
  );
}
