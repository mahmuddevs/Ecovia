"use client"
import { useEffect, useState, ChangeEvent } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { FaTrash } from "react-icons/fa6";
import Swal from "sweetalert2";
import { deleteUser, handleUpdateUserType, getAllUsers } from "@/actions/users/UserActions";
import { User } from "./UsersTable";
import Pagination from "@/components/Pagination";
import Spinner from "@/components/Spinner";

const UsersTableBody = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const usersPerPage = 12;

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [totalPages, setTotalPages] = useState(1);

    const currentPage = parseInt(searchParams.get("page") || "1", 10);

    const fetchUsers = async (page: number) => {
        try {
            setLoading(true);
            const { success, users: fetchedUsers, totalPages: serverTotalPages } = await getAllUsers(page, usersPerPage);

            if (!success) {
                setUsers([]);
                setTotalPages(1);
                return;
            }

            setUsers(fetchedUsers);
            setTotalPages(serverTotalPages || 1);
        } catch (err) {
            console.error("Error fetching users:", err);
            setUsers([]);
            setTotalPages(1);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUsers(currentPage);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [currentPage]);

    const handlePageChange = (page: number) => {
        router.push(`${window.location.pathname}?page=${page}`);
    };

    const handleDelete = async (id: string) => {
        const result = await Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        });

        if (result.isConfirmed) {
            const { success, message } = await deleteUser(id);

            if (!success) {
                Swal.fire({
                    position: "top-end",
                    icon: "error",
                    title: `${message}`,
                    showConfirmButton: false,
                    timer: 1500
                });
                return;
            }

            fetchUsers(currentPage);

            Swal.fire({
                position: "top-end",
                icon: "warning",
                title: `${message}`,
                showConfirmButton: false,
                timer: 1500
            });
        }
    }

    const handleEditRole = async (e: ChangeEvent<HTMLSelectElement>, id: string) => {
        const userType = e.target.value
        const { success, message } = await handleUpdateUserType(id, userType)

        if (!success) {
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: `${message}`,
                showConfirmButton: false,
                timer: 1500
            });
            return
        }

        Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${message}`,
            showConfirmButton: false,
            timer: 1500
        });
    }

    if (loading) return <Spinner small />;

    return (
        <>
            <div className="overflow-x-auto shadow-lg rounded-lg border">
                <table className="table w-full">
                    <thead className="bg-green-100 text-green-800 font-semibold text-sm">
                        <tr>
                            <th>#</th>
                            <th>Photo</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th className="hidden md:table-cell">Role</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <tr key={user._id} className="hover">
                                    <td>{(currentPage - 1) * usersPerPage + (index + 1)}</td>
                                    <td><img src={user.image} className="w-8 h-8 rounded-full object-cover" alt={user.name} /></td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <select onChange={(e) => { handleEditRole(e, user._id) }} defaultValue={user.userType} className="select select-bordered select-sm w-36">
                                            <option value='admin'>Admin</option>
                                            <option value='volunteer'>Volunteer</option>
                                            <option value='donor'>Donor</option>
                                        </select>

                                    </td>
                                    <td>
                                        <FaTrash onClick={() => { handleDelete(user._id) }}
                                            className="text-red-600 text-xl cursor-pointer" />
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={6} className="text-center py-4 text-gray-500">
                                    No users found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <Pagination
                totalPages={totalPages}
                currentPage={currentPage}
                onPageChange={handlePageChange}
            />
        </>
    )
}
export default UsersTableBody