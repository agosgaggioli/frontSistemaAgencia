import { useState } from 'react';
import styles from './busquedaPeritaje.module.css';
export default function ResultadoPeritaje({ peritaje , input}) {
  const [activo, setActivo] = useState(false);
 const handlerOnClik = ()=>{
  setActivo((v) => !v);
    input(peritaje.Id, peritaje.Vehiculo.Id_Vehiculo)

 }
  return (
    <div className={styles.conteiner}>
      <div><strong>Código:</strong> { peritaje.Id ?? "-"}</div>
      <div><strong>Marca:</strong> { peritaje.Vehiculo.Marca ?? "-"}</div>
      <div><strong>Modelo:</strong> { peritaje.Vehiculo.Modelo ?? "-"}</div>
      <button
      className={`${styles.boton} ${activo ? styles.activo : ""}`}
      onClick={handlerOnClik}
      type="button"
    >
      SELECCIONAR
    </button>
    </div>
  );
}