import ContactsPage from './pages/ContactsPage'
import { useEffect } from 'react'
import { supabase } from './lib/supabase'
import CompanyPage from './pages/CompanyPage'
import DealsPage from './pages/DealsPage'

export default function App() {
  useEffect(() => {
    // Connexion temporaire avec le compte de test
    supabase.auth.signInWithPassword({
      email: 'test@crm.dev',
      password: 'Test1234!'
    }).then(({ data, error }) => {
      console.log('auth →', data.user)
      if (error) console.error(error)
    })
  }, [])
  return (
  <div>

  <ContactsPage />
  <CompanyPage />
  <DealsPage />
  
</div>)
}