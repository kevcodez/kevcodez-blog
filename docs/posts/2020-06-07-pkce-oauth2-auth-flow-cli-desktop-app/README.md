---
title: "Implementing OAuth 2.0 PKCE Flow for authenticating command line applications"
date: "2020-06-07"
---
# Implementing OAuth 2.0 PKCE Flow for authenticating command line applications

You've probably seen command line applications opening a browser window for you to login and after successful login, without any further interaction, you are authenticated in the CLI.

One way to solve this, is using OAuth PKCE flow.

Since there are very great and detailed tutorials about OAuth 2.0 and the PKCE flow itself, I won't be going into detail about that.
Have a look at those resources, if you want to learn more about that.

[Implement the OAuth 2.0 Authorization Code with PKCE Flow (okta.com)](https://developer.okta.com/blog/2019/08/22/okta-authjs-pkce/?utm_campaign=text_website_all_multiple_dev_dev_oauth-pkce_null&utm_source=oauthio&utm_medium=cpc)

[Authorization Code Flow with Proof Key for Code Exchange (PKCE) (auth0.com)](https://auth0.com/docs/flows/concepts/auth-code-pkce)

*TLDR:* The PKCE flow is a secure way to authenticate public clients.
The calling application generates a secret that is verified by the server.

For our sample CLI, we are using a simple NodeJs script, it could be a CLI in any other framework.

As an authenticated server for the sample code [AWS Cognito](https://aws.amazon.com/cognito/) is used.
It could also be any other authentication server, since OAuth is a standard, the code won't really differ besides configuration.

Other managed services for authentication:

* [auth0](https://auth0.com/)
* [Okta](https://okta.com/)

The flow to authenticate a user via CLI:

1. Initialize OAuth client
2. Generate a code challenge and authorization url
3. Launch a simple webserver listening on a local port 
4. Open the authorization url in a browser with the launched local webserver as redirect url
5. Upon successful login, the user is redirected and our local webserver receives the oauth callback parameters
6. Generate token set with the callback parameters
7. Shutdown local webserver

Let's get into it.

## Client initialization and code generation

For simplicity, the [openid-client](https://www.npmjs.com/package/openid-client) package is used.
It could be any other OAuth client library, though.

```ts
// Initiliaze issuer configuration, discover or configure manually
const issuer = await Issuer.discover('https://cognito-idp.eu-central-1.amazonaws.com/eu-central-1_xyz/.well-known/openid-configuration')


const client = new issuer.Client({
    client_id: '<clientId>',
    // fixed port 6363, could be dynamic, our webserver will be launched on this port
    redirect_uris: ['http://localhost:6363'], 
    response_types: ['code'],
    token_endpoint_auth_method: 'none'
});

// Generate code challenge
const code_verifier = generators.codeVerifier();
const code_challenge = generators.codeChallenge(code_verifier);

// Generate authorization url, that we will open for the user
const authorizationUrl = await client.authorizationUrl({
    scope: 'openid',
    code_challenge,
    code_challenge_method: 'S256',
});
```

You could manually configure the issuer.
That means you have to configure several endpoints, algorithms and so on.

Alternatively, most managed services offer an URL that provides that configuration under a `.well-known` path.
This allows for auto-configuration and any changes on the provider side won't need to be reconfigured manually.

## Launch a simple webserver and open browser

The [opn](npmjs.com/package/opn) package is used for cross-platform website opening.

```ts
let params

// Very simple webserver, using Nodes standard http module
const server = http.createServer((req, res) => {
    // In here when the server gets a request
    if (req.url.startsWith('/?')) {
        // The parameters could be parsed manually, but the openid-client offers a function for it
        params = client.callbackParams(req);
        res.end('You can close this browser now.')
    } else {
        res.end('Unsupported')
    }
}).listen(6363) // static local port

// Open authorization url in preferred browser, works cross-platform
opn(authorizationUrl)

// Recheck every 500ms if we received any parameters
// This is a simple example without a timeout
while (params === undefined) {
    await new Promise(resolve => setTimeout(resolve, 500));
}
```

We are now waiting for the user to login.
On a successful login, the user will be redirected to `http://localhost:6363/?code=<dynamic-code>`.

## Get token set

```ts
// Receive token set given the redirect parameters and the code verifier we created earlier
const tokenSet = await client.oauthCallback('http://localhost:6363', params, { code_verifier })

// we don't need the server anymore, stop listening
server.close()

console.log(tokenSet)
```

## Full code example

Checkout the full code example on [Github Gist](https://gist.github.com/kevcodez/0fa6f561315e73c26748dc847e32f113).

If you like this post, feel free to follow me or hit me up on [Twitter](https://twitter.com/kevcodez).