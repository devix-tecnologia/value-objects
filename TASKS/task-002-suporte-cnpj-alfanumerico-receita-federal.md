# Task 082 — Suporte a CNPJ alfanumérico (Receita Federal)

Status: pending
Type: feat
Priority: high
Assignee: sidartaveloso
Data: 2026-06-19

---

## Descrição

A Receita Federal implantará a partir de julho/2026 CNPJs com caracteres alfanuméricos (letras + números). Todo o ecossistema que valida, formata, normaliza ou mascara CNPJ precisa ser atualizado.

O Hub do Desenvolvedor já confirmou suporte. O banco de dados (`string(255)`) também está OK. A alteração necessária é exclusivamente no código-fonte.

---

## Impacto no Código (Core)

### 1. Biblioteca `@devix-tecnologia/value-objects` (CpfCnpj v`^2.5.1`)
Usada em 7+ arquivos para validar e formatar CNPJ. O construtor remove não-dígitos, o `formatted` usa regex `\d` puro, e `isCnpjValid()` não valida dígitos de verdade. Precisa de nova versão ou substituição.

**Arquivos que dependem dela:**
- `src/cliente/endpoints/pesquisa-cnpj-endpoint/pesquisa-cnpj-endpoint.ts:61` — `new CpfCnpj(cpnjLimpo).isValid()`
- `src/services/contrato/contrato-schema.ts:52` — `new CpfCnpj(value).isValid()`
- `src/services/contrato/Contrato2Carbone.ts:226,332` — `new CpfCnpj(...).formatted`
- `src/services/analise-cliente-service/AnaliseClienteService.ts:48-49` — `validaCPFCNPJ()` → `testaCNPJ()`

### 2. `AnaliseClienteService.testaCNPJ()` — `src/services/analise-cliente-service/AnaliseClienteService.ts:107-154`
Validador caseiro que:
- Strip não-dígitos (`replace(/[^\d]+/g, '')`)
- Checa `length != 14`
- Usa `Number()` nos caracteres para cálculo de dígitos

Chamado por `validaCPFCNPJ()` nos endpoints de cliente.

### 3. `pesquisa-cnpj-endpoint.ts` — `src/cliente/endpoints/pesquisa-cnpj-endpoint/pesquisa-cnpj-endpoint.ts:45-61`
- `replace(/\D+/g, '')` remove letras
- `length !== 14` barra alfanumérico

### 4. Zod schema de CNPJ — `src/services/contrato/contrato-schema.ts:49`
```ts
.regex(/^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/)
```
Só matches formato numérico `XX.XXX.XXX/XXXX-XX`.

Usado nos schemas de contrato PF e PJ (contratada/contratante).

### 5. `UnikaSolicitacaoService.normalizarDocumento()` — `src/services/unika-solicitacao-service/UnikaSolicitacaoService.ts:1354-1355`
```ts
return documento.replace(/\D+/g, '');
```
Remove letras. Chamado nas linhas 280, 932, 965, 993, 1238.

### 6. `UnikaSolicitacaoService.mascararDocumento()` — `UnikaSolicitacaoService.ts:1362`
```ts
`${normalizado.slice(0, 2)}.***.***/****-${normalizado.slice(-2)}`
```
Slice positions fixos para 14 dígitos.

### 7. `Contrato2Nucleos.ts:314` — `src/nucleos/services/contrato-service/contrato-2-nucleos/Contrato2Nucleos.ts`
```ts
cnpj: d.contratante.pessoa_juridica[0].cnpj.replace(/[^\d]+/g, '')
```

### 8. Mesmo problema com CPF (mesma lei)
- `contrato-schema.ts:35` — regex `/^\d{3}\.?\d{3}\.?\d{3}-?\d{2}$/`
- `leitura-beneficiarios.ts:48` — regex `/^\d{11}$/`
- `AnaliseClienteService.testaCPF()` — mesmo padrão do CNPJ

---

## Observações

- A biblioteca `@devix-tecnologia/value-objects` é o ponto central — sem ela atualizada, nada funciona.
- O formato exato do novo CNPJ alfanumérico (estrutura, tamanho) ainda precisa ser definido para escrever as novas regex/validações.
- Testes em `test-data.ts` e `pesquisa-cnpj-endpoint.test.ts` usam CNPJs 100% numéricos e precisarão de revisão.
