import { useDeals } from '../hooks/useDeals'
import type { Deal } from '../hooks/useDeals'

import { useCompanies } from '../hooks/useCompanies'
import { useContacts } from '../hooks/useContacts'

import { useState } from 'react'
import DealForm from '../components/DealForm'

import { CirclePlus } from 'lucide-react'

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

    const [isOpen, setIsOpen] = useState(false)

    function handleAddContact(deal: Omit<Deal, 'id' | 'created_at'>) {
        addDeal(deal)
        setIsOpen(false)
    }

    return (
        <>
            <section>
                <div className="flex items-center justify-between">
                    <h1 className="">Dernières factures</h1>
                    <button onClick={() => setIsOpen(true)}>
                        <CirclePlus size={25} className="text-accent" />
                    </button>
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
            </section>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/5">
                    <DealForm onAdd={handleAddContact} companies={companies} contacts={contacts} />

                </div>
            )}
        </>
    )
}