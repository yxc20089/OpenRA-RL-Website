import React from 'react';
import Link from '@docusaurus/Link';
import {Book, Code} from 'lucide-react';

export default function CodeTerminal() {
  return (
    <section className="py-24 bg-[#050505] border-y border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div>
          <h2 className="font-teko text-5xl text-white mb-6">SIMPLE, DEADLY API</h2>
          <p className="text-lg text-gray-400 mb-6 leading-relaxed">
            You don&apos;t need to learn a complex game engine to get started. OpenRA-RL
            abstracts the chaos of war into a standard, clean Python loop.
          </p>
          <p className="text-lg text-gray-400 mb-8 leading-relaxed">
            Connect your script to a running match, let your AI model read the map telemetry,
            and issue commands to your troops. Whether you are using a{' '}
            <strong>local open-source model</strong> or a <strong>cloud-based API</strong>,
            integration takes minutes.
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
              <Code className="w-3 h-3" /> red_alert_agent.py
            </span>
          </div>
          <div className="bg-[#0d0d0d] p-6 overflow-x-auto text-sm">
            <pre className="font-mono text-gray-300 leading-relaxed m-0 p-0 bg-transparent border-none">
              <span className="text-pink-500">from</span> openra_env.client{' '}
              <span className="text-pink-500">import</span> OpenRAEnv{'\n'}
              <span className="text-pink-500">from</span> agents{' '}
              <span className="text-pink-500">import</span> LLMAgent{'\n\n'}
              <span className="text-blue-400">async def</span>{' '}
              <span className="text-yellow-200">commence_operation</span>():{'\n'}
              {'    '}
              <span className="text-blue-400">async with</span> OpenRAEnv(
              <span className="text-green-400">"http://localhost:8000"</span>){' '}
              <span className="text-pink-500">as</span> env:{'\n'}
              {'        '}
              <span className="text-gray-500"># Establish connection to the warzone</span>
              {'\n'}
              {'        '}obs = <span className="text-blue-400">await</span> env.reset()
              {'\n\n'}
              {'        '}
              <span className="text-gray-500">
                # Instantiate your Commander (Local Llama or Cloud GPT/Claude)
              </span>
              {'\n'}
              {'        '}commander = LLMAgent(model=
              <span className="text-green-400">"claude-3-opus"</span>){'\n\n'}
              {'        '}
              <span className="text-blue-400">while not</span> obs.done:{'\n'}
              {'            '}
              <span className="text-gray-500">
                # AI evaluates enemy positions and base economy
              </span>
              {'\n'}
              {'            '}tactical_decision = commander.evaluate_and_command(obs){'\n'}
              {'            '}
              <span className="text-gray-500"># Execute orders: Build, Harvest, Attack!</span>
              {'\n'}
              {'            '}obs = <span className="text-blue-400">await</span>{' '}
              env.step(tactical_decision){'\n'}
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
