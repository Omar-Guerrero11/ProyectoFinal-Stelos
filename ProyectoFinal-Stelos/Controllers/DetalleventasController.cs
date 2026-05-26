using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoFinal_Stelos.Data;
using ProyectoFinal_Stelos.Models;

namespace ProyectoFinal_Stelos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DetalledeventasController : ControllerBase
    {
        private readonly AppDbContext _context;

        public DetalledeventasController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<DetalleVenta>>> GetDetalleVentas()
        {
            return await _context.DetalleVentas
                .Include(d => d.Venta)
                .Include(d => d.Producto)
                .ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<DetalleVenta>> GetDetalleVenta(int id)
        {
            var detalleVenta = await _context.DetalleVentas
                .Include(d => d.Venta)
                .Include(d => d.Producto)
                .FirstOrDefaultAsync(d => d.Id == id);

            if (detalleVenta == null)
                return NotFound();

            return detalleVenta;
        }

        [HttpPost]
        public async Task<ActionResult<DetalleVenta>> PostDetalleVenta(DetalleVenta detalleVenta)
        {
            var ventaExiste = await _context.Ventas.AnyAsync(v => v.Id == detalleVenta.VentaId);
            if (!ventaExiste)
                return BadRequest("La venta no existe.");

            var productoExiste = await _context.Productos.AnyAsync(p => p.Id == detalleVenta.ProductoId);
            if (!productoExiste)
                return BadRequest("El producto no existe.");

            _context.DetalleVentas.Add(detalleVenta);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetDetalleVenta), new { id = detalleVenta.Id }, detalleVenta);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetalleVenta(int id, DetalleVenta detalleVenta)
        {
            if (id != detalleVenta.Id)
                return BadRequest();

            var detalleExistente = await _context.DetalleVentas.FindAsync(id);
            if (detalleExistente == null)
                return NotFound();

            var ventaExiste = await _context.Ventas.AnyAsync(v => v.Id == detalleVenta.VentaId);
            if (!ventaExiste)
                return BadRequest("La venta no existe.");

            var productoExiste = await _context.Productos.AnyAsync(p => p.Id == detalleVenta.ProductoId);
            if (!productoExiste)
                return BadRequest("El producto no existe.");

            detalleExistente.VentaId = detalleVenta.VentaId;
            detalleExistente.ProductoId = detalleVenta.ProductoId;
            detalleExistente.ProductoNombre = detalleVenta.ProductoNombre;
            detalleExistente.Talla = detalleVenta.Talla;
            detalleExistente.Cantidad = detalleVenta.Cantidad;
            detalleExistente.PrecioUnitario = detalleVenta.PrecioUnitario;
            detalleExistente.Subtotal = detalleVenta.Subtotal;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetalleVenta(int id)
        {
            var detalleVenta = await _context.DetalleVentas.FindAsync(id);

            if (detalleVenta == null)
                return NotFound();

            _context.DetalleVentas.Remove(detalleVenta);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}