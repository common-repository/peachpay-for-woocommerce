type order_status_request = {
    version: 1;
    order_id: number;
    status: "success" | "failed" | "cancelled" | "on-hold";
    status_message?: string;
    stripe?: {
        charge_id: string;

        customer_id?: string;

        charge_fee?: string;
        charge_net?: string;
    };
    paypal?: {
        transaction_id: string;
    }
} | {
    order_id: number;
    status: "success" | "failed" | "cancelled";
    status_message?: string;

    transaction_id: string; // PayPal transaction id or Stripe charge Id 

    stripe_customer_id?: string;

    charge_fee?: string;
    charge_net?: string;
}