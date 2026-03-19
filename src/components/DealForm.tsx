import { useState } from 'react'
import type { Deal } from '../hooks/useDeals'
import type { Contact } from '../hooks/useContacts'
import type { Company } from '../hooks/useCompanies'

type Props = {
    onAdd: (contact: Omit<Deal, 'id' | 'created_at'>) => void
    companies: Company[]
    contacts: Contact[]
}


export default function DealForm({ onAdd, companies, contacts }: Props) {

    const [form, setForm] = useState({
        title: '',
        value: 0,
        stage: 'lead' as Deal['stage'],
        closed_at: null as string | null,
        contact_id: '',
        company_id: '',
    })

    async function handleSubmit() {
        if (!form.title || !form.value || !form.stage) return
            onAdd(form)

        setForm({
            title: '',
            value: 0,
            stage: 'lead',
            closed_at: null,
            contact_id: '',
            company_id: '',
        })
    }


    return (
        <div>
            <h1>Enregistrer une vente</h1>
            <div>

                <input className='input-form'
                    value={form.title}
                    onChange={e => setForm({ ...form, title: e.target.value })}
                />

                <input className='input-form'
                    type='number'
                    value={form.value}
                    onChange={e => setForm({ ...form, value: Number(e.target.value) })}
                />

                <input className='input-form'
                    type='date'
                    value={form.closed_at ?? ''}
                    onChange={e => setForm({ ...form, closed_at: e.target.value || null })}
                />

                <select className='input-form'
                    value={form.stage}
                    onChange={e => setForm({ ...form, stage: e.target.value as Deal['stage'] })}
                >
                    <option value="lead">Lead</option>
                    <option value="poposition">Proposition</option>
                    <option value="negociation">Négociation</option>
                    <option value="accepté">Accepté</option>
                    <option value="refusé">Refusé</option>

                </select>

                <div className='flex flex-col'>
                    <span>Entreprise</span>
                    <select className='input-form p-1'
                        value={form.company_id}
                        onChange={e => setForm({ ...form, company_id: e.target.value })}
                    >
                        <option value="">--</option>
                        {companies.map(c => (
                            <option value={c.id}>{c.name}</option>
                        ))}

                    </select>
                </div>

                <div className='flex flex-col'>
                    <span>Contact</span>
                    <select className='input-form p-1'
                        value={form.contact_id}
                        onChange={e => setForm({ ...form, contact_id: e.target.value })}
                    >
                        <option value="">--</option>
                        {contacts.map(c => (
                            <option value={c.id}>{c.first_name} {c.last_name}</option>
                        ))}

                    </select>
                </div>

                <button onClick={handleSubmit} className='w-fit'>Ajouter</button>

            </div>
        </div>
    )
}

