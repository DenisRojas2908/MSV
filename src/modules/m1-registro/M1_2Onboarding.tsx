// M1-2 Onboarding (§B.3 M1, §B.4 M1, P-12): categorías que compra y su lista habitual,
// elegida de los 24 SKU (por defecto, los tres del pedido N.° 0042). Vía asistida por WhatsApp.
import { Check, MessageCircle } from 'lucide-react';
import { useMemo, useState } from 'react';
import { NOMBRE_CATEGORIA } from '../../data/demo';
import { OFERTAS_INICIALES } from '../../data/ofertas';
import { LINEAS_PEDIDO_0042 } from '../../data/pedido0042';
import { SKUS } from '../../data/skus';
import type { Categoria } from '../../domain/tipos';
import { Boton, Pantalla } from '../../ui';
import { CabeceraComprador } from '../comun/CabeceraComprador';

const CATEGORIAS: Categoria[] = ['abarrotes', 'envases'];

function Casilla({ marcada }: { marcada: boolean }) {
  return (
    <span className={`flex h-[18px] w-[18px] shrink-0 items-center justify-center rounded ${marcada ? 'bg-mallki text-blanco' : 'bg-blanco ring-1 ring-texto/30'}`}>
      {marcada && <Check size={13} />}
    </span>
  );
}

export function M1_2Onboarding() {
  const inicial = useMemo(
    () => new Set(LINEAS_PEDIDO_0042.map((l) => OFERTAS_INICIALES.find((o) => o.id === l.ofertaId)?.skuN ?? 0)),
    [],
  );
  const [lista, setLista] = useState<Set<number>>(inicial);
  const [pestana, setPestana] = useState<Categoria>('abarrotes');
  const [whatsapp, setWhatsapp] = useState(false);
  const compra = (c: Categoria) => SKUS.some((s) => s.categoria === c && lista.has(s.n));
  const alternar = (n: number) =>
    setLista((prev) => {
      const s = new Set(prev);
      if (s.has(n)) s.delete(n);
      else s.add(n);
      return s;
    });

  return (
    <Pantalla id="M1-2" titulo="Tu lista habitual" contexto={<CabeceraComprador />} volver="/m1-1">
      <div className="flex h-full flex-col gap-2.5">
        <section>
          <h2 className="text-sm font-semibold">Categorías que compras</h2>
          <div className="mt-1.5 flex gap-4">
            {CATEGORIAS.map((c) => (
              <span key={c} className="inline-flex items-center gap-2 text-sm">
                <Casilla marcada={compra(c)} /> {NOMBRE_CATEGORIA[c]}
              </span>
            ))}
          </div>
        </section>

        <section className="flex min-h-0 flex-1 flex-col">
          <div className="flex items-baseline justify-between">
            <h2 className="text-sm font-semibold">Tu lista habitual</h2>
            <span className="text-xs text-texto/60">
              {lista.size} de {SKUS.length} productos
            </span>
          </div>
          <div className="mt-1.5 flex rounded-lg bg-texto/5 p-0.5">
            {CATEGORIAS.map((c) => {
              const n = SKUS.filter((s) => s.categoria === c && lista.has(s.n)).length;
              return (
                <button
                  key={c}
                  type="button"
                  onClick={() => setPestana(c)}
                  className={`flex-1 rounded-md py-1.5 text-xs font-semibold ${pestana === c ? 'bg-blanco text-mallki ring-1 ring-texto/10' : 'text-texto/60'}`}
                >
                  {NOMBRE_CATEGORIA[c]} ({n})
                </button>
              );
            })}
          </div>
          <ul className="mt-1.5 divide-y divide-texto/5 rounded-xl bg-blanco ring-1 ring-texto/10">
            {SKUS.filter((s) => s.categoria === pestana).map((s) => (
              <li key={s.n}>
                <button type="button" onClick={() => alternar(s.n)} className="flex h-[33px] w-full items-center gap-2.5 px-3 text-left">
                  <Casilla marcada={lista.has(s.n)} />
                  <span className="min-w-0 flex-1 truncate text-[13px]">{s.nombre}</span>
                  <span className="shrink-0 text-[11px] text-texto/50">{s.presentacion}</span>
                </button>
              </li>
            ))}
          </ul>
        </section>

        <button
          type="button"
          onClick={() => setWhatsapp((v) => !v)}
          className="flex items-center gap-3 rounded-xl bg-blanco px-3.5 py-2.5 text-left ring-1 ring-texto/10"
        >
          <Casilla marcada={whatsapp} />
          <span className="text-sm">
            <span className="block font-medium">Prefiero que me ayuden por WhatsApp</span>
            <span className="block text-xs text-texto/60">Vía asistida: una persona te acompaña por WhatsApp.</span>
          </span>
          <MessageCircle size={18} className="ml-auto shrink-0 text-mallki" />
        </button>

        <Boton a="/m1-3" className="w-full py-3.5 text-base">Continuar</Boton>
      </div>
    </Pantalla>
  );
}
