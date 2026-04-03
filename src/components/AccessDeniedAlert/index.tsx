'use client'

import { useRouter } from 'next/navigation'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface AccessDeniedAlertProps {
  fallbackRoute: string
  title?: string
  description?: string
  buttonText?: string
}

export function AccessDeniedAlert({
  fallbackRoute,
  title = "Access Denied",
  description = "You do not have permission to view this page.",
  buttonText = "Return"
}: AccessDeniedAlertProps) {
  const router = useRouter()

  return (
    <AlertDialog open={true}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>
            {description}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          {/* Action pushes the user to their correct route */}
          <AlertDialogAction onClick={() => router.push(fallbackRoute)}>
            {buttonText}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}