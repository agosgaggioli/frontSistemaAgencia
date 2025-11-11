
import { Link } from 'react-router-dom';
import styles from './navBar.module.css';
export default function NavBar(){
    return(
    <header className={styles.conteiner}>
      <nav className={styles.nav}>
      <details className={styles.menu}>
        <summary className={styles.button}>AREA STOCK</summary>
        <ul className={styles.dropdown}>
          <li><Link to="/buscarUnidad" className={styles.item}>Buscar Unidad</Link></li>
          <li><Link to="/nuevaUnidad" className={styles.item}>Nueva Unidad</Link></li>
        </ul>
      </details>

      <details className={styles.menu}>
        <summary className={styles.button}>PERITAJE</summary>
        <ul className={styles.dropdown}>
          <li><Link to="/nuevoPeritaje" className={styles.item}>Nuevo Peritaje</Link></li>
           <li><Link to="/misHojas" className={styles.item}>Hojas Trabajo</Link></li>
        </ul>
      </details>
        <details className={styles.menu}>
        <summary className={styles.button}>ORDEN TRABAJO</summary>
        <ul className={styles.dropdown}>
          <li><Link to="/nuevaOrden" className={styles.item}>Nueva Orden</Link></li>
           <li><Link to="/ordenes" className={styles.item}>Orden Trabajo</Link></li>
        </ul>
      </details>
           {/* Botón Home con el favicon */}
       <Link to="/" className={styles.homeBtn} aria-label="Inicio">
          <i className={`fa-solid fa-house ${styles.homeIcon}`} aria-hidden="true"></i>
        </Link>
    </nav>

    </header>
    )
}