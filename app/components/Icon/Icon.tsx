import * as IoIcons from "react-icons/io5";
import * as FaIcons from "react-icons/fa";
import * as CiIcons from "react-icons/ci";
import * as MdIcons from "react-icons/md";
import { IconType } from "react-icons";

type DynamicIconProps = {
  name: string;
  size?: number;
  color?: string;
  className?: string;
};

const iconPacks: Record<string, Record<string, IconType>> = {
  Io: IoIcons,
  Fa: FaIcons,
  Ci: CiIcons,
  Md: MdIcons,
};

export const Icon = ({
  name,
  size = 12,

  className,
}: DynamicIconProps) => {
  const prefix = name.slice(0, 2);
  const iconName = name;

  const IconComponent = iconPacks[prefix]?.[iconName];

  if (!IconComponent) {
    console.warn(`Ikona ${iconName} s prefixem ${prefix} nebyla nalezena.`);
    return null;
  }

  return <IconComponent size={size} className={className} />;
};
