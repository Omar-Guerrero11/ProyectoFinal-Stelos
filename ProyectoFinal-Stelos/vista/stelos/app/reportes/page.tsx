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
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, Package } from 'lucide-react'

export default function ReportesPage() {
	const handleExport = (format: string) => {
		alert(`Conecta la exportación ${format} a tu backend.`)
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
							<h2 className="text-3xl font-bold tracking-tight">Reportes</h2>
							<p className="text-muted-foreground">
								Vista limpia para conectar métricas reales
							</p>
						</div>

						<Tabs
							defaultValue="ventas"
							className="w-full"
						>
							<TabsList>
								<TabsTrigger value="ventas">Ventas</TabsTrigger>
								<TabsTrigger value="inventario">Inventario</TabsTrigger>
								<TabsTrigger value="resumen">Resumen</TabsTrigger>
							</TabsList>

							<TabsContent
								value="ventas"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BarChart3 className="h-5 w-5" />
											Reportes de ventas
										</CardTitle>
										<CardDescription>
											Sin datos simulados. Conecta tus endpoints para poblar
											esta sección.
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="grid gap-4 md:grid-cols-3">
											<div className="space-y-2">
												<Label htmlFor="periodo-ventas">Periodo</Label>
												<Select>
													<SelectTrigger id="periodo-ventas">
														<SelectValue placeholder="Seleccione periodo" />
													</SelectTrigger>
													<SelectContent>
														<SelectItem value="dia">Día</SelectItem>
														<SelectItem value="mes">Mes</SelectItem>
														<SelectItem value="ano">Año</SelectItem>
													</SelectContent>
												</Select>
											</div>
											<div className="space-y-2">
												<Label htmlFor="desde">Desde</Label>
												<Input
													id="desde"
													type="date"
												/>
											</div>
											<div className="space-y-2">
												<Label htmlFor="hasta">Hasta</Label>
												<Input
													id="hasta"
													type="date"
												/>
											</div>
										</div>

										<div className="flex gap-2">
											<Button onClick={() => handleExport('PDF')}>PDF</Button>
											<Button
												variant="outline"
												onClick={() => handleExport('Excel')}
											>
												Excel
											</Button>
										</div>

										<div className="rounded-md border p-6 text-center text-muted-foreground">
											Los indicadores y tablas se cargarán desde backend.
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent
								value="inventario"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Package className="h-5 w-5" />
											Reporte de inventario
										</CardTitle>
										<CardDescription>
											Sin inventario de ejemplo.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="rounded-md border p-6 text-center text-muted-foreground">
											La tabla de inventario se conectará al backend.
										</div>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent
								value="resumen"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<CardTitle>Resumen general</CardTitle>
										<CardDescription>
											Métricas vacías hasta integrar datos reales.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="rounded-md border p-6 text-center text-muted-foreground">
											No hay cifras hardcoded en esta vista.
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
