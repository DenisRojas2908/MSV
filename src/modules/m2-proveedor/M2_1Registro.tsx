// M2-1 Registro del proveedor (§B.3 M2, D-20): RUC, razón social, categorías,
// distritos de reparto y documentos sanitarios. Solo van llenos la razón social y la categoría.
import { Check, FileUp, Info } from 'lucide-react';
import { NOMBRE_CATEGORIA } from '../../data/demo';
import { COMISION_PB, VIGENCIA_DIAS } from '../../domain/reglas';
import type { Categoria } from '../../domain/tipos';
import { Boton, Campo, Porcentaje, Tarjeta } from '../../ui';
import { PantallaProveedor, QHAPAQ } from './comun';

export function M2_1Registro() {
  return (
    <PantallaProveedor id="M2-1" titulo="Registro del proveedor">
      <div className="grid h-full grid-cols-[1fr_380px] gap-8">
        <Tarjeta className="flex flex-col gap-5 p-8">
          <div>
            <h1 className="text-xl font-bold">Datos de la empresa</h1>
            <p className="text-sm text-texto/70">Completa tus datos para ofrecer tus productos en el comparador.</p>
          </div>
          <div className="grid grid-cols-2 gap-5">
            <Campo etiqueta="RUC" placeholder="11 dígitos" />
            <Campo etiqueta="Razón social" valor={QHAPAQ.nombre} />
          </div>
          <fieldset>
            <legend className="mb-1.5 text-xs font-medium text-texto/70">Categorías</legend>
            <div className="flex gap-6">
              {(['abarrotes', 'envases'] as Categoria[]).map((c) => {
                const marcada = c === QHAPAQ.categoria;
                return (
                  <span key={c} className="inline-flex items-center gap-2 text-sm">
                    <span className={`flex h-5 w-5 items-center justify-center rounded ${marcada ? 'bg-mallki text-blanco' : 'bg-blanco ring-1 ring-texto/30'}`}>
                      {marcada && <Check size={14} />}
                    </span>
                    {NOMBRE_CATEGORIA[c]}
                  </span>
                );
              })}
            </div>
          </fieldset>
          <Campo etiqueta="Distritos de reparto en Lima Centro" placeholder="Elige los distritos donde repartes" />
          <div>
            <span className="mb-1 block text-xs font-medium text-texto/70">Documentos sanitarios</span>
            <div className="flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed border-texto/20 bg-blanco px-6 py-8 text-center">
              <FileUp size={26} className="text-texto/50" />
              <p className="text-sm text-texto/70">Arrastra tus documentos aquí o elige los archivos</p>
              <p className="text-xs text-texto/50">Los presenta el proveedor; los verifica U2.</p>
            </div>
          </div>
          <Boton a="/m2-2" className="mt-auto self-start px-8 py-3 text-base">Registrarme</Boton>
        </Tarjeta>

        <div className="flex flex-col gap-4">
          <Tarjeta className="p-6">
            <h2 className="flex items-center gap-2 font-semibold"><Info size={18} className="text-mallki" /> Cómo funciona</h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed text-texto/80">
              <li>Publicas tus precios en el catálogo y los confirmas al menos cada {VIGENCIA_DIAS} días.</li>
              <li>El comparador ordena por precio, de menor a mayor. Nadie paga por aparecer primero.</li>
              <li>
                Mallki cobra una comisión de <Porcentaje pb={COMISION_PB} /> por venta cerrada. El comprador no paga.
              </li>
              <li>Cada proveedor despacha lo suyo.</li>
            </ul>
          </Tarjeta>
        </div>
      </div>
    </PantallaProveedor>
  );
}
