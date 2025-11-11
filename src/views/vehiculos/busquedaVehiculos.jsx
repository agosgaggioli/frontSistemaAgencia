import axios from "axios"
import styles from './busquedaVehiculo.module.css';
import { useEffect, useState } from "react";
import BusquedaVehiculoss from "../../components/vehiculos/busquedaVehiculos";
import { useNavigate } from "react-router-dom";
import { exportVehiculosExcel } from "../../utils/excelExport";
const API = import.meta.env.VITE_API_URL;

export default function BusquedaVehiculos() {
    const [vehiculos, setVehiculos] = useState([]);

    
    const [url, setUrl] = useState(`${API}/vehiculo/`);

   
    useEffect(() => {
        axios.get(url).then((res) => setVehiculos(res.data));
    }, [url]);

    const nav = useNavigate();

    const handleSi = (v) => {
        localStorage.removeItem("IdHoja");
        localStorage.setItem("IdHoja", String(v))
        nav("/hojaPeritaje")
    }
    const handleNo = () => nav("/nuevoPeritaje");

    return (
        <>
            <section>
                <div className={styles.minibanner}>
                    <h2>Area Stock - Busqueda Vehiculo</h2>
                </div>
            </section>

            <section className={styles.conteiner} >
                <article>
                    
                    <BusquedaVehiculoss
                        onSearch={({ codigo, marca, dominio }) => {
                            const qs = new URLSearchParams();
                            if (codigo)  qs.set("Id_Vehiculo", codigo); 
                            if (marca)   qs.set("marca", marca);
                            if (dominio) qs.set("dominio", dominio);

                            const nextUrl = qs.toString()
                                ? `${API}/vehiculo/search?${qs.toString()}`
                                :  `${API}/vehiculo/ `;

                            setUrl(nextUrl);
                        }}
                    />
                </article>

                <article className={styles.superContenedor}>
                    <button 
                     className={styles.superContenedorBoton}
  onClick={() => exportVehiculosExcel(vehiculos)}>descargar excel</button>
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
                                <th></th>
                            </tr>
                        </thead>

                        <tbody>
                            {vehiculos.map((v) => {
                                const esSi = (v.Peritada ?? "").toString().trim().toUpperCase() === "SI";
                                return (
                                    <tr key={v.Id_Vehiculo}>
                                        <td>{v.Marca}</td>
                                        <td>{v.Modelo}</td>
                                        <td>{v.Version}</td>
                                        <td>{v.Transmision}</td>
                                        <td>{v.Combustible}</td>
                                        <td>{v.Color}</td>
                                        <td>{v.UBICACION}</td>
                                        <td>{v.TipoVehiculo?.Dominio }</td>
                                        <td>{v.TipoVehiculo?.Kilometros}</td>
                                        <td>
                                            <button
                                                type="button"
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    const idHoja = v?.HojasTrabajo?.[0]?.Id;   
                                                    esSi ? handleSi(idHoja) : handleNo();
                                                }}
                                                className={`${styles["btn-peritada"]} ${esSi ? styles.si : ""}`}
                                            >
                                                {v.Peritada || "-"}
                                            </button>
                                        </td>
                                        <td><button><i className="fa fa-pencil-alt"></i></button></td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </article>
            </section>
        </>
    );
}