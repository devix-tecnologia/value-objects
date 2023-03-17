import { Telefone } from '.'

const t = new Telefone('2797643-04-74')
console.log(t.formatado)
console.log(t.toString())
console.log(t.valueOf())
console.log(t.valido())
console.log(t.paisOrigem)
console.log(t.estadoOrigem)
console.log(t.somenteNumeroSemPais)
console.log(t.igual('2-79764304-74'))
