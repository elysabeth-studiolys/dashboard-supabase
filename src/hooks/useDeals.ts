import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

export type Deal = {
    id: string
    title: string
    value: number
    stage: 'lead' | 'proposition' | 'negociation' | 'refusé' | 'accepté'
    contact_id: string | null
    company_id: string | null
    created_at: string
    closed_at: string | null
}

export function useDeals(){

    const [deals, setDeals] = useState<Deal[]>([])
    const [loading, setLoading] = useState(true)

    async function fetchDeals(){
        setLoading(true)

        const { data, error } = await supabase
            .from('deals')
            .select('*')
            .order('Created_at', {ascending: false})

        if(error) console.error(error)
            else setDeals(data ?? [])

        setLoading(false)
    }

    useEffect(() => {
        fetchDeals()
    }, [])

    async function addDeal(deals: Omit<Deal, 'id' | 'created_at'>) {
        const { data: { user } } = await supabase.auth.getUser()

        const { error } = await supabase
            .from('deals')
            .insert([{ ...deals, user_id: user?.id}])

        if (error) console.error(error)
        else fetchDeals()
    }

    async function deleteDeal(id:string) {
        const { error } = await supabase
            .from('deals')
            .delete()
            .eq('id', id)

        if (error) console.error(error)
        else fetchDeals
    }

    return { deals, loading, addDeal, deleteDeal }
}