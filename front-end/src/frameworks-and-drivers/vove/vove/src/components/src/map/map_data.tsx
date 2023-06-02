export type HeatMapPointData = {
  long: number
  lat: number
  weight?: number
  idx?: number
}
export type HeatMapData = {
  availableLocations?: Array<HeatMapPointData>
  missingLocation?: Array<HeatMapPointData>
}
