import { useState } from 'react'
import type { Company } from '../hooks/useCompanies'

type Props = {
    onAdd: (company: Omit<Company, 'id' | 'created_at'>) => void
}

export default function CompanyForm({ onAdd}: Props) {

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
        <div>
            <input className='input-form'
                value={form.name}
                onChange={e => setForm({ ...form, name: e.target.value})}
            />

            <input className='input-form'
                value={form.website}
                onChange={e => setForm({ ...form, website: e.target.value})}
            />

            <input className='input-form'
                value={form.industry}
                onChange={e => setForm({ ...form, industry: e.target.value})}
            />

            <button onClick={handleSubmit}>Ajouter</button>
        </div>
        
    )



}