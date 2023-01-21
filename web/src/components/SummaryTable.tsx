import dayjs from "dayjs"
import { useEffect, useState } from "react"
import { api } from "../lib/axios"
import { generateDatesFromYearBeginning } from "../utils/generate-dates-from-year-beginning"
import { HabitDay } from "./HabitDay"

const weekDays = [
  { id: 1, day: 'D' },
  { id: 2, day: 'S' },
  { id: 3, day: 'T' },
  { id: 4, day: 'Q' },
  { id: 5, day: 'Q' },
  { id: 6, day: 'S' },
  { id: 7, day: 'S' },
]

const summaryDates = generateDatesFromYearBeginning()

const minimumSummaryDatesSize = 18 * 7
const amountOfDaysToFill = minimumSummaryDatesSize - summaryDates.length

type Summary = {
  id: string;
  date: string;
  amount: number;
  completed: number;
}[]

export function SummaryTable() {
  const [summary, setSummary] = useState<Summary>([])

  useEffect(() => {
    function getSummary() {
      api.get('summary')
        .then(res => setSummary(res.data))
    }

    getSummary()
  }, [])
  return (
    <div className="w-full flex">
      <div className="grid grid-rows-7 grid-flow-row gap-3">
        {weekDays.map(weekDay => {
          return (
            <div key={weekDay.id} className="text-zinc-400 font-bold text-xl h-10 w-10 flex items-center justify-center">
              {weekDay.day}
            </div>
          )
        })}
      </div>

      <div className="grid grid-rows-7 grid-flow-col gap-3">
        {summaryDates.map(date => {
          const dayInSummary = summary.find(day => {
            return dayjs(date).isSame(day.date, 'day')
          })
          return (
            <HabitDay
              key={date.toString()}
              date={date}
              amount={dayInSummary?.amount}
              completed={dayInSummary?.completed}
            />
          )
        })}
        {amountOfDaysToFill > 0 && Array.from({ length: amountOfDaysToFill }).map((_, i) => {
          return (
            <div
              key={i}
              className="w-10 bg-zinc-900 border-2 border-zinc-800 rounded-lg opacity-40 cursor-not-allowed"
            />
          )
        })}
      </div>
    </div>
  )
}