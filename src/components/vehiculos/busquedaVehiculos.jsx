import styles from './busquedaVehiculo.module.css';
import React, { useState } from 'react';


export default function BusquedaVehiculoss({ onQueryChange, onSearch }){
  const initialState = { codigo: "", marca: "", dominio: "" };
  const [vehiculoData, setVehiculoData] = useState(initialState);

  console.log(vehiculoData);

  const handlerInputChange = (event) => {
    const { name, value } = event.target; // "codigo" | "marca" | "dominio"
    const next = { ...vehiculoData, [name]: value };
    setVehiculoData(next);
    onQueryChange && onQueryChange(next); // el padre decide si hace live-search o no
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch && onSearch({
      codigo: vehiculoData.codigo.trim(),
      marca:  vehiculoData.marca.trim(),
      dominio: vehiculoData.dominio.trim(),
    });
  };

  return (
    <div>
      <form className={styles.formvehiculo} onSubmit={handleSubmit}>
        <div>
          <label>CODIGO</label>
          <input
            type="text"
            value={vehiculoData.codigo}
            name="codigo"
            placeholder="1"
            onChange={handlerInputChange}
          />
        </div>

        <div>
          <label>DOMINIO</label>
          <input
            type="text"
            value={vehiculoData.dominio}
            name="dominio"
            placeholder="AA 173 AB"
            onChange={handlerInputChange}
          />
        </div>

        <div>
          <label>MARCA</label>
          <input
            type="text"
            value={vehiculoData.marca}
            name="marca"
            placeholder="Renault"
            onChange={handlerInputChange}
          />
        </div>

        <button>Buscar</button>
      </form>
    </div>
  );
}