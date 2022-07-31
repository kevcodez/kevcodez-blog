<template><div><h1 id="getting-started-with-aws-cognito" tabindex="-1"><a class="header-anchor" href="#getting-started-with-aws-cognito" aria-hidden="true">#</a> Getting started with AWS Cognito</h1>
<p>Let's get started on <a href="https://aws.amazon.com/cognito/" target="_blank" rel="noopener noreferrer">AWS Cognito<ExternalLinkIcon/></a>.</p>
<blockquote>
<p>Amazon Cognito lets you add user sign-up, sign-in, and access control to your web and mobile apps quickly and easily. Amazon Cognito scales to millions of users and supports sign-in with social identity providers, such as Facebook, Google, and Amazon, and enterprise identity providers via SAML 2.0.</p>
</blockquote>
<p>A few features:</p>
<ul>
<li>Customizable ready-to-use login screens</li>
<li>OpenId Connect, OAuth 2.0 and SAML 2.0 support</li>
<li>Built-in support for Facebook, Google, Amazon and Apple login</li>
<li>Add any SAML/OpenID Connect identity provider</li>
<li>Multi-Factor authentication support</li>
</ul>
<p>First <strong>50,000</strong> monthly active users are <em>free</em>.</p>
<h2 id="setup-cognito" tabindex="-1"><a class="header-anchor" href="#setup-cognito" aria-hidden="true">#</a> Setup Cognito</h2>
<p>To setup cognito, we need to navigate login to the AWS management console and create a new user pool.</p>
<p><img src="@source/posts/2020-03-26-getting-started-aws-cognito/add_pool.png" alt="alt text"></p>
<h3 id="create-user-pool" tabindex="-1"><a class="header-anchor" href="#create-user-pool" aria-hidden="true">#</a> Create user pool</h3>
<p>For ease of setup, we'll go with the defaults.</p>
<p><img src="@source/posts/2020-03-26-getting-started-aws-cognito/create_pool_with_defaults.png" alt="alt text"></p>
<h3 id="create-groups" tabindex="-1"><a class="header-anchor" href="#create-groups" aria-hidden="true">#</a> Create groups</h3>
<p>After creating the pool, navigate to users/groups.</p>
<p>Let's create two groups.
&quot;admin&quot; and &quot;user&quot;.</p>
<p><img src="@source/posts/2020-03-26-getting-started-aws-cognito/create_group.png" alt="alt text"></p>
<h3 id="create-user" tabindex="-1"><a class="header-anchor" href="#create-user" aria-hidden="true">#</a> Create user</h3>
<p>We'll also create a user so we can test the login.</p>
<p>If you run into password constraint issues, you can change that now or later in the <strong>Policies</strong> tab.</p>
<p><img src="@source/posts/2020-03-26-getting-started-aws-cognito/create_user.png" alt="alt text"></p>
<h3 id="assign-group-to-user" tabindex="-1"><a class="header-anchor" href="#assign-group-to-user" aria-hidden="true">#</a> Assign group to user</h3>
<p>Click on the user and assign the user to the &quot;user&quot; group.</p>
<p><img src="@source/posts/2020-03-26-getting-started-aws-cognito/add_user_to_group.png" alt="alt text"></p>
<h3 id="creating-app-client" tabindex="-1"><a class="header-anchor" href="#creating-app-client" aria-hidden="true">#</a> Creating app client</h3>
<p>To be able to login or provide a login page, we still need to create an app client.
Go to General <strong>Settings &gt; App Clients</strong> and create a new client.</p>
<p><img src="@source/posts/2020-03-26-getting-started-aws-cognito/create_app_client.png" alt="alt text"></p>
<h3 id="configure-domain" tabindex="-1"><a class="header-anchor" href="#configure-domain" aria-hidden="true">#</a> Configure domain</h3>
<p>To use the hosted UI, we need to setup a domain under <strong>App integration / Domain name</strong>.</p>
<p>Amazon provides a domain for us if we simply define a unique subdomain.
You can use your own domain aswell.</p>
<p><img src="@source/posts/2020-03-26-getting-started-aws-cognito/cognito_domain.png" alt="alt text"></p>
<h3 id="configure-an-app-client" tabindex="-1"><a class="header-anchor" href="#configure-an-app-client" aria-hidden="true">#</a> Configure an app client</h3>
<p>App clients are disabled by default.
We need to go to <strong>App integration &gt; App client settings</strong>, enable the identity provider and define a callback url.</p>
<p>For Authorization flows you can either choose Authorization code grant and/or Implicit grant <strong>OR</strong> Client credentials.
An app client cannot support client credentials and authorization code grant flow.
You need separate clients.</p>
<p><img src="@source/posts/2020-03-26-getting-started-aws-cognito/app_client_configuration.png" alt="alt text"></p>
<p>You should now be able to launch the hosted UI.</p>
<p><img src="@source/posts/2020-03-26-getting-started-aws-cognito/hosted_ui.png" alt="alt text"></p>
<p>We should be able to login with our recently created user and be redirected to http://<strong>redirect-url</strong>?code=... on successful login.</p>
</div></template>
