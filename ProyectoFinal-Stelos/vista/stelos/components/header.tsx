'use client'

import { Button } from '@/components/ui/button'
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Bell, User } from 'lucide-react'
import { useRouter } from 'next/dist/client/components/navigation'

export function Header() {
	const router = useRouter()

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated')
    localStorage.removeItem('usuario')
    router.replace('/login')
    router.refresh()
  }
	return (
		<header className="sticky top-0 z-50 w-full border-b bg-primary">
			<div className="flex h-16 items-center justify-between px-6">
				<div className="flex items-center gap-2">
					<h1 className="text-xl font-bold text-primary-foreground">
						STLEOS - Punto de Venta
					</h1>
				</div>
				<div className="flex items-center gap-4">
					<Button
						variant="ghost"
						size="icon"
						className="text-primary-foreground hover:bg-primary/90"
					>
						<Bell className="h-5 w-5" />
						<span className="sr-only">Notificaciones</span>
					</Button>
					<DropdownMenu>
						<DropdownMenuTrigger asChild>
							<Button
								variant="ghost"
								className="text-primary-foreground hover:bg-primary/90"
							>
								<User className="mr-2 h-5 w-5" />
								<span>Usuario</span>
							</Button>
						</DropdownMenuTrigger>
						<DropdownMenuContent align="end">
							<DropdownMenuLabel>Mi Cuenta</DropdownMenuLabel>
							<DropdownMenuSeparator />
							<DropdownMenuItem>Perfil</DropdownMenuItem>
							<DropdownMenuItem>Configuración</DropdownMenuItem>
							<DropdownMenuSeparator />
							<DropdownMenuItem onClick={handleLogout}>
								Cerrar sesión
							</DropdownMenuItem>
						</DropdownMenuContent>
					</DropdownMenu>
				</div>
			</div>
		</header>
	)
}
