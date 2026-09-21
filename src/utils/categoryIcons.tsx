import {
  Home, Car, Bus, Train, Bike, Plane, Fuel,
  UtensilsCrossed, Coffee, ShoppingCart, Apple,
  Pill, Hospital, Heart, Activity,
  Music, Film, Gamepad2, Camera, BookOpen,
  Briefcase, Wallet, TrendingUp, PiggyBank, CreditCard,
  GraduationCap, Pencil,
  Gift, Shirt, Smartphone, Zap, Wrench, Baby, PawPrint, Leaf, Tag,
} from 'lucide-react'
import type { LucideProps } from 'lucide-react'

export const ICON_MAP: Record<string, React.ComponentType<LucideProps>> = {
  Home,
  Car, Bus, Train, Bike, Plane, Fuel,
  UtensilsCrossed, Coffee, ShoppingCart, Apple,
  Pill, Hospital, Heart, Activity,
  Music, Film, Gamepad2, Camera, BookOpen,
  Briefcase, Wallet, TrendingUp, PiggyBank, CreditCard,
  GraduationCap, Pencil,
  Gift, Shirt, Smartphone, Zap, Wrench, Baby, PawPrint, Leaf, Tag,
}

export const ICON_LIST = Object.keys(ICON_MAP)

export function CategoryIcon({
  name,
  size = 14,
  ...props
}: { name: string | null } & Omit<LucideProps, 'name'>) {
  if (!name) return <Tag size={size} {...props} />
  const Icon = ICON_MAP[name]
  if (!Icon) return <Tag size={size} {...props} />
  return <Icon size={size} {...props} />
}
