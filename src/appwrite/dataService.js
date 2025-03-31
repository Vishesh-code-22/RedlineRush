import { Client, Databases, Storage, ID } from "appwrite";
import conf from "../conf/conf";
export class DataService {
    client = new Client();
    databases;
    storage;

    constructor() {
        this.client
            .setEndpoint(conf.appwriteUrl)
            .setProject(conf.appwriteProjectId);
        this.databases = new Databases(this.client);
        this.storage = new Storage(this.client);
    }

    async createPost({
        title,
        slug,
        content,
        featuredImage,
        status,
        userId,
        category,
    }) {
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    userId,
                    category,
                    slug,
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async editPost(slug, { title, content, featuredImage, status, category }) {
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                ID.unique(),
                {
                    title,
                    content,
                    featuredImage,
                    status,
                    category,
                    slug,
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deletePost(postId) {
        try {
            await this.databases.deleteDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                postId
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getPost(postId) {
        try {
            return await this.databases.getDocument(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId,
                postId
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }
    async getPosts() {
        try {
            return await this.databases.listDocuments(
                conf.appwriteDatabaseId,
                conf.appwriteArticleCollectionId
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async uploadArticleImage(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteArticleBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async deleteArticleImage(imageId) {
        try {
            return await this.storage.deleteFile(
                conf.appwriteArticleBucketId,
                imageId
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getArticleImagePreview(imageId) {
        return this.storage.getFilePreview(
            conf.appwriteArticleBucketId,
            imageId
        );
    }

    async uploadUserImage(file) {
        try {
            return await this.storage.createFile(
                conf.appwriteUserBucketId,
                ID.unique(),
                file
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    async submitUserImage(imageId, userId) {
        try {
            await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appweiteUserCollectionId,
                userId,
                {
                    avatar: imageId,
                }
            );
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

    getUserImagePreview(imageId) {
        return this.storage.getFilePreview(conf.appwriteUserBucketId, imageId);
    }
}

const dataService = new DataService();

export default dataService;
