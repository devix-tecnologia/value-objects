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
        '295$379_955...93', // caracteres confusos (sem letras para preservar CPF numérico)
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

  describe('CNPJ Alfanumérico (task-082)', () => {
    it('aceita CNPJ alfanumérico válido', () => {
      const doc = new CpfCnpj('BR0DEV1XABCD02')
      expect(doc.isValid()).toBe(true)
      expect(doc.type).toBe('CNPJ')
    })

    it('rejeita CNPJ alfanumérico com DV inválido', () => {
      const doc = new CpfCnpj('BR0DEV1XABCD99')
      expect(doc.isValid()).toBe(false)
      expect(doc.type).toBe('INVALID')
    })

    it('aceita CNPJ alfanumérico em letras minúsculas', () => {
      const doc = new CpfCnpj('br0dev1xabcd02')
      expect(doc.isValid()).toBe(true)
      expect(doc.type).toBe('CNPJ')
    })

    it('aceita CNPJ alfanumérico formatado', () => {
      const doc = new CpfCnpj('BR.0DE.V1X/ABCD-02')
      expect(doc.isValid()).toBe(true)
      expect(doc.type).toBe('CNPJ')
    })

    it('formata CNPJ alfanumérico corretamente', () => {
      const doc = new CpfCnpj('BR0DEV1XABCD02')
      expect(doc.formatted).toBe('BR.0DE.V1X/ABCD-02')
      expect(doc.onlyNumbers).toBe('BR0DEV1XABCD02')
    })

    it('rejeita CNPJ alfanumérico com caracteres repetidos (blocklist)', () => {
      const doc = new CpfCnpj('AAAAAAAAAAAAAA')
      expect(doc.isValid()).toBe(false)
    })

    it('compara CNPJ alfanumérico via equals', () => {
      const doc = new CpfCnpj('BR0DEV1XABCD02')
      expect(doc.equals('BR.0DE.V1X/ABCD-02')).toBe(true)
      expect(doc.equals('BR0DEV1XABCD99')).toBe(false)
    })

    it('aceita CNPJ 100% numérico válido (regressão)', () => {
      const doc = new CpfCnpj('11222333000181')
      expect(doc.isValid()).toBe(true)
      expect(doc.type).toBe('CNPJ')
    })

    it('rejeita CPF com letras (validação de DV falha para letras aleatórias)', () => {
      const doc = new CpfCnpj('ABC52998224')
      expect(doc.isValid()).toBe(false)
      expect(doc.type).toBe('INVALID')
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
        expect(cnpj.formatted).toMatch(/^[0-9A-Za-z]{2}\.[0-9A-Za-z]{3}\.[0-9A-Za-z]{3}\/[0-9A-Za-z]{4}-\d{2}$/)
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
