import { ImagemBase64 } from './index.js'

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
  }

  describe('Validação de formato', () => {
    test('detecta JPEG corretamente', () => {
      const img = new ImagemBase64(exemplos.jpeg.puro)
      expect(img.isValid()).toBeTruthy()
      expect(img.format).toBe('JPEG')
      expect(img.formatInfo.mimeType).toBe('image/jpeg')
    })

    test('detecta PNG corretamente', () => {
      const img = new ImagemBase64(exemplos.png.puro)
      expect(img.isValid()).toBeTruthy()
      expect(img.format).toBe('PNG')
      expect(img.formatInfo.mimeType).toBe('image/png')
    })

    test('rejeita string inválida', () => {
      const img = new ImagemBase64('não é base64')
      expect(img.isValid()).toBeFalsy()
      expect(() => img.format).toThrow('Invalid base64 image')
    })

    test('rejeita string vazia', () => {
      const img = new ImagemBase64('')
      expect(img.isValid()).toBeFalsy()
    })
  })

  describe('Data URI', () => {
    test('reconhece data URI JPEG', () => {
      const img = new ImagemBase64(exemplos.jpeg.dataUri)
      expect(img.isValid()).toBeTruthy()
      expect(img.format).toBe('JPEG')
    })

    test('converte base64 puro para data URI', () => {
      const img = new ImagemBase64(exemplos.png.puro)
      expect(img.asDataUri).toBe(exemplos.png.dataUri)
    })

    test('mantém data URI original', () => {
      const img = new ImagemBase64(exemplos.jpeg.dataUri)
      expect(img.asDataUri).toBe(exemplos.jpeg.dataUri)
    })
  })

  describe('Serialização', () => {
    test('implementa toJSON corretamente', () => {
      const img = new ImagemBase64(exemplos.jpeg.puro)
      const json = img.toJSON()

      expect(json).toEqual({
        type: 'BASE64_IMAGE',
        format: 'JPEG',
        formatted: exemplos.jpeg.dataUri,
        isValid: true,
        version: expect.any(String),
        mimeType: 'image/jpeg',
        isDataUri: false,
      })
    })

    test('implementa toString corretamente', () => {
      const img = new ImagemBase64(exemplos.jpeg.puro)
      expect(img.toString()).toBe(exemplos.jpeg.dataUri)
    })
  })

  describe('Comparação', () => {
    test('compara imagens iguais', () => {
      const img1 = new ImagemBase64(exemplos.jpeg.puro)
      const img2 = new ImagemBase64(exemplos.jpeg.puro)
      expect(img1.equals(img2)).toBeTruthy()
    })

    test('compara imagem com string', () => {
      const img = new ImagemBase64(exemplos.jpeg.puro)
      expect(img.equals(exemplos.jpeg.puro)).toBeTruthy()
    })

    test('compara imagens diferentes', () => {
      const img1 = new ImagemBase64(exemplos.jpeg.puro)
      const img2 = new ImagemBase64(exemplos.png.puro)
      expect(img1.equals(img2)).toBeFalsy()
    })

    test('compara com string inválida', () => {
      const img = new ImagemBase64(exemplos.jpeg.puro)
      expect(img.equals('não é base64')).toBeFalsy()
    })

    test('compara data URI com base64 puro do mesmo conteúdo', () => {
      const imgDataUri = new ImagemBase64(exemplos.jpeg.dataUri)
      const imgPuro = new ImagemBase64(exemplos.jpeg.puro)
      expect(imgDataUri.equals(imgPuro)).toBeTruthy()
    })
  })

  describe('Tratamento de Erros', () => {
    test('lança erro ao acessar propriedades de imagem inválida', () => {
      const img = new ImagemBase64('não é base64')
      expect(() => img.formatted).toThrow('Invalid base64 image')
      expect(() => img.content).toThrow('Invalid base64 image')
      expect(() => img.asDataUri).toThrow('Invalid base64 image')
    })

    test('lança erro quando solicitado em isValid', () => {
      const img = new ImagemBase64('não é base64')
      expect(() => img.isValid({ raiseException: true })).toThrow(
        'Invalid base64 image'
      )
    })
  })
})
