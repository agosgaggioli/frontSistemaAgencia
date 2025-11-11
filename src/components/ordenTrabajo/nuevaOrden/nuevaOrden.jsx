import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./nuevaOrden.module.css";
import ResultadoPeritaje from "../busquedaPeritaje/busquedaPeritaje";
import axios from "axios";
const API = import.meta.env.VITE_API_URL;



// Helper muy simple: AAA123 o AA123AA (acepta con/sin espacio)
const isFullPlate = (str) => {
  const v = (str ?? "").toUpperCase().replace(/\s+/g, "");
  return /^[A-Z]{3}\d{3}$/.test(v) || /^[A-Z]{2}\d{3}[A-Z]{2}$/.test(v);
};

export default function NuevaOrdenBusqueda({ onPeritajeChange }) {
  const nav = useNavigate();

  const [peritajeData, setPeritajeData] = useState({ codigo: "" });
  const [peritajeRta, setPeritajeRta] = useState(null);

  const handlerOnClick = () => {
    nav("/nuevoPeritaje");
  };

  const handlerSeleccionar = (id, vehiculo) => {
    localStorage.removeItem("peritaje");
    localStorage.setItem("peritaje", JSON.stringify(id));
    onPeritajeChange?.(id, vehiculo);
  };

  const handlerInputChange = (event) => {
    const { name, value } = event.target;

    const next = { ...peritajeData, [name]: value };
    setPeritajeData(next);

    if (name !== "codigo") return;

    const codigo = value.trim();
    if (!codigo) {
      setPeritajeRta(null);
      return;
    }

    
    axios.get(`${API}/peritaje?dominio=${encodeURIComponent(codigo || '')}`)
      .then(({ data }) => {
        const arr = Array.isArray(data) ? data : data ? [data] : [];

        // si parece patente completa -> dejar solo la coincidencia EXACTA
        if (isFullPlate(codigo)) {
          const q = codigo.toUpperCase().replace(/\s+/g, "");
          const exact = arr.filter((p) => {
            const dom = (p?.Vehiculo?.TipoVehiculo?.Dominio ?? "")
              .toUpperCase()
              .replace(/\s+/g, "");
            return dom === q;
          });
          setPeritajeRta(exact);
        } else {
          // si es búsqueda parcial, mostramos todas las coincidencias
          setPeritajeRta(arr);
        }
      })
      .catch(() => {
        alert("Se produjo un error");
      });
  };

  return (
    <div>
      <div className={styles.conteiner}>
        <div className={styles.conteinerTitulo}>
          <h3>Buscar Hoja Trabajo</h3>
        </div>

        <div className={styles.conteinerPaso}>
          <h4>Paso 1: Buscar Hoja</h4>
          <button onClick={handlerOnClick} className={styles.botton}>
            NUEVO PERITAJE
          </button>
        </div>

        <p className={styles.pDiseño}>
          Para continuar, seleccioná una hoja de trabajo que ya esté cargada en el sistema. Podés
          buscarla por <span>código o encargado</span>. No es necesario completar todos los campos.
        </p>

        <form className={styles.busquedas}>
          <div className={styles.busqueda}>
            <label>DOMINIO</label>
            <input
              className={styles.input}
              type="text"
              value={peritajeData.codigo}
              name="codigo"
              placeholder="Ej: APP 456 o AB123CD"
              onChange={handlerInputChange}
            />
          </div>
        </form>
      </div>

      {peritajeRta !== null &&
        (peritajeRta.length > 0 ? (
          peritajeRta.map((r) => (
            <ResultadoPeritaje key={r.Id} peritaje={r} input={handlerSeleccionar} />
          ))
        ) : (
          <p>No se encontraron unidades.</p>
        ))}
    </div>
  );
}