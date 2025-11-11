
import NavBar from "./components/navBar/navBar";
import ListaOrden from "./components/ordenTrabajo/ordenTrabajo/ordenTrabajo";
import MisOrdenes from "./views/ordenTrabajo/listaOrdenes/listaOrdenes";
import NuevoOrden from "./views/ordenTrabajo/nuevaOrden/nuevaOrdenTrabajo";
import OrdenPeritaje from "./views/ordenTrabajo/ordenTrabajo/ordenPeritaje";
import PanelGeneral from "./views/panelGeneral/panelGeneral";
import HojaPeritaje from "./views/peritaje/hojaPeritaje/hojaPeritaje";
import MisHojas from "./views/peritaje/listaPeritajes";

import NuevoPeritaje from "./views/peritaje/nuevoPeritaje"
import BusquedaVehiculos from "./views/vehiculos/busquedaVehiculos"
import VehiculoCreate from "./views/vehiculos/vehiculoCreate"
import { Routes, Route} from 'react-router-dom';
function App() {

  return (
    <>
      
      <NavBar/>
      <Routes>
          <Route path="/" element={<PanelGeneral/>} />
        <Route path="/buscarUnidad" element={<BusquedaVehiculos/>} />
        <Route path="/nuevaUnidad" element={<VehiculoCreate/>} />
        <Route path="/nuevoPeritaje" element={<NuevoPeritaje/>}
         />
          <Route path="/misHojas" element={<MisHojas/>}
         />
       <Route path="/hojaPeritaje" element={<HojaPeritaje/>} />
       <Route path="/nuevaOrden" element={<NuevoOrden/>} />
       <Route path="/Ordenes" element={<MisOrdenes/>} />
       <Route path="/hojaPeritajeOrden" element={<OrdenPeritaje/>} />
       
      </Routes>
    </>
  )
}

export default App
