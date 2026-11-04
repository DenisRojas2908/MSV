import { describe, expect, it } from 'vitest';
import { diasRestantes, estadoVigencia, ofertasPorVencer } from '../src/domain/vigencia';
import { HOY, MANANA, oferta, ofertas } from './ayuda';

describe('S2-M3 vigencia de 7 días', () => {
  it('al 09/11 el aceite de Wayna (03/11) vence mañana', () => {
    const o = oferta(ofertas(), 'aceite-wayna');
    expect(diasRestantes(o, HOY)).toBe(1);
    expect(estadoVigencia(o, HOY)).toBe('vence-manana');
  });
  it('al 10/11 el aceite de Wayna pasa a No disponible', () => {
    expect(estadoVigencia(oferta(ofertas(), 'aceite-wayna'), MANANA)).toBe('no-disponible');
  });
  it('a las dos ofertas de Qhapaq les quedan 5 días al 09/11', () => {
    expect(diasRestantes(oferta(ofertas(), 'aceite-qhapaq'), HOY)).toBe(5);
    expect(diasRestantes(oferta(ofertas(), 'arroz-qhapaq'), HOY)).toBe(5);
  });
  it('por vencer en 48 h al 09/11: aceite de Wayna y táper de Ayni', () => {
    expect(ofertasPorVencer(ofertas(), HOY).map((o) => o.id)).toEqual(['aceite-wayna', 'taper-ayni']);
  });
  it('confirmar hoy reinicia a 7 días', () => {
    expect(diasRestantes({ confirmadaEl: HOY }, HOY)).toBe(7);
  });
});
