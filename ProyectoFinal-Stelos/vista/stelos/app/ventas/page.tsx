'use client'
import { v4 as uuidv4 } from 'uuid'
import { Header } from '@/components/header'
import { SidebarNav } from '@/components/sidebar-nav'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { Plus, Trash2 } from 'lucide-react'
import { useEffect, useState } from 'react'
import {
	createDetalleVenta,
	createVenta,
	getProductos,
} from '@/lib/api'
import { useRouter } from 'next/dist/client/components/navigation'

type CartItem = {
	id: string
	productoId: number
	productoNombre: string
	talla: string
	cantidad: number
	precioUnitario: number
	subtotal: number
}

type Producto = {
	id: number
	nombre: string
	categoria: string
	precio: number
	talla: string
	stock: number
}

export default function VentasPage() {
	const [cart, setCart] = useState<CartItem[]>([])
	const [productos, setProductos] = useState<Producto[]>([])
	const [loadingProductos, setLoadingProductos] = useState(true)
	const [selectedProductId, setSelectedProductId] = useState('')
	const [cantidad, setCantidad] = useState('1')
	const [talla, setTalla] = useState('')
	const [precioUnitario, setPrecioUnitario] = useState(0)
	const [metodoPago, setMetodoPago] = useState('Efectivo')
	const [estado, setEstado] = useState('Pendiente')
	const [submitStatus, setSubmitStatus] = useState('')

	const router = useRouter()
			const [ready, setReady] = useState(false)
		  
			useEffect(() => {
			  const isAuthenticated = localStorage.getItem('isAuthenticated')
		  
			  if (isAuthenticated !== 'true') {
				router.replace('/login')
				return
			  }
		  
			  setReady(true)
			}, [router])
			
	useEffect(() => {
		const loadProductos = async () => {
			try {
				const data = await getProductos()
				setProductos(data)
			} finally {
				setLoadingProductos(false)
			}
		}

		loadProductos()
	}, [])

	useEffect(() => {
		const producto = productos.find(
			(item) => item.id === Number(selectedProductId)
		)

		if (!producto) {
			setTalla('')
			setPrecioUnitario(0)
			return
		}

		setTalla(producto.talla)
		setPrecioUnitario(producto.precio)
	}, [selectedProductId, productos])

	const addToCart = () => {
		const producto = productos.find(
			(item) => item.id === Number(selectedProductId)
		)

		if (!producto) return
		if (!talla) return

		const cantidadNumero = Number.parseInt(cantidad, 10) || 1
		const subtotal = cantidadNumero * producto.precio

		setCart([
			...cart,
			{
				id: uuidv4(),				
				productoId: producto.id,
				productoNombre: producto.nombre,
				talla,
				cantidad: cantidadNumero,
				precioUnitario: producto.precio,
				subtotal,
			},
		])

		setSelectedProductId('')
		setCantidad('1')
		setTalla('')
		setPrecioUnitario(0)
	}

	const removeFromCart = (id: string) => {
		setCart(cart.filter((item) => item.id !== id))
	}

	const total = cart.reduce((sum, item) => sum + item.subtotal, 0)

	const submitVenta = async () => {
		if (cart.length === 0) return

		setSubmitStatus('')

		try {
			const venta = await createVenta({
				fecha: new Date().toISOString(),
				metodoPago,
				total,
				estado,
			})

			await Promise.all(
				cart.map((item) =>
					createDetalleVenta({
						ventaId: venta.id,
						productoId: item.productoId,
						productoNombre: item.productoNombre,
						talla: item.talla,
						cantidad: item.cantidad,
						precioUnitario: item.precioUnitario,
						subtotal: item.subtotal,
					})
				)
			)

			setCart([])
			setSubmitStatus('Venta registrada')
		} catch {
			setSubmitStatus('No se pudo registrar la venta')
		}
	}

	return (
		<div className="flex h-screen flex-col">
			<Header />
			<div className="flex flex-1 overflow-hidden">
				<aside className="w-64 border-r bg-card">
					<SidebarNav />
				</aside>
				<main className="flex-1 overflow-y-auto bg-muted/30 p-6">
					<div className="mx-auto max-w-7xl space-y-6">
						<Card>
							<CardHeader>
								<CardTitle>Ventas</CardTitle>
								<CardDescription>
									Sin productos simulados, sin tickets de ejemplo y sin totales
									hardcoded.
								</CardDescription>
							</CardHeader>
							<CardContent className="space-y-4">
								<div className="grid gap-4 md:grid-cols-3">
									<div className="space-y-2 md:col-span-2">
										<Label htmlFor="product-select">Producto</Label>
										<Select
											value={selectedProductId}
											onValueChange={setSelectedProductId}
										>
											<SelectTrigger id="product-select">
												<SelectValue
													placeholder={
														loadingProductos
															? 'Cargando productos...'
															: 'Selecciona producto'
													}
												/>
											</SelectTrigger>
											<SelectContent>
												{productos.map((producto) => (
													<SelectItem
														key={producto.id}
														value={String(producto.id)}
													>
														{producto.nombre}
													</SelectItem>
												))}
											</SelectContent>
										</Select>
									</div>
									<div className="space-y-2">
										<Label htmlFor="cantidad">Cantidad</Label>
										<Input
											id="cantidad"
											type="number"
											min="1"
											value={cantidad}
											onChange={(e) => setCantidad(e.target.value)}
										/>
									</div>
								</div>

								<div className="grid gap-4 md:grid-cols-3">
									<div className="space-y-2">
										<Label htmlFor="talla">Talla</Label>
										<Input
											id="talla"
											value={talla}
											readOnly
										/>
									</div>
									<div className="space-y-2">
										<Label htmlFor="precio">Precio</Label>
										<Input
											id="precio"
											value={precioUnitario ? precioUnitario.toFixed(2) : ''}
											readOnly
										/>
									</div>
									<div className="flex items-end md:col-span-2">
										<Button
											onClick={addToCart}
											className="gap-2"
										>
											<Plus className="h-4 w-4" />
											Agregar al carrito
										</Button>
									</div>
								</div>
								<div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
									<p className="text-sm text-muted-foreground">
										Total: <span className="font-semibold">{total.toFixed(2)}</span>
									</p>
									<div className="flex flex-col gap-2 md:flex-row">
										<Button
											onClick={submitVenta}
											disabled={cart.length === 0}
										>
											Registrar venta
										</Button>
										{submitStatus ? (
											<span className="text-sm text-muted-foreground">
												{submitStatus}
											</span>
										) : null}
									</div>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Pago</CardTitle>
								<CardDescription>
									Define el método de pago y estado.
								</CardDescription>
							</CardHeader>
							<CardContent className="grid gap-4 md:grid-cols-2">
								<div className="space-y-2">
									<Label htmlFor="metodo-pago">Método de pago</Label>
									<Select
										value={metodoPago}
										onValueChange={setMetodoPago}
									>
										<SelectTrigger id="metodo-pago">
											<SelectValue placeholder="Selecciona método" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Efectivo">Efectivo</SelectItem>
											<SelectItem value="Tarjeta">Tarjeta</SelectItem>
											<SelectItem value="Transferencia">
												Transferencia
											</SelectItem>
										</SelectContent>
									</Select>
								</div>
								<div className="space-y-2">
									<Label htmlFor="estado">Estado</Label>
									<Select value={estado} onValueChange={setEstado}>
										<SelectTrigger id="estado">
											<SelectValue placeholder="Selecciona estado" />
										</SelectTrigger>
										<SelectContent>
											<SelectItem value="Pendiente">Pendiente</SelectItem>
											<SelectItem value="Pagado">Pagado</SelectItem>
											<SelectItem value="Cancelado">Cancelado</SelectItem>
										</SelectContent>
									</Select>
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardHeader>
								<CardTitle>Carrito</CardTitle>
								<CardDescription>
									La lista queda vacía hasta que el backend responda con
									productos reales.
								</CardDescription>
							</CardHeader>
							<CardContent>
								<div className="rounded-md border">
									<Table>
										<TableHeader>
											<TableRow>
												<TableHead>Producto</TableHead>
											<TableHead>Talla</TableHead>
											<TableHead className="text-right">Cant.</TableHead>
											<TableHead className="text-right">Subtotal</TableHead>
											<TableHead className="w-12"></TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{cart.length === 0 ? (
												<TableRow>
													<TableCell
													colSpan={5}
														className="py-8 text-center text-muted-foreground"
													>
														No hay productos cargados
													</TableCell>
												</TableRow>
											) : (
												cart.map((item) => (
													<TableRow key={item.id}>
														<TableCell className="font-medium">
															{item.productoNombre}
														</TableCell>
														<TableCell>{item.talla}</TableCell>
														<TableCell className="text-right">
															{item.cantidad}
														</TableCell>
														<TableCell className="text-right">
															{item.subtotal.toFixed(2)}
														</TableCell>
														<TableCell>
															<Button
																variant="ghost"
																size="icon"
																onClick={() => removeFromCart(item.id)}
															>
																<Trash2 className="h-4 w-4 text-destructive" />
															</Button>
														</TableCell>
													</TableRow>
												))
											)}
										</TableBody>
									</Table>
								</div>
							</CardContent>
						</Card>
					</div>
				</main>
			</div>
		</div>
	)
}
