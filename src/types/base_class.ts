interface ValidConfig {
  raiseException: boolean;
}

interface IMetadata {
  get type(): string;        // tipo do valor (CPF, CNPJ, Base64Image, etc)
  get version(): string;     // versão da implementação
  get validation(): string;  // regras de validação aplicadas
}

interface IBaseClass<T> extends IMetadata {
  get formatted(): string;
  isValid(config: ValidConfig): boolean;
  equals(other: T | unknown): boolean;
  toJSON(): object;
  toString(): string;
}

interface IBaseClassNumbers extends IBaseClass<IBaseClassNumbers> {
  get onlyNumbers(): string
}

interface IBaseClassText extends IBaseClass<IBaseClassText> {
}

interface IBase64<T = unknown> extends IBaseClass<T> {
  get onlyContent(): string;
  get asDataUri(): string;
}

export type { IBaseClassNumbers, IBaseClassText, IBase64, ValidConfig }
