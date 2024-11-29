interface IBaseClassNumbers {
  get formatted(): string
  get onlyNumbers(): string
  isValid(config: { raiseException: boolean }): boolean
  equals(other: unknown): boolean
}

interface IBaseClassText {
  get formatted(): string
  isValid(config: { raiseException: boolean }): boolean
  equals(other: unknown): boolean
}

export type { IBaseClassNumbers, IBaseClassText }
