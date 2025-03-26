"use client"
import { Column } from "@tanstack/react-table"
import { ArrowDown, ArrowUp, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"

interface DataTableStatusColumnHeaderProps<TData, TValue>
  extends React.HTMLAttributes<HTMLDivElement> {
  column: Column<TData, TValue>
  title: string
}

export function HeaderTableFilterStatus<TData, TValue>({
  column,
  title,
  className,
}: DataTableStatusColumnHeaderProps<TData, TValue>) {
  return (
    <div className={cn("flex items-center space-x-2", className)}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            size="sm"
            className="-ml-3 h-8 data-[state=open]:bg-accent"
          >
            <span>{title}</span>
            {column.getIsSorted() === "desc" ? (
              <ArrowDown />
            ) : column.getIsSorted() === "asc" ? (
              <ArrowUp />
            ) : (
              <ChevronsUpDown />
            )}
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="start">
          {/* Sorting Options */}
          <DropdownMenuItem onClick={() => column.toggleSorting(false)}>
            <ArrowUp className="h-3.5 w-3.5 text-muted-foreground/70" />
            Asc
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => column.toggleSorting(true)}>
            <ArrowDown className="h-3.5 w-3.5 text-muted-foreground/70" />
            Desc
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          {/* Filter Options untuk status */}
          <DropdownMenuCheckboxItem
            checked={column.getFilterValue() === "pending"}
            onCheckedChange={(checked) =>
              column.setFilterValue(checked ? "pending" : undefined)
            }
          >
            Pending
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={column.getFilterValue() === "processing"}
            onCheckedChange={(checked) =>
              column.setFilterValue(checked ? "processing" : undefined)
            }
          >
            Processing
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={column.getFilterValue() === "success"}
            onCheckedChange={(checked) =>
              column.setFilterValue(checked ? "success" : undefined)
            }
          >
            Success
          </DropdownMenuCheckboxItem>
          <DropdownMenuCheckboxItem
            checked={column.getFilterValue() === "failed"}
            onCheckedChange={(checked) =>
              column.setFilterValue(checked ? "failed" : undefined)
            }
          >
            Failed
          </DropdownMenuCheckboxItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
