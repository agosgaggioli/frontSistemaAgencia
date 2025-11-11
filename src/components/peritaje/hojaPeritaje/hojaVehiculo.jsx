
import styles from './hojaVehiculo.module.css';
export default function HojaVehiculo({ vehiculo }) {

    return (
        <section className={styles.grid3x2}>
            <div className={styles.itemsgrid}>
                <h3>
                    Marca
                </h3>
                <h5>{vehiculo.Marca}</h5>
            </div >
                        <div className={styles.itemsgrid}>
                <h3>
                    Modelo
                </h3>
                <h5>{vehiculo.Modelo}</h5>
            </div>
                        <div className={styles.itemsgrid}>
                <h3>
                    Version
                </h3>
                <h5>{vehiculo.Version}</h5>
            </div>
                        <div className={styles.itemsgrid}>
                <h3>
                    Dominio
                </h3>
                <h5>{vehiculo.TipoVehiculo.Dominio}</h5>
            </div>
                        <div className={styles.itemsgrid}>
                <h3>
                    Color
                </h3>
                <h5>{vehiculo.Color}</h5>
            </div>
                        <div className={styles.itemsgrid}>
                <h3>
                    Kilometros
                </h3>
                <h5>{vehiculo.TipoVehiculo.Kilometros}</h5>
            </div>


        </section>
    )
}