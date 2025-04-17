import * as IoIcons from "react-icons/io5";
import * as FaIcons from "react-icons/fa";
import * as CiIcons from "react-icons/ci";
import * as MdIcons from "react-icons/md";
import * as HiIcons from "react-icons/hi";
import { IconType } from "react-icons";

type IconProps = {
  name: string;
  size?: number;
  className?: string;
  color?: "light" | "dark" | "component";
};

const iconPacks: Record<string, Record<string, IconType>> = {
  Io: IoIcons,
  Fa: FaIcons,
  Ci: CiIcons,
  Md: MdIcons,
  Hi: HiIcons,
};

export const Icon = ({ name, size = 12, className, color }: IconProps) => {
  const prefix = name.slice(0, 2);
  const iconName = name;

  const IconComponent = iconPacks[prefix]?.[iconName];

  if (!IconComponent) {
    console.warn(`Ikona ${iconName} s prefixem ${prefix} nebyla nalezena.`);
    return null;
  }

  let resolvedColor: string | undefined;
  if (color === "light") {
    resolvedColor = "#fff";
  } else if (color === "dark") {
    resolvedColor = "#000";
  } else if (color === "component") {
    resolvedColor = "#f5e43e";
  } else {
    resolvedColor = undefined;
  }

  return (
    <IconComponent size={size} className={className} color={resolvedColor} />
  );
};
