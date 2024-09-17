import { vitePlugin as remix } from '@remix-run/dev'
import { readFileSync } from 'fs'
import { TlsOptions } from 'tls'
import path from 'path'
import { defineConfig, loadEnv, UserConfigExport } from 'vite'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  const config: UserConfigExport = {
    plugins: [
      remix({
        future: {
          v3_fetcherPersist: true,
          v3_relativeSplatPath: true,
          v3_throwAbortReason: true
        }
      }),
      tsconfigPaths()
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  }
  if (command === 'serve') {
    config.clearScreen = false
    config.server = {
      https: getHttpsConfig(env),
      // proxy: createProxyConfig(env),
      host: '0.0.0.0',
      port: 3000
    }
  }
  return config
})

function getHttpsConfig(env: Record<string, string>): TlsOptions | undefined {
  const crtPath = env.SSL_CRT_FILE
  const keyPath = env.SSL_KEY_FILE
  if (!crtPath || !keyPath) return undefined
  return {
    cert: readFileSync(crtPath),
    key: readFileSync(keyPath)
  }
}