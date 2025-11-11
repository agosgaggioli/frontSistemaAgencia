import BuscarUnidad from "../../components/peritaje/busquedaUnidad"
import CompletarPeritaje from "../../components/peritaje/completarPeritaje"
import styles from './nuevoPeritaje.module.css';

export default function NuevoPeritaje() {
    return (
        
        <div>
            <section>
                <div className={styles.minibanner}>
                    <h2>Area Peritaje - Nuevo Peritaje</h2>
                </div>
            </section>
            <div className={styles.main}>
            
            <BuscarUnidad />
            <CompletarPeritaje />
        </div>
        </div>

    )
}