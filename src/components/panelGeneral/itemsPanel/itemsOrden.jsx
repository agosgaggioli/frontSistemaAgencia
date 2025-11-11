import styles from './itemsOrden.module.css';
export default function ItemOrden ({ordenStats}) {
     const { ordenesMasDe7, ordenesPeligro } = ordenStats;
    return (
        <div  className={styles.cardsContainer}>
            <div className={styles.card } >
                <h2 className={styles.cardTitle}>{ordenesPeligro} </h2>
                <h4 className={styles.cardSubtitle}>Ordenes en peligro</h4>
                <p className={styles.cardSmall}>+ de 3 dias de atraso</p>
            </div>
            <div className={styles.cardroja}>
                <h2 className={styles.cardTitle}>{ordenesMasDe7} </h2>
                <h4 className={styles.cardSubtitle}>Ordenes en alerta</h4>
                <p className={styles.cardSmall}>revisar SLA</p>                
            </div>
        </div>
    )
}