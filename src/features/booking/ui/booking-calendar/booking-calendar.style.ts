import { styled } from "styled-components";

export const BookingCalendarContainer = styled.div`
  padding: var(--md);
  padding-bottom: calc(var(--md) * 10);
  margin-top: var(--xl);

  .rdp-root,
  .rdp-month,
  .rdp-months,
  .rdp-month_grid {
    width: 100%;
    max-width: 100%;
  }

  .rdp-root {
    --rdp-accent-color: var(--brand);
    --rdp-day_button-width: 100%;
    --rdp-day_button-border-radius: var(--xl);
  }
`;
