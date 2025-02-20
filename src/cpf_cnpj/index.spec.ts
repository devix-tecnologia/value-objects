import { CpfCnpj } from './index.js'

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

    test.each(numerosInvalidos)('rejeita o número bloqueado %s', (numero) => {
      expect(new CpfCnpj(numero).isValid()).toBeFalsy()
    })

    test('aceita CPF válido em diferentes formatos', () => {
      const cpfValido = '29537995593'
      const casos = [
        cpfValido, // sem formatação
        '295.379.955-93', // formatado
        '295$379\\n955...93', // caracteres confusos
      ]

      casos.forEach((caso) => {
        const doc = new CpfCnpj(caso)
        expect(doc.isValid()).toBeTruthy()
        expect(doc.type).toBe('CPF')
      })
    })
  })

  describe('Validação de CNPJ', () => {
    test('aceita CNPJ válido em diferentes formatos', () => {
      const doc = new CpfCnpj('77.361.576/4266-02')
      expect(doc.isValid()).toBeTruthy()
      expect(doc.type).toBe('CNPJ')
    })
  })

  describe('Validação de entrada', () => {
    test('rejeita valores vazios', () => {
      const doc = new CpfCnpj('')
      expect(doc.isValid()).toBeFalsy()
      expect(doc.type).toBe('INVALID')
    })
  })

  describe('Formatação', () => {
    test('formata CPF corretamente', () => {
      const doc = new CpfCnpj('29537995593')
      expect(doc.formatted).toBe('295.379.955-93')
      expect(doc.onlyNumbers).toBe('29537995593')
    })

    test('formata CNPJ corretamente', () => {
      const doc = new CpfCnpj('77361576426602')
      expect(doc.formatted).toBe('77.361.576/4266-02')
      expect(doc.onlyNumbers).toBe('77361576426602')
    })
  })

  describe('Geração de documentos', () => {
    describe('CPF', () => {
      let cpf: CpfCnpj

      beforeEach(() => {
        cpf = CpfCnpj.newCpf()
      })

      test('gera CPF válido', () => {
        expect(cpf.isValid()).toBeTruthy()
        expect(cpf.type).toBe('CPF')
      })

      test('formata corretamente', () => {
        expect(cpf.formatted).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
      })
    })

    describe('CNPJ', () => {
      let cnpj: CpfCnpj

      beforeEach(() => {
        cnpj = CpfCnpj.newCnpj()
      })

      test('gera CNPJ válido', () => {
        expect(cnpj.isValid()).toBeTruthy()
        expect(cnpj.type).toBe('CNPJ')
      })

      test('formata corretamente', () => {
        expect(cnpj.formatted).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
      })
    })
  })

  describe('Comparação', () => {
    test('compara documentos corretamente', () => {
      const doc = new CpfCnpj('29537995593')

      expect(doc.equals('295.379.955-93')).toBeTruthy()
      expect(doc.equals('565.001.770-02')).toBeFalsy()
    })

    test('implementa toJSON corretamente', () => {
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

    test('implementa toString corretamente', () => {
      const doc = new CpfCnpj('29537995593')
      expect(doc.toString()).toBe('295.379.955-93')
    })
  })

  describe('Metadata', () => {
    test('fornece informações corretas de metadata', () => {
      const doc = new CpfCnpj('295.379.955-93')

      expect(doc.type).toBe('CPF')
      expect(doc.version).toBeDefined()
      expect(doc.validation).toContain('Módulo 11')
    })
  })
})
