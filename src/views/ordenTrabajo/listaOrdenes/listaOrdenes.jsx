import axios from "axios";
import { useEffect, useState } from "react";
import styles from './listaOrdenes.module.css';
import ListaOrden from "../../../components/ordenTrabajo/ordenTrabajo/ordenTrabajo";

const API = import.meta.env.VITE_API_URL;



const GET_ORDEN = `${API}/orden-trabajo`


export default function MisOrdenes() {
  const [ordenesTrabajo, setOrdenesTrabajo] = useState([]);
 
  

  useEffect(() => {
    axios
      .get(`${GET_ORDEN}`)
      .then(({ data }) => setOrdenesTrabajo(Array.isArray(data) ? data : []))
      .catch((e) => {
        console.error(e);
        alert("No hay ordenes de trabajo");
        setOrdenesTrabajo([]); 
         
      });
  }, []); 
  console.log(ordenesTrabajo)

  return (
    

    <div>
          <section>
                        <div className={styles.minibanner}>
                            <h2>Area Ordenes Trabajo - Lista ordenes trabajo</h2>
                        </div>
                    </section>
        <section className={styles.conteiner}>
      <h1>Orden de trabajo</h1>

      <table className={styles.table}>
        <thead>
          <tr>
            <th>Marca</th>
            <th>Modelo</th>
            <th>Dominio</th>
            <th>Responsable</th>
            <th>Estado</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ordenesTrabajo.map((t) => (
            <ListaOrden key={t.Id} trabajo={t} />
          ))
          }
        </tbody>
      </table>
    </section>
    </div>
  );
}
