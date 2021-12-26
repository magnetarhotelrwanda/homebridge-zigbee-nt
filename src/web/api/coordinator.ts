import { Express } from 'express';
import { constants } from 'http2';
import { ZigbeeNTHomebridgePlatform } from '../../platform';
import { normalizeDeviceModel } from '../common/utils';
import { CoordinatorModel } from '../common/types';

export function mapCoordinatorRoutes(express: Express, platform: ZigbeeNTHomebridgePlatform) {
  express.get('/api/coordinator', async (_req, res) => {
    const version = await platform.zigBeeClient.getCoordinatorVersion();
    const coordinator: CoordinatorModel = {
      ...version,
      ...normalizeDeviceModel(platform.zigBeeClient.getCoordinator(), platform.config.customDeviceSettings),
    };
    res.status(constants.HTTP_STATUS_OK);
    res.contentType('application/json');
    res.end(JSON.stringify({ coordinator }));
  });
}
