import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type Contact = {
    id: string
    first_name: string
    last_name: string
    email: string | null
    phone: string | null
    status: 'prospect' | 'client' | 'inactif'
    created_at: string

}
export function useContacts() {
    const [contacts, setContacts] = useState<Contact[]>([])
    const [loading, setLoading] = useState(true)

//Lire les données
async function fetchContacts(){
    setLoading(true)

    const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', {ascending: false })

    if (error) console.error(error)
        else setContacts(data ?? [])
    
    setLoading(false)
}

useEffect(() => {
    fetchContacts()
}, [])

//écrire dans lla base de donnée
async function addContact(contact: Omit<Contact, 'id' | 'created_at'>) {
    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase
        .from('contacts')
        .insert([{ ...contact, user_id: user?.id }])

    if (error) console.error(error)
    else fetchContacts()
}

async function deleteContact(id: string) {
    const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', id)

    if (error) console.error(error)
    else fetchContacts()
}

return { contacts, loading, addContact, deleteContact }
}