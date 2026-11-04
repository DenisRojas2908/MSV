// M5-3 Alertas (§B.3 M5, §B.4 M5, §C, §E, D-10, D-22): precio distinto al mostrado (canal
// algedónico), concentración de un proveedor (S2-M6, «—») y reclamos fuera de 48 h (S2-M8).
import { fechaDeInstante } from '../../domain/fechas';
import { esExcepcionS3, plazosReclamo } from '../../domain/reclamos';
import {
  PLAZO_ALGEDONICO_S3_H,
  PLAZO_ALGEDONICO_UNIDAD_H,
  PLAZO_DESCARGO_U2_H,
  PLAZO_RECLAMO_U1_H,
  UMBRAL_ALGEDONICO_PB,
  UMBRAL_CONCENTRACION_PCT,
  UMBRAL_RECLAMO_S3,
  UMBRAL_RECLAMOS_FUERA_PCT,
} from '../../domain/reglas';
import { reclamosEscalanS3 } from '../../domain/umbrales';
import type { ReactNode } from 'react';
import { useDemo } from '../../store/demo';
import { buscarProveedor, usePedido, useResumenPedido, useTablero } from '../../store/selectores';
import { Dinero, Etiqueta, Fecha, Porcentaje, RotuloEscenario, Semaforo, Tarjeta } from '../../ui';
import { PantallaTablero } from './comun';

function Alerta(props: { titulo: string; mecanismo: string; valor: ReactNode; detalleValor?: ReactNode; estado: ReactNode; children: ReactNode }) {
  return (
    <Tarjeta className="grid grid-cols-[1fr_220px_260px] items-start gap-8 p-6">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wide text-texto/50">{props.mecanismo}</p>
        <h2 className="mt-0.5 text-lg font-bold">{props.titulo}</h2>
        <div className="mt-2 text-sm leading-relaxed text-texto/80">{props.children}</div>
      </div>
      <div>
        <p className="text-xs text-texto/60">Valor</p>
        <p className="text-3xl font-bold">{props.valor}</p>
        {props.detalleValor && <p className="text-xs text-texto/60">{props.detalleValor}</p>}
      </div>
      <div className="text-sm">
        <p className="text-xs text-texto/60">Estado</p>
        <div className="mt-1">{props.estado}</div>
      </div>
    </Tarjeta>
  );
}

export function M5_3Alertas() {
  const t = useTablero();
  const reclamos = useDemo((s) => s.reclamos);
  const e4 = useDemo((s) => s.escenarios.includes('E4'));
  const pedido = usePedido('0042');
  const resumen = useResumenPedido(pedido?.lineas);
  const fuera = t.reclamosFuera48hPct;

  return (
    <PantallaTablero id="M5-3" titulo="Alertas">
      <div className="flex flex-col gap-4">
        <Alerta
          mecanismo="S2-M5 · canal algedónico"
          titulo="Precio distinto al mostrado"
          valor={<Porcentaje pb={t.precioDistintoHoyPb} />}
          detalleValor={<>de los pedidos de hoy {e4 && <RotuloEscenario />}</>}
          estado={
            t.senal.activa ? (
              <>
                <Semaforo color="rojo" etiqueta="Señal algedónica activa" />
                <p className="mt-1 text-xs">La unidad tiene {t.senal.plazoUnidadHoras} h; si vence, el S3 {t.senal.plazoS3Horas} h.</p>
              </>
            ) : (
              <Semaforo color="verde" etiqueta="Sin señal" />
            )
          }
        >
          Más de <Porcentaje pb={UMBRAL_ALGEDONICO_PB} /> de los pedidos de un día con precio distinto activa el canal algedónico: la unidad tiene{' '}
          {PLAZO_ALGEDONICO_UNIDAD_H} horas; si vence, el S3 tiene {PLAZO_ALGEDONICO_S3_H} horas. El precio de un pedido se fija al confirmarlo.
        </Alerta>

        <Alerta
          mecanismo="S2-M6 · reparto de alertas"
          titulo={`Proveedor con ${UMBRAL_CONCENTRACION_PCT} % o más de una categoría`}
          valor="—"
          detalleValor="participación en las ventas de la categoría"
          estado={<span className="text-texto/60">Sin dato en la demostración</span>}
        >
          Cada alerta de precio reparte la demanda entre las alternativas. Si un proveedor concentra <Porcentaje valor={UMBRAL_CONCENTRACION_PCT} /> o más de
          las ventas de una categoría después de las {PLAZO_DESCARGO_U2_H} horas de U2, escala al S3.
        </Alerta>

        <Alerta
          mecanismo="S2-M8 · dueño único del reclamo"
          titulo="Reclamos fuera de 48 horas"
          valor={<Porcentaje valor={fuera} />}
          detalleValor={<>derivado de <Porcentaje valor={t.reclamosCerradosEn48hPct} /> cerrados en {PLAZO_RECLAMO_U1_H} h</>}
          estado={
            reclamosEscalanS3(fuera) ? (
              <Semaforo color="rojo" etiqueta="Excepción al S3" />
            ) : (
              <Semaforo color="verde" etiqueta={<>Bajo el umbral de <Porcentaje valor={UMBRAL_RECLAMOS_FUERA_PCT} /></>} />
            )
          }
        >
          U1 conduce y cierra en {PLAZO_RECLAMO_U1_H} horas; U2 da el descargo en {PLAZO_DESCARGO_U2_H} horas; pagos retiene la liquidación de ese proveedor.
          Escala al S3 con plazo incumplido en <Porcentaje valor={UMBRAL_RECLAMOS_FUERA_PCT} /> o más de los casos, o un reclamo sobre <Dinero c={UMBRAL_RECLAMO_S3} />.
          {reclamos.length > 0 && (
            <ul className="mt-2 space-y-1">
              {reclamos.map((r) => {
                const sub = resumen?.grupos.find((g) => g.proveedor.id === r.proveedorId)?.subtotal ?? 0;
                return (
                  <li key={r.id} className="flex flex-wrap items-center gap-2 text-xs">
                    <RotuloEscenario />
                    <span>
                      Pedido N.° {r.pedidoNumero} · {buscarProveedor(r.proveedorId).nombre} · <Dinero c={sub} /> · cierre U1{' '}
                      <Fecha f={fechaDeInstante(plazosReclamo(r).cierreU1)} /> · descargo U2 <Fecha f={fechaDeInstante(plazosReclamo(r).descargoU2)} /> ·
                      liquidación retenida
                    </span>
                    <Etiqueta tono={esExcepcionS3(sub) ? 'rojo' : 'neutro'}>{esExcepcionS3(sub) ? 'Excepción al S3' : 'No escala'}</Etiqueta>
                  </li>
                );
              })}
            </ul>
          )}
        </Alerta>
      </div>
    </PantallaTablero>
  );
}
