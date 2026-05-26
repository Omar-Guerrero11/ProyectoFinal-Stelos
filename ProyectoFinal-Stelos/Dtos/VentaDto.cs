namespace ProyectoFinal_Stelos.Dtos
{
    public class VentaDto
    {
        public DateTime Fecha { get; set; }
        public string MetodoPago { get; set; } = string.Empty;
        public decimal Total { get; set; }
        public string Estado { get; set; } = string.Empty;
    }
}
