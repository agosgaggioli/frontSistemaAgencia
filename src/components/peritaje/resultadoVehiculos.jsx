import styles from './ResultadoVehiculo.module.css';

export default function ResultadoVehiculos({
  vehiculo = {},
  input = () => {},
  selectedVehiculoId = null
}) {
  const id = vehiculo?.Id_Vehiculo;
  const dominio = vehiculo?.TipoVehiculo?.Dominio ?? "-";
  const isSelected = selectedVehiculoId === id;

  const handlerOnClik = () => {
    input(id); // avisa al padre cuál se eligió
  };

  return (
    <div className={styles.conteiner}>
      <div><strong>Código:</strong> {id ?? "-"}</div>
      <div><strong>Dominio:</strong> {dominio}</div>
      <div><strong>Marca:</strong> {vehiculo?.Marca ?? "-"}</div>
      <div><strong>Modelo:</strong> {vehiculo?.Modelo ?? "-"}</div>
      <button
        onClick={handlerOnClik}
        className={`${styles.boton} ${isSelected ? styles.botonSelected : ""}`}
        aria-pressed={isSelected}
      >
        SELECCIONAR
      </button>
    </div>
  );
}
