// Búsqueda sin tildes ni mayúsculas.
export function normalizar(t: string): string {
  return t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
}

/** Todas las palabras de la consulta aparecen en el texto. */
export function coincide(consulta: string, texto: string): boolean {
  const t = normalizar(texto);
  return normalizar(consulta).split(/\s+/).filter(Boolean).every((w) => t.includes(w));
}
