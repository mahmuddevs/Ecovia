
import UsersTableBody from "./UsersTableBody";

export interface User {
    _id: string;
    image: string;
    name: string;
    email: string;
    userType: string;
}

const UsersTable = () => {
    return (
        <div>
            <UsersTableBody />
        </div>
    );
};

export default UsersTable;
