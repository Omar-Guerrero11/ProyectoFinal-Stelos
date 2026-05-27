using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoFinal_Stelos.Data;
using ProyectoFinal_Stelos.Models;
using ProyectoFinal_Stelos.Dtos;

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
        public async Task<ActionResult<DetalleVenta>> PostDetalleVenta(DetalleVentaDto dto)
        {
            var ventaExiste = await _context.Ventas
                .AnyAsync(v => v.Id == dto.VentaId);

            if (!ventaExiste)
                return BadRequest("La venta no existe.");

            var productoExiste = await _context.Productos
                .AnyAsync(p => p.Id == dto.ProductoId);

            if (!productoExiste)
                return BadRequest("El producto no existe.");

            var detalleVenta = new DetalleVenta
            {
                VentaId = dto.VentaId,
                ProductoId = dto.ProductoId,
                ProductoNombre = dto.ProductoNombre,
                Talla = dto.Talla,
                Cantidad = dto.Cantidad,
                PrecioUnitario = dto.PrecioUnitario,
                Subtotal = dto.Subtotal
            };

            _context.DetalleVentas.Add(detalleVenta);

            await _context.SaveChangesAsync();

            return CreatedAtAction(
                nameof(GetDetalleVenta),
                new { id = detalleVenta.Id },
                detalleVenta
            );
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutDetalleVenta(int id, DetalleVentaDto dto)
        {
            var detalle = await _context.DetalleVentas
                .FindAsync(id);

            if (detalle == null)
                return NotFound();

            detalle.VentaId = dto.VentaId;
            detalle.ProductoId = dto.ProductoId;
            detalle.ProductoNombre = dto.ProductoNombre;
            detalle.Talla = dto.Talla;
            detalle.Cantidad = dto.Cantidad;
            detalle.PrecioUnitario = dto.PrecioUnitario;
            detalle.Subtotal = dto.Subtotal;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteDetalleVenta(int id)
        {
            var detalle = await _context.DetalleVentas
                .FindAsync(id);

            if (detalle == null)
                return NotFound();

            _context.DetalleVentas.Remove(detalle);

            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}