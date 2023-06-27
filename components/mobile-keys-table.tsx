import { ApiKey } from "@prisma/client"

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { KeyComponent } from "@/components/keys-table"

interface MobileKeysTableProps {
  data: ApiKey[]
}

export function MobileKeysTable({ data }: MobileKeysTableProps) {
  return (
    <div className="pt-5 sm:hidden">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Name</TableHead>
            <TableHead>Enabled</TableHead>
            <TableHead>Key</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((apiKey) => (
            <TableRow key={apiKey.id}>
              <TableCell className="font-medium">{apiKey.name}</TableCell>
              <TableCell>{apiKey.enabled ? "True" : "False"}</TableCell>
              <TableCell>
                <KeyComponent keyString={apiKey.key} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
