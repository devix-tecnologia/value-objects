import { countryCodes } from './country_codes.js'
import { DDD } from './ddd.js'
import { IBaseClassNumbers, ValidConfig } from '../types/base_class.js'

interface PhoneInput {
  countryCode: string
  areaCode: string
  phoneNum: string
}

/**
 * Cria objeto de valor para número de telefone.
 * Valida DDD e código do país.
 * É possível cadastrar usando formato string para números Brasileiros.
 * Aceita formatos como: 27 97645-5555 ou 55 27 97645-5555.
 * Desconsidera espaços e qq caracter não numérico
 */
class Telefone implements IBaseClassNumbers {
  private _phoneNum: string = ''
  private _areaCode: string = ''
  private _countryCode: string = ''
  private _isValid: boolean = false
  private static readonly VERSION = '1.0.0'

  constructor(phoneNum: string | PhoneInput) {
    if (typeof phoneNum === 'string') {
      this.parseFromString(phoneNum)
    } else {
      this.parseFromObject(phoneNum)
    }
  }

  private parseFromString(phoneStr: string): void {
    let tel = phoneStr.replace(/[^\d]+/g, '')

    if ((tel.length === 12 || tel.length === 11) && tel[0] === '0') {
      tel = tel.slice(1)
    }

    if (tel.length === 10 || tel.length === 11) {
      this._countryCode = '55'
      this._areaCode = tel.slice(0, 2)
      this._phoneNum = tel.slice(2)
      this._isValid = this.isDDDValid()
    } else if (tel.length === 12 || tel.length === 13) {
      this._countryCode = tel.slice(0, 2)
      this._areaCode = tel.slice(2, 4)
      this._phoneNum = tel.slice(4)
      this._isValid = this.isDDDValid() && this._countryCode === '55'
    } else {
      throw new Error(
        'Could not parse phone number from string. Try creating the record using an object { countryCode: string; areaCode: string; phoneNum: string }'
      )
    }
  }

  private parseFromObject(phone: PhoneInput): void {
    this._countryCode = phone.countryCode.replace(/[^\d]+/g, '')
    this._areaCode = phone.areaCode.replace(/[^\d]+/g, '')
    this._phoneNum = phone.phoneNum.replace(/[^\d]+/g, '')

    if (this._countryCode === '55') {
      this._isValid = this.isDDDValid() && this.isCountryCodeValid()
    } else {
      this._isValid = this.isCountryCodeValid()
    }
  }

  get type(): string {
    return 'PHONE'
  }

  get version(): string {
    return Telefone.VERSION
  }

  get validation(): string {
    if (this._countryCode === '55') {
      return 'Validação de DDD brasileiro e código de país'
    }
    return 'Validação de código de país'
  }

  get formatted(): string {
    this.isValid({ raiseException: true })
    const num = this._phoneNum.split('')
    const lastDigits = num.splice(-4, 4)
    return `+${this._countryCode} ${this._areaCode} ${num.join('')}-${lastDigits.join('')}`
  }

  get onlyNumbers(): string {
    this.isValid({ raiseException: true })
    return `${this._countryCode}${this._areaCode}${this._phoneNum}`
  }

  get country(): string {
    return countryCodes[this._countryCode].code
  }

  get estate(): string | null {
    if (this._countryCode === '55') return DDD[this._areaCode]
    return null
  }

  toJSON(): object {
    return {
      type: this.type,
      value: this.onlyNumbers,
      formatted: this.formatted,
      isValid: this._isValid,
      version: this.version,
      country: this.country,
      estate: this.estate,
    }
  }

  toString(): string {
    return this.formatted
  }

  isValid(config: ValidConfig = { raiseException: false }): boolean {
    if (config.raiseException && !this._isValid) {
      throw new Error('Invalid phone number')
    }
    return this._isValid
  }

  equals(other: Telefone | unknown): boolean {
    if (!this._isValid) return false

    try {
      const otherPhone =
        other instanceof Telefone ? other : new Telefone(other as string)
      return this.onlyNumbers === otherPhone.onlyNumbers
    } catch {
      return false
    }
  }

  private isDDDValid(): boolean {
    return DDD[this._areaCode] !== undefined
  }

  private isCountryCodeValid(): boolean {
    return countryCodes[this._countryCode] !== undefined
  }
}

export { Telefone, type PhoneInput }
