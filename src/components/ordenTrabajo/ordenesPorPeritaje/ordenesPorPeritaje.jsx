import OrdenesDiseño from "./odenDiseño";
import styles from "./odenesPorPeritaje.module.css";

export default function OrdenesPorPeritaje({ ordenes = [], onSeleccionar }) {
  const normalizeEstado = (s) =>
    (s || "")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toUpperCase()
      .replace(/\s+/g, " ")
      .trim();

  const counts = (ordenes || []).reduce(
    (acc, it) => {
      const e = normalizeEstado(it && it.estado);
      if (e === "PROCESO") acc.proceso++;
      else if (e === "FINALIZADO") acc.finalizado++;
      else if (e === "ATRASADO" || e === "RETRASADO") acc.atrasado++;
      else if (e === "EN RIESGO" || e === "RIESGO") acc.riesgo++;
      else acc.otros++;
      return acc;
    },
    { proceso: 0, finalizado: 0, atrasado: 0, riesgo: 0, otros: 0 }
  );

  return (
    <main>
      <section className={styles.conteinerCards}>
        <div className={styles.card}>
          <h3>{counts.proceso}</h3>
          <h4>PROCESO</h4>
        </div>

        <div className={styles.cardbl}>
          <h3>{counts.riesgo}</h3>
          <h4>RIESGO</h4>
        </div>

        <div className={styles.cardr}>
          <h3>{counts.atrasado}</h3>
          <h4>RETRASADA</h4>
        </div>

        <div className={styles.cardb}>
          <h3>{counts.finalizado}</h3>
          <h4>FINALIZADAS</h4>
        </div>
      </section>

      <section className={styles.filtros}>
        <div>
          <label>Filtro:</label>
          <select defaultValue="">
            <option value="">TODAS</option>
          </select>
        </div>
      </section>

      <section className={styles.orden}>
        {(ordenes || []).map((o) => (
          <OrdenesDiseño
            key={o.Id}
            orden={o}
            onSelect={() => onSeleccionar && onSeleccionar(o.Id)}
          />
        ))}
      </section>
    </main>
  );
}