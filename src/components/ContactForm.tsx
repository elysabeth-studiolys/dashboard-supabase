import { useState } from 'react'
import type { Contact } from '../hooks/useContacts'
import type { Company } from '../hooks/useCompanies'

type Props = {
    onAdd: (contact: Omit<Contact, 'id' | 'created_at'>) => void
    companies: Company[]
}

export default function ContactForm({ onAdd, companies }: Props) {

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        status: 'prospect' as Contact['status'],
        company_id: ''
    })

    async function handleSubmit() {
        if (!form.first_name || !form.last_name) return
        onAdd(form)

        setForm({
            first_name: '', last_name: '',
            email: '', phone: '',
            status: 'prospect',
            company_id: '',
        })
    }





    return (
        <div className='flex flex-col rounded-xl shadow-xl p-3 bg-white gap-5 p-10'>
            <h1>Ajouter un nouveau contact</h1>
            <div className='grid grid-cols-2 gap-5  justify-center'>
                <div className='flex flex-col'>
                    <span>Prénom</span>
                    <input className='input-form'
                        value={form.first_name}
                        onChange={e => setForm({ ...form, first_name: e.target.value })}
                    />
                </div>

                <div className='flex flex-col'>
                    <span>Nom</span>
                    <input className='input-form'
                        value={form.last_name}
                        onChange={e => setForm({ ...form, last_name: e.target.value })}
                    />
                </div>

                <div className='flex flex-col'>
                    <span>Email</span>
                    <input className='input-form'
                        value={form.email}
                        onChange={e => setForm({ ...form, email: e.target.value })}
                    />
                </div>
                <div className='flex flex-col'>
                    <span>Téléphone</span>
                    <input className='input-form'
                        value={form.phone}
                        onChange={e => setForm({ ...form, phone: e.target.value })}
                    />
                </div>
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
                    <span>Statut</span>
                    <select className='input-form'
                        value={form.status}
                        onChange={e => setForm({ ...form, status: e.target.value as Contact['status'] })}
                    >
                        <option value="prospect">Prospect</option>
                        <option value="client">Client</option>
                        <option value="inactif">Inactif</option>

                    </select>
                </div>


                <button onClick={handleSubmit} className='w-fit'>Ajouter</button>
            </div>
        </div>
    )
}
