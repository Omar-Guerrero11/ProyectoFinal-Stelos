using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoFinal_Stelos.Data;
using ProyectoFinal_Stelos.Dtos;
using ProyectoFinal_Stelos.Models;

namespace ProyectoFinal_Stelos.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductosController : ControllerBase
    {
        private readonly AppDbContext _context;

        public ProductosController(AppDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Producto>>> GetProductos()
        {
            return await _context.Productos.ToListAsync();
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Producto>> GetProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
                return NotFound();

            return producto;
        }

        [HttpPost]
        public async Task<ActionResult<Producto>> PostProducto(ProductoDto dto)
        {
            var producto = new Producto
            {
                Nombre = dto.Nombre,
                Categoria = dto.Categoria,
                Precio = dto.Precio,
                Talla = dto.Talla,
                Stock = dto.Stock
            };

            _context.Productos.Add(producto);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetProducto), new { id = producto.Id }, producto);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> PutProducto(int id, ProductoDto dto)
        {
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
                return NotFound();

            producto.Nombre = dto.Nombre;
            producto.Categoria = dto.Categoria;
            producto.Precio = dto.Precio;
            producto.Talla = dto.Talla;
            producto.Stock = dto.Stock;

            await _context.SaveChangesAsync();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProducto(int id)
        {
            var producto = await _context.Productos.FindAsync(id);

            if (producto == null)
                return NotFound();

            _context.Productos.Remove(producto);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}