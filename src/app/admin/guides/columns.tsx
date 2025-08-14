"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { MoreVertical } from "lucide-react";
import { formatDate } from "@/_utils/utils";
import { Button } from "@/components/ui/Button";
import { useState, useEffect, useRef } from "react";

export const columns = (onDelete: (id: string) => void): ColumnDef<any>[] => [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    header: "Actions",
    id: "actions",
    cell: ({ row }) => {
      const [showModal, setShowModal] = useState(false);
      const modalRef = useRef<HTMLDivElement | null>(null);
      const guide = row.original;

      // Close modal when clicking outside
      useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
          if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
            setShowModal(false);
          }
        }
        if (showModal) {
          document.addEventListener("mousedown", handleClickOutside);
        }
        return () => {
          document.removeEventListener("mousedown", handleClickOutside);
        };
      }, [showModal]);

      return (
        <div className="flex items-center space-x-2 relative">
          {showModal && (
            <div
              ref={modalRef}
              className="flex flex-col gap-2 absolute left-[-5rem] top-5 w-[200px] bg-white shadow-lg p-4 rounded-md z-10"
            >
              <Link href={`/admin/guides/${guide.id}`}>
                <p className="cursor-pointer hover:underline">View</p>
              </Link>
              <Link href={`/admin/guides/${guide.id}/edit`}>
                <p className="cursor-pointer hover:underline">Edit</p>
              </Link>
              <Button
                size="sm"
                onClick={() => {
                  setShowModal(false);
                  onDelete(guide.id);
                }}
                className="bg-inherit hover:bg-inherit text-red-500 "
              >
                Delete
              </Button>
            </div>
          )}
          <MoreVertical
            className="h-4 w-4 cursor-pointer"
            onClick={() => setShowModal(!showModal)}
          />
        </div>
      );
    },
  },
];
