import DonationsTableBody from "./DonationsTableBody";

export interface Donation {
  _id: string;
  amount: number;
  currency: string;
  transactionId: string;
  userEmail: string;
  createdAt: string;
  userName: string;
  userImage: string;
  eventName: string;
  eventType: string;
  eventDate: string;
}

const DonationsTable = () => {
  return (
    <div>
      <DonationsTableBody />
    </div>
  );
};

export default DonationsTable;
