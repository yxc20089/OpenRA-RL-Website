import React from 'react';

const styles = `
@keyframes arch-flow-right {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}
@keyframes arch-flow-left {
  0% { stroke-dashoffset: -20; }
  100% { stroke-dashoffset: 0; }
}
@keyframes arch-flow-down {
  0% { stroke-dashoffset: 16; }
  100% { stroke-dashoffset: 0; }
}
@keyframes arch-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
.arch-diagram {
  background: #0d1117;
  border: 1px dashed #1e3a5f;
  border-radius: 12px;
  padding: 32px 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #c9d1d9;
}
.arch-diagram * { box-sizing: border-box; }

/* Node styles matching existing diagrams */
.node {
  border-radius: 8px;
  padding: 10px 14px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
  position: relative;
}
.node-subtitle {
  font-size: 10px;
  font-weight: 400;
  opacity: 0.75;
  margin-top: 2px;
}
.node-purple { background: #7c3aed; border: 2px solid #a78bfa; }
.node-blue { background: #2563eb; border: 2px solid #60a5fa; }
.node-green { background: #16a34a; border: 2px solid #4ade80; }
.node-teal { background: #0d9488; border: 2px solid #2dd4bf; }
.node-orange { background: #ea580c; border: 2px solid #fb923c; }
.node-yellow { background: #ca8a04; border: 2px solid #facc15; color: #1a1a1a; }
.node-red { background: #dc2626; border: 2px solid #f87171; }

/* Section outlines matching existing diagrams */
.section {
  border: 1.5px dashed;
  border-radius: 10px;
  padding: 16px;
  position: relative;
}
.section-label {
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

/* Animated edges */
.edge-right { animation: arch-flow-right 1.2s linear infinite; }
.edge-left { animation: arch-flow-left 1.2s linear infinite; }
.edge-down { animation: arch-flow-down 1s linear infinite; }
`;

function Node({ color, title, subtitle, className = '', style = {} }: {
  color: string; title: string; subtitle?: string; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div className={`node node-${color} ${className}`} style={style}>
      <div>{title}</div>
      {subtitle && <div className="node-subtitle">{subtitle}</div>}
    </div>
  );
}

function Section({ color, label, children, className = '', style = {} }: {
  color: string; label: string; children: React.ReactNode; className?: string; style?: React.CSSProperties;
}) {
  return (
    <div className={`section ${className}`} style={{ borderColor: color, ...style }}>
      <div className="section-label" style={{ color }}>{label}</div>
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

export default function ArchitectureDiagram() {
  return (
    <>
      <style>{styles}</style>
      <div className="arch-diagram" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 820, maxWidth: 960, margin: '0 auto' }}>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: 0.5 }}>
              Multi-Session Worker Pool Architecture
            </h3>
            <p style={{ fontSize: 12, color: '#8b949e', margin: '6px 0 0' }}>
              64 game sessions in a single .NET process &middot; shared JIT &amp; mod data
            </p>
          </div>

          {/* Metrics bar */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 28,
            padding: '10px 20px', background: '#161b22', borderRadius: 8, border: '1px solid #21262d',
          }}>
            {[
              { value: '256ms', label: 'Reset latency', sub: '(was 5-15s)' },
              { value: '15K', label: 'Ticks/sec', sub: 'aggregate' },
              { value: '~6 GB', label: 'RSS', sub: '64 sessions' },
              { value: '64/64', label: 'Sessions', sub: 'pass rate' },
            ].map(({ value, label, sub }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#58a6ff' }}>{value}</div>
                <div style={{ fontSize: 10, color: '#8b949e' }}>{label}</div>
                <div style={{ fontSize: 9, color: '#484f58' }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Main 3-column layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '240px 100px 1fr', gap: 0, alignItems: 'stretch' }}>

            {/* LEFT: Python */}
            <Section color="#a78bfa" label="Python Training" style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <Node color="purple" title="Training Loop" subtitle="PPO / GRPO agent" />

              {/* Stacked env cards */}
              <div style={{ position: 'relative', height: 56, margin: '4px 0' }}>
                {[2, 1, 0].map(i => (
                  <div key={i} style={{
                    position: 'absolute',
                    top: i * 4, left: i * 4, right: -i * 4,
                    height: 40, borderRadius: 6,
                    background: i === 0 ? '#7c3aed' : '#4c1d95',
                    border: `1.5px solid ${i === 0 ? '#a78bfa' : '#6d28d9'}`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 11, fontWeight: 600, color: '#fff',
                    zIndex: 3 - i,
                  }}>
                    {i === 0 && '64x Environment'}
                  </div>
                ))}
              </div>

              <Node color="yellow" title="Single gRPC Channel" subtitle="shared by all 64 envs" />
            </Section>

            {/* CENTER: gRPC boundary */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', position: 'relative', padding: '0 4px' }}>
              {/* Vertical dashed boundary */}
              <svg width="4" height="100%" style={{ position: 'absolute', top: 0, left: '50%', transform: 'translateX(-50%)' }}>
                <line x1="2" y1="0" x2="2" y2="100%" stroke="#1e3a5f" strokeWidth="2" strokeDasharray="8 6" />
              </svg>

              <div style={{ position: 'relative', zIndex: 1, display: 'flex', flexDirection: 'column', gap: 16, alignItems: 'center' }}>
                {/* Request arrow → */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg width="80" height="20">
                    <line x1="4" y1="10" x2="66" y2="10" stroke="#fb923c" strokeWidth="2"
                      strokeDasharray="6 4" className="edge-right" />
                    <path d="M63,5 L71,10 L63,15" fill="none" stroke="#fb923c" strokeWidth="2" />
                  </svg>
                  <EdgeLabel text="Request (invoke)" color="#fb923c" />
                </div>

                {/* Response arrow ← */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                  <svg width="80" height="20">
                    <line x1="14" y1="10" x2="76" y2="10" stroke="#2dd4bf" strokeWidth="2"
                      strokeDasharray="6 4" className="edge-left" />
                    <path d="M17,5 L9,10 L17,15" fill="none" stroke="#2dd4bf" strokeWidth="2" />
                  </svg>
                  <EdgeLabel text="Response (result)" color="#2dd4bf" />
                </div>

                {/* RPC box */}
                <div style={{
                  background: '#161b22', border: '1.5px solid #21262d', borderRadius: 6,
                  padding: '8px 10px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 9, color: '#8b949e', fontWeight: 700, letterSpacing: 1, textTransform: 'uppercase', marginBottom: 4 }}>
                    gRPC RPCs
                  </div>
                  <div style={{ fontSize: 9, color: '#58a6ff', lineHeight: 1.6 }}>
                    CreateSession<br />DestroySession<br />FastAdvance<br />GetState
                  </div>
                </div>

                {/* session_id label */}
                <div style={{
                  background: '#161b22', border: '1.5px solid #ea580c', borderRadius: 6,
                  padding: '4px 10px', textAlign: 'center',
                }}>
                  <div style={{ fontSize: 10, color: '#fb923c', fontWeight: 700 }}>session_id</div>
                  <div style={{ fontSize: 9, color: '#8b949e' }}>routing key</div>
                </div>
              </div>
            </div>

            {/* RIGHT: .NET Process */}
            <Section color="#4ade80" label="Single .NET Process" style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>

              <Node color="green" title="Shared ModData + JIT" subtitle="loaded once, reused by all sessions" />

              {/* Arrow down */}
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <svg width="12" height="24">
                  <line x1="6" y1="2" x2="6" y2="18" stroke="#4ade80" strokeWidth="1.5"
                    strokeDasharray="4 3" className="edge-down" />
                  <path d="M2,16 L6,22 L10,16" fill="none" stroke="#4ade80" strokeWidth="1.5" />
                </svg>
              </div>

              <Node color="blue" title="gRPC Server (Kestrel)" subtitle="routes by session_id to worker pool" />

              {/* Arrow down */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                <svg width="12" height="24">
                  <line x1="6" y1="2" x2="6" y2="18" stroke="#60a5fa" strokeWidth="1.5"
                    strokeDasharray="4 3" className="edge-down" />
                  <path d="M2,16 L6,22 L10,16" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                </svg>
                <EdgeLabel text="submit WorkItem" color="#60a5fa" />
              </div>

              {/* Worker Pool */}
              <Section color="#f87171" label="Worker Pool (N = CPU Cores)" style={{ padding: 12 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6, flexWrap: 'wrap' }}>
                  {[0, 0.3, 0.6, 0.9, 1.2, 1.5, 1.8, 2.1].map((d, i) => (
                    <div key={i} style={{
                      width: 22, height: 22, borderRadius: '50%',
                      background: '#dc2626', border: '2px solid #f87171',
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      animation: `arch-pulse 2s ease-in-out ${d}s infinite`,
                    }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fff' }} />
                    </div>
                  ))}
                  <span style={{ fontSize: 10, color: '#8b949e', marginLeft: 4 }}>...N threads</span>
                </div>
                <div style={{ fontSize: 10, color: '#f87171', marginTop: 8 }}>
                  BlockingCollection&lt;WorkItem&gt; &mdash; RESOURCE_EXHAUSTED if full
                </div>
              </Section>

              {/* Arrow down */}
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8 }}>
                <svg width="12" height="24">
                  <line x1="6" y1="2" x2="6" y2="18" stroke="#f87171" strokeWidth="1.5"
                    strokeDasharray="4 3" className="edge-down" />
                  <path d="M2,16 L6,22 L10,16" fill="none" stroke="#f87171" strokeWidth="1.5" />
                </svg>
                <EdgeLabel text="tick game forward" color="#f87171" />
              </div>

              {/* Session Registry */}
              <Section color="#facc15" label="Session Registry (ConcurrentDictionary)" style={{ padding: 12 }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 6 }}>
                  {[1, 2, 3, 4, 5, 6, 7, 8].map(id => (
                    <div key={id} style={{
                      background: id <= 2 ? '#854d0e' : '#1c1917',
                      border: `1.5px solid ${id <= 2 ? '#facc15' : '#44403c'}`,
                      borderRadius: 6, padding: '6px 4px',
                      fontSize: 9, color: id <= 2 ? '#fef08a' : '#78716c',
                      textAlign: 'center', lineHeight: 1.4,
                    }}>
                      <div style={{ fontWeight: 700, fontSize: 10, marginBottom: 2 }}>
                        Session {id}
                      </div>
                      <div>OrderManager</div>
                      <div>World</div>
                      <div>BotBridge</div>
                    </div>
                  ))}
                </div>
                <div style={{ fontSize: 10, color: '#a8a29e', textAlign: 'center', marginTop: 8 }}>
                  ...up to 64 sessions
                </div>
              </Section>
            </Section>
          </div>

          {/* Request Flow */}
          <div style={{
            marginTop: 24, padding: '20px 24px',
            background: '#161b22', border: '1px solid #21262d', borderRadius: 8,
          }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 16, letterSpacing: 0.5 }}>
              Request Flow
            </div>
            <div style={{ display: 'flex', alignItems: 'stretch', gap: 0 }}>
              {[
                { step: '1', title: 'FastAdvance', sub: 'gRPC call with session_id', color: '#a78bfa', bg: '#7c3aed', layer: 'Python client' },
                { step: '2', title: 'Route by session_id', sub: 'ConcurrentDictionary lookup', color: '#60a5fa', bg: '#2563eb', layer: 'Kestrel gRPC' },
                { step: '3', title: 'Submit WorkItem', sub: 'BlockingCollection.TryAdd', color: '#f87171', bg: '#dc2626', layer: 'Worker pool' },
                { step: '4', title: 'Tick game forward', sub: 'World.Tick() in loop until target', color: '#4ade80', bg: '#16a34a', layer: 'Worker thread' },
                { step: '5', title: 'Return observation', sub: 'TCS completes, obs serialized', color: '#2dd4bf', bg: '#0d9488', layer: 'gRPC response' },
              ].map(({ step, title, sub, color, bg, layer }, i) => (
                <React.Fragment key={step}>
                  <div style={{
                    flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center',
                  }}>
                    {/* Step number */}
                    <div style={{
                      width: 30, height: 30, borderRadius: '50%',
                      background: bg, border: `2px solid ${color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8,
                    }}>
                      {step}
                    </div>
                    {/* Card */}
                    <div style={{
                      background: `${bg}22`, border: `1.5px solid ${color}50`,
                      borderRadius: 8, padding: '10px 8px', width: '100%',
                    }}>
                      <div style={{ fontSize: 12, fontWeight: 700, color, lineHeight: 1.3 }}>{title}</div>
                      <div style={{ fontSize: 10, color: '#8b949e', marginTop: 4, lineHeight: 1.3 }}>{sub}</div>
                    </div>
                    {/* Layer tag */}
                    <div style={{
                      fontSize: 9, color: '#484f58', marginTop: 6,
                      border: '1px solid #21262d', borderRadius: 4, padding: '2px 6px',
                    }}>
                      {layer}
                    </div>
                  </div>
                  {/* Arrow between steps */}
                  {i < 4 && (
                    <div style={{ display: 'flex', alignItems: 'center', padding: '0 2px', paddingBottom: 30 }}>
                      <svg width="36" height="16">
                        <defs>
                          <marker id={`rf-${i}`} markerWidth="6" markerHeight="5" refX="6" refY="2.5" orient="auto">
                            <path d="M0,0 L6,2.5 L0,5" fill={color} />
                          </marker>
                        </defs>
                        <line x1="2" y1="8" x2="28" y2="8" stroke={color} strokeWidth="2"
                          markerEnd={`url(#rf-${i})`} strokeDasharray="5 3" className="edge-right" />
                      </svg>
                    </div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
