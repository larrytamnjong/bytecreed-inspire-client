import { PermissionActionEnum } from "src/app/core/enums/permission-action-enum";

export interface MenuItem {
  id?: number;
  label?: any;
  icon?: string;
  isCollapsed?: any;
  link?: string;
  subItems?: any;
  isTitle?: boolean;
  badge?: any;
  parentId?: number;
  isLayout?: boolean;
  permission?: PermissionActionEnum;
}