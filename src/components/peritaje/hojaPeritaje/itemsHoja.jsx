import styles from './itemHoja.module.css';

export default function ItemsHoja({ items = [] }) {
  // Totales por estado (1 pasada)
  let enProceso = 0, pendientes = 0, finalizados = 0;

  for (const it of items) {
    const e = ((it?.estado ?? it?.Estado) || "").toUpperCase();
    if (e === "PROCESO") enProceso++;
    else if (e === "FINALIZADO") finalizados++;
    else pendientes++; // todo lo demás = PENDIENTE
  }

  const totals = { enProceso, pendientes, finalizados };

  // Pendientes agrupados por tipo
  const pendientesPorTipo = {};
  for (const it of items) {
    const e = ((it?.estado ?? it?.Estado) || "").toUpperCase();
    if (e !== "PENDIENTE") continue;
    const t = (it?.Tipo ?? it?.tipo ?? "").toLowerCase();
    pendientesPorTipo[t] = (pendientesPorTipo[t] || 0) + 1;
  }

  return (
    <section>
      <div className={styles.cards}>
        <div className={styles.card}>
          <h5>{totals.enProceso}</h5>
          <h3>EN PROCESO</h3>
        </div>

        <div className={styles.cardf}>
          <h5>{totals.pendientes}</h5>
          <h3>PENDIENTES</h3>
        </div>

        <div className={styles.cardb}>
          <h5>{totals.finalizados}</h5>
          <h3>FINALIZADOS</h3>
        </div>
      </div>

      <div className={styles.chips}>
        <h2>PENDIENTES:</h2>
        <div className={styles.chip}>
          {Object.entries(pendientesPorTipo).map(([tipo, count]) => (
            <span className={styles.miniChip} key={tipo}>
              {count} {tipo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
