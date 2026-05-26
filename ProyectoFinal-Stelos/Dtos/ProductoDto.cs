namespace ProyectoFinal_Stelos.Dtos
{
    public class ProductoDto
    {
        public string Nombre { get; set; } = string.Empty;
        public string Categoria { get; set; } = string.Empty;
        public decimal Precio { get; set; }
        public string Talla { get; set; } = string.Empty;
        public int Stock { get; set; }
    }
}
