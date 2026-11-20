import { PollingUnitField, PollingUnitName } from "./ProfileText";

// The user's saved polling unit, ready to drop into any page: {pu.name}, {pu.state} …
// Each value shows the saved detail, or a placeholder until it is set.
export const myPollingUnit = {
  name: <PollingUnitName />,
  code: <PollingUnitField field="unitCode" fallback="[PU code]" />,
  state: <PollingUnitField field="state" fallback="[State]" />,
  lga: <PollingUnitField field="lga" fallback="[LGA]" />,
  ward: <PollingUnitField field="ward" fallback="[Ward]" />,
};
