import { IBaseClassNumbers, ValidConfig } from '../types/base_class.js'

type DocType = 'CPF' | 'CNPJ' | 'INVALID'

class CpfCnpj implements IBaseClassNumbers {
  private _docId: string
  private _docType: DocType
  private _isValid: boolean = false
  private static readonly VERSION = '1.0.0'

  constructor(numDoc: string | number) {
    const doc = String(numDoc)
      .replace(/[^a-zA-Z0-9]+/g, '')
      .toUpperCase()
    this._docId = doc
    if (doc.length === 11 && this.isCpfValid()) {
      this._docType = 'CPF'
      this._isValid = true
    } else if (doc.length === 14 && this.isCnpjValid()) {
      this._docType = 'CNPJ'
      this._isValid = true
    } else {
      this._docType = 'INVALID'
    }
  }

  get type(): string {
    return this._docType
  }

  get version(): string {
    return CpfCnpj.VERSION
  }

  get validation(): string {
    return this._docType === 'CPF'
      ? 'Módulo 11 para CPF'
      : 'Módulo 11 para CNPJ'
  }

  get formatted(): string {
    this.isValid({ raiseException: true })

    if (this._docType === 'CPF') {
      return this._docId.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        '$1.$2.$3-$4'
      )
    }
    return this._docId.replace(
      /^([\dA-Z]{2})([\dA-Z]{3})([\dA-Z]{3})([\dA-Z]{4})([\dA-Z]{2})$/,
      '$1.$2.$3/$4-$5'
    )
  }

  get value(): string {
    this.isValid({ raiseException: true })
    return this._docId
  }

  /** @deprecated Use `value` instead */
  get onlyNumbers(): string {
    return this.value
  }

  toJSON(): object {
    return {
      type: this.type,
      value: this.value,
      formatted: this.formatted,
      isValid: this._isValid,
      version: this.version,
    }
  }

  toString(): string {
    return this.formatted
  }

  isValid(config: ValidConfig = { raiseException: false }): boolean {
    if (config.raiseException && !this._isValid) {
      throw new Error(`Invalid ${this._docType.toLowerCase()}`)
    }
    return this._isValid
  }

  equals(other: CpfCnpj | unknown): boolean {
    if (!this._isValid) return false

    try {
      const otherDoc =
        other instanceof CpfCnpj ? other : new CpfCnpj(other as string)
      return this.value === otherDoc.value
    } catch {
      return false
    }
  }

  static newCpf(): CpfCnpj {
    let doc_id = ''
    for (let i = 0; i < 9; i += 1) {
      doc_id += Math.floor(Math.random() * 9)
    }
    doc_id += this.CpfVerifierDigits(doc_id)
    doc_id += this.CpfVerifierDigits(doc_id)
    return new CpfCnpj(doc_id)
  }

  static newCnpj(): CpfCnpj {
    let doc_id = ''
    for (let i = 0; i < 12; i += 1) {
      doc_id += Math.floor(Math.random() * 9)
    }
    doc_id += this.CnpjVerifierDigits(doc_id)
    doc_id += this.CnpjVerifierDigits(doc_id)
    return new CpfCnpj(doc_id)
  }

  private isCpfValid(): boolean {
    const blocklist = [
      '00000000000',
      '11111111111',
      '22222222222',
      '33333333333',
      '44444444444',
      '55555555555',
      '66666666666',
      '77777777777',
      '88888888888',
      '99999999999',
      '12345678909',
    ]
    if (blocklist.includes(this._docId)) return false

    let numbers = this._docId.slice(0, 9)
    numbers += CpfCnpj.CpfVerifierDigits(numbers)
    numbers += CpfCnpj.CpfVerifierDigits(numbers)

    return numbers.slice(-2) === this._docId.slice(-2)
  }

  private isCnpjValid(): boolean {
    const blocklist = [
      '00000000000000',
      '11111111111111',
      '22222222222222',
      '33333333333333',
      '44444444444444',
      '55555555555555',
      '66666666666666',
      '77777777777777',
      '88888888888888',
      '99999999999999',
    ]
    if (blocklist.includes(this._docId)) return false

    const base = this._docId.slice(0, 12)
    const d1 = CpfCnpj.CnpjVerifierDigits(base)
    const d2 = CpfCnpj.CnpjVerifierDigits(base + String(d1))
    const expected = String(d1) + String(d2)
    const actual = this._docId.slice(-2)
    return expected === actual
  }

  private static CpfVerifierDigits(doc_ident: string): number {
    const numbers = doc_ident.split('').map((number) => parseInt(number, 10))
    const modulus = numbers.length + 1
    const multiplied = numbers.map(
      (number, index) => number * (modulus - index)
    )
    const mod = multiplied.reduce((buffer, number) => buffer + number) % 11
    return mod < 2 ? 0 : 11 - mod
  }

  private static charToValue(char: string): number {
    const n = parseInt(char, 10)
    if (!isNaN(n)) return n
    return char.charCodeAt(0) - 55
  }

  private static CnpjVerifierDigits(doc_ident: string): number {
    let index = 2
    const reverse = doc_ident
      .split('')
      .reduce((buffer: number[], char: string) => {
        return [CpfCnpj.charToValue(char)].concat(buffer)
      }, [])

    const sum = reverse.reduce((buffer, number) => {
      buffer += number * index
      index = index === 9 ? 2 : index + 1
      return buffer
    }, 0)

    const mod = sum % 11
    return mod < 2 ? 0 : 11 - mod
  }
}

export { CpfCnpj }
