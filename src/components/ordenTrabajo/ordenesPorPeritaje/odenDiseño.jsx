import { useState } from "react";
import ModalOrde from "../ordenTrabajo/modalOrden";
import styles from "./odenDiseño.module.css";

export default function OrdenesDiseño({ orden, onSelect }) {
  const [modal, setModal] = useState(false);

  const handlerOnclick = () => {
    setModal(true);
    onSelect && onSelect();
  };

  const handlerClose = () => setModal(false);

  return (
    <div className={styles.conteiner}>
      <h3>{orden.Id}</h3>
      <h3>{orden.estado}</h3>
      <h3>{orden.responsable}</h3>
      <button onClick={handlerOnclick}>Abrir</button>
      {modal && <ModalOrde id={orden.Id} handlerClose={handlerClose} />}
    </div>
  );
}