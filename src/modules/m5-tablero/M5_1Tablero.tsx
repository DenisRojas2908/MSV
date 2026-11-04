// M5-1 Tablero (§B.3 M5, §B.4 M5, D-13, D-14, D-23): los 8 indicadores de §A.2 frente a su meta.
// Solo la cobertura y el precio distinto (E4) se calculan; los demás son fijos (§A.3).
import type { ReactNode } from 'react';
import { NOMBRES_INDICADORES } from '../../data/tablero';
import { textoAvance } from '../../domain/umbrales';
import { useTablero } from '../../store/selectores';
import { Dinero, Porcentaje, Semaforo, Tarjeta } from '../../ui';
import { PantallaTablero, ZonaCob } from './comun';

function Indicador({ nombre, valor, meta, pie }: { nombre: string; valor: ReactNode; meta: ReactNode; pie?: ReactNode }) {
  return (
    <Tarjeta className="flex flex-col p-6">
      <h2 className="text-sm font-semibold text-texto/70">{nombre}</h2>
      <p className="mt-3 text-4xl font-bold tracking-tight">{valor}</p>
      <div className="mt-auto pt-4 text-sm">
        <p className="text-texto/60">Meta o umbral</p>
        <p className="font-medium">{meta}</p>
        {pie && <div className="mt-2">{pie}</div>}
      </div>
    </Tarjeta>
  );
}

function Avance({ valor, meta }: { valor: number; meta: number }) {
  return (
    <div>
      <div className="h-2 overflow-hidden rounded-full bg-texto/10">
        <div className="h-full rounded-full bg-mallki" style={{ width: `${Math.min(100, (valor / meta) * 100)}%` }} />
      </div>
      <p className="mt-1 text-xs text-texto/70">{textoAvance(valor, meta)} · meta a seis meses</p>
    </div>
  );
}

export function M5_1Tablero() {
  const t = useTablero();
  return (
    <PantallaTablero id="M5-1" titulo="Tablero de indicadores">
      <div className="grid flex-1 grid-cols-4 grid-rows-2 gap-5">
        <Indicador nombre={NOMBRES_INDICADORES.compradores} valor={t.compradoresActivos} meta={t.metaCompradores} pie={<Avance valor={t.compradoresActivos} meta={t.metaCompradores} />} />
        <Indicador nombre={NOMBRES_INDICADORES.proveedores} valor={t.proveedoresActivos} meta={t.metaProveedores} pie={<Avance valor={t.proveedoresActivos} meta={t.metaProveedores} />} />
        <Indicador
          nombre={NOMBRES_INDICADORES.cobertura}
          valor={<><Porcentaje valor={t.cobertura.porcentaje} /> <span className="text-xl font-semibold text-texto/70">({t.cobertura.enVerde} de {t.cobertura.total})</span></>}
          meta={t.metaCoberturaTexto}
          pie={<span className="text-sm"><ZonaCob zona={t.zonaCobertura} /></span>}
        />
        <Indicador nombre={NOMBRES_INDICADORES.recompra} valor={<Porcentaje valor={t.recompra60DiasPct} />} meta={t.metaRecompraTexto} />
        <Indicador nombre={NOMBRES_INDICADORES.preciosVigentes} valor={<Porcentaje valor={t.preciosVigentesPct} />} meta="—" />
        <Indicador nombre={NOMBRES_INDICADORES.reclamos48h} valor={<Porcentaje valor={t.reclamosCerradosEn48hPct} />} meta="—" />
        <Indicador
          nombre={NOMBRES_INDICADORES.precioDistinto}
          valor={<Porcentaje pb={t.precioDistintoHoyPb} />}
          meta={t.metaPrecioDistintoTexto}
          pie={t.senal.activa ? <span className="text-sm font-semibold"><Semaforo color="rojo" etiqueta="Señal algedónica activa" /></span> : undefined}
        />
        <Indicador
          nombre={NOMBRES_INDICADORES.ventas}
          valor={<span className="whitespace-nowrap text-[28px]"><Dinero c={t.ventasDelMes} sinDecimales /> / <Dinero c={t.comisionDelMes} sinDecimales /></span>}
          meta="—"
        />
      </div>
      <p className="text-xs text-texto/60">
        Totales de la plataforma en el mes 3 del piloto, supuestos. La cobertura se calcula con el semáforo de los {t.cobertura.total} SKU ancla.
      </p>
    </PantallaTablero>
  );
}
