import React, { useState } from 'react';
import { Type, Compass, MapPin, Plus, Trash2, Edit3, Palette, RotateCw, Move } from 'lucide-react';

interface CustomizationToolbarProps {
  customizations: any[];
  onCustomizationsChange: (customizations: any[]) => void;
  selectedTool: string;
  onToolChange: (tool: string) => void;
}

interface TextCustomization {
  id: string;
  type: 'text';
  content: string;
  x: number;
  y: number;
  fontSize: number;
  color: string;
  fontWeight: string;
}

interface CompassCustomization {
  id: string;
  type: 'compass';
  x: number;
  y: number;
  size: number;
  style: 'modern' | 'classic' | 'minimal';
  color: string;
}

interface IconCustomization {
  id: string;
  type: 'icon';
  iconType: 'pin' | 'star' | 'heart' | 'home' | 'building';
  x: number;
  y: number;
  size: number;
  color: string;
}

type Customization = TextCustomization | CompassCustomization | IconCustomization;

const CustomizationToolbar: React.FC<CustomizationToolbarProps> = ({
  customizations,
  onCustomizationsChange,
  selectedTool,
  onToolChange
}) => {
  const [selectedCustomization, setSelectedCustomization] = useState<string | null>(null);
  const [textInput, setTextInput] = useState('');
  const [textSettings, setTextSettings] = useState({
    fontSize: 16,
    color: '#000000',
    fontWeight: 'normal'
  });
  const [compassSettings, setCompassSettings] = useState({
    size: 32,
    style: 'modern' as const,
    color: '#000000'
  });
  const [iconSettings, setIconSettings] = useState({
    iconType: 'pin' as const,
    size: 24,
    color: '#000000'
  });

  const tools = [
    { id: 'select', name: 'Select', icon: Move, description: 'Select and move elements' },
    { id: 'text', name: 'Text', icon: Type, description: 'Add text labels' },
    { id: 'compass', name: 'Compass', icon: Compass, description: 'Add compass rose' },
    { id: 'icon', name: 'Icons', icon: MapPin, description: 'Add map icons' }
  ];

  const addTextCustomization = () => {
    if (!textInput.trim()) return;
    
    const newCustomization: TextCustomization = {
      id: `text-${Date.now()}`,
      type: 'text',
      content: textInput,
      x: 50 + Math.random() * 20 - 10, // Random position near center
      y: 50 + Math.random() * 20 - 10,
      fontSize: textSettings.fontSize,
      color: textSettings.color,
      fontWeight: textSettings.fontWeight
    };
    
    onCustomizationsChange([...customizations, newCustomization]);
    setTextInput('');
  };

  const addCompassCustomization = () => {
    const newCustomization: CompassCustomization = {
      id: `compass-${Date.now()}`,
      type: 'compass',
      x: 50 + Math.random() * 20 - 10,
      y: 50 + Math.random() * 20 - 10,
      size: compassSettings.size,
      style: compassSettings.style,
      color: compassSettings.color
    };
    
    onCustomizationsChange([...customizations, newCustomization]);
  };

  const addIconCustomization = () => {
    const newCustomization: IconCustomization = {
      id: `icon-${Date.now()}`,
      type: 'icon',
      iconType: iconSettings.iconType,
      x: 50 + Math.random() * 20 - 10,
      y: 50 + Math.random() * 20 - 10,
      size: iconSettings.size,
      color: iconSettings.color
    };
    
    onCustomizationsChange([...customizations, newCustomization]);
  };

  const removeCustomization = (id: string) => {
    onCustomizationsChange(customizations.filter(c => c.id !== id));
    if (selectedCustomization === id) {
      setSelectedCustomization(null);
    }
  };

  const updateCustomization = (id: string, updates: Partial<Customization>) => {
    onCustomizationsChange(
      customizations.map(c => c.id === id ? { ...c, ...updates } : c)
    );
  };

  const selectedCustomizationData = customizations.find(c => c.id === selectedCustomization);

  return (
    <div className="h-full bg-white border-l border-gray-200 flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold text-black mb-2">Customization Tools</h2>
        <p className="text-sm text-gray-600">Add text, compass, and icons to your map</p>
      </div>

      {/* Tool Selection */}
      <div className="p-4 border-b border-gray-200">
        <h3 className="text-sm font-medium text-gray-900 mb-3">Tools</h3>
        <div className="grid grid-cols-2 gap-2">
          {tools.map((tool) => {
            const Icon = tool.icon;
            return (
              <button
                key={tool.id}
                onClick={() => onToolChange(tool.id)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTool === tool.id
                    ? 'border-black bg-black text-white'
                    : 'border-gray-200 hover:border-gray-300 text-gray-700'
                }`}
                title={tool.description}
              >
                <Icon className="w-5 h-5 mx-auto mb-1" />
                <div className="text-xs font-medium">{tool.name}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tool-specific Controls */}
      <div className="flex-1 overflow-y-auto">
        {selectedTool === 'text' && (
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Add Text</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Text Content
                </label>
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && addTextCustomization()}
                  placeholder="Enter text..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-2">
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Font Size
                  </label>
                  <select
                    value={textSettings.fontSize}
                    onChange={(e) => setTextSettings(prev => ({ ...prev, fontSize: Number(e.target.value) }))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value={12}>12px</option>
                    <option value={14}>14px</option>
                    <option value={16}>16px</option>
                    <option value={18}>18px</option>
                    <option value={20}>20px</option>
                    <option value={24}>24px</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-xs font-medium text-gray-700 mb-1">
                    Weight
                  </label>
                  <select
                    value={textSettings.fontWeight}
                    onChange={(e) => setTextSettings(prev => ({ ...prev, fontWeight: e.target.value }))}
                    className="w-full px-2 py-1 border border-gray-300 rounded text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                  >
                    <option value="normal">Normal</option>
                    <option value="bold">Bold</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="color"
                  value={textSettings.color}
                  onChange={(e) => setTextSettings(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>
              
              <button
                onClick={addTextCustomization}
                disabled={!textInput.trim()}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Text
              </button>
            </div>
          </div>
        )}

        {selectedTool === 'compass' && (
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Add Compass</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Style
                </label>
                <select
                  value={compassSettings.style}
                  onChange={(e) => setCompassSettings(prev => ({ ...prev, style: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="modern">Modern</option>
                  <option value="classic">Classic</option>
                  <option value="minimal">Minimal</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Size: {compassSettings.size}px
                </label>
                <input
                  type="range"
                  min="16"
                  max="64"
                  value={compassSettings.size}
                  onChange={(e) => setCompassSettings(prev => ({ ...prev, size: Number(e.target.value) }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="color"
                  value={compassSettings.color}
                  onChange={(e) => setCompassSettings(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>
              
              <button
                onClick={addCompassCustomization}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Compass
              </button>
            </div>
          </div>
        )}

        {selectedTool === 'icon' && (
          <div className="p-4 border-b border-gray-200">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Add Icon</h3>
            <div className="space-y-3">
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Icon Type
                </label>
                <select
                  value={iconSettings.iconType}
                  onChange={(e) => setIconSettings(prev => ({ ...prev, iconType: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:ring-2 focus:ring-black focus:border-transparent"
                >
                  <option value="pin">Map Pin</option>
                  <option value="star">Star</option>
                  <option value="heart">Heart</option>
                  <option value="home">Home</option>
                  <option value="building">Building</option>
                </select>
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Size: {iconSettings.size}px
                </label>
                <input
                  type="range"
                  min="12"
                  max="48"
                  value={iconSettings.size}
                  onChange={(e) => setIconSettings(prev => ({ ...prev, size: Number(e.target.value) }))}
                  className="w-full"
                />
              </div>
              
              <div>
                <label className="block text-xs font-medium text-gray-700 mb-1">
                  Color
                </label>
                <input
                  type="color"
                  value={iconSettings.color}
                  onChange={(e) => setIconSettings(prev => ({ ...prev, color: e.target.value }))}
                  className="w-full h-8 border border-gray-300 rounded cursor-pointer"
                />
              </div>
              
              <button
                onClick={addIconCustomization}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors flex items-center justify-center gap-2"
              >
                <Plus className="w-4 h-4" />
                Add Icon
              </button>
            </div>
          </div>
        )}

        {/* Customizations List */}
        {customizations.length > 0 && (
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 mb-3">Elements ({customizations.length})</h3>
            <div className="space-y-2">
              {customizations.map((customization) => (
                <div
                  key={customization.id}
                  className={`p-3 border rounded-lg cursor-pointer transition-colors ${
                    selectedCustomization === customization.id
                      ? 'border-black bg-gray-50'
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setSelectedCustomization(
                    selectedCustomization === customization.id ? null : customization.id
                  )}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {customization.type === 'text' && <Type className="w-4 h-4 text-gray-600" />}
                      {customization.type === 'compass' && <Compass className="w-4 h-4 text-gray-600" />}
                      {customization.type === 'icon' && <MapPin className="w-4 h-4 text-gray-600" />}
                      <div>
                        <div className="text-sm font-medium text-gray-900 capitalize">
                          {customization.type}
                        </div>
                        <div className="text-xs text-gray-500">
                          {customization.type === 'text' && (customization as TextCustomization).content}
                          {customization.type === 'compass' && `${(customization as CompassCustomization).style} style`}
                          {customization.type === 'icon' && `${(customization as IconCustomization).iconType} icon`}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        removeCustomization(customization.id);
                      }}
                      className="text-red-500 hover:text-red-700 transition-colors"
                      title="Remove"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {customizations.length === 0 && (
          <div className="p-4 text-center text-gray-500">
            <MapPin className="w-8 h-8 mx-auto mb-2 text-gray-300" />
            <p className="text-sm">No customizations yet</p>
            <p className="text-xs">Select a tool to start adding elements</p>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="p-4 border-t border-gray-200">
        <div className="flex gap-2">
          <button
            onClick={() => onCustomizationsChange([])}
            disabled={customizations.length === 0}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-4 rounded-md hover:bg-gray-200 transition-colors disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            <Trash2 className="w-4 h-4" />
            Clear All
          </button>
        </div>
      </div>
    </div>
  );
};

export default CustomizationToolbar;