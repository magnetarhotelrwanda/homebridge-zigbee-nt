import { Service } from 'homebridge';
import { XiaomiMotionSensor } from './xiaomi-motion-sensor';
import { AmbientLightServiceBuilder } from '../../builders/ambient-light-service-builder';
import { TemperatureSensorServiceBuilder } from '../../builders/temperature-sensor-service-builder';

export class XiaomiMotionIlluminanceSensor extends XiaomiMotionSensor {
  private illuminanceService: Service;
  private temperatureService: Service;

  getAvailableServices(): Service[] {
    const services = super.getAvailableServices();
    this.illuminanceService = new AmbientLightServiceBuilder(
      this.platform,
      this.accessory,
      this.client,
      this.state
    )
      .withAmbientLightLevel()
      .build();
    services.push(this.illuminanceService);

    this.temperatureService = new TemperatureSensorServiceBuilder(
      this.platform,
      this.accessory,
      this.client,
      this.state
    )
      .withTemperature()
      .build();

    return services;
  }
}
