import {TrackingPlaceStatusType} from "@front-end/shared/utils";

export interface TrackingPlacesViewModel {
  id: string;
  placeName: string;
  address: string;
  status: TrackingPlaceStatusType;
  notificationAllowed: boolean;
}
