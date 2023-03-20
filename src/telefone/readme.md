# Telefone

## Exemplo de usos:

```ts
// Usando strings - Desconsidera qq caracter não numérico
new Telefone('27 97643-0476')
new Telefone('(27) 97643-0476')
new Telefone('5527 97643-0476')
new Telefone('+55 27 97643-0476')
new Telefone('5527976430476')

// Usando objeto
new Telefone({
  countryCode: '+1',
  areaCode: '27',
  phoneNum: '97643-4333',
})
```

## Funcões auxiliares:

```ts
tel = new Telefone('27 97643-0476')
tel.country // 'BR'
tel.estate // 'ES'
tel.isValid() // true
tel.isValid({ raiseException: true }) // Raises Exception
tel.formatted // +55 27 97643-0476
tel.onlyNumbers // 5527976430476

tel.equals('5527976430476') // true
```
