namespace ProyectoFinal_Stelos.Models
{
    public class Venta
    {
        public int Id { get; set; }
        public DateTime Fecha { get; set; } = DateTime.Now;
        public string MetodoPago { get; set; } = string.Empty;
        public decimal Total { get; set; }
        public string Estado { get; set; } = string.Empty;

        public List<DetalleVenta> DetallesVenta { get; set; } = new();
    }
}
