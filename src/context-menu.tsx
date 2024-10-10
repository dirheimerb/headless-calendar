import * as PrimitiveContextMenu from "@radix-ui/react-context-menu";
import './context-menu.css';

export interface ContextMenuProps {
    children: React.ReactNode;
    trigger?: React.ReactNode;
    triggerStyle?: React.CSSProperties;
    triggerClassName?: string;
    onOpenChange?: (open: boolean) => void
    contentMenuStyle?: React.CSSProperties;
}
/**
 * 
 * @param param0 
 * @returns 
 * --radix-context-menu-content-transform-origin	The transform-origin computed from the content and arrow positions/offsets
 * --radix-context-menu-content-available-width	The remaining width between the trigger and the boundary edge
 * --radix-context-menu-content-available-height	The remaining height between the trigger and the boundary edge
 * --radix-context-menu-trigger-width	The width of the trigger
 * --radix-context-menu-trigger-height
 * [data-state]	"open" | "closed"
 * [data-side]	"left" | "right" | "bottom" | "top"
 * [data-align]	"start" | "end" | "center"
 */
export default function ContextMenu({ trigger, contentMenuStyle }: ContextMenuProps) {
    return (
        <PrimitiveContextMenu.Root>
		<PrimitiveContextMenu.Trigger>
            {trigger}
        </PrimitiveContextMenu.Trigger>
		<PrimitiveContextMenu.Portal>
        <PrimitiveContextMenu.Content
                className="min-w-[220px] overflow-hidden rounded-md bg-white p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
                style={contentMenuStyle}>
				<PrimitiveContextMenu.Item className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1">
						Back{" "}
						<div className="ml-auto pl-5 text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
							⌘+[
						</div>
					</PrimitiveContextMenu.Item>
					<PrimitiveContextMenu.Item
						className="group relative flex h-[25px] select-none items-center rounded-[3px] pl-[25px] pr-[5px] text-[13px] leading-none text-violet11 outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-violet9 data-[disabled]:text-mauve8 data-[highlighted]:text-violet1"
						disabled
					>
						Forward{" "}
						<div className="ml-auto pl-5 text-mauve11 group-data-[disabled]:text-mauve8 group-data-[highlighted]:text-white">
							⌘+]
						</div>
					</PrimitiveContextMenu.Item>
			</PrimitiveContextMenu.Content>
		</PrimitiveContextMenu.Portal>
	</PrimitiveContextMenu.Root>
    )
}

export const ContextMenuItem = PrimitiveContextMenu.Item;
export const ContextMenuArrow = PrimitiveContextMenu.Arrow;
export const ContextMenuCheckboxItem = PrimitiveContextMenu.CheckboxItem;
export const ContextMenuLabel = PrimitiveContextMenu.ContextMenuLabel;
export const ContextMenuGroup = PrimitiveContextMenu.Group
export const ContextMenuSub = PrimitiveContextMenu.Sub
export const ContextMenuSeparator = PrimitiveContextMenu.Separator

// Submenu
/*
<ContextMenu.Sub>
<ContextMenu.SubTrigger>Sub menu →</ContextMenu.SubTrigger>
<ContextMenu.Portal>
<ContextMenu.SubContent>
<ContextMenu.Item>Sub menu item</ContextMenu.Item>
<ContextMenu.Item>Sub menu item</ContextMenu.Item>
<ContextMenu.Arrow />
</ContextMenu.SubContent>
</ContextMenu.Portal>
</ContextMenu.Sub>
*/