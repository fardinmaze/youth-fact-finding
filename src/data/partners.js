// Partner logos (source files: assets/Logos/). `roleKey` picks the label from `t.partners.roles`.
// `height` keeps the three very different shapes (wide wordmark, square badge, flag + text) visually balanced.
import logoActionAid from '@/assets/logo-actionaid.png'
import logoShed from '@/assets/logos/logo-shed.png'
import logoEu from '@/assets/logos/logo-eu.png'

export const PARTNERS = [
  { id: 'actionaid', name: 'ActionAid Bangladesh', logo: logoActionAid, roleKey: 'implementedBy', height: 'h-7 sm:h-8' },
  { id: 'shed', name: 'SHED', logo: logoShed, roleKey: 'partner', height: 'h-16 sm:h-20' },
  { id: 'eu', name: 'Co-funded by the European Union', logo: logoEu, roleKey: 'coFunding', height: 'h-12 sm:h-14' },
]

export const EU_PARTNER = PARTNERS.find((p) => p.id === 'eu')
