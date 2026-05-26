namespace ProyectoFinal_Stelos.Models
{
    public class Producto
    {
        public int Id { get; set; }
        public string Nombre { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public string Talla { get; set; } = string.Empty;
        public int Stock { get; set; }

        public List<DetalleVenta> DetallesVenta { get; set; } = new();
    }
}
