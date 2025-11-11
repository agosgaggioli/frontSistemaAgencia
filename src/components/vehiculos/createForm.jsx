import styles from './createForm.module.css';
import { validateVehiculo } from '../../helpers/validateVehiculo';
import { useState } from 'react';
import axios from 'axios';

// Limpia barras finales por si VITE_API_URL viene con "/"
const API = (import.meta.env.VITE_API_URL || '').replace(/\/+$/, '');

function CreateForm() {
  const initialState = {
    marca: '',
    modelo: '',
    version: '',
    transmision: '',
    combustible: '',
    color: '',
    anio: '',          // <- SIN tilde
    dominio: '',
    kilometros: '',
    observaciones: ''
  };

  const [vehiculoData, setVehiculoData] = useState(initialState);
  const [errorsData, setErrorsData] = useState(initialState);

  const handlerOnSubmit = async (event) => {
    event.preventDefault();

    const body = {
      Marca: vehiculoData.marca,
      Modelo: vehiculoData.modelo,
      Version: vehiculoData.version,
      Transmision: vehiculoData.transmision,
      Combustible: vehiculoData.combustible,
      Color: vehiculoData.color,
      TipoVehiculo: {
        anio: Number(vehiculoData.anio),                 // <- clave: anio numérico
        Dominio: vehiculoData.dominio,
        Kilometros: String(vehiculoData.kilometros ?? ''),
        Observaciones: vehiculoData.observaciones
      }
    };

    try {
      const { data } = await axios.post(`${API}/vehiculo`, body); // <- sin espacio final
      alert(
        `Vehículo creado con éxito.
Marca: ${vehiculoData.marca}
Modelo: ${vehiculoData.modelo}
Dominio: ${vehiculoData.dominio}`
      );
      setVehiculoData(initialState);
      setErrorsData(initialState);
    } catch (error) {
      console.error(error);
      const msg =
        error?.response?.data?.message ??
        error?.response?.data ??
        error?.message ??
        'Se ha producido un error';
      alert(msg);
    }
  };

  const handlerInputChange = (event) => {
    const { name, value } = event.target;
    const next = { ...vehiculoData, [name]: value };
    setVehiculoData(next);

    const errs = validateVehiculo(next);
    setErrorsData(errs);
  };

  return (
    <main className={styles.main}>
      <form onSubmit={handlerOnSubmit} className={styles.formvehiculo}>
        <h3>Datos Vehículos</h3>

        <div>
          <label>MARCA</label>
          <input
            type="text"
            value={vehiculoData.marca}
            name="marca"
            placeholder="Volkswagen"
            onChange={handlerInputChange}
          />
          {errorsData.marca && <p>{errorsData.marca}</p>}
        </div>

        <div>
          <label>MODELO</label>
          <input
            type="text"
            value={vehiculoData.modelo}
            name="modelo"
            placeholder="Amarok"
            onChange={handlerInputChange}
          />
          {errorsData.modelo && <p>{errorsData.modelo}</p>}
        </div>

        <div>
          <label>VERSIÓN</label>
          <input
            type="text"
            value={vehiculoData.version}
            name="version"
            placeholder="Trendline 4x2 2.0"
            onChange={handlerInputChange}
          />
          {errorsData.version && <p>{errorsData.version}</p>}
        </div>

        <div>
          <label>TRANSMISIÓN</label>
          <input
            type="text"
            value={vehiculoData.transmision}
            name="transmision"
            placeholder="Manual"
            onChange={handlerInputChange}
          />
          {errorsData.transmision && <p>{errorsData.transmision}</p>}
        </div>

        <div>
          <label>COMBUSTIBLE</label>
          <input
            type="text"
            value={vehiculoData.combustible}
            name="combustible"
            placeholder="Diésel"
            onChange={handlerInputChange}
          />
          {errorsData.combustible && <p>{errorsData.combustible}</p>}
        </div>

        <div>
          <label>COLOR</label>
          <input
            type="text"
            value={vehiculoData.color}
            name="color"
            placeholder="Blanco"
            onChange={handlerInputChange}
          />
          {errorsData.color && <p>{errorsData.color}</p>}
        </div>

        <div>
          <label>AÑO</label>
          <input
            type="text"
            value={vehiculoData.anio}   // <- anio
            name="anio"                 // <- anio
            placeholder="2019"
            onChange={handlerInputChange}
          />
          {errorsData.anio && <p>{errorsData.anio}</p>} {/* <- anio */}
        </div>

        <div>
          <label>DOMINIO</label>
          <input
            type="text"
            value={vehiculoData.dominio}
            name="dominio"
            placeholder="AA 656 FC"
            onChange={handlerInputChange}
          />
          {errorsData.dominio && <p>{errorsData.dominio}</p>}
        </div>

        <div>
          <label>KILÓMETROS</label>
          <input
            type="text"
            value={vehiculoData.kilometros}
            name="kilometros"
            placeholder="120000"
            onChange={handlerInputChange}
          />
          {errorsData.kilometros && <p>{errorsData.kilometros}</p>}
        </div>

        <div>
          <label>OBSERVACIONES</label>
          <input
            type="text"
            value={vehiculoData.observaciones}
            name="observaciones"
            placeholder="Service realizados en agencia oficial..."
            onChange={handlerInputChange}
          />
          {errorsData.observaciones && <p>{errorsData.observaciones}</p>}
        </div>

        <button>Registrar</button>
      </form>
    </main>
  );
}

export default CreateForm;
