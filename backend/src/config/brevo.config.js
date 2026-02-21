import SibApiV3Sdk from "sib-api-v3-sdk";

export const brevo = async (email) => {
    try {
        const client = SibApiV3Sdk.ApiClient.instance;

        client.authentications["api-key"].apiKey = process.env.BREVO_API_KEY;

        const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

        await apiInstance.sendTransacEmail(email)

        return true
    }
    catch (err) {
        return false;
    }
}