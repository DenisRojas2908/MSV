// M5-2 Semáforos (§B.3 M5, §B.4 M5, S2-M1, S2-M3): el mismo semáforo que M3-4 (misma función)
// y las ofertas por vencer en 48 horas.
import { NOMBRE_CATEGORIA } from '../../data/demo';
import { SKUS } from '../../data/skus';
import { OFERTAS_AMBAR, OFERTAS_VERDE, POR_VENCER_DIAS, SEMANAS_CATEGORIA_ROJO, UMBRAL_CATEGORIA_PCT, VIGENCIA_DIAS } from '../../domain/reglas';
import { categoriaEnAlerta } from '../../domain/semaforo';
import type { Categoria } from '../../domain/tipos';
import { diasRestantes, estadoVigencia, textoVigencia } from '../../domain/vigencia';
import { buscarProveedor, useHoy, usePorVencer, useResumenSemaforo } from '../../store/selectores';
import { Dinero, Etiqueta, Fecha, Porcentaje, Punto, Tarjeta } from '../../ui';
import { PantallaTablero, ZonaCob } from './comun';

const CATS: Categoria[] = ['abarrotes', 'envases'];

export function M5_2Semaforos() {
  const sem = useResumenSemaforo();
  const porVencer = usePorVencer();
  const hoy = useHoy();
  const nombreCorto = (id: string) => buscarProveedor(id).nombre.split(' ').slice(-1)[0];

  return (
    <PantallaTablero id="M5-2" titulo="Semáforos y vigencia">
      <div className="grid min-h-0 flex-1 grid-cols-[1fr_400px] gap-6">
        <Tarjeta className="flex min-h-0 flex-col p-6">
          <div className="flex items-start justify-between">
            <div>
              <h2 className="text-sm font-semibold text-texto/70">Cobertura por SKU · S2-M1</h2>
              <p className="mt-1 text-3xl font-bold">
                {sem.total.enVerde} de {sem.total.total} en verde: <Porcentaje valor={sem.total.porcentaje} />
              </p>
              <p className="mt-1 flex gap-4 text-sm">
                <span className="inline-flex items-center gap-1.5"><Punto color="verde" /> {sem.conteo.verde} verdes</span>
                <span className="inline-flex items-center gap-1.5"><Punto color="ambar" /> {sem.conteo.ambar} ámbar</span>
                <span className="inline-flex items-center gap-1.5"><Punto color="rojo" /> {sem.conteo.rojo} rojos</span>
              </p>
            </div>
            <div className="text-right text-sm">
              <ZonaCob zona={sem.zona} />
              <p className="mt-1 text-xs text-texto/60">Verde: {OFERTAS_VERDE} ofertas · ámbar: {OFERTAS_AMBAR} · rojo: {OFERTAS_AMBAR - 1} o ninguna</p>
            </div>
          </div>
          <div className="mt-4 grid min-h-0 flex-1 grid-cols-2 gap-6">
            {CATS.map((cat) => {
              const c = cat === 'abarrotes' ? sem.abarrotes : sem.envases;
              return (
                <section key={cat}>
                  <h3 className="flex items-baseline justify-between border-b border-texto/10 pb-1.5 text-sm font-semibold">
                    {NOMBRE_CATEGORIA[cat]}
                    <span className="font-normal text-texto/70">
                      {c.enVerde} de {c.total} · <Porcentaje valor={c.porcentaje} />
                      {categoriaEnAlerta(c) && <Etiqueta tono="rojo">Alerta del S3</Etiqueta>}
                    </span>
                  </h3>
                  <ul>
                    {sem.lista.filter((s) => s.sku.categoria === cat).map((s) => (
                      <li key={s.sku.n} className="flex h-[29px] items-center gap-2 border-b border-texto/5 text-[13px]">
                        <span className="w-5 text-right tabular-nums text-texto/40">{s.sku.n}</span>
                        <Punto color={s.color} />
                        <span className="min-w-0 flex-1 truncate">{s.sku.nombre}</span>
                        <span className="text-xs text-texto/60">{s.ofertantes.map(nombreCorto).join(', ') || '—'}</span>
                      </li>
                    ))}
                  </ul>
                </section>
              );
            })}
          </div>
          <p className="mt-3 text-xs text-texto/60">
            Escala al S3: una categoría en rojo {SEMANAS_CATEGORIA_ROJO} semanas seguidas o una categoría ancla bajo <Porcentaje valor={UMBRAL_CATEGORIA_PCT} /> de cobertura. El mismo cálculo alimenta el semáforo del comprador.
          </p>
        </Tarjeta>

        <div className="flex flex-col gap-5">
          <Tarjeta className="p-6">
            <h2 className="text-sm font-semibold text-texto/70">Ofertas por vencer en {POR_VENCER_DIAS * 24} horas · S2-M3</h2>
            <p className="mt-1 text-xs text-texto/60">Hoy <Fecha f={hoy} /> · vigencia de {VIGENCIA_DIAS} días</p>
            {porVencer.length === 0 ? (
              <p className="mt-3 text-sm text-texto/70">Ninguna.</p>
            ) : (
              <ul className="mt-3 space-y-2.5">
                {porVencer.map((o) => {
                  const sku = SKUS.find((s) => s.n === o.skuN)!;
                  const d = diasRestantes(o, hoy);
                  return (
                    <li key={o.id} className="rounded-lg bg-ambar/10 px-4 py-3 ring-1 ring-ambar/40">
                      <div className="flex items-baseline justify-between gap-2">
                        <span className="font-semibold">{sku.nombre}</span>
                        <Dinero c={o.precio} />
                      </div>
                      <p className="text-sm">{buscarProveedor(o.proveedorId).nombre}</p>
                      <p className="mt-1 text-xs text-texto/70">
                        Confirmado <Fecha f={o.confirmadaEl} corta />
                        {' · '}
                        {textoVigencia(estadoVigencia(o, hoy)) ? (
                          <Etiqueta tono="ambar">{textoVigencia(estadoVigencia(o, hoy))}</Etiqueta>
                        ) : (
                          <>quedan {d} días</>
                        )}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </Tarjeta>
          <Tarjeta className="p-6 text-sm leading-relaxed">
            <h2 className="font-semibold">Regla de vigencia</h2>
            <p className="mt-1 text-texto/80">
              Sin confirmar en {VIGENCIA_DIAS} días, la oferta pasa a «No disponible»: sale del comparador y no cuenta para el semáforo.
            </p>
            <p className="mt-2 text-texto/80">El proveedor confirma su precio en su catálogo; confirmar o cambiar el precio reinicia los {VIGENCIA_DIAS} días.</p>
          </Tarjeta>
        </div>
      </div>
    </PantallaTablero>
  );
}
