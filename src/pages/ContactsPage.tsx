
import { useContacts } from "../hooks/useContacts"
import { useCompanies } from "../hooks/useCompanies"
import type { Contact } from '../hooks/useContacts'

import { useState } from "react"

import ContactForm from "../components/ContactForm"

import { Trash2, Mail, Phone, Factory, CirclePlus } from 'lucide-react'

const statusColors = {
    prospect: 'badge-prospect',
    client: 'badge-client',
    inactif: 'badge-inactif'
}



export default function ContactsPage() {
    const { contacts, loading, addContact, deleteContact } = useContacts()
    const { companies } = useCompanies()

    const [isOpen, setIsOpen] = useState(false)

    function handleAddContact(contact: Omit<Contact, 'id' | 'created_at'>) {
        addContact(contact)
        setIsOpen(false)
    }
    return (
        <>
            <section className="flex flex-col gap-10">

                <div>
                    <div className="flex items-center justify-between">
                        <h1 className="">Contacts</h1>
                        <button onClick={() => setIsOpen(true)}>
                            <CirclePlus size={25} className="text-accent" />
                        </button>
                    </div>
                    <p className="">
                        {contacts.length} clients enregistrés
                    </p>
                </div>


                {loading ? (
                    <p className=""> Chargement...</p>
                ) : contacts.length === 0 ? (
                    <p>Aucun contact pour l'instant.</p>
                ) : (
                    <div className="grid grid-cols-2 gap-10">
                        {contacts.map(c => (
                            <div key={c.id} className="flex flex-col rounded-xl shadow-xl p-3 bg-white gap-2 p-4">


                                <div className="flex items-center justify-between">
                                    <p className="badge">
                                        {c.first_name} {c.last_name}
                                    </p>

                                    <span className={statusColors[c.status]} >{c.status}</span>
                                </div>

                                <div className="flex flex-col gap-2">
                                    <div className="flex gap-2 items-center">
                                        <Factory size={15} />
                                        <p>{companies.find(company => company.id === c.company_id)?.name ?? '-'}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Mail size={15} />
                                        <p>{c.email ?? '-'}</p>
                                    </div>
                                    <div className="flex gap-2 items-center">
                                        <Phone size={15} />
                                        <p>{c.phone ?? '-'}</p>
                                    </div>

                                    <button onClick={() => deleteContact(c.id)} className="w-fit">
                                        <Trash2 size={15} /></button>
                                </div>

                            </div>
                        ))}
                    </div>
                )}

            </section>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm bg-white/5">
                    <div>
                        <ContactForm onAdd={handleAddContact} companies={companies} />
                    </div>
                </div>
            )}
        </>

    )
}