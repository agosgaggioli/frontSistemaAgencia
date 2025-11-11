import axios from "axios";
import { useState } from "react";
import styles from './modalItemAdd.module.css';

const API = import.meta.env.VITE_API_URL;

//`${API}/vehiculo/

export default function ModalItem({ handlerClose, id }) {
  const [items, setItems] = useState([{ descripcion: '', tipo: '' }]);
  const [loading, setLoading] = useState(false);

  const handlerItemChange = (index, field, value) => {
    setItems(prev => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const handlerAddRow = () => {
    setItems(prev => [...prev, { descripcion: '', tipo: '' }]);
  };

  const handlerModificar = async () => {
    const itemsPeritaje = items
      .map(i => ({ Descripcion: i.descripcion.trim(), Tipo: i.tipo.trim() }))
      .filter(i => i.Descripcion || i.Tipo);

    if (!itemsPeritaje.length) return alert('Agregá al menos un ítem');

    try {
      setLoading(true);
      await axios.put(`${API}/peritaje/${id}`, { itemsPeritaje });
      alert('Ítems agregados');
      handlerClose();
    } catch (e) {
      console.error(e);
      alert(e?.response?.data?.message || 'Error al guardar');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className={styles.modalDetail}>
      {/* tarjeta del modal */}
      <div
        className={styles.mini}
        onMouseDown={(e) => e.stopPropagation()}
        onClick={(e) => e.stopPropagation()}
      >
        <div>
          <h3>ITEMES PERITAJE</h3>
        </div>

        <div className={styles.mini}>
          <div>
            <button className={styles.botonv} type="button" onClick={handlerAddRow} disabled={loading}>+</button>
          </div>

          {items.map((item, i) => (
            <div key={i} className={styles.minis}>
              <div className={styles.mini}>
                <label>DESCRIPCIÓN</label>
                <input
                  type="text"
                  className={styles.inputcolor}
                  value={item.descripcion}
                  onChange={(e) => handlerItemChange(i, 'descripcion', e.target.value)}
                  disabled={loading}
                  autoFocus={i === 0}
                />
              </div>
              <div className={styles.mini}>
                <label>TIPO</label>
                <input className={styles.inputcolor}
                  type="text"
                  value={item.tipo}
                  onChange={(e) => handlerItemChange(i, 'tipo', e.target.value)}
                  disabled={loading}
                />
              </div>
            </div>
          ))}
        </div>

        <div className={styles.minis}>
          <button onClick={handlerClose} className={styles.botonv} type="button">CERRAR</button>
          <button onClick={handlerModificar} className={styles.botonv} type="button" disabled={loading}>
            {loading ? 'Guardando...' : 'MODIFICAR'}
          </button>
        </div>
      </div>
    </section>
  );
}