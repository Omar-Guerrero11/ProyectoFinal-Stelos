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
import { Barcode, Package } from 'lucide-react'

export default function InventarioPage() {
	const handleGenerateBarcode = () => {
		alert('Conecta esta acción a tu backend para generar códigos reales.')
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
								<TabsTrigger value="tiemporeal">Tiempo Real</TabsTrigger>
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
														<TableHead>Código</TableHead>
														<TableHead>Nombre</TableHead>
														<TableHead>Talla</TableHead>
														<TableHead>Color</TableHead>
														<TableHead className="text-right">Precio</TableHead>
														<TableHead className="text-right">
															Cantidad
														</TableHead>
														<TableHead>Proveedor</TableHead>
														<TableHead>Acciones</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													<TableRow>
														<TableCell
															colSpan={8}
															className="py-8 text-center text-muted-foreground"
														>
															Sin productos cargados desde backend
														</TableCell>
													</TableRow>
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
											<Barcode className="h-5 w-5" />
											Nuevo producto
										</CardTitle>
										<CardDescription>
											Formulario listo para enviar al backend.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<form className="space-y-6">
											<div className="grid gap-4 md:grid-cols-2">
												<div className="space-y-2">
													<Label htmlFor="codigo">Código</Label>
													<div className="flex gap-2">
														<Input
															id="codigo"
															placeholder="Código del producto"
														/>
														<Button
															type="button"
															variant="outline"
															onClick={handleGenerateBarcode}
														>
															Generar
														</Button>
													</div>
												</div>
												<div className="space-y-2">
													<Label htmlFor="nombre">Nombre</Label>
													<Input
														id="nombre"
														placeholder="Nombre del producto"
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="talla-nuevo">Talla</Label>
													<Select>
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
													<Label htmlFor="color">Color</Label>
													<Input
														id="color"
														placeholder="Color"
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="precio-nuevo">Precio</Label>
													<Input
														id="precio-nuevo"
														type="number"
														placeholder="0.00"
														step="0.01"
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
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="proveedor">Proveedor</Label>
													<Input
														id="proveedor"
														placeholder="Proveedor"
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="categoria">Categoría</Label>
													<Input
														id="categoria"
														placeholder="Categoría"
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

							<TabsContent
								value="tiemporeal"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<CardTitle>Inventario en tiempo real</CardTitle>
										<CardDescription>
											Los indicadores se cargan desde tu API.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="rounded-md border p-6 text-center text-muted-foreground">
											Sin métricas hardcoded. Conecta el endpoint de inventario.
										</div>
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
