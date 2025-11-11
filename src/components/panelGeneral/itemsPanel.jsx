import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react";
import ItemOrden from "./itemsPanel/itemsOrden";
import axios from "axios";
import ItemVehiculo from "./itemsPanel/itemsVehiculo";
import styles from './itemsPanel.module.css';
import ItemPeritaje from "./itemsPanel/itemsPeritajes";


const API = import.meta.env.VITE_API_URL;


export default function ItemsPanel(){
    const initialState = { vehiculos: 0, vehiculosPeritados: 0 };
const [vehiculosCount, setVehiculoCount] = useState(initialState);

useEffect(() => {
  axios.get(`${API}/vehiculo/panel`)
    .then(({ data }) => {
      setVehiculoCount({
        vehiculos: Number(data?.vehiculos) || 0,
        vehiculosPeritados: Number(data?.vehiculosPeritados) || 0,
      });
    })
    .catch(() => setVehiculoCount(initialState));
}, []);
const initialStateOrden = { ordenesMasDe7: 0, ordenesPeligro: 0 };
const [ordenStats, setOrdenStats] = useState(initialStateOrden);

useEffect(() => {
  axios.get(`${API}/orden-trabajo/panel`)
    .then(({ data }) => {
      setOrdenStats({
        ordenesMasDe7: Number(data?.ordenesMasDe7) || 0,
        ordenesPeligro: Number(data?.ordenesPeligro) || 0,
      });
    })
    .catch(() => setOrdenStats(initialStateOrden));
}, []);
const initialStatePeritajes = { finalizados: 0, enProceso: 0, pendientes: 0 };
const [peritajesStats, setPeritajesStats] = useState(initialStatePeritajes);

useEffect(() => {
  axios.get(`${API}/peritaje/panel`)
    .then(({ data }) => {
      setPeritajesStats({
        finalizados: Number(data?.finalizados) || 0,
        enProceso: Number(data?.enProceso) || 0,
        pendientes: Number(data?.pendientes) || 0,
      });
    })
    .catch(() => setPeritajesStats(initialStatePeritajes));
}, []);


    return(
        <div className={styles.contenedor}>
            
                <ItemOrden ordenStats={ordenStats} />
                 <ItemVehiculo vehiculostate={vehiculosCount} />
                 <ItemPeritaje peritajestate={peritajesStats} />


        </div>
    )
}