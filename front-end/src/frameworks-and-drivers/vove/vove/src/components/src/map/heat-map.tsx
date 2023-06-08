import {Heatmap} from 'react-native-maps';
import React, {useEffect, useState} from 'react';
import {HeatMapData, HeatMapPointData} from './map_data';
import axios from 'axios';
import {initPoint} from './init_state';
import AsyncStorage from "@react-native-async-storage/async-storage";

type WeightedLatLng = {
  latitude: number;
  longitude: number;
  weight?: number;
};

const HeatMap = () => {
  const [heatmapData, setHeatmapData] = useState<WeightedLatLng[]>([]);
  const [isLoadingHeatMap, setIsLoadingHeatMap] = useState(true);

  const loadHeatmapData = async (data: HeatMapData) => {
    if (data.availableLocations?.length !== 0) {
      const locations = data.availableLocations?.map((value) => ({
          latitude: value.lat,
          longitude: value.long,
          weight: (value.weight ?? 0) / 500,
        })
      );
      setHeatmapData(locations ?? []);
    }
  };

  const getHeatMapData = async (
    heatMapPoints: HeatMapPointData[]
  ): Promise<HeatMapData> => {
    const requestBody = {
      predictDate: Date.now() / 1000 - 60 * 60 * 24,
      locations: heatMapPoints,
    };
    return axios
      .post('/prediction', requestBody, {
        baseURL: 'https://vove-managed.com/api',
      })
      .then((response) => {
        AsyncStorage.setItem('mapData', JSON.stringify(response.data.data));
        return response.data.data;
      })
      .catch((error) => {
        throw new Error(error);
      });
  };

  const getCachedHeatMapData = async (): Promise<HeatMapData> => {
    return AsyncStorage.getItem('mapData').then((data) => {
      if (data) return JSON.parse(data ?? '{}');
      else throw new Error('No cache data');
    });
  };

  useEffect(() => {
    getHeatMapData(initPoint)
      .then((data) => loadHeatmapData(data))
      .catch((e) => console.log(e));
    getCachedHeatMapData()
      .then((data) => loadHeatmapData(data))
      .catch((e) => console.log(e));
  }, []);

  useEffect(() => {
    if (heatmapData.length !== 0) {
      setIsLoadingHeatMap(false);
      console.log('Load map done!');
    }
  }, [heatmapData]);

  if (isLoadingHeatMap) {
    console.log('Loading map...');
    return null;
  } else
    return (
      <Heatmap points={heatmapData} radius={50} opacity={0.9}/>
    );
};

export default HeatMap;
