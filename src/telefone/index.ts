class Telefone {
  private _numeroPrincipal: number
  private _codArea: number
  private _codPais: number
  private _isValid: boolean

  constructor(numDoc: string | number) {
    const onlyNumbers = String(numDoc).replace(/[^\d]+/g, '')
    // TODO: Fazer validação e separar numero em pedaços
  }

  get formatado() {
    if (!this.valido) return 'Documento inválido'

    // if (this._doc_type === 'CPF') {
    //   return this._doc_ident.replace(
    //     /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
    //     '$1.$2.$3-$4'
    //   )
    // } else if (this._doc_type === 'CNPJ') {
    //   return this._doc_ident.replace(
    //     /^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})$/,
    //     '$1.$2.$3/$4-$5'
    //   )
    // }
  }

  get somenteNumero() {
    if (!this.valido) return 'Telefone inválido'

    return `${this._codPais}${this._codArea}${this._numeroPrincipal}`
  }

  valido() {
    return this._isValid
  }

  igual(outro_tel: Telefone | string): boolean {
    if (outro_tel instanceof Telefone) {
      return this.somenteNumero === outro_tel.somenteNumero
    } else {
      return this.somenteNumero === new Telefone(outro_tel).somenteNumero
    }
  }
}

export { Telefone }
