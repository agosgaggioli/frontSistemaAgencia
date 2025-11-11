import { useNavigate } from "react-router-dom"
import styles from './botonesNav.module.css';

export default function BotonesNav(){
    const nav = useNavigate()
    const handlerUnidad = () =>{
        nav("/nuevaUnidad")
    }
        const handlerPeritaje = () =>{
        nav("/nuevoPeritaje")
    }
        const handlerOrden = () =>{
        nav("/nuevaOrden")
    }
    return(
        <div className={styles.actions}>
            <button className ={styles.button} onClick={handlerPeritaje}>
                Nuevo Peritaje
            </button>
            <button className ={styles.button}  onClick={handlerUnidad}>
                Nuevo Vehiculo
            </button>
            <button className ={styles.button}  onClick={handlerOrden}>
                Nueva Orden
            </button>
        </div>
    )
}