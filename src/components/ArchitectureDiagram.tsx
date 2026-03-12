import React from 'react';

const pulseKeyframes = `
@keyframes arch-pulse {
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
}
@keyframes arch-flow {
  0% { stroke-dashoffset: 20; }
  100% { stroke-dashoffset: 0; }
}
@keyframes arch-fadein {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
`;

function MetricBadge({ value, label }: { value: string; label: string }) {
  return (
    <div className="flex flex-col items-center px-4 py-2">
      <span className="font-teko text-2xl sm:text-3xl text-red-500 leading-none">{value}</span>
      <span className="text-[10px] sm:text-xs text-gray-500 mt-1 text-center">{label}</span>
    </div>
  );
}

function StackedCards({ count, label }: { count: number; label: string }) {
  return (
    <div className="relative h-14 w-full mb-1">
      {[2, 1, 0].map((i) => (
        <div
          key={i}
          className="absolute rounded border border-gray-700 bg-gray-800/80 text-[10px] text-gray-400 flex items-center justify-center"
          style={{
            top: i * 3,
            left: i * 3,
            right: -i * 3 + 0,
            height: 36,
            zIndex: 3 - i,
          }}
        >
          {i === 0 && <span>{count}x {label}</span>}
        </div>
      ))}
    </div>
  );
}

function SessionBox({ id }: { id: number }) {
  return (
    <div className="border border-gray-700 rounded bg-gray-900/60 p-1.5 text-[9px] leading-tight text-gray-500 space-y-0.5">
      <div className="text-gray-400 font-semibold">Session {id}</div>
      <div>OrderManager</div>
      <div>World</div>
      <div>ExternalBotBridge</div>
    </div>
  );
}

function WorkerDot({ delay }: { delay: number }) {
  return (
    <div
      className="w-5 h-5 rounded-full bg-red-600/30 border border-red-600/60 flex items-center justify-center"
      style={{ animation: `arch-pulse 2s ease-in-out ${delay}s infinite` }}
    >
      <div className="w-2 h-2 rounded-full bg-red-500" />
    </div>
  );
}

function ArrowSvg() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 60 200" preserveAspectRatio="none" className="absolute inset-0">
      {/* Downward flow lines */}
      <line x1="30" y1="0" x2="30" y2="200"
        stroke="#DC2626" strokeWidth="1.5" strokeDasharray="6 4" opacity="0.4"
        style={{ animation: 'arch-flow 1s linear infinite' }} />
    </svg>
  );
}

export default function ArchitectureDiagram() {
  return (
    <>
      <style>{pulseKeyframes}</style>
      <div className="w-full overflow-x-auto py-6">
        <div className="min-w-[800px] max-w-5xl mx-auto" style={{ animation: 'arch-fadein 0.6s ease-out' }}>

          {/* Title */}
          <h3 className="font-teko text-3xl sm:text-4xl text-white text-center mb-2 tracking-wide uppercase">
            Multi-Session Worker Pool Architecture
          </h3>
          <p className="text-center text-gray-500 text-sm mb-8">
            64 game sessions in a single .NET process with shared JIT and mod data
          </p>

          {/* Key Metrics Bar */}
          <div className="flex justify-center gap-2 sm:gap-6 mb-8 flex-wrap">
            <div className="flex items-center gap-2 sm:gap-6 border border-gray-800 rounded-lg bg-black/40 px-2 py-1 divide-x divide-gray-800">
              <MetricBadge value="256ms" label="Reset time (was 5-15s)" />
              <MetricBadge value="15K" label="Ticks/sec aggregate" />
              <MetricBadge value="~5-7 GB" label="RSS for 64 sessions" />
            </div>
          </div>

          {/* Main diagram */}
          <div className="grid grid-cols-[1fr_auto_2fr] gap-0 items-stretch">

            {/* LEFT: Python Training */}
            <div className="border border-red-900/50 rounded-lg bg-gradient-to-b from-gray-900/80 to-black/60 p-4 flex flex-col">
              <div className="font-teko text-xl text-red-500 mb-1 uppercase tracking-wide">Python</div>
              <div className="text-xs text-gray-400 mb-4 font-semibold">Training Loop</div>

              <StackedCards count={64} label="Environment instances" />

              <div className="mt-auto pt-4 border-t border-gray-800">
                <div className="border border-yellow-700/40 rounded bg-yellow-900/10 px-3 py-2 text-center">
                  <div className="text-[10px] text-yellow-600/80 uppercase tracking-wider font-semibold">Single gRPC Channel</div>
                  <div className="text-[9px] text-gray-500 mt-0.5">Shared by all 64 envs</div>
                </div>
              </div>
            </div>

            {/* CENTER: gRPC boundary */}
            <div className="flex flex-col items-center justify-center px-3 sm:px-5 relative">
              {/* Vertical dashed line */}
              <svg width="4" height="100%" className="absolute inset-y-0 left-1/2 -translate-x-1/2 opacity-20">
                <line x1="2" y1="0" x2="2" y2="100%" stroke="#DC2626" strokeWidth="2" strokeDasharray="8 6" />
              </svg>

              <div className="relative z-10 space-y-3">
                {/* Arrow block 1 */}
                <div className="flex flex-col items-center">
                  <svg width="80" height="24" className="mb-1">
                    <defs>
                      <marker id="ah-r" markerWidth="8" markerHeight="6" refX="8" refY="3" orient="auto">
                        <path d="M0,0 L8,3 L0,6" fill="#DC2626" opacity="0.7" />
                      </marker>
                    </defs>
                    <line x1="4" y1="12" x2="68" y2="12" stroke="#DC2626" strokeWidth="1.5" markerEnd="url(#ah-r)"
                      strokeDasharray="5 3" style={{ animation: 'arch-flow 1.2s linear infinite' }} />
                  </svg>
                  <span className="text-[9px] text-red-400/70 leading-tight text-center whitespace-nowrap">FastAdvance</span>
                </div>

                {/* Arrow block 2 */}
                <div className="flex flex-col items-center">
                  <svg width="80" height="24" className="mb-1">
                    <defs>
                      <marker id="ah-l" markerWidth="8" markerHeight="6" refX="0" refY="3" orient="auto">
                        <path d="M8,0 L0,3 L8,6" fill="#DC2626" opacity="0.7" />
                      </marker>
                    </defs>
                    <line x1="12" y1="12" x2="76" y2="12" stroke="#DC2626" strokeWidth="1.5" markerEnd="url(#ah-l)"
                      strokeDasharray="5 3" style={{ animation: 'arch-flow 1.2s linear infinite', animationDirection: 'reverse' }} />
                  </svg>
                  <span className="text-[9px] text-red-400/70 leading-tight text-center whitespace-nowrap">Observation</span>
                </div>

                {/* RPC labels */}
                <div className="bg-black/80 border border-gray-800 rounded px-2 py-2 text-center space-y-0.5">
                  <div className="text-[9px] text-gray-500 uppercase tracking-wider font-semibold">gRPC RPCs</div>
                  <div className="text-[8px] text-gray-600 leading-relaxed">
                    CreateSession<br />
                    DestroySession<br />
                    FastAdvance
                  </div>
                </div>

                <div className="bg-black/80 border border-red-900/30 rounded px-2 py-1.5 text-center">
                  <div className="text-[9px] text-red-500/70 font-semibold">session_id</div>
                  <div className="text-[8px] text-gray-600">routing key</div>
                </div>
              </div>
            </div>

            {/* RIGHT: .NET Process */}
            <div className="border border-red-900/50 rounded-lg bg-gradient-to-b from-gray-900/80 to-black/60 p-4 flex flex-col space-y-3">
              <div>
                <div className="font-teko text-xl text-red-500 uppercase tracking-wide">Single .NET Process</div>
                <div className="text-xs text-gray-400 font-semibold">C# / ASP.NET Core</div>
              </div>

              {/* Shared ModData */}
              <div className="border border-green-800/40 rounded bg-green-900/10 px-3 py-2">
                <div className="text-[10px] text-green-500/80 font-semibold uppercase tracking-wider">
                  Shared ModData + JIT
                </div>
                <div className="text-[9px] text-gray-500">Loaded once, reused by all sessions</div>
              </div>

              {/* Kestrel */}
              <div className="border border-blue-800/40 rounded bg-blue-900/10 px-3 py-2">
                <div className="text-[10px] text-blue-400/80 font-semibold uppercase tracking-wider">
                  gRPC Server (Kestrel)
                </div>
                <div className="text-[9px] text-gray-500">Receives FastAdvance(session_id), routes to pool</div>
              </div>

              {/* Worker Pool */}
              <div className="border border-red-900/30 rounded bg-black/30 px-3 py-3">
                <div className="text-[10px] text-red-400/80 font-semibold uppercase tracking-wider mb-2">
                  Worker Pool (N = CPU cores)
                </div>
                <div className="flex items-center gap-2 mb-2">
                  {[0, 0.3, 0.6, 0.9, 1.2, 1.5].map((d, i) => (
                    <WorkerDot key={i} delay={d} />
                  ))}
                  <span className="text-[9px] text-gray-600 ml-1">...N threads</span>
                </div>
                <div className="text-[9px] text-gray-600">
                  BlockingCollection&lt;WorkItem&gt; queue
                </div>
              </div>

              {/* Session Registry */}
              <div className="border border-gray-700/50 rounded bg-black/30 px-3 py-3">
                <div className="text-[10px] text-gray-400 font-semibold uppercase tracking-wider mb-2">
                  Session Registry
                </div>
                <div className="grid grid-cols-3 sm:grid-cols-4 gap-1.5">
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((id) => (
                    <SessionBox key={id} id={id} />
                  ))}
                </div>
                <div className="text-[9px] text-gray-600 mt-2 text-center">...up to 64 sessions</div>
              </div>
            </div>
          </div>

          {/* Flow description */}
          <div className="mt-8 border border-gray-800 rounded-lg bg-black/40 p-5">
            <div className="font-teko text-lg text-white uppercase tracking-wide mb-3">Request Flow</div>
            <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 text-center">
              {[
                { step: '1', text: 'FastAdvance(session_id) sent via gRPC' },
                { step: '2', text: 'Server looks up session in registry' },
                { step: '3', text: 'Submits WorkItem to pool queue' },
                { step: '4', text: 'Worker thread ticks game forward' },
                { step: '5', text: 'Returns observation to caller' },
              ].map(({ step, text }, i) => (
                <div key={step} className="flex flex-col items-center">
                  <div className="flex items-center gap-2 sm:flex-col sm:gap-1">
                    <div className="w-7 h-7 rounded-full border border-red-600/60 bg-red-900/20 flex items-center justify-center text-sm text-red-400 font-bold flex-shrink-0">
                      {step}
                    </div>
                    <span className="text-[11px] text-gray-400 leading-tight">{text}</span>
                  </div>
                  {i < 4 && (
                    <svg width="24" height="16" className="hidden sm:block mt-1 rotate-[-90deg] sm:rotate-0">
                      <path d="M4,8 L18,8" stroke="#DC2626" strokeWidth="1" opacity="0.4" />
                      <path d="M14,4 L20,8 L14,12" fill="none" stroke="#DC2626" strokeWidth="1" opacity="0.4" />
                    </svg>
                  )}
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
