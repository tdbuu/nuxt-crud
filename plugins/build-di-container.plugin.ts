import 'reflect-metadata';
import { Context } from '@nuxt/types';
import { container } from 'inversify-props';

import { ICustomerService, CustomerService } from '../services';

export default () => {
  container.addSingleton<ICustomerService>(CustomerService, 'ICustomerService');
  console.log('DI Initiated');
};