export function slugify(text: string): string {
  return text
    .toString() // Convertir a string por si acaso
    .toLowerCase() // Convertir a minúsculas
    .trim() // Eliminar espacios en blanco al inicio y al final
    .replace(/\s+/g, '-') // Reemplazar espacios con -
    .replace(/[^\w\-]/g, '') // Eliminar todos los caracteres no alfanuméricos
    .replace(/\-\-+/g, '-') // Reemplazar múltiples - con uno solo
    .replace(/^-+/, '') // Eliminar - al inicio
    .replace(/-+$/, ''); // Eliminar - al final
}
