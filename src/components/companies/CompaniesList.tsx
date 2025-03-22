import { useState } from 'react'
import { useRouter } from 'next/router'
import { Company } from '@/types/database'
import { useCompanies } from '@/hooks/useCompanies'
import { Table } from '@/components/shared/Table'
import { Button } from '@/components/shared/Button'

export function CompaniesList() {
  const router = useRouter()
  const { companies, loading, error } = useCompanies()
  const [searchTerm, setSearchTerm] = useState('')

  const filteredCompanies = companies.filter(company =>
    company.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    company.industry?.toLowerCase().includes(searchTerm.toLowerCase())
  )

  const columns = [
    { header: 'Name', accessor: 'name' },
    { header: 'Industry', accessor: 'industry' },
    { header: 'Size', accessor: 'size' },
    { header: 'Type', accessor: 'type' },
    {
      header: 'Created',
      accessor: (company: Company) => new Date(company.created_at).toLocaleDateString()
    }
  ]

  if (error) {
    return (
      <div className="bg-red-50 p-4 rounded-md">
        <p className="text-red-700">{error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <div className="max-w-xs w-full">
          <input
            type="text"
            placeholder="Search companies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          />
        </div>
        <Button onClick={() => router.push('/companies/new')}>
          Add Company
        </Button>
      </div>

      <div className="bg-white shadow rounded-lg">
        <Table
          columns={columns}
          data={filteredCompanies}
          isLoading={loading}
          onRowClick={(company) => router.push(`/companies/${company.id}`)}
        />
      </div>
    </div>
  )
} 