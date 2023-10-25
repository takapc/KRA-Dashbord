import { BoxProps, FlexProps } from "@chakra-ui/react";
import { ReactNode, ReactText } from "react";
import { IconType } from "react-icons";

export interface LinkItemProps {
  name: string;
  icon: IconType;
  path: string;
}

export interface NavItemProps extends FlexProps {
  icon: IconType;
  children: ReactNode;
  path: string;
}

export interface ManagerSidebarProps {
  children: ReactNode;
}

export interface SidebarProps extends BoxProps {
  onClose: () => void;
}
