"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, DayPickerProps } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-4 items-center",
        month: "flex flex-col gap-4 items-center",
        caption: "flex flex-row justify-between pt-1 relative items-center w-full px-2",
        caption_label: "text-sm font-medium",
        nav: "flex flex-row items-center justify-end gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "mr-1",
        nav_button_next: "ml-1",
        table: "w-full border-collapse space-x-1 mx-auto",
        head_row: "flex justify-center w-full",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem] text-center",
        row: "flex w-full mt-2 justify-center",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground"
        ),
        day_range_start: "day-range-start",
        day_range_end: "day-range-end",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent/70 text-accent-foreground font-semibold",
        day_outside:
          "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({
          className,
          ...props
        }: {
          className?: string
          props?: React.SVGProps<SVGSVGElement>
        }) => <ChevronLeft className={cn("size-4", className)} {...props} />,

        IconRight: ({
          className,
          ...props
        }: {
          className?: string
          props?: React.SVGProps<SVGSVGElement>
        }) => <ChevronRight className={cn("size-4", className)} {...props} />,
      } as unknown as Partial<DayPickerProps["components"]>}
      {...props}
    />
  )
}

export { Calendar }
