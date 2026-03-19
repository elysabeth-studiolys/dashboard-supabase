import { useState } from 'react'
import type { Company } from '../hooks/useCompanies'

type Props = {
    onAdd: (company: Omit<Company, 'id' | 'created_at'>) => void
}

export default function CompanyForm({ onAdd }: Props) {

    const [form, setForm] = useState({
        name: '',
        website: '',
        industry: '',
    })

    function handleSubmit() {
        if (!form.name || !form.industry) return
        onAdd(form)

        setForm({
            name: '',
            website: '',
            industry: ''
        })
    }

    return (
        <div className="flex flex-col w-1/2 rounded-xl shadow-xl p-3 bg-white gap-2 p-4">
            <h1>Enregistrer une entreprise</h1>
            <div className='flex flex-col'>
                <span>Nom de l'entreprise</span>
                <input className='input-form'
                    value={form.name}
                    onChange={e => setForm({ ...form, name: e.target.value })}
                />
            </div>

            <div className='flex flex-col'>
                <span>Site</span>
                <input className='input-form'
                    value={form.website}
                    onChange={e => setForm({ ...form, website: e.target.value })}
                />
            </div>

            <div className='flex flex-col'>
                <span>Domaine</span>
                <input className='input-form'
                    value={form.industry}
                    onChange={e => setForm({ ...form, industry: e.target.value })}
                />
            </div>

            <button onClick={handleSubmit}>Ajouter</button>
        </div>

    )



}