import React from 'react';

const styles = `
@keyframes legacy-flow-right {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}
@keyframes legacy-flow-down {
  0% { stroke-dashoffset: 16; }
  100% { stroke-dashoffset: 0; }
}
.legacy-diagram {
  background: #0d1117;
  border: 1px dashed #1e3a5f;
  border-radius: 12px;
  padding: 32px 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #c9d1d9;
}
.legacy-diagram * { box-sizing: border-box; }
.legacy-node {
  border-radius: 8px;
  padding: 10px 14px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}
.legacy-node-sub {
  font-size: 10px;
  font-weight: 400;
  opacity: 0.75;
  margin-top: 2px;
}
.legacy-section {
  border: 1.5px dashed;
  border-radius: 10px;
  padding: 16px;
  position: relative;
}
.legacy-section-label {
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
.legacy-edge-right { animation: legacy-flow-right 1.2s linear infinite; }
.legacy-edge-down { animation: legacy-flow-down 1s linear infinite; }

/* Red X overlay for "problems" */
.legacy-problem {
  position: relative;
}
.legacy-problem::after {
  content: '';
  position: absolute;
  inset: -2px;
  border: 2px solid #ef4444;
  border-radius: 10px;
  pointer-events: none;
}
`;

export default function LegacyArchitectureDiagram() {
  const processColors = ['#7c3aed', '#2563eb', '#0d9488', '#ea580c'];
  const processBorders = ['#a78bfa', '#60a5fa', '#2dd4bf', '#fb923c'];

  return (
    <>
      <style>{styles}</style>
      <div className="legacy-diagram" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 780, maxWidth: 920, margin: '0 auto' }}>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: 0.5 }}>
              Legacy: One Process Per Session
            </h3>
            <p style={{ fontSize: 12, color: '#8b949e', margin: '6px 0 0' }}>
              Each environment spawns a separate .NET process with its own ModData, JIT, and gRPC server
            </p>
          </div>

          {/* Problems bar */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 28,
            padding: '10px 20px', background: '#1c1210', borderRadius: 8, border: '1px solid #7f1d1d',
          }}>
            {[
              { value: '5-15s', label: 'Reset latency', sub: 'kill + respawn + JIT' },
              { value: '~40 GB', label: 'RSS', sub: '64 processes' },
              { value: '64x', label: 'JIT overhead', sub: 'each process re-compiles' },
              { value: '~200', label: 'Threads', sub: '3 per process + OS' },
            ].map(({ value, label, sub }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 20, fontWeight: 700, color: '#ef4444' }}>{value}</div>
                <div style={{ fontSize: 10, color: '#fca5a5' }}>{label}</div>
                <div style={{ fontSize: 9, color: '#7f1d1d' }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Main layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', gap: 20 }}>

            {/* LEFT: Python */}
            <div className="legacy-section" style={{ borderColor: '#a78bfa', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="legacy-section-label" style={{ color: '#a78bfa' }}>Python (FastAPI)</div>

              <div className="legacy-node" style={{ background: '#7c3aed', border: '2px solid #a78bfa' }}>
                Training Loop
              </div>

              <div className="legacy-node" style={{ background: '#ca8a04', border: '2px solid #facc15', color: '#1a1a1a' }}>
                Port Pool
                <div className="legacy-node-sub" style={{ color: '#422006' }}>9901, 9902, ...9964</div>
              </div>

              <div className="legacy-node" style={{ background: '#dc2626', border: '2px solid #f87171' }}>
                Launch Semaphore
                <div className="legacy-node-sub">serialize JIT startup</div>
              </div>

              {/* Env stack */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 4 }}>
                {[1, 2, 3, 4].map(i => (
                  <div key={i} style={{
                    background: '#4c1d95', border: '1.5px solid #6d28d9',
                    borderRadius: 6, padding: '6px 4px', textAlign: 'center',
                    fontSize: 9, color: '#c4b5fd',
                  }}>
                    Env {i}
                    <div style={{ fontSize: 8, color: '#7c3aed' }}>port {9900 + i}</div>
                  </div>
                ))}
              </div>
              <div style={{ fontSize: 9, color: '#8b949e', textAlign: 'center' }}>...x64 environments</div>
            </div>

            {/* RIGHT: 64 .NET Processes */}
            <div className="legacy-section" style={{ borderColor: '#4ade80' }}>
              <div className="legacy-section-label" style={{ color: '#4ade80' }}>64 Separate .NET Processes</div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
                {[1, 2, 3, 4].map((id, idx) => (
                  <div key={id} className="legacy-section" style={{
                    borderColor: processBorders[idx], padding: 10,
                  }}>
                    <div className="legacy-section-label" style={{ color: processBorders[idx], fontSize: 9 }}>
                      Process {id}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 4, marginTop: 4 }}>
                      <div style={{
                        background: processColors[idx], border: `1.5px solid ${processBorders[idx]}`,
                        borderRadius: 5, padding: '4px 6px', fontSize: 9, color: '#fff',
                        textAlign: 'center', fontWeight: 600,
                      }}>
                        ModData + JIT
                        <div style={{ fontSize: 8, fontWeight: 400, opacity: 0.7 }}>~100-200 MB each</div>
                      </div>
                      <div style={{
                        background: '#16a34a', border: '1.5px solid #4ade80',
                        borderRadius: 5, padding: '4px 6px', fontSize: 9, color: '#fff',
                        textAlign: 'center',
                      }}>
                        OrderManager
                      </div>
                      <div style={{
                        background: '#0d9488', border: '1.5px solid #2dd4bf',
                        borderRadius: 5, padding: '4px 6px', fontSize: 9, color: '#fff',
                        textAlign: 'center',
                      }}>
                        World
                      </div>
                      <div style={{
                        background: '#2563eb', border: '1.5px solid #60a5fa',
                        borderRadius: 5, padding: '4px 6px', fontSize: 9, color: '#fff',
                        textAlign: 'center',
                      }}>
                        gRPC Server
                        <div style={{ fontSize: 8, fontWeight: 400, opacity: 0.7 }}>port {9900 + id}</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div style={{ textAlign: 'center', marginTop: 8, fontSize: 10, color: '#8b949e' }}>
                ...x64 identical processes, each with its own ModData, JIT, gRPC server
              </div>

              {/* Animated arrows between Python envs and processes */}
              <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 12 }}>
                {[0, 1, 2, 3].map(i => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <svg width="60" height="16">
                      <defs>
                        <marker id={`la-${i}`} markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                          <path d="M0,0 L8,3 L0,6" fill={processBorders[i]} />
                        </marker>
                      </defs>
                      <line x1="4" y1="8" x2="48" y2="8" stroke={processBorders[i]} strokeWidth="1.5"
                        markerEnd={`url(#la-${i})`} strokeDasharray="5 3" className="legacy-edge-right" />
                    </svg>
                    <span style={{ fontSize: 8, color: processBorders[i] }}>1:1</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Reset cycle */}
          <div style={{
            marginTop: 24, padding: '16px 20px',
            background: '#1c1210', border: '1px solid #7f1d1d', borderRadius: 8,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fca5a5', marginBottom: 12, letterSpacing: 0.5 }}>
              Episode Reset Cycle (5-15 seconds)
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 8, textAlign: 'center' }}>
              {[
                { step: '1', text: 'Kill .NET process', time: '~100ms', color: '#ef4444' },
                { step: '2', text: 'Spawn new process', time: '~500ms', color: '#f97316' },
                { step: '3', text: 'JIT compile all code', time: '2-5s', color: '#eab308' },
                { step: '4', text: 'Load mod data + map', time: '1-3s', color: '#f97316' },
                { step: '5', text: 'Start gRPC server', time: '~500ms', color: '#ef4444' },
              ].map(({ step, text, time, color }, i) => (
                <div key={step} style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{
                      width: 26, height: 26, borderRadius: '50%',
                      background: '#7f1d1d', border: `2px solid ${color}`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      fontSize: 13, fontWeight: 700, color: '#fca5a5', flexShrink: 0,
                    }}>
                      {step}
                    </div>
                    {i < 4 && (
                      <svg width="24" height="12" style={{ flexShrink: 0 }}>
                        <line x1="2" y1="6" x2="18" y2="6" stroke={color} strokeWidth="1.5"
                          strokeDasharray="4 3" className="legacy-edge-right" />
                        <path d="M15,2 L21,6 L15,10" fill="none" stroke={color} strokeWidth="1.5" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: 10, color: '#fca5a5', lineHeight: 1.3 }}>{text}</span>
                  <span style={{ fontSize: 9, color: '#ef4444', fontWeight: 700 }}>{time}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
