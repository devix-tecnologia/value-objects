import { Telefone } from './index.js'

describe('Telefone', () => {
  describe('Telefones Brasileiros - via string', () => {
    const casos = [
      {
        descricao: 'Somente DDD e número',
        entrada: '11 9 8273 1182',
        esperado: {
          onlyNumbers: '5511982731182',
          formatted: '+55 11 98273-1182',
          estate: 'SP',
        },
      },
      {
        descricao: 'DDD COM 0 na frente e número',
        entrada: '(027) 97643-0565',
        esperado: {
          onlyNumbers: '5527976430565',
          formatted: '+55 27 97643-0565',
          estate: 'ES',
        },
      },
      {
        descricao: 'DDD COM 0 na frente e número com 8 digitos',
        entrada: '027 7643-0565',
        esperado: {
          onlyNumbers: '552776430565',
          formatted: '+55 27 7643-0565',
          estate: 'ES',
        },
      },
      {
        descricao: 'DDD SEM 0 na frente e número com 8 digitos',
        entrada: '2735577789',
        esperado: {
          onlyNumbers: '552735577789',
          formatted: '+55 27 3557-7789',
          estate: 'ES',
        },
      },
      {
        descricao: 'Numero completo com +',
        entrada: '+55 11 97643-0565',
        esperado: {
          onlyNumbers: '5511976430565',
          formatted: '+55 11 97643-0565', // Adicionado o formato esperado
          estate: 'SP',
        },
      },
    ]

    test.each(casos)('$descricao', ({ entrada, esperado }) => {
      const tel = new Telefone(entrada)
      expect(tel.isValid()).toBeTruthy()
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
    test('Brasil', () => {
      const tel = new Telefone({
        countryCode: '55',
        areaCode: '27',
        phoneNum: '97643-4333',
      })

      expect(tel.isValid()).toBeTruthy()
      expect(tel.onlyNumbers).toBe('5527976434333')
      expect(tel.formatted).toBe('+55 27 97643-4333')
      expect(tel.country).toBe('BR')
      expect(tel.estate).toBe('ES')
      expect(tel.validation).toBe(
        'Validação de DDD brasileiro e código de país'
      )
    })

    test('Estados Unidos', () => {
      const tel = new Telefone({
        countryCode: '+1',
        areaCode: '27',
        phoneNum: '97643-4333',
      })

      expect(tel.isValid()).toBeTruthy()
      expect(tel.onlyNumbers).toBe('127976434333')
      expect(tel.formatted).toBe('+1 27 97643-4333')
      expect(tel.country).toBe('US')
      expect(tel.estate).toBeNull()
      expect(tel.validation).toBe('Validação de código de país')
    })
  })

  describe('Validações de telefones inválidos', () => {
    test('rejeita DDD inválido', () => {
      const tel = new Telefone('10 97643-0565')
      expect(tel.isValid()).toBeFalsy()
    })

    test('rejeita string com código de país não Brasil', () => {
      expect(() => new Telefone('55279997643-0565')).toThrow(
        'Could not parse phone number from string. Try creating the record using an object { countryCode: string; areaCode: string; phoneNum: string }'
      )
    })

    test('lança exceção quando solicitado para número inválido', () => {
      const tel = new Telefone('551097643-0565')
      expect(tel.isValid()).toBeFalsy()
      expect(() => tel.isValid({ raiseException: true })).toThrow(
        'Invalid phone number'
      )
    })
  })

  describe('Serialização', () => {
    test('implementa toJSON corretamente', () => {
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

    test('implementa toString corretamente', () => {
      const tel = new Telefone('27976430565')
      expect(tel.toString()).toBe('+55 27 97643-0565')
    })
  })

  describe('Comparações de igualdade', () => {
    test('compara diferentes formatos do mesmo número', () => {
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
