import { describe, it, expect } from 'vitest';
import { ImagemBase64 } from './index';

describe('ImagemBase64', () => {
  // Base64 real de imagens mínimas para teste
  const exemplos = {
    jpeg: {
      puro: '/9j/4AAQSkZJRgABAQAAAAAAAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
      dataUri:
        'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAAAAAAD/2wBDAAgGBgcGBQgHBwcJCQgKDBQNDAsLDBkSEw8UHRofHh0aHBwgJC4nICIsIxwcKDcpLDAxNDQ0Hyc5PTgyPC4zNDL/2wBDAQkJCQwLDBgNDRgyIRwhMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjIyMjL/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k=',
    },
    png: {
      puro: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
      dataUri:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
    },
  };

  describe('Validação de formato', () => {
    it('detecta JPEG corretamente', () => {
      const img = new ImagemBase64(exemplos.jpeg.puro);
      expect(img.isValid()).toBe(true);
      expect(img.format).toBe('JPEG');
      expect(img.formatInfo.mimeType).toBe('image/jpeg');
    });

    it('detecta PNG corretamente', () => {
      const img = new ImagemBase64(exemplos.png.puro);
      expect(img.isValid()).toBe(true);
      expect(img.format).toBe('PNG');
      expect(img.formatInfo.mimeType).toBe('image/png');
    });

    it('rejeita string inválida', () => {
      const img = new ImagemBase64('invalid-base64');
      expect(img.isValid()).toBe(false);
      expect(() => img.formatInfo).toThrow(/Invalid base64 image/);
      expect(() => img.format).toThrow(/Invalid base64 image/);
    });

    it('rejeita string vazia', () => {
      const img = new ImagemBase64('');
      expect(img.isValid()).toBe(false);
    });
  });

  describe('Data URI', () => {
    it('reconhece data URI JPEG', () => {
      const img = new ImagemBase64(exemplos.jpeg.dataUri);
      expect(img.isValid()).toBe(true);
      expect(img.format).toBe('JPEG');
    });

    it('converte base64 puro para data URI', () => {
      const img = new ImagemBase64(exemplos.png.puro);
      expect(img.formatted).toBe(exemplos.png.dataUri);
    });

    it('mantém data URI original', () => {
      const img = new ImagemBase64(exemplos.jpeg.dataUri);
      expect(img.formatted).toBe(exemplos.jpeg.dataUri);
    });
  });

  describe('Serialização', () => {
    it('implementa toJSON corretamente', () => {
      const img = new ImagemBase64(exemplos.jpeg.puro);
      const json = img.toJSON();
      expect(json).toEqual({
        type: 'BASE64_IMAGE',
        formatted: exemplos.jpeg.dataUri,
        format: 'JPEG',
        isValid: true,
        version: expect.any(String),
        mimeType: 'image/jpeg',
        isDataUri: false,
      });
    });

    it('implementa toString corretamente', () => {
      const img = new ImagemBase64(exemplos.jpeg.puro);
      expect(img.toString()).toBe(exemplos.jpeg.dataUri);
    });
  });

  describe('Comparação', () => {
    it('compara imagens iguais', () => {
      const img1 = new ImagemBase64(exemplos.jpeg.puro);
      const img2 = new ImagemBase64(exemplos.jpeg.puro);
      expect(img1.equals(img2)).toBe(true);
    });

    it('compara imagem com string', () => {
      const img = new ImagemBase64(exemplos.jpeg.puro);
      expect(img.equals(exemplos.jpeg.puro)).toBe(true);
    });

    it('compara imagens diferentes', () => {
      const img1 = new ImagemBase64(exemplos.jpeg.puro);
      const img2 = new ImagemBase64(exemplos.png.puro);
      expect(img1.equals(img2)).toBe(false);
    });

    it('compara com string inválida', () => {
      const img = new ImagemBase64(exemplos.jpeg.puro);
      expect(img.equals('não é base64')).toBe(false);
    });

    it('compara data URI com base64 puro do mesmo conteúdo', () => {
      const imgDataUri = new ImagemBase64(exemplos.jpeg.dataUri);
      const imgPuro = new ImagemBase64(exemplos.jpeg.puro);
      expect(imgDataUri.equals(imgPuro)).toBe(true);
    });
  });

  describe('Tratamento de Erros', () => {
    it('lança erro ao acessar propriedades de imagem inválida', () => {
      const img = new ImagemBase64('invalid-base64');
      expect(() => img.formatted).toThrow(/Invalid base64 image/);
      expect(() => img.content).toThrow(/Invalid base64 image/);
    });

    it('lança erro quando solicitado em isValid', () => {
      const img = new ImagemBase64('invalid-base64');
      expect(() => img.isValid({ raiseException: true })).toThrow(/Invalid base64 image/);
    });
  });
});