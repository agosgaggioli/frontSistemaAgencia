import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ModalOrde from "./modalOrden";

// ListaPeritajes.jsx
export default function ListaOrden({ trabajo }) {

 
 
  const [modal, setModal] = useState(false)
  const handlerOnclick =()=>{
    
    setModal(true)
    console.log(modal)
 
  }
  const handlerClose =()=>{
    setModal(false)
    console.log(modal)

  }
  console.log(trabajo.Id)

  return (
   <>
    <tr>
      <td>{trabajo.Vehiculo?.Marca}</td>
      <td>{trabajo.Vehiculo?.Modelo}</td>
      <td>{trabajo.Vehiculo.TipoVehiculo.Dominio} </td>
      <td>{trabajo.responsable}</td>
      <td>{trabajo.estado} </td>
      <td><button onClick={handlerOnclick}>Seleccionar</button></td>
    </tr>
    <div>
        {modal && <ModalOrde id={trabajo.Id} handlerClose={handlerClose} />}
    </div>
    
    </>
  );
}
