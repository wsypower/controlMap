import { getPoint } from '@/api/map/map'
import GeoJSON from 'ol/format/GeoJSON'

export async function getTypePoint() {
  const data = await getPoint();
  return new GeoJSON().readFeatures(data);
}