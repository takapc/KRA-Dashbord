"use client";

import { KraApiClient } from "@/api/KraApiClient";
import { KraUser } from "@/api/types";
import {
    Box,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    Table,
    TableContainer,
    Tbody,
    Td,
    Th,
    Thead,
    Tr,
} from "@chakra-ui/react";
import {
    ColumnDef,
    createColumnHelper,
    flexRender,
    getCoreRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { useEffect, useState } from "react";

const Users = () => {
    const [apiLoading, setApiLoading] = useState(true);
    const [users, setUsers] = useState<KraUser[]>([]);
    const client = new KraApiClient();

    useEffect(() => {
        client.getUsers().then((res) => {
            setUsers(res);
            setApiLoading(false);
            console.log(res);
        });
    }, []);

    const columnHelper = createColumnHelper<KraUser>();

    const columns: ColumnDef<KraUser, any>[] = [
        columnHelper.accessor("user_id", {
            cell: (info) => info.getValue(),
            header: "ID",
        }),
        columnHelper.accessor("name", {
            cell: (info) => info.getValue(),
            header: "NAME",
        }),
        columnHelper.accessor("pc", {
            cell: (info) => info.getValue(),
            header: "PC",
        }),
    ];

    const table = useReactTable({
        data: users,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    if (apiLoading) return <p>Loading...</p>;
    return (
        <>
            <Breadcrumb>
                <BreadcrumbItem>
                    <BreadcrumbLink>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbItem>
                    <BreadcrumbLink>Users</BreadcrumbLink>
                </BreadcrumbItem>
            </Breadcrumb>
            <Box w="full" p={10}>
                <TableContainer>
                    <Table>
                        <Thead bg="gray.400">
                            {table.getHeaderGroups().map((headerGroup) => (
                                <Tr key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <Th key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(
                                                      header.column.columnDef
                                                          .header,
                                                      header.getContext()
                                                  )}
                                        </Th>
                                    ))}
                                </Tr>
                            ))}
                        </Thead>
                        <Tbody bg="gray.300">
                            {table.getRowModel().rows.map((row) => (
                                <Tr key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <Td key={cell.id}>
                                            {flexRender(
                                                cell.column.columnDef.cell,
                                                cell.getContext()
                                            )}
                                        </Td>
                                    ))}
                                </Tr>
                            ))}
                        </Tbody>
                    </Table>
                </TableContainer>
            </Box>
        </>
    );
};
export default Users;
