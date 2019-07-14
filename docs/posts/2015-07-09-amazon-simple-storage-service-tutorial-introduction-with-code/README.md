---
title: "Amazon Simple Storage Service Tutorial: Introduction and code sample"
date: "2015-07-09"
---

## Foreword

In this Amazon Simple Storage Service Tutorial I'd like to give you a first introduction into S3, it's registration and code samples to upload and delete files.

## Introduction - What is Amazon Simple Storage Service

The Amazon Simple Storage Service (in short S3) is a web service from Amazon - Amazon offers a bunch of web services under [Amazon AWS (Amazon Web Services)](https://aws.amazon.com/de/). S3 is a cloud storage that scales to your needs, you don't have to worry to be out of storage space. S3 is used by many companies, like Netflix and Pinterest. You pay as you go, meaning you only pay for what you really use. Take a look at this neat introduction video:

<iframe width="556" height="313" src="https://www.youtube.com/embed/rKpKHulqYOQ" frameborder="0" allowfullscreen="allowfullscreen"></iframe>

## What does the Amazon Simple Storage Service cost

The free contigent contains **5 GB Storage**, **20 000 GET**\-Request and **2000 PUT**\-Requests. Check out the full price list at [Amazon S3 - Preisliste](https://aws.amazon.com/de/s3/pricing/). The prices depend on the selected region. You may choose any region.

## Setup Amazon Simple Storage Service

First, you have to register for [Amazon Web Services - AWS](https://aws.amazon.com/de/). After registering successfully, you should be able to login to the AWS management console. All services should be listed there. Go to **Storage & Content Delivery** and select **S3 - Scalable Storage in a Cloud**.

You may now create buckets in the S3 management console. A bucket is a container für any objects, that you want to store in S3. Multiple buckets for multiple projects can be created. If you want to upload or delete files, you always specify a bucket. Let's start by creating a new bucket:

[Amazon S3 - Bucket erstellen](./s3_create_bucket.png)

The S3 management console can be used to upload files, however, we want to do it via Code ;)

## Generate Access-Key and Private-Key

To publicly access the bucket (via Code), we need to generate a private and public key. Click on your account name -> _Security Credentials -> _Tab _Access Keys (Access Key ID and Secret Access Key)_. Simply hit _Create New Access Key_. **Important:** Write down your private key - you cannt view it again. If you loose your private key, you have to generate a new key pair and delete the old one.

[Amazon S3 - Keys erstellen](./s3_create_access_key.png)

## Upload, retreive and delete and S3 Dateien hochladen, löschen und abfragen mit Java

AWS offers a Java SDK at the following GAV-Coodinates:

```xml
<dependency>
  <groupId>com.amazonaws</groupId>
  <artifactId>aws-java-sdk</artifactId>
  <version>1.10.3</version>
</dependency>
```

I wrote a small client that lets you upload, retreive and delete files. The AmazonClient is an Enum with a single type (see [Java Singleton Pattern - Enum](/posts/2015-06-29-java-singleton-pattern/)) - ensuring that there is only a single instance. The com.amazonaws.services.s3.AmazonS3Client is initiated once (statically) with your private and public access key. We also set the region we're in- in this case Frankfurt (EU\_CENTRAL\_1). You have to adjust the keys.

```java
import java.io.File;

import com.amazonaws.auth.BasicAWSCredentials;
import com.amazonaws.regions.Region;
import com.amazonaws.regions.Regions;
import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.GetObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.amazonaws.services.s3.model.S3Object;

public enum AmazonClient
{

  INSTANCE;

 
  private static final String ACCESS\_KEY = "accessKey";
  
  private static final String SECRET\_KEY = "secretKey";

  private static final AmazonS3 amazonClient;

  static
  {
    amazonClient = new AmazonS3Client(new BasicAWSCredentials(ACCESS\_KEY, SECRET\_KEY));
    amazonClient.setRegion(Region.getRegion(Regions.EU\_CENTRAL\_1));
  }

  public void uploadFile(String bucketName, String key, File file)
  {
    uploadFile(bucketName, key, file, null);
  }

  public void uploadFile(String bucketName, String key, File file, ObjectMetadata customMetadata)
  {
    PutObjectRequest putObjectRequest = new PutObjectRequest(bucketName, key, file);
    putObjectRequest.setMetadata(customMetadata);
    amazonClient.putObject(putObjectRequest);
  }

 
  public S3Object getFile(String bucketName, String key)
  {
    return amazonClient.getObject(new GetObjectRequest(bucketName, key));
  }

  public void deleteFile(String bucketName, String key)
  {
    amazonClient.deleteObject(new DeleteObjectRequest(bucketName, key));
  }

}
```

To test the class, let's use our previously created bucket.

```java
import java.io.File;
import java.io.IOException;

import com.amazonaws.services.s3.model.AmazonS3Exception;

public class S3UploadFile
{

  private static final String BUCKET\_NAME = "kevcodez";

  public static void main(String\[\] args) throws IOException
  {
    File file = new File("C:/testfile.txt");

    String filename = "testfile.txt";

    // Upload file
    AmazonClient.INSTANCE.uploadFile(BUCKET\_NAME, filename, file);

    // Get file
    System.out.println(AmazonClient.INSTANCE.getFile(BUCKET\_NAME, filename));

    // Delete file
    AmazonClient.INSTANCE.deleteFile(BUCKET\_NAME, filename);

    try
    {
      System.out.println(AmazonClient.INSTANCE.getFile(BUCKET\_NAME, filename));
    }
    catch (AmazonS3Exception ex)
    {
      System.out.println("Key not found - as expected after deletion");
    }
  }

}
```

## Add Metadata to your files

Within the AmazonClient-Class, the uploadFile() method allows passing metadata from type ObjectMetadata. You can define metadata, like cacheControl. By editing cacheControl, we can define the time to cache the file, for example in a browser. Using **"max-age: 600"**, the file will be cached for 10 minutes.

```java
ObjectMetadata metadata = new ObjectMetadata();
metadata.setCacheControl("max-age: 600");

AmazonClient.INSTANCE.uploadFile(BUCKET\_NAME, filename, file, metadata);
```

## Makes files publicly accessible

By default, when uploading a file to your bucket, it is not publicly accessible. You can only access the file using a special link (contains a unique key).  To make every file you upload public, we have to create a new bucket policy.

Go to **S3 Management Console** and _Rightclick your bucket_\-> **Properties**. Under **Permissions** click **Add bucket policy**.

[Amazon S3 - Bucket Permissions](./s3_add_bucket_policy.png)

Enter the following policy:

```json
{
  "Version": "2008-10-17",
  "Statement": \[{
    "Sid": "AllowPublicRead",
    "Effect": "Allow",
    "Principal": { "AWS": "\*" },
    "Action": \["s3:GetObject"\],
    "Resource": \["arn:aws:s3:::kevcodez/\*" \]
  }\]
}
```

**Important:** Under Resource, you have to enter the name of your bucket.

[Amazon S3 - Bucket Policy Editor](./s3_bucket_policy_editor.png)
