FROM node:14.15.3-alpine3.12 as builder
WORKDIR /docusaurus
COPY . .
RUN yarn install
RUN yarn build

# => Run container
FROM nginx:1.17-alpine

# Nginx config
RUN rm -rf /etc/nginx/conf.d
COPY conf /etc/nginx

COPY --from=builder ./docusaurus/build /usr/share/nginx/html/

# Default port exposure
EXPOSE 80

# Start Nginx server
CMD ["nginx","-g","daemon off;"]