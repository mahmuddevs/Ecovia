import { totalVolunteer } from "@/actions/users/UserActions"

const TotalVolunteers = async () => {
  const volunteers = await totalVolunteer()
  return (
    <div className="bg-primary text-white p-8 space-y-6 rounded-md">
      <h4 className="text-3xl font-semibold">Total Volunteers</h4>
      <div className="text-3xl font-semibold">{volunteers}</div>
    </div>
  )
}

export default TotalVolunteers
