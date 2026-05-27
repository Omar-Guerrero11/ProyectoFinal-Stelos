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
import { Textarea } from '@/components/ui/textarea'
import {
	Building2,
	Database,
	Download,
	FileText,
	Settings,
	Upload,
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'


export default function ConfiguracionPage() {
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
							<h2 className="text-3xl font-bold tracking-tight">
								Configuración
							</h2>
							<p className="text-muted-foreground">
								Configuración general limpia, sin defaults embebidos
							</p>
						</div>

						<Tabs
							defaultValue="general"
							className="w-full"
						>
							<TabsList>
								<TabsTrigger value="general">General</TabsTrigger>
								<TabsTrigger value="reportes">Reportes</TabsTrigger>
								<TabsTrigger value="respaldos">Respaldos</TabsTrigger>
							</TabsList>

							<TabsContent
								value="general"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Building2 className="h-5 w-5" />
											Datos de la tienda
										</CardTitle>
										<CardDescription>
											Información general conectada a tu backend.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<form className="space-y-4">
											<div className="grid gap-4 md:grid-cols-2">
												<div className="space-y-2">
													<Label htmlFor="nombre-tienda">
														Nombre de la tienda
													</Label>
													<Input
														id="nombre-tienda"
														placeholder="Nombre de la tienda"
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="rfc">RFC</Label>
													<Input
														id="rfc"
														placeholder="RFC123456XXX"
													/>
												</div>
												<div className="space-y-2 md:col-span-2">
													<Label htmlFor="direccion">Dirección</Label>
													<Textarea
														id="direccion"
														placeholder="Calle, número, colonia, ciudad, estado, CP"
														rows={3}
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="telefono">Teléfono</Label>
													<Input
														id="telefono"
														placeholder="+52 XXX XXX XXXX"
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="email-tienda">Email</Label>
													<Input
														id="email-tienda"
														type="email"
														placeholder="contacto@dominio.com"
													/>
												</div>
											</div>

											<div className="space-y-2">
												<Label htmlFor="logo">Logo de la tienda</Label>
												<div className="flex gap-2">
													<Input
														id="logo"
														type="file"
														accept="image/*"
													/>
													<Button
														type="button"
														variant="outline"
													>
														<Upload className="mr-2 h-4 w-4" />
														Subir
													</Button>
												</div>
											</div>

											<Button
												type="submit"
												size="lg"
											>
												Guardar configuración
											</Button>
										</form>
									</CardContent>
								</Card>

								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<FileText className="h-5 w-5" />
											Ajustes de tickets
										</CardTitle>
										<CardDescription>
											Configuración de impresión sin valores por defecto.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<form className="space-y-4">
											<div className="grid gap-4 md:grid-cols-2">
												<div className="space-y-2">
													<Label htmlFor="iva">IVA (%)</Label>
													<Input
														id="iva"
														type="number"
														placeholder="16"
														step="0.01"
													/>
												</div>
												<div className="space-y-2">
													<Label htmlFor="formato-ticket">
														Formato de ticket
													</Label>
													<Select>
														<SelectTrigger id="formato-ticket">
															<SelectValue placeholder="Seleccione formato" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="58mm">58mm</SelectItem>
															<SelectItem value="80mm">80mm</SelectItem>
															<SelectItem value="carta">Carta</SelectItem>
														</SelectContent>
													</Select>
												</div>
												<div className="space-y-2">
													<Label htmlFor="impresora">
														Impresora predeterminada
													</Label>
													<Select>
														<SelectTrigger id="impresora">
															<SelectValue placeholder="Seleccione impresora" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="principal">
																Impresora Principal
															</SelectItem>
															<SelectItem value="secundaria">
																Impresora Secundaria
															</SelectItem>
														</SelectContent>
													</Select>
												</div>
												<div className="space-y-2">
													<Label htmlFor="copias">Número de copias</Label>
													<Input
														id="copias"
														type="number"
														placeholder="1"
														min="1"
													/>
												</div>
											</div>

											<Button
												type="submit"
												size="lg"
											>
												Guardar ajustes
											</Button>
										</form>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent
								value="reportes"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Settings className="h-5 w-5" />
											Configuración de reportes
										</CardTitle>
										<CardDescription>
											Periodo y formato listos para backend.
										</CardDescription>
									</CardHeader>
									<CardContent>
										<form className="space-y-6">
											<div className="space-y-4">
												<h3 className="font-semibold">
													Periodos predeterminados
												</h3>
												<div className="grid gap-4 md:grid-cols-2">
													<div className="space-y-2">
														<Label htmlFor="periodo-ventas">
															Reporte de ventas
														</Label>
														<Select>
															<SelectTrigger id="periodo-ventas">
																<SelectValue placeholder="Seleccione periodo" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="dia">Día</SelectItem>
																<SelectItem value="semana">Semana</SelectItem>
																<SelectItem value="mes">Mes</SelectItem>
																<SelectItem value="ano">Año</SelectItem>
															</SelectContent>
														</Select>
													</div>
													<div className="space-y-2">
														<Label htmlFor="periodo-inventario">
															Reporte de inventario
														</Label>
														<Select>
															<SelectTrigger id="periodo-inventario">
																<SelectValue placeholder="Seleccione periodo" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="tiempo-real">
																	Tiempo real
																</SelectItem>
																<SelectItem value="diario">Diario</SelectItem>
																<SelectItem value="mensual">Mensual</SelectItem>
															</SelectContent>
														</Select>
													</div>
												</div>
											</div>

											<div className="space-y-4">
												<h3 className="font-semibold">
													Formatos de exportación
												</h3>
												<div className="grid gap-4 md:grid-cols-2">
													<div className="space-y-2">
														<Label htmlFor="formato-exportacion">
															Formato predeterminado
														</Label>
														<Select>
															<SelectTrigger id="formato-exportacion">
																<SelectValue placeholder="Seleccione formato" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="pdf">PDF</SelectItem>
																<SelectItem value="excel">
																	Excel (.xlsx)
																</SelectItem>
																<SelectItem value="csv">CSV</SelectItem>
															</SelectContent>
														</Select>
													</div>
													<div className="space-y-2">
														<Label htmlFor="orientacion">Orientación</Label>
														<Select>
															<SelectTrigger id="orientacion">
																<SelectValue placeholder="Seleccione orientación" />
															</SelectTrigger>
															<SelectContent>
																<SelectItem value="vertical">
																	Vertical
																</SelectItem>
																<SelectItem value="horizontal">
																	Horizontal
																</SelectItem>
															</SelectContent>
														</Select>
													</div>
												</div>
											</div>

											<Button
												type="submit"
												size="lg"
											>
												Guardar configuración
											</Button>
										</form>
									</CardContent>
								</Card>
							</TabsContent>

							<TabsContent
								value="respaldos"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<CardTitle className="flex items-center gap-2">
											<Database className="h-5 w-5" />
											Respaldos y restauración
										</CardTitle>
										<CardDescription>
											Gestión de copias de seguridad delegada al backend.
										</CardDescription>
									</CardHeader>
									<CardContent className="space-y-6">
										<div className="grid gap-4 md:grid-cols-2">
											<Card>
												<CardHeader className="pb-3">
													<CardTitle className="text-base">
														Exportar base de datos
													</CardTitle>
												</CardHeader>
												<CardContent className="space-y-3">
													<p className="text-sm text-muted-foreground">
														Conecta la exportación de respaldo a tu backend.
													</p>
													<Button className="w-full">
														<Download className="mr-2 h-4 w-4" />
														Exportar respaldo
													</Button>
													<p className="text-xs text-muted-foreground">
														Último respaldo: pendiente de backend
													</p>
												</CardContent>
											</Card>

											<Card>
												<CardHeader className="pb-3">
													<CardTitle className="text-base">
														Cargar respaldo previo
													</CardTitle>
												</CardHeader>
												<CardContent className="space-y-3">
													<p className="text-sm text-muted-foreground">
														Restaura el sistema desde una copia recibida por
														backend.
													</p>
													<Input
														type="file"
														accept=".sql,.db,.backup"
													/>
													<Button
														variant="outline"
														className="w-full bg-transparent"
													>
														<Upload className="mr-2 h-4 w-4" />
														Restaurar respaldo
													</Button>
												</CardContent>
											</Card>
										</div>

										<div className="rounded-lg border border-orange-500 bg-orange-50 p-4 dark:bg-orange-950/20">
											<p className="text-sm font-medium text-orange-800 dark:text-orange-200">
												Advertencia: esta acción debe validarse desde tu backend
												antes de ejecutarse.
											</p>
										</div>

										<div className="space-y-2">
											<h3 className="font-semibold">Respaldos automáticos</h3>
											<div className="grid gap-4 md:grid-cols-2">
												<div className="space-y-2">
													<Label htmlFor="frecuencia">Frecuencia</Label>
													<Select>
														<SelectTrigger id="frecuencia">
															<SelectValue placeholder="Seleccione frecuencia" />
														</SelectTrigger>
														<SelectContent>
															<SelectItem value="desactivado">
																Desactivado
															</SelectItem>
															<SelectItem value="diario">Diario</SelectItem>
															<SelectItem value="semanal">Semanal</SelectItem>
															<SelectItem value="mensual">Mensual</SelectItem>
														</SelectContent>
													</Select>
												</div>
												<div className="space-y-2">
													<Label htmlFor="hora-respaldo">Hora</Label>
													<Input
														id="hora-respaldo"
														type="time"
													/>
												</div>
											</div>
											<Button
												size="lg"
												className="mt-4"
											>
												Guardar configuración
											</Button>
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
