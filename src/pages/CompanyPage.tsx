import { useCompanies } from "../hooks/useCompanies"

import CompanyForm from "../components/CompanyForm"

import { Trash2, Factory, Globe } from 'lucide-react'



export default function CompanyPage() {

    const { companies, loading, addCompany, deleteCompany } = useCompanies()

    return (
        <div className="flex flex-col gap-10">
            <div >
                <h1>Entreprises</h1>
                <p>{companies.length} entreprises enregistrées</p>
            </div>

            <CompanyForm onAdd={addCompany} />

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
        </div>

    )
}
