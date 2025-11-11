import styles from "./ItemOrdenAlerta.module.css";

export default function ItemOrdenAlerta({ ordenAlerta = [] }) {
  const diasDesde = (isoDate) => {
    const f = new Date(isoDate);
    const hoy = new Date();
    const ms = hoy - f;
    return Math.max(0, Math.floor(ms / (1000 * 60 * 60 * 24)));
  };

  return (
    <div className={styles.card}>
      <div className={styles.head}>
        <h3>Alertas (SLA)</h3>
      </div>

      <ul className={styles.list}>
        {ordenAlerta.map((o) => {
          const patente = o?.Vehiculo?.TipoVehiculo?.Dominio || "—";
          const modelo = o?.Vehiculo?.Modelo || "—";
          const dias = diasDesde(o?.Fecha);

          return (
            <li key={o.Id} className={styles.item}>
              <div className={styles.left}>
                <span className={styles.dot} aria-hidden="true"></span>
                <span className={styles.mainText}>
                  {patente}&nbsp;<span className={styles.model}>{modelo}</span>
                </span>
              </div>
              <span className={styles.badgeDias}>
                {dias} {dias === 1 ? "día" : "días"}
              </span>
            </li>
          );
        })}
        {ordenAlerta.length === 0 && (
          <li className={styles.empty}>Sin alertas por ahora</li>
        )}
      </ul>
    </div>
  );
}
