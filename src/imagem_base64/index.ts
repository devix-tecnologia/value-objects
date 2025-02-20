import { IBaseClassText, ValidConfig } from '../types/base_class';
import { imageFormats, type ImageFormat, type ImageFormatInfo, findFormatByPrefix } from './image-formats';

/**
 * Cria objeto de valor para imagens em base64.
 * Valida se a string fornecida é uma imagem base64 válida.
 * Detecta o formato da imagem.
 * Aceita tanto strings base64 puras quanto data URIs.
 */
class ImagemBase64 implements IBaseClassText {
  private _content: string = '';
  private _format: ImageFormat = 'unknown';
  private _isValid: boolean = false;
  private _isDataUri: boolean = false;
  private static readonly VERSION = '1.0.0';

  constructor(content: string) {
    this._content = content;
    this.validate();
  }

  get type(): string {
    return 'BASE64_IMAGE';
  }

  get version(): string {
    return ImagemBase64.VERSION;
  }

  get validation(): string {
    return 'Validação de string base64 e assinatura de formato de imagem';
  }

  get formatted(): string {
    this.isValid({ raiseException: true });
    return this.asDataUri;
  }

  get content(): string {
    this.isValid({ raiseException: true });
    return this._isDataUri ? this._content.split(',')[1] : this._content;
  }

  get format(): ImageFormat {
    this.isValid({ raiseException: true });
    return this._format;
  }

  get formatInfo(): ImageFormatInfo {
    this.isValid({ raiseException: true });
    return imageFormats[this._format];
  }

  get asDataUri(): string {
    this.isValid({ raiseException: true });
    if (this._isDataUri) {
      return this._content;
    }
    return `data:image/${this._format.toLowerCase()};base64,${this._content}`;
  }

  toJSON(): object {
    if (!this._isValid) {
      return {
        type: this.type,
        isValid: false,
        version: this.version
      };
    }

    return {
      type: this.type,
      format: this.format,
      formatted: this.formatted,
      isValid: true,
      version: this.version,
      mimeType: `image/${this._format.toLowerCase()}`,
      isDataUri: this._isDataUri
    };
  }

  toString(): string {
    if (!this._isValid) return '';
    return this.formatted;
  }

  isValid(config: ValidConfig = { raiseException: false }): boolean {
    if (config.raiseException && !this._isValid) {
      throw new Error('Invalid base64 image');
    }
    return this._isValid;
  }

  equals(other: ImagemBase64 | unknown): boolean {
    if (!this._isValid) return false;
    
    try {
      const otherImage = other instanceof ImagemBase64 ? other : new ImagemBase64(other as string);
      if (!otherImage.isValid()) return false;
      
      return this.content === otherImage.content;
    } catch {
      return false;
    }
  }

  private validate(): void {
    if (!this._content || typeof this._content !== 'string') {
      return;
    }

    // Verifica se é data URI
    if (this._content.startsWith('data:image/')) {
      this._isDataUri = true;
      const [header, base64Content] = this._content.split(',');
      
      if (!base64Content || !this.isBase64String(base64Content)) {
        return;
      }

      const format = header.split('data:image/')[1].split(';')[0].toUpperCase();
      this._format = format === 'JPG' ? 'JPEG' : format as ImageFormat;
      this._isValid = true;
      return;
    }

    // Verifica se é base64 puro
    if (!this.isBase64String(this._content)) {
      return;
    }

    // Detecta o formato
    this._format = findFormatByPrefix(this._content);
    this._isValid = this._format !== 'unknown';
  }

  private isBase64String(str: string): boolean {
    if (!str) return false;
    try {
      const regex = /^([A-Za-z0-9+/]{4})*([A-Za-z0-9+/]{3}=|[A-Za-z0-9+/]{2}==)?$/;
      return regex.test(str.trim());
    } catch {
      return false;
    }
  }
}

export { ImagemBase64 };