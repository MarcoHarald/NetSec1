import { useState } from 'react'
import { useRouter } from 'next/router'
import { Company } from '@/types/database'
import { useCompanies } from '@/hooks/useCompanies'
import { Input } from '@/components/shared/Input'
import { Button } from '@/components/shared/Button'

interface CompanyFormProps {
  initialData?: Company
}

export function CompanyForm({ initialData }: CompanyFormProps) {
  const router = useRouter()
  const { createCompany, updateCompany } = useCompanies()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const [formData, setFormData] = useState({
    name: initialData?.name || '',
    website: initialData?.website || '',
    industry: initialData?.industry || '',
    size: initialData?.size || '',
    type: initialData?.type || '',
    description: initialData?.description || '',
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (initialData) {
        await updateCompany(initialData.id, formData)
      } else {
        await createCompany(formData)
      }
      router.push('/companies')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl">
      {error && (
        <div className="bg-red-50 p-4 rounded-md">
          <p className="text-red-700">{error}</p>
        </div>
      )}

      <Input
        label="Company Name"
        required
        value={formData.name}
        onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
      />

      <Input
        label="Website"
        type="url"
        value={formData.website}
        onChange={(e) => setFormData(prev => ({ ...prev, website: e.target.value }))}
      />

      <Input
        label="Industry"
        value={formData.industry}
        onChange={(e) => setFormData(prev => ({ ...prev, industry: e.target.value }))}
      />

      <div className="grid grid-cols-2 gap-4">
        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.size}
          onChange={(e) => setFormData(prev => ({ ...prev, size: e.target.value }))}
        >
          <option value="">Select Size</option>
          <option value="Small">Small</option>
          <option value="Medium">Medium</option>
          <option value="Large">Large</option>
          <option value="Enterprise">Enterprise</option>
        </select>

        <select
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
          value={formData.type}
          onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
        >
          <option value="">Select Type</option>
          <option value="Investor">Investor</option>
          <option value="Customer">Customer</option>
          <option value="Partner">Partner</option>
          <option value="Vendor">Vendor</option>
          <option value="Other">Other</option>
        </select>
      </div>

      <textarea
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
        rows={4}
        placeholder="Description"
        value={formData.description}
        onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
      />

      <div className="flex gap-4">
        <Button type="submit" isLoading={loading}>
          {initialData ? 'Update Company' : 'Create Company'}
        </Button>
        <Button type="button" variant="secondary" onClick={() => router.back()}>
          Cancel
        </Button>
      </div>
    </form>
  )
} 