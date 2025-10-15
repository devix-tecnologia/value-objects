Aqui está o README.md gerado para o componente `ImagemBase64` com base no código fornecido:

---

# ImagemBase64

Componente para manipulação e validação de imagens codificadas em base64. Aceita tanto strings base64 puras quanto data URIs, detecta automaticamente o formato da imagem e fornece métodos para acessar suas propriedades.

## Exemplo de usos:

```ts
// Usando string base64 pura (exemplo simplificado)
new ImagemBase64('iVBORw0KGgoAAAANSUhEUgAAAAUA...')

// Usando data URI
new ImagemBase64('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAUA...')

// Exemplos inválidos detectados automaticamente
new ImagemBase64('texto inválido') // isValid() retorna false
new ImagemBase64('') // isValid() retorna false
```

## Descrição

O componente `ImagemBase64` cria um objeto de valor que valida e gerencia imagens codificadas em base64. Ele suporta:

- **Validação**: Verifica se a string fornecida é um base64 válido e corresponde a um formato de imagem conhecido (ex.: PNG, JPEG, GIF, etc.).
- **Detecção de formato**: Identifica automaticamente o formato da imagem com base no conteúdo ou no cabeçalho da data URI.
- **Flexibilidade**: Aceita tanto strings base64 puras quanto data URIs no formato `data:image/[formato];base64,[conteúdo]`.

Caracteres inválidos ou strings malformadas resultam em um objeto inválido (`isValid() === false`).

## Código

O código principal está em `index.ts`. Ele depende de:

- `image-formats.js`: Contém definições de formatos de imagem e funções auxiliares como `findFormatByPrefix`.
- `../types/base_class.js`: Define a interface `IBaseClassText` e o tipo `ValidConfig`.

## Funcionalidades principais

### Construtor
```ts
new ImagemBase64(content: string)
```
- Aceita uma string que pode ser um base64 puro ou uma data URI.
- Realiza validação automática ao instanciar.

### Propriedades
```ts
const img = new ImagemBase64('data:image/png;base64,iVBORw0KGgo...')

img.type           // 'BASE64_IMAGE'
img.version        // '1.0.0'
img.validation     // 'Validação de string base64 e assinatura de formato de imagem'
img.formatted      // Retorna a data URI completa (ex.: 'data:image/png;base64,iVBORw0KGgo...')
img.content        // Retorna apenas o conteúdo base64 (sem o prefixo data URI)
img.format         // 'PNG' (ou outro formato detectado)
img.formatInfo     // Objeto com informações sobre o formato (ex.: mimeType)
```

### Métodos auxiliares
```ts
const img = new ImagemBase64('data:image/png;base64,iVBORw0KGgo...')

img.isValid()                    // true (valida sem exceção)
img.isValid({ raiseException: true }) // Lança exceção se inválido
img.toString()                   // Retorna a data URI formatada (ou '' se inválido)
img.toJSON()                     // Retorna objeto com type, format, formatted, isValid, etc.
img.equals(other)                // Compara com outra ImagemBase64 ou string
```

### Exemplos de uso
```ts
// Criando com data URI
const img1 = new ImagemBase64('data:image/jpeg;base64,/9j/4AAQSkZJRg...')
console.log(img1.format)        // 'JPEG'
console.log(img1.content)       // '/9j/4AAQSkZJRg...'
console.log(img1.asDataUri)     // 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'

// Criando com base64 puro
const img2 = new ImagemBase64('iVBORw0KGgo...')
console.log(img2.format)        // 'PNG' (detectado automaticamente)
console.log(img2.formatted)     // 'data:image/png;base64,iVBORw0KGgo...'

// Comparação
img1.equals(img2)               // false
img1.equals('data:image/jpeg;base64,/9j/4AAQSkZJRg...') // true

// Validação
const img3 = new ImagemBase64('texto inválido')
console.log(img3.isValid())     // false
img3.isValid({ raiseException: true }) // Lança Error: 'Invalid base64 image'
```

## Observações
- **Formatos suportados**: Depende do módulo `image-formats.js`. Formatos comuns como PNG, JPEG e GIF são suportados por padrão.
- **Exceções**: Use `isValid({ raiseException: true })` para forçar a validação com lançamento de erro em caso de falha.
- **Comparação**: O método `equals` compara apenas o conteúdo base64, ignorando diferenças entre data URI e base64 puro.