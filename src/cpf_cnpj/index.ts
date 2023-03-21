import { IBaseClassNumbers } from '../types/base_class'

class CpfCnpj implements IBaseClassNumbers {
  private _docId: string
  private _docType: 'CPF' | 'CNPJ' | 'INVALID'
  private _isValid: boolean = false

  constructor(numDoc: string | number) {
    const doc = String(numDoc).replace(/[^\d]+/g, '')
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

  get formatted() {
    this.isValid({ raiseException: true })

    if (this._docType === 'CPF') {
      return this._docId.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        '$1.$2.$3-$4'
      )
    }
    return this._docId.replace(
      /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
      '$1.$2.$3/$4-$5'
    )
  }

  get onlyNumbers() {
    this.isValid({ raiseException: true })

    return this._docId
  }

  get docType() {
    return this._docType
  }

  isValid(config: { raiseException: boolean } = { raiseException: false }) {
    if (config.raiseException && !this._isValid) {
      throw new Error('Invalid document')
    }
    return this._isValid
  }

  equals(other: CpfCnpj | string): boolean {
    if (!this._isValid) return false

    if (other instanceof CpfCnpj) {
      return this._docId === other.onlyNumbers
    } else {
      return this._docId === new CpfCnpj(other).onlyNumbers
    }
  }

  /* 
  CNPJ
  **/
  static newCnpj() {
    let doc_id: string = ''

    for (let i = 0; i < 12; i += 1) {
      doc_id += Math.floor(Math.random() * 9)
    }

    doc_id += this.CnpjVerifierDigits(doc_id)
    doc_id += this.CnpjVerifierDigits(doc_id)
    return new CpfCnpj(doc_id)
  }

  private isCnpjValid() {
    const blocklist: string[] = [
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

    return true
  }

  private static CnpjVerifierDigits(doc_ident: string) {
    let index: number = 2
    const reverse: Array<number> = doc_ident
      .split('')
      .reduce((buffer: number[], number: string) => {
        return [parseInt(number, 10)].concat(buffer)
      }, [])

    const sum: number = reverse.reduce((buffer, number) => {
      buffer += number * index
      index = index === 9 ? 2 : index + 1
      return buffer
    }, 0)

    const mod: number = sum % 11
    return mod < 2 ? 0 : 11 - mod
  }

  /* 
  CPF
  **/

  static newCpf() {
    let doc_id: string = ''

    for (let i = 0; i < 9; i += 1) {
      doc_id += Math.floor(Math.random() * 9)
    }

    doc_id += this.CpfVerifierDigits(doc_id)
    doc_id += this.CpfVerifierDigits(doc_id)
    return new CpfCnpj(doc_id)
  }

  private isCpfValid() {
    const blocklist: string[] = [
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

    let numbers: string = this._docId.slice(0, 9)
    numbers += CpfCnpj.CpfVerifierDigits(numbers)
    numbers += CpfCnpj.CpfVerifierDigits(numbers)

    return numbers.slice(-2) === this._docId.slice(-2)
  }
  private static CpfVerifierDigits(doc_ident: string) {
    const numbers: Array<number> = doc_ident.split('').map((number) => {
      return parseInt(number, 10)
    })

    const modulus: number = numbers.length + 1
    const multiplied: Array<number> = numbers.map(
      (number, index) => number * (modulus - index)
    )
    const mod: number =
      multiplied.reduce((buffer, number) => buffer + number) % 11

    return mod < 2 ? 0 : 11 - mod
  }
}

export { CpfCnpj }
