export const hdfcURL="https://saumilbisht.in/hdfcBank"
export const axisURL="https://saumilbisht.in/axisBank"
export const webhookURL="https://saumilbisht.in/bank-webhook"
/*
export const hdfcURL="http://localhost:3005"
export const axisURL="http://localhost:3004"
export const webhookURL="http://localhost:3003"

final nginx file after adding healthchecks in files manually.
events {
    # Event directives...
}

http {

    server {
        server_name saumilbisht.in;

        location /bank-webhook/ {
            proxy_pass http://localhost:3003/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;

            # CORS headers
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization';

            # Handle preflight requests
            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Max-Age' 1728000;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                add_header 'Content-Length' 0;
                return 204;
            }
        }

        location /axisBank/ {
            proxy_pass http://localhost:3004/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;

            # CORS headers
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization';

            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Max-Age' 1728000;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                add_header 'Content-Length' 0;
                return 204;
            }
        }

        location /hdfcBank/ {
            proxy_pass http://localhost:3005/;
            proxy_http_version 1.1;
            proxy_set_header Upgrade $http_upgrade;
            proxy_set_header Connection 'upgrade';
            proxy_set_header Host $host;
            proxy_cache_bypass $http_upgrade;

            # CORS headers
            add_header 'Access-Control-Allow-Origin' '*';
            add_header 'Access-Control-Allow-Methods' 'GET, POST, OPTIONS';
            add_header 'Access-Control-Allow-Headers' 'Origin, Content-Type, Accept, Authorization';

            if ($request_method = 'OPTIONS') {
                add_header 'Access-Control-Max-Age' 1728000;
                add_header 'Content-Type' 'text/plain charset=UTF-8';
                add_header 'Content-Length' 0;
                return 204;
            }
        }

        listen 443 ssl; # managed by Certbot
        ssl_certificate /etc/letsencrypt/live/saumilbisht.in/fullchain.pem; # managed by Certbot
        ssl_certificate_key /etc/letsencrypt/live/saumilbisht.in/privkey.pem; # managed by Certbot
        include /etc/letsencrypt/options-ssl-nginx.conf; # managed by Certbot
        ssl_dhparam /etc/letsencrypt/ssl-dhparams.pem; # managed by Certbot
    }

    server {
        if ($host = saumilbisht.in) {
            return 301 https://$host$request_uri;
        } # managed by Certbot

        listen 80;
        server_name saumilbisht.in;
        return 404; # managed by Certbot
    }
}

*/