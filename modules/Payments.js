const { Client, Environment, ApiError } = require("square");

const client = new Client({
    accessToken: 'EAAAEDz5Q0Twpg4XNNdxlWnnCDWoLPJJ2Az5E4Y937gUfJwL3MS4iYJmsL6iMK86',
    environment: Environment.Sandbox,
});

const { locationsApi, paymentsApi, transactionsApi, refundsApi, subscriptionsApi } = client;

async function getLocations() {
    try {
        let listLocationsResponse = await locationsApi.listLocations();

        let locations = listLocationsResponse.result.locations;

        locations.forEach(function (location) {
            console.log(
                location.id + ": " +
                location.name + ", " +
                location.address.addressLine1 + ", " +
                location.address.locality
            );
        });
    } catch (error) {
        if (error instanceof ApiError) {
            error.result.errors.forEach(function (e) {
                console.log(e.category);
                console.log(e.code);
                console.log(e.detail);
            });
        } else {
            console.log("Unexpected error occurred: ", error);
        }
    }
};
async function createPayment() {
    try {
        const response = await client.paymentsApi.createPayment({
            sourceId: 'cnon:card-nonce-ok',
            idempotencyKey: '{UNIQUE_KEY}',
            amountMoney: {
                amount: 2000,
                currency: 'USD'
            }
        });

        console.log(response.result);
    } catch (error) {
        console.log(error);
    }

}
async function createTransaction() {
    transactionsApi.charge(
        "",
        {
            
        }
    )
}