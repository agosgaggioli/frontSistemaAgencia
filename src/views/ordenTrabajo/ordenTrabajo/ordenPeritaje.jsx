import { useEffect, useState } from "react";
import axios from "axios";
import OrdenesPorPeritaje from "../../../components/ordenTrabajo/ordenesPorPeritaje/ordenesPorPeritaje";
import styles from "./ordenPeritaje.module.css";

const API = import.meta.env.VITE_API_URL;

export default function OrdenPeritaje() {
  const raw = localStorage.getItem("IdHoja");
  const hojaId = raw ? Number(raw) : null;

  // 👇 objeto o null (no array)
  const [hojaTrabajo, setHojaTrabajo] = useState(null);

  useEffect(() => {
    if (hojaId == null) return;
    axios
      .get(`${API}/peritaje/${hojaId}`)
      .then(({ data }) => {
        console.log("Peritaje ->", data);
        setHojaTrabajo(data);
      })
      .catch((err) => {
        console.error(err);
        alert("Se ha producido un error");
      });
  }, [hojaId]);

  if (!hojaTrabajo) return null; // o un loader

  return (
    <div>
      <section>
        <div className={styles.minibanner}>
          <h2>Area Peritaje - Ordenes Trabajo</h2>
        </div>
      </section>

      <div className={styles.text}>
        <h1>
          Hoja peritaje #<span>{hojaTrabajo.Id}</span>
        </h1>
        <h2>
          Encargado: <span>{hojaTrabajo.responsable}</span>
        </h2>
      </div>

      {/* ✅ usar 'ordenes' que viene del back */}
      <OrdenesPorPeritaje ordenes={hojaTrabajo.ordenes || []} />
    </div>
  );
}