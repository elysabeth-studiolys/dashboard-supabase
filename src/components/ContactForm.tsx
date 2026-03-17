import { useState } from 'react'
import type { Contact } from '../hooks/useContacts'

type Props = {
    onAdd: (contact: Omit<Contact, 'id' | 'created_at'>) => void
}
export default function ContactForm({ onAdd }: Props) {

    const [form, setForm] = useState({
        first_name: '',
        last_name: '',
        email: '',
        phone: '',
        status: 'prospect' as Contact['status']
    })

    function handleSubmit() {
        if (!form.first_name || !form.last_name) return
        onAdd(form)

        setForm({
            first_name: '', last_name: '',
            email: '', phone: '',
            status: 'prospect'
        })
    }





    return (
        <div className='flex gap-5'>
            <input className='input-form'
                value={form.first_name}
                onChange={e => setForm({ ...form, first_name: e.target.value })}
            />

            <input className='input-form'
                value={form.last_name}
                onChange={e => setForm({ ...form, last_name: e.target.value })}
            />

            <input className='input-form'
                value={form.email}
                onChange={e => setForm({ ...form, email: e.target.value })}
            />

            <input className='input-form'
                value={form.phone}
                onChange={e => setForm({ ...form, phone: e.target.value })}
            />

            <select className='input-form p-1'
                value={form.status}
                onChange={e => setForm({ ...form, status: e.target.value as Contact['status'] })}
            >
                <option value="prospect">Prospect</option>
                <option value="client">Client</option>
                <option value="inactif">Inactif</option>

            </select>

            <button onClick={handleSubmit}>Ajouter</button>
        </div>

    )
}
