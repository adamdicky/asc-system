'use client'

import React, { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator' // Ensure you have this or use <hr />
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '@/components/ui/dialog'
import { User, Phone, Lock, Car, Save, CheckCircle2 } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

// Mock Data for the logged-in customer
const initialProfile = {
  name: 'Ahmad bin Ali',
  email: 'ahmad.ali@graduate.utm.my', // Email is typically read-only
  phone: '012-3456789',
}

export const CustomerProfileForm = () => {
  const router = useRouter()
  const [profile, setProfile] = useState(initialProfile)
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false)
  const [isSaved, setIsSaved] = useState(false)

  // Password State
  const [passwords, setPasswords] = useState({
    old: '',
    new: '',
    confirm: ''
  })

  const handleSave = () => {
    // Simulate API Call
    setTimeout(() => {
      setIsSaved(true)
      setTimeout(() => setIsSaved(false), 3000)
    }, 500)
  }

  const handleChangePassword = () => {
    if (passwords.new !== passwords.confirm) {
      alert("New passwords do not match!")
      return
    }
    // Simulate Password Change Logic (AF1)
    setIsPasswordModalOpen(false)
    setPasswords({ old: '', new: '', confirm: '' })
    alert("Password changed successfully.")
  }

  return (
    <div className="space-y-6">
      {/* PERSONAL DETAILS CARD */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <User className="w-5 h-5 text-primary" />
            <CardTitle>Personal Information</CardTitle>
          </div>
          <CardDescription>Update your contact details.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input 
              id="name" 
              value={profile.name} 
              onChange={(e) => setProfile({ ...profile, name: e.target.value })}
            />
          </div>
          
          <div className="grid gap-2">
            <Label htmlFor="email">Email Address</Label>
            <Input 
              id="email" 
              value={profile.email} 
              disabled 
              className="bg-muted text-muted-foreground cursor-not-allowed" 
            />
            <p className="text-[10px] text-muted-foreground">Email cannot be changed directly. Contact admin for assistance.</p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phone">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input 
                id="phone" 
                value={profile.phone} 
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                className="pl-9"
              />
            </div>
          </div>
        </CardContent>
        <CardFooter className="flex justify-between border-t pt-6">
          <Button variant="outline" onClick={() => setProfile(initialProfile)}>Reset</Button>
          <Button onClick={handleSave} className="gap-2" disabled={isSaved}>
            {isSaved ? <CheckCircle2 className="w-4 h-4" /> : <Save className="w-4 h-4" />}
            {isSaved ? 'Changes Saved' : 'Save Changes'}
          </Button>
        </CardFooter>
      </Card>

      {/* SECURITY & VEHICLE MANAGEMENT */}
      <div className="grid md:grid-cols-2 gap-6">
        
        {/* SECURITY CARD */}
        <Card>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Lock className="w-5 h-5 text-primary" />
              <CardTitle>Security</CardTitle>
            </div>
            <CardDescription>Manage your account password.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between p-4 border rounded-md bg-muted/10">
              <div className="space-y-1">
                <p className="text-sm font-medium">Password</p>
                <p className="text-xs text-muted-foreground">Last changed 3 months ago</p>
              </div>
              <Button variant="outline" size="sm" onClick={() => setIsPasswordModalOpen(true)}>Change</Button>
            </div>
          </CardContent>
        </Card>

        {/* VEHICLE MANAGEMENT LINK (AF2) */}
        <Card className="border-l-4 border-l-blue-500">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Car className="w-5 h-5 text-blue-600" />
              <CardTitle>Vehicle Management</CardTitle>
            </div>
            <CardDescription>Add, remove, or view your registered vehicles.</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground mb-4">
              You currently have <strong>3</strong> vehicles registered under this account.
            </p>
            <Button className="w-full bg-blue-600 hover:bg-blue-700" onClick={() => router.push('/customer/vehicles')}>
              Manage Vehicles &rarr;
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* CHANGE PASSWORD DIALOG (AF1 Flow) */}
      <Dialog open={isPasswordModalOpen} onOpenChange={setIsPasswordModalOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>
              Enter your current password to verify your identity.
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="old-pass">Old Password</Label>
              <Input 
                id="old-pass" 
                type="password" 
                value={passwords.old}
                onChange={(e) => setPasswords({...passwords, old: e.target.value})}
              />
            </div>
            <Separator />
            <div className="grid gap-2">
              <Label htmlFor="new-pass">New Password</Label>
              <Input 
                id="new-pass" 
                type="password" 
                value={passwords.new}
                onChange={(e) => setPasswords({...passwords, new: e.target.value})}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirm-pass">Confirm New Password</Label>
              <Input 
                id="confirm-pass" 
                type="password" 
                value={passwords.confirm}
                onChange={(e) => setPasswords({...passwords, confirm: e.target.value})}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordModalOpen(false)}>Cancel</Button>
            <Button onClick={handleChangePassword}>Change Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}