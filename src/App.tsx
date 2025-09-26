import { useState } from 'react';
import TorontoMap from './components/Map';
import SchematicMap from './components/SchematicMap';

export default function App() {
  const [mode, setMode] = useState<'schematic' | 'real'>('schematic'); // Default = schematic

  return (
    <div className="text-red-500">
      {/* Toggle Button */}
      <div className="absolute top-4 right-4 z-10 flex gap-2 bg-white/90 px-3 py-1 rounded-md shadow border border-zinc-300">
        <button
          className="text-sm font-medium hover:underline"
          onClick={() => setMode('schematic')}
        >
          Schematic
        </button>
        <span className="text-zinc-400">|</span>
        <button
          className="text-sm font-medium hover:underline"
          onClick={() => setMode('real')}
        >
          Real Map
        </button>
      </div>

      {/* Map Display */}
      {mode === 'schematic' ? <SchematicMap /> : <TorontoMap />}
    </div>
  );
}