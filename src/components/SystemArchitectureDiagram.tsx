import React from 'react';

const styles = `
@keyframes sysarch-flow-right {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}
@keyframes sysarch-flow-left {
  0% { stroke-dashoffset: -20; }
  100% { stroke-dashoffset: 0; }
}
@keyframes sysarch-flow-down {
  0% { stroke-dashoffset: 16; }
  100% { stroke-dashoffset: 0; }
}
.sysarch-diagram {
  background: #0d1117;
  border: 1px dashed #1e3a5f;
  border-radius: 12px;
  padding: 32px 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #c9d1d9;
}
.sysarch-diagram * { box-sizing: border-box; }

.sa-node {
  border-radius: 8px;
  padding: 10px 14px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  position: relative;
}
.sa-node-subtitle {
  font-size: 10px;
  font-weight: 400;
  opacity: 0.75;
  margin-top: 2px;
}
.sa-node-purple { background: #7c3aed; border: 2px solid #a78bfa; }
.sa-node-blue { background: #2563eb; border: 2px solid #60a5fa; }
.sa-node-green { background: #16a34a; border: 2px solid #4ade80; }
.sa-node-teal { background: #0d9488; border: 2px solid #2dd4bf; }
.sa-node-orange { background: #ea580c; border: 2px solid #fb923c; }
.sa-node-yellow { background: #ca8a04; border: 2px solid #facc15; color: #1a1a1a; }

.sa-section {
  border: 1.5px dashed;
  border-radius: 10px;
  padding: 16px;
  position: relative;
}
.sa-section-label {
  position: absolute;
  top: -10px;
  left: 16px;
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  padding: 0 8px;
  background: #0d1117;
}

.sa-edge-right { animation: sysarch-flow-right 1.2s linear infinite; }
.sa-edge-left { animation: sysarch-flow-left 1.2s linear infinite; }
.sa-edge-down { animation: sysarch-flow-down 1s linear infinite; }

.sa-tool-group {
  background: #161b22;
  border: 1.5px solid #21262d;
  border-radius: 6px;
  padding: 8px 10px;
  text-align: center;
  flex: 1;
  min-width: 0;
}
.sa-tool-group-title {
  font-size: 10px;
  font-weight: 700;
  letter-spacing: 0.5px;
  margin-bottom: 4px;
}
.sa-tool-group-items {
  font-size: 9px;
  color: #8b949e;
  line-height: 1.5;
}
`;

function Node({ color, title, subtitle, style = {} }: {
  color: string; title: string; subtitle?: string; style?: React.CSSProperties;
}) {
  return (
    <div className={`sa-node sa-node-${color}`} style={style}>
      <div>{title}</div>
      {subtitle && <div className="sa-node-subtitle">{subtitle}</div>}
    </div>
  );
}

function Section({ color, label, children, style = {} }: {
  color: string; label: string; children: React.ReactNode; style?: React.CSSProperties;
}) {
  return (
    <div className="sa-section" style={{ borderColor: color, ...style }}>
      <div className="sa-section-label" style={{ color }}>{label}</div>
      {children}
    </div>
  );
}

function EdgeLabel({ text, color = '#8b949e' }: { text: string; color?: string }) {
  return (
    <span style={{ fontSize: 9, fontWeight: 600, color, fontStyle: 'italic', whiteSpace: 'nowrap' }}>
      {text}
    </span>
  );
}

function DownArrow({ color, label }: { color: string; label?: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, margin: '4px 0' }}>
      <svg width="12" height="28">
        <line x1="6" y1="2" x2="6" y2="22" stroke={color} strokeWidth="1.5"
          strokeDasharray="4 3" className="sa-edge-down" />
        <path d={`M2,20 L6,26 L10,20`} fill="none" stroke={color} strokeWidth="1.5" />
      </svg>
      {label && <EdgeLabel text={label} color={color} />}
    </div>
  );
}

export default function SystemArchitectureDiagram() {
  return (
    <>
      <style>{styles}</style>
      <div className="sysarch-diagram" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 820, maxWidth: 1000, margin: '0 auto' }}>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: 0.5 }}>
              System Architecture
            </h3>
            <p style={{ fontSize: 12, color: '#8b949e', margin: '6px 0 0' }}>
              LLM Agent &rarr; MCP Server &rarr; Python Backend &rarr; C# Game Engine
            </p>
          </div>

          {/* ========== LAYER 1: LLM AGENT ========== */}
          <div style={{ display: 'flex', gap: 16, alignItems: 'stretch', marginBottom: 16 }}>
            <Section color="#a78bfa" label="LLM Agent" style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                <Node color="purple" title="LLM Agent" subtitle="Claude / GPT / local model" style={{ flex: 1 }} />
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg width="60" height="20">
                    <defs>
                      <marker id="sa-ar-purple" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                        <path d="M0,0 L8,3 L0,6" fill="#a78bfa" />
                      </marker>
                    </defs>
                    <line x1="4" y1="10" x2="48" y2="10" stroke="#a78bfa" strokeWidth="2" markerEnd="url(#sa-ar-purple)"
                      strokeDasharray="6 4" className="sa-edge-right" />
                  </svg>
                  <EdgeLabel text="tool_calls" color="#a78bfa" />
                </div>
                <Node color="purple" title="LLM" subtitle="Sends tool_use commands" style={{ flex: 0.8 }} />
              </div>
            </Section>

            {/* Legend */}
            <div style={{
              background: '#161b22', border: '1px solid #21262d', borderRadius: 8,
              padding: '12px 16px', minWidth: 180, flexShrink: 0,
            }}>
              <div style={{ fontSize: 10, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: 0.5, textTransform: 'uppercase' }}>
                Legend
              </div>
              {[
                { color: '#a78bfa', bg: '#7c3aed', label: 'AI / Agent layer' },
                { color: '#60a5fa', bg: '#2563eb', label: 'MCP Server' },
                { color: '#2dd4bf', bg: '#0d9488', label: 'Python Backend' },
                { color: '#4ade80', bg: '#16a34a', label: 'C# Game Engine' },
                { color: '#fb923c', bg: '#ea580c', label: 'gRPC Bridge' },
                { color: '#facc15', bg: '#ca8a04', label: 'Data / State' },
              ].map(({ color, bg, label }) => (
                <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                  <div style={{
                    width: 12, height: 12, borderRadius: 3,
                    background: bg, border: `1.5px solid ${color}`, flexShrink: 0,
                  }} />
                  <span style={{ fontSize: 10, color: '#c9d1d9' }}>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Arrow down between layers */}
          <DownArrow color="#a78bfa" label="MCP tool calls" />

          {/* ========== LAYER 2: MCP SERVER ========== */}
          <Section color="#60a5fa" label="MCP Server (OpenEnv)" style={{ marginBottom: 16 }}>
            <Node color="blue" title="OpenEnv Server" subtitle="MCP protocol, port 8000" style={{ marginBottom: 12 }} />

            <DownArrow color="#60a5fa" label="dispatches to tools" />

            <div style={{ display: 'flex', gap: 10, marginTop: 8 }}>
              <div className="sa-tool-group">
                <div className="sa-tool-group-title" style={{ color: '#60a5fa' }}>Game Tools</div>
                <div className="sa-tool-group-items">
                  get_game_state<br />get_observation<br />step<br />reset<br />get_map_info
                </div>
              </div>
              <div className="sa-tool-group">
                <div className="sa-tool-group-title" style={{ color: '#60a5fa' }}>Combat Tools</div>
                <div className="sa-tool-group-items">
                  attack_move<br />force_attack<br />guard<br />patrol<br />retreat<br />scatter
                </div>
              </div>
              <div className="sa-tool-group">
                <div className="sa-tool-group-title" style={{ color: '#60a5fa' }}>Economy Tools</div>
                <div className="sa-tool-group-items">
                  harvest<br />build_structure<br />train_unit<br />set_rally_point<br />sell
                </div>
              </div>
            </div>
          </Section>

          {/* Arrow down between layers */}
          <DownArrow color="#60a5fa" label="Python API calls" />

          {/* ========== LAYER 3: PYTHON BACKEND ========== */}
          <Section color="#2dd4bf" label="Python Backend" style={{ marginBottom: 16 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 12, marginBottom: 12 }}>
              <Node color="teal" title="OpenRAEnvironment" subtitle="Gymnasium-style API" />
              <Node color="yellow" title="Game Store" subtitle="episode state" />
              <Node color="orange" title="BridgeClient" subtitle="gRPC client" />
              <Node color="teal" title="ProcessManager" subtitle="daemon lifecycle" />
            </div>

            {/* Edges */}
            <div style={{
              display: 'flex', justifyContent: 'center', gap: 24, padding: '8px 12px',
              background: '#161b22', borderRadius: 6, border: '1px solid #21262d',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, color: '#2dd4bf', fontWeight: 600 }}>OpenRAEnvironment</span>
                <svg width="40" height="14">
                  <defs>
                    <marker id="sa-ar-orange" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <path d="M0,0 L8,3 L0,6" fill="#fb923c" />
                    </marker>
                  </defs>
                  <line x1="2" y1="7" x2="32" y2="7" stroke="#fb923c" strokeWidth="1.5" markerEnd="url(#sa-ar-orange)"
                    strokeDasharray="5 3" className="sa-edge-right" />
                </svg>
                <span style={{ fontSize: 10, color: '#fb923c', fontWeight: 600 }}>BridgeClient</span>
                <EdgeLabel text="gRPC calls" color="#fb923c" />
              </div>
              <div style={{ width: 1, background: '#21262d' }} />
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 10, color: '#2dd4bf', fontWeight: 600 }}>OpenRAEnvironment</span>
                <svg width="40" height="14">
                  <defs>
                    <marker id="sa-ar-teal" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <path d="M0,0 L8,3 L0,6" fill="#2dd4bf" />
                    </marker>
                  </defs>
                  <line x1="2" y1="7" x2="32" y2="7" stroke="#2dd4bf" strokeWidth="1.5" markerEnd="url(#sa-ar-teal)"
                    strokeDasharray="5 3" className="sa-edge-right" />
                </svg>
                <span style={{ fontSize: 10, color: '#2dd4bf', fontWeight: 600 }}>ProcessManager</span>
                <EdgeLabel text="spawn/kill" color="#2dd4bf" />
              </div>
            </div>
          </Section>

          {/* Arrow down between layers */}
          <DownArrow color="#fb923c" label="gRPC over localhost" />

          {/* ========== LAYER 4: C# GAME ENGINE ========== */}
          <Section color="#4ade80" label="C# Game Engine" style={{ background: 'rgba(22, 163, 74, 0.04)' }}>
            {/* Top row: bridge + grpc service */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 10 }}>
              <Node color="green" title="ExternalBotBridge" subtitle="IBot, ITick trait" />
              <Node color="green" title="RLBridgeService" subtitle="gRPC service impl" />
            </div>

            {/* Edge: RLBridgeService → ExternalBotBridge */}
            <div style={{
              display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, marginBottom: 6,
              padding: '4px 0',
            }}>
              <span style={{ fontSize: 9, color: '#4ade80', fontWeight: 600 }}>RLBridgeService</span>
              <svg width="50" height="14">
                <defs>
                  <marker id="sa-ar-green-l" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                    <path d="M8,0 L0,3 L8,6" fill="#4ade80" />
                  </marker>
                </defs>
                <line x1="12" y1="7" x2="48" y2="7" stroke="#4ade80" strokeWidth="1.5" markerEnd="url(#sa-ar-green-l)"
                  strokeDasharray="5 3" className="sa-edge-left" />
              </svg>
              <span style={{ fontSize: 9, color: '#4ade80', fontWeight: 600 }}>ExternalBotBridge</span>
              <EdgeLabel text="route by session_id" color="#4ade80" />
            </div>

            {/* Middle row: ActionHandler + ObservationSerializer */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 4 }}>
              <div>
                <Node color="orange" title="ActionHandler" subtitle="commands → Orders" />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, margin: '6px 0' }}>
                  <EdgeLabel text="process actions" color="#fb923c" />
                  <svg width="12" height="20">
                    <line x1="6" y1="2" x2="6" y2="14" stroke="#fb923c" strokeWidth="1.5"
                      strokeDasharray="4 3" className="sa-edge-down" />
                    <path d="M2,12 L6,18 L10,12" fill="none" stroke="#fb923c" strokeWidth="1.5" />
                  </svg>
                </div>
              </div>
              <div>
                <Node color="orange" title="ObservationSerializer" subtitle="World → Protobuf" />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, margin: '6px 0' }}>
                  <svg width="12" height="20">
                    <defs>
                      <marker id="sa-ar-orange-up" markerWidth="8" markerHeight="6" refX="4" refY="0" orient="auto">
                        <path d="M0,6 L4,0 L8,6" fill="#fb923c" />
                      </marker>
                    </defs>
                    <line x1="6" y1="18" x2="6" y2="6" stroke="#fb923c" strokeWidth="1.5"
                      strokeDasharray="4 3" className="sa-edge-down" />
                    <path d="M2,6 L6,0 L10,6" fill="none" stroke="#fb923c" strokeWidth="1.5" />
                  </svg>
                  <EdgeLabel text="read state" color="#fb923c" />
                </div>
              </div>
            </div>

            {/* Edge labels for bot bridge connections */}
            <div style={{
              display: 'flex', justifyContent: 'space-around', marginBottom: 4, padding: '0 40px',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="12" height="20">
                  <line x1="6" y1="2" x2="6" y2="14" stroke="#4ade80" strokeWidth="1.5"
                    strokeDasharray="4 3" className="sa-edge-down" />
                  <path d="M2,12 L6,18 L10,12" fill="none" stroke="#4ade80" strokeWidth="1.5" />
                </svg>
                <EdgeLabel text="issue Orders" color="#4ade80" />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <svg width="12" height="20">
                  <line x1="6" y1="2" x2="6" y2="14" stroke="#4ade80" strokeWidth="1.5"
                    strokeDasharray="4 3" className="sa-edge-down" />
                  <path d="M2,12 L6,18 L10,12" fill="none" stroke="#4ade80" strokeWidth="1.5" />
                </svg>
                <EdgeLabel text="read state" color="#4ade80" />
              </div>
            </div>

            {/* Bottom row: OpenRA World + Game Loop */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
              <Node color="green" title="OpenRA World" subtitle="actors, traits, orders" />
              <Node color="yellow" title="Game Loop" subtitle="tick cycle" />
            </div>
          </Section>

        </div>
      </div>
    </>
  );
}
