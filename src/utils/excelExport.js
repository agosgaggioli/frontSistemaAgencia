// utils/excelExport.js
// IMPORTANTE: usar la build de navegador para evitar polyfills de Node
import ExcelJS from "exceljs/dist/exceljs.min.js";
import { saveAs } from "file-saver";

/**
 * Exporta un Excel de vehículos con estilo de planilla.
 * - Ordena por Marca (y luego por Modelo)
 * - Título, headers estilizados, zebra rows, bordes
 * - Dominio/Kilómetros en amarillo suave
 * - AutoFilter y freeze en fila de encabezados
 *
 * @param {Array<object>} vehiculos  Array con objetos de vehículo como en tu API.
 */
export async function exportVehiculosExcel(vehiculos = []) {
  const wb = new ExcelJS.Workbook();
  const ws = wb.addWorksheet("Vehículos");

  // ---- ORDEN: por Marca y luego por Modelo ----
  const sorted = [...vehiculos].sort((a, b) => {
    const ma = (a?.Marca ?? "").toString();
    const mb = (b?.Marca ?? "").toString();
    const byMarca = ma.localeCompare(mb, "es", { sensitivity: "base" });
    if (byMarca !== 0) return byMarca;

    const moa = (a?.Modelo ?? "").toString();
    const mob = (b?.Modelo ?? "").toString();
    return moa.localeCompare(mob, "es", { sensitivity: "base" });
  });

  // ---- TÍTULO (fila 1) ----
  const hoy = new Date().toLocaleDateString("es-AR");
  ws.mergeCells("A1:K1");
  const t = ws.getCell("A1");
  t.value = `Listado de Vehículos – ${hoy}`;
  t.font = { bold: true, size: 14 };
  t.alignment = { vertical: "middle", horizontal: "center" };
  ws.getRow(1).height = 24;

  // ---- Espaciador (fila 2) ----
  ws.addRow([]);

  // ---- HEADERS (fila 3) ----
  const headers = [
    "Marca",
    "Modelo",
    "Versión",
    "Transmisión",
    "Combustible",
    "Color",
    "Ubicación",
    "Dominio",
    "Kilómetros",
    "Peritada",
    "Observaciones",
  ];
  const headerRow = ws.addRow(headers);
  headerRow.eachCell((c) => {
    c.font = { bold: true, color: { argb: "FFFFFFFF" } };
    c.alignment = { vertical: "middle", horizontal: "center", wrapText: true };
    c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "1F4E78" } }; // azul
    c.border = {
      top: { style: "thin" }, left: { style: "thin" },
      bottom: { style: "thin" }, right: { style: "thin" },
    };
  });
  ws.getRow(3).height = 22;

  // ---- ANCHOS de columnas ----
  const widths = [16, 18, 22, 14, 14, 12, 14, 14, 14, 10, 28];
  widths.forEach((w, i) => (ws.getColumn(i + 1).width = w));

  // ---- DATA (desde fila 4) ----
  sorted.forEach((v, idx) => {
    const row = ws.addRow([
      v.Marca ?? "",
      v.Modelo ?? "",
      v.Version ?? "",
      v.Transmision ?? "",
      v.Combustible ?? "",
      v.Color ?? "",
      v.UBICACION ?? "",
      v?.TipoVehiculo?.Dominio ?? "",
      Number(v?.TipoVehiculo?.Kilometros ?? 0),
      v.Peritada ?? "",
      v?.TipoVehiculo?.Observaciones ?? "",
    ]);

    row.eachCell((c, colNumber) => {
      // Bordes
      c.border = {
        top: { style: "thin" }, left: { style: "thin" },
        bottom: { style: "thin" }, right: { style: "thin" },
      };
      // Alineación
      c.alignment = { vertical: "middle", horizontal: "center", wrapText: true };

      // Zebra rows
      if (idx % 2 === 0) {
        c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "F2F2F2" } };
      }

      // Formato Kilómetros (col 9)
      if (colNumber === 9) c.numFmt = "#,##0";

      // Resaltar Dominio (8) y Kilómetros (9)
      if (colNumber === 8 || colNumber === 9) {
        c.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FFF2CC" } }; // amarillo suave
      }
    });

    row.height = 20;
  });

  // ---- AutoFilter y Freeze en headers ----
  ws.autoFilter = { from: "A3", to: "K3" };
  ws.views = [{ state: "frozen", ySplit: 3 }];

  // ---- Descargar ----
  const buffer = await wb.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, `vehiculos_${new Date().toISOString().slice(0, 10)}.xlsx`);
}
