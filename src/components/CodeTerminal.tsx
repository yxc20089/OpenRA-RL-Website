import React from 'react';
import Link from '@docusaurus/Link';
import {Book, Code} from 'lucide-react';

export default function CodeTerminal() {
  return (
    <section className="py-24 bg-[#050505] border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-teko text-5xl text-white mb-6">ZERO TO PLAYING IN SECONDS</h2>
          <p className="text-lg text-gray-400 mb-6 leading-relaxed">
            Install from PyPI, run one command, and watch your AI play Red Alert.
            The CLI handles Docker, configuration, and the game server automatically.
          </p>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Works with <strong>cloud models</strong> (Claude, GPT, Qwen via OpenRouter) or{' '}
            <strong>local models</strong> (Ollama, LM Studio) — no API key needed for local.
            Also available as an <strong>MCP server</strong> for OpenClaw and Claude Desktop.
          </p>
          <Link
            to="/docs/getting-started"
            className="btn-soviet font-teko text-2xl px-6 py-2 flex items-center gap-2 text-white no-underline hover:no-underline hover:text-white inline-flex"
          >
            <Book className="w-5 h-5" /> GET STARTED
          </Link>
        </div>

        {/* Mock Terminal */}
        <div className="rounded-lg overflow-hidden border border-gray-700 shadow-[0_0_30px_rgba(0,0,0,1)]">
          <div className="bg-[#1a1a1a] px-4 py-2 border-b border-gray-700 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-red-500" />
            <div className="w-3 h-3 rounded-full bg-yellow-500" />
            <div className="w-3 h-3 rounded-full bg-green-500" />
            <span className="ml-2 text-xs text-gray-400 font-mono flex items-center gap-2">
              <Code className="w-3 h-3" /> terminal
            </span>
          </div>
          <div className="bg-[#0d0d0d] p-6 overflow-x-auto text-sm">
            <pre className="font-mono text-gray-300 leading-relaxed m-0 p-0 bg-transparent border-none">
              <span className="text-gray-500">$ </span>
              <span className="text-green-400">pip install</span> openra-rl{'\n'}
              <span className="text-gray-500">$ </span>
              <span className="text-green-400">openra-rl play</span>{'\n\n'}
              <span className="text-cyan-400">  Welcome to OpenRA-RL!</span>{'\n'}
              <span className="text-gray-400">  Choose provider:</span>{'\n'}
              <span className="text-gray-400">    [1] OpenRouter (cloud)</span>{'\n'}
              <span className="text-gray-400">    [2] Ollama (local, free)</span>{'\n'}
              <span className="text-gray-400">    [3] LM Studio (local, free)</span>{'\n'}
              <span className="text-gray-500">  {'>'} </span>
              <span className="text-white">2</span>{'\n\n'}
              <span className="text-green-400">  ✔ Config saved</span>{'\n'}
              <span className="text-cyan-400">  Pulling game server image...</span> done{'\n'}
              <span className="text-cyan-400">  Starting game server...</span> ready!{'\n\n'}
              <span className="text-yellow-300">  Starting LLM agent (qwen3:32b via Ollama)...</span>{'\n'}
              <span className="text-gray-400">  [Turn 1] Planning phase: studying opponent...</span>{'\n'}
              <span className="text-gray-400">  [Turn 5] Building power plant...</span>{'\n'}
              <span className="text-gray-400">  [Turn 12] Training tanks at war factory...</span>{'\n'}
              <span className="text-gray-400">  [Turn 25] Attack force assembled — engaging enemy!</span>{'\n'}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
