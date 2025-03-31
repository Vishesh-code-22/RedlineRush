const conf = {
    appwriteUrl: String(import.meta.env.VITE_APPWRITE_URL),
    appwriteProjectId: String(import.meta.env.VITE_APPWRITE_PROJECT_ID),
    appwriteDatabaseId: String(import.meta.env.VITE_APPWRITE_DATABASE_ID),
    appwriteArticleCollectionId: String(
        import.meta.env.VITE_APPWRITE_COLLECTION_ID
    ),
    appwriteArticleBucketId: String(import.meta.env.VITE_APPWRITE_BUCKET_ID),
    appwriteUserBucketId: String(import.meta.env.VITE_APPWRITE_USER_BUCKET_ID),
    appweiteUserCollectionId: String(
        import.meta.env.VITE_APPWRITE_USER_COLLECTION_ID
    ),
};

export default conf;
