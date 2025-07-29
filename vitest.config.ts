import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    include: ['src/**/*.spec.ts'],
    environment: 'node',
    globals: true,
    coverage: {
      reporter: ['text', 'json', 'html']
    }
  }
})
