import { injectable } from 'inversify-props';
import { map, catchError, first } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { http } from '../helpers';
import { ICustomer, Pagination, IPaginatedList } from '../models';
import { ICustomerService } from './icustomer.service';
import { NamedModulesPlugin } from 'webpack';

@injectable()
export class CustomerService implements ICustomerService {

    getPaginatedCustomer(params: Pagination): Observable<IPaginatedList<ICustomer>> {
        const customerList = http.get<IPaginatedList<ICustomer>>('/customer/list', {params}).pipe(
            first(),
            map(response => {
                if(response && response.data){
                    return response.data;
                }
                return of(null);
            }),
            catchError(error => {
                console.log('Error:' , error);
                return Observable(null);
            })
        );
        return customerList;
    }

    addNewCustomer(payload: any): Observable<ICustomer | null> {
        const customer = http.post<ICustomer>('/customers/add', payload).pipe(
            map(response => {
                if(response && response.data){
                    return response.data;
                }
                return null;
            }),
            catchError(error => {
                console.log('Error Add Customer:', error);
                return Observable(null);
            })
        );
        return customer;
    }

    updateCustomer(payload: any, customerId: string): Observable<ICustomer | null> {
        const customer = http.put<ICustomer>(`/customers/update/${customerId}`, payload).pipe(
            map(response => {
                if(response && response.data){
                    return response.data;
                }
                return null;
            }),
            catchError(error => {
                console.log('Error Update Customer:', error);
                return Observable(null);
            })
        );
        return customer;
    }
}