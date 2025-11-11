import axios from "axios";
import { useState } from "react";
import styles from "./modalItemAdd.module.css";

// normalizamos la base URL (sin barra al final)
const API = (import.meta.env.VITE_API_URL || "").replace(/\/+$/, "");

export default function ModalItemRepuestos({ handlerClose, id }) {
  const [items, setItems] = useState([{ descripcion: "", tipo: "" }]);
  const [loading, setLoading] = useState(false);

  const handlerItemChange = (index, field, value) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handlerAddRow = () => {
    setItems((prev) => [...prev, { descripcion: "", tipo: "" }]);
  };

  const handlerModificar = async () => {
    const itemsRepuestos = items
      .map((i) => ({
        Descripcion: (i.descripcion || "").trim(),
        Tipo: (i.tipo || "").trim(),
      }))
      .filter((i) => i.Descripcion || i.Tipo);

    if (!itemsRepuestos.length) return alert("Agregá al menos un ítem");
    if (id == null) return alert("Falta el ID de peritaje");

    // 👇👇 CAMBIO CLAVE: enviamos idPeritaje (no 'id')
    const payload = {
      idPeritaje: Number(id),
      itemsRepuestos,
    };

    try {
      setLoading(true);
      await axios.post(`${API}/lista-repuestos`, payload);
      alert("Ítems agregados");
      handlerClose?.();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || "Error al guardar");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.modalDetail}>
      <div
        className={styles.mini}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3>RE P U E S T O S</h3>
        </div>

        <div className={styles.mini}>
          <div>
            <button
              className={styles.botonv}
              type="button"
              onClick={handlerAddRow}
              disabled={loading}
            >
              +
            </button>
          </div>

          {items.map((item, i) => (
            <div key={i} className={styles.minis}>
              <div className={styles.mini}>
                <label>DESCRIPCIÓN</label>
                <input
                  type="text"
                  className={styles.inputcolor}
                  value={item.descripcion}
                  onChange={(e) =>
                    handlerItemChange(i, "descripcion", e.target.value)
                  }
                  disabled={loading}
                  autoFocus={i === 0}
                />
              </div>
              <div className={styles.mini}>
                <label>TIPO</label>
                <input
                  className={styles.inputcolor}
                  type="text"
                  value={item.tipo}
                  onChange={(e) => handlerItemChange(i, "tipo", e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.minis}>
          <button onClick={handlerClose} className={styles.botonv} type="button">
            CERRAR
          </button>
          <button
            onClick={handlerModificar}
            className={styles.botonv}
            type="button"
            disabled={loading}
          >
            {loading ? "Guardando…" : "GUARDAR"}
          </button>
        </div>
      </div>
    </section>
  );
}
