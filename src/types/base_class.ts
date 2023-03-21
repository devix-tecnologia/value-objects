interface IBaseClassNumbers {
  get formatted(): string
  get onlyNumbers(): string
  isValid(): boolean
  equals(other: any): boolean
}

interface IBaseClassText {
  get formatted(): string
  isValid(): boolean
  equals(other: any): boolean
}

export type { IBaseClassNumbers, IBaseClassText }
