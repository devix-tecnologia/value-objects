interface IBaseClassNumbers {
  get formatted(): string
  get onlyNumbers(): string
  isValid(config: { raiseException: boolean }): boolean
  equals(other: any): boolean
}

interface IBaseClassText {
  get formatted(): string
  isValid(config: { raiseException: boolean }): boolean
  equals(other: any): boolean
}

export type { IBaseClassNumbers, IBaseClassText }
