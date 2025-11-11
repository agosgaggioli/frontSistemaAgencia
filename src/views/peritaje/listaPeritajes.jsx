import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import styles from './listaPeritajes.module.css';
import ListaPeritajes from "../../components/peritaje/listaPeritajes/listaPeritajes";
const API = import.meta.env.VITE_API_URL;

const GET_HOJA = `${API}/peritaje`;


const countBy = (items = [], estado) =>
  items.filter(it => ((it?.estado ?? it?.Estado) || "").toUpperCase() === estado).length;

const ORDER = { PROCESO: 0, PENDIENTE: 1, FINALIZADO: 2 };
const norm = (s) => (s || "").toUpperCase();

export default function MisHojas() {
  const [hojasTrabajo, setHojasTrabajo] = useState([]);
  console.log(hojasTrabajo)

  useEffect(() => {
    axios
      .get(GET_HOJA)
      .then(({ data }) => setHojasTrabajo(Array.isArray(data) ? data : []))
      .catch((e) => {
        console.error(e);
        alert("No hay hojas de trabajo");
        setHojasTrabajo([]);
      });
  }, []);

  const sortedHojas = useMemo(() => {
    return [...hojasTrabajo].sort((a, b) => {
      
      const ea = ORDER[norm(a?.estado)] ?? 99;
      const eb = ORDER[norm(b?.estado)] ?? 99;
      const cmp = ea - eb;
      if (cmp !== 0) return cmp;

      
      const aItems = a?.itemsOrden ?? [];
      const bItems = b?.itemsOrden ?? [];
      return countBy(bItems, "PROCESO") - countBy(aItems, "PROCESO");
    });
  }, [hojasTrabajo]);

  return (
    <div>
      <section>
        <div className={styles.minibanner}>
          <h2>Area Peritaje - Lista hojas trabajo</h2>
        </div>
      </section>

      <section className={styles.conteiner}>
        <h1>Hojas de trabajo</h1>

        <table className={styles.table}>
          <thead>
            <tr>
              <th>Modelo</th>
              <th>Version</th>
              <th>Dominio</th>
              <th>Ubicacion</th>
              <th>Pendientes</th>
              <th>En Proceso</th>
              <th>Finalizados</th>
              <th></th>
              <th></th>
              <th>Estado</th>
              <th>Fecha Peritaje</th>
            </tr>
          </thead>
          <tbody>
            {sortedHojas.map((t) => (
              <ListaPeritajes
                key={t.Id}
                trabajo={t} 
              />
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}