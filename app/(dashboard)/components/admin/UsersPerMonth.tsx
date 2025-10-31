"use client"

import {
  BarChart,
  Bar,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts"

interface MonthlyUserData {
  month: number
  count: number
}

const UsersPerMonth = ({ data }: { data: MonthlyUserData[] }) => {
  return (
    <section className="h-[400px]">
      <h2 className="text-lg font-semibold m-8">
        Users Per Month ({new Date().getFullYear()})
      </h2>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="month"
            label={{
              value: "Month",
              position: "insideBottomRight",
              offset: -10,
            }}
          />
          <YAxis
            label={{ value: "Users", angle: -90, position: "insideLeft" }}
            allowDecimals={false}
          />
          <Tooltip
            formatter={(value) => [`${value} users`, "Count"]}
            labelFormatter={(label) => `Month: ${label}`}
          />
          <Legend />
          <Bar
            dataKey="count"
            name="Users"
            fill="#8884d8"
            radius={[4, 4, 0, 0]}
          />
        </BarChart>
      </ResponsiveContainer>
    </section>
  )
}

export default UsersPerMonth
