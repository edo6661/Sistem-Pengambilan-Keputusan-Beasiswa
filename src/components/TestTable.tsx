"use client"

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  VisibilityState,
} from "@tanstack/react-table"
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "./ui/button"
import { useState } from "react"
import { Input } from "./ui/input"
import { DataTablePagination } from "./TestPagination"
import { DataTableViewOptions } from "./Hideable"
import { FileText, Download } from "lucide-react"
import { exportFilteredToPDF, exportToPDF } from "@/utils/exportToPdf"

export type BeasiswaData = {
  id: string;
  nim: string;
  ipk: number;
  prestasi: number;
  jurusan: string;
  verifikasi: string;
  user: {
    namaLengkap: string;
    id: string;
  };
};

interface TestTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[]
  data: TData[]
}

export function TestTable<TData, TValue>({
  columns,
  data,
}: TestTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
  const [rowSelection, setRowSelection] = useState({})

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  })

  // Fungsi untuk handle export PDF
  const handleExportPDF = (filter: 'all' | 'lulus' | 'tidak_lulus' | 'diproses' = 'all') => {
    try {
      // Cast data ke tipe yang sesuai
      const beasiswaData = data as unknown as BeasiswaData[];
      exportFilteredToPDF(beasiswaData, filter);
    } catch (error) {
      console.error('Error exporting PDF:', error);
      alert('Terjadi kesalahan saat mengexport PDF');
    }
  }

  // Fungsi untuk export data yang sedang ditampilkan (filtered)
  const handleExportCurrentView = () => {
    try {
      const currentData = table.getFilteredRowModel().rows.map(row => row.original);
      const beasiswaData = currentData as unknown as BeasiswaData[];
      exportToPDF(beasiswaData, "Data Mahasiswa Beasiswa - Data Saat Ini");
    } catch (error) {
      console.error('Error exporting current view PDF:', error);
      alert('Terjadi kesalahan saat mengexport PDF');
    }
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filter NIM..."
          value={(table.getColumn("nim")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nim")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DataTableViewOptions table={table} />

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                )
              })}
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Dropdown untuk Print PDF */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="gap-2">
              <FileText size={16} />
              Export PDF
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48">
            <DropdownMenuItem onClick={() => handleExportPDF('all')}>
              <Download size={16} className="mr-2" />
              Semua Data
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExportPDF('lulus')}>
              <Download size={16} className="mr-2" />
              Mahasiswa Lulus
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExportPDF('tidak_lulus')}>
              <Download size={16} className="mr-2" />
              Mahasiswa Tidak Lulus
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleExportPDF('diproses')}>
              <Download size={16} className="mr-2" />
              Sedang Diproses
            </DropdownMenuItem>
            <DropdownMenuItem onClick={handleExportCurrentView}>
              <Download size={16} className="mr-2" />
              Data Saat Ini
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                    </TableHead>
                  )
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  )
}