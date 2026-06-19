# Plano de Execução — CNPJ Alfanumérico: Lib `@devix-tecnologia/value-objects`

## Objetivo

Atualizar a classe `CpfCnpj` da lib `@devix-tecnologia/value-objects` (v`^2.5.1`) para suportar CNPJ com caracteres alfanuméricos conforme nova regulamentação da Receita Federal (julho/2026).

---

## Formato Oficial (Receita Federal)

| Posição | Campo | Tipo |
|---------|-------|------|
| **1ª a 8ª** | Raiz | **Alfanumérico** (letras + números) |
| **9ª a 12ª** | Ordem do estabelecimento | **Alfanumérico** (letras + números) |
| **13ª e 14ª** | Dígitos verificadores | **Apenas numérico** |

**Tamanho:** 14 caracteres (inalterado)  
**Máscara:** `SS.SSS.SSS/SSSS-NN` (S=alfanumérico, N=numérico)

---

## Arquivo Fonte

**Repo:** `/home/marcos-antonio/repositorio/devix/value-objects`  
**Arquivo:** `src/cpf_cnpj/index.ts` (181 linhas)  
**Testes:** `src/cpf_cnpj/index.spec.ts` (140 linhas)

---

## Etapas do Plano

### 1. Normalização na Entrada

**Local:** `constructor` (linha 12)

```typescript
// Atual (remove letras):
const doc = String(numDoc).replace(/[^\d]+/g, '')

// Novo (preserva letras):
const doc = String(numDoc).replace(/[^0-9A-Za-z]+/g, '')
```

- [ ] **1.1** Alterar regex de limpeza para `[^0-9A-Za-z]`
- [ ] **1.2** Validar que `length` continua 11 (CPF) ou 14 (CNPJ) — inalterado

### 2. Função Utilitária `charToNumber`

Converter caracter alfanumérico para número no cálculo de DV. Padrão: A=10, B=11, ..., Z=35.

```typescript
function charToNumber(c: string): number {
  const code = c.charCodeAt(0);
  if (code >= 48 && code <= 57) return code - 48;       // 0-9
  if (code >= 65 && code <= 90) return code - 55;        // A-Z → 10-35
  if (code >= 97 && code <= 122) return code - 87;       // a-z → 10-35
  return NaN;
}
```

- [ ] **2.1** Criar função `charToNumber` no arquivo (fora da classe, como função pura)

### 3. Algoritmo de DV — CPF (`CpfVerifierDigits`)

**Local:** linha 152-160

```typescript
// Atual:
const numbers = doc_ident.split('').map((number) => parseInt(number, 10))

// Novo:
const numbers = doc_ident.split('').map((c) => charToNumber(c))
```

- [ ] **3.1** Substituir `parseInt(number, 10)` por `charToNumber(c)` no `CpfVerifierDigits`

### 4. Algoritmo de DV — CNPJ (`CnpjVerifierDigits`)

**Local:** linha 162-178

```typescript
// Atual:
return [parseInt(number, 10)].concat(buffer)

// Novo:
return [charToNumber(number)].concat(buffer)
```

- [ ] **4.1** Substituir `parseInt(number, 10)` por `charToNumber(number)` no `CnpjVerifierDigits`

### 5. Validação de CNPJ (`isCnpjValid`) — ⚠️ CRÍTICO

**Local:** linha 135-150

**Problema:** O método `isCnpjValid` atualmente **não valida os dígitos verificadores** — retorna `true` após o blocklist. Isso significa que a lib aceita qualquer CNPJ de 14 dígitos que não esteja na blocklist.

- [ ] **5.1** Implementar validação real de DV no `isCnpjValid`, similar ao `isCpfValid`:
  ```typescript
  private isCnpjValid(): boolean {
    const blocklist = [ ... ]; // manter
    if (blocklist.includes(this._docId)) return false;

    let numbers = this._docId.slice(0, 12);
    numbers += CpfCnpj.CnpjVerifierDigits(numbers);
    numbers += CpfCnpj.CnpjVerifierDigits(numbers);

    return numbers.slice(-2) === this._docId.slice(-2);
  }
  ```
- [ ] **5.2** Validar que CNPJs numéricos válidos continuam passando
- [ ] **5.3** Validar que CNPJs alfanuméricos com DV correto são aceitos

### 6. Validação de CPF (`isCpfValid`)

**Local:** linha 112-133

- [ ] **6.1** Verificar se `CpfVerifierDigits` adaptado (step 3.1) funciona corretamente com letras
- [ ] **6.2** Se CPF também for afetado pela lei, ajustar blocklist para incluir variantes alfanuméricas

### 7. Formatação (`formatted`)

**Local:** linha 39-52

```typescript
// Atual (só dígitos):
return this._docId.replace(
  /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
  '$1.$2.$3/$4-$5'
)

// Novo (alfanumérico):
return this._docId.replace(
  /^([0-9A-Za-z]{2})([0-9A-Za-z]{3})([0-9A-Za-z]{3})([0-9A-Za-z]{4})(\d{2})$/,
  '$1.$2.$3/$4-$5'
)
```

- [ ] **7.1** Atualizar regex do `formatted` para `[0-9A-Za-z]` nas posições 1-12, `\d` nas posições 13-14 (DVs)
- [ ] **7.2** Atualizar regex do `formatted` para CPF, se aplicável

### 8. Geração Aleatória (`newCnpj`, `newCpf`)

**Local:** linhas 92-110

- [ ] **8.1** `newCnpj`: sortear caracteres alfanuméricos (A-Z + 0-9) nas 12 primeiras posições
- [ ] **8.2** `newCpf`: sortear caracteres alfanuméricos se CPF também for afetado

### 9. Blocklist

**Local:** linhas 113-125 (CPF) e 136-147 (CNPJ)

- [ ] **9.1** Adicionar variantes alfanuméricas na blocklist do CNPJ (ex: `AAAAAAAAAAAAAA`, `AAAAAABBBBBBBB`, etc.)
- [ ] **9.2** Adicionar variantes alfanuméricas na blocklist do CPF, se aplicável

### 10. Método `equals` e `onlyNumbers`

- [ ] **10.1** Validar que `equals` funciona comparando a string normalizada (deve funcionar sem alterações)
- [ ] **10.2** `onlyNumbers`: o nome fica misleading — considerar deprecate ou manter como `normalized`

---

## Testes (`index.spec.ts`)

- [ ] **T1** CNPJ alfanumérico válido (ex: `AB4.CDE.FGH/IJKL-01`)
- [ ] **T2** CNPJ alfanumérico com DV inválido
- [ ] **T3** CNPJ numérico válido (regressão — deve continuar funcionando)
- [ ] **T4** CPF alfanumérico válido (se aplicável)
- [ ] **T5** Formatação de CNPJ alfanumérico (`AB4.CDE.FGH/IJKL-01`)
- [ ] **T6** Geração de CNPJ alfanumérico (`newCnpj` deve gerar com letras)
- [ ] **T7** Blocklist com caracteres alfanuméricos
- [ ] **T8** `charToNumber` com maiúsculas, minúsculas e dígitos
- [ ] **T9** `equals` com CNPJ alfanumérico

---

## Publicação

- [ ] **P1** Rodar `pnpm test` na lib — todos os testes passando
- [ ] **P2** Rodar `pnpm build` — sem erros de compilação
- [ ] **P3** Publicar nova versão (ex: `2.6.0`) via `semantic-release` ou bump manual em `package.json`
- [ ] **P4** Atualizar `CHANGELOG.md` com as alterações

---

## Arquivos Modificados (lib)

| Arquivo | Alteração |
|---------|-----------|
| `src/cpf_cnpj/index.ts` | Regex normalização, `charToNumber`, `isCnpjValid` com DV real, `formatted`, `newCnpj`, `newCpf`, blocklist |
| `src/cpf_cnpj/index.spec.ts` | Testes CNPJ alfanumérico, regressão, `charToNumber` |
| `package.json` | Bump de versão |

---

## Checklist de Alterações Executadas (task-001)

| # | Alteração | Status | Arquivo | Detalhe |
|---|-----------|--------|---------|---------|
| 1.1 | Regex constructor: `[^\d]` → `[^0-9A-Za-z]` | ✅ | `index.ts:12` | Preserva letras na limpeza |
| 1.2 | Validação length (11/14) | ✅ | `index.ts:14,17` | Inalterado |
| 2.1 | Função `charToNumber()` | ✅ | `index.ts:4-10` | A=10..Z=35, case-insensitive |
| 3.1 | `CpfVerifierDigits`: `parseInt` → `charToNumber` | ✅ | `index.ts:155` | DV CPF aceita letras |
| 4.1 | `CnpjVerifierDigits`: `parseInt` → `charToNumber` | ✅ | `index.ts:169` | DV CNPJ aceita letras |
| 5.1 | `isCnpjValid` com DV real | ✅ | `index.ts:137-150` | Crítico: antes só blocklist |
| 5.2 | Regressão CNPJ numérico válido | ✅ | `index.spec.ts` | `11222333000181` aceito |
| 5.3 | CNPJ alfanumérico com DV correto aceito | ✅ | `index.spec.ts` | `BR0DEV1XABCD02` aceito |
| 6.1 | Blocklist: variantes alfanuméricas | ✅ | `index.ts:147-149` | Regex `^([0-9A-Za-z])\1{13}$` |
| 7.1 | `formatted` CNPJ: regex alfanumérico | ✅ | `index.ts:50` | `[0-9A-Za-z]` posições 1-12 |
| 7.2 | `formatted` CPF: regex alfanumérico | ✅ | `index.ts:45` | `[0-9A-Za-z]` posições 1-9 |
| 8.1 | `newCnpj`: sortear alfanumérico | ✅ | `index.ts:104-110` | `A-Z` + `0-9` nas 12 primeiras |
| 8.2 | `newCpf`: manter numérico | ✅ | `index.ts:93-101` | Inalterado (lei CPF não confirmada) |
| 10.1 | `equals` com alfanumérico | ✅ | `index.spec.ts` | Funciona via string normalizada |

### Testes Adicionados

| Teste | Descrição | Resultado |
|-------|-----------|-----------|
| T1 | CNPJ alfanumérico válido (`BR0DEV1XABCD02`) | ✅ |
| T2 | CNPJ alfanumérico com DV inválido | ✅ |
| T3 | CNPJ alfanumérico minúsculas | ✅ |
| T4 | CNPJ alfanumérico formatado | ✅ |
| T5 | Formatação CNPJ alfanumérico | ✅ |
| T6 | Blocklist caracteres repetidos (`AAAAAAAAAAAAAA`) | ✅ |
| T7 | `equals` com CNPJ alfanumérico | ✅ |
| T8 | Regressão CNPJ numérico | ✅ |
| T9 | CPF com letras (DV falha) | ✅ |

### Publicação (Pendente)

| # | Passo | Status |
|---|-------|--------|
| P1 | `pnpm test` | ✅ 96 testes passando |
| P2 | `pnpm build` | ✅ Sem erros |
| P3 | Publicar versão `2.6.0` | ⏳ Pendente |
| P4 | Atualizar `CHANGELOG.md` | ⏳ Pendente |

---

## Observação

> Este plano não executa alterações, apenas descreve as etapas e os arquivos a serem revisados/modificados. Aguardar análise e aprovação do gerente de projeto antes de qualquer execução.
