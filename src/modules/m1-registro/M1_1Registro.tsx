// M1-1 Registro del comprador (§B.3 M1, §B.4 M1, P-03): campos llenos con la Pollería Sumaq.
import { Check, ChevronDown } from 'lucide-react';
import { COMPRADOR } from '../../data/comprador';
import { TIPOS_NEGOCIO } from '../../data/demo';
import { Boton, Campo, Pantalla } from '../../ui';

export function M1_1Registro() {
  return (
    <Pantalla id="M1-1" titulo="Registro">
      <div className="flex h-full flex-col gap-3.5">
        <div>
          <h1 className="text-xl font-bold">Crea tu cuenta</h1>
          <p className="text-sm text-texto/70">Compara precios de insumos y compra a varios proveedores en un solo pedido.</p>
        </div>
        <Campo etiqueta="RUC" valor={COMPRADOR.ruc} />
        <Campo etiqueta="Razón social" valor={COMPRADOR.razonSocial} />
        <fieldset>
          <legend className="mb-1.5 text-xs font-medium text-texto/70">Tipo de negocio</legend>
          <div className="flex flex-wrap gap-1.5">
            {TIPOS_NEGOCIO.map((t) => {
              const sel = t === COMPRADOR.tipoNegocio;
              return (
                <span
                  key={t}
                  className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 text-sm first-letter:uppercase ${sel ? 'bg-mallki text-blanco' : 'bg-blanco ring-1 ring-texto/20'}`}
                >
                  {sel && <Check size={13} />}
                  <span className="first-letter:uppercase">{t}</span>
                </span>
              );
            })}
          </div>
        </fieldset>
        <label className="block">
          <span className="mb-1 block text-xs font-medium text-texto/70">Distrito de Lima Centro</span>
          <span className="flex items-center justify-between rounded-lg bg-blanco px-3 py-2.5 text-sm ring-1 ring-texto/20">
            {COMPRADOR.distrito}
            <ChevronDown size={16} className="text-texto/50" />
          </span>
        </label>
        <Campo etiqueta="WhatsApp" valor={COMPRADOR.whatsapp} />
        <p className="text-xs text-texto/60">El comprador no paga comisión: la comisión la paga el proveedor.</p>
        <Boton a="/m1-2" className="mt-auto w-full py-3.5 text-base">Registrarme</Boton>
      </div>
    </Pantalla>
  );
}
