# @devix-tecnologia/value-objects

Robust library for manipulation and validation of value objects in JavaScript/TypeScript. Provides utility classes for common data such as phone numbers, documents, and base64 images, ensuring consistent validation and formatting.

## Table of Contents
- [Installation](#installation)
- [Requirements](#requirements)
- [Import](#import)
- [Available Value Objects](#available-value-objects)
- [Usage Examples](#usage-examples)
- [To Do](#to-do)
- [Contributing](#contributing)
- [License](#license)

## Installation

```bash
npm i @devix-tecnologia/value-objects
```

## Requirements
- Node.js >= 18 (Node.js 20 or higher recommended)
- TypeScript >= 4.5 (optional, for typing)

## Import

```typescript
import { ClassName } from '@devix-tecnologia/value-objects'
```

## Available Value Objects

- [Phone](./src/telefone/readme.md): Manipulates and validates phone numbers, supporting Brazilian DDD and country codes.
- [CPF/CNPJ](./src/cpf_cnpj/readme.md): Validates and formats CPF and CNPJ documents.
- [Base64Image](./src/imagem_base64/readme.md): Manages and validates base64-encoded images, with automatic format detection.
- [Vehicle Plate](./src/placa_veiculo/readme.md): Validates and formats Brazilian vehicle plates, supporting both old (ABC1234) and Mercosul (ABC1D23) formats.

## Usage Examples

```typescript
import { Phone, CpfCnpj, Base64Image, PlacaVeiculo } from '@devix-tecnologia/value-objects'

// Phone
const tel = new Phone('+55 11 91234-5678')
console.log(tel.isValid()) // true
console.log(tel.format()) // +55 (11) 91234-5678

// CPF/CNPJ
const doc = new CpfCnpj('123.456.789-09')
console.log(doc.isValid()) // true
console.log(doc.format()) // 123.456.789-09

// Base64Image
const img = new Base64Image(base64String)
console.log(img.isValid()) // true
console.log(img.getFormat()) // 'png', 'jpeg', etc.

// Vehicle Plate
const plate = new PlacaVeiculo('ABC1234')
console.log(plate.isValid()) // true
console.log(plate.formatted) // ABC-1234
console.log(plate.format) // ANTIGA
```

## To Do
- Address
- Email
- Name (Individual)
- Money
- ZIP Code

## Contributing
Contributions are welcome! To contribute:
1. Fork this repository
2. Create a branch with your feature/fix
3. Submit a Pull Request

See the CONTRIBUTING.md file for more details.

## License
This project is licensed under the MIT License. See the LICENSE file for more information.

---

> **Note:** The `Base64Image` component has been included in the list of value objects, with a link to specific documentation and a description aligned with the standard of the other components.