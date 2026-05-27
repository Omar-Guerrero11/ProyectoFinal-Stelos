export type ProductoDto = {
  nombre: string
  categoria: string
  precio: number
  talla: string
  stock: number
}

export type UsuarioDto = {
  nombre: string
  email: string
  rol: string
}

export type VentaDto = {
  fecha: string
  metodoPago: string
  total: number
  estado: string
}

export type DetalleVentaDto = {
  ventaId: number
  productoId: number
  productoNombre: string
  talla: string
  cantidad: number
  precioUnitario: number
  subtotal: number
}

const jsonHeaders = {
  'Content-Type': 'application/json',
}

export async function getProductos() {
  const response = await fetch('/api/Productos')
  if (!response.ok) {
    throw new Error('No se pudo cargar productos')
  }
  return response.json()
}

export async function createProducto(dto: ProductoDto) {
  const response = await fetch('/api/Productos', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(dto),
  })

  if (!response.ok) {
    throw new Error('No se pudo crear producto')
  }

  return response.json()
}

export async function getUsuarios() {
  const response = await fetch('/api/Usuarios')
  if (!response.ok) {
    throw new Error('No se pudo cargar usuarios')
  }
  return response.json()
}

export async function createUsuario(dto: UsuarioDto) {
  const response = await fetch('/api/Usuarios', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(dto),
  })

  if (!response.ok) {
    throw new Error('No se pudo crear usuario')
  }

  return response.json()
}

export async function createVenta(dto: VentaDto) {
  const response = await fetch('/api/Ventas', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(dto),
  })

  if (!response.ok) {
    throw new Error('No se pudo crear venta')
  }

  return response.json()
}

export async function createDetalleVenta(dto: DetalleVentaDto) {
  const response = await fetch('/api/Detalledeventas', {
    method: 'POST',
    headers: jsonHeaders,
    body: JSON.stringify(dto),
  })

  if (!response.ok) {
    throw new Error('No se pudo crear detalle de venta')
  }

  return response.json()
}
