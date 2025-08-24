"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Search, X, CalendarIcon, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface SearchFilters {
  query: string
  category: string
  status: string
  dateRange: {
    from?: Date
    to?: Date
  }
  amount: {
    min?: number
    max?: number
  }
  location: string
}

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void
  placeholder?: string
  categories?: string[]
  showAmountFilter?: boolean
  showLocationFilter?: boolean
  showDateFilter?: boolean
}

export function AdvancedSearch({
  onSearch,
  placeholder = "Search...",
  categories = [],
  showAmountFilter = false,
  showLocationFilter = false,
  showDateFilter = true,
}: AdvancedSearchProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [filters, setFilters] = useState<SearchFilters>({
    query: "",
    category: "",
    status: "",
    dateRange: {},
    amount: {},
    location: "",
  })

  const updateFilter = (key: keyof SearchFilters, value: any) => {
    const newFilters = { ...filters, [key]: value }
    setFilters(newFilters)
    onSearch(newFilters)
  }

  const clearFilters = () => {
    const clearedFilters: SearchFilters = {
      query: "",
      category: "",
      status: "",
      dateRange: {},
      amount: {},
      location: "",
    }
    setFilters(clearedFilters)
    onSearch(clearedFilters)
  }

  const activeFiltersCount = Object.values(filters).filter((value) => {
    if (typeof value === "string") return value !== ""
    if (typeof value === "object" && value !== null) {
      return Object.values(value).some((v) => v !== undefined && v !== "")
    }
    return false
  }).length

  return (
    <Card className="border-0 shadow-sm">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Main Search Bar */}
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-nature-400" />
              <Input
                placeholder={placeholder}
                value={filters.query}
                onChange={(e) => updateFilter("query", e.target.value)}
                className="pl-10 border-nature-200 focus:border-nature-500"
              />
            </div>
            <Button
              variant="outline"
              onClick={() => setIsExpanded(!isExpanded)}
              className={cn(
                "border-nature-200 text-nature-700 hover:bg-nature-50 bg-transparent",
                activeFiltersCount > 0 && "border-nature-500 bg-nature-50",
              )}
            >
              <SlidersHorizontal className="h-4 w-4 mr-2" />
              Filters
              {activeFiltersCount > 0 && <Badge className="ml-2 bg-nature-600 text-white">{activeFiltersCount}</Badge>}
            </Button>
          </div>

          {/* Advanced Filters */}
          {isExpanded && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4 border-t border-nature-200">
              {/* Category Filter */}
              {categories.length > 0 && (
                <div>
                  <Label className="text-nature-700 font-medium">Category</Label>
                  <Select value={filters.category} onValueChange={(value) => updateFilter("category", value)}>
                    <SelectTrigger className="mt-1 border-nature-200">
                      <SelectValue placeholder="All categories" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Status Filter */}
              <div>
                <Label className="text-nature-700 font-medium">Status</Label>
                <Select value={filters.status} onValueChange={(value) => updateFilter("status", value)}>
                  <SelectTrigger className="mt-1 border-nature-200">
                    <SelectValue placeholder="All status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All status</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                    <SelectItem value="pending">Pending</SelectItem>
                    <SelectItem value="cancelled">Cancelled</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Date Range Filter */}
              {showDateFilter && (
                <div>
                  <Label className="text-nature-700 font-medium">Date Range</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className={cn(
                          "w-full mt-1 justify-start text-left font-normal border-nature-200",
                          !filters.dateRange.from && "text-muted-foreground",
                        )}
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {filters.dateRange.from ? (
                          filters.dateRange.to ? (
                            <>
                              {format(filters.dateRange.from, "LLL dd, y")} -{" "}
                              {format(filters.dateRange.to, "LLL dd, y")}
                            </>
                          ) : (
                            format(filters.dateRange.from, "LLL dd, y")
                          )
                        ) : (
                          <span>Pick a date range</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={filters.dateRange.from}
                        selected={filters.dateRange}
                        onSelect={(range) => updateFilter("dateRange", range || {})}
                        numberOfMonths={2}
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              )}

              {/* Amount Filter */}
              {showAmountFilter && (
                <div className="md:col-span-2">
                  <Label className="text-nature-700 font-medium">Amount Range</Label>
                  <div className="flex gap-2 mt-1">
                    <Input
                      type="number"
                      placeholder="Min amount"
                      value={filters.amount.min || ""}
                      onChange={(e) =>
                        updateFilter("amount", { ...filters.amount, min: Number(e.target.value) || undefined })
                      }
                      className="border-nature-200 focus:border-nature-500"
                    />
                    <Input
                      type="number"
                      placeholder="Max amount"
                      value={filters.amount.max || ""}
                      onChange={(e) =>
                        updateFilter("amount", { ...filters.amount, max: Number(e.target.value) || undefined })
                      }
                      className="border-nature-200 focus:border-nature-500"
                    />
                  </div>
                </div>
              )}

              {/* Location Filter */}
              {showLocationFilter && (
                <div>
                  <Label className="text-nature-700 font-medium">Location</Label>
                  <Input
                    placeholder="Enter location"
                    value={filters.location}
                    onChange={(e) => updateFilter("location", e.target.value)}
                    className="mt-1 border-nature-200 focus:border-nature-500"
                  />
                </div>
              )}

              {/* Clear Filters */}
              {activeFiltersCount > 0 && (
                <div className="flex items-end">
                  <Button
                    variant="outline"
                    onClick={clearFilters}
                    className="border-nature-200 text-nature-700 hover:bg-nature-50 bg-transparent"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
