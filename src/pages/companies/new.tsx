import { CompanyForm } from '@/components/companies/CompanyForm'

export default function NewCompany() {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Add New Company</h1>
      <CompanyForm />
    </div>
  )
}  