import { injectable } from 'inversify-props';
import { map, catchError, first } from 'rxjs/operators';
import { of, Observable } from 'rxjs';

import { http } from '../helpers';
import { ICustomer, Pagination, IPaginatedList } from '../models';
import { ICustomerService } from './icustomer.service';

@injectable()
export class CustomerService implements ICustomerService {

    getPaginatedCustomer(params: Pagination): Observable<IPaginatedList<ICustomer> | null> {
        const customerList = http.get<IPaginatedList<ICustomer> | null>('/customer/list', {params}).pipe(
            first(),
            map(response => {
                if(response && response.data){
                    return response.data;
                }
                return null;
            }),
            catchError(error => {
                console.log('Error:' , error);
                return of(null);
            })
        );
        return customerList;
    }

    addNewCustomer(payload: any): Observable<ICustomer | null> {
        const customer = http.post<ICustomer | null>('/customers/add', payload).pipe(
            map(response => {
                if(response && response.data){
                    return response.data;
                }
                return null;
            }),
            catchError(error => {
                console.log('Error Add Customer:', error);
                return of(null);
            })
        );
        return customer;
    }

    updateCustomer(payload: any, customerId: string): Observable<ICustomer | null> {
        const customer = http.put<ICustomer | null>(`/customers/update/${customerId}`, payload).pipe(
            map(response => {
                if(response && response.data){
                    return response.data;
                }
                return null;
            }),
            catchError(error => {
                console.log('Error Update Customer:', error);
                return of(null);
            })
        );
        return customer;
    }
}