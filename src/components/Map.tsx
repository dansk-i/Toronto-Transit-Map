import { useRef, useState, useCallback } from 'react';
import Map from 'react-map-gl/maplibre';
import type { MapRef } from 'react-map-gl/maplibre';
import maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';
import { Source, Layer } from 'react-map-gl/maplibre';


type ViewMode = 'default' | 'worldMap' | 'angled3D';

export default function TorontoMap() {
  const mapRef = useRef<MapRef>(null);
  const [viewMode, setViewMode] = useState<ViewMode>('default');

  const handleViewChange = useCallback((mode: ViewMode) => {
    setViewMode(mode);

    if (!mapRef.current) return;

    const viewParams = {
      default: { bearing: -16, pitch: 0 },
      worldMap: { bearing: 0, pitch: 0 },
      angled3D: { bearing: -16, pitch: 45 },
    }[mode];

    mapRef.current.flyTo({
      ...viewParams,
      duration: 1000,
    });
  }, []);

  return (
    <div style={{ position: 'relative', width: '100vw', height: '100vh' }}>
      {/* Map */}
      <Map
        ref={mapRef}
        initialViewState={{
          longitude: -79.3832,
          latitude: 43.69,
          zoom: 11.5,
          bearing: -16,
          pitch: 0,
        }}
        style={{ width: '100%', height: '100%' }}
        mapLib={maplibregl}
        mapStyle="/styles/liberty-style.json"
        minZoom={10}
        maxZoom={16}
        maxBounds={[
          [-79.722290, 43.572929],
          [-79.111176, 43.909766],
        ]}
        
      >
        {/* TTC Subway Lines */}
        <Source
          id="subway-lines"
          type="geojson"
          data="/geojson/ttc-subway-current.geojson"
        >
          {/* Line 1 - Yellow */}
          <Layer
            id="line-1"
            type="line"
            filter={['==', ['get', 'name'], 'Line 1 - Yonge-University']}
            paint={{
              'line-color': '#FFCA09',
              'line-width': 4,
              'line-opacity': 0.9,
            }}
            layout={{
              'line-join': 'round',
              'line-cap': 'round',
            }}
            beforeId="building"
          />

          {/* Line 2 - Green */}
          <Layer
            id="line-2"
            type="line"
            filter={['==', ['get', 'name'], 'Line 2 - Bloor-Danforth']}
            paint={{
              'line-color': '#00A754',
              'line-width': 4,
              'line-opacity': 0.9,
            }}
            layout={{
              'line-join': 'round',
              'line-cap': 'round',
            }}
            beforeId="building"
          />

          {/* Line 4 - Purple */}
          <Layer
            id="line-4"
            type="line"
            filter={['==', ['get', 'name'], 'Line 4 - Sheppard']}
            paint={{
              'line-color': '#B51A79',
              'line-width': 4,
              'line-opacity': 0.9,
            }}
            layout={{
              'line-join': 'round',
              'line-cap': 'round',
            }}
            beforeId="building"
          />
        </Source>
      </Map>
      

      {/* View Toggle */}
      <div
        style={{
          position: 'absolute',
          top: '1rem',
          left: '1rem',
          backgroundColor: 'white',
          padding: '0.5rem 1rem',
          borderRadius: '6px',
          zIndex: 10,
        }}
      >
        <strong>Map View:</strong><br />
        <label>
          <input
            type="radio"
            name="view"
            value="default"
            checked={viewMode === 'default'}
            onChange={() => handleViewChange('default')}
          />
          Original
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="view"
            value="worldMap"
            checked={viewMode === 'worldMap'}
            onChange={() => handleViewChange('worldMap')}
          />
          World Map
        </label>
        <br />
        <label>
          <input
            type="radio"
            name="view"
            value="angled3D"
            checked={viewMode === 'angled3D'}
            onChange={() => handleViewChange('angled3D')}
          />
          3D Angle
        </label>
      </div>
    </div>
  );
}
