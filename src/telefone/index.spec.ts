import { Telefone } from './index'

describe('VALIDOS - Formata Telefone a partir de string', () => {
  test('Somente DDD e número', () => {
    const tel = new Telefone('11 9 8273 1182')
    expect(tel.onlyNumbers).toBe('5511982731182')
    expect(tel.formatted).toBe('+55 11 98273-1182')
    expect(tel.isValid()).toBe(true)
    expect(tel.country).toBe('BR')
    expect(tel.estate).toBe('SP')
  })

  test('DDD COM 0 na frente e número', () => {
    const tel = new Telefone('(027) 97643-0565')
    expect(tel.onlyNumbers).toBe('5527976430565')
    expect(tel.formatted).toBe('+55 27 97643-0565')
    expect(tel.isValid()).toBe(true)
    expect(tel.country).toBe('BR')
    expect(tel.estate).toBe('ES')
  })

  test('DDD COM 0 na frente e número com 8 digitos', () => {
    const tel = new Telefone('027 7643-0565')
    expect(tel.onlyNumbers).toBe('552776430565')
    expect(tel.formatted).toBe('+55 27 7643-0565')
    expect(tel.isValid()).toBe(true)
    expect(tel.country).toBe('BR')
    expect(tel.estate).toBe('ES')
  })

  test('Numero completo com +', () => {
    const tel = new Telefone('+55 11 97643-0565')
    expect(tel.onlyNumbers).toBe('5511976430565')
    expect(tel.country).toBe('BR')
    expect(tel.estate).toBe('SP')
  })

  test('Numero completo sem +', () => {
    const tel = new Telefone('55 27 98643-0565')
    expect(tel.onlyNumbers).toBe('5527986430565')
  })
})

describe('VALIDOS - Formata Telefone a partir de objeto', () => {
  test('Brasil', () => {
    const tel = new Telefone({
      countryCode: '55',
      areaCode: '27',
      phoneNum: '97643-4333',
    })
    expect(tel.onlyNumbers).toBe('5527976434333')
    expect(tel.formatted).toBe('+55 27 97643-4333')
    expect(tel.isValid()).toBe(true)
    expect(tel.country).toBe('BR')
    expect(tel.estate).toBe('ES')
  })

  test('US', () => {
    const tel = new Telefone({
      countryCode: '+1',
      areaCode: '27',
      phoneNum: '97643-4333',
    })
    expect(tel.onlyNumbers).toBe('127976434333')
    expect(tel.formatted).toBe('+1 27 97643-4333')
    expect(tel.isValid()).toBe(true)
    expect(tel.country).toBe('US')
    expect(tel.estate).toBe(null)
  })
})

describe('INVALIDOS - Formata Telefone a partir de string', () => {
  test('Somente DDD(Inválido) e número', () => {
    const tel = new Telefone('10 97643-0565')
    expect(tel.isValid()).toBe(false)
  })

  test('String com cód pais não Brasil', () => {
    const tel = new Telefone('00 27 98643-0565')
    expect(() => new Telefone('55279997643-0565')).toThrowError(
      'Could not parse phone number from string. Try creating the record using and object { countryCode: string; areaCode: string; number: string }'
    )
  })

  test('Cod país e DDD(Inválido) e número VALID com Exception', () => {
    const tel = new Telefone('551097643-0565')
    expect(tel.isValid()).toBe(false)
    expect(() => tel.isValid({ raiseException: true })).toThrowError(
      'Invalid phone number'
    )
  })

  test('Numero invalido throw error no parsing', () => {
    expect(() => new Telefone('55279997643-0565')).toThrowError(
      'Could not parse phone number from string. Try creating the record using and object { countryCode: string; areaCode: string; number: string }'
    )
  })
})

describe('igualdade', () => {
  test('Testa várias comparações de equalsidade', () => {
    const tel = new Telefone('55 27 98643-0565')

    expect(tel.equals('5527986430565')).toBe(true)
    expect(tel.equals(new Telefone('5527986430565'))).toBe(true)
    expect(tel.equals('27986430565')).toBe(true)
    expect(tel.equals('28986430565')).toBe(false)
    expect(tel.equals(new Telefone('5528986430565'))).toBe(false)
    expect(
      tel.equals(
        new Telefone({
          areaCode: '27',
          countryCode: '58',
          phoneNum: '97643-0465',
        })
      )
    ).toBe(false)
    expect(
      tel.equals(
        new Telefone({
          areaCode: '27',
          countryCode: '55',
          phoneNum: '98643-0565',
        })
      )
    ).toBe(true)
  })
})
