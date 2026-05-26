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
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog'
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
import { Shield, UserPlus, Users } from 'lucide-react'
import { useState } from 'react'

export default function UsuariosPage() {
	const [openNewUser, setOpenNewUser] = useState(false)

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
							<h2 className="text-3xl font-bold tracking-tight">Usuarios</h2>
							<p className="text-muted-foreground">
								Gestión de cuentas lista para backend
							</p>
						</div>

						<Tabs
							defaultValue="usuarios"
							className="w-full"
						>
							<TabsList>
								<TabsTrigger value="usuarios">Gestión</TabsTrigger>
							</TabsList>

							<TabsContent
								value="usuarios"
								className="space-y-4"
							>
								<Card>
									<CardHeader>
										<div className="flex items-center justify-between">
											<div>
												<CardTitle className="flex items-center gap-2">
													<Users className="h-5 w-5" />
													Gestión de usuarios
												</CardTitle>
												<CardDescription>
													La tabla se alimentará desde tu backend.
												</CardDescription>
											</div>
											<Dialog
												open={openNewUser}
												onOpenChange={setOpenNewUser}
											>
												<DialogTrigger asChild>
													<Button>
														<UserPlus className="mr-2 h-4 w-4" />
														Nuevo usuario
													</Button>
												</DialogTrigger>
												<DialogContent>
													<DialogHeader>
														<DialogTitle>Crear usuario</DialogTitle>
														<DialogDescription>
															Formulario limpio para enviar datos reales.
														</DialogDescription>
													</DialogHeader>
													<div className="space-y-4 py-4">
														<div className="space-y-2">
															<Label htmlFor="nuevo-nombre">
																Nombre completo
															</Label>
															<Input
																id="nuevo-nombre"
																placeholder="Nombre del usuario"
															/>
														</div>
														<div className="space-y-2">
															<Label htmlFor="nuevo-email">
																Correo electrónico
															</Label>
															<Input
																id="nuevo-email"
																type="email"
																placeholder="correo@dominio.com"
															/>
														</div>

														<div className="space-y-2">
															<Label htmlFor="nuevo-rol">Rol</Label>
															<Select>
																<SelectTrigger id="nuevo-rol">
																	<SelectValue placeholder="Seleccione un rol" />
																</SelectTrigger>
																<SelectContent>
																	<SelectItem value="cajero">Cajero</SelectItem>
																	<SelectItem value="administrador">
																		Administrador
																	</SelectItem>
																</SelectContent>
															</Select>
														</div>
													</div>
													<DialogFooter>
														<Button
															variant="outline"
															onClick={() => setOpenNewUser(false)}
														>
															Cancelar
														</Button>
														<Button onClick={() => setOpenNewUser(false)}>
															Guardar
														</Button>
													</DialogFooter>
												</DialogContent>
											</Dialog>
										</div>
									</CardHeader>
									<CardContent>
										<div className="rounded-md border">
											<Table>
												<TableHeader>
													<TableRow>
														<TableHead>Nombre</TableHead>
														<TableHead>Correo</TableHead>
														<TableHead>Rol</TableHead>
														<TableHead>Acciones</TableHead>
													</TableRow>
												</TableHeader>
												<TableBody>
													<TableRow>
														<TableCell
															colSpan={4}
															className="py-8 text-center text-muted-foreground"
														>
															Sin usuarios cargados desde backend
														</TableCell>
													</TableRow>
												</TableBody>
											</Table>
										</div>
									</CardContent>
								</Card>

								<div className="grid gap-4 md:grid-cols-2">
									<Card>
										<CardHeader className="pb-3">
											<CardTitle className="flex items-center gap-2 text-base">
												<Shield className="h-4 w-4" />
												Cajero
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-muted-foreground">
												Permisos definidos por backend.
											</p>
										</CardContent>
									</Card>
									<Card>
										<CardHeader className="pb-3">
											<CardTitle className="flex items-center gap-2 text-base">
												<Shield className="h-4 w-4" />
												Administrador
											</CardTitle>
										</CardHeader>
										<CardContent>
											<p className="text-sm text-muted-foreground">
												Permisos definidos por backend.
											</p>
										</CardContent>
									</Card>
								</div>
							</TabsContent>


						</Tabs>
					</div>
				</main>
			</div>
		</div>
	)
}
