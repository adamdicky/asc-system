import { AccessDeniedAlert } from '@/components/AccessDeniedAlert'
import { protectRoute } from '@/utilities/getMeUser'

export default async function CustomerLayout({ children }: { children: React.ReactNode }) {
  // Allow customers only
  const {authorized, fallbackRoute} = await protectRoute(['customer']) 

  if (!authorized) {
    //halt rendering of the customer's pages
    return <AccessDeniedAlert fallbackRoute={fallbackRoute}/>
  }
  
  return <>{children}</>
}