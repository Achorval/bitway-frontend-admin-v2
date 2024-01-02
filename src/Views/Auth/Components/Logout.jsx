import { useEffect } from 'react';
import { useAuth } from 'Utils/Helper/UseAuth';
import { Navigate } from 'react-router-dom';

export default function Logout() {
  const { logout } = useAuth()
  useEffect(() => {
    logout()
    document.location.reload()
  }, [logout])

  return (
    <Navigate to='/auth/login' />
  )
}