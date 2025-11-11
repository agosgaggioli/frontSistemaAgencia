import axios from "axios";
import { useEffect, useState, useCallback } from "react";
import HojaPeritajeItem from "../../../components/peritaje/hojaPeritaje/hojaPeritaje";
import ItemsHoja from "../../../components/peritaje/hojaPeritaje/itemsHoja";
import HojaVehiculo from "../../../components/peritaje/hojaPeritaje/hojaVehiculo";
import styles from "./hojaPeritaje.module.css";
import ModalItem from "./modalItemAdd";
import ModalItemRepuestos from "./modalRepuestos";
import HojaRepuestos from "../../../components/peritaje/hojaPeritaje/hojaRepuestos";

// API segura (env o localhost) y sin barra final
const API = (import.meta.env.VITE_API_URL || "http://localhost:3009").replace(/\/+$/, "");

// Instancia axios con baseURL
const http = axios.create({
  baseURL: API,
  timeout: 15000,
});

export default function HojaPeritaje() {
  const formatFecha = (valor) => {
    if (!valor) return "-";
    const d = valor instanceof Date ? valor : new Date(valor);
    if (isNaN(d.getTime())) return "-";
    return d.toLocaleString("es-AR", {
      timeZone: "America/Argentina/Buenos_Aires",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const raw = localStorage.getItem("IdHoja");
  const hojaId = raw ? Number(raw) : null;

  const [hojaTrabajo, setHojaTrabajo] = useState({});
  const [modal, setModal] = useState(false);
  const [modalr, setModalr] = useState(false);

  const fetchHoja = useCallback(async () => {
    if (hojaId == null) return;
    try {
      const { data } = await http.get(`/peritaje/${hojaId}`);
      setHojaTrabajo(data || {});
    } catch (error) {
      console.log(error);
      alert("Se ha producido un error al cargar la hoja");
      setHojaTrabajo({});
    }
  }, [hojaId]);

  useEffect(() => {
    fetchHoja();
  }, [fetchHoja]);

  const items = hojaTrabajo?.itemsOrden ?? [];

  const handlerOnclick = () => setModal(true);
  const handlerOnclickR = () => setModalr(true);

  const handlerClose = async () => {
    setModal(false);
    setModalr(false);
    // refrescar datos por si agregaste ítems o repuestos
    await fetchHoja();
  };

  return (
    <div>
      <section>
        <div className={styles.minibanner}>
          <h2>Area Peritaje - Hoja Trabajo</h2>
        </div>
      </section>

      <section>
        <div className={styles.contenerdorText}>
          <div className={styles.text}>
            <h1>
              Hoja peritaje #<span>{hojaTrabajo?.Id ?? "-"}</span>
            </h1>
            <h2>
              Encargado: <span>{hojaTrabajo?.responsable ?? "-"}</span>
            </h2>
          </div>
          <div>
            <h6>Modificado {formatFecha(hojaTrabajo?.FechaModificacion)}</h6>
          </div>
        </div>

        <div className={styles.conteiner}>
          <div>
            {hojaTrabajo?.Vehiculo && <HojaVehiculo vehiculo={hojaTrabajo.Vehiculo} />}

            <div className={styles.contenedorBoton}>
              <button
                onClick={handlerOnclick}
                className={styles.boton}
                disabled={hojaId == null}
              >
                AGREGAR ITEMS
              </button>
              <button
                onClick={handlerOnclickR}
                className={styles.botonv}
                disabled={hojaId == null}
              >
                AGREGAR REPUESTO
              </button>

              {modal && <ModalItem handlerClose={handlerClose} id={hojaId} />}
              {modalr && <ModalItemRepuestos handlerClose={handlerClose} id={hojaId} />}
            </div>

            <div className={styles.tableItems}>
              <table>
                <thead>
                  <tr>
                    <th>Ítem</th>
                    <th>Tipo</th>
                    <th>Estado</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((h) => (
                    <HojaPeritajeItem key={h.Id} item={h} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div>
            <ItemsHoja items={items} />
            <HojaRepuestos id={hojaId} />
          </div>
        </div>
      </section>
    </div>
  );
}