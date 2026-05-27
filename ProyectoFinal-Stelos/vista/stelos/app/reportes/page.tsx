'use client'

import { Header } from '@/components/header'
import { SidebarNav } from '@/components/sidebar-nav'
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { BarChart3, Package } from 'lucide-react'
import { useEffect, useState } from 'react'
import { getReporteVentasGeneral } from '@/lib/api'

export default function ReportesPage() {
	const [reporteVentas, setReporteVentas] = useState('')
	const [loadingReporte, setLoadingReporte] = useState(true)

	const loadReporte = async () => {
		setLoadingReporte(true)
		try {
			const data = await getReporteVentasGeneral()
			setReporteVentas(data)
		} catch {
			setReporteVentas('No se pudo cargar el reporte de ventas.')
		} finally {
			setLoadingReporte(false)
		}
	}

	useEffect(() => {
		loadReporte()
	}, [])

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
							</TabsList>

							<TabsContent
								value="ventas"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<BarChart3 className="h-5 w-5" />
											Reporte general de ventas
										</CardTitle>
										<CardDescription>
											Resumen en texto de todas las ventas registradas.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<div className="flex items-center justify-between">
											<p className="text-sm text-muted-foreground">
												Reporte actualizado desde el backend.
											</p>
											<Button
												variant="outline"
												onClick={loadReporte}
												disabled={loadingReporte}
											>
												Actualizar
											</Button>
										</div>
										<div className="mt-4 rounded-md border bg-background p-6">
											{loadingReporte ? (
												<div className="space-y-2">
													<div className="h-3 w-3/4 animate-pulse rounded bg-muted" />
													<div className="h-3 w-2/3 animate-pulse rounded bg-muted" />
													<div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
													<div className="h-3 w-1/2 animate-pulse rounded bg-muted" />
												</div>
											) : (
												<pre className="whitespace-pre-wrap text-sm text-foreground">
													{reporteVentas}
												</pre>
											)}
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

						</Tabs>
					</div>
				</main>
			</div>
		</div>
	)
}
