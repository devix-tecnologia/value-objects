import { defineConfig } from 'vitest/config'

// Teste do pacote como o consumidor o recebe: constrói, empacota e instala o
// tarball fora do repositório. Fica fora do `pnpm test` porque depende do build
// e leva alguns segundos; roda com `pnpm test:pacote`.
export default defineConfig({
  test: {
    include: ['test/pacote/**/*.spec.ts'],
    environment: 'node',
    testTimeout: 60_000,
    hookTimeout: 180_000,
  },
})
