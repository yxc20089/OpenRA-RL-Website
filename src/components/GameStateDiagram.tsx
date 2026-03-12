import React from 'react';

const styles = `
@keyframes gs-flow-down {
  0% { stroke-dashoffset: 16; }
  100% { stroke-dashoffset: 0; }
}
@keyframes gs-flow-up {
  0% { stroke-dashoffset: -16; }
  100% { stroke-dashoffset: 0; }
}
@keyframes gs-flow-right {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}
@keyframes gs-flow-left {
  0% { stroke-dashoffset: -20; }
  100% { stroke-dashoffset: 0; }
}
@keyframes gs-pulse {
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
}
.gs-diagram {
  background: #0d1117;
  border: 1px dashed #1e3a5f;
  border-radius: 12px;
  padding: 32px 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #c9d1d9;
}
.gs-diagram * { box-sizing: border-box; }

.gs-node {
  border-radius: 8px;
  padding: 10px 14px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  position: relative;
}
.gs-node-pill {
  border-radius: 24px;
}
.gs-node-highlight {
  padding: 14px 18px;
  font-size: 14px;
  animation: gs-pulse 3s ease-in-out infinite;
}
.gs-node-subtitle {
  font-size: 10px;
  font-weight: 400;
  opacity: 0.75;
  margin-top: 2px;
}
.gs-node-purple { background: #7c3aed; border: 2px solid #a78bfa; }
.gs-node-blue { background: #2563eb; border: 2px solid #60a5fa; }
.gs-node-green { background: #16a34a; border: 2px solid #4ade80; }
.gs-node-teal { background: #0d9488; border: 2px solid #2dd4bf; }
.gs-node-orange { background: #ea580c; border: 2px solid #fb923c; }
.gs-node-red { background: #dc2626; border: 2px solid #f87171; }

.gs-section {
  border: 1.5px dashed;
  border-radius: 10px;
  padding: 16px;
  position: relative;
}
.gs-section-label {
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

.gs-edge-down { animation: gs-flow-down 1s linear infinite; }
.gs-edge-up { animation: gs-flow-up 1s linear infinite; }
.gs-edge-right { animation: gs-flow-right 1.2s linear infinite; }
.gs-edge-left { animation: gs-flow-left 1.2s linear infinite; }
`;

function Node({ color, title, subtitle, pill, highlight, style = {} }: {
  color: string; title: string; subtitle?: string; pill?: boolean; highlight?: boolean; style?: React.CSSProperties;
}) {
  return (
    <div
      className={`gs-node gs-node-${color}${pill ? ' gs-node-pill' : ''}${highlight ? ' gs-node-highlight' : ''}`}
      style={style}
    >
      <div>{title}</div>
      {subtitle && <div className="gs-node-subtitle">{subtitle}</div>}
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

function ArrowDown({ color, label, dashed }: { color: string; label?: string; dashed?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <svg width="12" height="28">
        <line x1="6" y1="2" x2="6" y2="22" stroke={color} strokeWidth="1.5"
          strokeDasharray="4 3" className="gs-edge-down" />
        <path d="M2,20 L6,26 L10,20" fill="none" stroke={color} strokeWidth="1.5" />
      </svg>
      {label && <EdgeLabel text={label} color={color} />}
    </div>
  );
}

function ArrowRight({ color, label, width = 60, dashed }: { color: string; label?: string; width?: number; dashed?: boolean }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <svg width={width} height="16">
        <defs>
          <marker id={`gs-ar-${color.replace('#', '')}`} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
            <path d={`M0,0 L8,3 L0,6`} fill={color} />
          </marker>
        </defs>
        <line x1="4" y1="8" x2={width - 14} y2="8" stroke={color} strokeWidth="1.5"
          strokeDasharray={dashed ? "6 4" : "4 3"} className="gs-edge-right"
          markerEnd={`url(#gs-ar-${color.replace('#', '')})`} />
      </svg>
      {label && <EdgeLabel text={label} color={color} />}
    </div>
  );
}

function ArrowLeft({ color, label, width = 60 }: { color: string; label?: string; width?: number }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
      <svg width={width} height="16">
        <defs>
          <marker id={`gs-al-${color.replace('#', '')}`} markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
            <path d={`M8,0 L0,3 L8,6`} fill={color} />
          </marker>
        </defs>
        <line x1="14" y1="8" x2={width - 4} y2="8" stroke={color} strokeWidth="1.5"
          strokeDasharray="6 4" className="gs-edge-left"
          markerEnd={`url(#gs-al-${color.replace('#', '')})`} />
      </svg>
      {label && <EdgeLabel text={label} color={color} />}
    </div>
  );
}

export default function GameStateDiagram() {
  return (
    <>
      <style>{styles}</style>
      <div className="gs-diagram" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 780, maxWidth: 900, margin: '0 auto' }}>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: 0.5 }}>
              Game State Machine
            </h3>
            <p style={{ fontSize: 12, color: '#8b949e', margin: '6px 0 0' }}>
              Environment lifecycle &middot; live game &amp; replay playback paths
            </p>
          </div>

          {/* Main layout: 3 columns — error states | live game | replay */}
          <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr 220px', gap: 20, alignItems: 'start' }}>

            {/* LEFT: Error states column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 340 }}>
              {/* TIMEOUT */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <Node color="orange" title="TIMEOUT" subtitle="120 retries exhausted" style={{ flex: 1 }} />
              </div>

              <ArrowDown color="#ea580c" label="abort()" />

              {/* CONN LOST */}
              <Node color="orange" title="CONN LOST" subtitle="stream broke, abort" />

              <ArrowDown color="#ea580c" label="abort()" />

              {/* Both lead to cleanup — arrow pointing right */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end' }}>
                <EdgeLabel text="to CLEANUP" color="#ea580c" />
                <svg width="40" height="16">
                  <defs>
                    <marker id="gs-ar-err" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <path d="M0,0 L8,3 L0,6" fill="#ea580c" />
                    </marker>
                  </defs>
                  <line x1="4" y1="8" x2="30" y2="8" stroke="#ea580c" strokeWidth="1.5"
                    strokeDasharray="6 4" className="gs-edge-right" markerEnd="url(#gs-ar-err)" />
                </svg>
              </div>
            </div>

            {/* CENTER: Live Game flow */}
            <div className="gs-section" style={{ borderColor: '#4ade80', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div className="gs-section-label" style={{ color: '#4ade80' }}>Live Game Flow</div>

              {/* IDLE */}
              <Node color="purple" title="IDLE" subtitle="environment constructed, no game running" pill style={{ width: '80%' }} />
              <ArrowDown color="#a78bfa" label='call reset()' />

              {/* LAUNCHING */}
              <Node color="blue" title="LAUNCHING" subtitle="dotnet OpenRA.dll subprocess" style={{ width: '80%' }} />
              <ArrowDown color="#60a5fa" label="spawn process" />

              {/* LOADING */}
              <Node color="green" title="LOADING" subtitle="map, rules, traits, gRPC server" style={{ width: '80%' }} />
              <ArrowDown color="#4ade80" label="start gRPC server" />

              {/* CONNECTING */}
              <Node color="teal" title="CONNECTING" subtitle="BridgeClient retries GetState() RPC" style={{ width: '80%' }} />
              <ArrowDown color="#2dd4bf" label="establish session" />

              {/* STREAMING */}
              <Node color="teal" title="STREAMING" subtitle="GameSession RPC, bg obs reader" style={{ width: '80%' }} />
              <ArrowDown color="#2dd4bf" label="receive first obs" />

              {/* PLAYING — highlighted, with self-loop */}
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '80%' }}>
                <Node color="green" title="PLAYING" subtitle='step() loop, recording .orarep' highlight style={{ flex: 1 }} />
                {/* Self-loop on right */}
                <div style={{ flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: 4 }}>
                  <svg width="48" height="56" viewBox="0 0 48 56">
                    <defs>
                      <marker id="gs-ar-loop" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                        <path d="M0,0 L8,3 L0,6" fill="#4ade80" />
                      </marker>
                    </defs>
                    <path d="M4,20 Q44,20 44,28 Q44,36 4,36" fill="none" stroke="#4ade80" strokeWidth="1.5"
                      strokeDasharray="4 3" className="gs-edge-right" markerEnd="url(#gs-ar-loop)" />
                  </svg>
                  <EdgeLabel text="step()" color="#4ade80" />
                </div>
              </div>
              <ArrowDown color="#4ade80" label="detect game end" />

              {/* GAME OVER */}
              <Node color="green" title="GAME OVER" subtitle="done=True, result: win / lose / draw" style={{ width: '80%' }} />
              <ArrowDown color="#4ade80" label="close streams" />

              {/* CLEANUP */}
              <Node color="teal" title="CLEANUP" subtitle="close bridge, kill process" style={{ width: '80%' }} />

              {/* Loop-back indicator */}
              <div style={{
                display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6,
                marginTop: 4, padding: '6px 12px',
                border: '1.5px dashed #a78bfa', borderRadius: 6, width: '80%',
              }}>
                <svg width="20" height="16">
                  <path d="M16,12 Q4,12 4,8 Q4,4 16,4" fill="none" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="3 2" />
                  <path d="M13,1 L17,4 L13,7" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
                </svg>
                <EdgeLabel text="loop back to IDLE (next episode)" color="#a78bfa" />
              </div>
            </div>

            {/* RIGHT: Replay Playback */}
            <div className="gs-section" style={{ borderColor: '#2dd4bf', marginTop: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
              <div className="gs-section-label" style={{ color: '#2dd4bf' }}>Replay Playback</div>

              {/* Arrow from IDLE (implied) */}
              <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                <EdgeLabel text="from IDLE" color="#a78bfa" />
                <svg width="24" height="16">
                  <line x1="2" y1="8" x2="18" y2="8" stroke="#a78bfa" strokeWidth="1.5" strokeDasharray="4 3" />
                  <path d="M15,4 L21,8 L15,12" fill="none" stroke="#a78bfa" strokeWidth="1.5" />
                </svg>
              </div>

              <ArrowDown color="#2dd4bf" label='load .orarep' />

              {/* LOADING REPLAY */}
              <Node color="teal" title="LOADING REPLAY" subtitle="parse .orarep, extract metadata" style={{ width: '100%' }} />
              <ArrowDown color="#2dd4bf" label="start playback" />

              {/* REPLAYING — with self-loop */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <Node color="teal" title="REPLAYING" subtitle="ReplayConnection reads packets" style={{ width: '100%' }} />
                {/* Self-loop below */}
                <svg width="80" height="48" viewBox="0 0 80 48">
                  <defs>
                    <marker id="gs-ar-replay-loop" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                      <path d="M0,0 L8,3 L0,6" fill="#2dd4bf" />
                    </marker>
                  </defs>
                  <path d="M24,4 Q24,36 40,36 Q56,36 56,4" fill="none" stroke="#2dd4bf" strokeWidth="1.5"
                    strokeDasharray="4 3" className="gs-edge-right" markerEnd="url(#gs-ar-replay-loop)" />
                </svg>
                <EdgeLabel text="next frame" color="#2dd4bf" />
              </div>
              <ArrowDown color="#2dd4bf" label="consume all frames" />

              {/* REPLAY ENDED */}
              <Node color="teal" title="REPLAY ENDED" subtitle="all packets consumed" style={{ width: '100%' }} />
            </div>
          </div>

          {/* Legend */}
          <div style={{
            marginTop: 24, padding: '16px 20px',
            background: '#161b22', border: '1px solid #21262d', borderRadius: 8,
            display: 'flex', flexWrap: 'wrap', gap: 16, justifyContent: 'center',
          }}>
            <div style={{ fontSize: 11, fontWeight: 700, color: '#fff', marginRight: 8, alignSelf: 'center' }}>
              Legend
            </div>
            {[
              { color: '#a78bfa', label: 'Python-side state', dash: false },
              { color: '#4ade80', label: 'C# Game Engine state', dash: false },
              { color: '#fb923c', label: 'gRPC Bridge state', dash: false },
              { color: '#2dd4bf', label: 'Replay state', dash: false },
              { color: '#fb923c', label: 'Error path', dash: true },
              { color: '#a78bfa', label: 'Episode loop-back', dash: true },
            ].map(({ color, label, dash }) => (
              <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <svg width="28" height="8">
                  <line x1="0" y1="4" x2="28" y2="4" stroke={color} strokeWidth="2"
                    strokeDasharray={dash ? '6 4' : 'none'} />
                </svg>
                <span style={{ fontSize: 10, color: '#8b949e' }}>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
