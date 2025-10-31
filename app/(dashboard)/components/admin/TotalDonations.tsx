import { getDonationOfThisYear } from "@/actions/events/DonationActions"

const TotalDonations = async () => {
  const totalDonation = await getDonationOfThisYear()
  return (
    <div className="bg-success text-white p-8 space-y-6 rounded-md">
      <h4 className="text-3xl font-semibold">Total Donations</h4>
      <div className="text-3xl font-semibold">{totalDonation} $</div>
    </div>
  )
}
export default TotalDonations
