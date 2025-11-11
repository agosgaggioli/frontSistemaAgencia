import axios from 'axios';
import styles from './busquedaUnidad.module.css';
import { useContext, useState } from 'react';
import ResultadoVehiculos from './resultadoVehiculos';
import { useNavigate } from 'react-router-dom';
import { VehiculoContext } from '../../context/vehiculo';

const API = import.meta.env.VITE_API_URL;



export default function BuscarUnidad() {
  const { setVehiculo } = useContext(VehiculoContext);

  const [selectedVehiculoId, setSelectedVehiculoId] = useState(null); // ← NUEVO
  const initialState = { codigo: "", marca: "", dominio: "" };
  const [vehiculoData, setVehiculoData] = useState(initialState);
  const [vehiculoRta, setVehiculoRta] = useState(null);

  const nav = useNavigate();

  const handlerOnClick = () => nav("/nuevaUnidad");

  // cuando el hijo selecciona
  const handleSeleccionar = (id) => {
    setSelectedVehiculoId(prev => (prev === id ? null : id)); // uno solo
    setVehiculo(id);                                          // context
    localStorage.setItem("vehiculo", JSON.stringify(id));     // opcional
  };

  // búsqueda en cada cambio
  const handlerInputChange = (event) => {
    const { name, value } = event.target;
    const next = { ...vehiculoData, [name]: value };
    setVehiculoData(next);

    const codigo  = next.codigo.trim();
    const marca   = next.marca.trim();
    const dominio = next.dominio.trim();

    if (!codigo && !marca && !dominio) {
      setVehiculoRta(null);
      return;
    }

    const qs = new URLSearchParams();
    if (codigo)  qs.set("Id_Vehiculo", codigo);
    if (marca)   qs.set("marca", marca);
    if (dominio) qs.set("dominio", dominio);

    const base = API;
    axios.get(`${base}/vehiculo/search?${qs.toString()}`)
      .then(({ data }) => {
        const arr = Array.isArray(data) ? data : data ? [data] : [];
        setVehiculoRta(arr);
      })
      .catch((error) => {
        console.log(error);
        alert("se ha producido un error");
      });
  };

  return (
    <div>
      <div className={styles.conteiner}>
        <div className={styles.conteinerTitulo}>
          <h3>Buscar Unidad</h3>
        </div>

        <div className={styles.conteinerPaso}>
          <h4>Paso 1: Buscar unidad</h4>
          <button onClick={handlerOnClick} className={styles.botton}>NUEVA UNIDAD</button>
        </div>

        <p className={styles.pDiseño}>
          Para continuar, seleccioná una unidad ya cargada. Podés buscar por
          <span> código, dominio o marca.</span>
        </p>

        <form className={styles.busquedas}>
          <div className={styles.busqueda}>
            <label>DOMINIO</label>
            <input
              className={styles.input}
              type="text"
              value={vehiculoData.dominio}
              name="dominio"
              placeholder="AA 173 AB"
              onChange={handlerInputChange}
            />
          </div>
          <div className={styles.busqueda}>
            <label>MARCA</label>
            <input
              className={styles.input}
              type="text"
              value={vehiculoData.marca}
              name="marca"
              placeholder="Volkswagen"
              onChange={handlerInputChange}
            />
          </div>
          <div className={styles.busqueda}>
            <label>CÓDIGO</label>
            <input
              className={styles.input}
              type="text"
              value={vehiculoData.codigo}
              name="codigo"
              placeholder="Ej: 1"
              onChange={handlerInputChange}
            />
          </div>
        </form>
      </div>

      {vehiculoRta !== null && (
        vehiculoRta.length > 0 ? (
          vehiculoRta.map(r => (
            <ResultadoVehiculos
              key={r.Id_Vehiculo}
              vehiculo={r}
              input={handleSeleccionar}                 // ← usa este
              selectedVehiculoId={selectedVehiculoId}   // ← ahora existe
            />
          ))
        ) : (
          <p>No se encontraron unidades.</p>
        )
      )}
    </div>
  );
}