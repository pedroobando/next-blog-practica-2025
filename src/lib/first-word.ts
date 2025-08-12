export const firstWords = (
  text: string,
  wordCount: number = 50,
  addEllipsis: boolean = true,
): string => {
  if (!text || wordCount <= 0) return '';

  // Dividir el texto manteniendo espacios y signos de puntuación
  const tokens = text.match(/\S+\s*|\s+/g) || [];

  let wordCounter = 0;
  const resultTokens: string[] = [];

  for (const token of tokens) {
    // Contar tokens que contienen caracteres no-espacio como palabras
    if (/\S/.test(token)) {
      wordCounter++;
    }
    resultTokens.push(token);

    // Detener cuando alcanzamos el límite de palabras
    if (wordCounter >= wordCount) {
      break;
    }
  }

  // Unir los tokens seleccionados
  const result = resultTokens.join('');

  // Agregar puntos suspensivos si es necesario
  if (addEllipsis && tokens.length > resultTokens.length) {
    return result.trimEnd() + '...';
  }
  return result.trimEnd();
};
