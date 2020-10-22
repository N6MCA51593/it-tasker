import { createSelector } from '@reduxjs/toolkit';

export const areaIds = state => state.areas.ids;
export const deviceIds = state => state.devices.ids;
export const wallIds = state => state.walls.ids;
