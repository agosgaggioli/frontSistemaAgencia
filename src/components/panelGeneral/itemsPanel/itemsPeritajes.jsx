import styles from './itemsOrden.module.css';
export default function ItemPeritaje ({peritajestate}) {
     const {finalizados, enProceso, pendientes  } = peritajestate;
    return (
        <div  className={styles.cardsContainer}>
            <div className={styles.cardvioleta } >
                <h2 className={styles.cardTitle}>{finalizados} </h2>
                <h4 className={styles.cardSubtitle}>Peritajes finalizados</h4>
            </div>
            <div className={styles.cardceleste}>
                <h2 className={styles.cardTitle}>{enProceso} </h2>
                <h4 className={styles.cardSubtitle}>Peritajes en Proceso</h4>                
            </div>
            <div className={styles.cardrosa}>
                <h2 className={styles.cardTitle}>{pendientes} </h2>
                <h4 className={styles.cardSubtitle}>Peritajes pendientes</h4>              
            </div>
        </div>
    )
}