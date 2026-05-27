using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoFinal_Stelos.Data;
using ProyectoFinal_Stelos.Models;
using ProyectoFinal_Stelos.Dtos;

namespace ProyectoFinal_Stelos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class VentasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public VentasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Venta>>> GetVentas()
        {
            return await _context.Ventas
                .Include(v => v.DetallesVenta)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Venta>> GetVenta(int id)
        {
            var venta = await _context.Ventas
                .Include(v => v.DetallesVenta)
                .FirstOrDefaultAsync(v => v.Id == id);

            if (venta == null)
                return NotFound();

            return venta;
        }

        [HttpPost]
        public async Task<ActionResult<Venta>> PostVenta(VentaDto dto)
        {
            var venta = new Venta
            {
                Fecha = dto.Fecha,
                MetodoPago = dto.MetodoPago,
                Total = dto.Total,
                Estado = dto.Estado
            };

            _context.Ventas.Add(venta);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetVenta),
                new { id = venta.Id },
                venta
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutVenta(
            int id,
            VentaDto dto)
        {
            var venta = await _context.Ventas
                .FindAsync(id);

            if (venta == null)
                return NotFound();

            venta.Fecha = dto.Fecha;
            venta.MetodoPago = dto.MetodoPago;
            venta.Total = dto.Total;
            venta.Estado = dto.Estado;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteVenta(int id)
        {
            var venta = await _context.Ventas
                .FindAsync(id);

            if (venta == null)
                return NotFound();

            _context.Ventas.Remove(venta);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}