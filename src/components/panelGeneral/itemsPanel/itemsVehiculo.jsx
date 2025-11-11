import styles from './itemsOrden.module.css';
export default function ItemVehiculo ({vehiculostate}) {
     const { vehiculos, vehiculosPeritados } = vehiculostate;
    return (
        <div  className={styles.cardsContainer}>
            <div className={styles.cardazul } >
                <h2 className={styles.cardTitle}>{vehiculos} </h2>
                <h4 className={styles.cardSubtitle}>Vehiculos</h4>
                <p className={styles.cardSmall}>stock actual</p>
            </div>
            <div className={styles.cardverde}>
                <h2 className={styles.cardTitle}>{vehiculosPeritados} </h2>
                <h4 className={styles.cardSubtitle}>Vehiculos peritados</h4>
                <p className={styles.cardSmall}>hojas de trabajo</p>                
            </div>
        </div>
    )
}