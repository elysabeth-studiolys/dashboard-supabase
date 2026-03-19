import { useState } from 'react'

import { useCompanies, type Company } from "../hooks/useCompanies"
import CompanyForm from "../components/CompanyForm"

import { Trash2, Factory, Globe, CirclePlus } from 'lucide-react'



export default function CompanyPage() {

    const { companies, loading, addCompany, deleteCompany } = useCompanies()

    const [isOpen, setIsOpen] = useState(false)

    function handleAddContact(company: Omit<Company, 'id' | 'created_at'>) {
        addCompany(company)
        setIsOpen(false)
    }


    return (
        <>
        <section className="flex flex-col gap-10">
            <div >
                <div className='flex justify-between'>
                <h1>Entreprises</h1>
                <button onClick={() => setIsOpen(true)}>
                            <CirclePlus size={25} className="text-accent" />
                        </button>
                </div>
                <p>{companies.length} entreprises enregistrées</p>
            </div>


            {loading ? (
                <p className=""> Chargement...</p>
            ) : companies.length === 0 ? (
                <p>Aucune entreprises enregistrés pour l'instant.</p>
            ) : (
                <div className="grid grid-cols-2 gap-10">
                    {companies.map(c => (
                        <div key={c.id} className="flex flex-col rounded-xl shadow-xl p-3 bg-white gap-2 p-4">


                            <div className="flex items-center justify-between">
                                <p className="badge">
                                    {c.name}
                                </p>

                            </div>

                            <div className="flex flex-col gap-2">
                                <div className="flex gap-2 items-center">
                                    <Factory size={15} />
                                    <p>{c.industry ?? '-'}</p>
                                </div>
                                <div className="flex gap-2 items-center">
                                    <Globe size={15} />
                                    <p>{c.website ?? '-'}</p>
                                </div>

                                <button onClick={() => deleteCompany(c.id)} className="w-fit">
                                    <Trash2 size={15} /></button>
                            </div>

                        </div>
                    ))}
                </div>
            )}
        </section>

        {isOpen && (
            <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/5">
                <CompanyForm onAdd={handleAddContact}/>
                
            </div>
        )}
        </>

    )
}
