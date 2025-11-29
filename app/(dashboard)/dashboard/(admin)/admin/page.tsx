import { getUserPerMonth } from "@/actions/users/UserActions"
import TotalDonations from "@/app/(dashboard)/components/admin/TotalDonations"
import TotalVolunteers from "@/app/(dashboard)/components/admin/TotalVolunteers"
import UpcomingEvents from "@/app/(dashboard)/components/admin/UpcomingEvents"
import UsersPerMonth from "@/app/(dashboard)/components/admin/UsersPerMonth"
import DonationReportGenerator from "@/app/(dashboard)/components/admin/DonationReportGenerator"

const Admin = async () => {
  const { userPerMonth } = await getUserPerMonth()
  return (
    <section>
      <h3 className="text-2xl font-bold m-4">Statistics of {new Date().getFullYear()}</h3>
      <div className="grid md:grid-cols-3 gap-4 mx-4 my-3">
        <TotalDonations />
        <TotalVolunteers />
        <UpcomingEvents />
      </div>
      <DonationReportGenerator />
      <UsersPerMonth data={userPerMonth} />
    </section>
  )
}
export default Admin

