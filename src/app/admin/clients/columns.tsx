// "use client";

// import { ColumnDef } from "@tanstack/react-table";
// import Link from "next/link";
// import {Eye, Trash2 } from "lucide-react";
// import { formatDate } from "@/_utils/utils";
// import { Button } from "@/components/ui/Button";

// export const columns: ColumnDef<{id: any}>[] = [
//   {
//     accessorKey: "name",
//     header: "Name",
//   },
//   {
//     accessorKey: "email",
//     header: "Email",
//   },
//   {
//     accessorKey: "phone",
//     header: "Phone",
//   },
//   {
//     accessorKey: "isVerified",
//     header: "Verified",
//     cell: ({ row }) => (
//       <div className="flex items-center justify-center">
//       {/* <Check
//         className={`${row.getValue("isVerified") ? "text-green-500" : "text-red-500"} justify-center`}
//       /> */}
//       <span>{row.getValue("isVerified") ? "Yes" : "No"}</span>
//     </div>
//     ),
//   },
//   {
//     accessorKey: "createdAt",
//     header: "Joined",
//     cell: ({ row }) => formatDate(row.getValue("createdAt")),
//   },
//   {
//     id: "actions",
//     cell: ({ row }) => {
//       const client = row.original;
//       return (
//         <div className="flex space-x-2">
//           <Link href={`/admin/clients/${client.id}`}>
//             <Button variant="outline" size="sm" className="bg-white cursor-pointer">
//               <Eye className="h-4 w-4" />
//             </Button>
//           </Link>
//           <Button  
//           size="sm" className="bg-white text-red-500 cursor-pointer hover:bg-red-100" 
//           onClick={() => console.log("Delete client", client.id)}  >
//             <Trash2 className="h-4 w-4" />
//           </Button>
//         </div>
//       );
//     },
//   },
// ];

"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { Eye, Trash2, X } from "lucide-react";
import { formatDate } from "@/_utils/utils";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";

export const columns: ColumnDef<{id: any}>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "phone",
    header: "Phone",
  },
  {
    accessorKey: "isVerified",
    header: "Verified",
    cell: ({ row }) => (
      <div className="flex items-center justify-center">
        <span>{row.getValue("isVerified") ? "Yes" : "No"}</span>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Joined",
    cell: ({ row }) => formatDate(row.getValue("createdAt")),
  },
  {
    id: "actions",
    cell: ({ row }) => {
      const client = row.original;
      const [showModal, setShowModal] = useState(false);
      
      useEffect(() => {
        let timer: NodeJS.Timeout;
        if (showModal) {
          timer = setTimeout(() => {
            setShowModal(false);
          }, 3000);
        }
        return () => clearTimeout(timer);
      }, [showModal]);

      const handleTrashClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setShowModal(true);
      };

      return (
        <>
          <div className="flex space-x-2 items-center justify-center">
            <Link href={`/admin/clients/${client.id}`}>
              <Button variant="outline" size="sm" className="bg-white cursor-pointer">
                <Eye className="h-4 w-4" />
              </Button>
            </Link>
            <Button  
              size="sm" 
              className="bg-white text-red-500 cursor-pointer hover:bg-red-100" 
              onClick={handleTrashClick}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
          
          {showModal && (
            <div className="fixed inset-0 bg-opacity-10  bg-black/10 bg-opacity-30 backdrop-blur-sm flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200 max-w-sm mx-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Notice</h3>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setShowModal(false)}
                    className="bg-white"
                  >
                    <X className="h-4 w-4 text-red-600 " />
                  </Button>
                </div>
                <p className="text-gray-700 mb-4">This functionality is not available for now</p>
                <div className="flex justify-end">
                  <Button
                    onClick={() => setShowModal(false)}
                    className="px-4 py-2 w-full text-center bg-[#efc22e] text-white rounded-xl "
                  >
                    OK
                  </Button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    },
  },
];