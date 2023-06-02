import {Heatmap} from "react-native-maps";
import React, {useEffect, useState} from "react";
import {HeatMapData, HeatMapPointData} from "./map_data";
import axios from "axios";
import {initPoint} from "./init_state";
import * as Cache from '@front-end/frameworks-and-drivers/app-sync/cache';

type WeightedLatLng = {
  latitude: number;
  longitude: number;
  weight?: number;
}

const HeatMap = () => {
  const [heatmapData, setHeatmapData] = useState<WeightedLatLng[]>([])
  const [isLoadingHeatMap, setIsLoadingHeatMap] = useState(true)

  const fetchHeatmapData = async (heatMapData: HeatMapData) => {
    return heatMapData.availableLocations?.map((value) => {
      return {
        latitude: value.lat,
        longitude: value.long,
        weight: (value.weight ?? 0) / 500,
      } as WeightedLatLng;
    })
  }

  const loadHeatmapData = async (data: HeatMapData) => {
    if (data.availableLocations?.length !== 0)
      fetchHeatmapData(data)
        .then((locations) => {
          setHeatmapData(locations ?? [])
          setIsLoadingHeatMap(false)
          console.log("Load map done!")
        })
  }

  const getHeatMapData = async (heatMapPoints: HeatMapPointData[]): Promise<HeatMapData> => {
    const requestBody = {
      predictDate: Date.now() / 1000,
      locations: heatMapPoints,
    }
    return axios.post("/prediction", requestBody,{baseURL: "https://vove-managed.com/api"})
      .then((response) => {
        Cache.set("mapData", JSON.stringify(response.data.data));
        return response.data.data
      })
      .catch((error) => {
        throw new Error(error)
      });
  }

  const getCachedHeatMapData = async (): Promise<HeatMapData> => {
    return Cache.get("mapData")
      .then((data) => {
        if (data)
          return JSON.parse(data ?? "{}")
        else throw new Error("No cache data")
      });
  }

  useEffect(() => {
    getHeatMapData(initPoint)
      .then((data) => loadHeatmapData(data))
      .catch((e) => console.log(e));
  }, [])

  useEffect(() => {
    getCachedHeatMapData()
      .then((data) => loadHeatmapData(data))
      .catch((e) => console.log(e));
  }, [])

  return (
    !isLoadingHeatMap && <Heatmap
      points={heatmapData}
      radius={100}
      opacity={0.2}
    />
  )
}

export default HeatMap;
