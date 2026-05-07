export const DEPARTMENTS = [
  { id: 'law',        label: 'Ministry of Law & Justice',       icon: '⚖️' },
  { id: 'finance',    label: 'Ministry of Finance',             icon: '💰' },
  { id: 'home',       label: 'Ministry of Home Affairs',        icon: '🏛️' },
  { id: 'education',  label: 'Ministry of Education',           icon: '📚' },
  { id: 'health',     label: 'Ministry of Health',              icon: '🏥' },
  { id: 'defence',    label: 'Ministry of Defence',             icon: '🛡️' },
  { id: 'external',   label: 'Ministry of External Affairs',    icon: '🌐' },
  { id: 'commerce',   label: 'Ministry of Commerce & Industry', icon: '📈' },
]

export const getDept = (id) => DEPARTMENTS.find(d => d.id === id) || { id, label: id, icon: '📋' }
export const getDeptLabel = (id) => getDept(id).label
