# Task 001 — Suporte a CNPJ alfanumérico (Receita Federal) na lib value-objects

Status: in-progress
Type: feat
Priority: high
Assignee: —
Data: 2026-06-19

---

## Descrição

A Receita Federal implantará a partir de julho/2026 CNPJs com caracteres alfanuméricos (letras + números). A classe `CpfCnpj` da lib `@devix-tecnologia/value-objects` (v`2.5.1`) precisa ser atualizada para aceitar, validar, formatar e gerar CNPJs alfanuméricos.

Esta task cobre exclusivamente as alterações na lib. O bump da dependência no `agiliza-ai-directus` é tratado na task-082 daquele repositório.

---

## Formato Oficial (Receita Federal)

| Posição | Campo | Tipo |
|---------|-------|------|
| **1ª a 8ª** | Raiz | **Alfanumérico** (letras + números) |
| **9ª a 12ª** | Ordem do estabelecimento | **Alfanumérico** (letras + números) |
| **13ª e 14ª** | Dígitos verificadores | **Apenas numérico** |

**Tamanho:** 14 caracteres (inalterado)
**Máscara:** `SS.SSS.SSS/SSSS-NN` (S=alfanumérico, N=numérico)
**Conversão letra→número:** A=10, B=11, ..., Z=35 (case-insensitive)

---

## Alterações no Código

### 1. Normalização na Entrada — `constructor` (index.ts:12)

```ts
// Atual:
const doc = String(numDoc).replace(/[^\d]+/g, '')

// Novo:
const doc = String(numDoc).replace(/[^0-9A-Za-z]+/g, '')
```

- [ ] **1.1** Alterar regex de limpeza para `[^0-9A-Za-z]`
- [ ] **1.2** Validar que `length !== 11` e `length !== 14` continuam corretos

### 2. Função Utilitária `charToNumber`

Converter caracter alfanumérico para número no cálculo de DV.

- [ ] **2.1** Criar função `charToNumber(c: string): number` fora da classe (função pura):
  - `0-9` → `code - 48`
  - `A-Z` → `code - 55`
  - `a-z` → `code - 87`
  - demais → `NaN`

### 3. Algoritmo de DV — CPF (`CpfVerifierDigits`, index.ts:152-160)

```ts
// Atual:
const numbers = doc_ident.split('').map((number) => parseInt(number, 10))

// Novo:
const numbers = doc_ident.split('').map((c) => charToNumber(c))
```

- [ ] **3.1** Substituir `parseInt(number, 10)` por `charToNumber(c)`

### 4. Algoritmo de DV — CNPJ (`CnpjVerifierDigits`, index.ts:162-178)

```ts
// Atual:
return [parseInt(number, 10)].concat(buffer)

// Novo:
return [charToNumber(number)].concat(buffer)
```

- [ ] **4.1** Substituir `parseInt(number, 10)` por `charToNumber(number)`

### 5. Validação de CNPJ (`isCnpjValid`, index.ts:135-150) — ⚠️ CRÍTICO

O método atual **não valida os dígitos verificadores** — retorna `true` após o blocklist. Qualquer CNPJ de 14 dígitos não bloqueado passa.

- [ ] **5.1** Implementar validação real de DV no `isCnpjValid`, similar ao `isCpfValid`:
  ```ts
  private isCnpjValid(): boolean {
    const blocklist = [ /* manter + adicionar variantes alfanuméricas */ ]
    if (blocklist.includes(this._docId)) return false

    let numbers = this._docId.slice(0, 12)
    numbers += CpfCnpj.CnpjVerifierDigits(numbers)
    numbers += CpfCnpj.CnpjVerifierDigits(numbers)

    return numbers.slice(-2) === this._docId.slice(-2)
  }
  ```
- [ ] **5.2** Validar que CNPJs numéricos válidos continuam passando
- [ ] **5.3** Validar que CNPJs alfanuméricos com DV correto são aceitos

### 6. Blocklist (index.ts:112-150)

- [ ] **6.1** Adicionar variantes alfanuméricas na blocklist do CNPJ (ex: `AAAAAAAAAAAAAA`, `BBBBBBBBBBBBBB`, sequências previsíveis)
- [ ] **6.2** Adicionar variantes alfanuméricas na blocklist do CPF, se aplicável

### 7. Formatação (`formatted`, index.ts:39-52)

```ts
// Atual (CNPJ):
/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/

// Novo (CNPJ):
/^([0-9A-Za-z]{2})([0-9A-Za-z]{3})([0-9A-Za-z]{3})([0-9A-Za-z]{4})(\d{2})$/
```

- [ ] **7.1** Atualizar regex do `formatted` para `[0-9A-Za-z]` nas posições 1-12, `\d` nas posições 13-14 (DVs)
- [ ] **7.2** Atualizar regex do `formatted` para CPF, se aplicável

### 8. Geração Aleatória (`newCnpj`, `newCpf`, index.ts:92-110)

- [ ] **8.1** `newCnpj`: sortear caracteres alfanuméricos (`A-Z` + `0-9`) nas 12 primeiras posições
- [ ] **8.2** `newCpf`: sortear caracteres alfanuméricos se CPF também for afetado (a confirmar)

### 9. Métodos `equals` e `onlyNumbers`

- [ ] **9.1** Validar que `equals` funciona comparando a string normalizada (deve funcionar sem alterações)
- [ ] **9.2** `onlyNumbers`: considerar renomear ou deprecate, pois o nome fica misleading com caracteres alfanuméricos

---

## Testes (`index.spec.ts`)

- [ ] **T1** — `charToNumber`: maiúsculas (A→10, Z→35), minúsculas (a→10, z→35), dígitos (0→0, 9→9)
- [ ] **T2** — CNPJ alfanumérico válido (ex: `BR0DEV1XABCD02`) aceito
- [ ] **T3** — CNPJ alfanumérico com DV inválido rejeitado
- [ ] **T4** — CNPJ alfanumérico com letras minúsculas aceito
- [ ] **T5** — CNPJ 100% numérico válido continua aceito (regressão)
- [ ] **T6** — Formatação de CNPJ alfanumérico (ex: `BR0.DEV1.XABC/D002-01`)
- [ ] **T7** — Geração de CNPJ (`newCnpj`) produz documento válido com letras
- [ ] **T8** — Blocklist rejeita CNPJ alfanumérico bloqueado (ex: `AAAAAAAAAAAAAA`)
- [ ] **T9** — `equals` com CNPJ alfanumérico funciona
- [ ] **T10** — CPF alfanumérico (se aplicável, idem)

---

## Publicação

- [ ] **P1** — Rodar `pnpm test` — todos os testes passando
- [ ] **P2** — Rodar `pnpm build` — sem erros de compilação
- [ ] **P3** — Publicar nova versão (ex: `2.6.0`) via `semantic-release` ou bump manual em `package.json`
- [ ] **P4** — Atualizar `CHANGELOG.md`

---

## Arquivos Modificados

| Arquivo | Alteração |
|---------|-----------|
| `src/cpf_cnpj/index.ts` | Regex normalização, `charToNumber`, `isCnpjValid` com DV real, `formatted`, `newCnpj`, `newCpf`, blocklist |
| `src/cpf_cnpj/index.spec.ts` | Testes CNPJ alfanumérico, `charToNumber`, regressão |
| `package.json` | Bump de versão (ex: `2.6.0`) |
