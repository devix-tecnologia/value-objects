import { describe, it, expect } from 'vitest'
import { PlacaVeiculo } from './index'

describe('PlacaVeiculo', () => {
  describe('Formato Antigo (ABC1234)', () => {
    it('aceita placa antiga válida sem formatação', () => {
      const placa = new PlacaVeiculo('ABC1234')
      expect(placa.isValid()).toBe(true)
      expect(placa.format).toBe('ANTIGA')
      expect(placa.isOldFormat()).toBe(true)
      expect(placa.isMercosul()).toBe(false)
    })

    it('aceita placa antiga com hífen', () => {
      const placa = new PlacaVeiculo('ABC-1234')
      expect(placa.isValid()).toBe(true)
      expect(placa.format).toBe('ANTIGA')
      expect(placa.formatted).toBe('ABC-1234')
    })

    it('aceita placa antiga com espaços', () => {
      const placa = new PlacaVeiculo('ABC 1234')
      expect(placa.isValid()).toBe(true)
      expect(placa.unformatted).toBe('ABC1234')
    })

    it('aceita placa antiga em letras minúsculas', () => {
      const placa = new PlacaVeiculo('abc1234')
      expect(placa.isValid()).toBe(true)
      expect(placa.unformatted).toBe('ABC1234')
    })

    it('formata corretamente placa antiga', () => {
      const placa = new PlacaVeiculo('XYZ9876')
      expect(placa.formatted).toBe('XYZ-9876')
    })
  })

  describe('Formato Mercosul (ABC1D23)', () => {
    it('aceita placa Mercosul válida sem formatação', () => {
      const placa = new PlacaVeiculo('ABC1D23')
      expect(placa.isValid()).toBe(true)
      expect(placa.format).toBe('MERCOSUL')
      expect(placa.isMercosul()).toBe(true)
      expect(placa.isOldFormat()).toBe(false)
    })

    it('aceita placa Mercosul com hífen', () => {
      const placa = new PlacaVeiculo('ABC-1D23')
      expect(placa.isValid()).toBe(true)
      expect(placa.formatted).toBe('ABC-1D23')
    })

    it('aceita placa Mercosul com espaços', () => {
      const placa = new PlacaVeiculo('ABC 1D23')
      expect(placa.isValid()).toBe(true)
      expect(placa.unformatted).toBe('ABC1D23')
    })

    it('aceita placa Mercosul em letras minúsculas', () => {
      const placa = new PlacaVeiculo('abc1d23')
      expect(placa.isValid()).toBe(true)
      expect(placa.unformatted).toBe('ABC1D23')
    })

    it('formata corretamente placa Mercosul', () => {
      const placa = new PlacaVeiculo('XYZ9A87')
      expect(placa.formatted).toBe('XYZ-9A87')
    })

    it('rejeita placa Mercosul com letra I na 5ª posição', () => {
      const placa = new PlacaVeiculo('ABC1I23')
      expect(placa.isValid()).toBe(false)
      expect(placa.format).toBe('INVALID')
    })

    it('rejeita placa Mercosul com letra O na 5ª posição', () => {
      const placa = new PlacaVeiculo('ABC1O23')
      expect(placa.isValid()).toBe(false)
    })

    it('rejeita placa Mercosul com letra Q na 5ª posição', () => {
      const placa = new PlacaVeiculo('ABC1Q23')
      expect(placa.isValid()).toBe(false)
    })
  })

  describe('Validação de entrada', () => {
    it('rejeita placa vazia', () => {
      const placa = new PlacaVeiculo('')
      expect(placa.isValid()).toBe(false)
    })

    it('rejeita placa com formato inválido', () => {
      const placa = new PlacaVeiculo('ABC123')
      expect(placa.isValid()).toBe(false)
    })

    it('rejeita placa com números no lugar de letras', () => {
      const placa = new PlacaVeiculo('1BC1234')
      expect(placa.isValid()).toBe(false)
    })

    it('rejeita placa com letras no lugar de números (formato antigo)', () => {
      const placa = new PlacaVeiculo('ABCD234')
      expect(placa.isValid()).toBe(false)
    })

    it('rejeita placa muito curta', () => {
      const placa = new PlacaVeiculo('AB123')
      expect(placa.isValid()).toBe(false)
    })

    it('rejeita placa muito longa', () => {
      const placa = new PlacaVeiculo('ABC12345')
      expect(placa.isValid()).toBe(false)
    })

    it('rejeita placa com caracteres especiais', () => {
      const placa = new PlacaVeiculo('ABC@1234')
      expect(placa.isValid()).toBe(false)
    })
  })

  describe('isValid com raiseException', () => {
    it('lança exceção quando placa é inválida e raiseException é true', () => {
      const placa = new PlacaVeiculo('INVALID')
      expect(() => placa.isValid({ raiseException: true })).toThrow(
        'Invalid vehicle plate'
      )
    })

    it('não lança exceção quando placa é válida', () => {
      const placa = new PlacaVeiculo('ABC1234')
      expect(() => placa.isValid({ raiseException: true })).not.toThrow()
    })

    it('lança exceção ao acessar formatted em placa inválida', () => {
      const placa = new PlacaVeiculo('INVALID')
      expect(() => placa.formatted).toThrow('Invalid vehicle plate')
    })

    it('lança exceção ao acessar unformatted em placa inválida', () => {
      const placa = new PlacaVeiculo('INVALID')
      expect(() => placa.unformatted).toThrow('Invalid vehicle plate')
    })
  })

  describe('equals', () => {
    it('compara duas placas iguais corretamente', () => {
      const placa1 = new PlacaVeiculo('ABC1234')
      const placa2 = new PlacaVeiculo('abc-1234')
      expect(placa1.equals(placa2)).toBe(true)
    })

    it('compara duas placas diferentes corretamente', () => {
      const placa1 = new PlacaVeiculo('ABC1234')
      const placa2 = new PlacaVeiculo('XYZ9876')
      expect(placa1.equals(placa2)).toBe(false)
    })

    it('compara placa com string', () => {
      const placa = new PlacaVeiculo('ABC1234')
      expect(placa.equals('ABC-1234')).toBe(true)
    })

    it('retorna false ao comparar placa inválida', () => {
      const placa = new PlacaVeiculo('INVALID')
      expect(placa.equals('ABC1234')).toBe(false)
    })

    it('retorna false ao comparar com string inválida', () => {
      const placa = new PlacaVeiculo('ABC1234')
      expect(placa.equals('INVALID')).toBe(false)
    })

    it('compara placas Mercosul iguais', () => {
      const placa1 = new PlacaVeiculo('ABC1D23')
      const placa2 = new PlacaVeiculo('ABC-1D23')
      expect(placa1.equals(placa2)).toBe(true)
    })
  })

  describe('toJSON', () => {
    it('retorna JSON com todos os campos para placa antiga', () => {
      const placa = new PlacaVeiculo('ABC1234')
      const json = placa.toJSON()
      expect(json).toEqual({
        type: 'VEHICLE_PLATE',
        value: 'ABC1234',
        formatted: 'ABC-1234',
        format: 'ANTIGA',
        isValid: true,
        version: '1.0.0',
      })
    })

    it('retorna JSON com todos os campos para placa Mercosul', () => {
      const placa = new PlacaVeiculo('ABC1D23')
      const json = placa.toJSON()
      expect(json).toEqual({
        type: 'VEHICLE_PLATE',
        value: 'ABC1D23',
        formatted: 'ABC-1D23',
        format: 'MERCOSUL',
        isValid: true,
        version: '1.0.0',
      })
    })
  })

  describe('toString', () => {
    it('retorna placa formatada', () => {
      const placa = new PlacaVeiculo('ABC1234')
      expect(placa.toString()).toBe('ABC-1234')
    })

    it('retorna placa Mercosul formatada', () => {
      const placa = new PlacaVeiculo('ABC1D23')
      expect(placa.toString()).toBe('ABC-1D23')
    })
  })

  describe('Métodos de verificação de tipo', () => {
    it('identifica corretamente formato antigo', () => {
      const placa = new PlacaVeiculo('ABC1234')
      expect(placa.type).toBe('VEHICLE_PLATE')
      expect(placa.version).toBe('1.0.0')
      expect(placa.validation).toBe(
        'Validação de formato de placa brasileira (Antiga e Mercosul)'
      )
    })
  })
})
