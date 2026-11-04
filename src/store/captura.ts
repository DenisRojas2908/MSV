// D-18: `?captura=1` se reconoce antes del # (?captura=1#/m1-1) y después (#/m1-1?captura=1).
export function tieneCaptura(search: string, hash: string): boolean {
  const enSearch = new URLSearchParams(search).get('captura') === '1';
  const q = hash.indexOf('?');
  const enHash = q >= 0 && new URLSearchParams(hash.slice(q + 1)).get('captura') === '1';
  return enSearch || enHash;
}

export function esModoCaptura(): boolean {
  if (typeof window === 'undefined') return false;
  return tieneCaptura(window.location.search, window.location.hash);
}
