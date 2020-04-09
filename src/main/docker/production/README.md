## Code for Production delpoyment

This is to be used as a stand alone deployment (and not with RADAR-Base Docker stack) and hence has it's own Nginx proxy.
This is to be used for population studies where participants can self-enrol. Hence, the users endpoint (which lists all users) is secured with basic auth and other endpoints are open.

### Configuration

1. Copy the `etc/env.template` file to `.env` and update the properties as required.
2. Copy the `etc/webserver/nginx.conf.template` (or `etc/webserver/nginx.nossl.conf.template` if don't require https) to `etc/webserver/nginx.conf`. If needed update the server name in the conf file to your desired value.
3. Copy the `etc/rest_source_clients_configs.yml.template` to `etc/rest_source_clients_configs.yml` and update the Fitbit credentials for you application.
4. Generate a htpasswd file for basic auth for endpoints. This can be done using - 
    ```shell script
    docker run --rm httpd:2.4-alpine htpasswd -nbB "<your-user>" "<your password>" > src/main/docker/production/etc/webserver/rest-sources.htpasswd
    ```
   
### Usage

Run the stack using - 

```shell script
docker-compose up -d
```