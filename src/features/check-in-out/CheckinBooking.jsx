import { useEffect, useState } from "react"
import styled from "styled-components"
import BookingDataBox from "../../features/bookings/BookingDataBox"
import { useBooking } from "../../features/bookings/useBooking.js"
import { useSettings } from "../../features/settings/useSettings"
import { useMoveBack } from "../../hooks/useMoveBack"
import Button from "../../ui/Button"
import ButtonGroup from "../../ui/ButtonGroup"
import ButtonText from "../../ui/ButtonText"
import Checkbox from "../../ui/Checkbox"
import Heading from "../../ui/Heading"
import Row from "../../ui/Row"
import Spinner from "../../ui/Spinner"
import { formatCurrency } from "../../utils/helpers.js"
import { useCheckin } from "./useCheckin.js"

const Box = styled.div`
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`

function CheckinBooking() {
  const moveBack = useMoveBack()
  const { isLoading, booking } = useBooking()
  const { isCheckingIn, checkin } = useCheckin()
  const { isLoading: isLoadingSettings, settings } = useSettings()
  const [confirmPaid, setConfirmPaid] = useState(false)
  const [addBreakfast, setAddBreakfast] = useState(false)

  useEffect(
    function () {
      setConfirmPaid(booking?.isPaid ?? false)
    },
    [booking]
  )

  function handleCheckin() {
    if (!confirmPaid) return

    if (addBreakfast) {
      checkin({
        bookingId,
        breakfast: {
          hasBreakfast: true,
          extrasPrice: optionalBreakfastPrice,
          totalPrice: totalPrice + optionalBreakfastPrice
        }
      })
    } else {
      checkin({ bookingId, breakfast: {} })
    }
  }

  if (isLoading || isLoadingSettings) return <Spinner />

  const { id: bookingId, guests, totalPrice, numGuests, hasBreakfast, numNights } = booking
  const optionalBreakfastPrice = settings.breakfastPrice * numNights * numGuests

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>
      <BookingDataBox booking={booking} />
      {!hasBreakfast && (
        <Box>
          <Checkbox
            id="breakfast"
            checked={addBreakfast}
            onChange={() => {
              setAddBreakfast((add) => !add)
              setConfirmPaid(false)
            }}
          >
            Want to add breakfast for {optionalBreakfastPrice} ?
          </Checkbox>
        </Box>
      )}
      <Box>
        <Checkbox
          id="confirm"
          checked={confirmPaid}
          disabled={confirmPaid || isCheckingIn}
          onChange={() => setConfirmPaid((confirm) => !confirm)}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!addBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(totalPrice + optionalBreakfastPrice)} (${formatCurrency(totalPrice)} + ${formatCurrency(
                optionalBreakfastPrice
              )})`}
        </Checkbox>
      </Box>
      <ButtonGroup>
        <Button disabled={!confirmPaid || isCheckingIn} onClick={handleCheckin}>
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  )
}

export default CheckinBooking
