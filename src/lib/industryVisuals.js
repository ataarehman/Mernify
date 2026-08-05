import {
  Building2,
  Factory,
  GraduationCap,
  HeartPulse,
  Landmark,
  Plane,
  ShoppingBag,
  Truck,
  Wrench,
} from 'lucide-react'

/** Icon, accent, and motif per industry slug. Shared so every surface stays consistent. */
export const INDUSTRY_VISUALS = {
  healthcare: { Icon: HeartPulse, accent: '#22d3ee', label: 'Care systems', motif: 'pulse' },
  'financial-services': { Icon: Landmark, accent: '#818cf8', label: 'Money flows', motif: 'ledger' },
  logistics: { Icon: Truck, accent: '#34d399', label: 'Movement', motif: 'route' },
  retail: { Icon: ShoppingBag, accent: '#f472b6', label: 'Commerce', motif: 'stack' },
  education: { Icon: GraduationCap, accent: '#a78bfa', label: 'Learning', motif: 'beam' },
  'field-service': { Icon: Wrench, accent: '#38bdf8', label: 'Field ops', motif: 'grid' },
  construction: { Icon: Building2, accent: '#fbbf24', label: 'Build', motif: 'grid' },
  'real-estate': { Icon: Building2, accent: '#fb7185', label: 'Property', motif: 'stack' },
  manufacturing: { Icon: Factory, accent: '#2dd4bf', label: 'Production', motif: 'route' },
  travel: { Icon: Plane, accent: '#67e8f9', label: 'Journeys', motif: 'beam' },
}

export function getIndustryVisual(slug) {
  return INDUSTRY_VISUALS[slug] || INDUSTRY_VISUALS.logistics
}
