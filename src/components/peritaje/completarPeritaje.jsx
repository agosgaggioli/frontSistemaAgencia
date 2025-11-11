import { useState } from 'react';
import styles from './completarPeritaje.module.css';
import axios from 'axios';
import { useContext } from 'react';
import { VehiculoContext } from '../../context/vehiculo';

const API = import.meta.env.VITE_API_URL;

const POST_HOJA = `${API}/peritaje`;


export default function CompletarPeritaje() {
    const { Id_Vehiculo } = useContext(VehiculoContext)
    const initialState = {
        encargado: "",
        items: [{ descripcion: "", tipo: "" }]
    };
    const [HojaData, setHojaData] = useState(initialState);
    console.log(HojaData)

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

    // ← Agregar fila: solo empujá un item nuevo
    const handlerAddRow = () => {
        setHojaData(prev => ({
            ...prev,
            items: [...prev.items, { descripcion: "", tipo: "" }]
        }));
    };
    const handlerOnClik = () => {
        const hojaDataa = {
            responsable: HojaData.encargado,                 // nombre que pide el DTO
            Fecha: new Date().toISOString(),                 // Date en ISO OK
            itemsPeritaje: (HojaData.items ?? []).map(it => ({
                Descripcion: it.descripcion,                   // ⇢ mayúsculas
                Tipo: it.tipo,
            })),
            Id_Vehiculo: Number(Id_Vehiculo),                // ⇢ number
        };
        axios
            .post(POST_HOJA, hojaDataa)
            .then(({ data }) => {
                console.log("Guardado OK:", data);
                alert("Peritaje guardado correctamente");

                setHojaData(initialState);
            })
            .catch((err) => {
                console.error(err);
                const msg =
                    err?.response?.data?.message || "Se produjo un error al guardar";
                alert(msg);
            })
    }

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
                    <div className={styles.busqueda}>
                        <label>PERITADOR</label>
                        <input
                            className={styles.input}
                            type="text"
                            name="encargado"
                            value={HojaData.encargado}
                            onChange={handlerInputChange}
                        />
                    </div>

                    <div>
                        <button type="button" onClick={handlerAddRow} className={styles.botonMas}>+</button>
                    </div>

                    {HojaData.items.map((item, i) => (
                        <div key={i} className={styles.descripcion}>
                            <div>
                                <label>DESCRIPCION</label>
                                <input
                                    className={styles.inputd}
                                    type="text"
                                    name={`descripcion_${i}`}
                                    value={item.descripcion}
                                    onChange={(e) => handlerItemChange(i, "descripcion", e.target.value)}
                                />
                            </div>
                            <div>
                                <label>TIPO</label>
                                <input
                                    className={styles.inputd}
                                    type="text"
                                    name={`tipo_${i}`}
                                    value={item.tipo}
                                    onChange={(e) => handlerItemChange(i, "tipo", e.target.value)}
                                />
                            </div>
                        </div>
                    ))}

                    <button className={styles.botonGuardar} type="button" onClick={handlerOnClik}>Guardar</button>
                </div>
            </div>
        </section>
    );
}
