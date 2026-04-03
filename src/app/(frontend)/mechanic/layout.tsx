import { AccessDeniedAlert } from '@/components/AccessDeniedAlert'
import { protectRoute } from '@/utilities/getMeUser'

export default async function MechanicLayout({ children }: { children: React.ReactNode }) {
  // Allow mechanics only
  const {authorized, fallbackRoute} = await protectRoute(['mechanic']) 

  if (!authorized) {
    //halt rendering of mechanics page
    return <AccessDeniedAlert fallbackRoute={fallbackRoute}/>
  }

  return <>{children}</>
}