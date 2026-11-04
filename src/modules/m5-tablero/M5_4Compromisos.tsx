// M5-4 Compromisos (§B.3 M5, D-29): meta a seis meses frente a lo logrado al mes 3 por U1, U2
// y U3, solo con datos existentes. Canal C4.
import { CANAL_C4, UNIDADES } from '../../data/tablero';
import { META_COBERTURA_SKU } from '../../domain/reglas';
import { useTablero } from '../../store/selectores';
import { Tarjeta } from '../../ui';
import { PantallaTablero } from './comun';

export function M5_4Compromisos() {
  const t = useTablero();
  const filas = [
    { unidad: UNIDADES.U1, meta: `${t.metaCompradores} compradores activos`, logrado: `${t.compradoresActivos} compradores activos` },
    { unidad: UNIDADES.U2, meta: `${t.metaProveedores} proveedores activos`, logrado: `${t.proveedoresActivos} proveedores activos` },
    {
      unidad: UNIDADES.U3,
      meta: `${META_COBERTURA_SKU} de ${t.cobertura.total} SKU en verde`,
      logrado: `${t.cobertura.enVerde} de ${t.cobertura.total} SKU en verde`,
    },
  ];
  return (
    <PantallaTablero id="M5-4" titulo="Compromisos">
      <Tarjeta className="overflow-hidden">
        <table className="w-full text-base">
          <thead className="bg-texto/5 text-left text-sm text-texto/60">
            <tr>
              <th className="px-8 py-4 font-medium">Unidad</th>
              <th className="px-8 py-4 font-medium">Meta a seis meses</th>
              <th className="px-8 py-4 font-medium">Logrado al mes 3</th>
              <th className="px-8 py-4 font-medium">Canal</th>
            </tr>
          </thead>
          <tbody>
            {filas.map((f) => (
              <tr key={f.unidad} className="border-t border-texto/10">
                <td className="px-8 py-6 font-semibold">{f.unidad}</td>
                <td className="px-8 py-6">{f.meta}</td>
                <td className="px-8 py-6 font-semibold">{f.logrado}</td>
                <td className="px-8 py-6 text-texto/70">{CANAL_C4}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </Tarjeta>
      <p className="max-w-3xl text-sm leading-relaxed text-texto/70">
        Cada unidad del Sistema 1 rinde cuentas al S3 por el canal C4: lo comprometido frente a lo logrado en el mes. Las metas son del piloto de seis meses;
        lo logrado son datos de demostración.
      </p>
    </PantallaTablero>
  );
}
