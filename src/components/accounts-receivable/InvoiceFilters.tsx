import React, { useState } from "react";
import {
  Search,
  Filter,
  Calendar as CalendarIcon,
  DollarSign,
  Users,
} from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";

interface InvoiceFiltersProps {
  onFilterChange?: (filters: FilterState) => void;
}

interface FilterState {
  status: string;
  dateRange: DateRange | undefined;
  customer: string;
  minAmount: string;
  maxAmount: string;
}

const InvoiceFilters = ({ onFilterChange = () => {} }: InvoiceFiltersProps) => {
  const [filters, setFilters] = useState<FilterState>({
    status: "all",
    dateRange: undefined,
    customer: "",
    minAmount: "",
    maxAmount: "",
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="w-full p-4 bg-white border rounded-lg shadow-sm">
      <div className="flex flex-col space-y-4 md:flex-row md:space-y-0 md:space-x-4">
        {/* Search Input */}
        <div className="relative flex-grow">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search invoices by number or customer..."
            className="pl-9"
            onChange={(e) => handleFilterChange("customer", e.target.value)}
            value={filters.customer}
          />
        </div>

        {/* Status Filter */}
        <div className="w-full md:w-48">
          <Select
            value={filters.status}
            onValueChange={(value) => handleFilterChange("status", value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Statuses</SelectItem>
              <SelectItem value="paid">Paid</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="overdue">Overdue</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Date Range Picker */}
        <div className="w-full md:w-64">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className="w-full justify-start text-left font-normal"
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {filters.dateRange?.from ? (
                  filters.dateRange.to ? (
                    <>
                      {format(filters.dateRange.from, "MMM dd, yyyy")} -{" "}
                      {format(filters.dateRange.to, "MMM dd, yyyy")}
                    </>
                  ) : (
                    format(filters.dateRange.from, "MMM dd, yyyy")
                  )
                ) : (
                  <span>Select date range</span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                initialFocus
                mode="range"
                selected={filters.dateRange}
                onSelect={(range) => handleFilterChange("dateRange", range)}
                numberOfMonths={2}
              />
            </PopoverContent>
          </Popover>
        </div>

        {/* Amount Range */}
        <div className="flex space-x-2 w-full md:w-auto">
          <div className="relative w-full md:w-32">
            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Min"
              className="pl-9"
              value={filters.minAmount}
              onChange={(e) => handleFilterChange("minAmount", e.target.value)}
            />
          </div>
          <div className="relative w-full md:w-32">
            <DollarSign className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="number"
              placeholder="Max"
              className="pl-9"
              value={filters.maxAmount}
              onChange={(e) => handleFilterChange("maxAmount", e.target.value)}
            />
          </div>
        </div>

        {/* Clear Filters Button */}
        <Button
          variant="outline"
          className="w-full md:w-auto"
          onClick={() => {
            const resetFilters = {
              status: "all",
              dateRange: undefined,
              customer: "",
              minAmount: "",
              maxAmount: "",
            };
            setFilters(resetFilters);
            onFilterChange(resetFilters);
          }}
        >
          Clear Filters
        </Button>
      </div>
    </div>
  );
};

export default InvoiceFilters;
