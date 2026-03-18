import { useDeals } from '../hooks/useDeals'
import type { Deal } from '../hooks/useDeals'

import { useCompanies } from '../hooks/useCompanies'
import { useContacts } from '../hooks/useContacts'

import { useState } from 'react'
import DealForm from '../components/DealForm'

export default function DealsPage() {

    const { deals, loading, addDeal, deleteDeal } = useDeals()
    const { companies } = useCompanies()
    const { contacts } = useContacts()

return (
    <DealForm onAdd={addDeal} companies={companies} contacts={contacts}/>
)
}