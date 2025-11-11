import { useEffect, useState } from 'react';
import styles from './completarOrden.module.css';
import axios from 'axios';
const API = import.meta.env.VITE_API_URL;

export default function CompletarOrden({ peritajeId, vehiculo }) {
  const initialState = {
    encargado: "",
    items: [{ id: null, descripcion: "", tipo: "" }],
    seleccionados: [] // {id, descripcion, tipo}
  };

  const [OrdeData, setOrdenData] = useState(initialState);
  const [opciones, setOpciones] = useState([]);

  // cargar ítems del peritaje seleccionado y resetear selección
  useEffect(() => {
  if (!peritajeId) {
    setOpciones([]);
    setOrdenData(initialState);
    return;
  }

axios.get(`${API}/peritaje/${peritajeId}`)
    .then(res => {
      // Detectar arreglo de items con distintos nombres posibles
      const rawItems =
        res.data?.items ??
        res.data?.itemsPeritaje ??
        res.data?.Items ??
        res.data?.itemsOrden ??
        [];

      // Normalizar a { id, descripcion, tipo } sin tipado
      const norm = (Array.isArray(rawItems) ? rawItems : [])
        .map((it) => ({
          id:
            it && (it.id ?? it.Id ?? it.ID ?? it.id_item ?? null),
          descripcion:
            it && (it.descripcion ?? it.Descripcion ?? it.detalle ?? it.Detalle ?? ""),
          tipo:
            it && (it.tipo ?? it.Tipo ?? it.categoria ?? it.Categoria ?? "")
        }))
        .filter(x => x.descripcion);

      setOpciones(norm);

      // Encargado / responsable opcional
      const enc =
        res.data?.Encargado ??
        res.data?.encargado ??
        res.data?.responsable ??
        "";
      setOrdenData(prev => ({ ...initialState, encargado: enc }));
    })
    .catch((err) => {
      console.error("Error cargando peritaje:", err);
      setOpciones([]);
      setOrdenData(initialState);
    });
}, [peritajeId]);

  const handlerInputChange = (e) => {
    const { name, value } = e.target;
    setOrdenData(prev => ({ ...prev, [name]: value }));
  };

  const handlerItemChange = (index, field, value) => {
    setOrdenData(prev => {
      const items = [...prev.items];
      items[index] = { ...items[index], [field]: value };
      return { ...prev, items };
    });
  };

  const handlerAddRow = () => {
    setOrdenData(prev => ({
      ...prev,
      items: [...prev.items, { id: null, descripcion: "", tipo: "" }]
    }));
  };

  const handleSeleccionarItem = (index) => {
    const it = OrdeData.items[index];
    if (!it?.id) { alert("Elegí un ítem primero"); return; }
    setOrdenData(prev => {
      const yaEsta = prev.seleccionados.some(s => s.id === it.id);
      if (yaEsta) return prev;
      return {
        ...prev,
        seleccionados: [...prev.seleccionados, { id: it.id, descripcion: it.descripcion, tipo: it.tipo }]
      };
    });
  };

  const handlerOnClik = async () => {
  const vehiculoIdNum = Number(vehiculo);
  const responsable = (OrdeData.encargado || "").trim();

  // Asegurar que los ids sean números y armar [{id}]
  const itemsDto = (OrdeData.seleccionados || [])
    .map(s => Number(s.id))
    .filter(n => Number.isFinite(n))
    .map(id => ({ id }));

  if (!vehiculoIdNum) return alert("Falta vehiculoId");
  if (!responsable) return alert("Falta el encargado");
  if (itemsDto.length === 0) return alert("Seleccioná al menos un ítem");

  const body = {
    IdVehiculo: vehiculoIdNum,          // ← nombre exacto que espera el back
    IdPeritaje: Number(peritajeId),     // ← nombre exacto que espera el back
    items: itemsDto,                    // ← [{id: number}]
    responsable
  };

  try {
    console.log("POST ->", body);
    await axios.post(`${(import.meta.env.VITE_API_URL || '').replace(/\/+$/, '')}/orden-trabajo`, body);
    alert("Orden guardada correctamente");

    // B) Re-fetch del peritaje para ver estados actualizados en la UI
    const res = await axios.get(`${API}/peritaje/${peritajeId}`);
    const rawItems =
      res.data?.items ??
      res.data?.itemsPeritaje ??
      res.data?.Items ??
      res.data?.itemsOrden ??
      [];

    const norm = (Array.isArray(rawItems) ? rawItems : [])
      .map(it => ({
        id: it?.id ?? it?.Id ?? it?.ID ?? it?.id_item ?? null,
        descripcion: it?.descripcion ?? it?.Descripcion ?? it?.detalle ?? it?.Detalle ?? "",
        tipo: it?.tipo ?? it?.Tipo ?? it?.categoria ?? it?.Categoria ?? "",
        estado: it?.estado ?? it?.Estado ?? ""
      }))
      .filter(x => x.descripcion);

    setOpciones(norm);           // ← ahora vas a ver el estado "PROCESO"
    setOrdenData(initialState);  // limpiar el formulario
  } catch (err) {
    console.error(err);
    const msg = err?.response?.data?.message || "Se produjo un error al guardar";
    alert(msg);
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
          Para completar la orden, primero seleccioná el peritaje y luego ingresá el encargado; finalmente seleccioná los ítems que van a realizar.
        </p>

        <div className={styles.busquedas}>
          <div className={styles.busqueda}>
            <label>ENCARGADO</label>
            <input
              className={styles.input}
              type="text"
              name="encargado"
              value={OrdeData.encargado}
              onChange={handlerInputChange}
            />
          </div>

          <div>
            <button type="button" onClick={handlerAddRow} className={styles.botonMas}>+</button>
          </div>

          {OrdeData.items.map((item, i) => (
            <div key={i} className={styles.descripcion}>
              <div>
                <label>ITEM</label>
                <select
                  value={item.descripcion}
                  onChange={(e) => {
                    const desc = e.target.value;
                    if (!desc) {
                      handlerItemChange(i, "descripcion", "");
                      handlerItemChange(i, "tipo", "");
                      handlerItemChange(i, "id", null);
                      return;
                    }
                    const found = (opciones || []).find(op => op && op.descripcion === desc) || null;
                    handlerItemChange(i, "descripcion", desc);
                    handlerItemChange(i, "tipo", found?.tipo ?? "");
                    handlerItemChange(i, "id", found?.id ?? null);   // ← AQUÍ guardás el ID
                  }}
                >
                  <option value="">Seleccionar</option>
                  {(opciones || []).filter(Boolean).map(op => (
                    <option key={op.id} value={op.descripcion}>
                      {op.descripcion}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={() => handleSeleccionarItem(i)}
                disabled={!item?.id}
              >
                Seleccionar
              </button>
            </div>
          ))}

          <div className={styles.seleccionados}>
            <h3>Items Seleccionados:</h3>
            <ul>
              {OrdeData.seleccionados.map((s, idx) => (
                <li key={idx}>
                  #{s.id} — {s.descripcion} {s.tipo ? `(${s.tipo})` : ""}
                </li>
              ))}
            </ul>
          </div>

          <button className={styles.botonGuardar} type="button" onClick={handlerOnClik}>
            Guardar
          </button>
        </div>
      </div>
    </section>
  );
}
