import Layout from '@theme/Layout';

const SPACE_URL = 'https://sy30678-openra-bench.hf.space';

export default function Leaderboard() {
  return (
    <Layout
      title="Leaderboard"
      description="OpenRA-Bench Agent Leaderboard — Compare AI agents playing Red Alert">
      <main style={{height: 'calc(100vh - 60px)', display: 'flex', flexDirection: 'column'}}>
        <iframe
          src={`${SPACE_URL}?embed=true`}
          style={{
            flex: 1,
            width: '100%',
            border: 'none',
          }}
          title="OpenRA-Bench Leaderboard"
          allow="clipboard-write"
        />
      </main>
    </Layout>
  );
}
