import { Map } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';

export default function TorontoMap() {
  return (
    <Map
      initialViewState={{
        longitude: -79.3832, // Toronto center
        latitude: 43.69,
        zoom: 11.5
      }}
        style={{ width: '100vw', height: '100vh' }}
        mapStyle="/styles/liberty-style.json"
        minZoom={10}
        maxZoom={16}
        maxBounds={[
            [-79.722290,43.572929], 
            [-79.111176,43.909766]  
        ]}
    />
  );
}