// "use client";

// import {
//   flexRender,
//   getCoreRowModel,
//   useReactTable,
//   type ColumnDef,
//   type ColumnFiltersState,
//   type SortingState,
//   getSortedRowModel,
//   getFilteredRowModel,
//   getPaginationRowModel,
// } from "@tanstack/react-table";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { useState } from "react";
// import { Button } from "@/components/ui/Button";
// import { ChevronLeft, ChevronRight } from "lucide-react";
// import { Skeleton } from "@/components/ui/skeleton";
// import { Input } from "@/components/ui/components/input";

// interface DataTableProps<TData, TValue> {
//   columns: ColumnDef<TData, TValue>[];
//   data: TData[];
//   isLoading?: boolean;
//   filterColumn?: string;
//   filterPlaceholder?: string;
//   onRowClick?: (row: TData) => void;
// }

// export function DataTable<TData, TValue>({
//   columns,
//   data,
//   isLoading,
//   filterColumn,
//   filterPlaceholder = "Filter records...",
//   onRowClick, 
// }: DataTableProps<TData, TValue>) {
//   const [sorting, setSorting] = useState<SortingState>([]);
//   const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

//   const table = useReactTable({
//     data,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     onSortingChange: setSorting,
//     getSortedRowModel: getSortedRowModel(),
//     onColumnFiltersChange: setColumnFilters,
//     getFilteredRowModel: getFilteredRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     state: {
//       sorting,
//       columnFilters,
//     },
//   });

//   return (
//     <div className="space-y-4">
//       {/* Only show filter input if filterColumn is provided and exists */}
//       {filterColumn && table.getColumn(filterColumn) && (
//         <div className="flex items-center justify-between">
//           <Input
//             placeholder={filterPlaceholder}
//             value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
//             onChange={(event: { target: { value: any; }; }) =>
//               table.getColumn(filterColumn)?.setFilterValue(event.target.value)
//             }
//             className="max-w-sm"
//           />
//         </div>
//       )}

//       <div className="rounded-md border">
//         <Table className="w-full border-collapse">
//           {/* Header */}
//           <TableHeader className="bg-gray-100">
//             {table.getHeaderGroups().map((headerGroup) => (
//               <TableRow key={headerGroup.id}>
//                 {headerGroup.headers.map((header, index) => (
//                   <TableHead
//                     key={header.id}
//                     className={`text-center border-r border-gray-300 ${
//                       index === headerGroup.headers.length - 1 ? "border-r-0" : ""
//                     }`}
//                   >
//                     {header.isPlaceholder
//                       ? null
//                       : flexRender(
//                           header.column.columnDef.header,
//                           header.getContext()
//                         )}
//                   </TableHead>
//                 ))}
//               </TableRow>
//             ))}
//           </TableHeader>

//           {/* Body */}
//           <TableBody>
//             {isLoading ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   <div className="space-y-2">
//                     {[...Array(5)].map((_, i) => (
//                       <Skeleton key={i} className="h-10 w-full" />
//                     ))}
//                   </div>
//                 </TableCell>
//               </TableRow>
//             ) : table.getRowModel().rows?.length ? (
//               table.getRowModel().rows.map((row) => (
//                 <TableRow
//                   key={row.id}
//                   data-state={row.getIsSelected() && "selected"}
//                   onClick={() => onRowClick?.(row.original)} // Added onClick handler
//                   className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""} // Added cursor and hover styles when clickable
//                 >
//                   {row.getVisibleCells().map((cell, index) => (
//                     <TableCell
//                       key={cell.id}
//                       className={`text-center border-r border-gray-300 ${
//                         index === row.getVisibleCells().length - 1
//                           ? "border-r-0"
//                           : ""
//                       }`}
//                     >
//                       {flexRender(
//                         cell.column.columnDef.cell,
//                         cell.getContext()
//                       )}
//                     </TableCell>
//                   ))}
//                 </TableRow>
//               ))
//             ) : (
//               <TableRow>
//                 <TableCell
//                   colSpan={columns.length}
//                   className="h-24 text-center"
//                 >
//                   No results.
//                 </TableCell>
//               </TableRow>
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       <div className="flex items-center justify-end space-x-2">
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.previousPage()}
//           disabled={!table.getCanPreviousPage()}
//         >
//           <ChevronLeft className="h-4 w-4" />
//         </Button>
//         <Button
//           variant="outline"
//           size="sm"
//           onClick={() => table.nextPage()}
//           disabled={!table.getCanNextPage()}
//         >
//           <ChevronRight className="h-4 w-4" />
//         </Button>
//       </div>
//     </div>
//   );
// }






"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  getSortedRowModel,
  getFilteredRowModel,
} from "@tanstack/react-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { Input } from "@/components/ui/components/input";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
  filterColumn?: string;
  filterPlaceholder?: string;
  onRowClick?: (row: TData) => void;
  // Add pagination props
  pagination?: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  onPageChange?: (page: number) => void;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  isLoading,
  filterColumn,
  filterPlaceholder = "Filter records...",
  onRowClick,
  pagination,
  onPageChange,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    // Remove getPaginationRowModel for server-side pagination
    manualPagination: true,
    pageCount: pagination?.totalPages ?? -1,
    state: {
      sorting,
      columnFilters,
    },
  });

  const handlePreviousPage = () => {
    if (pagination && onPageChange && pagination.page > 1) {
      onPageChange(pagination.page - 1);
    }
  };

  const handleNextPage = () => {
    if (pagination && onPageChange && pagination.page < pagination.totalPages) {
      onPageChange(pagination.page + 1);
    }
  };

  const canPreviousPage = pagination ? pagination.page > 1 : false;
  const canNextPage = pagination ? pagination.page < pagination.totalPages : false;

  return (
    <div className="space-y-4">
      {/* Only show filter input if filterColumn is provided and exists */}
      {filterColumn && table.getColumn(filterColumn) && (
        <div className="flex items-center justify-between">
          <Input
            placeholder={filterPlaceholder}
            value={(table.getColumn(filterColumn)?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn(filterColumn)?.setFilterValue(event.target.value)
            }
            className="max-w-sm"
          />
        </div>
      )}

      <div className="rounded-md border">
        <Table className="w-full border-collapse">
          {/* Header */}
          <TableHeader className="bg-gray-100">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header, index) => (
                  <TableHead
                    key={header.id}
                    className={`text-center border-r border-gray-300 ${
                      index === headerGroup.headers.length - 1 ? "border-r-0" : ""
                    }`}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          {/* Body */}
          <TableBody>
            {isLoading ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  <div className="space-y-2">
                    {[...Array(5)].map((_, i) => (
                      <Skeleton key={i} className="h-10 w-full" />
                    ))}
                  </div>
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  onClick={() => onRowClick?.(row.original)}
                  className={onRowClick ? "cursor-pointer hover:bg-muted/50" : ""}
                >
                  {row.getVisibleCells().map((cell, index) => (
                    <TableCell
                      key={cell.id}
                      className={`text-center border-r border-gray-300 ${
                        index === row.getVisibleCells().length - 1
                          ? "border-r-0"
                          : ""
                      }`}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Updated pagination controls */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {pagination && (
            <>
              Showing page {pagination.page} of {pagination.totalPages} 
              ({pagination.total} total records)
            </>
          )}
        </div>
        <div className="flex items-center justify-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePreviousPage}
            disabled={!canPreviousPage}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNextPage}
            disabled={!canNextPage}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}