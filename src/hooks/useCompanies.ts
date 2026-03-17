import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type Company = {
    id: string
    name: string
    website: string | null
    industry: string
    created_at: string
}

export function useCompanies(){

    const [companies, setCompanies] = useState<Company[]>([])
    const [loading, setLoading] = useState(true)

    async function fetchCompanies(){
        setLoading(true)

        const { data, error } = await supabase
            .from('companies')
            .select('*')
            .order('created_at', {ascending: false})

        if (error) console.error(error)
            else setCompanies(data ?? [])

        setLoading(false)
    }

    useEffect(() => {
        fetchCompanies()
    }, [])

    async function addCompany(company: Omit<Company, 'id' | 'created_at'>) {
        const { data: { user } } = await supabase.auth.getUser()

        const { error } = await supabase
            .from('companies')
            .insert([{ ...company, user_id: user?.id }])

        if (error) console.error(error)
        else fetchCompanies()
    }

    async function deleteCompany(id:string) {
        const { error } = await supabase
            .from('companies')
            .delete()
            .eq('id', id)

        if (error) console.error(error)
        else fetchCompanies()
    }


    return {companies, loading, addCompany, deleteCompany}
}