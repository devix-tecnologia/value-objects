import { describe, it, expect } from 'vitest'
import { Telefone } from './index'

describe('Telefone', () => {
  describe('Telefones Brasileiros - via string', () => {
    const casos = [
      {
        descricao: 'Somente DDD e número (9 dígitos)',
        entrada: '11 9 8273 1182',
        esperado: {
          onlyNumbers: '5511982731182',
          formatted: '+55 11 98273-1182',
          estate: 'SP',
        },
      },
      {
        descricao: 'DDD com 0 na frente e número (9 dígitos)',
        entrada: '(027) 97643-0565',
        esperado: {
          onlyNumbers: '5527976430565',
          formatted: '+55 27 97643-0565',
          estate: 'ES',
        },
      },
      {
        descricao: 'DDD com 0 na frente e número (8 dígitos)',
        entrada: '027 7643-0565',
        esperado: {
          onlyNumbers: '552776430565',
          formatted: '+55 27 7643-0565',
          estate: 'ES',
        },
      },
      {
        descricao: 'DDD sem 0 na frente e número (8 dígitos)',
        entrada: '2735577789',
        esperado: {
          onlyNumbers: '552735577789',
          formatted: '+55 27 3557-7789',
          estate: 'ES',
        },
      },
      {
        descricao: 'Número completo com + (9 dígitos)',
        entrada: '+55 11 97643-0565',
        esperado: {
          onlyNumbers: '5511976430565',
          formatted: '+55 11 97643-0565',
          estate: 'SP',
        },
      },
    ]

    it.each(casos)('$descripcion', ({ entrada, esperado }) => {
      const tel = new Telefone(entrada)
      expect(tel.isValid()).toBe(true)
      expect(tel.onlyNumbers).toBe(esperado.onlyNumbers)
      expect(tel.formatted).toBe(esperado.formatted)
      expect(tel.country).toBe('BR')
      expect(tel.estate).toBe(esperado.estate)
      expect(tel.type).toBe('PHONE')
      expect(tel.version).toBeDefined()
      expect(tel.validation).toBe(
        'Validação de DDD brasileiro e código de país'
      )
    })
  })

  describe('Telefones via objeto', () => {
    it('Brasil - valida número com objeto', () => {
      const tel = new Telefone({
        countryCode: '55',
        areaCode: '27',
        phoneNum: '97643-4333',
      })

      expect(tel.isValid()).toBe(true)
      expect(tel.onlyNumbers).toBe('5527976434333')
      expect(tel.formatted).toBe('+55 27 97643-4333')
      expect(tel.country).toBe('BR')
      expect(tel.estate).toBe('ES')
      expect(tel.validation).toBe(
        'Validação de DDD brasileiro e código de país'
      )
    })

    it('Estados Unidos - valida número com objeto', () => {
      const tel = new Telefone({
        countryCode: '+1',
        areaCode: '27',
        phoneNum: '97643-4333',
      })

      expect(tel.isValid()).toBe(true)
      expect(tel.onlyNumbers).toBe('127976434333')
      expect(tel.formatted).toBe('+1 27 97643-4333')
      expect(tel.country).toBe('US')
      expect(tel.estate).toBeNull()
      expect(tel.validation).toBe('Validação de código de país')
    })
  })

  describe('Validações de telefones inválidos', () => {
    it('rejeita DDD inválido', () => {
      const tel = new Telefone('10 97643-0565')
      expect(tel.isValid()).toBe(false)
    })

    it('rejeita string com código de país não suportado', () => {
      expect(() => new Telefone('+999 27 97643-0565')).toThrow(
        'Could not parse phone number from string. Try creating the record using an object { countryCode: string; areaCode: string; phoneNum: string }'
      )
    })

    it('lança exceção quando solicitado para número inválido', () => {
      const tel = new Telefone('551097643-0565')
      expect(tel.isValid()).toBe(false)
      expect(() => tel.isValid({ raiseException: true })).toThrow(
        'Invalid phone number'
      )
    })
  })

  describe('Serialização', () => {
    it('implementa toJSON corretamente', () => {
      const tel = new Telefone('27976430565')
      const json = tel.toJSON()

      expect(json).toEqual({
        type: 'PHONE',
        value: '5527976430565',
        formatted: '+55 27 97643-0565',
        isValid: true,
        version: expect.any(String),
        country: 'BR',
        estate: 'ES',
      })
    })

    it('implementa toString corretamente', () => {
      const tel = new Telefone('27976430565')
      expect(tel.toString()).toBe('+55 27 97643-0565')
    })
  })

  describe('Comparações de igualdade', () => {
    it('compara diferentes formatos do mesmo número', () => {
      const tel = new Telefone('55 27 98643-0565')
      const comparacoes = [
        { valor: '5527986430565', esperado: true },
        { valor: new Telefone('5527986430565'), esperado: true },
        { valor: '27986430565', esperado: true },
        { valor: '28986430565', esperado: false },
        { valor: new Telefone('5528986430565'), esperado: false },
        {
          valor: new Telefone({
            areaCode: '27',
            countryCode: '58',
            phoneNum: '97643-0465',
          }),
          esperado: false,
        },
        {
          valor: new Telefone({
            areaCode: '27',
            countryCode: '55',
            phoneNum: '98643-0565',
          }),
          esperado: true,
        },
      ]

      comparacoes.forEach(({ valor, esperado }) => {
        expect(tel.equals(valor)).toBe(esperado)
      })
    })
  })
})
