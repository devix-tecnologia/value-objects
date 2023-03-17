import codPaises from './country_codes.json'
import DDD from './ddd.json'

/**
 * Cria objeto de valor para número de telefone.
 * Valida DDD e código do país.
 * É possível cadastrar usando formato string para números Brasileiros.
 * Aceita formatos como: 27 97645-5555 ou 55 27 97645-5555.
 * Desconsidera espaços e qq caracter não numérico
 */
class Telefone {
  private _numeroPrincipal: string
  private _codArea: string
  private _codPais: string
  private _isValid: boolean

  constructor(
    numero: string | { cod_pais: string; cod_area: string; numero: string }
  ) {
    if (typeof numero === 'string') {
      const tel = numero.replace(/[^\d]+/g, '')
      this._isValid = false
      if (tel.length === 10 || tel.length === 11) {
        this._codPais = '55'
        this._codArea = tel.slice(0, 2)
        this._numeroPrincipal = tel.slice(2)
        this._isValid = this.validaDDD()
      } else if (tel.length === 12 || tel.length === 13) {
        this._codPais = tel.slice(0, 2)
        this._codArea = tel.slice(2, 4)
        this._numeroPrincipal = tel.slice(4)
        this._isValid = this.validaDDD() && this._codPais === '55'
      } else {
        throw new Error(
          'Não foi possível fazer o parsing do número. Tente cadastrar usando o formato { cod_pais: string; cod_area: string; numero: string } '
        )
      }
    } else {
      this._codPais = numero.cod_pais.replace(/[^\d]+/g, '')
      this._codArea = numero.cod_area.replace(/[^\d]+/g, '')
      this._numeroPrincipal = numero.numero.replace(/[^\d]+/g, '')
      this._isValid = this.validaDDD() && this.validaCodPais()
    }
  }

  get formatado() {
    if (!this._isValid) return 'Telefone inválido'

    const num = this._numeroPrincipal.split('')
    const lastDigits = num.splice(-4, 4)
    return `+${this._codPais} ${this._codArea} ${num.join(
      ''
    )}-${lastDigits.join('')}`
  }

  get somenteNumero() {
    if (!this._isValid) return 'Telefone inválido'

    return `${this._codPais}${this._codArea}${this._numeroPrincipal}`
  }

  get somenteNumeroSemPais() {
    if (!this._isValid) return 'Telefone inválido'

    return `${this._codArea}${this._numeroPrincipal}`
  }

  get paisOrigem() {
    return codPaises[this._codPais].name
  }

  get estadoOrigem() {
    return DDD[this._codArea]
  }

  toString() {
    return this.formatado
  }

  valueOf() {
    return this.somenteNumero
  }

  valido(raiseException: boolean = false) {
    if (raiseException && !this._isValid) {
      throw new Error('Número de telefone inválido')
    }
    return this._isValid
  }

  igual(outro_tel: Telefone | string): boolean {
    if (!this._isValid) return false

    if (outro_tel instanceof Telefone) {
      return this.somenteNumero === outro_tel.somenteNumero
    } else {
      return this.somenteNumero === new Telefone(outro_tel).somenteNumero
    }
  }

  private validaDDD() {
    return DDD[this._codArea] !== undefined
  }

  private validaCodPais() {
    return codPaises[this._codPais] !== undefined
  }
}

export { Telefone }
