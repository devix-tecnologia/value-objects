import { CpfCnpj } from './index.js'

describe('CPF', () => {
  test('números INVALIDOS', () => {
    expect(new CpfCnpj('00000000000').isValid()).toBeFalsy()
    expect(new CpfCnpj('11111111111').isValid()).toBeFalsy()
    expect(new CpfCnpj('22222222222').isValid()).toBeFalsy()
    expect(new CpfCnpj('33333333333').isValid()).toBeFalsy()
    expect(new CpfCnpj('44444444444').isValid()).toBeFalsy()
    expect(new CpfCnpj('55555555555').isValid()).toBeFalsy()
    expect(new CpfCnpj('66666666666').isValid()).toBeFalsy()
    expect(new CpfCnpj('77777777777').isValid()).toBeFalsy()
    expect(new CpfCnpj('88888888888').isValid()).toBeFalsy()
    expect(new CpfCnpj('99999999999').isValid()).toBeFalsy()
    expect(new CpfCnpj('12345678909').isValid()).toBeFalsy()
  })

  test('rejeita valores vazios', () => {
    const doc = new CpfCnpj('')
    expect(doc.isValid()).toBeFalsy()
    expect(doc.docType).toBe('INVALID')
  })

  test('valida strings formatadas', () => {
    const doc = new CpfCnpj('295.379.955-93')
    expect(doc.isValid()).toBeTruthy()
    expect(doc.docType).toBe('CPF')
  })

  test('valida tipo CNPJ', () => {
    const doc = new CpfCnpj('77.361.576/4266-02')
    expect(doc.isValid()).toBeTruthy()
    expect(doc.docType).toBe('CNPJ')
  })

  test('valida strings não formatadas', () => {
    expect(new CpfCnpj('29537995593').isValid()).toBeTruthy()
  })

  test('valida strings de caracteres confusas', () => {
    expect(new CpfCnpj('295$379\n955...93').isValid()).toBeTruthy()
  })

  test('retorna o número não formatted', () => {
    expect(new CpfCnpj('295.379.955-93').onlyNumbers).toEqual('29537995593')
  })

  test('retorna o número formattedr', () => {
    expect(new CpfCnpj('29537995593').formatted).toEqual('295.379.955-93')
  })

  test('CNPJ gera número formatted', () => {
    const cnpj = CpfCnpj.newCnpj()

    expect(cnpj.formatted!).toMatch(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/)
    expect(new CpfCnpj(cnpj.formatted!).isValid()).toBeTruthy()
    expect(new CpfCnpj(cnpj.formatted!).docType).toBe('CNPJ')
  })

  test('CPF gera número formatted', () => {
    const cpf = CpfCnpj.newCpf()

    expect(cpf.formatted!).toMatch(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/)
    expect(new CpfCnpj(cpf.formatted!).isValid()).toBeTruthy()
    expect(new CpfCnpj(cpf.formatted!).docType).toBe('CPF')
  })

  test('igualdade de objetos', () => {
    const cpf = new CpfCnpj('29537995593')

    expect(cpf.equals('295.379.955-93')).toBeTruthy()
    expect(cpf.equals('565.001.770-02')).toBeFalsy()
  })
})
