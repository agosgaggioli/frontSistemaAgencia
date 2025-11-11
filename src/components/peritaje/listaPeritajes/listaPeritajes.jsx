import { useNavigate } from "react-router-dom";

export default function ListaPeritajes({ trabajo = {} }) {
  const formatFecha = (iso) => {
  if (!iso) return "-";
  const d = new Date(iso);
  return d.toLocaleString("es-AR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  }); // ej: 18/10/2025 13:42
};
  const countBy = (items = [], estado) =>
    items.filter((it) => ((it?.estado ?? it?.Estado) || "").toUpperCase() === estado).length;

  const v = trabajo?.Vehiculo ?? {};
  const items = trabajo?.itemsOrden ?? [];
  const estadoHoja = trabajo?.estado ?? "-"; // usar el estado que ya viene

  const nav = useNavigate();

  console.log('Peritaje row ->', trabajo);
  
  const handlerOnclick = () => {
    localStorage.removeItem("IdHoja");
    localStorage.setItem("IdHoja", String(trabajo.Id));
    nav("/hojaPeritaje");
  };

  const handlerOnclickOrdenes = () => {
    localStorage.removeItem("IdHoja");
    localStorage.setItem("IdHoja", String(trabajo.Id));
    nav("/hojaPeritajeOrden");
  };

  // Conteos según los estados reales del backend
  const pendientes  = countBy(items, "PENDIENTE");
  const enProceso   = countBy(items, "PROCESO");
  const finalizados = countBy(items, "FINALIZADO");

return (
    <tr>
      <td>{v.Modelo ?? "-"}</td>
      <td>{v.Version ?? "-"}</td>
      <td>{v.TipoVehiculo.Dominio ?? "-"} </td>
      <td>{v.UBICACION ?? "-"}</td>
      <td>{pendientes}</td>
      <td>{enProceso}</td>
      <td>{finalizados}</td>
      <td><button onClick={handlerOnclick}>Seleccionar</button></td>
      <td><button onClick={handlerOnclickOrdenes}>Ordenes</button></td>
      <td>{estadoHoja}</td>
      <td>{formatFecha(trabajo.Fecha)}</td>
    </tr>
  );
}