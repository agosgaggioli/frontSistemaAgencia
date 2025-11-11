import axios from "axios";
import { useEffect, useState } from "react";
import styles from './modalOrden.module.css';

const API = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

export default function ModalOrde({ handlerClose, id }) {
  const [orden, setOrden] = useState(null);
  const [error, setError] = useState("");

  const [showCosto, setShowCosto] = useState(false);
  const [costo, setCosto] = useState("");
  const [loading, setLoading] = useState(false);

  // Carga inicial de la orden
  useEffect(() => {
    if (!id) return;
    axios
      .get(`${API}/orden-trabajo/${id}`)
      .then(({ data }) => {
        setOrden(data);
        setError("");
      })
      .catch((err) => {
        console.log(err);
        setError("Se ha producido un error al cargar la orden");
      });
  }, [id]);

  const handlerFinalizar = async () => {
    // Primer click: mostrar input de costo
    if (!showCosto) { setShowCosto(true); return; }

    const monto = Number(costo);
    if (!Number.isFinite(monto) || monto < 0) {
      alert("Ingresá un costo válido");
      return;
    }

    if (!id) {
      alert("Falta el ID de la orden");
      return;
    }

    setLoading(true);
    try {
      const body = { costo: monto };

      // 1) FINALIZAR (acción principal)
      await axios.put(`${API}/orden-trabajo/finalizar/${id}`, body);

      // ✅ ÉXITO real de la acción principal
      alert("Orden finalizada");

      // Reset UI
      setShowCosto(false);
      setCosto("");

      // 2) REFRESCAR (no crítico). Si falla, no mostramos “error de finalizar”.
      try {
        const { data } = await axios.get(`${API}/orden-trabajo/${id}`);
        setOrden(data);
      } catch (refetchErr) {
        console.warn("Falló el refresco de la orden:", refetchErr);
      }
    } catch (err) {
      console.error(err);
      const msg =
        err?.response?.data?.message ||
        err?.response?.data ||
        err?.message ||
        "Error al finalizar la orden";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.modalDetail}>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Versión</th>
            <th>Dominio</th>
            <th>Ubicación</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{orden?.Vehiculo?.Marca ?? '-'}</td>
            <td>{orden?.Vehiculo?.Modelo ?? '-'}</td>
            <td>{orden?.Vehiculo?.Version ?? '-'}</td>
            <td>{orden?.Vehiculo?.TipoVehiculo?.Dominio ?? '-'}</td>
            <td>{orden?.Vehiculo?.UBICACION ?? '-'}</td>
          </tr>
        </tbody>
      </table>

      <div className={styles.mini}>
        <h2>Estado: {orden?.estado ?? '-'}</h2>

        <h3>Items:</h3>
        <ul>
          {(orden?.itemsOrden ?? []).map((it) => (
            <li key={it.Id}>
              {it.Descripcion ?? "Sin descripción"} — {it.Tipo ?? "Sin tipo"}
            </li>
          ))}
        </ul>

        {showCosto && (
          <div className={styles.costoRow}>
            <label className={styles.costoLabel}>Costo</label>
            <input
              type="number"
              min="0"
              step="0.01"
              value={costo}
              onChange={(e) => setCosto(e.target.value)}
              className={styles.costoInput}
              placeholder="0.00"
            />
          </div>
        )}
      </div>

      <button
        className={styles.button}
        onClick={handlerFinalizar}
        disabled={loading}
      >
        {loading ? "Procesando..." : showCosto ? "Finalizar ahora" : "Finalizar"}
      </button>

      <button className={styles.button} onClick={handlerClose} disabled={loading}>
        Cerrar
      </button>

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
}
