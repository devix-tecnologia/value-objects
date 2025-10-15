# CpfCnpj

## Exemplos uso:

```ts
documento = new CpfCnpj(<number>ou<string>)

documento.isValid() // boolean

documento.onlyNumbers // 63172446263

documento.formatted // 631.724.462-63

documento.docType //'CPF' ou 'CNPJ' ou 'INVALID'

// Comparando objetos - independente de pontuação.
// Parametro pode ser objeto do tipo CpfCnpjHelper ou string.
documento.equals('631.724.462-63') // boolean
```

## Funções estáticas:

Retornam instancia do tipo `CpfCnpj`

- Gera CPF válido: `CpfCnpjHelper.newCpf()`

- Gera CNPJ válido: `CpfCnpjHelper.newCnpj()`
