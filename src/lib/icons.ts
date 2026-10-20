import {
  Backpack,
  BookOpen,
  Briefcase,
  GraduationCap,
  HandHeart,
  Handshake,
  Heart,
  Languages,
  Leaf,
  Monitor,
  Music,
  Palette,
  ShieldCheck,
  Trophy,
  Users,
  type LucideIcon,
} from 'lucide-react'
import type { IconKey } from '../content/types'

export const icons: Record<IconKey, LucideIcon> = {
  family: Users,
  parent: HandHeart,
  pupil: Backpack,
  staff: Briefcase,
  teacher: GraduationCap,
  shield: ShieldCheck,
  book: BookOpen,
  heart: Heart,
  trophy: Trophy,
  handshake: Handshake,
  music: Music,
  art: Palette,
  computer: Monitor,
  sport: Trophy,
  nature: Leaf,
  language: Languages,
}

