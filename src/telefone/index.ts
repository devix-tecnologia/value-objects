import { countryCodes } from './country_codes'
import { DDD } from './ddd'
import { IBaseClassNumbers } from '../types/base_class'
/**
 * Cria objeto de valor para número de telefone.
 * Valida DDD e código do país.
 * É possível cadastrar usando formato string para números Brasileiros.
 * Aceita formatos como: 27 97645-5555 ou 55 27 97645-5555.
 * Desconsidera espaços e qq caracter não numérico
 */
class Telefone implements IBaseClassNumbers {
  private _phoneNum: string
  private _areaCode: string
  private _countryCode: string
  private _isValid: boolean

  constructor(
    phoneNum:
      | string
      | { countryCode: string; areaCode: string; phoneNum: string }
  ) {
    if (typeof phoneNum === 'string') {
      let tel = phoneNum.replace(/[^\d]+/g, '')
      if ((tel.length === 12 || tel.length === 11) && tel[0] === '0') {
        tel = tel.slice(1)
      }
      this._isValid = false
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
          'Could not parse phone number from string. Try creating the record using and object { countryCode: string; areaCode: string; number: string }'
        )
      }
    } else {
      this._countryCode = phoneNum.countryCode.replace(/[^\d]+/g, '')
      this._areaCode = phoneNum.areaCode.replace(/[^\d]+/g, '')
      this._phoneNum = phoneNum.phoneNum.replace(/[^\d]+/g, '')
      if (this._countryCode === '55') {
        this._isValid = this.isDDDValid() && this.isCountryCodeValid()
      } else {
        this._isValid = this.isCountryCodeValid()
      }
    }
  }

  get formatted() {
    if (!this._isValid) return 'INVALID'

    const num = this._phoneNum.split('')
    const lastDigits = num.splice(-4, 4)
    return `+${this._countryCode} ${this._areaCode} ${num.join(
      ''
    )}-${lastDigits.join('')}`
  }

  get onlyNumbers() {
    if (!this._isValid) return 'INVALID'

    return `${this._countryCode}${this._areaCode}${this._phoneNum}`
  }

  get country() {
    return countryCodes[this._countryCode].code
  }

  get estate() {
    if (this._countryCode === '55') return DDD[this._areaCode]
    return null
  }

  isValid(config: { raiseException: boolean } = { raiseException: false }) {
    if (config.raiseException && !this._isValid) {
      throw new Error('Invalid phone number')
    }
    return this._isValid
  }

  equals(otherPhone: Telefone | string): boolean {
    if (!this._isValid) return false

    if (otherPhone instanceof Telefone) {
      return this.onlyNumbers === otherPhone.onlyNumbers
    } else {
      return this.onlyNumbers === new Telefone(otherPhone).onlyNumbers
    }
  }

  private isDDDValid() {
    return DDD[this._areaCode] !== undefined
  }

  private isCountryCodeValid() {
    return countryCodes[this._countryCode] !== undefined
  }
}

export { Telefone }
