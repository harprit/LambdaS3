const AWS = require('aws-sdk');

const s3 = new AWS.S3();

exports.s3JsonLoggerHandler = async (event, context) => {
    const getObjectRequests = event.Records.map(async (record) => {
        const params = {
            Bucket: record.s3.bucket.name,
            Key: record.s3.object.key,
        };
        try {
            const { Body } = await s3.getObject(params).promise();
            console.log(Body.toString());
        } catch (error) {
            console.error('Error calling S3 getObject:', error);
            throw error;
        }
    });

    await Promise.all(getObjectRequests);
};
