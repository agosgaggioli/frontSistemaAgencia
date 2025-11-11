import { useEffect, useState } from "react";
import CompletarOrden from "../../../components/ordenTrabajo/completarOrden/completarOrden";
import NuevaOrdenBusqueda from "../../../components/ordenTrabajo/nuevaOrden/nuevaOrden";

import styles from './nuevaOrdenTrabajo.module.css';
import axios from "axios";
export default function NuevoOrden() {
  const [peritajeId, setPeritajeId] = useState(() => {
    const raw = localStorage.getItem("peritaje");
    return raw ? JSON.parse(raw) : null;
  });
  const [vehiculoId, setVehiculoId] = useState(null);

  // 1) cuando seleccionás desde el mini-hijo
  const handlePeritajeChange = (id, vehiculo) => {
    setPeritajeId(id);
    setVehiculoId(vehiculo); // viene directo del mini-hijo
  };

  // 2) cuando ya había un peritaje guardado (o cambia peritajeId),
  //    obtengo el vehiculoId desde el backend
  useEffect(() => {
    if (!peritajeId) { setVehiculoId(null); return; }
    axios.get(`http://localhost:3009/orden-trabajo/${peritajeId}`)
      .then(({ data }) => {
        setVehiculoId(data?.Vehiculo?.Id_Vehiculo ?? null);
      })
      .catch(() => setVehiculoId(null));
  }, [peritajeId]);

  return (
    <div className={styles.main}>
      <NuevaOrdenBusqueda onPeritajeChange={handlePeritajeChange} />
      <CompletarOrden peritajeId={peritajeId} vehiculo={vehiculoId} />
    </div>
  );
}