import { Client, Account, Databases, ID } from "appwrite";
import conf from "../conf/conf";
export class AuthService {
    client = new Client();
    databases;
    account;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.account = new Account(this.client);
        this.databases = new Databases(this.client);
    }

    async createAccount({ email, password, name, role }) {
        try {
            await this.account.create(ID.unique(), email, password, name);

            // ✅ Wait for login to complete before accessing user data
            await this.login({ email, password });

            // ✅ Fetch the user data after login
            const user = await this.getCurrentUser();

            await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appweiteUserCollectionId,
                user.$id, // Now 'user.$id' contains the correct user ID
                { role }
            );

            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async login({ email, password }) {
        try {
            return await this.account.createEmailPasswordSession(
                email,
                password
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getCurrentUser() {
        try {
            return await this.account.get();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async getUserMetaData(userId) {
        try {
            const user = await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appweiteUserCollectionId,
                userId
            );
            return user;
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async logout() {
        try {
            return await this.account.deleteSession("current");
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
}

const authService = new AuthService();
export default authService;
