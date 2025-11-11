import CreateForm from "../../components/vehiculos/createForm"
import styles from './vehiculoCreate.module.css';

function VehiculoCreate() {
    return(
        <main>
            <section>
            <div className={styles.minibanner}>
                <h2>Area Stock - Registar Nuevo Vehiculo</h2>
            </div>
        </section>
            <CreateForm/>
        </main>
    )
}
export default VehiculoCreate