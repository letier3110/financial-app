"use client"

import { IReportData, IReportTop5 } from "../lib/interfaces"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card"
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8']

interface ComponentProps {
  top5: IReportTop5[]
  monthData: IReportData
}

export default function Component({
  top5,
  monthData,
}: ComponentProps) {
  const pieData = top5.map((item) => ({ name: item.bestPracticeName, value: item.total }))
  const lineData = Object.entries(monthData).map(([month, revenue]) => ({ month, revenue }))
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Financial Dashboard</h1>
      <div className="grid grid-cols-1 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Top 5 Account Distribution</CardTitle>
            <CardDescription>For the last month</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Month trend for accounts</CardTitle>
            {/* <CardDescription>Monthly revenue for the past 6 months</CardDescription> */}
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={lineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8884d8" activeDot={{ r: 8 }} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Revenue</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$28,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Total Expenses</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$18,000</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Net Profit</CardTitle>
            <CardDescription>Year to date</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-3xl font-bold">$10,000</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}