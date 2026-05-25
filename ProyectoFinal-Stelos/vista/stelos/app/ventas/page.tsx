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
import { Plus, Trash2 } from 'lucide-react'
import { useState } from 'react'

type CartItem = {
	id: string
	producto: string
	talla: string
	cantidad: number
}

export default function VentasPage() {
	const [cart, setCart] = useState<CartItem[]>([])
	const [searchProduct, setSearchProduct] = useState('')
	const [cantidad, setCantidad] = useState('1')
	const [talla, setTalla] = useState('')

	const addToCart = () => {
		if (!searchProduct || !talla) return

		setCart([
			...cart,
			{
				id: crypto.randomUUID(),
				producto: searchProduct,
				talla,
				cantidad: Number.parseInt(cantidad, 10) || 1,
			},
		])

		setSearchProduct('')
		setCantidad('1')
		setTalla('')
	}

	const removeFromCart = (id: string) => {
		setCart(cart.filter((item) => item.id !== id))
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
										<Label htmlFor="search-product">Buscar producto</Label>
										<Input
											id="search-product"
											placeholder="Conecta aquí tu búsqueda desde backend"
											value={searchProduct}
											onChange={(e) => setSearchProduct(e.target.value)}
										/>
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
										<Select
											value={talla}
											onValueChange={setTalla}
										>
											<SelectTrigger id="talla">
												<SelectValue placeholder="Selecciona talla" />
											</SelectTrigger>
											<SelectContent>
												<SelectItem value="XS">XS</SelectItem>
												<SelectItem value="S">S</SelectItem>
												<SelectItem value="M">M</SelectItem>
												<SelectItem value="L">L</SelectItem>
												<SelectItem value="XL">XL</SelectItem>
											</SelectContent>
										</Select>
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
												<TableHead className="w-12"></TableHead>
											</TableRow>
										</TableHeader>
										<TableBody>
											{cart.length === 0 ? (
												<TableRow>
													<TableCell
														colSpan={4}
														className="py-8 text-center text-muted-foreground"
													>
														No hay productos cargados
													</TableCell>
												</TableRow>
											) : (
												cart.map((item) => (
													<TableRow key={item.id}>
														<TableCell className="font-medium">
															{item.producto}
														</TableCell>
														<TableCell>{item.talla}</TableCell>
														<TableCell className="text-right">
															{item.cantidad}
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
