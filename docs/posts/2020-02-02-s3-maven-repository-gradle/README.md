---
title: "Using an AWS S3 Bucket as your Maven repository in a Gradle project"
date: "2020-02-02"
---

# Using an AWS S3 Bucket as your Maven repository in a Gradle project

At our company, we are currently redoing our entire application infrastructure.
One of our big goals is to get rid of every self-managed instance.

We already have dockerized applications and use [ECS](https://aws.amazon.com/ecs/).
Application Docker images are stored in [Amazons Elastic Container Registry](https://aws.amazon.com/ecr).

Our services share a few libraries that are published to a Maven repository.
Until recently, we were using a self-hosted [Sonatype Nexus](https://de.sonatype.com/product-nexus-repository).
That means, we had to apply system updates, kernel upgrades and reboots, keep nexus up2date, ...
To simply host a few artifacts, this felt like too much trouble.

All of our Kotlin-based services use Gradle as a build tool.

We were looking into a solution that meets the following requirements:

* No self-managed instance, that we need to host/maintain
* Cost-effective
* Ability to privately access the artifacts, since they are not meant for the public
* Support for Gradle

We decided to use [Amazons Cloud Object Storage S3](https://aws.amazon.com/s3) to host our artifacts.

## Things to consider when creating your S3 bucket

Your S3 bucket should have a private ACL, so by default, your artifacts cannot be read or written without being authenticated.

Create atleast two different access groups:

- One that is allowed to read (all your developers should have that role) to access the artifacts
- One that is allowed to write (your CI, in case it is used for publishing), to publish artifacts

## Publishing artifacts to S3

AWS access keys are used to publish and retrieve artifacts.
We'll start by defining the access key/secret as variables.

```groovy
buildscript {
    ext {
        ...

        awsAccessKeyId = System.env.AWS_ACCESS_KEY_ID ?: findProperty('aws_access_key_id')
        awsSecretAccessKey = System.env.AWS_SECRET_ACCESS_KEY ?: findProperty('aws_secret_access_key')
    }
    ...
}
```

Gradle will first attempt to get the access key/secret from environment variables.
If they cannot be found, it falls back to Gradles built-in [findProperty-Function](https://docs.gradle.org/current/javadoc/org/gradle/api/Project.html#findProperty-java.lang.String-).
That function will check the project's gradle properties, global gradle properties and so on.

The `maven-publish` plugin has built-in support for publishing artifacts to a S3 bucket.

```groovy
apply plugin 'maven-publish'

repositories {
    mavenCentral()
    repositories {
        maven {
            url = s3ArtifactsUrl
            credentials(AwsCredentials) {
                accessKey = awsAccessKeyId
                secretKey = awsSecretAccessKey
            }
        }
    }
}

publishing {
    publications {
        ...
    }
    repositories {
        maven {
            url = s3ArtifactsUrl
            credentials(AwsCredentials) {
                accessKey = awsAccessKeyId
                secretKey = awsSecretAccessKey
            }
        }
    }
}
```

That is all you need to configure to publish artifacts to an S3 bucket.

You can now publish artifacts by executing the `publish` task.

```
./gradlew clean build publish -Paws_access_key_id=$ACCESS_KEY -Paws_secret_access_key=$SECRET_ACCESS_KEY
```

This can obviously run in your Continuous Integration.

## Accessing the artifacts in Gradle

To use the S3 repository in any Gradle project and access the artifacts, we need to modify the Gradle build file.
Fortunately, Gradle supports S3 buckets as Maven repositories out-of-the-box.

```groovy
repositories {
    mavenCentral()
    maven {
        url = 's3://<your-s3-bucket-name>/releases'
        credentials(AwsCredentials) {
            accessKey = System.env.AWS_ACCESS_KEY_ID ?: findProperty('aws_access_key_id')
            secretKey = System.env.AWS_SECRET_ACCESS_KEY ?: findProperty('aws_secret_access_key')
        }
    }
}
```

That's it. There is no need to configure anything else here.

## Configuring the access key/secret

You have a bunch of options to configure the access key/secret.

Environment variables
```sh
export AWS_ACCESS_KEY_ID=foo
export AWS_SECRET_ACCESS_KEY=bar
```

---

Edit your projects gradle.properties file.

```properties
AWS_ACCESS_KEY_ID=foo
AWS_SECRET_ACCESS_KEY=bar
```

---

Edit your global gradle.properties file in your users folder (`~/.gradle/gradle.properties`).

```properties
AWS_ACCESS_KEY_ID=foo
AWS_SECRET_ACCESS_KEY=bar
```

## Conclusion

We got rid of the self-managed nexus instance, are able to access private artifacts and have some cost-effective way to storage everything.

Special thanks to my [colleague](https://github.com/cc-jhr) who set up everything, I am just writing this up.

If you like this post, feel free to follow me or hit me up on [Twitter](https://twitter.com/kevcodez).