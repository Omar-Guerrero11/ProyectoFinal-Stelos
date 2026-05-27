'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
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
import { BarChart3, Package, Settings, ShoppingCart, Users } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

const modules = [
  {
    title: 'Ventas',
    description: 'Captura de ventas y flujo de cobro conectado a tu backend.',
    href: '/ventas',
    icon: ShoppingCart,
  },
  {
    title: 'Inventario',
    description: 'Catálogo, stock y movimientos listos para consumir API.',
    href: '/inventario',
    icon: Package,
  },
  {
    title: 'Reportes',
    description: 'Panel de consulta preparado para datos reales.',
    href: '/reportes',
    icon: BarChart3,
  },
  {
    title: 'Usuarios',
    description: 'Gestión de cuentas y permisos listos para backend.',
    href: '/usuarios',
    icon: Users,
  },
  {
    title: 'Configuración',
    description: 'Ajustes generales de la app.',
    href: '/configuracion',
    icon: Settings,
  },
]

export default function DashboardPage() {
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
    const isAuthenticated = localStorage.getItem('isAuthenticated')

    if (isAuthenticated !== 'true') {
      router.replace('/login')
    }
  }, [router])

  return (
    <div className="flex h-screen flex-col">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-64 border-r bg-card">
          <SidebarNav />
        </aside>
        <main className="flex-1 overflow-y-auto p-6">
          <div className="mx-auto max-w-7xl space-y-6">
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {modules.map((module) => {
                const Icon = module.icon
                return (
                  <Card key={module.href}>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Icon className="h-5 w-5" />
                        {module.title}
                      </CardTitle>
                      <CardDescription>{module.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Link href={module.href}>
                        <Button
                          className="w-full bg-transparent"
                          variant="outline"
                        >
                          Abrir {module.title}
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}