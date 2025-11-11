import { useNavigate } from 'react-router-dom';
import styles from './tableVehiculo.module.css';
export default function CardVehiculo({ vehiculo}) {
  const nav= useNavigate()
  const handleSi = () => {
  // lo que quieras cuando es SI
  // ej: navigate("/peritacion/" + vehiculo.Id_Vehiculo)
};

const handleNo = () => {
  nav("/misHojas")
};

const esSi =
  (vehiculo.Peritada ?? "").toString().trim().toUpperCase() === "SI";

  return (
    <table className={styles.table}>
      <thead>
        <tr>
          <th>Marca</th>
          <th>Modelo</th>
          <th>Versión</th>
          <th>Transmisión</th>
          <th>Combustible</th>
          <th>Color</th>
          <th>Ubicación</th>
          <th>Dominio</th>
          <th>Kilómetros</th>
          <th>Peritada</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>{vehiculo.Marca}</td>
          <td>{vehiculo.Modelo}</td>
          <td>{vehiculo.Version}</td>
          <td>{vehiculo.Transmision}</td>
          <td>{vehiculo.Combustible}</td>
          <td>{vehiculo.Color}</td>
          <td>{vehiculo.UBICACION}</td>
          <td>{vehiculo.TipoVehiculo?.Dominio || "-"}</td>
          <td>{vehiculo.TipoVehiculo?.Kilometros || "-"}</td>
          <td>
            <button
              type="button"
              onClick={() => (esSi ? handleSi() : handleNo())}
              className={`${styles["btn-peritada"]} ${esSi ? styles.si : ""}`}
            >
              {vehiculo.Peritada ?? "-"}
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  );
}