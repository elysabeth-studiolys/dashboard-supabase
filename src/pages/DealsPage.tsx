import { useDeals } from '../hooks/useDeals'
import type { Deal } from '../hooks/useDeals'

import { useCompanies } from '../hooks/useCompanies'
import { useContacts } from '../hooks/useContacts'

import { useState } from 'react'
import DealForm from '../components/DealForm'


const stageColors = {
    lead: 'badge-lead',
    proposition: 'badge-proposition',
    negociation: 'badge-negociation',
    accepté: 'badge-accepte',
    refusé: 'badge-refuse',
}


export default function DealsPage() {

    const { deals, loading, addDeal, deleteDeal } = useDeals()
    const { companies } = useCompanies()
    const { contacts } = useContacts()

    return (
        <div>
            <DealForm onAdd={addDeal} companies={companies} contacts={contacts} />
            <div>
                <h1>Dernières factures</h1>
            </div>
            {loading ? (
                <p>Chargement..</p>
            ) : (
                <div className='flex flex-col gap-5'>
                    {deals.map(d => (
                        <div key={d.id}>
                            <div className='flex justify-between rounded shadow-xl p-3 bg-white gap-2 p-4'>
                                <div className='flex flex-col'>
                                    <p className='font-bold'>{companies.find(company => company.id === d.company_id)?.name}</p>
                                    <p className='text-xs'>{d.created_at}</p>
                                </div>
                                <div className='flex gap-5 items-center'>
                                    <p>{d.value} €</p>
                                    <span className={stageColors[d.stage]}>{d.stage}</span>
                                </div>

                            </div>
                           
                        </div>
                    ))}
                </div>
            )
            }
        </div>
    )
}