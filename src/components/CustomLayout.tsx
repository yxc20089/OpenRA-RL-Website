import React, {useState, type ReactNode} from 'react';
import Link from '@docusaurus/Link';
import Head from '@docusaurus/Head';
import {useLocation} from '@docusaurus/router';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import {Menu, X, ChevronRight, Book, Github, Globe} from 'lucide-react';
import {RadarIcon} from './Icons';
import {useTranslation} from '../i18n';

export default function CustomLayout({
  children,
  title = 'OpenRA-RL',
  description = 'Command AI to play Red Alert. The ultimate open-source project for wiring up LLMs to play RTS games.',
}: {
  children: ReactNode;
  title?: string;
  description?: string;
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  const t = useTranslation();
  const {i18n} = useDocusaurusContext();
  const currentLocale = i18n.currentLocale;

  const navLinks = [
    {path: '/', label: t.nav.commandCenter},
    {path: '/leaderboard', label: t.nav.leaderboard},
    {path: '/research', label: t.nav.research},
  ];

  // Build the alternate locale URL
  const alternatePath = currentLocale === 'en'
    ? `/zh${location.pathname}`
    : location.pathname.replace(/^\/zh/, '') || '/';

  return (
    <div className="openra-layout min-h-screen bg-[#0a0a0a] text-gray-300 selection:bg-red-900 selection:text-white relative overflow-hidden">
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>

      <div className="scanlines" />

      {/* Navigation */}
      <nav className="border-b-2 border-red-800 bg-black/90 sticky top-0 z-40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="flex items-center no-underline hover:no-underline">
              <RadarIcon className="h-8 w-8 text-red-600 animate-[spin_4s_linear_infinite]" />
              <span className="ml-3 font-teko text-3xl font-bold text-white tracking-widest">
                OPENRA<span className="text-red-600">-RL</span>
              </span>
            </Link>

            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.path}
                    to={link.path}
                    className={`font-teko text-xl tracking-wider px-3 py-2 transition-colors no-underline hover:no-underline ${
                      location.pathname === link.path
                        ? 'text-red-500 border-b-2 border-red-500'
                        : 'text-gray-400 hover:text-white'
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/docs/getting-started"
                  className="font-teko text-xl tracking-wider px-3 py-2 text-gray-400 hover:text-white no-underline hover:no-underline flex items-center gap-1"
                >
                  {t.nav.docs} <Book className="w-4 h-4 mb-1" />
                </Link>
                <a
                  href="https://github.com/yxc20089/OpenRA-RL"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-teko text-xl tracking-wider px-3 py-2 text-gray-400 hover:text-white no-underline hover:no-underline flex items-center gap-1"
                >
                  GITHUB <Github className="w-4 h-4 mb-1" />
                </a>
                <a
                  href={alternatePath}
                  className="font-teko text-xl tracking-wider px-3 py-2 text-yellow-500 hover:text-yellow-400 no-underline hover:no-underline flex items-center gap-1 ml-4 border border-yellow-800/50 rounded bg-yellow-900/10"
                >
                  <Globe className="w-4 h-4 mb-1" /> {t.nav.langLabel}
                </a>
              </div>
            </div>

            <div className="md:hidden flex items-center gap-4">
              <a
                href={alternatePath}
                className="text-yellow-500 font-teko text-xl flex items-center gap-1 no-underline hover:no-underline"
              >
                <Globe className="w-4 h-4" /> {t.nav.langLabel}
              </a>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="text-gray-400 hover:text-white bg-transparent border-none cursor-pointer"
              >
                {isMenuOpen ? <X className="h-8 w-8" /> : <Menu className="h-8 w-8" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black border-b border-red-800 p-4 space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsMenuOpen(false)}
                className="block w-full text-left font-teko text-2xl text-gray-300 hover:text-red-500 no-underline hover:no-underline"
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/docs/getting-started"
              onClick={() => setIsMenuOpen(false)}
              className="block w-full text-left font-teko text-2xl text-gray-300 hover:text-red-500 no-underline hover:no-underline"
            >
              {t.nav.docs}
            </Link>
            <a
              href="https://github.com/yxc20089/OpenRA-RL"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-left font-teko text-2xl text-gray-300 hover:text-red-500 no-underline hover:no-underline"
            >
              GITHUB
            </a>
          </div>
        )}
      </nav>

      {/* Main Content */}
      <main className="crt-flicker min-h-[80vh]">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-black border-t-2 border-red-900 mt-20 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <span className="font-teko text-4xl font-bold text-white tracking-widest flex items-center gap-2">
              <RadarIcon className="h-8 w-8 text-red-600" /> OPENRA-RL
            </span>
            <p className="mt-4 text-gray-500 terminal-text text-sm">
              &gt; {t.footer.status}<br />
              &gt; {t.footer.mission}<br />
              &gt; {t.footer.copyright} &copy; {new Date().getFullYear()} OPENRA-RL CONTRIBUTORS.
            </p>
          </div>
          <div>
            <h3 className="font-teko text-2xl text-white mb-4">{t.footer.intel}</h3>
            <ul className="space-y-2 text-sm list-none pl-0">
              <li>
                <Link to="/docs/getting-started" className="hover:text-red-500 transition-colors flex items-center gap-2 text-gray-300 no-underline hover:no-underline">
                  <ChevronRight className="w-4 h-4" /> {t.footer.documentation}
                </Link>
              </li>
              <li>
                <Link to="/docs/architecture" className="hover:text-red-500 transition-colors flex items-center gap-2 text-gray-300 no-underline hover:no-underline">
                  <ChevronRight className="w-4 h-4" /> {t.footer.architecture}
                </Link>
              </li>
              <li>
                <Link to="/docs/api-reference" className="hover:text-red-500 transition-colors flex items-center gap-2 text-gray-300 no-underline hover:no-underline">
                  <ChevronRight className="w-4 h-4" /> {t.footer.apiReference}
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="font-teko text-2xl text-white mb-4">{t.footer.alliances}</h3>
            <ul className="space-y-2 text-sm list-none pl-0">
              <li>
                <a href="https://www.openra.net/" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors flex items-center gap-2 text-gray-300 no-underline hover:no-underline">
                  <ChevronRight className="w-4 h-4" /> {t.footer.openraEngine}
                </a>
              </li>
              <li>
                <a href="https://huggingface.co/openenv" target="_blank" rel="noopener noreferrer" className="hover:text-red-500 transition-colors flex items-center gap-2 text-gray-300 no-underline hover:no-underline">
                  <ChevronRight className="w-4 h-4" /> {t.footer.openenvFramework}
                </a>
              </li>
              <li>
                <Link to="/leaderboard" className="hover:text-red-500 transition-colors flex items-center gap-2 text-gray-300 no-underline hover:no-underline">
                  <ChevronRight className="w-4 h-4" /> {t.footer.leaderboard}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
}
