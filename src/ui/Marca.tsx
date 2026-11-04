// La palabra «Mallki» en negrita, verde Mallki, arriba a la izquierda. Sin logo (§A.4).
export function Marca({ grande }: { grande?: boolean }) {
  return <span className={`font-bold text-mallki tracking-tight ${grande ? 'text-2xl' : 'text-xl'}`}>Mallki</span>;
}
