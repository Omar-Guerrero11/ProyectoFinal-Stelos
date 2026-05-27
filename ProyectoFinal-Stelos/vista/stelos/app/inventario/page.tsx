'use client'

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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Package } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createProducto, getProductos } from '@/lib/api'
import { useRouter } from 'next/dist/client/components/navigation'

type Producto = {
	id: number
	nombre: string
	categoria: string
	precio: number
	talla: string
	stock: number
}

export default function InventarioPage() {
	const [productos, setProductos] = useState<Producto[]>([])
	const [loadingProductos, setLoadingProductos] = useState(true)
	const [nuevoProducto, setNuevoProducto] = useState({
		nombre: '',
		categoria: '',
		precio: '',
		talla: '',
		stock: '',
	})
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

	const handleNuevoProductoChange =
		(field: keyof typeof nuevoProducto) =>
		(e: React.ChangeEvent<HTMLInputElement>) => {
			setNuevoProducto((prev) => ({
				...prev,
				[field]: e.target.value,
			}))
		}

	const handleCreateProducto = async (
		e: React.FormEvent<HTMLFormElement>
	) => {
		e.preventDefault()

		const payload = {
			nombre: nuevoProducto.nombre.trim(),
			categoria: nuevoProducto.categoria.trim(),
			precio: Number.parseFloat(nuevoProducto.precio || '0'),
			talla: nuevoProducto.talla,
			stock: Number.parseInt(nuevoProducto.stock || '0', 10),
		}

		const created = await createProducto(payload)
		setProductos((prev) => [created, ...prev])
		setNuevoProducto({
			nombre: '',
			categoria: '',
			precio: '',
			talla: '',
			stock: '',
		})
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
						<div>
							<h2 className="text-3xl font-bold tracking-tight">Inventario</h2>
							<p className="text-muted-foreground">
								UI limpia para conectar productos, stock y catálogo desde
								backend
							</p>
						</div>

						<Tabs
							defaultValue="productos"
							className="w-full"
						>
							<TabsList>
								<TabsTrigger value="productos">Productos</TabsTrigger>
								<TabsTrigger value="nuevo">Nuevo Producto</TabsTrigger>
								<TabsTrigger value="actualizar">Actualizar Stock</TabsTrigger>
							</TabsList>

							<TabsContent
								value="productos"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Package className="h-5 w-5" />
											Listado de productos
										</CardTitle>
										<CardDescription>
											La tabla queda vacía hasta que tu backend entregue el
											catálogo.
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-4">
										<div className="flex flex-col gap-4 md:flex-row">
											<div className="flex-1">
												<Input
													placeholder="Buscar por nombre, código o categoría"
													className="max-w-md"
												/>
											</div>
											<div className="flex gap-2">
												<Select>
													<SelectTrigger className="w-40">
														<SelectValue placeholder="Categoría" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="all">Todas</SelectItem>
													</SelectContent>
												</Select>
												<Button>Buscar</Button>
											</div>
										</div>

										<div className="rounded-md border">
											<Table>
												<TableHeader>
													<TableRow>
														<TableHead>Nombre</TableHead>
														<TableHead>Talla</TableHead>
														<TableHead className="text-right">Precio</TableHead>
														<TableHead className="text-right">Cantidad</TableHead>
														<TableHead>Acciones</TableHead>
													</TableRow>
												</TableHeader>
										<TableBody>
											{loadingProductos ? (
												<TableRow>
													<TableCell
														colSpan={5}
														className="py-8 text-center text-muted-foreground"
													>
														Cargando productos...
													</TableCell>
												</TableRow>
											) : productos.length === 0 ? (
												<TableRow>
													<TableCell
														colSpan={5}
														className="py-8 text-center text-muted-foreground"
													>
														Sin productos cargados desde backend
													</TableCell>
												</TableRow>
											) : (
												productos.map((producto) => (
													<TableRow key={producto.id}>
														<TableCell className="font-medium">
															{producto.nombre}
														</TableCell>
														<TableCell>{producto.talla}</TableCell>
														<TableCell className="text-right">
															{producto.precio.toFixed(2)}
														</TableCell>
														<TableCell className="text-right">
															{producto.stock}
														</TableCell>
														<TableCell></TableCell>
													</TableRow>
												))
											)}
										</TableBody>
											</Table>
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent
								value="nuevo"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											Nuevo producto
										</CardTitle>
										<CardDescription>
											Formulario listo para enviar al backend.
										</CardDescription>
									</CardHeader>
									<CardContent>
									<form
										className="space-y-6"
										onSubmit={handleCreateProducto}
									>
											<div className="grid gap-4 md:grid-cols-2">

												<div className="space-y-2">
													<Label htmlFor="nombre">Nombre</Label>
												<Input
													id="nombre"
													placeholder="Nombre del producto"
													value={nuevoProducto.nombre}
													onChange={handleNuevoProductoChange('nombre')}
												/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="talla-nuevo">Talla</Label>
												<Select
													value={nuevoProducto.talla}
													onValueChange={(value) =>
														setNuevoProducto((prev) => ({
															...prev,
															talla: value,
														}))
													}
												>
														<SelectTrigger id="talla-nuevo">
															<SelectValue placeholder="Seleccione talla" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="XS">XS</SelectItem>
															<SelectItem value="S">S</SelectItem>
															<SelectItem value="M">M</SelectItem>
															<SelectItem value="L">L</SelectItem>
															<SelectItem value="XL">XL</SelectItem>
															<SelectItem value="XXL">XXL</SelectItem>
														</SelectContent>
													</Select>
												</div>
												<div className="space-y-2">
													<Label htmlFor="precio-nuevo">Precio</Label>
												<Input
													id="precio-nuevo"
													type="number"
													placeholder="0.00"
													step="0.01"
													value={nuevoProducto.precio}
													onChange={handleNuevoProductoChange('precio')}
												/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="cantidad-inicial">
														Cantidad Inicial
													</Label>
												<Input
													id="cantidad-inicial"
													type="number"
													placeholder="0"
													min="0"
													value={nuevoProducto.stock}
													onChange={handleNuevoProductoChange('stock')}
												/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="categoria">Categoría</Label>
												<Input
													id="categoria"
													placeholder="Categoría"
													value={nuevoProducto.categoria}
													onChange={handleNuevoProductoChange('categoria')}
												/>
												</div>
											</div>

											<div className="flex gap-2">
												<Button
													type="submit"
													className="flex-1"
												>
													Guardar
												</Button>
												<Button
													type="button"
													variant="outline"
													className="flex-1 bg-transparent"
												>
													Cancelar
												</Button>
											</div>
										</form>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent
								value="actualizar"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<CardTitle>Actualizar stock</CardTitle>
										<CardDescription>
											Sin datos simulados, listo para integrarse al backend.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<form className="space-y-6">
											<div className="grid gap-4 md:grid-cols-2">
												<div className="space-y-2">
													<Label htmlFor="producto-stock">Producto</Label>
													<Input
														id="producto-stock"
														placeholder="Selecciona un producto desde backend"
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="cantidad-entrada">
														Cantidad de Entrada
													</Label>
													<Input
														id="cantidad-entrada"
														type="number"
														placeholder="0"
														min="1"
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="fecha-entrada">Fecha</Label>
													<Input
														id="fecha-entrada"
														type="date"
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="responsable">
														Usuario Responsable
													</Label>
													<Input
														id="responsable"
														placeholder="Se llenará desde sesión"
													/>
												</div>
											</div>

											<Button
												type="submit"
												className="w-full"
												size="lg"
											>
												Registrar entrada
											</Button>
										</form>
									</CardContent>
								</Card>
							</TabsContent>

						</Tabs>
					</div>
				</main>
			</div>
		</div>
	)
}
