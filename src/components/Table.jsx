import {
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
  } from "@tanstack/react-table";
  import { useState } from "react";
  import DebouncedInput from "./DebouncedInput";
  
  const TanStackTable = ({ messages }) => {
    const columnHelper = createColumnHelper();
  
    const columns = [
        columnHelper.accessor((row, index) => index + 1, {
            id: 'slNo',  // A unique ID for this accessor
            header: 'SL No.',
            cell: (info) => <span>{info.row.index + 1}</span>,  // Displaying the index + 1
          }),
      columnHelper.accessor('id', {
        cell: (info) => <span>{info.getValue()}</span>,
        header: 'ID',
      }),
      columnHelper.accessor('message', {
        cell: (info) => <span>{info.getValue()}</span>,
        header: 'Message',
      }),
      columnHelper.accessor('premium_attached', {
        cell: (info) => {
          const value = info.getValue();
          return <span>{value || "None"}</span>; // Display "None" if value is falsy
        },
        header: 'Premium Attached',
      }),
    ];
  
    const [globalFilter, setGlobalFilter] = useState("");
  
    const table = useReactTable({
      data: messages, // Directly pass messages as data
      columns,
      state: {
        globalFilter,
      },
      getFilteredRowModel: getFilteredRowModel(),
      getCoreRowModel: getCoreRowModel(),
      getPaginationRowModel: getPaginationRowModel(),
    });
  
    return (
      <div className="p-2 max-w-5xl mx-auto text-white fill-gray-400 shadow-md">
        <div className="flex justify-between mb-2">
          <div className="w-full flex items-center gap-1">
          <DebouncedInput
            value={globalFilter ?? ""}
            onChange={(value) => setGlobalFilter(String(value))}
            className="p-2 bg-transparent outline-none border-b-2 w-1/5 focus:w-1/3 duration-300 border-indigo-500 text-black"
            placeholder="Search all columns..."
          />
            {/* You can add a global filter input or other controls here */}
          </div>
        </div>
        <table className="border border-gray-700 w-full text-left">
          <thead className="bg-indigo-600">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id} className="capitalize px-3.5 py-2">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row, i) => (
                <tr
                  key={row.id}
                  className={`${i % 2 === 0 ? "bg-gray-900" : "bg-gray-800"}`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-3.5 py-2">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="text-center h-32">
                <td colSpan={12}>No Records Found!</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    );
  };
  
  export default TanStackTable;
  