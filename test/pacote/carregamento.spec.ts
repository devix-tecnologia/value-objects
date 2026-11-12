import { spawnSync } from 'node:child_process'
import {
  mkdirSync,
  mkdtempSync,
  readdirSync,
  realpathSync,
  rmSync,
  writeFileSync,
} from 'node:fs'
import { tmpdir } from 'node:os'
import { dirname, join, relative, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

const NOME_DO_PACOTE = '@devix-tecnologia/value-objects'
const CNPJ_VALIDO = '11222333000181'

const raizDoRepositorio = resolve(
  dirname(fileURLToPath(import.meta.url)),
  '../..'
)

function executa(comando: string, args: string[], cwd: string) {
  const resultado = spawnSync(comando, args, { cwd, encoding: 'utf8' })
  return {
    codigo: resultado.status,
    saida: resultado.stdout ?? '',
    erro: [resultado.stderr, resultado.error?.message]
      .filter(Boolean)
      .join('\n'),
  }
}

function executaOuFalha(comando: string, args: string[], cwd: string) {
  const resultado = executa(comando, args, cwd)
  if (resultado.codigo !== 0) {
    throw new Error(
      `"${comando} ${args.join(' ')}" falhou (código ${resultado.codigo}):\n` +
        `${resultado.saida}\n${resultado.erro}`
    )
  }
  return resultado
}

describe('pacote instalado a partir do tarball', () => {
  let pastaTemporaria: string
  let pastaDoConsumidor: string

  beforeAll(() => {
    pastaTemporaria = realpathSync(
      mkdtempSync(join(tmpdir(), 'value-objects-pacote-'))
    )
    // Dentro do repositório o Node acharia o package.json e o node_modules
    // daqui, e o teste deixaria de ver o pacote como o consumidor o recebe.
    expect(relative(realpathSync(raizDoRepositorio), pastaTemporaria)).toMatch(
      /^\.\./
    )

    executaOuFalha('pnpm', ['build'], raizDoRepositorio)
    executaOuFalha(
      'pnpm',
      ['pack', '--pack-destination', pastaTemporaria],
      raizDoRepositorio
    )
    const tarballs = readdirSync(pastaTemporaria).filter((nome) =>
      nome.endsWith('.tgz')
    )
    expect(tarballs).toHaveLength(1)

    pastaDoConsumidor = join(pastaTemporaria, 'consumidor')
    mkdirSync(pastaDoConsumidor)
    writeFileSync(
      join(pastaDoConsumidor, 'package.json'),
      JSON.stringify({ name: 'consumidor', private: true })
    )
    executaOuFalha(
      'npm',
      [
        'install',
        '--no-audit',
        '--no-fund',
        '--no-package-lock',
        join(pastaTemporaria, tarballs[0]),
      ],
      pastaDoConsumidor
    )
  })

  afterAll(() => {
    if (pastaTemporaria) {
      rmSync(pastaTemporaria, { recursive: true, force: true })
    }
  })

  function rodaNoConsumidor(arquivo: string, conteudo: string) {
    writeFileSync(join(pastaDoConsumidor, arquivo), conteudo)
    return executa(process.execPath, [arquivo], pastaDoConsumidor)
  }

  const relata = `process.stdout.write(JSON.stringify({
    exportados: Object.keys(vo).sort(),
    cnpjValido: new vo.CpfCnpj(${JSON.stringify(CNPJ_VALIDO)}).isValid(),
  }))`

  const esperado = {
    exportados: ['CpfCnpj', 'ImagemBase64', 'PlacaVeiculo', 'Telefone'],
    cnpjValido: true,
  }

  it('carrega com require() num arquivo .cjs', () => {
    const resultado = rodaNoConsumidor(
      'carrega.cjs',
      `const vo = require(${JSON.stringify(NOME_DO_PACOTE)})\n${relata}\n`
    )

    expect(resultado.codigo, resultado.erro).toBe(0)
    expect(JSON.parse(resultado.saida)).toEqual(esperado)
  })

  it('carrega com import num arquivo .mjs', () => {
    const resultado = rodaNoConsumidor(
      'carrega.mjs',
      `import * as vo from ${JSON.stringify(NOME_DO_PACOTE)}\n${relata}\n`
    )

    expect(resultado.codigo, resultado.erro).toBe(0)
    expect(JSON.parse(resultado.saida)).toEqual(esperado)
  })

  it('entrega os tipos a um consumidor CommonJS em TypeScript', () => {
    writeFileSync(
      join(pastaDoConsumidor, 'tipos.cts'),
      `import { CpfCnpj } from ${JSON.stringify(NOME_DO_PACOTE)}\n` +
        `export const valido: boolean = new CpfCnpj(${JSON.stringify(CNPJ_VALIDO)}).isValid()\n`
    )
    const tsc = join(raizDoRepositorio, 'node_modules/typescript/bin/tsc')

    const resultado = executa(
      process.execPath,
      [tsc, '--noEmit', '--strict', '--module', 'node16', 'tipos.cts'],
      pastaDoConsumidor
    )

    expect(resultado.codigo, resultado.saida + resultado.erro).toBe(0)
  })
})
