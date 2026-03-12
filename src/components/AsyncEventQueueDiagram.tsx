import React from 'react';

const styles = `
@keyframes aeq-flow-right {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}
@keyframes aeq-flow-left {
  0% { stroke-dashoffset: -20; }
  100% { stroke-dashoffset: 0; }
}
@keyframes aeq-flow-down {
  0% { stroke-dashoffset: 16; }
  100% { stroke-dashoffset: 0; }
}
@keyframes aeq-pulse {
  0%, 100% { opacity: 0.5; }
  50% { opacity: 1; }
}
@keyframes aeq-drop {
  0% { opacity: 1; transform: translateY(0); }
  100% { opacity: 0; transform: translateY(8px); }
}
.aeq-diagram {
  background: #0d1117;
  border: 1px dashed #1e3a5f;
  border-radius: 12px;
  padding: 32px 24px;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #c9d1d9;
}
.aeq-diagram * { box-sizing: border-box; }

.aeq-node {
  border-radius: 8px;
  padding: 10px 14px;
  text-align: center;
  font-size: 12px;
  font-weight: 600;
  color: #fff;
}
.aeq-node-sub {
  font-size: 10px;
  font-weight: 400;
  opacity: 0.75;
  margin-top: 2px;
}
.aeq-node-purple { background: #7c3aed; border: 2px solid #a78bfa; }
.aeq-node-blue { background: #2563eb; border: 2px solid #60a5fa; }
.aeq-node-green { background: #16a34a; border: 2px solid #4ade80; }
.aeq-node-teal { background: #0d9488; border: 2px solid #2dd4bf; }
.aeq-node-orange { background: #ea580c; border: 2px solid #fb923c; }
.aeq-node-yellow { background: #ca8a04; border: 2px solid #facc15; color: #1a1a1a; }
.aeq-node-red { background: #dc2626; border: 2px solid #f87171; }

.aeq-section {
  border: 1.5px dashed;
  border-radius: 10px;
  padding: 16px;
  position: relative;
}
.aeq-section-label {
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

.aeq-edge-right { animation: aeq-flow-right 1.2s linear infinite; }
.aeq-edge-left { animation: aeq-flow-left 1.2s linear infinite; }
.aeq-edge-down { animation: aeq-flow-down 1s linear infinite; }

.aeq-channel {
  border-radius: 8px;
  padding: 12px;
  text-align: center;
  position: relative;
  overflow: hidden;
}
.aeq-channel-slot {
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 10px;
  font-weight: 600;
  text-align: center;
  min-width: 40px;
}
.aeq-dropped {
  animation: aeq-drop 1.5s ease-out infinite;
}
`;

function EdgeLabel({ text, color = '#8b949e' }: { text: string; color?: string }) {
  return (
    <span style={{ fontSize: 9, fontWeight: 600, color, fontStyle: 'italic', whiteSpace: 'nowrap' }}>
      {text}
    </span>
  );
}

export default function AsyncEventQueueDiagram() {
  return (
    <>
      <style>{styles}</style>
      <div className="aeq-diagram" style={{ overflowX: 'auto' }}>
        <div style={{ minWidth: 820, maxWidth: 960, margin: '0 auto' }}>

          {/* Title */}
          <div style={{ textAlign: 'center', marginBottom: 24 }}>
            <h3 style={{ fontSize: 22, fontWeight: 700, color: '#fff', margin: 0, letterSpacing: 0.5 }}>
              Async Event Queue Design
            </h3>
            <p style={{ fontSize: 12, color: '#8b949e', margin: '6px 0 0' }}>
              Non-blocking channels decouple game ticks from agent I/O &middot; DropOldest ensures freshness
            </p>
          </div>

          {/* Design principles */}
          <div style={{
            display: 'flex', justifyContent: 'center', gap: 32, marginBottom: 28,
            padding: '10px 20px', background: '#161b22', borderRadius: 8, border: '1px solid #21262d',
          }}>
            {[
              { value: 'Never block', label: 'Game thread', sub: 'ticks independently' },
              { value: 'DropOldest', label: 'Channel policy', sub: 'stale data discarded' },
              { value: '~25 tps', label: 'Tick rate', sub: 'game produces fast' },
              { value: 'Bounded', label: 'Memory', sub: 'fixed-size channels' },
            ].map(({ value, label, sub }) => (
              <div key={label} style={{ textAlign: 'center' }}>
                <div style={{ fontSize: 18, fontWeight: 700, color: '#58a6ff' }}>{value}</div>
                <div style={{ fontSize: 10, color: '#8b949e' }}>{label}</div>
                <div style={{ fontSize: 9, color: '#484f58' }}>{sub}</div>
              </div>
            ))}
          </div>

          {/* Main 3-column layout: Game Thread | Channels | gRPC / Agent */}
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr 220px', gap: 16, alignItems: 'stretch' }}>

            {/* LEFT: Game Thread */}
            <div className="aeq-section" style={{ borderColor: '#4ade80', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="aeq-section-label" style={{ color: '#4ade80' }}>Game Thread</div>

              <div className="aeq-node aeq-node-green">
                World.Tick()
                <div className="aeq-node-sub">~25 ticks/sec</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <svg width="12" height="24">
                  <line x1="6" y1="2" x2="6" y2="18" stroke="#4ade80" strokeWidth="1.5"
                    strokeDasharray="4 3" className="aeq-edge-down" />
                  <path d="M2,16 L6,22 L10,16" fill="none" stroke="#4ade80" strokeWidth="1.5" />
                </svg>
              </div>

              <div className="aeq-node aeq-node-teal">
                ObservationSerializer
                <div className="aeq-node-sub">World state → Protobuf</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                <svg width="12" height="24">
                  <line x1="6" y1="2" x2="6" y2="18" stroke="#2dd4bf" strokeWidth="1.5"
                    strokeDasharray="4 3" className="aeq-edge-down" />
                  <path d="M2,16 L6,22 L10,16" fill="none" stroke="#2dd4bf" strokeWidth="1.5" />
                </svg>
                <EdgeLabel text="write obs" color="#2dd4bf" />
              </div>

              <div className="aeq-node aeq-node-orange">
                ActionHandler
                <div className="aeq-node-sub">Protobuf → OpenRA Orders</div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6 }}>
                <svg width="12" height="24" style={{ transform: 'rotate(180deg)' }}>
                  <line x1="6" y1="2" x2="6" y2="18" stroke="#fb923c" strokeWidth="1.5"
                    strokeDasharray="4 3" className="aeq-edge-down" />
                  <path d="M2,16 L6,22 L10,16" fill="none" stroke="#fb923c" strokeWidth="1.5" />
                </svg>
                <EdgeLabel text="drain actions" color="#fb923c" />
              </div>

              <div style={{
                padding: '8px 10px', background: '#161b22', borderRadius: 6,
                border: '1px solid #21262d', fontSize: 10, color: '#8b949e', textAlign: 'center',
              }}>
                <div style={{ color: '#4ade80', fontWeight: 700, marginBottom: 4 }}>Each tick:</div>
                1. Serialize observation<br />
                2. Write to obs channel<br />
                3. Read all pending actions<br />
                4. Execute as Orders
              </div>
            </div>

            {/* CENTER: Channels */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20, justifyContent: 'center' }}>

              {/* Observation Channel */}
              <div className="aeq-section" style={{ borderColor: '#2dd4bf', padding: '16px 12px' }}>
                <div className="aeq-section-label" style={{ color: '#2dd4bf' }}>Observation Channel</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {/* Write side */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <EdgeLabel text="game writes" color="#4ade80" />
                    <svg width="40" height="16">
                      <line x1="2" y1="8" x2="30" y2="8" stroke="#4ade80" strokeWidth="1.5"
                        strokeDasharray="5 3" className="aeq-edge-right" />
                      <path d="M27,4 L35,8 L27,12" fill="none" stroke="#4ade80" strokeWidth="1.5" />
                    </svg>
                  </div>

                  {/* Channel visualization */}
                  <div className="aeq-channel" style={{
                    flex: 1, background: '#0d2818', border: '2px solid #2dd4bf',
                    display: 'flex', flexDirection: 'column', gap: 6,
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#2dd4bf' }}>
                      BoundedChannel&lt;GameObservation&gt;
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 6, alignItems: 'center' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <div className="aeq-channel-slot" style={{
                          background: '#0d9488', border: '1.5px solid #2dd4bf', color: '#fff',
                          animation: 'aeq-pulse 2s ease-in-out infinite',
                        }}>
                          obs(t)
                        </div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#facc15' }}>capacity = 1</div>
                      <div style={{ width: 1, background: '#21262d' }} />
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#ef4444' }}>DropOldest</div>
                    </div>
                    {/* Drop visualization */}
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 6, minHeight: 20 }}>
                      <div className="aeq-dropped" style={{
                        fontSize: 9, color: '#ef4444', opacity: 0.6,
                        padding: '2px 6px', border: '1px dashed #ef4444', borderRadius: 4,
                      }}>
                        obs(t-1) dropped
                      </div>
                    </div>
                  </div>

                  {/* Read side */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <EdgeLabel text="gRPC reads" color="#60a5fa" />
                    <svg width="40" height="16">
                      <line x1="2" y1="8" x2="30" y2="8" stroke="#60a5fa" strokeWidth="1.5"
                        strokeDasharray="5 3" className="aeq-edge-right" />
                      <path d="M27,4 L35,8 L27,12" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Action Channel */}
              <div className="aeq-section" style={{ borderColor: '#fb923c', padding: '16px 12px' }}>
                <div className="aeq-section-label" style={{ color: '#fb923c' }}>Action Channel</div>

                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  {/* Write side (from gRPC) */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <EdgeLabel text="game drains" color="#4ade80" />
                    <svg width="40" height="16">
                      <line x1="10" y1="8" x2="38" y2="8" stroke="#4ade80" strokeWidth="1.5"
                        strokeDasharray="5 3" className="aeq-edge-left" />
                      <path d="M13,4 L5,8 L13,12" fill="none" stroke="#4ade80" strokeWidth="1.5" />
                    </svg>
                  </div>

                  {/* Channel visualization */}
                  <div className="aeq-channel" style={{
                    flex: 1, background: '#1c1007', border: '2px solid #fb923c',
                    display: 'flex', flexDirection: 'column', gap: 6,
                  }}>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#fb923c' }}>
                      BoundedChannel&lt;AgentAction&gt;
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 4, alignItems: 'center' }}>
                      {['cmd₁', 'cmd₂', '...'].map((label, i) => (
                        <div key={i} className="aeq-channel-slot" style={{
                          background: i < 2 ? '#ea580c' : 'transparent',
                          border: `1.5px solid ${i < 2 ? '#fb923c' : '#44403c'}`,
                          color: i < 2 ? '#fff' : '#44403c',
                        }}>
                          {label}
                        </div>
                      ))}
                      {[...Array(3)].map((_, i) => (
                        <div key={`empty-${i}`} className="aeq-channel-slot" style={{
                          background: 'transparent',
                          border: '1.5px dashed #44403c',
                          color: '#44403c',
                        }}>
                          &nbsp;
                        </div>
                      ))}
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#facc15' }}>capacity = 16</div>
                      <div style={{ width: 1, background: '#21262d' }} />
                      <div style={{ fontSize: 10, fontWeight: 700, color: '#ef4444' }}>DropOldest</div>
                    </div>
                  </div>

                  {/* Read side (from gRPC) */}
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <EdgeLabel text="gRPC writes" color="#60a5fa" />
                    <svg width="40" height="16">
                      <line x1="10" y1="8" x2="38" y2="8" stroke="#60a5fa" strokeWidth="1.5"
                        strokeDasharray="5 3" className="aeq-edge-left" />
                      <path d="M13,4 L5,8 L13,12" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Why DropOldest */}
              <div style={{
                padding: '10px 14px', background: '#161b22', borderRadius: 8,
                border: '1px solid #21262d', fontSize: 10, lineHeight: 1.6,
              }}>
                <div style={{ fontWeight: 700, color: '#facc15', marginBottom: 4, fontSize: 11 }}>
                  Why DropOldest?
                </div>
                <div style={{ color: '#8b949e' }}>
                  The game ticks at ~25/sec independently. A slow agent (LLM thinking for 2s)
                  would miss ~50 ticks. With DropOldest, the agent always sees the <span style={{ color: '#2dd4bf', fontWeight: 600 }}>latest state</span>,
                  not a queue of stale observations. The game <span style={{ color: '#4ade80', fontWeight: 600 }}>never blocks</span> waiting
                  for a slow reader.
                </div>
              </div>
            </div>

            {/* RIGHT: gRPC / Agent */}
            <div className="aeq-section" style={{ borderColor: '#60a5fa', display: 'flex', flexDirection: 'column', gap: 10 }}>
              <div className="aeq-section-label" style={{ color: '#60a5fa' }}>gRPC Stream</div>

              <div className="aeq-node aeq-node-blue">
                RLBridgeService
                <div className="aeq-node-sub">bidirectional stream</div>
              </div>

              <div style={{
                padding: '8px 10px', background: '#161b22', borderRadius: 6,
                border: '1px solid #21262d', fontSize: 10, color: '#8b949e',
              }}>
                <div style={{ color: '#60a5fa', fontWeight: 700, marginBottom: 4 }}>Two async tasks:</div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#2dd4bf', flexShrink: 0 }} />
                    <span><span style={{ color: '#2dd4bf' }}>ObsSender</span> — reads channel, sends to agent</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                    <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#fb923c', flexShrink: 0 }} />
                    <span><span style={{ color: '#fb923c' }}>ActionReceiver</span> — reads agent, writes channel</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <svg width="12" height="24">
                  <line x1="6" y1="2" x2="6" y2="18" stroke="#60a5fa" strokeWidth="1.5"
                    strokeDasharray="4 3" className="aeq-edge-down" />
                  <path d="M2,16 L6,22 L10,16" fill="none" stroke="#60a5fa" strokeWidth="1.5" />
                </svg>
              </div>

              <div className="aeq-node aeq-node-purple">
                Agent (Python)
                <div className="aeq-node-sub">LLM / RL policy</div>
              </div>

              <div style={{
                padding: '8px 10px', background: '#161b22', borderRadius: 6,
                border: '1px solid #21262d', fontSize: 10, color: '#8b949e', textAlign: 'center',
              }}>
                <div style={{ color: '#a78bfa', fontWeight: 700, marginBottom: 4 }}>Agent perspective:</div>
                Sees latest state on every read<br />
                <span style={{ color: '#ef4444' }}>Missed ticks are invisible</span><br />
                No backpressure on agent
              </div>
            </div>
          </div>

          {/* Timing comparison */}
          <div style={{
            marginTop: 24, padding: '16px 20px',
            background: '#161b22', border: '1px solid #21262d', borderRadius: 8,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', marginBottom: 12, letterSpacing: 0.5 }}>
              Timing: Fast Agent vs Slow Agent
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              {/* Fast agent */}
              <div style={{
                padding: '12px', background: '#0d2818', borderRadius: 8, border: '1px solid #16a34a',
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#4ade80', marginBottom: 8 }}>
                  Fast Agent (~40ms/step)
                </div>
                <div style={{ fontSize: 10, color: '#8b949e', lineHeight: 1.8 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#4ade80', fontFamily: 'monospace', fontWeight: 600, minWidth: 60 }}>tick 100</span>
                    <span style={{ background: '#0d9488', padding: '1px 6px', borderRadius: 3, color: '#fff', fontSize: 9 }}>obs</span>
                    → agent reads immediately
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#4ade80', fontFamily: 'monospace', fontWeight: 600, minWidth: 60 }}>tick 101</span>
                    <span style={{ background: '#0d9488', padding: '1px 6px', borderRadius: 3, color: '#fff', fontSize: 9 }}>obs</span>
                    → agent reads immediately
                  </div>
                  <div style={{ fontSize: 9, color: '#4ade80', marginTop: 4 }}>
                    No observations dropped — agent keeps up with game
                  </div>
                </div>
              </div>

              {/* Slow agent */}
              <div style={{
                padding: '12px', background: '#1c1007', borderRadius: 8, border: '1px solid #ca8a04',
              }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: '#facc15', marginBottom: 8 }}>
                  Slow Agent (~2s/step, e.g. LLM)
                </div>
                <div style={{ fontSize: 10, color: '#8b949e', lineHeight: 1.8 }}>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#facc15', fontFamily: 'monospace', fontWeight: 600, minWidth: 60 }}>tick 100</span>
                    <span style={{ background: '#0d9488', padding: '1px 6px', borderRadius: 3, color: '#fff', fontSize: 9 }}>obs</span>
                    → agent busy thinking...
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#ef4444', fontFamily: 'monospace', fontWeight: 600, minWidth: 60, textDecoration: 'line-through' }}>tick 101-149</span>
                    <span style={{ color: '#ef4444', fontSize: 9 }}>dropped (DropOldest)</span>
                  </div>
                  <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                    <span style={{ color: '#facc15', fontFamily: 'monospace', fontWeight: 600, minWidth: 60 }}>tick 150</span>
                    <span style={{ background: '#0d9488', padding: '1px 6px', borderRadius: 3, color: '#fff', fontSize: 9 }}>obs</span>
                    → agent reads latest
                  </div>
                  <div style={{ fontSize: 9, color: '#facc15', marginTop: 4 }}>
                    Agent skips to current state — no stale queue buildup
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
