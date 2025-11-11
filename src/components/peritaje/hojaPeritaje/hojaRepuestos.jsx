import axios from "axios";
import { useEffect, useRef, useState } from "react";
import styles from "./hojaRepuestos.module.css";

const API = (import.meta.env.VITE_API_URL || "").trim();

export default function HojaRepuestos({ id }) {
  const [repuestos, setRepuestos] = useState({ itemsRepuestos: [] });
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const abortRef = useRef(null);

  const isConnRefused = (err) => {
    const msg = String(err?.message || "").toUpperCase();
    const code = String(err?.code || "").toUpperCase();
    return (
      msg.includes("ERR_CONNECTION_REFUSED") ||
      msg.includes("NETWORK ERROR") ||
      code.includes("ECONNREFUSED")
    );
  };

  useEffect(() => {
    if (id == null) return;
    let canceled = false;

    const fetchData = async (attempt = 0) => {
      setLoading(true);
      setErrMsg("");
      abortRef.current?.abort?.();
      abortRef.current = new AbortController();

      try {
        const { data } = await axios.get(
          `${API}/lista-repuestos/ByPeritaje/${id}`,
          { signal: abortRef.current.signal }
        );
        if (canceled) return;
        setRepuestos(data || { itemsRepuestos: [] });
      } catch (err) {
        if (canceled) return;

        // Silenciamos errores de “servicio despertando” y reintentamos
        if (isConnRefused(err) && attempt < 3) {
          setTimeout(() => fetchData(attempt + 1), 3000);
          return;
        }

        console.error("Error cargando repuestos:", err);
        setErrMsg("No se pudieron cargar los repuestos.");
        setRepuestos({ itemsRepuestos: [] });
      } finally {
        if (!canceled) setLoading(false);
      }
    };

    fetchData();

    return () => {
      canceled = true;
      abortRef.current?.abort?.();
    };
  }, [id]);

  const items = repuestos.itemsRepuestos ?? [];

  const marcarEstado = async (idItem, nuevoEstado) => {
    try {
      const ok = window.confirm(
        `¿Seguro que querés marcar este repuesto como "${nuevoEstado}"?`
      );
      if (!ok) return;

      if (nuevoEstado === "PEDIDO") {
        await axios.put(`${API}/lista-repuestos/sePidio/${idItem}`);
      } else if (nuevoEstado === "RECIBIDO") {
        await axios.put(`${API}/lista-repuestos/llego/${idItem}`);
      }

      // Optimistic update
      setRepuestos((prev) => ({
        ...prev,
        itemsRepuestos: (prev.itemsRepuestos ?? []).map((item) =>
          item.Id === idItem ? { ...item, estado: nuevoEstado } : item
        ),
      }));
    } catch (error) {
      console.error(error);
      alert("Error al actualizar el estado");
    }
  };

  const getBadgeClass = (estado) => {
    const e = (estado || "PENDIENTE").toUpperCase();
    if (e === "RECIBIDO") return `${styles.badge} ${styles.badgeRecibido}`;
    if (e === "PEDIDO") return `${styles.badge} ${styles.badgePedido}`;
    return `${styles.badge} ${styles.badgePendiente}`;
  };

  return (
    <section className={styles.container}>
      <h3 className={styles.title}>Repuestos</h3>

      <div className={styles.card}>
        <div className={styles.headerRow}>
          <div>Repuesto</div>
          <div>Estado</div>
          <div style={{ textAlign: "right" }}></div>
        </div>

        {loading ? (
          <div className={styles.empty}>Cargando repuestos…</div>
        ) : errMsg ? (
          <div className={styles.empty}>{errMsg}</div>
        ) : items.length === 0 ? (
          <div className={styles.empty}>No hay repuestos cargados.</div>
        ) : (
          items.map((r) => {
            const estado = (r.estado || "PENDIENTE").toUpperCase();
            const disabledPedido = estado === "PEDIDO" || estado === "RECIBIDO";
            const disabledLlego = estado === "RECIBIDO";

            return (
              <div key={r.Id} className={styles.row}>
                <div className={styles.colRepuesto}>
                  {r.Descripcion ?? "—"}
                </div>

                <div className={styles.colEstado}>
                  <span className={getBadgeClass(estado)}>{estado}</span>
                </div>

                <div className={styles.colAcciones}>
                  <button
                    className={styles.btn}
                    onClick={() => marcarEstado(r.Id, "PEDIDO")}
                    disabled={disabledPedido}
                  >
                    Se pidió
                  </button>
                  <button
                    className={styles.btn}
                    onClick={() => marcarEstado(r.Id, "RECIBIDO")}
                    disabled={disabledLlego}
                  >
                    Llegó
                  </button>
                </div>
              </div>
            );
          })
        )}
      </div>
    </section>
  );
}
