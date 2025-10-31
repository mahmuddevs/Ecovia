"use client"
import { deleteUser, handleUpdateUserType } from "@/actions/users/UserActions"
import { User } from "./UsersTable"
import { FaTrash } from "react-icons/fa6"
import Swal from "sweetalert2"
import { ChangeEvent, useState } from "react"

const UsersTableBody = ({ users: initialUsers }: { users: User[] }) => {
    const [users, setUsers] = useState(initialUsers)

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

            setUsers(prev => prev.filter(user => user._id !== id));

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


    return (
        <tbody>
            {
                users.map((user, index) => (
                    <tr key={user._id}>
                        <td>{index + 1}</td>
                        <td><img src={user.image} className="w-15" alt={user.name} /></td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>
                            <select onChange={(e) => { handleEditRole(e, user._id) }} defaultValue={user.userType} className="select w-36">
                                <option value='admin'>Admin</option>
                                <option value='volunteer'>Volunteer</option>
                                <option value='donor'>Donor</option>
                            </select>

                        </td>
                        <td>
                            <FaTrash onClick={() => { handleDelete(user._id) }}
                                className="text-red-600 text-2xl cursor-pointer" />
                        </td>
                    </tr>
                ))
            }
        </tbody >
    )
}
export default UsersTableBody