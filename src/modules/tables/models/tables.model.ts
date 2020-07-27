export interface RestaurantList {
    [key: string]: string | number;
    id: number;
    name: string;
    flag: string;
    address: string;
    noOfOrders: number;
}
