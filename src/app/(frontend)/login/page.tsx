import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import Link from 'next/link'
import { Logo } from '@/components/Logo/Logo' // [cite: 890] Import the Logo component

/* sem break changes | another change */

export default function LoginPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40 p-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardHeader className="space-y-1 text-center">
          <div className="flex justify-center mb-4">
            <Logo className="h-12 w-auto" /> 
          </div>
          
          <CardTitle className="text-2xl font-bold tracking-tight">Login to ASC</CardTitle>
          <CardDescription>
            Enter your email and password to access the ASC System
          </CardDescription>
        </CardHeader>
        <CardContent className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="name@utm.my" required />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link 
                href="/forgot-password" 
                className="text-sm font-medium text-primary hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" placeholder='*****' required />
            <p className="text-xs text-muted-foreground italic">
              Passwords are encrypted for security.
            </p>
          </div>
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button className="w-full" type="submit">
            Login
          </Button>
          <div className="text-center text-sm text-muted-foreground">
            Don&apos;t have a registered account?{" "}
            <Link href="/register-vehicle" className="font-medium text-primary hover:underline">
              Register here
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}