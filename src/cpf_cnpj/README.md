# CpfCnpj

Valida e formata CPF e CNPJ, incluindo CNPJ alfanumérico (novo padrão Receita Federal 2026).

## Exemplos uso:

```ts
documento = new CpfCnpj(<number>ou<string>)

documento.isValid() // boolean

documento.onlyNumbers // 63172446263 ou 12ABC345678041

documento.formatted // 631.724.462-63 ou 12.ABC.345/6780-41

documento.docType //'CPF' ou 'CNPJ' ou 'INVALID'

// Comparando objetos - independente de pontuação.
// Parametro pode ser objeto do tipo CpfCnpjHelper ou string.
documento.equals('631.724.462-63') // boolean
```

## Funções estáticas:

Retornam instancia do tipo `CpfCnpj`

- Gera CPF válido: `CpfCnpjHelper.newCpf()`

- Gera CNPJ válido: `CpfCnpjHelper.newCnpj()`
