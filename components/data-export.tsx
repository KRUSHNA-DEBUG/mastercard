"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Download, FileText, CalendarIcon, Database } from "lucide-react"
import { cn } from "@/lib/utils"
import { format } from "date-fns"

interface ExportOptions {
  dataType: string
  format: string
  dateRange: {
    from?: Date
    to?: Date
  }
  includeFields: string[]
}

export function DataExport() {
  const [exportOptions, setExportOptions] = useState<ExportOptions>({
    dataType: "",
    format: "csv",
    dateRange: {},
    includeFields: [],
  })

  const [isExporting, setIsExporting] = useState(false)

  const dataTypes = [
    { value: "donations", label: "Donations", fields: ["amount", "donor_name", "date", "program", "payment_method"] },
    { value: "volunteers", label: "Volunteers", fields: ["name", "email", "phone", "skills", "hours_volunteered"] },
    { value: "events", label: "Events", fields: ["title", "date", "location", "participants", "status"] },
    {
      value: "programs",
      label: "Programs",
      fields: ["title", "description", "funding_goal", "current_funding", "status"],
    },
  ]

  const selectedDataType = dataTypes.find((type) => type.value === exportOptions.dataType)

  const handleFieldToggle = (field: string, checked: boolean) => {
    setExportOptions((prev) => ({
      ...prev,
      includeFields: checked ? [...prev.includeFields, field] : prev.includeFields.filter((f) => f !== field),
    }))
  }

  const handleExport = async () => {
    setIsExporting(true)

    // Simulate export process
    await new Promise((resolve) => setTimeout(resolve, 2000))

    // In a real implementation, this would call an API endpoint
    // that generates and returns the export file
    const filename = `${exportOptions.dataType}_export_${format(new Date(), "yyyy-MM-dd")}.${exportOptions.format}`

    // Create a mock download
    const element = document.createElement("a")
    element.href = "data:text/plain;charset=utf-8," + encodeURIComponent("Mock export data")
    element.download = filename
    element.style.display = "none"
    document.body.appendChild(element)
    element.click()
    document.body.removeChild(element)

    setIsExporting(false)
  }

  return (
    <Card className="border-0 shadow-sm">
      <CardHeader>
        <CardTitle className="text-nature-800 flex items-center gap-2">
          <Database className="h-5 w-5" />
          Data Export
        </CardTitle>
        <CardDescription>Export your data for analysis or backup purposes</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Data Type Selection */}
        <div>
          <Label className="text-nature-700 font-medium">Data Type</Label>
          <Select
            value={exportOptions.dataType}
            onValueChange={(value) => setExportOptions((prev) => ({ ...prev, dataType: value, includeFields: [] }))}
          >
            <SelectTrigger className="mt-1 border-nature-200">
              <SelectValue placeholder="Select data type to export" />
            </SelectTrigger>
            <SelectContent>
              {dataTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Format Selection */}
        <div>
          <Label className="text-nature-700 font-medium">Export Format</Label>
          <Select
            value={exportOptions.format}
            onValueChange={(value) => setExportOptions((prev) => ({ ...prev, format: value }))}
          >
            <SelectTrigger className="mt-1 border-nature-200">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="csv">CSV (Comma Separated Values)</SelectItem>
              <SelectItem value="xlsx">Excel (XLSX)</SelectItem>
              <SelectItem value="json">JSON</SelectItem>
              <SelectItem value="pdf">PDF Report</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range */}
        <div>
          <Label className="text-nature-700 font-medium">Date Range (Optional)</Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full mt-1 justify-start text-left font-normal border-nature-200",
                  !exportOptions.dateRange.from && "text-muted-foreground",
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {exportOptions.dateRange.from ? (
                  exportOptions.dateRange.to ? (
                    <>
                      {format(exportOptions.dateRange.from, "LLL dd, y")} -{" "}
                      {format(exportOptions.dateRange.to, "LLL dd, y")}
                    </>
                  ) : (
                    format(exportOptions.dateRange.from, "LLL dd, y")
                  )
                ) : (
                  <span>All time</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                defaultMonth={exportOptions.dateRange.from}
                selected={exportOptions.dateRange}
                onSelect={(range) => setExportOptions((prev) => ({ ...prev, dateRange: range || {} }))}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Field Selection */}
        {selectedDataType && (
          <div>
            <Label className="text-nature-700 font-medium">Include Fields</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-2">
              {selectedDataType.fields.map((field) => (
                <div key={field} className="flex items-center space-x-2">
                  <Checkbox
                    id={field}
                    checked={exportOptions.includeFields.includes(field)}
                    onCheckedChange={(checked) => handleFieldToggle(field, checked as boolean)}
                  />
                  <Label htmlFor={field} className="text-sm text-nature-700 capitalize">
                    {field.replace("_", " ")}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Export Button */}
        <div className="pt-4 border-t border-nature-200">
          <Button
            onClick={handleExport}
            disabled={!exportOptions.dataType || isExporting}
            className="w-full bg-nature-600 hover:bg-nature-700"
          >
            {isExporting ? (
              <>
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                Exporting...
              </>
            ) : (
              <>
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </>
            )}
          </Button>
        </div>

        {/* Export Info */}
        <div className="bg-nature-50 p-4 rounded-lg">
          <div className="flex items-start gap-2">
            <FileText className="h-4 w-4 text-nature-600 mt-0.5" />
            <div className="text-sm text-nature-700">
              <p className="font-medium mb-1">Export Information</p>
              <ul className="text-xs space-y-1 text-nature-600">
                <li>• Exports are generated in real-time based on current data</li>
                <li>• Large datasets may take a few minutes to process</li>
                <li>• All exports include data validation and formatting</li>
                <li>• Personal information is handled according to privacy policies</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
