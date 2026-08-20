export type PublicPlanCategory = 'MINECRAFT' | 'CODING' | 'VDS'

export interface PublicGamePlan {
  key: string
  name: string
  mob: string | null
  customImg: string | null
  vcpu: number
  ramText: string
  diskText: string
  ramMb: number
  diskMb: number
  db: number | '∞'
  port: string
  backups: number
  price: number
  category: PublicPlanCategory
}

export const publicGamePlans: PublicGamePlan[] = [
  { key: 'mc-creeper', name: 'LC-1', mob: null, customImg: null, vcpu: 1, ramText: '2 ГБ', diskText: '10 ГБ', ramMb: 2048, diskMb: 10000, db: 1, port: '1 Гбит/с', backups: 1, price: 70, category: 'MINECRAFT' },
  { key: 'mc-zombie', name: 'LC-2', mob: null, customImg: null, vcpu: 2, ramText: '4 ГБ', diskText: '25 ГБ', ramMb: 4096, diskMb: 25000, db: 2, port: '1 Гбит/с', backups: 2, price: 140, category: 'MINECRAFT' },
  { key: 'mc-spider', name: 'LC-3', mob: null, customImg: null, vcpu: 3, ramText: '6 ГБ', diskText: '50 ГБ', ramMb: 6144, diskMb: 50000, db: 3, port: '1 Гбит/с', backups: 3, price: 270, category: 'MINECRAFT' },
  { key: 'mc-skeleton', name: 'LC-4', mob: null, customImg: null, vcpu: 4, ramText: '8 ГБ', diskText: '100 ГБ', ramMb: 8192, diskMb: 102400, db: 4, port: '1 Гбит/с', backups: 4, price: 420, category: 'MINECRAFT' },
  { key: 'mc-slime', name: 'LC-5', mob: null, customImg: null, vcpu: 5, ramText: '10 ГБ', diskText: '150 ГБ', ramMb: 10240, diskMb: 122880, db: 5, port: '1 Гбит/с', backups: 5, price: 550, category: 'MINECRAFT' },
  { key: 'mc-witch', name: 'LC-6', mob: null, customImg: null, vcpu: 6, ramText: '12 ГБ', diskText: '200 ГБ', ramMb: 16384, diskMb: 184320, db: 6, port: '1 Гбит/с', backups: 6, price: 650, category: 'MINECRAFT' },
]


