import styles from './hojaPeritaje.module.css';

export default function HojaPeritajeItem({ item }) {
  const badgeClass = (estado) => {
    const e = (estado || "").toUpperCase();
    if (e === "PROCESO") return `${styles.badge} ${styles.activo}`;       // antes ACTIVO
    if (e === "FINALIZADO") return `${styles.badge} ${styles.finalizado}`;
    return `${styles.badge} ${styles.inactivo}`;                          // PENDIENTE
  };

  const cap = (s) => (s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "-");

  return (
    <tr>
      <td className={styles.item}>{item?.Descripcion ?? "-"}</td>
      <td>{cap(item?.Tipo)}</td>
      <td>
        <span className={badgeClass(item?.estado ?? item?.Estado)}>
          {(item?.estado ?? item?.Estado ?? "-").toUpperCase()}
        </span>
      </td>
    </tr>
  );
}