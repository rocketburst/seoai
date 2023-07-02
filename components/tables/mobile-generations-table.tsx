"use client"

import { Generation } from "@prisma/client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

interface MobileGenerationsTableProps {
  data: Generation[]
}

export function MobileGenerationsTable({ data }: MobileGenerationsTableProps) {
  return (
    <div className="pt-5 sm:hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead className="w-[100px]">Content</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((gen) => (
            <TableRow key={gen.id}>
              <TableCell className="font-medium">{gen.type}</TableCell>
              <TableCell>{`${gen.content.substring(0, 25)}...`}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
