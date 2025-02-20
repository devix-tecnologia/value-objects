interface ImageFormatInfo {
    name: string;
    extension: string;
    mimeType: string;
    base64Prefix: string[];
  }
  
  const imageFormats: Record<string, ImageFormatInfo> = {
     'JPEG': {
      name: 'JPEG Image',
      extension: 'jpg',
      mimeType: 'image/jpeg',
      base64Prefix: ['/9j/']
    },
    'PNG': {
      name: 'Portable Network Graphics',
      extension: 'png',
      mimeType: 'image/png',
      base64Prefix: ['iVBORw0KGgo']
    },
    'GIF': {
      name: 'Graphics Interchange Format',
      extension: 'gif',
      mimeType: 'image/gif',
      base64Prefix: ['R0lGODlh']
    },
    'WEBP': {
      name: 'WebP Image',
      extension: 'webp',
      mimeType: 'image/webp',
      base64Prefix: ['UklGRg==']
    },
    'BMP': {
      name: 'Bitmap Image File',
      extension: 'bmp',
      mimeType: 'image/bmp',
      base64Prefix: ['Qk']
    },
    'TIFF': {
      name: 'Tagged Image File Format',
      extension: 'tiff',
      mimeType: 'image/tiff',
      base64Prefix: ['SUkqAA==', 'TU0AKg==']
    },
    'ICO': {
      name: 'Windows Icon',
      extension: 'ico',
      mimeType: 'image/x-icon',
      base64Prefix: ['AAABAAEAICAQAAEABADoAgAAFg==']
    },
    'SVG': {
      name: 'Scalable Vector Graphics',
      extension: 'svg',
      mimeType: 'image/svg+xml',
      base64Prefix: ['PHN2Zw==']
    },
    'HEIC': {
      name: 'High Efficiency Image Format',
      extension: 'heic',
      mimeType: 'image/heic',
      base64Prefix: ['AAAAGGZ0eXA=']
    },
    'AVIF': {
      name: 'AV1 Image File Format',
      extension: 'avif',
      mimeType: 'image/avif',
      base64Prefix: ['AAAAGGFhdmM=']
    },
    'PSD': {
      name: 'Adobe Photoshop Document',
      extension: 'psd',
      mimeType: 'image/vnd.adobe.photoshop',
      base64Prefix: ['OEJQUw==']
    },
    'unknown': {
      name: 'Unknown Format',
      extension: '',
      mimeType: 'application/octet-stream',
      base64Prefix: []
    }
  } as const;
  
  type ImageFormat = keyof typeof imageFormats | 'unknown';

/**
 * Detecta o formato da imagem pelo seu prefixo base64
 */
function findFormatByPrefix(base64Str: string): ImageFormat {
  for (const [format, info] of Object.entries(imageFormats)) {
    if (info.base64Prefix.some(prefix => base64Str.startsWith(prefix))) {
      return format as ImageFormat;
    }
  }
  return 'unknown';
}

export { 
  imageFormats, 
  type ImageFormat, 
  type ImageFormatInfo, 
  findFormatByPrefix 
};