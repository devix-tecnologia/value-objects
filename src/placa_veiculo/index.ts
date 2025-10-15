import { IBaseClassText, ValidConfig } from '../types/base_class.js'

type PlateFormat = 'ANTIGA' | 'MERCOSUL' | 'INVALID'

/**
 * Value Object para Placa de Veículo brasileira.
 * Suporta dois formatos:
 * - Formato Antigo: ABC1234 (3 letras + 4 números)
 * - Formato Mercosul: ABC1D23 (3 letras + 1 número + 1 letra + 2 números)
 */
class PlacaVeiculo implements IBaseClassText {
  private _plate: string
  private _format: PlateFormat
  private _isValid: boolean = false
  private static readonly VERSION = '1.0.0'

  // Letras não permitidas no padrão Mercosul na 5ª posição
  private static readonly MERCOSUL_FORBIDDEN_LETTERS = ['I', 'O', 'Q']

  constructor(plate: string) {
    const normalized = this.normalizePlate(plate)
    this._plate = normalized
    this._format = this.detectFormat(normalized)
    this._isValid = this._format !== 'INVALID'
  }

  private normalizePlate(plate: string): string {
    // Remove espaços, hífens e converte para maiúsculas
    return plate.replace(/[\s\-]+/g, '').toUpperCase()
  }

  private detectFormat(plate: string): PlateFormat {
    // Formato Antigo: ABC1234
    const oldPattern = /^[A-Z]{3}\d{4}$/
    // Formato Mercosul: ABC1D23
    const mercosulPattern = /^[A-Z]{3}\d[A-Z]\d{2}$/

    if (oldPattern.test(plate)) {
      return 'ANTIGA'
    }

    if (mercosulPattern.test(plate)) {
      // Verifica se a letra na 5ª posição não é I, O ou Q
      const fifthChar = plate[4]
      if (PlacaVeiculo.MERCOSUL_FORBIDDEN_LETTERS.includes(fifthChar)) {
        return 'INVALID'
      }
      return 'MERCOSUL'
    }

    return 'INVALID'
  }

  get type(): string {
    return 'VEHICLE_PLATE'
  }

  get version(): string {
    return PlacaVeiculo.VERSION
  }

  get validation(): string {
    return 'Validação de formato de placa brasileira (Antiga e Mercosul)'
  }

  get format(): PlateFormat {
    return this._format
  }

  get formatted(): string {
    this.isValid({ raiseException: true })

    if (this._format === 'ANTIGA') {
      // ABC-1234
      return `${this._plate.slice(0, 3)}-${this._plate.slice(3)}`
    }

    // ABC1D23 -> ABC-1D23
    return `${this._plate.slice(0, 3)}-${this._plate.slice(3)}`
  }

  get unformatted(): string {
    this.isValid({ raiseException: true })
    return this._plate
  }

  toJSON(): object {
    return {
      type: this.type,
      value: this.unformatted,
      formatted: this.formatted,
      format: this.format,
      isValid: this._isValid,
      version: this.version,
    }
  }

  toString(): string {
    return this.formatted
  }

  isValid(config: ValidConfig = { raiseException: false }): boolean {
    if (config.raiseException && !this._isValid) {
      throw new Error('Invalid vehicle plate')
    }
    return this._isValid
  }

  equals(other: PlacaVeiculo | unknown): boolean {
    if (!this._isValid) return false

    try {
      const otherPlate =
        other instanceof PlacaVeiculo
          ? other
          : new PlacaVeiculo(other as string)
      return this.unformatted === otherPlate.unformatted
    } catch {
      return false
    }
  }

  /**
   * Verifica se a placa está no formato Mercosul
   */
  isMercosul(): boolean {
    return this._format === 'MERCOSUL'
  }

  /**
   * Verifica se a placa está no formato antigo
   */
  isOldFormat(): boolean {
    return this._format === 'ANTIGA'
  }
}

export { PlacaVeiculo, type PlateFormat }
