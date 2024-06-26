import styled from "styled-components"
import Spinner from "../../ui/Spinner"
import { useCabins } from "../cabins/useCabins"
import TodayActivity from "../check-in-out/TodayActivity"
import DurationChart from "./DurationChart"
import SalesChart from "./SalesChart"
import Stats from "./Stats"
import { useRecentBooking } from "./useRecentBooking"
import { useRecentStays } from "./useRecentStays"

const StyledDashboardLayout = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: auto 34rem auto;
  gap: 2.4rem;
`

function DashboardLayout() {
  const { isLoading: isLoadingBookings, bookings } = useRecentBooking()
  const { isLoading: isLoadingStays, confirmedStays, numDays } = useRecentStays()
  const { isLoading: isLoadingCabins, cabins } = useCabins()

  if (isLoadingBookings || isLoadingStays || isLoadingCabins) return <Spinner />

  return (
    <StyledDashboardLayout>
      <Stats bookings={bookings} confirmedStays={confirmedStays} numDays={numDays} cabinCount={cabins.length} />
      <TodayActivity />
      <DurationChart confirmedStays={confirmedStays} />
      <SalesChart bookings={bookings} numDays={numDays} />
    </StyledDashboardLayout>
  )
}

export default DashboardLayout
