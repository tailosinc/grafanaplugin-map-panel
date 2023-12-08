import { PanelPlugin } from '@grafana/data';
import { SimpleOptions } from './types';
import { MapDisplayPanel } from './components/MapDisplayPanel';

export const plugin = new PanelPlugin<SimpleOptions>(MapDisplayPanel);
