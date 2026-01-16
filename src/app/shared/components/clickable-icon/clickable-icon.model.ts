export interface ClickableIconData {
  button: ClickableIconCta
  icon: ClickableIcon
}

interface ClickableIcon {
  name: string
  ariaLabel: string
}

interface ClickableIconCta {
  title: string
  ariaLabel: string
}
