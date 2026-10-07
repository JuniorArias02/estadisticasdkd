export function calcularDiferenciaSegundos(fecha1: string | null, fecha2: string | null): number {
  if (!fecha1 || !fecha2) return 0;
  const t1 = new Date(fecha1).getTime();
  const t2 = new Date(fecha2).getTime();
  if (isNaN(t1) || isNaN(t2)) return 0;
  return Math.abs(t2 - t1) / 1000;
}

export function formatoTiempo(segundosTotales: number): string {
  if (isNaN(segundosTotales) || segundosTotales < 0) return "00:00:00";
  const h = Math.floor(segundosTotales / 3600);
  const m = Math.floor((segundosTotales % 3600) / 60);
  const s = Math.floor(segundosTotales % 60);
  return `${h.toString().padStart(2, '0')}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
}
