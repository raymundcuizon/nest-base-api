import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient } from "@aws-sdk/lib-dynamodb";
import { Injectable } from "@nestjs/common";

@Injectable()
export class DbClientsProvider {
    public dbClient: DynamoDBClient;
    public dbDocumentClient: DynamoDBDocumentClient

    constructor() {
        const marshallOptions = {
            // Whether to automatically convert empty strings, blobs, and sets to `null`.
            convertEmptyValues: false, // false, by default.
            // Whether to remove undefined values while marshalling.
            removeUndefinedValues: false, // false, by default.
            // Whether to convert typeof object to map attribute.
            convertClassInstanceToMap: false, // false, by default.
        };
        const unmarshallOptions = {
            // Whether to return numbers as a string instead of converting them to native JavaScript numbers.
            wrapNumbers: false, // false, by default.
        };
        const translateConfig = { marshallOptions, unmarshallOptions };
        this.dbClient = new DynamoDBClient(
            {
                region: process.env.AWS_REGION,
                // endpoint: process.env.DB_ENDPOINT,
                credentials: {
                    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
                    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
                }
            }
        );
        this.dbDocumentClient = DynamoDBDocumentClient.from(
            this.dbClient,
            translateConfig
        );
    }

    /**
    * Destroys the Dbclients
    */
    destroy() {
        this.dbDocumentClient.destroy();
        this.dbClient.destroy();
    }
}