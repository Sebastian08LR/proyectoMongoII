import { MongoClient } from "mongodb";

export default class Connection {
    constructor() {
        this.username = encodeURIComponent(process.env.MONGO_USER);
        this.password = encodeURIComponent(process.env.MONGO_PASSWORD);
        this.client = null;
        this.db = null;
    }

    async connect() {
        if (!this.client) {
            try {
                const uri = this.buildUri();
                this.client = new MongoClient(uri);
                await this.client.connect();
                this.db = this.client.db(process.env.DB_NAME);
            } catch (error) {
                console.error("Error connecting to MongoDB:", error);
                throw error;
            }
        }
        return this.client;
    }

    buildUri() {
        const baseUri = process.env.MONGO_URI;
        const [protocol, rest] = baseUri.split('://');
        return `${protocol}://${this.username}:${this.password}@${rest}`;
    }

    async close() {
        if (this.client) {
            await this.client.close();
            this.client = null;
            this.db = null;
        }
    }
}
