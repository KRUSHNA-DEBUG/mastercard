"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { TrendingUp, TrendingDown, Users, DollarSign, Target } from "lucide-react"

const monthlyData = [
  { month: "Jan", donations: 12000, volunteers: 45, events: 3 },
  { month: "Feb", donations: 15000, volunteers: 52, events: 4 },
  { month: "Mar", donations: 18000, volunteers: 48, events: 5 },
  { month: "Apr", donations: 22000, volunteers: 61, events: 6 },
  { month: "May", donations: 25000, volunteers: 58, events: 4 },
  { month: "Jun", donations: 28000, volunteers: 67, events: 7 },
]

const programData = [
  { name: "Clean Water", value: 35, color: "#16a34a" },
  { name: "Education", value: 25, color: "#eab308" },
  { name: "Environment", value: 30, color: "#06b6d4" },
  { name: "Health", value: 10, color: "#8b5cf6" },
]

const impactMetrics = [
  { label: "People Helped", value: 12547, change: 12.5, trend: "up" },
  { label: "Trees Planted", value: 8934, change: 8.2, trend: "up" },
  { label: "Clean Water Access", value: 2341, change: -2.1, trend: "down" },
  { label: "Children Educated", value: 1876, change: 15.3, trend: "up" },
]

export function AnalyticsDashboard() {
  return (
    <div className="space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {impactMetrics.map((metric) => (
          <Card key={metric.label} className="border-0 shadow-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-nature-600">{metric.label}</p>
                  <p className="text-2xl font-bold text-nature-800">{metric.value.toLocaleString()}</p>
                </div>
                <div className="flex items-center gap-1">
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-4 w-4 text-nature-600" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-red-500" />
                  )}
                  <span className={`text-sm font-medium ${metric.trend === "up" ? "text-nature-600" : "text-red-500"}`}>
                    {metric.change > 0 ? "+" : ""}
                    {metric.change}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Monthly Trends */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-nature-800">Monthly Trends</CardTitle>
            <CardDescription>Donations and volunteer activity over time</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "white",
                    border: "1px solid #e5e7eb",
                    borderRadius: "8px",
                  }}
                />
                <Line type="monotone" dataKey="donations" stroke="#16a34a" strokeWidth={2} />
                <Line type="monotone" dataKey="volunteers" stroke="#eab308" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Program Distribution */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-nature-800">Program Distribution</CardTitle>
            <CardDescription>Funding allocation across programs</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={programData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {programData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              {programData.map((program) => (
                <div key={program.name} className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full" style={{ backgroundColor: program.color }}></div>
                  <span className="text-sm text-nature-700">{program.name}</span>
                  <span className="text-sm text-nature-600">{program.value}%</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Donation Analytics */}
      <Card className="border-0 shadow-sm">
        <CardHeader>
          <CardTitle className="text-nature-800">Donation Analytics</CardTitle>
          <CardDescription>Monthly donation trends and patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={monthlyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "white",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Bar dataKey="donations" fill="#16a34a" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Goal Progress */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-nature-800">Annual Goals</CardTitle>
            <CardDescription>Progress towards 2024 targets</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-nature-700">Fundraising Goal</span>
                <span className="text-nature-600">$180,000 / $250,000</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-nature-700">Volunteer Hours</span>
                <span className="text-nature-600">3,240 / 5,000</span>
              </div>
              <Progress value={65} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-nature-700">Events Completed</span>
                <span className="text-nature-600">29 / 40</span>
              </div>
              <Progress value={73} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-nature-800">Recent Achievements</CardTitle>
            <CardDescription>Milestones reached this quarter</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-nature-100 flex items-center justify-center">
                  <Target className="h-4 w-4 text-nature-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-nature-800">Clean Water Milestone</p>
                  <p className="text-xs text-nature-600">Provided clean water access to 1,000+ people</p>
                </div>
                <Badge className="bg-nature-600">Completed</Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-sunny-100 flex items-center justify-center">
                  <Users className="h-4 w-4 text-sunny-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-nature-800">Volunteer Growth</p>
                  <p className="text-xs text-nature-600">Reached 500+ active volunteers</p>
                </div>
                <Badge className="bg-nature-600">Completed</Badge>
              </div>
              <div className="flex items-center gap-3">
                <div className="h-8 w-8 rounded-full bg-mint-100 flex items-center justify-center">
                  <DollarSign className="h-4 w-4 text-mint-600" />
                </div>
                <div>
                  <p className="text-sm font-medium text-nature-800">Fundraising Record</p>
                  <p className="text-xs text-nature-600">Highest monthly donations: $28,000</p>
                </div>
                <Badge className="bg-nature-600">Completed</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
