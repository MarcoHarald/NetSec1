export interface Company {
  id: string
  name: string
  website?: string
  industry?: string
  size?: 'Small' | 'Medium' | 'Large' | 'Enterprise'
  type?: 'Investor' | 'Customer' | 'Partner' | 'Vendor' | 'Other'
  description?: string
  created_at: string
  updated_at: string
}

export interface Individual {
  id: string
  first_name: string
  last_name: string
  email?: string
  phone?: string
  company_id?: string
  role?: string
  contact_type?: 'Investor' | 'Customer' | 'Potential Employee' | 'Partner' | 'Other'
  description?: string
  created_at: string
  updated_at: string
}

export interface Conversation {
  id: string
  date: string
  company_id?: string
  notes: string
  follow_up_required: boolean
  follow_up_date?: string
  created_by: string
  created_at: string
  updated_at: string
}

export interface Tag {
  id: string
  name: string
  color?: string
  category: 'Company' | 'Individual' | 'Conversation' | 'All'
  created_at: string
} 