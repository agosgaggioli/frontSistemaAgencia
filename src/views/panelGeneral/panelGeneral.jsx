import BotonesNav from "../../components/panelGeneral/botonesNav";
import GraficoVehiculosPeritados from "../../components/panelGeneral/grafico";
import ItemsPanel from "../../components/panelGeneral/itemsPanel";
import OrdenAlerta from "../../components/panelGeneral/ordenAlerta";
import styles from './panelGeneral.module.css';


export default function PanelGeneral() {


    return (
        <main>
            <section className={styles.panelHeader}>
                <article>
                    <h1 className={styles.tituloPrincipal}>Panel General</h1>
                    <h4  className={styles.subtitulo}>Degra Automotores</h4>
                </article>
                <article >
                    <BotonesNav/>
               
                </article>
            </section>
            <section className={styles.cards}>
                <ItemsPanel/>
            </section>
            <section className={styles.panelPrincipal}>
                <article>
                     <GraficoVehiculosPeritados/>
                </article>
                <article>
                     <OrdenAlerta/>
                </article>
            </section>
        </main>
    );
}