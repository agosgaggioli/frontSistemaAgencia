import { useNavigate } from "react-router-dom"

import { useEffect, useState } from "react";
import ItemOrden from "./itemsPanel/itemsOrden";
import axios from "axios";
import ItemVehiculo from "./itemsPanel/itemsVehiculo";
import ItemPeritaje from "./itemsPanel/itemsPeritajes";
import ItemOrdenAlerta from "./ordenAlerta/ordenAlertaItems";

const API = import.meta.env.VITE_API_URL;

export default function OrdenAlerta(){
    const initialStateRetrasadas = []; // array de órdenes
const [ordenesRetrasadas, setOrdenesRetrasadas] = useState(initialStateRetrasadas);

useEffect(() => {
  axios
    .get(`${API}/orden-trabajo/vehiculosAlerta`) 
    .then(({ data }) => {
      setOrdenesRetrasadas(Array.isArray(data) ? data : []);
    })
    .catch(() => {
      setOrdenesRetrasadas(initialStateRetrasadas);
    });
}, []);


    return(
        <div >
            
                <ItemOrdenAlerta ordenAlerta={ordenesRetrasadas} />



        </div>
    )
}