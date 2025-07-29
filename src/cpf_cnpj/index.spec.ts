import { describe, it, expect, beforeEach } from 'vitest'
import { CpfCnpj } from './index'

describe('CpfCnpj', () => {
  describe('Validação de CPF', () => {
    const numerosInvalidos = [
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

    it.each(numerosInvalidos)('rejeita o número bloqueado %s', (numero) => {
      expect(new CpfCnpj(numero).isValid()).toBe(false)
    })

    it('aceita CPF válido em diferentes formatos', () => {
      const cpfValido = '29537995593'
      const casos = [
        cpfValido, // sem formatação
        '295.379.955-93', // formatado
        '295$379\\n955...93', // caracteres confusos
      ]

      casos.forEach((caso) => {
        const doc = new CpfCnpj(caso)
        expect(doc.isValid()).toBe(true)
        expect(doc.type).toBe('CPF')
      })
    })
  })

  describe('Validação de CNPJ', () => {
    it('aceita CNPJ válido em diferentes formatos', () => {
      const doc = new CpfCnpj('12.345.678/0001-95') // Valid CNPJ
      expect(doc.isValid()).toBe(true)
      expect(doc.type).toBe('CNPJ')
    })
  })

  describe('Validação de entrada', () => {
    it('rejeita valores vazios', () => {
      const doc = new CpfCnpj('')
      expect(doc.isValid()).toBe(false)
      expect(doc.type).toBe('INVALID')
    })
  })

  describe('Formatação', () => {
    it('formata CPF corretamente', () => {
      const doc = new CpfCnpj('29537995593')
      expect(doc.formatted).toBe('295.379.955-93')
      expect(doc.onlyNumbers).toBe('29537995593')
    })

    it('formata CNPJ corretamente', () => {
      const doc = new CpfCnpj('12345678000195')
      expect(doc.formatted).toBe('12.345.678/0001-95')
      expect(doc.onlyNumbers).toBe('12345678000195')
    })
  })

  describe('Geração de documentos', () => {
    describe('CPF', () => {
      let cpf: CpfCnpj

      beforeEach(() => {
        cpf = CpfCnpj.newCpf()
      })

      it('gera CPF válido', () => {
        expect(cpf.isValid()).toBe(true)
        expect(cpf.type).toBe('CPF')
      })

      it('formata corretamente', () => {
        expect(cpf.formatted).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      })
    })

    describe('CNPJ', () => {
      let cnpj: CpfCnpj

      beforeEach(() => {
        cnpj = CpfCnpj.newCnpj()
      })

      it('gera CNPJ válido', () => {
        expect(cnpj.isValid()).toBe(true)
        expect(cnpj.type).toBe('CNPJ')
      })

      it('formata corretamente', () => {
        expect(cnpj.formatted).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
      })
    })
  })

  describe('Comparação', () => {
    it('compara documentos corretamente', () => {
      const doc = new CpfCnpj('29537995593')
      expect(doc.equals('295.379.955-93')).toBe(true)
      expect(doc.equals('565.001.770-02')).toBe(false)
    })

    it('implementa toJSON corretamente', () => {
      const doc = new CpfCnpj('295.379.955-93')
      const json = doc.toJSON()

      expect(json).toEqual({
        type: 'CPF',
        value: '29537995593',
        formatted: '295.379.955-93',
        isValid: true,
        version: expect.any(String),
      })
    })

    it('implementa toString corretamente', () => {
      const doc = new CpfCnpj('29537995593')
      expect(doc.toString()).toBe('295.379.955-93')
    })
  })

  describe('Metadata', () => {
    it('fornece informações corretas de metadata', () => {
      const doc = new CpfCnpj('295.379.955-93')
      expect(doc.type).toBe('CPF')
      expect(doc.version).toBeDefined()
      expect(doc.validation).toContain('Módulo 11')
    })
  })
})
