import { useState, useEffect } from 'react'
import { supabase } from '@/utils/supabase'
import { Company } from '@/types/database'

interface UseCompaniesOptions {
  initialSort?: string
  initialFilter?: Record<string, any>
}

export function useCompanies(options: UseCompaniesOptions = {}) {
  const [companies, setCompanies] = useState<Company[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const fetchCompanies = async () => {
    try {
      setLoading(true)
      setError(null)

      let query = supabase
        .from('companies')
        .select('*')
        
      if (options.initialSort) {
        query = query.order(options.initialSort)
      } else {
        query = query.order('created_at', { ascending: false })
      }

      const { data, error } = await query

      if (error) throw error

      setCompanies(data)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const createCompany = async (company: Omit<Company, 'id' | 'created_at' | 'updated_at'>) => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .insert(company)
        .select()
        .single()

      if (error) throw error

      setCompanies(prev => [data, ...prev])
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('An error occurred')
    }
  }

  const updateCompany = async (id: string, updates: Partial<Company>) => {
    try {
      const { data, error } = await supabase
        .from('companies')
        .update(updates)
        .eq('id', id)
        .select()
        .single()

      if (error) throw error

      setCompanies(prev => prev.map(company => 
        company.id === id ? data : company
      ))
      return data
    } catch (err) {
      throw err instanceof Error ? err : new Error('An error occurred')
    }
  }

  const deleteCompany = async (id: string) => {
    try {
      const { error } = await supabase
        .from('companies')
        .delete()
        .eq('id', id)

      if (error) throw error

      setCompanies(prev => prev.filter(company => company.id !== id))
    } catch (err) {
      throw err instanceof Error ? err : new Error('An error occurred')
    }
  }

  useEffect(() => {
    fetchCompanies()
  }, [])

  return {
    companies,
    loading,
    error,
    createCompany,
    updateCompany,
    deleteCompany,
    refreshCompanies: fetchCompanies,
  }
} 