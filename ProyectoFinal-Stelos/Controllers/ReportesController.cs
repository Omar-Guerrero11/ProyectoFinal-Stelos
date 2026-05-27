using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoFinal_Stelos.Data;

namespace ProyectoFinal_Stelos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ReportesController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ReportesController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet("ventas-general")]
        public async Task<IActionResult> GetVentasGeneral()
        {
            var ventas = await _context.Ventas
                .Include(v => v.DetallesVenta)
                .OrderByDescending(v => v.Fecha)
                .ToListAsync();

            if (ventas.Count == 0)
            {
                return Content("No hay ventas registradas.", "text/plain");
            }

            var lines = new List<string>
            {
                "REPORTE GENERAL DE VENTAS",
                ""
            };

            foreach (var venta in ventas)
            {
                lines.Add($"Venta #{venta.Id}");
                lines.Add($"Fecha: {venta.Fecha:yyyy-MM-dd HH:mm}");
                lines.Add($"Metodo de pago: {venta.MetodoPago}");
                lines.Add($"Estado: {venta.Estado}");
                lines.Add($"Total: {venta.Total:0.00}");
                lines.Add("Detalle:");

                if (venta.DetallesVenta.Count == 0)
                {
                    lines.Add("  - Sin detalles registrados");
                }
                else
                {
                    foreach (var detalle in venta.DetallesVenta)
                    {
                        lines.Add(
                            $"  - {detalle.ProductoNombre} ({detalle.Talla}) x{detalle.Cantidad} @ {detalle.PrecioUnitario:0.00} = {detalle.Subtotal:0.00}");
                    }
                }

                lines.Add("");
            }

            return Content(string.Join(Environment.NewLine, lines), "text/plain");
        }
    }
}
