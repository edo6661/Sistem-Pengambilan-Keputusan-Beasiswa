/* eslint-disable react-hooks/rules-of-hooks */
"use client"
import { ColumnDef } from "@tanstack/react-table"
import { MoreHorizontal } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import { DataTableColumnHeader } from "./SortableHideable"
import { HeaderTableFilterStatus } from "./HeaderTableFilterStatus"
import { Beasiswa, Verifikasi } from "@prisma/client"
import Image from "next/image"
import Modal from "./shared/Modal"
import { useState } from "react"
import { toastSonner } from "./utils/toast_sonner"
import { updateVerifikasi } from "@/actions/beasiswa.action"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import PrestasiImagesSlider from "./shared/PrestasiImagesSlider"

export const columns: ColumnDef<Beasiswa & {
  user: {
    namaLengkap: string
    id: string
  }
}>[] = [
    {
      id: "nama",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Nama" />
      ),
      cell: ({ row }) => {
        return <div>{row.original.user?.namaLengkap}</div>
      },
    },
    {
      accessorKey: "nim",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="NIM" />
      ),
      cell: ({ row }) => <div>{row.getValue("nim")}</div>,
    },
    {
      accessorKey: "ipk",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="IPK" />
      ),
      cell: ({ row }) => <div>{row.getValue("ipk")}</div>,
    },
    {
      accessorKey: "prestasi",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Prestasi" />
      ),
      cell: ({ row }) => <div>{row.getValue("prestasi")}</div>,
    },
    {
      accessorKey: "jurusan",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Jurusan" />
      ),
      cell: ({ row }) => <div>{row.getValue("jurusan")}</div>,
    },
    {
      accessorKey: "verifikasi",
      header: ({ column }) => (
        <HeaderTableFilterStatus column={column} title="Verifikasi" />
      ),
      cell: ({ row }) => {
        const [isEditing, setIsEditing] = useState(false);
        const [status, setStatus] = useState(row.getValue("verifikasi") as Verifikasi);
        const beasiswa = row.original;

        const handleUpdate = async (newStatus: Verifikasi) => {
          setStatus(newStatus);
          const result = await updateVerifikasi(
            beasiswa.id,
            newStatus

          );
          if (result.isSuccess) {
            toastSonner({ isSuccess: true, message: "Verifikasi updated" });
          } else {
            toastSonner({ isSuccess: false, message: "Failed update" });
            setStatus(row.getValue("verifikasi"));
          }
          setIsEditing(false);
        };

        if (isEditing) {
          return (
            <Select
              onValueChange={(value) => handleUpdate(value as Verifikasi)}
              defaultValue={status}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={Verifikasi.DIPROSES}>
                  {Verifikasi.DIPROSES}
                </SelectItem>
                <SelectItem value={Verifikasi.BERHASIL}>
                  {Verifikasi.BERHASIL}
                </SelectItem>
                <SelectItem value={Verifikasi.GAGAL}>
                  {Verifikasi.GAGAL}
                </SelectItem>
              </SelectContent>
            </Select>
          );
        }

        return (
          <div onClick={() => setIsEditing(true)} className="cursor-pointer">
            <Badge
              variant={
                status === "DIPROSES"
                  ? "warning"
                  : status === "BERHASIL"
                    ? "success"
                    : "destructive"
              }
            >
              {status}
            </Badge>
          </div>
        );
      },
    }
    ,
    {
      accessorKey: "penghasilanOrangTua",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Penghasilan Orang Tua"
        />
      ),
      cell: ({ row }) => {
        const penghasilan = row.getValue("penghasilanOrangTua") as number
        const formatted = new Intl.NumberFormat("id-ID", {
          style: "currency",
          currency: "IDR",
        }).format(penghasilan)
        return <div>{formatted}</div>
      },
    },
    {
      accessorKey: "prestasiImages",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Prestasi" />
      ),
      cell: ({ row }) => {
        const images = row.getValue("prestasiImages") as string[]
        const [isOpen, setIsOpen] = useState(false)
        const onChangeIsOpen = (isOpen: boolean) => {
          setIsOpen(isOpen)
        }
        return (images.length > 0 && images[0]) && (
          <PrestasiImagesSlider images={images} isOpen={isOpen} onChangeIsOpen={onChangeIsOpen} />
        )
      },
    },
    {
      accessorKey: "transkripImage",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Transkrip" />
      ),
      cell: ({ row }) => {
        const image = row.getValue("transkripImage") as string
        const [isOpen, setIsOpen] = useState(false)
        const onChangeIsOpen = (isOpen: boolean) => {
          setIsOpen(isOpen)
        }
        return image && (
          <div>
            <Modal
              isOpen={isOpen}
              onChangeIsOpen={onChangeIsOpen}
              trigger={
                <Image src={image} width={100} height={100} alt="Transkrip"
                  className="rounded-md cursor-pointer hover:opacity-80 transition-opacity aspect-video object-cover"

                />
              }
              title="Transkrip Image"
              description="Transkrip Image description"
            >
              <Image src={image} width={500} height={500} alt=""
                className="rounded-md"

              />
            </Modal>
          </div >
        )
      },
    },

    {
      id: "actions",
      cell: ({ row }) => {
        const beasiswa = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => {
                  navigator.clipboard.writeText(beasiswa.id)
                  toastSonner({
                    isSuccess: true,
                    message: "NIM copied",
                  })
                }}
              >
                Copy NIM
              </DropdownMenuItem>
              {/* <DropdownMenuSeparator /> */}
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]
