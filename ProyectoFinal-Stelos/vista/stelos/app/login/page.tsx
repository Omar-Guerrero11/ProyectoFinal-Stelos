'use client'

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
import { login } from '@/lib/api'
import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [contrasena, setContrasena] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(false)
const router = useRouter()


  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoading(true)
    setStatus('')

 try {
  const data = await login({ email, contrasena })
  
  localStorage.setItem('isAuthenticated', 'true')
  localStorage.setItem('usuario', JSON.stringify(data))
  console.log('antes de redirigir')
console.log(localStorage.getItem('isAuthenticated'))
  router.push('/dashboard')
} catch {
  setStatus('Credenciales inválidas')
} finally {
  setLoading(false)
}
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 p-6">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle>Iniciar sesión</CardTitle>
          <CardDescription>
            Acceso rápido para usuarios registrados.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form className="space-y-4" onSubmit={handleLogin}>
            <div className="space-y-2">
              <Label htmlFor="login-email">Correo</Label>
              <Input
                id="login-email"
                type="email"
                placeholder="correo@dominio.com"
                value={email}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setEmail(event.target.value)
                }
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="login-password">Contraseña</Label>
              <Input
                id="login-password"
                type="password"
                placeholder="Contraseña"
                value={contrasena}
                onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                  setContrasena(event.target.value)
                }
                required
              />
            </div>

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? 'Ingresando...' : 'Entrar'}
            </Button>

            {status ? (
              <p className="text-sm text-muted-foreground">{status}</p>
            ) : null}
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
