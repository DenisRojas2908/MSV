// M2-2 Catálogo (§B.3 M2, §B.4 M2, D-20, P-02, P-11): elegir el SKU de la lista de 24 y llenar
// precio, stock referencial y plazo. «Subir Excel». La casilla «Opción ecológica (Ley 30884)»
// solo aparece en envases; Qhapaq es de abarrotes y no la ve.
import { Check, FileSpreadsheet, Leaf } from 'lucide-react';
import { useState } from 'react';
import { NOMBRE_CATEGORIA } from '../../data/demo';
import { SKUS } from '../../data/skus';
import { formatearMonto, soles } from '../../domain/dinero';
import { VIGENCIA_DIAS } from '../../domain/reglas';
import type { Categoria } from '../../domain/tipos';
import { useDemo } from '../../store/demo';
import { Boton, Campo, Dinero, Fecha, Tarjeta } from '../../ui';
import { PantallaProveedor, QHAPAQ } from './comun';

export function M2_2Catalogo() {
  const ofertas = useDemo((s) => s.ofertas);
  const actualizar = useDemo((s) => s.actualizarPrecio);
  const propias = ofertas.filter((o) => o.proveedorId === QHAPAQ.id);
  const [skuN, setSkuN] = useState(propias[0]?.skuN ?? 1);
  const sku = SKUS.find((s) => s.n === skuN) ?? SKUS[0]!;
  const oferta = propias.find((o) => o.skuN === skuN);
  const [precio, setPrecio] = useState('');
  const valido = /^\d+(\.\d{1,2})?$/.test(precio.trim());

  const guardar = () => {
    if (!oferta || !valido) return;
    const [e, d = ''] = precio.trim().split('.');
    actualizar(oferta.id, soles(`${e}.${d.padEnd(2, '0')}`));
    setPrecio('');
  };

  return (
    <PantallaProveedor id="M2-2" titulo="Catálogo">
      <div className="grid h-full grid-cols-[360px_380px_1fr] gap-6">
        <Tarjeta className="flex min-h-0 flex-col p-4">
          <h2 className="px-1 font-semibold">Lista de 24 SKU ancla</h2>
          <p className="px-1 text-xs text-texto/60">Elige el producto que vas a ofrecer.</p>
          {(['abarrotes', 'envases'] as Categoria[]).map((cat) => {
            const propia = cat === QHAPAQ.categoria;
            return (
              <section key={cat} className="mt-2">
                <h3 className="px-1 text-[11px] font-semibold uppercase tracking-wide text-texto/50">
                  {NOMBRE_CATEGORIA[cat]}
                  {!propia && <span className="ml-1 normal-case tracking-normal">· fuera de tu categoría</span>}
                </h3>
                <ul>
                  {SKUS.filter((s) => s.categoria === cat).map((s) => (
                    <li key={s.n}>
                      <button
                        type="button"
                        disabled={!propia}
                        onClick={() => { setSkuN(s.n); setPrecio(''); }}
                        className={`flex h-[23px] w-full items-center gap-2 rounded px-1 text-left text-xs disabled:text-texto/35 ${s.n === skuN ? 'bg-mallki/10 font-semibold text-mallki' : ''}`}
                      >
                        <span className="w-4 text-right tabular-nums text-texto/40">{s.n}</span>
                        <span className="flex-1 truncate">{s.nombre}</span>
                        {propias.some((o) => o.skuN === s.n) && <Check size={13} className="text-mallki" aria-label="En tu catálogo" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })}
        </Tarjeta>

        <Tarjeta className="flex flex-col gap-4 p-6">
          <div>
            <h2 className="text-lg font-bold">{sku.nombre}</h2>
            <p className="text-sm text-texto/70">{sku.presentacion} · {NOMBRE_CATEGORIA[sku.categoria]}</p>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-medium text-texto/70">Precio con IGV (S/)</span>
            <input
              value={precio}
              onChange={(e) => setPrecio(e.target.value)}
              inputMode="decimal"
              placeholder={oferta ? formatearMonto(oferta.precio) : 'Precio con IGV'}
              className="w-full rounded-lg bg-blanco px-3 py-2.5 text-sm ring-1 ring-texto/20 placeholder:text-texto/50 focus:outline-none focus:ring-mallki"
            />
          </label>
          <Campo etiqueta="Stock referencial" placeholder="Unidades disponibles" />
          <Campo etiqueta="Plazo de entrega" valor={`${QHAPAQ.plazoHoras} h`} />
          {sku.categoria === 'envases' && (
            <span className="inline-flex items-center gap-2 text-sm">
              <span className="h-5 w-5 rounded bg-blanco ring-1 ring-texto/30" />
              <Leaf size={14} className="text-mallki" /> Opción ecológica (Ley 30884)
            </span>
          )}
          <div className="mt-auto flex gap-3">
            <Boton className="flex-1 py-3" disabled={!oferta || !valido} onClick={guardar}>Guardar precio</Boton>
            <Boton variante="secundario" className="flex-1 py-3"><FileSpreadsheet size={16} /> Subir Excel</Boton>
          </div>
          <p className="text-xs text-texto/60">Un precio nuevo cuenta como confirmación: vuelve a estar vigente por {VIGENCIA_DIAS} días.</p>
        </Tarjeta>

        <Tarjeta className="flex flex-col p-6">
          <h2 className="font-semibold">Mi catálogo</h2>
          <table className="mt-3 w-full text-sm">
            <thead>
              <tr className="border-b border-texto/10 text-left text-xs text-texto/60">
                <th className="py-2 font-medium">Producto</th>
                <th className="py-2 text-right font-medium">Precio</th>
                <th className="py-2 text-right font-medium">Plazo</th>
                <th className="py-2 text-right font-medium">Stock</th>
                <th className="py-2 text-right font-medium">Confirmado</th>
              </tr>
            </thead>
            <tbody>
              {propias.map((o) => {
                const s = SKUS.find((x) => x.n === o.skuN)!;
                return (
                  <tr key={o.id} className="border-b border-texto/5">
                    <td className="py-2.5">
                      <span className="block font-medium">{s.nombre}</span>
                      <span className="text-xs text-texto/60">{s.presentacion}</span>
                    </td>
                    <td className="py-2.5 text-right font-semibold"><Dinero c={o.precio} /></td>
                    <td className="py-2.5 text-right">{QHAPAQ.plazoHoras} h</td>
                    <td className="py-2.5 text-right text-texto/50">—</td>
                    <td className="py-2.5 text-right"><Fecha f={o.confirmadaEl} corta /></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Tarjeta>
      </div>
    </PantallaProveedor>
  );
}
