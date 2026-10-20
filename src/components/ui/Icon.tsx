import {
  AlertCircleIcon,
  ArrowLeft01Icon,
  ArrowRight01Icon,
  ArrowRight02Icon,
  ArrowUp02Icon,
  Award01Icon,
  Backpack01Icon,
  BookOpen01Icon,
  Briefcase01Icon,
  Calendar03Icon,
  CallIcon,
  Cancel01Icon,
  CheckmarkBadge01Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Compass01Icon,
  ComputerIcon,
  Download04Icon,
  FavouriteIcon,
  File01Icon,
  FootballIcon,
  HandHeartIcon,
  HandshakeIcon,
  ImageNotFound01Icon,
  InformationCircleIcon,
  InstagramIcon,
  LanguageSkillIcon,
  Leaf01Icon,
  Location01Icon,
  Mail01Icon,
  Maximize01Icon,
  Menu01Icon,
  Message01Icon,
  MortarboardIcon,
  MusicNote01Icon,
  PaintBoardIcon,
  PauseIcon,
  PlayIcon,
  QuoteDownIcon,
  SecurityCheckIcon,
  StudentsIcon,
  Target02Icon,
  Tick02Icon,
  Wallet01Icon,
  WhatsappIcon,
} from '@hugeicons/core-free-icons'
import { HugeiconsIcon, type HugeiconsIconProps, type IconSvgElement } from '@hugeicons/react'

/**
 * All icons come from Hugeicons (https://hugeicons.com, free stroke-rounded set).
 * Size them with Tailwind classes (e.g. "h-5 w-5"); colour follows currentColor.
 * To change an icon, swap the Hugeicons import below — names are searchable on hugeicons.com.
 */
export type IconProps = Omit<HugeiconsIconProps, 'icon'>
export type IconComponent = (props: IconProps) => JSX.Element

const icon = (svg: IconSvgElement): IconComponent => {
  const Icon = (props: IconProps) => <HugeiconsIcon icon={svg} strokeWidth={1.8} aria-hidden="true" {...props} />
  return Icon
}

// Interface
export const ArrowRight = icon(ArrowRight02Icon)
export const ArrowUp = icon(ArrowUp02Icon)
export const ChevronLeft = icon(ArrowLeft01Icon)
export const ChevronRight = icon(ArrowRight01Icon)
export const Close = icon(Cancel01Icon)
export const Menu = icon(Menu01Icon)
export const Expand = icon(Maximize01Icon)
export const ImageOff = icon(ImageNotFound01Icon)
export const Pause = icon(PauseIcon)
export const Play = icon(PlayIcon)
export const Quote = icon(QuoteDownIcon)
export const Download = icon(Download04Icon)
export const Check = icon(Tick02Icon)
export const CheckCircle = icon(CheckmarkCircle02Icon)
export const AlertCircle = icon(AlertCircleIcon)
export const Info = icon(InformationCircleIcon)
export const BadgeCheck = icon(CheckmarkBadge01Icon)

// Contact & social
export const Phone = icon(CallIcon)
export const Mail = icon(Mail01Icon)
export const MapPin = icon(Location01Icon)
export const Clock = icon(Clock01Icon)
export const Message = icon(Message01Icon)
export const WhatsApp = icon(WhatsappIcon)
export const Instagram = icon(InstagramIcon)

// Content
export const Briefcase = icon(Briefcase01Icon)
export const Calendar = icon(Calendar03Icon)
export const FileText = icon(File01Icon)
export const Wallet = icon(Wallet01Icon)
export const Target = icon(Target02Icon)
export const Compass = icon(Compass01Icon)
export const Students = icon(StudentsIcon)
export const HandHeart = icon(HandHeartIcon)
export const Backpack = icon(Backpack01Icon)
export const Mortarboard = icon(MortarboardIcon)
export const Shield = icon(SecurityCheckIcon)
export const Book = icon(BookOpen01Icon)
export const Heart = icon(FavouriteIcon)
export const Award = icon(Award01Icon)
export const Handshake = icon(HandshakeIcon)
export const Music = icon(MusicNote01Icon)
export const Palette = icon(PaintBoardIcon)
export const Computer = icon(ComputerIcon)
export const Football = icon(FootballIcon)
export const Leaf = icon(Leaf01Icon)
export const Language = icon(LanguageSkillIcon)
