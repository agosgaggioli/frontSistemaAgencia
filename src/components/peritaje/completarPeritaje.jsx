import { useState, useContext } from 'react';
import styles from './completarPeritaje.module.css';
import axios from 'axios';
import { VehiculoContext } from '../../context/vehiculo';

const API = import.meta.env.VITE_API_URL;
const POST_HOJA = `${API}/peritaje`;

export default function CompletarPeritaje() {
  const { Id_Vehiculo } = useContext(VehiculoContext);

  const initialState = {
    encargado: "",
    items: [{ descripcion: "", tipo: "" }]
  };

  const [HojaData, setHojaData] = useState(initialState);
  const [loading, setLoading] = useState(false); // 👈 evita doble click

  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setHojaData(prev => ({ ...prev, [name]: value }));
  };

  const handlerItemChange = (index, field, value) => {
    setHojaData(prev => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

  const handlerAddRow = () => {
    if (loading) return; // 👈 NO permitir agregar mientras guarda
    setHojaData(prev => ({
      ...prev,
      items: [...prev.items, { descripcion: "", tipo: "" }]
    }));
  };

  const handlerOnClik = async () => {
    if (loading) return; // 👈 BLOQUEA DOBLE CLICK

    const hojaDataa = {
      responsable: HojaData.encargado,
      Fecha: new Date().toISOString(),
      itemsPeritaje: (HojaData.items ?? []).map(it => ({
        Descripcion: it.descripcion,
        Tipo: it.tipo,
      })),
      Id_Vehiculo: Number(Id_Vehiculo),
    };

    try {
      setLoading(true); // ⛔ bloquea todo

      const { data } = await axios.post(POST_HOJA, hojaDataa);

      console.log("Guardado OK:", data);
      alert("Peritaje guardado correctamente");

      setHojaData(initialState);

    } catch (err) {
      console.error(err);
      const msg = err?.response?.data?.message || "Se produjo un error al guardar";
      alert(msg);

    } finally {
      setLoading(false); // 🔓 vuelve a habilitar el botón
    }
  };

  return (
    <section>
      <div className={styles.conteiner}>
        <div className={styles.conteinerTitulo}>
          <h3>Completar Ficha</h3>
        </div>

        <div className={styles.conteinerPaso}>
          <h4>Paso 2: Completar peritaje</h4>
        </div>

        <p className={styles.pDiseño}>
          Para completar el peritaje, primero seleccioná la unidad y luego ingresá el peritador, la descripción del ítem y el tipo; <span>podés agregar más de un ítem antes de guardar.</span>
        </p>

        <div className={styles.busquedas}>
          
          {/* PERITADOR */}
          <div className={styles.busqueda}>
            <label>PERITADOR</label>
            <input
              className={styles.input}
              type="text"
              name="encargado"
              value={HojaData.encargado}
              onChange={handlerInputChange}
              disabled={loading} // OPCIONAL
            />
          </div>

          {/* BOTÓN + */}
          <div>
            <button
              type="button"
              onClick={handlerAddRow}
              className={styles.botonMas}
              disabled={loading}
            >
              +
            </button>
          </div>

          {/* ITEMS */}
          {HojaData.items.map((item, i) => (
            <div key={i} className={styles.descripcion}>
              
              <div>
                <label>DESCRIPCION</label>
                <input
                  className={styles.inputd}
                  type="text"
                  value={item.descripcion}
                  onChange={(e) => handlerItemChange(i, "descripcion", e.target.value)}
                  disabled={loading}
                />
              </div>

              <div>
                <label>TIPO</label>
                <input
                  className={styles.inputd}
                  type="text"
                  value={item.tipo}
                  onChange={(e) => handlerItemChange(i, "tipo", e.target.value)}
                  disabled={loading}
                />
              </div>

            </div>
          ))}

          {/* BOTÓN GUARDAR SIN DOBLE CLICK */}
          <button
            className={styles.botonGuardar}
            type="button"
            onClick={handlerOnClik}
            disabled={loading}
          >
            {loading ? "Guardando..." : "Guardar"}
          </button>

        </div>
      </div>
    </section>
  );
}
